exports.id = 642;
exports.ids = [642];
exports.modules = {

/***/ 1680:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(7739)


/***/ }),

/***/ 7739:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const stream = __webpack_require__(2203)
const EventEmitter = __webpack_require__(4434)
const LZWEncoder = __webpack_require__(3500)
const NeuQuant = __webpack_require__(222)
const { OctreeQuant, Color } = __webpack_require__(2756)

class ByteArray {
  constructor() {
    this.data = []
  }

  getData() {
    return Buffer.from(this.data)
  }

  writeByte(val) {
    this.data.push(val)
  }

  writeUTFBytes(str) {
    for (var len = str.length, i = 0; i < len; i++) {
      this.writeByte(str.charCodeAt(i))
    }
  }

  writeBytes(array, offset, length) {
    for (var len = length || array.length, i = offset || 0; i < len; i++) {
      this.writeByte(array[i])
    }
  }
}

class GIFEncoder extends EventEmitter {
  constructor(width, height, algorithm = 'neuquant', useOptimizer = false, totalFrames = 0) {
    super()

    this.width = ~~width
    this.height = ~~height
    this.algorithm = algorithm
    this.useOptimizer = useOptimizer
    this.totalFrames = totalFrames
    this.frames = 1
    this.threshold = 90
    this.indexedPixels = null
    this.palSizeNeu = 7
    this.palSizeOct = 7
    this.sample = 10
    this.colorTab = null
    this.reuseTab = null
    this.colorDepth = null
    this.usedEntry = new Array()
    this.firstFrame = true
    this.started = false
    this.image = null
    this.prevImage = null
    this.dispose = -1
    this.repeat = 0
    this.delay = 0
    this.transparent = null
    this.transIndex = 0
    this.readStreams = []
    this.out = new ByteArray()
  }

  createReadStream(rs) {
    if (!rs) {
      rs = new stream.Readable()
      rs._read = function() {}
    }
    this.readStreams.push(rs)
    return rs
  }

  emitData() {
    if (this.readStreams.length === 0) {
      return
    }
    if (this.out.data.length) {
      this.readStreams.forEach(rs => {
        rs.push(Buffer.from(this.out.data))
      })
      this.out.data = []
    }
  }

  start() {
    this.out.writeUTFBytes('GIF89a')
    this.started = true
    this.emitData()
  }

  end() {
    if (this.readStreams.length === null) {
      return
    }
    this.emitData()
    this.readStreams.forEach(rs => rs.push(null))
    this.readStreams = []
  }

  addFrame(input) {
    if (input && input.getImageData) {
      this.image = input.getImageData(0, 0, this.width, this.height).data
    } else {
      this.image = input
    }

    this.analyzePixels()

    if (this.firstFrame) {
      this.writeLSD()
      this.writePalette()
      if (this.repeat >= 0) {
        this.writeNetscapeExt()
      }
    }

    this.writeGraphicCtrlExt()
    this.writeImageDesc()
    if (!this.firstFrame) {
      this.writePalette()
    }
    this.writePixels()
    this.firstFrame = false
    this.emitData()

    if (this.totalFrames) {
      this.emit('progress', Math.floor((this.frames++ / this.totalFrames) * 100))
    }
  }

  analyzePixels() {
    const w = this.width
    const h = this.height

    var data = this.image

    if (this.useOptimizer && this.prevImage) {
      var delta = 0
      for (var len = data.length, i = 0; i < len; i += 4) {
        if (
          data[i] !== this.prevImage[i] ||
          data[i + 1] !== this.prevImage[i + 1] ||
          data[i + 2] !== this.prevImage[i + 2]
        ) {
          delta++
        }
      }
      const match = 100 - Math.ceil((delta / (data.length / 4)) * 100)
      this.reuseTab = match >= this.threshold
    }

    this.prevImage = data

    if (this.algorithm === 'neuquant') {
      var count = 0
      this.pixels = new Uint8Array(w * h * 3)

      for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
          var b = i * w * 4 + j * 4
          this.pixels[count++] = data[b]
          this.pixels[count++] = data[b + 1]
          this.pixels[count++] = data[b + 2]
        }
      }

      var nPix = this.pixels.length / 3
      this.indexedPixels = new Uint8Array(nPix)

      if (!this.reuseTab) {
        this.quantizer = new NeuQuant(this.pixels, this.sample)
        this.quantizer.buildColormap()
        this.colorTab = this.quantizer.getColormap()
      }

      var k = 0
      for (var j = 0; j < nPix; j++) {
        var index = this.quantizer.lookupRGB(
          this.pixels[k++] & 0xff,
          this.pixels[k++] & 0xff,
          this.pixels[k++] & 0xff
        )

        this.usedEntry[index] = true
        this.indexedPixels[j] = index
      }

