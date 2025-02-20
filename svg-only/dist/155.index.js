exports.id = 155;
exports.ids = [155];
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

/***/ 2644:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * Tmp
 *
 * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */

/*
 * Module dependencies.
 */
const fs = __webpack_require__(9896);
const os = __webpack_require__(857);
const path = __webpack_require__(6928);
const crypto = __webpack_require__(6982);
const _c = { fs: fs.constants, os: os.constants };

/*
 * The working inner variables.
 */
const
  // the random characters to choose from
  RANDOM_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',

  TEMPLATE_PATTERN = /XXXXXX/,

  DEFAULT_TRIES = 3,

  CREATE_FLAGS = (_c.O_CREAT || _c.fs.O_CREAT) | (_c.O_EXCL || _c.fs.O_EXCL) | (_c.O_RDWR || _c.fs.O_RDWR),

  // constants are off on the windows platform and will not match the actual errno codes
  IS_WIN32 = os.platform() === 'win32',
  EBADF = _c.EBADF || _c.os.errno.EBADF,
  ENOENT = _c.ENOENT || _c.os.errno.ENOENT,

  DIR_MODE = 0o700 /* 448 */,
  FILE_MODE = 0o600 /* 384 */,

  EXIT = 'exit',

  // this will hold the objects need to be removed on exit
  _removeObjects = [],

  // API change in fs.rmdirSync leads to error when passing in a second parameter, e.g. the callback
  FN_RMDIR_SYNC = fs.rmdirSync.bind(fs);

let
  _gracefulCleanup = false;

/**
 * Recursively remove a directory and its contents.
 *
 * @param {string} dirPath path of directory to remove
 * @param {Function} callback
 * @private
 */
function rimraf(dirPath, callback) {
  return fs.rm(dirPath, { recursive: true }, callback);
}

/**
 * Recursively remove a directory and its contents, synchronously.
 *
 * @param {string} dirPath path of directory to remove
 * @private
 */
function FN_RIMRAF_SYNC(dirPath) {
  return fs.rmSync(dirPath, { recursive: true });
}

/**
 * Gets a temporary file name.
 *
 * @param {(Options|tmpNameCallback)} options options or callback
 * @param {?tmpNameCallback} callback the callback function
 */
function tmpName(options, callback) {
  const
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  try {
    _assertAndSanitizeOptions(opts);
  } catch (err) {
    return cb(err);
  }

  let tries = opts.tries;
  (function _getUniqueName() {
    try {
      const name = _generateTmpName(opts);

      // check whether the path exists then retry if needed
      fs.stat(name, function (err) {
        /* istanbul ignore else */
        if (!err) {
          /* istanbul ignore else */
          if (tries-- > 0) return _getUniqueName();

          return cb(new Error('Could not get a unique tmp filename, max tries reached ' + name));
        }

        cb(null, name);
      });
    } catch (err) {
      cb(err);
    }
  }());
}

/**
 * Synchronous version of tmpName.
 *
 * @param {Object} options
 * @returns {string} the generated random name
 * @throws {Error} if the options are invalid or could not generate a filename
 */
function tmpNameSync(options) {
  const
    args = _parseArguments(options),
    opts = args[0];

  _assertAndSanitizeOptions(opts);

  let tries = opts.tries;
  do {
    const name = _generateTmpName(opts);
    try {
      fs.statSync(name);
    } catch (e) {
      return name;
    }
  } while (tries-- > 0);

  throw new Error('Could not get a unique tmp filename, max tries reached');
}

/**
 * Creates and opens a temporary file.
 *
 * @param {(Options|null|undefined|fileCallback)} options the config options or the callback function or null or undefined
 * @param {?fileCallback} callback
 */
function file(options, callback) {
  const
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  // gets a temporary filename
  tmpName(opts, function _tmpNameCreated(err, name) {
    /* istanbul ignore else */
    if (err) return cb(err);

    // create and open the file
    fs.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err, fd) {
      /* istanbu ignore else */
      if (err) return cb(err);

      if (opts.discardDescriptor) {
        return fs.close(fd, function _discardCallback(possibleErr) {
          // the chance of getting an error on close here is rather low and might occur in the most edgiest cases only
          return cb(possibleErr, name, undefined, _prepareTmpFileRemoveCallback(name, -1, opts, false));
        });
      } else {
        // detachDescriptor passes the descriptor whereas discardDescriptor closes it, either way, we no longer care
        // about the descriptor
        const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
        cb(null, name, fd, _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, false));
      }
    });
  });
}

