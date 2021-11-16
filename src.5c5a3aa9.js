// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"s7rS":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ldexp = exports.frexp = exports.floatToNum = exports.asIntegerRatio = exports.binToFloat = exports.numTo64BitBinary = exports.addZeroes = void 0;

var addZeroes = function addZeroes(num) {
  if (num === 0 && 1 / num == -Infinity) {
    return '-0.0';
  }

  return +Number.isInteger(num) ? num.toFixed(1) : num.toString();
};

exports.addZeroes = addZeroes;

var numTo64BitBinary = function numTo64BitBinary(n) {
  return n.toString(2).padStart(64, '0');
};

exports.numTo64BitBinary = numTo64BitBinary;

var binToFloat = function binToFloat(binary) {
  var sign_bit = binary.slice(0, 1);
  var exponent_bits = binary.slice(1, 12);
  var mantissa_bits = binary.slice(12, 64);
  var sign = sign_bit === '0' ? 1 : -1;
  var exponent = parseInt(exponent_bits, 2);
  var mantissa = parseInt(mantissa_bits, 2);
  var first_mantissa_bit = exponent === 0 ? 0 : 1;

  if (exponent === 2047 && mantissa !== 0) {
    return NaN;
  }

  return sign * (first_mantissa_bit + mantissa / Math.pow(2, 52)) * Math.pow(2, (exponent || 1) - 1023);
};

exports.binToFloat = binToFloat;

var asIntegerRatio = function asIntegerRatio(f) {
  f = Math.abs(f);

  var _ref = (0, exports.frexp)(f),
      _ref2 = _slicedToArray(_ref, 2),
      float_part = _ref2[0],
      exponent = _ref2[1];

  for (var i = 0; i < 300 && float_part != Math.floor(float_part); i++) {
    float_part *= 2.0;
    exponent--;
  }

  var numerator = BigInt(Math.floor(float_part));
  var denumerator = 1n;
  var abs_exponent = BigInt(Math.abs(exponent));

  if (exponent > 0) {
    numerator <<= abs_exponent;
  } else {
    denumerator <<= abs_exponent;
  }

  return [numerator, denumerator];
};

exports.asIntegerRatio = asIntegerRatio;

var floatToNum = function floatToNum(number) {
  var f = new Float64Array(1);
  f[0] = number;
  var view = new Uint8Array(f.buffer);
  var i,
      result = '';

  for (i = view.length - 1; i >= 0; i--) {
    var bits = view[i].toString(2);

    if (bits.length < 8) {
      bits = new Array(8 - bits.length).fill('0').join('') + bits;
    }

    result += bits;
  }

  return BigInt('0b' + result);
};

exports.floatToNum = floatToNum;

var frexp = function frexp(value) {
  if (value === 0) return [value, 0];
  var data = new DataView(new ArrayBuffer(8));
  data.setFloat64(0, value);
  var bits = data.getUint32(0) >>> 20 & 0x7ff;

  if (bits === 0) {
    data.setFloat64(0, value * Math.pow(2, 64));
    bits = (data.getUint32(0) >>> 20 & 0x7ff) - 64;
  }

  var exponent = bits - 1022;
  var mantissa = (0, exports.ldexp)(value, -exponent);
  return [mantissa, exponent];
};

exports.frexp = frexp;

var ldexp = function ldexp(mantissa, exponent) {
  var steps = Math.min(3, Math.ceil(Math.abs(exponent) / 1023));
  var result = mantissa;

  for (var i = 0; i < steps; i++) {
    result *= Math.pow(2, Math.floor((exponent + i) / steps));
  }

  return result;
};

exports.ldexp = ldexp;
},{}],"VmMX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unregister = exports.register = void 0;
var isLocalhost = Boolean(window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/));