      this.colorDepth = 8
      this.palSizeNeu = 7
      this.pixels = null
    } else if (this.algorithm === 'octree') {
      this.colors = []

      if (!this.reuseTab) {
        this.quantizer = new OctreeQuant()
      }

      for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
          var b = i * w * 4 + j * 4
          const color = new Color(data[b], data[b + 1], data[b + 2])
          this.colors.push(color)

          if (!this.reuseTab) {
            this.quantizer.addColor(color)
          }
        }
      }

      const nPix = this.colors.length
      this.indexedPixels = new Uint8Array(nPix)

      if (!this.reuseTab) {
        this.colorTab = []
        const palette = this.quantizer.makePalette(Math.pow(2, this.palSizeOct + 1))

        for (const p of palette) {
          this.colorTab.push(p.red, p.green, p.blue)
        }
      }

      for (var i = 0; i < nPix; i++) {
        this.indexedPixels[i] = this.quantizer.getPaletteIndex(this.colors[i])
      }

      this.colorDepth = this.palSizeOct + 1
    }

    if (this.transparent !== null) {
      this.transIndex = this.findClosest(this.transparent)

      for (var pixelIndex = 0; pixelIndex < nPix; pixelIndex++) {
        if (this.image[pixelIndex * 4 + 3] == 0) {
          this.indexedPixels[pixelIndex] = this.transIndex
        }
      }
    }
  }

  findClosest(c) {
    if (this.colorTab === null) {
      return -1
    }

    var r = (c & 0xff0000) >> 16
    var g = (c & 0x00ff00) >> 8
    var b = c & 0x0000ff
    var minpos = 0
    var dmin = 256 * 256 * 256
    var len = this.colorTab.length

    for (var i = 0; i < len; ) {
      var index = i / 3
      var dr = r - (this.colorTab[i++] & 0xff)
      var dg = g - (this.colorTab[i++] & 0xff)
      var db = b - (this.colorTab[i++] & 0xff)
      var d = dr * dr + dg * dg + db * db
      if (this.usedEntry[index] && d < dmin) {
        dmin = d
        minpos = index
      }
    }

    return minpos
  }

  setFrameRate(fps) {
    this.delay = Math.round(100 / fps)
  }

  setDelay(ms) {
    this.delay = Math.round(ms / 10)
  }

  setDispose(code) {
    if (code >= 0) {
      this.dispose = code
    }
  }

  setRepeat(repeat) {
    this.repeat = repeat
  }

  setTransparent(color) {
    this.transparent = color
  }

  setQuality(quality) {
    if (quality < 1) {
      quality = 1
    }
    this.quality = quality
  }

  setThreshold(threshold) {
    if (threshold > 100) {
      threshold = 100
    } else if (threshold < 0) {
      threshold = 0
    }
    this.threshold = threshold
  }

  setPaletteSize(size) {
    if (size > 7) {
      size = 7
    } else if (size < 4) {
      size = 4
    }
    this.palSizeOct = size
  }

  writeLSD() {
    this.writeShort(this.width)
    this.writeShort(this.height)

    this.out.writeByte(0x80 | 0x70 | 0x00 | this.palSizeNeu)

    this.out.writeByte(0)
    this.out.writeByte(0)
  }

  writeGraphicCtrlExt() {
    this.out.writeByte(0x21)
    this.out.writeByte(0xf9)
    this.out.writeByte(4)

    var transp, disp
    if (this.transparent === null) {
      transp = 0
      disp = 0
    } else {
      transp = 1
      disp = 2
    }

    if (this.dispose >= 0) {
      disp = this.dispose & 7
    }
    disp <<= 2

    this.out.writeByte(0 | disp | 0 | transp)

    this.writeShort(this.delay)
    this.out.writeByte(this.transIndex)
    this.out.writeByte(0)
  }

  writeNetscapeExt() {
    this.out.writeByte(0x21)
    this.out.writeByte(0xff)
    this.out.writeByte(11)
    this.out.writeUTFBytes('NETSCAPE2.0')
    this.out.writeByte(3)
    this.out.writeByte(1)
    this.writeShort(this.repeat)
    this.out.writeByte(0)
  }

  writeImageDesc() {
    this.out.writeByte(0x2c)
    this.writeShort(0)
    this.writeShort(0)
    this.writeShort(this.width)
    this.writeShort(this.height)

    if (this.firstFrame) {
      this.out.writeByte(0)
    } else {
      this.out.writeByte(0x80 | 0 | 0 | 0 | this.palSizeNeu)
    }
  }

  writePalette() {
    this.out.writeBytes(this.colorTab)
    var n = 3 * 256 - this.colorTab.length
    for (var i = 0; i < n; i++) {
      this.out.writeByte(0)
    }
  }

  writeShort(pValue) {
    this.out.writeByte(pValue & 0xff)
    this.out.writeByte((pValue >> 8) & 0xff)
  }

  writePixels() {
    var enc = new LZWEncoder(this.width, this.height, this.indexedPixels, this.colorDepth)
    enc.encode(this.out)
  }

  finish() {
    this.out.writeByte(0x3b)
    this.end()
  }
}

module.exports = GIFEncoder


/***/ }),

