/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/dat.gui/build/dat.gui.module.js":
/*!**********************************************************!*\
  !*** ../../node_modules/dat.gui/build/dat.gui.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GUI": () => (/* binding */ GUI$1),
/* harmony export */   "color": () => (/* binding */ color),
/* harmony export */   "controllers": () => (/* binding */ controllers),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "dom": () => (/* binding */ dom$1),
/* harmony export */   "gui": () => (/* binding */ gui)
/* harmony export */ });
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return obj instanceof Function;
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
      this.__state.space = 'HEX';
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);
//# sourceMappingURL=dat.gui.module.js.map


/***/ }),

/***/ "../../node_modules/park-miller/index.js":
/*!***********************************************!*\
  !*** ../../node_modules/park-miller/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";

const MAX_INT32 = 2147483647;
const MINSTD = 16807;

class ParkMiller {
	constructor(seed) {
		if (!Number.isInteger(seed)) {
			throw new TypeError('Expected `seed` to be a `integer`');
		}

		this._seed = seed % MAX_INT32;

		if (this._seed <= 0) {
			this._seed += (MAX_INT32 - 1);
		}
	}

	integer() {
		this._seed *= MINSTD;
		this._seed %= MAX_INT32;
		return this._seed;
	}

	integerInRange(min, max) {
		return Math.round(this.floatInRange(min, max));
	}

	float() {
		return (this.integer() - 1) / (MAX_INT32 - 1);
	}

	floatInRange(min, max) {
		return min + ((max - min) * this.float());
	}

	boolean() {
		return this.integer() % 2 === 0;
	}
}

module.exports = ParkMiller;


/***/ }),

/***/ "../../node_modules/source-map-js/lib/array-set.js":
/*!*********************************************************!*\
  !*** ../../node_modules/source-map-js/lib/array-set.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../node_modules/source-map-js/lib/util.js");
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),

/***/ "../../node_modules/source-map-js/lib/base64-vlq.js":
/*!**********************************************************!*\
  !*** ../../node_modules/source-map-js/lib/base64-vlq.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(/*! ./base64 */ "../../node_modules/source-map-js/lib/base64.js");

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),

/***/ "../../node_modules/source-map-js/lib/base64.js":
/*!******************************************************!*\
  !*** ../../node_modules/source-map-js/lib/base64.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),

/***/ "../../node_modules/source-map-js/lib/mapping-list.js":
/*!************************************************************!*\
  !*** ../../node_modules/source-map-js/lib/mapping-list.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../node_modules/source-map-js/lib/util.js");

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),

/***/ "../../node_modules/source-map-js/lib/source-map-generator.js":
/*!********************************************************************!*\
  !*** ../../node_modules/source-map-js/lib/source-map-generator.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "../../node_modules/source-map-js/lib/base64-vlq.js");
var util = __webpack_require__(/*! ./util */ "../../node_modules/source-map-js/lib/util.js");
var ArraySet = (__webpack_require__(/*! ./array-set */ "../../node_modules/source-map-js/lib/array-set.js").ArraySet);
var MappingList = (__webpack_require__(/*! ./mapping-list */ "../../node_modules/source-map-js/lib/mapping-list.js").MappingList);

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),

/***/ "../../node_modules/source-map-js/lib/util.js":
/*!****************************************************!*\
  !*** ../../node_modules/source-map-js/lib/util.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

var MAX_CACHED_INPUTS = 32;

/**
 * Takes some function `f(input) -> result` and returns a memoized version of
 * `f`.
 *
 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
 * memoization is a dumb-simple, linear least-recently-used cache.
 */
function lruMemoize(f) {
  var cache = [];

  return function(input) {
    for (var i = 0; i < cache.length; i++) {
      if (cache[i].input === input) {
        var temp = cache[0];
        cache[0] = cache[i];
        cache[i] = temp;
        return cache[0].result;
      }
    }

    var result = f(input);

    cache.unshift({
      input,
      result,
    });

    if (cache.length > MAX_CACHED_INPUTS) {
      cache.pop();
    }

    return result;
  };
}

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
var normalize = lruMemoize(function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);
  // Split the path into parts between `/` characters. This is much faster than
  // using `.split(/\/+/g)`.
  var parts = [];
  var start = 0;
  var i = 0;
  while (true) {
    start = i;
    i = path.indexOf("/", start);
    if (i === -1) {
      parts.push(path.slice(start));
      break;
    } else {
      parts.push(path.slice(start, i));
      while (i < path.length && path[i] === "/") {
        i++;
      }
    }
  }

  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
});
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
  var cmp

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),

/***/ "./canvas.ts":
/*!*******************!*\
  !*** ./canvas.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCanvas": () => (/* binding */ createCanvas),
/* harmony export */   "drawOptions": () => (/* binding */ drawOptions)
/* harmony export */ });
/* harmony import */ var _snk_draw_drawWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/draw/drawWorld */ "../draw/drawWorld.ts");

const drawOptions = {
    sizeBorderRadius: 2,
    sizeCell: 16,
    sizeDot: 12,
    colorBorder: "#1b1f230a",
    colorDots: {
        1: "#9be9a8",
        2: "#40c463",
        3: "#30a14e",
        4: "#216e39",
    },
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
    dark: {
        colorEmpty: "#161b22",
        colorDots: { 1: "#01311f", 2: "#034525", 3: "#0f6d31", 4: "#00c647" },
    },
};
const getPointedCell = (canvas) => ({ pageX, pageY }) => {
    const { left, top } = canvas.getBoundingClientRect();
    const x = Math.floor((pageX - left) / drawOptions.sizeCell) - 1;
    const y = Math.floor((pageY - top) / drawOptions.sizeCell) - 2;
    return { x, y };
};
const createCanvas = ({ width, height, }) => {
    const canvas = document.createElement("canvas");
    const upscale = 2;
    const w = drawOptions.sizeCell * (width + 4);
    const h = drawOptions.sizeCell * (height + 4) + 200;
    canvas.width = w * upscale;
    canvas.height = h * upscale;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.style.display = "block";
    // canvas.style.pointerEvents = "none";
    const cellInfo = document.createElement("div");
    cellInfo.style.height = "20px";
    document.body.appendChild(cellInfo);
    document.body.appendChild(canvas);
    canvas.addEventListener("mousemove", (e) => {
        const { x, y } = getPointedCell(canvas)(e);
        cellInfo.innerText = [x, y]
            .map((u) => u.toString().padStart(2, " "))
            .join(" / ");
    });
    const ctx = canvas.getContext("2d");
    ctx.scale(upscale, upscale);
    const draw = (grid, snake, stack) => {
        ctx.clearRect(0, 0, 9999, 9999);
        (0,_snk_draw_drawWorld__WEBPACK_IMPORTED_MODULE_0__.drawWorld)(ctx, grid, snake, stack, drawOptions);
    };
    const drawLerp = (grid, snake0, snake1, stack, k) => {
        ctx.clearRect(0, 0, 9999, 9999);
        (0,_snk_draw_drawWorld__WEBPACK_IMPORTED_MODULE_0__.drawLerpWorld)(ctx, grid, snake0, snake1, stack, k, drawOptions);
    };
    const highlightCell = (x, y, color = "orange") => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.fillRect((1 + x + 0.5) * 16 - 2, (2 + y + 0.5) * 16 - 2, 4, 4);
    };
    return {
        draw,
        drawLerp,
        highlightCell,
        canvas,
        getPointedCell: getPointedCell(canvas),
        ctx,
    };
};


/***/ }),

/***/ "./menu.ts":
/*!*****************!*\
  !*** ./menu.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gui": () => (/* binding */ gui)
/* harmony export */ });
/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dat.gui */ "../../node_modules/dat.gui/build/dat.gui.module.js");
/* harmony import */ var _snk_types_fixtures_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/__fixtures__/grid */ "../types/__fixtures__/grid.ts");
/* harmony import */ var _snk_types_fixtures_snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @snk/types/__fixtures__/snake */ "../types/__fixtures__/snake.ts");
/* harmony import */ var _sample__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sample */ "./sample.ts");




const demos = __webpack_require__(/*! ./demo.json */ "./demo.json");
const gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__.GUI();
const config = {
    snake: Object.entries(_snk_types_fixtures_snake__WEBPACK_IMPORTED_MODULE_2__).find(([_, s]) => s === _sample__WEBPACK_IMPORTED_MODULE_3__.snake)[0],
    grid: Object.entries(_snk_types_fixtures_grid__WEBPACK_IMPORTED_MODULE_1__).find(([_, s]) => s === _sample__WEBPACK_IMPORTED_MODULE_3__.grid)[0],
    demo: demos[0],
};
{
    const d = window.location.pathname.match(/(\w+)\.html/);
    if (d && demos.includes(d[1]))
        config.demo = d[1];
}
const onChange = () => {
    const search = new URLSearchParams({
        snake: config.snake,
        grid: config.grid,
    }).toString();
    const url = new URL(config.demo + ".html?" + search, window.location.href).toString();
    window.location.href = url;
};
gui.add(config, "demo", demos).onChange(onChange);
gui.add(config, "grid", Object.keys(_snk_types_fixtures_grid__WEBPACK_IMPORTED_MODULE_1__)).onChange(onChange);
gui.add(config, "snake", Object.keys(_snk_types_fixtures_snake__WEBPACK_IMPORTED_MODULE_2__)).onChange(onChange);


/***/ }),

/***/ "./sample.ts":
/*!*******************!*\
  !*** ./sample.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "grid": () => (/* binding */ grid),
/* harmony export */   "snake": () => (/* binding */ snake)
/* harmony export */ });
/* harmony import */ var _snk_types_fixtures_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/__fixtures__/grid */ "../types/__fixtures__/grid.ts");
/* harmony import */ var _snk_types_fixtures_snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/__fixtures__/snake */ "../types/__fixtures__/snake.ts");


const sp = new URLSearchParams(window.location.search);
const gLabel = sp.get("grid") || "simple";
const sLabel = sp.get("snake") || "snake3";
//@ts-ignore
const grid = _snk_types_fixtures_grid__WEBPACK_IMPORTED_MODULE_0__[gLabel] || _snk_types_fixtures_grid__WEBPACK_IMPORTED_MODULE_0__.simple;
//@ts-ignore
const snake = _snk_types_fixtures_snake__WEBPACK_IMPORTED_MODULE_1__[sLabel] || _snk_types_fixtures_snake__WEBPACK_IMPORTED_MODULE_1__.snake3;


/***/ }),

/***/ "../draw/drawGrid.ts":
/*!***************************!*\
  !*** ../draw/drawGrid.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawGrid": () => (/* binding */ drawGrid)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _pathRoundedRect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathRoundedRect */ "../draw/pathRoundedRect.ts");


const drawGrid = (ctx, grid, o) => {
    for (let x = grid.width; x--;)
        for (let y = grid.height; y--;) {
            if (!o.cells || o.cells.some((c) => c.x === x && c.y === y)) {
                const c = (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y);
                // @ts-ignore
                const color = !c ? o.colorEmpty : o.colorDots[c];
                ctx.save();
                ctx.translate(x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2, y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2);
                ctx.fillStyle = color;
                ctx.strokeStyle = o.colorBorder;
                ctx.lineWidth = 1;
                ctx.beginPath();
                (0,_pathRoundedRect__WEBPACK_IMPORTED_MODULE_1__.pathRoundedRect)(ctx, o.sizeDot, o.sizeDot, o.sizeBorderRadius);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
};


/***/ }),

/***/ "../draw/drawSnake.ts":
/*!****************************!*\
  !*** ../draw/drawSnake.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawSnake": () => (/* binding */ drawSnake),
/* harmony export */   "drawSnakeLerp": () => (/* binding */ drawSnakeLerp)
/* harmony export */ });
/* harmony import */ var _pathRoundedRect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathRoundedRect */ "../draw/pathRoundedRect.ts");
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");


const drawSnake = (ctx, snake, o) => {
    const cells = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.snakeToCells)(snake);
    for (let i = 0; i < cells.length; i++) {
        const u = (i + 1) * 0.6;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(cells[i].x * o.sizeCell + u, cells[i].y * o.sizeCell + u);
        ctx.beginPath();
        (0,_pathRoundedRect__WEBPACK_IMPORTED_MODULE_0__.pathRoundedRect)(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
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
        (0,_pathRoundedRect__WEBPACK_IMPORTED_MODULE_0__.pathRoundedRect)(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
        ctx.fill();
        ctx.restore();
    }
};


/***/ }),

/***/ "../draw/drawWorld.ts":
/*!****************************!*\
  !*** ../draw/drawWorld.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawLerpWorld": () => (/* binding */ drawLerpWorld),
/* harmony export */   "drawStack": () => (/* binding */ drawStack),
/* harmony export */   "drawWorld": () => (/* binding */ drawWorld),
/* harmony export */   "getCanvasWorldSize": () => (/* binding */ getCanvasWorldSize)
/* harmony export */ });
/* harmony import */ var _drawGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawGrid */ "../draw/drawGrid.ts");
/* harmony import */ var _drawSnake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawSnake */ "../draw/drawSnake.ts");


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
const drawWorld = (ctx, grid, snake, stack, o) => {
    ctx.save();
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    (0,_drawGrid__WEBPACK_IMPORTED_MODULE_0__.drawGrid)(ctx, grid, o);
    (0,_drawSnake__WEBPACK_IMPORTED_MODULE_1__.drawSnake)(ctx, snake, o);
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
const drawLerpWorld = (ctx, grid, snake0, snake1, stack, k, o) => {
    ctx.save();
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    (0,_drawGrid__WEBPACK_IMPORTED_MODULE_0__.drawGrid)(ctx, grid, o);
    (0,_drawSnake__WEBPACK_IMPORTED_MODULE_1__.drawSnakeLerp)(ctx, snake0, snake1, k, o);
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


/***/ }),

/***/ "../draw/pathRoundedRect.ts":
/*!**********************************!*\
  !*** ../draw/pathRoundedRect.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pathRoundedRect": () => (/* binding */ pathRoundedRect)
/* harmony export */ });
const pathRoundedRect = (ctx, width, height, borderRadius) => {
    ctx.moveTo(borderRadius, 0);
    ctx.arcTo(width, 0, width, height, borderRadius);
    ctx.arcTo(width, height, 0, height, borderRadius);
    ctx.arcTo(0, height, 0, 0, borderRadius);
    ctx.arcTo(0, 0, width, 0, borderRadius);
};


/***/ }),

/***/ "../solver/clearCleanColoredLayer.ts":
/*!*******************************************!*\
  !*** ../solver/clearCleanColoredLayer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearCleanColoredLayer": () => (/* binding */ clearCleanColoredLayer),
/* harmony export */   "getTunnellablePoints": () => (/* binding */ getTunnellablePoints)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");
/* harmony import */ var _snk_types_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @snk/types/point */ "../types/point.ts");
/* harmony import */ var _getBestTunnel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBestTunnel */ "../solver/getBestTunnel.ts");
/* harmony import */ var _outside__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./outside */ "../solver/outside.ts");





const clearCleanColoredLayer = (grid, outside, snake0, color) => {
    const snakeN = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getSnakeLength)(snake0);
    const points = getTunnellablePoints(grid, outside, snakeN, color);
    const chain = [snake0];
    while (points.length) {
        const path = getPathToNextPoint(grid, chain[0], color, points);
        path.pop();
        for (const snake of path)
            setEmptySafe(grid, (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadX)(snake), (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadY)(snake));
        chain.unshift(...path);
    }
    (0,_outside__WEBPACK_IMPORTED_MODULE_4__.fillOutside)(outside, grid);
    chain.pop();
    return chain;
};
const unwrap = (m) => !m ? [] : [m.snake, ...unwrap(m.parent)];
const getPathToNextPoint = (grid, snake0, color, points) => {
    const closeList = [];
    const openList = [{ snake: snake0 }];
    while (openList.length) {
        const o = openList.shift();
        const x = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadX)(o.snake);
        const y = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadY)(o.snake);
        const i = points.findIndex((p) => p.x === x && p.y === y);
        if (i >= 0) {
            points.splice(i, 1);
            return unwrap(o);
        }
        for (const { x: dx, y: dy } of _snk_types_point__WEBPACK_IMPORTED_MODULE_2__.around4) {
            if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInsideLarge)(grid, 2, x + dx, y + dy) &&
                !(0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.snakeWillSelfCollide)(o.snake, dx, dy) &&
                getColorSafe(grid, x + dx, y + dy) <= color) {
                const snake = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.nextSnake)(o.snake, dx, dy);
                if (!closeList.some((s0) => (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.snakeEquals)(s0, snake))) {
                    closeList.push(snake);
                    openList.push({ snake, parent: o });
                }
            }
        }
    }
};
/**
 * get all cells that are tunnellable
 */
const getTunnellablePoints = (grid, outside, snakeN, color) => {
    const points = [];
    for (let x = grid.width; x--;)
        for (let y = grid.height; y--;) {
            const c = (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y);
            if (!(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(c) &&
                c <= color &&
                !points.some((p) => p.x === x && p.y === y)) {
                const tunnel = (0,_getBestTunnel__WEBPACK_IMPORTED_MODULE_3__.getBestTunnel)(grid, outside, x, y, color, snakeN);
                if (tunnel)
                    for (const p of tunnel)
                        if (!isEmptySafe(grid, p.x, p.y))
                            points.push(p);
            }
        }
    return points;
};
const getColorSafe = (grid, x, y) => (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y) ? (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y) : 0;
const setEmptySafe = (grid, x, y) => {
    if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y))
        (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.setColorEmpty)(grid, x, y);
};
const isEmptySafe = (grid, x, y) => !(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y) && (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y));


/***/ }),

/***/ "../solver/clearResidualColoredLayer.ts":
/*!**********************************************!*\
  !*** ../solver/clearResidualColoredLayer.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearResidualColoredLayer": () => (/* binding */ clearResidualColoredLayer),
/* harmony export */   "getPriority": () => (/* binding */ getPriority),
/* harmony export */   "getTunnellablePoints": () => (/* binding */ getTunnellablePoints)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");
/* harmony import */ var _getBestTunnel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getBestTunnel */ "../solver/getBestTunnel.ts");
/* harmony import */ var _outside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./outside */ "../solver/outside.ts");
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tunnel */ "../solver/tunnel.ts");
/* harmony import */ var _getPathTo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getPathTo */ "../solver/getPathTo.ts");






const clearResidualColoredLayer = (grid, outside, snake0, color) => {
    const snakeN = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getSnakeLength)(snake0);
    const tunnels = getTunnellablePoints(grid, outside, snakeN, color);
    // sort
    tunnels.sort((a, b) => b.priority - a.priority);
    const chain = [snake0];
    while (tunnels.length) {
        // get the best next tunnel
        let t = getNextTunnel(tunnels, chain[0]);
        // goes to the start of the tunnel
        chain.unshift(...(0,_getPathTo__WEBPACK_IMPORTED_MODULE_5__.getPathTo)(grid, chain[0], t[0].x, t[0].y));
        // goes to the end of the tunnel
        chain.unshift(...(0,_tunnel__WEBPACK_IMPORTED_MODULE_4__.getTunnelPath)(chain[0], t));
        // update grid
        for (const { x, y } of t)
            setEmptySafe(grid, x, y);
        // update outside
        (0,_outside__WEBPACK_IMPORTED_MODULE_3__.fillOutside)(outside, grid);
        // update tunnels
        for (let i = tunnels.length; i--;)
            if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, tunnels[i].x, tunnels[i].y)))
                tunnels.splice(i, 1);
            else {
                const t = tunnels[i];
                const tunnel = (0,_getBestTunnel__WEBPACK_IMPORTED_MODULE_2__.getBestTunnel)(grid, outside, t.x, t.y, color, snakeN);
                if (!tunnel)
                    tunnels.splice(i, 1);
                else {
                    t.tunnel = tunnel;
                    t.priority = getPriority(grid, color, tunnel);
                }
            }
        // re-sort
        tunnels.sort((a, b) => b.priority - a.priority);
    }
    chain.pop();
    return chain;
};
const getNextTunnel = (ts, snake) => {
    let minDistance = Infinity;
    let closestTunnel = null;
    const x = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadX)(snake);
    const y = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadY)(snake);
    const priority = ts[0].priority;
    for (let i = 0; ts[i] && ts[i].priority === priority; i++) {
        const t = ts[i].tunnel;
        const d = distanceSq(t[0].x, t[0].y, x, y);
        if (d < minDistance) {
            minDistance = d;
            closestTunnel = t;
        }
    }
    return closestTunnel;
};
/**
 * get all the tunnels for all the cells accessible
 */
const getTunnellablePoints = (grid, outside, snakeN, color) => {
    const points = [];
    for (let x = grid.width; x--;)
        for (let y = grid.height; y--;) {
            const c = (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y);
            if (!(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(c) && c < color) {
                const tunnel = (0,_getBestTunnel__WEBPACK_IMPORTED_MODULE_2__.getBestTunnel)(grid, outside, x, y, color, snakeN);
                if (tunnel) {
                    const priority = getPriority(grid, color, tunnel);
                    points.push({ x, y, priority, tunnel });
                }
            }
        }
    return points;
};
/**
 * get the score of the tunnel
 * prioritize tunnel with maximum color smaller than <color> and with minimum <color>
 * with some tweaks
 */
const getPriority = (grid, color, tunnel) => {
    let nColor = 0;
    let nLess = 0;
    for (let i = 0; i < tunnel.length; i++) {
        const { x, y } = tunnel[i];
        const c = getColorSafe(grid, x, y);
        if (!(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(c) && i === tunnel.findIndex((p) => p.x === x && p.y === y)) {
            if (c === color)
                nColor += 1;
            else
                nLess += color - c;
        }
    }
    if (nColor === 0)
        return 99999;
    return nLess / nColor;
};
const distanceSq = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;
const getColorSafe = (grid, x, y) => (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y) ? (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y) : 0;
const setEmptySafe = (grid, x, y) => {
    if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y))
        (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.setColorEmpty)(grid, x, y);
};


/***/ }),

/***/ "../solver/getBestRoute.ts":
/*!*********************************!*\
  !*** ../solver/getBestRoute.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBestRoute": () => (/* binding */ getBestRoute)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _outside__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./outside */ "../solver/outside.ts");
/* harmony import */ var _clearResidualColoredLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clearResidualColoredLayer */ "../solver/clearResidualColoredLayer.ts");
/* harmony import */ var _clearCleanColoredLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clearCleanColoredLayer */ "../solver/clearCleanColoredLayer.ts");




const getBestRoute = (grid0, snake0) => {
    const grid = (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.copyGrid)(grid0);
    const outside = (0,_outside__WEBPACK_IMPORTED_MODULE_1__.createOutside)(grid);
    const chain = [snake0];
    for (const color of extractColors(grid)) {
        if (color > 1)
            chain.unshift(...(0,_clearResidualColoredLayer__WEBPACK_IMPORTED_MODULE_2__.clearResidualColoredLayer)(grid, outside, chain[0], color));
        chain.unshift(...(0,_clearCleanColoredLayer__WEBPACK_IMPORTED_MODULE_3__.clearCleanColoredLayer)(grid, outside, chain[0], color));
    }
    return chain.reverse();
};
const extractColors = (grid) => {
    // @ts-ignore
    let maxColor = Math.max(...grid.data);
    return Array.from({ length: maxColor }, (_, i) => (i + 1));
};


/***/ }),

/***/ "../solver/getBestTunnel.ts":
/*!**********************************!*\
  !*** ../solver/getBestTunnel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBestTunnel": () => (/* binding */ getBestTunnel)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _snk_types_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/point */ "../types/point.ts");
/* harmony import */ var _utils_sortPush__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/sortPush */ "../solver/utils/sortPush.ts");
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");
/* harmony import */ var _outside__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./outside */ "../solver/outside.ts");
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tunnel */ "../solver/tunnel.ts");






const getColorSafe = (grid, x, y) => (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y) ? (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y) : 0;
const setEmptySafe = (grid, x, y) => {
    if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y))
        (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.setColorEmpty)(grid, x, y);
};
const unwrap = (m) => !m
    ? []
    : [...unwrap(m.parent), { x: (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.getHeadX)(m.snake), y: (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.getHeadY)(m.snake) }];
/**
 * returns the path to reach the outside which contains the least color cell
 */
const getSnakeEscapePath = (grid, outside, snake0, color) => {
    const openList = [{ snake: snake0, w: 0 }];
    const closeList = [];
    while (openList[0]) {
        const o = openList.shift();
        const x = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.getHeadX)(o.snake);
        const y = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.getHeadY)(o.snake);
        if ((0,_outside__WEBPACK_IMPORTED_MODULE_4__.isOutside)(outside, x, y))
            return unwrap(o);
        for (const a of _snk_types_point__WEBPACK_IMPORTED_MODULE_1__.around4) {
            const c = getColorSafe(grid, x + a.x, y + a.y);
            if (c <= color && !(0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.snakeWillSelfCollide)(o.snake, a.x, a.y)) {
                const snake = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.nextSnake)(o.snake, a.x, a.y);
                if (!closeList.some((s0) => (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.snakeEquals)(s0, snake))) {
                    const w = o.w + 1 + +(c === color) * 1000;
                    (0,_utils_sortPush__WEBPACK_IMPORTED_MODULE_2__.sortPush)(openList, { snake, w, parent: o }, (a, b) => a.w - b.w);
                    closeList.push(snake);
                }
            }
        }
    }
    return null;
};
/**
 * compute the best tunnel to get to the cell and back to the outside ( best = less usage of <color> )
 *
 * notice that it's one of the best tunnels, more with the same score could exist
 */
const getBestTunnel = (grid, outside, x, y, color, snakeN) => {
    const c = { x, y };
    const snake0 = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.createSnakeFromCells)(Array.from({ length: snakeN }, () => c));
    const one = getSnakeEscapePath(grid, outside, snake0, color);
    if (!one)
        return null;
    // get the position of the snake if it was going to leave the x,y cell
    const snakeICells = one.slice(0, snakeN);
    while (snakeICells.length < snakeN)
        snakeICells.push(snakeICells[snakeICells.length - 1]);
    const snakeI = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_3__.createSnakeFromCells)(snakeICells);
    // remove from the grid the colors that one eat
    const gridI = (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.copyGrid)(grid);
    for (const { x, y } of one)
        setEmptySafe(gridI, x, y);
    const two = getSnakeEscapePath(gridI, outside, snakeI, color);
    if (!two)
        return null;
    one.shift();
    one.reverse();
    one.push(...two);
    (0,_tunnel__WEBPACK_IMPORTED_MODULE_5__.trimTunnelStart)(grid, one);
    (0,_tunnel__WEBPACK_IMPORTED_MODULE_5__.trimTunnelEnd)(grid, one);
    return one;
};


/***/ }),

/***/ "../solver/getPathTo.ts":
/*!******************************!*\
  !*** ../solver/getPathTo.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPathTo": () => (/* binding */ getPathTo)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _snk_types_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/point */ "../types/point.ts");
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");
/* harmony import */ var _utils_sortPush__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/sortPush */ "../solver/utils/sortPush.ts");




/**
 * starting from snake0, get to the cell x,y
 * return the snake chain (reversed)
 */
const getPathTo = (grid, snake0, x, y) => {
    const openList = [{ snake: snake0, w: 0 }];
    const closeList = [];
    while (openList.length) {
        const c = openList.shift();
        const cx = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_2__.getHeadX)(c.snake);
        const cy = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_2__.getHeadY)(c.snake);
        for (let i = 0; i < _snk_types_point__WEBPACK_IMPORTED_MODULE_1__.around4.length; i++) {
            const { x: dx, y: dy } = _snk_types_point__WEBPACK_IMPORTED_MODULE_1__.around4[i];
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx === x && ny === y) {
                // unwrap
                const path = [(0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_2__.nextSnake)(c.snake, dx, dy)];
                let e = c;
                while (e.parent) {
                    path.push(e.snake);
                    e = e.parent;
                }
                return path;
            }
            if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInsideLarge)(grid, 2, nx, ny) &&
                !(0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_2__.snakeWillSelfCollide)(c.snake, dx, dy) &&
                (!(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, nx, ny) || (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, nx, ny)))) {
                const nsnake = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_2__.nextSnake)(c.snake, dx, dy);
                if (!closeList.some((s) => (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_2__.snakeEquals)(nsnake, s))) {
                    const w = c.w + 1;
                    const h = Math.abs(nx - x) + Math.abs(ny - y);
                    const f = w + h;
                    const o = { snake: nsnake, parent: c, w, h, f };
                    (0,_utils_sortPush__WEBPACK_IMPORTED_MODULE_3__.sortPush)(openList, o, (a, b) => a.f - b.f);
                    closeList.push(nsnake);
                }
            }
        }
    }
};


/***/ }),

/***/ "../solver/getPathToPose.ts":
/*!**********************************!*\
  !*** ../solver/getPathToPose.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPathToPose": () => (/* binding */ getPathToPose)
/* harmony export */ });
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tunnel */ "../solver/tunnel.ts");
/* harmony import */ var _snk_types_point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @snk/types/point */ "../types/point.ts");
/* harmony import */ var _utils_sortPush__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/sortPush */ "../solver/utils/sortPush.ts");





const isEmptySafe = (grid, x, y) => !(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_1__.isInside)(grid, x, y) || (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_1__.isEmpty)((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_1__.getColor)(grid, x, y));
const getPathToPose = (snake0, target, grid) => {
    if ((0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.snakeEquals)(snake0, target))
        return [];
    const targetCells = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.snakeToCells)(target).reverse();
    const snakeN = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getSnakeLength)(snake0);
    const box = {
        min: {
            x: Math.min((0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadX)(snake0), (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadX)(target)) - snakeN - 1,
            y: Math.min((0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadY)(snake0), (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadY)(target)) - snakeN - 1,
        },
        max: {
            x: Math.max((0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadX)(snake0), (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadX)(target)) + snakeN + 1,
            y: Math.max((0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadY)(snake0), (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadY)(target)) + snakeN + 1,
        },
    };
    const [t0, ...forbidden] = targetCells;
    forbidden.slice(0, 3);
    const openList = [{ snake: snake0, w: 0 }];
    const closeList = [];
    while (openList.length) {
        const o = openList.shift();
        const x = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadX)(o.snake);
        const y = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getHeadY)(o.snake);
        if (x === t0.x && y === t0.y) {
            const path = [];
            let e = o;
            while (e) {
                path.push(e.snake);
                e = e.parent;
            }
            path.unshift(...(0,_tunnel__WEBPACK_IMPORTED_MODULE_2__.getTunnelPath)(path[0], targetCells));
            path.pop();
            path.reverse();
            return path;
        }
        for (let i = 0; i < _snk_types_point__WEBPACK_IMPORTED_MODULE_3__.around4.length; i++) {
            const { x: dx, y: dy } = _snk_types_point__WEBPACK_IMPORTED_MODULE_3__.around4[i];
            const nx = x + dx;
            const ny = y + dy;
            if (!(0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.snakeWillSelfCollide)(o.snake, dx, dy) &&
                (!grid || isEmptySafe(grid, nx, ny)) &&
                (grid
                    ? (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_1__.isInsideLarge)(grid, 2, nx, ny)
                    : box.min.x <= nx &&
                        nx <= box.max.x &&
                        box.min.y <= ny &&
                        ny <= box.max.y) &&
                !forbidden.some((p) => p.x === nx && p.y === ny)) {
                const snake = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.nextSnake)(o.snake, dx, dy);
                if (!closeList.some((s) => (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.snakeEquals)(snake, s))) {
                    const w = o.w + 1;
                    const h = Math.abs(nx - x) + Math.abs(ny - y);
                    const f = w + h;
                    (0,_utils_sortPush__WEBPACK_IMPORTED_MODULE_4__.sortPush)(openList, { f, w, snake, parent: o }, (a, b) => a.f - b.f);
                    closeList.push(snake);
                }
            }
        }
    }
};


/***/ }),

/***/ "../solver/outside.ts":
/*!****************************!*\
  !*** ../solver/outside.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOutside": () => (/* binding */ createOutside),
/* harmony export */   "fillOutside": () => (/* binding */ fillOutside),
/* harmony export */   "isOutside": () => (/* binding */ isOutside)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _snk_types_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/point */ "../types/point.ts");


const createOutside = (grid, color = 0) => {
    const outside = (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.createEmptyGrid)(grid.width, grid.height);
    for (let x = outside.width; x--;)
        for (let y = outside.height; y--;)
            (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.setColor)(outside, x, y, 1);
    fillOutside(outside, grid, color);
    return outside;
};
const fillOutside = (outside, grid, color = 0) => {
    let changed = true;
    while (changed) {
        changed = false;
        for (let x = outside.width; x--;)
            for (let y = outside.height; y--;)
                if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y) <= color &&
                    !isOutside(outside, x, y) &&
                    _snk_types_point__WEBPACK_IMPORTED_MODULE_1__.around4.some((a) => isOutside(outside, x + a.x, y + a.y))) {
                    changed = true;
                    (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.setColorEmpty)(outside, x, y);
                }
    }
    return outside;
};
const isOutside = (outside, x, y) => !(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(outside, x, y) || (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(outside, x, y));


/***/ }),

/***/ "../solver/tunnel.ts":
/*!***************************!*\
  !*** ../solver/tunnel.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTunnelPath": () => (/* binding */ getTunnelPath),
/* harmony export */   "trimTunnelEnd": () => (/* binding */ trimTunnelEnd),
/* harmony export */   "trimTunnelStart": () => (/* binding */ trimTunnelStart),
/* harmony export */   "updateTunnel": () => (/* binding */ updateTunnel)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");


/**
 * get the sequence of snake to cross the tunnel
 */
const getTunnelPath = (snake0, tunnel) => {
    const chain = [];
    let snake = snake0;
    for (let i = 1; i < tunnel.length; i++) {
        const dx = tunnel[i].x - (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadX)(snake);
        const dy = tunnel[i].y - (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadY)(snake);
        snake = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.nextSnake)(snake, dx, dy);
        chain.unshift(snake);
    }
    return chain;
};
/**
 * assuming the grid change and the colors got deleted, update the tunnel
 */
const updateTunnel = (grid, tunnel, toDelete) => {
    while (tunnel.length) {
        const { x, y } = tunnel[0];
        if (isEmptySafe(grid, x, y) ||
            toDelete.some((p) => p.x === x && p.y === y)) {
            tunnel.shift();
        }
        else
            break;
    }
    while (tunnel.length) {
        const { x, y } = tunnel[tunnel.length - 1];
        if (isEmptySafe(grid, x, y) ||
            toDelete.some((p) => p.x === x && p.y === y)) {
            tunnel.pop();
        }
        else
            break;
    }
};
const isEmptySafe = (grid, x, y) => !(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y) || (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y));
/**
 * remove empty cell from start
 */
const trimTunnelStart = (grid, tunnel) => {
    while (tunnel.length) {
        const { x, y } = tunnel[0];
        if (isEmptySafe(grid, x, y))
            tunnel.shift();
        else
            break;
    }
};
/**
 * remove empty cell from end
 */
const trimTunnelEnd = (grid, tunnel) => {
    while (tunnel.length) {
        const i = tunnel.length - 1;
        const { x, y } = tunnel[i];
        if (isEmptySafe(grid, x, y) ||
            tunnel.findIndex((p) => p.x === x && p.y === y) < i)
            tunnel.pop();
        else
            break;
    }
};


/***/ }),

/***/ "../solver/utils/sortPush.ts":
/*!***********************************!*\
  !*** ../solver/utils/sortPush.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortPush": () => (/* binding */ sortPush)
/* harmony export */ });
const sortPush = (arr, x, sortFn) => {
    let a = 0;
    let b = arr.length;
    if (arr.length === 0 || sortFn(x, arr[a]) <= 0) {
        arr.unshift(x);
        return;
    }
    while (b - a > 1) {
        const e = Math.ceil((a + b) / 2);
        const s = sortFn(x, arr[e]);
        if (s === 0)
            a = b = e;
        else if (s > 0)
            a = e;
        else
            b = e;
    }
    const e = Math.ceil((a + b) / 2);
    arr.splice(e, 0, x);
};


/***/ }),

/***/ "../svg-creator/grid.ts":
/*!******************************!*\
  !*** ../svg-creator/grid.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGrid": () => (/* binding */ createGrid)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../svg-creator/utils.ts");

const percent = (x) => (x * 100).toFixed(2);
const createGrid = (cells, { sizeBorderRadius, sizeDot, sizeCell }, duration) => {
    const svgElements = [];
    const styles = [
        `.c{
      shape-rendering: geometricPrecision;
      rx: ${sizeBorderRadius};
      ry: ${sizeBorderRadius};
      fill: var(--ce);
      stroke-width: 1px;
      stroke: var(--cb);
      animation: none ${duration}ms linear infinite;
    }`,
    ];
    let i = 0;
    for (const { x, y, color, t } of cells) {
        const id = t && "c" + (i++).toString(36);
        const s = sizeCell;
        const d = sizeDot;
        const m = (s - d) / 2;
        if (t !== null) {
            const animationName = id;
            styles.push(`@keyframes ${animationName} {` +
                `${percent(t - 0.0001)}%{fill:var(--c${color})}` +
                `${percent(t + 0.0001)}%,100%{fill:var(--ce)}` +
                "}", `.c.${id}{fill: var(--c${color}); animation-name: ${animationName}}`);
        }
        svgElements.push((0,_utils__WEBPACK_IMPORTED_MODULE_0__.h)("rect", {
            class: ["c", id].filter(Boolean).join(" "),
            x: x * s + m,
            y: y * s + m,
            width: d,
            height: d,
        }));
    }
    return { svgElements, styles };
};


/***/ }),

/***/ "../svg-creator/index.ts":
/*!*******************************!*\
  !*** ../svg-creator/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSvg": () => (/* binding */ createSvg)
/* harmony export */ });
/* harmony import */ var _snk_types_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/grid */ "../types/grid.ts");
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snake */ "../svg-creator/snake.ts");
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grid */ "../svg-creator/grid.ts");
/* harmony import */ var _stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stack */ "../svg-creator/stack.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "../svg-creator/utils.ts");
/* harmony import */ var csso__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! csso */ "../../node_modules/csso/lib/index.js");







const getCellsFromGrid = ({ width, height }) => Array.from({ length: width }, (_, x) => Array.from({ length: height }, (_, y) => ({ x, y }))).flat();
const createLivingCells = (grid0, chain, drawOptions) => {
    var _a;
    const cells = ((_a = drawOptions.cells) !== null && _a !== void 0 ? _a : getCellsFromGrid(grid0)).map(({ x, y }) => ({
        x,
        y,
        t: null,
        color: (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid0, x, y),
    }));
    const grid = (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.copyGrid)(grid0);
    for (let i = 0; i < chain.length; i++) {
        const snake = chain[i];
        const x = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadX)(snake);
        const y = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_1__.getHeadY)(snake);
        if ((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isInside)(grid, x, y) && !(0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.getColor)(grid, x, y))) {
            (0,_snk_types_grid__WEBPACK_IMPORTED_MODULE_0__.setColorEmpty)(grid, x, y);
            const cell = cells.find((c) => c.x === x && c.y === y);
            cell.t = i / chain.length;
        }
    }
    return cells;
};
const createSvg = (grid, chain, drawOptions, gifOptions) => {
    const width = (grid.width + 2) * drawOptions.sizeCell;
    const height = (grid.height + 5) * drawOptions.sizeCell;
    const duration = gifOptions.frameDuration * chain.length;
    const cells = createLivingCells(grid, chain, drawOptions);
    const elements = [
        (0,_grid__WEBPACK_IMPORTED_MODULE_3__.createGrid)(cells, drawOptions, duration),
        (0,_stack__WEBPACK_IMPORTED_MODULE_4__.createStack)(cells, drawOptions, grid.width * drawOptions.sizeCell, (grid.height + 2) * drawOptions.sizeCell, duration),
        (0,_snake__WEBPACK_IMPORTED_MODULE_2__.createSnake)(chain, drawOptions, duration),
    ];
    const viewBox = [
        -drawOptions.sizeCell,
        -drawOptions.sizeCell * 2,
        width,
        height,
    ].join(" ");
    const style = generateColorVar(drawOptions) +
        elements
            .map((e) => e.styles)
            .flat()
            .join("\n");
    const svg = [
        (0,_utils__WEBPACK_IMPORTED_MODULE_5__.h)("svg", {
            viewBox,
            width,
            height,
            xmlns: "http://www.w3.org/2000/svg",
        }).replace("/>", ">"),
        "<style>",
        optimizeCss(style),
        "</style>",
        ...elements.map((e) => e.svgElements).flat(),
        "</svg>",
    ].join("");
    return optimizeSvg(svg);
};
const optimizeCss = (css) => csso__WEBPACK_IMPORTED_MODULE_6__.minify(css).css;
const optimizeSvg = (svg) => svg;
const generateColorVar = (drawOptions) => `
    :root {
    --cb: ${drawOptions.colorBorder};
    --cs: ${drawOptions.colorSnake};
    --ce: ${drawOptions.colorEmpty};
    ${Object.entries(drawOptions.colorDots)
    .map(([i, color]) => `--c${i}:${color};`)
    .join("")}
    }
    ` +
    (drawOptions.dark
        ? `
    @media (prefers-color-scheme: dark) {
      :root {
        --cb: ${drawOptions.dark.colorBorder || drawOptions.colorBorder};
        --cs: ${drawOptions.dark.colorSnake || drawOptions.colorSnake};
        --ce: ${drawOptions.dark.colorEmpty};
        ${Object.entries(drawOptions.dark.colorDots)
            .map(([i, color]) => `--c${i}:${color};`)
            .join("")}
      }
    }
`
        : "");


/***/ }),

/***/ "../svg-creator/snake.ts":
/*!*******************************!*\
  !*** ../svg-creator/snake.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSnake": () => (/* binding */ createSnake)
/* harmony export */ });
/* harmony import */ var _snk_types_snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snk/types/snake */ "../types/snake.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../svg-creator/utils.ts");


const percent = (x) => (x * 100).toFixed(2);
const lerp = (k, a, b) => (1 - k) * a + k * b;
const createSnake = (chain, { sizeCell, sizeDot }, duration) => {
    const snakeN = chain[0] ? (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.getSnakeLength)(chain[0]) : 0;
    const snakeParts = Array.from({ length: snakeN }, () => []);
    for (const snake of chain) {
        const cells = (0,_snk_types_snake__WEBPACK_IMPORTED_MODULE_0__.snakeToCells)(snake);
        for (let i = cells.length; i--;)
            snakeParts[i].push(cells[i]);
    }
    const svgElements = snakeParts.map((_, i, { length }) => {
        // compute snake part size
        const dMin = sizeDot * 0.8;
        const dMax = sizeCell * 0.9;
        const iMax = Math.min(4, length);
        const u = (1 - Math.min(i, iMax) / iMax) ** 2;
        const s = lerp(u, dMin, dMax);
        const m = (sizeCell - s) / 2;
        const r = Math.min(4.5, (4 * s) / sizeDot);
        return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.h)("rect", {
            class: `s s${i}`,
            x: m.toFixed(1),
            y: m.toFixed(1),
            width: s.toFixed(1),
            height: s.toFixed(1),
            rx: r.toFixed(1),
            ry: r.toFixed(1),
        });
    });
    const transform = ({ x, y }) => `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;
    const styles = [
        `.s{ 
      shape-rendering:geometricPrecision;
      fill:var(--cs);
      animation: none linear ${duration}ms infinite
    }`,
        ...snakeParts.map((positions, i) => {
            const id = `s${i}`;
            const animationName = id;
            return [
                `@keyframes ${animationName} {` +
                    removeInterpolatedPositions(positions.map((tr, i, { length }) => ({ ...tr, t: i / length })))
                        .map((p) => `${percent(p.t)}%{${transform(p)}}`)
                        .join("") +
                    "}",
                `.s.${id}{${transform(positions[0])};animation-name: ${animationName}}`,
            ];
        }),
    ].flat();
    return { svgElements, styles };
};
const removeInterpolatedPositions = (arr) => arr.filter((u, i, arr) => {
    if (i - 1 < 0 || i + 1 >= arr.length)
        return true;
    const a = arr[i - 1];
    const b = arr[i + 1];
    const ex = (a.x + b.x) / 2;
    const ey = (a.y + b.y) / 2;
    // return true;
    return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
});


/***/ }),

/***/ "../svg-creator/stack.ts":
/*!*******************************!*\
  !*** ../svg-creator/stack.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStack": () => (/* binding */ createStack)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../svg-creator/utils.ts");

const percent = (x) => (x * 100).toFixed(2);
const createStack = (cells, { sizeDot }, width, y, duration) => {
    const svgElements = [];
    const styles = [
        `.u{ 
      transform-origin: 0 0;
      transform: scale(0,1);
      animation: none linear ${duration}ms infinite;
    }`,
    ];
    const stack = cells
        .slice()
        .filter((a) => a.t !== null)
        .sort((a, b) => a.t - b.t);
    const blocks = [];
    stack.forEach(({ color, t }) => {
        const latest = blocks[blocks.length - 1];
        if ((latest === null || latest === void 0 ? void 0 : latest.color) === color)
            latest.ts.push(t);
        else
            blocks.push({ color, ts: [t] });
    });
    const m = width / stack.length;
    let i = 0;
    let nx = 0;
    for (const { color, ts } of blocks) {
        const id = "u" + (i++).toString(36);
        const animationName = id;
        const x = (nx * m).toFixed(1);
        nx += ts.length;
        svgElements.push((0,_utils__WEBPACK_IMPORTED_MODULE_0__.h)("rect", {
            class: `u ${id}`,
            height: sizeDot,
            width: (ts.length * m + 0.6).toFixed(1),
            x,
            y,
        }));
        styles.push(`@keyframes ${animationName} {` +
            [
                ...ts.map((t, i, { length }) => [
                    { scale: i / length, t: t - 0.0001 },
                    { scale: (i + 1) / length, t: t + 0.0001 },
                ]),
                [{ scale: 1, t: 1 }],
            ]
                .flat()
                .map(({ scale, t }) => `${percent(t)}%{transform:scale(${scale.toFixed(2)},1)}`)
                .join("\n") +
            "}", `.u.${id}{fill:var(--c${color});animation-name:${animationName};transform-origin:${x}px 0}`);
    }
    return { svgElements, styles };
};


/***/ }),

/***/ "../svg-creator/utils.ts":
/*!*******************************!*\
  !*** ../svg-creator/utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ h),
/* harmony export */   "toAttribute": () => (/* binding */ toAttribute)
/* harmony export */ });
const h = (element, attributes) => `<${element} ${toAttribute(attributes)}/>`;
const toAttribute = (o) => Object.entries(o)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");


/***/ }),

/***/ "../types/__fixtures__/createFromAscii.ts":
/*!************************************************!*\
  !*** ../types/__fixtures__/createFromAscii.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFromAscii": () => (/* binding */ createFromAscii)
/* harmony export */ });
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../grid */ "../types/grid.ts");

const createFromAscii = (ascii) => {
    const a = ascii.split("\n");
    if (a[0] === "")
        a.shift();
    const height = a.length;
    const width = Math.max(...a.map((r) => r.length));
    const grid = (0,_grid__WEBPACK_IMPORTED_MODULE_0__.createEmptyGrid)(width, height);
    for (let x = width; x--;)
        for (let y = height; y--;) {
            const c = a[y][x];
            const color = (c === "#" && 3) || (c === "@" && 2) || (c === "." && 1) || +c;
            if (c)
                (0,_grid__WEBPACK_IMPORTED_MODULE_0__.setColor)(grid, x, y, color);
        }
    return grid;
};


/***/ }),

/***/ "../types/__fixtures__/grid.ts":
/*!*************************************!*\
  !*** ../types/__fixtures__/grid.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closedO": () => (/* binding */ closedO),
/* harmony export */   "closedP": () => (/* binding */ closedP),
/* harmony export */   "closedU": () => (/* binding */ closedU),
/* harmony export */   "corner": () => (/* binding */ corner),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "enclaveBorder": () => (/* binding */ enclaveBorder),
/* harmony export */   "enclaveK": () => (/* binding */ enclaveK),
/* harmony export */   "enclaveM": () => (/* binding */ enclaveM),
/* harmony export */   "enclaveN": () => (/* binding */ enclaveN),
/* harmony export */   "enclaveU": () => (/* binding */ enclaveU),
/* harmony export */   "realistic": () => (/* binding */ realistic),
/* harmony export */   "realisticFull": () => (/* binding */ realisticFull),
/* harmony export */   "simple": () => (/* binding */ simple),
/* harmony export */   "small": () => (/* binding */ small),
/* harmony export */   "smallFull": () => (/* binding */ smallFull),
/* harmony export */   "smallPacked": () => (/* binding */ smallPacked),
/* harmony export */   "tunnels": () => (/* binding */ tunnels)
/* harmony export */ });
/* harmony import */ var park_miller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! park-miller */ "../../node_modules/park-miller/index.js");
/* harmony import */ var park_miller__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(park_miller__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../grid */ "../types/grid.ts");
/* harmony import */ var _randomlyFillGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../randomlyFillGrid */ "../types/randomlyFillGrid.ts");
/* harmony import */ var _createFromAscii__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createFromAscii */ "../types/__fixtures__/createFromAscii.ts");




const colors = [1, 2, 3];
// empty small grid
const empty = (0,_grid__WEBPACK_IMPORTED_MODULE_1__.createEmptyGrid)(5, 5);
// empty small grid with a unique color at the middle
const simple = (0,_grid__WEBPACK_IMPORTED_MODULE_1__.createEmptyGrid)(5, 5);
(0,_grid__WEBPACK_IMPORTED_MODULE_1__.setColor)(simple, 2, 2, 1);
// empty small grid with color at each corner
const corner = (0,_grid__WEBPACK_IMPORTED_MODULE_1__.createEmptyGrid)(5, 5);
(0,_grid__WEBPACK_IMPORTED_MODULE_1__.setColor)(corner, 0, 4, 1);
(0,_grid__WEBPACK_IMPORTED_MODULE_1__.setColor)(corner, 4, 0, 1);
(0,_grid__WEBPACK_IMPORTED_MODULE_1__.setColor)(corner, 4, 4, 1);
(0,_grid__WEBPACK_IMPORTED_MODULE_1__.setColor)(corner, 0, 0, 1);
const enclaveN = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

  #.#  
   #

`);
const enclaveBorder = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`
  #.#  
   #

`);
const enclaveM = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

   ###  
  #   #
  # . #
  #   #
   # #
`);
const enclaveK = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

  ####  
  # .#
  #  #
   # #
   # #
`);
const enclaveU = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

  ####  
  #..#
  #..#
   #.#
   # #          .
`);
const closedP = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

   ### 
  ##.#
  ## #
   ##
`);
const closedU = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

  ####  
  #..#
  #..#
   #.#
   ###
`);
const closedO = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

  #######  
  #     #
  #  .  #
  #     #
  #######
`);
const tunnels = (0,_createFromAscii__WEBPACK_IMPORTED_MODULE_3__.createFromAscii)(`

  ###   ###   ###    
  #.#   #.#   #.#
  #.#   ###   # #
`);
const createRandom = (width, height, emptyP) => {
    const grid = (0,_grid__WEBPACK_IMPORTED_MODULE_1__.createEmptyGrid)(width, height);
    const pm = new (park_miller__WEBPACK_IMPORTED_MODULE_0___default())(10);
    const random = pm.integerInRange.bind(pm);
    (0,_randomlyFillGrid__WEBPACK_IMPORTED_MODULE_2__.randomlyFillGrid)(grid, { colors, emptyP }, random);
    return grid;
};
// small realistic
const small = createRandom(10, 7, 3);
const smallPacked = createRandom(10, 7, 1);
const smallFull = createRandom(10, 7, 0);
// small realistic
const realistic = createRandom(52, 7, 3);
const realisticFull = createRandom(52, 7, 0);


/***/ }),

/***/ "../types/__fixtures__/snake.ts":
/*!**************************************!*\
  !*** ../types/__fixtures__/snake.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "snake1": () => (/* binding */ snake1),
/* harmony export */   "snake3": () => (/* binding */ snake3),
/* harmony export */   "snake4": () => (/* binding */ snake4),
/* harmony export */   "snake5": () => (/* binding */ snake5),
/* harmony export */   "snake9": () => (/* binding */ snake9)
/* harmony export */ });
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../snake */ "../types/snake.ts");

const create = (length) => (0,_snake__WEBPACK_IMPORTED_MODULE_0__.createSnakeFromCells)(Array.from({ length }, (_, i) => ({ x: i, y: -1 })));
const snake1 = create(1);
const snake3 = create(3);
const snake4 = create(4);
const snake5 = create(5);
const snake9 = create(9);


/***/ }),

/***/ "../types/grid.ts":
/*!************************!*\
  !*** ../types/grid.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyGrid": () => (/* binding */ copyGrid),
/* harmony export */   "createEmptyGrid": () => (/* binding */ createEmptyGrid),
/* harmony export */   "getColor": () => (/* binding */ getColor),
/* harmony export */   "gridEquals": () => (/* binding */ gridEquals),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isGridEmpty": () => (/* binding */ isGridEmpty),
/* harmony export */   "isInside": () => (/* binding */ isInside),
/* harmony export */   "isInsideLarge": () => (/* binding */ isInsideLarge),
/* harmony export */   "setColor": () => (/* binding */ setColor),
/* harmony export */   "setColorEmpty": () => (/* binding */ setColorEmpty)
/* harmony export */ });
const isInside = (grid, x, y) => x >= 0 && y >= 0 && x < grid.width && y < grid.height;
const isInsideLarge = (grid, m, x, y) => x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;
const copyGrid = ({ width, height, data }) => ({
    width,
    height,
    data: Uint8Array.from(data),
});
const getIndex = (grid, x, y) => x * grid.height + y;
const getColor = (grid, x, y) => grid.data[getIndex(grid, x, y)];
const isEmpty = (color) => color === 0;
const setColor = (grid, x, y, color) => {
    grid.data[getIndex(grid, x, y)] = color || 0;
};
const setColorEmpty = (grid, x, y) => {
    setColor(grid, x, y, 0);
};
/**
 * return true if the grid is empty
 */
const isGridEmpty = (grid) => grid.data.every((x) => x === 0);
const gridEquals = (a, b) => a.data.every((_, i) => a.data[i] === b.data[i]);
const createEmptyGrid = (width, height) => ({
    width,
    height,
    data: new Uint8Array(width * height),
});


/***/ }),

/***/ "../types/point.ts":
/*!*************************!*\
  !*** ../types/point.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "around4": () => (/* binding */ around4),
/* harmony export */   "pointEquals": () => (/* binding */ pointEquals)
/* harmony export */ });
const around4 = [
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
];
const pointEquals = (a, b) => a.x === b.x && a.y === b.y;


/***/ }),

/***/ "../types/randomlyFillGrid.ts":
/*!************************************!*\
  !*** ../types/randomlyFillGrid.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomlyFillGrid": () => (/* binding */ randomlyFillGrid)
/* harmony export */ });
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ "../types/grid.ts");

const defaultRand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const randomlyFillGrid = (grid, { colors = [1, 2, 3], emptyP = 2, } = {}, rand = defaultRand) => {
    for (let x = grid.width; x--;)
        for (let y = grid.height; y--;) {
            const k = rand(-emptyP, colors.length - 1);
            if (k >= 0)
                (0,_grid__WEBPACK_IMPORTED_MODULE_0__.setColor)(grid, x, y, colors[k]);
            else
                (0,_grid__WEBPACK_IMPORTED_MODULE_0__.setColorEmpty)(grid, x, y);
        }
};


/***/ }),

/***/ "../types/snake.ts":
/*!*************************!*\
  !*** ../types/snake.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copySnake": () => (/* binding */ copySnake),
/* harmony export */   "createSnakeFromCells": () => (/* binding */ createSnakeFromCells),
/* harmony export */   "getHeadX": () => (/* binding */ getHeadX),
/* harmony export */   "getHeadY": () => (/* binding */ getHeadY),
/* harmony export */   "getSnakeLength": () => (/* binding */ getSnakeLength),
/* harmony export */   "nextSnake": () => (/* binding */ nextSnake),
/* harmony export */   "snakeEquals": () => (/* binding */ snakeEquals),
/* harmony export */   "snakeToCells": () => (/* binding */ snakeToCells),
/* harmony export */   "snakeWillSelfCollide": () => (/* binding */ snakeWillSelfCollide)
/* harmony export */ });
const getHeadX = (snake) => snake[0] - 2;
const getHeadY = (snake) => snake[1] - 2;
const getSnakeLength = (snake) => snake.length / 2;
const copySnake = (snake) => snake.slice();
const snakeEquals = (a, b) => {
    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            return false;
    return true;
};
/**
 * return a copy of the next snake, considering that dx, dy is the direction
 */
const nextSnake = (snake, dx, dy) => {
    const copy = new Uint8Array(snake.length);
    for (let i = 2; i < snake.length; i++)
        copy[i] = snake[i - 2];
    copy[0] = snake[0] + dx;
    copy[1] = snake[1] + dy;
    return copy;
};
/**
 * return true if the next snake will collide with itself
 */
const snakeWillSelfCollide = (snake, dx, dy) => {
    const nx = snake[0] + dx;
    const ny = snake[1] + dy;
    for (let i = 2; i < snake.length - 2; i += 2)
        if (snake[i + 0] === nx && snake[i + 1] === ny)
            return true;
    return false;
};
const snakeToCells = (snake) => Array.from({ length: snake.length / 2 }, (_, i) => ({
    x: snake[i * 2 + 0] - 2,
    y: snake[i * 2 + 1] - 2,
}));
const createSnakeFromCells = (points) => {
    const snake = new Uint8Array(points.length * 2);
    for (let i = points.length; i--;) {
        snake[i * 2 + 0] = points[i].x + 2;
        snake[i * 2 + 1] = points[i].y + 2;
    }
    return snake;
};


/***/ }),

/***/ "../../node_modules/css-tree/dist/data.js":
/*!************************************************!*\
  !*** ../../node_modules/css-tree/dist/data.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    "generic": true,
    "types": {
        "absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
        "alpha-value": "<number>|<percentage>",
        "angle-percentage": "<angle>|<percentage>",
        "angular-color-hint": "<angle-percentage>",
        "angular-color-stop": "<color>&&<color-stop-angle>?",
        "angular-color-stop-list": "[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>",
        "animateable-feature": "scroll-position|contents|<custom-ident>",
        "attachment": "scroll|fixed|local",
        "attr()": "attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )",
        "attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
        "attr-modifier": "i|s",
        "attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
        "auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
        "auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
        "baseline-position": "[first|last]? baseline",
        "basic-shape": "<inset()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
        "bg-image": "none|<image>",
        "bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
        "bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
        "bg-size": "[<length-percentage>|auto]{1,2}|cover|contain",
        "blur()": "blur( <length> )",
        "blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
        "box": "border-box|padding-box|content-box",
        "brightness()": "brightness( <number-percentage> )",
        "calc()": "calc( <calc-sum> )",
        "calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
        "calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
        "calc-value": "<number>|<dimension>|<percentage>|( <calc-sum> )",
        "cf-final-image": "<image>|<color>",
        "cf-mixing-image": "<percentage>?&&<image>",
        "circle()": "circle( [<shape-radius>]? [at <position>]? )",
        "clamp()": "clamp( <calc-sum>#{3} )",
        "class-selector": "'.' <ident-token>",
        "clip-source": "<url>",
        "color": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hex-color>|<named-color>|currentcolor|<deprecated-system-color>",
        "color-stop": "<color-stop-length>|<color-stop-angle>",
        "color-stop-angle": "<angle-percentage>{1,2}",
        "color-stop-length": "<length-percentage>{1,2}",
        "color-stop-list": "[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",
        "combinator": "'>'|'+'|'~'|['||']",
        "common-lig-values": "[common-ligatures|no-common-ligatures]",
        "compat-auto": "searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button",
        "composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
        "compositing-operator": "add|subtract|intersect|exclude",
        "compound-selector": "[<type-selector>? <subclass-selector>* [<pseudo-element-selector> <pseudo-class-selector>*]*]!",
        "compound-selector-list": "<compound-selector>#",
        "complex-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
        "complex-selector-list": "<complex-selector>#",
        "conic-gradient()": "conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
        "contextual-alt-values": "[contextual|no-contextual]",
        "content-distribution": "space-between|space-around|space-evenly|stretch",
        "content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>]+",
        "content-position": "center|start|end|flex-start|flex-end",
        "content-replacement": "<image>",
        "contrast()": "contrast( [<number-percentage>] )",
        "counter()": "counter( <counter-name> , <counter-style>? )",
        "counter-style": "<counter-style-name>|symbols( )",
        "counter-style-name": "<custom-ident>",
        "counters()": "counters( <counter-name> , <string> , <counter-style>? )",
        "cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
        "cubic-bezier-timing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
        "deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
        "discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
        "display-box": "contents|none",
        "display-inside": "flow|flow-root|table|flex|grid|ruby",
        "display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
        "display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
        "display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
        "display-outside": "block|inline|run-in",
        "drop-shadow()": "drop-shadow( <length>{2,3} <color>? )",
        "east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
        "east-asian-width-values": "[full-width|proportional-width]",
        "element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
        "ellipse()": "ellipse( [<shape-radius>{2}]? [at <position>]? )",
        "ending-shape": "circle|ellipse",
        "env()": "env( <custom-ident> , <declaration-value>? )",
        "explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
        "family-name": "<string>|<custom-ident>+",
        "feature-tag-value": "<string> [<integer>|on|off]?",
        "feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
        "feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
        "feature-value-block-list": "<feature-value-block>+",
        "feature-value-declaration": "<custom-ident> : <integer>+ ;",
        "feature-value-declaration-list": "<feature-value-declaration>",
        "feature-value-name": "<custom-ident>",
        "fill-rule": "nonzero|evenodd",
        "filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
        "filter-function-list": "[<filter-function>|<url>]+",
        "final-bg-layer": "<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
        "fit-content()": "fit-content( [<length>|<percentage>] )",
        "fixed-breadth": "<length-percentage>",
        "fixed-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
        "fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
        "font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
        "font-variant-css21": "[normal|small-caps]",
        "font-weight-absolute": "normal|bold|<number [1,1000]>",
        "frequency-percentage": "<frequency>|<percentage>",
        "general-enclosed": "[<function-token> <any-value> )]|( <ident> <any-value> )",
        "generic-family": "serif|sans-serif|cursive|fantasy|monospace|-apple-system",
        "generic-name": "serif|sans-serif|cursive|fantasy|monospace",
        "geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
        "gradient": "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<-legacy-gradient>",
        "grayscale()": "grayscale( <number-percentage> )",
        "grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
        "historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
        "hsl()": "hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )",
        "hsla()": "hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",
        "hue": "<number>|<angle>",
        "hue-rotate()": "hue-rotate( <angle> )",
        "image": "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
        "image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
        "image-set()": "image-set( <image-set-option># )",
        "image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
        "image-src": "<url>|<string>",
        "image-tags": "ltr|rtl",
        "inflexible-breadth": "<length>|<percentage>|min-content|max-content|auto",
        "inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
        "invert()": "invert( <number-percentage> )",
        "keyframes-name": "<custom-ident>|<string>",
        "keyframe-block": "<keyframe-selector># { <declaration-list> }",
        "keyframe-block-list": "<keyframe-block>+",
        "keyframe-selector": "from|to|<percentage>",
        "leader()": "leader( <leader-type> )",
        "leader-type": "dotted|solid|space|<string>",
        "length-percentage": "<length>|<percentage>",
        "line-names": "'[' <custom-ident>* ']'",
        "line-name-list": "[<line-names>|<name-repeat>]+",
        "line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
        "line-width": "<length>|thin|medium|thick",
        "linear-color-hint": "<length-percentage>",
        "linear-color-stop": "<color> <color-stop-length>?",
        "linear-gradient()": "linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
        "mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
        "mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
        "mask-reference": "none|<image>|<mask-source>",
        "mask-source": "<url>",
        "masking-mode": "alpha|luminance|match-source",
        "matrix()": "matrix( <number>#{6} )",
        "matrix3d()": "matrix3d( <number>#{16} )",
        "max()": "max( <calc-sum># )",
        "media-and": "<media-in-parens> [and <media-in-parens>]+",
        "media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
        "media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
        "media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
        "media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
        "media-not": "not <media-in-parens>",
        "media-or": "<media-in-parens> [or <media-in-parens>]+",
        "media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
        "media-query-list": "<media-query>#",
        "media-type": "<ident>",
        "mf-boolean": "<mf-name>",
        "mf-name": "<ident>",
        "mf-plain": "<mf-name> : <mf-value>",
        "mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
        "mf-value": "<number>|<dimension>|<ident>|<ratio>",
        "min()": "min( <calc-sum># )",
        "minmax()": "minmax( [<length>|<percentage>|min-content|max-content|auto] , [<length>|<percentage>|<flex>|min-content|max-content|auto] )",
        "named-color": "transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|<-non-standard-color>",
        "namespace-prefix": "<ident>",
        "ns-prefix": "[<ident-token>|'*']? '|'",
        "number-percentage": "<number>|<percentage>",
        "numeric-figure-values": "[lining-nums|oldstyle-nums]",
        "numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
        "numeric-spacing-values": "[proportional-nums|tabular-nums]",
        "nth": "<an-plus-b>|even|odd",
        "opacity()": "opacity( [<number-percentage>] )",
        "overflow-position": "unsafe|safe",
        "outline-radius": "<length>|<percentage>",
        "page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
        "page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
        "page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
        "page-selector-list": "[<page-selector>#]?",
        "page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
        "page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
        "path()": "path( [<fill-rule> ,]? <string> )",
        "paint()": "paint( <ident> , <declaration-value>? )",
        "perspective()": "perspective( <length> )",
        "polygon()": "polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",
        "position": "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
        "pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
        "pseudo-element-selector": "':' <pseudo-class-selector>",
        "pseudo-page": ": [left|right|first|blank]",
        "quote": "open-quote|close-quote|no-open-quote|no-close-quote",
        "radial-gradient()": "radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
        "relative-selector": "<combinator>? <complex-selector>",
        "relative-selector-list": "<relative-selector>#",
        "relative-size": "larger|smaller",
        "repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
        "repeating-linear-gradient()": "repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
        "repeating-radial-gradient()": "repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
        "rgb()": "rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )",
        "rgba()": "rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )",
        "rotate()": "rotate( [<angle>|<zero>] )",
        "rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
        "rotateX()": "rotateX( [<angle>|<zero>] )",
        "rotateY()": "rotateY( [<angle>|<zero>] )",
        "rotateZ()": "rotateZ( [<angle>|<zero>] )",
        "saturate()": "saturate( <number-percentage> )",
        "scale()": "scale( <number> , <number>? )",
        "scale3d()": "scale3d( <number> , <number> , <number> )",
        "scaleX()": "scaleX( <number> )",
        "scaleY()": "scaleY( <number> )",
        "scaleZ()": "scaleZ( <number> )",
        "self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
        "shape-radius": "<length-percentage>|closest-side|farthest-side",
        "skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
        "skewX()": "skewX( [<angle>|<zero>] )",
        "skewY()": "skewY( [<angle>|<zero>] )",
        "sepia()": "sepia( <number-percentage> )",
        "shadow": "inset?&&<length>{2,4}&&<color>?",
        "shadow-t": "[<length>{2,3}&&<color>?]",
        "shape": "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
        "shape-box": "<box>|margin-box",
        "side-or-corner": "[left|right]||[top|bottom]",
        "single-animation": "<time>||<easing-function>||<time>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]",
        "single-animation-direction": "normal|reverse|alternate|alternate-reverse",
        "single-animation-fill-mode": "none|forwards|backwards|both",
        "single-animation-iteration-count": "infinite|<number>",
        "single-animation-play-state": "running|paused",
        "single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>",
        "single-transition-property": "all|<custom-ident>",
        "size": "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
        "step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
        "step-timing-function": "step-start|step-end|steps( <integer> [, <step-position>]? )",
        "subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
        "supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
        "supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
        "supports-feature": "<supports-decl>|<supports-selector-fn>",
        "supports-decl": "( <declaration> )",
        "supports-selector-fn": "selector( <complex-selector> )",
        "symbol": "<string>|<image>|<custom-ident>",
        "target": "<target-counter()>|<target-counters()>|<target-text()>",
        "target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
        "target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
        "target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
        "time-percentage": "<time>|<percentage>",
        "easing-function": "linear|<cubic-bezier-timing-function>|<step-timing-function>",
        "track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
        "track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
        "track-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )",
        "track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( [<length>|<percentage>] )",
        "transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
        "transform-list": "<transform-function>+",
        "translate()": "translate( <length-percentage> , <length-percentage>? )",
        "translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
        "translateX()": "translateX( <length-percentage> )",
        "translateY()": "translateY( <length-percentage> )",
        "translateZ()": "translateZ( <length> )",
        "type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
        "type-selector": "<wq-name>|<ns-prefix>? '*'",
        "var()": "var( <custom-property-name> , <declaration-value>? )",
        "viewport-length": "auto|<length-percentage>",
        "visual-box": "content-box|padding-box|border-box",
        "wq-name": "<ns-prefix>? <ident-token>",
        "-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
        "-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
        "-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
        "-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
        "-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
        "-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
        "-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
        "-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
        "-legacy-radial-gradient-shape": "circle|ellipse",
        "-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
        "-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
        "-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
        "-non-standard-overflow": "-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
        "-non-standard-width": "fill-available|min-intrinsic|intrinsic|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content|-webkit-min-content|-webkit-max-content",
        "-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
        "-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
        "-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
        "-webkit-gradient-radius": "<length>|<percentage>",
        "-webkit-gradient-type": "linear|radial",
        "-webkit-mask-box-repeat": "repeat|stretch|round",
        "-webkit-mask-clip-style": "border|border-box|padding|padding-box|content|content-box|text",
        "-ms-filter-function-list": "<-ms-filter-function>+",
        "-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
        "-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
        "-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
        "-ms-filter": "<string>",
        "age": "child|young|old",
        "attr-name": "<wq-name>",
        "attr-fallback": "<any-value>",
        "border-radius": "<length-percentage>{1,2}",
        "bottom": "<length>|auto",
        "counter": "<counter()>|<counters()>",
        "counter-name": "<custom-ident>",
        "generic-voice": "[<age>? <gender> <integer>?]",
        "gender": "male|female|neutral",
        "left": "<length>|auto",
        "mask-image": "<mask-reference>#",
        "name-repeat": "repeat( [<positive-integer>|auto-fill] , <line-names>+ )",
        "paint": "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
        "ratio": "<integer> / <integer>",
        "right": "<length>|auto",
        "svg-length": "<percentage>|<length>|<number>",
        "svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
        "top": "<length>|auto",
        "track-group": "'(' [<string>* <track-minmax> <string>*]+ ')' ['[' <positive-integer> ']']?|<track-minmax>",
        "track-list-v0": "[<string>* <track-group> <string>*]+|none",
        "track-minmax": "minmax( <track-breadth> , <track-breadth> )|auto|<track-breadth>|fit-content",
        "x": "<number>",
        "y": "<number>",
        "declaration": "<ident-token> : <declaration-value>? ['!' important]?",
        "declaration-list": "[<declaration>? ';']* <declaration>?",
        "url": "url( <string> <url-modifier>* )|<url-token>",
        "url-modifier": "<ident>|<function-token> <any-value> )",
        "number-zero-one": "<number [0,1]>",
        "number-one-or-greater": "<number [1,∞]>",
        "positive-integer": "<integer [0,∞]>",
        "-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box"
    },
    "properties": {
        "--*": "<declaration-value>",
        "-ms-accelerator": "false|true",
        "-ms-block-progression": "tb|rl|bt|lr",
        "-ms-content-zoom-chaining": "none|chained",
        "-ms-content-zooming": "none|zoom",
        "-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
        "-ms-content-zoom-limit-max": "<percentage>",
        "-ms-content-zoom-limit-min": "<percentage>",
        "-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
        "-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
        "-ms-content-zoom-snap-type": "none|proximity|mandatory",
        "-ms-filter": "<string>",
        "-ms-flow-from": "[none|<custom-ident>]#",
        "-ms-flow-into": "[none|<custom-ident>]#",
        "-ms-grid-columns": "none|<track-list>|<auto-track-list>",
        "-ms-grid-rows": "none|<track-list>|<auto-track-list>",
        "-ms-high-contrast-adjust": "auto|none",
        "-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
        "-ms-hyphenate-limit-lines": "no-limit|<integer>",
        "-ms-hyphenate-limit-zone": "<percentage>|<length>",
        "-ms-ime-align": "auto|after",
        "-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
        "-ms-scrollbar-3dlight-color": "<color>",
        "-ms-scrollbar-arrow-color": "<color>",
        "-ms-scrollbar-base-color": "<color>",
        "-ms-scrollbar-darkshadow-color": "<color>",
        "-ms-scrollbar-face-color": "<color>",
        "-ms-scrollbar-highlight-color": "<color>",
        "-ms-scrollbar-shadow-color": "<color>",
        "-ms-scrollbar-track-color": "<color>",
        "-ms-scroll-chaining": "chained|none",
        "-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
        "-ms-scroll-limit-x-max": "auto|<length>",
        "-ms-scroll-limit-x-min": "<length>",
        "-ms-scroll-limit-y-max": "auto|<length>",
        "-ms-scroll-limit-y-min": "<length>",
        "-ms-scroll-rails": "none|railed",
        "-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
        "-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
        "-ms-scroll-snap-type": "none|proximity|mandatory",
        "-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
        "-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
        "-ms-scroll-translation": "none|vertical-to-horizontal",
        "-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
        "-ms-touch-select": "grippers|none",
        "-ms-user-select": "none|element|text",
        "-ms-wrap-flow": "auto|both|start|end|maximum|clear",
        "-ms-wrap-margin": "<length>",
        "-ms-wrap-through": "wrap|none",
        "-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
        "-moz-binding": "<url>|none",
        "-moz-border-bottom-colors": "<color>+|none",
        "-moz-border-left-colors": "<color>+|none",
        "-moz-border-right-colors": "<color>+|none",
        "-moz-border-top-colors": "<color>+|none",
        "-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
        "-moz-float-edge": "border-box|content-box|margin-box|padding-box",
        "-moz-force-broken-image-icon": "0|1",
        "-moz-image-region": "<shape>|auto",
        "-moz-orient": "inline|block|horizontal|vertical",
        "-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
        "-moz-outline-radius-bottomleft": "<outline-radius>",
        "-moz-outline-radius-bottomright": "<outline-radius>",
        "-moz-outline-radius-topleft": "<outline-radius>",
        "-moz-outline-radius-topright": "<outline-radius>",
        "-moz-stack-sizing": "ignore|stretch-to-fit",
        "-moz-text-blink": "none|blink",
        "-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
        "-moz-user-input": "auto|none|enabled|disabled",
        "-moz-user-modify": "read-only|read-write|write-only",
        "-moz-window-dragging": "drag|no-drag",
        "-moz-window-shadow": "default|menu|tooltip|sheet|none",
        "-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
        "-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
        "-webkit-border-before-color": "<color>",
        "-webkit-border-before-style": "<'border-style'>",
        "-webkit-border-before-width": "<'border-width'>",
        "-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
        "-webkit-line-clamp": "none|<integer>",
        "-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#",
        "-webkit-mask-attachment": "<attachment>#",
        "-webkit-mask-clip": "[<box>|border|padding|content|text]#",
        "-webkit-mask-composite": "<composite-style>#",
        "-webkit-mask-image": "<mask-reference>#",
        "-webkit-mask-origin": "[<box>|border|padding|content]#",
        "-webkit-mask-position": "<position>#",
        "-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
        "-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
        "-webkit-mask-repeat": "<repeat-style>#",
        "-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
        "-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
        "-webkit-mask-size": "<bg-size>#",
        "-webkit-overflow-scrolling": "auto|touch",
        "-webkit-tap-highlight-color": "<color>",
        "-webkit-text-fill-color": "<color>",
        "-webkit-text-stroke": "<length>||<color>",
        "-webkit-text-stroke-color": "<color>",
        "-webkit-text-stroke-width": "<length>",
        "-webkit-touch-callout": "default|none",
        "-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
        "accent-color": "auto|<color>",
        "align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
        "align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]",
        "align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>",
        "align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
        "all": "initial|inherit|unset|revert",
        "animation": "<single-animation>#",
        "animation-delay": "<time>#",
        "animation-direction": "<single-animation-direction>#",
        "animation-duration": "<time>#",
        "animation-fill-mode": "<single-animation-fill-mode>#",
        "animation-iteration-count": "<single-animation-iteration-count>#",
        "animation-name": "[none|<keyframes-name>]#",
        "animation-play-state": "<single-animation-play-state>#",
        "animation-timing-function": "<easing-function>#",
        "appearance": "none|auto|textfield|menulist-button|<compat-auto>",
        "aspect-ratio": "auto|<ratio>",
        "azimuth": "<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards",
        "backdrop-filter": "none|<filter-function-list>",
        "backface-visibility": "visible|hidden",
        "background": "[<bg-layer> ,]* <final-bg-layer>",
        "background-attachment": "<attachment>#",
        "background-blend-mode": "<blend-mode>#",
        "background-clip": "<box>#",
        "background-color": "<color>",
        "background-image": "<bg-image>#",
        "background-origin": "<box>#",
        "background-position": "<bg-position>#",
        "background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
        "background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
        "background-repeat": "<repeat-style>#",
        "background-size": "<bg-size>#",
        "block-overflow": "clip|ellipsis|<string>",
        "block-size": "<'width'>",
        "border": "<line-width>||<line-style>||<color>",
        "border-block": "<'border-top-width'>||<'border-top-style'>||<color>",
        "border-block-color": "<'border-top-color'>{1,2}",
        "border-block-style": "<'border-top-style'>",
        "border-block-width": "<'border-top-width'>",
        "border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
        "border-block-end-color": "<'border-top-color'>",
        "border-block-end-style": "<'border-top-style'>",
        "border-block-end-width": "<'border-top-width'>",
        "border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
        "border-block-start-color": "<'border-top-color'>",
        "border-block-start-style": "<'border-top-style'>",
        "border-block-start-width": "<'border-top-width'>",
        "border-bottom": "<line-width>||<line-style>||<color>",
        "border-bottom-color": "<'border-top-color'>",
        "border-bottom-left-radius": "<length-percentage>{1,2}",
        "border-bottom-right-radius": "<length-percentage>{1,2}",
        "border-bottom-style": "<line-style>",
        "border-bottom-width": "<line-width>",
        "border-collapse": "collapse|separate",
        "border-color": "<color>{1,4}",
        "border-end-end-radius": "<length-percentage>{1,2}",
        "border-end-start-radius": "<length-percentage>{1,2}",
        "border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
        "border-image-outset": "[<length>|<number>]{1,4}",
        "border-image-repeat": "[stretch|repeat|round|space]{1,2}",
        "border-image-slice": "<number-percentage>{1,4}&&fill?",
        "border-image-source": "none|<image>",
        "border-image-width": "[<length-percentage>|<number>|auto]{1,4}",
        "border-inline": "<'border-top-width'>||<'border-top-style'>||<color>",
        "border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
        "border-inline-color": "<'border-top-color'>{1,2}",
        "border-inline-style": "<'border-top-style'>",
        "border-inline-width": "<'border-top-width'>",
        "border-inline-end-color": "<'border-top-color'>",
        "border-inline-end-style": "<'border-top-style'>",
        "border-inline-end-width": "<'border-top-width'>",
        "border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
        "border-inline-start-color": "<'border-top-color'>",
        "border-inline-start-style": "<'border-top-style'>",
        "border-inline-start-width": "<'border-top-width'>",
        "border-left": "<line-width>||<line-style>||<color>",
        "border-left-color": "<color>",
        "border-left-style": "<line-style>",
        "border-left-width": "<line-width>",
        "border-radius": "<length-percentage>{1,4} [/ <length-percentage>{1,4}]?",
        "border-right": "<line-width>||<line-style>||<color>",
        "border-right-color": "<color>",
        "border-right-style": "<line-style>",
        "border-right-width": "<line-width>",
        "border-spacing": "<length> <length>?",
        "border-start-end-radius": "<length-percentage>{1,2}",
        "border-start-start-radius": "<length-percentage>{1,2}",
        "border-style": "<line-style>{1,4}",
        "border-top": "<line-width>||<line-style>||<color>",
        "border-top-color": "<color>",
        "border-top-left-radius": "<length-percentage>{1,2}",
        "border-top-right-radius": "<length-percentage>{1,2}",
        "border-top-style": "<line-style>",
        "border-top-width": "<line-width>",
        "border-width": "<line-width>{1,4}",
        "bottom": "<length>|<percentage>|auto",
        "box-align": "start|center|end|baseline|stretch",
        "box-decoration-break": "slice|clone",
        "box-direction": "normal|reverse|inherit",
        "box-flex": "<number>",
        "box-flex-group": "<integer>",
        "box-lines": "single|multiple",
        "box-ordinal-group": "<integer>",
        "box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
        "box-pack": "start|center|end|justify",
        "box-shadow": "none|<shadow>#",
        "box-sizing": "content-box|border-box",
        "break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
        "break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
        "break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
        "caption-side": "top|bottom|block-start|block-end|inline-start|inline-end",
        "caret-color": "auto|<color>",
        "clear": "none|left|right|both|inline-start|inline-end",
        "clip": "<shape>|auto",
        "clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
        "color": "<color>",
        "color-adjust": "economy|exact",
        "color-scheme": "normal|[light|dark|<custom-ident>]+",
        "column-count": "<integer>|auto",
        "column-fill": "auto|balance|balance-all",
        "column-gap": "normal|<length-percentage>",
        "column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
        "column-rule-color": "<color>",
        "column-rule-style": "<'border-style'>",
        "column-rule-width": "<'border-width'>",
        "column-span": "none|all",
        "column-width": "<length>|auto",
        "columns": "<'column-width'>||<'column-count'>",
        "contain": "none|strict|content|[size||layout||style||paint]",
        "content": "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?",
        "content-visibility": "visible|auto|hidden",
        "counter-increment": "[<counter-name> <integer>?]+|none",
        "counter-reset": "[<counter-name> <integer>?]+|none",
        "counter-set": "[<counter-name> <integer>?]+|none",
        "cursor": "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
        "direction": "ltr|rtl",
        "display": "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
        "empty-cells": "show|hide",
        "filter": "none|<filter-function-list>|<-ms-filter-function-list>",
        "flex": "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
        "flex-basis": "content|<'width'>",
        "flex-direction": "row|row-reverse|column|column-reverse",
        "flex-flow": "<'flex-direction'>||<'flex-wrap'>",
        "flex-grow": "<number>",
        "flex-shrink": "<number>",
        "flex-wrap": "nowrap|wrap|wrap-reverse",
        "float": "left|right|none|inline-start|inline-end",
        "font": "[[<'font-style'>||<font-variant-css21>||<'font-weight'>||<'font-stretch'>]? <'font-size'> [/ <'line-height'>]? <'font-family'>]|caption|icon|menu|message-box|small-caption|status-bar",
        "font-family": "[<family-name>|<generic-family>]#",
        "font-feature-settings": "normal|<feature-tag-value>#",
        "font-kerning": "auto|normal|none",
        "font-language-override": "normal|<string>",
        "font-optical-sizing": "auto|none",
        "font-variation-settings": "normal|[<string> <number>]#",
        "font-size": "<absolute-size>|<relative-size>|<length-percentage>",
        "font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
        "font-smooth": "auto|never|always|<absolute-size>|<length>",
        "font-stretch": "<font-stretch-absolute>",
        "font-style": "normal|italic|oblique <angle>?",
        "font-synthesis": "none|[weight||style||small-caps]",
        "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
        "font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
        "font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
        "font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
        "font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
        "font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
        "font-variant-position": "normal|sub|super",
        "font-weight": "<font-weight-absolute>|bolder|lighter",
        "forced-color-adjust": "auto|none",
        "gap": "<'row-gap'> <'column-gap'>?",
        "grid": "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
        "grid-area": "<grid-line> [/ <grid-line>]{0,3}",
        "grid-auto-columns": "<track-size>+",
        "grid-auto-flow": "[row|column]||dense",
        "grid-auto-rows": "<track-size>+",
        "grid-column": "<grid-line> [/ <grid-line>]?",
        "grid-column-end": "<grid-line>",
        "grid-column-gap": "<length-percentage>",
        "grid-column-start": "<grid-line>",
        "grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
        "grid-row": "<grid-line> [/ <grid-line>]?",
        "grid-row-end": "<grid-line>",
        "grid-row-gap": "<length-percentage>",
        "grid-row-start": "<grid-line>",
        "grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
        "grid-template-areas": "none|<string>+",
        "grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
        "grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
        "hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
        "height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )",
        "hyphens": "none|manual|auto",
        "image-orientation": "from-image|<angle>|[<angle>? flip]",
        "image-rendering": "auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
        "image-resolution": "[from-image||<resolution>]&&snap?",
        "ime-mode": "auto|normal|active|inactive|disabled",
        "initial-letter": "normal|[<number> <integer>?]",
        "initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
        "inline-size": "<'width'>",
        "inset": "<'top'>{1,4}",
        "inset-block": "<'top'>{1,2}",
        "inset-block-end": "<'top'>",
        "inset-block-start": "<'top'>",
        "inset-inline": "<'top'>{1,2}",
        "inset-inline-end": "<'top'>",
        "inset-inline-start": "<'top'>",
        "isolation": "auto|isolate",
        "justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
        "justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]",
        "justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]",
        "justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
        "left": "<length>|<percentage>|auto",
        "letter-spacing": "normal|<length-percentage>",
        "line-break": "auto|loose|normal|strict|anywhere",
        "line-clamp": "none|<integer>",
        "line-height": "normal|<number>|<length>|<percentage>",
        "line-height-step": "<length>",
        "list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
        "list-style-image": "<image>|none",
        "list-style-position": "inside|outside",
        "list-style-type": "<counter-style>|<string>|none",
        "margin": "[<length>|<percentage>|auto]{1,4}",
        "margin-block": "<'margin-left'>{1,2}",
        "margin-block-end": "<'margin-left'>",
        "margin-block-start": "<'margin-left'>",
        "margin-bottom": "<length>|<percentage>|auto",
        "margin-inline": "<'margin-left'>{1,2}",
        "margin-inline-end": "<'margin-left'>",
        "margin-inline-start": "<'margin-left'>",
        "margin-left": "<length>|<percentage>|auto",
        "margin-right": "<length>|<percentage>|auto",
        "margin-top": "<length>|<percentage>|auto",
        "margin-trim": "none|in-flow|all",
        "mask": "<mask-layer>#",
        "mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
        "mask-border-mode": "luminance|alpha",
        "mask-border-outset": "[<length>|<number>]{1,4}",
        "mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
        "mask-border-slice": "<number-percentage>{1,4} fill?",
        "mask-border-source": "none|<image>",
        "mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
        "mask-clip": "[<geometry-box>|no-clip]#",
        "mask-composite": "<compositing-operator>#",
        "mask-image": "<mask-reference>#",
        "mask-mode": "<masking-mode>#",
        "mask-origin": "<geometry-box>#",
        "mask-position": "<position>#",
        "mask-repeat": "<repeat-style>#",
        "mask-size": "<bg-size>#",
        "mask-type": "luminance|alpha",
        "masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
        "math-style": "normal|compact",
        "max-block-size": "<'max-width'>",
        "max-height": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )",
        "max-inline-size": "<'max-width'>",
        "max-lines": "none|<integer>",
        "max-width": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>",
        "min-block-size": "<'min-width'>",
        "min-height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )",
        "min-inline-size": "<'min-width'>",
        "min-width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>",
        "mix-blend-mode": "<blend-mode>",
        "object-fit": "fill|contain|cover|none|scale-down",
        "object-position": "<position>",
        "offset": "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
        "offset-anchor": "auto|<position>",
        "offset-distance": "<length-percentage>",
        "offset-path": "none|ray( [<angle>&&<size>&&contain?] )|<path()>|<url>|[<basic-shape>||<geometry-box>]",
        "offset-position": "auto|<position>",
        "offset-rotate": "[auto|reverse]||<angle>",
        "opacity": "<alpha-value>",
        "order": "<integer>",
        "orphans": "<integer>",
        "outline": "[<'outline-color'>||<'outline-style'>||<'outline-width'>]",
        "outline-color": "<color>|invert",
        "outline-offset": "<length>",
        "outline-style": "auto|<'border-style'>",
        "outline-width": "<line-width>",
        "overflow": "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
        "overflow-anchor": "auto|none",
        "overflow-block": "visible|hidden|clip|scroll|auto",
        "overflow-clip-box": "padding-box|content-box",
        "overflow-clip-margin": "<visual-box>||<length [0,∞]>",
        "overflow-inline": "visible|hidden|clip|scroll|auto",
        "overflow-wrap": "normal|break-word|anywhere",
        "overflow-x": "visible|hidden|clip|scroll|auto",
        "overflow-y": "visible|hidden|clip|scroll|auto",
        "overscroll-behavior": "[contain|none|auto]{1,2}",
        "overscroll-behavior-block": "contain|none|auto",
        "overscroll-behavior-inline": "contain|none|auto",
        "overscroll-behavior-x": "contain|none|auto",
        "overscroll-behavior-y": "contain|none|auto",
        "padding": "[<length>|<percentage>]{1,4}",
        "padding-block": "<'padding-left'>{1,2}",
        "padding-block-end": "<'padding-left'>",
        "padding-block-start": "<'padding-left'>",
        "padding-bottom": "<length>|<percentage>",
        "padding-inline": "<'padding-left'>{1,2}",
        "padding-inline-end": "<'padding-left'>",
        "padding-inline-start": "<'padding-left'>",
        "padding-left": "<length>|<percentage>",
        "padding-right": "<length>|<percentage>",
        "padding-top": "<length>|<percentage>",
        "page-break-after": "auto|always|avoid|left|right|recto|verso",
        "page-break-before": "auto|always|avoid|left|right|recto|verso",
        "page-break-inside": "auto|avoid",
        "paint-order": "normal|[fill||stroke||markers]",
        "perspective": "none|<length>",
        "perspective-origin": "<position>",
        "place-content": "<'align-content'> <'justify-content'>?",
        "place-items": "<'align-items'> <'justify-items'>?",
        "place-self": "<'align-self'> <'justify-self'>?",
        "pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
        "position": "static|relative|absolute|sticky|fixed|-webkit-sticky",
        "quotes": "none|auto|[<string> <string>]+",
        "resize": "none|both|horizontal|vertical|block|inline",
        "right": "<length>|<percentage>|auto",
        "rotate": "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
        "row-gap": "normal|<length-percentage>",
        "ruby-align": "start|center|space-between|space-around",
        "ruby-merge": "separate|collapse|auto",
        "ruby-position": "[alternate||[over|under]]|inter-character",
        "scale": "none|<number>{1,3}",
        "scrollbar-color": "auto|<color>{2}",
        "scrollbar-gutter": "auto|stable&&both-edges?",
        "scrollbar-width": "auto|thin|none",
        "scroll-behavior": "auto|smooth",
        "scroll-margin": "<length>{1,4}",
        "scroll-margin-block": "<length>{1,2}",
        "scroll-margin-block-start": "<length>",
        "scroll-margin-block-end": "<length>",
        "scroll-margin-bottom": "<length>",
        "scroll-margin-inline": "<length>{1,2}",
        "scroll-margin-inline-start": "<length>",
        "scroll-margin-inline-end": "<length>",
        "scroll-margin-left": "<length>",
        "scroll-margin-right": "<length>",
        "scroll-margin-top": "<length>",
        "scroll-padding": "[auto|<length-percentage>]{1,4}",
        "scroll-padding-block": "[auto|<length-percentage>]{1,2}",
        "scroll-padding-block-start": "auto|<length-percentage>",
        "scroll-padding-block-end": "auto|<length-percentage>",
        "scroll-padding-bottom": "auto|<length-percentage>",
        "scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
        "scroll-padding-inline-start": "auto|<length-percentage>",
        "scroll-padding-inline-end": "auto|<length-percentage>",
        "scroll-padding-left": "auto|<length-percentage>",
        "scroll-padding-right": "auto|<length-percentage>",
        "scroll-padding-top": "auto|<length-percentage>",
        "scroll-snap-align": "[none|start|end|center]{1,2}",
        "scroll-snap-coordinate": "none|<position>#",
        "scroll-snap-destination": "<position>",
        "scroll-snap-points-x": "none|repeat( <length-percentage> )",
        "scroll-snap-points-y": "none|repeat( <length-percentage> )",
        "scroll-snap-stop": "normal|always",
        "scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
        "scroll-snap-type-x": "none|mandatory|proximity",
        "scroll-snap-type-y": "none|mandatory|proximity",
        "shape-image-threshold": "<alpha-value>",
        "shape-margin": "<length-percentage>",
        "shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
        "tab-size": "<integer>|<length>",
        "table-layout": "auto|fixed",
        "text-align": "start|end|left|right|center|justify|match-parent",
        "text-align-last": "auto|start|end|left|right|center|justify",
        "text-combine-upright": "none|all|[digits <integer>?]",
        "text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
        "text-decoration-color": "<color>",
        "text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
        "text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
        "text-decoration-skip-ink": "auto|all|none",
        "text-decoration-style": "solid|double|dotted|dashed|wavy",
        "text-decoration-thickness": "auto|from-font|<length>|<percentage>",
        "text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
        "text-emphasis-color": "<color>",
        "text-emphasis-position": "[over|under]&&[right|left]",
        "text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
        "text-indent": "<length-percentage>&&hanging?&&each-line?",
        "text-justify": "auto|inter-character|inter-word|none",
        "text-orientation": "mixed|upright|sideways",
        "text-overflow": "[clip|ellipsis|<string>]{1,2}",
        "text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
        "text-shadow": "none|<shadow-t>#",
        "text-size-adjust": "none|auto|<percentage>",
        "text-transform": "none|capitalize|uppercase|lowercase|full-width|full-size-kana",
        "text-underline-offset": "auto|<length>|<percentage>",
        "text-underline-position": "auto|from-font|[under||[left|right]]",
        "top": "<length>|<percentage>|auto",
        "touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
        "transform": "none|<transform-list>",
        "transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
        "transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
        "transform-style": "flat|preserve-3d",
        "transition": "<single-transition>#",
        "transition-delay": "<time>#",
        "transition-duration": "<time>#",
        "transition-property": "none|<single-transition-property>#",
        "transition-timing-function": "<easing-function>#",
        "translate": "none|<length-percentage> [<length-percentage> <length>?]?",
        "unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
        "user-select": "auto|text|none|contain|all",
        "vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
        "visibility": "visible|hidden|collapse",
        "white-space": "normal|pre|nowrap|pre-wrap|pre-line|break-spaces",
        "widows": "<integer>",
        "width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|fill|stretch|intrinsic|-moz-max-content|-webkit-max-content|-moz-fit-content|-webkit-fit-content",
        "will-change": "auto|<animateable-feature>#",
        "word-break": "normal|break-all|keep-all|break-word",
        "word-spacing": "normal|<length>",
        "word-wrap": "normal|break-word",
        "writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
        "z-index": "auto|<integer>",
        "zoom": "normal|reset|<number>|<percentage>",
        "-moz-background-clip": "padding|border",
        "-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
        "-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
        "-moz-border-radius-topleft": "<'border-top-left-radius'>",
        "-moz-border-radius-topright": "<'border-bottom-right-radius'>",
        "-moz-control-character-visibility": "visible|hidden",
        "-moz-osx-font-smoothing": "auto|grayscale",
        "-moz-user-select": "none|text|all|-moz-none",
        "-ms-flex-align": "start|end|center|baseline|stretch",
        "-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
        "-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
        "-ms-flex-negative": "<'flex-shrink'>",
        "-ms-flex-pack": "start|end|center|justify|distribute",
        "-ms-flex-order": "<integer>",
        "-ms-flex-positive": "<'flex-grow'>",
        "-ms-flex-preferred-size": "<'flex-basis'>",
        "-ms-interpolation-mode": "nearest-neighbor|bicubic",
        "-ms-grid-column-align": "start|end|center|stretch",
        "-ms-grid-row-align": "start|end|center|stretch",
        "-ms-hyphenate-limit-last": "none|always|column|page|spread",
        "-webkit-background-clip": "[<box>|border|padding|content|text]#",
        "-webkit-column-break-after": "always|auto|avoid",
        "-webkit-column-break-before": "always|auto|avoid",
        "-webkit-column-break-inside": "always|auto|avoid",
        "-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
        "-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
        "-webkit-print-color-adjust": "economy|exact",
        "-webkit-text-security": "none|circle|disc|square",
        "-webkit-user-drag": "none|element|auto",
        "-webkit-user-select": "auto|none|text|all",
        "alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
        "baseline-shift": "baseline|sub|super|<svg-length>",
        "behavior": "<url>+",
        "clip-rule": "nonzero|evenodd",
        "cue": "<'cue-before'> <'cue-after'>?",
        "cue-after": "<url> <decibel>?|none",
        "cue-before": "<url> <decibel>?|none",
        "dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
        "fill": "<paint>",
        "fill-opacity": "<number-zero-one>",
        "fill-rule": "nonzero|evenodd",
        "glyph-orientation-horizontal": "<angle>",
        "glyph-orientation-vertical": "<angle>",
        "kerning": "auto|<svg-length>",
        "marker": "none|<url>",
        "marker-end": "none|<url>",
        "marker-mid": "none|<url>",
        "marker-start": "none|<url>",
        "pause": "<'pause-before'> <'pause-after'>?",
        "pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
        "pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
        "rest": "<'rest-before'> <'rest-after'>?",
        "rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
        "rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
        "shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
        "src": "[<url> [format( <string># )]?|local( <family-name> )]#",
        "speak": "auto|none|normal",
        "speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
        "stroke": "<paint>",
        "stroke-dasharray": "none|[<svg-length>+]#",
        "stroke-dashoffset": "<svg-length>",
        "stroke-linecap": "butt|round|square",
        "stroke-linejoin": "miter|round|bevel",
        "stroke-miterlimit": "<number-one-or-greater>",
        "stroke-opacity": "<number-zero-one>",
        "stroke-width": "<svg-length>",
        "text-anchor": "start|middle|end",
        "unicode-range": "<urange>#",
        "voice-balance": "<number>|left|center|right|leftwards|rightwards",
        "voice-duration": "auto|<time>",
        "voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
        "voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
        "voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
        "voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
        "voice-stress": "normal|strong|moderate|none|reduced",
        "voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]"
    },
    "atrules": {
        "charset": {
            "prelude": "<string>",
            "descriptors": null
        },
        "counter-style": {
            "prelude": "<counter-style-name>",
            "descriptors": {
                "additive-symbols": "[<integer>&&<symbol>]#",
                "fallback": "<counter-style-name>",
                "negative": "<symbol> <symbol>?",
                "pad": "<integer>&&<symbol>",
                "prefix": "<symbol>",
                "range": "[[<integer>|infinite]{2}]#|auto",
                "speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
                "suffix": "<symbol>",
                "symbols": "<symbol>+",
                "system": "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
            }
        },
        "document": {
            "prelude": "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
            "descriptors": null
        },
        "font-face": {
            "prelude": null,
            "descriptors": {
                "ascent-override": "normal|<percentage>",
                "descent-override": "normal|<percentage>",
                "font-display": "[auto|block|swap|fallback|optional]",
                "font-family": "<family-name>",
                "font-feature-settings": "normal|<feature-tag-value>#",
                "font-variation-settings": "normal|[<string> <number>]#",
                "font-stretch": "<font-stretch-absolute>{1,2}",
                "font-style": "normal|italic|oblique <angle>{0,2}",
                "font-weight": "<font-weight-absolute>{1,2}",
                "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
                "line-gap-override": "normal|<percentage>",
                "size-adjust": "<percentage>",
                "src": "[<url> [format( <string># )]?|local( <family-name> )]#",
                "unicode-range": "<urange>#"
            }
        },
        "font-feature-values": {
            "prelude": "<family-name>#",
            "descriptors": null
        },
        "import": {
            "prelude": "[<string>|<url>] [<media-query-list>]?",
            "descriptors": null
        },
        "keyframes": {
            "prelude": "<keyframes-name>",
            "descriptors": null
        },
        "media": {
            "prelude": "<media-query-list>",
            "descriptors": null
        },
        "namespace": {
            "prelude": "<namespace-prefix>? [<string>|<url>]",
            "descriptors": null
        },
        "page": {
            "prelude": "<page-selector-list>",
            "descriptors": {
                "bleed": "auto|<length>",
                "marks": "none|[crop||cross]",
                "size": "<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"
            }
        },
        "property": {
            "prelude": "<custom-property-name>",
            "descriptors": {
                "syntax": "<string>",
                "inherits": "true|false",
                "initial-value": "<string>"
            }
        },
        "supports": {
            "prelude": "<supports-condition>",
            "descriptors": null
        },
        "viewport": {
            "prelude": null,
            "descriptors": {
                "height": "<viewport-length>{1,2}",
                "max-height": "<viewport-length>",
                "max-width": "<viewport-length>",
                "max-zoom": "auto|<number>|<percentage>",
                "min-height": "<viewport-length>",
                "min-width": "<viewport-length>",
                "min-zoom": "auto|<number>|<percentage>",
                "orientation": "auto|portrait|landscape",
                "user-zoom": "zoom|fixed",
                "viewport-fit": "auto|contain|cover",
                "width": "<viewport-length>{1,2}",
                "zoom": "auto|<number>|<percentage>"
            }
        }
    }
});

/***/ }),

/***/ "../../node_modules/css-tree/dist/version.js":
/*!***************************************************!*\
  !*** ../../node_modules/css-tree/dist/version.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "2.0.4";

/***/ }),

/***/ "../../node_modules/css-tree/lib/convertor/create.js":
/*!***********************************************************!*\
  !*** ../../node_modules/css-tree/lib/convertor/create.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createConvertor": () => (/* binding */ createConvertor)
/* harmony export */ });
/* harmony import */ var _utils_List_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/List.js */ "../../node_modules/css-tree/lib/utils/List.js");


function createConvertor(walk) {
    return {
        fromPlainObject: function(ast) {
            walk(ast, {
                enter: function(node) {
                    if (node.children && node.children instanceof _utils_List_js__WEBPACK_IMPORTED_MODULE_0__.List === false) {
                        node.children = new _utils_List_js__WEBPACK_IMPORTED_MODULE_0__.List().fromArray(node.children);
                    }
                }
            });

            return ast;
        },
        toPlainObject: function(ast) {
            walk(ast, {
                leave: function(node) {
                    if (node.children && node.children instanceof _utils_List_js__WEBPACK_IMPORTED_MODULE_0__.List) {
                        node.children = node.children.toArray();
                    }
                }
            });

            return ast;
        }
    };
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/definition-syntax/SyntaxError.js":
/*!************************************************************************!*\
  !*** ../../node_modules/css-tree/lib/definition-syntax/SyntaxError.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyntaxError": () => (/* binding */ SyntaxError)
/* harmony export */ });
/* harmony import */ var _utils_create_custom_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/create-custom-error.js */ "../../node_modules/css-tree/lib/utils/create-custom-error.js");


function SyntaxError(message, input, offset) {
    return Object.assign((0,_utils_create_custom_error_js__WEBPACK_IMPORTED_MODULE_0__.createCustomError)('SyntaxError', message), {
        input,
        offset,
        rawMessage: message,
        message: message + '\n' +
            '  ' + input + '\n' +
            '--' + new Array((offset || input.length) + 1).join('-') + '^'
    });
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/definition-syntax/generate.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/definition-syntax/generate.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate)
/* harmony export */ });
function noop(value) {
    return value;
}

function generateMultiplier(multiplier) {
    const { min, max, comma } = multiplier;

    if (min === 0 && max === 0) {
        return '*';
    }

    if (min === 0 && max === 1) {
        return '?';
    }

    if (min === 1 && max === 0) {
        return comma ? '#' : '+';
    }

    if (min === 1 && max === 1) {
        return '';
    }

    return (
        (comma ? '#' : '') +
        (min === max
            ? '{' + min + '}'
            : '{' + min + ',' + (max !== 0 ? max : '') + '}'
        )
    );
}

function generateTypeOpts(node) {
    switch (node.type) {
        case 'Range':
            return (
                ' [' +
                (node.min === null ? '-∞' : node.min) +
                ',' +
                (node.max === null ? '∞' : node.max) +
                ']'
            );

        default:
            throw new Error('Unknown node type `' + node.type + '`');
    }
}

function generateSequence(node, decorate, forceBraces, compact) {
    const combinator = node.combinator === ' ' || compact ? node.combinator : ' ' + node.combinator + ' ';
    const result = node.terms
        .map(term => internalGenerate(term, decorate, forceBraces, compact))
        .join(combinator);

    if (node.explicit || forceBraces) {
        return (compact || result[0] === ',' ? '[' : '[ ') + result + (compact ? ']' : ' ]');
    }

    return result;
}

function internalGenerate(node, decorate, forceBraces, compact) {
    let result;

    switch (node.type) {
        case 'Group':
            result =
                generateSequence(node, decorate, forceBraces, compact) +
                (node.disallowEmpty ? '!' : '');
            break;

        case 'Multiplier':
            // return since node is a composition
            return (
                internalGenerate(node.term, decorate, forceBraces, compact) +
                decorate(generateMultiplier(node), node)
            );

        case 'Type':
            result = '<' + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : '') + '>';
            break;

        case 'Property':
            result = '<\'' + node.name + '\'>';
            break;

        case 'Keyword':
            result = node.name;
            break;

        case 'AtKeyword':
            result = '@' + node.name;
            break;

        case 'Function':
            result = node.name + '(';
            break;

        case 'String':
        case 'Token':
            result = node.value;
            break;

        case 'Comma':
            result = ',';
            break;

        default:
            throw new Error('Unknown node type `' + node.type + '`');
    }

    return decorate(result, node);
}

function generate(node, options) {
    let decorate = noop;
    let forceBraces = false;
    let compact = false;

    if (typeof options === 'function') {
        decorate = options;
    } else if (options) {
        forceBraces = Boolean(options.forceBraces);
        compact = Boolean(options.compact);
        if (typeof options.decorate === 'function') {
            decorate = options.decorate;
        }
    }

    return internalGenerate(node, decorate, forceBraces, compact);
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/definition-syntax/index.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/definition-syntax/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyntaxError": () => (/* reexport safe */ _SyntaxError_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxError),
/* harmony export */   "generate": () => (/* reexport safe */ _generate_js__WEBPACK_IMPORTED_MODULE_1__.generate),
/* harmony export */   "parse": () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_2__.parse),
/* harmony export */   "walk": () => (/* reexport safe */ _walk_js__WEBPACK_IMPORTED_MODULE_3__.walk)
/* harmony export */ });
/* harmony import */ var _SyntaxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SyntaxError.js */ "../../node_modules/css-tree/lib/definition-syntax/SyntaxError.js");
/* harmony import */ var _generate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generate.js */ "../../node_modules/css-tree/lib/definition-syntax/generate.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse.js */ "../../node_modules/css-tree/lib/definition-syntax/parse.js");
/* harmony import */ var _walk_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./walk.js */ "../../node_modules/css-tree/lib/definition-syntax/walk.js");






/***/ }),

/***/ "../../node_modules/css-tree/lib/definition-syntax/parse.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/definition-syntax/parse.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenizer.js */ "../../node_modules/css-tree/lib/definition-syntax/tokenizer.js");


const TAB = 9;
const N = 10;
const F = 12;
const R = 13;
const SPACE = 32;
const EXCLAMATIONMARK = 33;    // !
const NUMBERSIGN = 35;         // #
const AMPERSAND = 38;          // &
const APOSTROPHE = 39;         // '
const LEFTPARENTHESIS = 40;    // (
const RIGHTPARENTHESIS = 41;   // )
const ASTERISK = 42;           // *
const PLUSSIGN = 43;           // +
const COMMA = 44;              // ,
const HYPERMINUS = 45;         // -
const LESSTHANSIGN = 60;       // <
const GREATERTHANSIGN = 62;    // >
const QUESTIONMARK = 63;       // ?
const COMMERCIALAT = 64;       // @
const LEFTSQUAREBRACKET = 91;  // [
const RIGHTSQUAREBRACKET = 93; // ]
const LEFTCURLYBRACKET = 123;  // {
const VERTICALLINE = 124;      // |
const RIGHTCURLYBRACKET = 125; // }
const INFINITY = 8734;         // ∞
const NAME_CHAR = new Uint8Array(128).map((_, idx) =>
    /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0
);
const COMBINATOR_PRECEDENCE = {
    ' ': 1,
    '&&': 2,
    '||': 3,
    '|': 4
};

function scanSpaces(tokenizer) {
    return tokenizer.substringToPos(
        tokenizer.findWsEnd(tokenizer.pos)
    );
}

function scanWord(tokenizer) {
    let end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        const code = tokenizer.str.charCodeAt(end);
        if (code >= 128 || NAME_CHAR[code] === 0) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a keyword');
    }

    return tokenizer.substringToPos(end);
}

function scanNumber(tokenizer) {
    let end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        const code = tokenizer.str.charCodeAt(end);
        if (code < 48 || code > 57) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a number');
    }

    return tokenizer.substringToPos(end);
}

function scanString(tokenizer) {
    const end = tokenizer.str.indexOf('\'', tokenizer.pos + 1);

    if (end === -1) {
        tokenizer.pos = tokenizer.str.length;
        tokenizer.error('Expect an apostrophe');
    }

    return tokenizer.substringToPos(end + 1);
}

function readMultiplierRange(tokenizer) {
    let min = null;
    let max = null;

    tokenizer.eat(LEFTCURLYBRACKET);

    min = scanNumber(tokenizer);

    if (tokenizer.charCode() === COMMA) {
        tokenizer.pos++;
        if (tokenizer.charCode() !== RIGHTCURLYBRACKET) {
            max = scanNumber(tokenizer);
        }
    } else {
        max = min;
    }

    tokenizer.eat(RIGHTCURLYBRACKET);

    return {
        min: Number(min),
        max: max ? Number(max) : 0
    };
}

function readMultiplier(tokenizer) {
    let range = null;
    let comma = false;

    switch (tokenizer.charCode()) {
        case ASTERISK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 0
            };

            break;

        case PLUSSIGN:
            tokenizer.pos++;

            range = {
                min: 1,
                max: 0
            };

            break;

        case QUESTIONMARK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 1
            };

            break;

        case NUMBERSIGN:
            tokenizer.pos++;

            comma = true;

            if (tokenizer.charCode() === LEFTCURLYBRACKET) {
                range = readMultiplierRange(tokenizer);
            } else {
                range = {
                    min: 1,
                    max: 0
                };
            }

            break;

        case LEFTCURLYBRACKET:
            range = readMultiplierRange(tokenizer);
            break;

        default:
            return null;
    }

    return {
        type: 'Multiplier',
        comma,
        min: range.min,
        max: range.max,
        term: null
    };
}

function maybeMultiplied(tokenizer, node) {
    const multiplier = readMultiplier(tokenizer);

    if (multiplier !== null) {
        multiplier.term = node;
        return multiplier;
    }

    return node;
}

function maybeToken(tokenizer) {
    const ch = tokenizer.peek();

    if (ch === '') {
        return null;
    }

    return {
        type: 'Token',
        value: ch
    };
}

function readProperty(tokenizer) {
    let name;

    tokenizer.eat(LESSTHANSIGN);
    tokenizer.eat(APOSTROPHE);

    name = scanWord(tokenizer);

    tokenizer.eat(APOSTROPHE);
    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Property',
        name
    });
}

// https://drafts.csswg.org/css-values-3/#numeric-ranges
// 4.1. Range Restrictions and Range Definition Notation
//
// Range restrictions can be annotated in the numeric type notation using CSS bracketed
// range notation—[min,max]—within the angle brackets, after the identifying keyword,
// indicating a closed range between (and including) min and max.
// For example, <integer [0, 10]> indicates an integer between 0 and 10, inclusive.
function readTypeRange(tokenizer) {
    // use null for Infinity to make AST format JSON serializable/deserializable
    let min = null; // -Infinity
    let max = null; // Infinity
    let sign = 1;

    tokenizer.eat(LEFTSQUAREBRACKET);

    if (tokenizer.charCode() === HYPERMINUS) {
        tokenizer.peek();
        sign = -1;
    }

    if (sign == -1 && tokenizer.charCode() === INFINITY) {
        tokenizer.peek();
    } else {
        min = sign * Number(scanNumber(tokenizer));
    }

    scanSpaces(tokenizer);
    tokenizer.eat(COMMA);
    scanSpaces(tokenizer);

    if (tokenizer.charCode() === INFINITY) {
        tokenizer.peek();
    } else {
        sign = 1;

        if (tokenizer.charCode() === HYPERMINUS) {
            tokenizer.peek();
            sign = -1;
        }

        max = sign * Number(scanNumber(tokenizer));
    }

    tokenizer.eat(RIGHTSQUAREBRACKET);

    // If no range is indicated, either by using the bracketed range notation
    // or in the property description, then [−∞,∞] is assumed.
    if (min === null && max === null) {
        return null;
    }

    return {
        type: 'Range',
        min,
        max
    };
}

function readType(tokenizer) {
    let name;
    let opts = null;

    tokenizer.eat(LESSTHANSIGN);
    name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS &&
        tokenizer.nextCharCode() === RIGHTPARENTHESIS) {
        tokenizer.pos += 2;
        name += '()';
    }

    if (tokenizer.charCodeAt(tokenizer.findWsEnd(tokenizer.pos)) === LEFTSQUAREBRACKET) {
        scanSpaces(tokenizer);
        opts = readTypeRange(tokenizer);
    }

    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Type',
        name,
        opts
    });
}

function readKeywordOrFunction(tokenizer) {
    const name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS) {
        tokenizer.pos++;

        return {
            type: 'Function',
            name
        };
    }

    return maybeMultiplied(tokenizer, {
        type: 'Keyword',
        name
    });
}

function regroupTerms(terms, combinators) {
    function createGroup(terms, combinator) {
        return {
            type: 'Group',
            terms,
            combinator,
            disallowEmpty: false,
            explicit: false
        };
    }

    let combinator;

    combinators = Object.keys(combinators)
        .sort((a, b) => COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b]);

    while (combinators.length > 0) {
        combinator = combinators.shift();

        let i = 0;
        let subgroupStart = 0;

        for (; i < terms.length; i++) {
            const term = terms[i];

            if (term.type === 'Combinator') {
                if (term.value === combinator) {
                    if (subgroupStart === -1) {
                        subgroupStart = i - 1;
                    }
                    terms.splice(i, 1);
                    i--;
                } else {
                    if (subgroupStart !== -1 && i - subgroupStart > 1) {
                        terms.splice(
                            subgroupStart,
                            i - subgroupStart,
                            createGroup(terms.slice(subgroupStart, i), combinator)
                        );
                        i = subgroupStart + 1;
                    }
                    subgroupStart = -1;
                }
            }
        }

        if (subgroupStart !== -1 && combinators.length) {
            terms.splice(
                subgroupStart,
                i - subgroupStart,
                createGroup(terms.slice(subgroupStart, i), combinator)
            );
        }
    }

    return combinator;
}

function readImplicitGroup(tokenizer) {
    const terms = [];
    const combinators = {};
    let token;
    let prevToken = null;
    let prevTokenPos = tokenizer.pos;

    while (token = peek(tokenizer)) {
        if (token.type !== 'Spaces') {
            if (token.type === 'Combinator') {
                // check for combinator in group beginning and double combinator sequence
                if (prevToken === null || prevToken.type === 'Combinator') {
                    tokenizer.pos = prevTokenPos;
                    tokenizer.error('Unexpected combinator');
                }

                combinators[token.value] = true;
            } else if (prevToken !== null && prevToken.type !== 'Combinator') {
                combinators[' '] = true;  // a b
                terms.push({
                    type: 'Combinator',
                    value: ' '
                });
            }

            terms.push(token);
            prevToken = token;
            prevTokenPos = tokenizer.pos;
        }
    }

    // check for combinator in group ending
    if (prevToken !== null && prevToken.type === 'Combinator') {
        tokenizer.pos -= prevTokenPos;
        tokenizer.error('Unexpected combinator');
    }

    return {
        type: 'Group',
        terms,
        combinator: regroupTerms(terms, combinators) || ' ',
        disallowEmpty: false,
        explicit: false
    };
}

function readGroup(tokenizer) {
    let result;

    tokenizer.eat(LEFTSQUAREBRACKET);
    result = readImplicitGroup(tokenizer);
    tokenizer.eat(RIGHTSQUAREBRACKET);

    result.explicit = true;

    if (tokenizer.charCode() === EXCLAMATIONMARK) {
        tokenizer.pos++;
        result.disallowEmpty = true;
    }

    return result;
}

function peek(tokenizer) {
    let code = tokenizer.charCode();

    if (code < 128 && NAME_CHAR[code] === 1) {
        return readKeywordOrFunction(tokenizer);
    }

    switch (code) {
        case RIGHTSQUAREBRACKET:
            // don't eat, stop scan a group
            break;

        case LEFTSQUAREBRACKET:
            return maybeMultiplied(tokenizer, readGroup(tokenizer));

        case LESSTHANSIGN:
            return tokenizer.nextCharCode() === APOSTROPHE
                ? readProperty(tokenizer)
                : readType(tokenizer);

        case VERTICALLINE:
            return {
                type: 'Combinator',
                value: tokenizer.substringToPos(
                    tokenizer.pos + (tokenizer.nextCharCode() === VERTICALLINE ? 2 : 1)
                )
            };

        case AMPERSAND:
            tokenizer.pos++;
            tokenizer.eat(AMPERSAND);

            return {
                type: 'Combinator',
                value: '&&'
            };

        case COMMA:
            tokenizer.pos++;
            return {
                type: 'Comma'
            };

        case APOSTROPHE:
            return maybeMultiplied(tokenizer, {
                type: 'String',
                value: scanString(tokenizer)
            });

        case SPACE:
        case TAB:
        case N:
        case R:
        case F:
            return {
                type: 'Spaces',
                value: scanSpaces(tokenizer)
            };

        case COMMERCIALAT:
            code = tokenizer.nextCharCode();

            if (code < 128 && NAME_CHAR[code] === 1) {
                tokenizer.pos++;
                return {
                    type: 'AtKeyword',
                    name: scanWord(tokenizer)
                };
            }

            return maybeToken(tokenizer);

        case ASTERISK:
        case PLUSSIGN:
        case QUESTIONMARK:
        case NUMBERSIGN:
        case EXCLAMATIONMARK:
            // prohibited tokens (used as a multiplier start)
            break;

        case LEFTCURLYBRACKET:
            // LEFTCURLYBRACKET is allowed since mdn/data uses it w/o quoting
            // check next char isn't a number, because it's likely a disjoined multiplier
            code = tokenizer.nextCharCode();

            if (code < 48 || code > 57) {
                return maybeToken(tokenizer);
            }

            break;

        default:
            return maybeToken(tokenizer);
    }
}

function parse(source) {
    const tokenizer = new _tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.Tokenizer(source);
    const result = readImplicitGroup(tokenizer);

    if (tokenizer.pos !== source.length) {
        tokenizer.error('Unexpected input');
    }

    // reduce redundant groups with single group term
    if (result.terms.length === 1 && result.terms[0].type === 'Group') {
        return result.terms[0];
    }

    return result;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/definition-syntax/tokenizer.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/definition-syntax/tokenizer.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tokenizer": () => (/* binding */ Tokenizer)
/* harmony export */ });
/* harmony import */ var _SyntaxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SyntaxError.js */ "../../node_modules/css-tree/lib/definition-syntax/SyntaxError.js");


const TAB = 9;
const N = 10;
const F = 12;
const R = 13;
const SPACE = 32;

class Tokenizer {
    constructor(str) {
        this.str = str;
        this.pos = 0;
    }
    charCodeAt(pos) {
        return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
    }
    charCode() {
        return this.charCodeAt(this.pos);
    }
    nextCharCode() {
        return this.charCodeAt(this.pos + 1);
    }
    nextNonWsCode(pos) {
        return this.charCodeAt(this.findWsEnd(pos));
    }
    findWsEnd(pos) {
        for (; pos < this.str.length; pos++) {
            const code = this.str.charCodeAt(pos);
            if (code !== R && code !== N && code !== F && code !== SPACE && code !== TAB) {
                break;
            }
        }

        return pos;
    }
    substringToPos(end) {
        return this.str.substring(this.pos, this.pos = end);
    }
    eat(code) {
        if (this.charCode() !== code) {
            this.error('Expect `' + String.fromCharCode(code) + '`');
        }

        this.pos++;
    }
    peek() {
        return this.pos < this.str.length ? this.str.charAt(this.pos++) : '';
    }
    error(message) {
        throw new _SyntaxError_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxError(message, this.str, this.pos);
    }
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/definition-syntax/walk.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/definition-syntax/walk.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "walk": () => (/* binding */ walk)
/* harmony export */ });
const noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

function walk(node, options, context) {
    function walk(node) {
        enter.call(context, node);

        switch (node.type) {
            case 'Group':
                node.terms.forEach(walk);
                break;

            case 'Multiplier':
                walk(node.term);
                break;

            case 'Type':
            case 'Property':
            case 'Keyword':
            case 'AtKeyword':
            case 'Function':
            case 'String':
            case 'Token':
            case 'Comma':
                break;

            default:
                throw new Error('Unknown type: ' + node.type);
        }

        leave.call(context, node);
    }

    let enter = noop;
    let leave = noop;

    if (typeof options === 'function') {
        enter = options;
    } else if (options) {
        enter = ensureFunction(options.enter);
        leave = ensureFunction(options.leave);
    }

    if (enter === noop && leave === noop) {
        throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
    }

    walk(node, context);
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/generator/create.js":
/*!***********************************************************!*\
  !*** ../../node_modules/css-tree/lib/generator/create.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGenerator": () => (/* binding */ createGenerator)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");
/* harmony import */ var _sourceMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sourceMap.js */ "../../node_modules/css-tree/lib/generator/sourceMap.js");
/* harmony import */ var _token_before_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./token-before.js */ "../../node_modules/css-tree/lib/generator/token-before.js");




const REVERSESOLIDUS = 0x005c; // U+005C REVERSE SOLIDUS (\)

function processChildren(node, delimeter) {
    if (typeof delimeter === 'function') {
        let prev = null;

        node.children.forEach(node => {
            if (prev !== null) {
                delimeter.call(this, prev);
            }

            this.node(node);
            prev = node;
        });

        return;
    }

    node.children.forEach(this.node, this);
}

function processChunk(chunk) {
    (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.tokenize)(chunk, (type, start, end) => {
        this.token(type, chunk.slice(start, end));
    });
}

function createGenerator(config) {
    const types = new Map();

    for (let name in config.node) {
        types.set(name, config.node[name].generate);
    }

    return function(node, options) {
        let buffer = '';
        let prevCode = 0;
        let handlers = {
            node(node) {
                if (types.has(node.type)) {
                    types.get(node.type).call(publicApi, node);
                } else {
                    throw new Error('Unknown node type: ' + node.type);
                }
            },
            tokenBefore: _token_before_js__WEBPACK_IMPORTED_MODULE_2__.safe,
            token(type, value) {
                prevCode = this.tokenBefore(prevCode, type, value);

                this.emit(value, type, false);

                if (type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim && value.charCodeAt(0) === REVERSESOLIDUS) {
                    this.emit('\n', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace, true);
                }
            },
            emit(value) {
                buffer += value;
            },
            result() {
                return buffer;
            }
        };

        if (options) {
            if (typeof options.decorator === 'function') {
                handlers = options.decorator(handlers);
            }

            if (options.sourceMap) {
                handlers = (0,_sourceMap_js__WEBPACK_IMPORTED_MODULE_1__.generateSourceMap)(handlers);
            }

            if (options.mode in _token_before_js__WEBPACK_IMPORTED_MODULE_2__) {
                handlers.tokenBefore = _token_before_js__WEBPACK_IMPORTED_MODULE_2__[options.mode];
            }
        }

        const publicApi = {
            node: (node) => handlers.node(node),
            children: processChildren,
            token: (type, value) => handlers.token(type, value),
            tokenize: processChunk
        };

        handlers.node(node);

        return handlers.result();
    };
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/generator/sourceMap.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/generator/sourceMap.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateSourceMap": () => (/* binding */ generateSourceMap)
/* harmony export */ });
/* harmony import */ var source_map_js_lib_source_map_generator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-js/lib/source-map-generator.js */ "../../node_modules/source-map-js/lib/source-map-generator.js");


const trackNodes = new Set(['Atrule', 'Selector', 'Declaration']);

function generateSourceMap(handlers) {
    const map = new source_map_js_lib_source_map_generator_js__WEBPACK_IMPORTED_MODULE_0__.SourceMapGenerator();
    const generated = {
        line: 1,
        column: 0
    };
    const original = {
        line: 0, // should be zero to add first mapping
        column: 0
    };
    const activatedGenerated = {
        line: 1,
        column: 0
    };
    const activatedMapping = {
        generated: activatedGenerated
    };
    let line = 1;
    let column = 0;
    let sourceMappingActive = false;

    const origHandlersNode = handlers.node;
    handlers.node = function(node) {
        if (node.loc && node.loc.start && trackNodes.has(node.type)) {
            const nodeLine = node.loc.start.line;
            const nodeColumn = node.loc.start.column - 1;

            if (original.line !== nodeLine ||
                original.column !== nodeColumn) {
                original.line = nodeLine;
                original.column = nodeColumn;

                generated.line = line;
                generated.column = column;

                if (sourceMappingActive) {
                    sourceMappingActive = false;
                    if (generated.line !== activatedGenerated.line ||
                        generated.column !== activatedGenerated.column) {
                        map.addMapping(activatedMapping);
                    }
                }

                sourceMappingActive = true;
                map.addMapping({
                    source: node.loc.source,
                    original,
                    generated
                });
            }
        }

        origHandlersNode.call(this, node);

        if (sourceMappingActive && trackNodes.has(node.type)) {
            activatedGenerated.line = line;
            activatedGenerated.column = column;
        }
    };

    const origHandlersEmit = handlers.emit;
    handlers.emit = function(value, type, auto) {
        for (let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) === 10) { // \n
                line++;
                column = 0;
            } else {
                column++;
            }
        }

        origHandlersEmit(value, type, auto);
    };

    const origHandlersResult = handlers.result;
    handlers.result = function() {
        if (sourceMappingActive) {
            map.addMapping(activatedMapping);
        }

        return {
            css: origHandlersResult(),
            map
        };
    };

    return handlers;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/generator/token-before.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/generator/token-before.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "safe": () => (/* binding */ safe),
/* harmony export */   "spec": () => (/* binding */ spec)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)

const code = (type, value) => {
    if (type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim) {
        type = value;
    }

    if (typeof type === 'string') {
        const charCode = type.charCodeAt(0);
        return charCode > 0x7F ? 0x8000 : charCode << 8;
    }

    return type;
};

// https://www.w3.org/TR/css-syntax-3/#serialization
// The only requirement for serialization is that it must "round-trip" with parsing,
// that is, parsing the stylesheet must produce the same data structures as parsing,
// serializing, and parsing again, except for consecutive <whitespace-token>s,
// which may be collapsed into a single token.

const specPairs = [
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, '-'],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, '-'],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, '-'],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, '-'],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC],

    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    ['#', '-'],
    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    ['#', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    ['-', '-'],
    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    ['-', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, '%'],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    ['@', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    ['@', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    ['@', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url],
    ['@', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl],
    ['@', '-'],
    ['@', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC], // https://github.com/w3c/csswg-drafts/pull/6874

    ['.', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    ['.', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    ['.', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],

    ['+', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number],
    ['+', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    ['+', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],

    ['/', '*']
];
// validate with scripts/generate-safe
const safePairs = specPairs.concat([
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.String],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage, '-'],

    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, '-']
]);

function createMap(pairs) {
    const isWhiteSpaceRequired = new Set(
        pairs.map(([prev, next]) => (code(prev) << 16 | code(next)))
    );

    return function(prevCode, type, value) {
        const nextCode = code(type, value);
        const nextCharCode = value.charCodeAt(0);
        const emitWs =
            (nextCharCode === HYPHENMINUS &&
                type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident &&
                type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function &&
                type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC) ||
            (nextCharCode === PLUSSIGN)
                ? isWhiteSpaceRequired.has(prevCode << 16 | nextCharCode << 8)
                : isWhiteSpaceRequired.has(prevCode << 16 | nextCode);

        if (emitWs) {
            this.emit(' ', _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace, true);
        }

        return nextCode;
    };
}

const spec = createMap(specPairs);
const safe = createMap(safePairs);


/***/ }),

/***/ "../../node_modules/css-tree/lib/index.js":
/*!************************************************!*\
  !*** ../../node_modules/css-tree/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lexer": () => (/* reexport safe */ _lexer_Lexer_js__WEBPACK_IMPORTED_MODULE_4__.Lexer),
/* harmony export */   "List": () => (/* reexport safe */ _utils_List_js__WEBPACK_IMPORTED_MODULE_3__.List),
/* harmony export */   "TokenStream": () => (/* reexport safe */ _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_5__.TokenStream),
/* harmony export */   "clone": () => (/* reexport safe */ _utils_clone_js__WEBPACK_IMPORTED_MODULE_7__.clone),
/* harmony export */   "createLexer": () => (/* binding */ createLexer),
/* harmony export */   "createSyntax": () => (/* reexport safe */ _syntax_create_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "definitionSyntax": () => (/* reexport module object */ _definition_syntax_index_js__WEBPACK_IMPORTED_MODULE_6__),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findAll": () => (/* binding */ findAll),
/* harmony export */   "findLast": () => (/* binding */ findLast),
/* harmony export */   "fork": () => (/* binding */ fork),
/* harmony export */   "fromPlainObject": () => (/* binding */ fromPlainObject),
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "ident": () => (/* reexport module object */ _utils_ident_js__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   "isCustomProperty": () => (/* reexport safe */ _utils_names_js__WEBPACK_IMPORTED_MODULE_8__.isCustomProperty),
/* harmony export */   "keyword": () => (/* reexport safe */ _utils_names_js__WEBPACK_IMPORTED_MODULE_8__.keyword),
/* harmony export */   "lexer": () => (/* binding */ lexer),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "property": () => (/* reexport safe */ _utils_names_js__WEBPACK_IMPORTED_MODULE_8__.property),
/* harmony export */   "string": () => (/* reexport module object */ _utils_string_js__WEBPACK_IMPORTED_MODULE_10__),
/* harmony export */   "toPlainObject": () => (/* binding */ toPlainObject),
/* harmony export */   "tokenNames": () => (/* reexport safe */ _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_5__.tokenNames),
/* harmony export */   "tokenTypes": () => (/* reexport safe */ _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_5__.tokenTypes),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "url": () => (/* reexport module object */ _utils_url_js__WEBPACK_IMPORTED_MODULE_11__),
/* harmony export */   "vendorPrefix": () => (/* reexport safe */ _utils_names_js__WEBPACK_IMPORTED_MODULE_8__.vendorPrefix),
/* harmony export */   "version": () => (/* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_1__.version),
/* harmony export */   "walk": () => (/* binding */ walk)
/* harmony export */ });
/* harmony import */ var _syntax_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syntax/index.js */ "../../node_modules/css-tree/lib/syntax/index.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./version.js */ "../../node_modules/css-tree/dist/version.js");
/* harmony import */ var _syntax_create_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./syntax/create.js */ "../../node_modules/css-tree/lib/syntax/create.js");
/* harmony import */ var _utils_List_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/List.js */ "../../node_modules/css-tree/lib/utils/List.js");
/* harmony import */ var _lexer_Lexer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lexer/Lexer.js */ "../../node_modules/css-tree/lib/lexer/Lexer.js");
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");
/* harmony import */ var _definition_syntax_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./definition-syntax/index.js */ "../../node_modules/css-tree/lib/definition-syntax/index.js");
/* harmony import */ var _utils_clone_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/clone.js */ "../../node_modules/css-tree/lib/utils/clone.js");
/* harmony import */ var _utils_names_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/names.js */ "../../node_modules/css-tree/lib/utils/names.js");
/* harmony import */ var _utils_ident_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/ident.js */ "../../node_modules/css-tree/lib/utils/ident.js");
/* harmony import */ var _utils_string_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/string.js */ "../../node_modules/css-tree/lib/utils/string.js");
/* harmony import */ var _utils_url_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/url.js */ "../../node_modules/css-tree/lib/utils/url.js");













const {
    tokenize,
    parse,
    generate,
    lexer,
    createLexer,

    walk,
    find,
    findLast,
    findAll,

    toPlainObject,
    fromPlainObject,

    fork
} = _syntax_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/Lexer.js":
/*!******************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/Lexer.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lexer": () => (/* binding */ Lexer)
/* harmony export */ });
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.js */ "../../node_modules/css-tree/lib/lexer/error.js");
/* harmony import */ var _utils_names_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/names.js */ "../../node_modules/css-tree/lib/utils/names.js");
/* harmony import */ var _generic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generic.js */ "../../node_modules/css-tree/lib/lexer/generic.js");
/* harmony import */ var _definition_syntax_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../definition-syntax/index.js */ "../../node_modules/css-tree/lib/definition-syntax/index.js");
/* harmony import */ var _prepare_tokens_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prepare-tokens.js */ "../../node_modules/css-tree/lib/lexer/prepare-tokens.js");
/* harmony import */ var _match_graph_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./match-graph.js */ "../../node_modules/css-tree/lib/lexer/match-graph.js");
/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./match.js */ "../../node_modules/css-tree/lib/lexer/match.js");
/* harmony import */ var _trace_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./trace.js */ "../../node_modules/css-tree/lib/lexer/trace.js");
/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./search.js */ "../../node_modules/css-tree/lib/lexer/search.js");
/* harmony import */ var _structure_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./structure.js */ "../../node_modules/css-tree/lib/lexer/structure.js");











const cssWideKeywords = (0,_match_graph_js__WEBPACK_IMPORTED_MODULE_5__.buildMatchGraph)('inherit | initial | unset');
const cssWideKeywordsWithExpression = (0,_match_graph_js__WEBPACK_IMPORTED_MODULE_5__.buildMatchGraph)('inherit | initial | unset | <-ms-legacy-expression>');

function dumpMapSyntax(map, compact, syntaxAsAst) {
    const result = {};

    for (const name in map) {
        if (map[name].syntax) {
            result[name] = syntaxAsAst
                ? map[name].syntax
                : (0,_definition_syntax_index_js__WEBPACK_IMPORTED_MODULE_3__.generate)(map[name].syntax, { compact });
        }
    }

    return result;
}

function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
    const result = {};

    for (const [name, atrule] of Object.entries(map)) {
        result[name] = {
            prelude: atrule.prelude && (
                syntaxAsAst
                    ? atrule.prelude.syntax
                    : (0,_definition_syntax_index_js__WEBPACK_IMPORTED_MODULE_3__.generate)(atrule.prelude.syntax, { compact })
            ),
            descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
        };
    }

    return result;
}

function valueHasVar(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].value.toLowerCase() === 'var(') {
            return true;
        }
    }

    return false;
}

function buildMatchResult(matched, error, iterations) {
    return {
        matched,
        iterations,
        error,
        ..._trace_js__WEBPACK_IMPORTED_MODULE_7__
    };
}

function matchSyntax(lexer, syntax, value, useCommon) {
    const tokens = (0,_prepare_tokens_js__WEBPACK_IMPORTED_MODULE_4__["default"])(value, lexer.syntax);
    let result;

    if (valueHasVar(tokens)) {
        return buildMatchResult(null, new Error('Matching for a tree with var() is not supported'));
    }

    if (useCommon) {
        result = (0,_match_js__WEBPACK_IMPORTED_MODULE_6__.matchAsTree)(tokens, lexer.valueCommonSyntax, lexer);
    }

    if (!useCommon || !result.match) {
        result = (0,_match_js__WEBPACK_IMPORTED_MODULE_6__.matchAsTree)(tokens, syntax.match, lexer);
        if (!result.match) {
            return buildMatchResult(
                null,
                new _error_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxMatchError(result.reason, syntax.syntax, value, result),
                result.iterations
            );
        }
    }

    return buildMatchResult(result.match, null, result.iterations);
}

class Lexer {
    constructor(config, syntax, structure) {
        this.valueCommonSyntax = cssWideKeywords;
        this.syntax = syntax;
        this.generic = false;
        this.atrules = Object.create(null);
        this.properties = Object.create(null);
        this.types = Object.create(null);
        this.structure = structure || (0,_structure_js__WEBPACK_IMPORTED_MODULE_9__.getStructureFromConfig)(config);

        if (config) {
            if (config.types) {
                for (const name in config.types) {
                    this.addType_(name, config.types[name]);
                }
            }

            if (config.generic) {
                this.generic = true;
                for (const name in _generic_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                    this.addType_(name, _generic_js__WEBPACK_IMPORTED_MODULE_2__["default"][name]);
                }
            }

            if (config.atrules) {
                for (const name in config.atrules) {
                    this.addAtrule_(name, config.atrules[name]);
                }
            }

            if (config.properties) {
                for (const name in config.properties) {
                    this.addProperty_(name, config.properties[name]);
                }
            }
        }
    }

    checkStructure(ast) {
        function collectWarning(node, message) {
            warns.push({ node, message });
        }

        const structure = this.structure;
        const warns = [];

        this.syntax.walk(ast, function(node) {
            if (structure.hasOwnProperty(node.type)) {
                structure[node.type].check(node, collectWarning);
            } else {
                collectWarning(node, 'Unknown node type `' + node.type + '`');
            }
        });

        return warns.length ? warns : false;
    }

    createDescriptor(syntax, type, name, parent = null) {
        const ref = {
            type,
            name
        };
        const descriptor = {
            type,
            name,
            parent,
            serializable: typeof syntax === 'string' || (syntax && typeof syntax.type === 'string'),
            syntax: null,
            match: null
        };

        if (typeof syntax === 'function') {
            descriptor.match = (0,_match_graph_js__WEBPACK_IMPORTED_MODULE_5__.buildMatchGraph)(syntax, ref);
        } else {
            if (typeof syntax === 'string') {
                // lazy parsing on first access
                Object.defineProperty(descriptor, 'syntax', {
                    get() {
                        Object.defineProperty(descriptor, 'syntax', {
                            value: (0,_definition_syntax_index_js__WEBPACK_IMPORTED_MODULE_3__.parse)(syntax)
                        });

                        return descriptor.syntax;
                    }
                });
            } else {
                descriptor.syntax = syntax;
            }

            // lazy graph build on first access
            Object.defineProperty(descriptor, 'match', {
                get() {
                    Object.defineProperty(descriptor, 'match', {
                        value: (0,_match_graph_js__WEBPACK_IMPORTED_MODULE_5__.buildMatchGraph)(descriptor.syntax, ref)
                    });

                    return descriptor.match;
                }
            });
        }

        return descriptor;
    }
    addAtrule_(name, syntax) {
        if (!syntax) {
            return;
        }

        this.atrules[name] = {
            type: 'Atrule',
            name: name,
            prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, 'AtrulePrelude', name) : null,
            descriptors: syntax.descriptors
                ? Object.keys(syntax.descriptors).reduce(
                    (map, descName) => {
                        map[descName] = this.createDescriptor(syntax.descriptors[descName], 'AtruleDescriptor', descName, name);
                        return map;
                    },
                    Object.create(null)
                )
                : null
        };
    }
    addProperty_(name, syntax) {
        if (!syntax) {
            return;
        }

        this.properties[name] = this.createDescriptor(syntax, 'Property', name);
    }
    addType_(name, syntax) {
        if (!syntax) {
            return;
        }

        this.types[name] = this.createDescriptor(syntax, 'Type', name);

        if (syntax === _generic_js__WEBPACK_IMPORTED_MODULE_2__["default"]["-ms-legacy-expression"]) {
            this.valueCommonSyntax = cssWideKeywordsWithExpression;
        }
    }

    checkAtruleName(atruleName) {
        if (!this.getAtrule(atruleName)) {
            return new _error_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxReferenceError('Unknown at-rule', '@' + atruleName);
        }
    }
    checkAtrulePrelude(atruleName, prelude) {
        const error = this.checkAtruleName(atruleName);

        if (error) {
            return error;
        }

        const atrule = this.getAtrule(atruleName);

        if (!atrule.prelude && prelude) {
            return new SyntaxError('At-rule `@' + atruleName + '` should not contain a prelude');
        }

        if (atrule.prelude && !prelude) {
            return new SyntaxError('At-rule `@' + atruleName + '` should contain a prelude');
        }
    }
    checkAtruleDescriptorName(atruleName, descriptorName) {
        const error = this.checkAtruleName(atruleName);

        if (error) {
            return error;
        }

        const atrule = this.getAtrule(atruleName);
        const descriptor = _utils_names_js__WEBPACK_IMPORTED_MODULE_1__.keyword(descriptorName);

        if (!atrule.descriptors) {
            return new SyntaxError('At-rule `@' + atruleName + '` has no known descriptors');
        }

        if (!atrule.descriptors[descriptor.name] &&
            !atrule.descriptors[descriptor.basename]) {
            return new _error_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxReferenceError('Unknown at-rule descriptor', descriptorName);
        }
    }
    checkPropertyName(propertyName) {
        if (!this.getProperty(propertyName)) {
            return new _error_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxReferenceError('Unknown property', propertyName);
        }
    }

    matchAtrulePrelude(atruleName, prelude) {
        const error = this.checkAtrulePrelude(atruleName, prelude);

        if (error) {
            return buildMatchResult(null, error);
        }

        if (!prelude) {
            return buildMatchResult(null, null);
        }

        return matchSyntax(this, this.getAtrule(atruleName).prelude, prelude, false);
    }
    matchAtruleDescriptor(atruleName, descriptorName, value) {
        const error = this.checkAtruleDescriptorName(atruleName, descriptorName);

        if (error) {
            return buildMatchResult(null, error);
        }

        const atrule = this.getAtrule(atruleName);
        const descriptor = _utils_names_js__WEBPACK_IMPORTED_MODULE_1__.keyword(descriptorName);

        return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
    }
    matchDeclaration(node) {
        if (node.type !== 'Declaration') {
            return buildMatchResult(null, new Error('Not a Declaration node'));
        }

        return this.matchProperty(node.property, node.value);
    }
    matchProperty(propertyName, value) {
        // don't match syntax for a custom property at the moment
        if (_utils_names_js__WEBPACK_IMPORTED_MODULE_1__.property(propertyName).custom) {
            return buildMatchResult(null, new Error('Lexer matching doesn\'t applicable for custom properties'));
        }

        const error = this.checkPropertyName(propertyName);

        if (error) {
            return buildMatchResult(null, error);
        }

        return matchSyntax(this, this.getProperty(propertyName), value, true);
    }
    matchType(typeName, value) {
        const typeSyntax = this.getType(typeName);

        if (!typeSyntax) {
            return buildMatchResult(null, new _error_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxReferenceError('Unknown type', typeName));
        }

        return matchSyntax(this, typeSyntax, value, false);
    }
    match(syntax, value) {
        if (typeof syntax !== 'string' && (!syntax || !syntax.type)) {
            return buildMatchResult(null, new _error_js__WEBPACK_IMPORTED_MODULE_0__.SyntaxReferenceError('Bad syntax'));
        }

        if (typeof syntax === 'string' || !syntax.match) {
            syntax = this.createDescriptor(syntax, 'Type', 'anonymous');
        }

        return matchSyntax(this, syntax, value, false);
    }

    findValueFragments(propertyName, value, type, name) {
        return (0,_search_js__WEBPACK_IMPORTED_MODULE_8__.matchFragments)(this, value, this.matchProperty(propertyName, value), type, name);
    }
    findDeclarationValueFragments(declaration, type, name) {
        return (0,_search_js__WEBPACK_IMPORTED_MODULE_8__.matchFragments)(this, declaration.value, this.matchDeclaration(declaration), type, name);
    }
    findAllFragments(ast, type, name) {
        const result = [];

        this.syntax.walk(ast, {
            visit: 'Declaration',
            enter: (declaration) => {
                result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
            }
        });

        return result;
    }

    getAtrule(atruleName, fallbackBasename = true) {
        const atrule = _utils_names_js__WEBPACK_IMPORTED_MODULE_1__.keyword(atruleName);
        const atruleEntry = atrule.vendor && fallbackBasename
            ? this.atrules[atrule.name] || this.atrules[atrule.basename]
            : this.atrules[atrule.name];

        return atruleEntry || null;
    }
    getAtrulePrelude(atruleName, fallbackBasename = true) {
        const atrule = this.getAtrule(atruleName, fallbackBasename);

        return atrule && atrule.prelude || null;
    }
    getAtruleDescriptor(atruleName, name) {
        return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators
            ? this.atrules[atruleName].declarators[name] || null
            : null;
    }
    getProperty(propertyName, fallbackBasename = true) {
        const property = _utils_names_js__WEBPACK_IMPORTED_MODULE_1__.property(propertyName);
        const propertyEntry = property.vendor && fallbackBasename
            ? this.properties[property.name] || this.properties[property.basename]
            : this.properties[property.name];

        return propertyEntry || null;
    }
    getType(name) {
        return hasOwnProperty.call(this.types, name) ? this.types[name] : null;
    }

    validate() {
        function validate(syntax, name, broken, descriptor) {
            if (broken.has(name)) {
                return broken.get(name);
            }

            broken.set(name, false);
            if (descriptor.syntax !== null) {
                (0,_definition_syntax_index_js__WEBPACK_IMPORTED_MODULE_3__.walk)(descriptor.syntax, function(node) {
                    if (node.type !== 'Type' && node.type !== 'Property') {
                        return;
                    }

                    const map = node.type === 'Type' ? syntax.types : syntax.properties;
                    const brokenMap = node.type === 'Type' ? brokenTypes : brokenProperties;

                    if (!hasOwnProperty.call(map, node.name) || validate(syntax, node.name, brokenMap, map[node.name])) {
                        broken.set(name, true);
                    }
                }, this);
            }
        }

        let brokenTypes = new Map();
        let brokenProperties = new Map();

        for (const key in this.types) {
            validate(this, key, brokenTypes, this.types[key]);
        }

        for (const key in this.properties) {
            validate(this, key, brokenProperties, this.properties[key]);
        }

        brokenTypes = [...brokenTypes.keys()].filter(name => brokenTypes.get(name));
        brokenProperties = [...brokenProperties.keys()].filter(name => brokenProperties.get(name));

        if (brokenTypes.length || brokenProperties.length) {
            return {
                types: brokenTypes,
                properties: brokenProperties
            };
        }

        return null;
    }
    dump(syntaxAsAst, pretty) {
        return {
            generic: this.generic,
            types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
            properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
            atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
        };
    }
    toString() {
        return JSON.stringify(this.dump());
    }
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/error.js":
/*!******************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/error.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyntaxMatchError": () => (/* binding */ SyntaxMatchError),
/* harmony export */   "SyntaxReferenceError": () => (/* binding */ SyntaxReferenceError)
/* harmony export */ });
/* harmony import */ var _utils_create_custom_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/create-custom-error.js */ "../../node_modules/css-tree/lib/utils/create-custom-error.js");
/* harmony import */ var _definition_syntax_generate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../definition-syntax/generate.js */ "../../node_modules/css-tree/lib/definition-syntax/generate.js");



const defaultLoc = { offset: 0, line: 1, column: 1 };

function locateMismatch(matchResult, node) {
    const tokens = matchResult.tokens;
    const longestMatch = matchResult.longestMatch;
    const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
    const badNode = mismatchNode !== node ? mismatchNode : null;
    let mismatchOffset = 0;
    let mismatchLength = 0;
    let entries = 0;
    let css = '';
    let start;
    let end;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].value;

        if (i === longestMatch) {
            mismatchLength = token.length;
            mismatchOffset = css.length;
        }

        if (badNode !== null && tokens[i].node === badNode) {
            if (i <= longestMatch) {
                entries++;
            } else {
                entries = 0;
            }
        }

        css += token;
    }

    if (longestMatch === tokens.length || entries > 1) { // last
        start = fromLoc(badNode || node, 'end') || buildLoc(defaultLoc, css);
        end = buildLoc(start);
    } else {
        start = fromLoc(badNode, 'start') ||
            buildLoc(fromLoc(node, 'start') || defaultLoc, css.slice(0, mismatchOffset));
        end = fromLoc(badNode, 'end') ||
            buildLoc(start, css.substr(mismatchOffset, mismatchLength));
    }

    return {
        css,
        mismatchOffset,
        mismatchLength,
        start,
        end
    };
}

function fromLoc(node, point) {
    const value = node && node.loc && node.loc[point];

    if (value) {
        return 'line' in value ? buildLoc(value) : value;
    }

    return null;
}

function buildLoc({ offset, line, column }, extra) {
    const loc = {
        offset,
        line,
        column
    };

    if (extra) {
        const lines = extra.split(/\n|\r\n?|\f/);

        loc.offset += extra.length;
        loc.line += lines.length - 1;
        loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
    }

    return loc;
}

const SyntaxReferenceError = function(type, referenceName) {
    const error = (0,_utils_create_custom_error_js__WEBPACK_IMPORTED_MODULE_0__.createCustomError)(
        'SyntaxReferenceError',
        type + (referenceName ? ' `' + referenceName + '`' : '')
    );

    error.reference = referenceName;

    return error;
};

const SyntaxMatchError = function(message, syntax, node, matchResult) {
    const error = (0,_utils_create_custom_error_js__WEBPACK_IMPORTED_MODULE_0__.createCustomError)('SyntaxMatchError', message);
    const {
        css,
        mismatchOffset,
        mismatchLength,
        start,
        end
    } = locateMismatch(matchResult, node);

    error.rawMessage = message;
    error.syntax = syntax ? (0,_definition_syntax_generate_js__WEBPACK_IMPORTED_MODULE_1__.generate)(syntax) : '<generic>';
    error.css = css;
    error.mismatchOffset = mismatchOffset;
    error.mismatchLength = mismatchLength;
    error.message = message + '\n' +
        '  syntax: ' + error.syntax + '\n' +
        '   value: ' + (css || '<empty string>') + '\n' +
        '  --------' + new Array(error.mismatchOffset + 1).join('-') + '^';

    Object.assign(error, start);
    error.loc = {
        source: (node && node.loc && node.loc.source) || '<unknown>',
        start,
        end
    };

    return error;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/generic-an-plus-b.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/generic-an-plus-b.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ anPlusB)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
const N = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
const DISALLOW_SIGN = true;
const ALLOW_SIGN = false;

function isDelim(token, code) {
    return token !== null && token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim && token.value.charCodeAt(0) === code;
}

function skipSC(token, offset, getNextToken) {
    while (token !== null && (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace || token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment)) {
        token = getNextToken(++offset);
    }

    return offset;
}

function checkInteger(token, valueOffset, disallowSign, offset) {
    if (!token) {
        return 0;
    }

    const code = token.value.charCodeAt(valueOffset);

    if (code === PLUSSIGN || code === HYPHENMINUS) {
        if (disallowSign) {
            // Number sign is not allowed
            return 0;
        }
        valueOffset++;
    }

    for (; valueOffset < token.value.length; valueOffset++) {
        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(token.value.charCodeAt(valueOffset))) {
            // Integer is expected
            return 0;
        }
    }

    return offset + 1;
}

// ... <signed-integer>
// ... ['+' | '-'] <signless-integer>
function consumeB(token, offset_, getNextToken) {
    let sign = false;
    let offset = skipSC(token, offset_, getNextToken);

    token = getNextToken(offset);

    if (token === null) {
        return offset_;
    }

    if (token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
        if (isDelim(token, PLUSSIGN) || isDelim(token, HYPHENMINUS)) {
            sign = true;
            offset = skipSC(getNextToken(++offset), offset, getNextToken);
            token = getNextToken(offset);

            if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
                return 0;
            }
        } else {
            return offset_;
        }
    }

    if (!sign) {
        const code = token.value.charCodeAt(0);
        if (code !== PLUSSIGN && code !== HYPHENMINUS) {
            // Number sign is expected
            return 0;
        }
    }

    return checkInteger(token, sign ? 0 : 1, sign, offset);
}

// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
function anPlusB(token, getNextToken) {
    /* eslint-disable brace-style*/
    let offset = 0;

    if (!token) {
        return 0;
    }

    // <integer>
    if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
        return checkInteger(token, 0, ALLOW_SIGN, offset); // b
    }

    // -n
    // -n <signed-integer>
    // -n ['+' | '-'] <signless-integer>
    // -n- <signless-integer>
    // <dashndashdigit-ident>
    else if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident && token.value.charCodeAt(0) === HYPHENMINUS) {
        // expect 1st char is N
        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.cmpChar)(token.value, 1, N)) {
            return 0;
        }

        switch (token.value.length) {
            // -n
            // -n <signed-integer>
            // -n ['+' | '-'] <signless-integer>
            case 2:
                return consumeB(getNextToken(++offset), offset, getNextToken);

            // -n- <signless-integer>
            case 3:
                if (token.value.charCodeAt(2) !== HYPHENMINUS) {
                    return 0;
                }

                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);

            // <dashndashdigit-ident>
            default:
                if (token.value.charCodeAt(2) !== HYPHENMINUS) {
                    return 0;
                }

                return checkInteger(token, 3, DISALLOW_SIGN, offset);
        }
    }

    // '+'? n
    // '+'? n <signed-integer>
    // '+'? n ['+' | '-'] <signless-integer>
    // '+'? n- <signless-integer>
    // '+'? <ndashdigit-ident>
    else if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident || (isDelim(token, PLUSSIGN) && getNextToken(offset + 1).type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident)) {
        // just ignore a plus
        if (token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident) {
            token = getNextToken(++offset);
        }

        if (token === null || !(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.cmpChar)(token.value, 0, N)) {
            return 0;
        }

        switch (token.value.length) {
            // '+'? n
            // '+'? n <signed-integer>
            // '+'? n ['+' | '-'] <signless-integer>
            case 1:
                return consumeB(getNextToken(++offset), offset, getNextToken);

            // '+'? n- <signless-integer>
            case 2:
                if (token.value.charCodeAt(1) !== HYPHENMINUS) {
                    return 0;
                }

                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);

            // '+'? <ndashdigit-ident>
            default:
                if (token.value.charCodeAt(1) !== HYPHENMINUS) {
                    return 0;
                }

                return checkInteger(token, 2, DISALLOW_SIGN, offset);
        }
    }

    // <ndashdigit-dimension>
    // <ndash-dimension> <signless-integer>
    // <n-dimension>
    // <n-dimension> <signed-integer>
    // <n-dimension> ['+' | '-'] <signless-integer>
    else if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension) {
        let code = token.value.charCodeAt(0);
        let sign = code === PLUSSIGN || code === HYPHENMINUS ? 1 : 0;
        let i = sign;

        for (; i < token.value.length; i++) {
            if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(token.value.charCodeAt(i))) {
                break;
            }
        }

        if (i === sign) {
            // Integer is expected
            return 0;
        }

        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.cmpChar)(token.value, i, N)) {
            return 0;
        }

        // <n-dimension>
        // <n-dimension> <signed-integer>
        // <n-dimension> ['+' | '-'] <signless-integer>
        if (i + 1 === token.value.length) {
            return consumeB(getNextToken(++offset), offset, getNextToken);
        } else {
            if (token.value.charCodeAt(i + 1) !== HYPHENMINUS) {
                return 0;
            }

            // <ndash-dimension> <signless-integer>
            if (i + 2 === token.value.length) {
                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);
            }
            // <ndashdigit-dimension>
            else {
                return checkInteger(token, i + 2, DISALLOW_SIGN, offset);
            }
        }
    }

    return 0;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/generic-urange.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/generic-urange.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ urange)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const PLUSSIGN = 0x002B;     // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D;  // U+002D HYPHEN-MINUS (-)
const QUESTIONMARK = 0x003F; // U+003F QUESTION MARK (?)
const U = 0x0075;            // U+0075 LATIN SMALL LETTER U (u)

function isDelim(token, code) {
    return token !== null && token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim && token.value.charCodeAt(0) === code;
}

function startsWith(token, code) {
    return token.value.charCodeAt(0) === code;
}

function hexSequence(token, offset, allowDash) {
    let hexlen = 0;

    for (let pos = offset; pos < token.value.length; pos++) {
        const code = token.value.charCodeAt(pos);

        if (code === HYPHENMINUS && allowDash && hexlen !== 0) {
            hexSequence(token, offset + hexlen + 1, false);
            return 6; // dissallow following question marks
        }

        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isHexDigit)(code)) {
            return 0; // not a hex digit
        }

        if (++hexlen > 6) {
            return 0; // too many hex digits
        };
    }

    return hexlen;
}

function withQuestionMarkSequence(consumed, length, getNextToken) {
    if (!consumed) {
        return 0; // nothing consumed
    }

    while (isDelim(getNextToken(length), QUESTIONMARK)) {
        if (++consumed > 6) {
            return 0; // too many question marks
        }

        length++;
    }

    return length;
}

// https://drafts.csswg.org/css-syntax/#urange
// Informally, the <urange> production has three forms:
// U+0001
//      Defines a range consisting of a single code point, in this case the code point "1".
// U+0001-00ff
//      Defines a range of codepoints between the first and the second value, in this case
//      the range between "1" and "ff" (255 in decimal) inclusive.
// U+00??
//      Defines a range of codepoints where the "?" characters range over all hex digits,
//      in this case defining the same as the value U+0000-00ff.
// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
//
// <urange> =
//   u '+' <ident-token> '?'* |
//   u <dimension-token> '?'* |
//   u <number-token> '?'* |
//   u <number-token> <dimension-token> |
//   u <number-token> <number-token> |
//   u '+' '?'+
function urange(token, getNextToken) {
    let length = 0;

    // should start with `u` or `U`
    if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident || !(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.cmpChar)(token.value, 0, U)) {
        return 0;
    }

    token = getNextToken(++length);
    if (token === null) {
        return 0;
    }

    // u '+' <ident-token> '?'*
    // u '+' '?'+
    if (isDelim(token, PLUSSIGN)) {
        token = getNextToken(++length);
        if (token === null) {
            return 0;
        }

        if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident) {
            // u '+' <ident-token> '?'*
            return withQuestionMarkSequence(hexSequence(token, 0, true), ++length, getNextToken);
        }

        if (isDelim(token, QUESTIONMARK)) {
            // u '+' '?'+
            return withQuestionMarkSequence(1, ++length, getNextToken);
        }

        // Hex digit or question mark is expected
        return 0;
    }

    // u <number-token> '?'*
    // u <number-token> <dimension-token>
    // u <number-token> <number-token>
    if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
        const consumedHexLength = hexSequence(token, 1, true);
        if (consumedHexLength === 0) {
            return 0;
        }

        token = getNextToken(++length);
        if (token === null) {
            // u <number-token> <eof>
            return length;
        }

        if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension || token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
            // u <number-token> <dimension-token>
            // u <number-token> <number-token>
            if (!startsWith(token, HYPHENMINUS) || !hexSequence(token, 1, false)) {
                return 0;
            }

            return length + 1;
        }

        // u <number-token> '?'*
        return withQuestionMarkSequence(consumedHexLength, length, getNextToken);
    }

    // u <dimension-token> '?'*
    if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension) {
        return withQuestionMarkSequence(hexSequence(token, 1, true), ++length, getNextToken);
    }

    return 0;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/generic.js":
/*!********************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/generic.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generic_an_plus_b_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generic-an-plus-b.js */ "../../node_modules/css-tree/lib/lexer/generic-an-plus-b.js");
/* harmony import */ var _generic_urange_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generic-urange.js */ "../../node_modules/css-tree/lib/lexer/generic-urange.js");
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");




const cssWideKeywords = ['unset', 'initial', 'inherit'];
const calcFunctionNames = ['calc(', '-moz-calc(', '-webkit-calc('];
const balancePair = new Map([
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightParenthesis],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftParenthesis, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightParenthesis],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftSquareBracket, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightSquareBracket],
    [_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftCurlyBracket, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightCurlyBracket]
]);

// units
const LENGTH = [                              // https://www.w3.org/TR/css-values-3/#lengths
    'px', 'mm', 'cm', 'in', 'pt', 'pc', 'q',  // absolute length units
    'em', 'ex', 'ch', 'rem',                  // relative length units
    'vh', 'vw', 'vmin', 'vmax', 'vm'          // viewport-percentage lengths
];
const ANGLE = ['deg', 'grad', 'rad', 'turn']; // https://www.w3.org/TR/css-values-3/#angles
const TIME = ['s', 'ms'];                     // https://www.w3.org/TR/css-values-3/#time
const FREQUENCY = ['hz', 'khz'];              // https://www.w3.org/TR/css-values-3/#frequency
const RESOLUTION = ['dpi', 'dpcm', 'dppx', 'x']; // https://www.w3.org/TR/css-values-3/#resolution
const FLEX = ['fr'];                          // https://drafts.csswg.org/css-grid/#fr-unit
const DECIBEL = ['db'];                       // https://www.w3.org/TR/css3-speech/#mixing-props-voice-volume
const SEMITONES = ['st'];                     // https://www.w3.org/TR/css3-speech/#voice-props-voice-pitch

// safe char code getter
function charCodeAt(str, index) {
    return index < str.length ? str.charCodeAt(index) : 0;
}

function eqStr(actual, expected) {
    return (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.cmpStr)(actual, 0, actual.length, expected);
}

function eqStrAny(actual, expected) {
    for (let i = 0; i < expected.length; i++) {
        if (eqStr(actual, expected[i])) {
            return true;
        }
    }

    return false;
}

// IE postfix hack, i.e. 123\0 or 123px\9
function isPostfixIeHack(str, offset) {
    if (offset !== str.length - 2) {
        return false;
    }

    return (
        charCodeAt(str, offset) === 0x005C &&  // U+005C REVERSE SOLIDUS (\)
        (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.isDigit)(charCodeAt(str, offset + 1))
    );
}

function outOfRange(opts, value, numEnd) {
    if (opts && opts.type === 'Range') {
        const num = Number(
            numEnd !== undefined && numEnd !== value.length
                ? value.substr(0, numEnd)
                : value
        );

        if (isNaN(num)) {
            return true;
        }

        if (opts.min !== null && num < opts.min) {
            return true;
        }

        if (opts.max !== null && num > opts.max) {
            return true;
        }
    }

    return false;
}

function consumeFunction(token, getNextToken) {
    let balanceCloseType = 0;
    let balanceStash = [];
    let length = 0;

    // balanced token consuming
    scan:
    do {
        switch (token.type) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightCurlyBracket:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightParenthesis:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightSquareBracket:
                if (token.type !== balanceCloseType) {
                    break scan;
                }

                balanceCloseType = balanceStash.pop();

                if (balanceStash.length === 0) {
                    length++;
                    break scan;
                }

                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftParenthesis:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftSquareBracket:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftCurlyBracket:
                balanceStash.push(balanceCloseType);
                balanceCloseType = balancePair.get(token.type);
                break;
        }

        length++;
    } while (token = getNextToken(length));

    return length;
}

// TODO: implement
// can be used wherever <length>, <frequency>, <angle>, <time>, <percentage>, <number>, or <integer> values are allowed
// https://drafts.csswg.org/css-values/#calc-notation
function calc(next) {
    return function(token, getNextToken, opts) {
        if (token === null) {
            return 0;
        }

        if (token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function && eqStrAny(token.value, calcFunctionNames)) {
            return consumeFunction(token, getNextToken);
        }

        return next(token, getNextToken, opts);
    };
}

function tokenType(expectedTokenType) {
    return function(token) {
        if (token === null || token.type !== expectedTokenType) {
            return 0;
        }

        return 1;
    };
}

function func(name) {
    name = name + '(';

    return function(token, getNextToken) {
        if (token !== null && eqStr(token.value, name)) {
            return consumeFunction(token, getNextToken);
        }

        return 0;
    };
}

// =========================
// Complex types
//

// https://drafts.csswg.org/css-values-4/#custom-idents
// 4.2. Author-defined Identifiers: the <custom-ident> type
// Some properties accept arbitrary author-defined identifiers as a component value.
// This generic data type is denoted by <custom-ident>, and represents any valid CSS identifier
// that would not be misinterpreted as a pre-defined keyword in that property’s value definition.
//
// See also: https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
function customIdent(token) {
    if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Ident) {
        return 0;
    }

    const name = token.value.toLowerCase();

    // The CSS-wide keywords are not valid <custom-ident>s
    if (eqStrAny(name, cssWideKeywords)) {
        return 0;
    }

    // The default keyword is reserved and is also not a valid <custom-ident>
    if (eqStr(name, 'default')) {
        return 0;
    }

    // TODO: ignore property specific keywords (as described https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident)
    // Specifications using <custom-ident> must specify clearly what other keywords
    // are excluded from <custom-ident>, if any—for example by saying that any pre-defined keywords
    // in that property’s value definition are excluded. Excluded keywords are excluded
    // in all ASCII case permutations.

    return 1;
}

// https://drafts.csswg.org/css-variables/#typedef-custom-property-name
// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS), like --foo.
// The <custom-property-name> production corresponds to this: it’s defined as any valid identifier
// that starts with two dashes, except -- itself, which is reserved for future use by CSS.
// NOTE: Current implementation treat `--` as a valid name since most (all?) major browsers treat it as valid.
function customPropertyName(token) {
    // ... defined as any valid identifier
    if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Ident) {
        return 0;
    }

    // ... that starts with two dashes (U+002D HYPHEN-MINUS)
    if (charCodeAt(token.value, 0) !== 0x002D || charCodeAt(token.value, 1) !== 0x002D) {
        return 0;
    }

    return 1;
}

// https://drafts.csswg.org/css-color-4/#hex-notation
// The syntax of a <hex-color> is a <hash-token> token whose value consists of 3, 4, 6, or 8 hexadecimal digits.
// In other words, a hex color is written as a hash character, "#", followed by some number of digits 0-9 or
// letters a-f (the case of the letters doesn’t matter - #00ff00 is identical to #00FF00).
function hexColor(token) {
    if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Hash) {
        return 0;
    }

    const length = token.value.length;

    // valid values (length): #rgb (4), #rgba (5), #rrggbb (7), #rrggbbaa (9)
    if (length !== 4 && length !== 5 && length !== 7 && length !== 9) {
        return 0;
    }

    for (let i = 1; i < length; i++) {
        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.isHexDigit)(charCodeAt(token.value, i))) {
            return 0;
        }
    }

    return 1;
}

function idSelector(token) {
    if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Hash) {
        return 0;
    }

    if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.isIdentifierStart)(charCodeAt(token.value, 1), charCodeAt(token.value, 2), charCodeAt(token.value, 3))) {
        return 0;
    }

    return 1;
}

// https://drafts.csswg.org/css-syntax/#any-value
// It represents the entirety of what a valid declaration can have as its value.
function declarationValue(token, getNextToken) {
    if (!token) {
        return 0;
    }

    let balanceCloseType = 0;
    let balanceStash = [];
    let length = 0;

    // The <declaration-value> production matches any sequence of one or more tokens,
    // so long as the sequence does not contain ...
    scan:
    do {
        switch (token.type) {
            // ... <bad-string-token>, <bad-url-token>,
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.BadString:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.BadUrl:
                break scan;

            // ... unmatched <)-token>, <]-token>, or <}-token>,
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightCurlyBracket:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightParenthesis:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightSquareBracket:
                if (token.type !== balanceCloseType) {
                    break scan;
                }

                balanceCloseType = balanceStash.pop();
                break;

            // ... or top-level <semicolon-token> tokens
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Semicolon:
                if (balanceCloseType === 0) {
                    break scan;
                }

                break;

            // ... or <delim-token> tokens with a value of "!"
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Delim:
                if (balanceCloseType === 0 && token.value === '!') {
                    break scan;
                }

                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftParenthesis:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftSquareBracket:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftCurlyBracket:
                balanceStash.push(balanceCloseType);
                balanceCloseType = balancePair.get(token.type);
                break;
        }

        length++;
    } while (token = getNextToken(length));

    return length;
}

// https://drafts.csswg.org/css-syntax/#any-value
// The <any-value> production is identical to <declaration-value>, but also
// allows top-level <semicolon-token> tokens and <delim-token> tokens
// with a value of "!". It represents the entirety of what valid CSS can be in any context.
function anyValue(token, getNextToken) {
    if (!token) {
        return 0;
    }

    let balanceCloseType = 0;
    let balanceStash = [];
    let length = 0;

    // The <any-value> production matches any sequence of one or more tokens,
    // so long as the sequence ...
    scan:
    do {
        switch (token.type) {
            // ... does not contain <bad-string-token>, <bad-url-token>,
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.BadString:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.BadUrl:
                break scan;

            // ... unmatched <)-token>, <]-token>, or <}-token>,
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightCurlyBracket:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightParenthesis:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightSquareBracket:
                if (token.type !== balanceCloseType) {
                    break scan;
                }

                balanceCloseType = balanceStash.pop();
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftParenthesis:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftSquareBracket:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftCurlyBracket:
                balanceStash.push(balanceCloseType);
                balanceCloseType = balancePair.get(token.type);
                break;
        }

        length++;
    } while (token = getNextToken(length));

    return length;
}

// =========================
// Dimensions
//

function dimension(type) {
    if (type) {
        type = new Set(type);
    }

    return function(token, getNextToken, opts) {
        if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Dimension) {
            return 0;
        }

        const numberEnd = (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.consumeNumber)(token.value, 0);

        // check unit
        if (type !== null) {
            // check for IE postfix hack, i.e. 123px\0 or 123px\9
            const reverseSolidusOffset = token.value.indexOf('\\', numberEnd);
            const unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset)
                ? token.value.substr(numberEnd)
                : token.value.substring(numberEnd, reverseSolidusOffset);

            if (type.has(unit.toLowerCase()) === false) {
                return 0;
            }
        }

        // check range if specified
        if (outOfRange(opts, token.value, numberEnd)) {
            return 0;
        }

        return 1;
    };
}

// =========================
// Percentage
//

// §5.5. Percentages: the <percentage> type
// https://drafts.csswg.org/css-values-4/#percentages
function percentage(token, getNextToken, opts) {
    // ... corresponds to the <percentage-token> production
    if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Percentage) {
        return 0;
    }

    // check range if specified
    if (outOfRange(opts, token.value, token.value.length - 1)) {
        return 0;
    }

    return 1;
}

// =========================
// Numeric
//

// https://drafts.csswg.org/css-values-4/#numbers
// The value <zero> represents a literal number with the value 0. Expressions that merely
// evaluate to a <number> with the value 0 (for example, calc(0)) do not match <zero>;
// only literal <number-token>s do.
function zero(next) {
    if (typeof next !== 'function') {
        next = function() {
            return 0;
        };
    }

    return function(token, getNextToken, opts) {
        if (token !== null && token.type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Number) {
            if (Number(token.value) === 0) {
                return 1;
            }
        }

        return next(token, getNextToken, opts);
    };
}

// § 5.3. Real Numbers: the <number> type
// https://drafts.csswg.org/css-values-4/#numbers
// Number values are denoted by <number>, and represent real numbers, possibly with a fractional component.
// ... It corresponds to the <number-token> production
function number(token, getNextToken, opts) {
    if (token === null) {
        return 0;
    }

    const numberEnd = (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.consumeNumber)(token.value, 0);
    const isNumber = numberEnd === token.value.length;
    if (!isNumber && !isPostfixIeHack(token.value, numberEnd)) {
        return 0;
    }

    // check range if specified
    if (outOfRange(opts, token.value, numberEnd)) {
        return 0;
    }

    return 1;
}

// §5.2. Integers: the <integer> type
// https://drafts.csswg.org/css-values-4/#integers
function integer(token, getNextToken, opts) {
    // ... corresponds to a subset of the <number-token> production
    if (token === null || token.type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Number) {
        return 0;
    }

    // The first digit of an integer may be immediately preceded by `-` or `+` to indicate the integer’s sign.
    let i = charCodeAt(token.value, 0) === 0x002B ||       // U+002B PLUS SIGN (+)
            charCodeAt(token.value, 0) === 0x002D ? 1 : 0; // U+002D HYPHEN-MINUS (-)

    // When written literally, an integer is one or more decimal digits 0 through 9 ...
    for (; i < token.value.length; i++) {
        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.isDigit)(charCodeAt(token.value, i))) {
            return 0;
        }
    }

    // check range if specified
    if (outOfRange(opts, token.value, i)) {
        return 0;
    }

    return 1;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    // token types
    'ident-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Ident),
    'function-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function),
    'at-keyword-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.AtKeyword),
    'hash-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Hash),
    'string-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.String),
    'bad-string-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.BadString),
    'url-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Url),
    'bad-url-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.BadUrl),
    'delim-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Delim),
    'number-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Number),
    'percentage-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Percentage),
    'dimension-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Dimension),
    'whitespace-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.WhiteSpace),
    'CDO-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.CDO),
    'CDC-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.CDC),
    'colon-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Colon),
    'semicolon-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Semicolon),
    'comma-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Comma),
    '[-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftSquareBracket),
    ']-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightSquareBracket),
    '(-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftParenthesis),
    ')-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightParenthesis),
    '{-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.LeftCurlyBracket),
    '}-token': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightCurlyBracket),

    // token type aliases
    'string': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.String),
    'ident': tokenType(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Ident),

    // complex types
    'custom-ident': customIdent,
    'custom-property-name': customPropertyName,
    'hex-color': hexColor,
    'id-selector': idSelector, // element( <id-selector> )
    'an-plus-b': _generic_an_plus_b_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    'urange': _generic_urange_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    'declaration-value': declarationValue,
    'any-value': anyValue,

    // dimensions
    'dimension': calc(dimension(null)),
    'angle': calc(dimension(ANGLE)),
    'decibel': calc(dimension(DECIBEL)),
    'frequency': calc(dimension(FREQUENCY)),
    'flex': calc(dimension(FLEX)),
    'length': calc(zero(dimension(LENGTH))),
    'resolution': calc(dimension(RESOLUTION)),
    'semitones': calc(dimension(SEMITONES)),
    'time': calc(dimension(TIME)),

    // percentage
    'percentage': calc(percentage),

    // numeric
    'zero': zero(),
    'number': calc(number),
    'integer': calc(integer),

    // old IE stuff
    '-ms-legacy-expression': func('expression')
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/match-graph.js":
/*!************************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/match-graph.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISALLOW_EMPTY": () => (/* binding */ DISALLOW_EMPTY),
/* harmony export */   "MATCH": () => (/* binding */ MATCH),
/* harmony export */   "MISMATCH": () => (/* binding */ MISMATCH),
/* harmony export */   "buildMatchGraph": () => (/* binding */ buildMatchGraph)
/* harmony export */ });
/* harmony import */ var _definition_syntax_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../definition-syntax/parse.js */ "../../node_modules/css-tree/lib/definition-syntax/parse.js");


const MATCH = { type: 'Match' };
const MISMATCH = { type: 'Mismatch' };
const DISALLOW_EMPTY = { type: 'DisallowEmpty' };

const LEFTPARENTHESIS = 40;  // (
const RIGHTPARENTHESIS = 41; // )

function createCondition(match, thenBranch, elseBranch) {
    // reduce node count
    if (thenBranch === MATCH && elseBranch === MISMATCH) {
        return match;
    }

    if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) {
        return match;
    }

    if (match.type === 'If' && match.else === MISMATCH && thenBranch === MATCH) {
        thenBranch = match.then;
        match = match.match;
    }

    return {
        type: 'If',
        match,
        then: thenBranch,
        else: elseBranch
    };
}

function isFunctionType(name) {
    return (
        name.length > 2 &&
        name.charCodeAt(name.length - 2) === LEFTPARENTHESIS &&
        name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS
    );
}

function isEnumCapatible(term) {
    return (
        term.type === 'Keyword' ||
        term.type === 'AtKeyword' ||
        term.type === 'Function' ||
        term.type === 'Type' && isFunctionType(term.name)
    );
}

function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
    switch (combinator) {
        case ' ': {
            // Juxtaposing components means that all of them must occur, in the given order.
            //
            // a b c
            // =
            // match a
            //   then match b
            //     then match c
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            //   else MISMATCH
            let result = MATCH;

            for (let i = terms.length - 1; i >= 0; i--) {
                const term = terms[i];

                result = createCondition(
                    term,
                    result,
                    MISMATCH
                );
            };

            return result;
        }

        case '|': {
            // A bar (|) separates two or more alternatives: exactly one of them must occur.
            //
            // a | b | c
            // =
            // match a
            //   then MATCH
            //   else match b
            //     then MATCH
            //     else match c
            //       then MATCH
            //       else MISMATCH

            let result = MISMATCH;
            let map = null;

            for (let i = terms.length - 1; i >= 0; i--) {
                let term = terms[i];

                // reduce sequence of keywords into a Enum
                if (isEnumCapatible(term)) {
                    if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
                        map = Object.create(null);
                        result = createCondition(
                            {
                                type: 'Enum',
                                map
                            },
                            MATCH,
                            result
                        );
                    }

                    if (map !== null) {
                        const key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
                        if (key in map === false) {
                            map[key] = term;
                            continue;
                        }
                    }
                }

                map = null;

                // create a new conditonal node
                result = createCondition(
                    term,
                    MATCH,
                    result
                );
            };

            return result;
        }

        case '&&': {
            // A double ampersand (&&) separates two or more components,
            // all of which must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since &&-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms,
                    all: true
                };
            }

            // Use a combination tree for groups with small number of terms
            //
            // a && b && c
            // =
            // match a
            //   then [b && c]
            //   else match b
            //     then [a && c]
            //     else match c
            //       then [a && b]
            //       else MISMATCH
            //
            // a && b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MISMATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            let result = MISMATCH;

            for (let i = terms.length - 1; i >= 0; i--) {
                const term = terms[i];
                let thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        false
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            };

            return result;
        }

        case '||': {
            // A double bar (||) separates two or more options:
            // one or more of them must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since ||-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms,
                    all: false
                };
            }

            // Use a combination tree for groups with small number of terms
            //
            // a || b || c
            // =
            // match a
            //   then [b || c]
            //   else match b
            //     then [a || c]
            //     else match c
            //       then [a || b]
            //       else MISMATCH
            //
            // a || b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MATCH
            //     else MISMATCH
            let result = atLeastOneTermMatched ? MATCH : MISMATCH;

            for (let i = terms.length - 1; i >= 0; i--) {
                const term = terms[i];
                let thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        true
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            };

            return result;
        }
    }
}

function buildMultiplierMatchGraph(node) {
    let result = MATCH;
    let matchTerm = buildMatchGraphInternal(node.term);

    if (node.max === 0) {
        // disable repeating of empty match to prevent infinite loop
        matchTerm = createCondition(
            matchTerm,
            DISALLOW_EMPTY,
            MISMATCH
        );

        // an occurrence count is not limited, make a cycle;
        // to collect more terms on each following matching mismatch
        result = createCondition(
            matchTerm,
            null, // will be a loop
            MISMATCH
        );

        result.then = createCondition(
            MATCH,
            MATCH,
            result // make a loop
        );

        if (node.comma) {
            result.then.else = createCondition(
                { type: 'Comma', syntax: node },
                result,
                MISMATCH
            );
        }
    } else {
        // create a match node chain for [min .. max] interval with optional matches
        for (let i = node.min || 1; i <= node.max; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                createCondition(
                    MATCH,
                    MATCH,
                    result
                ),
                MISMATCH
            );
        }
    }

    if (node.min === 0) {
        // allow zero match
        result = createCondition(
            MATCH,
            MATCH,
            result
        );
    } else {
        // create a match node chain to collect [0 ... min - 1] required matches
        for (let i = 0; i < node.min - 1; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                result,
                MISMATCH
            );
        }
    }

    return result;
}

function buildMatchGraphInternal(node) {
    if (typeof node === 'function') {
        return {
            type: 'Generic',
            fn: node
        };
    }

    switch (node.type) {
        case 'Group': {
            let result = buildGroupMatchGraph(
                node.combinator,
                node.terms.map(buildMatchGraphInternal),
                false
            );

            if (node.disallowEmpty) {
                result = createCondition(
                    result,
                    DISALLOW_EMPTY,
                    MISMATCH
                );
            }

            return result;
        }

        case 'Multiplier':
            return buildMultiplierMatchGraph(node);

        case 'Type':
        case 'Property':
            return {
                type: node.type,
                name: node.name,
                syntax: node
            };

        case 'Keyword':
            return {
                type: node.type,
                name: node.name.toLowerCase(),
                syntax: node
            };

        case 'AtKeyword':
            return {
                type: node.type,
                name: '@' + node.name.toLowerCase(),
                syntax: node
            };

        case 'Function':
            return {
                type: node.type,
                name: node.name.toLowerCase() + '(',
                syntax: node
            };

        case 'String':
            // convert a one char length String to a Token
            if (node.value.length === 3) {
                return {
                    type: 'Token',
                    value: node.value.charAt(1),
                    syntax: node
                };
            }

            // otherwise use it as is
            return {
                type: node.type,
                value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, '\''),
                syntax: node
            };

        case 'Token':
            return {
                type: node.type,
                value: node.value,
                syntax: node
            };

        case 'Comma':
            return {
                type: node.type,
                syntax: node
            };

        default:
            throw new Error('Unknown node type:', node.type);
    }
}

function buildMatchGraph(syntaxTree, ref) {
    if (typeof syntaxTree === 'string') {
        syntaxTree = (0,_definition_syntax_parse_js__WEBPACK_IMPORTED_MODULE_0__.parse)(syntaxTree);
    }

    return {
        type: 'MatchGraph',
        match: buildMatchGraphInternal(syntaxTree),
        syntax: ref || null,
        source: syntaxTree
    };
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/match.js":
/*!******************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/match.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matchAsList": () => (/* binding */ matchAsList),
/* harmony export */   "matchAsTree": () => (/* binding */ matchAsTree),
/* harmony export */   "totalIterationCount": () => (/* binding */ totalIterationCount)
/* harmony export */ });
/* harmony import */ var _match_graph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./match-graph.js */ "../../node_modules/css-tree/lib/lexer/match-graph.js");
/* harmony import */ var _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tokenizer/types.js */ "../../node_modules/css-tree/lib/tokenizer/types.js");



const { hasOwnProperty } = Object.prototype;
const STUB = 0;
const TOKEN = 1;
const OPEN_SYNTAX = 2;
const CLOSE_SYNTAX = 3;

const EXIT_REASON_MATCH = 'Match';
const EXIT_REASON_MISMATCH = 'Mismatch';
const EXIT_REASON_ITERATION_LIMIT = 'Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)';

const ITERATION_LIMIT = 15000;
let totalIterationCount = 0;

function reverseList(list) {
    let prev = null;
    let next = null;
    let item = list;

    while (item !== null) {
        next = item.prev;
        item.prev = prev;
        prev = item;
        item = next;
    }

    return prev;
}

function areStringsEqualCaseInsensitive(testStr, referenceStr) {
    if (testStr.length !== referenceStr.length) {
        return false;
    }

    for (let i = 0; i < testStr.length; i++) {
        const referenceCode = referenceStr.charCodeAt(i);
        let testCode = testStr.charCodeAt(i);

        // testCode.toLowerCase() for U+0041 LATIN CAPITAL LETTER A (A) .. U+005A LATIN CAPITAL LETTER Z (Z).
        if (testCode >= 0x0041 && testCode <= 0x005A) {
            testCode = testCode | 32;
        }

        if (testCode !== referenceCode) {
            return false;
        }
    }

    return true;
}

function isContextEdgeDelim(token) {
    if (token.type !== _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.Delim) {
        return false;
    }

    // Fix matching for unicode-range: U+30??, U+FF00-FF9F
    // Probably we need to check out previous match instead
    return token.value !== '?';
}

function isCommaContextStart(token) {
    if (token === null) {
        return true;
    }

    return (
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.Comma ||
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.Function ||
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.LeftParenthesis ||
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.LeftSquareBracket ||
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.LeftCurlyBracket ||
        isContextEdgeDelim(token)
    );
}

function isCommaContextEnd(token) {
    if (token === null) {
        return true;
    }

    return (
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.RightParenthesis ||
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.RightSquareBracket ||
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.RightCurlyBracket ||
        token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.Delim
    );
}

function internalMatch(tokens, state, syntaxes) {
    function moveToNextToken() {
        do {
            tokenIndex++;
            token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
        } while (token !== null && (token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.WhiteSpace || token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.Comment));
    }

    function getNextToken(offset) {
        const nextIndex = tokenIndex + offset;

        return nextIndex < tokens.length ? tokens[nextIndex] : null;
    }

    function stateSnapshotFromSyntax(nextState, prev) {
        return {
            nextState,
            matchStack,
            syntaxStack,
            thenStack,
            tokenIndex,
            prev
        };
    }

    function pushThenStack(nextState) {
        thenStack = {
            nextState,
            matchStack,
            syntaxStack,
            prev: thenStack
        };
    }

    function pushElseStack(nextState) {
        elseStack = stateSnapshotFromSyntax(nextState, elseStack);
    }

    function addTokenToMatch() {
        matchStack = {
            type: TOKEN,
            syntax: state.syntax,
            token,
            prev: matchStack
        };

        moveToNextToken();
        syntaxStash = null;

        if (tokenIndex > longestMatch) {
            longestMatch = tokenIndex;
        }
    }

    function openSyntax() {
        syntaxStack = {
            syntax: state.syntax,
            opts: state.syntax.opts || (syntaxStack !== null && syntaxStack.opts) || null,
            prev: syntaxStack
        };

        matchStack = {
            type: OPEN_SYNTAX,
            syntax: state.syntax,
            token: matchStack.token,
            prev: matchStack
        };
    }

    function closeSyntax() {
        if (matchStack.type === OPEN_SYNTAX) {
            matchStack = matchStack.prev;
        } else {
            matchStack = {
                type: CLOSE_SYNTAX,
                syntax: syntaxStack.syntax,
                token: matchStack.token,
                prev: matchStack
            };
        }

        syntaxStack = syntaxStack.prev;
    }

    let syntaxStack = null;
    let thenStack = null;
    let elseStack = null;

    // null – stashing allowed, nothing stashed
    // false – stashing disabled, nothing stashed
    // anithing else – fail stashable syntaxes, some syntax stashed
    let syntaxStash = null;

    let iterationCount = 0; // count iterations and prevent infinite loop
    let exitReason = null;

    let token = null;
    let tokenIndex = -1;
    let longestMatch = 0;
    let matchStack = {
        type: STUB,
        syntax: null,
        token: null,
        prev: null
    };

    moveToNextToken();

    while (exitReason === null && ++iterationCount < ITERATION_LIMIT) {
        // function mapList(list, fn) {
        //     const result = [];
        //     while (list) {
        //         result.unshift(fn(list));
        //         list = list.prev;
        //     }
        //     return result;
        // }
        // console.log('--\n',
        //     '#' + iterationCount,
        //     require('util').inspect({
        //         match: mapList(matchStack, x => x.type === TOKEN ? x.token && x.token.value : x.syntax ? ({ [OPEN_SYNTAX]: '<', [CLOSE_SYNTAX]: '</' }[x.type] || x.type) + '!' + x.syntax.name : null),
        //         token: token && token.value,
        //         tokenIndex,
        //         syntax: syntax.type + (syntax.id ? ' #' + syntax.id : '')
        //     }, { depth: null })
        // );
        switch (state.type) {
            case 'Match':
                if (thenStack === null) {
                    // turn to MISMATCH when some tokens left unmatched
                    if (token !== null) {
                        // doesn't mismatch if just one token left and it's an IE hack
                        if (tokenIndex !== tokens.length - 1 || (token.value !== '\\0' && token.value !== '\\9')) {
                            state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                            break;
                        }
                    }

                    // break the main loop, return a result - MATCH
                    exitReason = EXIT_REASON_MATCH;
                    break;
                }

                // go to next syntax (`then` branch)
                state = thenStack.nextState;

                // check match is not empty
                if (state === _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.DISALLOW_EMPTY) {
                    if (thenStack.matchStack === matchStack) {
                        state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                        break;
                    } else {
                        state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                    }
                }

                // close syntax if needed
                while (thenStack.syntaxStack !== syntaxStack) {
                    closeSyntax();
                }

                // pop stack
                thenStack = thenStack.prev;
                break;

            case 'Mismatch':
                // when some syntax is stashed
                if (syntaxStash !== null && syntaxStash !== false) {
                    // there is no else branches or a branch reduce match stack
                    if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
                        // restore state from the stash
                        elseStack = syntaxStash;
                        syntaxStash = false; // disable stashing
                    }
                } else if (elseStack === null) {
                    // no else branches -> break the main loop
                    // return a result - MISMATCH
                    exitReason = EXIT_REASON_MISMATCH;
                    break;
                }

                // go to next syntax (`else` branch)
                state = elseStack.nextState;

                // restore all the rest stack states
                thenStack = elseStack.thenStack;
                syntaxStack = elseStack.syntaxStack;
                matchStack = elseStack.matchStack;
                tokenIndex = elseStack.tokenIndex;
                token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;

                // pop stack
                elseStack = elseStack.prev;
                break;

            case 'MatchGraph':
                state = state.match;
                break;

            case 'If':
                // IMPORTANT: else stack push must go first,
                // since it stores the state of thenStack before changes
                if (state.else !== _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH) {
                    pushElseStack(state.else);
                }

                if (state.then !== _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH) {
                    pushThenStack(state.then);
                }

                state = state.match;
                break;

            case 'MatchOnce':
                state = {
                    type: 'MatchOnceBuffer',
                    syntax: state,
                    index: 0,
                    mask: 0
                };
                break;

            case 'MatchOnceBuffer': {
                const terms = state.syntax.terms;

                if (state.index === terms.length) {
                    // no matches at all or it's required all terms to be matched
                    if (state.mask === 0 || state.syntax.all) {
                        state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                        break;
                    }

                    // a partial match is ok
                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                    break;
                }

                // all terms are matched
                if (state.mask === (1 << terms.length) - 1) {
                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                    break;
                }

                for (; state.index < terms.length; state.index++) {
                    const matchFlag = 1 << state.index;

                    if ((state.mask & matchFlag) === 0) {
                        // IMPORTANT: else stack push must go first,
                        // since it stores the state of thenStack before changes
                        pushElseStack(state);
                        pushThenStack({
                            type: 'AddMatchOnce',
                            syntax: state.syntax,
                            mask: state.mask | matchFlag
                        });

                        // match
                        state = terms[state.index++];
                        break;
                    }
                }
                break;
            }

            case 'AddMatchOnce':
                state = {
                    type: 'MatchOnceBuffer',
                    syntax: state.syntax,
                    index: 0,
                    mask: state.mask
                };
                break;

            case 'Enum':
                if (token !== null) {
                    let name = token.value.toLowerCase();

                    // drop \0 and \9 hack from keyword name
                    if (name.indexOf('\\') !== -1) {
                        name = name.replace(/\\[09].*$/, '');
                    }

                    if (hasOwnProperty.call(state.map, name)) {
                        state = state.map[name];
                        break;
                    }
                }

                state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                break;

            case 'Generic': {
                const opts = syntaxStack !== null ? syntaxStack.opts : null;
                const lastTokenIndex = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));

                if (!isNaN(lastTokenIndex) && lastTokenIndex > tokenIndex) {
                    while (tokenIndex < lastTokenIndex) {
                        addTokenToMatch();
                    }

                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                } else {
                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                }

                break;
            }

            case 'Type':
            case 'Property': {
                const syntaxDict = state.type === 'Type' ? 'types' : 'properties';
                const dictSyntax = hasOwnProperty.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;

                if (!dictSyntax || !dictSyntax.match) {
                    throw new Error(
                        'Bad syntax reference: ' +
                        (state.type === 'Type'
                            ? '<' + state.name + '>'
                            : '<\'' + state.name + '\'>')
                    );
                }

                // stash a syntax for types with low priority
                if (syntaxStash !== false && token !== null && state.type === 'Type') {
                    const lowPriorityMatching =
                        // https://drafts.csswg.org/css-values-4/#custom-idents
                        // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
                        // can only claim the keyword if no other unfulfilled production can claim it.
                        (state.name === 'custom-ident' && token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.Ident) ||

                        // https://drafts.csswg.org/css-values-4/#lengths
                        // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
                        // it must parse as a <number>
                        (state.name === 'length' && token.value === '0');

                    if (lowPriorityMatching) {
                        if (syntaxStash === null) {
                            syntaxStash = stateSnapshotFromSyntax(state, elseStack);
                        }

                        state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                        break;
                    }
                }

                openSyntax();
                state = dictSyntax.match;
                break;
            }

            case 'Keyword': {
                const name = state.name;

                if (token !== null) {
                    let keywordName = token.value;

                    // drop \0 and \9 hack from keyword name
                    if (keywordName.indexOf('\\') !== -1) {
                        keywordName = keywordName.replace(/\\[09].*$/, '');
                    }

                    if (areStringsEqualCaseInsensitive(keywordName, name)) {
                        addTokenToMatch();
                        state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                        break;
                    }
                }

                state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                break;
            }

            case 'AtKeyword':
            case 'Function':
                if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
                    addTokenToMatch();
                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                    break;
                }

                state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                break;

            case 'Token':
                if (token !== null && token.value === state.value) {
                    addTokenToMatch();
                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                    break;
                }

                state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                break;

            case 'Comma':
                if (token !== null && token.type === _tokenizer_types_js__WEBPACK_IMPORTED_MODULE_1__.Comma) {
                    if (isCommaContextStart(matchStack.token)) {
                        state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                    } else {
                        addTokenToMatch();
                        state = isCommaContextEnd(token) ? _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH : _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                    }
                } else {
                    state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH : _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                }

                break;

            case 'String':
                let string = '';
                let lastTokenIndex = tokenIndex;

                for (; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) {
                    string += tokens[lastTokenIndex].value;
                }

                if (areStringsEqualCaseInsensitive(string, state.value)) {
                    while (tokenIndex < lastTokenIndex) {
                        addTokenToMatch();
                    }

                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MATCH;
                } else {
                    state = _match_graph_js__WEBPACK_IMPORTED_MODULE_0__.MISMATCH;
                }

                break;

            default:
                throw new Error('Unknown node type: ' + state.type);
        }
    }

    totalIterationCount += iterationCount;

    switch (exitReason) {
        case null:
            console.warn('[csstree-match] BREAK after ' + ITERATION_LIMIT + ' iterations');
            exitReason = EXIT_REASON_ITERATION_LIMIT;
            matchStack = null;
            break;

        case EXIT_REASON_MATCH:
            while (syntaxStack !== null) {
                closeSyntax();
            }
            break;

        default:
            matchStack = null;
    }

    return {
        tokens,
        reason: exitReason,
        iterations: iterationCount,
        match: matchStack,
        longestMatch
    };
}

function matchAsList(tokens, matchGraph, syntaxes) {
    const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match !== null) {
        let item = reverseList(matchResult.match).prev;

        matchResult.match = [];

        while (item !== null) {
            switch (item.type) {
                case OPEN_SYNTAX:
                case CLOSE_SYNTAX:
                    matchResult.match.push({
                        type: item.type,
                        syntax: item.syntax
                    });
                    break;

                default:
                    matchResult.match.push({
                        token: item.token.value,
                        node: item.token.node
                    });
                    break;
            }

            item = item.prev;
        }
    }

    return matchResult;
}

function matchAsTree(tokens, matchGraph, syntaxes) {
    const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match === null) {
        return matchResult;
    }

    let item = matchResult.match;
    let host = matchResult.match = {
        syntax: matchGraph.syntax || null,
        match: []
    };
    const hostStack = [host];

    // revert a list and start with 2nd item since 1st is a stub item
    item = reverseList(item).prev;

    // build a tree
    while (item !== null) {
        switch (item.type) {
            case OPEN_SYNTAX:
                host.match.push(host = {
                    syntax: item.syntax,
                    match: []
                });
                hostStack.push(host);
                break;

            case CLOSE_SYNTAX:
                hostStack.pop();
                host = hostStack[hostStack.length - 1];
                break;

            default:
                host.match.push({
                    syntax: item.syntax || null,
                    token: item.token.value,
                    node: item.token.node
                });
        }

        item = item.prev;
    }

    return matchResult;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/prepare-tokens.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/prepare-tokens.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const astToTokens = {
    decorator: function(handlers) {
        const tokens = [];
        let curNode = null;

        return {
            ...handlers,
            node(node) {
                const tmp = curNode;
                curNode = node;
                handlers.node.call(this, node);
                curNode = tmp;
            },
            emit(value, type, auto) {
                tokens.push({
                    type,
                    value,
                    node: auto ? null : curNode
                });
            },
            result() {
                return tokens;
            }
        };
    }
};

function stringToTokens(str) {
    const tokens = [];

    (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.tokenize)(str, (type, start, end) =>
        tokens.push({
            type,
            value: str.slice(start, end),
            node: null
        })
    );

    return tokens;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value, syntax) {
    if (typeof value === 'string') {
        return stringToTokens(value);
    }

    return syntax.generate(value, astToTokens);
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/search.js":
/*!*******************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/search.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matchFragments": () => (/* binding */ matchFragments)
/* harmony export */ });
/* harmony import */ var _utils_List_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/List.js */ "../../node_modules/css-tree/lib/utils/List.js");


function getFirstMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getFirstMatchNode(matchNode.match[0]);
}

function getLastMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
}

function matchFragments(lexer, ast, match, type, name) {
    function findFragments(matchNode) {
        if (matchNode.syntax !== null &&
            matchNode.syntax.type === type &&
            matchNode.syntax.name === name) {
            const start = getFirstMatchNode(matchNode);
            const end = getLastMatchNode(matchNode);

            lexer.syntax.walk(ast, function(node, item, list) {
                if (node === start) {
                    const nodes = new _utils_List_js__WEBPACK_IMPORTED_MODULE_0__.List();

                    do {
                        nodes.appendData(item.data);

                        if (item.data === end) {
                            break;
                        }

                        item = item.next;
                    } while (item !== null);

                    fragments.push({
                        parent: list,
                        nodes
                    });
                }
            });
        }

        if (Array.isArray(matchNode.match)) {
            matchNode.match.forEach(findFragments);
        }
    }

    const fragments = [];

    if (match.matched !== null) {
        findFragments(match.matched);
    }

    return fragments;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/structure.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/structure.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStructureFromConfig": () => (/* binding */ getStructureFromConfig)
/* harmony export */ });
/* harmony import */ var _utils_List_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/List.js */ "../../node_modules/css-tree/lib/utils/List.js");


const { hasOwnProperty } = Object.prototype;

function isValidNumber(value) {
    // Number.isInteger(value) && value >= 0
    return (
        typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value &&
        value >= 0
    );
}

function isValidLocation(loc) {
    return (
        Boolean(loc) &&
        isValidNumber(loc.offset) &&
        isValidNumber(loc.line) &&
        isValidNumber(loc.column)
    );
}

function createNodeStructureChecker(type, fields) {
    return function checkNode(node, warn) {
        if (!node || node.constructor !== Object) {
            return warn(node, 'Type of node should be an Object');
        }

        for (let key in node) {
            let valid = true;

            if (hasOwnProperty.call(node, key) === false) {
                continue;
            }

            if (key === 'type') {
                if (node.type !== type) {
                    warn(node, 'Wrong node type `' + node.type + '`, expected `' + type + '`');
                }
            } else if (key === 'loc') {
                if (node.loc === null) {
                    continue;
                } else if (node.loc && node.loc.constructor === Object) {
                    if (typeof node.loc.source !== 'string') {
                        key += '.source';
                    } else if (!isValidLocation(node.loc.start)) {
                        key += '.start';
                    } else if (!isValidLocation(node.loc.end)) {
                        key += '.end';
                    } else {
                        continue;
                    }
                }

                valid = false;
            } else if (fields.hasOwnProperty(key)) {
                valid = false;

                for (let i = 0; !valid && i < fields[key].length; i++) {
                    const fieldType = fields[key][i];

                    switch (fieldType) {
                        case String:
                            valid = typeof node[key] === 'string';
                            break;

                        case Boolean:
                            valid = typeof node[key] === 'boolean';
                            break;

                        case null:
                            valid = node[key] === null;
                            break;

                        default:
                            if (typeof fieldType === 'string') {
                                valid = node[key] && node[key].type === fieldType;
                            } else if (Array.isArray(fieldType)) {
                                valid = node[key] instanceof _utils_List_js__WEBPACK_IMPORTED_MODULE_0__.List;
                            }
                    }
                }
            } else {
                warn(node, 'Unknown field `' + key + '` for ' + type + ' node type');
            }

            if (!valid) {
                warn(node, 'Bad value for `' + type + '.' + key + '`');
            }
        }

        for (const key in fields) {
            if (hasOwnProperty.call(fields, key) &&
                hasOwnProperty.call(node, key) === false) {
                warn(node, 'Field `' + type + '.' + key + '` is missed');
            }
        }
    };
}

function processStructure(name, nodeType) {
    const structure = nodeType.structure;
    const fields = {
        type: String,
        loc: true
    };
    const docs = {
        type: '"' + name + '"'
    };

    for (const key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        const docsTypes = [];
        const fieldTypes = fields[key] = Array.isArray(structure[key])
            ? structure[key].slice()
            : [structure[key]];

        for (let i = 0; i < fieldTypes.length; i++) {
            const fieldType = fieldTypes[i];
            if (fieldType === String || fieldType === Boolean) {
                docsTypes.push(fieldType.name);
            } else if (fieldType === null) {
                docsTypes.push('null');
            } else if (typeof fieldType === 'string') {
                docsTypes.push('<' + fieldType + '>');
            } else if (Array.isArray(fieldType)) {
                docsTypes.push('List'); // TODO: use type enum
            } else {
                throw new Error('Wrong value `' + fieldType + '` in `' + name + '.' + key + '` structure definition');
            }
        }

        docs[key] = docsTypes.join(' | ');
    }

    return {
        docs,
        check: createNodeStructureChecker(name, fields)
    };
}

function getStructureFromConfig(config) {
    const structure = {};

    if (config.node) {
        for (const name in config.node) {
            if (hasOwnProperty.call(config.node, name)) {
                const nodeType = config.node[name];

                if (nodeType.structure) {
                    structure[name] = processStructure(name, nodeType);
                } else {
                    throw new Error('Missed `structure` field in `' + name + '` node type definition');
                }
            }
        }
    }

    return structure;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/lexer/trace.js":
/*!******************************************************!*\
  !*** ../../node_modules/css-tree/lib/lexer/trace.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTrace": () => (/* binding */ getTrace),
/* harmony export */   "isKeyword": () => (/* binding */ isKeyword),
/* harmony export */   "isProperty": () => (/* binding */ isProperty),
/* harmony export */   "isType": () => (/* binding */ isType)
/* harmony export */ });
function getTrace(node) {
    function shouldPutToTrace(syntax) {
        if (syntax === null) {
            return false;
        }

        return (
            syntax.type === 'Type' ||
            syntax.type === 'Property' ||
            syntax.type === 'Keyword'
        );
    }

    function hasMatch(matchNode) {
        if (Array.isArray(matchNode.match)) {
            // use for-loop for better perfomance
            for (let i = 0; i < matchNode.match.length; i++) {
                if (hasMatch(matchNode.match[i])) {
                    if (shouldPutToTrace(matchNode.syntax)) {
                        result.unshift(matchNode.syntax);
                    }

                    return true;
                }
            }
        } else if (matchNode.node === node) {
            result = shouldPutToTrace(matchNode.syntax)
                ? [matchNode.syntax]
                : [];

            return true;
        }

        return false;
    }

    let result = null;

    if (this.matched !== null) {
        hasMatch(this.matched);
    }

    return result;
}

function isType(node, type) {
    return testNode(this, node, match => match.type === 'Type' && match.name === type);
}

function isProperty(node, property) {
    return testNode(this, node, match => match.type === 'Property' && match.name === property);
}

function isKeyword(node) {
    return testNode(this, node, match => match.type === 'Keyword');
}

function testNode(match, node, fn) {
    const trace = getTrace.call(match, node);

    if (trace === null) {
        return false;
    }

    return trace.some(fn);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/parser/SyntaxError.js":
/*!*************************************************************!*\
  !*** ../../node_modules/css-tree/lib/parser/SyntaxError.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyntaxError": () => (/* binding */ SyntaxError)
/* harmony export */ });
/* harmony import */ var _utils_create_custom_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/create-custom-error.js */ "../../node_modules/css-tree/lib/utils/create-custom-error.js");


const MAX_LINE_LENGTH = 100;
const OFFSET_CORRECTION = 60;
const TAB_REPLACEMENT = '    ';

function sourceFragment({ source, line, column }, extraLines) {
    function processLines(start, end) {
        return lines
            .slice(start, end)
            .map((line, idx) =>
                String(start + idx + 1).padStart(maxNumLength) + ' |' + line
            ).join('\n');
    }

    const lines = source.split(/\r\n?|\n|\f/);
    const startLine = Math.max(1, line - extraLines) - 1;
    const endLine = Math.min(line + extraLines, lines.length + 1);
    const maxNumLength = Math.max(4, String(endLine).length) + 1;
    let cutLeft = 0;

    // column correction according to replaced tab before column
    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;

    if (column > MAX_LINE_LENGTH) {
        cutLeft = column - OFFSET_CORRECTION + 3;
        column = OFFSET_CORRECTION - 2;
    }

    for (let i = startLine; i <= endLine; i++) {
        if (i >= 0 && i < lines.length) {
            lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
            lines[i] =
                (cutLeft > 0 && lines[i].length > cutLeft ? '\u2026' : '') +
                lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) +
                (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? '\u2026' : '');
        }
    }

    return [
        processLines(startLine, line),
        new Array(column + maxNumLength + 2).join('-') + '^',
        processLines(line, endLine)
    ].filter(Boolean).join('\n');
}

function SyntaxError(message, source, offset, line, column) {
    const error = Object.assign((0,_utils_create_custom_error_js__WEBPACK_IMPORTED_MODULE_0__.createCustomError)('SyntaxError', message), {
        source,
        offset,
        line,
        column,
        sourceFragment(extraLines) {
            return sourceFragment({ source, line, column }, isNaN(extraLines) ? 0 : extraLines);
        },
        get formattedMessage() {
            return (
                `Parse error: ${message}\n` +
                sourceFragment({ source, line, column }, 2)
            );
        }
    });

    return error;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/parser/create.js":
/*!********************************************************!*\
  !*** ../../node_modules/css-tree/lib/parser/create.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createParser": () => (/* binding */ createParser)
/* harmony export */ });
/* harmony import */ var _utils_List_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/List.js */ "../../node_modules/css-tree/lib/utils/List.js");
/* harmony import */ var _SyntaxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SyntaxError.js */ "../../node_modules/css-tree/lib/parser/SyntaxError.js");
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sequence.js */ "../../node_modules/css-tree/lib/parser/sequence.js");





const NOOP = () => {};
const EXCLAMATIONMARK = 0x0021;  // U+0021 EXCLAMATION MARK (!)
const NUMBERSIGN = 0x0023;       // U+0023 NUMBER SIGN (#)
const SEMICOLON = 0x003B;        // U+003B SEMICOLON (;)
const LEFTCURLYBRACKET = 0x007B; // U+007B LEFT CURLY BRACKET ({)
const NULL = 0;

function createParseContext(name) {
    return function() {
        return this[name]();
    };
}

function fetchParseValues(dict) {
    const result = Object.create(null);

    for (const name in dict) {
        const item = dict[name];

        if (item.parse) {
            result[name] = item.parse;
        }
    }

    return result;
}

function processConfig(config) {
    const parseConfig = {
        context: Object.create(null),
        scope: Object.assign(Object.create(null), config.scope),
        atrule: fetchParseValues(config.atrule),
        pseudo: fetchParseValues(config.pseudo),
        node: fetchParseValues(config.node)
    };

    for (const name in config.parseContext) {
        switch (typeof config.parseContext[name]) {
            case 'function':
                parseConfig.context[name] = config.parseContext[name];
                break;

            case 'string':
                parseConfig.context[name] = createParseContext(config.parseContext[name]);
                break;
        }
    }

    return {
        config: parseConfig,
        ...parseConfig,
        ...parseConfig.node
    };
}

function createParser(config) {
    let source = '';
    let filename = '<unknown>';
    let needPositions = false;
    let onParseError = NOOP;
    let onParseErrorThrow = false;

    const locationMap = new _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.OffsetToLocation();
    const parser = Object.assign(new _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.TokenStream(), processConfig(config || {}), {
        parseAtrulePrelude: true,
        parseRulePrelude: true,
        parseValue: true,
        parseCustomProperty: false,

        readSequence: _sequence_js__WEBPACK_IMPORTED_MODULE_3__.readSequence,

        consumeUntilBalanceEnd: () => 0,
        consumeUntilLeftCurlyBracket(code) {
            return code === LEFTCURLYBRACKET ? 1 : 0;
        },
        consumeUntilLeftCurlyBracketOrSemicolon(code) {
            return code === LEFTCURLYBRACKET || code === SEMICOLON ? 1 : 0;
        },
        consumeUntilExclamationMarkOrSemicolon(code) {
            return code === EXCLAMATIONMARK || code === SEMICOLON ? 1 : 0;
        },
        consumeUntilSemicolonIncluded(code) {
            return code === SEMICOLON ? 2 : 0;
        },

        createList() {
            return new _utils_List_js__WEBPACK_IMPORTED_MODULE_0__.List();
        },
        createSingleNodeList(node) {
            return new _utils_List_js__WEBPACK_IMPORTED_MODULE_0__.List().appendData(node);
        },
        getFirstListNode(list) {
            return list && list.first;
        },
        getLastListNode(list) {
            return list && list.last;
        },

        parseWithFallback(consumer, fallback) {
            const startToken = this.tokenIndex;

            try {
                return consumer.call(this);
            } catch (e) {
                if (onParseErrorThrow) {
                    throw e;
                }

                const fallbackNode = fallback.call(this, startToken);

                onParseErrorThrow = true;
                onParseError(e, fallbackNode);
                onParseErrorThrow = false;

                return fallbackNode;
            }
        },

        lookupNonWSType(offset) {
            let type;

            do {
                type = this.lookupType(offset++);
                if (type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.WhiteSpace) {
                    return type;
                }
            } while (type !== NULL);

            return NULL;
        },

        charCodeAt(offset) {
            return offset >= 0 && offset < source.length ? source.charCodeAt(offset) : 0;
        },
        substring(offsetStart, offsetEnd) {
            return source.substring(offsetStart, offsetEnd);
        },
        substrToCursor(start) {
            return this.source.substring(start, this.tokenStart);
        },

        cmpChar(offset, charCode) {
            return (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.cmpChar)(source, offset, charCode);
        },
        cmpStr(offsetStart, offsetEnd, str) {
            return (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.cmpStr)(source, offsetStart, offsetEnd, str);
        },

        consume(tokenType) {
            const start = this.tokenStart;

            this.eat(tokenType);

            return this.substrToCursor(start);
        },
        consumeFunctionName() {
            const name = source.substring(this.tokenStart, this.tokenEnd - 1);

            this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function);

            return name;
        },
        consumeNumber(type) {
            const number = source.substring(this.tokenStart, (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.consumeNumber)(source, this.tokenStart));

            this.eat(type);

            return number;
        },

        eat(tokenType) {
            if (this.tokenType !== tokenType) {
                const tokenName = _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.tokenNames[tokenType].slice(0, -6).replace(/-/g, ' ').replace(/^./, m => m.toUpperCase());
                let message = `${/[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName} is expected`;
                let offset = this.tokenStart;

                // tweak message and offset
                switch (tokenType) {
                    case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Ident:
                        // when identifier is expected but there is a function or url
                        if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function || this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Url) {
                            offset = this.tokenEnd - 1;
                            message = 'Identifier is expected but function found';
                        } else {
                            message = 'Identifier is expected';
                        }
                        break;

                    case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Hash:
                        if (this.isDelim(NUMBERSIGN)) {
                            this.next();
                            offset++;
                            message = 'Name is expected';
                        }
                        break;

                    case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Percentage:
                        if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Number) {
                            offset = this.tokenEnd;
                            message = 'Percent sign is expected';
                        }
                        break;
                }

                this.error(message, offset);
            }

            this.next();
        },
        eatIdent(name) {
            if (this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Ident || this.lookupValue(0, name) === false) {
                this.error(`Identifier "${name}" is expected`);
            }

            this.next();
        },
        eatDelim(code) {
            if (!this.isDelim(code)) {
                this.error(`Delim "${String.fromCharCode(code)}" is expected`);
            }

            this.next();
        },

        getLocation(start, end) {
            if (needPositions) {
                return locationMap.getLocationRange(
                    start,
                    end,
                    filename
                );
            }

            return null;
        },
        getLocationFromList(list) {
            if (needPositions) {
                const head = this.getFirstListNode(list);
                const tail = this.getLastListNode(list);
                return locationMap.getLocationRange(
                    head !== null ? head.loc.start.offset - locationMap.startOffset : this.tokenStart,
                    tail !== null ? tail.loc.end.offset - locationMap.startOffset : this.tokenStart,
                    filename
                );
            }

            return null;
        },

        error(message, offset) {
            const location = typeof offset !== 'undefined' && offset < source.length
                ? locationMap.getLocation(offset)
                : this.eof
                    ? locationMap.getLocation((0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.findWhiteSpaceStart)(source, source.length - 1))
                    : locationMap.getLocation(this.tokenStart);

            throw new _SyntaxError_js__WEBPACK_IMPORTED_MODULE_1__.SyntaxError(
                message || 'Unexpected input',
                source,
                location.offset,
                location.line,
                location.column
            );
        }
    });

    const parse = function(source_, options) {
        source = source_;
        options = options || {};

        parser.setSource(source, _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.tokenize);
        locationMap.setSource(
            source,
            options.offset,
            options.line,
            options.column
        );

        filename = options.filename || '<unknown>';
        needPositions = Boolean(options.positions);
        onParseError = typeof options.onParseError === 'function' ? options.onParseError : NOOP;
        onParseErrorThrow = false;

        parser.parseAtrulePrelude = 'parseAtrulePrelude' in options ? Boolean(options.parseAtrulePrelude) : true;
        parser.parseRulePrelude = 'parseRulePrelude' in options ? Boolean(options.parseRulePrelude) : true;
        parser.parseValue = 'parseValue' in options ? Boolean(options.parseValue) : true;
        parser.parseCustomProperty = 'parseCustomProperty' in options ? Boolean(options.parseCustomProperty) : false;

        const { context = 'default', onComment } = options;

        if (context in parser.context === false) {
            throw new Error('Unknown context `' + context + '`');
        }

        if (typeof onComment === 'function') {
            parser.forEachToken((type, start, end) => {
                if (type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Comment) {
                    const loc = parser.getLocation(start, end);
                    const value = (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.cmpStr)(source, end - 2, end, '*/')
                        ? source.slice(start + 2, end - 2)
                        : source.slice(start + 2, end);

                    onComment(value, loc);
                }
            });
        }

        const ast = parser.context[context].call(parser, options);

        if (!parser.eof) {
            parser.error();
        }

        return ast;
    };

    return Object.assign(parse, {
        SyntaxError: _SyntaxError_js__WEBPACK_IMPORTED_MODULE_1__.SyntaxError,
        config: parser.config
    });
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/parser/sequence.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/parser/sequence.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readSequence": () => (/* binding */ readSequence)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


function readSequence(recognizer) {
    const children = this.createList();
    let space = false;
    const context = {
        recognizer
    };

    while (!this.eof) {
        switch (this.tokenType) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment:
                this.next();
                continue;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace:
                space = true;
                this.next();
                continue;
        }

        let child = recognizer.getNode.call(this, context);

        if (child === undefined) {
            break;
        }

        if (space) {
            if (recognizer.onWhiteSpace) {
                recognizer.onWhiteSpace.call(this, child, children, context);
            }
            space = false;
        }

        children.push(child);
    }

    if (space && recognizer.onWhiteSpace) {
        recognizer.onWhiteSpace.call(this, null, children, context);
    }

    return children;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/atrule/font-face.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/atrule/font-face.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    parse: {
        prelude: null,
        block() {
            return this.Block(true);
        }
    }
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/atrule/import.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/atrule/import.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    parse: {
        prelude() {
            const children = this.createList();

            this.skipSC();

            switch (this.tokenType) {
                case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.String:
                    children.push(this.String());
                    break;

                case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url:
                case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function:
                    children.push(this.Url());
                    break;

                default:
                    this.error('String or url() is expected');
            }

            if (this.lookupNonWSType(0) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident ||
                this.lookupNonWSType(0) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis) {
                children.push(this.MediaQueryList());
            }

            return children;
        },
        block: null
    }
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/atrule/index.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/atrule/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _font_face_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./font-face.js */ "../../node_modules/css-tree/lib/syntax/atrule/font-face.js");
/* harmony import */ var _import_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import.js */ "../../node_modules/css-tree/lib/syntax/atrule/import.js");
/* harmony import */ var _media_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./media.js */ "../../node_modules/css-tree/lib/syntax/atrule/media.js");
/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page.js */ "../../node_modules/css-tree/lib/syntax/atrule/page.js");
/* harmony import */ var _supports_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supports.js */ "../../node_modules/css-tree/lib/syntax/atrule/supports.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    'font-face': _font_face_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    'import': _import_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    media: _media_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    page: _page_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    supports: _supports_js__WEBPACK_IMPORTED_MODULE_4__["default"]
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/atrule/media.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/atrule/media.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    parse: {
        prelude() {
            return this.createSingleNodeList(
                this.MediaQueryList()
            );
        },
        block() {
            return this.Block(false);
        }
    }
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/atrule/page.js":
/*!*************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/atrule/page.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    parse: {
        prelude() {
            return this.createSingleNodeList(
                this.SelectorList()
            );
        },
        block() {
            return this.Block(true);
        }
    }
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/atrule/supports.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/atrule/supports.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


function consumeRaw() {
    return this.createSingleNodeList(
        this.Raw(this.tokenIndex, null, false)
    );
}

function parentheses() {
    this.skipSC();

    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident &&
        this.lookupNonWSType(1) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon) {
        return this.createSingleNodeList(
            this.Declaration()
        );
    }

    return readSequence.call(this);
}

function readSequence() {
    const children = this.createList();
    let child;

    this.skipSC();

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace:
                this.next();
                continue;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function:
                child = this.Function(consumeRaw, this.scope.AtrulePrelude);
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident:
                child = this.Identifier();
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis:
                child = this.Parentheses(parentheses, this.scope.AtrulePrelude);
                break;

            default:
                break scan;
        }

        children.push(child);
    }

    return children;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    parse: {
        prelude() {
            const children = readSequence.call(this);

            if (this.getFirstListNode(children) === null) {
                this.error('Condition is expected');
            }

            return children;
        },
        block() {
            return this.Block(false);
        }
    }
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/config/lexer.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/config/lexer.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data.js */ "../../node_modules/css-tree/dist/data.js");
/* harmony import */ var _node_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node/index.js */ "../../node_modules/css-tree/lib/syntax/node/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    generic: true,
    ..._data_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    node: _node_index_js__WEBPACK_IMPORTED_MODULE_1__
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/config/mix.js":
/*!************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/config/mix.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const { hasOwnProperty } = Object.prototype;
const shape = {
    generic: true,
    types: appendOrAssign,
    atrules: {
        prelude: appendOrAssignOrNull,
        descriptors: appendOrAssignOrNull
    },
    properties: appendOrAssign,
    parseContext: assign,
    scope: deepAssign,
    atrule: ['parse'],
    pseudo: ['parse'],
    node: ['name', 'structure', 'parse', 'generate', 'walkContext']
};

function isObject(value) {
    return value && value.constructor === Object;
}

function copy(value) {
    return isObject(value)
        ? { ...value }
        : value;
}

function assign(dest, src) {
    return Object.assign(dest, src);
}

function deepAssign(dest, src) {
    for (const key in src) {
        if (hasOwnProperty.call(src, key)) {
            if (isObject(dest[key])) {
                deepAssign(dest[key], copy(src[key]));
            } else {
                dest[key] = copy(src[key]);
            }
        }
    }

    return dest;
}

function append(a, b) {
    if (typeof b === 'string' && /^\s*\|/.test(b)) {
        return typeof a === 'string'
            ? a + b
            : b.replace(/^\s*\|\s*/, '');
    }

    return b || null;
}

function appendOrAssign(a, b) {
    if (typeof b === 'string') {
        return append(a, b);
    }

    const result = { ...a };
    for (let key in b) {
        if (hasOwnProperty.call(b, key)) {
            result[key] = append(hasOwnProperty.call(a, key) ? a[key] : undefined, b[key]);
        }
    }

    return result;
}

function appendOrAssignOrNull(a, b) {
    const result = appendOrAssign(a, b);

    return !isObject(result) || Object.keys(result).length
        ? result
        : null;
}

function mix(dest, src, shape) {
    for (const key in shape) {
        if (hasOwnProperty.call(shape, key) === false) {
            continue;
        }

        if (shape[key] === true) {
            if (key in src) {
                if (hasOwnProperty.call(src, key)) {
                    dest[key] = copy(src[key]);
                }
            }
        } else if (shape[key]) {
            if (typeof shape[key] === 'function') {
                const fn = shape[key];
                dest[key] = fn({}, dest[key]);
                dest[key] = fn(dest[key] || {}, src[key]);
            } else if (isObject(shape[key])) {
                const result = {};

                for (let name in dest[key]) {
                    result[name] = mix({}, dest[key][name], shape[key]);
                }

                for (let name in src[key]) {
                    result[name] = mix(result[name] || {}, src[key][name], shape[key]);
                }

                dest[key] = result;
            } else if (Array.isArray(shape[key])) {
                const res = {};
                const innerShape = shape[key].reduce(function(s, k) {
                    s[k] = true;
                    return s;
                }, {});

                for (const [name, value] of Object.entries(dest[key] || {})) {
                    res[name] = {};
                    if (value) {
                        mix(res[name], value, innerShape);
                    }
                }

                for (const name in src[key]) {
                    if (hasOwnProperty.call(src[key], name)) {
                        if (!res[name]) {
                            res[name] = {};
                        }

                        if (src[key] && src[key][name]) {
                            mix(res[name], src[key][name], innerShape);
                        }
                    }
                }

                dest[key] = res;
            }
        }
    }
    return dest;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((dest, src) => mix(dest, src, shape));


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/config/parser.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/config/parser.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scope_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scope/index.js */ "../../node_modules/css-tree/lib/syntax/scope/index.js");
/* harmony import */ var _atrule_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../atrule/index.js */ "../../node_modules/css-tree/lib/syntax/atrule/index.js");
/* harmony import */ var _pseudo_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pseudo/index.js */ "../../node_modules/css-tree/lib/syntax/pseudo/index.js");
/* harmony import */ var _node_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node/index.js */ "../../node_modules/css-tree/lib/syntax/node/index.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    parseContext: {
        default: 'StyleSheet',
        stylesheet: 'StyleSheet',
        atrule: 'Atrule',
        atrulePrelude: function(options) {
            return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
        },
        mediaQueryList: 'MediaQueryList',
        mediaQuery: 'MediaQuery',
        rule: 'Rule',
        selectorList: 'SelectorList',
        selector: 'Selector',
        block: function() {
            return this.Block(true);
        },
        declarationList: 'DeclarationList',
        declaration: 'Declaration',
        value: 'Value'
    },
    scope: _scope_index_js__WEBPACK_IMPORTED_MODULE_0__,
    atrule: _atrule_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    pseudo: _pseudo_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    node: _node_index_js__WEBPACK_IMPORTED_MODULE_3__
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/config/walker.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/config/walker.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node/index.js */ "../../node_modules/css-tree/lib/syntax/node/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    node: _node_index_js__WEBPACK_IMPORTED_MODULE_0__
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/create.js":
/*!********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/create.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");
/* harmony import */ var _parser_create_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parser/create.js */ "../../node_modules/css-tree/lib/parser/create.js");
/* harmony import */ var _generator_create_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../generator/create.js */ "../../node_modules/css-tree/lib/generator/create.js");
/* harmony import */ var _convertor_create_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../convertor/create.js */ "../../node_modules/css-tree/lib/convertor/create.js");
/* harmony import */ var _walker_create_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../walker/create.js */ "../../node_modules/css-tree/lib/walker/create.js");
/* harmony import */ var _lexer_Lexer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lexer/Lexer.js */ "../../node_modules/css-tree/lib/lexer/Lexer.js");
/* harmony import */ var _config_mix_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config/mix.js */ "../../node_modules/css-tree/lib/syntax/config/mix.js");








function createSyntax(config) {
    const parse = (0,_parser_create_js__WEBPACK_IMPORTED_MODULE_1__.createParser)(config);
    const walk = (0,_walker_create_js__WEBPACK_IMPORTED_MODULE_4__.createWalker)(config);
    const generate = (0,_generator_create_js__WEBPACK_IMPORTED_MODULE_2__.createGenerator)(config);
    const { fromPlainObject, toPlainObject } = (0,_convertor_create_js__WEBPACK_IMPORTED_MODULE_3__.createConvertor)(walk);

    const syntax = {
        lexer: null,
        createLexer: config => new _lexer_Lexer_js__WEBPACK_IMPORTED_MODULE_5__.Lexer(config, syntax, syntax.lexer.structure),

        tokenize: _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.tokenize,
        parse,
        generate,

        walk,
        find: walk.find,
        findLast: walk.findLast,
        findAll: walk.findAll,

        fromPlainObject,
        toPlainObject,

        fork(extension) {
            const base = (0,_config_mix_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, config); // copy of config

            return createSyntax(
                typeof extension === 'function'
                    ? extension(base, Object.assign)
                    : (0,_config_mix_js__WEBPACK_IMPORTED_MODULE_6__["default"])(base, extension)
            );
        }
    };

    syntax.lexer = new _lexer_Lexer_js__WEBPACK_IMPORTED_MODULE_5__.Lexer({
        generic: true,
        types: config.types,
        atrules: config.atrules,
        properties: config.properties,
        node: config.node
    }, syntax);

    return syntax;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config => createSyntax((0,_config_mix_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, config)));


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/function/expression.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/function/expression.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// legacy IE function
// expression( <any-value> )
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return this.createSingleNodeList(
        this.Raw(this.tokenIndex, null, false)
    );
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/function/var.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/function/var.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


// var( <ident> , <value>? )
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    const children = this.createList();

    this.skipSC();

    // NOTE: Don't check more than a first argument is an ident, rest checks are for lexer
    children.push(this.Identifier());

    this.skipSC();

    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comma) {
        children.push(this.Operator());

        const startIndex = this.tokenIndex;
        const value = this.parseCustomProperty
            ? this.Value(null)
            : this.Raw(this.tokenIndex, this.consumeUntilExclamationMarkOrSemicolon, false);

        if (value.type === 'Value' && value.children.isEmpty) {
            for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) {
                if (this.lookupType(offset) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace) {
                    value.children.appendData({
                        type: 'WhiteSpace',
                        loc: null,
                        value: ' '
                    });
                    break;
                }
            }
        }

        children.push(value);
    }

    return children;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/index.js":
/*!*******************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create.js */ "../../node_modules/css-tree/lib/syntax/create.js");
/* harmony import */ var _config_lexer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/lexer.js */ "../../node_modules/css-tree/lib/syntax/config/lexer.js");
/* harmony import */ var _config_parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/parser.js */ "../../node_modules/css-tree/lib/syntax/config/parser.js");
/* harmony import */ var _config_walker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/walker.js */ "../../node_modules/css-tree/lib/syntax/config/walker.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_create_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ..._config_lexer_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    ..._config_parser_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    ..._config_walker_js__WEBPACK_IMPORTED_MODULE_3__["default"]
}));


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/AnPlusB.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/AnPlusB.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
const N = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
const DISALLOW_SIGN = true;
const ALLOW_SIGN = false;

function checkInteger(offset, disallowSign) {
    let pos = this.tokenStart + offset;
    const code = this.charCodeAt(pos);

    if (code === PLUSSIGN || code === HYPHENMINUS) {
        if (disallowSign) {
            this.error('Number sign is not allowed');
        }
        pos++;
    }

    for (; pos < this.tokenEnd; pos++) {
        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(this.charCodeAt(pos))) {
            this.error('Integer is expected', pos);
        }
    }
}

function checkTokenIsInteger(disallowSign) {
    return checkInteger.call(this, 0, disallowSign);
}

function expectCharCode(offset, code) {
    if (!this.cmpChar(this.tokenStart + offset, code)) {
        let msg = '';

        switch (code) {
            case N:
                msg = 'N is expected';
                break;
            case HYPHENMINUS:
                msg = 'HyphenMinus is expected';
                break;
        }

        this.error(msg, this.tokenStart + offset);
    }
}

// ... <signed-integer>
// ... ['+' | '-'] <signless-integer>
function consumeB() {
    let offset = 0;
    let sign = 0;
    let type = this.tokenType;

    while (type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace || type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment) {
        type = this.lookupType(++offset);
    }

    if (type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
        if (this.isDelim(PLUSSIGN, offset) ||
            this.isDelim(HYPHENMINUS, offset)) {
            sign = this.isDelim(PLUSSIGN, offset) ? PLUSSIGN : HYPHENMINUS;

            do {
                type = this.lookupType(++offset);
            } while (type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace || type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment);

            if (type !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
                this.skip(offset);
                checkTokenIsInteger.call(this, DISALLOW_SIGN);
            }
        } else {
            return null;
        }
    }

    if (offset > 0) {
        this.skip(offset);
    }

    if (sign === 0) {
        type = this.charCodeAt(this.tokenStart);
        if (type !== PLUSSIGN && type !== HYPHENMINUS) {
            this.error('Number sign is expected');
        }
    }

    checkTokenIsInteger.call(this, sign !== 0);
    return sign === HYPHENMINUS ? '-' + this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) : this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number);
}

// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
const name = 'AnPlusB';
const structure = {
    a: [String, null],
    b: [String, null]
};

function parse() {
    /* eslint-disable brace-style*/
    const start = this.tokenStart;
    let a = null;
    let b = null;

    // <integer>
    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
        checkTokenIsInteger.call(this, ALLOW_SIGN);
        b = this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number);
    }

    // -n
    // -n <signed-integer>
    // -n ['+' | '-'] <signless-integer>
    // -n- <signless-integer>
    // <dashndashdigit-ident>
    else if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident && this.cmpChar(this.tokenStart, HYPHENMINUS)) {
        a = '-1';

        expectCharCode.call(this, 1, N);

        switch (this.tokenEnd - this.tokenStart) {
            // -n
            // -n <signed-integer>
            // -n ['+' | '-'] <signless-integer>
            case 2:
                this.next();
                b = consumeB.call(this);
                break;

            // -n- <signless-integer>
            case 3:
                expectCharCode.call(this, 2, HYPHENMINUS);

                this.next();
                this.skipSC();

                checkTokenIsInteger.call(this, DISALLOW_SIGN);

                b = '-' + this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number);
                break;

            // <dashndashdigit-ident>
            default:
                expectCharCode.call(this, 2, HYPHENMINUS);
                checkInteger.call(this, 3, DISALLOW_SIGN);
                this.next();

                b = this.substrToCursor(start + 2);
        }
    }

    // '+'? n
    // '+'? n <signed-integer>
    // '+'? n ['+' | '-'] <signless-integer>
    // '+'? n- <signless-integer>
    // '+'? <ndashdigit-ident>
    else if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident || (this.isDelim(PLUSSIGN) && this.lookupType(1) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident)) {
        let sign = 0;
        a = '1';

        // just ignore a plus
        if (this.isDelim(PLUSSIGN)) {
            sign = 1;
            this.next();
        }

        expectCharCode.call(this, 0, N);

        switch (this.tokenEnd - this.tokenStart) {
            // '+'? n
            // '+'? n <signed-integer>
            // '+'? n ['+' | '-'] <signless-integer>
            case 1:
                this.next();
                b = consumeB.call(this);
                break;

            // '+'? n- <signless-integer>
            case 2:
                expectCharCode.call(this, 1, HYPHENMINUS);

                this.next();
                this.skipSC();

                checkTokenIsInteger.call(this, DISALLOW_SIGN);

                b = '-' + this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number);
                break;

            // '+'? <ndashdigit-ident>
            default:
                expectCharCode.call(this, 1, HYPHENMINUS);
                checkInteger.call(this, 2, DISALLOW_SIGN);
                this.next();

                b = this.substrToCursor(start + sign + 1);
        }
    }

    // <ndashdigit-dimension>
    // <ndash-dimension> <signless-integer>
    // <n-dimension>
    // <n-dimension> <signed-integer>
    // <n-dimension> ['+' | '-'] <signless-integer>
    else if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension) {
        const code = this.charCodeAt(this.tokenStart);
        const sign = code === PLUSSIGN || code === HYPHENMINUS;
        let i = this.tokenStart + sign;

        for (; i < this.tokenEnd; i++) {
            if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(this.charCodeAt(i))) {
                break;
            }
        }

        if (i === this.tokenStart + sign) {
            this.error('Integer is expected', this.tokenStart + sign);
        }

        expectCharCode.call(this, i - this.tokenStart, N);
        a = this.substring(start, i);

        // <n-dimension>
        // <n-dimension> <signed-integer>
        // <n-dimension> ['+' | '-'] <signless-integer>
        if (i + 1 === this.tokenEnd) {
            this.next();
            b = consumeB.call(this);
        } else {
            expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS);

            // <ndash-dimension> <signless-integer>
            if (i + 2 === this.tokenEnd) {
                this.next();
                this.skipSC();
                checkTokenIsInteger.call(this, DISALLOW_SIGN);
                b = '-' + this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number);
            }
            // <ndashdigit-dimension>
            else {
                checkInteger.call(this, i - this.tokenStart + 2, DISALLOW_SIGN);
                this.next();
                b = this.substrToCursor(i + 1);
            }
        }
    } else {
        this.error();
    }

    if (a !== null && a.charCodeAt(0) === PLUSSIGN) {
        a = a.substr(1);
    }

    if (b !== null && b.charCodeAt(0) === PLUSSIGN) {
        b = b.substr(1);
    }

    return {
        type: 'AnPlusB',
        loc: this.getLocation(start, this.tokenStart),
        a,
        b
    };
}

function generate(node) {
    if (node.a) {
        const a =
            node.a === '+1' && 'n' ||
            node.a ===  '1' && 'n' ||
            node.a === '-1' && '-n' ||
            node.a + 'n';

        if (node.b) {
            const b = node.b[0] === '-' || node.b[0] === '+'
                ? node.b
                : '+' + node.b;
            this.tokenize(a + b);
        } else {
            this.tokenize(a);
        }
    } else {
        this.tokenize(node.b);
    }
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Atrule.js":
/*!*************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Atrule.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


function consumeRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilLeftCurlyBracketOrSemicolon, true);
}

function isDeclarationBlockAtrule() {
    for (let offset = 1, type; type = this.lookupType(offset); offset++) {
        if (type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightCurlyBracket) {
            return true;
        }

        if (type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket ||
            type === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword) {
            return false;
        }
    }

    return false;
}


const name = 'Atrule';
const walkContext = 'atrule';
const structure = {
    name: String,
    prelude: ['AtrulePrelude', 'Raw', null],
    block: ['Block', null]
};

function parse() {
    const start = this.tokenStart;
    let name;
    let nameLowerCase;
    let prelude = null;
    let block = null;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword);

    name = this.substrToCursor(start + 1);
    nameLowerCase = name.toLowerCase();
    this.skipSC();

    // parse prelude
    if (this.eof === false &&
        this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket &&
        this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon) {
        if (this.parseAtrulePrelude) {
            prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name), consumeRaw);
        } else {
            prelude = consumeRaw.call(this, this.tokenIndex);
        }

        this.skipSC();
    }

    switch (this.tokenType) {
        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon:
            this.next();
            break;

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket:
            if (hasOwnProperty.call(this.atrule, nameLowerCase) &&
                typeof this.atrule[nameLowerCase].block === 'function') {
                block = this.atrule[nameLowerCase].block.call(this);
            } else {
                // TODO: should consume block content as Raw?
                block = this.Block(isDeclarationBlockAtrule.call(this));
            }

            break;
    }

    return {
        type: 'Atrule',
        loc: this.getLocation(start, this.tokenStart),
        name,
        prelude,
        block
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword, '@' + node.name);

    if (node.prelude !== null) {
        this.node(node.prelude);
    }

    if (node.block) {
        this.node(node.block);
    } else {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon, ';');
    }
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/AtrulePrelude.js":
/*!********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/AtrulePrelude.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'AtrulePrelude';
const walkContext = 'atrulePrelude';
const structure = {
    children: [[]]
};

function parse(name) {
    let children = null;

    if (name !== null) {
        name = name.toLowerCase();
    }

    this.skipSC();

    if (hasOwnProperty.call(this.atrule, name) &&
        typeof this.atrule[name].prelude === 'function') {
        // custom consumer
        children = this.atrule[name].prelude.call(this);
    } else {
        // default consumer
        children = this.readSequence(this.scope.AtrulePrelude);
    }

    this.skipSC();

    if (this.eof !== true &&
        this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket &&
        this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon) {
        this.error('Semicolon or block is expected');
    }

    return {
        type: 'AtrulePrelude',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/AttributeSelector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/AttributeSelector.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const DOLLARSIGN = 0x0024;       // U+0024 DOLLAR SIGN ($)
const ASTERISK = 0x002A;         // U+002A ASTERISK (*)
const EQUALSSIGN = 0x003D;       // U+003D EQUALS SIGN (=)
const CIRCUMFLEXACCENT = 0x005E; // U+005E (^)
const VERTICALLINE = 0x007C;     // U+007C VERTICAL LINE (|)
const TILDE = 0x007E;            // U+007E TILDE (~)

function getAttributeName() {
    if (this.eof) {
        this.error('Unexpected end of input');
    }

    const start = this.tokenStart;
    let expectIdent = false;

    if (this.isDelim(ASTERISK)) {
        expectIdent = true;
        this.next();
    } else if (!this.isDelim(VERTICALLINE)) {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident);
    }

    if (this.isDelim(VERTICALLINE)) {
        if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN) {
            this.next();
            this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident);
        } else if (expectIdent) {
            this.error('Identifier is expected', this.tokenEnd);
        }
    } else if (expectIdent) {
        this.error('Vertical line is expected');
    }

    return {
        type: 'Identifier',
        loc: this.getLocation(start, this.tokenStart),
        name: this.substrToCursor(start)
    };
}

function getOperator() {
    const start = this.tokenStart;
    const code = this.charCodeAt(start);

    if (code !== EQUALSSIGN &&        // =
        code !== TILDE &&             // ~=
        code !== CIRCUMFLEXACCENT &&  // ^=
        code !== DOLLARSIGN &&        // $=
        code !== ASTERISK &&          // *=
        code !== VERTICALLINE         // |=
    ) {
        this.error('Attribute selector (=, ~=, ^=, $=, *=, |=) is expected');
    }

    this.next();

    if (code !== EQUALSSIGN) {
        if (!this.isDelim(EQUALSSIGN)) {
            this.error('Equal sign is expected');
        }

        this.next();
    }

    return this.substrToCursor(start);
}

// '[' <wq-name> ']'
// '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'
const name = 'AttributeSelector';
const structure = {
    name: 'Identifier',
    matcher: [String, null],
    value: ['String', 'Identifier', null],
    flags: [String, null]
};

function parse() {
    const start = this.tokenStart;
    let name;
    let matcher = null;
    let value = null;
    let flags = null;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftSquareBracket);
    this.skipSC();

    name = getAttributeName.call(this);
    this.skipSC();

    if (this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightSquareBracket) {
        // avoid case `[name i]`
        if (this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident) {
            matcher = getOperator.call(this);

            this.skipSC();

            value = this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.String
                ? this.String()
                : this.Identifier();

            this.skipSC();
        }

        // attribute flags
        if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident) {
            flags = this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident);

            this.skipSC();
        }
    }

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightSquareBracket);

    return {
        type: 'AttributeSelector',
        loc: this.getLocation(start, this.tokenStart),
        name,
        matcher,
        value,
        flags
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim, '[');
    this.node(node.name);

    if (node.matcher !== null) {
        this.tokenize(node.matcher);
        this.node(node.value);
    }

    if (node.flags !== null) {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, node.flags);
    }

    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim, ']');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Block.js":
/*!************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Block.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


function consumeRaw(startToken) {
    return this.Raw(startToken, null, true);
}
function consumeRule() {
    return this.parseWithFallback(this.Rule, consumeRaw);
}
function consumeRawDeclaration(startToken) {
    return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true);
}
function consumeDeclaration() {
    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon) {
        return consumeRawDeclaration.call(this, this.tokenIndex);
    }

    const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);

    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon) {
        this.next();
    }

    return node;
}

const name = 'Block';
const walkContext = 'block';
const structure = {
    children: [[
        'Atrule',
        'Rule',
        'Declaration'
    ]]
};

function parse(isDeclaration) {
    const consumer = isDeclaration ? consumeDeclaration : consumeRule;
    const start = this.tokenStart;
    let children = this.createList();

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket);

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightCurlyBracket:
                break scan;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment:
                this.next();
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword:
                children.push(this.parseWithFallback(this.Atrule, consumeRaw));
                break;

            default:
                children.push(consumer.call(this));
        }
    }

    if (!this.eof) {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightCurlyBracket);
    }

    return {
        type: 'Block',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket, '{');
    this.children(node, prev => {
        if (prev.type === 'Declaration') {
            this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon, ';');
        }
    });
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightCurlyBracket, '}');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Brackets.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Brackets.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'Brackets';
const structure = {
    children: [[]]
};

function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    let children = null;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftSquareBracket);

    children = readSequence.call(this, recognizer);

    if (!this.eof) {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightSquareBracket);
    }

    return {
        type: 'Brackets',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim, '[');
    this.children(node);
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim, ']');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/CDC.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/CDC.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'CDC';
const structure = [];

function parse() {
    const start = this.tokenStart;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC); // -->

    return {
        type: 'CDC',
        loc: this.getLocation(start, this.tokenStart)
    };
}

function generate() {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC, '-->');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/CDO.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/CDO.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'CDO';
const structure = [];

function parse() {
    const start = this.tokenStart;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDO); // <!--

    return {
        type: 'CDO',
        loc: this.getLocation(start, this.tokenStart)
    };
}

function generate() {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDO, '<!--');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/ClassSelector.js":
/*!********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/ClassSelector.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const FULLSTOP = 0x002E; // U+002E FULL STOP (.)

// '.' ident
const name = 'ClassSelector';
const structure = {
    name: String
};

function parse() {
    this.eatDelim(FULLSTOP);

    return {
        type: 'ClassSelector',
        loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
        name: this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident)
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim, '.');
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, node.name);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Combinator.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Combinator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)
const GREATERTHANSIGN = 0x003E; // U+003E GREATER-THAN SIGN (>)
const TILDE = 0x007E;           // U+007E TILDE (~)

const name = 'Combinator';
const structure = {
    name: String
};

// + | > | ~ | /deep/
function parse() {
    const start = this.tokenStart;
    let name;

    switch (this.tokenType) {
        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace:
            name = ' ';
            break;

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim:
            switch (this.charCodeAt(this.tokenStart)) {
                case GREATERTHANSIGN:
                case PLUSSIGN:
                case TILDE:
                    this.next();
                    break;

                case SOLIDUS:
                    this.next();
                    this.eatIdent('deep');
                    this.eatDelim(SOLIDUS);
                    break;

                default:
                    this.error('Combinator is expected');
            }

            name = this.substrToCursor(start);
            break;
    }

    return {
        type: 'Combinator',
        loc: this.getLocation(start, this.tokenStart),
        name
    };
}

function generate(node) {
    this.tokenize(node.name);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Comment.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Comment.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const ASTERISK = 0x002A;        // U+002A ASTERISK (*)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)


const name = 'Comment';
const structure = {
    value: String
};

function parse() {
    const start = this.tokenStart;
    let end = this.tokenEnd;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment);

    if ((end - start + 2) >= 2 &&
        this.charCodeAt(end - 2) === ASTERISK &&
        this.charCodeAt(end - 1) === SOLIDUS) {
        end -= 2;
    }

    return {
        type: 'Comment',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substring(start + 2, end)
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment, '/*' + node.value + '*/');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Declaration.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Declaration.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _utils_names_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/names.js */ "../../node_modules/css-tree/lib/utils/names.js");
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");



const EXCLAMATIONMARK = 0x0021; // U+0021 EXCLAMATION MARK (!)
const NUMBERSIGN = 0x0023;      // U+0023 NUMBER SIGN (#)
const DOLLARSIGN = 0x0024;      // U+0024 DOLLAR SIGN ($)
const AMPERSAND = 0x0026;       // U+0026 AMPERSAND (&)
const ASTERISK = 0x002A;        // U+002A ASTERISK (*)
const PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)

function consumeValueRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilExclamationMarkOrSemicolon, true);
}

function consumeCustomPropertyRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilExclamationMarkOrSemicolon, false);
}

function consumeValue() {
    const startValueToken = this.tokenIndex;
    const value = this.Value();

    if (value.type !== 'Raw' &&
        this.eof === false &&
        this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Semicolon &&
        this.isDelim(EXCLAMATIONMARK) === false &&
        this.isBalanceEdge(startValueToken) === false) {
        this.error();
    }

    return value;
}

const name = 'Declaration';
const walkContext = 'declaration';
const structure = {
    important: [Boolean, String],
    property: String,
    value: ['Value', 'Raw']
};

function parse() {
    const start = this.tokenStart;
    const startToken = this.tokenIndex;
    const property = readProperty.call(this);
    const customProperty = (0,_utils_names_js__WEBPACK_IMPORTED_MODULE_0__.isCustomProperty)(property);
    const parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
    const consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
    let important = false;
    let value;

    this.skipSC();
    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Colon);

    const valueStart = this.tokenIndex;

    if (!customProperty) {
        this.skipSC();
    }

    if (parseValue) {
        value = this.parseWithFallback(consumeValue, consumeRaw);
    } else {
        value = consumeRaw.call(this, this.tokenIndex);
    }

    if (customProperty && value.type === 'Value' && value.children.isEmpty) {
        for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) {
            if (this.lookupType(offset) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.WhiteSpace) {
                value.children.appendData({
                    type: 'WhiteSpace',
                    loc: null,
                    value: ' '
                });
                break;
            }
        }
    }

    if (this.isDelim(EXCLAMATIONMARK)) {
        important = getImportant.call(this);
        this.skipSC();
    }

    // Do not include semicolon to range per spec
    // https://drafts.csswg.org/css-syntax/#declaration-diagram

    if (this.eof === false &&
        this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Semicolon &&
        this.isBalanceEdge(startToken) === false) {
        this.error();
    }

    return {
        type: 'Declaration',
        loc: this.getLocation(start, this.tokenStart),
        important,
        property,
        value
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Ident, node.property);
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Colon, ':');
    this.node(node.value);

    if (node.important) {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Delim, '!');
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Ident, node.important === true ? 'important' : node.important);
    }
}

function readProperty() {
    const start = this.tokenStart;

    // hacks
    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Delim) {
        switch (this.charCodeAt(this.tokenStart)) {
            case ASTERISK:
            case DOLLARSIGN:
            case PLUSSIGN:
            case NUMBERSIGN:
            case AMPERSAND:
                this.next();
                break;

            // TODO: not sure we should support this hack
            case SOLIDUS:
                this.next();
                if (this.isDelim(SOLIDUS)) {
                    this.next();
                }
                break;
        }
    }

    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Hash) {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Hash);
    } else {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Ident);
    }

    return this.substrToCursor(start);
}

// ! ws* important
function getImportant() {
    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Delim);
    this.skipSC();

    const important = this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_1__.Ident);

    // store original value in case it differ from `important`
    // for better original source restoring and hacks like `!ie` support
    return important === 'important' ? true : important;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/DeclarationList.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/DeclarationList.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


function consumeRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true);
}

const name = 'DeclarationList';
const structure = {
    children: [[
        'Declaration'
    ]]
};

function parse() {
    const children = this.createList();

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon:
                this.next();
                break;

            default:
                children.push(this.parseWithFallback(this.Declaration, consumeRaw));
        }
    }

    return {
        type: 'DeclarationList',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node, prev => {
        if (prev.type === 'Declaration') {
            this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon, ';');
        }
    });
}



/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Dimension.js":
/*!****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Dimension.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'Dimension';
const structure = {
    value: String,
    unit: String
};

function parse() {
    const start = this.tokenStart;
    const value = this.consumeNumber(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension);

    return {
        type: 'Dimension',
        loc: this.getLocation(start, this.tokenStart),
        value,
        unit: this.substring(start + value.length, this.tokenStart)
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension, node.value + node.unit);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Function.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Function.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");



const name = 'Function';
const walkContext = 'function';
const structure = {
    name: String,
    children: [[]]
};

// <function-token> <sequence> )
function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    const name = this.consumeFunctionName();
    const nameLowerCase = name.toLowerCase();
    let children;

    children = recognizer.hasOwnProperty(nameLowerCase)
        ? recognizer[nameLowerCase].call(this, recognizer)
        : readSequence.call(this, recognizer);

    if (!this.eof) {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis);
    }

    return {
        type: 'Function',
        loc: this.getLocation(start, this.tokenStart),
        name,
        children
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function, node.name + '(');
    this.children(node);
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, ')');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Hash.js":
/*!***********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Hash.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "xxx": () => (/* binding */ xxx)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


// '#' ident
const xxx = 'XXX';
const name = 'Hash';
const structure = {
    value: String
};
function parse() {
    const start = this.tokenStart;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash);

    return {
        type: 'Hash',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substrToCursor(start + 1)
    };
}
function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash, '#' + node.value);
}



/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/IdSelector.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/IdSelector.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'IdSelector';
const structure = {
    name: String
};

function parse() {
    const start = this.tokenStart;

    // TODO: check value is an ident
    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash);

    return {
        type: 'IdSelector',
        loc: this.getLocation(start, this.tokenStart),
        name: this.substrToCursor(start + 1)
    };
}

function generate(node) {
    // Using Delim instead of Hash is a hack to avoid for a whitespace between ident and id-selector
    // in safe mode (e.g. "a#id"), because IE11 doesn't allow a sequence <ident-token> <hash-token>
    // without a whitespace in values (e.g. "1px solid#000")
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim, '#' + node.name);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Identifier.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Identifier.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'Identifier';
const structure = {
    name: String
};

function parse() {
    return {
        type: 'Identifier',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        name: this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident)
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, node.name);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/MediaFeature.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/MediaFeature.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'MediaFeature';
const structure = {
    name: String,
    value: ['Identifier', 'Number', 'Dimension', 'Ratio', null]
};

function parse() {
    const start = this.tokenStart;
    let name;
    let value = null;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis);
    this.skipSC();

    name = this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident);
    this.skipSC();

    if (this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis) {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon);
        this.skipSC();

        switch (this.tokenType) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number:
                if (this.lookupNonWSType(1) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim) {
                    value = this.Ratio();
                } else {
                    value = this.Number();
                }

                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension:
                value = this.Dimension();
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident:
                value = this.Identifier();
                break;

            default:
                this.error('Number, dimension, ratio or identifier is expected');
        }

        this.skipSC();
    }

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis);

    return {
        type: 'MediaFeature',
        loc: this.getLocation(start, this.tokenStart),
        name,
        value
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis, '(');
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, node.name);

    if (node.value !== null) {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon, ':');
        this.node(node.value);
    }

    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, ')');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/MediaQuery.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/MediaQuery.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'MediaQuery';
const structure = {
    children: [[
        'Identifier',
        'MediaFeature',
        'WhiteSpace'
    ]]
};

function parse() {
    const children = this.createList();
    let child = null;

    this.skipSC();

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment:
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace:
                this.next();
                continue;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident:
                child = this.Identifier();
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis:
                child = this.MediaFeature();
                break;

            default:
                break scan;
        }

        children.push(child);
    }

    if (child === null) {
        this.error('Identifier or parenthesis is expected');
    }

    return {
        type: 'MediaQuery',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node);
}



/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/MediaQueryList.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/MediaQueryList.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'MediaQueryList';
const structure = {
    children: [[
        'MediaQuery'
    ]]
};

function parse() {
    const children = this.createList();

    this.skipSC();

    while (!this.eof) {
        children.push(this.MediaQuery());

        if (this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comma) {
            break;
        }

        this.next();
    }

    return {
        type: 'MediaQueryList',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node, () => this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comma, ','));
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Nth.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Nth.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'Nth';
const structure = {
    nth: ['AnPlusB', 'Identifier'],
    selector: ['SelectorList', null]
};

function parse() {
    this.skipSC();

    const start = this.tokenStart;
    let end = start;
    let selector = null;
    let nth;

    if (this.lookupValue(0, 'odd') || this.lookupValue(0, 'even')) {
        nth = this.Identifier();
    } else {
        nth = this.AnPlusB();
    }

    end = this.tokenStart;
    this.skipSC();

    if (this.lookupValue(0, 'of')) {
        this.next();

        selector = this.SelectorList();
        end = this.tokenStart;
    }

    return {
        type: 'Nth',
        loc: this.getLocation(start, end),
        nth,
        selector
    };
}

function generate(node) {
    this.node(node.nth);
    if (node.selector !== null) {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, 'of');
        this.node(node.selector);
    }
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Number.js":
/*!*************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Number.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'Number';
const structure = {
    value: String
};

function parse() {
    return {
        type: 'Number',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        value: this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number)
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, node.value);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Operator.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Operator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
// '/' | '*' | ',' | ':' | '+' | '-'
const name = 'Operator';
const structure = {
    value: String
};

function parse() {
    const start = this.tokenStart;

    this.next();

    return {
        type: 'Operator',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substrToCursor(start)
    };
}

function generate(node) {
    this.tokenize(node.value);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Parentheses.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Parentheses.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'Parentheses';
const structure = {
    children: [[]]
};

function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    let children = null;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis);

    children = readSequence.call(this, recognizer);

    if (!this.eof) {
        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis);
    }

    return {
        type: 'Parentheses',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis, '(');
    this.children(node);
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, ')');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Percentage.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Percentage.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'Percentage';
const structure = {
    value: String
};

function parse() {
    return {
        type: 'Percentage',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        value: this.consumeNumber(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage)
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage, node.value + '%');
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");



const name = 'PseudoClassSelector';
const walkContext = 'function';
const structure = {
    name: String,
    children: [['Raw'], null]
};

// : [ <ident> | <function-token> <any-value>? ) ]
function parse() {
    const start = this.tokenStart;
    let children = null;
    let name;
    let nameLowerCase;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon);

    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function) {
        name = this.consumeFunctionName();
        nameLowerCase = name.toLowerCase();

        if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
            this.skipSC();
            children = this.pseudo[nameLowerCase].call(this);
            this.skipSC();
        } else {
            children = this.createList();
            children.push(
                this.Raw(this.tokenIndex, null, false)
            );
        }

        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis);
    } else {
        name = this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident);
    }

    return {
        type: 'PseudoClassSelector',
        loc: this.getLocation(start, this.tokenStart),
        name,
        children
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon, ':');

    if (node.children === null) {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, node.name);
    } else {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function, node.name + '(');
        this.children(node);
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, ')');
    }
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'PseudoElementSelector';
const walkContext = 'function';
const structure = {
    name: String,
    children: [['Raw'], null]
};

// :: [ <ident> | <function-token> <any-value>? ) ]
function parse() {
    const start = this.tokenStart;
    let children = null;
    let name;
    let nameLowerCase;

    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon);
    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon);

    if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function) {
        name = this.consumeFunctionName();
        nameLowerCase = name.toLowerCase();

        if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
            this.skipSC();
            children = this.pseudo[nameLowerCase].call(this);
            this.skipSC();
        } else {
            children = this.createList();
            children.push(
                this.Raw(this.tokenIndex, null, false)
            );
        }

        this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis);
    } else {
        name = this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident);
    }

    return {
        type: 'PseudoElementSelector',
        loc: this.getLocation(start, this.tokenStart),
        name,
        children
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon, ':');
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon, ':');

    if (node.children === null) {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident, node.name);
    } else {
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function, node.name + '(');
        this.children(node);
        this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis, ')');
    }
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Ratio.js":
/*!************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Ratio.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const SOLIDUS = 0x002F;  // U+002F SOLIDUS (/)
const FULLSTOP = 0x002E; // U+002E FULL STOP (.)

// Terms of <ratio> should be a positive numbers (not zero or negative)
// (see https://drafts.csswg.org/mediaqueries-3/#values)
// However, -o-min-device-pixel-ratio takes fractional values as a ratio's term
// and this is using by various sites. Therefore we relax checking on parse
// to test a term is unsigned number without an exponent part.
// Additional checking may be applied on lexer validation.
function consumeNumber() {
    this.skipSC();

    const value = this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number);

    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);
        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(code) && code !== FULLSTOP) {
            this.error('Unsigned number is expected', this.tokenStart - value.length + i);
        }
    }

    if (Number(value) === 0) {
        this.error('Zero number is not allowed', this.tokenStart - value.length);
    }

    return value;
}

const name = 'Ratio';
const structure = {
    left: String,
    right: String
};

// <positive-integer> S* '/' S* <positive-integer>
function parse() {
    const start = this.tokenStart;
    const left = consumeNumber.call(this);
    let right;

    this.skipSC();
    this.eatDelim(SOLIDUS);
    right = consumeNumber.call(this);

    return {
        type: 'Ratio',
        loc: this.getLocation(start, this.tokenStart),
        left,
        right
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, node.left);
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim, '/');
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number, node.right);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Raw.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Raw.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


function getOffsetExcludeWS() {
    if (this.tokenIndex > 0) {
        if (this.lookupType(-1) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace) {
            return this.tokenIndex > 1
                ? this.getTokenStart(this.tokenIndex - 1)
                : this.firstCharOffset;
        }
    }

    return this.tokenStart;
}

const name = 'Raw';
const structure = {
    value: String
};

function parse(startToken, consumeUntil, excludeWhiteSpace) {
    const startOffset = this.getTokenStart(startToken);
    let endOffset;

    this.skipUntilBalanced(startToken, consumeUntil || this.consumeUntilBalanceEnd);

    if (excludeWhiteSpace && this.tokenStart > startOffset) {
        endOffset = getOffsetExcludeWS.call(this);
    } else {
        endOffset = this.tokenStart;
    }

    return {
        type: 'Raw',
        loc: this.getLocation(startOffset, endOffset),
        value: this.substring(startOffset, endOffset)
    };
}

function generate(node) {
    this.tokenize(node.value);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Rule.js":
/*!***********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Rule.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


function consumeRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilLeftCurlyBracket, true);
}

function consumePrelude() {
    const prelude = this.SelectorList();

    if (prelude.type !== 'Raw' &&
        this.eof === false &&
        this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket) {
        this.error();
    }

    return prelude;
}

const name = 'Rule';
const walkContext = 'rule';
const structure = {
    prelude: ['SelectorList', 'Raw'],
    block: ['Block']
};

function parse() {
    const startToken = this.tokenIndex;
    const startOffset = this.tokenStart;
    let prelude;
    let block;

    if (this.parseRulePrelude) {
        prelude = this.parseWithFallback(consumePrelude, consumeRaw);
    } else {
        prelude = consumeRaw.call(this, startToken);
    }

    block = this.Block(true);

    return {
        type: 'Rule',
        loc: this.getLocation(startOffset, this.tokenStart),
        prelude,
        block
    };
}
function generate(node) {
    this.node(node.prelude);
    this.node(node.block);
}



/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Selector.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Selector.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
const name = 'Selector';
const structure = {
    children: [[
        'TypeSelector',
        'IdSelector',
        'ClassSelector',
        'AttributeSelector',
        'PseudoClassSelector',
        'PseudoElementSelector',
        'Combinator',
        'WhiteSpace'
    ]]
};

function parse() {
    const children = this.readSequence(this.scope.Selector);

    // nothing were consumed
    if (this.getFirstListNode(children) === null) {
        this.error('Selector is expected');
    }

    return {
        type: 'Selector',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/SelectorList.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/SelectorList.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const name = 'SelectorList';
const walkContext = 'selector';
const structure = {
    children: [[
        'Selector',
        'Raw'
    ]]
};

function parse() {
    const children = this.createList();

    while (!this.eof) {
        children.push(this.Selector());

        if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comma) {
            this.next();
            continue;
        }

        break;
    }

    return {
        type: 'SelectorList',
        loc: this.getLocationFromList(children),
        children
    };
}

function generate(node) {
    this.children(node, () => this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comma, ','));
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/String.js":
/*!*************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/String.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");
/* harmony import */ var _utils_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/string.js */ "../../node_modules/css-tree/lib/utils/string.js");



const name = 'String';
const structure = {
    value: String
};

function parse() {
    return {
        type: 'String',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        value: (0,_utils_string_js__WEBPACK_IMPORTED_MODULE_1__.decode)(this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.String))
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.String, (0,_utils_string_js__WEBPACK_IMPORTED_MODULE_1__.encode)(node.value));
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/StyleSheet.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/StyleSheet.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure),
/* harmony export */   "walkContext": () => (/* binding */ walkContext)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const EXCLAMATIONMARK = 0x0021; // U+0021 EXCLAMATION MARK (!)

function consumeRaw(startToken) {
    return this.Raw(startToken, null, false);
}

const name = 'StyleSheet';
const walkContext = 'stylesheet';
const structure = {
    children: [[
        'Comment',
        'CDO',
        'CDC',
        'Atrule',
        'Rule',
        'Raw'
    ]]
};

function parse() {
    const start = this.tokenStart;
    const children = this.createList();
    let child;

    scan:
    while (!this.eof) {
        switch (this.tokenType) {
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace:
                this.next();
                continue;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comment:
                // ignore comments except exclamation comments (i.e. /*! .. */) on top level
                if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK) {
                    this.next();
                    continue;
                }

                child = this.Comment();
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDO: // <!--
                child = this.CDO();
                break;

            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.CDC: // -->
                child = this.CDC();
                break;

            // CSS Syntax Module Level 3
            // §2.2 Error handling
            // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
            case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword:
                child = this.parseWithFallback(this.Atrule, consumeRaw);
                break;

            // Anything else starts a qualified rule ...
            default:
                child = this.parseWithFallback(this.Rule, consumeRaw);
        }

        children.push(child);
    }

    return {
        type: 'StyleSheet',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.children(node);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/TypeSelector.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/TypeSelector.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const ASTERISK = 0x002A;     // U+002A ASTERISK (*)
const VERTICALLINE = 0x007C; // U+007C VERTICAL LINE (|)

function eatIdentifierOrAsterisk() {
    if (this.tokenType !== _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident &&
        this.isDelim(ASTERISK) === false) {
        this.error('Identifier or asterisk is expected');
    }

    this.next();
}

const name = 'TypeSelector';
const structure = {
    name: String
};

// ident
// ident|ident
// ident|*
// *
// *|ident
// *|*
// |ident
// |*
function parse() {
    const start = this.tokenStart;

    if (this.isDelim(VERTICALLINE)) {
        this.next();
        eatIdentifierOrAsterisk.call(this);
    } else {
        eatIdentifierOrAsterisk.call(this);

        if (this.isDelim(VERTICALLINE)) {
            this.next();
            eatIdentifierOrAsterisk.call(this);
        }
    }

    return {
        type: 'TypeSelector',
        loc: this.getLocation(start, this.tokenStart),
        name: this.substrToCursor(start)
    };
}

function generate(node) {
    this.tokenize(node.name);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/UnicodeRange.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/UnicodeRange.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const PLUSSIGN = 0x002B;     // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D;  // U+002D HYPHEN-MINUS (-)
const QUESTIONMARK = 0x003F; // U+003F QUESTION MARK (?)

function eatHexSequence(offset, allowDash) {
    let len = 0;

    for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
        const code = this.charCodeAt(pos);

        if (code === HYPHENMINUS && allowDash && len !== 0) {
            eatHexSequence.call(this, offset + len + 1, false);
            return -1;
        }

        if (!(0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isHexDigit)(code)) {
            this.error(
                allowDash && len !== 0
                    ? 'Hyphen minus' + (len < 6 ? ' or hex digit' : '') + ' is expected'
                    : (len < 6 ? 'Hex digit is expected' : 'Unexpected input'),
                pos
            );
        }

        if (++len > 6) {
            this.error('Too many hex digits', pos);
        };
    }

    this.next();
    return len;
}

function eatQuestionMarkSequence(max) {
    let count = 0;

    while (this.isDelim(QUESTIONMARK)) {
        if (++count > max) {
            this.error('Too many question marks');
        }

        this.next();
    }
}

function startsWith(code) {
    if (this.charCodeAt(this.tokenStart) !== code) {
        this.error((code === PLUSSIGN ? 'Plus sign' : 'Hyphen minus') + ' is expected');
    }
}

// https://drafts.csswg.org/css-syntax/#urange
// Informally, the <urange> production has three forms:
// U+0001
//      Defines a range consisting of a single code point, in this case the code point "1".
// U+0001-00ff
//      Defines a range of codepoints between the first and the second value, in this case
//      the range between "1" and "ff" (255 in decimal) inclusive.
// U+00??
//      Defines a range of codepoints where the "?" characters range over all hex digits,
//      in this case defining the same as the value U+0000-00ff.
// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
//
// <urange> =
//   u '+' <ident-token> '?'* |
//   u <dimension-token> '?'* |
//   u <number-token> '?'* |
//   u <number-token> <dimension-token> |
//   u <number-token> <number-token> |
//   u '+' '?'+
function scanUnicodeRange() {
    let hexLength = 0;

    switch (this.tokenType) {
        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number:
            // u <number-token> '?'*
            // u <number-token> <dimension-token>
            // u <number-token> <number-token>
            hexLength = eatHexSequence.call(this, 1, true);

            if (this.isDelim(QUESTIONMARK)) {
                eatQuestionMarkSequence.call(this, 6 - hexLength);
                break;
            }

            if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension ||
                this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number) {
                startsWith.call(this, HYPHENMINUS);
                eatHexSequence.call(this, 1, false);
                break;
            }

            break;

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension:
            // u <dimension-token> '?'*
            hexLength = eatHexSequence.call(this, 1, true);

            if (hexLength > 0) {
                eatQuestionMarkSequence.call(this, 6 - hexLength);
            }

            break;

        default:
            // u '+' <ident-token> '?'*
            // u '+' '?'+
            this.eatDelim(PLUSSIGN);

            if (this.tokenType === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident) {
                hexLength = eatHexSequence.call(this, 0, true);
                if (hexLength > 0) {
                    eatQuestionMarkSequence.call(this, 6 - hexLength);
                }
                break;
            }

            if (this.isDelim(QUESTIONMARK)) {
                this.next();
                eatQuestionMarkSequence.call(this, 5);
                break;
            }

            this.error('Hex digit or question mark is expected');
    }
}

const name = 'UnicodeRange';
const structure = {
    value: String
};

function parse() {
    const start = this.tokenStart;

    // U or u
    this.eatIdent('u');
    scanUnicodeRange.call(this);

    return {
        type: 'UnicodeRange',
        loc: this.getLocation(start, this.tokenStart),
        value: this.substrToCursor(start)
    };
}

function generate(node) {
    this.tokenize(node.value);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Url.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Url.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _utils_url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/url.js */ "../../node_modules/css-tree/lib/utils/url.js");
/* harmony import */ var _utils_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/string.js */ "../../node_modules/css-tree/lib/utils/string.js");
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");




const name = 'Url';
const structure = {
    value: String
};

// <url-token> | <function-token> <string> )
function parse() {
    const start = this.tokenStart;
    let value;

    switch (this.tokenType) {
        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Url:
            value = _utils_url_js__WEBPACK_IMPORTED_MODULE_0__.decode(this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Url));
            break;

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function:
            if (!this.cmpStr(this.tokenStart, this.tokenEnd, 'url(')) {
                this.error('Function name must be `url`');
            }

            this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Function);
            this.skipSC();
            value = _utils_string_js__WEBPACK_IMPORTED_MODULE_1__.decode(this.consume(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.String));
            this.skipSC();
            if (!this.eof) {
                this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.RightParenthesis);
            }
            break;

        default:
            this.error('Url or Function is expected');
    }

    return {
        type: 'Url',
        loc: this.getLocation(start, this.tokenStart),
        value
    };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_2__.Url, _utils_url_js__WEBPACK_IMPORTED_MODULE_0__.encode(node.value));
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/Value.js":
/*!************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/Value.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
const name = 'Value';
const structure = {
    children: [[]]
};

function parse() {
    const start = this.tokenStart;
    const children = this.readSequence(this.scope.Value);

    return {
        type: 'Value',
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

function generate(node) {
    this.children(node);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/WhiteSpace.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/WhiteSpace.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "structure": () => (/* binding */ structure)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const SPACE = Object.freeze({
    type: 'WhiteSpace',
    loc: null,
    value: ' '
});

const name = 'WhiteSpace';
const structure = {
    value: String
};

function parse() {
    this.eat(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace);
    return SPACE;

    // return {
    //     type: 'WhiteSpace',
    //     loc: this.getLocation(this.tokenStart, this.tokenEnd),
    //     value: this.consume(WHITESPACE)
    // };
}

function generate(node) {
    this.token(_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace, node.value);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/node/index.js":
/*!************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/node/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnPlusB": () => (/* reexport module object */ _AnPlusB_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "Atrule": () => (/* reexport module object */ _Atrule_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "AtrulePrelude": () => (/* reexport module object */ _AtrulePrelude_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "AttributeSelector": () => (/* reexport module object */ _AttributeSelector_js__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "Block": () => (/* reexport module object */ _Block_js__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   "Brackets": () => (/* reexport module object */ _Brackets_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "CDC": () => (/* reexport module object */ _CDC_js__WEBPACK_IMPORTED_MODULE_6__),
/* harmony export */   "CDO": () => (/* reexport module object */ _CDO_js__WEBPACK_IMPORTED_MODULE_7__),
/* harmony export */   "ClassSelector": () => (/* reexport module object */ _ClassSelector_js__WEBPACK_IMPORTED_MODULE_8__),
/* harmony export */   "Combinator": () => (/* reexport module object */ _Combinator_js__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   "Comment": () => (/* reexport module object */ _Comment_js__WEBPACK_IMPORTED_MODULE_10__),
/* harmony export */   "Declaration": () => (/* reexport module object */ _Declaration_js__WEBPACK_IMPORTED_MODULE_11__),
/* harmony export */   "DeclarationList": () => (/* reexport module object */ _DeclarationList_js__WEBPACK_IMPORTED_MODULE_12__),
/* harmony export */   "Dimension": () => (/* reexport module object */ _Dimension_js__WEBPACK_IMPORTED_MODULE_13__),
/* harmony export */   "Function": () => (/* reexport module object */ _Function_js__WEBPACK_IMPORTED_MODULE_14__),
/* harmony export */   "Hash": () => (/* reexport module object */ _Hash_js__WEBPACK_IMPORTED_MODULE_15__),
/* harmony export */   "IdSelector": () => (/* reexport module object */ _IdSelector_js__WEBPACK_IMPORTED_MODULE_17__),
/* harmony export */   "Identifier": () => (/* reexport module object */ _Identifier_js__WEBPACK_IMPORTED_MODULE_16__),
/* harmony export */   "MediaFeature": () => (/* reexport module object */ _MediaFeature_js__WEBPACK_IMPORTED_MODULE_18__),
/* harmony export */   "MediaQuery": () => (/* reexport module object */ _MediaQuery_js__WEBPACK_IMPORTED_MODULE_19__),
/* harmony export */   "MediaQueryList": () => (/* reexport module object */ _MediaQueryList_js__WEBPACK_IMPORTED_MODULE_20__),
/* harmony export */   "Nth": () => (/* reexport module object */ _Nth_js__WEBPACK_IMPORTED_MODULE_21__),
/* harmony export */   "Number": () => (/* reexport module object */ _Number_js__WEBPACK_IMPORTED_MODULE_22__),
/* harmony export */   "Operator": () => (/* reexport module object */ _Operator_js__WEBPACK_IMPORTED_MODULE_23__),
/* harmony export */   "Parentheses": () => (/* reexport module object */ _Parentheses_js__WEBPACK_IMPORTED_MODULE_24__),
/* harmony export */   "Percentage": () => (/* reexport module object */ _Percentage_js__WEBPACK_IMPORTED_MODULE_25__),
/* harmony export */   "PseudoClassSelector": () => (/* reexport module object */ _PseudoClassSelector_js__WEBPACK_IMPORTED_MODULE_26__),
/* harmony export */   "PseudoElementSelector": () => (/* reexport module object */ _PseudoElementSelector_js__WEBPACK_IMPORTED_MODULE_27__),
/* harmony export */   "Ratio": () => (/* reexport module object */ _Ratio_js__WEBPACK_IMPORTED_MODULE_28__),
/* harmony export */   "Raw": () => (/* reexport module object */ _Raw_js__WEBPACK_IMPORTED_MODULE_29__),
/* harmony export */   "Rule": () => (/* reexport module object */ _Rule_js__WEBPACK_IMPORTED_MODULE_30__),
/* harmony export */   "Selector": () => (/* reexport module object */ _Selector_js__WEBPACK_IMPORTED_MODULE_31__),
/* harmony export */   "SelectorList": () => (/* reexport module object */ _SelectorList_js__WEBPACK_IMPORTED_MODULE_32__),
/* harmony export */   "String": () => (/* reexport module object */ _String_js__WEBPACK_IMPORTED_MODULE_33__),
/* harmony export */   "StyleSheet": () => (/* reexport module object */ _StyleSheet_js__WEBPACK_IMPORTED_MODULE_34__),
/* harmony export */   "TypeSelector": () => (/* reexport module object */ _TypeSelector_js__WEBPACK_IMPORTED_MODULE_35__),
/* harmony export */   "UnicodeRange": () => (/* reexport module object */ _UnicodeRange_js__WEBPACK_IMPORTED_MODULE_36__),
/* harmony export */   "Url": () => (/* reexport module object */ _Url_js__WEBPACK_IMPORTED_MODULE_37__),
/* harmony export */   "Value": () => (/* reexport module object */ _Value_js__WEBPACK_IMPORTED_MODULE_38__),
/* harmony export */   "WhiteSpace": () => (/* reexport module object */ _WhiteSpace_js__WEBPACK_IMPORTED_MODULE_39__)
/* harmony export */ });
/* harmony import */ var _AnPlusB_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnPlusB.js */ "../../node_modules/css-tree/lib/syntax/node/AnPlusB.js");
/* harmony import */ var _Atrule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Atrule.js */ "../../node_modules/css-tree/lib/syntax/node/Atrule.js");
/* harmony import */ var _AtrulePrelude_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AtrulePrelude.js */ "../../node_modules/css-tree/lib/syntax/node/AtrulePrelude.js");
/* harmony import */ var _AttributeSelector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AttributeSelector.js */ "../../node_modules/css-tree/lib/syntax/node/AttributeSelector.js");
/* harmony import */ var _Block_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Block.js */ "../../node_modules/css-tree/lib/syntax/node/Block.js");
/* harmony import */ var _Brackets_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Brackets.js */ "../../node_modules/css-tree/lib/syntax/node/Brackets.js");
/* harmony import */ var _CDC_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CDC.js */ "../../node_modules/css-tree/lib/syntax/node/CDC.js");
/* harmony import */ var _CDO_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CDO.js */ "../../node_modules/css-tree/lib/syntax/node/CDO.js");
/* harmony import */ var _ClassSelector_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ClassSelector.js */ "../../node_modules/css-tree/lib/syntax/node/ClassSelector.js");
/* harmony import */ var _Combinator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Combinator.js */ "../../node_modules/css-tree/lib/syntax/node/Combinator.js");
/* harmony import */ var _Comment_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Comment.js */ "../../node_modules/css-tree/lib/syntax/node/Comment.js");
/* harmony import */ var _Declaration_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Declaration.js */ "../../node_modules/css-tree/lib/syntax/node/Declaration.js");
/* harmony import */ var _DeclarationList_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DeclarationList.js */ "../../node_modules/css-tree/lib/syntax/node/DeclarationList.js");
/* harmony import */ var _Dimension_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Dimension.js */ "../../node_modules/css-tree/lib/syntax/node/Dimension.js");
/* harmony import */ var _Function_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Function.js */ "../../node_modules/css-tree/lib/syntax/node/Function.js");
/* harmony import */ var _Hash_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Hash.js */ "../../node_modules/css-tree/lib/syntax/node/Hash.js");
/* harmony import */ var _Identifier_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Identifier.js */ "../../node_modules/css-tree/lib/syntax/node/Identifier.js");
/* harmony import */ var _IdSelector_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./IdSelector.js */ "../../node_modules/css-tree/lib/syntax/node/IdSelector.js");
/* harmony import */ var _MediaFeature_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./MediaFeature.js */ "../../node_modules/css-tree/lib/syntax/node/MediaFeature.js");
/* harmony import */ var _MediaQuery_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./MediaQuery.js */ "../../node_modules/css-tree/lib/syntax/node/MediaQuery.js");
/* harmony import */ var _MediaQueryList_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./MediaQueryList.js */ "../../node_modules/css-tree/lib/syntax/node/MediaQueryList.js");
/* harmony import */ var _Nth_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Nth.js */ "../../node_modules/css-tree/lib/syntax/node/Nth.js");
/* harmony import */ var _Number_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Number.js */ "../../node_modules/css-tree/lib/syntax/node/Number.js");
/* harmony import */ var _Operator_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Operator.js */ "../../node_modules/css-tree/lib/syntax/node/Operator.js");
/* harmony import */ var _Parentheses_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Parentheses.js */ "../../node_modules/css-tree/lib/syntax/node/Parentheses.js");
/* harmony import */ var _Percentage_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Percentage.js */ "../../node_modules/css-tree/lib/syntax/node/Percentage.js");
/* harmony import */ var _PseudoClassSelector_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./PseudoClassSelector.js */ "../../node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js");
/* harmony import */ var _PseudoElementSelector_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./PseudoElementSelector.js */ "../../node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js");
/* harmony import */ var _Ratio_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Ratio.js */ "../../node_modules/css-tree/lib/syntax/node/Ratio.js");
/* harmony import */ var _Raw_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Raw.js */ "../../node_modules/css-tree/lib/syntax/node/Raw.js");
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Rule.js */ "../../node_modules/css-tree/lib/syntax/node/Rule.js");
/* harmony import */ var _Selector_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Selector.js */ "../../node_modules/css-tree/lib/syntax/node/Selector.js");
/* harmony import */ var _SelectorList_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./SelectorList.js */ "../../node_modules/css-tree/lib/syntax/node/SelectorList.js");
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./String.js */ "../../node_modules/css-tree/lib/syntax/node/String.js");
/* harmony import */ var _StyleSheet_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./StyleSheet.js */ "../../node_modules/css-tree/lib/syntax/node/StyleSheet.js");
/* harmony import */ var _TypeSelector_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./TypeSelector.js */ "../../node_modules/css-tree/lib/syntax/node/TypeSelector.js");
/* harmony import */ var _UnicodeRange_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./UnicodeRange.js */ "../../node_modules/css-tree/lib/syntax/node/UnicodeRange.js");
/* harmony import */ var _Url_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Url.js */ "../../node_modules/css-tree/lib/syntax/node/Url.js");
/* harmony import */ var _Value_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Value.js */ "../../node_modules/css-tree/lib/syntax/node/Value.js");
/* harmony import */ var _WhiteSpace_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./WhiteSpace.js */ "../../node_modules/css-tree/lib/syntax/node/WhiteSpace.js");










































/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/pseudo/index.js":
/*!**************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/pseudo/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const selectorList = {
    parse() {
        return this.createSingleNodeList(
            this.SelectorList()
        );
    }
};

const selector = {
    parse() {
        return this.createSingleNodeList(
            this.Selector()
        );
    }
};

const identList = {
    parse() {
        return this.createSingleNodeList(
            this.Identifier()
        );
    }
};

const nth = {
    parse() {
        return this.createSingleNodeList(
            this.Nth()
        );
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    'dir': identList,
    'has': selectorList,
    'lang': identList,
    'matches': selectorList,
    'not': selectorList,
    'nth-child': nth,
    'nth-last-child': nth,
    'nth-last-of-type': nth,
    'nth-of-type': nth,
    'slotted': selector
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/scope/atrulePrelude.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/scope/atrulePrelude.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default.js */ "../../node_modules/css-tree/lib/syntax/scope/default.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    getNode: _default_js__WEBPACK_IMPORTED_MODULE_0__["default"]
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/scope/default.js":
/*!***************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/scope/default.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultRecognizer)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const NUMBERSIGN = 0x0023;  // U+0023 NUMBER SIGN (#)
const ASTERISK = 0x002A;    // U+002A ASTERISK (*)
const PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
const HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
const SOLIDUS = 0x002F;     // U+002F SOLIDUS (/)
const U = 0x0075;           // U+0075 LATIN SMALL LETTER U (u)

function defaultRecognizer(context) {
    switch (this.tokenType) {
        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash:
            return this.Hash();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Comma:
            return this.Operator();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis:
            return this.Parentheses(this.readSequence, context.recognizer);

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftSquareBracket:
            return this.Brackets(this.readSequence, context.recognizer);

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.String:
            return this.String();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension:
            return this.Dimension();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage:
            return this.Percentage();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number:
            return this.Number();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Function:
            return this.cmpStr(this.tokenStart, this.tokenEnd, 'url(')
                ? this.Url()
                : this.Function(this.readSequence, context.recognizer);

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Url:
            return this.Url();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident:
            // check for unicode range, it should start with u+ or U+
            if (this.cmpChar(this.tokenStart, U) &&
                this.cmpChar(this.tokenStart + 1, PLUSSIGN)) {
                return this.UnicodeRange();
            } else {
                return this.Identifier();
            }

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim: {
            const code = this.charCodeAt(this.tokenStart);

            if (code === SOLIDUS ||
                code === ASTERISK ||
                code === PLUSSIGN ||
                code === HYPHENMINUS) {
                return this.Operator(); // TODO: replace with Delim
            }

            // TODO: produce a node with Delim node type

            if (code === NUMBERSIGN) {
                this.error('Hex or identifier is expected', this.tokenStart + 1);
            }

            break;
        }
    }
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/scope/index.js":
/*!*************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/scope/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtrulePrelude": () => (/* reexport safe */ _atrulePrelude_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Selector": () => (/* reexport safe */ _selector_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Value": () => (/* reexport safe */ _value_js__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _atrulePrelude_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atrulePrelude.js */ "../../node_modules/css-tree/lib/syntax/scope/atrulePrelude.js");
/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selector.js */ "../../node_modules/css-tree/lib/syntax/scope/selector.js");
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.js */ "../../node_modules/css-tree/lib/syntax/scope/value.js");





/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/scope/selector.js":
/*!****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/scope/selector.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const NUMBERSIGN = 0x0023;      // U+0023 NUMBER SIGN (#)
const ASTERISK = 0x002A;        // U+002A ASTERISK (*)
const PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
const SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)
const FULLSTOP = 0x002E;        // U+002E FULL STOP (.)
const GREATERTHANSIGN = 0x003E; // U+003E GREATER-THAN SIGN (>)
const VERTICALLINE = 0x007C;    // U+007C VERTICAL LINE (|)
const TILDE = 0x007E;           // U+007E TILDE (~)

function onWhiteSpace(next, children) {
    if (children.last !== null && children.last.type !== 'Combinator' &&
        next !== null && next.type !== 'Combinator') {
        children.push({  // FIXME: this.Combinator() should be used instead
            type: 'Combinator',
            loc: null,
            name: ' '
        });
    }
}

function getNode() {
    switch (this.tokenType) {
        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.LeftSquareBracket:
            return this.AttributeSelector();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Hash:
            return this.IdSelector();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon:
            if (this.lookupType(1) === _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Colon) {
                return this.PseudoElementSelector();
            } else {
                return this.PseudoClassSelector();
            }

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Ident:
            return this.TypeSelector();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Number:
        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Percentage:
            return this.Percentage();

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Dimension:
            // throws when .123ident
            if (this.charCodeAt(this.tokenStart) === FULLSTOP) {
                this.error('Identifier is expected', this.tokenStart + 1);
            }
            break;

        case _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.Delim: {
            const code = this.charCodeAt(this.tokenStart);

            switch (code) {
                case PLUSSIGN:
                case GREATERTHANSIGN:
                case TILDE:
                case SOLIDUS:  // /deep/
                    return this.Combinator();

                case FULLSTOP:
                    return this.ClassSelector();

                case ASTERISK:
                case VERTICALLINE:
                    return this.TypeSelector();

                case NUMBERSIGN:
                    return this.IdSelector();
            }

            break;
        }
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    onWhiteSpace,
    getNode
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/syntax/scope/value.js":
/*!*************************************************************!*\
  !*** ../../node_modules/css-tree/lib/syntax/scope/value.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default.js */ "../../node_modules/css-tree/lib/syntax/scope/default.js");
/* harmony import */ var _function_expression_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/expression.js */ "../../node_modules/css-tree/lib/syntax/function/expression.js");
/* harmony import */ var _function_var_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../function/var.js */ "../../node_modules/css-tree/lib/syntax/function/var.js");




function isPlusMinusOperator(node) {
    return (
        node !== null &&
        node.type === 'Operator' &&
        (node.value[node.value.length - 1] === '-' || node.value[node.value.length - 1] === '+')
    );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    getNode: _default_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    onWhiteSpace: function(next, children) {
        if (isPlusMinusOperator(next)) {
            next.value = ' ' + next.value;
        }
        if (isPlusMinusOperator(children.last)) {
            children.last.value += ' ';
        }
    },
    'expression': _function_expression_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    'var': _function_var_js__WEBPACK_IMPORTED_MODULE_2__["default"]
});


/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/OffsetToLocation.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/OffsetToLocation.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OffsetToLocation": () => (/* binding */ OffsetToLocation)
/* harmony export */ });
/* harmony import */ var _adopt_buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adopt-buffer.js */ "../../node_modules/css-tree/lib/tokenizer/adopt-buffer.js");
/* harmony import */ var _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./char-code-definitions.js */ "../../node_modules/css-tree/lib/tokenizer/char-code-definitions.js");



const N = 10;
const F = 12;
const R = 13;

function computeLinesAndColumns(host) {
    const source = host.source;
    const sourceLength = source.length;
    const startOffset = source.length > 0 ? (0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isBOM)(source.charCodeAt(0)) : 0;
    const lines = (0,_adopt_buffer_js__WEBPACK_IMPORTED_MODULE_0__.adoptBuffer)(host.lines, sourceLength);
    const columns = (0,_adopt_buffer_js__WEBPACK_IMPORTED_MODULE_0__.adoptBuffer)(host.columns, sourceLength);
    let line = host.startLine;
    let column = host.startColumn;

    for (let i = startOffset; i < sourceLength; i++) {
        const code = source.charCodeAt(i);

        lines[i] = line;
        columns[i] = column++;

        if (code === N || code === R || code === F) {
            if (code === R && i + 1 < sourceLength && source.charCodeAt(i + 1) === N) {
                i++;
                lines[i] = line;
                columns[i] = column;
            }

            line++;
            column = 1;
        }
    }

    lines[sourceLength] = line;
    columns[sourceLength] = column;

    host.lines = lines;
    host.columns = columns;
    host.computed = true;
}

class OffsetToLocation {
    constructor() {
        this.lines = null;
        this.columns = null;
        this.computed = false;
    }
    setSource(source, startOffset = 0, startLine = 1, startColumn = 1) {
        this.source = source;
        this.startOffset = startOffset;
        this.startLine = startLine;
        this.startColumn = startColumn;
        this.computed = false;
    }
    getLocation(offset, filename) {
        if (!this.computed) {
            computeLinesAndColumns(this);
        }

        return {
            source: filename,
            offset: this.startOffset + offset,
            line: this.lines[offset],
            column: this.columns[offset]
        };
    }
    getLocationRange(start, end, filename) {
        if (!this.computed) {
            computeLinesAndColumns(this);
        }

        return {
            source: filename,
            start: {
                offset: this.startOffset + start,
                line: this.lines[start],
                column: this.columns[start]
            },
            end: {
                offset: this.startOffset + end,
                line: this.lines[end],
                column: this.columns[end]
            }
        };
    }
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/TokenStream.js":
/*!****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/TokenStream.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenStream": () => (/* binding */ TokenStream)
/* harmony export */ });
/* harmony import */ var _adopt_buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adopt-buffer.js */ "../../node_modules/css-tree/lib/tokenizer/adopt-buffer.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/css-tree/lib/tokenizer/utils.js");
/* harmony import */ var _names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./names.js */ "../../node_modules/css-tree/lib/tokenizer/names.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types.js */ "../../node_modules/css-tree/lib/tokenizer/types.js");





const OFFSET_MASK = 0x00FFFFFF;
const TYPE_SHIFT = 24;
const balancePair = new Map([
    [_types_js__WEBPACK_IMPORTED_MODULE_3__.Function, _types_js__WEBPACK_IMPORTED_MODULE_3__.RightParenthesis],
    [_types_js__WEBPACK_IMPORTED_MODULE_3__.LeftParenthesis, _types_js__WEBPACK_IMPORTED_MODULE_3__.RightParenthesis],
    [_types_js__WEBPACK_IMPORTED_MODULE_3__.LeftSquareBracket, _types_js__WEBPACK_IMPORTED_MODULE_3__.RightSquareBracket],
    [_types_js__WEBPACK_IMPORTED_MODULE_3__.LeftCurlyBracket, _types_js__WEBPACK_IMPORTED_MODULE_3__.RightCurlyBracket]
]);

class TokenStream {
    constructor(source, tokenize) {
        this.setSource(source, tokenize);
    }
    reset() {
        this.eof = false;
        this.tokenIndex = -1;
        this.tokenType = 0;
        this.tokenStart = this.firstCharOffset;
        this.tokenEnd = this.firstCharOffset;
    }
    setSource(source = '', tokenize = () => {}) {
        source = String(source || '');

        const sourceLength = source.length;
        const offsetAndType = (0,_adopt_buffer_js__WEBPACK_IMPORTED_MODULE_0__.adoptBuffer)(this.offsetAndType, source.length + 1); // +1 because of eof-token
        const balance = (0,_adopt_buffer_js__WEBPACK_IMPORTED_MODULE_0__.adoptBuffer)(this.balance, source.length + 1);
        let tokenCount = 0;
        let balanceCloseType = 0;
        let balanceStart = 0;
        let firstCharOffset = -1;

        // capture buffers
        this.offsetAndType = null;
        this.balance = null;

        tokenize(source, (type, start, end) => {
            switch (type) {
                default:
                    balance[tokenCount] = sourceLength;
                    break;

                case balanceCloseType: {
                    let balancePrev = balanceStart & OFFSET_MASK;
                    balanceStart = balance[balancePrev];
                    balanceCloseType = balanceStart >> TYPE_SHIFT;
                    balance[tokenCount] = balancePrev;
                    balance[balancePrev++] = tokenCount;
                    for (; balancePrev < tokenCount; balancePrev++) {
                        if (balance[balancePrev] === sourceLength) {
                            balance[balancePrev] = tokenCount;
                        }
                    }
                    break;
                }

                case _types_js__WEBPACK_IMPORTED_MODULE_3__.LeftParenthesis:
                case _types_js__WEBPACK_IMPORTED_MODULE_3__.Function:
                case _types_js__WEBPACK_IMPORTED_MODULE_3__.LeftSquareBracket:
                case _types_js__WEBPACK_IMPORTED_MODULE_3__.LeftCurlyBracket:
                    balance[tokenCount] = balanceStart;
                    balanceCloseType = balancePair.get(type);
                    balanceStart = (balanceCloseType << TYPE_SHIFT) | tokenCount;
                    break;
            }

            offsetAndType[tokenCount++] = (type << TYPE_SHIFT) | end;
            if (firstCharOffset === -1) {
                firstCharOffset = start;
            }
        });

        // finalize buffers
        offsetAndType[tokenCount] = (_types_js__WEBPACK_IMPORTED_MODULE_3__.EOF << TYPE_SHIFT) | sourceLength; // <EOF-token>
        balance[tokenCount] = sourceLength;
        balance[sourceLength] = sourceLength; // prevents false positive balance match with any token
        while (balanceStart !== 0) {
            const balancePrev = balanceStart & OFFSET_MASK;
            balanceStart = balance[balancePrev];
            balance[balancePrev] = sourceLength;
        }

        this.source = source;
        this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset;
        this.tokenCount = tokenCount;
        this.offsetAndType = offsetAndType;
        this.balance = balance;

        this.reset();
        this.next();
    }

    lookupType(offset) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return this.offsetAndType[offset] >> TYPE_SHIFT;
        }

        return _types_js__WEBPACK_IMPORTED_MODULE_3__.EOF;
    }
    lookupOffset(offset) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return this.offsetAndType[offset - 1] & OFFSET_MASK;
        }

        return this.source.length;
    }
    lookupValue(offset, referenceStr) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.cmpStr)(
                this.source,
                this.offsetAndType[offset - 1] & OFFSET_MASK,
                this.offsetAndType[offset] & OFFSET_MASK,
                referenceStr
            );
        }

        return false;
    }
    getTokenStart(tokenIndex) {
        if (tokenIndex === this.tokenIndex) {
            return this.tokenStart;
        }

        if (tokenIndex > 0) {
            return tokenIndex < this.tokenCount
                ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK
                : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
        }

        return this.firstCharOffset;
    }
    substrToCursor(start) {
        return this.source.substring(start, this.tokenStart);
    }

    isBalanceEdge(pos) {
        return this.balance[this.tokenIndex] < pos;
    }
    isDelim(code, offset) {
        if (offset) {
            return (
                this.lookupType(offset) === _types_js__WEBPACK_IMPORTED_MODULE_3__.Delim &&
                this.source.charCodeAt(this.lookupOffset(offset)) === code
            );
        }

        return (
            this.tokenType === _types_js__WEBPACK_IMPORTED_MODULE_3__.Delim &&
            this.source.charCodeAt(this.tokenStart) === code
        );
    }

    skip(tokenCount) {
        let next = this.tokenIndex + tokenCount;

        if (next < this.tokenCount) {
            this.tokenIndex = next;
            this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.tokenIndex = this.tokenCount;
            this.next();
        }
    }
    next() {
        let next = this.tokenIndex + 1;

        if (next < this.tokenCount) {
            this.tokenIndex = next;
            this.tokenStart = this.tokenEnd;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.eof = true;
            this.tokenIndex = this.tokenCount;
            this.tokenType = _types_js__WEBPACK_IMPORTED_MODULE_3__.EOF;
            this.tokenStart = this.tokenEnd = this.source.length;
        }
    }
    skipSC() {
        while (this.tokenType === _types_js__WEBPACK_IMPORTED_MODULE_3__.WhiteSpace || this.tokenType === _types_js__WEBPACK_IMPORTED_MODULE_3__.Comment) {
            this.next();
        }
    }
    skipUntilBalanced(startToken, stopConsume) {
        let cursor = startToken;
        let balanceEnd;
        let offset;

        loop:
        for (; cursor < this.tokenCount; cursor++) {
            balanceEnd = this.balance[cursor];

            // stop scanning on balance edge that points to offset before start token
            if (balanceEnd < startToken) {
                break loop;
            }

            offset = cursor > 0 ? this.offsetAndType[cursor - 1] & OFFSET_MASK : this.firstCharOffset;

            // check stop condition
            switch (stopConsume(this.source.charCodeAt(offset))) {
                case 1: // just stop
                    break loop;

                case 2: // stop & included
                    cursor++;
                    break loop;

                default:
                    // fast forward to the end of balanced block
                    if (this.balance[balanceEnd] === cursor) {
                        cursor = balanceEnd;
                    }
            }
        }

        this.skip(cursor - this.tokenIndex);
    }

    forEachToken(fn) {
        for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
            const start = offset;
            const item = this.offsetAndType[i];
            const end = item & OFFSET_MASK;
            const type = item >> TYPE_SHIFT;

            offset = end;

            fn(type, start, end, i);
        }
    }
    dump() {
        const tokens = new Array(this.tokenCount);

        this.forEachToken((type, start, end, index) => {
            tokens[index] = {
                idx: index,
                type: _names_js__WEBPACK_IMPORTED_MODULE_2__["default"][type],
                chunk: this.source.substring(start, end),
                balance: this.balance[index]
            };
        });

        return tokens;
    }
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/adopt-buffer.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/adopt-buffer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adoptBuffer": () => (/* binding */ adoptBuffer)
/* harmony export */ });
const MIN_SIZE = 16 * 1024;

function adoptBuffer(buffer = null, size) {
    if (buffer === null || buffer.length < size) {
        return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
    }

    return buffer;
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/char-code-definitions.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/char-code-definitions.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DigitCategory": () => (/* binding */ DigitCategory),
/* harmony export */   "EofCategory": () => (/* binding */ EofCategory),
/* harmony export */   "NameStartCategory": () => (/* binding */ NameStartCategory),
/* harmony export */   "NonPrintableCategory": () => (/* binding */ NonPrintableCategory),
/* harmony export */   "WhiteSpaceCategory": () => (/* binding */ WhiteSpaceCategory),
/* harmony export */   "charCodeCategory": () => (/* binding */ charCodeCategory),
/* harmony export */   "isBOM": () => (/* binding */ isBOM),
/* harmony export */   "isDigit": () => (/* binding */ isDigit),
/* harmony export */   "isHexDigit": () => (/* binding */ isHexDigit),
/* harmony export */   "isIdentifierStart": () => (/* binding */ isIdentifierStart),
/* harmony export */   "isLetter": () => (/* binding */ isLetter),
/* harmony export */   "isLowercaseLetter": () => (/* binding */ isLowercaseLetter),
/* harmony export */   "isName": () => (/* binding */ isName),
/* harmony export */   "isNameStart": () => (/* binding */ isNameStart),
/* harmony export */   "isNewline": () => (/* binding */ isNewline),
/* harmony export */   "isNonAscii": () => (/* binding */ isNonAscii),
/* harmony export */   "isNonPrintable": () => (/* binding */ isNonPrintable),
/* harmony export */   "isNumberStart": () => (/* binding */ isNumberStart),
/* harmony export */   "isUppercaseLetter": () => (/* binding */ isUppercaseLetter),
/* harmony export */   "isValidEscape": () => (/* binding */ isValidEscape),
/* harmony export */   "isWhiteSpace": () => (/* binding */ isWhiteSpace)
/* harmony export */ });
const EOF = 0;

// https://drafts.csswg.org/css-syntax-3/
// § 4.2. Definitions

// digit
// A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9).
function isDigit(code) {
    return code >= 0x0030 && code <= 0x0039;
}

// hex digit
// A digit, or a code point between U+0041 LATIN CAPITAL LETTER A (A) and U+0046 LATIN CAPITAL LETTER F (F),
// or a code point between U+0061 LATIN SMALL LETTER A (a) and U+0066 LATIN SMALL LETTER F (f).
function isHexDigit(code) {
    return (
        isDigit(code) || // 0 .. 9
        (code >= 0x0041 && code <= 0x0046) || // A .. F
        (code >= 0x0061 && code <= 0x0066)    // a .. f
    );
}

// uppercase letter
// A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z).
function isUppercaseLetter(code) {
    return code >= 0x0041 && code <= 0x005A;
}

// lowercase letter
// A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z).
function isLowercaseLetter(code) {
    return code >= 0x0061 && code <= 0x007A;
}

// letter
// An uppercase letter or a lowercase letter.
function isLetter(code) {
    return isUppercaseLetter(code) || isLowercaseLetter(code);
}

// non-ASCII code point
// A code point with a value equal to or greater than U+0080 <control>.
function isNonAscii(code) {
    return code >= 0x0080;
}

// name-start code point
// A letter, a non-ASCII code point, or U+005F LOW LINE (_).
function isNameStart(code) {
    return isLetter(code) || isNonAscii(code) || code === 0x005F;
}

// name code point
// A name-start code point, a digit, or U+002D HYPHEN-MINUS (-).
function isName(code) {
    return isNameStart(code) || isDigit(code) || code === 0x002D;
}

// non-printable code point
// A code point between U+0000 NULL and U+0008 BACKSPACE, or U+000B LINE TABULATION,
// or a code point between U+000E SHIFT OUT and U+001F INFORMATION SEPARATOR ONE, or U+007F DELETE.
function isNonPrintable(code) {
    return (
        (code >= 0x0000 && code <= 0x0008) ||
        (code === 0x000B) ||
        (code >= 0x000E && code <= 0x001F) ||
        (code === 0x007F)
    );
}

// newline
// U+000A LINE FEED. Note that U+000D CARRIAGE RETURN and U+000C FORM FEED are not included in this definition,
// as they are converted to U+000A LINE FEED during preprocessing.
// TODO: we doesn't do a preprocessing, so check a code point for U+000D CARRIAGE RETURN and U+000C FORM FEED
function isNewline(code) {
    return code === 0x000A || code === 0x000D || code === 0x000C;
}

// whitespace
// A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
function isWhiteSpace(code) {
    return isNewline(code) || code === 0x0020 || code === 0x0009;
}

// § 4.3.8. Check if two code points are a valid escape
function isValidEscape(first, second) {
    // If the first code point is not U+005C REVERSE SOLIDUS (\), return false.
    if (first !== 0x005C) {
        return false;
    }

    // Otherwise, if the second code point is a newline or EOF, return false.
    if (isNewline(second) || second === EOF) {
        return false;
    }

    // Otherwise, return true.
    return true;
}

// § 4.3.9. Check if three code points would start an identifier
function isIdentifierStart(first, second, third) {
    // Look at the first code point:

    // U+002D HYPHEN-MINUS
    if (first === 0x002D) {
        // If the second code point is a name-start code point or a U+002D HYPHEN-MINUS,
        // or the second and third code points are a valid escape, return true. Otherwise, return false.
        return (
            isNameStart(second) ||
            second === 0x002D ||
            isValidEscape(second, third)
        );
    }

    // name-start code point
    if (isNameStart(first)) {
        // Return true.
        return true;
    }

    // U+005C REVERSE SOLIDUS (\)
    if (first === 0x005C) {
        // If the first and second code points are a valid escape, return true. Otherwise, return false.
        return isValidEscape(first, second);
    }

    // anything else
    // Return false.
    return false;
}

// § 4.3.10. Check if three code points would start a number
function isNumberStart(first, second, third) {
    // Look at the first code point:

    // U+002B PLUS SIGN (+)
    // U+002D HYPHEN-MINUS (-)
    if (first === 0x002B || first === 0x002D) {
        // If the second code point is a digit, return true.
        if (isDigit(second)) {
            return 2;
        }

        // Otherwise, if the second code point is a U+002E FULL STOP (.)
        // and the third code point is a digit, return true.
        // Otherwise, return false.
        return second === 0x002E && isDigit(third) ? 3 : 0;
    }

    // U+002E FULL STOP (.)
    if (first === 0x002E) {
        // If the second code point is a digit, return true. Otherwise, return false.
        return isDigit(second) ? 2 : 0;
    }

    // digit
    if (isDigit(first)) {
        // Return true.
        return 1;
    }

    // anything else
    // Return false.
    return 0;
}

//
// Misc
//

// detect BOM (https://en.wikipedia.org/wiki/Byte_order_mark)
function isBOM(code) {
    // UTF-16BE
    if (code === 0xFEFF) {
        return 1;
    }

    // UTF-16LE
    if (code === 0xFFFE) {
        return 1;
    }

    return 0;
}

// Fast code category
// Only ASCII code points has a special meaning, that's why we define a maps for 0..127 codes only
const CATEGORY = new Array(0x80);
const EofCategory = 0x80;
const WhiteSpaceCategory = 0x82;
const DigitCategory = 0x83;
const NameStartCategory = 0x84;
const NonPrintableCategory = 0x85;

for (let i = 0; i < CATEGORY.length; i++) {
    CATEGORY[i] =
        isWhiteSpace(i) && WhiteSpaceCategory ||
        isDigit(i) && DigitCategory ||
        isNameStart(i) && NameStartCategory ||
        isNonPrintable(i) && NonPrintableCategory ||
        i || EofCategory;
}

function charCodeCategory(code) {
    return code < 0x80 ? CATEGORY[code] : NameStartCategory;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/index.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtKeyword": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword),
/* harmony export */   "BadString": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.BadString),
/* harmony export */   "BadUrl": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl),
/* harmony export */   "CDC": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.CDC),
/* harmony export */   "CDO": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.CDO),
/* harmony export */   "Colon": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Colon),
/* harmony export */   "Comma": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Comma),
/* harmony export */   "Comment": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Comment),
/* harmony export */   "Delim": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim),
/* harmony export */   "DigitCategory": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.DigitCategory),
/* harmony export */   "Dimension": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Dimension),
/* harmony export */   "EOF": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.EOF),
/* harmony export */   "EofCategory": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.EofCategory),
/* harmony export */   "Function": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Function),
/* harmony export */   "Hash": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Hash),
/* harmony export */   "Ident": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Ident),
/* harmony export */   "LeftCurlyBracket": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket),
/* harmony export */   "LeftParenthesis": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis),
/* harmony export */   "LeftSquareBracket": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.LeftSquareBracket),
/* harmony export */   "NameStartCategory": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.NameStartCategory),
/* harmony export */   "NonPrintableCategory": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.NonPrintableCategory),
/* harmony export */   "Number": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Number),
/* harmony export */   "OffsetToLocation": () => (/* reexport safe */ _OffsetToLocation_js__WEBPACK_IMPORTED_MODULE_4__.OffsetToLocation),
/* harmony export */   "Percentage": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Percentage),
/* harmony export */   "RightCurlyBracket": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.RightCurlyBracket),
/* harmony export */   "RightParenthesis": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis),
/* harmony export */   "RightSquareBracket": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.RightSquareBracket),
/* harmony export */   "Semicolon": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon),
/* harmony export */   "String": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.String),
/* harmony export */   "TokenStream": () => (/* reexport safe */ _TokenStream_js__WEBPACK_IMPORTED_MODULE_5__.TokenStream),
/* harmony export */   "Url": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.Url),
/* harmony export */   "WhiteSpace": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace),
/* harmony export */   "WhiteSpaceCategory": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.WhiteSpaceCategory),
/* harmony export */   "charCodeCategory": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.charCodeCategory),
/* harmony export */   "cmpChar": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.cmpChar),
/* harmony export */   "cmpStr": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.cmpStr),
/* harmony export */   "consumeBadUrlRemnants": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeBadUrlRemnants),
/* harmony export */   "consumeEscaped": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeEscaped),
/* harmony export */   "consumeName": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeName),
/* harmony export */   "consumeNumber": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeNumber),
/* harmony export */   "decodeEscaped": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.decodeEscaped),
/* harmony export */   "findDecimalNumberEnd": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.findDecimalNumberEnd),
/* harmony export */   "findWhiteSpaceEnd": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.findWhiteSpaceEnd),
/* harmony export */   "findWhiteSpaceStart": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.findWhiteSpaceStart),
/* harmony export */   "getNewlineLength": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_2__.getNewlineLength),
/* harmony export */   "isBOM": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isBOM),
/* harmony export */   "isDigit": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isDigit),
/* harmony export */   "isHexDigit": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isHexDigit),
/* harmony export */   "isIdentifierStart": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isIdentifierStart),
/* harmony export */   "isLetter": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isLetter),
/* harmony export */   "isLowercaseLetter": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isLowercaseLetter),
/* harmony export */   "isName": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isName),
/* harmony export */   "isNameStart": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNameStart),
/* harmony export */   "isNewline": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNewline),
/* harmony export */   "isNonAscii": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNonAscii),
/* harmony export */   "isNonPrintable": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNonPrintable),
/* harmony export */   "isNumberStart": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNumberStart),
/* harmony export */   "isUppercaseLetter": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isUppercaseLetter),
/* harmony export */   "isValidEscape": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isValidEscape),
/* harmony export */   "isWhiteSpace": () => (/* reexport safe */ _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isWhiteSpace),
/* harmony export */   "tokenNames": () => (/* reexport safe */ _names_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "tokenTypes": () => (/* reexport module object */ _types_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "tokenize": () => (/* binding */ tokenize)
/* harmony export */ });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "../../node_modules/css-tree/lib/tokenizer/types.js");
/* harmony import */ var _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./char-code-definitions.js */ "../../node_modules/css-tree/lib/tokenizer/char-code-definitions.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/css-tree/lib/tokenizer/utils.js");
/* harmony import */ var _names_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./names.js */ "../../node_modules/css-tree/lib/tokenizer/names.js");
/* harmony import */ var _OffsetToLocation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OffsetToLocation.js */ "../../node_modules/css-tree/lib/tokenizer/OffsetToLocation.js");
/* harmony import */ var _TokenStream_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TokenStream.js */ "../../node_modules/css-tree/lib/tokenizer/TokenStream.js");




function tokenize(source, onToken) {
    function getCharCode(offset) {
        return offset < sourceLength ? source.charCodeAt(offset) : 0;
    }

    // § 4.3.3. Consume a numeric token
    function consumeNumericToken() {
        // Consume a number and let number be the result.
        offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeNumber)(source, offset);

        // If the next 3 input code points would start an identifier, then:
        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isIdentifierStart)(getCharCode(offset), getCharCode(offset + 1), getCharCode(offset + 2))) {
            // Create a <dimension-token> with the same value and type flag as number, and a unit set initially to the empty string.
            // Consume a name. Set the <dimension-token>’s unit to the returned value.
            // Return the <dimension-token>.
            type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Dimension;
            offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeName)(source, offset);
            return;
        }

        // Otherwise, if the next input code point is U+0025 PERCENTAGE SIGN (%), consume it.
        if (getCharCode(offset) === 0x0025) {
            // Create a <percentage-token> with the same value as number, and return it.
            type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Percentage;
            offset++;
            return;
        }

        // Otherwise, create a <number-token> with the same value and type flag as number, and return it.
        type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Number;
    }

    // § 4.3.4. Consume an ident-like token
    function consumeIdentLikeToken() {
        const nameStartOffset = offset;

        // Consume a name, and let string be the result.
        offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeName)(source, offset);

        // If string’s value is an ASCII case-insensitive match for "url",
        // and the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.cmpStr)(source, nameStartOffset, offset, 'url') && getCharCode(offset) === 0x0028) {
            // While the next two input code points are whitespace, consume the next input code point.
            offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.findWhiteSpaceEnd)(source, offset + 1);

            // If the next one or two input code points are U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('),
            // or whitespace followed by U+0022 QUOTATION MARK (") or U+0027 APOSTROPHE ('),
            // then create a <function-token> with its value set to string and return it.
            if (getCharCode(offset) === 0x0022 ||
                getCharCode(offset) === 0x0027) {
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Function;
                offset = nameStartOffset + 4;
                return;
            }

            // Otherwise, consume a url token, and return it.
            consumeUrlToken();
            return;
        }

        // Otherwise, if the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
        // Create a <function-token> with its value set to string and return it.
        if (getCharCode(offset) === 0x0028) {
            type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Function;
            offset++;
            return;
        }

        // Otherwise, create an <ident-token> with its value set to string and return it.
        type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Ident;
    }

    // § 4.3.5. Consume a string token
    function consumeStringToken(endingCodePoint) {
        // This algorithm may be called with an ending code point, which denotes the code point
        // that ends the string. If an ending code point is not specified,
        // the current input code point is used.
        if (!endingCodePoint) {
            endingCodePoint = getCharCode(offset++);
        }

        // Initially create a <string-token> with its value set to the empty string.
        type = _types_js__WEBPACK_IMPORTED_MODULE_0__.String;

        // Repeatedly consume the next input code point from the stream:
        for (; offset < source.length; offset++) {
            const code = source.charCodeAt(offset);

            switch ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.charCodeCategory)(code)) {
                // ending code point
                case endingCodePoint:
                    // Return the <string-token>.
                    offset++;
                    return;

                    // EOF
                    // case EofCategory:
                    // This is a parse error. Return the <string-token>.
                    // return;

                // newline
                case _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.WhiteSpaceCategory:
                    if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNewline)(code)) {
                        // This is a parse error. Reconsume the current input code point,
                        // create a <bad-string-token>, and return it.
                        offset += (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getNewlineLength)(source, offset, code);
                        type = _types_js__WEBPACK_IMPORTED_MODULE_0__.BadString;
                        return;
                    }
                    break;

                // U+005C REVERSE SOLIDUS (\)
                case 0x005C:
                    // If the next input code point is EOF, do nothing.
                    if (offset === source.length - 1) {
                        break;
                    }

                    const nextCode = getCharCode(offset + 1);

                    // Otherwise, if the next input code point is a newline, consume it.
                    if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNewline)(nextCode)) {
                        offset += (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getNewlineLength)(source, offset + 1, nextCode);
                    } else if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isValidEscape)(code, nextCode)) {
                        // Otherwise, (the stream starts with a valid escape) consume
                        // an escaped code point and append the returned code point to
                        // the <string-token>’s value.
                        offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeEscaped)(source, offset) - 1;
                    }
                    break;

                // anything else
                // Append the current input code point to the <string-token>’s value.
            }
        }
    }

    // § 4.3.6. Consume a url token
    // Note: This algorithm assumes that the initial "url(" has already been consumed.
    // This algorithm also assumes that it’s being called to consume an "unquoted" value, like url(foo).
    // A quoted value, like url("foo"), is parsed as a <function-token>. Consume an ident-like token
    // automatically handles this distinction; this algorithm shouldn’t be called directly otherwise.
    function consumeUrlToken() {
        // Initially create a <url-token> with its value set to the empty string.
        type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Url;

        // Consume as much whitespace as possible.
        offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.findWhiteSpaceEnd)(source, offset);

        // Repeatedly consume the next input code point from the stream:
        for (; offset < source.length; offset++) {
            const code = source.charCodeAt(offset);

            switch ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.charCodeCategory)(code)) {
                // U+0029 RIGHT PARENTHESIS ())
                case 0x0029:
                    // Return the <url-token>.
                    offset++;
                    return;

                    // EOF
                    // case EofCategory:
                    // This is a parse error. Return the <url-token>.
                    // return;

                // whitespace
                case _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.WhiteSpaceCategory:
                    // Consume as much whitespace as possible.
                    offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.findWhiteSpaceEnd)(source, offset);

                    // If the next input code point is U+0029 RIGHT PARENTHESIS ()) or EOF,
                    // consume it and return the <url-token>
                    // (if EOF was encountered, this is a parse error);
                    if (getCharCode(offset) === 0x0029 || offset >= source.length) {
                        if (offset < source.length) {
                            offset++;
                        }
                        return;
                    }

                    // otherwise, consume the remnants of a bad url, create a <bad-url-token>,
                    // and return it.
                    offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeBadUrlRemnants)(source, offset);
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl;
                    return;

                // U+0022 QUOTATION MARK (")
                // U+0027 APOSTROPHE (')
                // U+0028 LEFT PARENTHESIS (()
                // non-printable code point
                case 0x0022:
                case 0x0027:
                case 0x0028:
                case _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.NonPrintableCategory:
                    // This is a parse error. Consume the remnants of a bad url,
                    // create a <bad-url-token>, and return it.
                    offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeBadUrlRemnants)(source, offset);
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl;
                    return;

                // U+005C REVERSE SOLIDUS (\)
                case 0x005C:
                    // If the stream starts with a valid escape, consume an escaped code point and
                    // append the returned code point to the <url-token>’s value.
                    if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isValidEscape)(code, getCharCode(offset + 1))) {
                        offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeEscaped)(source, offset) - 1;
                        break;
                    }

                    // Otherwise, this is a parse error. Consume the remnants of a bad url,
                    // create a <bad-url-token>, and return it.
                    offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeBadUrlRemnants)(source, offset);
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.BadUrl;
                    return;

                // anything else
                // Append the current input code point to the <url-token>’s value.
            }
        }
    }

    // ensure source is a string
    source = String(source || '');

    const sourceLength = source.length;
    let start = (0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isBOM)(getCharCode(0));
    let offset = start;
    let type;

    // https://drafts.csswg.org/css-syntax-3/#consume-token
    // § 4.3.1. Consume a token
    while (offset < sourceLength) {
        const code = source.charCodeAt(offset);

        switch ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.charCodeCategory)(code)) {
            // whitespace
            case _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.WhiteSpaceCategory:
                // Consume as much whitespace as possible. Return a <whitespace-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.WhiteSpace;
                offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.findWhiteSpaceEnd)(source, offset + 1);
                break;

            // U+0022 QUOTATION MARK (")
            case 0x0022:
                // Consume a string token and return it.
                consumeStringToken();
                break;

            // U+0023 NUMBER SIGN (#)
            case 0x0023:
                // If the next input code point is a name code point or the next two input code points are a valid escape, then:
                if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isName)(getCharCode(offset + 1)) || (0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isValidEscape)(getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // Create a <hash-token>.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Hash;

                    // If the next 3 input code points would start an identifier, set the <hash-token>’s type flag to "id".
                    // if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
                    //     // TODO: set id flag
                    // }

                    // Consume a name, and set the <hash-token>’s value to the returned string.
                    offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeName)(source, offset + 1);

                    // Return the <hash-token>.
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                    offset++;
                }

                break;

            // U+0027 APOSTROPHE (')
            case 0x0027:
                // Consume a string token and return it.
                consumeStringToken();
                break;

            // U+0028 LEFT PARENTHESIS (()
            case 0x0028:
                // Return a <(-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.LeftParenthesis;
                offset++;
                break;

            // U+0029 RIGHT PARENTHESIS ())
            case 0x0029:
                // Return a <)-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.RightParenthesis;
                offset++;
                break;

            // U+002B PLUS SIGN (+)
            case 0x002B:
                // If the input stream starts with a number, ...
                if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNumberStart)(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // ... reconsume the current input code point, consume a numeric token, and return it.
                    consumeNumericToken();
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                    offset++;
                }
                break;

            // U+002C COMMA (,)
            case 0x002C:
                // Return a <comma-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Comma;
                offset++;
                break;

            // U+002D HYPHEN-MINUS (-)
            case 0x002D:
                // If the input stream starts with a number, reconsume the current input code point, consume a numeric token, and return it.
                if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNumberStart)(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    consumeNumericToken();
                } else {
                    // Otherwise, if the next 2 input code points are U+002D HYPHEN-MINUS U+003E GREATER-THAN SIGN (->), consume them and return a <CDC-token>.
                    if (getCharCode(offset + 1) === 0x002D &&
                        getCharCode(offset + 2) === 0x003E) {
                        type = _types_js__WEBPACK_IMPORTED_MODULE_0__.CDC;
                        offset = offset + 3;
                    } else {
                        // Otherwise, if the input stream starts with an identifier, ...
                        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isIdentifierStart)(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                            // ... reconsume the current input code point, consume an ident-like token, and return it.
                            consumeIdentLikeToken();
                        } else {
                            // Otherwise, return a <delim-token> with its value set to the current input code point.
                            type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                            offset++;
                        }
                    }
                }
                break;

            // U+002E FULL STOP (.)
            case 0x002E:
                // If the input stream starts with a number, ...
                if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isNumberStart)(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // ... reconsume the current input code point, consume a numeric token, and return it.
                    consumeNumericToken();
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                    offset++;
                }

                break;

            // U+002F SOLIDUS (/)
            case 0x002F:
                // If the next two input code point are U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*),
                if (getCharCode(offset + 1) === 0x002A) {
                    // ... consume them and all following code points up to and including the first U+002A ASTERISK (*)
                    // followed by a U+002F SOLIDUS (/), or up to an EOF code point.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Comment;
                    offset = source.indexOf('*/', offset + 2);
                    offset = offset === -1 ? source.length : offset + 2;
                } else {
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                    offset++;
                }
                break;

            // U+003A COLON (:)
            case 0x003A:
                // Return a <colon-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Colon;
                offset++;
                break;

            // U+003B SEMICOLON (;)
            case 0x003B:
                // Return a <semicolon-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Semicolon;
                offset++;
                break;

            // U+003C LESS-THAN SIGN (<)
            case 0x003C:
                // If the next 3 input code points are U+0021 EXCLAMATION MARK U+002D HYPHEN-MINUS U+002D HYPHEN-MINUS (!--), ...
                if (getCharCode(offset + 1) === 0x0021 &&
                    getCharCode(offset + 2) === 0x002D &&
                    getCharCode(offset + 3) === 0x002D) {
                    // ... consume them and return a <CDO-token>.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.CDO;
                    offset = offset + 4;
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                    offset++;
                }

                break;

            // U+0040 COMMERCIAL AT (@)
            case 0x0040:
                // If the next 3 input code points would start an identifier, ...
                if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isIdentifierStart)(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
                    // ... consume a name, create an <at-keyword-token> with its value set to the returned value, and return it.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.AtKeyword;
                    offset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.consumeName)(source, offset + 1);
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                    offset++;
                }

                break;

            // U+005B LEFT SQUARE BRACKET ([)
            case 0x005B:
                // Return a <[-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.LeftSquareBracket;
                offset++;
                break;

            // U+005C REVERSE SOLIDUS (\)
            case 0x005C:
                // If the input stream starts with a valid escape, ...
                if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.isValidEscape)(code, getCharCode(offset + 1))) {
                    // ... reconsume the current input code point, consume an ident-like token, and return it.
                    consumeIdentLikeToken();
                } else {
                    // Otherwise, this is a parse error. Return a <delim-token> with its value set to the current input code point.
                    type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                    offset++;
                }
                break;

            // U+005D RIGHT SQUARE BRACKET (])
            case 0x005D:
                // Return a <]-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.RightSquareBracket;
                offset++;
                break;

            // U+007B LEFT CURLY BRACKET ({)
            case 0x007B:
                // Return a <{-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.LeftCurlyBracket;
                offset++;
                break;

            // U+007D RIGHT CURLY BRACKET (})
            case 0x007D:
                // Return a <}-token>.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.RightCurlyBracket;
                offset++;
                break;

            // digit
            case _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.DigitCategory:
                // Reconsume the current input code point, consume a numeric token, and return it.
                consumeNumericToken();
                break;

            // name-start code point
            case _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_1__.NameStartCategory:
                // Reconsume the current input code point, consume an ident-like token, and return it.
                consumeIdentLikeToken();
                break;

                // EOF
                // case EofCategory:
                // Return an <EOF-token>.
                // break;

            // anything else
            default:
                // Return a <delim-token> with its value set to the current input code point.
                type = _types_js__WEBPACK_IMPORTED_MODULE_0__.Delim;
                offset++;
        }

        // put token to stream
        onToken(type, start, start = offset);
    }
}










/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/names.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/names.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    'EOF-token',
    'ident-token',
    'function-token',
    'at-keyword-token',
    'hash-token',
    'string-token',
    'bad-string-token',
    'url-token',
    'bad-url-token',
    'delim-token',
    'number-token',
    'percentage-token',
    'dimension-token',
    'whitespace-token',
    'CDO-token',
    'CDC-token',
    'colon-token',
    'semicolon-token',
    'comma-token',
    '[-token',
    ']-token',
    '(-token',
    ')-token',
    '{-token',
    '}-token'
]);


/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/types.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/types.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtKeyword": () => (/* binding */ AtKeyword),
/* harmony export */   "BadString": () => (/* binding */ BadString),
/* harmony export */   "BadUrl": () => (/* binding */ BadUrl),
/* harmony export */   "CDC": () => (/* binding */ CDC),
/* harmony export */   "CDO": () => (/* binding */ CDO),
/* harmony export */   "Colon": () => (/* binding */ Colon),
/* harmony export */   "Comma": () => (/* binding */ Comma),
/* harmony export */   "Comment": () => (/* binding */ Comment),
/* harmony export */   "Delim": () => (/* binding */ Delim),
/* harmony export */   "Dimension": () => (/* binding */ Dimension),
/* harmony export */   "EOF": () => (/* binding */ EOF),
/* harmony export */   "Function": () => (/* binding */ Function),
/* harmony export */   "Hash": () => (/* binding */ Hash),
/* harmony export */   "Ident": () => (/* binding */ Ident),
/* harmony export */   "LeftCurlyBracket": () => (/* binding */ LeftCurlyBracket),
/* harmony export */   "LeftParenthesis": () => (/* binding */ LeftParenthesis),
/* harmony export */   "LeftSquareBracket": () => (/* binding */ LeftSquareBracket),
/* harmony export */   "Number": () => (/* binding */ Number),
/* harmony export */   "Percentage": () => (/* binding */ Percentage),
/* harmony export */   "RightCurlyBracket": () => (/* binding */ RightCurlyBracket),
/* harmony export */   "RightParenthesis": () => (/* binding */ RightParenthesis),
/* harmony export */   "RightSquareBracket": () => (/* binding */ RightSquareBracket),
/* harmony export */   "Semicolon": () => (/* binding */ Semicolon),
/* harmony export */   "String": () => (/* binding */ String),
/* harmony export */   "Url": () => (/* binding */ Url),
/* harmony export */   "WhiteSpace": () => (/* binding */ WhiteSpace)
/* harmony export */ });
// CSS Syntax Module Level 3
// https://www.w3.org/TR/css-syntax-3/
const EOF = 0;                 // <EOF-token>
const Ident = 1;               // <ident-token>
const Function = 2;            // <function-token>
const AtKeyword = 3;           // <at-keyword-token>
const Hash = 4;                // <hash-token>
const String = 5;              // <string-token>
const BadString = 6;           // <bad-string-token>
const Url = 7;                 // <url-token>
const BadUrl = 8;              // <bad-url-token>
const Delim = 9;               // <delim-token>
const Number = 10;             // <number-token>
const Percentage = 11;         // <percentage-token>
const Dimension = 12;          // <dimension-token>
const WhiteSpace = 13;         // <whitespace-token>
const CDO = 14;                // <CDO-token>
const CDC = 15;                // <CDC-token>
const Colon = 16;              // <colon-token>     :
const Semicolon = 17;          // <semicolon-token> ;
const Comma = 18;              // <comma-token>     ,
const LeftSquareBracket = 19;  // <[-token>
const RightSquareBracket = 20; // <]-token>
const LeftParenthesis = 21;    // <(-token>
const RightParenthesis = 22;   // <)-token>
const LeftCurlyBracket = 23;   // <{-token>
const RightCurlyBracket = 24;  // <}-token>
const Comment = 25;


/***/ }),

/***/ "../../node_modules/css-tree/lib/tokenizer/utils.js":
/*!**********************************************************!*\
  !*** ../../node_modules/css-tree/lib/tokenizer/utils.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cmpChar": () => (/* binding */ cmpChar),
/* harmony export */   "cmpStr": () => (/* binding */ cmpStr),
/* harmony export */   "consumeBadUrlRemnants": () => (/* binding */ consumeBadUrlRemnants),
/* harmony export */   "consumeEscaped": () => (/* binding */ consumeEscaped),
/* harmony export */   "consumeName": () => (/* binding */ consumeName),
/* harmony export */   "consumeNumber": () => (/* binding */ consumeNumber),
/* harmony export */   "decodeEscaped": () => (/* binding */ decodeEscaped),
/* harmony export */   "findDecimalNumberEnd": () => (/* binding */ findDecimalNumberEnd),
/* harmony export */   "findWhiteSpaceEnd": () => (/* binding */ findWhiteSpaceEnd),
/* harmony export */   "findWhiteSpaceStart": () => (/* binding */ findWhiteSpaceStart),
/* harmony export */   "getNewlineLength": () => (/* binding */ getNewlineLength)
/* harmony export */ });
/* harmony import */ var _char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./char-code-definitions.js */ "../../node_modules/css-tree/lib/tokenizer/char-code-definitions.js");


function getCharCode(source, offset) {
    return offset < source.length ? source.charCodeAt(offset) : 0;
}

function getNewlineLength(source, offset, code) {
    if (code === 13 /* \r */ && getCharCode(source, offset + 1) === 10 /* \n */) {
        return 2;
    }

    return 1;
}

function cmpChar(testStr, offset, referenceCode) {
    let code = testStr.charCodeAt(offset);

    // code.toLowerCase() for A..Z
    if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isUppercaseLetter)(code)) {
        code = code | 32;
    }

    return code === referenceCode;
}

function cmpStr(testStr, start, end, referenceStr) {
    if (end - start !== referenceStr.length) {
        return false;
    }

    if (start < 0 || end > testStr.length) {
        return false;
    }

    for (let i = start; i < end; i++) {
        const referenceCode = referenceStr.charCodeAt(i - start);
        let testCode = testStr.charCodeAt(i);

        // testCode.toLowerCase() for A..Z
        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isUppercaseLetter)(testCode)) {
            testCode = testCode | 32;
        }

        if (testCode !== referenceCode) {
            return false;
        }
    }

    return true;
}

function findWhiteSpaceStart(source, offset) {
    for (; offset >= 0; offset--) {
        if (!(0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset + 1;
}

function findWhiteSpaceEnd(source, offset) {
    for (; offset < source.length; offset++) {
        if (!(0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset;
}

function findDecimalNumberEnd(source, offset) {
    for (; offset < source.length; offset++) {
        if (!(0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset;
}

// § 4.3.7. Consume an escaped code point
function consumeEscaped(source, offset) {
    // It assumes that the U+005C REVERSE SOLIDUS (\) has already been consumed and
    // that the next input code point has already been verified to be part of a valid escape.
    offset += 2;

    // hex digit
    if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isHexDigit)(getCharCode(source, offset - 1))) {
        // Consume as many hex digits as possible, but no more than 5.
        // Note that this means 1-6 hex digits have been consumed in total.
        for (const maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) {
            if (!(0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isHexDigit)(getCharCode(source, offset))) {
                break;
            }
        }

        // If the next input code point is whitespace, consume it as well.
        const code = getCharCode(source, offset);
        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(code)) {
            offset += getNewlineLength(source, offset, code);
        }
    }

    return offset;
}

// §4.3.11. Consume a name
// Note: This algorithm does not do the verification of the first few code points that are necessary
// to ensure the returned code points would constitute an <ident-token>. If that is the intended use,
// ensure that the stream starts with an identifier before calling this algorithm.
function consumeName(source, offset) {
    // Let result initially be an empty string.
    // Repeatedly consume the next input code point from the stream:
    for (; offset < source.length; offset++) {
        const code = source.charCodeAt(offset);

        // name code point
        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isName)(code)) {
            // Append the code point to result.
            continue;
        }

        // the stream starts with a valid escape
        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isValidEscape)(code, getCharCode(source, offset + 1))) {
            // Consume an escaped code point. Append the returned code point to result.
            offset = consumeEscaped(source, offset) - 1;
            continue;
        }

        // anything else
        // Reconsume the current input code point. Return result.
        break;
    }

    return offset;
}

// §4.3.12. Consume a number
function consumeNumber(source, offset) {
    let code = source.charCodeAt(offset);

    // 2. If the next input code point is U+002B PLUS SIGN (+) or U+002D HYPHEN-MINUS (-),
    // consume it and append it to repr.
    if (code === 0x002B || code === 0x002D) {
        code = source.charCodeAt(offset += 1);
    }

    // 3. While the next input code point is a digit, consume it and append it to repr.
    if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(code)) {
        offset = findDecimalNumberEnd(source, offset + 1);
        code = source.charCodeAt(offset);
    }

    // 4. If the next 2 input code points are U+002E FULL STOP (.) followed by a digit, then:
    if (code === 0x002E && (0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(source.charCodeAt(offset + 1))) {
        // 4.1 Consume them.
        // 4.2 Append them to repr.
        offset += 2;

        // 4.3 Set type to "number".
        // TODO

        // 4.4 While the next input code point is a digit, consume it and append it to repr.

        offset = findDecimalNumberEnd(source, offset);
    }

    // 5. If the next 2 or 3 input code points are U+0045 LATIN CAPITAL LETTER E (E)
    // or U+0065 LATIN SMALL LETTER E (e), ... , followed by a digit, then:
    if (cmpChar(source, offset, 101 /* e */)) {
        let sign = 0;
        code = source.charCodeAt(offset + 1);

        // ... optionally followed by U+002D HYPHEN-MINUS (-) or U+002B PLUS SIGN (+) ...
        if (code === 0x002D || code === 0x002B) {
            sign = 1;
            code = source.charCodeAt(offset + 2);
        }

        // ... followed by a digit
        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isDigit)(code)) {
            // 5.1 Consume them.
            // 5.2 Append them to repr.

            // 5.3 Set type to "number".
            // TODO

            // 5.4 While the next input code point is a digit, consume it and append it to repr.
            offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
        }
    }

    return offset;
}

// § 4.3.14. Consume the remnants of a bad url
// ... its sole use is to consume enough of the input stream to reach a recovery point
// where normal tokenizing can resume.
function consumeBadUrlRemnants(source, offset) {
    // Repeatedly consume the next input code point from the stream:
    for (; offset < source.length; offset++) {
        const code = source.charCodeAt(offset);

        // U+0029 RIGHT PARENTHESIS ())
        // EOF
        if (code === 0x0029) {
            // Return.
            offset++;
            break;
        }

        if ((0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isValidEscape)(code, getCharCode(source, offset + 1))) {
            // Consume an escaped code point.
            // Note: This allows an escaped right parenthesis ("\)") to be encountered
            // without ending the <bad-url-token>. This is otherwise identical to
            // the "anything else" clause.
            offset = consumeEscaped(source, offset);
        }
    }

    return offset;
}

// § 4.3.7. Consume an escaped code point
// Note: This algorithm assumes that escaped is valid without leading U+005C REVERSE SOLIDUS (\)
function decodeEscaped(escaped) {
    // Single char escaped that's not a hex digit
    if (escaped.length === 1 && !(0,_char_code_definitions_js__WEBPACK_IMPORTED_MODULE_0__.isHexDigit)(escaped.charCodeAt(0))) {
        return escaped[0];
    }

    // Interpret the hex digits as a hexadecimal number.
    let code = parseInt(escaped, 16);

    if (
        (code === 0) ||                       // If this number is zero,
        (code >= 0xD800 && code <= 0xDFFF) || // or is for a surrogate,
        (code > 0x10FFFF)                     // or is greater than the maximum allowed code point
    ) {
        // ... return U+FFFD REPLACEMENT CHARACTER
        code = 0xFFFD;
    }

    // Otherwise, return the code point with that value.
    return String.fromCodePoint(code);
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/utils/List.js":
/*!*****************************************************!*\
  !*** ../../node_modules/css-tree/lib/utils/List.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "List": () => (/* binding */ List)
/* harmony export */ });
//
//                              list
//                            ┌──────┐
//             ┌──────────────┼─head │
//             │              │ tail─┼──────────────┐
//             │              └──────┘              │
//             ▼                                    ▼
//            item        item        item        item
//          ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐
//  null ◀──┼─prev │◀───┼─prev │◀───┼─prev │◀───┼─prev │
//          │ next─┼───▶│ next─┼───▶│ next─┼───▶│ next─┼──▶ null
//          ├──────┤    ├──────┤    ├──────┤    ├──────┤
//          │ data │    │ data │    │ data │    │ data │
//          └──────┘    └──────┘    └──────┘    └──────┘
//

let releasedCursors = null;

class List {
    static createItem(data) {
        return {
            prev: null,
            next: null,
            data
        };
    }

    constructor() {
        this.head = null;
        this.tail = null;
        this.cursor = null;
    }
    createItem(data) {
        return List.createItem(data);
    }

    // cursor helpers
    allocateCursor(prev, next) {
        let cursor;

        if (releasedCursors !== null) {
            cursor = releasedCursors;
            releasedCursors = releasedCursors.cursor;
            cursor.prev = prev;
            cursor.next = next;
            cursor.cursor = this.cursor;
        } else {
            cursor = {
                prev,
                next,
                cursor: this.cursor
            };
        }

        this.cursor = cursor;

        return cursor;
    }
    releaseCursor() {
        const { cursor } = this;

        this.cursor = cursor.cursor;
        cursor.prev = null;
        cursor.next = null;
        cursor.cursor = releasedCursors;
        releasedCursors = cursor;
    }
    updateCursors(prevOld, prevNew, nextOld, nextNew) {
        let { cursor } = this;

        while (cursor !== null) {
            if (cursor.prev === prevOld) {
                cursor.prev = prevNew;
            }

            if (cursor.next === nextOld) {
                cursor.next = nextNew;
            }

            cursor = cursor.cursor;
        }
    }
    *[Symbol.iterator]() {
        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            yield cursor.data;
        }
    }

    // getters
    get size() {
        let size = 0;

        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            size++;
        }

        return size;
    }
    get isEmpty() {
        return this.head === null;
    }
    get first() {
        return this.head && this.head.data;
    }
    get last() {
        return this.tail && this.tail.data;
    }

    // convertors
    fromArray(array) {
        let cursor = null;
        this.head = null;

        for (let data of array) {
            const item = List.createItem(data);

            if (cursor !== null) {
                cursor.next = item;
            } else {
                this.head = item;
            }

            item.prev = cursor;
            cursor = item;
        }

        this.tail = cursor;
        return this;
    }
    toArray() {
        return [...this];
    }
    toJSON() {
        return [...this];
    }

    // array-like methods
    forEach(fn, thisArg = this) {
        // push cursor
        const cursor = this.allocateCursor(null, this.head);

        while (cursor.next !== null) {
            const item = cursor.next;
            cursor.next = item.next;
            fn.call(thisArg, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();
    }
    forEachRight(fn, thisArg = this) {
        // push cursor
        const cursor = this.allocateCursor(this.tail, null);

        while (cursor.prev !== null) {
            const item = cursor.prev;
            cursor.prev = item.prev;
            fn.call(thisArg, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();
    }
    reduce(fn, initialValue, thisArg = this) {
        // push cursor
        let cursor = this.allocateCursor(null, this.head);
        let acc = initialValue;
        let item;

        while (cursor.next !== null) {
            item = cursor.next;
            cursor.next = item.next;

            acc = fn.call(thisArg, acc, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();

        return acc;
    }
    reduceRight(fn, initialValue, thisArg = this) {
        // push cursor
        let cursor = this.allocateCursor(this.tail, null);
        let acc = initialValue;
        let item;

        while (cursor.prev !== null) {
            item = cursor.prev;
            cursor.prev = item.prev;

            acc = fn.call(thisArg, acc, item.data, item, this);
        }

        // pop cursor
        this.releaseCursor();

        return acc;
    }
    some(fn, thisArg = this) {
        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            if (fn.call(thisArg, cursor.data, cursor, this)) {
                return true;
            }
        }

        return false;
    }
    map(fn, thisArg = this) {
        const result = new List();

        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            result.appendData(fn.call(thisArg, cursor.data, cursor, this));
        }

        return result;
    }
    filter(fn, thisArg = this) {
        const result = new List();

        for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
            if (fn.call(thisArg, cursor.data, cursor, this)) {
                result.appendData(cursor.data);
            }
        }

        return result;
    }

    nextUntil(start, fn, thisArg = this) {
        if (start === null) {
            return;
        }

        // push cursor
        const cursor = this.allocateCursor(null, start);

        while (cursor.next !== null) {
            const item = cursor.next;
            cursor.next = item.next;
            if (fn.call(thisArg, item.data, item, this)) {
                break;
            }
        }

        // pop cursor
        this.releaseCursor();
    }
    prevUntil(start, fn, thisArg = this) {
        if (start === null) {
            return;
        }

        // push cursor
        const cursor = this.allocateCursor(start, null);

        while (cursor.prev !== null) {
            const item = cursor.prev;
            cursor.prev = item.prev;
            if (fn.call(thisArg, item.data, item, this)) {
                break;
            }
        }

        // pop cursor
        this.releaseCursor();
    }

    // mutation
    clear() {
        this.head = null;
        this.tail = null;
    }
    copy() {
        const result = new List();

        for (let data of this) {
            result.appendData(data);
        }

        return result;
    }
    prepend(item) {
        //      head
        //    ^
        // item
        this.updateCursors(null, item, this.head, item);

        // insert to the beginning of the list
        if (this.head !== null) {
            // new item <- first item
            this.head.prev = item;
            // new item -> first item
            item.next = this.head;
        } else {
            // if list has no head, then it also has no tail
            // in this case tail points to the new item
            this.tail = item;
        }

        // head always points to new item
        this.head = item;
        return this;
    }
    prependData(data) {
        return this.prepend(List.createItem(data));
    }
    append(item) {
        return this.insert(item);
    }
    appendData(data) {
        return this.insert(List.createItem(data));
    }
    insert(item, before = null) {
        if (before !== null) {
            // prev   before
            //      ^
            //     item
            this.updateCursors(before.prev, item, before, item);

            if (before.prev === null) {
                // insert to the beginning of list
                if (this.head !== before) {
                    throw new Error('before doesn\'t belong to list');
                }
                // since head points to before therefore list doesn't empty
                // no need to check tail
                this.head = item;
                before.prev = item;
                item.next = before;
                this.updateCursors(null, item);
            } else {
                // insert between two items
                before.prev.next = item;
                item.prev = before.prev;
                before.prev = item;
                item.next = before;
            }
        } else {
            // tail
            //      ^
            //      item
            this.updateCursors(this.tail, item, null, item);

            // insert to the ending of the list
            if (this.tail !== null) {
                // last item -> new item
                this.tail.next = item;
                // last item <- new item
                item.prev = this.tail;
            } else {
                // if list has no tail, then it also has no head
                // in this case head points to new item
                this.head = item;
            }

            // tail always points to new item
            this.tail = item;
        }

        return this;
    }
    insertData(data, before) {
        return this.insert(List.createItem(data), before);
    }
    remove(item) {
        //      item
        //       ^
        // prev     next
        this.updateCursors(item, item.prev, item, item.next);

        if (item.prev !== null) {
            item.prev.next = item.next;
        } else {
            if (this.head !== item) {
                throw new Error('item doesn\'t belong to list');
            }

            this.head = item.next;
        }

        if (item.next !== null) {
            item.next.prev = item.prev;
        } else {
            if (this.tail !== item) {
                throw new Error('item doesn\'t belong to list');
            }

            this.tail = item.prev;
        }

        item.prev = null;
        item.next = null;

        return item;
    }
    push(data) {
        this.insert(List.createItem(data));
    }
    pop() {
        return this.tail !== null ? this.remove(this.tail) : null;
    }
    unshift(data) {
        this.prepend(List.createItem(data));
    }
    shift() {
        return this.head !== null ? this.remove(this.head) : null;
    }
    prependList(list) {
        return this.insertList(list, this.head);
    }
    appendList(list) {
        return this.insertList(list);
    }
    insertList(list, before) {
        // ignore empty lists
        if (list.head === null) {
            return this;
        }

        if (before !== undefined && before !== null) {
            this.updateCursors(before.prev, list.tail, before, list.head);

            // insert in the middle of dist list
            if (before.prev !== null) {
                // before.prev <-> list.head
                before.prev.next = list.head;
                list.head.prev = before.prev;
            } else {
                this.head = list.head;
            }

            before.prev = list.tail;
            list.tail.next = before;
        } else {
            this.updateCursors(this.tail, list.tail, null, list.head);

            // insert to end of the list
            if (this.tail !== null) {
                // if destination list has a tail, then it also has a head,
                // but head doesn't change
                // dest tail -> source head
                this.tail.next = list.head;
                // dest tail <- source head
                list.head.prev = this.tail;
            } else {
                // if list has no a tail, then it also has no a head
                // in this case points head to new item
                this.head = list.head;
            }

            // tail always start point to new item
            this.tail = list.tail;
        }

        list.head = null;
        list.tail = null;
        return this;
    }
    replace(oldItem, newItemOrList) {
        if ('head' in newItemOrList) {
            this.insertList(newItemOrList, oldItem);
        } else {
            this.insert(newItemOrList, oldItem);
        }

        this.remove(oldItem);
    }
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/utils/clone.js":
/*!******************************************************!*\
  !*** ../../node_modules/css-tree/lib/utils/clone.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clone": () => (/* binding */ clone)
/* harmony export */ });
/* harmony import */ var _List_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.js */ "../../node_modules/css-tree/lib/utils/List.js");


function clone(node) {
    const result = {};

    for (const key in node) {
        let value = node[key];

        if (value) {
            if (Array.isArray(value) || value instanceof _List_js__WEBPACK_IMPORTED_MODULE_0__.List) {
                value = value.map(clone);
            } else if (value.constructor === Object) {
                value = clone(value);
            }
        }

        result[key] = value;
    }

    return result;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/utils/create-custom-error.js":
/*!********************************************************************!*\
  !*** ../../node_modules/css-tree/lib/utils/create-custom-error.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCustomError": () => (/* binding */ createCustomError)
/* harmony export */ });
function createCustomError(name, message) {
    // use Object.create(), because some VMs prevent setting line/column otherwise
    // (iOS Safari 10 even throws an exception)
    const error = Object.create(SyntaxError.prototype);
    const errorStack = new Error();

    return Object.assign(error, {
        name,
        message,
        get stack() {
            return (errorStack.stack || '').replace(/^(.+\n){1,3}/, `${name}: ${message}\n`);
        }
    });
};


/***/ }),

/***/ "../../node_modules/css-tree/lib/utils/ident.js":
/*!******************************************************!*\
  !*** ../../node_modules/css-tree/lib/utils/ident.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const REVERSE_SOLIDUS = 0x005c; // U+005C REVERSE SOLIDUS (\)

function decode(str) {
    const end = str.length - 1;
    let decoded = '';

    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);

        if (code === REVERSE_SOLIDUS) {
            // special case at the ending
            if (i === end) {
                // if the next input code point is EOF, do nothing
                break;
            }

            code = str.charCodeAt(++i);

            // consume escaped
            if ((0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isValidEscape)(REVERSE_SOLIDUS, code)) {
                const escapeStart = i - 1;
                const escapeEnd = (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.consumeEscaped)(str, escapeStart);

                i = escapeEnd - 1;
                decoded += (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.decodeEscaped)(str.substring(escapeStart + 1, escapeEnd));
            } else {
                // \r\n
                if (code === 0x000d && str.charCodeAt(i + 1) === 0x000a) {
                    i++;
                }
            }
        } else {
            decoded += str[i];
        }
    }

    return decoded;
}

// https://drafts.csswg.org/cssom/#serialize-an-identifier
// § 2.1. Common Serializing Idioms
function encode(str) {
    let encoded = '';

    // If the character is the first character and is a "-" (U+002D),
    // and there is no second character, then the escaped character.
    // Note: That's means a single dash string "-" return as escaped dash,
    // so move the condition out of the main loop
    if (str.length === 1 && str.charCodeAt(0) === 0x002D) {
        return '\\-';
    }

    // To serialize an identifier means to create a string represented
    // by the concatenation of, for each character of the identifier:
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if (code === 0x0000) {
            encoded += '\uFFFD';
            continue;
        }

        if (
            // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F ...
            // Note: Do not compare with 0x0001 since 0x0000 is precessed before
            code <= 0x001F || code === 0x007F ||
            // [or] ... is in the range [0-9] (U+0030 to U+0039),
            (code >= 0x0030 && code <= 0x0039 && (
                // If the character is the first character ...
                i === 0 ||
                // If the character is the second character ... and the first character is a "-" (U+002D)
                i === 1 && str.charCodeAt(0) === 0x002D
            ))
        ) {
            // ... then the character escaped as code point.
            encoded += '\\' + code.toString(16) + ' ';
            continue;
        }

        // If the character is not handled by one of the above rules and is greater
        // than or equal to U+0080, is "-" (U+002D) or "_" (U+005F), or is in one
        // of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to U+005A),
        // or \[a-z] (U+0061 to U+007A), then the character itself.
        if ((0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isName)(code)) {
            encoded += str.charAt(i);
        } else {
            // Otherwise, the escaped character.
            encoded += '\\' + str.charAt(i);
        }
    }

    return encoded;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/utils/names.js":
/*!******************************************************!*\
  !*** ../../node_modules/css-tree/lib/utils/names.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isCustomProperty": () => (/* binding */ isCustomProperty),
/* harmony export */   "keyword": () => (/* binding */ keyword),
/* harmony export */   "property": () => (/* binding */ property),
/* harmony export */   "vendorPrefix": () => (/* binding */ vendorPrefix)
/* harmony export */ });
const keywords = new Map();
const properties = new Map();
const HYPHENMINUS = 45; // '-'.charCodeAt()

const keyword = getKeywordDescriptor;
const property = getPropertyDescriptor;
const vendorPrefix = getVendorPrefix;
function isCustomProperty(str, offset) {
    offset = offset || 0;

    return str.length - offset >= 2 &&
           str.charCodeAt(offset) === HYPHENMINUS &&
           str.charCodeAt(offset + 1) === HYPHENMINUS;
}

function getVendorPrefix(str, offset) {
    offset = offset || 0;

    // verdor prefix should be at least 3 chars length
    if (str.length - offset >= 3) {
        // vendor prefix starts with hyper minus following non-hyper minus
        if (str.charCodeAt(offset) === HYPHENMINUS &&
            str.charCodeAt(offset + 1) !== HYPHENMINUS) {
            // vendor prefix should contain a hyper minus at the ending
            const secondDashIndex = str.indexOf('-', offset + 2);

            if (secondDashIndex !== -1) {
                return str.substring(offset, secondDashIndex + 1);
            }
        }
    }

    return '';
}

function getKeywordDescriptor(keyword) {
    if (keywords.has(keyword)) {
        return keywords.get(keyword);
    }

    const name = keyword.toLowerCase();
    let descriptor = keywords.get(name);

    if (descriptor === undefined) {
        const custom = isCustomProperty(name, 0);
        const vendor = !custom ? getVendorPrefix(name, 0) : '';
        descriptor = Object.freeze({
            basename: name.substr(vendor.length),
            name,
            prefix: vendor,
            vendor,
            custom
        });
    }

    keywords.set(keyword, descriptor);

    return descriptor;
}

function getPropertyDescriptor(property) {
    if (properties.has(property)) {
        return properties.get(property);
    }

    let name = property;
    let hack = property[0];

    if (hack === '/') {
        hack = property[1] === '/' ? '//' : '/';
    } else if (hack !== '_' &&
               hack !== '*' &&
               hack !== '$' &&
               hack !== '#' &&
               hack !== '+' &&
               hack !== '&') {
        hack = '';
    }

    const custom = isCustomProperty(name, hack.length);

    // re-use result when possible (the same as for lower case)
    if (!custom) {
        name = name.toLowerCase();
        if (properties.has(name)) {
            const descriptor = properties.get(name);
            properties.set(property, descriptor);
            return descriptor;
        }
    }

    const vendor = !custom ? getVendorPrefix(name, hack.length) : '';
    const prefix = name.substr(0, hack.length + vendor.length);
    const descriptor = Object.freeze({
        basename: name.substr(prefix.length),
        name: name.substr(hack.length),
        hack,
        vendor,
        prefix,
        custom
    });

    properties.set(property, descriptor);

    return descriptor;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/utils/string.js":
/*!*******************************************************!*\
  !*** ../../node_modules/css-tree/lib/utils/string.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const REVERSE_SOLIDUS = 0x005c; // U+005C REVERSE SOLIDUS (\)
const QUOTATION_MARK = 0x0022;  // "
const APOSTROPHE = 0x0027;      // '

function decode(str) {
    const len = str.length;
    const firstChar = str.charCodeAt(0);
    const start = firstChar === QUOTATION_MARK || firstChar === APOSTROPHE ? 1 : 0;
    const end = start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar ? len - 2 : len - 1;
    let decoded = '';

    for (let i = start; i <= end; i++) {
        let code = str.charCodeAt(i);

        if (code === REVERSE_SOLIDUS) {
            // special case at the ending
            if (i === end) {
                // if the next input code point is EOF, do nothing
                // otherwise include last quote as escaped
                if (i !== len - 1) {
                    decoded = str.substr(i + 1);
                }
                break;
            }

            code = str.charCodeAt(++i);

            // consume escaped
            if ((0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isValidEscape)(REVERSE_SOLIDUS, code)) {
                const escapeStart = i - 1;
                const escapeEnd = (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.consumeEscaped)(str, escapeStart);

                i = escapeEnd - 1;
                decoded += (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.decodeEscaped)(str.substring(escapeStart + 1, escapeEnd));
            } else {
                // \r\n
                if (code === 0x000d && str.charCodeAt(i + 1) === 0x000a) {
                    i++;
                }
            }
        } else {
            decoded += str[i];
        }
    }

    return decoded;
}

// https://drafts.csswg.org/cssom/#serialize-a-string
// § 2.1. Common Serializing Idioms
function encode(str, apostrophe) {
    const quote = apostrophe ? '\'' : '"';
    const quoteCode = apostrophe ? APOSTROPHE : QUOTATION_MARK;
    let encoded = '';
    let wsBeforeHexIsNeeded = false;

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if (code === 0x0000) {
            encoded += '\uFFFD';
            continue;
        }

        // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F,
        // the character escaped as code point.
        // Note: Do not compare with 0x0001 since 0x0000 is precessed before
        if (code <= 0x001f || code === 0x007F) {
            encoded += '\\' + code.toString(16);
            wsBeforeHexIsNeeded = true;
            continue;
        }

        // If the character is '"' (U+0022) or "\" (U+005C), the escaped character.
        if (code === quoteCode || code === REVERSE_SOLIDUS) {
            encoded += '\\' + str.charAt(i);
            wsBeforeHexIsNeeded = false;
        } else {
            if (wsBeforeHexIsNeeded && ((0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isHexDigit)(code) || (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(code))) {
                encoded += ' ';
            }

            // Otherwise, the character itself.
            encoded += str.charAt(i);
            wsBeforeHexIsNeeded = false;
        }
    }

    return quote + encoded + quote;
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/utils/url.js":
/*!****************************************************!*\
  !*** ../../node_modules/css-tree/lib/utils/url.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
/* harmony import */ var _tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokenizer/index.js */ "../../node_modules/css-tree/lib/tokenizer/index.js");


const SPACE = 0x0020;            // U+0020 SPACE
const REVERSE_SOLIDUS = 0x005c;  // U+005C REVERSE SOLIDUS (\)
const QUOTATION_MARK = 0x0022;   // "
const APOSTROPHE = 0x0027;       // '
const LEFTPARENTHESIS = 0x0028;  // U+0028 LEFT PARENTHESIS (()
const RIGHTPARENTHESIS = 0x0029; // U+0029 RIGHT PARENTHESIS ())

function decode(str) {
    const len = str.length;
    let start = 4; // length of "url("
    let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS ? len - 2 : len - 1;
    let decoded = '';

    while (start < end && (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(str.charCodeAt(start))) {
        start++;
    }

    while (start < end && (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(str.charCodeAt(end))) {
        end--;
    }

    for (let i = start; i <= end; i++) {
        let code = str.charCodeAt(i);

        if (code === REVERSE_SOLIDUS) {
            // special case at the ending
            if (i === end) {
                // if the next input code point is EOF, do nothing
                // otherwise include last left parenthesis as escaped
                if (i !== len - 1) {
                    decoded = str.substr(i + 1);
                }
                break;
            }

            code = str.charCodeAt(++i);

            // consume escaped
            if ((0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isValidEscape)(REVERSE_SOLIDUS, code)) {
                const escapeStart = i - 1;
                const escapeEnd = (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.consumeEscaped)(str, escapeStart);

                i = escapeEnd - 1;
                decoded += (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.decodeEscaped)(str.substring(escapeStart + 1, escapeEnd));
            } else {
                // \r\n
                if (code === 0x000d && str.charCodeAt(i + 1) === 0x000a) {
                    i++;
                }
            }
        } else {
            decoded += str[i];
        }
    }

    return decoded;
}

function encode(str) {
    let encoded = '';
    let wsBeforeHexIsNeeded = false;

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if (code === 0x0000) {
            encoded += '\uFFFD';
            continue;
        }

        // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F,
        // the character escaped as code point.
        // Note: Do not compare with 0x0001 since 0x0000 is precessed before
        if (code <= 0x001f || code === 0x007F) {
            encoded += '\\' + code.toString(16);
            wsBeforeHexIsNeeded = true;
            continue;
        }

        if (code === SPACE ||
            code === REVERSE_SOLIDUS ||
            code === QUOTATION_MARK ||
            code === APOSTROPHE ||
            code === LEFTPARENTHESIS ||
            code === RIGHTPARENTHESIS) {
            encoded += '\\' + str.charAt(i);
            wsBeforeHexIsNeeded = false;
        } else {
            if (wsBeforeHexIsNeeded && (0,_tokenizer_index_js__WEBPACK_IMPORTED_MODULE_0__.isHexDigit)(code)) {
                encoded += ' ';
            }

            encoded += str.charAt(i);
            wsBeforeHexIsNeeded = false;
        }
    }

    return 'url(' + encoded + ')';
}


/***/ }),

/***/ "../../node_modules/css-tree/lib/walker/create.js":
/*!********************************************************!*\
  !*** ../../node_modules/css-tree/lib/walker/create.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createWalker": () => (/* binding */ createWalker)
/* harmony export */ });
const { hasOwnProperty } = Object.prototype;
const noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

function invokeForType(fn, type) {
    return function(node, item, list) {
        if (node.type === type) {
            fn.call(this, node, item, list);
        }
    };
}

function getWalkersFromStructure(name, nodeType) {
    const structure = nodeType.structure;
    const walkers = [];

    for (const key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        let fieldTypes = structure[key];
        const walker = {
            name: key,
            type: false,
            nullable: false
        };

        if (!Array.isArray(fieldTypes)) {
            fieldTypes = [fieldTypes];
        }

        for (const fieldType of fieldTypes) {
            if (fieldType === null) {
                walker.nullable = true;
            } else if (typeof fieldType === 'string') {
                walker.type = 'node';
            } else if (Array.isArray(fieldType)) {
                walker.type = 'list';
            }
        }

        if (walker.type) {
            walkers.push(walker);
        }
    }

    if (walkers.length) {
        return {
            context: nodeType.walkContext,
            fields: walkers
        };
    }

    return null;
}

function getTypesFromConfig(config) {
    const types = {};

    for (const name in config.node) {
        if (hasOwnProperty.call(config.node, name)) {
            const nodeType = config.node[name];

            if (!nodeType.structure) {
                throw new Error('Missed `structure` field in `' + name + '` node type definition');
            }

            types[name] = getWalkersFromStructure(name, nodeType);
        }
    }

    return types;
}

function createTypeIterator(config, reverse) {
    const fields = config.fields.slice();
    const contextName = config.context;
    const useContext = typeof contextName === 'string';

    if (reverse) {
        fields.reverse();
    }

    return function(node, context, walk, walkReducer) {
        let prevContextValue;

        if (useContext) {
            prevContextValue = context[contextName];
            context[contextName] = node;
        }

        for (const field of fields) {
            const ref = node[field.name];

            if (!field.nullable || ref) {
                if (field.type === 'list') {
                    const breakWalk = reverse
                        ? ref.reduceRight(walkReducer, false)
                        : ref.reduce(walkReducer, false);

                    if (breakWalk) {
                        return true;
                    }
                } else if (walk(ref)) {
                    return true;
                }
            }
        }

        if (useContext) {
            context[contextName] = prevContextValue;
        }
    };
}

function createFastTraveralMap({
    StyleSheet,
    Atrule,
    Rule,
    Block,
    DeclarationList
}) {
    return {
        Atrule: {
            StyleSheet,
            Atrule,
            Rule,
            Block
        },
        Rule: {
            StyleSheet,
            Atrule,
            Rule,
            Block
        },
        Declaration: {
            StyleSheet,
            Atrule,
            Rule,
            Block,
            DeclarationList
        }
    };
}

function createWalker(config) {
    const types = getTypesFromConfig(config);
    const iteratorsNatural = {};
    const iteratorsReverse = {};
    const breakWalk = Symbol('break-walk');
    const skipNode = Symbol('skip-node');

    for (const name in types) {
        if (hasOwnProperty.call(types, name) && types[name] !== null) {
            iteratorsNatural[name] = createTypeIterator(types[name], false);
            iteratorsReverse[name] = createTypeIterator(types[name], true);
        }
    }

    const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
    const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);

    const walk = function(root, options) {
        function walkNode(node, item, list) {
            const enterRet = enter.call(context, node, item, list);

            if (enterRet === breakWalk) {
                return true;
            }

            if (enterRet === skipNode) {
                return false;
            }

            if (iterators.hasOwnProperty(node.type)) {
                if (iterators[node.type](node, context, walkNode, walkReducer)) {
                    return true;
                }
            }

            if (leave.call(context, node, item, list) === breakWalk) {
                return true;
            }

            return false;
        }

        let enter = noop;
        let leave = noop;
        let iterators = iteratorsNatural;
        let walkReducer = (ret, data, item, list) => ret || walkNode(data, item, list);
        const context = {
            break: breakWalk,
            skip: skipNode,

            root,
            stylesheet: null,
            atrule: null,
            atrulePrelude: null,
            rule: null,
            selector: null,
            block: null,
            declaration: null,
            function: null
        };

        if (typeof options === 'function') {
            enter = options;
        } else if (options) {
            enter = ensureFunction(options.enter);
            leave = ensureFunction(options.leave);

            if (options.reverse) {
                iterators = iteratorsReverse;
            }

            if (options.visit) {
                if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) {
                    iterators = options.reverse
                        ? fastTraversalIteratorsReverse[options.visit]
                        : fastTraversalIteratorsNatural[options.visit];
                } else if (!types.hasOwnProperty(options.visit)) {
                    throw new Error('Bad value `' + options.visit + '` for `visit` option (should be: ' + Object.keys(types).sort().join(', ') + ')');
                }

                enter = invokeForType(enter, options.visit);
                leave = invokeForType(leave, options.visit);
            }
        }

        if (enter === noop && leave === noop) {
            throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
        }

        walkNode(root);
    };

    walk.break = breakWalk;
    walk.skip = skipNode;

    walk.find = function(ast, fn) {
        let found = null;

        walk(ast, function(node, item, list) {
            if (fn.call(this, node, item, list)) {
                found = node;
                return breakWalk;
            }
        });

        return found;
    };

    walk.findLast = function(ast, fn) {
        let found = null;

        walk(ast, {
            reverse: true,
            enter: function(node, item, list) {
                if (fn.call(this, node, item, list)) {
                    found = node;
                    return breakWalk;
                }
            }
        });

        return found;
    };

    walk.findAll = function(ast, fn) {
        const found = [];

        walk(ast, function(node, item, list) {
            if (fn.call(this, node, item, list)) {
                found.push(node);
            }
        });

        return found;
    };

    return walk;
};


/***/ }),

/***/ "../../node_modules/csso/dist/version.js":
/*!***********************************************!*\
  !*** ../../node_modules/csso/dist/version.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "5.0.3";

/***/ }),

/***/ "../../node_modules/csso/lib/clean/Atrule.js":
/*!***************************************************!*\
  !*** ../../node_modules/csso/lib/clean/Atrule.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanAtrule)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/csso/lib/clean/utils.js");



function cleanAtrule(node, item, list) {
    if (node.block) {
        // otherwise removed at-rule don't prevent @import for removal
        if (this.stylesheet !== null) {
            this.stylesheet.firstAtrulesAllowed = false;
        }

        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasNoChildren)(node.block)) {
            list.remove(item);
            return;
        }
    }

    switch (node.name) {
        case 'charset':
            if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasNoChildren)(node.prelude)) {
                list.remove(item);
                return;
            }

            // if there is any rule before @charset -> remove it
            if (item.prev) {
                list.remove(item);
                return;
            }

            break;

        case 'import':
            if (this.stylesheet === null || !this.stylesheet.firstAtrulesAllowed) {
                list.remove(item);
                return;
            }

            // if there are some rules that not an @import or @charset before @import
            // remove it
            list.prevUntil(item.prev, function(rule) {
                if (rule.type === 'Atrule') {
                    if (rule.name === 'import' || rule.name === 'charset') {
                        return;
                    }
                }

                this.root.firstAtrulesAllowed = false;
                list.remove(item);

                return true;
            }, this);

            break;

        default: {
            const name = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.keyword)(node.name).basename;

            if (name === 'keyframes' ||
                name === 'media' ||
                name === 'supports') {

                // drop at-rule with no prelude
                if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasNoChildren)(node.prelude) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasNoChildren)(node.block)) {
                    list.remove(item);
                }
            }
        }
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/Comment.js":
/*!****************************************************!*\
  !*** ../../node_modules/csso/lib/clean/Comment.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanComment)
/* harmony export */ });
function cleanComment(data, item, list) {
    list.remove(item);
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/Declaration.js":
/*!********************************************************!*\
  !*** ../../node_modules/csso/lib/clean/Declaration.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanDeclartion)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


function cleanDeclartion(node, item, list) {
    if (node.value.children && node.value.children.isEmpty) {
        list.remove(item);
        return;
    }

    if ((0,css_tree__WEBPACK_IMPORTED_MODULE_0__.property)(node.property).custom) {
        if (/\S/.test(node.value.value)) {
            node.value.value = node.value.value.trim();
        }
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/Raw.js":
/*!************************************************!*\
  !*** ../../node_modules/csso/lib/clean/Raw.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanRaw)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/csso/lib/clean/utils.js");


function cleanRaw(node, item, list) {
    // raw in stylesheet or block children
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNodeChildrenList)(this.stylesheet, list) ||
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNodeChildrenList)(this.block, list)) {
        list.remove(item);
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/Rule.js":
/*!*************************************************!*\
  !*** ../../node_modules/csso/lib/clean/Rule.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanRule)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/csso/lib/clean/utils.js");



const { hasOwnProperty } = Object.prototype;

function cleanUnused(selectorList, usageData) {
    selectorList.children.forEach((selector, item, list) => {
        let shouldRemove = false;

        (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(selector, function(node) {
            // ignore nodes in nested selectors
            if (this.selector === null || this.selector === selectorList) {
                switch (node.type) {
                    case 'SelectorList':
                        // TODO: remove toLowerCase when pseudo selectors will be normalized
                        // ignore selectors inside :not()
                        if (this.function === null || this.function.name.toLowerCase() !== 'not') {
                            if (cleanUnused(node, usageData)) {
                                shouldRemove = true;
                            }
                        }
                        break;

                    case 'ClassSelector':
                        if (usageData.whitelist !== null &&
                            usageData.whitelist.classes !== null &&
                            !hasOwnProperty.call(usageData.whitelist.classes, node.name)) {
                            shouldRemove = true;
                        }
                        if (usageData.blacklist !== null &&
                            usageData.blacklist.classes !== null &&
                            hasOwnProperty.call(usageData.blacklist.classes, node.name)) {
                            shouldRemove = true;
                        }
                        break;

                    case 'IdSelector':
                        if (usageData.whitelist !== null &&
                            usageData.whitelist.ids !== null &&
                            !hasOwnProperty.call(usageData.whitelist.ids, node.name)) {
                            shouldRemove = true;
                        }
                        if (usageData.blacklist !== null &&
                            usageData.blacklist.ids !== null &&
                            hasOwnProperty.call(usageData.blacklist.ids, node.name)) {
                            shouldRemove = true;
                        }
                        break;

                    case 'TypeSelector':
                        // TODO: remove toLowerCase when type selectors will be normalized
                        // ignore universal selectors
                        if (node.name.charAt(node.name.length - 1) !== '*') {
                            if (usageData.whitelist !== null &&
                                usageData.whitelist.tags !== null &&
                                !hasOwnProperty.call(usageData.whitelist.tags, node.name.toLowerCase())) {
                                shouldRemove = true;
                            }
                            if (usageData.blacklist !== null &&
                                usageData.blacklist.tags !== null &&
                                hasOwnProperty.call(usageData.blacklist.tags, node.name.toLowerCase())) {
                                shouldRemove = true;
                            }
                        }
                        break;
                }
            }
        });

        if (shouldRemove) {
            list.remove(item);
        }
    });

    return selectorList.children.isEmpty;
}

function cleanRule(node, item, list, options) {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasNoChildren)(node.prelude) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasNoChildren)(node.block)) {
        list.remove(item);
        return;
    }

    const { usage } = options;

    if (usage && (usage.whitelist !== null || usage.blacklist !== null)) {
        cleanUnused(node.prelude, usage);

        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasNoChildren)(node.prelude)) {
            list.remove(item);
            return;
        }
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/TypeSelector.js":
/*!*********************************************************!*\
  !*** ../../node_modules/csso/lib/clean/TypeSelector.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanTypeSelector)
/* harmony export */ });
// remove useless universal selector
function cleanTypeSelector(node, item, list) {
    const name = item.data.name;

    // check it's a non-namespaced universal selector
    if (name !== '*') {
        return;
    }

    // remove when universal selector before other selectors
    const nextType = item.next && item.next.data.type;
    if (nextType === 'IdSelector' ||
        nextType === 'ClassSelector' ||
        nextType === 'AttributeSelector' ||
        nextType === 'PseudoClassSelector' ||
        nextType === 'PseudoElementSelector') {
        list.remove(item);
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/WhiteSpace.js":
/*!*******************************************************!*\
  !*** ../../node_modules/csso/lib/clean/WhiteSpace.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanWhitespace)
/* harmony export */ });
function cleanWhitespace(node, item, list) {
    list.remove(item);
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/index.js":
/*!**************************************************!*\
  !*** ../../node_modules/csso/lib/clean/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _Atrule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Atrule.js */ "../../node_modules/csso/lib/clean/Atrule.js");
/* harmony import */ var _Comment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Comment.js */ "../../node_modules/csso/lib/clean/Comment.js");
/* harmony import */ var _Declaration_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Declaration.js */ "../../node_modules/csso/lib/clean/Declaration.js");
/* harmony import */ var _Raw_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Raw.js */ "../../node_modules/csso/lib/clean/Raw.js");
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Rule.js */ "../../node_modules/csso/lib/clean/Rule.js");
/* harmony import */ var _TypeSelector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TypeSelector.js */ "../../node_modules/csso/lib/clean/TypeSelector.js");
/* harmony import */ var _WhiteSpace_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./WhiteSpace.js */ "../../node_modules/csso/lib/clean/WhiteSpace.js");









const handlers = {
    Atrule: _Atrule_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    Comment: _Comment_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    Declaration: _Declaration_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    Raw: _Raw_js__WEBPACK_IMPORTED_MODULE_4__["default"],
    Rule: _Rule_js__WEBPACK_IMPORTED_MODULE_5__["default"],
    TypeSelector: _TypeSelector_js__WEBPACK_IMPORTED_MODULE_6__["default"],
    WhiteSpace: _WhiteSpace_js__WEBPACK_IMPORTED_MODULE_7__["default"]
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(ast, options) {
    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        leave(node, item, list) {
            if (handlers.hasOwnProperty(node.type)) {
                handlers[node.type].call(this, node, item, list, options);
            }
        }
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/clean/utils.js":
/*!**************************************************!*\
  !*** ../../node_modules/csso/lib/clean/utils.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasNoChildren": () => (/* binding */ hasNoChildren),
/* harmony export */   "isNodeChildrenList": () => (/* binding */ isNodeChildrenList)
/* harmony export */ });
function hasNoChildren(node) {
    return !node || !node.children || node.children.isEmpty;
}

function isNodeChildrenList(node, list) {
    return node !== null && node.children === list;
}


/***/ }),

/***/ "../../node_modules/csso/lib/compress.js":
/*!***********************************************!*\
  !*** ../../node_modules/csso/lib/compress.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compress)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _usage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usage.js */ "../../node_modules/csso/lib/usage.js");
/* harmony import */ var _clean_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clean/index.js */ "../../node_modules/csso/lib/clean/index.js");
/* harmony import */ var _replace_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./replace/index.js */ "../../node_modules/csso/lib/replace/index.js");
/* harmony import */ var _restructure_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./restructure/index.js */ "../../node_modules/csso/lib/restructure/index.js");






function readChunk(input, specialComments) {
    const children = new css_tree__WEBPACK_IMPORTED_MODULE_0__.List();
    let nonSpaceTokenInBuffer = false;
    let protectedComment;

    input.nextUntil(input.head, (node, item, list) => {
        if (node.type === 'Comment') {
            if (!specialComments || node.value.charAt(0) !== '!') {
                list.remove(item);
                return;
            }

            if (nonSpaceTokenInBuffer || protectedComment) {
                return true;
            }

            list.remove(item);
            protectedComment = node;

            return;
        }

        if (node.type !== 'WhiteSpace') {
            nonSpaceTokenInBuffer = true;
        }

        children.insert(list.remove(item));
    });

    return {
        comment: protectedComment,
        stylesheet: {
            type: 'StyleSheet',
            loc: null,
            children
        }
    };
}

function compressChunk(ast, firstAtrulesAllowed, num, options) {
    options.logger(`Compress block #${num}`, null, true);

    let seed = 1;

    if (ast.type === 'StyleSheet') {
        ast.firstAtrulesAllowed = firstAtrulesAllowed;
        ast.id = seed++;
    }

    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Atrule',
        enter(node) {
            if (node.block !== null) {
                node.block.id = seed++;
            }
        }
    });
    options.logger('init', ast);

    // remove redundant
    (0,_clean_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(ast, options);
    options.logger('clean', ast);

    // replace nodes for shortened forms
    (0,_replace_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(ast, options);
    options.logger('replace', ast);

    // structure optimisations
    if (options.restructuring) {
        (0,_restructure_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(ast, options);
    }

    return ast;
}

function getCommentsOption(options) {
    let comments = 'comments' in options ? options.comments : 'exclamation';

    if (typeof comments === 'boolean') {
        comments = comments ? 'exclamation' : false;
    } else if (comments !== 'exclamation' && comments !== 'first-exclamation') {
        comments = false;
    }

    return comments;
}

function getRestructureOption(options) {
    if ('restructure' in options) {
        return options.restructure;
    }

    return 'restructuring' in options ? options.restructuring : true;
}

function wrapBlock(block) {
    return new css_tree__WEBPACK_IMPORTED_MODULE_0__.List().appendData({
        type: 'Rule',
        loc: null,
        prelude: {
            type: 'SelectorList',
            loc: null,
            children: new css_tree__WEBPACK_IMPORTED_MODULE_0__.List().appendData({
                type: 'Selector',
                loc: null,
                children: new css_tree__WEBPACK_IMPORTED_MODULE_0__.List().appendData({
                    type: 'TypeSelector',
                    loc: null,
                    name: 'x'
                })
            })
        },
        block
    });
}

function compress(ast, options) {
    ast = ast || { type: 'StyleSheet', loc: null, children: new css_tree__WEBPACK_IMPORTED_MODULE_0__.List() };
    options = options || {};

    const compressOptions = {
        logger: typeof options.logger === 'function' ? options.logger : function() {},
        restructuring: getRestructureOption(options),
        forceMediaMerge: Boolean(options.forceMediaMerge),
        usage: options.usage ? (0,_usage_js__WEBPACK_IMPORTED_MODULE_1__.buildIndex)(options.usage) : false
    };
    const output = new css_tree__WEBPACK_IMPORTED_MODULE_0__.List();
    let specialComments = getCommentsOption(options);
    let firstAtrulesAllowed = true;
    let input;
    let chunk;
    let chunkNum = 1;
    let chunkChildren;

    if (options.clone) {
        ast = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.clone)(ast);
    }

    if (ast.type === 'StyleSheet') {
        input = ast.children;
        ast.children = output;
    } else {
        input = wrapBlock(ast);
    }

    do {
        chunk = readChunk(input, Boolean(specialComments));
        compressChunk(chunk.stylesheet, firstAtrulesAllowed, chunkNum++, compressOptions);
        chunkChildren = chunk.stylesheet.children;

        if (chunk.comment) {
            // add \n before comment if there is another content in output
            if (!output.isEmpty) {
                output.insert(css_tree__WEBPACK_IMPORTED_MODULE_0__.List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }

            output.insert(css_tree__WEBPACK_IMPORTED_MODULE_0__.List.createItem(chunk.comment));

            // add \n after comment if chunk is not empty
            if (!chunkChildren.isEmpty) {
                output.insert(css_tree__WEBPACK_IMPORTED_MODULE_0__.List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }
        }

        if (firstAtrulesAllowed && !chunkChildren.isEmpty) {
            const lastRule = chunkChildren.last;

            if (lastRule.type !== 'Atrule' ||
               (lastRule.name !== 'import' && lastRule.name !== 'charset')) {
                firstAtrulesAllowed = false;
            }
        }

        if (specialComments !== 'exclamation') {
            specialComments = false;
        }

        output.appendList(chunkChildren);
    } while (!input.isEmpty);

    return {
        ast
    };
};


/***/ }),

/***/ "../../node_modules/csso/lib/index.js":
/*!********************************************!*\
  !*** ../../node_modules/csso/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "minify": () => (/* binding */ minifyStylesheet),
/* harmony export */   "minifyBlock": () => (/* binding */ minifyBlock),
/* harmony export */   "syntax": () => (/* reexport module object */ _syntax_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "utils": () => (/* reexport module object */ _utils_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "version": () => (/* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_0__.version)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version.js */ "../../node_modules/csso/dist/version.js");
/* harmony import */ var _syntax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./syntax.js */ "../../node_modules/csso/lib/syntax.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/csso/lib/utils.js");




const { parse, generate, compress } = _syntax_js__WEBPACK_IMPORTED_MODULE_1__;

function debugOutput(name, options, startTime, data) {
    if (options.debug) {
        console.error(`## ${name} done in %d ms\n`, Date.now() - startTime);
    }

    return data;
}

function createDefaultLogger(level) {
    let lastDebug;

    return function logger(title, ast) {
        let line = title;

        if (ast) {
            line = `[${((Date.now() - lastDebug) / 1000).toFixed(3)}s] ${line}`;
        }

        if (level > 1 && ast) {
            let css = generate(ast);

            // when level 2, limit css to 256 symbols
            if (level === 2 && css.length > 256) {
                css = css.substr(0, 256) + '...';
            }

            line += `\n  ${css}\n`;
        }

        console.error(line);
        lastDebug = Date.now();
    };
}

function buildCompressOptions(options) {
    options = { ...options };

    if (typeof options.logger !== 'function' && options.debug) {
        options.logger = createDefaultLogger(options.debug);
    }

    return options;
}

function runHandler(ast, options, handlers) {
    if (!Array.isArray(handlers)) {
        handlers = [handlers];
    }

    handlers.forEach(fn => fn(ast, options));
}

function minify(context, source, options) {
    options = options || {};

    const filename = options.filename || '<unknown>';
    let result;

    // parse
    const ast = debugOutput('parsing', options, Date.now(),
        parse(source, {
            context,
            filename,
            positions: Boolean(options.sourceMap)
        })
    );

    // before compress handlers
    if (options.beforeCompress) {
        debugOutput('beforeCompress', options, Date.now(),
            runHandler(ast, options, options.beforeCompress)
        );
    }

    // compress
    const compressResult = debugOutput('compress', options, Date.now(),
        compress(ast, buildCompressOptions(options))
    );

    // after compress handlers
    if (options.afterCompress) {
        debugOutput('afterCompress', options, Date.now(),
            runHandler(compressResult, options, options.afterCompress)
        );
    }

    // generate
    if (options.sourceMap) {
        result = debugOutput('generate(sourceMap: true)', options, Date.now(), (() => {
            const tmp = generate(compressResult.ast, { sourceMap: true });

            tmp.map._file = filename; // since other tools can relay on file in source map transform chain
            tmp.map.setSourceContent(filename, source);

            return tmp;
        })());
    } else {
        result = debugOutput('generate', options, Date.now(), {
            css: generate(compressResult.ast),
            map: null
        });
    }

    return result;
}

function minifyStylesheet(source, options) {
    return minify('stylesheet', source, options);
}

function minifyBlock(source, options) {
    return minify('declarationList', source, options);
}




/***/ }),

/***/ "../../node_modules/csso/lib/replace/Atrule.js":
/*!*****************************************************!*\
  !*** ../../node_modules/csso/lib/replace/Atrule.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _atrule_keyframes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atrule/keyframes.js */ "../../node_modules/csso/lib/replace/atrule/keyframes.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
    // compress @keyframe selectors
    if ((0,css_tree__WEBPACK_IMPORTED_MODULE_0__.keyword)(node.name).basename === 'keyframes') {
        (0,_atrule_keyframes_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node);
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/AttributeSelector.js":
/*!****************************************************************!*\
  !*** ../../node_modules/csso/lib/replace/AttributeSelector.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Can unquote attribute detection
// Adopted implementation of Mathias Bynens
// https://github.com/mathiasbynens/mothereff.in/blob/master/unquoted-attributes/eff.js
const blockUnquoteRx = /^(-?\d|--)|[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/;

function canUnquote(value) {
    if (value === '' || value === '-') {
        return false;
    }

    return !blockUnquoteRx.test(value);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
    const attrValue = node.value;

    if (!attrValue || attrValue.type !== 'String') {
        return;
    }

    if (canUnquote(attrValue.value)) {
        node.value = {
            type: 'Identifier',
            loc: attrValue.loc,
            name: attrValue.value
        };
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/Dimension.js":
/*!********************************************************!*\
  !*** ../../node_modules/csso/lib/replace/Dimension.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compressDimension)
/* harmony export */ });
/* harmony import */ var _Number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Number.js */ "../../node_modules/csso/lib/replace/Number.js");


const MATH_FUNCTIONS = new Set([
    'calc',
    'min',
    'max',
    'clamp'
]);
const LENGTH_UNIT = new Set([
    // absolute length units
    'px',
    'mm',
    'cm',
    'in',
    'pt',
    'pc',

    // relative length units
    'em',
    'ex',
    'ch',
    'rem',

    // viewport-percentage lengths
    'vh',
    'vw',
    'vmin',
    'vmax',
    'vm'
]);

function compressDimension(node, item) {
    const value = (0,_Number_js__WEBPACK_IMPORTED_MODULE_0__.packNumber)(node.value);

    node.value = value;

    if (value === '0' && this.declaration !== null && this.atrulePrelude === null) {
        const unit = node.unit.toLowerCase();

        // only length values can be compressed
        if (!LENGTH_UNIT.has(unit)) {
            return;
        }

        // issue #362: shouldn't remove unit in -ms-flex since it breaks flex in IE10/11
        // issue #200: shouldn't remove unit in flex since it breaks flex in IE10/11
        if (this.declaration.property === '-ms-flex' ||
            this.declaration.property === 'flex') {
            return;
        }

        // issue #222: don't remove units inside calc
        if (this.function && MATH_FUNCTIONS.has(this.function.name)) {
            return;
        }

        item.data = {
            type: 'Number',
            loc: node.loc,
            value
        };
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/Number.js":
/*!*****************************************************!*\
  !*** ../../node_modules/csso/lib/replace/Number.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Number": () => (/* binding */ Number),
/* harmony export */   "packNumber": () => (/* binding */ packNumber)
/* harmony export */ });
const OMIT_PLUSSIGN = /^(?:\+|(-))?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/;
const KEEP_PLUSSIGN = /^([\+\-])?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/;
const unsafeToRemovePlusSignAfter = new Set([
    'Dimension',
    'Hash',
    'Identifier',
    'Number',
    'Raw',
    'UnicodeRange'
]);

function packNumber(value, item) {
    // omit plus sign only if no prev or prev is safe type
    const regexp = item && item.prev !== null && unsafeToRemovePlusSignAfter.has(item.prev.data.type)
        ? KEEP_PLUSSIGN
        : OMIT_PLUSSIGN;

    // 100 -> '100'
    // 00100 -> '100'
    // +100 -> '100'
    // -100 -> '-100'
    // 0.123 -> '.123'
    // 0.12300 -> '.123'
    // 0.0 -> ''
    // 0 -> ''
    // -0 -> '-'
    value = String(value).replace(regexp, '$1$2$3');

    if (value === '' || value === '-') {
        value = '0';
    }
    // FIXME: is it solution simplier?
    // value = String(Number(value)).replace(/^(-?)0+\./, '$1.');

    return value;
}

function Number(node) {
    node.value = packNumber(node.value);
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/Percentage.js":
/*!*********************************************************!*\
  !*** ../../node_modules/csso/lib/replace/Percentage.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compressPercentage)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _Number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Number.js */ "../../node_modules/csso/lib/replace/Number.js");



const blacklist = new Set([
    // see https://github.com/jakubpawlowicz/clean-css/issues/957
    'width',
    'min-width',
    'max-width',
    'height',
    'min-height',
    'max-height',

    // issue #410: Don’t remove units in flex-basis value for (-ms-)flex shorthand
    // issue #362: shouldn't remove unit in -ms-flex since it breaks flex in IE10/11
    // issue #200: shouldn't remove unit in flex since it breaks flex in IE10/11
    'flex',
    '-ms-flex'
]);

function compressPercentage(node, item) {
    node.value = (0,_Number_js__WEBPACK_IMPORTED_MODULE_1__.packNumber)(node.value);

    if (node.value === '0' && this.declaration && !blacklist.has(this.declaration.property)) {
        // try to convert a number
        item.data = {
            type: 'Number',
            loc: node.loc,
            value: node.value
        };

        // that's ok only when new value matches on length
        if (!css_tree__WEBPACK_IMPORTED_MODULE_0__.lexer.matchDeclaration(this.declaration).isType(item.data, 'length')) {
            // otherwise rollback changes
            item.data = node;
        }
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/Url.js":
/*!**************************************************!*\
  !*** ../../node_modules/csso/lib/replace/Url.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
    // convert `\\` to `/`
    node.value = node.value.replace(/\\/g, '/');
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/Value.js":
/*!****************************************************!*\
  !*** ../../node_modules/csso/lib/replace/Value.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compressValue)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _property_font_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property/font.js */ "../../node_modules/csso/lib/replace/property/font.js");
/* harmony import */ var _property_font_weight_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property/font-weight.js */ "../../node_modules/csso/lib/replace/property/font-weight.js");
/* harmony import */ var _property_background_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./property/background.js */ "../../node_modules/csso/lib/replace/property/background.js");
/* harmony import */ var _property_border_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./property/border.js */ "../../node_modules/csso/lib/replace/property/border.js");







const handlers = {
    'font': _property_font_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    'font-weight': _property_font_weight_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    'background': _property_background_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    'border': _property_border_js__WEBPACK_IMPORTED_MODULE_4__["default"],
    'outline': _property_border_js__WEBPACK_IMPORTED_MODULE_4__["default"]
};

function compressValue(node) {
    if (!this.declaration) {
        return;
    }

    const property = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.property)(this.declaration.property);

    if (handlers.hasOwnProperty(property.basename)) {
        handlers[property.basename](node);
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/atrule/keyframes.js":
/*!***************************************************************!*\
  !*** ../../node_modules/csso/lib/replace/atrule/keyframes.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
    node.block.children.forEach((rule) => {
        rule.prelude.children.forEach((simpleselector) => {
            simpleselector.children.forEach((data, item) => {
                if (data.type === 'Percentage' && data.value === '100') {
                    item.data = {
                        type: 'TypeSelector',
                        loc: data.loc,
                        name: 'to'
                    };
                } else if (data.type === 'TypeSelector' && data.name === 'from') {
                    item.data = {
                        type: 'Percentage',
                        loc: data.loc,
                        value: '0'
                    };
                }
            });
        });
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/color.js":
/*!****************************************************!*\
  !*** ../../node_modules/csso/lib/replace/color.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compressFunction": () => (/* binding */ compressFunction),
/* harmony export */   "compressHex": () => (/* binding */ compressHex),
/* harmony export */   "compressIdent": () => (/* binding */ compressIdent)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _Number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Number.js */ "../../node_modules/csso/lib/replace/Number.js");



// http://www.w3.org/TR/css3-color/#svg-color
const NAME_TO_HEX = {
    'aliceblue': 'f0f8ff',
    'antiquewhite': 'faebd7',
    'aqua': '0ff',
    'aquamarine': '7fffd4',
    'azure': 'f0ffff',
    'beige': 'f5f5dc',
    'bisque': 'ffe4c4',
    'black': '000',
    'blanchedalmond': 'ffebcd',
    'blue': '00f',
    'blueviolet': '8a2be2',
    'brown': 'a52a2a',
    'burlywood': 'deb887',
    'cadetblue': '5f9ea0',
    'chartreuse': '7fff00',
    'chocolate': 'd2691e',
    'coral': 'ff7f50',
    'cornflowerblue': '6495ed',
    'cornsilk': 'fff8dc',
    'crimson': 'dc143c',
    'cyan': '0ff',
    'darkblue': '00008b',
    'darkcyan': '008b8b',
    'darkgoldenrod': 'b8860b',
    'darkgray': 'a9a9a9',
    'darkgrey': 'a9a9a9',
    'darkgreen': '006400',
    'darkkhaki': 'bdb76b',
    'darkmagenta': '8b008b',
    'darkolivegreen': '556b2f',
    'darkorange': 'ff8c00',
    'darkorchid': '9932cc',
    'darkred': '8b0000',
    'darksalmon': 'e9967a',
    'darkseagreen': '8fbc8f',
    'darkslateblue': '483d8b',
    'darkslategray': '2f4f4f',
    'darkslategrey': '2f4f4f',
    'darkturquoise': '00ced1',
    'darkviolet': '9400d3',
    'deeppink': 'ff1493',
    'deepskyblue': '00bfff',
    'dimgray': '696969',
    'dimgrey': '696969',
    'dodgerblue': '1e90ff',
    'firebrick': 'b22222',
    'floralwhite': 'fffaf0',
    'forestgreen': '228b22',
    'fuchsia': 'f0f',
    'gainsboro': 'dcdcdc',
    'ghostwhite': 'f8f8ff',
    'gold': 'ffd700',
    'goldenrod': 'daa520',
    'gray': '808080',
    'grey': '808080',
    'green': '008000',
    'greenyellow': 'adff2f',
    'honeydew': 'f0fff0',
    'hotpink': 'ff69b4',
    'indianred': 'cd5c5c',
    'indigo': '4b0082',
    'ivory': 'fffff0',
    'khaki': 'f0e68c',
    'lavender': 'e6e6fa',
    'lavenderblush': 'fff0f5',
    'lawngreen': '7cfc00',
    'lemonchiffon': 'fffacd',
    'lightblue': 'add8e6',
    'lightcoral': 'f08080',
    'lightcyan': 'e0ffff',
    'lightgoldenrodyellow': 'fafad2',
    'lightgray': 'd3d3d3',
    'lightgrey': 'd3d3d3',
    'lightgreen': '90ee90',
    'lightpink': 'ffb6c1',
    'lightsalmon': 'ffa07a',
    'lightseagreen': '20b2aa',
    'lightskyblue': '87cefa',
    'lightslategray': '789',
    'lightslategrey': '789',
    'lightsteelblue': 'b0c4de',
    'lightyellow': 'ffffe0',
    'lime': '0f0',
    'limegreen': '32cd32',
    'linen': 'faf0e6',
    'magenta': 'f0f',
    'maroon': '800000',
    'mediumaquamarine': '66cdaa',
    'mediumblue': '0000cd',
    'mediumorchid': 'ba55d3',
    'mediumpurple': '9370db',
    'mediumseagreen': '3cb371',
    'mediumslateblue': '7b68ee',
    'mediumspringgreen': '00fa9a',
    'mediumturquoise': '48d1cc',
    'mediumvioletred': 'c71585',
    'midnightblue': '191970',
    'mintcream': 'f5fffa',
    'mistyrose': 'ffe4e1',
    'moccasin': 'ffe4b5',
    'navajowhite': 'ffdead',
    'navy': '000080',
    'oldlace': 'fdf5e6',
    'olive': '808000',
    'olivedrab': '6b8e23',
    'orange': 'ffa500',
    'orangered': 'ff4500',
    'orchid': 'da70d6',
    'palegoldenrod': 'eee8aa',
    'palegreen': '98fb98',
    'paleturquoise': 'afeeee',
    'palevioletred': 'db7093',
    'papayawhip': 'ffefd5',
    'peachpuff': 'ffdab9',
    'peru': 'cd853f',
    'pink': 'ffc0cb',
    'plum': 'dda0dd',
    'powderblue': 'b0e0e6',
    'purple': '800080',
    'rebeccapurple': '639',
    'red': 'f00',
    'rosybrown': 'bc8f8f',
    'royalblue': '4169e1',
    'saddlebrown': '8b4513',
    'salmon': 'fa8072',
    'sandybrown': 'f4a460',
    'seagreen': '2e8b57',
    'seashell': 'fff5ee',
    'sienna': 'a0522d',
    'silver': 'c0c0c0',
    'skyblue': '87ceeb',
    'slateblue': '6a5acd',
    'slategray': '708090',
    'slategrey': '708090',
    'snow': 'fffafa',
    'springgreen': '00ff7f',
    'steelblue': '4682b4',
    'tan': 'd2b48c',
    'teal': '008080',
    'thistle': 'd8bfd8',
    'tomato': 'ff6347',
    'turquoise': '40e0d0',
    'violet': 'ee82ee',
    'wheat': 'f5deb3',
    'white': 'fff',
    'whitesmoke': 'f5f5f5',
    'yellow': 'ff0',
    'yellowgreen': '9acd32'
};

const HEX_TO_NAME = {
    '800000': 'maroon',
    '800080': 'purple',
    '808000': 'olive',
    '808080': 'gray',
    '00ffff': 'cyan',
    'f0ffff': 'azure',
    'f5f5dc': 'beige',
    'ffe4c4': 'bisque',
    '000000': 'black',
    '0000ff': 'blue',
    'a52a2a': 'brown',
    'ff7f50': 'coral',
    'ffd700': 'gold',
    '008000': 'green',
    '4b0082': 'indigo',
    'fffff0': 'ivory',
    'f0e68c': 'khaki',
    '00ff00': 'lime',
    'faf0e6': 'linen',
    '000080': 'navy',
    'ffa500': 'orange',
    'da70d6': 'orchid',
    'cd853f': 'peru',
    'ffc0cb': 'pink',
    'dda0dd': 'plum',
    'f00': 'red',
    'ff0000': 'red',
    'fa8072': 'salmon',
    'a0522d': 'sienna',
    'c0c0c0': 'silver',
    'fffafa': 'snow',
    'd2b48c': 'tan',
    '008080': 'teal',
    'ff6347': 'tomato',
    'ee82ee': 'violet',
    'f5deb3': 'wheat',
    'ffffff': 'white',
    'ffff00': 'yellow'
};

function hueToRgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}

function hslToRgb(h, s, l, a) {
    let r;
    let g;
    let b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        a
    ];
}

function toHex(value) {
    value = value.toString(16);

    return value.length === 1 ? '0' + value : value;
}

function parseFunctionArgs(functionArgs, count, rgb) {
    let cursor = functionArgs.head;
    let args = [];
    let wasValue = false;

    while (cursor !== null) {
        const { type, value } = cursor.data;

        switch (type) {
            case 'Number':
            case 'Percentage':
                if (wasValue) {
                    return;
                }

                wasValue = true;
                args.push({
                    type,
                    value: Number(value)
                });

                break;

            case 'Operator':
                if (value === ',') {
                    if (!wasValue) {
                        return;
                    }
                    wasValue = false;
                } else if (wasValue || value !== '+') {
                    return;
                }

                break;

            default:
                // something we couldn't understand
                return;
        }

        cursor = cursor.next;
    }

    if (args.length !== count) {
        // invalid arguments count
        // TODO: remove those tokens
        return;
    }

    if (args.length === 4) {
        if (args[3].type !== 'Number') {
            // 4th argument should be a number
            // TODO: remove those tokens
            return;
        }

        args[3].type = 'Alpha';
    }

    if (rgb) {
        if (args[0].type !== args[1].type || args[0].type !== args[2].type) {
            // invalid color, numbers and percentage shouldn't be mixed
            // TODO: remove those tokens
            return;
        }
    } else {
        if (args[0].type !== 'Number' ||
            args[1].type !== 'Percentage' ||
            args[2].type !== 'Percentage') {
            // invalid color, for hsl values should be: number, percentage, percentage
            // TODO: remove those tokens
            return;
        }

        args[0].type = 'Angle';
    }

    return args.map(function(arg) {
        let value = Math.max(0, arg.value);

        switch (arg.type) {
            case 'Number':
                // fit value to [0..255] range
                value = Math.min(value, 255);
                break;

            case 'Percentage':
                // convert 0..100% to value in [0..255] range
                value = Math.min(value, 100) / 100;

                if (!rgb) {
                    return value;
                }

                value = 255 * value;
                break;

            case 'Angle':
                // fit value to (-360..360) range
                return (((value % 360) + 360) % 360) / 360;

            case 'Alpha':
                // fit value to [0..1] range
                return Math.min(value, 1);
        }

        return Math.round(value);
    });
}

function compressFunction(node, item) {
    let functionName = node.name;
    let args;

    if (functionName === 'rgba' || functionName === 'hsla') {
        args = parseFunctionArgs(node.children, 4, functionName === 'rgba');

        if (!args) {
            // something went wrong
            return;
        }

        if (functionName === 'hsla') {
            args = hslToRgb(...args);
            node.name = 'rgba';
        }

        if (args[3] === 0) {
            // try to replace `rgba(x, x, x, 0)` to `transparent`
            // always replace `rgba(0, 0, 0, 0)` to `transparent`
            // otherwise avoid replacement in gradients since it may break color transition
            // http://stackoverflow.com/questions/11829410/css3-gradient-rendering-issues-from-transparent-to-white
            const scopeFunctionName = this.function && this.function.name;

            if ((args[0] === 0 && args[1] === 0 && args[2] === 0) ||
                !/^(?:to|from|color-stop)$|gradient$/i.test(scopeFunctionName)) {

                item.data = {
                    type: 'Identifier',
                    loc: node.loc,
                    name: 'transparent'
                };

                return;
            }
        }

        if (args[3] !== 1) {
            // replace argument values for normalized/interpolated
            node.children.forEach((node, item, list) => {
                if (node.type === 'Operator') {
                    if (node.value !== ',') {
                        list.remove(item);
                    }
                    return;
                }

                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: (0,_Number_js__WEBPACK_IMPORTED_MODULE_1__.packNumber)(args.shift())
                };
            });

            return;
        }

        // otherwise convert to rgb, i.e. rgba(255, 0, 0, 1) -> rgb(255, 0, 0)
        functionName = 'rgb';
    }

    if (functionName === 'hsl') {
        args = args || parseFunctionArgs(node.children, 3, false);

        if (!args) {
            // something went wrong
            return;
        }

        // convert to rgb
        args = hslToRgb(...args);
        functionName = 'rgb';
    }

    if (functionName === 'rgb') {
        args = args || parseFunctionArgs(node.children, 3, true);

        if (!args) {
            // something went wrong
            return;
        }

        item.data = {
            type: 'Hash',
            loc: node.loc,
            value: toHex(args[0]) + toHex(args[1]) + toHex(args[2])
        };

        compressHex(item.data, item);
    }
}

function compressIdent(node, item) {
    if (this.declaration === null) {
        return;
    }

    let color = node.name.toLowerCase();

    if (NAME_TO_HEX.hasOwnProperty(color) &&
        css_tree__WEBPACK_IMPORTED_MODULE_0__.lexer.matchDeclaration(this.declaration).isType(node, 'color')) {
        const hex = NAME_TO_HEX[color];

        if (hex.length + 1 <= color.length) {
            // replace for shorter hex value
            item.data = {
                type: 'Hash',
                loc: node.loc,
                value: hex
            };
        } else {
            // special case for consistent colors
            if (color === 'grey') {
                color = 'gray';
            }

            // just replace value for lower cased name
            node.name = color;
        }
    }
}

function compressHex(node, item) {
    let color = node.value.toLowerCase();

    // #112233 -> #123
    if (color.length === 6 &&
        color[0] === color[1] &&
        color[2] === color[3] &&
        color[4] === color[5]) {
        color = color[0] + color[2] + color[4];
    }

    if (HEX_TO_NAME[color]) {
        item.data = {
            type: 'Identifier',
            loc: node.loc,
            name: HEX_TO_NAME[color]
        };
    } else {
        node.value = color;
    }
}


/***/ }),

/***/ "../../node_modules/csso/lib/replace/index.js":
/*!****************************************************!*\
  !*** ../../node_modules/csso/lib/replace/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _Atrule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Atrule.js */ "../../node_modules/csso/lib/replace/Atrule.js");
/* harmony import */ var _AttributeSelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AttributeSelector.js */ "../../node_modules/csso/lib/replace/AttributeSelector.js");
/* harmony import */ var _Value_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Value.js */ "../../node_modules/csso/lib/replace/Value.js");
/* harmony import */ var _Dimension_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dimension.js */ "../../node_modules/csso/lib/replace/Dimension.js");
/* harmony import */ var _Percentage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Percentage.js */ "../../node_modules/csso/lib/replace/Percentage.js");
/* harmony import */ var _Number_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Number.js */ "../../node_modules/csso/lib/replace/Number.js");
/* harmony import */ var _Url_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Url.js */ "../../node_modules/csso/lib/replace/Url.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./color.js */ "../../node_modules/csso/lib/replace/color.js");










const handlers = {
    Atrule: _Atrule_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    AttributeSelector: _AttributeSelector_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    Value: _Value_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    Dimension: _Dimension_js__WEBPACK_IMPORTED_MODULE_4__["default"],
    Percentage: _Percentage_js__WEBPACK_IMPORTED_MODULE_5__["default"],
    Number: _Number_js__WEBPACK_IMPORTED_MODULE_6__.Number,
    Url: _Url_js__WEBPACK_IMPORTED_MODULE_7__["default"],
    Hash: _color_js__WEBPACK_IMPORTED_MODULE_8__.compressHex,
    Identifier: _color_js__WEBPACK_IMPORTED_MODULE_8__.compressIdent,
    Function: _color_js__WEBPACK_IMPORTED_MODULE_8__.compressFunction
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(ast) {
    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        leave(node, item, list) {
            if (handlers.hasOwnProperty(node.type)) {
                handlers[node.type].call(this, node, item, list);
            }
        }
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/property/background.js":
/*!******************************************************************!*\
  !*** ../../node_modules/csso/lib/replace/property/background.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compressBackground)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


function compressBackground(node) {
    function flush() {
        if (!buffer.length) {
            buffer.unshift(
                {
                    type: 'Number',
                    loc: null,
                    value: '0'
                },
                {
                    type: 'Number',
                    loc: null,
                    value: '0'
                }
            );
        }

        newValue.push.apply(newValue, buffer);

        buffer = [];
    }

    let newValue = [];
    let buffer = [];

    node.children.forEach((node) => {
        if (node.type === 'Operator' && node.value === ',') {
            flush();
            newValue.push(node);
            return;
        }

        // remove defaults
        if (node.type === 'Identifier') {
            if (node.name === 'transparent' ||
                node.name === 'none' ||
                node.name === 'repeat' ||
                node.name === 'scroll') {
                return;
            }
        }

        buffer.push(node);
    });

    flush();
    node.children = new css_tree__WEBPACK_IMPORTED_MODULE_0__.List().fromArray(newValue);
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/property/border.js":
/*!**************************************************************!*\
  !*** ../../node_modules/csso/lib/replace/property/border.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compressBorder)
/* harmony export */ });
function compressBorder(node) {
    node.children.forEach((node, item, list) => {
        if (node.type === 'Identifier' && node.name.toLowerCase() === 'none') {
            if (list.head === list.tail) {
                // replace `none` for zero when `none` is a single term
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '0'
                };
            } else {
                list.remove(item);
            }
        }
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/property/font-weight.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/csso/lib/replace/property/font-weight.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compressFontWeight)
/* harmony export */ });
function compressFontWeight(node) {
    const value = node.children.head.data;

    if (value.type === 'Identifier') {
        switch (value.name) {
            case 'normal':
                node.children.head.data = {
                    type: 'Number',
                    loc: value.loc,
                    value: '400'
                };
                break;
            case 'bold':
                node.children.head.data = {
                    type: 'Number',
                    loc: value.loc,
                    value: '700'
                };
                break;
        }
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/replace/property/font.js":
/*!************************************************************!*\
  !*** ../../node_modules/csso/lib/replace/property/font.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compressFont)
/* harmony export */ });
function compressFont(node) {
    const list = node.children;

    list.forEachRight(function(node, item) {
        if (node.type === 'Identifier') {
            if (node.name === 'bold') {
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '700'
                };
            } else if (node.name === 'normal') {
                const prev = item.prev;

                if (prev && prev.data.type === 'Operator' && prev.data.value === '/') {
                    this.remove(prev);
                }

                this.remove(item);
            } else if (node.name === 'medium') {
                const next = item.next;

                if (!next || next.data.type !== 'Operator') {
                    this.remove(item);
                }
            }
        }
    });

    if (list.isEmpty) {
        list.insert(list.createItem({
            type: 'Identifier',
            name: 'normal'
        }));
    }
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/1-mergeAtrule.js":
/*!****************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/1-mergeAtrule.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rejoinAtrule)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


const { hasOwnProperty } = Object.prototype;

function addRuleToMap(map, item, list, single) {
    const node = item.data;
    const name = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.keyword)(node.name).basename;
    const id = node.name.toLowerCase() + '/' + (node.prelude ? node.prelude.id : null);

    if (!hasOwnProperty.call(map, name)) {
        map[name] = Object.create(null);
    }

    if (single) {
        delete map[name][id];
    }

    if (!hasOwnProperty.call(map[name], id)) {
        map[name][id] = new css_tree__WEBPACK_IMPORTED_MODULE_0__.List();
    }

    map[name][id].append(list.remove(item));
}

function relocateAtrules(ast, options) {
    const collected = Object.create(null);
    let topInjectPoint = null;

    ast.children.forEach(function(node, item, list) {
        if (node.type === 'Atrule') {
            const name = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.keyword)(node.name).basename;

            switch (name) {
                case 'keyframes':
                    addRuleToMap(collected, item, list, true);
                    return;

                case 'media':
                    if (options.forceMediaMerge) {
                        addRuleToMap(collected, item, list, false);
                        return;
                    }
                    break;
            }

            if (topInjectPoint === null &&
                name !== 'charset' &&
                name !== 'import') {
                topInjectPoint = item;
            }
        } else {
            if (topInjectPoint === null) {
                topInjectPoint = item;
            }
        }
    });

    for (const atrule in collected) {
        for (const id in collected[atrule]) {
            ast.children.insertList(
                collected[atrule][id],
                atrule === 'media' ? null : topInjectPoint
            );
        }
    }
};

function isMediaRule(node) {
    return node.type === 'Atrule' && node.name === 'media';
}

function processAtrule(node, item, list) {
    if (!isMediaRule(node)) {
        return;
    }

    const prev = item.prev && item.prev.data;

    if (!prev || !isMediaRule(prev)) {
        return;
    }

    // merge @media with same query
    if (node.prelude &&
        prev.prelude &&
        node.prelude.id === prev.prelude.id) {
        prev.block.children.appendList(node.block.children);
        list.remove(item);

        // TODO: use it when we can refer to several points in source
        // prev.loc = {
        //     primary: prev.loc,
        //     merged: node.loc
        // };
    }
}

function rejoinAtrule(ast, options) {
    relocateAtrules(ast, options);

    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Atrule',
        reverse: true,
        enter: processAtrule
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/2-initialMergeRuleset.js":
/*!************************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/2-initialMergeRuleset.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initialMergeRule)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/csso/lib/restructure/utils.js");



function processRule(node, item, list) {
    const selectors = node.prelude.children;
    const declarations = node.block.children;

    list.prevUntil(item.prev, function(prev) {
        // skip non-ruleset node if safe
        if (prev.type !== 'Rule') {
            return _utils_js__WEBPACK_IMPORTED_MODULE_1__.unsafeToSkipNode.call(selectors, prev);
        }

        const prevSelectors = prev.prelude.children;
        const prevDeclarations = prev.block.children;

        // try to join rulesets with equal pseudo signature
        if (node.pseudoSignature === prev.pseudoSignature) {
            // try to join by selectors
            if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqualSelectors)(prevSelectors, selectors)) {
                prevDeclarations.appendList(declarations);
                list.remove(item);
                return true;
            }

            // try to join by declarations
            if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqualDeclarations)(declarations, prevDeclarations)) {
                (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.addSelectors)(prevSelectors, selectors);
                list.remove(item);
                return true;
            }
        }

        // go to prev ruleset if has no selector similarities
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasSimilarSelectors)(selectors, prevSelectors);
    });
}

// NOTE: direction should be left to right, since rulesets merge to left
// ruleset. When direction right to left unmerged rulesets may prevent lookup
// TODO: remove initial merge
function initialMergeRule(ast) {
    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Rule',
        enter: processRule
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/3-disjoinRuleset.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/3-disjoinRuleset.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ disjoinRule)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


function processRule(node, item, list) {
    const selectors = node.prelude.children;

    // generate new rule sets:
    // .a, .b { color: red; }
    // ->
    // .a { color: red; }
    // .b { color: red; }

    // while there are more than 1 simple selector split for rulesets
    while (selectors.head !== selectors.tail) {
        const newSelectors = new css_tree__WEBPACK_IMPORTED_MODULE_0__.List();

        newSelectors.insert(selectors.remove(selectors.head));

        list.insert(list.createItem({
            type: 'Rule',
            loc: node.loc,
            prelude: {
                type: 'SelectorList',
                loc: node.prelude.loc,
                children: newSelectors
            },
            block: {
                type: 'Block',
                loc: node.block.loc,
                children: node.block.children.copy()
            },
            pseudoSignature: node.pseudoSignature
        }), item);
    }
}

function disjoinRule(ast) {
    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/4-restructShorthand.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/4-restructShorthand.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ restructBlock)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


const REPLACE = 1;
const REMOVE = 2;
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const SIDES = ['top', 'right', 'bottom', 'left'];
const SIDE = {
    'margin-top': 'top',
    'margin-right': 'right',
    'margin-bottom': 'bottom',
    'margin-left': 'left',

    'padding-top': 'top',
    'padding-right': 'right',
    'padding-bottom': 'bottom',
    'padding-left': 'left',

    'border-top-color': 'top',
    'border-right-color': 'right',
    'border-bottom-color': 'bottom',
    'border-left-color': 'left',
    'border-top-width': 'top',
    'border-right-width': 'right',
    'border-bottom-width': 'bottom',
    'border-left-width': 'left',
    'border-top-style': 'top',
    'border-right-style': 'right',
    'border-bottom-style': 'bottom',
    'border-left-style': 'left'
};
const MAIN_PROPERTY = {
    'margin': 'margin',
    'margin-top': 'margin',
    'margin-right': 'margin',
    'margin-bottom': 'margin',
    'margin-left': 'margin',

    'padding': 'padding',
    'padding-top': 'padding',
    'padding-right': 'padding',
    'padding-bottom': 'padding',
    'padding-left': 'padding',

    'border-color': 'border-color',
    'border-top-color': 'border-color',
    'border-right-color': 'border-color',
    'border-bottom-color': 'border-color',
    'border-left-color': 'border-color',
    'border-width': 'border-width',
    'border-top-width': 'border-width',
    'border-right-width': 'border-width',
    'border-bottom-width': 'border-width',
    'border-left-width': 'border-width',
    'border-style': 'border-style',
    'border-top-style': 'border-style',
    'border-right-style': 'border-style',
    'border-bottom-style': 'border-style',
    'border-left-style': 'border-style'
};

class TRBL {
    constructor(name) {
        this.name = name;
        this.loc = null;
        this.iehack = undefined;
        this.sides = {
            'top': null,
            'right': null,
            'bottom': null,
            'left': null
        };
    }

    getValueSequence(declaration, count) {
        const values = [];
        let iehack = '';
        const hasBadValues = declaration.value.type !== 'Value' || declaration.value.children.some(function(child) {
            let special = false;

            switch (child.type) {
                case 'Identifier':
                    switch (child.name) {
                        case '\\0':
                        case '\\9':
                            iehack = child.name;
                            return;

                        case 'inherit':
                        case 'initial':
                        case 'unset':
                        case 'revert':
                            special = child.name;
                            break;
                    }
                    break;

                case 'Dimension':
                    switch (child.unit) {
                        // is not supported until IE11
                        case 'rem':

                        // v* units is too buggy across browsers and better
                        // don't merge values with those units
                        case 'vw':
                        case 'vh':
                        case 'vmin':
                        case 'vmax':
                        case 'vm': // IE9 supporting "vm" instead of "vmin".
                            special = child.unit;
                            break;
                    }
                    break;

                case 'Hash': // color
                case 'Number':
                case 'Percentage':
                    break;

                case 'Function':
                    if (child.name === 'var') {
                        return true;
                    }

                    special = child.name;
                    break;

                default:
                    return true;  // bad value
            }

            values.push({
                node: child,
                special,
                important: declaration.important
            });
        });

        if (hasBadValues || values.length > count) {
            return false;
        }

        if (typeof this.iehack === 'string' && this.iehack !== iehack) {
            return false;
        }

        this.iehack = iehack; // move outside

        return values;
    }

    canOverride(side, value) {
        const currentValue = this.sides[side];

        return !currentValue || (value.important && !currentValue.important);
    }

    add(name, declaration) {
        function attemptToAdd() {
            const sides = this.sides;
            const side = SIDE[name];

            if (side) {
                if (side in sides === false) {
                    return false;
                }

                const values = this.getValueSequence(declaration, 1);

                if (!values || !values.length) {
                    return false;
                }

                // can mix only if specials are equal
                for (const key in sides) {
                    if (sides[key] !== null && sides[key].special !== values[0].special) {
                        return false;
                    }
                }

                if (!this.canOverride(side, values[0])) {
                    return true;
                }

                sides[side] = values[0];

                return true;
            } else if (name === this.name) {
                const values = this.getValueSequence(declaration, 4);

                if (!values || !values.length) {
                    return false;
                }

                switch (values.length) {
                    case 1:
                        values[RIGHT] = values[TOP];
                        values[BOTTOM] = values[TOP];
                        values[LEFT] = values[TOP];
                        break;

                    case 2:
                        values[BOTTOM] = values[TOP];
                        values[LEFT] = values[RIGHT];
                        break;

                    case 3:
                        values[LEFT] = values[RIGHT];
                        break;
                }

                // can mix only if specials are equal
                for (let i = 0; i < 4; i++) {
                    for (const key in sides) {
                        if (sides[key] !== null && sides[key].special !== values[i].special) {
                            return false;
                        }
                    }
                }

                for (let i = 0; i < 4; i++) {
                    if (this.canOverride(SIDES[i], values[i])) {
                        sides[SIDES[i]] = values[i];
                    }
                }

                return true;
            }
        }

        if (!attemptToAdd.call(this)) {
            return false;
        }

        // TODO: use it when we can refer to several points in source
        // if (this.loc) {
        //     this.loc = {
        //         primary: this.loc,
        //         merged: declaration.loc
        //     };
        // } else {
        //     this.loc = declaration.loc;
        // }
        if (!this.loc) {
            this.loc = declaration.loc;
        }

        return true;
    }

    isOkToMinimize() {
        const top = this.sides.top;
        const right = this.sides.right;
        const bottom = this.sides.bottom;
        const left = this.sides.left;

        if (top && right && bottom && left) {
            const important =
                top.important +
                right.important +
                bottom.important +
                left.important;

            return important === 0 || important === 4;
        }

        return false;
    }

    getValue() {
        const result = new css_tree__WEBPACK_IMPORTED_MODULE_0__.List();
        const sides = this.sides;
        const values = [
            sides.top,
            sides.right,
            sides.bottom,
            sides.left
        ];
        const stringValues = [
            (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(sides.top.node),
            (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(sides.right.node),
            (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(sides.bottom.node),
            (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(sides.left.node)
        ];

        if (stringValues[LEFT] === stringValues[RIGHT]) {
            values.pop();
            if (stringValues[BOTTOM] === stringValues[TOP]) {
                values.pop();
                if (stringValues[RIGHT] === stringValues[TOP]) {
                    values.pop();
                }
            }
        }

        for (let i = 0; i < values.length; i++) {
            result.appendData(values[i].node);
        }

        if (this.iehack) {
            result.appendData({
                type: 'Identifier',
                loc: null,
                name: this.iehack
            });
        }

        return {
            type: 'Value',
            loc: null,
            children: result
        };
    }

    getDeclaration() {
        return {
            type: 'Declaration',
            loc: this.loc,
            important: this.sides.top.important,
            property: this.name,
            value: this.getValue()
        };
    }
}

function processRule(rule, shorts, shortDeclarations, lastShortSelector) {
    const declarations = rule.block.children;
    const selector = rule.prelude.children.first.id;

    rule.block.children.forEachRight(function(declaration, item) {
        const property = declaration.property;

        if (!MAIN_PROPERTY.hasOwnProperty(property)) {
            return;
        }

        const key = MAIN_PROPERTY[property];
        let shorthand;
        let operation;

        if (!lastShortSelector || selector === lastShortSelector) {
            if (key in shorts) {
                operation = REMOVE;
                shorthand = shorts[key];
            }
        }

        if (!shorthand || !shorthand.add(property, declaration)) {
            operation = REPLACE;
            shorthand = new TRBL(key);

            // if can't parse value ignore it and break shorthand children
            if (!shorthand.add(property, declaration)) {
                lastShortSelector = null;
                return;
            }
        }

        shorts[key] = shorthand;
        shortDeclarations.push({
            operation,
            block: declarations,
            item,
            shorthand
        });

        lastShortSelector = selector;
    });

    return lastShortSelector;
}

function processShorthands(shortDeclarations, markDeclaration) {
    shortDeclarations.forEach(function(item) {
        const shorthand = item.shorthand;

        if (!shorthand.isOkToMinimize()) {
            return;
        }

        if (item.operation === REPLACE) {
            item.item.data = markDeclaration(shorthand.getDeclaration());
        } else {
            item.block.remove(item.item);
        }
    });
}

function restructBlock(ast, indexer) {
    const stylesheetMap = {};
    const shortDeclarations = [];

    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Rule',
        reverse: true,
        enter(node) {
            const stylesheet = this.block || this.stylesheet;
            const ruleId = (node.pseudoSignature || '') + '|' + node.prelude.children.first.id;
            let ruleMap;
            let shorts;

            if (!stylesheetMap.hasOwnProperty(stylesheet.id)) {
                ruleMap = {
                    lastShortSelector: null
                };
                stylesheetMap[stylesheet.id] = ruleMap;
            } else {
                ruleMap = stylesheetMap[stylesheet.id];
            }

            if (ruleMap.hasOwnProperty(ruleId)) {
                shorts = ruleMap[ruleId];
            } else {
                shorts = {};
                ruleMap[ruleId] = shorts;
            }

            ruleMap.lastShortSelector = processRule.call(this, node, shorts, shortDeclarations, ruleMap.lastShortSelector);
        }
    });

    processShorthands(shortDeclarations, indexer.declaration);
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/6-restructBlock.js":
/*!******************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/6-restructBlock.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ restructBlock)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


let fingerprintId = 1;
const dontRestructure = new Set([
    'src' // https://github.com/afelix/csso/issues/50
]);

const DONT_MIX_VALUE = {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility
    'display': /table|ruby|flex|-(flex)?box$|grid|contents|run-in/i,
    // https://developer.mozilla.org/en/docs/Web/CSS/text-align
    'text-align': /^(start|end|match-parent|justify-all)$/i
};

const SAFE_VALUES = {
    cursor: [
        'auto', 'crosshair', 'default', 'move', 'text', 'wait', 'help',
        'n-resize', 'e-resize', 's-resize', 'w-resize',
        'ne-resize', 'nw-resize', 'se-resize', 'sw-resize',
        'pointer', 'progress', 'not-allowed', 'no-drop', 'vertical-text', 'all-scroll',
        'col-resize', 'row-resize'
    ],
    overflow: [
        'hidden', 'visible', 'scroll', 'auto'
    ],
    position: [
        'static', 'relative', 'absolute', 'fixed'
    ]
};

const NEEDLESS_TABLE = {
    'border-width': ['border'],
    'border-style': ['border'],
    'border-color': ['border'],
    'border-top': ['border'],
    'border-right': ['border'],
    'border-bottom': ['border'],
    'border-left': ['border'],
    'border-top-width': ['border-top', 'border-width', 'border'],
    'border-right-width': ['border-right', 'border-width', 'border'],
    'border-bottom-width': ['border-bottom', 'border-width', 'border'],
    'border-left-width': ['border-left', 'border-width', 'border'],
    'border-top-style': ['border-top', 'border-style', 'border'],
    'border-right-style': ['border-right', 'border-style', 'border'],
    'border-bottom-style': ['border-bottom', 'border-style', 'border'],
    'border-left-style': ['border-left', 'border-style', 'border'],
    'border-top-color': ['border-top', 'border-color', 'border'],
    'border-right-color': ['border-right', 'border-color', 'border'],
    'border-bottom-color': ['border-bottom', 'border-color', 'border'],
    'border-left-color': ['border-left', 'border-color', 'border'],
    'margin-top': ['margin'],
    'margin-right': ['margin'],
    'margin-bottom': ['margin'],
    'margin-left': ['margin'],
    'padding-top': ['padding'],
    'padding-right': ['padding'],
    'padding-bottom': ['padding'],
    'padding-left': ['padding'],
    'font-style': ['font'],
    'font-variant': ['font'],
    'font-weight': ['font'],
    'font-size': ['font'],
    'font-family': ['font'],
    'list-style-type': ['list-style'],
    'list-style-position': ['list-style'],
    'list-style-image': ['list-style']
};

function getPropertyFingerprint(propertyName, declaration, fingerprints) {
    const realName = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.property)(propertyName).basename;

    if (realName === 'background') {
        return propertyName + ':' + (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(declaration.value);
    }

    const declarationId = declaration.id;
    let fingerprint = fingerprints[declarationId];

    if (!fingerprint) {
        switch (declaration.value.type) {
            case 'Value':
                const special = {};
                let vendorId = '';
                let iehack = '';
                let raw = false;

                declaration.value.children.forEach(function walk(node) {
                    switch (node.type) {
                        case 'Value':
                        case 'Brackets':
                        case 'Parentheses':
                            node.children.forEach(walk);
                            break;

                        case 'Raw':
                            raw = true;
                            break;

                        case 'Identifier': {
                            const { name } = node;

                            if (!vendorId) {
                                vendorId = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.keyword)(name).vendor;
                            }

                            if (/\\[09]/.test(name)) {
                                iehack = RegExp.lastMatch;
                            }

                            if (SAFE_VALUES.hasOwnProperty(realName)) {
                                if (SAFE_VALUES[realName].indexOf(name) === -1) {
                                    special[name] = true;
                                }
                            } else if (DONT_MIX_VALUE.hasOwnProperty(realName)) {
                                if (DONT_MIX_VALUE[realName].test(name)) {
                                    special[name] = true;
                                }
                            }

                            break;
                        }

                        case 'Function': {
                            let { name } = node;

                            if (!vendorId) {
                                vendorId = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.keyword)(name).vendor;
                            }

                            if (name === 'rect') {
                                // there are 2 forms of rect:
                                //   rect(<top>, <right>, <bottom>, <left>) - standart
                                //   rect(<top> <right> <bottom> <left>) – backwards compatible syntax
                                // only the same form values can be merged
                                const hasComma = node.children.some((node) =>
                                    node.type === 'Operator' && node.value === ','
                                );

                                if (!hasComma) {
                                    name = 'rect-backward';
                                }
                            }

                            special[name + '()'] = true;

                            // check nested tokens too
                            node.children.forEach(walk);

                            break;
                        }

                        case 'Dimension': {
                            const { unit } = node;

                            if (/\\[09]/.test(unit)) {
                                iehack = RegExp.lastMatch;
                            }

                            switch (unit) {
                                // is not supported until IE11
                                case 'rem':

                                // v* units is too buggy across browsers and better
                                // don't merge values with those units
                                case 'vw':
                                case 'vh':
                                case 'vmin':
                                case 'vmax':
                                case 'vm': // IE9 supporting "vm" instead of "vmin".
                                    special[unit] = true;
                                    break;
                            }

                            break;
                        }
                    }
                });

                fingerprint = raw
                    ? '!' + fingerprintId++
                    : '!' + Object.keys(special).sort() + '|' + iehack + vendorId;
                break;

            case 'Raw':
                fingerprint = '!' + declaration.value.value;
                break;

            default:
                fingerprint = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(declaration.value);
        }

        fingerprints[declarationId] = fingerprint;
    }

    return propertyName + fingerprint;
}

function needless(props, declaration, fingerprints) {
    const property = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.property)(declaration.property);

    if (NEEDLESS_TABLE.hasOwnProperty(property.basename)) {
        const table = NEEDLESS_TABLE[property.basename];

        for (const entry of table) {
            const ppre = getPropertyFingerprint(property.prefix + entry, declaration, fingerprints);
            const prev = props.hasOwnProperty(ppre) ? props[ppre] : null;

            if (prev && (!declaration.important || prev.item.data.important)) {
                return prev;
            }
        }
    }
}

function processRule(rule, item, list, props, fingerprints) {
    const declarations = rule.block.children;

    declarations.forEachRight(function(declaration, declarationItem) {
        const { property } = declaration;
        const fingerprint = getPropertyFingerprint(property, declaration, fingerprints);
        const prev = props[fingerprint];

        if (prev && !dontRestructure.has(property)) {
            if (declaration.important && !prev.item.data.important) {
                props[fingerprint] = {
                    block: declarations,
                    item: declarationItem
                };

                prev.block.remove(prev.item);

                // TODO: use it when we can refer to several points in source
                // declaration.loc = {
                //     primary: declaration.loc,
                //     merged: prev.item.data.loc
                // };
            } else {
                declarations.remove(declarationItem);

                // TODO: use it when we can refer to several points in source
                // prev.item.data.loc = {
                //     primary: prev.item.data.loc,
                //     merged: declaration.loc
                // };
            }
        } else {
            const prev = needless(props, declaration, fingerprints);

            if (prev) {
                declarations.remove(declarationItem);

                // TODO: use it when we can refer to several points in source
                // prev.item.data.loc = {
                //     primary: prev.item.data.loc,
                //     merged: declaration.loc
                // };
            } else {
                declaration.fingerprint = fingerprint;

                props[fingerprint] = {
                    block: declarations,
                    item: declarationItem
                };
            }
        }
    });

    if (declarations.isEmpty) {
        list.remove(item);
    }
}

function restructBlock(ast) {
    const stylesheetMap = {};
    const fingerprints = Object.create(null);

    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Rule',
        reverse: true,
        enter(node, item, list) {
            const stylesheet = this.block || this.stylesheet;
            const ruleId = (node.pseudoSignature || '') + '|' + node.prelude.children.first.id;
            let ruleMap;
            let props;

            if (!stylesheetMap.hasOwnProperty(stylesheet.id)) {
                ruleMap = {};
                stylesheetMap[stylesheet.id] = ruleMap;
            } else {
                ruleMap = stylesheetMap[stylesheet.id];
            }

            if (ruleMap.hasOwnProperty(ruleId)) {
                props = ruleMap[ruleId];
            } else {
                props = {};
                ruleMap[ruleId] = props;
            }

            processRule.call(this, node, item, list, props, fingerprints);
        }
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/7-mergeRuleset.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/7-mergeRuleset.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeRule)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/csso/lib/restructure/utils.js");



/*
    At this step all rules has single simple selector. We try to join by equal
    declaration blocks to first rule, e.g.

    .a { color: red }
    b { ... }
    .b { color: red }
    ->
    .a, .b { color: red }
    b { ... }
*/

function processRule(node, item, list) {
    const selectors = node.prelude.children;
    const declarations = node.block.children;
    const nodeCompareMarker = selectors.first.compareMarker;
    const skippedCompareMarkers = {};

    list.nextUntil(item.next, function(next, nextItem) {
        // skip non-ruleset node if safe
        if (next.type !== 'Rule') {
            return _utils_js__WEBPACK_IMPORTED_MODULE_1__.unsafeToSkipNode.call(selectors, next);
        }

        if (node.pseudoSignature !== next.pseudoSignature) {
            return true;
        }

        const nextFirstSelector = next.prelude.children.head;
        const nextDeclarations = next.block.children;
        const nextCompareMarker = nextFirstSelector.data.compareMarker;

        // if next ruleset has same marked as one of skipped then stop joining
        if (nextCompareMarker in skippedCompareMarkers) {
            return true;
        }

        // try to join by selectors
        if (selectors.head === selectors.tail) {
            if (selectors.first.id === nextFirstSelector.data.id) {
                declarations.appendList(nextDeclarations);
                list.remove(nextItem);
                return;
            }
        }

        // try to join by properties
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqualDeclarations)(declarations, nextDeclarations)) {
            const nextStr = nextFirstSelector.data.id;

            selectors.some((data, item) => {
                const curStr = data.id;

                if (nextStr < curStr) {
                    selectors.insert(nextFirstSelector, item);
                    return true;
                }

                if (!item.next) {
                    selectors.insert(nextFirstSelector);
                    return true;
                }
            });

            list.remove(nextItem);
            return;
        }

        // go to next ruleset if current one can be skipped (has no equal specificity nor element selector)
        if (nextCompareMarker === nodeCompareMarker) {
            return true;
        }

        skippedCompareMarkers[nextCompareMarker] = true;
    });
}

function mergeRule(ast) {
    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Rule',
        enter: processRule
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/8-restructRuleset.js":
/*!********************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/8-restructRuleset.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ restructRule)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/csso/lib/restructure/utils.js");



function calcSelectorLength(list) {
    return list.reduce((res, data) => res + data.id.length + 1, 0) - 1;
}

function calcDeclarationsLength(tokens) {
    let length = 0;

    for (const token of tokens) {
        length += token.length;
    }

    return (
        length +          // declarations
        tokens.length - 1 // delimeters
    );
}

function processRule(node, item, list) {
    const avoidRulesMerge = this.block !== null ? this.block.avoidRulesMerge : false;
    const selectors = node.prelude.children;
    const block = node.block;
    const disallowDownMarkers = Object.create(null);
    let allowMergeUp = true;
    let allowMergeDown = true;

    list.prevUntil(item.prev, function(prev, prevItem) {
        const prevBlock = prev.block;
        const prevType = prev.type;

        if (prevType !== 'Rule') {
            const unsafe = _utils_js__WEBPACK_IMPORTED_MODULE_1__.unsafeToSkipNode.call(selectors, prev);

            if (!unsafe && prevType === 'Atrule' && prevBlock) {
                (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(prevBlock, {
                    visit: 'Rule',
                    enter(node) {
                        node.prelude.children.forEach((data) => {
                            disallowDownMarkers[data.compareMarker] = true;
                        });
                    }
                });
            }

            return unsafe;
        }

        if (node.pseudoSignature !== prev.pseudoSignature) {
            return true;
        }

        const prevSelectors = prev.prelude.children;

        allowMergeDown = !prevSelectors.some((selector) =>
            selector.compareMarker in disallowDownMarkers
        );

        // try prev ruleset if simpleselectors has no equal specifity and element selector
        if (!allowMergeDown && !allowMergeUp) {
            return true;
        }

        // try to join by selectors
        if (allowMergeUp && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqualSelectors)(prevSelectors, selectors)) {
            prevBlock.children.appendList(block.children);
            list.remove(item);

            return true;
        }

        // try to join by properties
        const diff = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.compareDeclarations)(block.children, prevBlock.children);

        // console.log(diff.eq, diff.ne1, diff.ne2);

        if (diff.eq.length) {
            if (!diff.ne1.length && !diff.ne2.length) {
                // equal blocks
                if (allowMergeDown) {
                    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.addSelectors)(selectors, prevSelectors);
                    list.remove(prevItem);
                }

                return true;
            } else if (!avoidRulesMerge) { /* probably we don't need to prevent those merges for @keyframes
                                              TODO: need to be checked */

                if (diff.ne1.length && !diff.ne2.length) {
                    // prevBlock is subset block
                    const selectorLength = calcSelectorLength(selectors);
                    const blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeUp && selectorLength < blockLength) {
                        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.addSelectors)(prevSelectors, selectors);
                        block.children.fromArray(diff.ne1);
                    }
                } else if (!diff.ne1.length && diff.ne2.length) {
                    // node is subset of prevBlock
                    const selectorLength = calcSelectorLength(prevSelectors);
                    const blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeDown && selectorLength < blockLength) {
                        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.addSelectors)(selectors, prevSelectors);
                        prevBlock.children.fromArray(diff.ne2);
                    }
                } else {
                    // diff.ne1.length && diff.ne2.length
                    // extract equal block
                    const newSelector = {
                        type: 'SelectorList',
                        loc: null,
                        children: (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.addSelectors)(prevSelectors.copy(), selectors)
                    };
                    const newBlockLength = calcSelectorLength(newSelector.children) + 2; // selectors length + curly braces length
                    const blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    // create new ruleset if declarations length greater than
                    // ruleset description overhead
                    if (blockLength >= newBlockLength) {
                        const newItem = list.createItem({
                            type: 'Rule',
                            loc: null,
                            prelude: newSelector,
                            block: {
                                type: 'Block',
                                loc: null,
                                children: new css_tree__WEBPACK_IMPORTED_MODULE_0__.List().fromArray(diff.eq)
                            },
                            pseudoSignature: node.pseudoSignature
                        });

                        block.children.fromArray(diff.ne1);
                        prevBlock.children.fromArray(diff.ne2overrided);

                        if (allowMergeUp) {
                            list.insert(newItem, prevItem);
                        } else {
                            list.insert(newItem, item);
                        }

                        return true;
                    }
                }
            }
        }

        if (allowMergeUp) {
            // TODO: disallow up merge only if any property interception only (i.e. diff.ne2overrided.length > 0);
            // await property families to find property interception correctly
            allowMergeUp = !prevSelectors.some((prevSelector) =>
                selectors.some((selector) =>
                    selector.compareMarker === prevSelector.compareMarker
                )
            );
        }

        prevSelectors.forEach((data) => {
            disallowDownMarkers[data.compareMarker] = true;
        });
    });
}

function restructRule(ast) {
    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/index.js":
/*!********************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _prepare_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prepare/index.js */ "../../node_modules/csso/lib/restructure/prepare/index.js");
/* harmony import */ var _1_mergeAtrule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./1-mergeAtrule.js */ "../../node_modules/csso/lib/restructure/1-mergeAtrule.js");
/* harmony import */ var _2_initialMergeRuleset_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./2-initialMergeRuleset.js */ "../../node_modules/csso/lib/restructure/2-initialMergeRuleset.js");
/* harmony import */ var _3_disjoinRuleset_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3-disjoinRuleset.js */ "../../node_modules/csso/lib/restructure/3-disjoinRuleset.js");
/* harmony import */ var _4_restructShorthand_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./4-restructShorthand.js */ "../../node_modules/csso/lib/restructure/4-restructShorthand.js");
/* harmony import */ var _6_restructBlock_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./6-restructBlock.js */ "../../node_modules/csso/lib/restructure/6-restructBlock.js");
/* harmony import */ var _7_mergeRuleset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./7-mergeRuleset.js */ "../../node_modules/csso/lib/restructure/7-mergeRuleset.js");
/* harmony import */ var _8_restructRuleset_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./8-restructRuleset.js */ "../../node_modules/csso/lib/restructure/8-restructRuleset.js");









/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(ast, options) {
    // prepare ast for restructing
    const indexer = (0,_prepare_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ast, options);
    options.logger('prepare', ast);

    (0,_1_mergeAtrule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ast, options);
    options.logger('mergeAtrule', ast);

    (0,_2_initialMergeRuleset_js__WEBPACK_IMPORTED_MODULE_2__["default"])(ast);
    options.logger('initialMergeRuleset', ast);

    (0,_3_disjoinRuleset_js__WEBPACK_IMPORTED_MODULE_3__["default"])(ast);
    options.logger('disjoinRuleset', ast);

    (0,_4_restructShorthand_js__WEBPACK_IMPORTED_MODULE_4__["default"])(ast, indexer);
    options.logger('restructShorthand', ast);

    (0,_6_restructBlock_js__WEBPACK_IMPORTED_MODULE_5__["default"])(ast);
    options.logger('restructBlock', ast);

    (0,_7_mergeRuleset_js__WEBPACK_IMPORTED_MODULE_6__["default"])(ast);
    options.logger('mergeRuleset', ast);

    (0,_8_restructRuleset_js__WEBPACK_IMPORTED_MODULE_7__["default"])(ast);
    options.logger('restructRuleset', ast);
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/prepare/createDeclarationIndexer.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/prepare/createDeclarationIndexer.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDeclarationIndexer)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


class Index {
    constructor() {
        this.map = new Map();
    }
    resolve(str) {
        let index = this.map.get(str);

        if (index === undefined) {
            index = this.map.size + 1;
            this.map.set(str, index);
        }

        return index;
    }
};

function createDeclarationIndexer() {
    const ids = new Index();

    return function markDeclaration(node) {
        const id = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(node);

        node.id = ids.resolve(id);
        node.length = id.length;
        node.fingerprint = null;

        return node;
    };
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/prepare/index.js":
/*!****************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/prepare/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ prepare)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _createDeclarationIndexer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createDeclarationIndexer.js */ "../../node_modules/csso/lib/restructure/prepare/createDeclarationIndexer.js");
/* harmony import */ var _processSelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processSelector.js */ "../../node_modules/csso/lib/restructure/prepare/processSelector.js");




function prepare(ast, options) {
    const markDeclaration = (0,_createDeclarationIndexer_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Rule',
        enter(node) {
            node.block.children.forEach(markDeclaration);
            (0,_processSelector_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node, options.usage);
        }
    });

    (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.walk)(ast, {
        visit: 'Atrule',
        enter(node) {
            if (node.prelude) {
                node.prelude.id = null; // pre-init property to avoid multiple hidden class for generate
                node.prelude.id = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(node.prelude);
            }

            // compare keyframe selectors by its values
            // NOTE: still no clarification about problems with keyframes selector grouping (issue #197)
            if ((0,css_tree__WEBPACK_IMPORTED_MODULE_0__.keyword)(node.name).basename === 'keyframes') {
                node.block.avoidRulesMerge = true;  /* probably we don't need to prevent those merges for @keyframes
                                                       TODO: need to be checked */
                node.block.children.forEach(function(rule) {
                    rule.prelude.children.forEach(function(simpleselector) {
                        simpleselector.compareMarker = simpleselector.id;
                    });
                });
            }
        }
    });

    return {
        declaration: markDeclaration
    };
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/prepare/processSelector.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/prepare/processSelector.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ processSelector)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _specificity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./specificity.js */ "../../node_modules/csso/lib/restructure/prepare/specificity.js");



const nonFreezePseudoElements = new Set([
    'first-letter',
    'first-line',
    'after',
    'before'
]);
const nonFreezePseudoClasses = new Set([
    'link',
    'visited',
    'hover',
    'active',
    'first-letter',
    'first-line',
    'after',
    'before'
]);

function processSelector(node, usageData) {
    const pseudos = new Set();

    node.prelude.children.forEach(function(simpleSelector) {
        let tagName = '*';
        let scope = 0;

        simpleSelector.children.forEach(function(node) {
            switch (node.type) {
                case 'ClassSelector':
                    if (usageData && usageData.scopes) {
                        const classScope = usageData.scopes[node.name] || 0;

                        if (scope !== 0 && classScope !== scope) {
                            throw new Error('Selector can\'t has classes from different scopes: ' + (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(simpleSelector));
                        }

                        scope = classScope;
                    }

                    break;

                case 'PseudoClassSelector': {
                    const name = node.name.toLowerCase();

                    if (!nonFreezePseudoClasses.has(name)) {
                        pseudos.add(`:${name}`);
                    }

                    break;
                }

                case 'PseudoElementSelector': {
                    const name = node.name.toLowerCase();

                    if (!nonFreezePseudoElements.has(name)) {
                        pseudos.add(`::${name}`);
                    }

                    break;
                }

                case 'TypeSelector':
                    tagName = node.name.toLowerCase();
                    break;

                case 'AttributeSelector':
                    if (node.flags) {
                        pseudos.add(`[${node.flags.toLowerCase()}]`);
                    }

                    break;

                case 'Combinator':
                    tagName = '*';
                    break;
            }
        });

        simpleSelector.compareMarker = (0,_specificity_js__WEBPACK_IMPORTED_MODULE_1__["default"])(simpleSelector).toString();
        simpleSelector.id = null; // pre-init property to avoid multiple hidden class
        simpleSelector.id = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.generate)(simpleSelector);

        if (scope) {
            simpleSelector.compareMarker += ':' + scope;
        }

        if (tagName !== '*') {
            simpleSelector.compareMarker += ',' + tagName;
        }
    });

    // add property to all rule nodes to avoid multiple hidden class
    node.pseudoSignature = pseudos.size > 0
        ? [...pseudos].sort().join(',')
        : false;
};


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/prepare/specificity.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/prepare/specificity.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");


function ensureSelectorList(node) {
    if (node.type === 'Raw') {
        return (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.parse)(node.value, { context: 'selectorList' });
    }

    return node;
}

function maxSpecificity(a, b) {
    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) {
            return a[i] > b[i] ? a : b;
        }
    }

    return a;
}

function maxSelectorListSpecificity(selectorList) {
    return ensureSelectorList(selectorList).children.reduce(
        (result, node) => maxSpecificity(specificity(node), result),
        [0, 0, 0]
    );
}

// §16. Calculating a selector’s specificity
// https://www.w3.org/TR/selectors-4/#specificity-rules
function specificity(simpleSelector) {
    let A = 0;
    let B = 0;
    let C = 0;

    // A selector’s specificity is calculated for a given element as follows:
    simpleSelector.children.forEach((node) => {
        switch (node.type) {
            // count the number of ID selectors in the selector (= A)
            case 'IdSelector':
                A++;
                break;

            // count the number of class selectors, attributes selectors, ...
            case 'ClassSelector':
            case 'AttributeSelector':
                B++;
                break;

            // ... and pseudo-classes in the selector (= B)
            case 'PseudoClassSelector':
                switch (node.name.toLowerCase()) {
                    // The specificity of an :is(), :not(), or :has() pseudo-class is replaced
                    // by the specificity of the most specific complex selector in its selector list argument.
                    case 'not':
                    case 'has':
                    case 'is':
                    // :matches() is used before it was renamed to :is()
                    // https://github.com/w3c/csswg-drafts/issues/3258
                    case 'matches':
                    // Older browsers support :is() functionality as prefixed pseudo-class :any()
                    // https://developer.mozilla.org/en-US/docs/Web/CSS/:is
                    case '-webkit-any':
                    case '-moz-any': {
                        const [a, b, c] = maxSelectorListSpecificity(node.children.first);

                        A += a;
                        B += b;
                        C += c;

                        break;
                    }

                    // Analogously, the specificity of an :nth-child() or :nth-last-child() selector
                    // is the specificity of the pseudo class itself (counting as one pseudo-class selector)
                    // plus the specificity of the most specific complex selector in its selector list argument (if any).
                    case 'nth-child':
                    case 'nth-last-child': {
                        const arg = node.children.first;

                        if (arg.type === 'Nth' && arg.selector) {
                            const [a, b, c] = maxSelectorListSpecificity(arg.selector);

                            A += a;
                            B += b + 1;
                            C += c;
                        } else {
                            B++;
                        }

                        break;
                    }

                    // The specificity of a :where() pseudo-class is replaced by zero.
                    case 'where':
                        break;

                    // The four Level 2 pseudo-elements (::before, ::after, ::first-line, and ::first-letter) may,
                    // for legacy reasons, be represented using the <pseudo-class-selector> grammar,
                    // with only a single ":" character at their start.
                    // https://www.w3.org/TR/selectors-4/#single-colon-pseudos
                    case 'before':
                    case 'after':
                    case 'first-line':
                    case 'first-letter':
                        C++;
                        break;

                    default:
                        B++;
                }
                break;

            // count the number of type selectors ...
            case 'TypeSelector':
                // ignore the universal selector
                if (!node.name.endsWith('*')) {
                    C++;
                }
                break;

            // ... and pseudo-elements in the selector (= C)
            case 'PseudoElementSelector':
                C++;
                break;
        }
    });

    return [A, B, C];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (specificity);


/***/ }),

/***/ "../../node_modules/csso/lib/restructure/utils.js":
/*!********************************************************!*\
  !*** ../../node_modules/csso/lib/restructure/utils.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addSelectors": () => (/* binding */ addSelectors),
/* harmony export */   "compareDeclarations": () => (/* binding */ compareDeclarations),
/* harmony export */   "hasSimilarSelectors": () => (/* binding */ hasSimilarSelectors),
/* harmony export */   "isEqualDeclarations": () => (/* binding */ isEqualDeclarations),
/* harmony export */   "isEqualSelectors": () => (/* binding */ isEqualSelectors),
/* harmony export */   "unsafeToSkipNode": () => (/* binding */ unsafeToSkipNode)
/* harmony export */ });
const { hasOwnProperty } = Object.prototype;

function isEqualSelectors(a, b) {
    let cursor1 = a.head;
    let cursor2 = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

function isEqualDeclarations(a, b) {
    let cursor1 = a.head;
    let cursor2 = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

function compareDeclarations(declarations1, declarations2) {
    const result = {
        eq: [],
        ne1: [],
        ne2: [],
        ne2overrided: []
    };

    const fingerprints = Object.create(null);
    const declarations2hash = Object.create(null);

    for (let cursor = declarations2.head; cursor; cursor = cursor.next)  {
        declarations2hash[cursor.data.id] = true;
    }

    for (let cursor = declarations1.head; cursor; cursor = cursor.next)  {
        const data = cursor.data;

        if (data.fingerprint) {
            fingerprints[data.fingerprint] = data.important;
        }

        if (declarations2hash[data.id]) {
            declarations2hash[data.id] = false;
            result.eq.push(data);
        } else {
            result.ne1.push(data);
        }
    }

    for (let cursor = declarations2.head; cursor; cursor = cursor.next)  {
        const data = cursor.data;

        if (declarations2hash[data.id]) {
            // when declarations1 has an overriding declaration, this is not a difference
            // unless no !important is used on prev and !important is used on the following
            if (!hasOwnProperty.call(fingerprints, data.fingerprint) ||
                (!fingerprints[data.fingerprint] && data.important)) {
                result.ne2.push(data);
            }

            result.ne2overrided.push(data);
        }
    }

    return result;
}

function addSelectors(dest, source) {
    source.forEach((sourceData) => {
        const newStr = sourceData.id;
        let cursor = dest.head;

        while (cursor) {
            const nextStr = cursor.data.id;

            if (nextStr === newStr) {
                return;
            }

            if (nextStr > newStr) {
                break;
            }

            cursor = cursor.next;
        }

        dest.insert(dest.createItem(sourceData), cursor);
    });

    return dest;
}

// check if simpleselectors has no equal specificity and element selector
function hasSimilarSelectors(selectors1, selectors2) {
    let cursor1 = selectors1.head;

    while (cursor1 !== null) {
        let cursor2 = selectors2.head;

        while (cursor2 !== null) {
            if (cursor1.data.compareMarker === cursor2.data.compareMarker) {
                return true;
            }

            cursor2 = cursor2.next;
        }

        cursor1 = cursor1.next;
    }

    return false;
}

// test node can't to be skipped
function unsafeToSkipNode(node) {
    switch (node.type) {
        case 'Rule':
            // unsafe skip ruleset with selector similarities
            return hasSimilarSelectors(node.prelude.children, this);

        case 'Atrule':
            // can skip at-rules with blocks
            if (node.block) {
                // unsafe skip at-rule if block contains something unsafe to skip
                return node.block.children.some(unsafeToSkipNode, this);
            }
            break;

        case 'Declaration':
            return false;
    }

    // unsafe by default
    return true;
}


/***/ }),

/***/ "../../node_modules/csso/lib/syntax.js":
/*!*********************************************!*\
  !*** ../../node_modules/csso/lib/syntax.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compress": () => (/* reexport safe */ _compress_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findAll": () => (/* binding */ findAll),
/* harmony export */   "findLast": () => (/* binding */ findLast),
/* harmony export */   "fromPlainObject": () => (/* binding */ fromPlainObject),
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "lexer": () => (/* binding */ lexer),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "specificity": () => (/* reexport safe */ _restructure_prepare_specificity_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "toPlainObject": () => (/* binding */ toPlainObject),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "walk": () => (/* binding */ walk)
/* harmony export */ });
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-tree */ "../../node_modules/css-tree/lib/index.js");
/* harmony import */ var _compress_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compress.js */ "../../node_modules/csso/lib/compress.js");
/* harmony import */ var _restructure_prepare_specificity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./restructure/prepare/specificity.js */ "../../node_modules/csso/lib/restructure/prepare/specificity.js");




function encodeString(value) {
    const stringApostrophe = css_tree__WEBPACK_IMPORTED_MODULE_0__.string.encode(value, true);
    const stringQuote = css_tree__WEBPACK_IMPORTED_MODULE_0__.string.encode(value);

    return stringApostrophe.length < stringQuote.length
        ? stringApostrophe
        : stringQuote;
}

const {
    lexer,
    tokenize,
    parse,
    generate,
    walk,
    find,
    findLast,
    findAll,
    fromPlainObject,
    toPlainObject
} = (0,css_tree__WEBPACK_IMPORTED_MODULE_0__.fork)({
    node: {
        String: {
            generate(node) {
                this.token(css_tree__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.String, encodeString(node.value));
            }
        },
        Url: {
            generate(node) {
                const encodedUrl = css_tree__WEBPACK_IMPORTED_MODULE_0__.url.encode(node.value);
                const string = encodeString(node.value);

                this.token(css_tree__WEBPACK_IMPORTED_MODULE_0__.tokenTypes.Url,
                    encodedUrl.length <= string.length + 5 /* "url()".length */
                        ? encodedUrl
                        : 'url(' + string + ')'
                );
            }
        }
    }
});




/***/ }),

/***/ "../../node_modules/csso/lib/usage.js":
/*!********************************************!*\
  !*** ../../node_modules/csso/lib/usage.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildIndex": () => (/* binding */ buildIndex)
/* harmony export */ });
const { hasOwnProperty } = Object.prototype;

function buildMap(list, caseInsensitive) {
    const map = Object.create(null);

    if (!Array.isArray(list)) {
        return null;
    }

    for (let name of list) {
        if (caseInsensitive) {
            name = name.toLowerCase();
        }

        map[name] = true;
    }

    return map;
}

function buildList(data) {
    if (!data) {
        return null;
    }

    const tags = buildMap(data.tags, true);
    const ids = buildMap(data.ids);
    const classes = buildMap(data.classes);

    if (tags === null &&
        ids === null &&
        classes === null) {
        return null;
    }

    return {
        tags,
        ids,
        classes
    };
}

function buildIndex(data) {
    let scopes = false;

    if (data.scopes && Array.isArray(data.scopes)) {
        scopes = Object.create(null);

        for (let i = 0; i < data.scopes.length; i++) {
            const list = data.scopes[i];

            if (!list || !Array.isArray(list)) {
                throw new Error('Wrong usage format');
            }

            for (const name of list) {
                if (hasOwnProperty.call(scopes, name)) {
                    throw new Error(`Class can't be used for several scopes: ${name}`);
                }

                scopes[name] = i + 1;
            }
        }
    }

    return {
        whitelist: buildList(data),
        blacklist: buildList(data.blacklist),
        scopes
    };
}


/***/ }),

/***/ "../../node_modules/csso/lib/utils.js":
/*!********************************************!*\
  !*** ../../node_modules/csso/lib/utils.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addSelectors": () => (/* reexport safe */ _restructure_utils_js__WEBPACK_IMPORTED_MODULE_1__.addSelectors),
/* harmony export */   "compareDeclarations": () => (/* reexport safe */ _restructure_utils_js__WEBPACK_IMPORTED_MODULE_1__.compareDeclarations),
/* harmony export */   "hasSimilarSelectors": () => (/* reexport safe */ _restructure_utils_js__WEBPACK_IMPORTED_MODULE_1__.hasSimilarSelectors),
/* harmony export */   "isEqualDeclarations": () => (/* reexport safe */ _restructure_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqualDeclarations),
/* harmony export */   "isEqualSelectors": () => (/* reexport safe */ _restructure_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEqualSelectors),
/* harmony export */   "processSelector": () => (/* reexport safe */ _restructure_prepare_processSelector_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "unsafeToSkipNode": () => (/* reexport safe */ _restructure_utils_js__WEBPACK_IMPORTED_MODULE_1__.unsafeToSkipNode)
/* harmony export */ });
/* harmony import */ var _restructure_prepare_processSelector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restructure/prepare/processSelector.js */ "../../node_modules/csso/lib/restructure/prepare/processSelector.js");
/* harmony import */ var _restructure_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./restructure/utils.js */ "../../node_modules/csso/lib/restructure/utils.js");




/***/ }),

/***/ "./demo.json":
/*!*******************!*\
  !*** ./demo.json ***!
  \*******************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["interactive","getBestRoute","getBestTunnel","outside","getPathToPose","getPathTo","svg"]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./demo.svg.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./menu.ts");
/* harmony import */ var _snk_solver_getBestRoute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snk/solver/getBestRoute */ "../solver/getBestRoute.ts");
/* harmony import */ var _svg_creator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg-creator */ "../svg-creator/index.ts");
/* harmony import */ var _sample__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sample */ "./sample.ts");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas */ "./canvas.ts");
/* harmony import */ var _snk_solver_getPathToPose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @snk/solver/getPathToPose */ "../solver/getPathToPose.ts");






const chain = (0,_snk_solver_getBestRoute__WEBPACK_IMPORTED_MODULE_1__.getBestRoute)(_sample__WEBPACK_IMPORTED_MODULE_3__.grid, _sample__WEBPACK_IMPORTED_MODULE_3__.snake);
chain.push(...(0,_snk_solver_getPathToPose__WEBPACK_IMPORTED_MODULE_5__.getPathToPose)(chain.slice(-1)[0], _sample__WEBPACK_IMPORTED_MODULE_3__.snake));
(async () => {
    const svg = await (0,_svg_creator__WEBPACK_IMPORTED_MODULE_2__.createSvg)(_sample__WEBPACK_IMPORTED_MODULE_3__.grid, chain, _canvas__WEBPACK_IMPORTED_MODULE_4__.drawOptions, { frameDuration: 200 });
    const container = document.createElement("div");
    container.innerHTML = svg;
    document.body.appendChild(container);
})();

})();

/******/ })()
;