/**
 * Synchronous version of file.
 *
 * @param {Options} options
 * @returns {FileSyncObject} object consists of name, fd and removeCallback
 * @throws {Error} if cannot create a file
 */
function fileSync(options) {
  const
    args = _parseArguments(options),
    opts = args[0];

  const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
  const name = tmpNameSync(opts);
  var fd = fs.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
  /* istanbul ignore else */
  if (opts.discardDescriptor) {
    fs.closeSync(fd);
    fd = undefined;
  }

  return {
    name: name,
    fd: fd,
    removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, true)
  };
}

/**
 * Creates a temporary directory.
 *
 * @param {(Options|dirCallback)} options the options or the callback function
 * @param {?dirCallback} callback
 */
function dir(options, callback) {
  const
    args = _parseArguments(options, callback),
    opts = args[0],
    cb = args[1];

  // gets a temporary filename
  tmpName(opts, function _tmpNameCreated(err, name) {
    /* istanbul ignore else */
    if (err) return cb(err);

    // create the directory
    fs.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err) {
      /* istanbul ignore else */
      if (err) return cb(err);

      cb(null, name, _prepareTmpDirRemoveCallback(name, opts, false));
    });
  });
}

/**
 * Synchronous version of dir.
 *
 * @param {Options} options
 * @returns {DirSyncObject} object consists of name and removeCallback
 * @throws {Error} if it cannot create a directory
 */
function dirSync(options) {
  const
    args = _parseArguments(options),
    opts = args[0];

  const name = tmpNameSync(opts);
  fs.mkdirSync(name, opts.mode || DIR_MODE);

  return {
    name: name,
    removeCallback: _prepareTmpDirRemoveCallback(name, opts, true)
  };
}

/**
 * Removes files asynchronously.
 *
 * @param {Object} fdPath
 * @param {Function} next
 * @private
 */
function _removeFileAsync(fdPath, next) {
  const _handler = function (err) {
    if (err && !_isENOENT(err)) {
      // reraise any unanticipated error
      return next(err);
    }
    next();
  };

  if (0 <= fdPath[0])
    fs.close(fdPath[0], function () {
      fs.unlink(fdPath[1], _handler);
    });
  else fs.unlink(fdPath[1], _handler);
}

/**
 * Removes files synchronously.
 *
 * @param {Object} fdPath
 * @private
 */
function _removeFileSync(fdPath) {
  let rethrownException = null;
  try {
    if (0 <= fdPath[0]) fs.closeSync(fdPath[0]);
  } catch (e) {
    // reraise any unanticipated error
    if (!_isEBADF(e) && !_isENOENT(e)) throw e;
  } finally {
    try {
      fs.unlinkSync(fdPath[1]);
    }
    catch (e) {
      // reraise any unanticipated error
      if (!_isENOENT(e)) rethrownException = e;
    }
  }
  if (rethrownException !== null) {
    throw rethrownException;
  }
}

/**
 * Prepares the callback for removal of the temporary file.
 *
 * Returns either a sync callback or a async callback depending on whether
 * fileSync or file was called, which is expressed by the sync parameter.
 *
 * @param {string} name the path of the file
 * @param {number} fd file descriptor
 * @param {Object} opts
 * @param {boolean} sync
 * @returns {fileCallback | fileCallbackSync}
 * @private
 */
function _prepareTmpFileRemoveCallback(name, fd, opts, sync) {
  const removeCallbackSync = _prepareRemoveCallback(_removeFileSync, [fd, name], sync);
  const removeCallback = _prepareRemoveCallback(_removeFileAsync, [fd, name], sync, removeCallbackSync);

  if (!opts.keep) _removeObjects.unshift(removeCallbackSync);

  return sync ? removeCallbackSync : removeCallback;
}

/**
 * Prepares the callback for removal of the temporary directory.
 *
 * Returns either a sync callback or a async callback depending on whether
 * tmpFileSync or tmpFile was called, which is expressed by the sync parameter.
 *
 * @param {string} name
 * @param {Object} opts
 * @param {boolean} sync
 * @returns {Function} the callback
 * @private
 */
function _prepareTmpDirRemoveCallback(name, opts, sync) {
  const removeFunction = opts.unsafeCleanup ? rimraf : fs.rmdir.bind(fs);
  const removeFunctionSync = opts.unsafeCleanup ? FN_RIMRAF_SYNC : FN_RMDIR_SYNC;
  const removeCallbackSync = _prepareRemoveCallback(removeFunctionSync, name, sync);
  const removeCallback = _prepareRemoveCallback(removeFunction, name, sync, removeCallbackSync);
  if (!opts.keep) _removeObjects.unshift(removeCallbackSync);

  return sync ? removeCallbackSync : removeCallback;
}