/***/ 3500:
/***/ ((module) => {

/*
  LZWEncoder.js

  Authors
  Kevin Weiner (original Java version - kweiner@fmsware.com)
  Thibault Imbert (AS3 version - bytearray.org)
  Johan Nordberg (JS version - code@johan-nordberg.com)

  Acknowledgements
  GIFCOMPR.C - GIF Image compression routines
  Lempel-Ziv compression based on 'compress'. GIF modifications by
  David Rowley (mgardi@watdcsu.waterloo.edu)
  GIF Image compression - modified 'compress'
  Based on: compress.c - File compression ala IEEE Computer, June 1984.
  By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
  Jim McKie (decvax!mcvax!jim)
  Steve Davies (decvax!vax135!petsd!peora!srd)
  Ken Turkowski (decvax!decwrl!turtlevax!ken)
  James A. Woods (decvax!ihnp4!ames!jaw)
  Joe Orost (decvax!vax135!petsd!joe)
*/

var EOF = -1
var BITS = 12
var HSIZE = 5003 // 80% occupancy
var masks = [
  0x0000,
  0x0001,
  0x0003,
  0x0007,
  0x000f,
  0x001f,
  0x003f,
  0x007f,
  0x00ff,
  0x01ff,
  0x03ff,
  0x07ff,
  0x0fff,
  0x1fff,
  0x3fff,
  0x7fff,
  0xffff
]

function LZWEncoder(width, height, pixels, colorDepth) {
  var initCodeSize = Math.max(2, colorDepth)

  var accum = new Uint8Array(256)
  var htab = new Int32Array(HSIZE)
  var codetab = new Int32Array(HSIZE)

  var cur_accum,
    cur_bits = 0
  var a_count
  var free_ent = 0 // first unused entry
  var maxcode

  // block compression parameters -- after all codes are used up,
  // and compression rate changes, start over.
  var clear_flg = false

  // Algorithm: use open addressing double hashing (no chaining) on the
  // prefix code / next character combination. We do a variant of Knuth's
  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
  // secondary probe. Here, the modular division first probe is gives way
  // to a faster exclusive-or manipulation. Also do block compression with
  // an adaptive reset, whereby the code table is cleared when the compression
  // ratio decreases, but after the table fills. The variable-length output
  // codes are re-sized at this point, and a special CLEAR code is generated
  // for the decompressor. Late addition: construct the table according to
  // file size for noticeable speed improvement on small files. Please direct
  // questions about this implementation to ames!jaw.
  var g_init_bits, ClearCode, EOFCode

  // Add a character to the end of the current packet, and if it is 254
  // characters, flush the packet to disk.
  function char_out(c, outs) {
    accum[a_count++] = c
    if (a_count >= 254) flush_char(outs)
  }

  // Clear out the hash table
  // table clear for block compress
  function cl_block(outs) {
    cl_hash(HSIZE)
    free_ent = ClearCode + 2
    clear_flg = true
    output(ClearCode, outs)
  }

  // Reset code table
  function cl_hash(hsize) {
    for (var i = 0; i < hsize; ++i) htab[i] = -1
  }

  function compress(init_bits, outs) {
    var fcode, c, i, ent, disp, hsize_reg, hshift

    // Set up the globals: g_init_bits - initial number of bits
    g_init_bits = init_bits

    // Set up the necessary values
    clear_flg = false
    n_bits = g_init_bits
    maxcode = MAXCODE(n_bits)

    ClearCode = 1 << (init_bits - 1)
    EOFCode = ClearCode + 1
    free_ent = ClearCode + 2

    a_count = 0 // clear packet

    ent = nextPixel()

    hshift = 0
    for (fcode = HSIZE; fcode < 65536; fcode *= 2) ++hshift
    hshift = 8 - hshift // set hash code range bound
    hsize_reg = HSIZE
    cl_hash(hsize_reg) // clear hash table

    output(ClearCode, outs)

    outer_loop: while ((c = nextPixel()) != EOF) {
      fcode = (c << BITS) + ent
      i = (c << hshift) ^ ent // xor hashing
      if (htab[i] === fcode) {
        ent = codetab[i]
        continue
      } else if (htab[i] >= 0) {
        // non-empty slot
        disp = hsize_reg - i // secondary hash (after G. Knott)
        if (i === 0) disp = 1
        do {
          if ((i -= disp) < 0) i += hsize_reg
          if (htab[i] === fcode) {
            ent = codetab[i]
            continue outer_loop
          }
        } while (htab[i] >= 0)
      }
      output(ent, outs)
      ent = c
      if (free_ent < 1 << BITS) {
        codetab[i] = free_ent++ // code -> hashtable
        htab[i] = fcode
      } else {
        cl_block(outs)
      }
    }

    // Put out the final code.
    output(ent, outs)
    output(EOFCode, outs)
  }

  function encode(outs) {
    outs.writeByte(initCodeSize) // write "initial code size" byte
    remaining = width * height // reset navigation variables
    curPixel = 0
    compress(initCodeSize + 1, outs) // compress and write the pixel data
    outs.writeByte(0) // write block terminator
  }

  // Flush the packet to disk, and reset the accumulator
  function flush_char(outs) {
    if (a_count > 0) {
      outs.writeByte(a_count)
      outs.writeBytes(accum, 0, a_count)
      a_count = 0
    }
  }

  function MAXCODE(n_bits) {
    return (1 << n_bits) - 1
  }

  // Return the next pixel from the image
  function nextPixel() {
    if (remaining === 0) return EOF
    --remaining
    var pix = pixels[curPixel++]
    return pix & 0xff
  }

  function output(code, outs) {
    cur_accum &= masks[cur_bits]

    if (cur_bits > 0) cur_accum |= code << cur_bits
    else cur_accum = code

    cur_bits += n_bits

    while (cur_bits >= 8) {
      char_out(cur_accum & 0xff, outs)
      cur_accum >>= 8
      cur_bits -= 8
    }

    // If the next entry is going to be too big for the code size,
    // then increase it, if possible.
    if (free_ent > maxcode || clear_flg) {
      if (clear_flg) {
        maxcode = MAXCODE((n_bits = g_init_bits))
        clear_flg = false
      } else {
        ++n_bits
        if (n_bits == BITS) maxcode = 1 << BITS
        else maxcode = MAXCODE(n_bits)
      }
    }

    if (code == EOFCode) {
      // At EOF, write the rest of the buffer.
      while (cur_bits > 0) {
        char_out(cur_accum & 0xff, outs)
        cur_accum >>= 8
        cur_bits -= 8
      }
      flush_char(outs)
    }
  }

  this.encode = encode
}

module.exports = LZWEncoder


/***/ }),

