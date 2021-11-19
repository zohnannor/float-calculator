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
})({"logic.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ldexp = exports.frexp = exports.floatToNum = exports.asIntegerRatio = exports.binToFloat = exports.numTo64BitBinary = exports.addZeroes = void 0;

const addZeroes = num => {
  if (num === 0 && 1 / num == -Infinity) {
    return '-0.0';
  }

  return +Number.isInteger(num) ? num.toFixed(1) : num.toString();
};

exports.addZeroes = addZeroes;

const numTo64BitBinary = n => {
  return n.toString(2).padStart(64, '0');
};

exports.numTo64BitBinary = numTo64BitBinary;

const binToFloat = binary => {
  const sign_bit = binary.slice(0, 1);
  const exponent_bits = binary.slice(1, 12);
  const mantissa_bits = binary.slice(12, 64);
  const sign = sign_bit === '0' ? 1 : -1;
  const exponent = parseInt(exponent_bits, 2);
  const mantissa = parseInt(mantissa_bits, 2);
  const first_mantissa_bit = exponent === 0 ? 0 : 1;

  if (exponent === 0b11111111111 && mantissa !== 0) {
    return NaN;
  }

  return sign * (first_mantissa_bit + mantissa / 2 ** 52) * 2 ** ((exponent || 1) - 1023);
};

exports.binToFloat = binToFloat;

const asIntegerRatio = f => {
  f = Math.abs(f);
  let [float_part, exponent] = (0, exports.frexp)(f);

  for (let i = 0; i < 300 && float_part != Math.floor(float_part); i++) {
    float_part *= 2.0;
    exponent--;
  }

  let numerator = BigInt(Math.floor(float_part));
  let denumerator = 1n;
  let abs_exponent = BigInt(Math.abs(exponent));

  if (exponent > 0) {
    numerator <<= abs_exponent;
  } else {
    denumerator <<= abs_exponent;
  }

  return [numerator, denumerator];
};

exports.asIntegerRatio = asIntegerRatio;

const floatToNum = number => {
  const f = new Float64Array(1);
  f[0] = number;
  const view = new Uint8Array(f.buffer);
  let i,
      result = '';

  for (i = view.length - 1; i >= 0; i--) {
    let bits = view[i].toString(2);

    if (bits.length < 8) {
      bits = new Array(8 - bits.length).fill('0').join('') + bits;
    }

    result += bits;
  }

  return BigInt('0b' + result);
};

exports.floatToNum = floatToNum;

const frexp = value => {
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

const ldexp = (mantissa, exponent) => {
  var steps = Math.min(3, Math.ceil(Math.abs(exponent) / 1023));
  var result = mantissa;

  for (var i = 0; i < steps; i++) result *= Math.pow(2, Math.floor((exponent + i) / steps));

  return result;
};

exports.ldexp = ldexp;
},{}],"serviceWorker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unregister = exports.register = void 0;
const isLocalhost = Boolean(window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/));

function register() {
  if ("development" === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(undefined, window.location.toString());

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${undefined}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(() => {
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
  navigator.serviceWorker.register(swUrl).then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      if (installingWorker) {
        installingWorker.onstatechange = () => {
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
  }).catch(error => {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl).then(response => {
    if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      registerValidSW(swUrl);
    }
  }).catch(() => {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

exports.unregister = unregister;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
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
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const logic_1 = require("./logic");

const serviceWorker = __importStar(require("./serviceWorker"));

serviceWorker.register();
const $bits = document.querySelectorAll('input.bit');
const $decimal = document.querySelector('#decimal');
const $actual = document.querySelector('#actual');
const $binary = document.querySelector('#binary');
const $hex = document.querySelector('#hex');
const $sign = document.querySelector('#sign');
const $exponent = document.querySelector('#exponent');
const $mantissa = document.querySelector('#mantissa');
const $enc_sign = document.querySelector('#enc_sign');
const $enc_exponent = document.querySelector('#enc_exponent');
const $enc_mantissa = document.querySelector('#enc_mantissa');
let decimal = '0.0';
let actual = '0.0';
let binary = '0'.repeat(64);
let hex = '0x0';
let sign = '+1';
let exponent = '-1023 (denormalized)';
let mantissa = '1.0 (denormalized)';
let enc_sign = '0';
let enc_exponent = '0';
let enc_mantissa = '0';

const flipBit = bit => {
  const target = bit;

  if (target.tagName === 'INPUT' && target.parentNode) {
    target.parentNode.style.color = target.checked ? '#000000' : '#EEEEEE';
    target.parentNode.style.background = target.checked ? '#EEEEEE' : '#222222';
  }
};

const actualFrom = f => {
  if (!Number.isFinite(f) || Number.isNaN(f)) {
    return f.toString();
  }

  let [n, d] = (0, logic_1.asIntegerRatio)(f);
  let exp = d.toString(2).length - 1;
  const int = (n * 5n ** BigInt(exp)).toString();
  exp = -exp;
  const leftdigits = exp + int.length;
  let dotplace;

  if (exp <= 0 && leftdigits > -6) {
    dotplace = leftdigits;
  } else {
    dotplace = 1;
  }

  let intpart;
  let fracpart;

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

  const s_exp = leftdigits == dotplace ? '' : 'e' + (leftdigits - dotplace);
  return (Math.sign(f) < 0 ? '-' : '') + intpart + fracpart + s_exp;
};

const updateInputs = inputs => {
  const bits = inputs || Array.from($bits).map(el => el.checked ? 1 : 0).join('');
  const sign_bit = bits.slice(0, 1);
  const exponent_bits = bits.slice(1, 12);
  const mantissa_bits = bits.slice(12, 64);
  const exp = parseInt(exponent_bits, 2);
  const m = parseInt(mantissa_bits, 2);
  sign = sign_bit === '0' ? '+1' : '-1';
  exponent = `${exp - 1023}${exp === 0 ? ' (denormalized)' : ''}`;
  mantissa = `${(0, logic_1.addZeroes)((exp === 0 ? 0 : 1) + m / 2 ** 52)}${exp === 0 ? ' (denormalized)' : ''}`;
  enc_sign = sign_bit;
  enc_exponent = exp.toString();
  enc_mantissa = parseInt(mantissa_bits, 2).toString();
  const num = BigInt('0b' + bits) & 0xffffffffffffffffn;
  const float = (0, logic_1.binToFloat)(bits);
  decimal = (0, logic_1.addZeroes)(float);
  actual = actualFrom(float);
  binary = num.toString(2).padStart(64, '0');
  hex = '0x' + num.toString(16);
  $bits.forEach((bit, i) => {
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

$bits.forEach(bit => {
  bit.addEventListener('click', () => {
    flipBit(bit);
    updateInputs();
  });
});
$decimal?.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const float = parseFloat(e.target.value) ?? 0.0;
    updateInputs((0, logic_1.numTo64BitBinary)((0, logic_1.floatToNum)(float)));
  }
});
document.querySelector('#plus')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = current_number + 1n & 0xffffffffffffffffn;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
document.querySelector('#minus')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = current_number === 0n ? 0xffffffffffffffffn : current_number - 1n;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
document.querySelector('#lshift')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = current_number << 1n & 0xffffffffffffffffn;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
document.querySelector('#rshift')?.addEventListener('click', () => {
  const current_number = BigInt(hex);
  const new_number = current_number >> 1n;
  updateInputs((0, logic_1.numTo64BitBinary)(new_number));
});
},{"./logic":"logic.ts","./serviceWorker":"serviceWorker.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55542" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map