/**
 * Creates a guarded function wrapping the removeFunction call.
 *
 * The cleanup callback is save to be called multiple times.
 * Subsequent invocations will be ignored.
 *
 * @param {Function} removeFunction
 * @param {string} fileOrDirName
 * @param {boolean} sync
 * @param {cleanupCallbackSync?} cleanupCallbackSync
 * @returns {cleanupCallback | cleanupCallbackSync}
 * @private
 */
function _prepareRemoveCallback(removeFunction, fileOrDirName, sync, cleanupCallbackSync) {
  let called = false;

  // if sync is true, the next parameter will be ignored
  return function _cleanupCallback(next) {

    /* istanbul ignore else */
    if (!called) {
      // remove cleanupCallback from cache
      const toRemove = cleanupCallbackSync || _cleanupCallback;
      const index = _removeObjects.indexOf(toRemove);
      /* istanbul ignore else */
      if (index >= 0) _removeObjects.splice(index, 1);

      called = true;
      if (sync || removeFunction === FN_RMDIR_SYNC || removeFunction === FN_RIMRAF_SYNC) {
        return removeFunction(fileOrDirName);
      } else {
        return removeFunction(fileOrDirName, next || function() {});
      }
    }
  };
}

/**
 * The garbage collector.
 *
 * @private
 */
function _garbageCollector() {
  /* istanbul ignore else */
  if (!_gracefulCleanup) return;

  // the function being called removes itself from _removeObjects,
  // loop until _removeObjects is empty
  while (_removeObjects.length) {
    try {
      _removeObjects[0]();
    } catch (e) {
      // already removed?
    }
  }
}

/**
 * Random name generator based on crypto.
 * Adapted from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
 *
 * @param {number} howMany
 * @returns {string} the generated random name
 * @private
 */
function _randomChars(howMany) {
  let
    value = [],
    rnd = null;

  // make sure that we do not fail because we ran out of entropy
  try {
    rnd = crypto.randomBytes(howMany);
  } catch (e) {
    rnd = crypto.pseudoRandomBytes(howMany);
  }

  for (var i = 0; i < howMany; i++) {
    value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
  }

  return value.join('');
}

/**
 * Helper which determines whether a string s is blank, that is undefined, or empty or null.
 *
 * @private
 * @param {string} s
 * @returns {Boolean} true whether the string s is blank, false otherwise
 */
function _isBlank(s) {
  return s === null || _isUndefined(s) || !s.trim();
}

/**
 * Checks whether the `obj` parameter is defined or not.
 *
 * @param {Object} obj
 * @returns {boolean} true if the object is undefined
 * @private
 */
function _isUndefined(obj) {
  return typeof obj === 'undefined';
}

/**
 * Parses the function arguments.
 *
 * This function helps to have optional arguments.
 *
 * @param {(Options|null|undefined|Function)} options
 * @param {?Function} callback
 * @returns {Array} parsed arguments
 * @private
 */
function _parseArguments(options, callback) {
  /* istanbul ignore else */
  if (typeof options === 'function') {
    return [{}, options];
  }

  /* istanbul ignore else */
  if (_isUndefined(options)) {
    return [{}, callback];
  }

  // copy options so we do not leak the changes we make internally
  const actualOptions = {};
  for (const key of Object.getOwnPropertyNames(options)) {
    actualOptions[key] = options[key];
  }

  return [actualOptions, callback];
}

/**
 * Generates a new temporary name.
 *
 * @param {Object} opts
 * @returns {string} the new random name according to opts
 * @private
 */
function _generateTmpName(opts) {

  const tmpDir = opts.tmpdir;

  /* istanbul ignore else */
  if (!_isUndefined(opts.name))
    return path.join(tmpDir, opts.dir, opts.name);

  /* istanbul ignore else */
  if (!_isUndefined(opts.template))
    return path.join(tmpDir, opts.dir, opts.template).replace(TEMPLATE_PATTERN, _randomChars(6));

  // prefix and postfix
  const name = [
    opts.prefix ? opts.prefix : 'tmp',
    '-',
    process.pid,
    '-',
    _randomChars(12),
    opts.postfix ? '-' + opts.postfix : ''
  ].join('');

  return path.join(tmpDir, opts.dir, name);
}