/***/ 2756:
/***/ ((module) => {

/*
  Authors
  Dmitry Alimov (Python version) https://github.com/delimitry/octree_color_quantizer
  Tom MacWright (JavaScript version) https://observablehq.com/@tmcw/octree-color-quantization
*/

const MAX_DEPTH = 8

class OctreeQuant {
  constructor() {
    this.levels = Array.from({ length: MAX_DEPTH }, () => [])
    this.root = new Node(0, this)
  }

  addColor(color) {
    this.root.addColor(color, 0, this)
  }

  makePalette(colorCount) {
    let palette = []
    let paletteIndex = 0
    let leafCount = this.leafNodes.length
    for (let level = MAX_DEPTH - 1; level > -1; level -= 1) {
      if (this.levels[level]) {
        for (let node of this.levels[level]) {
          leafCount -= node.removeLeaves()
          if (leafCount <= colorCount) break
        }
        if (leafCount <= colorCount) break
        this.levels[level] = []
      }
    }
    for (let node of this.leafNodes) {
      if (paletteIndex >= colorCount) break
      if (node.isLeaf) palette.push(node.color)
      node.paletteIndex = paletteIndex
      paletteIndex++
    }
    return palette
  }

  *makePaletteIncremental(colorCount) {
    let palette = []
    let paletteIndex = 0
    let leafCount = this.leafNodes.length
    for (let level = MAX_DEPTH - 1; level > -1; level -= 1) {
      if (this.levels[level]) {
        for (let node of this.levels[level]) {
          leafCount -= node.removeLeaves()
          if (leafCount <= colorCount) break
        }
        if (leafCount <= colorCount) break
        this.levels[level] = []
      }
      yield
    }
    for (let node of this.leafNodes) {
      if (paletteIndex >= colorCount) break
      if (node.isLeaf) palette.push(node.color)
      node.paletteIndex = paletteIndex
      paletteIndex++
    }
    yield
    return palette
  }

  get leafNodes() {
    return this.root.leafNodes
  }

  addLevelNode(level, node) {
    this.levels[level].push(node)
  }

  getPaletteIndex(color) {
    return this.root.getPaletteIndex(color, 0)
  }
}

class Node {
  constructor(level, parent) {
    this._color = new Color(0, 0, 0)
    this.pixelCount = 0
    this.paletteIndex = 0
    this.children = []
    this._debugColor
    if (level < MAX_DEPTH - 1) parent.addLevelNode(level, this)
  }

  get isLeaf() {
    return this.pixelCount > 0
  }

  get leafNodes() {
    let leafNodes = []

    for (let node of this.children) {
      if (!node) continue
      if (node.isLeaf) {
        leafNodes.push(node)
      } else {
        leafNodes.push(...node.leafNodes)
      }
    }

    return leafNodes
  }

  addColor(color, level, parent) {
    if (level >= MAX_DEPTH) {
      this._color.add(color)
      this.pixelCount++
      return
    }
    let index = getColorIndex(color, level)
    if (!this.children[index]) {
      this.children[index] = new Node(level, parent)
    }
    this.children[index].addColor(color, level + 1, parent)
  }

  getPaletteIndex(color, level) {
    if (this.isLeaf) {
      return this.paletteIndex
    }
    let index = getColorIndex(color, level)
    if (this.children[index]) {
      return this.children[index].getPaletteIndex(color, level + 1)
    } else {
      for (let node of this.children) {
        if (node) {
          return node.getPaletteIndex(color, level + 1)
        }
      }
    }
  }

  removeLeaves() {
    let result = 0
    for (let node of this.children) {
      if (!node) continue
      this._color.add(node._color)
      this.pixelCount += node.pixelCount
      result++
    }
    this.children = []
    return result - 1
  }

  get debugColor() {
    if (this._debugColor) return this._debugColor
    if (this.isLeaf) return this.color

    let c = new Color()
    let count = 0

    function traverse(node) {
      for (let child of node.children) {
        if (child.isLeaf) {
          c.add(child._color)
          count++
        } else {
          traverse(child)
        }
      }
    }

    traverse(this)
    return c.normalized(count)
  }

  get color() {
    return this._color.normalized(this.pixelCount)
  }
}

class Color {
  constructor(red = 0, green = 0, blue = 0) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  clone() {
    return new Color(this.red, this.green, this.blue)
  }

  get array() {
    return [this.red, this.green, this.blue, this.red + this.green + this.blue]
  }

  toString() {
    return [this.red, this.green, this.blue].join(',')
  }

  toCSS() {
    return `rgb(${[this.red, this.green, this.blue].map(n => Math.floor(n)).join(',')})`
  }

  normalized(pixelCount) {
    return new Color(this.red / pixelCount, this.green / pixelCount, this.blue / pixelCount)
  }

  add(color) {
    this.red += color.red
    this.green += color.green
    this.blue += color.blue
  }
}

function getColorIndex(color, level) {
  let index = 0
  let mask = 0b10000000 >> level
  if (color.red & mask) index |= 0b100
  if (color.green & mask) index |= 0b010
  if (color.blue & mask) index |= 0b001
  return index
}

module.exports = { OctreeQuant, Node, Color }


/***/ }),