function register() {
  if ("production" === 'production' && 'serviceWorker' in navigator) {
    var publicUrl = new URL(undefined, window.location.toString());

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', function () {
      var swUrl = "".concat(undefined, "/service-worker.js");

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(function () {
          console.log('This web app is being served cache-first by a service ' + 'worker. To learn more, visit https://goo.gl/SC7cgQ');
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

exports.register = register;

function registerValidSW(swUrl) {
  navigator.serviceWorker.register(swUrl).then(function (registration) {
    registration.onupdatefound = function () {
      var installingWorker = registration.installing;

      if (installingWorker) {
        installingWorker.onstatechange = function () {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
      }
    };
  }).catch(function (error) {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl).then(function (response) {
    if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.unregister().then(function () {
          window.location.reload();
        });
      });
    } else {
      registerValidSW(swUrl);
    }
  }).catch(function () {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}

exports.unregister = unregister;
},{}],"QCba":[function(require,module,exports) {
"use strict";

var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var logic_1 = require("./logic");

var serviceWorker = __importStar(require("./serviceWorker"));

serviceWorker.register();
var $bits = document.querySelectorAll('input.bit');
var $decimal = document.querySelector('#decimal');
var $actual = document.querySelector('#actual');
var $binary = document.querySelector('#binary');
var $hex = document.querySelector('#hex');
var $sign = document.querySelector('#sign');
var $exponent = document.querySelector('#exponent');
var $mantissa = document.querySelector('#mantissa');
var $enc_sign = document.querySelector('#enc_sign');
var $enc_exponent = document.querySelector('#enc_exponent');
var $enc_mantissa = document.querySelector('#enc_mantissa');
var decimal = '0.0';
var actual = '0.0';
var binary = '0'.repeat(64);
var hex = '0x0';
var sign = '+1';
var exponent = '-1023 (denormalized)';
var mantissa = '1.0 (denormalized)';
var enc_sign = '0';
var enc_exponent = '0';
var enc_mantissa = '0';

var flipBit = function flipBit(bit) {
  var target = bit;

  if (target.tagName === 'INPUT' && target.parentNode) {
    target.parentNode.style.color = target.checked ? '#000000' : '#EEEEEE';
    target.parentNode.style.background = target.checked ? '#EEEEEE' : '#222222';
  }
};

var actualFrom = function actualFrom(f) {
  if (!Number.isFinite(f) || Number.isNaN(f)) {
    return f.toString();
  }

  var _ref = (0, logic_1.asIntegerRatio)(f),
      _ref2 = _slicedToArray(_ref, 2),
      n = _ref2[0],
      d = _ref2[1];

  var exp = d.toString(2).length - 1;
  var int = eval('(n * 5n ** BigInt(exp)).toString()');
  exp = -exp;
  var leftdigits = exp + int.length;
  var dotplace;

  if (exp <= 0 && leftdigits > -6) {
    dotplace = leftdigits;
  } else {
    dotplace = 1;
  }

  var intpart;
  var fracpart;

  if (dotplace <= 0) {
    intpart = '0';
    fracpart = '.' + '0'.repeat(-dotplace) + int;
  } else if (dotplace >= int.length) {
    intpart = int + '0'.repeat(dotplace - int.length);
    fracpart = '';
  } else {
    intpart = int.slice(0, dotplace);
    fracpart = '.' + int.slice(dotplace);
  }

  var s_exp = leftdigits == dotplace ? '' : 'e' + (leftdigits - dotplace);
  return (Math.sign(f) < 0 ? '-' : '') + intpart + fracpart + s_exp;
};

var updateInputs = function updateInputs(inputs) {
  var bits = inputs || Array.from($bits).map(function (el) {
    return el.checked ? 1 : 0;
  }).join('');
  var sign_bit = bits.slice(0, 1);
  var exponent_bits = bits.slice(1, 12);
  var mantissa_bits = bits.slice(12, 64);
  var exp = parseInt(exponent_bits, 2);
  var m = parseInt(mantissa_bits, 2);
  sign = sign_bit === '0' ? '+1' : '-1';
  exponent = "".concat(exp - 1023).concat(exp === 0 ? ' (denormalized)' : '');
  mantissa = "".concat((0, logic_1.addZeroes)((exp === 0 ? 0 : 1) + m / Math.pow(2, 52))).concat(exp === 0 ? ' (denormalized)' : '');
  enc_sign = sign_bit;
  enc_exponent = exp.toString();
  enc_mantissa = parseInt(mantissa_bits, 2).toString();
  var num = BigInt('0b' + bits) & 0xffffffffffffffffn;
  var float = (0, logic_1.binToFloat)(bits);
  decimal = (0, logic_1.addZeroes)(float);
  actual = actualFrom(float);
  binary = num.toString(2).padStart(64, '0');
  hex = '0x' + num.toString(16);
  $bits.forEach(function (bit, i) {
    bit.checked = bits[i] === '1' ? true : false;
    flipBit(bit);
  });
  $decimal.value = decimal;
  $actual.value = actual;
  $binary.value = binary;
  $hex.value = hex;
  $sign.textContent = sign;
  $exponent.textContent = exponent;
  $mantissa.textContent = mantissa;
  $enc_sign.textContent = enc_sign;
  $enc_exponent.textContent = enc_exponent;
  $enc_mantissa.textContent = enc_mantissa;
};

$bits.forEach(function (bit) {
  bit.addEventListener('click', function () {
    flipBit(bit);
    updateInputs();
  });
});
$decimal === null || $decimal === void 0 ? void 0 : $decimal.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    var _parseFloat;

    var float = (_parseFloat = parseFloat(e.target.value)) !== null && _parseFloat !== void 0 ? _parseFloat : 0.0;
    updateInputs((0, logic_1.numTo64BitBinary)((0, logic_1.floatToNum)(float)));
  }
});
(_document$querySelect = document.querySelector('#plus')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', function () {
  var current_number = BigInt(hex);
  var new_number = current_number + 1n & 0xffffffffffffffffn;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
(_document$querySelect2 = document.querySelector('#minus')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.addEventListener('click', function () {
  var current_number = BigInt(hex);
  var new_number = current_number === 0n ? 0xffffffffffffffffn : current_number - 1n;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
(_document$querySelect3 = document.querySelector('#lshift')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.addEventListener('click', function () {
  var current_number = BigInt(hex);
  var new_number = current_number << 1n & 0xffffffffffffffffn;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
(_document$querySelect4 = document.querySelector('#rshift')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.addEventListener('click', function () {
  var current_number = BigInt(hex);
  var new_number = current_number >> 1n;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
},{"./logic":"s7rS","./serviceWorker":"VmMX"}]},{},["QCba"], null)
//# sourceMappingURL=src.5c5a3aa9.js.map