/**
 * Asserts whether the specified options are valid, also sanitizes options and provides sane defaults for missing
 * options.
 *
 * @param {Options} options
 * @private
 */
function _assertAndSanitizeOptions(options) {

  options.tmpdir = _getTmpDir(options);

  const tmpDir = options.tmpdir;

  /* istanbul ignore else */
  if (!_isUndefined(options.name))
    _assertIsRelative(options.name, 'name', tmpDir);
  /* istanbul ignore else */
  if (!_isUndefined(options.dir))
    _assertIsRelative(options.dir, 'dir', tmpDir);
  /* istanbul ignore else */
  if (!_isUndefined(options.template)) {
    _assertIsRelative(options.template, 'template', tmpDir);
    if (!options.template.match(TEMPLATE_PATTERN))
      throw new Error(`Invalid template, found "${options.template}".`);
  }
  /* istanbul ignore else */
  if (!_isUndefined(options.tries) && isNaN(options.tries) || options.tries < 0)
    throw new Error(`Invalid tries, found "${options.tries}".`);

  // if a name was specified we will try once
  options.tries = _isUndefined(options.name) ? options.tries || DEFAULT_TRIES : 1;
  options.keep = !!options.keep;
  options.detachDescriptor = !!options.detachDescriptor;
  options.discardDescriptor = !!options.discardDescriptor;
  options.unsafeCleanup = !!options.unsafeCleanup;

  // sanitize dir, also keep (multiple) blanks if the user, purportedly sane, requests us to
  options.dir = _isUndefined(options.dir) ? '' : path.relative(tmpDir, _resolvePath(options.dir, tmpDir));
  options.template = _isUndefined(options.template) ? undefined : path.relative(tmpDir, _resolvePath(options.template, tmpDir));
  // sanitize further if template is relative to options.dir
  options.template = _isBlank(options.template) ? undefined : path.relative(options.dir, options.template);

  // for completeness' sake only, also keep (multiple) blanks if the user, purportedly sane, requests us to
  options.name = _isUndefined(options.name) ? undefined : options.name;
  options.prefix = _isUndefined(options.prefix) ? '' : options.prefix;
  options.postfix = _isUndefined(options.postfix) ? '' : options.postfix;
}

/**
 * Resolve the specified path name in respect to tmpDir.
 *
 * The specified name might include relative path components, e.g. ../
 * so we need to resolve in order to be sure that is is located inside tmpDir
 *
 * @param name
 * @param tmpDir
 * @returns {string}
 * @private
 */
function _resolvePath(name, tmpDir) {
  if (name.startsWith(tmpDir)) {
    return path.resolve(name);
  } else {
    return path.resolve(path.join(tmpDir, name));
  }
}

/**
 * Asserts whether specified name is relative to the specified tmpDir.
 *
 * @param {string} name
 * @param {string} option
 * @param {string} tmpDir
 * @throws {Error}
 * @private
 */
function _assertIsRelative(name, option, tmpDir) {
  if (option === 'name') {
    // assert that name is not absolute and does not contain a path
    if (path.isAbsolute(name))
      throw new Error(`${option} option must not contain an absolute path, found "${name}".`);
    // must not fail on valid .<name> or ..<name> or similar such constructs
    let basename = path.basename(name);
    if (basename === '..' || basename === '.' || basename !== name)
      throw new Error(`${option} option must not contain a path, found "${name}".`);
  }
  else { // if (option === 'dir' || option === 'template') {
    // assert that dir or template are relative to tmpDir
    if (path.isAbsolute(name) && !name.startsWith(tmpDir)) {
      throw new Error(`${option} option must be relative to "${tmpDir}", found "${name}".`);
    }
    let resolvedPath = _resolvePath(name, tmpDir);
    if (!resolvedPath.startsWith(tmpDir))
      throw new Error(`${option} option must be relative to "${tmpDir}", found "${resolvedPath}".`);
  }
}

/**
 * Helper for testing against EBADF to compensate changes made to Node 7.x under Windows.
 *
 * @private
 */
function _isEBADF(error) {
  return _isExpectedError(error, -EBADF, 'EBADF');
}

/**
 * Helper for testing against ENOENT to compensate changes made to Node 7.x under Windows.
 *
 * @private
 */
function _isENOENT(error) {
  return _isExpectedError(error, -ENOENT, 'ENOENT');
}