/***/ 222:
/***/ ((module) => {

/* NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994.
 * See "Kohonen neural networks for optimal colour quantization"
 * in "Network: Computation in Neural Systems" Vol. 5 (1994) pp 351-367.
 * for a discussion of the algorithm.
 * See also  http://members.ozemail.com.au/~dekker/NEUQUANT.HTML
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal
 * in this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons who receive
 * copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 *
 * (JavaScript port 2012 by Johan Nordberg)
 */

var ncycles = 100 // number of learning cycles
var netsize = 256 // number of colors used
var maxnetpos = netsize - 1

// defs for freq and bias
var netbiasshift = 4 // bias for colour values
var intbiasshift = 16 // bias for fractions
var intbias = 1 << intbiasshift
var gammashift = 10
var gamma = 1 << gammashift
var betashift = 10
var beta = intbias >> betashift /* beta = 1/1024 */
var betagamma = intbias << (gammashift - betashift)

// defs for decreasing radius factor
var initrad = netsize >> 3 // for 256 cols, radius starts
var radiusbiasshift = 6 // at 32.0 biased by 6 bits
var radiusbias = 1 << radiusbiasshift
var initradius = initrad * radiusbias //and decreases by a
var radiusdec = 30 // factor of 1/30 each cycle

// defs for decreasing alpha factor
var alphabiasshift = 10 // alpha starts at 1.0
var initalpha = 1 << alphabiasshift
var alphadec // biased by 10 bits

/* radbias and alpharadbias used for radpower calculation */
var radbiasshift = 8
var radbias = 1 << radbiasshift
var alpharadbshift = alphabiasshift + radbiasshift
var alpharadbias = 1 << alpharadbshift

// four primes near 500 - assume no image has a length so large that it is
// divisible by all four primes
var prime1 = 499
var prime2 = 491
var prime3 = 487
var prime4 = 503
var minpicturebytes = 3 * prime4

/*
  Constructor: NeuQuant

  Arguments:

  pixels - array of pixels in RGB format
  samplefac - sampling factor 1 to 30 where lower is better quality

  >
  > pixels = [r, g, b, r, g, b, r, g, b, ..]
  >
*/
function NeuQuant(pixels, samplefac) {
  var network // int[netsize][4]
  var netindex // for network lookup - really 256

  // bias and freq arrays for learning
  var bias
  var freq
  var radpower

  /*
    Private Method: init

    sets up arrays
  */
  function init() {
    network = []
    netindex = new Int32Array(256)
    bias = new Int32Array(netsize)
    freq = new Int32Array(netsize)
    radpower = new Int32Array(netsize >> 3)

    var i, v
    for (i = 0; i < netsize; i++) {
      v = (i << (netbiasshift + 8)) / netsize
      network[i] = new Float64Array([v, v, v, 0])
      //network[i] = [v, v, v, 0]
      freq[i] = intbias / netsize
      bias[i] = 0
    }
  }

  /*
    Private Method: unbiasnet

    unbiases network to give byte values 0..255 and record position i to prepare for sort
  */
  function unbiasnet() {
    for (var i = 0; i < netsize; i++) {
      network[i][0] >>= netbiasshift
      network[i][1] >>= netbiasshift
      network[i][2] >>= netbiasshift
      network[i][3] = i // record color number
    }
  }

  /*
    Private Method: altersingle

    moves neuron *i* towards biased (b,g,r) by factor *alpha*
  */
  function altersingle(alpha, i, b, g, r) {
    network[i][0] -= (alpha * (network[i][0] - b)) / initalpha
    network[i][1] -= (alpha * (network[i][1] - g)) / initalpha
    network[i][2] -= (alpha * (network[i][2] - r)) / initalpha
  }

  /*
    Private Method: alterneigh

    moves neurons in *radius* around index *i* towards biased (b,g,r) by factor *alpha*
  */
  function alterneigh(radius, i, b, g, r) {
    var lo = Math.abs(i - radius)
    var hi = Math.min(i + radius, netsize)

    var j = i + 1
    var k = i - 1
    var m = 1

    var p, a
    while (j < hi || k > lo) {
      a = radpower[m++]

      if (j < hi) {
        p = network[j++]
        p[0] -= (a * (p[0] - b)) / alpharadbias
        p[1] -= (a * (p[1] - g)) / alpharadbias
        p[2] -= (a * (p[2] - r)) / alpharadbias
      }

      if (k > lo) {
        p = network[k--]
        p[0] -= (a * (p[0] - b)) / alpharadbias
        p[1] -= (a * (p[1] - g)) / alpharadbias
        p[2] -= (a * (p[2] - r)) / alpharadbias
      }
    }
  }

  /*
    Private Method: contest

    searches for biased BGR values
  */
  function contest(b, g, r) {
    /*
      finds closest neuron (min dist) and updates freq
      finds best neuron (min dist-bias) and returns position
      for frequently chosen neurons, freq[i] is high and bias[i] is negative
      bias[i] = gamma * ((1 / netsize) - freq[i])
    */

    var bestd = ~(1 << 31)
    var bestbiasd = bestd
    var bestpos = -1
    var bestbiaspos = bestpos

    var i, n, dist, biasdist, betafreq
    for (i = 0; i < netsize; i++) {
      n = network[i]

      dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r)
      if (dist < bestd) {
        bestd = dist
        bestpos = i
      }

      biasdist = dist - (bias[i] >> (intbiasshift - netbiasshift))
      if (biasdist < bestbiasd) {
        bestbiasd = biasdist
        bestbiaspos = i
      }

      betafreq = freq[i] >> betashift
      freq[i] -= betafreq
      bias[i] += betafreq << gammashift
    }

    freq[bestpos] += beta
    bias[bestpos] -= betagamma

    return bestbiaspos
  }

  /*
    Private Method: inxbuild

    sorts network and builds netindex[0..255]
  */
  function inxbuild() {
    var i,
      j,
      p,
      q,
      smallpos,
      smallval,
      previouscol = 0,
      startpos = 0
    for (i = 0; i < netsize; i++) {
      p = network[i]
      smallpos = i
      smallval = p[1] // index on g
      // find smallest in i..netsize-1
      for (j = i + 1; j < netsize; j++) {
        q = network[j]
        if (q[1] < smallval) {
          // index on g
          smallpos = j
          smallval = q[1] // index on g
        }
      }
      q = network[smallpos]
      // swap p (i) and q (smallpos) entries
      if (i != smallpos) {
        j = q[0]
        q[0] = p[0]
        p[0] = j
        j = q[1]
        q[1] = p[1]
        p[1] = j
        j = q[2]
        q[2] = p[2]
        p[2] = j
        j = q[3]
        q[3] = p[3]
        p[3] = j
      }
      // smallval entry is now in position i

      if (smallval != previouscol) {
        netindex[previouscol] = (startpos + i) >> 1
        for (j = previouscol + 1; j < smallval; j++) netindex[j] = i
        previouscol = smallval
        startpos = i
      }
    }
    netindex[previouscol] = (startpos + maxnetpos) >> 1
    for (j = previouscol + 1; j < 256; j++) netindex[j] = maxnetpos // really 256
  }

  /*
    Private Method: inxsearch

    searches for BGR values 0..255 and returns a color index
  */
  function inxsearch(b, g, r) {
    var a, p, dist

    var bestd = 1000 // biggest possible dist is 256*3
    var best = -1

    var i = netindex[g] // index on g
    var j = i - 1 // start at netindex[g] and work outwards

    while (i < netsize || j >= 0) {
      if (i < netsize) {
        p = network[i]
        dist = p[1] - g // inx key
        if (dist >= bestd) i = netsize
        // stop iter
        else {
          i++
          if (dist < 0) dist = -dist
          a = p[0] - b
          if (a < 0) a = -a
          dist += a
          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) a = -a
            dist += a
            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }
      if (j >= 0) {
        p = network[j]
        dist = g - p[1] // inx key - reverse dif
        if (dist >= bestd) j = -1
        // stop iter
        else {
          j--
          if (dist < 0) dist = -dist
          a = p[0] - b
          if (a < 0) a = -a
          dist += a
          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) a = -a
            dist += a
            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }
    }

    return best
  }

  /*
    Private Method: learn

    "Main Learning Loop"
  */
  function learn() {
    var i

    var lengthcount = pixels.length
    var alphadec = 30 + (samplefac - 1) / 3
    var samplepixels = lengthcount / (3 * samplefac)
    var delta = ~~(samplepixels / ncycles)
    var alpha = initalpha
    var radius = initradius

    var rad = radius >> radiusbiasshift

    if (rad <= 1) rad = 0
    for (i = 0; i < rad; i++) radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad))

    var step
    if (lengthcount < minpicturebytes) {
      samplefac = 1
      step = 3
    } else if (lengthcount % prime1 !== 0) {
      step = 3 * prime1
    } else if (lengthcount % prime2 !== 0) {
      step = 3 * prime2
    } else if (lengthcount % prime3 !== 0) {
      step = 3 * prime3
    } else {
      step = 3 * prime4
    }

    var b, g, r, j
    var pix = 0 // current pixel

    i = 0
    while (i < samplepixels) {
      b = (pixels[pix] & 0xff) << netbiasshift
      g = (pixels[pix + 1] & 0xff) << netbiasshift
      r = (pixels[pix + 2] & 0xff) << netbiasshift

      j = contest(b, g, r)

      altersingle(alpha, j, b, g, r)
      if (rad !== 0) alterneigh(rad, j, b, g, r) // alter neighbours

      pix += step
      if (pix >= lengthcount) pix -= lengthcount

      i++

      if (delta === 0) delta = 1
      if (i % delta === 0) {
        alpha -= alpha / alphadec
        radius -= radius / radiusdec
        rad = radius >> radiusbiasshift

        if (rad <= 1) rad = 0
        for (j = 0; j < rad; j++)
          radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad))
      }
    }
  }

  /*
    Method: buildColormap

    1. initializes network
    2. trains it
    3. removes misconceptions
    4. builds colorindex
  */
  function buildColormap() {
    init()
    learn()
    unbiasnet()
    inxbuild()
  }
  this.buildColormap = buildColormap

  /*
    Method: getColormap

    builds colormap from the index

    returns array in the format:

    >
    > [r, g, b, r, g, b, r, g, b, ..]
    >
  */
  function getColormap() {
    var map = []
    var index = []

    for (var i = 0; i < netsize; i++) index[network[i][3]] = i

    var k = 0
    for (var l = 0; l < netsize; l++) {
      var j = index[l]
      map[k++] = network[j][0]
      map[k++] = network[j][1]
      map[k++] = network[j][2]
    }
    return map
  }
  this.getColormap = getColormap

  /*
    Method: lookupRGB

    looks for the closest *r*, *g*, *b* color in the map and
    returns its index
  */
  this.lookupRGB = inxsearch
}

module.exports = NeuQuant


/***/ }),

/***/ 3642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  createGif: () => (/* binding */ createGif)
});

// UNUSED EXPORTS: withTmpDir

// EXTERNAL MODULE: external "node:child_process"
var external_node_child_process_ = __webpack_require__(1421);
// EXTERNAL MODULE: external "node:fs"
var external_node_fs_ = __webpack_require__(3024);
var external_node_fs_default = /*#__PURE__*/__webpack_require__.n(external_node_fs_);
// EXTERNAL MODULE: external "node:os"
var external_node_os_ = __webpack_require__(8161);
// EXTERNAL MODULE: external "node:path"
var external_node_path_ = __webpack_require__(6760);
var external_node_path_default = /*#__PURE__*/__webpack_require__.n(external_node_path_);
// EXTERNAL MODULE: ../types/grid.ts
var types_grid = __webpack_require__(105);
;// CONCATENATED MODULE: ../draw/pathRoundedRect.ts
const pathRoundedRect_pathRoundedRect = (ctx, width, height, borderRadius) => {
    ctx.moveTo(borderRadius, 0);
    ctx.arcTo(width, 0, width, height, borderRadius);
    ctx.arcTo(width, height, 0, height, borderRadius);
    ctx.arcTo(0, height, 0, 0, borderRadius);
    ctx.arcTo(0, 0, width, 0, borderRadius);
};