/**
 * Helper to determine whether the expected error code matches the actual code and errno,
 * which will differ between the supported node versions.
 *
 * - Node >= 7.0:
 *   error.code {string}
 *   error.errno {number} any numerical value will be negated
 *
 * CAVEAT
 *
 * On windows, the errno for EBADF is -4083 but os.constants.errno.EBADF is different and we must assume that ENOENT
 * is no different here.
 *
 * @param {SystemError} error
 * @param {number} errno
 * @param {string} code
 * @private
 */
function _isExpectedError(error, errno, code) {
  return IS_WIN32 ? error.code === code : error.code === code && error.errno === errno;
}

/**
 * Sets the graceful cleanup.
 *
 * If graceful cleanup is set, tmp will remove all controlled temporary objects on process exit, otherwise the
 * temporary objects will remain in place, waiting to be cleaned up on system restart or otherwise scheduled temporary
 * object removals.
 */
function setGracefulCleanup() {
  _gracefulCleanup = true;
}

/**
 * Returns the currently configured tmp dir from os.tmpdir().
 *
 * @private
 * @param {?Options} options
 * @returns {string} the currently configured tmp dir
 */
function _getTmpDir(options) {
  return path.resolve(options && options.tmpdir || os.tmpdir());
}

// Install process exit listener
process.addListener(EXIT, _garbageCollector);

/**
 * Configuration options.
 *
 * @typedef {Object} Options
 * @property {?boolean} keep the temporary object (file or dir) will not be garbage collected
 * @property {?number} tries the number of tries before give up the name generation
 * @property (?int) mode the access mode, defaults are 0o700 for directories and 0o600 for files
 * @property {?string} template the "mkstemp" like filename template
 * @property {?string} name fixed name relative to tmpdir or the specified dir option
 * @property {?string} dir tmp directory relative to the root tmp directory in use
 * @property {?string} prefix prefix for the generated name
 * @property {?string} postfix postfix for the generated name
 * @property {?string} tmpdir the root tmp directory which overrides the os tmpdir
 * @property {?boolean} unsafeCleanup recursively removes the created temporary directory, even when it's not empty
 * @property {?boolean} detachDescriptor detaches the file descriptor, caller is responsible for closing the file, tmp will no longer try closing the file during garbage collection
 * @property {?boolean} discardDescriptor discards the file descriptor (closes file, fd is -1), tmp will no longer try closing the file during garbage collection
 */

/**
 * @typedef {Object} FileSyncObject
 * @property {string} name the name of the file
 * @property {string} fd the file descriptor or -1 if the fd has been discarded
 * @property {fileCallback} removeCallback the callback function to remove the file
 */

/**
 * @typedef {Object} DirSyncObject
 * @property {string} name the name of the directory
 * @property {fileCallback} removeCallback the callback function to remove the directory
 */

/**
 * @callback tmpNameCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 */

/**
 * @callback fileCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {number} fd the file descriptor or -1 if the fd had been discarded
 * @param {cleanupCallback} fn the cleanup callback function
 */

/**
 * @callback fileCallbackSync
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {number} fd the file descriptor or -1 if the fd had been discarded
 * @param {cleanupCallbackSync} fn the cleanup callback function
 */

/**
 * @callback dirCallback
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {cleanupCallback} fn the cleanup callback function
 */

/**
 * @callback dirCallbackSync
 * @param {?Error} err the error object if anything goes wrong
 * @param {string} name the temporary file name
 * @param {cleanupCallbackSync} fn the cleanup callback function
 */

/**
 * Removes the temporary created file or directory.
 *
 * @callback cleanupCallback
 * @param {simpleCallback} [next] function to call whenever the tmp object needs to be removed
 */

/**
 * Removes the temporary created file or directory.
 *
 * @callback cleanupCallbackSync
 */

/**
 * Callback function for function composition.
 * @see {@link https://github.com/raszi/node-tmp/issues/57|raszi/node-tmp#57}
 *
 * @callback simpleCallback
 */

// exporting all the needed methods

// evaluate _getTmpDir() lazily, mainly for simplifying testing but it also will
// allow users to reconfigure the temporary directory
Object.defineProperty(module.exports, "tmpdir", ({
  enumerable: true,
  configurable: false,
  get: function () {
    return _getTmpDir();
  }
}));

module.exports.dir = dir;
module.exports.dirSync = dirSync;

module.exports.file = file;
module.exports.fileSync = fileSync;

module.exports.tmpName = tmpName;
module.exports.tmpNameSync = tmpNameSync;

module.exports.setGracefulCleanup = setGracefulCleanup;


/***/ })

};
;