;// CONCATENATED MODULE: ../draw/drawGrid.ts


const drawGrid_drawGrid = (ctx, grid, cells, o) => {
    for (let x = grid.width; x--;)
        for (let y = grid.height; y--;) {
            if (!cells || cells.some((c) => c.x === x && c.y === y)) {
                const c = (0,types_grid/* getColor */.oU)(grid, x, y);
                // @ts-ignore
                const color = !c ? o.colorEmpty : o.colorDots[c];
                ctx.save();
                ctx.translate(x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2, y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2);
                ctx.fillStyle = color;
                ctx.strokeStyle = o.colorDotBorder;
                ctx.lineWidth = 1;
                ctx.beginPath();
                pathRoundedRect_pathRoundedRect(ctx, o.sizeDot, o.sizeDot, o.sizeDotBorderRadius);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
};

;// CONCATENATED MODULE: ../draw/drawSnake.ts


const drawSnake_drawSnake = (ctx, snake, o) => {
    const cells = snakeToCells(snake);
    for (let i = 0; i < cells.length; i++) {
        const u = (i + 1) * 0.6;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(cells[i].x * o.sizeCell + u, cells[i].y * o.sizeCell + u);
        ctx.beginPath();
        pathRoundedRect(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
        ctx.fill();
        ctx.restore();
    }
};
const lerp = (k, a, b) => (1 - k) * a + k * b;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const drawSnakeLerp = (ctx, snake0, snake1, k, o) => {
    const m = 0.8;
    const n = snake0.length / 2;
    for (let i = 0; i < n; i++) {
        const u = (i + 1) * 0.6 * (o.sizeCell / 16);
        const a = (1 - m) * (i / Math.max(n - 1, 1));
        const ki = clamp((k - a) / m, 0, 1);
        const x = lerp(ki, snake0[i * 2 + 0], snake1[i * 2 + 0]) - 2;
        const y = lerp(ki, snake0[i * 2 + 1], snake1[i * 2 + 1]) - 2;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(x * o.sizeCell + u, y * o.sizeCell + u);
        ctx.beginPath();
        pathRoundedRect_pathRoundedRect(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
        ctx.fill();
        ctx.restore();
    }
};

;// CONCATENATED MODULE: ../draw/drawWorld.ts


const drawStack = (ctx, stack, max, width, o) => {
    ctx.save();
    const m = width / max;
    for (let i = 0; i < stack.length; i++) {
        // @ts-ignore
        ctx.fillStyle = o.colorDots[stack[i]];
        ctx.fillRect(i * m, 0, m + width * 0.005, 10);
    }
    ctx.restore();
};
const drawWorld = (ctx, grid, cells, snake, stack, o) => {
    ctx.save();
    if (o.colorBackground) {
        ctx.fillStyle = o.colorBackground;
        ctx.fillRect(0, 0, 99999, 99999);
    }
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    drawGrid(ctx, grid, cells, o);
    drawSnake(ctx, snake, o);
    ctx.restore();
    ctx.save();
    ctx.translate(o.sizeCell, (grid.height + 4) * o.sizeCell);
    const max = grid.data.reduce((sum, x) => sum + +!!x, stack.length);
    drawStack(ctx, stack, max, grid.width * o.sizeCell, o);
    ctx.restore();
    // ctx.save();
    // ctx.translate(o.sizeCell + 100, (grid.height + 4) * o.sizeCell + 100);
    // ctx.scale(0.6, 0.6);
    // drawCircleStack(ctx, stack, o);
    // ctx.restore();
};
const drawLerpWorld = (ctx, grid, cells, snake0, snake1, stack, k, o) => {
    ctx.save();
    if (o.colorBackground) {
        ctx.fillStyle = o.colorBackground;
        ctx.fillRect(0, 0, 99999, 99999);
    }
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    drawGrid_drawGrid(ctx, grid, cells, o);
    drawSnakeLerp(ctx, snake0, snake1, k, o);
    ctx.translate(0, (grid.height + 2) * o.sizeCell);
    const max = grid.data.reduce((sum, x) => sum + +!!x, stack.length);
    drawStack(ctx, stack, max, grid.width * o.sizeCell, o);
    ctx.restore();
};
const getCanvasWorldSize = (grid, o) => {
    const width = o.sizeCell * (grid.width + 2);
    const height = o.sizeCell * (grid.height + 4) + 30;
    return { width, height };
};

// EXTERNAL MODULE: ../types/snake.ts
var types_snake = __webpack_require__(777);
;// CONCATENATED MODULE: ../solver/step.ts


const step = (grid, stack, snake) => {
    const x = (0,types_snake/* getHeadX */.tN)(snake);
    const y = (0,types_snake/* getHeadY */.Ap)(snake);
    const color = (0,types_grid/* getColor */.oU)(grid, x, y);
    if ((0,types_grid/* isInside */.FK)(grid, x, y) && !(0,types_grid/* isEmpty */.Im)(color)) {
        stack.push(color);
        (0,types_grid/* setColorEmpty */.l$)(grid, x, y);
    }
};

// EXTERNAL MODULE: external "canvas"
var external_canvas_ = __webpack_require__(9919);
// EXTERNAL MODULE: ../../node_modules/gif-encoder-2/index.js
var gif_encoder_2 = __webpack_require__(1680);
var gif_encoder_2_default = /*#__PURE__*/__webpack_require__.n(gif_encoder_2);
// EXTERNAL MODULE: external "gifsicle"
var external_gifsicle_ = __webpack_require__(5667);
var external_gifsicle_default = /*#__PURE__*/__webpack_require__.n(external_gifsicle_);
;// CONCATENATED MODULE: ../gif-creator/index.ts








// @ts-ignore


const createGif = async (grid0, cells, chain, drawOptions, animationOptions) => withTmpDir(async (dir) => {
    const { width, height } = getCanvasWorldSize(grid0, drawOptions);
    const canvas = (0,external_canvas_.createCanvas)(width, height);
    const ctx = canvas.getContext("2d", {
        alpha: true,
    });
    const grid = (0,types_grid/* copyGrid */.mi)(grid0);
    const stack = [];
    const encoder = new (gif_encoder_2_default())(width, height, "neuquant", true, chain.length * animationOptions.frameByStep);
    encoder.setRepeat(0);
    encoder.setDelay(animationOptions.stepDurationMs / animationOptions.frameByStep);
    // transparency does not look good, let's not
    // encoder.setTransparent("0x000000");
    encoder.start();
    for (let i = 0; i < chain.length; i += 1) {
        const snake0 = chain[i];
        const snake1 = chain[Math.min(chain.length - 1, i + 1)];
        step(grid, stack, snake0);
        for (let k = 0; k < animationOptions.frameByStep; k++) {
            ctx.clearRect(0, 0, width, height);
            drawLerpWorld(ctx, grid, cells, snake0, snake1, stack, k / animationOptions.frameByStep, drawOptions);
            encoder.addFrame(ctx);
        }
    }
    const outFileName = external_node_path_default().join(dir, "out.gif");
    const optimizedFileName = external_node_path_default().join(dir, "out.optimized.gif");
    // generate palette file
    const paletteFileName = external_node_path_default().join(dir, "palette.txt");
    {
        const colors = [
            drawOptions.colorBackground,
            drawOptions.colorEmpty,
            drawOptions.colorSnake,
            drawOptions.colorDotBorder,
            ...Object.values(drawOptions.colorDots),
        ].filter(Boolean);
        const canvas = (0,external_canvas_.createCanvas)(colors.length, 1);
        const ctx = canvas.getContext("2d");
        for (let i = colors.length; i--;) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(i, 0, 1, 1);
        }
        const imgData = ctx.getImageData(0, 0, colors.length, 1);
        external_node_fs_default().writeFileSync(paletteFileName, Array.from({ length: colors.length }, (_, i) => [
            imgData.data[i * 4 + 0],
            imgData.data[i * 4 + 1],
            imgData.data[i * 4 + 2],
        ].join(" ")).join("\n"));
    }
    encoder.finish();
    external_node_fs_default().writeFileSync(outFileName, encoder.out.getData());
    (0,external_node_child_process_.execFileSync)((external_gifsicle_default()), [
        //
        "--optimize=3",
        "--color-method=diversity",
        `--use-colormap=${paletteFileName}`,
        // "--colors=16",
        outFileName,
        ["--output", optimizedFileName],
    ].flat());
    return new Uint8Array(external_node_fs_default().readFileSync(optimizedFileName));
});
const withTmpDir = async (handler) => {
    const dir = external_node_path_default().join((0,external_node_os_.tmpdir)(), Math.random().toString(16).slice(2));
    external_node_fs_default().mkdirSync(dir, { recursive: true });
    try {
        return await handler(dir);
    }
    finally {
        external_node_fs_default().rmdirSync(dir, { recursive: true });
    }
};


/***/ })

};
;