webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(8)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    encode: __webpack_require__(388)
  , decode: __webpack_require__(389)
  , encodingLength: __webpack_require__(390)
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer
var Transform = __webpack_require__(128).Transform
var StringDecoder = __webpack_require__(133).StringDecoder
var inherits = __webpack_require__(7)

function CipherBase (hashMode) {
  Transform.call(this)
  this.hashMode = typeof hashMode === 'string'
  if (this.hashMode) {
    this[hashMode] = this._finalOrDigest
  } else {
    this.final = this._finalOrDigest
  }
  if (this._final) {
    this.__final = this._final
    this._final = null
  }
  this._decoder = null
  this._encoding = null
}
inherits(CipherBase, Transform)

CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
  if (typeof data === 'string') {
    data = Buffer.from(data, inputEnc)
  }

  var outData = this._update(data)
  if (this.hashMode) return this

  if (outputEnc) {
    outData = this._toString(outData, outputEnc)
  }

  return outData
}

CipherBase.prototype.setAutoPadding = function () {}
CipherBase.prototype.getAuthTag = function () {
  throw new Error('trying to get auth tag in unsupported state')
}

CipherBase.prototype.setAuthTag = function () {
  throw new Error('trying to set auth tag in unsupported state')
}

CipherBase.prototype.setAAD = function () {
  throw new Error('trying to set aad in unsupported state')
}

CipherBase.prototype._transform = function (data, _, next) {
  var err
  try {
    if (this.hashMode) {
      this._update(data)
    } else {
      this.push(this._update(data))
    }
  } catch (e) {
    err = e
  } finally {
    next(err)
  }
}
CipherBase.prototype._flush = function (done) {
  var err
  try {
    this.push(this.__final())
  } catch (e) {
    err = e
  }

  done(err)
}
CipherBase.prototype._finalOrDigest = function (outputEnc) {
  var outData = this.__final() || Buffer.alloc(0)
  if (outputEnc) {
    outData = this._toString(outData, outputEnc, true)
  }
  return outData
}

CipherBase.prototype._toString = function (value, enc, fin) {
  if (!this._decoder) {
    this._decoder = new StringDecoder(enc)
    this._encoding = enc
  }

  if (this._encoding !== enc) throw new Error('can\'t switch encodings')

  var out = this._decoder.write(value)
  if (fin) {
    out += this._decoder.end()
  }

  return out
}

module.exports = CipherBase


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(111);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(69);
util.inherits = __webpack_require__(7);
/*</replacement>*/

var Readable = __webpack_require__(263);
var Writable = __webpack_require__(136);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var asn1 = exports;

asn1.bignum = __webpack_require__(341);

asn1.define = __webpack_require__(410).define;
asn1.base = __webpack_require__(71);
asn1.constants = __webpack_require__(274);
asn1.decoders = __webpack_require__(415);
asn1.encoders = __webpack_require__(417);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer

// prototype class for hash functions
function Hash (blockSize, finalSize) {
  this._block = Buffer.alloc(blockSize)
  this._finalSize = finalSize
  this._blockSize = blockSize
  this._len = 0
}

Hash.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    enc = enc || 'utf8'
    data = Buffer.from(data, enc)
  }

  var block = this._block
  var blockSize = this._blockSize
  var length = data.length
  var accum = this._len

  for (var offset = 0; offset < length;) {
    var assigned = accum % blockSize
    var remainder = Math.min(length - offset, blockSize - assigned)

    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i]
    }

    accum += remainder
    offset += remainder

    if ((accum % blockSize) === 0) {
      this._update(block)
    }
  }

  this._len += length
  return this
}

Hash.prototype.digest = function (enc) {
  var rem = this._len % this._blockSize

  this._block[rem] = 0x80

  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
  this._block.fill(0, rem + 1)

  if (rem >= this._finalSize) {
    this._update(this._block)
    this._block.fill(0)
  }

  var bits = this._len * 8

  // uint32
  if (bits <= 0xffffffff) {
    this._block.writeUInt32BE(bits, this._blockSize - 4)

  // uint64
  } else {
    var lowBits = bits & 0xffffffff
    var highBits = (bits - lowBits) / 0x100000000

    this._block.writeUInt32BE(highBits, this._blockSize - 8)
    this._block.writeUInt32BE(lowBits, this._blockSize - 4)
  }

  this._update(this._block)
  var hash = this._hash()

  return enc ? hash.toString(enc) : hash
}

Hash.prototype._update = function () {
  throw new Error('_update must be implemented by subclass')
}

module.exports = Hash


/***/ }),
/* 68 */,
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function xor (a, b) {
  var length = Math.min(a.length, b.length)
  var buffer = new Buffer(length)

  for (var i = 0; i < length; ++i) {
    buffer[i] = a[i] ^ b[i]
  }

  return buffer
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var base = exports;

base.Reporter = __webpack_require__(412).Reporter;
base.DecoderBuffer = __webpack_require__(273).DecoderBuffer;
base.EncoderBuffer = __webpack_require__(273).EncoderBuffer;
base.Node = __webpack_require__(413);


/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const multihash = __webpack_require__(340)
const crypto = __webpack_require__(397)

module.exports = Multihashing

/**
 * Hash the given `buf` using the algorithm specified
 * by `func`.
 *
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} func - The algorithm to use.
 * @param {number} [length] - Optionally trim the result to this length.
 * @param {function(Error, Buffer)} callback
 * @returns {undefined}
 */
function Multihashing (buf, func, length, callback) {
  if (typeof length === 'function') {
    callback = length
    length = undefined
  }

  if (!callback) {
    throw new Error('Missing callback')
  }

  Multihashing.digest(buf, func, length, (err, digest) => {
    if (err) {
      return callback(err)
    }

    callback(null, multihash.encode(digest, func, length))
  })
}

/**
 * The `buffer` module for easy use in the browser.
 *
 * @type {Buffer}
 */
Multihashing.Buffer = Buffer // for browser things

/**
 * Expose multihash itself, to avoid silly double requires.
 */
Multihashing.multihash = multihash

/**
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} func - The algorithm to use.
 * @param {number} [length] - Optionally trim the result to this length.
 * @param {function(Error, Buffer)} callback
 * @returns {undefined}
 */
Multihashing.digest = function (buf, func, length, callback) {
  if (typeof length === 'function') {
    callback = length
    length = undefined
  }

  if (!callback) {
    throw new Error('Missing callback')
  }

  let cb = callback
  if (length) {
    cb = (err, digest) => {
      if (err) {
        return callback(err)
      }

      callback(null, digest.slice(0, length))
    }
  }

  let hash
  try {
    hash = Multihashing.createHash(func)
  } catch (err) {
    return cb(err)
  }

  hash(buf, cb)
}

/**
 * @param {string|number} func
 *
 * @returns {function} - The to `func` corresponding hash function.
 */
Multihashing.createHash = function (func) {
  func = multihash.coerceCode(func)
  if (!Multihashing.functions[func]) {
    throw new Error('multihash function ' + func + ' not yet supported')
  }

  return Multihashing.functions[func]
}

/**
 * Mapping of multihash codes to their hashing functions.
 * @type {Object}
 */
Multihashing.functions = {
  // sha1
  0x11: crypto.sha1,
  // sha2-256
  0x12: crypto.sha2256,
  // sha2-512
  0x13: crypto.sha2512,
  // sha3-512
  0x14: crypto.sha3512,
  // sha3-384
  0x15: crypto.sha3384,
  // sha3-256
  0x16: crypto.sha3256,
  // sha3-224
  0x17: crypto.sha3224,
  // shake-128
  0x18: crypto.shake128,
  // shake-256
  0x19: crypto.shake256,
  // keccak-224
  0x1A: crypto.keccak224,
  // keccak-256
  0x1B: crypto.keccak256,
  // keccak-384
  0x1C: crypto.keccak384,
  // keccak-512
  0x1D: crypto.keccak512,
  // murmur3-128
  0x22: crypto.murmur3128,
  // murmur3-32
  0x23: crypto.murmur332
}

// add blake functions
crypto.addBlake(Multihashing.functions)

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// based on the aes implimentation in triple sec
// https://github.com/keybase/triplesec
// which is in turn based on the one from crypto-js
// https://code.google.com/p/crypto-js/

var Buffer = __webpack_require__(6).Buffer

function asUInt32Array (buf) {
  if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)

  var len = (buf.length / 4) | 0
  var out = new Array(len)

  for (var i = 0; i < len; i++) {
    out[i] = buf.readUInt32BE(i * 4)
  }

  return out
}

function scrubVec (v) {
  for (var i = 0; i < v.length; v++) {
    v[i] = 0
  }
}

function cryptBlock (M, keySchedule, SUB_MIX, SBOX, nRounds) {
  var SUB_MIX0 = SUB_MIX[0]
  var SUB_MIX1 = SUB_MIX[1]
  var SUB_MIX2 = SUB_MIX[2]
  var SUB_MIX3 = SUB_MIX[3]

  var s0 = M[0] ^ keySchedule[0]
  var s1 = M[1] ^ keySchedule[1]
  var s2 = M[2] ^ keySchedule[2]
  var s3 = M[3] ^ keySchedule[3]
  var t0, t1, t2, t3
  var ksRow = 4

  for (var round = 1; round < nRounds; round++) {
    t0 = SUB_MIX0[s0 >>> 24] ^ SUB_MIX1[(s1 >>> 16) & 0xff] ^ SUB_MIX2[(s2 >>> 8) & 0xff] ^ SUB_MIX3[s3 & 0xff] ^ keySchedule[ksRow++]
    t1 = SUB_MIX0[s1 >>> 24] ^ SUB_MIX1[(s2 >>> 16) & 0xff] ^ SUB_MIX2[(s3 >>> 8) & 0xff] ^ SUB_MIX3[s0 & 0xff] ^ keySchedule[ksRow++]
    t2 = SUB_MIX0[s2 >>> 24] ^ SUB_MIX1[(s3 >>> 16) & 0xff] ^ SUB_MIX2[(s0 >>> 8) & 0xff] ^ SUB_MIX3[s1 & 0xff] ^ keySchedule[ksRow++]
    t3 = SUB_MIX0[s3 >>> 24] ^ SUB_MIX1[(s0 >>> 16) & 0xff] ^ SUB_MIX2[(s1 >>> 8) & 0xff] ^ SUB_MIX3[s2 & 0xff] ^ keySchedule[ksRow++]
    s0 = t0
    s1 = t1
    s2 = t2
    s3 = t3
  }

  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++]
  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++]
  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++]
  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++]
  t0 = t0 >>> 0
  t1 = t1 >>> 0
  t2 = t2 >>> 0
  t3 = t3 >>> 0

  return [t0, t1, t2, t3]
}

// AES constants
var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]
var G = (function () {
  // Compute double table
  var d = new Array(256)
  for (var j = 0; j < 256; j++) {
    if (j < 128) {
      d[j] = j << 1
    } else {
      d[j] = (j << 1) ^ 0x11b
    }
  }

  var SBOX = []
  var INV_SBOX = []
  var SUB_MIX = [[], [], [], []]
  var INV_SUB_MIX = [[], [], [], []]

  // Walk GF(2^8)
  var x = 0
  var xi = 0
  for (var i = 0; i < 256; ++i) {
    // Compute sbox
    var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4)
    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63
    SBOX[x] = sx
    INV_SBOX[sx] = x

    // Compute multiplication
    var x2 = d[x]
    var x4 = d[x2]
    var x8 = d[x4]

    // Compute sub bytes, mix columns tables
    var t = (d[sx] * 0x101) ^ (sx * 0x1010100)
    SUB_MIX[0][x] = (t << 24) | (t >>> 8)
    SUB_MIX[1][x] = (t << 16) | (t >>> 16)
    SUB_MIX[2][x] = (t << 8) | (t >>> 24)
    SUB_MIX[3][x] = t

    // Compute inv sub bytes, inv mix columns tables
    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100)
    INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8)
    INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16)
    INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24)
    INV_SUB_MIX[3][sx] = t

    if (x === 0) {
      x = xi = 1
    } else {
      x = x2 ^ d[d[d[x8 ^ x2]]]
      xi ^= d[d[xi]]
    }
  }

  return {
    SBOX: SBOX,
    INV_SBOX: INV_SBOX,
    SUB_MIX: SUB_MIX,
    INV_SUB_MIX: INV_SUB_MIX
  }
})()

function AES (key) {
  this._key = asUInt32Array(key)
  this._reset()
}

AES.blockSize = 4 * 4
AES.keySize = 256 / 8
AES.prototype.blockSize = AES.blockSize
AES.prototype.keySize = AES.keySize
AES.prototype._reset = function () {
  var keyWords = this._key
  var keySize = keyWords.length
  var nRounds = keySize + 6
  var ksRows = (nRounds + 1) * 4

  var keySchedule = []
  for (var k = 0; k < keySize; k++) {
    keySchedule[k] = keyWords[k]
  }

  for (k = keySize; k < ksRows; k++) {
    var t = keySchedule[k - 1]

    if (k % keySize === 0) {
      t = (t << 8) | (t >>> 24)
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff])

      t ^= RCON[(k / keySize) | 0] << 24
    } else if (keySize > 6 && k % keySize === 4) {
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff])
    }

    keySchedule[k] = keySchedule[k - keySize] ^ t
  }

  var invKeySchedule = []
  for (var ik = 0; ik < ksRows; ik++) {
    var ksR = ksRows - ik
    var tt = keySchedule[ksR - (ik % 4 ? 0 : 4)]

    if (ik < 4 || ksR <= 4) {
      invKeySchedule[ik] = tt
    } else {
      invKeySchedule[ik] =
        G.INV_SUB_MIX[0][G.SBOX[tt >>> 24]] ^
        G.INV_SUB_MIX[1][G.SBOX[(tt >>> 16) & 0xff]] ^
        G.INV_SUB_MIX[2][G.SBOX[(tt >>> 8) & 0xff]] ^
        G.INV_SUB_MIX[3][G.SBOX[tt & 0xff]]
    }
  }

  this._nRounds = nRounds
  this._keySchedule = keySchedule
  this._invKeySchedule = invKeySchedule
}

AES.prototype.encryptBlockRaw = function (M) {
  M = asUInt32Array(M)
  return cryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX, this._nRounds)
}

AES.prototype.encryptBlock = function (M) {
  var out = this.encryptBlockRaw(M)
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[1], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[3], 12)
  return buf
}

AES.prototype.decryptBlock = function (M) {
  M = asUInt32Array(M)

  // swap
  var m1 = M[1]
  M[1] = M[3]
  M[3] = m1

  var out = cryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX, this._nRounds)
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[3], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[1], 12)
  return buf
}

AES.prototype.scrub = function () {
  scrubVec(this._keySchedule)
  scrubVec(this._invKeySchedule)
  scrubVec(this._key)
}

module.exports.AES = AES


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(6).Buffer
var optimized = __webpack_require__(440)

function BN () {
  this.negative = 0
  this.words = null
  this.length = 0
}

BN.fromNumber = function (n) {
  var bn = new BN()
  bn.words = [n & 0x03ffffff]
  bn.length = 1
  return bn
}

BN.fromBuffer = function (b32) {
  var bn = new BN()

  bn.words = new Array(10)
  bn.words[0] = (b32[28] & 0x03) << 24 | b32[29] << 16 | b32[30] << 8 | b32[31]
  bn.words[1] = (b32[25] & 0x0F) << 22 | b32[26] << 14 | b32[27] << 6 | b32[28] >>> 2
  bn.words[2] = (b32[22] & 0x3F) << 20 | b32[23] << 12 | b32[24] << 4 | b32[25] >>> 4
  bn.words[3] = (b32[19] & 0xFF) << 18 | b32[20] << 10 | b32[21] << 2 | b32[22] >>> 6

  bn.words[4] = (b32[15] & 0x03) << 24 | b32[16] << 16 | b32[17] << 8 | b32[18]
  bn.words[5] = (b32[12] & 0x0F) << 22 | b32[13] << 14 | b32[14] << 6 | b32[15] >>> 2
  bn.words[6] = (b32[9] & 0x3F) << 20 | b32[10] << 12 | b32[11] << 4 | b32[12] >>> 4
  bn.words[7] = (b32[6] & 0xFF) << 18 | b32[7] << 10 | b32[8] << 2 | b32[9] >>> 6

  bn.words[8] = (b32[2] & 0x03) << 24 | b32[3] << 16 | b32[4] << 8 | b32[5]
  bn.words[9] = b32[0] << 14 | b32[1] << 6 | b32[2] >>> 2

  bn.length = 10
  return bn.strip()
}

BN.prototype.toBuffer = function () {
  var w = this.words
  for (var i = this.length; i < 10; ++i) w[i] = 0

  return Buffer.from([
    (w[9] >>> 14) & 0xFF, (w[9] >>> 6) & 0xFF, (w[9] & 0x3F) << 2 | ((w[8] >>> 24) & 0x03), // 0, 1, 2
    (w[8] >>> 16) & 0xFF, (w[8] >>> 8) & 0xFF, w[8] & 0xFF, // 3, 4, 5

    (w[7] >>> 18) & 0xFF, (w[7] >>> 10) & 0xFF, (w[7] >>> 2) & 0xFF, // 6, 7, 8
    ((w[7] & 0x03) << 6) | ((w[6] >>> 20) & 0x3F), (w[6] >>> 12) & 0xFF, (w[6] >>> 4) & 0xFF, // 9, 10, 11
    ((w[6] & 0x0F) << 4) | ((w[5] >>> 22) & 0x0F), (w[5] >>> 14) & 0xFF, (w[5] >>> 6) & 0xFF, // 12, 13, 14
    ((w[5] & 0x3F) << 2) | ((w[4] >>> 24) & 0x03), (w[4] >>> 16) & 0xFF, (w[4] >>> 8) & 0xFF, w[4] & 0xFF, // 15, 16, 17, 18

    (w[3] >>> 18) & 0xFF, (w[3] >>> 10) & 0xFF, (w[3] >>> 2) & 0xFF, // 19, 20, 21
    ((w[3] & 0x03) << 6) | ((w[2] >>> 20) & 0x3F), (w[2] >>> 12) & 0xFF, (w[2] >>> 4) & 0xFF, // 22, 23, 24
    ((w[2] & 0x0F) << 4) | ((w[1] >>> 22) & 0x0F), (w[1] >>> 14) & 0xFF, (w[1] >>> 6) & 0xFF, // 25, 26, 27
    ((w[1] & 0x3F) << 2) | ((w[0] >>> 24) & 0x03), (w[0] >>> 16) & 0xFF, (w[0] >>> 8) & 0xFF, w[0] & 0xFF // 28, 29, 30, 31
  ])
}

BN.prototype.clone = function () {
  var r = new BN()
  r.words = new Array(this.length)
  for (var i = 0; i < this.length; i++) r.words[i] = this.words[i]
  r.length = this.length
  r.negative = this.negative
  return r
}

BN.prototype.strip = function () {
  while (this.length > 1 && (this.words[this.length - 1] | 0) === 0) this.length--
  return this
}

BN.prototype.normSign = function () {
  // -0 = 0
  if (this.length === 1 && this.words[0] === 0) this.negative = 0
  return this
}

BN.prototype.isEven = function () {
  return (this.words[0] & 1) === 0
}

BN.prototype.isOdd = function () {
  return (this.words[0] & 1) === 1
}

BN.prototype.isZero = function () {
  return this.length === 1 && this.words[0] === 0
}

BN.prototype.ucmp = function (num) {
  if (this.length !== num.length) return this.length > num.length ? 1 : -1

  for (var i = this.length - 1; i >= 0; --i) {
    if (this.words[i] !== num.words[i]) return this.words[i] > num.words[i] ? 1 : -1
  }

  return 0
}

BN.prototype.gtOne = function () {
  return this.length > 1 || this.words[0] > 1
}

BN.prototype.isOverflow = function () {
  return this.ucmp(BN.n) >= 0
}

BN.prototype.isHigh = function () {
  return this.ucmp(BN.nh) === 1
}

BN.prototype.bitLengthGT256 = function () {
  return this.length > 10 || (this.length === 10 && this.words[9] > 0x003fffff)
}

BN.prototype.iuaddn = function (num) {
  this.words[0] += num

  for (var i = 0; this.words[i] > 0x03ffffff && i < this.length; ++i) {
    this.words[i] -= 0x04000000
    this.words[i + 1] += 1
  }

  if (i === this.length) {
    this.words[i] = 1
    this.length += 1
  }

  return this
}

BN.prototype.iadd = function (num) {
  // (-this) + num -> -(this - num)
  // this + (-num) -> this - num
  if (this.negative !== num.negative) {
    if (this.negative !== 0) {
      this.negative = 0
      this.isub(num)
      this.negative ^= 1
    } else {
      num.negative = 0
      this.isub(num)
      num.negative = 1
    }

    return this.normSign()
  }

  // a.length > b.length
  var a
  var b
  if (this.length > num.length) {
    a = this
    b = num
  } else {
    a = num
    b = this
  }

  for (var i = 0, carry = 0; i < b.length; ++i) {
    var word = a.words[i] + b.words[i] + carry
    this.words[i] = word & 0x03ffffff
    carry = word >>> 26
  }

  for (; carry !== 0 && i < a.length; ++i) {
    word = a.words[i] + carry
    this.words[i] = word & 0x03ffffff
    carry = word >>> 26
  }

  this.length = a.length
  if (carry !== 0) {
    this.words[this.length++] = carry
  } else if (a !== this) {
    for (; i < a.length; ++i) {
      this.words[i] = a.words[i]
    }
  }

  return this
}

BN.prototype.add = function (num) {
  return this.clone().iadd(num)
}

BN.prototype.isub = function (num) {
  // (-this) - num -> -(this + num)
  // this - (-num) -> this + num
  if (this.negative !== num.negative) {
    if (this.negative !== 0) {
      this.negative = 0
      this.iadd(num)
      this.negative = 1
    } else {
      num.negative = 0
      this.iadd(num)
      num.negative = 1
    }

    return this.normSign()
  }

  var cmp = this.ucmp(num)
  if (cmp === 0) {
    this.negative = 0
    this.words[0] = 0
    this.length = 1
    return this
  }

  // a > b
  var a
  var b
  if (cmp > 0) {
    a = this
    b = num
  } else {
    a = num
    b = this
  }

  for (var i = 0, carry = 0; i < b.length; ++i) {
    var word = a.words[i] - b.words[i] + carry
    carry = word >> 26
    this.words[i] = word & 0x03ffffff
  }

  for (; carry !== 0 && i < a.length; ++i) {
    word = a.words[i] + carry
    carry = word >> 26
    this.words[i] = word & 0x03ffffff
  }

  if (carry === 0 && i < a.length && a !== this) {
    for (; i < a.length; ++i) this.words[i] = a.words[i]
  }

  this.length = Math.max(this.length, i)

  if (a !== this) this.negative ^= 1

  return this.strip().normSign()
}

BN.prototype.sub = function (num) {
  return this.clone().isub(num)
}

BN.umulTo = function (num1, num2, out) {
  out.length = num1.length + num2.length - 1

  var a1 = num1.words[0]
  var b1 = num2.words[0]
  var r1 = a1 * b1

  var carry = (r1 / 0x04000000) | 0
  out.words[0] = r1 & 0x03ffffff

  for (var k = 1, maxK = out.length; k < maxK; k++) {
    var ncarry = carry >>> 26
    var rword = carry & 0x03ffffff
    for (var j = Math.max(0, k - num1.length + 1), maxJ = Math.min(k, num2.length - 1); j <= maxJ; j++) {
      var i = k - j
      var a = num1.words[i]
      var b = num2.words[j]
      var r = a * b + rword
      ncarry += (r / 0x04000000) | 0
      rword = r & 0x03ffffff
    }
    out.words[k] = rword
    carry = ncarry
  }

  if (carry !== 0) out.words[out.length++] = carry

  return out.strip()
}

BN.umulTo10x10 = Math.imul ? optimized.umulTo10x10 : BN.umulTo

BN.umulnTo = function (num, k, out) {
  if (k === 0) {
    out.words = [0]
    out.length = 1
    return out
  }

  for (var i = 0, carry = 0; i < num.length; ++i) {
    var r = num.words[i] * k + carry
    out.words[i] = r & 0x03ffffff
    carry = (r / 0x04000000) | 0
  }

  if (carry > 0) {
    out.words[i] = carry
    out.length = num.length + 1
  } else {
    out.length = num.length
  }

  return out
}

BN.prototype.umul = function (num) {
  var out = new BN()
  out.words = new Array(this.length + num.length)

  if (this.length === 10 && num.length === 10) {
    return BN.umulTo10x10(this, num, out)
  } else if (this.length === 1) {
    return BN.umulnTo(num, this.words[0], out)
  } else if (num.length === 1) {
    return BN.umulnTo(this, num.words[0], out)
  } else {
    return BN.umulTo(this, num, out)
  }
}

BN.prototype.isplit = function (output) {
  output.length = Math.min(this.length, 9)
  for (var i = 0; i < output.length; ++i) output.words[i] = this.words[i]

  if (this.length <= 9) {
    this.words[0] = 0
    this.length = 1
    return this
  }

  // Shift by 9 limbs
  var prev = this.words[9]
  output.words[output.length++] = prev & 0x003fffff

  for (i = 10; i < this.length; ++i) {
    var word = this.words[i]
    this.words[i - 10] = ((word & 0x003fffff) << 4) | (prev >>> 22)
    prev = word
  }
  prev >>>= 22
  this.words[i - 10] = prev

  if (prev === 0 && this.length > 10) {
    this.length -= 10
  } else {
    this.length -= 9
  }

  return this
}

BN.prototype.fireduce = function () {
  if (this.isOverflow()) this.isub(BN.n)
  return this
}

BN.prototype.ureduce = function () {
  var num = this.clone().isplit(BN.tmp).umul(BN.nc).iadd(BN.tmp)
  if (num.bitLengthGT256()) {
    num = num.isplit(BN.tmp).umul(BN.nc).iadd(BN.tmp)
    if (num.bitLengthGT256()) num = num.isplit(BN.tmp).umul(BN.nc).iadd(BN.tmp)
  }

  return num.fireduce()
}

BN.prototype.ishrn = function (n) {
  var mask = (1 << n) - 1
  var m = 26 - n

  for (var i = this.length - 1, carry = 0; i >= 0; --i) {
    var word = this.words[i]
    this.words[i] = (carry << m) | (word >>> n)
    carry = word & mask
  }

  if (this.length > 1 && this.words[this.length - 1] === 0) this.length -= 1

  return this
}

BN.prototype.uinvm = function () {
  var x = this.clone()
  var y = BN.n.clone()

  // A * x + B * y = x
  var A = BN.fromNumber(1)
  var B = BN.fromNumber(0)

  // C * x + D * y = y
  var C = BN.fromNumber(0)
  var D = BN.fromNumber(1)

  while (x.isEven() && y.isEven()) {
    for (var k = 1, m = 1; (x.words[0] & m) === 0 && (y.words[0] & m) === 0 && k < 26; ++k, m <<= 1);
    x.ishrn(k)
    y.ishrn(k)
  }

  var yp = y.clone()
  var xp = x.clone()

  while (!x.isZero()) {
    for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
    if (i > 0) {
      x.ishrn(i)
      while (i-- > 0) {
        if (A.isOdd() || B.isOdd()) {
          A.iadd(yp)
          B.isub(xp)
        }

        A.ishrn(1)
        B.ishrn(1)
      }
    }

    for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
    if (j > 0) {
      y.ishrn(j)
      while (j-- > 0) {
        if (C.isOdd() || D.isOdd()) {
          C.iadd(yp)
          D.isub(xp)
        }

        C.ishrn(1)
        D.ishrn(1)
      }
    }

    if (x.ucmp(y) >= 0) {
      x.isub(y)
      A.isub(C)
      B.isub(D)
    } else {
      y.isub(x)
      C.isub(A)
      D.isub(B)
    }
  }

  if (C.negative === 1) {
    C.negative = 0
    var result = C.ureduce()
    result.negative ^= 1
    return result.normSign().iadd(BN.n)
  } else {
    return C.ureduce()
  }
}

BN.prototype.imulK = function () {
  this.words[this.length] = 0
  this.words[this.length + 1] = 0
  this.length += 2

  for (var i = 0, lo = 0; i < this.length; ++i) {
    var w = this.words[i] | 0
    lo += w * 0x3d1
    this.words[i] = lo & 0x03ffffff
    lo = w * 0x40 + ((lo / 0x04000000) | 0)
  }

  if (this.words[this.length - 1] === 0) {
    this.length -= 1
    if (this.words[this.length - 1] === 0) this.length -= 1
  }

  return this
}

BN.prototype.redIReduce = function () {
  this.isplit(BN.tmp).imulK().iadd(BN.tmp)
  if (this.bitLengthGT256()) this.isplit(BN.tmp).imulK().iadd(BN.tmp)

  var cmp = this.ucmp(BN.p)
  if (cmp === 0) {
    this.words[0] = 0
    this.length = 1
  } else if (cmp > 0) {
    this.isub(BN.p)
  } else {
    this.strip()
  }

  return this
}

BN.prototype.redNeg = function () {
  if (this.isZero()) return BN.fromNumber(0)

  return BN.p.sub(this)
}

BN.prototype.redAdd = function (num) {
  return this.clone().redIAdd(num)
}

BN.prototype.redIAdd = function (num) {
  this.iadd(num)
  if (this.ucmp(BN.p) >= 0) this.isub(BN.p)

  return this
}

BN.prototype.redIAdd7 = function () {
  this.iuaddn(7)
  if (this.ucmp(BN.p) >= 0) this.isub(BN.p)

  return this
}

BN.prototype.redSub = function (num) {
  return this.clone().redISub(num)
}

BN.prototype.redISub = function (num) {
  this.isub(num)
  if (this.negative !== 0) this.iadd(BN.p)

  return this
}

BN.prototype.redMul = function (num) {
  return this.umul(num).redIReduce()
}

BN.prototype.redSqr = function () {
  return this.umul(this).redIReduce()
}

BN.prototype.redSqrt = function () {
  if (this.isZero()) return this.clone()

  var wv2 = this.redSqr()
  var wv4 = wv2.redSqr()
  var wv12 = wv4.redSqr().redMul(wv4)
  var wv14 = wv12.redMul(wv2)
  var wv15 = wv14.redMul(this)

  var out = wv15
  for (var i = 0; i < 54; ++i) out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv15)
  out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv14)
  for (i = 0; i < 5; ++i) out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv15)
  out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv12)
  out = out.redSqr().redSqr().redSqr().redSqr().redSqr().redSqr().redMul(wv12)

  if (out.redSqr().ucmp(this) === 0) {
    return out
  } else {
    return null
  }
}

BN.prototype.redInvm = function () {
  var a = this.clone()
  var b = BN.p.clone()

  var x1 = BN.fromNumber(1)
  var x2 = BN.fromNumber(0)

  while (a.gtOne() && b.gtOne()) {
    for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
    if (i > 0) {
      a.ishrn(i)
      while (i-- > 0) {
        if (x1.isOdd()) x1.iadd(BN.p)
        x1.ishrn(1)
      }
    }

    for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
    if (j > 0) {
      b.ishrn(j)
      while (j-- > 0) {
        if (x2.isOdd()) x2.iadd(BN.p)
        x2.ishrn(1)
      }
    }

    if (a.ucmp(b) >= 0) {
      a.isub(b)
      x1.isub(x2)
    } else {
      b.isub(a)
      x2.isub(x1)
    }
  }

  var res
  if (a.length === 1 && a.words[0] === 1) {
    res = x1
  } else {
    res = x2
  }

  if (res.negative !== 0) res.iadd(BN.p)

  if (res.negative !== 0) {
    res.negative = 0
    return res.redIReduce().redNeg()
  } else {
    return res.redIReduce()
  }
}

BN.prototype.getNAF = function (w) {
  var naf = []
  var ws = 1 << (w + 1)
  var wsm1 = ws - 1
  var ws2 = ws >> 1

  var k = this.clone()
  while (!k.isZero()) {
    for (var i = 0, m = 1; (k.words[0] & m) === 0 && i < 26; ++i, m <<= 1) naf.push(0)

    if (i !== 0) {
      k.ishrn(i)
    } else {
      var mod = k.words[0] & wsm1
      if (mod >= ws2) {
        naf.push(ws2 - mod)
        k.iuaddn(mod - ws2).ishrn(1)
      } else {
        naf.push(mod)
        k.words[0] -= mod
        if (!k.isZero()) {
          for (i = w - 1; i > 0; --i) naf.push(0)
          k.ishrn(w)
        }
      }
    }
  }

  return naf
}

BN.prototype.inspect = function () {
  if (this.isZero()) return '0'

  var buffer = this.toBuffer().toString('hex')
  for (var i = 0; buffer[i] === '0'; ++i);
  return buffer.slice(i)
}

BN.n = BN.fromBuffer(Buffer.from('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 'hex'))
BN.nh = BN.n.clone().ishrn(1)
BN.nc = BN.fromBuffer(Buffer.from('000000000000000000000000000000014551231950B75FC4402DA1732FC9BEBF', 'hex'))
BN.p = BN.fromBuffer(Buffer.from('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F', 'hex'))
BN.psn = BN.p.sub(BN.n)
BN.tmp = new BN()
BN.tmp.words = new Array(10)

// WTF?! it speed-up benchmark on ~20%
;(function () {
  var x = BN.fromNumber(1)
  x.words[3] = 0
})()

module.exports = BN


/***/ }),
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate = __webpack_require__(255);

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calls `callback` on a later loop around the event loop. In Node.js this just
 * calls `setImmediate`.  In the browser it will use `setImmediate` if
 * available, otherwise `setTimeout(callback, 0)`, which means other higher
 * priority events may precede the execution of `callback`.
 *
 * This is used internally for browser-compatibility purposes.
 *
 * @name setImmediate
 * @static
 * @memberOf module:Utils
 * @method
 * @alias nextTick
 * @category Util
 * @param {Function} callback - The function to call on a later loop around
 * the event loop. Invoked with (args...).
 * @param {...*} args... - any number of additional arguments to pass to the
 * callback on the next tick.
 * @example
 *
 * var call_order = [];
 * async.nextTick(function() {
 *     call_order.push('two');
 *     // call_order now equals ['one','two']
 * });
 * call_order.push('one');
 *
 * async.setImmediate(function (a, b, c) {
 *     // a, b, and c equal 1, 2, and 3
 * }, 1, 2, 3);
 */
exports.default = _setImmediate2.default;
module.exports = exports['default'];

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(127).EventEmitter;
var inherits = __webpack_require__(7);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(131);
Stream.Writable = __webpack_require__(373);
Stream.Duplex = __webpack_require__(374);
Stream.Transform = __webpack_require__(375);
Stream.PassThrough = __webpack_require__(376);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(370);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var schema = __webpack_require__(382)
var compile = __webpack_require__(386)

var flatten = function (values) {
  if (!values) return null
  var result = {}
  Object.keys(values).forEach(function (k) {
    result[k] = values[k].value
  })
  return result
}

module.exports = function (proto, opts) {
  if (!opts) opts = {}
  if (!proto) throw new Error('Pass in a .proto string or a protobuf-schema parsed object')

  var sch = (typeof proto === 'object' && !Buffer.isBuffer(proto)) ? proto : schema.parse(proto)

  // to not make toString,toJSON enumarable we make a fire-and-forget prototype
  var Messages = function () {
    var self = this

    compile(sch, opts.encodings || {}).forEach(function (m) {
      self[m.name] = flatten(m.values) || m
    })
  }

  Messages.prototype.toString = function () {
    return schema.stringify(sch)
  }

  Messages.prototype.toJSON = function () {
    return sch
  }

  return new Messages()
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(263);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(136);
exports.Duplex = __webpack_require__(48);
exports.Transform = __webpack_require__(266);
exports.PassThrough = __webpack_require__(372);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = slice;
function slice(arrayLike, start) {
    start = start | 0;
    var newLen = Math.max(arrayLike.length - start, 0);
    var newArr = Array(newLen);
    for (var idx = 0; idx < newLen; idx++) {
        newArr[idx] = arrayLike[start + idx];
    }
    return newArr;
}
module.exports = exports["default"];

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(8).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Based on npmjs.com/nodeify but without additional `nextTick` calls
// to keep the overhead low
module.exports = function nodeify (promise, cb) {
  return promise.then((res) => {
    cb(null, res)
  }, (err) => {
    cb(err)
  })
}


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global self */



module.exports = () => {
  // This is only a shim for interfaces, not for functionality
  if (typeof self !== 'undefined') {
    __webpack_require__(356)(self)

    if (self.crypto) {
      return self.crypto
    }
  }

  throw new Error('Please use an environment with crypto support')
}


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(111);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(69);
util.inherits = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(371)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(264);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(6).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(265);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(48);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(48);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(129).setImmediate, __webpack_require__(35)))

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.defined = function (val) {
  return val !== null && val !== undefined && (typeof val !== 'number' || !isNaN(val))
}


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = `enum KeyType {
  RSA = 0;
  Ed25519 = 1;
  Secp256k1 = 2;
}
message PublicKey {
  required KeyType Type = 1;
  required bytes Data = 2;
}
message PrivateKey {
  required KeyType Type = 1;
  required bytes Data = 2;
}`

/***/ }),
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var basex = __webpack_require__(396)
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = basex(ALPHABET)


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasNextTick = exports.hasSetImmediate = undefined;
exports.fallback = fallback;
exports.wrap = wrap;

var _slice = __webpack_require__(132);

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = exports.hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return function (fn /*, ...args*/) {
        var args = (0, _slice2.default)(arguments, 1);
        defer(function () {
            fn.apply(null, args);
        });
    };
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

exports.default = wrap(_defer);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129).setImmediate, __webpack_require__(17)))

/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = {"COMPRESSED_TYPE_INVALID":"compressed should be a boolean","EC_PRIVATE_KEY_TYPE_INVALID":"private key should be a Buffer","EC_PRIVATE_KEY_LENGTH_INVALID":"private key length is invalid","EC_PRIVATE_KEY_TWEAK_ADD_FAIL":"tweak out of range or resulting private key is invalid","EC_PRIVATE_KEY_TWEAK_MUL_FAIL":"tweak out of range","EC_PRIVATE_KEY_EXPORT_DER_FAIL":"couldn't export to DER format","EC_PRIVATE_KEY_IMPORT_DER_FAIL":"couldn't import from DER format","EC_PUBLIC_KEYS_TYPE_INVALID":"public keys should be an Array","EC_PUBLIC_KEYS_LENGTH_INVALID":"public keys Array should have at least 1 element","EC_PUBLIC_KEY_TYPE_INVALID":"public key should be a Buffer","EC_PUBLIC_KEY_LENGTH_INVALID":"public key length is invalid","EC_PUBLIC_KEY_PARSE_FAIL":"the public key could not be parsed or is invalid","EC_PUBLIC_KEY_CREATE_FAIL":"private was invalid, try again","EC_PUBLIC_KEY_TWEAK_ADD_FAIL":"tweak out of range or resulting public key is invalid","EC_PUBLIC_KEY_TWEAK_MUL_FAIL":"tweak out of range","EC_PUBLIC_KEY_COMBINE_FAIL":"the sum of the public keys is not valid","ECDH_FAIL":"scalar was invalid (zero or overflow)","ECDSA_SIGNATURE_TYPE_INVALID":"signature should be a Buffer","ECDSA_SIGNATURE_LENGTH_INVALID":"signature length is invalid","ECDSA_SIGNATURE_PARSE_FAIL":"couldn't parse signature","ECDSA_SIGNATURE_PARSE_DER_FAIL":"couldn't parse DER signature","ECDSA_SIGNATURE_SERIALIZE_DER_FAIL":"couldn't serialize signature to DER format","ECDSA_SIGN_FAIL":"nonce generation function failed or private key is invalid","ECDSA_RECOVER_FAIL":"couldn't recover public key from signature","MSG32_TYPE_INVALID":"message should be a Buffer","MSG32_LENGTH_INVALID":"message length is invalid","OPTIONS_TYPE_INVALID":"options should be an Object","OPTIONS_DATA_TYPE_INVALID":"options.data should be a Buffer","OPTIONS_DATA_LENGTH_INVALID":"options.data length is invalid","OPTIONS_NONCEFN_TYPE_INVALID":"options.noncefn should be a Function","RECOVERY_ID_TYPE_INVALID":"recovery should be a Number","RECOVERY_ID_VALUE_INVALID":"recovery should have value between -1 and 4","TWEAK_TYPE_INVALID":"tweak should be a Buffer","TWEAK_LENGTH_INVALID":"tweak length is invalid"}

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const nodeify = __webpack_require__(134)

const crypto = __webpack_require__(135)()
const lengths = __webpack_require__(357)

const hashTypes = {
  SHA1: 'SHA-1',
  SHA256: 'SHA-256',
  SHA512: 'SHA-512'
}

const sign = (key, data, cb) => {
  nodeify(crypto.subtle.sign({name: 'HMAC'}, key, data)
    .then((raw) => Buffer.from(raw)), cb)
}

exports.create = function (hashType, secret, callback) {
  const hash = hashTypes[hashType]

  nodeify(crypto.subtle.importKey(
    'raw',
    secret,
    {
      name: 'HMAC',
      hash: {name: hash}
    },
    false,
    ['sign']
  ).then((key) => {
    return {
      digest (data, cb) {
        sign(key, data, cb)
      },
      length: lengths[hashType]
    }
  }), callback)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var modeModules = {
  ECB: __webpack_require__(362),
  CBC: __webpack_require__(363),
  CFB: __webpack_require__(364),
  CFB8: __webpack_require__(365),
  CFB1: __webpack_require__(366),
  OFB: __webpack_require__(367),
  CTR: __webpack_require__(259),
  GCM: __webpack_require__(259)
}

var modes = __webpack_require__(261)

for (var key in modes) {
  modes[key].module = modeModules[modes[key].mode]
}

module.exports = modes


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var xor = __webpack_require__(70)
var Buffer = __webpack_require__(6).Buffer
var incr32 = __webpack_require__(260)

function getBlock (self) {
  var out = self._cipher.encryptBlockRaw(self._prev)
  incr32(self._prev)
  return out
}

var blockSize = 16
exports.encrypt = function (self, chunk) {
  var chunkNum = Math.ceil(chunk.length / blockSize)
  var start = self._cache.length
  self._cache = Buffer.concat([
    self._cache,
    Buffer.allocUnsafe(chunkNum * blockSize)
  ])
  for (var i = 0; i < chunkNum; i++) {
    var out = getBlock(self)
    var offset = start + i * blockSize
    self._cache.writeUInt32BE(out[0], offset + 0)
    self._cache.writeUInt32BE(out[1], offset + 4)
    self._cache.writeUInt32BE(out[2], offset + 8)
    self._cache.writeUInt32BE(out[3], offset + 12)
  }
  var pad = self._cache.slice(0, chunk.length)
  self._cache = self._cache.slice(chunk.length)
  return xor(chunk, pad)
}


/***/ }),
/* 260 */
/***/ (function(module, exports) {

function incr32 (iv) {
  var len = iv.length
  var item
  while (len--) {
    item = iv.readUInt8(len)
    if (item === 255) {
      iv.writeUInt8(0, len)
    } else {
      item++
      iv.writeUInt8(item, len)
      break
    }
  }
}
module.exports = incr32


/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = {"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var aes = __webpack_require__(110)
var Buffer = __webpack_require__(6).Buffer
var Transform = __webpack_require__(47)
var inherits = __webpack_require__(7)
var GHASH = __webpack_require__(377)
var xor = __webpack_require__(70)
var incr32 = __webpack_require__(260)

function xorTest (a, b) {
  var out = 0
  if (a.length !== b.length) out++

  var len = Math.min(a.length, b.length)
  for (var i = 0; i < len; ++i) {
    out += (a[i] ^ b[i])
  }

  return out
}

function calcIv (self, iv, ck) {
  if (iv.length === 12) {
    self._finID = Buffer.concat([iv, Buffer.from([0, 0, 0, 1])])
    return Buffer.concat([iv, Buffer.from([0, 0, 0, 2])])
  }
  var ghash = new GHASH(ck)
  var len = iv.length
  var toPad = len % 16
  ghash.update(iv)
  if (toPad) {
    toPad = 16 - toPad
    ghash.update(Buffer.alloc(toPad, 0))
  }
  ghash.update(Buffer.alloc(8, 0))
  var ivBits = len * 8
  var tail = Buffer.alloc(8)
  tail.writeUIntBE(ivBits, 0, 8)
  ghash.update(tail)
  self._finID = ghash.state
  var out = Buffer.from(self._finID)
  incr32(out)
  return out
}
function StreamCipher (mode, key, iv, decrypt) {
  Transform.call(this)

  var h = Buffer.alloc(4, 0)

  this._cipher = new aes.AES(key)
  var ck = this._cipher.encryptBlock(h)
  this._ghash = new GHASH(ck)
  iv = calcIv(this, iv, ck)

  this._prev = Buffer.from(iv)
  this._cache = Buffer.allocUnsafe(0)
  this._secCache = Buffer.allocUnsafe(0)
  this._decrypt = decrypt
  this._alen = 0
  this._len = 0
  this._mode = mode

  this._authTag = null
  this._called = false
}

inherits(StreamCipher, Transform)

StreamCipher.prototype._update = function (chunk) {
  if (!this._called && this._alen) {
    var rump = 16 - (this._alen % 16)
    if (rump < 16) {
      rump = Buffer.alloc(rump, 0)
      this._ghash.update(rump)
    }
  }

  this._called = true
  var out = this._mode.encrypt(this, chunk)
  if (this._decrypt) {
    this._ghash.update(chunk)
  } else {
    this._ghash.update(out)
  }
  this._len += chunk.length
  return out
}

StreamCipher.prototype._final = function () {
  if (this._decrypt && !this._authTag) throw new Error('Unsupported state or unable to authenticate data')

  var tag = xor(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID))
  if (this._decrypt && xorTest(tag, this._authTag)) throw new Error('Unsupported state or unable to authenticate data')

  this._authTag = tag
  this._cipher.scrub()
}

StreamCipher.prototype.getAuthTag = function getAuthTag () {
  if (this._decrypt || !Buffer.isBuffer(this._authTag)) throw new Error('Attempting to get auth tag in unsupported state')

  return this._authTag
}

StreamCipher.prototype.setAuthTag = function setAuthTag (tag) {
  if (!this._decrypt) throw new Error('Attempting to set auth tag in unsupported state')

  this._authTag = tag
}

StreamCipher.prototype.setAAD = function setAAD (buf) {
  if (this._called) throw new Error('Attempting to set AAD in unsupported state')

  this._ghash.update(buf)
  this._alen += buf.length
}

module.exports = StreamCipher


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(111);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(113);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(127).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(264);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(6).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(69);
util.inherits = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(368);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(369);
var destroyImpl = __webpack_require__(265);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(48);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(133).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(48);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(133).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(17)))

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(127).EventEmitter;


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(111);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(48);

/*<replacement>*/
var util = __webpack_require__(69);
util.inherits = __webpack_require__(7);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var aes = __webpack_require__(110)
var Buffer = __webpack_require__(6).Buffer
var Transform = __webpack_require__(47)
var inherits = __webpack_require__(7)

function StreamCipher (mode, key, iv, decrypt) {
  Transform.call(this)

  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._cache = Buffer.allocUnsafe(0)
  this._secCache = Buffer.allocUnsafe(0)
  this._decrypt = decrypt
  this._mode = mode
}

inherits(StreamCipher, Transform)

StreamCipher.prototype._update = function (chunk) {
  return this._mode.encrypt(this, chunk, this._decrypt)
}

StreamCipher.prototype._final = function () {
  this._cipher.scrub()
}

module.exports = StreamCipher


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer
var MD5 = __webpack_require__(378)

/* eslint-disable camelcase */
function EVP_BytesToKey (password, salt, keyBits, ivLen) {
  if (!Buffer.isBuffer(password)) password = Buffer.from(password, 'binary')
  if (salt) {
    if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, 'binary')
    if (salt.length !== 8) throw new RangeError('salt should be Buffer with 8 byte length')
  }

  var keyLen = keyBits / 8
  var key = Buffer.alloc(keyLen)
  var iv = Buffer.alloc(ivLen || 0)
  var tmp = Buffer.alloc(0)

  while (keyLen > 0 || ivLen > 0) {
    var hash = new MD5()
    hash.update(tmp)
    hash.update(password)
    if (salt) hash.update(salt)
    tmp = hash.digest()

    var used = 0

    if (keyLen > 0) {
      var keyStart = key.length - keyLen
      used = Math.min(keyLen, tmp.length)
      tmp.copy(key, keyStart, 0, used)
      keyLen -= used
    }

    if (used < tmp.length && ivLen > 0) {
      var ivStart = iv.length - ivLen
      var length = Math.min(ivLen, tmp.length - used)
      tmp.copy(iv, ivStart, used, used + length)
      ivLen -= length
    }
  }

  tmp.fill(0)
  return { key: key, iv: iv }
}

module.exports = EVP_BytesToKey


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const setImmediate = __webpack_require__(126)

exports.toCallback = (doWork) => {
  return function (input, callback) {
    const done = (err, res) => setImmediate(() => {
      callback(err, res)
    })

    let res
    try {
      res = doWork(input)
    } catch (err) {
      done(err)
      return
    }

    done(null, res)
  }
}

exports.toBuf = (doWork, other) => (input) => {
  let result = doWork(input, other)
  return new Buffer(result, 'hex')
}

exports.fromString = (doWork, other) => (_input) => {
  const input = Buffer.isBuffer(_input) ? _input.toString() : _input
  return doWork(input, other)
}

exports.fromNumberTo32BitBuf = (doWork, other) => (input) => {
  let number = doWork(input, other)
  const bytes = new Array(4)

  for (let i = 0; i < 4; i++) {
    bytes[i] = number & 0xff
    number = number >> 8
  }

  return Buffer.from(bytes)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = isPromise;

function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array'

// For convenience, let people hash a string, not just a Uint8Array
function normalizeInput (input) {
  var ret
  if (input instanceof Uint8Array) {
    ret = input
  } else if (input instanceof Buffer) {
    ret = new Uint8Array(input)
  } else if (typeof (input) === 'string') {
    ret = new Uint8Array(Buffer.from(input, 'utf8'))
  } else {
    throw new Error(ERROR_MSG_INPUT)
  }
  return ret
}

// Converts a Uint8Array to a hexadecimal string
// For example, toHex([255, 0, 255]) returns "ff00ff"
function toHex (bytes) {
  return Array.prototype.map.call(bytes, function (n) {
    return (n < 16 ? '0' : '') + n.toString(16)
  }).join('')
}

// Converts any value in [0...2^32-1] to an 8-character hex string
function uint32ToHex (val) {
  return (0x100000000 + val).toString(16).substring(1)
}

// For debugging: prints out hash state in the same format as the RFC
// sample computation exactly, so that you can diff
function debugPrint (label, arr, size) {
  var msg = '\n' + label + ' = '
  for (var i = 0; i < arr.length; i += 2) {
    if (size === 32) {
      msg += uint32ToHex(arr[i]).toUpperCase()
      msg += ' '
      msg += uint32ToHex(arr[i + 1]).toUpperCase()
    } else if (size === 64) {
      msg += uint32ToHex(arr[i + 1]).toUpperCase()
      msg += uint32ToHex(arr[i]).toUpperCase()
    } else throw new Error('Invalid size ' + size)
    if (i % 6 === 4) {
      msg += '\n' + new Array(label.length + 4).join(' ')
    } else if (i < arr.length - 2) {
      msg += ' '
    }
  }
  console.log(msg)
}

// For performance testing: generates N bytes of input, hashes M times
// Measures and prints MB/second hash performance each time
function testSpeed (hashFn, N, M) {
  var startMs = new Date().getTime()

  var input = new Uint8Array(N)
  for (var i = 0; i < N; i++) {
    input[i] = i % 256
  }
  var genMs = new Date().getTime()
  console.log('Generated random input in ' + (genMs - startMs) + 'ms')
  startMs = genMs

  for (i = 0; i < M; i++) {
    var hashHex = hashFn(input)
    var hashMs = new Date().getTime()
    var ms = hashMs - startMs
    startMs = hashMs
    console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...')
    console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND')
  }
}

module.exports = {
  normalizeInput: normalizeInput,
  toHex: toHex,
  debugPrint: debugPrint,
  testSpeed: testSpeed
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const nodeify = __webpack_require__(134)

const webcrypto = __webpack_require__(135)()

exports.utils = __webpack_require__(408)

exports.generateKey = function (bits, callback) {
  nodeify(webcrypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: bits,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {name: 'SHA-256'}
    },
    true,
    ['sign', 'verify']
  )
    .then(exportKey)
    .then((keys) => ({
      privateKey: keys[0],
      publicKey: keys[1]
    })), callback)
}

// Takes a jwk key
exports.unmarshalPrivateKey = function (key, callback) {
  const privateKey = webcrypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: {name: 'SHA-256'}
    },
    true,
    ['sign']
  )

  nodeify(Promise.all([
    privateKey,
    derivePublicFromPrivate(key)
  ]).then((keys) => exportKey({
    privateKey: keys[0],
    publicKey: keys[1]
  })).then((keys) => ({
    privateKey: keys[0],
    publicKey: keys[1]
  })), callback)
}

exports.getRandomValues = function (arr) {
  return Buffer.from(webcrypto.getRandomValues(arr))
}

exports.hashAndSign = function (key, msg, callback) {
  nodeify(webcrypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: {name: 'SHA-256'}
    },
    false,
    ['sign']
  ).then((privateKey) => {
    return webcrypto.subtle.sign(
      {name: 'RSASSA-PKCS1-v1_5'},
      privateKey,
      Uint8Array.from(msg)
    )
  }).then((sig) => Buffer.from(sig)), callback)
}

exports.hashAndVerify = function (key, sig, msg, callback) {
  nodeify(webcrypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: {name: 'SHA-256'}
    },
    false,
    ['verify']
  ).then((publicKey) => {
    return webcrypto.subtle.verify(
      {name: 'RSASSA-PKCS1-v1_5'},
      publicKey,
      sig,
      msg
    )
  }), callback)
}

function exportKey (pair) {
  return Promise.all([
    webcrypto.subtle.exportKey('jwk', pair.privateKey),
    webcrypto.subtle.exportKey('jwk', pair.publicKey)
  ])
}

function derivePublicFromPrivate (jwKey) {
  return webcrypto.subtle.importKey(
    'jwk',
    {
      kty: jwKey.kty,
      n: jwKey.n,
      e: jwKey.e,
      alg: jwKey.alg,
      kid: jwKey.kid
    },
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: {name: 'SHA-256'}
    },
    true,
    ['verify']
  )
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7);
var Reporter = __webpack_require__(71).Reporter;
var Buffer = __webpack_require__(8).Buffer;

function DecoderBuffer(base, options) {
  Reporter.call(this, options);
  if (!Buffer.isBuffer(base)) {
    this.error('Input not Buffer');
    return;
  }

  this.base = base;
  this.offset = 0;
  this.length = base.length;
}
inherits(DecoderBuffer, Reporter);
exports.DecoderBuffer = DecoderBuffer;

DecoderBuffer.prototype.save = function save() {
  return { offset: this.offset, reporter: Reporter.prototype.save.call(this) };
};

DecoderBuffer.prototype.restore = function restore(save) {
  // Return skipped data
  var res = new DecoderBuffer(this.base);
  res.offset = save.offset;
  res.length = this.offset;

  this.offset = save.offset;
  Reporter.prototype.restore.call(this, save.reporter);

  return res;
};

DecoderBuffer.prototype.isEmpty = function isEmpty() {
  return this.offset === this.length;
};

DecoderBuffer.prototype.readUInt8 = function readUInt8(fail) {
  if (this.offset + 1 <= this.length)
    return this.base.readUInt8(this.offset++, true);
  else
    return this.error(fail || 'DecoderBuffer overrun');
}

DecoderBuffer.prototype.skip = function skip(bytes, fail) {
  if (!(this.offset + bytes <= this.length))
    return this.error(fail || 'DecoderBuffer overrun');

  var res = new DecoderBuffer(this.base);

  // Share reporter state
  res._reporterState = this._reporterState;

  res.offset = this.offset;
  res.length = this.offset + bytes;
  this.offset += bytes;
  return res;
}

DecoderBuffer.prototype.raw = function raw(save) {
  return this.base.slice(save ? save.offset : this.offset, this.length);
}

function EncoderBuffer(value, reporter) {
  if (Array.isArray(value)) {
    this.length = 0;
    this.value = value.map(function(item) {
      if (!(item instanceof EncoderBuffer))
        item = new EncoderBuffer(item, reporter);
      this.length += item.length;
      return item;
    }, this);
  } else if (typeof value === 'number') {
    if (!(0 <= value && value <= 0xff))
      return reporter.error('non-byte EncoderBuffer value');
    this.value = value;
    this.length = 1;
  } else if (typeof value === 'string') {
    this.value = value;
    this.length = Buffer.byteLength(value);
  } else if (Buffer.isBuffer(value)) {
    this.value = value;
    this.length = value.length;
  } else {
    return reporter.error('Unsupported type: ' + typeof value);
  }
}
exports.EncoderBuffer = EncoderBuffer;

EncoderBuffer.prototype.join = function join(out, offset) {
  if (!out)
    out = new Buffer(this.length);
  if (!offset)
    offset = 0;

  if (this.length === 0)
    return out;

  if (Array.isArray(this.value)) {
    this.value.forEach(function(item) {
      item.join(out, offset);
      offset += item.length;
    });
  } else {
    if (typeof this.value === 'number')
      out[offset] = this.value;
    else if (typeof this.value === 'string')
      out.write(this.value, offset);
    else if (Buffer.isBuffer(this.value))
      this.value.copy(out, offset);
    offset += this.length;
  }

  return out;
};


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var constants = exports;

// Helper
constants._reverse = function reverse(map) {
  var res = {};

  Object.keys(map).forEach(function(key) {
    // Convert key to integer if it is stringified
    if ((key | 0) == key)
      key = key | 0;

    var value = map[key];
    res[value] = key;
  });

  return res;
};

constants.der = __webpack_require__(414);


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7);

var asn1 = __webpack_require__(66);
var base = asn1.base;
var bignum = asn1.bignum;

// Import DER constants
var der = asn1.constants.der;

function DERDecoder(entity) {
  this.enc = 'der';
  this.name = entity.name;
  this.entity = entity;

  // Construct base tree
  this.tree = new DERNode();
  this.tree._init(entity.body);
};
module.exports = DERDecoder;

DERDecoder.prototype.decode = function decode(data, options) {
  if (!(data instanceof base.DecoderBuffer))
    data = new base.DecoderBuffer(data, options);

  return this.tree._decode(data, options);
};

// Tree methods

function DERNode(parent) {
  base.Node.call(this, 'der', parent);
}
inherits(DERNode, base.Node);

DERNode.prototype._peekTag = function peekTag(buffer, tag, any) {
  if (buffer.isEmpty())
    return false;

  var state = buffer.save();
  var decodedTag = derDecodeTag(buffer, 'Failed to peek tag: "' + tag + '"');
  if (buffer.isError(decodedTag))
    return decodedTag;

  buffer.restore(state);

  return decodedTag.tag === tag || decodedTag.tagStr === tag ||
    (decodedTag.tagStr + 'of') === tag || any;
};

DERNode.prototype._decodeTag = function decodeTag(buffer, tag, any) {
  var decodedTag = derDecodeTag(buffer,
                                'Failed to decode tag of "' + tag + '"');
  if (buffer.isError(decodedTag))
    return decodedTag;

  var len = derDecodeLen(buffer,
                         decodedTag.primitive,
                         'Failed to get length of "' + tag + '"');

  // Failure
  if (buffer.isError(len))
    return len;

  if (!any &&
      decodedTag.tag !== tag &&
      decodedTag.tagStr !== tag &&
      decodedTag.tagStr + 'of' !== tag) {
    return buffer.error('Failed to match tag: "' + tag + '"');
  }

  if (decodedTag.primitive || len !== null)
    return buffer.skip(len, 'Failed to match body of: "' + tag + '"');

  // Indefinite length... find END tag
  var state = buffer.save();
  var res = this._skipUntilEnd(
      buffer,
      'Failed to skip indefinite length body: "' + this.tag + '"');
  if (buffer.isError(res))
    return res;

  len = buffer.offset - state.offset;
  buffer.restore(state);
  return buffer.skip(len, 'Failed to match body of: "' + tag + '"');
};

DERNode.prototype._skipUntilEnd = function skipUntilEnd(buffer, fail) {
  while (true) {
    var tag = derDecodeTag(buffer, fail);
    if (buffer.isError(tag))
      return tag;
    var len = derDecodeLen(buffer, tag.primitive, fail);
    if (buffer.isError(len))
      return len;

    var res;
    if (tag.primitive || len !== null)
      res = buffer.skip(len)
    else
      res = this._skipUntilEnd(buffer, fail);

    // Failure
    if (buffer.isError(res))
      return res;

    if (tag.tagStr === 'end')
      break;
  }
};

DERNode.prototype._decodeList = function decodeList(buffer, tag, decoder,
                                                    options) {
  var result = [];
  while (!buffer.isEmpty()) {
    var possibleEnd = this._peekTag(buffer, 'end');
    if (buffer.isError(possibleEnd))
      return possibleEnd;

    var res = decoder.decode(buffer, 'der', options);
    if (buffer.isError(res) && possibleEnd)
      break;
    result.push(res);
  }
  return result;
};

DERNode.prototype._decodeStr = function decodeStr(buffer, tag) {
  if (tag === 'bitstr') {
    var unused = buffer.readUInt8();
    if (buffer.isError(unused))
      return unused;
    return { unused: unused, data: buffer.raw() };
  } else if (tag === 'bmpstr') {
    var raw = buffer.raw();
    if (raw.length % 2 === 1)
      return buffer.error('Decoding of string type: bmpstr length mismatch');

    var str = '';
    for (var i = 0; i < raw.length / 2; i++) {
      str += String.fromCharCode(raw.readUInt16BE(i * 2));
    }
    return str;
  } else if (tag === 'numstr') {
    var numstr = buffer.raw().toString('ascii');
    if (!this._isNumstr(numstr)) {
      return buffer.error('Decoding of string type: ' +
                          'numstr unsupported characters');
    }
    return numstr;
  } else if (tag === 'octstr') {
    return buffer.raw();
  } else if (tag === 'objDesc') {
    return buffer.raw();
  } else if (tag === 'printstr') {
    var printstr = buffer.raw().toString('ascii');
    if (!this._isPrintstr(printstr)) {
      return buffer.error('Decoding of string type: ' +
                          'printstr unsupported characters');
    }
    return printstr;
  } else if (/str$/.test(tag)) {
    return buffer.raw().toString();
  } else {
    return buffer.error('Decoding of string type: ' + tag + ' unsupported');
  }
};

DERNode.prototype._decodeObjid = function decodeObjid(buffer, values, relative) {
  var result;
  var identifiers = [];
  var ident = 0;
  while (!buffer.isEmpty()) {
    var subident = buffer.readUInt8();
    ident <<= 7;
    ident |= subident & 0x7f;
    if ((subident & 0x80) === 0) {
      identifiers.push(ident);
      ident = 0;
    }
  }
  if (subident & 0x80)
    identifiers.push(ident);

  var first = (identifiers[0] / 40) | 0;
  var second = identifiers[0] % 40;

  if (relative)
    result = identifiers;
  else
    result = [first, second].concat(identifiers.slice(1));

  if (values) {
    var tmp = values[result.join(' ')];
    if (tmp === undefined)
      tmp = values[result.join('.')];
    if (tmp !== undefined)
      result = tmp;
  }

  return result;
};

DERNode.prototype._decodeTime = function decodeTime(buffer, tag) {
  var str = buffer.raw().toString();
  if (tag === 'gentime') {
    var year = str.slice(0, 4) | 0;
    var mon = str.slice(4, 6) | 0;
    var day = str.slice(6, 8) | 0;
    var hour = str.slice(8, 10) | 0;
    var min = str.slice(10, 12) | 0;
    var sec = str.slice(12, 14) | 0;
  } else if (tag === 'utctime') {
    var year = str.slice(0, 2) | 0;
    var mon = str.slice(2, 4) | 0;
    var day = str.slice(4, 6) | 0;
    var hour = str.slice(6, 8) | 0;
    var min = str.slice(8, 10) | 0;
    var sec = str.slice(10, 12) | 0;
    if (year < 70)
      year = 2000 + year;
    else
      year = 1900 + year;
  } else {
    return buffer.error('Decoding ' + tag + ' time is not supported yet');
  }

  return Date.UTC(year, mon - 1, day, hour, min, sec, 0);
};

DERNode.prototype._decodeNull = function decodeNull(buffer) {
  return null;
};

DERNode.prototype._decodeBool = function decodeBool(buffer) {
  var res = buffer.readUInt8();
  if (buffer.isError(res))
    return res;
  else
    return res !== 0;
};

DERNode.prototype._decodeInt = function decodeInt(buffer, values) {
  // Bigint, return as it is (assume big endian)
  var raw = buffer.raw();
  var res = new bignum(raw);

  if (values)
    res = values[res.toString(10)] || res;

  return res;
};

DERNode.prototype._use = function use(entity, obj) {
  if (typeof entity === 'function')
    entity = entity(obj);
  return entity._getDecoder('der').tree;
};

// Utility methods

function derDecodeTag(buf, fail) {
  var tag = buf.readUInt8(fail);
  if (buf.isError(tag))
    return tag;

  var cls = der.tagClass[tag >> 6];
  var primitive = (tag & 0x20) === 0;

  // Multi-octet tag - load
  if ((tag & 0x1f) === 0x1f) {
    var oct = tag;
    tag = 0;
    while ((oct & 0x80) === 0x80) {
      oct = buf.readUInt8(fail);
      if (buf.isError(oct))
        return oct;

      tag <<= 7;
      tag |= oct & 0x7f;
    }
  } else {
    tag &= 0x1f;
  }
  var tagStr = der.tag[tag];

  return {
    cls: cls,
    primitive: primitive,
    tag: tag,
    tagStr: tagStr
  };
}

function derDecodeLen(buf, primitive, fail) {
  var len = buf.readUInt8(fail);
  if (buf.isError(len))
    return len;

  // Indefinite form
  if (!primitive && len === 0x80)
    return null;

  // Definite form
  if ((len & 0x80) === 0) {
    // Short form
    return len;
  }

  // Long form
  var num = len & 0x7f;
  if (num > 4)
    return buf.error('length octect is too long');

  len = 0;
  for (var i = 0; i < num; i++) {
    len <<= 8;
    var j = buf.readUInt8(fail);
    if (buf.isError(j))
      return j;
    len |= j;
  }

  return len;
}


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7);
var Buffer = __webpack_require__(8).Buffer;

var asn1 = __webpack_require__(66);
var base = asn1.base;

// Import DER constants
var der = asn1.constants.der;

function DEREncoder(entity) {
  this.enc = 'der';
  this.name = entity.name;
  this.entity = entity;

  // Construct base tree
  this.tree = new DERNode();
  this.tree._init(entity.body);
};
module.exports = DEREncoder;

DEREncoder.prototype.encode = function encode(data, reporter) {
  return this.tree._encode(data, reporter).join();
};

// Tree methods

function DERNode(parent) {
  base.Node.call(this, 'der', parent);
}
inherits(DERNode, base.Node);

DERNode.prototype._encodeComposite = function encodeComposite(tag,
                                                              primitive,
                                                              cls,
                                                              content) {
  var encodedTag = encodeTag(tag, primitive, cls, this.reporter);

  // Short form
  if (content.length < 0x80) {
    var header = new Buffer(2);
    header[0] = encodedTag;
    header[1] = content.length;
    return this._createEncoderBuffer([ header, content ]);
  }

  // Long form
  // Count octets required to store length
  var lenOctets = 1;
  for (var i = content.length; i >= 0x100; i >>= 8)
    lenOctets++;

  var header = new Buffer(1 + 1 + lenOctets);
  header[0] = encodedTag;
  header[1] = 0x80 | lenOctets;

  for (var i = 1 + lenOctets, j = content.length; j > 0; i--, j >>= 8)
    header[i] = j & 0xff;

  return this._createEncoderBuffer([ header, content ]);
};

DERNode.prototype._encodeStr = function encodeStr(str, tag) {
  if (tag === 'bitstr') {
    return this._createEncoderBuffer([ str.unused | 0, str.data ]);
  } else if (tag === 'bmpstr') {
    var buf = new Buffer(str.length * 2);
    for (var i = 0; i < str.length; i++) {
      buf.writeUInt16BE(str.charCodeAt(i), i * 2);
    }
    return this._createEncoderBuffer(buf);
  } else if (tag === 'numstr') {
    if (!this._isNumstr(str)) {
      return this.reporter.error('Encoding of string type: numstr supports ' +
                                 'only digits and space');
    }
    return this._createEncoderBuffer(str);
  } else if (tag === 'printstr') {
    if (!this._isPrintstr(str)) {
      return this.reporter.error('Encoding of string type: printstr supports ' +
                                 'only latin upper and lower case letters, ' +
                                 'digits, space, apostrophe, left and rigth ' +
                                 'parenthesis, plus sign, comma, hyphen, ' +
                                 'dot, slash, colon, equal sign, ' +
                                 'question mark');
    }
    return this._createEncoderBuffer(str);
  } else if (/str$/.test(tag)) {
    return this._createEncoderBuffer(str);
  } else if (tag === 'objDesc') {
    return this._createEncoderBuffer(str);
  } else {
    return this.reporter.error('Encoding of string type: ' + tag +
                               ' unsupported');
  }
};

DERNode.prototype._encodeObjid = function encodeObjid(id, values, relative) {
  if (typeof id === 'string') {
    if (!values)
      return this.reporter.error('string objid given, but no values map found');
    if (!values.hasOwnProperty(id))
      return this.reporter.error('objid not found in values map');
    id = values[id].split(/[\s\.]+/g);
    for (var i = 0; i < id.length; i++)
      id[i] |= 0;
  } else if (Array.isArray(id)) {
    id = id.slice();
    for (var i = 0; i < id.length; i++)
      id[i] |= 0;
  }

  if (!Array.isArray(id)) {
    return this.reporter.error('objid() should be either array or string, ' +
                               'got: ' + JSON.stringify(id));
  }

  if (!relative) {
    if (id[1] >= 40)
      return this.reporter.error('Second objid identifier OOB');
    id.splice(0, 2, id[0] * 40 + id[1]);
  }

  // Count number of octets
  var size = 0;
  for (var i = 0; i < id.length; i++) {
    var ident = id[i];
    for (size++; ident >= 0x80; ident >>= 7)
      size++;
  }

  var objid = new Buffer(size);
  var offset = objid.length - 1;
  for (var i = id.length - 1; i >= 0; i--) {
    var ident = id[i];
    objid[offset--] = ident & 0x7f;
    while ((ident >>= 7) > 0)
      objid[offset--] = 0x80 | (ident & 0x7f);
  }

  return this._createEncoderBuffer(objid);
};

function two(num) {
  if (num < 10)
    return '0' + num;
  else
    return num;
}

DERNode.prototype._encodeTime = function encodeTime(time, tag) {
  var str;
  var date = new Date(time);

  if (tag === 'gentime') {
    str = [
      two(date.getFullYear()),
      two(date.getUTCMonth() + 1),
      two(date.getUTCDate()),
      two(date.getUTCHours()),
      two(date.getUTCMinutes()),
      two(date.getUTCSeconds()),
      'Z'
    ].join('');
  } else if (tag === 'utctime') {
    str = [
      two(date.getFullYear() % 100),
      two(date.getUTCMonth() + 1),
      two(date.getUTCDate()),
      two(date.getUTCHours()),
      two(date.getUTCMinutes()),
      two(date.getUTCSeconds()),
      'Z'
    ].join('');
  } else {
    this.reporter.error('Encoding ' + tag + ' time is not supported yet');
  }

  return this._encodeStr(str, 'octstr');
};

DERNode.prototype._encodeNull = function encodeNull() {
  return this._createEncoderBuffer('');
};

DERNode.prototype._encodeInt = function encodeInt(num, values) {
  if (typeof num === 'string') {
    if (!values)
      return this.reporter.error('String int or enum given, but no values map');
    if (!values.hasOwnProperty(num)) {
      return this.reporter.error('Values map doesn\'t contain: ' +
                                 JSON.stringify(num));
    }
    num = values[num];
  }

  // Bignum, assume big endian
  if (typeof num !== 'number' && !Buffer.isBuffer(num)) {
    var numArray = num.toArray();
    if (!num.sign && numArray[0] & 0x80) {
      numArray.unshift(0);
    }
    num = new Buffer(numArray);
  }

  if (Buffer.isBuffer(num)) {
    var size = num.length;
    if (num.length === 0)
      size++;

    var out = new Buffer(size);
    num.copy(out);
    if (num.length === 0)
      out[0] = 0
    return this._createEncoderBuffer(out);
  }

  if (num < 0x80)
    return this._createEncoderBuffer(num);

  if (num < 0x100)
    return this._createEncoderBuffer([0, num]);

  var size = 1;
  for (var i = num; i >= 0x100; i >>= 8)
    size++;

  var out = new Array(size);
  for (var i = out.length - 1; i >= 0; i--) {
    out[i] = num & 0xff;
    num >>= 8;
  }
  if(out[0] & 0x80) {
    out.unshift(0);
  }

  return this._createEncoderBuffer(new Buffer(out));
};

DERNode.prototype._encodeBool = function encodeBool(value) {
  return this._createEncoderBuffer(value ? 0xff : 0);
};

DERNode.prototype._use = function use(entity, obj) {
  if (typeof entity === 'function')
    entity = entity(obj);
  return entity._getEncoder('der').tree;
};

DERNode.prototype._skipDefault = function skipDefault(dataBuffer, reporter, parent) {
  var state = this._baseState;
  var i;
  if (state['default'] === null)
    return false;

  var data = dataBuffer.join();
  if (state.defaultBuffer === undefined)
    state.defaultBuffer = this._encodeValue(state['default'], reporter, parent).join();

  if (data.length !== state.defaultBuffer.length)
    return false;

  for (i=0; i < data.length; i++)
    if (data[i] !== state.defaultBuffer[i])
      return false;

  return true;
};

// Utility methods

function encodeTag(tag, primitive, cls, reporter) {
  var res;

  if (tag === 'seqof')
    tag = 'seq';
  else if (tag === 'setof')
    tag = 'set';

  if (der.tagByName.hasOwnProperty(tag))
    res = der.tagByName[tag];
  else if (typeof tag === 'number' && (tag | 0) === tag)
    res = tag;
  else
    return reporter.error('Unknown tag: ' + tag);

  if (res >= 0x1f)
    return reporter.error('Multi-octet tag encoding unsupported');

  if (!primitive)
    res |= 0x20;

  res |= (der.tagClassByName[cls || 'universal'] << 6);

  return res;
}


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const BN = __webpack_require__(66).bignum

// Convert a BN.js instance to a base64 encoded string without padding
// Adapted from https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#appendix-C
exports.toBase64 = function toBase64 (bn, len) {
  // if len is defined then the bytes are leading-0 padded to the length
  let s = bn.toArrayLike(Buffer, 'be', len).toString('base64')

  return s
    .replace(/(=*)$/, '') // Remove any trailing '='s
    .replace(/\+/g, '-') // 62nd char of encoding
    .replace(/\//g, '_') // 63rd char of encoding
}

// Convert a base64 encoded string to a BN.js instance
exports.toBn = function toBn (str) {
  return new BN(Buffer.from(str, 'base64'))
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var makeHash = __webpack_require__(430)

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5 (x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32)
  x[(((len + 64) >>> 9) << 4) + 14] = len

  var a = 1732584193
  var b = -271733879
  var c = -1732584194
  var d = 271733878

  for (var i = 0; i < x.length; i += 16) {
    var olda = a
    var oldb = b
    var oldc = c
    var oldd = d

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936)
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302)
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222)
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844)
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

    a = safe_add(a, olda)
    b = safe_add(b, oldb)
    c = safe_add(c, oldc)
    d = safe_add(d, oldd)
  }

  return [a, b, c, d]
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn (q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}

function md5_ff (a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
}

function md5_gg (a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
}

function md5_hh (a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t)
}

function md5_ii (a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add (x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF)
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xFFFF)
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol (num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}

module.exports = function md5 (buf) {
  return makeHash(buf, core_md5)
}


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var inherits = __webpack_require__(7)
var HashBase = __webpack_require__(431)

function RIPEMD160 () {
  HashBase.call(this, 64)

  // state
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0
}

inherits(RIPEMD160, HashBase)

RIPEMD160.prototype._update = function () {
  var m = new Array(16)
  for (var i = 0; i < 16; ++i) m[i] = this._block.readInt32LE(i * 4)

  var al = this._a
  var bl = this._b
  var cl = this._c
  var dl = this._d
  var el = this._e

  // Mj = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  // K = 0x00000000
  // Sj = 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8
  al = fn1(al, bl, cl, dl, el, m[0], 0x00000000, 11); cl = rotl(cl, 10)
  el = fn1(el, al, bl, cl, dl, m[1], 0x00000000, 14); bl = rotl(bl, 10)
  dl = fn1(dl, el, al, bl, cl, m[2], 0x00000000, 15); al = rotl(al, 10)
  cl = fn1(cl, dl, el, al, bl, m[3], 0x00000000, 12); el = rotl(el, 10)
  bl = fn1(bl, cl, dl, el, al, m[4], 0x00000000, 5); dl = rotl(dl, 10)
  al = fn1(al, bl, cl, dl, el, m[5], 0x00000000, 8); cl = rotl(cl, 10)
  el = fn1(el, al, bl, cl, dl, m[6], 0x00000000, 7); bl = rotl(bl, 10)
  dl = fn1(dl, el, al, bl, cl, m[7], 0x00000000, 9); al = rotl(al, 10)
  cl = fn1(cl, dl, el, al, bl, m[8], 0x00000000, 11); el = rotl(el, 10)
  bl = fn1(bl, cl, dl, el, al, m[9], 0x00000000, 13); dl = rotl(dl, 10)
  al = fn1(al, bl, cl, dl, el, m[10], 0x00000000, 14); cl = rotl(cl, 10)
  el = fn1(el, al, bl, cl, dl, m[11], 0x00000000, 15); bl = rotl(bl, 10)
  dl = fn1(dl, el, al, bl, cl, m[12], 0x00000000, 6); al = rotl(al, 10)
  cl = fn1(cl, dl, el, al, bl, m[13], 0x00000000, 7); el = rotl(el, 10)
  bl = fn1(bl, cl, dl, el, al, m[14], 0x00000000, 9); dl = rotl(dl, 10)
  al = fn1(al, bl, cl, dl, el, m[15], 0x00000000, 8); cl = rotl(cl, 10)

  // Mj = 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8
  // K = 0x5a827999
  // Sj = 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12
  el = fn2(el, al, bl, cl, dl, m[7], 0x5a827999, 7); bl = rotl(bl, 10)
  dl = fn2(dl, el, al, bl, cl, m[4], 0x5a827999, 6); al = rotl(al, 10)
  cl = fn2(cl, dl, el, al, bl, m[13], 0x5a827999, 8); el = rotl(el, 10)
  bl = fn2(bl, cl, dl, el, al, m[1], 0x5a827999, 13); dl = rotl(dl, 10)
  al = fn2(al, bl, cl, dl, el, m[10], 0x5a827999, 11); cl = rotl(cl, 10)
  el = fn2(el, al, bl, cl, dl, m[6], 0x5a827999, 9); bl = rotl(bl, 10)
  dl = fn2(dl, el, al, bl, cl, m[15], 0x5a827999, 7); al = rotl(al, 10)
  cl = fn2(cl, dl, el, al, bl, m[3], 0x5a827999, 15); el = rotl(el, 10)
  bl = fn2(bl, cl, dl, el, al, m[12], 0x5a827999, 7); dl = rotl(dl, 10)
  al = fn2(al, bl, cl, dl, el, m[0], 0x5a827999, 12); cl = rotl(cl, 10)
  el = fn2(el, al, bl, cl, dl, m[9], 0x5a827999, 15); bl = rotl(bl, 10)
  dl = fn2(dl, el, al, bl, cl, m[5], 0x5a827999, 9); al = rotl(al, 10)
  cl = fn2(cl, dl, el, al, bl, m[2], 0x5a827999, 11); el = rotl(el, 10)
  bl = fn2(bl, cl, dl, el, al, m[14], 0x5a827999, 7); dl = rotl(dl, 10)
  al = fn2(al, bl, cl, dl, el, m[11], 0x5a827999, 13); cl = rotl(cl, 10)
  el = fn2(el, al, bl, cl, dl, m[8], 0x5a827999, 12); bl = rotl(bl, 10)

  // Mj = 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12
  // K = 0x6ed9eba1
  // Sj = 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5
  dl = fn3(dl, el, al, bl, cl, m[3], 0x6ed9eba1, 11); al = rotl(al, 10)
  cl = fn3(cl, dl, el, al, bl, m[10], 0x6ed9eba1, 13); el = rotl(el, 10)
  bl = fn3(bl, cl, dl, el, al, m[14], 0x6ed9eba1, 6); dl = rotl(dl, 10)
  al = fn3(al, bl, cl, dl, el, m[4], 0x6ed9eba1, 7); cl = rotl(cl, 10)
  el = fn3(el, al, bl, cl, dl, m[9], 0x6ed9eba1, 14); bl = rotl(bl, 10)
  dl = fn3(dl, el, al, bl, cl, m[15], 0x6ed9eba1, 9); al = rotl(al, 10)
  cl = fn3(cl, dl, el, al, bl, m[8], 0x6ed9eba1, 13); el = rotl(el, 10)
  bl = fn3(bl, cl, dl, el, al, m[1], 0x6ed9eba1, 15); dl = rotl(dl, 10)
  al = fn3(al, bl, cl, dl, el, m[2], 0x6ed9eba1, 14); cl = rotl(cl, 10)
  el = fn3(el, al, bl, cl, dl, m[7], 0x6ed9eba1, 8); bl = rotl(bl, 10)
  dl = fn3(dl, el, al, bl, cl, m[0], 0x6ed9eba1, 13); al = rotl(al, 10)
  cl = fn3(cl, dl, el, al, bl, m[6], 0x6ed9eba1, 6); el = rotl(el, 10)
  bl = fn3(bl, cl, dl, el, al, m[13], 0x6ed9eba1, 5); dl = rotl(dl, 10)
  al = fn3(al, bl, cl, dl, el, m[11], 0x6ed9eba1, 12); cl = rotl(cl, 10)
  el = fn3(el, al, bl, cl, dl, m[5], 0x6ed9eba1, 7); bl = rotl(bl, 10)
  dl = fn3(dl, el, al, bl, cl, m[12], 0x6ed9eba1, 5); al = rotl(al, 10)

  // Mj = 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2
  // K = 0x8f1bbcdc
  // Sj = 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12
  cl = fn4(cl, dl, el, al, bl, m[1], 0x8f1bbcdc, 11); el = rotl(el, 10)
  bl = fn4(bl, cl, dl, el, al, m[9], 0x8f1bbcdc, 12); dl = rotl(dl, 10)
  al = fn4(al, bl, cl, dl, el, m[11], 0x8f1bbcdc, 14); cl = rotl(cl, 10)
  el = fn4(el, al, bl, cl, dl, m[10], 0x8f1bbcdc, 15); bl = rotl(bl, 10)
  dl = fn4(dl, el, al, bl, cl, m[0], 0x8f1bbcdc, 14); al = rotl(al, 10)
  cl = fn4(cl, dl, el, al, bl, m[8], 0x8f1bbcdc, 15); el = rotl(el, 10)
  bl = fn4(bl, cl, dl, el, al, m[12], 0x8f1bbcdc, 9); dl = rotl(dl, 10)
  al = fn4(al, bl, cl, dl, el, m[4], 0x8f1bbcdc, 8); cl = rotl(cl, 10)
  el = fn4(el, al, bl, cl, dl, m[13], 0x8f1bbcdc, 9); bl = rotl(bl, 10)
  dl = fn4(dl, el, al, bl, cl, m[3], 0x8f1bbcdc, 14); al = rotl(al, 10)
  cl = fn4(cl, dl, el, al, bl, m[7], 0x8f1bbcdc, 5); el = rotl(el, 10)
  bl = fn4(bl, cl, dl, el, al, m[15], 0x8f1bbcdc, 6); dl = rotl(dl, 10)
  al = fn4(al, bl, cl, dl, el, m[14], 0x8f1bbcdc, 8); cl = rotl(cl, 10)
  el = fn4(el, al, bl, cl, dl, m[5], 0x8f1bbcdc, 6); bl = rotl(bl, 10)
  dl = fn4(dl, el, al, bl, cl, m[6], 0x8f1bbcdc, 5); al = rotl(al, 10)
  cl = fn4(cl, dl, el, al, bl, m[2], 0x8f1bbcdc, 12); el = rotl(el, 10)

  // Mj = 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
  // K = 0xa953fd4e
  // Sj = 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
  bl = fn5(bl, cl, dl, el, al, m[4], 0xa953fd4e, 9); dl = rotl(dl, 10)
  al = fn5(al, bl, cl, dl, el, m[0], 0xa953fd4e, 15); cl = rotl(cl, 10)
  el = fn5(el, al, bl, cl, dl, m[5], 0xa953fd4e, 5); bl = rotl(bl, 10)
  dl = fn5(dl, el, al, bl, cl, m[9], 0xa953fd4e, 11); al = rotl(al, 10)
  cl = fn5(cl, dl, el, al, bl, m[7], 0xa953fd4e, 6); el = rotl(el, 10)
  bl = fn5(bl, cl, dl, el, al, m[12], 0xa953fd4e, 8); dl = rotl(dl, 10)
  al = fn5(al, bl, cl, dl, el, m[2], 0xa953fd4e, 13); cl = rotl(cl, 10)
  el = fn5(el, al, bl, cl, dl, m[10], 0xa953fd4e, 12); bl = rotl(bl, 10)
  dl = fn5(dl, el, al, bl, cl, m[14], 0xa953fd4e, 5); al = rotl(al, 10)
  cl = fn5(cl, dl, el, al, bl, m[1], 0xa953fd4e, 12); el = rotl(el, 10)
  bl = fn5(bl, cl, dl, el, al, m[3], 0xa953fd4e, 13); dl = rotl(dl, 10)
  al = fn5(al, bl, cl, dl, el, m[8], 0xa953fd4e, 14); cl = rotl(cl, 10)
  el = fn5(el, al, bl, cl, dl, m[11], 0xa953fd4e, 11); bl = rotl(bl, 10)
  dl = fn5(dl, el, al, bl, cl, m[6], 0xa953fd4e, 8); al = rotl(al, 10)
  cl = fn5(cl, dl, el, al, bl, m[15], 0xa953fd4e, 5); el = rotl(el, 10)
  bl = fn5(bl, cl, dl, el, al, m[13], 0xa953fd4e, 6); dl = rotl(dl, 10)

  var ar = this._a
  var br = this._b
  var cr = this._c
  var dr = this._d
  var er = this._e

  // M'j = 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12
  // K' = 0x50a28be6
  // S'j = 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6
  ar = fn5(ar, br, cr, dr, er, m[5], 0x50a28be6, 8); cr = rotl(cr, 10)
  er = fn5(er, ar, br, cr, dr, m[14], 0x50a28be6, 9); br = rotl(br, 10)
  dr = fn5(dr, er, ar, br, cr, m[7], 0x50a28be6, 9); ar = rotl(ar, 10)
  cr = fn5(cr, dr, er, ar, br, m[0], 0x50a28be6, 11); er = rotl(er, 10)
  br = fn5(br, cr, dr, er, ar, m[9], 0x50a28be6, 13); dr = rotl(dr, 10)
  ar = fn5(ar, br, cr, dr, er, m[2], 0x50a28be6, 15); cr = rotl(cr, 10)
  er = fn5(er, ar, br, cr, dr, m[11], 0x50a28be6, 15); br = rotl(br, 10)
  dr = fn5(dr, er, ar, br, cr, m[4], 0x50a28be6, 5); ar = rotl(ar, 10)
  cr = fn5(cr, dr, er, ar, br, m[13], 0x50a28be6, 7); er = rotl(er, 10)
  br = fn5(br, cr, dr, er, ar, m[6], 0x50a28be6, 7); dr = rotl(dr, 10)
  ar = fn5(ar, br, cr, dr, er, m[15], 0x50a28be6, 8); cr = rotl(cr, 10)
  er = fn5(er, ar, br, cr, dr, m[8], 0x50a28be6, 11); br = rotl(br, 10)
  dr = fn5(dr, er, ar, br, cr, m[1], 0x50a28be6, 14); ar = rotl(ar, 10)
  cr = fn5(cr, dr, er, ar, br, m[10], 0x50a28be6, 14); er = rotl(er, 10)
  br = fn5(br, cr, dr, er, ar, m[3], 0x50a28be6, 12); dr = rotl(dr, 10)
  ar = fn5(ar, br, cr, dr, er, m[12], 0x50a28be6, 6); cr = rotl(cr, 10)

  // M'j = 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2
  // K' = 0x5c4dd124
  // S'j = 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11
  er = fn4(er, ar, br, cr, dr, m[6], 0x5c4dd124, 9); br = rotl(br, 10)
  dr = fn4(dr, er, ar, br, cr, m[11], 0x5c4dd124, 13); ar = rotl(ar, 10)
  cr = fn4(cr, dr, er, ar, br, m[3], 0x5c4dd124, 15); er = rotl(er, 10)
  br = fn4(br, cr, dr, er, ar, m[7], 0x5c4dd124, 7); dr = rotl(dr, 10)
  ar = fn4(ar, br, cr, dr, er, m[0], 0x5c4dd124, 12); cr = rotl(cr, 10)
  er = fn4(er, ar, br, cr, dr, m[13], 0x5c4dd124, 8); br = rotl(br, 10)
  dr = fn4(dr, er, ar, br, cr, m[5], 0x5c4dd124, 9); ar = rotl(ar, 10)
  cr = fn4(cr, dr, er, ar, br, m[10], 0x5c4dd124, 11); er = rotl(er, 10)
  br = fn4(br, cr, dr, er, ar, m[14], 0x5c4dd124, 7); dr = rotl(dr, 10)
  ar = fn4(ar, br, cr, dr, er, m[15], 0x5c4dd124, 7); cr = rotl(cr, 10)
  er = fn4(er, ar, br, cr, dr, m[8], 0x5c4dd124, 12); br = rotl(br, 10)
  dr = fn4(dr, er, ar, br, cr, m[12], 0x5c4dd124, 7); ar = rotl(ar, 10)
  cr = fn4(cr, dr, er, ar, br, m[4], 0x5c4dd124, 6); er = rotl(er, 10)
  br = fn4(br, cr, dr, er, ar, m[9], 0x5c4dd124, 15); dr = rotl(dr, 10)
  ar = fn4(ar, br, cr, dr, er, m[1], 0x5c4dd124, 13); cr = rotl(cr, 10)
  er = fn4(er, ar, br, cr, dr, m[2], 0x5c4dd124, 11); br = rotl(br, 10)

  // M'j = 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13
  // K' = 0x6d703ef3
  // S'j = 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5
  dr = fn3(dr, er, ar, br, cr, m[15], 0x6d703ef3, 9); ar = rotl(ar, 10)
  cr = fn3(cr, dr, er, ar, br, m[5], 0x6d703ef3, 7); er = rotl(er, 10)
  br = fn3(br, cr, dr, er, ar, m[1], 0x6d703ef3, 15); dr = rotl(dr, 10)
  ar = fn3(ar, br, cr, dr, er, m[3], 0x6d703ef3, 11); cr = rotl(cr, 10)
  er = fn3(er, ar, br, cr, dr, m[7], 0x6d703ef3, 8); br = rotl(br, 10)
  dr = fn3(dr, er, ar, br, cr, m[14], 0x6d703ef3, 6); ar = rotl(ar, 10)
  cr = fn3(cr, dr, er, ar, br, m[6], 0x6d703ef3, 6); er = rotl(er, 10)
  br = fn3(br, cr, dr, er, ar, m[9], 0x6d703ef3, 14); dr = rotl(dr, 10)
  ar = fn3(ar, br, cr, dr, er, m[11], 0x6d703ef3, 12); cr = rotl(cr, 10)
  er = fn3(er, ar, br, cr, dr, m[8], 0x6d703ef3, 13); br = rotl(br, 10)
  dr = fn3(dr, er, ar, br, cr, m[12], 0x6d703ef3, 5); ar = rotl(ar, 10)
  cr = fn3(cr, dr, er, ar, br, m[2], 0x6d703ef3, 14); er = rotl(er, 10)
  br = fn3(br, cr, dr, er, ar, m[10], 0x6d703ef3, 13); dr = rotl(dr, 10)
  ar = fn3(ar, br, cr, dr, er, m[0], 0x6d703ef3, 13); cr = rotl(cr, 10)
  er = fn3(er, ar, br, cr, dr, m[4], 0x6d703ef3, 7); br = rotl(br, 10)
  dr = fn3(dr, er, ar, br, cr, m[13], 0x6d703ef3, 5); ar = rotl(ar, 10)

  // M'j = 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14
  // K' = 0x7a6d76e9
  // S'j = 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8
  cr = fn2(cr, dr, er, ar, br, m[8], 0x7a6d76e9, 15); er = rotl(er, 10)
  br = fn2(br, cr, dr, er, ar, m[6], 0x7a6d76e9, 5); dr = rotl(dr, 10)
  ar = fn2(ar, br, cr, dr, er, m[4], 0x7a6d76e9, 8); cr = rotl(cr, 10)
  er = fn2(er, ar, br, cr, dr, m[1], 0x7a6d76e9, 11); br = rotl(br, 10)
  dr = fn2(dr, er, ar, br, cr, m[3], 0x7a6d76e9, 14); ar = rotl(ar, 10)
  cr = fn2(cr, dr, er, ar, br, m[11], 0x7a6d76e9, 14); er = rotl(er, 10)
  br = fn2(br, cr, dr, er, ar, m[15], 0x7a6d76e9, 6); dr = rotl(dr, 10)
  ar = fn2(ar, br, cr, dr, er, m[0], 0x7a6d76e9, 14); cr = rotl(cr, 10)
  er = fn2(er, ar, br, cr, dr, m[5], 0x7a6d76e9, 6); br = rotl(br, 10)
  dr = fn2(dr, er, ar, br, cr, m[12], 0x7a6d76e9, 9); ar = rotl(ar, 10)
  cr = fn2(cr, dr, er, ar, br, m[2], 0x7a6d76e9, 12); er = rotl(er, 10)
  br = fn2(br, cr, dr, er, ar, m[13], 0x7a6d76e9, 9); dr = rotl(dr, 10)
  ar = fn2(ar, br, cr, dr, er, m[9], 0x7a6d76e9, 12); cr = rotl(cr, 10)
  er = fn2(er, ar, br, cr, dr, m[7], 0x7a6d76e9, 5); br = rotl(br, 10)
  dr = fn2(dr, er, ar, br, cr, m[10], 0x7a6d76e9, 15); ar = rotl(ar, 10)
  cr = fn2(cr, dr, er, ar, br, m[14], 0x7a6d76e9, 8); er = rotl(er, 10)

  // M'j = 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
  // K' = 0x00000000
  // S'j = 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
  br = fn1(br, cr, dr, er, ar, m[12], 0x00000000, 8); dr = rotl(dr, 10)
  ar = fn1(ar, br, cr, dr, er, m[15], 0x00000000, 5); cr = rotl(cr, 10)
  er = fn1(er, ar, br, cr, dr, m[10], 0x00000000, 12); br = rotl(br, 10)
  dr = fn1(dr, er, ar, br, cr, m[4], 0x00000000, 9); ar = rotl(ar, 10)
  cr = fn1(cr, dr, er, ar, br, m[1], 0x00000000, 12); er = rotl(er, 10)
  br = fn1(br, cr, dr, er, ar, m[5], 0x00000000, 5); dr = rotl(dr, 10)
  ar = fn1(ar, br, cr, dr, er, m[8], 0x00000000, 14); cr = rotl(cr, 10)
  er = fn1(er, ar, br, cr, dr, m[7], 0x00000000, 6); br = rotl(br, 10)
  dr = fn1(dr, er, ar, br, cr, m[6], 0x00000000, 8); ar = rotl(ar, 10)
  cr = fn1(cr, dr, er, ar, br, m[2], 0x00000000, 13); er = rotl(er, 10)
  br = fn1(br, cr, dr, er, ar, m[13], 0x00000000, 6); dr = rotl(dr, 10)
  ar = fn1(ar, br, cr, dr, er, m[14], 0x00000000, 5); cr = rotl(cr, 10)
  er = fn1(er, ar, br, cr, dr, m[0], 0x00000000, 15); br = rotl(br, 10)
  dr = fn1(dr, er, ar, br, cr, m[3], 0x00000000, 13); ar = rotl(ar, 10)
  cr = fn1(cr, dr, er, ar, br, m[9], 0x00000000, 11); er = rotl(er, 10)
  br = fn1(br, cr, dr, er, ar, m[11], 0x00000000, 11); dr = rotl(dr, 10)

  // change state
  var t = (this._b + cl + dr) | 0
  this._b = (this._c + dl + er) | 0
  this._c = (this._d + el + ar) | 0
  this._d = (this._e + al + br) | 0
  this._e = (this._a + bl + cr) | 0
  this._a = t
}

RIPEMD160.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64)
    this._update()
    this._blockOffset = 0
  }

  this._block.fill(0, this._blockOffset, 56)
  this._block.writeUInt32LE(this._length[0], 56)
  this._block.writeUInt32LE(this._length[1], 60)
  this._update()

  // produce result
  var buffer = new Buffer(20)
  buffer.writeInt32LE(this._a, 0)
  buffer.writeInt32LE(this._b, 4)
  buffer.writeInt32LE(this._c, 8)
  buffer.writeInt32LE(this._d, 12)
  buffer.writeInt32LE(this._e, 16)
  return buffer
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fn1 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
}

function fn2 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
}

function fn3 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
}

function fn4 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
}

function fn5 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
}

module.exports = RIPEMD160

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

var exports = module.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase()

  var Algorithm = exports[algorithm]
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
}

exports.sha = __webpack_require__(432)
exports.sha1 = __webpack_require__(433)
exports.sha224 = __webpack_require__(434)
exports.sha256 = __webpack_require__(281)
exports.sha384 = __webpack_require__(435)
exports.sha512 = __webpack_require__(282)


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(7)
var Hash = __webpack_require__(67)
var Buffer = __webpack_require__(6).Buffer

var K = [
  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
]

var W = new Array(64)

function Sha256 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha256, Hash)

Sha256.prototype.init = function () {
  this._a = 0x6a09e667
  this._b = 0xbb67ae85
  this._c = 0x3c6ef372
  this._d = 0xa54ff53a
  this._e = 0x510e527f
  this._f = 0x9b05688c
  this._g = 0x1f83d9ab
  this._h = 0x5be0cd19

  return this
}

function ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
}

function sigma1 (x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
}

function gamma0 (x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
}

function gamma1 (x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
}

Sha256.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0
  var f = this._f | 0
  var g = this._g | 0
  var h = this._h | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0

  for (var j = 0; j < 64; ++j) {
    var T1 = (h + sigma1(e) + ch(e, f, g) + K[j] + W[j]) | 0
    var T2 = (sigma0(a) + maj(a, b, c)) | 0

    h = g
    g = f
    f = e
    e = (d + T1) | 0
    d = c
    c = b
    b = a
    a = (T1 + T2) | 0
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
  this._f = (f + this._f) | 0
  this._g = (g + this._g) | 0
  this._h = (h + this._h) | 0
}

Sha256.prototype._hash = function () {
  var H = Buffer.allocUnsafe(32)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)
  H.writeInt32BE(this._h, 28)

  return H
}

module.exports = Sha256


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7)
var Hash = __webpack_require__(67)
var Buffer = __webpack_require__(6).Buffer

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
]

var W = new Array(160)

function Sha512 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha512, Hash)

Sha512.prototype.init = function () {
  this._ah = 0x6a09e667
  this._bh = 0xbb67ae85
  this._ch = 0x3c6ef372
  this._dh = 0xa54ff53a
  this._eh = 0x510e527f
  this._fh = 0x9b05688c
  this._gh = 0x1f83d9ab
  this._hh = 0x5be0cd19

  this._al = 0xf3bcc908
  this._bl = 0x84caa73b
  this._cl = 0xfe94f82b
  this._dl = 0x5f1d36f1
  this._el = 0xade682d1
  this._fl = 0x2b3e6c1f
  this._gl = 0xfb41bd6b
  this._hl = 0x137e2179

  return this
}

function Ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
}

function sigma1 (x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
}

function Gamma0 (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
}

function Gamma0l (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
}

function Gamma1 (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
}

function Gamma1l (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
}

function getCarry (a, b) {
  return (a >>> 0) < (b >>> 0) ? 1 : 0
}

Sha512.prototype._update = function (M) {
  var W = this._w

  var ah = this._ah | 0
  var bh = this._bh | 0
  var ch = this._ch | 0
  var dh = this._dh | 0
  var eh = this._eh | 0
  var fh = this._fh | 0
  var gh = this._gh | 0
  var hh = this._hh | 0

  var al = this._al | 0
  var bl = this._bl | 0
  var cl = this._cl | 0
  var dl = this._dl | 0
  var el = this._el | 0
  var fl = this._fl | 0
  var gl = this._gl | 0
  var hl = this._hl | 0

  for (var i = 0; i < 32; i += 2) {
    W[i] = M.readInt32BE(i * 4)
    W[i + 1] = M.readInt32BE(i * 4 + 4)
  }
  for (; i < 160; i += 2) {
    var xh = W[i - 15 * 2]
    var xl = W[i - 15 * 2 + 1]
    var gamma0 = Gamma0(xh, xl)
    var gamma0l = Gamma0l(xl, xh)

    xh = W[i - 2 * 2]
    xl = W[i - 2 * 2 + 1]
    var gamma1 = Gamma1(xh, xl)
    var gamma1l = Gamma1l(xl, xh)

    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
    var Wi7h = W[i - 7 * 2]
    var Wi7l = W[i - 7 * 2 + 1]

    var Wi16h = W[i - 16 * 2]
    var Wi16l = W[i - 16 * 2 + 1]

    var Wil = (gamma0l + Wi7l) | 0
    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0
    Wil = (Wil + gamma1l) | 0
    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0
    Wil = (Wil + Wi16l) | 0
    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0

    W[i] = Wih
    W[i + 1] = Wil
  }

  for (var j = 0; j < 160; j += 2) {
    Wih = W[j]
    Wil = W[j + 1]

    var majh = maj(ah, bh, ch)
    var majl = maj(al, bl, cl)

    var sigma0h = sigma0(ah, al)
    var sigma0l = sigma0(al, ah)
    var sigma1h = sigma1(eh, el)
    var sigma1l = sigma1(el, eh)

    // t1 = h + sigma1 + ch + K[j] + W[j]
    var Kih = K[j]
    var Kil = K[j + 1]

    var chh = Ch(eh, fh, gh)
    var chl = Ch(el, fl, gl)

    var t1l = (hl + sigma1l) | 0
    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0
    t1l = (t1l + chl) | 0
    t1h = (t1h + chh + getCarry(t1l, chl)) | 0
    t1l = (t1l + Kil) | 0
    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0
    t1l = (t1l + Wil) | 0
    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0

    // t2 = sigma0 + maj
    var t2l = (sigma0l + majl) | 0
    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0

    hh = gh
    hl = gl
    gh = fh
    gl = fl
    fh = eh
    fl = el
    el = (dl + t1l) | 0
    eh = (dh + t1h + getCarry(el, dl)) | 0
    dh = ch
    dl = cl
    ch = bh
    cl = bl
    bh = ah
    bl = al
    al = (t1l + t2l) | 0
    ah = (t1h + t2h + getCarry(al, t1l)) | 0
  }

  this._al = (this._al + al) | 0
  this._bl = (this._bl + bl) | 0
  this._cl = (this._cl + cl) | 0
  this._dl = (this._dl + dl) | 0
  this._el = (this._el + el) | 0
  this._fl = (this._fl + fl) | 0
  this._gl = (this._gl + gl) | 0
  this._hl = (this._hl + hl) | 0

  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0
  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0
  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0
  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0
  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0
  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0
  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0
  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0
}

Sha512.prototype._hash = function () {
  var H = Buffer.allocUnsafe(64)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)
  writeInt64BE(this._gh, this._gl, 48)
  writeInt64BE(this._hh, this._hl, 56)

  return H
}

module.exports = Sha512


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(6).Buffer
var BN = __webpack_require__(112)
var ECJPoint = __webpack_require__(284)

function ECPoint (x, y) {
  if (x === null && y === null) {
    this.x = this.y = null
    this.inf = true
  } else {
    this.x = x
    this.y = y
    this.inf = false
  }
}

ECPoint.fromPublicKey = function (publicKey) {
  var first = publicKey[0]
  var x
  var y

  if (publicKey.length === 33 && (first === 0x02 || first === 0x03)) {
    x = BN.fromBuffer(publicKey.slice(1, 33))

    // overflow
    if (x.ucmp(BN.p) >= 0) return null

    // create from X
    y = x.redSqr().redMul(x).redIAdd7().redSqrt()
    if (y === null) return null
    if ((first === 0x03) !== y.isOdd()) y = y.redNeg()

    return new ECPoint(x, y)
  }

  if (publicKey.length === 65 && (first === 0x04 || first === 0x06 || first === 0x07)) {
    x = BN.fromBuffer(publicKey.slice(1, 33))
    y = BN.fromBuffer(publicKey.slice(33, 65))

    // overflow
    if (x.ucmp(BN.p) >= 0 || y.ucmp(BN.p) >= 0) return null

    // is odd flag
    if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null

    // x*x*x + 7 = y*y
    if (x.redSqr().redMul(x).redIAdd7().ucmp(y.redSqr()) !== 0) return null

    return new ECPoint(x, y)
  }

  return null
}

ECPoint.prototype.toPublicKey = function (compressed) {
  var x = this.x
  var y = this.y
  var publicKey

  if (compressed) {
    publicKey = Buffer.alloc(33)
    publicKey[0] = y.isOdd() ? 0x03 : 0x02
    x.toBuffer().copy(publicKey, 1)
  } else {
    publicKey = Buffer.alloc(65)
    publicKey[0] = 0x04
    x.toBuffer().copy(publicKey, 1)
    y.toBuffer().copy(publicKey, 33)
  }

  return publicKey
}

ECPoint.fromECJPoint = function (p) {
  if (p.inf) return new ECPoint(null, null)

  var zinv = p.z.redInvm()
  var zinv2 = zinv.redSqr()
  var ax = p.x.redMul(zinv2)
  var ay = p.y.redMul(zinv2).redMul(zinv)

  return new ECPoint(ax, ay)
}

ECPoint.prototype.toECJPoint = function () {
  if (this.inf) return new ECJPoint(null, null, null)

  return new ECJPoint(this.x, this.y, ECJPoint.one)
}

ECPoint.prototype.neg = function () {
  if (this.inf) return this

  return new ECPoint(this.x, this.y.redNeg())
}

ECPoint.prototype.add = function (p) {
  // O + P = P
  if (this.inf) return p

  // P + O = P
  if (p.inf) return this

  if (this.x.ucmp(p.x) === 0) {
    // P + P = 2P
    if (this.y.ucmp(p.y) === 0) return this.dbl()
    // P + (-P) = O
    return new ECPoint(null, null)
  }

  // s = (y - yp) / (x - xp)
  // nx = s^2 - x - xp
  // ny = s * (x - nx) - y
  var s = this.y.redSub(p.y)
  if (!s.isZero()) s = s.redMul(this.x.redSub(p.x).redInvm())

  var nx = s.redSqr().redISub(this.x).redISub(p.x)
  var ny = s.redMul(this.x.redSub(nx)).redISub(this.y)
  return new ECPoint(nx, ny)
}

ECPoint.prototype.dbl = function () {
  if (this.inf) return this

  // 2P = O
  var yy = this.y.redAdd(this.y)
  if (yy.isZero()) return new ECPoint(null, null)

  // s = (3 * x^2) / (2 * y)
  // nx = s^2 - 2*x
  // ny = s * (x - nx) - y
  var x2 = this.x.redSqr()
  var s = x2.redAdd(x2).redIAdd(x2).redMul(yy.redInvm())

  var nx = s.redSqr().redISub(this.x.redAdd(this.x))
  var ny = s.redMul(this.x.redSub(nx)).redISub(this.y)
  return new ECPoint(nx, ny)
}

ECPoint.prototype.mul = function (num) {
  // Algorithm 3.36 Window NAF method for point multiplication
  var nafPoints = this._getNAFPoints(4)
  var points = nafPoints.points

  // Get NAF form
  var naf = num.getNAF(nafPoints.wnd)

  // Add `this`*(N+1) for every w-NAF index
  var acc = new ECJPoint(null, null, null)
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var k = 0; i >= 0 && naf[i] === 0; i--, ++k);
    if (i >= 0) k += 1
    acc = acc.dblp(k)

    if (i < 0) break

    // J +- P
    var z = naf[i]
    if (z > 0) {
      acc = acc.mixedAdd(points[(z - 1) >> 1])
    } else {
      acc = acc.mixedAdd(points[(-z - 1) >> 1].neg())
    }
  }

  return ECPoint.fromECJPoint(acc)
}

ECPoint.prototype._getNAFPoints1 = function () {
  return { wnd: 1, points: [this] }
}

ECPoint.prototype._getNAFPoints = function (wnd) {
  var points = new Array((1 << wnd) - 1)
  points[0] = this
  var dbl = this.dbl()
  for (var i = 1; i < points.length; ++i) points[i] = points[i - 1].add(dbl)
  return { wnd: wnd, points: points }
}

module.exports = ECPoint


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var BN = __webpack_require__(112)

function ECJPoint (x, y, z) {
  if (x === null && y === null && z === null) {
    this.x = ECJPoint.one
    this.y = ECJPoint.one
    this.z = ECJPoint.zero
  } else {
    this.x = x
    this.y = y
    this.z = z
  }

  this.zOne = this.z === ECJPoint.one
}

ECJPoint.zero = BN.fromNumber(0)
ECJPoint.one = BN.fromNumber(1)

ECJPoint.prototype.neg = function () {
  if (this.inf) return this

  return new ECJPoint(this.x, this.y.redNeg(), this.z)
}

ECJPoint.prototype.add = function (p) {
  // O + P = P
  if (this.inf) return p

  // P + O = P
  if (p.inf) return this

  // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#addition-add-1998-cmo-2
  // 12M + 4S + 7A
  var pz2 = p.z.redSqr()
  var z2 = this.z.redSqr()
  var u1 = this.x.redMul(pz2)
  var u2 = p.x.redMul(z2)
  var s1 = this.y.redMul(pz2).redMul(p.z)
  var s2 = p.y.redMul(z2).redMul(this.z)

  var h = u1.redSub(u2)
  var r = s1.redSub(s2)
  if (h.isZero()) {
    if (r.isZero()) return this.dbl()
    return new ECJPoint(null, null, null)
  }

  var h2 = h.redSqr()
  var v = u1.redMul(h2)
  var h3 = h2.redMul(h)

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v)
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3))
  var nz = this.z.redMul(p.z).redMul(h)

  return new ECJPoint(nx, ny, nz)
}

ECJPoint.prototype.mixedAdd = function (p) {
  // O + P = P
  if (this.inf) return p.toECJPoint()

  // P + O = P
  if (p.inf) return this

  // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#addition-add-1998-cmo-2
  //   with p.z = 1
  // 8M + 3S + 7A
  var z2 = this.z.redSqr()
  var u1 = this.x
  var u2 = p.x.redMul(z2)
  var s1 = this.y
  var s2 = p.y.redMul(z2).redMul(this.z)

  var h = u1.redSub(u2)
  var r = s1.redSub(s2)
  if (h.isZero()) {
    if (r.isZero()) return this.dbl()
    return new ECJPoint(null, null, null)
  }

  var h2 = h.redSqr()
  var v = u1.redMul(h2)
  var h3 = h2.redMul(h)

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v)
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3))
  var nz = this.z.redMul(h)

  return new ECJPoint(nx, ny, nz)
}

ECJPoint.prototype.dbl = function () {
  if (this.inf) return this

  var nx
  var ny
  var nz

  // Z = 1
  if (this.zOne) {
    // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#doubling-mdbl-2007-bl
    // 1M + 5S + 6A + 3*2 + 1*3 + 1*8

    // XX = X1^2
    var xx = this.x.redSqr()
    // YY = Y1^2
    var yy = this.y.redSqr()
    // YYYY = YY^2
    var yyyy = yy.redSqr()
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy)
    s = s.redIAdd(s)
    // M = 3 * XX
    var m = xx.redAdd(xx).redIAdd(xx)
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s)

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy).redIAdd(yyyy).redIAdd(yyyy)

    // X3 = T
    nx = t
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8)
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y)
  } else {
    // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#doubling-dbl-2009-l
    // 2M + 5S + 6A + 3*2 + 1*3 + 1*8

    // A = X1^2
    var a = this.x.redSqr()
    // B = Y1^2
    var b = this.y.redSqr()
    // C = B^2
    var c = b.redSqr()
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c)
    d = d.redIAdd(d)
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a)
    // F = E^2
    var f = e.redSqr()

    // 8 * C
    var c8 = c.redIAdd(c).redIAdd(c).redIAdd(c)

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d)
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8)
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z)
    nz = nz.redIAdd(nz)
  }

  return new ECJPoint(nx, ny, nz)
}

ECJPoint.prototype.dblp = function (pow) {
  if (pow === 0 || this.inf) return this

  var point = this
  for (var i = 0; i < pow; i++) point = point.dbl()

  return point
}

Object.defineProperty(ECJPoint.prototype, 'inf', {
  enumerable: true,
  get: function () {
    return this.z.isZero()
  }
})

module.exports = ECJPoint


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const rsa = __webpack_require__(272)

function randomBytes (number) {
  if (!number || typeof number !== 'number') {
    throw new Error('first argument must be a Number bigger than 0')
  }

  return rsa.getRandomValues(new Uint8Array(number))
}

module.exports = randomBytes


/***/ }),
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Multihash implementation in JavaScript.
 *
 * @module multihash
 */


const bs58 = __webpack_require__(254)

const cs = __webpack_require__(352)

exports.names = cs.names
exports.codes = cs.codes
exports.defaultLengths = cs.defaultLengths

const varint = __webpack_require__(46)

/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */
exports.toHexString = function toHexString (hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer')
  }

  return hash.toString('hex')
}

/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Buffer}
 */
exports.fromHexString = function fromHexString (hash) {
  return Buffer.from(hash, 'hex')
}

/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */
exports.toB58String = function toB58String (hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer')
  }

  return bs58.encode(hash)
}

/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Buffer} hash
 * @returns {Buffer}
 */
exports.fromB58String = function fromB58String (hash) {
  let encoded = hash
  if (Buffer.isBuffer(hash)) {
    encoded = hash.toString()
  }

  return Buffer.from(bs58.decode(encoded))
}

/**
 * Decode a hash from the given multihash.
 *
 * @param {Buffer} buf
 * @returns {{code: number, name: string, length: number, digest: Buffer}} result
 */
exports.decode = function decode (buf) {
  if (!(Buffer.isBuffer(buf))) {
    throw new Error('multihash must be a Buffer')
  }

  if (buf.length < 3) {
    throw new Error('multihash too short. must be > 3 bytes.')
  }

  let code = varint.decode(buf)
  if (!exports.isValidCode(code)) {
    throw new Error(`multihash unknown function code: 0x${code.toString(16)}`)
  }
  buf = buf.slice(varint.decode.bytes)

  let len = varint.decode(buf)
  if (len < 1) {
    throw new Error(`multihash invalid length: 0x${len.toString(16)}`)
  }
  buf = buf.slice(varint.decode.bytes)

  if (buf.length !== len) {
    throw new Error(`multihash length inconsistent: 0x${buf.toString('hex')}`)
  }

  return {
    code: code,
    name: cs.codes[code],
    length: len,
    digest: buf
  }
}

/**
 *  Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Buffer} digest
 * @param {string|number} code
 * @param {number} [length]
 * @returns {Buffer}
 */
exports.encode = function encode (digest, code, length) {
  if (!digest || !code) {
    throw new Error('multihash encode requires at least two args: digest, code')
  }

  // ensure it's a hashfunction code.
  const hashfn = exports.coerceCode(code)

  if (!(Buffer.isBuffer(digest))) {
    throw new Error('digest should be a Buffer')
  }

  if (length == null) {
    length = digest.length
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.')
  }

  return Buffer.concat([
    Buffer.from(varint.encode(hashfn)),
    Buffer.from(varint.encode(length)),
    digest
  ])
}

/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 * @param {string|number} name
 * @returns {number}
 */
exports.coerceCode = function coerceCode (name) {
  let code = name

  if (typeof name === 'string') {
    if (!cs.names[name]) {
      throw new Error(`Unrecognized hash function named: ${name}`)
    }
    code = cs.names[name]
  }

  if (typeof code !== 'number') {
    throw new Error(`Hash function code should be a number. Got: ${code}`)
  }

  if (!cs.codes[code] && !exports.isAppCode(code)) {
    throw new Error(`Unrecognized function code: ${code}`)
  }

  return code
}

/**
 * Checks wether a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isAppCode = function appCode (code) {
  return code > 0 && code < 0x10
}

/**
 * Checks whether a multihash code is valid.
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isValidCode = function validCode (code) {
  if (exports.isAppCode(code)) {
    return true
  }

  if (cs.codes[code]) {
    return true
  }

  return false
}

/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */
function validate (multihash) {
  exports.decode(multihash) // throws if bad.
}
exports.validate = validate

/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */
exports.prefix = function prefix (multihash) {
  validate(multihash)

  return multihash.slice(0, 2)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = __webpack_require__(409).Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(typeof module === 'undefined' || module, this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(343)(module)))

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isAsync = undefined;

var _asyncify = __webpack_require__(350);

var _asyncify2 = _interopRequireDefault(_asyncify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
    return isAsync(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;
}

exports.default = wrapAsync;
exports.isAsync = isAsync;

/***/ }),
/* 343 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const hmac = __webpack_require__(257)
const aes = __webpack_require__(358)
const keys = __webpack_require__(381)

exports = module.exports

exports.aes = aes
exports.hmac = hmac
exports.keys = keys
exports.randomBytes = __webpack_require__(285)


/***/ }),
/* 345 */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),
/* 346 */
/***/ (function(module, exports) {

module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onlyOnce;
function onlyOnce(fn) {
    return function () {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var inherits = __webpack_require__(7)
var md5 = __webpack_require__(278)
var RIPEMD160 = __webpack_require__(279)
var sha = __webpack_require__(280)

var Base = __webpack_require__(47)

function HashNoConstructor (hash) {
  Base.call(this, 'digest')

  this._hash = hash
  this.buffers = []
}

inherits(HashNoConstructor, Base)

HashNoConstructor.prototype._update = function (data) {
  this.buffers.push(data)
}

HashNoConstructor.prototype._final = function () {
  var buf = Buffer.concat(this.buffers)
  var r = this._hash(buf)
  this.buffers = null

  return r
}

function Hash (hash) {
  Base.call(this, 'digest')

  this._hash = hash
}

inherits(Hash, Base)

Hash.prototype._update = function (data) {
  this._hash.update(data)
}

Hash.prototype._final = function () {
  return this._hash.digest()
}

module.exports = function createHash (alg) {
  alg = alg.toLowerCase()
  if (alg === 'md5') return new HashNoConstructor(md5)
  if (alg === 'rmd160' || alg === 'ripemd160') return new Hash(new RIPEMD160())

  return new Hash(sha(alg))
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = whilst;

var _noop = __webpack_require__(345);

var _noop2 = _interopRequireDefault(_noop);

var _slice = __webpack_require__(132);

var _slice2 = _interopRequireDefault(_slice);

var _onlyOnce = __webpack_require__(347);

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

var _wrapAsync = __webpack_require__(342);

var _wrapAsync2 = _interopRequireDefault(_wrapAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs.
 *
 * @name whilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Function} test - synchronous truth test to perform before each
 * execution of `iteratee`. Invoked with ().
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns undefined
 * @example
 *
 * var count = 0;
 * async.whilst(
 *     function() { return count < 5; },
 *     function(callback) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err, n) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */
function whilst(test, iteratee, callback) {
    callback = (0, _onlyOnce2.default)(callback || _noop2.default);
    var _iteratee = (0, _wrapAsync2.default)(iteratee);
    if (!test()) return callback(null);
    var next = function (err /*, ...args*/) {
        if (err) return callback(err);
        if (test()) return _iteratee(next);
        var args = (0, _slice2.default)(arguments, 1);
        callback.apply(null, [null].concat(args));
    };
    _iteratee(next);
}
module.exports = exports['default'];

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = asyncify;

var _isObject = __webpack_require__(354);

var _isObject2 = _interopRequireDefault(_isObject);

var _initialParams = __webpack_require__(355);

var _initialParams2 = _interopRequireDefault(_initialParams);

var _setImmediate = __webpack_require__(255);

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */
function asyncify(func) {
    return (0, _initialParams2.default)(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if ((0, _isObject2.default)(result) && typeof result.then === 'function') {
            result.then(function (value) {
                invokeCallback(callback, null, value);
            }, function (err) {
                invokeCallback(callback, err.message ? err : new Error(err));
            });
        } else {
            callback(null, result);
        }
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (e) {
        (0, _setImmediate2.default)(rethrow, e);
    }
}

function rethrow(error) {
    throw error;
}
module.exports = exports['default'];

/***/ }),
/* 351 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint quote-props: off */
/* eslint key-spacing: off */


exports.names = Object.freeze({
  'sha1':       0x11,
  'sha2-256':   0x12,
  'sha2-512':   0x13,
  'sha3-224':   0x17,
  'sha3-256':   0x16,
  'sha3-384':   0x15,
  'sha3-512':   0x14,
  'shake-128':  0x18,
  'shake-256':  0x19,
  'keccak-224': 0x1A,
  'keccak-256': 0x1B,
  'keccak-384': 0x1C,
  'keccak-512': 0x1D,
  'murmur3-128': 0x22,
  'murmur3-32':  0x23,
  'blake2b-8':   0xb201,
  'blake2b-16':  0xb202,
  'blake2b-24':  0xb203,
  'blake2b-32':  0xb204,
  'blake2b-40':  0xb205,
  'blake2b-48':  0xb206,
  'blake2b-56':  0xb207,
  'blake2b-64':  0xb208,
  'blake2b-72':  0xb209,
  'blake2b-80':  0xb20a,
  'blake2b-88':  0xb20b,
  'blake2b-96':  0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8':   0xb241,
  'blake2s-16':  0xb242,
  'blake2s-24':  0xb243,
  'blake2s-32':  0xb244,
  'blake2s-40':  0xb245,
  'blake2s-48':  0xb246,
  'blake2s-56':  0xb247,
  'blake2s-64':  0xb248,
  'blake2s-72':  0xb249,
  'blake2s-80':  0xb24a,
  'blake2s-88':  0xb24b,
  'blake2s-96':  0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'Skein256-8': 0xb301,
  'Skein256-16': 0xb302,
  'Skein256-24': 0xb303,
  'Skein256-32': 0xb304,
  'Skein256-40': 0xb305,
  'Skein256-48': 0xb306,
  'Skein256-56': 0xb307,
  'Skein256-64': 0xb308,
  'Skein256-72': 0xb309,
  'Skein256-80': 0xb30a,
  'Skein256-88': 0xb30b,
  'Skein256-96': 0xb30c,
  'Skein256-104': 0xb30d,
  'Skein256-112': 0xb30e,
  'Skein256-120': 0xb30f,
  'Skein256-128': 0xb310,
  'Skein256-136': 0xb311,
  'Skein256-144': 0xb312,
  'Skein256-152': 0xb313,
  'Skein256-160': 0xb314,
  'Skein256-168': 0xb315,
  'Skein256-176': 0xb316,
  'Skein256-184': 0xb317,
  'Skein256-192': 0xb318,
  'Skein256-200': 0xb319,
  'Skein256-208': 0xb31a,
  'Skein256-216': 0xb31b,
  'Skein256-224': 0xb31c,
  'Skein256-232': 0xb31d,
  'Skein256-240': 0xb31e,
  'Skein256-248': 0xb31f,
  'Skein256-256': 0xb320,
  'Skein512-8': 0xb321,
  'Skein512-16': 0xb322,
  'Skein512-24': 0xb323,
  'Skein512-32': 0xb324,
  'Skein512-40': 0xb325,
  'Skein512-48': 0xb326,
  'Skein512-56': 0xb327,
  'Skein512-64': 0xb328,
  'Skein512-72': 0xb329,
  'Skein512-80': 0xb32a,
  'Skein512-88': 0xb32b,
  'Skein512-96': 0xb32c,
  'Skein512-104': 0xb32d,
  'Skein512-112': 0xb32e,
  'Skein512-120': 0xb32f,
  'Skein512-128': 0xb330,
  'Skein512-136': 0xb331,
  'Skein512-144': 0xb332,
  'Skein512-152': 0xb333,
  'Skein512-160': 0xb334,
  'Skein512-168': 0xb335,
  'Skein512-176': 0xb336,
  'Skein512-184': 0xb337,
  'Skein512-192': 0xb338,
  'Skein512-200': 0xb339,
  'Skein512-208': 0xb33a,
  'Skein512-216': 0xb33b,
  'Skein512-224': 0xb33c,
  'Skein512-232': 0xb33d,
  'Skein512-240': 0xb33e,
  'Skein512-248': 0xb33f,
  'Skein512-256': 0xb340,
  'Skein512-264': 0xb341,
  'Skein512-272': 0xb342,
  'Skein512-280': 0xb343,
  'Skein512-288': 0xb344,
  'Skein512-296': 0xb345,
  'Skein512-304': 0xb346,
  'Skein512-312': 0xb347,
  'Skein512-320': 0xb348,
  'Skein512-328': 0xb349,
  'Skein512-336': 0xb34a,
  'Skein512-344': 0xb34b,
  'Skein512-352': 0xb34c,
  'Skein512-360': 0xb34d,
  'Skein512-368': 0xb34e,
  'Skein512-376': 0xb34f,
  'Skein512-384': 0xb350,
  'Skein512-392': 0xb351,
  'Skein512-400': 0xb352,
  'Skein512-408': 0xb353,
  'Skein512-416': 0xb354,
  'Skein512-424': 0xb355,
  'Skein512-432': 0xb356,
  'Skein512-440': 0xb357,
  'Skein512-448': 0xb358,
  'Skein512-456': 0xb359,
  'Skein512-464': 0xb35a,
  'Skein512-472': 0xb35b,
  'Skein512-480': 0xb35c,
  'Skein512-488': 0xb35d,
  'Skein512-496': 0xb35e,
  'Skein512-504': 0xb35f,
  'Skein512-512': 0xb360,
  'Skein1024-8': 0xb361,
  'Skein1024-16': 0xb362,
  'Skein1024-24': 0xb363,
  'Skein1024-32': 0xb364,
  'Skein1024-40': 0xb365,
  'Skein1024-48': 0xb366,
  'Skein1024-56': 0xb367,
  'Skein1024-64': 0xb368,
  'Skein1024-72': 0xb369,
  'Skein1024-80': 0xb36a,
  'Skein1024-88': 0xb36b,
  'Skein1024-96': 0xb36c,
  'Skein1024-104': 0xb36d,
  'Skein1024-112': 0xb36e,
  'Skein1024-120': 0xb36f,
  'Skein1024-128': 0xb370,
  'Skein1024-136': 0xb371,
  'Skein1024-144': 0xb372,
  'Skein1024-152': 0xb373,
  'Skein1024-160': 0xb374,
  'Skein1024-168': 0xb375,
  'Skein1024-176': 0xb376,
  'Skein1024-184': 0xb377,
  'Skein1024-192': 0xb378,
  'Skein1024-200': 0xb379,
  'Skein1024-208': 0xb37a,
  'Skein1024-216': 0xb37b,
  'Skein1024-224': 0xb37c,
  'Skein1024-232': 0xb37d,
  'Skein1024-240': 0xb37e,
  'Skein1024-248': 0xb37f,
  'Skein1024-256': 0xb380,
  'Skein1024-264': 0xb381,
  'Skein1024-272': 0xb382,
  'Skein1024-280': 0xb383,
  'Skein1024-288': 0xb384,
  'Skein1024-296': 0xb385,
  'Skein1024-304': 0xb386,
  'Skein1024-312': 0xb387,
  'Skein1024-320': 0xb388,
  'Skein1024-328': 0xb389,
  'Skein1024-336': 0xb38a,
  'Skein1024-344': 0xb38b,
  'Skein1024-352': 0xb38c,
  'Skein1024-360': 0xb38d,
  'Skein1024-368': 0xb38e,
  'Skein1024-376': 0xb38f,
  'Skein1024-384': 0xb390,
  'Skein1024-392': 0xb391,
  'Skein1024-400': 0xb392,
  'Skein1024-408': 0xb393,
  'Skein1024-416': 0xb394,
  'Skein1024-424': 0xb395,
  'Skein1024-432': 0xb396,
  'Skein1024-440': 0xb397,
  'Skein1024-448': 0xb398,
  'Skein1024-456': 0xb399,
  'Skein1024-464': 0xb39a,
  'Skein1024-472': 0xb39b,
  'Skein1024-480': 0xb39c,
  'Skein1024-488': 0xb39d,
  'Skein1024-496': 0xb39e,
  'Skein1024-504': 0xb39f,
  'Skein1024-512': 0xb3a0,
  'Skein1024-520': 0xb3a1,
  'Skein1024-528': 0xb3a2,
  'Skein1024-536': 0xb3a3,
  'Skein1024-544': 0xb3a4,
  'Skein1024-552': 0xb3a5,
  'Skein1024-560': 0xb3a6,
  'Skein1024-568': 0xb3a7,
  'Skein1024-576': 0xb3a8,
  'Skein1024-584': 0xb3a9,
  'Skein1024-592': 0xb3aa,
  'Skein1024-600': 0xb3ab,
  'Skein1024-608': 0xb3ac,
  'Skein1024-616': 0xb3ad,
  'Skein1024-624': 0xb3ae,
  'Skein1024-632': 0xb3af,
  'Skein1024-640': 0xb3b0,
  'Skein1024-648': 0xb3b1,
  'Skein1024-656': 0xb3b2,
  'Skein1024-664': 0xb3b3,
  'Skein1024-672': 0xb3b4,
  'Skein1024-680': 0xb3b5,
  'Skein1024-688': 0xb3b6,
  'Skein1024-696': 0xb3b7,
  'Skein1024-704': 0xb3b8,
  'Skein1024-712': 0xb3b9,
  'Skein1024-720': 0xb3ba,
  'Skein1024-728': 0xb3bb,
  'Skein1024-736': 0xb3bc,
  'Skein1024-744': 0xb3bd,
  'Skein1024-752': 0xb3be,
  'Skein1024-760': 0xb3bf,
  'Skein1024-768': 0xb3c0,
  'Skein1024-776': 0xb3c1,
  'Skein1024-784': 0xb3c2,
  'Skein1024-792': 0xb3c3,
  'Skein1024-800': 0xb3c4,
  'Skein1024-808': 0xb3c5,
  'Skein1024-816': 0xb3c6,
  'Skein1024-824': 0xb3c7,
  'Skein1024-832': 0xb3c8,
  'Skein1024-840': 0xb3c9,
  'Skein1024-848': 0xb3ca,
  'Skein1024-856': 0xb3cb,
  'Skein1024-864': 0xb3cc,
  'Skein1024-872': 0xb3cd,
  'Skein1024-880': 0xb3ce,
  'Skein1024-888': 0xb3cf,
  'Skein1024-896': 0xb3d0,
  'Skein1024-904': 0xb3d1,
  'Skein1024-912': 0xb3d2,
  'Skein1024-920': 0xb3d3,
  'Skein1024-928': 0xb3d4,
  'Skein1024-936': 0xb3d5,
  'Skein1024-944': 0xb3d6,
  'Skein1024-952': 0xb3d7,
  'Skein1024-960': 0xb3d8,
  'Skein1024-968': 0xb3d9,
  'Skein1024-976': 0xb3da,
  'Skein1024-984': 0xb3db,
  'Skein1024-992': 0xb3dc,
  'Skein1024-1000': 0xb3dd,
  'Skein1024-1008': 0xb3de,
  'Skein1024-1016': 0xb3df,
  'Skein1024-1024': 0xb3e0
})

exports.codes = Object.freeze({
  0x11: 'sha1',
  0x12: 'sha2-256',
  0x13: 'sha2-512',
  0x17: 'sha3-224',
  0x16: 'sha3-256',
  0x15: 'sha3-384',
  0x14: 'sha3-512',
  0x18: 'shake-128',
  0x19: 'shake-256',
  0x1A: 'keccak-224',
  0x1B: 'keccak-256',
  0x1C: 'keccak-384',
  0x1D: 'keccak-512',
  0x22: 'murmur3-128',
  0x23: 'murmur3-32',

  // blake2
  0xb201: 'blake2b-8',
  0xb202: 'blake2b-16',
  0xb203: 'blake2b-24',
  0xb204: 'blake2b-32',
  0xb205: 'blake2b-40',
  0xb206: 'blake2b-48',
  0xb207: 'blake2b-56',
  0xb208: 'blake2b-64',
  0xb209: 'blake2b-72',
  0xb20a: 'blake2b-80',
  0xb20b: 'blake2b-88',
  0xb20c: 'blake2b-96',
  0xb20d: 'blake2b-104',
  0xb20e: 'blake2b-112',
  0xb20f: 'blake2b-120',
  0xb210: 'blake2b-128',
  0xb211: 'blake2b-136',
  0xb212: 'blake2b-144',
  0xb213: 'blake2b-152',
  0xb214: 'blake2b-160',
  0xb215: 'blake2b-168',
  0xb216: 'blake2b-176',
  0xb217: 'blake2b-184',
  0xb218: 'blake2b-192',
  0xb219: 'blake2b-200',
  0xb21a: 'blake2b-208',
  0xb21b: 'blake2b-216',
  0xb21c: 'blake2b-224',
  0xb21d: 'blake2b-232',
  0xb21e: 'blake2b-240',
  0xb21f: 'blake2b-248',
  0xb220: 'blake2b-256',
  0xb221: 'blake2b-264',
  0xb222: 'blake2b-272',
  0xb223: 'blake2b-280',
  0xb224: 'blake2b-288',
  0xb225: 'blake2b-296',
  0xb226: 'blake2b-304',
  0xb227: 'blake2b-312',
  0xb228: 'blake2b-320',
  0xb229: 'blake2b-328',
  0xb22a: 'blake2b-336',
  0xb22b: 'blake2b-344',
  0xb22c: 'blake2b-352',
  0xb22d: 'blake2b-360',
  0xb22e: 'blake2b-368',
  0xb22f: 'blake2b-376',
  0xb230: 'blake2b-384',
  0xb231: 'blake2b-392',
  0xb232: 'blake2b-400',
  0xb233: 'blake2b-408',
  0xb234: 'blake2b-416',
  0xb235: 'blake2b-424',
  0xb236: 'blake2b-432',
  0xb237: 'blake2b-440',
  0xb238: 'blake2b-448',
  0xb239: 'blake2b-456',
  0xb23a: 'blake2b-464',
  0xb23b: 'blake2b-472',
  0xb23c: 'blake2b-480',
  0xb23d: 'blake2b-488',
  0xb23e: 'blake2b-496',
  0xb23f: 'blake2b-504',
  0xb240: 'blake2b-512',
  0xb241: 'blake2s-8',
  0xb242: 'blake2s-16',
  0xb243: 'blake2s-24',
  0xb244: 'blake2s-32',
  0xb245: 'blake2s-40',
  0xb246: 'blake2s-48',
  0xb247: 'blake2s-56',
  0xb248: 'blake2s-64',
  0xb249: 'blake2s-72',
  0xb24a: 'blake2s-80',
  0xb24b: 'blake2s-88',
  0xb24c: 'blake2s-96',
  0xb24d: 'blake2s-104',
  0xb24e: 'blake2s-112',
  0xb24f: 'blake2s-120',
  0xb250: 'blake2s-128',
  0xb251: 'blake2s-136',
  0xb252: 'blake2s-144',
  0xb253: 'blake2s-152',
  0xb254: 'blake2s-160',
  0xb255: 'blake2s-168',
  0xb256: 'blake2s-176',
  0xb257: 'blake2s-184',
  0xb258: 'blake2s-192',
  0xb259: 'blake2s-200',
  0xb25a: 'blake2s-208',
  0xb25b: 'blake2s-216',
  0xb25c: 'blake2s-224',
  0xb25d: 'blake2s-232',
  0xb25e: 'blake2s-240',
  0xb25f: 'blake2s-248',
  0xb260: 'blake2s-256',

  // skein
  0xb301: 'Skein256-8',
  0xb302: 'Skein256-16',
  0xb303: 'Skein256-24',
  0xb304: 'Skein256-32',
  0xb305: 'Skein256-40',
  0xb306: 'Skein256-48',
  0xb307: 'Skein256-56',
  0xb308: 'Skein256-64',
  0xb309: 'Skein256-72',
  0xb30a: 'Skein256-80',
  0xb30b: 'Skein256-88',
  0xb30c: 'Skein256-96',
  0xb30d: 'Skein256-104',
  0xb30e: 'Skein256-112',
  0xb30f: 'Skein256-120',
  0xb310: 'Skein256-128',
  0xb311: 'Skein256-136',
  0xb312: 'Skein256-144',
  0xb313: 'Skein256-152',
  0xb314: 'Skein256-160',
  0xb315: 'Skein256-168',
  0xb316: 'Skein256-176',
  0xb317: 'Skein256-184',
  0xb318: 'Skein256-192',
  0xb319: 'Skein256-200',
  0xb31a: 'Skein256-208',
  0xb31b: 'Skein256-216',
  0xb31c: 'Skein256-224',
  0xb31d: 'Skein256-232',
  0xb31e: 'Skein256-240',
  0xb31f: 'Skein256-248',
  0xb320: 'Skein256-256',
  0xb321: 'Skein512-8',
  0xb322: 'Skein512-16',
  0xb323: 'Skein512-24',
  0xb324: 'Skein512-32',
  0xb325: 'Skein512-40',
  0xb326: 'Skein512-48',
  0xb327: 'Skein512-56',
  0xb328: 'Skein512-64',
  0xb329: 'Skein512-72',
  0xb32a: 'Skein512-80',
  0xb32b: 'Skein512-88',
  0xb32c: 'Skein512-96',
  0xb32d: 'Skein512-104',
  0xb32e: 'Skein512-112',
  0xb32f: 'Skein512-120',
  0xb330: 'Skein512-128',
  0xb331: 'Skein512-136',
  0xb332: 'Skein512-144',
  0xb333: 'Skein512-152',
  0xb334: 'Skein512-160',
  0xb335: 'Skein512-168',
  0xb336: 'Skein512-176',
  0xb337: 'Skein512-184',
  0xb338: 'Skein512-192',
  0xb339: 'Skein512-200',
  0xb33a: 'Skein512-208',
  0xb33b: 'Skein512-216',
  0xb33c: 'Skein512-224',
  0xb33d: 'Skein512-232',
  0xb33e: 'Skein512-240',
  0xb33f: 'Skein512-248',
  0xb340: 'Skein512-256',
  0xb341: 'Skein512-264',
  0xb342: 'Skein512-272',
  0xb343: 'Skein512-280',
  0xb344: 'Skein512-288',
  0xb345: 'Skein512-296',
  0xb346: 'Skein512-304',
  0xb347: 'Skein512-312',
  0xb348: 'Skein512-320',
  0xb349: 'Skein512-328',
  0xb34a: 'Skein512-336',
  0xb34b: 'Skein512-344',
  0xb34c: 'Skein512-352',
  0xb34d: 'Skein512-360',
  0xb34e: 'Skein512-368',
  0xb34f: 'Skein512-376',
  0xb350: 'Skein512-384',
  0xb351: 'Skein512-392',
  0xb352: 'Skein512-400',
  0xb353: 'Skein512-408',
  0xb354: 'Skein512-416',
  0xb355: 'Skein512-424',
  0xb356: 'Skein512-432',
  0xb357: 'Skein512-440',
  0xb358: 'Skein512-448',
  0xb359: 'Skein512-456',
  0xb35a: 'Skein512-464',
  0xb35b: 'Skein512-472',
  0xb35c: 'Skein512-480',
  0xb35d: 'Skein512-488',
  0xb35e: 'Skein512-496',
  0xb35f: 'Skein512-504',
  0xb360: 'Skein512-512',
  0xb361: 'Skein1024-8',
  0xb362: 'Skein1024-16',
  0xb363: 'Skein1024-24',
  0xb364: 'Skein1024-32',
  0xb365: 'Skein1024-40',
  0xb366: 'Skein1024-48',
  0xb367: 'Skein1024-56',
  0xb368: 'Skein1024-64',
  0xb369: 'Skein1024-72',
  0xb36a: 'Skein1024-80',
  0xb36b: 'Skein1024-88',
  0xb36c: 'Skein1024-96',
  0xb36d: 'Skein1024-104',
  0xb36e: 'Skein1024-112',
  0xb36f: 'Skein1024-120',
  0xb370: 'Skein1024-128',
  0xb371: 'Skein1024-136',
  0xb372: 'Skein1024-144',
  0xb373: 'Skein1024-152',
  0xb374: 'Skein1024-160',
  0xb375: 'Skein1024-168',
  0xb376: 'Skein1024-176',
  0xb377: 'Skein1024-184',
  0xb378: 'Skein1024-192',
  0xb379: 'Skein1024-200',
  0xb37a: 'Skein1024-208',
  0xb37b: 'Skein1024-216',
  0xb37c: 'Skein1024-224',
  0xb37d: 'Skein1024-232',
  0xb37e: 'Skein1024-240',
  0xb37f: 'Skein1024-248',
  0xb380: 'Skein1024-256',
  0xb381: 'Skein1024-264',
  0xb382: 'Skein1024-272',
  0xb383: 'Skein1024-280',
  0xb384: 'Skein1024-288',
  0xb385: 'Skein1024-296',
  0xb386: 'Skein1024-304',
  0xb387: 'Skein1024-312',
  0xb388: 'Skein1024-320',
  0xb389: 'Skein1024-328',
  0xb38a: 'Skein1024-336',
  0xb38b: 'Skein1024-344',
  0xb38c: 'Skein1024-352',
  0xb38d: 'Skein1024-360',
  0xb38e: 'Skein1024-368',
  0xb38f: 'Skein1024-376',
  0xb390: 'Skein1024-384',
  0xb391: 'Skein1024-392',
  0xb392: 'Skein1024-400',
  0xb393: 'Skein1024-408',
  0xb394: 'Skein1024-416',
  0xb395: 'Skein1024-424',
  0xb396: 'Skein1024-432',
  0xb397: 'Skein1024-440',
  0xb398: 'Skein1024-448',
  0xb399: 'Skein1024-456',
  0xb39a: 'Skein1024-464',
  0xb39b: 'Skein1024-472',
  0xb39c: 'Skein1024-480',
  0xb39d: 'Skein1024-488',
  0xb39e: 'Skein1024-496',
  0xb39f: 'Skein1024-504',
  0xb3a0: 'Skein1024-512',
  0xb3a1: 'Skein1024-520',
  0xb3a2: 'Skein1024-528',
  0xb3a3: 'Skein1024-536',
  0xb3a4: 'Skein1024-544',
  0xb3a5: 'Skein1024-552',
  0xb3a6: 'Skein1024-560',
  0xb3a7: 'Skein1024-568',
  0xb3a8: 'Skein1024-576',
  0xb3a9: 'Skein1024-584',
  0xb3aa: 'Skein1024-592',
  0xb3ab: 'Skein1024-600',
  0xb3ac: 'Skein1024-608',
  0xb3ad: 'Skein1024-616',
  0xb3ae: 'Skein1024-624',
  0xb3af: 'Skein1024-632',
  0xb3b0: 'Skein1024-640',
  0xb3b1: 'Skein1024-648',
  0xb3b2: 'Skein1024-656',
  0xb3b3: 'Skein1024-664',
  0xb3b4: 'Skein1024-672',
  0xb3b5: 'Skein1024-680',
  0xb3b6: 'Skein1024-688',
  0xb3b7: 'Skein1024-696',
  0xb3b8: 'Skein1024-704',
  0xb3b9: 'Skein1024-712',
  0xb3ba: 'Skein1024-720',
  0xb3bb: 'Skein1024-728',
  0xb3bc: 'Skein1024-736',
  0xb3bd: 'Skein1024-744',
  0xb3be: 'Skein1024-752',
  0xb3bf: 'Skein1024-760',
  0xb3c0: 'Skein1024-768',
  0xb3c1: 'Skein1024-776',
  0xb3c2: 'Skein1024-784',
  0xb3c3: 'Skein1024-792',
  0xb3c4: 'Skein1024-800',
  0xb3c5: 'Skein1024-808',
  0xb3c6: 'Skein1024-816',
  0xb3c7: 'Skein1024-824',
  0xb3c8: 'Skein1024-832',
  0xb3c9: 'Skein1024-840',
  0xb3ca: 'Skein1024-848',
  0xb3cb: 'Skein1024-856',
  0xb3cc: 'Skein1024-864',
  0xb3cd: 'Skein1024-872',
  0xb3ce: 'Skein1024-880',
  0xb3cf: 'Skein1024-888',
  0xb3d0: 'Skein1024-896',
  0xb3d1: 'Skein1024-904',
  0xb3d2: 'Skein1024-912',
  0xb3d3: 'Skein1024-920',
  0xb3d4: 'Skein1024-928',
  0xb3d5: 'Skein1024-936',
  0xb3d6: 'Skein1024-944',
  0xb3d7: 'Skein1024-952',
  0xb3d8: 'Skein1024-960',
  0xb3d9: 'Skein1024-968',
  0xb3da: 'Skein1024-976',
  0xb3db: 'Skein1024-984',
  0xb3dc: 'Skein1024-992',
  0xb3dd: 'Skein1024-1000',
  0xb3de: 'Skein1024-1008',
  0xb3df: 'Skein1024-1016',
  0xb3e0: 'Skein1024-1024'
})

exports.defaultLengths = Object.freeze({
  0x11: 20,
  0x12: 32,
  0x13: 64,
  0x17: 28,
  0x16: 32,
  0x15: 48,
  0x14: 64,
  0x18: 32,
  0x19: 64,
  0x1A: 28,
  0x1B: 32,
  0x1C: 48,
  0x1D: 64,
  0x22: 32,

  0xb201: 0x01,
  0xb202: 0x02,
  0xb203: 0x03,
  0xb204: 0x04,
  0xb205: 0x05,
  0xb206: 0x06,
  0xb207: 0x07,
  0xb208: 0x08,
  0xb209: 0x09,
  0xb20a: 0x0a,
  0xb20b: 0x0b,
  0xb20c: 0x0c,
  0xb20d: 0x0d,
  0xb20e: 0x0e,
  0xb20f: 0x0f,
  0xb210: 0x10,
  0xb211: 0x11,
  0xb212: 0x12,
  0xb213: 0x13,
  0xb214: 0x14,
  0xb215: 0x15,
  0xb216: 0x16,
  0xb217: 0x17,
  0xb218: 0x18,
  0xb219: 0x19,
  0xb21a: 0x1a,
  0xb21b: 0x1b,
  0xb21c: 0x1c,
  0xb21d: 0x1d,
  0xb21e: 0x1e,
  0xb21f: 0x1f,
  0xb220: 0x20,
  0xb221: 0x21,
  0xb222: 0x22,
  0xb223: 0x23,
  0xb224: 0x24,
  0xb225: 0x25,
  0xb226: 0x26,
  0xb227: 0x27,
  0xb228: 0x28,
  0xb229: 0x29,
  0xb22a: 0x2a,
  0xb22b: 0x2b,
  0xb22c: 0x2c,
  0xb22d: 0x2d,
  0xb22e: 0x2e,
  0xb22f: 0x2f,
  0xb230: 0x30,
  0xb231: 0x31,
  0xb232: 0x32,
  0xb233: 0x33,
  0xb234: 0x34,
  0xb235: 0x35,
  0xb236: 0x36,
  0xb237: 0x37,
  0xb238: 0x38,
  0xb239: 0x39,
  0xb23a: 0x3a,
  0xb23b: 0x3b,
  0xb23c: 0x3c,
  0xb23d: 0x3d,
  0xb23e: 0x3e,
  0xb23f: 0x3f,
  0xb240: 0x40,
  0xb241: 0x01,
  0xb242: 0x02,
  0xb243: 0x03,
  0xb244: 0x04,
  0xb245: 0x05,
  0xb246: 0x06,
  0xb247: 0x07,
  0xb248: 0x08,
  0xb249: 0x09,
  0xb24a: 0x0a,
  0xb24b: 0x0b,
  0xb24c: 0x0c,
  0xb24d: 0x0d,
  0xb24e: 0x0e,
  0xb24f: 0x0f,
  0xb250: 0x10,
  0xb251: 0x11,
  0xb252: 0x12,
  0xb253: 0x13,
  0xb254: 0x14,
  0xb255: 0x15,
  0xb256: 0x16,
  0xb257: 0x17,
  0xb258: 0x18,
  0xb259: 0x19,
  0xb25a: 0x1a,
  0xb25b: 0x1b,
  0xb25c: 0x1c,
  0xb25d: 0x1d,
  0xb25e: 0x1e,
  0xb25f: 0x1f,
  0xb260: 0x20,
  0xb301: 0x01,
  0xb302: 0x02,
  0xb303: 0x03,
  0xb304: 0x04,
  0xb305: 0x05,
  0xb306: 0x06,
  0xb307: 0x07,
  0xb308: 0x08,
  0xb309: 0x09,
  0xb30a: 0x0a,
  0xb30b: 0x0b,
  0xb30c: 0x0c,
  0xb30d: 0x0d,
  0xb30e: 0x0e,
  0xb30f: 0x0f,
  0xb310: 0x10,
  0xb311: 0x11,
  0xb312: 0x12,
  0xb313: 0x13,
  0xb314: 0x14,
  0xb315: 0x15,
  0xb316: 0x16,
  0xb317: 0x17,
  0xb318: 0x18,
  0xb319: 0x19,
  0xb31a: 0x1a,
  0xb31b: 0x1b,
  0xb31c: 0x1c,
  0xb31d: 0x1d,
  0xb31e: 0x1e,
  0xb31f: 0x1f,
  0xb320: 0x20,
  0xb321: 0x01,
  0xb322: 0x02,
  0xb323: 0x03,
  0xb324: 0x04,
  0xb325: 0x05,
  0xb326: 0x06,
  0xb327: 0x07,
  0xb328: 0x08,
  0xb329: 0x09,
  0xb32a: 0x0a,
  0xb32b: 0x0b,
  0xb32c: 0x0c,
  0xb32d: 0x0d,
  0xb32e: 0x0e,
  0xb32f: 0x0f,
  0xb330: 0x10,
  0xb331: 0x11,
  0xb332: 0x12,
  0xb333: 0x13,
  0xb334: 0x14,
  0xb335: 0x15,
  0xb336: 0x16,
  0xb337: 0x17,
  0xb338: 0x18,
  0xb339: 0x19,
  0xb33a: 0x1a,
  0xb33b: 0x1b,
  0xb33c: 0x1c,
  0xb33d: 0x1d,
  0xb33e: 0x1e,
  0xb33f: 0x1f,
  0xb340: 0x20,
  0xb341: 0x21,
  0xb342: 0x22,
  0xb343: 0x23,
  0xb344: 0x24,
  0xb345: 0x25,
  0xb346: 0x26,
  0xb347: 0x27,
  0xb348: 0x28,
  0xb349: 0x29,
  0xb34a: 0x2a,
  0xb34b: 0x2b,
  0xb34c: 0x2c,
  0xb34d: 0x2d,
  0xb34e: 0x2e,
  0xb34f: 0x2f,
  0xb350: 0x30,
  0xb351: 0x31,
  0xb352: 0x32,
  0xb353: 0x33,
  0xb354: 0x34,
  0xb355: 0x35,
  0xb356: 0x36,
  0xb357: 0x37,
  0xb358: 0x38,
  0xb359: 0x39,
  0xb35a: 0x3a,
  0xb35b: 0x3b,
  0xb35c: 0x3c,
  0xb35d: 0x3d,
  0xb35e: 0x3e,
  0xb35f: 0x3f,
  0xb360: 0x40,
  0xb361: 0x01,
  0xb362: 0x02,
  0xb363: 0x03,
  0xb364: 0x04,
  0xb365: 0x05,
  0xb366: 0x06,
  0xb367: 0x07,
  0xb368: 0x08,
  0xb369: 0x09,
  0xb36a: 0x0a,
  0xb36b: 0x0b,
  0xb36c: 0x0c,
  0xb36d: 0x0d,
  0xb36e: 0x0e,
  0xb36f: 0x0f,
  0xb370: 0x10,
  0xb371: 0x11,
  0xb372: 0x12,
  0xb373: 0x13,
  0xb374: 0x14,
  0xb375: 0x15,
  0xb376: 0x16,
  0xb377: 0x17,
  0xb378: 0x18,
  0xb379: 0x19,
  0xb37a: 0x1a,
  0xb37b: 0x1b,
  0xb37c: 0x1c,
  0xb37d: 0x1d,
  0xb37e: 0x1e,
  0xb37f: 0x1f,
  0xb380: 0x20,
  0xb381: 0x21,
  0xb382: 0x22,
  0xb383: 0x23,
  0xb384: 0x24,
  0xb385: 0x25,
  0xb386: 0x26,
  0xb387: 0x27,
  0xb388: 0x28,
  0xb389: 0x29,
  0xb38a: 0x2a,
  0xb38b: 0x2b,
  0xb38c: 0x2c,
  0xb38d: 0x2d,
  0xb38e: 0x2e,
  0xb38f: 0x2f,
  0xb390: 0x30,
  0xb391: 0x31,
  0xb392: 0x32,
  0xb393: 0x33,
  0xb394: 0x34,
  0xb395: 0x35,
  0xb396: 0x36,
  0xb397: 0x37,
  0xb398: 0x38,
  0xb399: 0x39,
  0xb39a: 0x3a,
  0xb39b: 0x3b,
  0xb39c: 0x3c,
  0xb39d: 0x3d,
  0xb39e: 0x3e,
  0xb39f: 0x3f,
  0xb3a0: 0x40,
  0xb3a1: 0x41,
  0xb3a2: 0x42,
  0xb3a3: 0x43,
  0xb3a4: 0x44,
  0xb3a5: 0x45,
  0xb3a6: 0x46,
  0xb3a7: 0x47,
  0xb3a8: 0x48,
  0xb3a9: 0x49,
  0xb3aa: 0x4a,
  0xb3ab: 0x4b,
  0xb3ac: 0x4c,
  0xb3ad: 0x4d,
  0xb3ae: 0x4e,
  0xb3af: 0x4f,
  0xb3b0: 0x50,
  0xb3b1: 0x51,
  0xb3b2: 0x52,
  0xb3b3: 0x53,
  0xb3b4: 0x54,
  0xb3b5: 0x55,
  0xb3b6: 0x56,
  0xb3b7: 0x57,
  0xb3b8: 0x58,
  0xb3b9: 0x59,
  0xb3ba: 0x5a,
  0xb3bb: 0x5b,
  0xb3bc: 0x5c,
  0xb3bd: 0x5d,
  0xb3be: 0x5e,
  0xb3bf: 0x5f,
  0xb3c0: 0x60,
  0xb3c1: 0x61,
  0xb3c2: 0x62,
  0xb3c3: 0x63,
  0xb3c4: 0x64,
  0xb3c5: 0x65,
  0xb3c6: 0x66,
  0xb3c7: 0x67,
  0xb3c8: 0x68,
  0xb3c9: 0x69,
  0xb3ca: 0x6a,
  0xb3cb: 0x6b,
  0xb3cc: 0x6c,
  0xb3cd: 0x6d,
  0xb3ce: 0x6e,
  0xb3cf: 0x6f,
  0xb3d0: 0x70,
  0xb3d1: 0x71,
  0xb3d2: 0x72,
  0xb3d3: 0x73,
  0xb3d4: 0x74,
  0xb3d5: 0x75,
  0xb3d6: 0x76,
  0xb3d7: 0x77,
  0xb3d8: 0x78,
  0xb3d9: 0x79,
  0xb3da: 0x7a,
  0xb3db: 0x7b,
  0xb3dc: 0x7c,
  0xb3dd: 0x7d,
  0xb3de: 0x7e,
  0xb3df: 0x7f,
  0xb3e0: 0x80
})


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var assert = __webpack_require__(426)
var der = __webpack_require__(427)
var messages = __webpack_require__(256)

function initCompressedValue (value, defaultValue) {
  if (value === undefined) return defaultValue

  assert.isBoolean(value, messages.COMPRESSED_TYPE_INVALID)
  return value
}

module.exports = function (secp256k1) {
  return {
    privateKeyVerify: function (privateKey) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      return privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)
    },

    privateKeyExport: function (privateKey, compressed) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)
      var publicKey = secp256k1.privateKeyExport(privateKey, compressed)

      return der.privateKeyExport(privateKey, publicKey, compressed)
    },

    privateKeyImport: function (privateKey) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)

      privateKey = der.privateKeyImport(privateKey)
      if (privateKey && privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)) return privateKey

      throw new Error(messages.EC_PRIVATE_KEY_IMPORT_DER_FAIL)
    },

    privateKeyTweakAdd: function (privateKey, tweak) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      return secp256k1.privateKeyTweakAdd(privateKey, tweak)
    },

    privateKeyTweakMul: function (privateKey, tweak) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      return secp256k1.privateKeyTweakMul(privateKey, tweak)
    },

    publicKeyCreate: function (privateKey, compressed) {
      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyCreate(privateKey, compressed)
    },

    publicKeyConvert: function (publicKey, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyConvert(publicKey, compressed)
    },

    publicKeyVerify: function (publicKey) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      return secp256k1.publicKeyVerify(publicKey)
    },

    publicKeyTweakAdd: function (publicKey, tweak, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyTweakAdd(publicKey, tweak, compressed)
    },

    publicKeyTweakMul: function (publicKey, tweak, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
      assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyTweakMul(publicKey, tweak, compressed)
    },

    publicKeyCombine: function (publicKeys, compressed) {
      assert.isArray(publicKeys, messages.EC_PUBLIC_KEYS_TYPE_INVALID)
      assert.isLengthGTZero(publicKeys, messages.EC_PUBLIC_KEYS_LENGTH_INVALID)
      for (var i = 0; i < publicKeys.length; ++i) {
        assert.isBuffer(publicKeys[i], messages.EC_PUBLIC_KEY_TYPE_INVALID)
        assert.isBufferLength2(publicKeys[i], 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)
      }

      compressed = initCompressedValue(compressed, true)

      return secp256k1.publicKeyCombine(publicKeys, compressed)
    },

    signatureNormalize: function (signature) {
      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      return secp256k1.signatureNormalize(signature)
    },

    signatureExport: function (signature) {
      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      var sigObj = secp256k1.signatureExport(signature)
      return der.signatureExport(sigObj)
    },

    signatureImport: function (sig) {
      assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      var sigObj = der.signatureImport(sig)
      if (sigObj) return secp256k1.signatureImport(sigObj)

      throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
    },

    signatureImportLax: function (sig) {
      assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      var sigObj = der.signatureImportLax(sig)
      if (sigObj) return secp256k1.signatureImport(sigObj)

      throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
    },

    sign: function (message, privateKey, options) {
      assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
      assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      var data = null
      var noncefn = null
      if (options !== undefined) {
        assert.isObject(options, messages.OPTIONS_TYPE_INVALID)

        if (options.data !== undefined) {
          assert.isBuffer(options.data, messages.OPTIONS_DATA_TYPE_INVALID)
          assert.isBufferLength(options.data, 32, messages.OPTIONS_DATA_LENGTH_INVALID)
          data = options.data
        }

        if (options.noncefn !== undefined) {
          assert.isFunction(options.noncefn, messages.OPTIONS_NONCEFN_TYPE_INVALID)
          noncefn = options.noncefn
        }
      }

      return secp256k1.sign(message, privateKey, noncefn, data)
    },

    verify: function (message, signature, publicKey) {
      assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
      assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      return secp256k1.verify(message, signature, publicKey)
    },

    recover: function (message, signature, recovery, compressed) {
      assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
      assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

      assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
      assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

      assert.isNumber(recovery, messages.RECOVERY_ID_TYPE_INVALID)
      assert.isNumberInInterval(recovery, -1, 4, messages.RECOVERY_ID_VALUE_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.recover(message, signature, recovery, compressed)
    },

    ecdh: function (publicKey, privateKey) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      return secp256k1.ecdh(publicKey, privateKey)
    },

    ecdhUnsafe: function (publicKey, privateKey, compressed) {
      assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
      assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

      assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
      assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

      compressed = initCompressedValue(compressed, true)

      return secp256k1.ecdhUnsafe(publicKey, privateKey, compressed)
    }
  }
}


/***/ }),
/* 354 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (fn) {
    return function () /*...args, callback*/{
        var args = (0, _slice2.default)(arguments);
        var callback = args.pop();
        fn.call(this, args, callback);
    };
};

var _slice = __webpack_require__(132);

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 356 */
/***/ (function(module, exports) {

/**
 * @file Web Cryptography API shim
 * @author Artem S Vybornov <vybornov@gmail.com>
 * @license MIT
 */
module.exports = function webcryptoShim (global) {
    'use strict';

    if ( typeof Promise !== 'function' )
        throw "Promise support required";

    var _crypto = global.crypto || global.msCrypto;
    if ( !_crypto ) return;

    var _subtle = _crypto.subtle || _crypto.webkitSubtle;
    if ( !_subtle ) return;

    var _Crypto     = global.Crypto || _crypto.constructor || Object,
        _SubtleCrypto = global.SubtleCrypto || _subtle.constructor || Object,
        _CryptoKey  = global.CryptoKey || global.Key || Object;

    var isEdge = global.navigator.userAgent.indexOf('Edge/') > -1
    var isIE    = !!global.msCrypto && !isEdge,
        isWebkit = !_crypto.subtle && !!_crypto.webkitSubtle;
    if ( !isIE && !isWebkit ) return;

    function s2a ( s ) {
        return btoa(s).replace(/\=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
    }

    function a2s ( s ) {
        s += '===', s = s.slice( 0, -s.length % 4 );
        return atob( s.replace(/-/g, '+').replace(/_/g, '/') );
    }

    function s2b ( s ) {
        var b = new Uint8Array(s.length);
        for ( var i = 0; i < s.length; i++ ) b[i] = s.charCodeAt(i);
        return b;
    }

    function b2s ( b ) {
        if ( b instanceof ArrayBuffer ) b = new Uint8Array(b);
        return String.fromCharCode.apply( String, b );
    }

    function alg ( a ) {
        var r = { 'name': (a.name || a || '').toUpperCase().replace('V','v') };
        switch ( r.name ) {
            case 'SHA-1':
            case 'SHA-256':
            case 'SHA-384':
            case 'SHA-512':
                break;
            case 'AES-CBC':
            case 'AES-GCM':
            case 'AES-KW':
                if ( a.length ) r['length'] = a.length;
                break;
            case 'HMAC':
                if ( a.hash ) r['hash'] = alg(a.hash);
                if ( a.length ) r['length'] = a.length;
                break;
            case 'RSAES-PKCS1-v1_5':
                if ( a.publicExponent ) r['publicExponent'] = new Uint8Array(a.publicExponent);
                if ( a.modulusLength ) r['modulusLength'] = a.modulusLength;
                break;
            case 'RSASSA-PKCS1-v1_5':
            case 'RSA-OAEP':
                if ( a.hash ) r['hash'] = alg(a.hash);
                if ( a.publicExponent ) r['publicExponent'] = new Uint8Array(a.publicExponent);
                if ( a.modulusLength ) r['modulusLength'] = a.modulusLength;
                break;
            default:
                throw new SyntaxError("Bad algorithm name");
        }
        return r;
    };

    function jwkAlg ( a ) {
        return {
            'HMAC': {
                'SHA-1': 'HS1',
                'SHA-256': 'HS256',
                'SHA-384': 'HS384',
                'SHA-512': 'HS512',
            },
            'RSASSA-PKCS1-v1_5': {
                'SHA-1': 'RS1',
                'SHA-256': 'RS256',
                'SHA-384': 'RS384',
                'SHA-512': 'RS512',
            },
            'RSAES-PKCS1-v1_5': {
                '': 'RSA1_5',
            },
            'RSA-OAEP': {
                'SHA-1': 'RSA-OAEP',
                'SHA-256': 'RSA-OAEP-256',
            },
            'AES-KW': {
                '128': 'A128KW',
                '192': 'A192KW',
                '256': 'A256KW',
            },
            'AES-GCM': {
                '128': 'A128GCM',
                '192': 'A192GCM',
                '256': 'A256GCM',
            },
            'AES-CBC': {
                '128': 'A128CBC',
                '192': 'A192CBC',
                '256': 'A256CBC',
            },
        }[a.name][ ( a.hash || {} ).name || a.length || '' ];
    }

    function b2jwk ( k ) {
        if ( k instanceof ArrayBuffer || k instanceof Uint8Array ) k = JSON.parse( decodeURIComponent( escape( b2s(k) ) ) );
        var jwk = { 'kty': k.kty, 'alg': k.alg, 'ext': k.ext || k.extractable };
        switch ( jwk.kty ) {
            case 'oct':
                jwk.k = k.k;
            case 'RSA':
                [ 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi', 'oth' ].forEach( function ( x ) { if ( x in k ) jwk[x] = k[x] } );
                break;
            default:
                throw new TypeError("Unsupported key type");
        }
        return jwk;
    }

    function jwk2b ( k ) {
        var jwk = b2jwk(k);
        if ( isIE ) jwk['extractable'] = jwk.ext, delete jwk.ext;
        return s2b( unescape( encodeURIComponent( JSON.stringify(jwk) ) ) ).buffer;
    }

    function pkcs2jwk ( k ) {
        var info = b2der(k), prv = false;
        if ( info.length > 2 ) prv = true, info.shift(); // remove version from PKCS#8 PrivateKeyInfo structure
        var jwk = { 'ext': true };
        switch ( info[0][0] ) {
            case '1.2.840.113549.1.1.1':
                var rsaComp = [ 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi' ],
                    rsaKey  = b2der( info[1] );
                if ( prv ) rsaKey.shift(); // remove version from PKCS#1 RSAPrivateKey structure
                for ( var i = 0; i < rsaKey.length; i++ ) {
                    if ( !rsaKey[i][0] ) rsaKey[i] = rsaKey[i].subarray(1);
                    jwk[ rsaComp[i] ] = s2a( b2s( rsaKey[i] ) );
                }
                jwk['kty'] = 'RSA';
                break;
            default:
                throw new TypeError("Unsupported key type");
        }
        return jwk;
    }

    function jwk2pkcs ( k ) {
        var key, info = [ [ '', null ] ], prv = false;
        switch ( k.kty ) {
            case 'RSA':
                var rsaComp = [ 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi' ],
                    rsaKey = [];
                for ( var i = 0; i < rsaComp.length; i++ ) {
                    if ( !( rsaComp[i] in k ) ) break;
                    var b = rsaKey[i] = s2b( a2s( k[ rsaComp[i] ] ) );
                    if ( b[0] & 0x80 ) rsaKey[i] = new Uint8Array(b.length + 1), rsaKey[i].set( b, 1 );
                }
                if ( rsaKey.length > 2 ) prv = true, rsaKey.unshift( new Uint8Array([0]) ); // add version to PKCS#1 RSAPrivateKey structure
                info[0][0] = '1.2.840.113549.1.1.1';
                key = rsaKey;
                break;
            default:
                throw new TypeError("Unsupported key type");
        }
        info.push( new Uint8Array( der2b(key) ).buffer );
        if ( !prv ) info[1] = { 'tag': 0x03, 'value': info[1] };
        else info.unshift( new Uint8Array([0]) ); // add version to PKCS#8 PrivateKeyInfo structure
        return new Uint8Array( der2b(info) ).buffer;
    }

    var oid2str = { 'KoZIhvcNAQEB': '1.2.840.113549.1.1.1' },
        str2oid = { '1.2.840.113549.1.1.1': 'KoZIhvcNAQEB' };

    function b2der ( buf, ctx ) {
        if ( buf instanceof ArrayBuffer ) buf = new Uint8Array(buf);
        if ( !ctx ) ctx = { pos: 0, end: buf.length };

        if ( ctx.end - ctx.pos < 2 || ctx.end > buf.length ) throw new RangeError("Malformed DER");

        var tag = buf[ctx.pos++],
            len = buf[ctx.pos++];

        if ( len >= 0x80 ) {
            len &= 0x7f;
            if ( ctx.end - ctx.pos < len ) throw new RangeError("Malformed DER");
            for ( var xlen = 0; len--; ) xlen <<= 8, xlen |= buf[ctx.pos++];
            len = xlen;
        }

        if ( ctx.end - ctx.pos < len ) throw new RangeError("Malformed DER");

        var rv;

        switch ( tag ) {
            case 0x02: // Universal Primitive INTEGER
                rv = buf.subarray( ctx.pos, ctx.pos += len );
                break;
            case 0x03: // Universal Primitive BIT STRING
                if ( buf[ctx.pos++] ) throw new Error( "Unsupported bit string" );
                len--;
            case 0x04: // Universal Primitive OCTET STRING
                rv = new Uint8Array( buf.subarray( ctx.pos, ctx.pos += len ) ).buffer;
                break;
            case 0x05: // Universal Primitive NULL
                rv = null;
                break;
            case 0x06: // Universal Primitive OBJECT IDENTIFIER
                var oid = btoa( b2s( buf.subarray( ctx.pos, ctx.pos += len ) ) );
                if ( !( oid in oid2str ) ) throw new Error( "Unsupported OBJECT ID " + oid );
                rv = oid2str[oid];
                break;
            case 0x30: // Universal Constructed SEQUENCE
                rv = [];
                for ( var end = ctx.pos + len; ctx.pos < end; ) rv.push( b2der( buf, ctx ) );
                break;
            default:
                throw new Error( "Unsupported DER tag 0x" + tag.toString(16) );
        }

        return rv;
    }

    function der2b ( val, buf ) {
        if ( !buf ) buf = [];

        var tag = 0, len = 0,
            pos = buf.length + 2;

        buf.push( 0, 0 ); // placeholder

        if ( val instanceof Uint8Array ) {  // Universal Primitive INTEGER
            tag = 0x02, len = val.length;
            for ( var i = 0; i < len; i++ ) buf.push( val[i] );
        }
        else if ( val instanceof ArrayBuffer ) { // Universal Primitive OCTET STRING
            tag = 0x04, len = val.byteLength, val = new Uint8Array(val);
            for ( var i = 0; i < len; i++ ) buf.push( val[i] );
        }
        else if ( val === null ) { // Universal Primitive NULL
            tag = 0x05, len = 0;
        }
        else if ( typeof val === 'string' && val in str2oid ) { // Universal Primitive OBJECT IDENTIFIER
            var oid = s2b( atob( str2oid[val] ) );
            tag = 0x06, len = oid.length;
            for ( var i = 0; i < len; i++ ) buf.push( oid[i] );
        }
        else if ( val instanceof Array ) { // Universal Constructed SEQUENCE
            for ( var i = 0; i < val.length; i++ ) der2b( val[i], buf );
            tag = 0x30, len = buf.length - pos;
        }
        else if ( typeof val === 'object' && val.tag === 0x03 && val.value instanceof ArrayBuffer ) { // Tag hint
            val = new Uint8Array(val.value), tag = 0x03, len = val.byteLength;
            buf.push(0); for ( var i = 0; i < len; i++ ) buf.push( val[i] );
            len++;
        }
        else {
            throw new Error( "Unsupported DER value " + val );
        }

        if ( len >= 0x80 ) {
            var xlen = len, len = 4;
            buf.splice( pos, 0, (xlen >> 24) & 0xff, (xlen >> 16) & 0xff, (xlen >> 8) & 0xff, xlen & 0xff );
            while ( len > 1 && !(xlen >> 24) ) xlen <<= 8, len--;
            if ( len < 4 ) buf.splice( pos, 4 - len );
            len |= 0x80;
        }

        buf.splice( pos - 2, 2, tag, len );

        return buf;
    }

    function CryptoKey ( key, alg, ext, use ) {
        Object.defineProperties( this, {
            _key: {
                value: key
            },
            type: {
                value: key.type,
                enumerable: true,
            },
            extractable: {
                value: (ext === undefined) ? key.extractable : ext,
                enumerable: true,
            },
            algorithm: {
                value: (alg === undefined) ? key.algorithm : alg,
                enumerable: true,
            },
            usages: {
                value: (use === undefined) ? key.usages : use,
                enumerable: true,
            },
        });
    }

    function isPubKeyUse ( u ) {
        return u === 'verify' || u === 'encrypt' || u === 'wrapKey';
    }

    function isPrvKeyUse ( u ) {
        return u === 'sign' || u === 'decrypt' || u === 'unwrapKey';
    }

    [ 'generateKey', 'importKey', 'unwrapKey' ]
        .forEach( function ( m ) {
            var _fn = _subtle[m];

            _subtle[m] = function ( a, b, c ) {
                var args = [].slice.call(arguments),
                    ka, kx, ku;

                switch ( m ) {
                    case 'generateKey':
                        ka = alg(a), kx = b, ku = c;
                        break;
                    case 'importKey':
                        ka = alg(c), kx = args[3], ku = args[4];
                        if ( a === 'jwk' ) {
                            b = b2jwk(b);
                            if ( !b.alg ) b.alg = jwkAlg(ka);
                            if ( !b.key_ops ) b.key_ops = ( b.kty !== 'oct' ) ? ( 'd' in b ) ? ku.filter(isPrvKeyUse) : ku.filter(isPubKeyUse) : ku.slice();
                            args[1] = jwk2b(b);
                        }
                        break;
                    case 'unwrapKey':
                        ka = args[4], kx = args[5], ku = args[6];
                        args[2] = c._key;
                        break;
                }

                if ( m === 'generateKey' && ka.name === 'HMAC' && ka.hash ) {
                    ka.length = ka.length || { 'SHA-1': 512, 'SHA-256': 512, 'SHA-384': 1024, 'SHA-512': 1024 }[ka.hash.name];
                    return _subtle.importKey( 'raw', _crypto.getRandomValues( new Uint8Array( (ka.length+7)>>3 ) ), ka, kx, ku );
                }

                if ( isWebkit && m === 'generateKey' && ka.name === 'RSASSA-PKCS1-v1_5' && ( !ka.modulusLength || ka.modulusLength >= 2048 ) ) {
                    a = alg(a), a.name = 'RSAES-PKCS1-v1_5', delete a.hash;
                    return _subtle.generateKey( a, true, [ 'encrypt', 'decrypt' ] )
                        .then( function ( k ) {
                            return Promise.all([
                                _subtle.exportKey( 'jwk', k.publicKey ),
                                _subtle.exportKey( 'jwk', k.privateKey ),
                            ]);
                        })
                        .then( function ( keys ) {
                            keys[0].alg = keys[1].alg = jwkAlg(ka);
                            keys[0].key_ops = ku.filter(isPubKeyUse), keys[1].key_ops = ku.filter(isPrvKeyUse);
                            return Promise.all([
                                _subtle.importKey( 'jwk', keys[0], ka, true, keys[0].key_ops ),
                                _subtle.importKey( 'jwk', keys[1], ka, kx, keys[1].key_ops ),
                            ]);
                        })
                        .then( function ( keys ) {
                            return {
                                publicKey: keys[0],
                                privateKey: keys[1],
                            };
                        });
                }

                if ( ( isWebkit || ( isIE && ( ka.hash || {} ).name === 'SHA-1' ) )
                        && m === 'importKey' && a === 'jwk' && ka.name === 'HMAC' && b.kty === 'oct' ) {
                    return _subtle.importKey( 'raw', s2b( a2s(b.k) ), c, args[3], args[4] );
                }

                if ( isWebkit && m === 'importKey' && ( a === 'spki' || a === 'pkcs8' ) ) {
                    return _subtle.importKey( 'jwk', pkcs2jwk(b), c, args[3], args[4] );
                }

                if ( isIE && m === 'unwrapKey' ) {
                    return _subtle.decrypt( args[3], c, b )
                        .then( function ( k ) {
                            return _subtle.importKey( a, k, args[4], args[5], args[6] );
                        });
                }

                var op;
                try {
                    op = _fn.apply( _subtle, args );
                }
                catch ( e ) {
                    return Promise.reject(e);
                }

                if ( isIE ) {
                    op = new Promise( function ( res, rej ) {
                        op.onabort =
                        op.onerror =    function ( e ) { rej(e)               };
                        op.oncomplete = function ( r ) { res(r.target.result) };
                    });
                }

                op = op.then( function ( k ) {
                    if ( ka.name === 'HMAC' ) {
                        if ( !ka.length ) ka.length = 8 * k.algorithm.length;
                    }
                    if ( ka.name.search('RSA') == 0 ) {
                        if ( !ka.modulusLength ) ka.modulusLength = (k.publicKey || k).algorithm.modulusLength;
                        if ( !ka.publicExponent ) ka.publicExponent = (k.publicKey || k).algorithm.publicExponent;
                    }
                    if ( k.publicKey && k.privateKey ) {
                        k = {
                            publicKey: new CryptoKey( k.publicKey, ka, kx, ku.filter(isPubKeyUse) ),
                            privateKey: new CryptoKey( k.privateKey, ka, kx, ku.filter(isPrvKeyUse) ),
                        };
                    }
                    else {
                        k = new CryptoKey( k, ka, kx, ku );
                    }
                    return k;
                });

                return op;
            }
        });

    [ 'exportKey', 'wrapKey' ]
        .forEach( function ( m ) {
            var _fn = _subtle[m];

            _subtle[m] = function ( a, b, c ) {
                var args = [].slice.call(arguments);

                switch ( m ) {
                    case 'exportKey':
                        args[1] = b._key;
                        break;
                    case 'wrapKey':
                        args[1] = b._key, args[2] = c._key;
                        break;
                }

                if ( ( isWebkit || ( isIE && ( b.algorithm.hash || {} ).name === 'SHA-1' ) )
                        && m === 'exportKey' && a === 'jwk' && b.algorithm.name === 'HMAC' ) {
                    args[0] = 'raw';
                }

                if ( isWebkit && m === 'exportKey' && ( a === 'spki' || a === 'pkcs8' ) ) {
                    args[0] = 'jwk';
                }

                if ( isIE && m === 'wrapKey' ) {
                    return _subtle.exportKey( a, b )
                        .then( function ( k ) {
                            if ( a === 'jwk' ) k = s2b( unescape( encodeURIComponent( JSON.stringify( b2jwk(k) ) ) ) );
                            return  _subtle.encrypt( args[3], c, k );
                        });
                }

                var op;
                try {
                    op = _fn.apply( _subtle, args );
                }
                catch ( e ) {
                    return Promise.reject(e);
                }

                if ( isIE ) {
                    op = new Promise( function ( res, rej ) {
                        op.onabort =
                        op.onerror =    function ( e ) { rej(e)               };
                        op.oncomplete = function ( r ) { res(r.target.result) };
                    });
                }

                if ( m === 'exportKey' && a === 'jwk' ) {
                    op = op.then( function ( k ) {
                        if ( ( isWebkit || ( isIE && ( b.algorithm.hash || {} ).name === 'SHA-1' ) )
                                && b.algorithm.name === 'HMAC') {
                            return { 'kty': 'oct', 'alg': jwkAlg(b.algorithm), 'key_ops': b.usages.slice(), 'ext': true, 'k': s2a( b2s(k) ) };
                        }
                        k = b2jwk(k);
                        if ( !k.alg ) k['alg'] = jwkAlg(b.algorithm);
                        if ( !k.key_ops ) k['key_ops'] = ( b.type === 'public' ) ? b.usages.filter(isPubKeyUse) : ( b.type === 'private' ) ? b.usages.filter(isPrvKeyUse) : b.usages.slice();
                        return k;
                    });
                }

                if ( isWebkit && m === 'exportKey' && ( a === 'spki' || a === 'pkcs8' ) ) {
                    op = op.then( function ( k ) {
                        k = jwk2pkcs( b2jwk(k) );
                        return k;
                    });
                }

                return op;
            }
        });

    [ 'encrypt', 'decrypt', 'sign', 'verify' ]
        .forEach( function ( m ) {
            var _fn = _subtle[m];

            _subtle[m] = function ( a, b, c, d ) {
                if ( isIE && ( !c.byteLength || ( d && !d.byteLength ) ) )
                    throw new Error("Empy input is not allowed");

                var args = [].slice.call(arguments),
                    ka = alg(a);

                if ( isIE && m === 'decrypt' && ka.name === 'AES-GCM' ) {
                    var tl = a.tagLength >> 3;
                    args[2] = (c.buffer || c).slice( 0, c.byteLength - tl ),
                    a.tag = (c.buffer || c).slice( c.byteLength - tl );
                }

                args[1] = b._key;

                var op;
                try {
                    op = _fn.apply( _subtle, args );
                }
                catch ( e ) {
                    return Promise.reject(e);
                }

                if ( isIE ) {
                    op = new Promise( function ( res, rej ) {
                        op.onabort =
                        op.onerror = function ( e ) {
                            rej(e);
                        };

                        op.oncomplete = function ( r ) {
                            var r = r.target.result;

                            if ( m === 'encrypt' && r instanceof AesGcmEncryptResult ) {
                                var c = r.ciphertext, t = r.tag;
                                r = new Uint8Array( c.byteLength + t.byteLength );
                                r.set( new Uint8Array(c), 0 );
                                r.set( new Uint8Array(t), c.byteLength );
                                r = r.buffer;
                            }

                            res(r);
                        };
                    });
                }

                return op;
            }
        });

    if ( isIE ) {
        var _digest = _subtle.digest;

        _subtle['digest'] = function ( a, b ) {
            if ( !b.byteLength )
                throw new Error("Empy input is not allowed");

            var op;
            try {
                op = _digest.call( _subtle, a, b );
            }
            catch ( e ) {
                return Promise.reject(e);
            }

            op = new Promise( function ( res, rej ) {
                op.onabort =
                op.onerror =    function ( e ) { rej(e)               };
                op.oncomplete = function ( r ) { res(r.target.result) };
            });

            return op;
        };

        global.crypto = Object.create( _crypto, {
            getRandomValues: { value: function ( a ) { return _crypto.getRandomValues(a) } },
            subtle:          { value: _subtle },
        });

        global.CryptoKey = CryptoKey;
    }

    if ( isWebkit ) {
        _crypto.subtle = _subtle;

        global.Crypto = _Crypto;
        global.SubtleCrypto = _SubtleCrypto;
        global.CryptoKey = CryptoKey;
    }
}


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  SHA1: 20,
  SHA256: 32,
  SHA512: 64
}


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ciphers = __webpack_require__(359)

const CIPHER_MODES = {
  16: 'aes-128-ctr',
  32: 'aes-256-ctr'
}

exports.create = function (key, iv, callback) {
  const mode = CIPHER_MODES[key.length]
  if (!mode) {
    return callback(new Error('Invalid key length'))
  }

  const cipher = ciphers.createCipheriv(mode, key, iv)
  const decipher = ciphers.createDecipheriv(mode, key, iv)

  const res = {
    encrypt (data, cb) {
      cb(null, cipher.update(data))
    },

    decrypt (data, cb) {
      cb(null, decipher.update(data))
    }
  }

  callback(null, res)
}


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const crypto = __webpack_require__(360)

module.exports = {
  createCipheriv: crypto.createCipheriv,
  createDecipheriv: crypto.createDecipheriv
}


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

var ciphers = __webpack_require__(361)
var deciphers = __webpack_require__(380)
var modes = __webpack_require__(261)

function getCiphers () {
  return Object.keys(modes)
}

exports.createCipher = exports.Cipher = ciphers.createCipher
exports.createCipheriv = exports.Cipheriv = ciphers.createCipheriv
exports.createDecipher = exports.Decipher = deciphers.createDecipher
exports.createDecipheriv = exports.Decipheriv = deciphers.createDecipheriv
exports.listCiphers = exports.getCiphers = getCiphers


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

var MODES = __webpack_require__(258)
var AuthCipher = __webpack_require__(262)
var Buffer = __webpack_require__(6).Buffer
var StreamCipher = __webpack_require__(267)
var Transform = __webpack_require__(47)
var aes = __webpack_require__(110)
var ebtk = __webpack_require__(268)
var inherits = __webpack_require__(7)

function Cipher (mode, key, iv) {
  Transform.call(this)

  this._cache = new Splitter()
  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._mode = mode
  this._autopadding = true
}

inherits(Cipher, Transform)

Cipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []

  while ((chunk = this._cache.get())) {
    thing = this._mode.encrypt(this, chunk)
    out.push(thing)
  }

  return Buffer.concat(out)
}

var PADDING = Buffer.alloc(16, 0x10)

Cipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    chunk = this._mode.encrypt(this, chunk)
    this._cipher.scrub()
    return chunk
  }

  if (!chunk.equals(PADDING)) {
    this._cipher.scrub()
    throw new Error('data not multiple of block length')
  }
}

Cipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}

function Splitter () {
  this.cache = Buffer.allocUnsafe(0)
}

Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function () {
  if (this.cache.length > 15) {
    var out = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    return out
  }
  return null
}

Splitter.prototype.flush = function () {
  var len = 16 - this.cache.length
  var padBuff = Buffer.allocUnsafe(len)

  var i = -1
  while (++i < len) {
    padBuff.writeUInt8(len, i)
  }

  return Buffer.concat([this.cache, padBuff])
}

function createCipheriv (suite, password, iv) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  if (typeof password === 'string') password = Buffer.from(password)
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (typeof iv === 'string') iv = Buffer.from(iv)
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (config.type === 'stream') {
    return new StreamCipher(config.module, password, iv)
  } else if (config.type === 'auth') {
    return new AuthCipher(config.module, password, iv)
  }

  return new Cipher(config.module, password, iv)
}

function createCipher (suite, password) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk(password, false, config.key, config.iv)
  return createCipheriv(suite, keys.key, keys.iv)
}

exports.createCipheriv = createCipheriv
exports.createCipher = createCipher


/***/ }),
/* 362 */
/***/ (function(module, exports) {

exports.encrypt = function (self, block) {
  return self._cipher.encryptBlock(block)
}

exports.decrypt = function (self, block) {
  return self._cipher.decryptBlock(block)
}


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

var xor = __webpack_require__(70)

exports.encrypt = function (self, block) {
  var data = xor(block, self._prev)

  self._prev = self._cipher.encryptBlock(data)
  return self._prev
}

exports.decrypt = function (self, block) {
  var pad = self._prev

  self._prev = block
  var out = self._cipher.decryptBlock(block)

  return xor(out, pad)
}


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer
var xor = __webpack_require__(70)

function encryptStart (self, data, decrypt) {
  var len = data.length
  var out = xor(data, self._cache)
  self._cache = self._cache.slice(len)
  self._prev = Buffer.concat([self._prev, decrypt ? data : out])
  return out
}

exports.encrypt = function (self, data, decrypt) {
  var out = Buffer.allocUnsafe(0)
  var len

  while (data.length) {
    if (self._cache.length === 0) {
      self._cache = self._cipher.encryptBlock(self._prev)
      self._prev = Buffer.allocUnsafe(0)
    }

    if (self._cache.length <= data.length) {
      len = self._cache.length
      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)])
      data = data.slice(len)
    } else {
      out = Buffer.concat([out, encryptStart(self, data, decrypt)])
      break
    }
  }

  return out
}


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer

function encryptByte (self, byteParam, decrypt) {
  var pad = self._cipher.encryptBlock(self._prev)
  var out = pad[0] ^ byteParam

  self._prev = Buffer.concat([
    self._prev.slice(1),
    Buffer.from([decrypt ? byteParam : out])
  ])

  return out
}

exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = Buffer.allocUnsafe(len)
  var i = -1

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }

  return out
}


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer

function encryptByte (self, byteParam, decrypt) {
  var pad
  var i = -1
  var len = 8
  var out = 0
  var bit, value
  while (++i < len) {
    pad = self._cipher.encryptBlock(self._prev)
    bit = (byteParam & (1 << (7 - i))) ? 0x80 : 0
    value = pad[0] ^ bit
    out += ((value & 0x80) >> (i % 8))
    self._prev = shiftIn(self._prev, decrypt ? bit : value)
  }
  return out
}

function shiftIn (buffer, value) {
  var len = buffer.length
  var i = -1
  var out = Buffer.allocUnsafe(buffer.length)
  buffer = Buffer.concat([buffer, Buffer.from([value])])

  while (++i < len) {
    out[i] = buffer[i] << 1 | buffer[i + 1] >> (7)
  }

  return out
}

exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = Buffer.allocUnsafe(len)
  var i = -1

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }

  return out
}


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(70)

function getBlock (self) {
  self._prev = self._cipher.encryptBlock(self._prev)
  return self._prev
}

exports.encrypt = function (self, chunk) {
  while (self._cache.length < chunk.length) {
    self._cache = Buffer.concat([self._cache, getBlock(self)])
  }

  var pad = self._cache.slice(0, chunk.length)
  self._cache = self._cache.slice(chunk.length)
  return xor(chunk, pad)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 368 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(6).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(17)))

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(266);

/*<replacement>*/
var util = __webpack_require__(69);
util.inherits = __webpack_require__(7);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(136);


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(131).Transform


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(131).PassThrough


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer
var ZEROES = Buffer.alloc(16, 0)

function toArray (buf) {
  return [
    buf.readUInt32BE(0),
    buf.readUInt32BE(4),
    buf.readUInt32BE(8),
    buf.readUInt32BE(12)
  ]
}

function fromArray (out) {
  var buf = Buffer.allocUnsafe(16)
  buf.writeUInt32BE(out[0] >>> 0, 0)
  buf.writeUInt32BE(out[1] >>> 0, 4)
  buf.writeUInt32BE(out[2] >>> 0, 8)
  buf.writeUInt32BE(out[3] >>> 0, 12)
  return buf
}

function GHASH (key) {
  this.h = key
  this.state = Buffer.alloc(16, 0)
  this.cache = Buffer.allocUnsafe(0)
}

// from http://bitwiseshiftleft.github.io/sjcl/doc/symbols/src/core_gcm.js.html
// by Juho Vähä-Herttua
GHASH.prototype.ghash = function (block) {
  var i = -1
  while (++i < block.length) {
    this.state[i] ^= block[i]
  }
  this._multiply()
}

GHASH.prototype._multiply = function () {
  var Vi = toArray(this.h)
  var Zi = [0, 0, 0, 0]
  var j, xi, lsbVi
  var i = -1
  while (++i < 128) {
    xi = (this.state[~~(i / 8)] & (1 << (7 - (i % 8)))) !== 0
    if (xi) {
      // Z_i+1 = Z_i ^ V_i
      Zi[0] ^= Vi[0]
      Zi[1] ^= Vi[1]
      Zi[2] ^= Vi[2]
      Zi[3] ^= Vi[3]
    }

    // Store the value of LSB(V_i)
    lsbVi = (Vi[3] & 1) !== 0

    // V_i+1 = V_i >> 1
    for (j = 3; j > 0; j--) {
      Vi[j] = (Vi[j] >>> 1) | ((Vi[j - 1] & 1) << 31)
    }
    Vi[0] = Vi[0] >>> 1

    // If LSB(V_i) is 1, V_i+1 = (V_i >> 1) ^ R
    if (lsbVi) {
      Vi[0] = Vi[0] ^ (0xe1 << 24)
    }
  }
  this.state = fromArray(Zi)
}

GHASH.prototype.update = function (buf) {
  this.cache = Buffer.concat([this.cache, buf])
  var chunk
  while (this.cache.length >= 16) {
    chunk = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    this.ghash(chunk)
  }
}

GHASH.prototype.final = function (abl, bl) {
  if (this.cache.length) {
    this.ghash(Buffer.concat([this.cache, ZEROES], 16))
  }

  this.ghash(fromArray([0, abl, 0, bl]))
  return this.state
}

module.exports = GHASH


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var inherits = __webpack_require__(7)
var HashBase = __webpack_require__(379)

var ARRAY16 = new Array(16)

function MD5 () {
  HashBase.call(this, 64)

  // state
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
}

inherits(MD5, HashBase)

MD5.prototype._update = function () {
  var M = ARRAY16
  for (var i = 0; i < 16; ++i) M[i] = this._block.readInt32LE(i * 4)

  var a = this._a
  var b = this._b
  var c = this._c
  var d = this._d

  a = fnF(a, b, c, d, M[0], 0xd76aa478, 7)
  d = fnF(d, a, b, c, M[1], 0xe8c7b756, 12)
  c = fnF(c, d, a, b, M[2], 0x242070db, 17)
  b = fnF(b, c, d, a, M[3], 0xc1bdceee, 22)
  a = fnF(a, b, c, d, M[4], 0xf57c0faf, 7)
  d = fnF(d, a, b, c, M[5], 0x4787c62a, 12)
  c = fnF(c, d, a, b, M[6], 0xa8304613, 17)
  b = fnF(b, c, d, a, M[7], 0xfd469501, 22)
  a = fnF(a, b, c, d, M[8], 0x698098d8, 7)
  d = fnF(d, a, b, c, M[9], 0x8b44f7af, 12)
  c = fnF(c, d, a, b, M[10], 0xffff5bb1, 17)
  b = fnF(b, c, d, a, M[11], 0x895cd7be, 22)
  a = fnF(a, b, c, d, M[12], 0x6b901122, 7)
  d = fnF(d, a, b, c, M[13], 0xfd987193, 12)
  c = fnF(c, d, a, b, M[14], 0xa679438e, 17)
  b = fnF(b, c, d, a, M[15], 0x49b40821, 22)

  a = fnG(a, b, c, d, M[1], 0xf61e2562, 5)
  d = fnG(d, a, b, c, M[6], 0xc040b340, 9)
  c = fnG(c, d, a, b, M[11], 0x265e5a51, 14)
  b = fnG(b, c, d, a, M[0], 0xe9b6c7aa, 20)
  a = fnG(a, b, c, d, M[5], 0xd62f105d, 5)
  d = fnG(d, a, b, c, M[10], 0x02441453, 9)
  c = fnG(c, d, a, b, M[15], 0xd8a1e681, 14)
  b = fnG(b, c, d, a, M[4], 0xe7d3fbc8, 20)
  a = fnG(a, b, c, d, M[9], 0x21e1cde6, 5)
  d = fnG(d, a, b, c, M[14], 0xc33707d6, 9)
  c = fnG(c, d, a, b, M[3], 0xf4d50d87, 14)
  b = fnG(b, c, d, a, M[8], 0x455a14ed, 20)
  a = fnG(a, b, c, d, M[13], 0xa9e3e905, 5)
  d = fnG(d, a, b, c, M[2], 0xfcefa3f8, 9)
  c = fnG(c, d, a, b, M[7], 0x676f02d9, 14)
  b = fnG(b, c, d, a, M[12], 0x8d2a4c8a, 20)

  a = fnH(a, b, c, d, M[5], 0xfffa3942, 4)
  d = fnH(d, a, b, c, M[8], 0x8771f681, 11)
  c = fnH(c, d, a, b, M[11], 0x6d9d6122, 16)
  b = fnH(b, c, d, a, M[14], 0xfde5380c, 23)
  a = fnH(a, b, c, d, M[1], 0xa4beea44, 4)
  d = fnH(d, a, b, c, M[4], 0x4bdecfa9, 11)
  c = fnH(c, d, a, b, M[7], 0xf6bb4b60, 16)
  b = fnH(b, c, d, a, M[10], 0xbebfbc70, 23)
  a = fnH(a, b, c, d, M[13], 0x289b7ec6, 4)
  d = fnH(d, a, b, c, M[0], 0xeaa127fa, 11)
  c = fnH(c, d, a, b, M[3], 0xd4ef3085, 16)
  b = fnH(b, c, d, a, M[6], 0x04881d05, 23)
  a = fnH(a, b, c, d, M[9], 0xd9d4d039, 4)
  d = fnH(d, a, b, c, M[12], 0xe6db99e5, 11)
  c = fnH(c, d, a, b, M[15], 0x1fa27cf8, 16)
  b = fnH(b, c, d, a, M[2], 0xc4ac5665, 23)

  a = fnI(a, b, c, d, M[0], 0xf4292244, 6)
  d = fnI(d, a, b, c, M[7], 0x432aff97, 10)
  c = fnI(c, d, a, b, M[14], 0xab9423a7, 15)
  b = fnI(b, c, d, a, M[5], 0xfc93a039, 21)
  a = fnI(a, b, c, d, M[12], 0x655b59c3, 6)
  d = fnI(d, a, b, c, M[3], 0x8f0ccc92, 10)
  c = fnI(c, d, a, b, M[10], 0xffeff47d, 15)
  b = fnI(b, c, d, a, M[1], 0x85845dd1, 21)
  a = fnI(a, b, c, d, M[8], 0x6fa87e4f, 6)
  d = fnI(d, a, b, c, M[15], 0xfe2ce6e0, 10)
  c = fnI(c, d, a, b, M[6], 0xa3014314, 15)
  b = fnI(b, c, d, a, M[13], 0x4e0811a1, 21)
  a = fnI(a, b, c, d, M[4], 0xf7537e82, 6)
  d = fnI(d, a, b, c, M[11], 0xbd3af235, 10)
  c = fnI(c, d, a, b, M[2], 0x2ad7d2bb, 15)
  b = fnI(b, c, d, a, M[9], 0xeb86d391, 21)

  this._a = (this._a + a) | 0
  this._b = (this._b + b) | 0
  this._c = (this._c + c) | 0
  this._d = (this._d + d) | 0
}

MD5.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64)
    this._update()
    this._blockOffset = 0
  }

  this._block.fill(0, this._blockOffset, 56)
  this._block.writeUInt32LE(this._length[0], 56)
  this._block.writeUInt32LE(this._length[1], 60)
  this._update()

  // produce result
  var buffer = new Buffer(16)
  buffer.writeInt32LE(this._a, 0)
  buffer.writeInt32LE(this._b, 4)
  buffer.writeInt32LE(this._c, 8)
  buffer.writeInt32LE(this._d, 12)
  return buffer
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fnF (a, b, c, d, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + b) | 0
}

function fnG (a, b, c, d, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + b) | 0
}

function fnH (a, b, c, d, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + b) | 0
}

function fnI (a, b, c, d, m, k, s) {
  return (rotl((a + ((c ^ (b | (~d)))) + m + k) | 0, s) + b) | 0
}

module.exports = MD5

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(6).Buffer
var Transform = __webpack_require__(128).Transform
var inherits = __webpack_require__(7)

function throwIfNotStringOrBuffer (val, prefix) {
  if (!Buffer.isBuffer(val) && typeof val !== 'string') {
    throw new TypeError(prefix + ' must be a string or a buffer')
  }
}

function HashBase (blockSize) {
  Transform.call(this)

  this._block = Buffer.allocUnsafe(blockSize)
  this._blockSize = blockSize
  this._blockOffset = 0
  this._length = [0, 0, 0, 0]

  this._finalized = false
}

inherits(HashBase, Transform)

HashBase.prototype._transform = function (chunk, encoding, callback) {
  var error = null
  try {
    this.update(chunk, encoding)
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype._flush = function (callback) {
  var error = null
  try {
    this.push(this.digest())
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype.update = function (data, encoding) {
  throwIfNotStringOrBuffer(data, 'Data')
  if (this._finalized) throw new Error('Digest already called')
  if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding)

  // consume data
  var block = this._block
  var offset = 0
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++]
    this._update()
    this._blockOffset = 0
  }
  while (offset < data.length) block[this._blockOffset++] = data[offset++]

  // update length
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry
    carry = (this._length[j] / 0x0100000000) | 0
    if (carry > 0) this._length[j] -= 0x0100000000 * carry
  }

  return this
}

HashBase.prototype._update = function () {
  throw new Error('_update is not implemented')
}

HashBase.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called')
  this._finalized = true

  var digest = this._digest()
  if (encoding !== undefined) digest = digest.toString(encoding)

  // reset state
  this._block.fill(0)
  this._blockOffset = 0
  for (var i = 0; i < 4; ++i) this._length[i] = 0

  return digest
}

HashBase.prototype._digest = function () {
  throw new Error('_digest is not implemented')
}

module.exports = HashBase


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

var AuthCipher = __webpack_require__(262)
var Buffer = __webpack_require__(6).Buffer
var MODES = __webpack_require__(258)
var StreamCipher = __webpack_require__(267)
var Transform = __webpack_require__(47)
var aes = __webpack_require__(110)
var ebtk = __webpack_require__(268)
var inherits = __webpack_require__(7)

function Decipher (mode, key, iv) {
  Transform.call(this)

  this._cache = new Splitter()
  this._last = void 0
  this._cipher = new aes.AES(key)
  this._prev = Buffer.from(iv)
  this._mode = mode
  this._autopadding = true
}

inherits(Decipher, Transform)

Decipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []
  while ((chunk = this._cache.get(this._autopadding))) {
    thing = this._mode.decrypt(this, chunk)
    out.push(thing)
  }
  return Buffer.concat(out)
}

Decipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    return unpad(this._mode.decrypt(this, chunk))
  } else if (chunk) {
    throw new Error('data not multiple of block length')
  }
}

Decipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}

function Splitter () {
  this.cache = Buffer.allocUnsafe(0)
}

Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function (autoPadding) {
  var out
  if (autoPadding) {
    if (this.cache.length > 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  } else {
    if (this.cache.length >= 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  }

  return null
}

Splitter.prototype.flush = function () {
  if (this.cache.length) return this.cache
}

function unpad (last) {
  var padded = last[15]
  var i = -1
  while (++i < padded) {
    if (last[(i + (16 - padded))] !== padded) {
      throw new Error('unable to decrypt data')
    }
  }
  if (padded === 16) return

  return last.slice(0, 16 - padded)
}

function createDecipheriv (suite, password, iv) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  if (typeof iv === 'string') iv = Buffer.from(iv)
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (typeof password === 'string') password = Buffer.from(password)
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (config.type === 'stream') {
    return new StreamCipher(config.module, password, iv, true)
  } else if (config.type === 'auth') {
    return new AuthCipher(config.module, password, iv, true)
  }

  return new Decipher(config.module, password, iv)
}

function createDecipher (suite, password) {
  var config = MODES[suite.toLowerCase()]
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk(password, false, config.key, config.iv)
  return createDecipheriv(suite, keys.key, keys.iv)
}

exports.createDecipher = createDecipher
exports.createDecipheriv = createDecipheriv


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const protobuf = __webpack_require__(130)
const keysPBM = protobuf(__webpack_require__(138))

exports = module.exports

const supportedKeys = {
  rsa: __webpack_require__(395),
  ed25519: __webpack_require__(419),
  secp256k1: __webpack_require__(423)(keysPBM, __webpack_require__(285))
}

exports.supportedKeys = supportedKeys
exports.keysPBM = keysPBM

function isValidKeyType (keyType) {
  const key = supportedKeys[keyType.toLowerCase()]
  return key !== undefined
}

exports.keyStretcher = __webpack_require__(442)
exports.generateEphemeralKeyPair = __webpack_require__(443)

// Generates a keypair of the given type and bitsize
exports.generateKeyPair = (type, bits, cb) => {
  let key = supportedKeys[type.toLowerCase()]

  if (!key) {
    return cb(new Error('invalid or unsupported key type'))
  }

  key.generateKeyPair(bits, cb)
}

// Generates a keypair of the given type and bitsize
// seed is a 32 byte uint8array
exports.generateKeyPairFromSeed = (type, seed, bits, cb) => {
  let key = supportedKeys[type.toLowerCase()]
  if (!key) {
    return cb(new Error('invalid or unsupported key type'))
  }
  if (type.toLowerCase() !== 'ed25519') {
    return cb(new Error('Seed key derivation is unimplemented for RSA or secp256k1'))
  }
  key.generateKeyPairFromSeed(seed, bits, cb)
}

// Converts a protobuf serialized public key into its
// representative object
exports.unmarshalPublicKey = (buf) => {
  const decoded = keysPBM.PublicKey.decode(buf)
  const data = decoded.Data

  switch (decoded.Type) {
    case keysPBM.KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPublicKey(data)
    case keysPBM.KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PublicKey(data)
    case keysPBM.KeyType.Secp256k1:
      if (supportedKeys.secp256k1) {
        return supportedKeys.secp256k1.unmarshalSecp256k1PublicKey(data)
      } else {
        throw new Error('secp256k1 support requires libp2p-crypto-secp256k1 package')
      }
    default:
      throw new Error('invalid or unsupported key type')
  }
}

// Converts a public key object into a protobuf serialized public key
exports.marshalPublicKey = (key, type) => {
  type = (type || 'rsa').toLowerCase()
  if (!isValidKeyType(type)) {
    throw new Error('invalid or unsupported key type')
  }

  return key.bytes
}

// Converts a protobuf serialized private key into its
// representative object
exports.unmarshalPrivateKey = (buf, callback) => {
  const decoded = keysPBM.PrivateKey.decode(buf)
  const data = decoded.Data

  switch (decoded.Type) {
    case keysPBM.KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPrivateKey(data, callback)
    case keysPBM.KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PrivateKey(data, callback)
    case keysPBM.KeyType.Secp256k1:
      if (supportedKeys.secp256k1) {
        return supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey(data, callback)
      } else {
        return callback(new Error('secp256k1 support requires libp2p-crypto-secp256k1 package'))
      }
    default:
      callback(new Error('invalid or unsupported key type'))
  }
}

// Converts a private key object into a protobuf serialized private key
exports.marshalPrivateKey = (key, type) => {
  type = (type || 'rsa').toLowerCase()
  if (!isValidKeyType(type)) {
    throw new Error('invalid or unsupported key type')
  }

  return key.bytes
}


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(383)
var stringify = __webpack_require__(385)

module.exports = parse
module.exports.parse = parse
module.exports.stringify = stringify


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(384)
var MAX_RANGE = 0x1FFFFFFF

// "Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire types) can be declared "packed"."
// https://developers.google.com/protocol-buffers/docs/encoding#optional
var PACKABLE_TYPES = [
  // varint wire types
  'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'bool',
  // + ENUMS
  // 64-bit wire types
  'fixed64', 'sfixed64', 'double',
  // 32-bit wire types
  'fixed32', 'sfixed32', 'float'
]

var onfieldoptions = function (tokens) {
  var opts = {}

  while (tokens.length) {
    switch (tokens[0]) {
      case '[':
      case ',':
        tokens.shift()
        var name = tokens.shift()
        if (name === '(') {       // handling [(A) = B]
          name = tokens.shift()
          tokens.shift()          // remove the end of bracket
        }
        if (tokens[0] !== '=') throw new Error('Unexpected token in field options: ' + tokens[0])
        tokens.shift()
        if (tokens[0] === ']') throw new Error('Unexpected ] in field option')
        opts[name] = tokens.shift()
        break
      case ']':
        tokens.shift()
        return opts

      default:
        throw new Error('Unexpected token in field options: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for field options')
}

var onfield = function (tokens) {
  var field = {
    name: null,
    type: null,
    tag: -1,
    map: null,
    oneof: null,
    required: false,
    repeated: false,
    options: {}
  }

  while (tokens.length) {
    switch (tokens[0]) {
      case '=':
        tokens.shift()
        field.tag = Number(tokens.shift())
        break

      case 'map':
        field.type = 'map'
        field.map = {from: null, to: null}
        tokens.shift()
        if (tokens[0] !== '<') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift()
        field.map.from = tokens.shift()
        if (tokens[0] !== ',') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift()
        field.map.to = tokens.shift()
        if (tokens[0] !== '>') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift()
        field.name = tokens.shift()
        break

      case 'repeated':
      case 'required':
      case 'optional':
        var t = tokens.shift()
        field.required = t === 'required'
        field.repeated = t === 'repeated'
        field.type = tokens.shift()
        field.name = tokens.shift()
        break

      case '[':
        field.options = onfieldoptions(tokens)
        break

      case ';':
        if (field.name === null) throw new Error('Missing field name')
        if (field.type === null) throw new Error('Missing type in message field: ' + field.name)
        if (field.tag === -1) throw new Error('Missing tag number in message field: ' + field.name)
        tokens.shift()
        return field

      default:
        throw new Error('Unexpected token in message field: ' + tokens[0])
    }
  }

  throw new Error('No ; found for message field')
}

var onmessagebody = function (tokens) {
  var body = {
    enums: [],
    messages: [],
    fields: [],
    extends: [],
    extensions: null
  }

  while (tokens.length) {
    switch (tokens[0]) {
      case 'map':
      case 'repeated':
      case 'optional':
      case 'required':
        body.fields.push(onfield(tokens))
        break

      case 'enum':
        body.enums.push(onenum(tokens))
        break

      case 'message':
        body.messages.push(onmessage(tokens))
        break

      case 'extensions':
        body.extensions = onextensions(tokens)
        break

      case 'oneof':
        tokens.shift()
        var name = tokens.shift()
        if (tokens[0] !== '{') throw new Error('Unexpected token in oneof: ' + tokens[0])
        tokens.shift()
        while (tokens[0] !== '}') {
          tokens.unshift('optional')
          var field = onfield(tokens)
          field.oneof = name
          body.fields.push(field)
        }
        tokens.shift()
        break

      case 'extend':
        body.extends.push(onextend(tokens))
        break

      case ';':
        tokens.shift()
        break

      case 'reserved':
      case 'option':
        tokens.shift()
        while (tokens[0] !== ';') {
          tokens.shift()
        }
        break

      default:
        // proto3 does not require the use of optional/required, assumed as optional
        // "singular: a well-formed message can have zero or one of this field (but not more than one)."
        // https://developers.google.com/protocol-buffers/docs/proto3#specifying-field-rules
        tokens.unshift('optional')
        body.fields.push(onfield(tokens))
    }
  }

  return body
}

var onextend = function (tokens) {
  var out = {
    name: tokens[1],
    message: onmessage(tokens)
  }
  return out
}

var onextensions = function (tokens) {
  tokens.shift()
  var from = Number(tokens.shift())
  if (isNaN(from)) throw new Error('Invalid from in extensions definition')
  if (tokens.shift() !== 'to') throw new Error("Expected keyword 'to' in extensions definition")
  var to = tokens.shift()
  if (to === 'max') to = MAX_RANGE
  to = Number(to)
  if (isNaN(to)) throw new Error('Invalid to in extensions definition')
  if (tokens.shift() !== ';') throw new Error('Missing ; in extensions definition')
  return {from: from, to: to}
}
var onmessage = function (tokens) {
  tokens.shift()

  var lvl = 1
  var body = []
  var msg = {
    name: tokens.shift(),
    enums: [],
    extends: [],
    messages: [],
    fields: []
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '{') lvl++
    else if (tokens[0] === '}') lvl--

    if (!lvl) {
      tokens.shift()
      body = onmessagebody(body)
      msg.enums = body.enums
      msg.messages = body.messages
      msg.fields = body.fields
      msg.extends = body.extends
      msg.extensions = body.extensions
      return msg
    }

    body.push(tokens.shift())
  }

  if (lvl) throw new Error('No closing tag for message')
}

var onpackagename = function (tokens) {
  tokens.shift()
  var name = tokens.shift()
  if (tokens[0] !== ';') throw new Error('Expected ; but found ' + tokens[0])
  tokens.shift()
  return name
}

var onsyntaxversion = function (tokens) {
  tokens.shift()

  if (tokens[0] !== '=') throw new Error('Expected = but found ' + tokens[0])
  tokens.shift()

  var version = tokens.shift()
  switch (version) {
    case '"proto2"':
      version = 2
      break

    case '"proto3"':
      version = 3
      break

    default:
      throw new Error('Expected protobuf syntax version but found ' + version)
  }

  if (tokens[0] !== ';') throw new Error('Expected ; but found ' + tokens[0])
  tokens.shift()

  return version
}

var onenumvalue = function (tokens) {
  if (tokens.length < 4) throw new Error('Invalid enum value: ' + tokens.slice(0, 3).join(' '))
  if (tokens[1] !== '=') throw new Error('Expected = but found ' + tokens[1])
  if (tokens[3] !== ';' && tokens[3] !== '[') throw new Error('Expected ; or [ but found ' + tokens[1])

  var name = tokens.shift()
  tokens.shift()
  var val = {
    value: null,
    options: {}
  }
  val.value = Number(tokens.shift())
  if (tokens[0] === '[') {
    val.options = onfieldoptions(tokens)
  }
  tokens.shift() // expecting the semicolon here

  return {
    name: name,
    val: val
  }
}

var onenum = function (tokens) {
  tokens.shift()
  var options = {}
  var e = {
    name: tokens.shift(),
    values: {},
    options: {}
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift()
      return e
    }
    if (tokens[0] === 'option') {
      options = onoption(tokens)
      e.options[options.name] = options.value
      continue
    }
    var val = onenumvalue(tokens)
    e.values[val.name] = val.val
  }

  throw new Error('No closing tag for enum')
}

var onoption = function (tokens) {
  var name = null
  var value = null

  var parse = function (value) {
    if (value === 'true') return true
    if (value === 'false') return false
    return value.replace(/^"+|"+$/gm, '')
  }

  while (tokens.length) {
    if (tokens[0] === ';') {
      tokens.shift()
      return {name: name, value: value}
    }
    switch (tokens[0]) {
      case 'option':
        tokens.shift()

        var hasBracket = tokens[0] === '('
        if (hasBracket) tokens.shift()

        name = tokens.shift()

        if (hasBracket) {
          if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
          tokens.shift()
        }

        if (tokens[0][0] === '.') {
          name += tokens.shift()
        }

        break

      case '=':
        tokens.shift()
        if (name === null) throw new Error('Expected key for option with value: ' + tokens[0])
        value = parse(tokens.shift())

        if (name === 'optimize_for' && !/^(SPEED|CODE_SIZE|LITE_RUNTIME)$/.test(value)) {
          throw new Error('Unexpected value for option optimize_for: ' + value)
        } else if (value === '{') {
          // option foo = {bar: baz}
          value = onoptionMap(tokens)
        }
        break

      default:
        throw new Error('Unexpected token in option: ' + tokens[0])
    }
  }
}

var onoptionMap = function (tokens) {
  var parse = function (value) {
    if (value === 'true') return true
    if (value === 'false') return false
    return value.replace(/^"+|"+$/gm, '')
  }

  var map = {}

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      return map
    }

    var hasBracket = tokens[0] === '('
    if (hasBracket) tokens.shift()

    var key = tokens.shift()
    if (hasBracket) {
      if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
      tokens.shift()
    }

    var value = null

    switch (tokens[0]) {
      case ':':
        if (map[key] !== undefined) throw new Error('Duplicate option map key ' + key)

        tokens.shift()

        value = parse(tokens.shift())

        if (value === '{') {
          // option foo = {bar: baz}
          value = onoptionMap(tokens)
        }

        map[key] = value

        if (tokens[0] === ';') {
          tokens.shift()
        }
        break

      case '{':
        tokens.shift()
        value = onoptionMap(tokens)

        if (map[key] === undefined) map[key] = []
        if (!Array.isArray(map[key])) throw new Error('Duplicate option map key ' + key)

        map[key].push(value)
        break

      default:
        throw new Error('Unexpected token in option map: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for option map')
}

var onimport = function (tokens) {
  tokens.shift()
  var file = tokens.shift().replace(/^"+|"+$/gm, '')

  if (tokens[0] !== ';') throw new Error('Unexpected token: ' + tokens[0] + '. Expected ";"')

  tokens.shift()
  return file
}

var onservice = function (tokens) {
  tokens.shift()

  var service = {
    name: tokens.shift(),
    methods: [],
    options: {}
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift()
      return service
    }

    switch (tokens[0]) {
      case 'option':
        var opt = onoption(tokens)
        if (service.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
        service.options[opt.name] = opt.value
        break
      case 'rpc':
        service.methods.push(onrpc(tokens))
        break
      default:
        throw new Error('Unexpected token in service: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for service')
}

var onrpc = function (tokens) {
  tokens.shift()

  var rpc = {
    name: tokens.shift(),
    input_type: null,
    output_type: null,
    client_streaming: false,
    server_streaming: false,
    options: {}
  }

  if (tokens[0] !== '(') throw new Error('Expected ( but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] === 'stream') {
    tokens.shift()
    rpc.client_streaming = true
  }

  rpc.input_type = tokens.shift()

  if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] !== 'returns') throw new Error('Expected returns but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] !== '(') throw new Error('Expected ( but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] === 'stream') {
    tokens.shift()
    rpc.server_streaming = true
  }

  rpc.output_type = tokens.shift()

  if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
  tokens.shift()

  if (tokens[0] === ';') {
    tokens.shift()
    return rpc
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift()

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift()
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift()
      return rpc
    }

    if (tokens[0] === 'option') {
      var opt = onoption(tokens)
      if (rpc.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
      rpc.options[opt.name] = opt.value
    } else {
      throw new Error('Unexpected token in rpc options: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for rpc')
}

var parse = function (buf) {
  var tokens = tokenize(buf.toString())
  // check for isolated strings in tokens by looking for opening quote
  for (var i = 0; i < tokens.length; i++) {
    if (/^("|')([^'"]*)$/.test(tokens[i])) {
      var j
      if (tokens[i].length === 1) {
        j = i + 1
      } else {
        j = i
      }
      // look ahead for the closing quote and collapse all
      // in-between tokens into a single token
      for (j; j < tokens.length; j++) {
        if (/^([^'"]*)("|')$/.test(tokens[j])) {
          tokens = tokens.slice(0, i).concat(tokens.slice(i, j + 1).join('')).concat(tokens.slice(j + 1))
          break
        }
      }
    }
  }
  var schema = {
    syntax: 3,
    package: null,
    imports: [],
    enums: [],
    messages: [],
    options: {},
    extends: []
  }

  var firstline = true

  while (tokens.length) {
    switch (tokens[0]) {
      case 'package':
        schema.package = onpackagename(tokens)
        break

      case 'syntax':
        if (!firstline) throw new Error('Protobuf syntax version should be first thing in file')
        schema.syntax = onsyntaxversion(tokens)
        break

      case 'message':
        schema.messages.push(onmessage(tokens))
        break

      case 'enum':
        schema.enums.push(onenum(tokens))
        break

      case 'option':
        var opt = onoption(tokens)
        if (schema.options[opt.name]) throw new Error('Duplicate option ' + opt.name)
        schema.options[opt.name] = opt.value
        break

      case 'import':
        schema.imports.push(onimport(tokens))
        break

      case 'extend':
        schema.extends.push(onextend(tokens))
        break

      case 'service':
        if (!schema.services) schema.services = []
        schema.services.push(onservice(tokens))
        break

      default:
        throw new Error('Unexpected token: ' + tokens[0])
    }
    firstline = false
  }

  // now iterate over messages and propagate extends
  schema.extends.forEach(function (ext) {
    schema.messages.forEach(function (msg) {
      if (msg.name === ext.name) {
        ext.message.fields.forEach(function (field) {
          if (!msg.extensions || field.tag < msg.extensions.from || field.tag > msg.extensions.to) {
            throw new Error(msg.name + ' does not declare ' + field.tag + ' as an extension number')
          }
          msg.fields.push(field)
        })
      }
    })
  })

  schema.messages.forEach(function (msg) {
    msg.fields.forEach(function (field) {
      var fieldSplit
      var messageName
      var nestedEnumName
      var message

      function enumNameIsFieldType (en) {
        return en.name === field.type
      }

      function enumNameIsNestedEnumName (en) {
        return en.name === nestedEnumName
      }

      if (field.options && field.options.packed === 'true') {
        if (PACKABLE_TYPES.indexOf(field.type) === -1) {
          // let's see if it's an enum
          if (field.type.indexOf('.') === -1) {
            if (msg.enums && msg.enums.some(enumNameIsFieldType)) {
              return
            }
          } else {
            fieldSplit = field.type.split('.')
            if (fieldSplit.length > 2) {
              throw new Error('what is this?')
            }

            messageName = fieldSplit[0]
            nestedEnumName = fieldSplit[1]

            schema.messages.some(function (msg) {
              if (msg.name === messageName) {
                message = msg
                return msg
              }
            })

            if (message && message.enums && message.enums.some(enumNameIsNestedEnumName)) {
              return
            }
          }

          throw new Error(
            'Fields of type ' + field.type + ' cannot be declared [packed=true]. ' +
            'Only repeated fields of primitive numeric types (types which use ' +
            'the varint, 32-bit, or 64-bit wire types) can be declared "packed". ' +
            'See https://developers.google.com/protocol-buffers/docs/encoding#optional'
          )
        }
      }
    })
  })

  return schema
}

module.exports = parse


/***/ }),
/* 384 */
/***/ (function(module, exports) {

module.exports = function (sch) {
  var noComments = function (line) {
    var i = line.indexOf('//')
    return i > -1 ? line.slice(0, i) : line
  }

  var noMultilineComments = function () {
    var inside = false
    return function (token) {
      if (token === '/*') {
        inside = true
        return false
      }
      if (token === '*/') {
        inside = false
        return false
      }
      return !inside
    }
  }

  var trim = function (line) {
    return line.trim()
  }

  return sch
    .replace(/([;,{}()=:[\]<>]|\/\*|\*\/)/g, ' $1 ')
    .split(/\n/)
    .map(trim)
    .filter(Boolean)
    .map(noComments)
    .map(trim)
    .filter(Boolean)
    .join('\n')
    .split(/\s+|\n+/gm)
    .filter(noMultilineComments())
}


/***/ }),
/* 385 */
/***/ (function(module, exports) {

var onfield = function (f, result) {
  var prefix = f.repeated ? 'repeated' : f.required ? 'required' : 'optional'
  if (f.type === 'map') prefix = 'map<' + f.map.from + ',' + f.map.to + '>'
  if (f.oneof) prefix = ''

  var opts = Object.keys(f.options || {}).map(function (key) {
    return key + ' = ' + f.options[key]
  }).join(',')

  if (opts) opts = ' [' + opts + ']'

  result.push((prefix ? prefix + ' ' : '') + (f.map === 'map' ? '' : f.type + ' ') + f.name + ' = ' + f.tag + opts + ';')
  return result
}

var onmessage = function (m, result) {
  result.push('message ' + m.name + ' {')

  if (!m.enums) m.enums = []
  m.enums.forEach(function (e) {
    result.push(onenum(e, []))
  })

  if (!m.messages) m.messages = []
  m.messages.forEach(function (m) {
    result.push(onmessage(m, []))
  })

  var oneofs = {}

  if (!m.fields) m.fields = []
  m.fields.forEach(function (f) {
    if (f.oneof) {
      if (!oneofs[f.oneof]) oneofs[f.oneof] = []
      oneofs[f.oneof].push(onfield(f, []))
    } else {
      result.push(onfield(f, []))
    }
  })

  Object.keys(oneofs).forEach(function (n) {
    oneofs[n].unshift('oneof ' + n + ' {')
    oneofs[n].push('}')
    result.push(oneofs[n])
  })

  result.push('}', '')
  return result
}

var onenum = function (e, result) {
  result.push('enum ' + e.name + ' {')
  if (!e.options) e.options = {}
  var options = onoption(e.options, [])
  if (options.length > 1) {
    result.push(options.slice(0, -1))
  }
  Object.keys(e.values).map(function (v) {
    var val = onenumvalue(e.values[v])
    result.push([v + ' = ' + val + ';'])
  })
  result.push('}', '')
  return result
}

var onenumvalue = function (v, result) {
  var opts = Object.keys(v.options || {}).map(function (key) {
    return key + ' = ' + v.options[key]
  }).join(',')

  if (opts) opts = ' [' + opts + ']'
  var val = v.value + opts
  return val
}

var onoption = function (o, result) {
  var keys = Object.keys(o)
  keys.forEach(function (option) {
    var v = o[option]
    if (~option.indexOf('.')) option = '(' + option + ')'

    var type = typeof v

    if (type === 'object') {
      v = onoptionMap(v, [])
      if (v.length) result.push('option ' + option + ' = {', v, '};')
    } else {
      if (type === 'string' && option !== 'optimize_for') v = '"' + v + '"'
      result.push('option ' + option + ' = ' + v + ';')
    }
  })
  if (keys.length > 0) {
    result.push('')
  }

  return result
}

var onoptionMap = function (o, result) {
  var keys = Object.keys(o)
  keys.forEach(function (k) {
    var v = o[k]

    var type = typeof v

    if (type === 'object') {
      if (Array.isArray(v)) {
        v.forEach(function (v) {
          v = onoptionMap(v, [])
          if (v.length) result.push(k + ' {', v, '}')
        })
      } else {
        v = onoptionMap(v, [])
        if (v.length) result.push(k + ' {', v, '}')
      }
    } else {
      if (type === 'string') v = '"' + v + '"'
      result.push(k + ': ' + v)
    }
  })

  return result
}

var onservices = function (s, result) {
  result.push('service ' + s.name + ' {')

  if (!s.options) s.options = {}
  onoption(s.options, result)
  if (!s.methods) s.methods = []
  s.methods.forEach(function (m) {
    result.push(onrpc(m, []))
  })

  result.push('}', '')
  return result
}

var onrpc = function (rpc, result) {
  var def = 'rpc ' + rpc.name + '('
  if (rpc.client_streaming) def += 'stream '
  def += rpc.input_type + ') returns ('
  if (rpc.server_streaming) def += 'stream '
  def += rpc.output_type + ')'

  if (!rpc.options) rpc.options = {}

  var options = onoption(rpc.options, [])
  if (options.length > 1) {
    result.push(def + ' {', options.slice(0, -1), '}')
  } else {
    result.push(def + ';')
  }

  return result
}

var indent = function (lvl) {
  return function (line) {
    if (Array.isArray(line)) return line.map(indent(lvl + '  ')).join('\n')
    return lvl + line
  }
}

module.exports = function (schema) {
  var result = []

  result.push('syntax = "proto' + schema.syntax + '";', '')

  if (schema.package) result.push('package ' + schema.package + ';', '')

  if (!schema.options) schema.options = {}

  onoption(schema.options, result)

  if (!schema.enums) schema.enums = []
  schema.enums.forEach(function (e) {
    onenum(e, result)
  })

  if (!schema.messages) schema.messages = []
  schema.messages.forEach(function (m) {
    onmessage(m, result)
  })

  if (schema.services) {
    schema.services.forEach(function (s) {
      onservices(s, result)
    })
  }
  return result.map(indent('')).join('\n')
}


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encodings = __webpack_require__(387)
var compileDecode = __webpack_require__(392)
var compileEncode = __webpack_require__(393)
var compileEncodingLength = __webpack_require__(394)
var varint = __webpack_require__(46)

var flatten = function (values) {
  if (!values) return null
  var result = {}
  Object.keys(values).forEach(function (k) {
    result[k] = values[k].value
  })
  return result
}

module.exports = function (schema, extraEncodings) {
  var messages = {}
  var enums = {}
  var cache = {}

  var visit = function (schema, prefix) {
    if (schema.enums) {
      schema.enums.forEach(function (e) {
        e.id = prefix + (prefix ? '.' : '') + e.name
        enums[e.id] = e
        visit(e, e.id)
      })
    }
    if (schema.messages) {
      schema.messages.forEach(function (m) {
        m.id = prefix + (prefix ? '.' : '') + m.name
        messages[m.id] = m
        m.fields.forEach(function (f) {
          if (!f.map) return

          var name = 'Map_' + f.map.from + '_' + f.map.to
          var map = {
            name: name,
            enums: [],
            messages: [],
            fields: [{
              name: 'key',
              type: f.map.from,
              tag: 1,
              repeated: false,
              required: true
            }, {
              name: 'value',
              type: f.map.to,
              tag: 2,
              repeated: false,
              required: false
            }],
            extensions: null,
            id: prefix + (prefix ? '.' : '') + name
          }

          if (!messages[map.id]) {
            messages[map.id] = map
            schema.messages.push(map)
          }
          f.type = name
          f.repeated = true
        })
        visit(m, m.id)
      })
    }
  }

  visit(schema, '')

  var compileEnum = function (e) {
    var values = Object.keys(e.values || []).map(function (k) {
      return parseInt(e.values[k].value, 10)
    })

    var encode = function encode (val, buf, offset) {
      if (!values.length || values.indexOf(val) === -1) {
        throw new Error('Invalid enum value: ' + val)
      }
      varint.encode(val, buf, offset)
      encode.bytes = varint.encode.bytes
      return buf
    }

    var decode = function decode (buf, offset) {
      var val = varint.decode(buf, offset)
      if (!values.length || values.indexOf(val) === -1) {
        throw new Error('Invalid enum value: ' + val)
      }
      decode.bytes = varint.decode.bytes
      return val
    }

    return encodings.make(0, encode, decode, varint.encodingLength)
  }

  var compileMessage = function (m, exports) {
    m.messages.forEach(function (nested) {
      exports[nested.name] = resolve(nested.name, m.id)
    })

    m.enums.forEach(function (val) {
      exports[val.name] = flatten(val.values)
    })

    exports.type = 2
    exports.message = true
    exports.name = m.name

    var oneofs = {}

    m.fields.forEach(function (f) {
      if (!f.oneof) return
      if (!oneofs[f.oneof]) oneofs[f.oneof] = []
      oneofs[f.oneof].push(f.name)
    })

    var enc = m.fields.map(function (f) {
      return resolve(f.type, m.id)
    })

    var encodingLength = compileEncodingLength(m, enc, oneofs)
    var encode = compileEncode(m, resolve, enc, oneofs, encodingLength)
    var decode = compileDecode(m, resolve, enc)

    // end of compilation - return all the things

    encode.bytes = decode.bytes = 0

    exports.buffer = true
    exports.encode = encode
    exports.decode = decode
    exports.encodingLength = encodingLength

    return exports
  }

  var resolve = function (name, from, compile) {
    if (extraEncodings && extraEncodings[name]) return extraEncodings[name]
    if (encodings[name]) return encodings[name]

    var m = (from ? from + '.' + name : name).split('.')
      .map(function (part, i, list) {
        return list.slice(0, i).concat(name).join('.')
      })
      .reverse()
      .reduce(function (result, id) {
        return result || messages[id] || enums[id]
      }, null)

    if (compile === false) return m
    if (!m) throw new Error('Could not resolve ' + name)

    if (m.values) return compileEnum(m)
    var res = cache[m.id] || compileMessage(m, cache[m.id] = {})
    return res
  }

  return (schema.enums || []).concat((schema.messages || []).map(function (message) {
    return resolve(message.id)
  }))
}


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var varint = __webpack_require__(46)
var svarint = __webpack_require__(391)
var Buffer = __webpack_require__(6).Buffer

var encoder = function (type, encode, decode, encodingLength) {
  encode.bytes = decode.bytes = 0

  return {
    type: type,
    encode: encode,
    decode: decode,
    encodingLength: encodingLength
  }
}

exports.make = encoder

exports.bytes = (function (tag) {
  var bufferLength = function (val) {
    return Buffer.isBuffer(val) ? val.length : Buffer.byteLength(val)
  }

  var encodingLength = function (val) {
    var len = bufferLength(val)
    return varint.encodingLength(len) + len
  }

  var encode = function (val, buffer, offset) {
    var oldOffset = offset
    var len = bufferLength(val)

    varint.encode(len, buffer, offset)
    offset += varint.encode.bytes

    if (Buffer.isBuffer(val)) val.copy(buffer, offset)
    else buffer.write(val, offset, len)
    offset += len

    encode.bytes = offset - oldOffset
    return buffer
  }

  var decode = function (buffer, offset) {
    var oldOffset = offset

    var len = varint.decode(buffer, offset)
    offset += varint.decode.bytes

    var val = buffer.slice(offset, offset + len)
    offset += val.length

    decode.bytes = offset - oldOffset
    return val
  }

  return encoder(2, encode, decode, encodingLength)
})()

exports.string = (function () {
  var encodingLength = function (val) {
    var len = Buffer.byteLength(val)
    return varint.encodingLength(len) + len
  }

  var encode = function (val, buffer, offset) {
    var oldOffset = offset
    var len = Buffer.byteLength(val)

    varint.encode(len, buffer, offset, 'utf-8')
    offset += varint.encode.bytes

    buffer.write(val, offset, len)
    offset += len

    encode.bytes = offset - oldOffset
    return buffer
  }

  var decode = function (buffer, offset) {
    var oldOffset = offset

    var len = varint.decode(buffer, offset)
    offset += varint.decode.bytes

    var val = buffer.toString('utf-8', offset, offset + len)
    offset += len

    decode.bytes = offset - oldOffset
    return val
  }

  return encoder(2, encode, decode, encodingLength)
})()

exports.bool = (function () {
  var encodingLength = function (val) {
    return 1
  }

  var encode = function (val, buffer, offset) {
    buffer[offset] = val ? 1 : 0
    encode.bytes = 1
    return buffer
  }

  var decode = function (buffer, offset) {
    var bool = buffer[offset] > 0
    decode.bytes = 1
    return bool
  }

  return encoder(0, encode, decode, encodingLength)
})()

exports.int32 = (function () {
  var decode = function (buffer, offset) {
    var val = varint.decode(buffer, offset)
    decode.bytes = varint.decode.bytes
    return val > 2147483647 ? val - 4294967296 : val
  }

  var encode = function (val, buffer, offset) {
    varint.encode(val < 0 ? val + 4294967296 : val, buffer, offset)
    encode.bytes = varint.encode.bytes
    return buffer
  }

  var encodingLength = function (val) {
    return varint.encodingLength(val < 0 ? val + 4294967296 : val)
  }

  return encoder(0, varint.encode, decode, encodingLength)
})()

exports.int64 = (function () {
  var decode = function (buffer, offset) {
    var val = varint.decode(buffer, offset)
    if (val >= Math.pow(2, 63)) {
      var limit = 9
      while (buffer[offset + limit - 1] === 0xff) limit--
      limit = limit || 9
      var subset = Buffer.allocUnsafe(limit)
      buffer.copy(subset, 0, offset, offset + limit)
      subset[limit - 1] = subset[limit - 1] & 0x7f
      val = -1 * varint.decode(subset, 0)
      decode.bytes = 10
    } else {
      decode.bytes = varint.decode.bytes
    }
    return val
  }

  var encode = function (val, buffer, offset) {
    if (val < 0) {
      var last = offset + 9
      varint.encode(val * -1, buffer, offset)
      offset += varint.encode.bytes - 1
      buffer[offset] = buffer[offset] | 0x80
      while (offset < last - 1) {
        offset++
        buffer[offset] = 0xff
      }
      buffer[last] = 0x01
      encode.bytes = 10
    } else {
      varint.encode(val, buffer, offset)
      encode.bytes = varint.encode.bytes
    }
    return buffer
  }

  var encodingLength = function (val) {
    return val < 0 ? 10 : varint.encodingLength(val)
  }

  return encoder(0, encode, decode, encodingLength)
})()

exports.sint32 =
exports.sint64 = (function () {
  return encoder(0, svarint.encode, svarint.decode, svarint.encodingLength)
})()

exports.uint32 =
exports.uint64 =
exports.enum =
exports.varint = (function () {
  return encoder(0, varint.encode, varint.decode, varint.encodingLength)
})()

// we cannot represent these in javascript so we just use buffers
exports.fixed64 =
exports.sfixed64 = (function () {
  var encodingLength = function (val) {
    return 8
  }

  var encode = function (val, buffer, offset) {
    val.copy(buffer, offset)
    encode.bytes = 8
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.slice(offset, offset + 8)
    decode.bytes = 8
    return val
  }

  return encoder(1, encode, decode, encodingLength)
})()

exports.double = (function () {
  var encodingLength = function (val) {
    return 8
  }

  var encode = function (val, buffer, offset) {
    buffer.writeDoubleLE(val, offset)
    encode.bytes = 8
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readDoubleLE(offset)
    decode.bytes = 8
    return val
  }

  return encoder(1, encode, decode, encodingLength)
})()

exports.fixed32 = (function () {
  var encodingLength = function (val) {
    return 4
  }

  var encode = function (val, buffer, offset) {
    buffer.writeUInt32LE(val, offset)
    encode.bytes = 4
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readUInt32LE(offset)
    decode.bytes = 4
    return val
  }

  return encoder(5, encode, decode, encodingLength)
})()

exports.sfixed32 = (function () {
  var encodingLength = function (val) {
    return 4
  }

  var encode = function (val, buffer, offset) {
    buffer.writeInt32LE(val, offset)
    encode.bytes = 4
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readInt32LE(offset)
    decode.bytes = 4
    return val
  }

  return encoder(5, encode, decode, encodingLength)
})()

exports.float = (function () {
  var encodingLength = function (val) {
    return 4
  }

  var encode = function (val, buffer, offset) {
    buffer.writeFloatLE(val, offset)
    encode.bytes = 4
    return buffer
  }

  var decode = function (buffer, offset) {
    var val = buffer.readFloatLE(offset)
    decode.bytes = 4
    return val
  }

  return encoder(5, encode, decode, encodingLength)
})()


/***/ }),
/* 388 */
/***/ (function(module, exports) {

module.exports = encode

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function encode(num, out, offset) {
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}


/***/ }),
/* 389 */
/***/ (function(module, exports) {

module.exports = read

var MSB = 0x80
  , REST = 0x7F

function read(buf, offset) {
  var res    = 0
    , offset = offset || 0
    , shift  = 0
    , counter = offset
    , b
    , l = buf.length

  do {
    if (counter >= l) {
      read.bytes = 0
      throw new RangeError('Could not decode varint')
    }
    b = buf[counter++]
    res += shift < 28
      ? (b & REST) << shift
      : (b & REST) * Math.pow(2, shift)
    shift += 7
  } while (b >= MSB)

  read.bytes = counter - offset

  return res
}


/***/ }),
/* 390 */
/***/ (function(module, exports) {


var N1 = Math.pow(2,  7)
var N2 = Math.pow(2, 14)
var N3 = Math.pow(2, 21)
var N4 = Math.pow(2, 28)
var N5 = Math.pow(2, 35)
var N6 = Math.pow(2, 42)
var N7 = Math.pow(2, 49)
var N8 = Math.pow(2, 56)
var N9 = Math.pow(2, 63)

module.exports = function (value) {
  return (
    value < N1 ? 1
  : value < N2 ? 2
  : value < N3 ? 3
  : value < N4 ? 4
  : value < N5 ? 5
  : value < N6 ? 6
  : value < N7 ? 7
  : value < N8 ? 8
  : value < N9 ? 9
  :              10
  )
}


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

var varint = __webpack_require__(46)
exports.encode = function encode (v, b, o) {
  v = v >= 0 ? v*2 : v*-2 - 1
  var r = varint.encode(v, b, o)
  encode.bytes = varint.encode.bytes
  return r
}
exports.decode = function decode (b, o) {
  var v = varint.decode(b, o)
  decode.bytes = varint.decode.bytes
  return v & 1 ? (v+1) / -2 : v / 2
}

exports.encodingLength = function (v) {
  return varint.encodingLength(v >= 0 ? v*2 : v*-2 - 1)
}


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint max-depth: 1 */


var varint = __webpack_require__(46)
var defined = __webpack_require__(137).defined

function compileDecode (m, resolve, enc) {
  var requiredFields = []
  var fields = {}
  var oneofFields = []
  var vals = []

  for (var i = 0; i < enc.length; i++) {
    var field = m.fields[i]

    fields[field.tag] = i

    var def = field.options && field.options.default
    var resolved = resolve(field.type, m.id, false)
    vals[i] = [def, resolved && resolved.values]

    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false'

    if (field.required) {
      requiredFields.push(field.name)
    }

    if (field.oneof) {
      oneofFields.push(field.name)
    }
  }

  function decodeField (e, field, obj, buf, offset, i) {
    var name = field.name

    if (field.oneof) {
      // clear already defined oneof fields
      var props = Object.keys(obj)
      for (var j = 0; j < props.length; j++) {
        if (oneofFields.indexOf(props[j]) > -1) {
          delete obj[props[j]]
        }
      }
    }

    if (e.message) {
      var len = varint.decode(buf, offset)
      offset += varint.decode.bytes

      var decoded = e.decode(buf, offset, offset + len)

      if (field.map) {
        obj[name] = obj[name] || {}
        obj[name][decoded.key] = decoded.value
      } else if (field.repeated) {
        obj[name] = obj[name] || []
        obj[name].push(decoded)
      } else {
        obj[name] = decoded
      }
    } else {
      if (field.repeated) {
        obj[name] = obj[name] || []
        obj[name].push(e.decode(buf, offset))
      } else {
        obj[name] = e.decode(buf, offset)
      }
    }

    offset += e.decode.bytes
    return offset
  }

  return function decode (buf, offset, end) {
    if (offset == null) {
      offset = 0
    }

    if (end == null) {
      end = buf.length
    }

    if (!(end <= buf.length && offset <= buf.length)) {
      throw new Error('Decoded message is not valid')
    }

    var oldOffset = offset
    var obj = {}
    var field

    while (true) {
      if (end <= offset) {
        // finished

        // check required methods
        var name = ''
        var j = 0
        for (j = 0; j < requiredFields.length; j++) {
          name = requiredFields[j]
          if (!defined(obj[name])) {
            throw new Error('Decoded message is not valid, missing required field: ' + name)
          }
        }

        // fill out missing defaults
        var val
        var def
        for (j = 0; j < enc.length; j++) {
          field = m.fields[j]
          def = vals[j][0]
          val = vals[j][1]
          name = field.name

          if (defined(obj[name])) {
            continue
          }

          var done = false
          if (field.oneof) {
            var props = Object.keys(obj)
            for (var k = 0; k < props.length; k++) {
              if (oneofFields.indexOf(props[k]) > -1) {
                done = true
                break
              }
            }
          }

          if (done) {
            continue
          }

          if (val) { // is enum
            if (field.repeated) {
              obj[name] = []
            } else {
              def = (def && val[def]) ? val[def].value : val[Object.keys(val)[0]].value
              obj[name] = parseInt(def || 0, 10)
            }
          } else {
            obj[name] = defaultValue(field, def)
          }
        }

        decode.bytes = offset - oldOffset
        return obj
      }

      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3

      var i = fields[tag]

      if (i == null) {
        offset = skip(prefix & 7, buf, offset)
        continue
      }

      var e = enc[i]
      field = m.fields[i]

      if (field.packed) {
        var packedEnd = varint.decode(buf, offset)
        offset += varint.decode.bytes
        packedEnd += offset

        while (offset < packedEnd) {
          offset = decodeField(e, field, obj, buf, offset, i)
        }
      } else {
        offset = decodeField(e, field, obj, buf, offset, i)
      }
    }
  }
}

var skip = function (type, buffer, offset) {
  switch (type) {
    case 0:
      varint.decode(buffer, offset)
      return offset + varint.decode.bytes

    case 1:
      return offset + 8

    case 2:
      var len = varint.decode(buffer, offset)
      return offset + varint.decode.bytes + len

    case 3:
    case 4:
      throw new Error('Groups are not supported')

    case 5:
      return offset + 4
    default:
      throw new Error('Unknown wire type: ' + type)
  }
}

var defaultValue = function (f, def) {
  if (f.map) return {}
  if (f.repeated) return []

  switch (f.type) {
    case 'string':
      return def != null ? def : ''

    case 'bool':
      return def === 'true'

    case 'float':
    case 'double':
    case 'sfixed32':
    case 'fixed32':
    case 'varint':
    case 'enum':
    case 'uint64':
    case 'uint32':
    case 'int64':
    case 'int32':
    case 'sint64':
    case 'sint32':
      return parseInt(def || 0, 10)

    default:
      return null
  }
}

module.exports = compileDecode


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var defined = __webpack_require__(137).defined
var varint = __webpack_require__(46)

function compileEncode (m, resolve, enc, oneofs, encodingLength) {
  var oneofsKeys = Object.keys(oneofs)
  var encLength = enc.length
  var ints = {}
  for (var i = 0; i < encLength; i++) {
    ints[i] = {
      p: varint.encode(m.fields[i].tag << 3 | 2),
      h: varint.encode(m.fields[i].tag << 3 | enc[i].type)
    }

    var field = m.fields[i]
    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false'
  }

  function encodeField (buf, offset, h, e, packed, innerVal) {
    var j = 0
    if (!packed) {
      for (j = 0; j < h.length; j++) {
        buf[offset++] = h[j]
      }
    }

    if (e.message) {
      varint.encode(e.encodingLength(innerVal), buf, offset)
      offset += varint.encode.bytes
    }

    e.encode(innerVal, buf, offset)
    return offset + e.encode.bytes
  }

  return function encode (obj, buf, offset) {
    if (offset == null) {
      offset = 0
    }
    if (buf == null) {
      buf = Buffer.allocUnsafe(encodingLength(obj))
    }

    var oldOffset = offset
    var objKeys = Object.keys(obj)
    var i = 0

    // oneof checks

    var match = false
    for (i = 0; i < oneofsKeys.length; i++) {
      var name = oneofsKeys[i]
      var prop = oneofs[i]
      if (objKeys.indexOf(prop) > -1) {
        if (match) {
          throw new Error('only one of the properties defined in oneof ' + name + ' can be set')
        }

        match = true
      }
    }

    for (i = 0; i < encLength; i++) {
      var e = enc[i]
      var field = m.fields[i] // was f
      var val = obj[field.name]
      var j = 0

      if (!defined(val)) {
        if (field.required) {
          throw new Error(field.name + ' is required')
        }
        continue
      }
      var p = ints[i].p
      var h = ints[i].h

      var packed = field.packed

      if (field.map) {
        var tmp = Object.keys(val)
        for (j = 0; j < tmp.length; j++) {
          tmp[j] = {
            key: tmp[j],
            value: val[tmp[j]]
          }
        }
        val = tmp
      }

      if (packed) {
        var packedLen = 0
        for (j = 0; j < val.length; j++) {
          if (!defined(val[j])) {
            continue
          }

          packedLen += e.encodingLength(val[j])
        }

        if (packedLen) {
          for (j = 0; j < h.length; j++) {
            buf[offset++] = p[j]
          }
          varint.encode(packedLen, buf, offset)
          offset += varint.encode.bytes
        }
      }

      if (field.repeated) {
        var innerVal
        for (j = 0; j < val.length; j++) {
          innerVal = val[j]
          if (!defined(innerVal)) {
            continue
          }
          offset = encodeField(buf, offset, h, e, packed, innerVal)
        }
      } else {
        offset = encodeField(buf, offset, h, e, packed, val)
      }
    }

    encode.bytes = offset - oldOffset
    return buf
  }
}

module.exports = compileEncode

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defined = __webpack_require__(137).defined
var varint = __webpack_require__(46)

function compileEncodingLength (m, enc, oneofs) {
  var oneofsKeys = Object.keys(oneofs)
  var encLength = enc.length

  var hls = new Array(encLength)

  for (var i = 0; i < m.fields.length; i++) {
    hls[i] = varint.encodingLength(m.fields[i].tag << 3 | enc[i].type)

    var field = m.fields[i]
    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false'
  }

  return function encodingLength (obj) {
    var length = 0
    var i = 0
    var j = 0

    for (i = 0; i < oneofsKeys.length; i++) {
      var name = oneofsKeys[i]
      var props = oneofs[name]

      var match = false
      for (j = 0; j < props.length; j++) {
        if (defined(obj[props[j]])) {
          if (match) {
            throw new Error('only one of the properties defined in oneof ' + name + ' can be set')
          }
          match = true
        }
      }
    }

    for (i = 0; i < encLength; i++) {
      var e = enc[i]
      var field = m.fields[i]
      var val = obj[field.name]
      var hl = hls[i]
      var len

      if (!defined(val)) {
        if (field.required) {
          throw new Error(field.name + ' is required')
        }

        continue
      }

      if (field.map) {
        var tmp = Object.keys(val)
        for (j = 0; j < tmp.length; j++) {
          tmp[j] = {
            key: tmp[j],
            value: val[tmp[j]]
          }
        }

        val = tmp
      }

      if (field.packed) {
        var packedLen = 0
        for (j = 0; j < val.length; j++) {
          if (!defined(val[j])) {
            continue
          }
          len = e.encodingLength(val[j])
          packedLen += len

          if (e.message) {
            packedLen += varint.encodingLength(len)
          }
        }

        if (packedLen) {
          length += hl + packedLen + varint.encodingLength(packedLen)
        }
      } else if (field.repeated) {
        for (j = 0; j < val.length; j++) {
          if (!defined(val[j])) {
            continue
          }

          len = e.encodingLength(val[j])
          length += hl + len + (e.message ? varint.encodingLength(len) : 0)
        }
      } else {
        len = e.encodingLength(val)
        length += hl + len + (e.message ? varint.encodingLength(len) : 0)
      }
    }

    return length
  }
}

module.exports = compileEncodingLength


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const multihashing = __webpack_require__(109)
const protobuf = __webpack_require__(130)

const crypto = __webpack_require__(272)
const pbm = protobuf(__webpack_require__(138))

class RsaPublicKey {
  constructor (key) {
    this._key = key
  }

  verify (data, sig, callback) {
    ensure(callback)
    crypto.hashAndVerify(this._key, sig, data, callback)
  }

  marshal () {
    return crypto.utils.jwkToPkix(this._key)
  }

  get bytes () {
    return pbm.PublicKey.encode({
      Type: pbm.KeyType.RSA,
      Data: this.marshal()
    })
  }

  encrypt (bytes) {
    return this._key.encrypt(bytes, 'RSAES-PKCS1-V1_5')
  }

  equals (key) {
    return this.bytes.equals(key.bytes)
  }

  hash (callback) {
    ensure(callback)
    multihashing(this.bytes, 'sha2-256', callback)
  }
}

class RsaPrivateKey {
  // key       - Object of the jwk format
  // publicKey - Buffer of the spki format
  constructor (key, publicKey) {
    this._key = key
    this._publicKey = publicKey
  }

  genSecret () {
    return crypto.getRandomValues(new Uint8Array(16))
  }

  sign (message, callback) {
    ensure(callback)
    crypto.hashAndSign(this._key, message, callback)
  }

  get public () {
    if (!this._publicKey) {
      throw new Error('public key not provided')
    }

    return new RsaPublicKey(this._publicKey)
  }

  decrypt (msg, callback) {
    crypto.decrypt(this._key, msg, callback)
  }

  marshal () {
    return crypto.utils.jwkToPkcs1(this._key)
  }

  get bytes () {
    return pbm.PrivateKey.encode({
      Type: pbm.KeyType.RSA,
      Data: this.marshal()
    })
  }

  equals (key) {
    return this.bytes.equals(key.bytes)
  }

  hash (callback) {
    ensure(callback)
    multihashing(this.bytes, 'sha2-256', callback)
  }
}

function unmarshalRsaPrivateKey (bytes, callback) {
  const jwk = crypto.utils.pkcs1ToJwk(bytes)
  crypto.unmarshalPrivateKey(jwk, (err, keys) => {
    if (err) {
      return callback(err)
    }

    callback(null, new RsaPrivateKey(keys.privateKey, keys.publicKey))
  })
}

function unmarshalRsaPublicKey (bytes) {
  const jwk = crypto.utils.pkixToJwk(bytes)

  return new RsaPublicKey(jwk)
}

function generateKeyPair (bits, cb) {
  crypto.generateKey(bits, (err, keys) => {
    if (err) {
      return cb(err)
    }

    cb(null, new RsaPrivateKey(keys.privateKey, keys.publicKey))
  })
}

function ensure (cb) {
  if (typeof cb !== 'function') {
    throw new Error('callback is required')
  }
}

module.exports = {
  RsaPublicKey,
  RsaPrivateKey,
  unmarshalRsaPublicKey,
  unmarshalRsaPrivateKey,
  generateKeyPair
}


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

var Buffer = __webpack_require__(6).Buffer

module.exports = function base (ALPHABET) {
  var ALPHABET_MAP = {}
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)

  // pre-compute lookup table
  for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z)

    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
    ALPHABET_MAP[x] = z
  }

  function encode (source) {
    if (source.length === 0) return ''

    var digits = [0]
    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8
        digits[j] = carry % BASE
        carry = (carry / BASE) | 0
      }

      while (carry > 0) {
        digits.push(carry % BASE)
        carry = (carry / BASE) | 0
      }
    }

    var string = ''

    // deal with leading zeros
    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += ALPHABET[0]
    // convert digits to a string
    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]

    return string
  }

  function decodeUnsafe (string) {
    if (string.length === 0) return Buffer.allocUnsafe(0)

    var bytes = [0]
    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]]
      if (value === undefined) return

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE
        bytes[j] = carry & 0xff
        carry >>= 8
      }

      while (carry > 0) {
        bytes.push(carry & 0xff)
        carry >>= 8
      }
    }

    // deal with leading zeros
    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0)
    }

    return Buffer.from(bytes.reverse())
  }

  function decode (string) {
    var buffer = decodeUnsafe(string)
    if (buffer) return buffer

    throw new Error('Non-base' + BASE + ' character')
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const sha3 = __webpack_require__(398)
const murmur3 = __webpack_require__(399)

const utils = __webpack_require__(269)
const sha = __webpack_require__(401)

const toCallback = utils.toCallback
const toBuf = utils.toBuf
const fromString = utils.fromString
const fromNumberTo32BitBuf = utils.fromNumberTo32BitBuf

module.exports = {
  sha1: sha.sha1,
  sha2256: sha.sha2256,
  sha2512: sha.sha2512,
  sha3512: toCallback(toBuf(sha3.sha3_512)),
  sha3384: toCallback(toBuf(sha3.sha3_384)),
  sha3256: toCallback(toBuf(sha3.sha3_256)),
  sha3224: toCallback(toBuf(sha3.sha3_224)),
  shake128: toCallback(toBuf(sha3.shake_128, 256)),
  shake256: toCallback(toBuf(sha3.shake_256, 512)),
  keccak224: toCallback(toBuf(sha3.keccak_224)),
  keccak256: toCallback(toBuf(sha3.keccak_256)),
  keccak384: toCallback(toBuf(sha3.keccak_384)),
  keccak512: toCallback(toBuf(sha3.keccak_512)),
  murmur3128: toCallback(toBuf(fromString(murmur3.x64.hash128))),
  murmur332: toCallback(fromNumberTo32BitBuf(fromString(murmur3.x86.hash32))),
  addBlake: __webpack_require__(404)
}


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.6.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var root = typeof window === 'object' ? window : {};
  var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  }
  var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
  var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
  var KECCAK_PADDING = [1, 256, 65536, 16777216];
  var PADDING = [6, 1536, 393216, 100663296];
  var SHIFT = [0, 8, 16, 24];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
            0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
            2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
            2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
            2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  var BITS = [224, 256, 384, 512];
  var SHAKE_BITS = [128, 256];
  var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array'];
  var CSHAKE_BYTEPAD = {
    '128': 168,
    '256': 136
  };

  if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  var createOutputMethod = function (bits, padding, outputType) {
    return function (message) {
      return new Keccak(bits, padding, bits).update(message)[outputType]();
    };
  };

  var createShakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits) {
      return new Keccak(bits, padding, outputBits).update(message)[outputType]();
    };
  };

  var createCshakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits, n, s) {
      return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
    };
  };

  var createKmacOutputMethod = function (bits, padding, outputType) {
    return function (key, message, outputBits, s) {
      return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
    };
  };

  var createOutputMethods = function (method, createMethod, bits, padding) {
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createMethod(bits, padding, type);
    }
    return method;
  };

  var createMethod = function (bits, padding) {
    var method = createOutputMethod(bits, padding, 'hex');
    method.create = function () {
      return new Keccak(bits, padding, bits);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    return createOutputMethods(method, createOutputMethod, bits, padding);
  };

  var createShakeMethod = function (bits, padding) {
    var method = createShakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits) {
      return new Keccak(bits, padding, outputBits);
    };
    method.update = function (message, outputBits) {
      return method.create(outputBits).update(message);
    };
    return createOutputMethods(method, createShakeOutputMethod, bits, padding);
  };

  var createCshakeMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createCshakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits, n, s) {
      if (!n && !s) {
        return methods['shake' + bits].create(outputBits);
      } else {
        return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
      }
    };
    method.update = function (message, outputBits, n, s) {
      return method.create(outputBits, n, s).update(message);
    };
    return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
  };

  var createKmacMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createKmacOutputMethod(bits, padding, 'hex');
    method.create = function (key, outputBits, s) {
      return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
    };
    method.update = function (key, message, outputBits, s) {
      return method.create(key, outputBits, s).update(message);
    };
    return createOutputMethods(method, createKmacOutputMethod, bits, padding);
  };

  var algorithms = [
    {name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod},
    {name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod},
    {name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod},
    {name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod},
    {name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod}
  ];

  var methods = {}, methodNames = [];

  for (var i = 0; i < algorithms.length; ++i) {
    var algorithm = algorithms[i];
    var bits  = algorithm.bits;
    for (var j = 0; j < bits.length; ++j) {
      var methodName = algorithm.name + '_' + bits[j];
      methodNames.push(methodName);
      methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
      if (algorithm.name !== 'sha3') {
        var newMethodName = algorithm.name + bits[j];
        methodNames.push(newMethodName);
        methods[newMethodName] = methods[methodName];
      }
    }
  }

  function Keccak(bits, padding, outputBits) {
    this.blocks = [];
    this.s = [];
    this.padding = padding;
    this.outputBits = outputBits;
    this.reset = true;
    this.block = 0;
    this.start = 0;
    this.blockCount = (1600 - (bits << 1)) >> 5;
    this.byteCount = this.blockCount << 2;
    this.outputBlocks = outputBits >> 5;
    this.extraBytes = (outputBits & 31) >> 3;

    for (var i = 0; i < 50; ++i) {
      this.s[i] = 0;
    }
  }

  Keccak.prototype.update = function (message) {
    var notString = typeof message !== 'string';
    if (notString && message.constructor === root.ArrayBuffer) {
      message = new Uint8Array(message);
    }
    var length = message.length;
    if (notString) {
      if (typeof length !== 'number' ||
        !Array.isArray(message) && 
        !(ARRAY_BUFFER && ArrayBuffer.isView(message))) {
        throw 'input is invalid type';
      }
    }
    var blocks = this.blocks, byteCount = this.byteCount,
      blockCount = this.blockCount, index = 0, s = this.s, i, code;

    while (index < length) {
      if (this.reset) {
        this.reset = false;
        blocks[0] = this.block;
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      if (notString) {
        for (i = this.start; index < length && i < byteCount; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < byteCount; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }
      this.lastByteIndex = i;
      if (i >= byteCount) {
        this.start = i - byteCount;
        this.block = blocks[blockCount];
        for (i = 0; i < blockCount; ++i) {
          s[i] ^= blocks[i];
        }
        f(s);
        this.reset = true;
      } else {
        this.start = i;
      }
    }
    return this;
  };

  Keccak.prototype.encode = function (x, right) {
    var o = x & 255, n = 1;
    var bytes = [o];
    x = x >> 8;
    o = x & 255;
    while (o > 0) {
      bytes.unshift(o);
      x = x >> 8;
      o = x & 255;
      ++n;
    }
    if (right) {
      bytes.push(n);
    } else {
      bytes.unshift(n);
    }
    this.update(bytes);
    return bytes.length;
  };

  Keccak.prototype.encodeString = function (str) {
    str = str || '';
    var notString = typeof str !== 'string';
    if (notString && str.constructor === root.ArrayBuffer) {
      str = new Uint8Array(str);
    }
    var length = str.length;
    if (notString) {
      if (typeof length !== 'number' ||
        !Array.isArray(str) && 
        !(ARRAY_BUFFER && ArrayBuffer.isView(str))) {
        throw 'input is invalid type';
      }
    }
    var bytes = 0;
    if (notString) {
      bytes = length;
    } else {
      for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);
        if (code < 0x80) {
          bytes += 1;
        } else if (code < 0x800) {
          bytes += 2;
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes += 3;
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
          bytes += 4;
        }
      }
    }
    bytes += this.encode(bytes * 8);
    this.update(str);
    return bytes;
  };

  Keccak.prototype.bytepad = function (strs, w) {
    var bytes = this.encode(w);
    for (var i = 0;i < strs.length;++i) {
      bytes += this.encodeString(strs[i]);
    }
    var paddingBytes = w - bytes % w;
    var zeros = [];
    zeros.length = paddingBytes;
    this.update(zeros);
    return this;
  };

  Keccak.prototype.finalize = function () {
    var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
    blocks[i >> 2] |= this.padding[i & 3];
    if (this.lastByteIndex === this.byteCount) {
      blocks[0] = blocks[blockCount];
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    blocks[blockCount - 1] |= 0x80000000;
    for (i = 0; i < blockCount; ++i) {
      s[i] ^= blocks[i];
    }
    f(s);
  };

  Keccak.prototype.toString = Keccak.prototype.hex = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
    var hex = '', block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
               HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
               HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
               HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
      }
      if (j % blockCount === 0) {
        f(s);
        i = 0;
      }
    }
    if (extraBytes) {
      block = s[i];
      if (extraBytes > 0) {
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
      }
      if (extraBytes > 1) {
        hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
      }
      if (extraBytes > 2) {
        hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
      }
    }
    return hex;
  };

  Keccak.prototype.arrayBuffer = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
    var bytes = this.outputBits >> 3;
    var buffer;
    if (extraBytes) {
      buffer = new ArrayBuffer((outputBlocks + 1) << 2);
    } else {
      buffer = new ArrayBuffer(bytes);
    }
    var array = new Uint32Array(buffer);
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        array[j] = s[i];
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      array[i] = s[i];
      buffer = buffer.slice(0, bytes);
    }
    return buffer;
  };

  Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

  Keccak.prototype.digest = Keccak.prototype.array = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
    var array = [], offset, block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        array[offset + 1] = (block >> 8) & 0xFF;
        array[offset + 2] = (block >> 16) & 0xFF;
        array[offset + 3] = (block >> 24) & 0xFF;
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      offset = j << 2;
      block = s[i];
      if (extraBytes > 0) {
        array[offset] = block & 0xFF;
      }
      if (extraBytes > 1) {
        array[offset + 1] = (block >> 8) & 0xFF;
      }
      if (extraBytes > 2) {
        array[offset + 2] = (block >> 16) & 0xFF;
      }
    }
    return array;
  };

  function Kmac(bits, padding, outputBits) {
    Keccak.call(this, bits, padding, outputBits);
  }

  Kmac.prototype = new Keccak();

  Kmac.prototype.finalize = function () {
    this.encode(this.outputBits, true);
    return Keccak.prototype.finalize.call(this);
  };

  var f = function (s) {
    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
        b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
        b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
        b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
    for (n = 0; n < 48; n += 2) {
      c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
      c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
      c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
      c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
      c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
      c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
      c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
      c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
      c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
      c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

      h = c8 ^ ((c2 << 1) | (c3 >>> 31));
      l = c9 ^ ((c3 << 1) | (c2 >>> 31));
      s[0] ^= h;
      s[1] ^= l;
      s[10] ^= h;
      s[11] ^= l;
      s[20] ^= h;
      s[21] ^= l;
      s[30] ^= h;
      s[31] ^= l;
      s[40] ^= h;
      s[41] ^= l;
      h = c0 ^ ((c4 << 1) | (c5 >>> 31));
      l = c1 ^ ((c5 << 1) | (c4 >>> 31));
      s[2] ^= h;
      s[3] ^= l;
      s[12] ^= h;
      s[13] ^= l;
      s[22] ^= h;
      s[23] ^= l;
      s[32] ^= h;
      s[33] ^= l;
      s[42] ^= h;
      s[43] ^= l;
      h = c2 ^ ((c6 << 1) | (c7 >>> 31));
      l = c3 ^ ((c7 << 1) | (c6 >>> 31));
      s[4] ^= h;
      s[5] ^= l;
      s[14] ^= h;
      s[15] ^= l;
      s[24] ^= h;
      s[25] ^= l;
      s[34] ^= h;
      s[35] ^= l;
      s[44] ^= h;
      s[45] ^= l;
      h = c4 ^ ((c8 << 1) | (c9 >>> 31));
      l = c5 ^ ((c9 << 1) | (c8 >>> 31));
      s[6] ^= h;
      s[7] ^= l;
      s[16] ^= h;
      s[17] ^= l;
      s[26] ^= h;
      s[27] ^= l;
      s[36] ^= h;
      s[37] ^= l;
      s[46] ^= h;
      s[47] ^= l;
      h = c6 ^ ((c0 << 1) | (c1 >>> 31));
      l = c7 ^ ((c1 << 1) | (c0 >>> 31));
      s[8] ^= h;
      s[9] ^= l;
      s[18] ^= h;
      s[19] ^= l;
      s[28] ^= h;
      s[29] ^= l;
      s[38] ^= h;
      s[39] ^= l;
      s[48] ^= h;
      s[49] ^= l;

      b0 = s[0];
      b1 = s[1];
      b32 = (s[11] << 4) | (s[10] >>> 28);
      b33 = (s[10] << 4) | (s[11] >>> 28);
      b14 = (s[20] << 3) | (s[21] >>> 29);
      b15 = (s[21] << 3) | (s[20] >>> 29);
      b46 = (s[31] << 9) | (s[30] >>> 23);
      b47 = (s[30] << 9) | (s[31] >>> 23);
      b28 = (s[40] << 18) | (s[41] >>> 14);
      b29 = (s[41] << 18) | (s[40] >>> 14);
      b20 = (s[2] << 1) | (s[3] >>> 31);
      b21 = (s[3] << 1) | (s[2] >>> 31);
      b2 = (s[13] << 12) | (s[12] >>> 20);
      b3 = (s[12] << 12) | (s[13] >>> 20);
      b34 = (s[22] << 10) | (s[23] >>> 22);
      b35 = (s[23] << 10) | (s[22] >>> 22);
      b16 = (s[33] << 13) | (s[32] >>> 19);
      b17 = (s[32] << 13) | (s[33] >>> 19);
      b48 = (s[42] << 2) | (s[43] >>> 30);
      b49 = (s[43] << 2) | (s[42] >>> 30);
      b40 = (s[5] << 30) | (s[4] >>> 2);
      b41 = (s[4] << 30) | (s[5] >>> 2);
      b22 = (s[14] << 6) | (s[15] >>> 26);
      b23 = (s[15] << 6) | (s[14] >>> 26);
      b4 = (s[25] << 11) | (s[24] >>> 21);
      b5 = (s[24] << 11) | (s[25] >>> 21);
      b36 = (s[34] << 15) | (s[35] >>> 17);
      b37 = (s[35] << 15) | (s[34] >>> 17);
      b18 = (s[45] << 29) | (s[44] >>> 3);
      b19 = (s[44] << 29) | (s[45] >>> 3);
      b10 = (s[6] << 28) | (s[7] >>> 4);
      b11 = (s[7] << 28) | (s[6] >>> 4);
      b42 = (s[17] << 23) | (s[16] >>> 9);
      b43 = (s[16] << 23) | (s[17] >>> 9);
      b24 = (s[26] << 25) | (s[27] >>> 7);
      b25 = (s[27] << 25) | (s[26] >>> 7);
      b6 = (s[36] << 21) | (s[37] >>> 11);
      b7 = (s[37] << 21) | (s[36] >>> 11);
      b38 = (s[47] << 24) | (s[46] >>> 8);
      b39 = (s[46] << 24) | (s[47] >>> 8);
      b30 = (s[8] << 27) | (s[9] >>> 5);
      b31 = (s[9] << 27) | (s[8] >>> 5);
      b12 = (s[18] << 20) | (s[19] >>> 12);
      b13 = (s[19] << 20) | (s[18] >>> 12);
      b44 = (s[29] << 7) | (s[28] >>> 25);
      b45 = (s[28] << 7) | (s[29] >>> 25);
      b26 = (s[38] << 8) | (s[39] >>> 24);
      b27 = (s[39] << 8) | (s[38] >>> 24);
      b8 = (s[48] << 14) | (s[49] >>> 18);
      b9 = (s[49] << 14) | (s[48] >>> 18);

      s[0] = b0 ^ (~b2 & b4);
      s[1] = b1 ^ (~b3 & b5);
      s[10] = b10 ^ (~b12 & b14);
      s[11] = b11 ^ (~b13 & b15);
      s[20] = b20 ^ (~b22 & b24);
      s[21] = b21 ^ (~b23 & b25);
      s[30] = b30 ^ (~b32 & b34);
      s[31] = b31 ^ (~b33 & b35);
      s[40] = b40 ^ (~b42 & b44);
      s[41] = b41 ^ (~b43 & b45);
      s[2] = b2 ^ (~b4 & b6);
      s[3] = b3 ^ (~b5 & b7);
      s[12] = b12 ^ (~b14 & b16);
      s[13] = b13 ^ (~b15 & b17);
      s[22] = b22 ^ (~b24 & b26);
      s[23] = b23 ^ (~b25 & b27);
      s[32] = b32 ^ (~b34 & b36);
      s[33] = b33 ^ (~b35 & b37);
      s[42] = b42 ^ (~b44 & b46);
      s[43] = b43 ^ (~b45 & b47);
      s[4] = b4 ^ (~b6 & b8);
      s[5] = b5 ^ (~b7 & b9);
      s[14] = b14 ^ (~b16 & b18);
      s[15] = b15 ^ (~b17 & b19);
      s[24] = b24 ^ (~b26 & b28);
      s[25] = b25 ^ (~b27 & b29);
      s[34] = b34 ^ (~b36 & b38);
      s[35] = b35 ^ (~b37 & b39);
      s[44] = b44 ^ (~b46 & b48);
      s[45] = b45 ^ (~b47 & b49);
      s[6] = b6 ^ (~b8 & b0);
      s[7] = b7 ^ (~b9 & b1);
      s[16] = b16 ^ (~b18 & b10);
      s[17] = b17 ^ (~b19 & b11);
      s[26] = b26 ^ (~b28 & b20);
      s[27] = b27 ^ (~b29 & b21);
      s[36] = b36 ^ (~b38 & b30);
      s[37] = b37 ^ (~b39 & b31);
      s[46] = b46 ^ (~b48 & b40);
      s[47] = b47 ^ (~b49 & b41);
      s[8] = b8 ^ (~b0 & b2);
      s[9] = b9 ^ (~b1 & b3);
      s[18] = b18 ^ (~b10 & b12);
      s[19] = b19 ^ (~b11 & b13);
      s[28] = b28 ^ (~b20 & b22);
      s[29] = b29 ^ (~b21 & b23);
      s[38] = b38 ^ (~b30 & b32);
      s[39] = b39 ^ (~b31 & b33);
      s[48] = b48 ^ (~b40 & b42);
      s[49] = b49 ^ (~b41 & b43);

      s[0] ^= RC[n];
      s[1] ^= RC[n + 1];
    }
  };

  if (COMMON_JS) {
    module.exports = methods;
  } else {
    for (var i = 0; i < methodNames.length; ++i) {
      root[methodNames[i]] = methods[methodNames[i]];
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(35)))

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(400);


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint -W086: true */
// +----------------------------------------------------------------------+
// | murmurHash3js.js v3.0.1 // https://github.com/pid/murmurHash3js
// | A javascript implementation of MurmurHash3's x86 hashing algorithms. |
// |----------------------------------------------------------------------|
// | Copyright (c) 2012-2015 Karan Lyons                                       |
// | https://github.com/karanlyons/murmurHash3.js/blob/c1778f75792abef7bdd74bc85d2d4e1a3d25cfe9/murmurHash3.js |
// | Freely distributable under the MIT license.                          |
// +----------------------------------------------------------------------+

;(function (root, undefined) {
    'use strict';

    // Create a local object that'll be exported or referenced globally.
    var library = {
        'version': '3.0.1',
        'x86': {},
        'x64': {}
    };

    // PRIVATE FUNCTIONS
    // -----------------

    function _x86Multiply(m, n) {
        //
        // Given two 32bit ints, returns the two multiplied together as a
        // 32bit int.
        //

        return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
    }

    function _x86Rotl(m, n) {
        //
        // Given a 32bit int and an int representing a number of bit positions,
        // returns the 32bit int rotated left by that number of positions.
        //

        return (m << n) | (m >>> (32 - n));
    }

    function _x86Fmix(h) {
        //
        // Given a block, returns murmurHash3's final x86 mix of that block.
        //

        h ^= h >>> 16;
        h = _x86Multiply(h, 0x85ebca6b);
        h ^= h >>> 13;
        h = _x86Multiply(h, 0xc2b2ae35);
        h ^= h >>> 16;

        return h;
    }

    function _x64Add(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // added together as a 64bit int (as an array of two 32bit ints).
        //

        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];

        o[3] += m[3] + n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;

        o[2] += m[2] + n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[1] += m[1] + n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[0] += m[0] + n[0];
        o[0] &= 0xffff;

        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }

    function _x64Multiply(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // multiplied together as a 64bit int (as an array of two 32bit ints).
        //

        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];

        o[3] += m[3] * n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;

        o[2] += m[2] * n[3];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[2] += m[3] * n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[1] += m[1] * n[3];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[1] += m[2] * n[2];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[1] += m[3] * n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
        o[0] &= 0xffff;

        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }

    function _x64Rotl(m, n) {
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) rotated left by that number of positions.
        //

        n %= 64;

        if (n === 32) {
            return [m[1], m[0]];
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
        } else {
            n -= 32;
            return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
        }
    }

    function _x64LeftShift(m, n) {
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) shifted left by that number of positions.
        //

        n %= 64;

        if (n === 0) {
            return m;
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
        } else {
            return [m[1] << (n - 32), 0];
        }
    }

    function _x64Xor(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // xored together as a 64bit int (as an array of two 32bit ints).
        //

        return [m[0] ^ n[0], m[1] ^ n[1]];
    }

    function _x64Fmix(h) {
        //
        // Given a block, returns murmurHash3's final x64 mix of that block.
        // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
        // only place where we need to right shift 64bit ints.)
        //

        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [0xff51afd7, 0xed558ccd]);
        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
        h = _x64Xor(h, [0, h[0] >>> 1]);

        return h;
    }

    // PUBLIC FUNCTIONS
    // ----------------

    library.x86.hash32 = function (key, seed) {
        //
        // Given a string and an optional seed as an int, returns a 32 bit hash
        // using the x86 flavor of MurmurHash3, as an unsigned int.
        //

        key = key || '';
        seed = seed || 0;

        var remainder = key.length % 4;
        var bytes = key.length - remainder;

        var h1 = seed;

        var k1 = 0;

        var c1 = 0xcc9e2d51;
        var c2 = 0x1b873593;

        for (var i = 0; i < bytes; i = i + 4) {
            k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24);

            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);

            h1 ^= k1;
            h1 = _x86Rotl(h1, 13);
            h1 = _x86Multiply(h1, 5) + 0xe6546b64;
        }

        k1 = 0;

        switch (remainder) {
            case 3:
                k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;

            case 2:
                k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;

            case 1:
                k1 ^= (key.charCodeAt(i) & 0xff);
                k1 = _x86Multiply(k1, c1);
                k1 = _x86Rotl(k1, 15);
                k1 = _x86Multiply(k1, c2);
                h1 ^= k1;
        }

        h1 ^= key.length;
        h1 = _x86Fmix(h1);

        return h1 >>> 0;
    };

    library.x86.hash128 = function (key, seed) {
        //
        // Given a string and an optional seed as an int, returns a 128 bit
        // hash using the x86 flavor of MurmurHash3, as an unsigned hex.
        //

        key = key || '';
        seed = seed || 0;

        var remainder = key.length % 16;
        var bytes = key.length - remainder;

        var h1 = seed;
        var h2 = seed;
        var h3 = seed;
        var h4 = seed;

        var k1 = 0;
        var k2 = 0;
        var k3 = 0;
        var k4 = 0;

        var c1 = 0x239b961b;
        var c2 = 0xab0e9789;
        var c3 = 0x38b34ae5;
        var c4 = 0xa1e38b93;

        for (var i = 0; i < bytes; i = i + 16) {
            k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24);
            k2 = ((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24);
            k3 = ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24);
            k4 = ((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24);

            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);
            h1 ^= k1;

            h1 = _x86Rotl(h1, 19);
            h1 += h2;
            h1 = _x86Multiply(h1, 5) + 0x561ccd1b;

            k2 = _x86Multiply(k2, c2);
            k2 = _x86Rotl(k2, 16);
            k2 = _x86Multiply(k2, c3);
            h2 ^= k2;

            h2 = _x86Rotl(h2, 17);
            h2 += h3;
            h2 = _x86Multiply(h2, 5) + 0x0bcaa747;

            k3 = _x86Multiply(k3, c3);
            k3 = _x86Rotl(k3, 17);
            k3 = _x86Multiply(k3, c4);
            h3 ^= k3;

            h3 = _x86Rotl(h3, 15);
            h3 += h4;
            h3 = _x86Multiply(h3, 5) + 0x96cd1c35;

            k4 = _x86Multiply(k4, c4);
            k4 = _x86Rotl(k4, 18);
            k4 = _x86Multiply(k4, c1);
            h4 ^= k4;

            h4 = _x86Rotl(h4, 13);
            h4 += h1;
            h4 = _x86Multiply(h4, 5) + 0x32ac3b17;
        }

        k1 = 0;
        k2 = 0;
        k3 = 0;
        k4 = 0;

        switch (remainder) {
            case 15:
                k4 ^= key.charCodeAt(i + 14) << 16;

            case 14:
                k4 ^= key.charCodeAt(i + 13) << 8;

            case 13:
                k4 ^= key.charCodeAt(i + 12);
                k4 = _x86Multiply(k4, c4);
                k4 = _x86Rotl(k4, 18);
                k4 = _x86Multiply(k4, c1);
                h4 ^= k4;

            case 12:
                k3 ^= key.charCodeAt(i + 11) << 24;

            case 11:
                k3 ^= key.charCodeAt(i + 10) << 16;

            case 10:
                k3 ^= key.charCodeAt(i + 9) << 8;

            case 9:
                k3 ^= key.charCodeAt(i + 8);
                k3 = _x86Multiply(k3, c3);
                k3 = _x86Rotl(k3, 17);
                k3 = _x86Multiply(k3, c4);
                h3 ^= k3;

            case 8:
                k2 ^= key.charCodeAt(i + 7) << 24;

            case 7:
                k2 ^= key.charCodeAt(i + 6) << 16;

            case 6:
                k2 ^= key.charCodeAt(i + 5) << 8;

            case 5:
                k2 ^= key.charCodeAt(i + 4);
                k2 = _x86Multiply(k2, c2);
                k2 = _x86Rotl(k2, 16);
                k2 = _x86Multiply(k2, c3);
                h2 ^= k2;

            case 4:
                k1 ^= key.charCodeAt(i + 3) << 24;

            case 3:
                k1 ^= key.charCodeAt(i + 2) << 16;

            case 2:
                k1 ^= key.charCodeAt(i + 1) << 8;

            case 1:
                k1 ^= key.charCodeAt(i);
                k1 = _x86Multiply(k1, c1);
                k1 = _x86Rotl(k1, 15);
                k1 = _x86Multiply(k1, c2);
                h1 ^= k1;
        }

        h1 ^= key.length;
        h2 ^= key.length;
        h3 ^= key.length;
        h4 ^= key.length;

        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;

        h1 = _x86Fmix(h1);
        h2 = _x86Fmix(h2);
        h3 = _x86Fmix(h3);
        h4 = _x86Fmix(h4);

        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;

        return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
    };

    library.x64.hash128 = function (key, seed) {
        //
        // Given a string and an optional seed as an int, returns a 128 bit
        // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
        //

        key = key || '';
        seed = seed || 0;

        var remainder = key.length % 16;
        var bytes = key.length - remainder;

        var h1 = [0, seed];
        var h2 = [0, seed];

        var k1 = [0, 0];
        var k2 = [0, 0];

        var c1 = [0x87c37b91, 0x114253d5];
        var c2 = [0x4cf5ad43, 0x2745937f];

        for (var i = 0; i < bytes; i = i + 16) {
            k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) &
                0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)];
            k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i +
                9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)];

            k1 = _x64Multiply(k1, c1);
            k1 = _x64Rotl(k1, 31);
            k1 = _x64Multiply(k1, c2);
            h1 = _x64Xor(h1, k1);

            h1 = _x64Rotl(h1, 27);
            h1 = _x64Add(h1, h2);
            h1 = _x64Add(_x64Multiply(h1, [0, 5]), [0, 0x52dce729]);

            k2 = _x64Multiply(k2, c2);
            k2 = _x64Rotl(k2, 33);
            k2 = _x64Multiply(k2, c1);
            h2 = _x64Xor(h2, k2);

            h2 = _x64Rotl(h2, 31);
            h2 = _x64Add(h2, h1);
            h2 = _x64Add(_x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
        }

        k1 = [0, 0];
        k2 = [0, 0];

        switch (remainder) {
            case 15:
                k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 14)], 48));

            case 14:
                k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 13)], 40));

            case 13:
                k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 12)], 32));

            case 12:
                k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 11)], 24));

            case 11:
                k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 10)], 16));

            case 10:
                k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 9)], 8));

            case 9:
                k2 = _x64Xor(k2, [0, key.charCodeAt(i + 8)]);
                k2 = _x64Multiply(k2, c2);
                k2 = _x64Rotl(k2, 33);
                k2 = _x64Multiply(k2, c1);
                h2 = _x64Xor(h2, k2);

            case 8:
                k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 7)], 56));

            case 7:
                k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 6)], 48));

            case 6:
                k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 5)], 40));

            case 5:
                k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 4)], 32));

            case 4:
                k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 3)], 24));

            case 3:
                k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 2)], 16));

            case 2:
                k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 1)], 8));

            case 1:
                k1 = _x64Xor(k1, [0, key.charCodeAt(i)]);
                k1 = _x64Multiply(k1, c1);
                k1 = _x64Rotl(k1, 31);
                k1 = _x64Multiply(k1, c2);
                h1 = _x64Xor(h1, k1);
        }

        h1 = _x64Xor(h1, [0, key.length]);
        h2 = _x64Xor(h2, [0, key.length]);

        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);

        h1 = _x64Fmix(h1);
        h2 = _x64Fmix(h2);

        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);

        return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
    };

    // INITIALIZATION
    // --------------

    // Export murmurHash3 for CommonJS, either as an AMD module or just as part
    // of the global object.
    if (true) {

        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = library;
        }

        exports.murmurHash3 = library;

    } else if (typeof define === 'function' && define.amd) {

        define([], function () {
            return library;
        });
    } else {

        // Use murmurHash3.noConflict to restore `murmurHash3` back to its
        // original value. Returns a reference to the library object, to allow
        // it to be used under a different name.
        library._murmurHash3 = root.murmurHash3;

        library.noConflict = function () {
            root.murmurHash3 = library._murmurHash3;
            library._murmurHash3 = undefined;
            library.noConflict = undefined;

            return library;
        };

        root.murmurHash3 = library;
    }
})(this);


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const nodeify = __webpack_require__(402)

const webCrypto = getWebCrypto()

function getWebCrypto () {
  if (self.crypto) {
    return self.crypto.subtle || self.crypto.webkitSubtle
  }

  if (self.msCrypto) {
    return self.msCrypto.subtle
  }
}

function webCryptoHash (type) {
  if (!webCrypto) {
    throw new Error('Please use a browser with webcrypto support')
  }

  return (data, callback) => {
    const res = webCrypto.digest({ name: type }, data)

    if (typeof res.then !== 'function') { // IE11
      res.onerror = () => {
        callback(`Error hashing data using ${type}`)
      }
      res.oncomplete = (e) => {
        callback(null, e.target.result)
      }
      return
    }

    nodeify(
      res.then((raw) => new Buffer(new Uint8Array(raw))),
      callback
    )
  }
}

function sha1 (buf, callback) {
  webCryptoHash('SHA-1')(buf, callback)
}

function sha2256 (buf, callback) {
  webCryptoHash('SHA-256')(buf, callback)
}

function sha2512 (buf, callback) {
  webCryptoHash('SHA-512')(buf, callback)
}

module.exports = {
  sha1: sha1,
  sha2256: sha2256,
  sha2512: sha2512
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, process) {var Promise = __webpack_require__(403);
var isPromise = __webpack_require__(270);

var nextTick;
if (typeof setImmediate === 'function') nextTick = setImmediate
else if (typeof process === 'object' && process && process.nextTick) nextTick = process.nextTick
else nextTick = function (cb) { setTimeout(cb, 0) }

module.exports = nodeify;
function nodeify(promise, cb) {
  if (typeof cb !== 'function') return promise;
  return promise
    .then(function (res) {
      nextTick(function () {
        cb(null, res);
      });
    }, function (err) {
      nextTick(function () {
        cb(err);
      });
    });
}
function nodeifyThis(cb) {
  return nodeify(this, cb);
}

nodeify.extend = extend;
nodeify.Promise = NodeifyPromise;

function extend(prom) {
  if (prom && isPromise(prom)) {
    prom.nodeify = nodeifyThis;
    var then = prom.then;
    prom.then = function () {
      return extend(then.apply(this, arguments));
    };
    return prom;
  } else if (typeof prom === 'function') {
    prom.prototype.nodeify = nodeifyThis;
  } else {
    Promise.prototype.nodeify = nodeifyThis;
  }
}

function NodeifyPromise(fn) {
  if (!(this instanceof NodeifyPromise)) {
    return new NodeifyPromise(fn);
  }
  Promise.call(this, fn);
  extend(this);
}

NodeifyPromise.prototype = Object.create(Promise.prototype);
NodeifyPromise.prototype.constructor = NodeifyPromise;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129).setImmediate, __webpack_require__(17)))

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var isPromise = __webpack_require__(270)

var nextTick;
if (typeof setImediate === 'function') nextTick = setImediate
else if (typeof process === 'object' && process && process.nextTick) nextTick = process.nextTick
else nextTick = function (cb) { setTimeout(cb, 0) }

var extensions = [];

module.exports = Promise
function Promise(fn) {
  if (!(this instanceof Promise)) {
    return typeof fn === 'function' ? new Promise(fn) : defer()
  }
  var isResolved = false
  var isFulfilled = false
  var value
  var waiting = []
  var running = false

  function next(skipTimeout) {
    if (waiting.length) {
      running = true
      waiting.shift()(skipTimeout || false)
    } else {
      running = false
    }
  }
  this.then = then;
  function then(cb, eb) {
    return new Promise(function (resolver) {
      function done(skipTimeout) {
        var callback = isFulfilled ? cb : eb
        if (typeof callback === 'function') {
          function timeoutDone() {
            var val;
            try {
              val = callback(value)
            } catch (ex) {
              resolver.reject(ex)
              return next()
            }
            resolver.fulfill(val);
            next(true);
          }
          if (skipTimeout) timeoutDone()
          else nextTick(timeoutDone)
        } else if (isFulfilled) {
          resolver.fulfill(value)
          next(skipTimeout)
        } else {
          resolver.reject(value)
          next(skipTimeout)
        }
      }
      waiting.push(done)
      if (isResolved && !running) next()
    });
  }
  
  (function () {
    function fulfill(val) {
      if (isResolved) return
      if (isPromise(val)) val.then(fulfill, reject)
      else {
        isResolved = isFulfilled = true
        value = val
        next()
      }
    }
    function reject(err) {
      if (isResolved) return
      isResolved = true
      isFulfilled = false
      value = err
      next()
    }
    var resolver = {fulfill: fulfill, reject: reject};
    for (var i = 0; i < extensions.length; i++) {
      extensions[i](this, resolver);
    }
    if (typeof fn === 'function') {
      try {
        fn(resolver)
      } catch (ex) {
        resolver.reject(ex);
      }
    }
  }());
}
function defer() {
  var resolver
  var promise = new Promise(function (res) { resolver = res })
  return {resolver: resolver, promise: promise}
}
Promise.use = function (extension) {
  extensions.push(extension);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const blake = __webpack_require__(405)

const toCallback = __webpack_require__(269).toCallback

const minB = 0xb201
const minS = 0xb241

const blake2b = {
  init: blake.blake2bInit,
  update: blake.blake2bUpdate,
  digest: blake.blake2bFinal
}

const blake2s = {
  init: blake.blake2sInit,
  update: blake.blake2sUpdate,
  digest: blake.blake2sFinal
}

const makeB2Hash = (size, hf) => toCallback((buf) => {
  const ctx = hf.init(size, null)
  hf.update(ctx, buf)
  return Buffer.from(hf.digest(ctx))
})

module.exports = (table) => {
  for (let i = 0; i < 64; i++) {
    table[minB + i] = makeB2Hash(i + 1, blake2b)
  }
  for (let i = 0; i < 32; i++) {
    table[minS + i] = makeB2Hash(i + 1, blake2s)
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

var b2b = __webpack_require__(406)
var b2s = __webpack_require__(407)

module.exports = {
  blake2b: b2b.blake2b,
  blake2bHex: b2b.blake2bHex,
  blake2bInit: b2b.blake2bInit,
  blake2bUpdate: b2b.blake2bUpdate,
  blake2bFinal: b2b.blake2bFinal,
  blake2s: b2s.blake2s,
  blake2sHex: b2s.blake2sHex,
  blake2sInit: b2s.blake2sInit,
  blake2sUpdate: b2s.blake2sUpdate,
  blake2sFinal: b2s.blake2sFinal
}


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

// Blake2B in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch

var util = __webpack_require__(271)

// 64-bit unsigned addition
// Sets v[a,a+1] += v[b,b+1]
// v should be a Uint32Array
function ADD64AA (v, a, b) {
  var o0 = v[a] + v[b]
  var o1 = v[a + 1] + v[b + 1]
  if (o0 >= 0x100000000) {
    o1++
  }
  v[a] = o0
  v[a + 1] = o1
}

// 64-bit unsigned addition
// Sets v[a,a+1] += b
// b0 is the low 32 bits of b, b1 represents the high 32 bits
function ADD64AC (v, a, b0, b1) {
  var o0 = v[a] + b0
  if (b0 < 0) {
    o0 += 0x100000000
  }
  var o1 = v[a + 1] + b1
  if (o0 >= 0x100000000) {
    o1++
  }
  v[a] = o0
  v[a + 1] = o1
}

// Little-endian byte access
function B2B_GET32 (arr, i) {
  return (arr[i] ^
  (arr[i + 1] << 8) ^
  (arr[i + 2] << 16) ^
  (arr[i + 3] << 24))
}

// G Mixing function
// The ROTRs are inlined for speed
function B2B_G (a, b, c, d, ix, iy) {
  var x0 = m[ix]
  var x1 = m[ix + 1]
  var y0 = m[iy]
  var y1 = m[iy + 1]

  ADD64AA(v, a, b) // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
  ADD64AC(v, a, x0, x1) // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
  var xor0 = v[d] ^ v[a]
  var xor1 = v[d + 1] ^ v[a + 1]
  v[d] = xor1
  v[d + 1] = xor0

  ADD64AA(v, c, d)

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor0 >>> 24) ^ (xor1 << 8)
  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8)

  ADD64AA(v, a, b)
  ADD64AC(v, a, y0, y1)

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
  xor0 = v[d] ^ v[a]
  xor1 = v[d + 1] ^ v[a + 1]
  v[d] = (xor0 >>> 16) ^ (xor1 << 16)
  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16)

  ADD64AA(v, c, d)

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor1 >>> 31) ^ (xor0 << 1)
  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1)
}

// Initialization Vector
var BLAKE2B_IV32 = new Uint32Array([
  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
])

var SIGMA8 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
]

// These are offsets into a uint64 buffer.
// Multiply them all by 2 to make them offsets into a uint32 buffer,
// because this is Javascript and we don't have uint64s
var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }))

// Compression function. 'last' flag indicates last block.
// Note we're representing 16 uint64s as 32 uint32s
var v = new Uint32Array(32)
var m = new Uint32Array(32)
function blake2bCompress (ctx, last) {
  var i = 0

  // init work variables
  for (i = 0; i < 16; i++) {
    v[i] = ctx.h[i]
    v[i + 16] = BLAKE2B_IV32[i]
  }

  // low 64 bits of offset
  v[24] = v[24] ^ ctx.t
  v[25] = v[25] ^ (ctx.t / 0x100000000)
  // high 64 bits not supported, offset may not be higher than 2**53-1

  // last block flag set ?
  if (last) {
    v[28] = ~v[28]
    v[29] = ~v[29]
  }

  // get little-endian words
  for (i = 0; i < 32; i++) {
    m[i] = B2B_GET32(ctx.b, 4 * i)
  }

  // twelve rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 64)
  for (i = 0; i < 12; i++) {
    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1])
    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3])
    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5])
    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7])
    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9])
    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11])
    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13])
    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15])
  }
  // util.debugPrint('   (i=12) v[16]', v, 64)

  for (i = 0; i < 16; i++) {
    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16]
  }
  // util.debugPrint('h[8]', ctx.h, 64)
}

// Creates a BLAKE2b hashing context
// Requires an output length between 1 and 64 bytes
// Takes an optional Uint8Array key
function blake2bInit (outlen, key) {
  if (outlen === 0 || outlen > 64) {
    throw new Error('Illegal output length, expected 0 < length <= 64')
  }
  if (key && key.length > 64) {
    throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64')
  }

  // state, 'param block'
  var ctx = {
    b: new Uint8Array(128),
    h: new Uint32Array(16),
    t: 0, // input count
    c: 0, // pointer within buffer
    outlen: outlen // output length in bytes
  }

  // initialize hash state
  for (var i = 0; i < 16; i++) {
    ctx.h[i] = BLAKE2B_IV32[i]
  }
  var keylen = key ? key.length : 0
  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen

  // key the hash, if applicable
  if (key) {
    blake2bUpdate(ctx, key)
    // at the end
    ctx.c = 128
  }

  return ctx
}

// Updates a BLAKE2b streaming hash
// Requires hash context and Uint8Array (byte array)
function blake2bUpdate (ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 128) { // buffer full ?
      ctx.t += ctx.c // add counters
      blake2bCompress(ctx, false) // compress (not last)
      ctx.c = 0 // counter to zero
    }
    ctx.b[ctx.c++] = input[i]
  }
}

// Completes a BLAKE2b streaming hash
// Returns a Uint8Array containing the message digest
function blake2bFinal (ctx) {
  ctx.t += ctx.c // mark last block offset

  while (ctx.c < 128) { // fill up with zeros
    ctx.b[ctx.c++] = 0
  }
  blake2bCompress(ctx, true) // final block flag = 1

  // little endian convert and store
  var out = new Uint8Array(ctx.outlen)
  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = ctx.h[i >> 2] >> (8 * (i & 3))
  }
  return out
}

// Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64
function blake2b (input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 64
  input = util.normalizeInput(input)

  // do the math
  var ctx = blake2bInit(outlen, key)
  blake2bUpdate(ctx, input)
  return blake2bFinal(ctx)
}

// Computes the BLAKE2B hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64
function blake2bHex (input, key, outlen) {
  var output = blake2b(input, key, outlen)
  return util.toHex(output)
}

module.exports = {
  blake2b: blake2b,
  blake2bHex: blake2bHex,
  blake2bInit: blake2bInit,
  blake2bUpdate: blake2bUpdate,
  blake2bFinal: blake2bFinal
}


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

// BLAKE2s hash function in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch

var util = __webpack_require__(271)

// Little-endian byte access.
// Expects a Uint8Array and an index
// Returns the little-endian uint32 at v[i..i+3]
function B2S_GET32 (v, i) {
  return v[i] ^ (v[i + 1] << 8) ^ (v[i + 2] << 16) ^ (v[i + 3] << 24)
}

// Mixing function G.
function B2S_G (a, b, c, d, x, y) {
  v[a] = v[a] + v[b] + x
  v[d] = ROTR32(v[d] ^ v[a], 16)
  v[c] = v[c] + v[d]
  v[b] = ROTR32(v[b] ^ v[c], 12)
  v[a] = v[a] + v[b] + y
  v[d] = ROTR32(v[d] ^ v[a], 8)
  v[c] = v[c] + v[d]
  v[b] = ROTR32(v[b] ^ v[c], 7)
}

// 32-bit right rotation
// x should be a uint32
// y must be between 1 and 31, inclusive
function ROTR32 (x, y) {
  return (x >>> y) ^ (x << (32 - y))
}

// Initialization Vector.
var BLAKE2S_IV = new Uint32Array([
  0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
  0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19])

var SIGMA = new Uint8Array([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0])

// Compression function. "last" flag indicates last block
var v = new Uint32Array(16)
var m = new Uint32Array(16)
function blake2sCompress (ctx, last) {
  var i = 0
  for (i = 0; i < 8; i++) { // init work variables
    v[i] = ctx.h[i]
    v[i + 8] = BLAKE2S_IV[i]
  }

  v[12] ^= ctx.t // low 32 bits of offset
  v[13] ^= (ctx.t / 0x100000000) // high 32 bits
  if (last) { // last block flag set ?
    v[14] = ~v[14]
  }

  for (i = 0; i < 16; i++) { // get little-endian words
    m[i] = B2S_GET32(ctx.b, 4 * i)
  }

  // ten rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 32)
  for (i = 0; i < 10; i++) {
    // util.debugPrint('   (i=' + i + ')  v[16]', v, 32)
    B2S_G(0, 4, 8, 12, m[SIGMA[i * 16 + 0]], m[SIGMA[i * 16 + 1]])
    B2S_G(1, 5, 9, 13, m[SIGMA[i * 16 + 2]], m[SIGMA[i * 16 + 3]])
    B2S_G(2, 6, 10, 14, m[SIGMA[i * 16 + 4]], m[SIGMA[i * 16 + 5]])
    B2S_G(3, 7, 11, 15, m[SIGMA[i * 16 + 6]], m[SIGMA[i * 16 + 7]])
    B2S_G(0, 5, 10, 15, m[SIGMA[i * 16 + 8]], m[SIGMA[i * 16 + 9]])
    B2S_G(1, 6, 11, 12, m[SIGMA[i * 16 + 10]], m[SIGMA[i * 16 + 11]])
    B2S_G(2, 7, 8, 13, m[SIGMA[i * 16 + 12]], m[SIGMA[i * 16 + 13]])
    B2S_G(3, 4, 9, 14, m[SIGMA[i * 16 + 14]], m[SIGMA[i * 16 + 15]])
  }
  // util.debugPrint('   (i=10) v[16]', v, 32)

  for (i = 0; i < 8; i++) {
    ctx.h[i] ^= v[i] ^ v[i + 8]
  }
  // util.debugPrint('h[8]', ctx.h, 32)
}

// Creates a BLAKE2s hashing context
// Requires an output length between 1 and 32 bytes
// Takes an optional Uint8Array key
function blake2sInit (outlen, key) {
  if (!(outlen > 0 && outlen <= 32)) {
    throw new Error('Incorrect output length, should be in [1, 32]')
  }
  var keylen = key ? key.length : 0
  if (key && !(keylen > 0 && keylen <= 32)) {
    throw new Error('Incorrect key length, should be in [1, 32]')
  }

  var ctx = {
    h: new Uint32Array(BLAKE2S_IV), // hash state
    b: new Uint32Array(64), // input block
    c: 0, // pointer within block
    t: 0, // input count
    outlen: outlen // output length in bytes
  }
  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen

  if (keylen > 0) {
    blake2sUpdate(ctx, key)
    ctx.c = 64 // at the end
  }

  return ctx
}

// Updates a BLAKE2s streaming hash
// Requires hash context and Uint8Array (byte array)
function blake2sUpdate (ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 64) { // buffer full ?
      ctx.t += ctx.c // add counters
      blake2sCompress(ctx, false) // compress (not last)
      ctx.c = 0 // counter to zero
    }
    ctx.b[ctx.c++] = input[i]
  }
}

// Completes a BLAKE2s streaming hash
// Returns a Uint8Array containing the message digest
function blake2sFinal (ctx) {
  ctx.t += ctx.c // mark last block offset
  while (ctx.c < 64) { // fill up with zeros
    ctx.b[ctx.c++] = 0
  }
  blake2sCompress(ctx, true) // final block flag = 1

  // little endian convert and store
  var out = new Uint8Array(ctx.outlen)
  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = (ctx.h[i >> 2] >> (8 * (i & 3))) & 0xFF
  }
  return out
}

// Computes the BLAKE2S hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64
function blake2s (input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 32
  input = util.normalizeInput(input)

  // do the math
  var ctx = blake2sInit(outlen, key)
  blake2sUpdate(ctx, input)
  return blake2sFinal(ctx)
}

// Computes the BLAKE2S hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64
function blake2sHex (input, key, outlen) {
  var output = blake2s(input, key, outlen)
  return util.toHex(output)
}

module.exports = {
  blake2s: blake2s,
  blake2sHex: blake2sHex,
  blake2sInit: blake2sInit,
  blake2sUpdate: blake2sUpdate,
  blake2sFinal: blake2sFinal
}


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const asn1 = __webpack_require__(66)

const util = __webpack_require__(277)
const toBase64 = util.toBase64
const toBn = util.toBn

const RSAPrivateKey = asn1.define('RSAPrivateKey', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('modulus').int(),
    this.key('publicExponent').int(),
    this.key('privateExponent').int(),
    this.key('prime1').int(),
    this.key('prime2').int(),
    this.key('exponent1').int(),
    this.key('exponent2').int(),
    this.key('coefficient').int()
  )
})

const AlgorithmIdentifier = asn1.define('AlgorithmIdentifier', function () {
  this.seq().obj(
    this.key('algorithm').objid({
      '1.2.840.113549.1.1.1': 'rsa'
    }),
    this.key('none').optional().null_(),
    this.key('curve').optional().objid(),
    this.key('params').optional().seq().obj(
      this.key('p').int(),
      this.key('q').int(),
      this.key('g').int()
    )
  )
})

const PublicKey = asn1.define('RSAPublicKey', function () {
  this.seq().obj(
    this.key('algorithm').use(AlgorithmIdentifier),
    this.key('subjectPublicKey').bitstr()
  )
})

const RSAPublicKey = asn1.define('RSAPublicKey', function () {
  this.seq().obj(
    this.key('modulus').int(),
    this.key('publicExponent').int()
  )
})

// Convert a PKCS#1 in ASN1 DER format to a JWK key
exports.pkcs1ToJwk = function (bytes) {
  const asn1 = RSAPrivateKey.decode(bytes, 'der')

  return {
    kty: 'RSA',
    n: toBase64(asn1.modulus),
    e: toBase64(asn1.publicExponent),
    d: toBase64(asn1.privateExponent),
    p: toBase64(asn1.prime1),
    q: toBase64(asn1.prime2),
    dp: toBase64(asn1.exponent1),
    dq: toBase64(asn1.exponent2),
    qi: toBase64(asn1.coefficient),
    alg: 'RS256',
    kid: '2011-04-29'
  }
}

// Convert a JWK key into PKCS#1 in ASN1 DER format
exports.jwkToPkcs1 = function (jwk) {
  return RSAPrivateKey.encode({
    version: 0,
    modulus: toBn(jwk.n),
    publicExponent: toBn(jwk.e),
    privateExponent: toBn(jwk.d),
    prime1: toBn(jwk.p),
    prime2: toBn(jwk.q),
    exponent1: toBn(jwk.dp),
    exponent2: toBn(jwk.dq),
    coefficient: toBn(jwk.qi)
  }, 'der')
}

// Convert a PKCIX in ASN1 DER format to a JWK key
exports.pkixToJwk = function (bytes) {
  const ndata = PublicKey.decode(bytes, 'der')
  const asn1 = RSAPublicKey.decode(ndata.subjectPublicKey.data, 'der')

  return {
    kty: 'RSA',
    n: toBase64(asn1.modulus),
    e: toBase64(asn1.publicExponent),
    alg: 'RS256',
    kid: '2011-04-29'
  }
}

// Convert a JWK key to PKCIX in ASN1 DER format
exports.jwkToPkix = function (jwk) {
  return PublicKey.encode({
    algorithm: {
      algorithm: 'rsa',
      none: null
    },
    subjectPublicKey: {
      data: RSAPublicKey.encode({
        modulus: toBn(jwk.n),
        publicExponent: toBn(jwk.e)
      }, 'der')
    }
  }, 'der')
}


/***/ }),
/* 409 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

var asn1 = __webpack_require__(66);
var inherits = __webpack_require__(7);

var api = exports;

api.define = function define(name, body) {
  return new Entity(name, body);
};

function Entity(name, body) {
  this.name = name;
  this.body = body;

  this.decoders = {};
  this.encoders = {};
};

Entity.prototype._createNamed = function createNamed(base) {
  var named;
  try {
    named = __webpack_require__(411).runInThisContext(
      '(function ' + this.name + '(entity) {\n' +
      '  this._initNamed(entity);\n' +
      '})'
    );
  } catch (e) {
    named = function (entity) {
      this._initNamed(entity);
    };
  }
  inherits(named, base);
  named.prototype._initNamed = function initnamed(entity) {
    base.call(this, entity);
  };

  return new named(this);
};

Entity.prototype._getDecoder = function _getDecoder(enc) {
  enc = enc || 'der';
  // Lazily create decoder
  if (!this.decoders.hasOwnProperty(enc))
    this.decoders[enc] = this._createNamed(asn1.decoders[enc]);
  return this.decoders[enc];
};

Entity.prototype.decode = function decode(data, enc, options) {
  return this._getDecoder(enc).decode(data, options);
};

Entity.prototype._getEncoder = function _getEncoder(enc) {
  enc = enc || 'der';
  // Lazily create encoder
  if (!this.encoders.hasOwnProperty(enc))
    this.encoders[enc] = this._createNamed(asn1.encoders[enc]);
  return this.encoders[enc];
};

Entity.prototype.encode = function encode(data, enc, /* internal */ reporter) {
  return this._getEncoder(enc).encode(data, reporter);
};


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var indexOf = __webpack_require__(351);

var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    forEach(Object_keys(ctx), function (key) {
        context[key] = ctx[key];
    });

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7);

function Reporter(options) {
  this._reporterState = {
    obj: null,
    path: [],
    options: options || {},
    errors: []
  };
}
exports.Reporter = Reporter;

Reporter.prototype.isError = function isError(obj) {
  return obj instanceof ReporterError;
};

Reporter.prototype.save = function save() {
  var state = this._reporterState;

  return { obj: state.obj, pathLen: state.path.length };
};

Reporter.prototype.restore = function restore(data) {
  var state = this._reporterState;

  state.obj = data.obj;
  state.path = state.path.slice(0, data.pathLen);
};

Reporter.prototype.enterKey = function enterKey(key) {
  return this._reporterState.path.push(key);
};

Reporter.prototype.exitKey = function exitKey(index) {
  var state = this._reporterState;

  state.path = state.path.slice(0, index - 1);
};

Reporter.prototype.leaveKey = function leaveKey(index, key, value) {
  var state = this._reporterState;

  this.exitKey(index);
  if (state.obj !== null)
    state.obj[key] = value;
};

Reporter.prototype.path = function path() {
  return this._reporterState.path.join('/');
};

Reporter.prototype.enterObject = function enterObject() {
  var state = this._reporterState;

  var prev = state.obj;
  state.obj = {};
  return prev;
};

Reporter.prototype.leaveObject = function leaveObject(prev) {
  var state = this._reporterState;

  var now = state.obj;
  state.obj = prev;
  return now;
};

Reporter.prototype.error = function error(msg) {
  var err;
  var state = this._reporterState;

  var inherited = msg instanceof ReporterError;
  if (inherited) {
    err = msg;
  } else {
    err = new ReporterError(state.path.map(function(elem) {
      return '[' + JSON.stringify(elem) + ']';
    }).join(''), msg.message || msg, msg.stack);
  }

  if (!state.options.partial)
    throw err;

  if (!inherited)
    state.errors.push(err);

  return err;
};

Reporter.prototype.wrapResult = function wrapResult(result) {
  var state = this._reporterState;
  if (!state.options.partial)
    return result;

  return {
    result: this.isError(result) ? null : result,
    errors: state.errors
  };
};

function ReporterError(path, msg) {
  this.path = path;
  this.rethrow(msg);
};
inherits(ReporterError, Error);

ReporterError.prototype.rethrow = function rethrow(msg) {
  this.message = msg + ' at: ' + (this.path || '(shallow)');
  if (Error.captureStackTrace)
    Error.captureStackTrace(this, ReporterError);

  if (!this.stack) {
    try {
      // IE only adds stack when thrown
      throw new Error(this.message);
    } catch (e) {
      this.stack = e.stack;
    }
  }
  return this;
};


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

var Reporter = __webpack_require__(71).Reporter;
var EncoderBuffer = __webpack_require__(71).EncoderBuffer;
var DecoderBuffer = __webpack_require__(71).DecoderBuffer;
var assert = __webpack_require__(346);

// Supported tags
var tags = [
  'seq', 'seqof', 'set', 'setof', 'objid', 'bool',
  'gentime', 'utctime', 'null_', 'enum', 'int', 'objDesc',
  'bitstr', 'bmpstr', 'charstr', 'genstr', 'graphstr', 'ia5str', 'iso646str',
  'numstr', 'octstr', 'printstr', 't61str', 'unistr', 'utf8str', 'videostr'
];

// Public methods list
var methods = [
  'key', 'obj', 'use', 'optional', 'explicit', 'implicit', 'def', 'choice',
  'any', 'contains'
].concat(tags);

// Overrided methods list
var overrided = [
  '_peekTag', '_decodeTag', '_use',
  '_decodeStr', '_decodeObjid', '_decodeTime',
  '_decodeNull', '_decodeInt', '_decodeBool', '_decodeList',

  '_encodeComposite', '_encodeStr', '_encodeObjid', '_encodeTime',
  '_encodeNull', '_encodeInt', '_encodeBool'
];

function Node(enc, parent) {
  var state = {};
  this._baseState = state;

  state.enc = enc;

  state.parent = parent || null;
  state.children = null;

  // State
  state.tag = null;
  state.args = null;
  state.reverseArgs = null;
  state.choice = null;
  state.optional = false;
  state.any = false;
  state.obj = false;
  state.use = null;
  state.useDecoder = null;
  state.key = null;
  state['default'] = null;
  state.explicit = null;
  state.implicit = null;
  state.contains = null;

  // Should create new instance on each method
  if (!state.parent) {
    state.children = [];
    this._wrap();
  }
}
module.exports = Node;

var stateProps = [
  'enc', 'parent', 'children', 'tag', 'args', 'reverseArgs', 'choice',
  'optional', 'any', 'obj', 'use', 'alteredUse', 'key', 'default', 'explicit',
  'implicit', 'contains'
];

Node.prototype.clone = function clone() {
  var state = this._baseState;
  var cstate = {};
  stateProps.forEach(function(prop) {
    cstate[prop] = state[prop];
  });
  var res = new this.constructor(cstate.parent);
  res._baseState = cstate;
  return res;
};

Node.prototype._wrap = function wrap() {
  var state = this._baseState;
  methods.forEach(function(method) {
    this[method] = function _wrappedMethod() {
      var clone = new this.constructor(this);
      state.children.push(clone);
      return clone[method].apply(clone, arguments);
    };
  }, this);
};

Node.prototype._init = function init(body) {
  var state = this._baseState;

  assert(state.parent === null);
  body.call(this);

  // Filter children
  state.children = state.children.filter(function(child) {
    return child._baseState.parent === this;
  }, this);
  assert.equal(state.children.length, 1, 'Root node can have only one child');
};

Node.prototype._useArgs = function useArgs(args) {
  var state = this._baseState;

  // Filter children and args
  var children = args.filter(function(arg) {
    return arg instanceof this.constructor;
  }, this);
  args = args.filter(function(arg) {
    return !(arg instanceof this.constructor);
  }, this);

  if (children.length !== 0) {
    assert(state.children === null);
    state.children = children;

    // Replace parent to maintain backward link
    children.forEach(function(child) {
      child._baseState.parent = this;
    }, this);
  }
  if (args.length !== 0) {
    assert(state.args === null);
    state.args = args;
    state.reverseArgs = args.map(function(arg) {
      if (typeof arg !== 'object' || arg.constructor !== Object)
        return arg;

      var res = {};
      Object.keys(arg).forEach(function(key) {
        if (key == (key | 0))
          key |= 0;
        var value = arg[key];
        res[value] = key;
      });
      return res;
    });
  }
};

//
// Overrided methods
//

overrided.forEach(function(method) {
  Node.prototype[method] = function _overrided() {
    var state = this._baseState;
    throw new Error(method + ' not implemented for encoding: ' + state.enc);
  };
});

//
// Public methods
//

tags.forEach(function(tag) {
  Node.prototype[tag] = function _tagMethod() {
    var state = this._baseState;
    var args = Array.prototype.slice.call(arguments);

    assert(state.tag === null);
    state.tag = tag;

    this._useArgs(args);

    return this;
  };
});

Node.prototype.use = function use(item) {
  assert(item);
  var state = this._baseState;

  assert(state.use === null);
  state.use = item;

  return this;
};

Node.prototype.optional = function optional() {
  var state = this._baseState;

  state.optional = true;

  return this;
};

Node.prototype.def = function def(val) {
  var state = this._baseState;

  assert(state['default'] === null);
  state['default'] = val;
  state.optional = true;

  return this;
};

Node.prototype.explicit = function explicit(num) {
  var state = this._baseState;

  assert(state.explicit === null && state.implicit === null);
  state.explicit = num;

  return this;
};

Node.prototype.implicit = function implicit(num) {
  var state = this._baseState;

  assert(state.explicit === null && state.implicit === null);
  state.implicit = num;

  return this;
};

Node.prototype.obj = function obj() {
  var state = this._baseState;
  var args = Array.prototype.slice.call(arguments);

  state.obj = true;

  if (args.length !== 0)
    this._useArgs(args);

  return this;
};

Node.prototype.key = function key(newKey) {
  var state = this._baseState;

  assert(state.key === null);
  state.key = newKey;

  return this;
};

Node.prototype.any = function any() {
  var state = this._baseState;

  state.any = true;

  return this;
};

Node.prototype.choice = function choice(obj) {
  var state = this._baseState;

  assert(state.choice === null);
  state.choice = obj;
  this._useArgs(Object.keys(obj).map(function(key) {
    return obj[key];
  }));

  return this;
};

Node.prototype.contains = function contains(item) {
  var state = this._baseState;

  assert(state.use === null);
  state.contains = item;

  return this;
};

//
// Decoding
//

Node.prototype._decode = function decode(input, options) {
  var state = this._baseState;

  // Decode root node
  if (state.parent === null)
    return input.wrapResult(state.children[0]._decode(input, options));

  var result = state['default'];
  var present = true;

  var prevKey = null;
  if (state.key !== null)
    prevKey = input.enterKey(state.key);

  // Check if tag is there
  if (state.optional) {
    var tag = null;
    if (state.explicit !== null)
      tag = state.explicit;
    else if (state.implicit !== null)
      tag = state.implicit;
    else if (state.tag !== null)
      tag = state.tag;

    if (tag === null && !state.any) {
      // Trial and Error
      var save = input.save();
      try {
        if (state.choice === null)
          this._decodeGeneric(state.tag, input, options);
        else
          this._decodeChoice(input, options);
        present = true;
      } catch (e) {
        present = false;
      }
      input.restore(save);
    } else {
      present = this._peekTag(input, tag, state.any);

      if (input.isError(present))
        return present;
    }
  }

  // Push object on stack
  var prevObj;
  if (state.obj && present)
    prevObj = input.enterObject();

  if (present) {
    // Unwrap explicit values
    if (state.explicit !== null) {
      var explicit = this._decodeTag(input, state.explicit);
      if (input.isError(explicit))
        return explicit;
      input = explicit;
    }

    var start = input.offset;

    // Unwrap implicit and normal values
    if (state.use === null && state.choice === null) {
      if (state.any)
        var save = input.save();
      var body = this._decodeTag(
        input,
        state.implicit !== null ? state.implicit : state.tag,
        state.any
      );
      if (input.isError(body))
        return body;

      if (state.any)
        result = input.raw(save);
      else
        input = body;
    }

    if (options && options.track && state.tag !== null)
      options.track(input.path(), start, input.length, 'tagged');

    if (options && options.track && state.tag !== null)
      options.track(input.path(), input.offset, input.length, 'content');

    // Select proper method for tag
    if (state.any)
      result = result;
    else if (state.choice === null)
      result = this._decodeGeneric(state.tag, input, options);
    else
      result = this._decodeChoice(input, options);

    if (input.isError(result))
      return result;

    // Decode children
    if (!state.any && state.choice === null && state.children !== null) {
      state.children.forEach(function decodeChildren(child) {
        // NOTE: We are ignoring errors here, to let parser continue with other
        // parts of encoded data
        child._decode(input, options);
      });
    }

    // Decode contained/encoded by schema, only in bit or octet strings
    if (state.contains && (state.tag === 'octstr' || state.tag === 'bitstr')) {
      var data = new DecoderBuffer(result);
      result = this._getUse(state.contains, input._reporterState.obj)
          ._decode(data, options);
    }
  }

  // Pop object
  if (state.obj && present)
    result = input.leaveObject(prevObj);

  // Set key
  if (state.key !== null && (result !== null || present === true))
    input.leaveKey(prevKey, state.key, result);
  else if (prevKey !== null)
    input.exitKey(prevKey);

  return result;
};

Node.prototype._decodeGeneric = function decodeGeneric(tag, input, options) {
  var state = this._baseState;

  if (tag === 'seq' || tag === 'set')
    return null;
  if (tag === 'seqof' || tag === 'setof')
    return this._decodeList(input, tag, state.args[0], options);
  else if (/str$/.test(tag))
    return this._decodeStr(input, tag, options);
  else if (tag === 'objid' && state.args)
    return this._decodeObjid(input, state.args[0], state.args[1], options);
  else if (tag === 'objid')
    return this._decodeObjid(input, null, null, options);
  else if (tag === 'gentime' || tag === 'utctime')
    return this._decodeTime(input, tag, options);
  else if (tag === 'null_')
    return this._decodeNull(input, options);
  else if (tag === 'bool')
    return this._decodeBool(input, options);
  else if (tag === 'objDesc')
    return this._decodeStr(input, tag, options);
  else if (tag === 'int' || tag === 'enum')
    return this._decodeInt(input, state.args && state.args[0], options);

  if (state.use !== null) {
    return this._getUse(state.use, input._reporterState.obj)
        ._decode(input, options);
  } else {
    return input.error('unknown tag: ' + tag);
  }
};

Node.prototype._getUse = function _getUse(entity, obj) {

  var state = this._baseState;
  // Create altered use decoder if implicit is set
  state.useDecoder = this._use(entity, obj);
  assert(state.useDecoder._baseState.parent === null);
  state.useDecoder = state.useDecoder._baseState.children[0];
  if (state.implicit !== state.useDecoder._baseState.implicit) {
    state.useDecoder = state.useDecoder.clone();
    state.useDecoder._baseState.implicit = state.implicit;
  }
  return state.useDecoder;
};

Node.prototype._decodeChoice = function decodeChoice(input, options) {
  var state = this._baseState;
  var result = null;
  var match = false;

  Object.keys(state.choice).some(function(key) {
    var save = input.save();
    var node = state.choice[key];
    try {
      var value = node._decode(input, options);
      if (input.isError(value))
        return false;

      result = { type: key, value: value };
      match = true;
    } catch (e) {
      input.restore(save);
      return false;
    }
    return true;
  }, this);

  if (!match)
    return input.error('Choice not matched');

  return result;
};

//
// Encoding
//

Node.prototype._createEncoderBuffer = function createEncoderBuffer(data) {
  return new EncoderBuffer(data, this.reporter);
};

Node.prototype._encode = function encode(data, reporter, parent) {
  var state = this._baseState;
  if (state['default'] !== null && state['default'] === data)
    return;

  var result = this._encodeValue(data, reporter, parent);
  if (result === undefined)
    return;

  if (this._skipDefault(result, reporter, parent))
    return;

  return result;
};

Node.prototype._encodeValue = function encode(data, reporter, parent) {
  var state = this._baseState;

  // Decode root node
  if (state.parent === null)
    return state.children[0]._encode(data, reporter || new Reporter());

  var result = null;

  // Set reporter to share it with a child class
  this.reporter = reporter;

  // Check if data is there
  if (state.optional && data === undefined) {
    if (state['default'] !== null)
      data = state['default']
    else
      return;
  }

  // Encode children first
  var content = null;
  var primitive = false;
  if (state.any) {
    // Anything that was given is translated to buffer
    result = this._createEncoderBuffer(data);
  } else if (state.choice) {
    result = this._encodeChoice(data, reporter);
  } else if (state.contains) {
    content = this._getUse(state.contains, parent)._encode(data, reporter);
    primitive = true;
  } else if (state.children) {
    content = state.children.map(function(child) {
      if (child._baseState.tag === 'null_')
        return child._encode(null, reporter, data);

      if (child._baseState.key === null)
        return reporter.error('Child should have a key');
      var prevKey = reporter.enterKey(child._baseState.key);

      if (typeof data !== 'object')
        return reporter.error('Child expected, but input is not object');

      var res = child._encode(data[child._baseState.key], reporter, data);
      reporter.leaveKey(prevKey);

      return res;
    }, this).filter(function(child) {
      return child;
    });
    content = this._createEncoderBuffer(content);
  } else {
    if (state.tag === 'seqof' || state.tag === 'setof') {
      // TODO(indutny): this should be thrown on DSL level
      if (!(state.args && state.args.length === 1))
        return reporter.error('Too many args for : ' + state.tag);

      if (!Array.isArray(data))
        return reporter.error('seqof/setof, but data is not Array');

      var child = this.clone();
      child._baseState.implicit = null;
      content = this._createEncoderBuffer(data.map(function(item) {
        var state = this._baseState;

        return this._getUse(state.args[0], data)._encode(item, reporter);
      }, child));
    } else if (state.use !== null) {
      result = this._getUse(state.use, parent)._encode(data, reporter);
    } else {
      content = this._encodePrimitive(state.tag, data);
      primitive = true;
    }
  }

  // Encode data itself
  var result;
  if (!state.any && state.choice === null) {
    var tag = state.implicit !== null ? state.implicit : state.tag;
    var cls = state.implicit === null ? 'universal' : 'context';

    if (tag === null) {
      if (state.use === null)
        reporter.error('Tag could be omitted only for .use()');
    } else {
      if (state.use === null)
        result = this._encodeComposite(tag, primitive, cls, content);
    }
  }

  // Wrap in explicit
  if (state.explicit !== null)
    result = this._encodeComposite(state.explicit, false, 'context', result);

  return result;
};

Node.prototype._encodeChoice = function encodeChoice(data, reporter) {
  var state = this._baseState;

  var node = state.choice[data.type];
  if (!node) {
    assert(
        false,
        data.type + ' not found in ' +
            JSON.stringify(Object.keys(state.choice)));
  }
  return node._encode(data.value, reporter);
};

Node.prototype._encodePrimitive = function encodePrimitive(tag, data) {
  var state = this._baseState;

  if (/str$/.test(tag))
    return this._encodeStr(data, tag);
  else if (tag === 'objid' && state.args)
    return this._encodeObjid(data, state.reverseArgs[0], state.args[1]);
  else if (tag === 'objid')
    return this._encodeObjid(data, null, null);
  else if (tag === 'gentime' || tag === 'utctime')
    return this._encodeTime(data, tag);
  else if (tag === 'null_')
    return this._encodeNull();
  else if (tag === 'int' || tag === 'enum')
    return this._encodeInt(data, state.args && state.reverseArgs[0]);
  else if (tag === 'bool')
    return this._encodeBool(data);
  else if (tag === 'objDesc')
    return this._encodeStr(data, tag);
  else
    throw new Error('Unsupported tag: ' + tag);
};

Node.prototype._isNumstr = function isNumstr(str) {
  return /^[0-9 ]*$/.test(str);
};

Node.prototype._isPrintstr = function isPrintstr(str) {
  return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(str);
};


/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var constants = __webpack_require__(274);

exports.tagClass = {
  0: 'universal',
  1: 'application',
  2: 'context',
  3: 'private'
};
exports.tagClassByName = constants._reverse(exports.tagClass);

exports.tag = {
  0x00: 'end',
  0x01: 'bool',
  0x02: 'int',
  0x03: 'bitstr',
  0x04: 'octstr',
  0x05: 'null_',
  0x06: 'objid',
  0x07: 'objDesc',
  0x08: 'external',
  0x09: 'real',
  0x0a: 'enum',
  0x0b: 'embed',
  0x0c: 'utf8str',
  0x0d: 'relativeOid',
  0x10: 'seq',
  0x11: 'set',
  0x12: 'numstr',
  0x13: 'printstr',
  0x14: 't61str',
  0x15: 'videostr',
  0x16: 'ia5str',
  0x17: 'utctime',
  0x18: 'gentime',
  0x19: 'graphstr',
  0x1a: 'iso646str',
  0x1b: 'genstr',
  0x1c: 'unistr',
  0x1d: 'charstr',
  0x1e: 'bmpstr'
};
exports.tagByName = constants._reverse(exports.tag);


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

var decoders = exports;

decoders.der = __webpack_require__(275);
decoders.pem = __webpack_require__(416);


/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7);
var Buffer = __webpack_require__(8).Buffer;

var DERDecoder = __webpack_require__(275);

function PEMDecoder(entity) {
  DERDecoder.call(this, entity);
  this.enc = 'pem';
};
inherits(PEMDecoder, DERDecoder);
module.exports = PEMDecoder;

PEMDecoder.prototype.decode = function decode(data, options) {
  var lines = data.toString().split(/[\r\n]+/g);

  var label = options.label.toUpperCase();

  var re = /^-----(BEGIN|END) ([^-]+)-----$/;
  var start = -1;
  var end = -1;
  for (var i = 0; i < lines.length; i++) {
    var match = lines[i].match(re);
    if (match === null)
      continue;

    if (match[2] !== label)
      continue;

    if (start === -1) {
      if (match[1] !== 'BEGIN')
        break;
      start = i;
    } else {
      if (match[1] !== 'END')
        break;
      end = i;
      break;
    }
  }
  if (start === -1 || end === -1)
    throw new Error('PEM section not found for: ' + label);

  var base64 = lines.slice(start + 1, end).join('');
  // Remove excessive symbols
  base64.replace(/[^a-z0-9\+\/=]+/gi, '');

  var input = new Buffer(base64, 'base64');
  return DERDecoder.prototype.decode.call(this, input, options);
};


/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

var encoders = exports;

encoders.der = __webpack_require__(276);
encoders.pem = __webpack_require__(418);


/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7);

var DEREncoder = __webpack_require__(276);

function PEMEncoder(entity) {
  DEREncoder.call(this, entity);
  this.enc = 'pem';
};
inherits(PEMEncoder, DEREncoder);
module.exports = PEMEncoder;

PEMEncoder.prototype.encode = function encode(data, options) {
  var buf = DEREncoder.prototype.encode.call(this, data);

  var p = buf.toString('base64');
  var out = [ '-----BEGIN ' + options.label + '-----' ];
  for (var i = 0; i < p.length; i += 64)
    out.push(p.slice(i, i + 64));
  out.push('-----END ' + options.label + '-----');
  return out.join('\n');
};


/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const multihashing = __webpack_require__(109)
const protobuf = __webpack_require__(130)

const crypto = __webpack_require__(420)
const pbm = protobuf(__webpack_require__(138))

class Ed25519PublicKey {
  constructor (key) {
    this._key = ensureKey(key, crypto.publicKeyLength)
  }

  verify (data, sig, callback) {
    ensure(callback)
    crypto.hashAndVerify(this._key, sig, data, callback)
  }

  marshal () {
    return Buffer.from(this._key)
  }

  get bytes () {
    return pbm.PublicKey.encode({
      Type: pbm.KeyType.Ed25519,
      Data: this.marshal()
    })
  }

  equals (key) {
    return this.bytes.equals(key.bytes)
  }

  hash (callback) {
    ensure(callback)
    multihashing(this.bytes, 'sha2-256', callback)
  }
}

class Ed25519PrivateKey {
  // key       - 64 byte Uint8Array or Buffer containing private key
  // publicKey - 32 byte Uint8Array or Buffer containing public key
  constructor (key, publicKey) {
    this._key = ensureKey(key, crypto.privateKeyLength)
    this._publicKey = ensureKey(publicKey, crypto.publicKeyLength)
  }

  sign (message, callback) {
    ensure(callback)
    crypto.hashAndSign(this._key, message, callback)
  }

  get public () {
    if (!this._publicKey) {
      throw new Error('public key not provided')
    }

    return new Ed25519PublicKey(this._publicKey)
  }

  marshal () {
    return Buffer.concat([Buffer.from(this._key), Buffer.from(this._publicKey)])
  }

  get bytes () {
    return pbm.PrivateKey.encode({
      Type: pbm.KeyType.Ed25519,
      Data: this.marshal()
    })
  }

  equals (key) {
    return this.bytes.equals(key.bytes)
  }

  hash (callback) {
    ensure(callback)
    multihashing(this.bytes, 'sha2-256', callback)
  }
}

function unmarshalEd25519PrivateKey (bytes, callback) {
  try {
    bytes = ensureKey(bytes, crypto.privateKeyLength + crypto.publicKeyLength)
  } catch (err) {
    return callback(err)
  }
  const privateKeyBytes = bytes.slice(0, crypto.privateKeyLength)
  const publicKeyBytes = bytes.slice(crypto.privateKeyLength, bytes.length)
  callback(null, new Ed25519PrivateKey(privateKeyBytes, publicKeyBytes))
}

function unmarshalEd25519PublicKey (bytes) {
  bytes = ensureKey(bytes, crypto.publicKeyLength)
  return new Ed25519PublicKey(bytes)
}

function generateKeyPair (_bits, cb) {
  if (cb === undefined && typeof _bits === 'function') {
    cb = _bits
  }

  crypto.generateKey((err, keys) => {
    if (err) {
      return cb(err)
    }
    let privkey
    try {
      privkey = new Ed25519PrivateKey(keys.secretKey, keys.publicKey)
    } catch (err) {
      cb(err)
      return
    }

    cb(null, privkey)
  })
}

function generateKeyPairFromSeed (seed, _bits, cb) {
  if (cb === undefined && typeof _bits === 'function') {
    cb = _bits
  }

  crypto.generateKeyFromSeed(seed, (err, keys) => {
    if (err) {
      return cb(err)
    }
    let privkey
    try {
      privkey = new Ed25519PrivateKey(keys.secretKey, keys.publicKey)
    } catch (err) {
      cb(err)
      return
    }

    cb(null, privkey)
  })
}

function ensure (cb) {
  if (typeof cb !== 'function') {
    throw new Error('callback is required')
  }
}

function ensureKey (key, length) {
  if (Buffer.isBuffer(key)) {
    key = new Uint8Array(key)
  }
  if (!(key instanceof Uint8Array) || key.length !== length) {
    throw new Error('Key must be a Uint8Array or Buffer of length ' + length)
  }
  return key
}

module.exports = {
  Ed25519PublicKey,
  Ed25519PrivateKey,
  unmarshalEd25519PrivateKey,
  unmarshalEd25519PublicKey,
  generateKeyPair,
  generateKeyPairFromSeed
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const nacl = __webpack_require__(421)
const setImmediate = __webpack_require__(126)

exports.publicKeyLength = nacl.sign.publicKeyLength
exports.privateKeyLength = nacl.sign.secretKeyLength

exports.generateKey = function (callback) {
  const done = (err, res) => setImmediate(() => {
    callback(err, res)
  })

  let keys
  try {
    keys = nacl.sign.keyPair()
  } catch (err) {
    return done(err)
  }
  done(null, keys)
}

// seed should be a 32 byte uint8array
exports.generateKeyFromSeed = function (seed, callback) {
  const done = (err, res) => setImmediate(() => callback(err, res))

  let keys
  try {
    keys = nacl.sign.keyPair.fromSeed(seed)
  } catch (err) {
    return done(err)
  }
  done(null, keys)
}

exports.hashAndSign = function (key, msg, callback) {
  setImmediate(() => {
    callback(null, Buffer.from(nacl.sign.detached(msg, key)))
  })
}

exports.hashAndVerify = function (key, sig, msg, callback) {
  setImmediate(() => {
    callback(null, nacl.sign.detached.verify(msg, sig, key))
  })
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

(function(nacl) {
'use strict';

// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

var gf = function(init) {
  var i, r = new Float64Array(16);
  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
  return r;
};

//  Pluggable, initialized in high-level API below.
var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

var _0 = new Uint8Array(16);
var _9 = new Uint8Array(32); _9[0] = 9;

var gf0 = gf(),
    gf1 = gf([1]),
    _121665 = gf([0xdb41, 1]),
    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function ts64(x, i, h, l) {
  x[i]   = (h >> 24) & 0xff;
  x[i+1] = (h >> 16) & 0xff;
  x[i+2] = (h >>  8) & 0xff;
  x[i+3] = h & 0xff;
  x[i+4] = (l >> 24)  & 0xff;
  x[i+5] = (l >> 16)  & 0xff;
  x[i+6] = (l >>  8)  & 0xff;
  x[i+7] = l & 0xff;
}

function vn(x, xi, y, yi, n) {
  var i,d = 0;
  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
  return (1 & ((d - 1) >>> 8)) - 1;
}

function crypto_verify_16(x, xi, y, yi) {
  return vn(x,xi,y,yi,16);
}

function crypto_verify_32(x, xi, y, yi) {
  return vn(x,xi,y,yi,32);
}

function core_salsa20(o, p, k, c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }
   x0 =  x0 +  j0 | 0;
   x1 =  x1 +  j1 | 0;
   x2 =  x2 +  j2 | 0;
   x3 =  x3 +  j3 | 0;
   x4 =  x4 +  j4 | 0;
   x5 =  x5 +  j5 | 0;
   x6 =  x6 +  j6 | 0;
   x7 =  x7 +  j7 | 0;
   x8 =  x8 +  j8 | 0;
   x9 =  x9 +  j9 | 0;
  x10 = x10 + j10 | 0;
  x11 = x11 + j11 | 0;
  x12 = x12 + j12 | 0;
  x13 = x13 + j13 | 0;
  x14 = x14 + j14 | 0;
  x15 = x15 + j15 | 0;

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x1 >>>  0 & 0xff;
  o[ 5] = x1 >>>  8 & 0xff;
  o[ 6] = x1 >>> 16 & 0xff;
  o[ 7] = x1 >>> 24 & 0xff;

  o[ 8] = x2 >>>  0 & 0xff;
  o[ 9] = x2 >>>  8 & 0xff;
  o[10] = x2 >>> 16 & 0xff;
  o[11] = x2 >>> 24 & 0xff;

  o[12] = x3 >>>  0 & 0xff;
  o[13] = x3 >>>  8 & 0xff;
  o[14] = x3 >>> 16 & 0xff;
  o[15] = x3 >>> 24 & 0xff;

  o[16] = x4 >>>  0 & 0xff;
  o[17] = x4 >>>  8 & 0xff;
  o[18] = x4 >>> 16 & 0xff;
  o[19] = x4 >>> 24 & 0xff;

  o[20] = x5 >>>  0 & 0xff;
  o[21] = x5 >>>  8 & 0xff;
  o[22] = x5 >>> 16 & 0xff;
  o[23] = x5 >>> 24 & 0xff;

  o[24] = x6 >>>  0 & 0xff;
  o[25] = x6 >>>  8 & 0xff;
  o[26] = x6 >>> 16 & 0xff;
  o[27] = x6 >>> 24 & 0xff;

  o[28] = x7 >>>  0 & 0xff;
  o[29] = x7 >>>  8 & 0xff;
  o[30] = x7 >>> 16 & 0xff;
  o[31] = x7 >>> 24 & 0xff;

  o[32] = x8 >>>  0 & 0xff;
  o[33] = x8 >>>  8 & 0xff;
  o[34] = x8 >>> 16 & 0xff;
  o[35] = x8 >>> 24 & 0xff;

  o[36] = x9 >>>  0 & 0xff;
  o[37] = x9 >>>  8 & 0xff;
  o[38] = x9 >>> 16 & 0xff;
  o[39] = x9 >>> 24 & 0xff;

  o[40] = x10 >>>  0 & 0xff;
  o[41] = x10 >>>  8 & 0xff;
  o[42] = x10 >>> 16 & 0xff;
  o[43] = x10 >>> 24 & 0xff;

  o[44] = x11 >>>  0 & 0xff;
  o[45] = x11 >>>  8 & 0xff;
  o[46] = x11 >>> 16 & 0xff;
  o[47] = x11 >>> 24 & 0xff;

  o[48] = x12 >>>  0 & 0xff;
  o[49] = x12 >>>  8 & 0xff;
  o[50] = x12 >>> 16 & 0xff;
  o[51] = x12 >>> 24 & 0xff;

  o[52] = x13 >>>  0 & 0xff;
  o[53] = x13 >>>  8 & 0xff;
  o[54] = x13 >>> 16 & 0xff;
  o[55] = x13 >>> 24 & 0xff;

  o[56] = x14 >>>  0 & 0xff;
  o[57] = x14 >>>  8 & 0xff;
  o[58] = x14 >>> 16 & 0xff;
  o[59] = x14 >>> 24 & 0xff;

  o[60] = x15 >>>  0 & 0xff;
  o[61] = x15 >>>  8 & 0xff;
  o[62] = x15 >>> 16 & 0xff;
  o[63] = x15 >>> 24 & 0xff;
}

function core_hsalsa20(o,p,k,c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x5 >>>  0 & 0xff;
  o[ 5] = x5 >>>  8 & 0xff;
  o[ 6] = x5 >>> 16 & 0xff;
  o[ 7] = x5 >>> 24 & 0xff;

  o[ 8] = x10 >>>  0 & 0xff;
  o[ 9] = x10 >>>  8 & 0xff;
  o[10] = x10 >>> 16 & 0xff;
  o[11] = x10 >>> 24 & 0xff;

  o[12] = x15 >>>  0 & 0xff;
  o[13] = x15 >>>  8 & 0xff;
  o[14] = x15 >>> 16 & 0xff;
  o[15] = x15 >>> 24 & 0xff;

  o[16] = x6 >>>  0 & 0xff;
  o[17] = x6 >>>  8 & 0xff;
  o[18] = x6 >>> 16 & 0xff;
  o[19] = x6 >>> 24 & 0xff;

  o[20] = x7 >>>  0 & 0xff;
  o[21] = x7 >>>  8 & 0xff;
  o[22] = x7 >>> 16 & 0xff;
  o[23] = x7 >>> 24 & 0xff;

  o[24] = x8 >>>  0 & 0xff;
  o[25] = x8 >>>  8 & 0xff;
  o[26] = x8 >>> 16 & 0xff;
  o[27] = x8 >>> 24 & 0xff;

  o[28] = x9 >>>  0 & 0xff;
  o[29] = x9 >>>  8 & 0xff;
  o[30] = x9 >>> 16 & 0xff;
  o[31] = x9 >>> 24 & 0xff;
}

function crypto_core_salsa20(out,inp,k,c) {
  core_salsa20(out,inp,k,c);
}

function crypto_core_hsalsa20(out,inp,k,c) {
  core_hsalsa20(out,inp,k,c);
}

var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
            // "expand 32-byte k"

function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
    mpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
  }
  return 0;
}

function crypto_stream_salsa20(c,cpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = x[i];
  }
  return 0;
}

function crypto_stream(c,cpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20(c,cpos,d,sn,s);
}

function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
}

/*
* Port of Andrew Moon's Poly1305-donna-16. Public domain.
* https://github.com/floodyberry/poly1305-donna
*/

var poly1305 = function(key) {
  this.buffer = new Uint8Array(16);
  this.r = new Uint16Array(10);
  this.h = new Uint16Array(10);
  this.pad = new Uint16Array(8);
  this.leftover = 0;
  this.fin = 0;

  var t0, t1, t2, t3, t4, t5, t6, t7;

  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
  this.r[9] = ((t7 >>>  5)) & 0x007f;

  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
};

poly1305.prototype.blocks = function(m, mpos, bytes) {
  var hibit = this.fin ? 0 : (1 << 11);
  var t0, t1, t2, t3, t4, t5, t6, t7, c;
  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

  var h0 = this.h[0],
      h1 = this.h[1],
      h2 = this.h[2],
      h3 = this.h[3],
      h4 = this.h[4],
      h5 = this.h[5],
      h6 = this.h[6],
      h7 = this.h[7],
      h8 = this.h[8],
      h9 = this.h[9];

  var r0 = this.r[0],
      r1 = this.r[1],
      r2 = this.r[2],
      r3 = this.r[3],
      r4 = this.r[4],
      r5 = this.r[5],
      r6 = this.r[6],
      r7 = this.r[7],
      r8 = this.r[8],
      r9 = this.r[9];

  while (bytes >= 16) {
    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
    h5 += ((t4 >>>  1)) & 0x1fff;
    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
    h9 += ((t7 >>> 5)) | hibit;

    c = 0;

    d0 = c;
    d0 += h0 * r0;
    d0 += h1 * (5 * r9);
    d0 += h2 * (5 * r8);
    d0 += h3 * (5 * r7);
    d0 += h4 * (5 * r6);
    c = (d0 >>> 13); d0 &= 0x1fff;
    d0 += h5 * (5 * r5);
    d0 += h6 * (5 * r4);
    d0 += h7 * (5 * r3);
    d0 += h8 * (5 * r2);
    d0 += h9 * (5 * r1);
    c += (d0 >>> 13); d0 &= 0x1fff;

    d1 = c;
    d1 += h0 * r1;
    d1 += h1 * r0;
    d1 += h2 * (5 * r9);
    d1 += h3 * (5 * r8);
    d1 += h4 * (5 * r7);
    c = (d1 >>> 13); d1 &= 0x1fff;
    d1 += h5 * (5 * r6);
    d1 += h6 * (5 * r5);
    d1 += h7 * (5 * r4);
    d1 += h8 * (5 * r3);
    d1 += h9 * (5 * r2);
    c += (d1 >>> 13); d1 &= 0x1fff;

    d2 = c;
    d2 += h0 * r2;
    d2 += h1 * r1;
    d2 += h2 * r0;
    d2 += h3 * (5 * r9);
    d2 += h4 * (5 * r8);
    c = (d2 >>> 13); d2 &= 0x1fff;
    d2 += h5 * (5 * r7);
    d2 += h6 * (5 * r6);
    d2 += h7 * (5 * r5);
    d2 += h8 * (5 * r4);
    d2 += h9 * (5 * r3);
    c += (d2 >>> 13); d2 &= 0x1fff;

    d3 = c;
    d3 += h0 * r3;
    d3 += h1 * r2;
    d3 += h2 * r1;
    d3 += h3 * r0;
    d3 += h4 * (5 * r9);
    c = (d3 >>> 13); d3 &= 0x1fff;
    d3 += h5 * (5 * r8);
    d3 += h6 * (5 * r7);
    d3 += h7 * (5 * r6);
    d3 += h8 * (5 * r5);
    d3 += h9 * (5 * r4);
    c += (d3 >>> 13); d3 &= 0x1fff;

    d4 = c;
    d4 += h0 * r4;
    d4 += h1 * r3;
    d4 += h2 * r2;
    d4 += h3 * r1;
    d4 += h4 * r0;
    c = (d4 >>> 13); d4 &= 0x1fff;
    d4 += h5 * (5 * r9);
    d4 += h6 * (5 * r8);
    d4 += h7 * (5 * r7);
    d4 += h8 * (5 * r6);
    d4 += h9 * (5 * r5);
    c += (d4 >>> 13); d4 &= 0x1fff;

    d5 = c;
    d5 += h0 * r5;
    d5 += h1 * r4;
    d5 += h2 * r3;
    d5 += h3 * r2;
    d5 += h4 * r1;
    c = (d5 >>> 13); d5 &= 0x1fff;
    d5 += h5 * r0;
    d5 += h6 * (5 * r9);
    d5 += h7 * (5 * r8);
    d5 += h8 * (5 * r7);
    d5 += h9 * (5 * r6);
    c += (d5 >>> 13); d5 &= 0x1fff;

    d6 = c;
    d6 += h0 * r6;
    d6 += h1 * r5;
    d6 += h2 * r4;
    d6 += h3 * r3;
    d6 += h4 * r2;
    c = (d6 >>> 13); d6 &= 0x1fff;
    d6 += h5 * r1;
    d6 += h6 * r0;
    d6 += h7 * (5 * r9);
    d6 += h8 * (5 * r8);
    d6 += h9 * (5 * r7);
    c += (d6 >>> 13); d6 &= 0x1fff;

    d7 = c;
    d7 += h0 * r7;
    d7 += h1 * r6;
    d7 += h2 * r5;
    d7 += h3 * r4;
    d7 += h4 * r3;
    c = (d7 >>> 13); d7 &= 0x1fff;
    d7 += h5 * r2;
    d7 += h6 * r1;
    d7 += h7 * r0;
    d7 += h8 * (5 * r9);
    d7 += h9 * (5 * r8);
    c += (d7 >>> 13); d7 &= 0x1fff;

    d8 = c;
    d8 += h0 * r8;
    d8 += h1 * r7;
    d8 += h2 * r6;
    d8 += h3 * r5;
    d8 += h4 * r4;
    c = (d8 >>> 13); d8 &= 0x1fff;
    d8 += h5 * r3;
    d8 += h6 * r2;
    d8 += h7 * r1;
    d8 += h8 * r0;
    d8 += h9 * (5 * r9);
    c += (d8 >>> 13); d8 &= 0x1fff;

    d9 = c;
    d9 += h0 * r9;
    d9 += h1 * r8;
    d9 += h2 * r7;
    d9 += h3 * r6;
    d9 += h4 * r5;
    c = (d9 >>> 13); d9 &= 0x1fff;
    d9 += h5 * r4;
    d9 += h6 * r3;
    d9 += h7 * r2;
    d9 += h8 * r1;
    d9 += h9 * r0;
    c += (d9 >>> 13); d9 &= 0x1fff;

    c = (((c << 2) + c)) | 0;
    c = (c + d0) | 0;
    d0 = c & 0x1fff;
    c = (c >>> 13);
    d1 += c;

    h0 = d0;
    h1 = d1;
    h2 = d2;
    h3 = d3;
    h4 = d4;
    h5 = d5;
    h6 = d6;
    h7 = d7;
    h8 = d8;
    h9 = d9;

    mpos += 16;
    bytes -= 16;
  }
  this.h[0] = h0;
  this.h[1] = h1;
  this.h[2] = h2;
  this.h[3] = h3;
  this.h[4] = h4;
  this.h[5] = h5;
  this.h[6] = h6;
  this.h[7] = h7;
  this.h[8] = h8;
  this.h[9] = h9;
};

poly1305.prototype.finish = function(mac, macpos) {
  var g = new Uint16Array(10);
  var c, mask, f, i;

  if (this.leftover) {
    i = this.leftover;
    this.buffer[i++] = 1;
    for (; i < 16; i++) this.buffer[i] = 0;
    this.fin = 1;
    this.blocks(this.buffer, 0, 16);
  }

  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  for (i = 2; i < 10; i++) {
    this.h[i] += c;
    c = this.h[i] >>> 13;
    this.h[i] &= 0x1fff;
  }
  this.h[0] += (c * 5);
  c = this.h[0] >>> 13;
  this.h[0] &= 0x1fff;
  this.h[1] += c;
  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  this.h[2] += c;

  g[0] = this.h[0] + 5;
  c = g[0] >>> 13;
  g[0] &= 0x1fff;
  for (i = 1; i < 10; i++) {
    g[i] = this.h[i] + c;
    c = g[i] >>> 13;
    g[i] &= 0x1fff;
  }
  g[9] -= (1 << 13);

  mask = (c ^ 1) - 1;
  for (i = 0; i < 10; i++) g[i] &= mask;
  mask = ~mask;
  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

  f = this.h[0] + this.pad[0];
  this.h[0] = f & 0xffff;
  for (i = 1; i < 8; i++) {
    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
    this.h[i] = f & 0xffff;
  }

  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
};

poly1305.prototype.update = function(m, mpos, bytes) {
  var i, want;

  if (this.leftover) {
    want = (16 - this.leftover);
    if (want > bytes)
      want = bytes;
    for (i = 0; i < want; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    bytes -= want;
    mpos += want;
    this.leftover += want;
    if (this.leftover < 16)
      return;
    this.blocks(this.buffer, 0, 16);
    this.leftover = 0;
  }

  if (bytes >= 16) {
    want = bytes - (bytes % 16);
    this.blocks(m, mpos, want);
    mpos += want;
    bytes -= want;
  }

  if (bytes) {
    for (i = 0; i < bytes; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    this.leftover += bytes;
  }
};

function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  var s = new poly1305(k);
  s.update(m, mpos, n);
  s.finish(out, outpos);
  return 0;
}

function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  var x = new Uint8Array(16);
  crypto_onetimeauth(x,0,m,mpos,n,k);
  return crypto_verify_16(h,hpos,x,0);
}

function crypto_secretbox(c,m,d,n,k) {
  var i;
  if (d < 32) return -1;
  crypto_stream_xor(c,0,m,0,d,n,k);
  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  for (i = 0; i < 16; i++) c[i] = 0;
  return 0;
}

function crypto_secretbox_open(m,c,d,n,k) {
  var i;
  var x = new Uint8Array(32);
  if (d < 32) return -1;
  crypto_stream(x,0,32,n,k);
  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
  crypto_stream_xor(m,0,c,0,d,n,k);
  for (i = 0; i < 32; i++) m[i] = 0;
  return 0;
}

function set25519(r, a) {
  var i;
  for (i = 0; i < 16; i++) r[i] = a[i]|0;
}

function car25519(o) {
  var i, v, c = 1;
  for (i = 0; i < 16; i++) {
    v = o[i] + c + 65535;
    c = Math.floor(v / 65536);
    o[i] = v - c * 65536;
  }
  o[0] += c-1 + 37 * (c-1);
}

function sel25519(p, q, b) {
  var t, c = ~(b-1);
  for (var i = 0; i < 16; i++) {
    t = c & (p[i] ^ q[i]);
    p[i] ^= t;
    q[i] ^= t;
  }
}

function pack25519(o, n) {
  var i, j, b;
  var m = gf(), t = gf();
  for (i = 0; i < 16; i++) t[i] = n[i];
  car25519(t);
  car25519(t);
  car25519(t);
  for (j = 0; j < 2; j++) {
    m[0] = t[0] - 0xffed;
    for (i = 1; i < 15; i++) {
      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
      m[i-1] &= 0xffff;
    }
    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
    b = (m[15]>>16) & 1;
    m[14] &= 0xffff;
    sel25519(t, m, 1-b);
  }
  for (i = 0; i < 16; i++) {
    o[2*i] = t[i] & 0xff;
    o[2*i+1] = t[i]>>8;
  }
}

function neq25519(a, b) {
  var c = new Uint8Array(32), d = new Uint8Array(32);
  pack25519(c, a);
  pack25519(d, b);
  return crypto_verify_32(c, 0, d, 0);
}

function par25519(a) {
  var d = new Uint8Array(32);
  pack25519(d, a);
  return d[0] & 1;
}

function unpack25519(o, n) {
  var i;
  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
  o[15] &= 0x7fff;
}

function A(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
}

function Z(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
}

function M(o, a, b) {
  var v, c,
     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11],
    b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];

  v = a[0];
  t0 += v * b0;
  t1 += v * b1;
  t2 += v * b2;
  t3 += v * b3;
  t4 += v * b4;
  t5 += v * b5;
  t6 += v * b6;
  t7 += v * b7;
  t8 += v * b8;
  t9 += v * b9;
  t10 += v * b10;
  t11 += v * b11;
  t12 += v * b12;
  t13 += v * b13;
  t14 += v * b14;
  t15 += v * b15;
  v = a[1];
  t1 += v * b0;
  t2 += v * b1;
  t3 += v * b2;
  t4 += v * b3;
  t5 += v * b4;
  t6 += v * b5;
  t7 += v * b6;
  t8 += v * b7;
  t9 += v * b8;
  t10 += v * b9;
  t11 += v * b10;
  t12 += v * b11;
  t13 += v * b12;
  t14 += v * b13;
  t15 += v * b14;
  t16 += v * b15;
  v = a[2];
  t2 += v * b0;
  t3 += v * b1;
  t4 += v * b2;
  t5 += v * b3;
  t6 += v * b4;
  t7 += v * b5;
  t8 += v * b6;
  t9 += v * b7;
  t10 += v * b8;
  t11 += v * b9;
  t12 += v * b10;
  t13 += v * b11;
  t14 += v * b12;
  t15 += v * b13;
  t16 += v * b14;
  t17 += v * b15;
  v = a[3];
  t3 += v * b0;
  t4 += v * b1;
  t5 += v * b2;
  t6 += v * b3;
  t7 += v * b4;
  t8 += v * b5;
  t9 += v * b6;
  t10 += v * b7;
  t11 += v * b8;
  t12 += v * b9;
  t13 += v * b10;
  t14 += v * b11;
  t15 += v * b12;
  t16 += v * b13;
  t17 += v * b14;
  t18 += v * b15;
  v = a[4];
  t4 += v * b0;
  t5 += v * b1;
  t6 += v * b2;
  t7 += v * b3;
  t8 += v * b4;
  t9 += v * b5;
  t10 += v * b6;
  t11 += v * b7;
  t12 += v * b8;
  t13 += v * b9;
  t14 += v * b10;
  t15 += v * b11;
  t16 += v * b12;
  t17 += v * b13;
  t18 += v * b14;
  t19 += v * b15;
  v = a[5];
  t5 += v * b0;
  t6 += v * b1;
  t7 += v * b2;
  t8 += v * b3;
  t9 += v * b4;
  t10 += v * b5;
  t11 += v * b6;
  t12 += v * b7;
  t13 += v * b8;
  t14 += v * b9;
  t15 += v * b10;
  t16 += v * b11;
  t17 += v * b12;
  t18 += v * b13;
  t19 += v * b14;
  t20 += v * b15;
  v = a[6];
  t6 += v * b0;
  t7 += v * b1;
  t8 += v * b2;
  t9 += v * b3;
  t10 += v * b4;
  t11 += v * b5;
  t12 += v * b6;
  t13 += v * b7;
  t14 += v * b8;
  t15 += v * b9;
  t16 += v * b10;
  t17 += v * b11;
  t18 += v * b12;
  t19 += v * b13;
  t20 += v * b14;
  t21 += v * b15;
  v = a[7];
  t7 += v * b0;
  t8 += v * b1;
  t9 += v * b2;
  t10 += v * b3;
  t11 += v * b4;
  t12 += v * b5;
  t13 += v * b6;
  t14 += v * b7;
  t15 += v * b8;
  t16 += v * b9;
  t17 += v * b10;
  t18 += v * b11;
  t19 += v * b12;
  t20 += v * b13;
  t21 += v * b14;
  t22 += v * b15;
  v = a[8];
  t8 += v * b0;
  t9 += v * b1;
  t10 += v * b2;
  t11 += v * b3;
  t12 += v * b4;
  t13 += v * b5;
  t14 += v * b6;
  t15 += v * b7;
  t16 += v * b8;
  t17 += v * b9;
  t18 += v * b10;
  t19 += v * b11;
  t20 += v * b12;
  t21 += v * b13;
  t22 += v * b14;
  t23 += v * b15;
  v = a[9];
  t9 += v * b0;
  t10 += v * b1;
  t11 += v * b2;
  t12 += v * b3;
  t13 += v * b4;
  t14 += v * b5;
  t15 += v * b6;
  t16 += v * b7;
  t17 += v * b8;
  t18 += v * b9;
  t19 += v * b10;
  t20 += v * b11;
  t21 += v * b12;
  t22 += v * b13;
  t23 += v * b14;
  t24 += v * b15;
  v = a[10];
  t10 += v * b0;
  t11 += v * b1;
  t12 += v * b2;
  t13 += v * b3;
  t14 += v * b4;
  t15 += v * b5;
  t16 += v * b6;
  t17 += v * b7;
  t18 += v * b8;
  t19 += v * b9;
  t20 += v * b10;
  t21 += v * b11;
  t22 += v * b12;
  t23 += v * b13;
  t24 += v * b14;
  t25 += v * b15;
  v = a[11];
  t11 += v * b0;
  t12 += v * b1;
  t13 += v * b2;
  t14 += v * b3;
  t15 += v * b4;
  t16 += v * b5;
  t17 += v * b6;
  t18 += v * b7;
  t19 += v * b8;
  t20 += v * b9;
  t21 += v * b10;
  t22 += v * b11;
  t23 += v * b12;
  t24 += v * b13;
  t25 += v * b14;
  t26 += v * b15;
  v = a[12];
  t12 += v * b0;
  t13 += v * b1;
  t14 += v * b2;
  t15 += v * b3;
  t16 += v * b4;
  t17 += v * b5;
  t18 += v * b6;
  t19 += v * b7;
  t20 += v * b8;
  t21 += v * b9;
  t22 += v * b10;
  t23 += v * b11;
  t24 += v * b12;
  t25 += v * b13;
  t26 += v * b14;
  t27 += v * b15;
  v = a[13];
  t13 += v * b0;
  t14 += v * b1;
  t15 += v * b2;
  t16 += v * b3;
  t17 += v * b4;
  t18 += v * b5;
  t19 += v * b6;
  t20 += v * b7;
  t21 += v * b8;
  t22 += v * b9;
  t23 += v * b10;
  t24 += v * b11;
  t25 += v * b12;
  t26 += v * b13;
  t27 += v * b14;
  t28 += v * b15;
  v = a[14];
  t14 += v * b0;
  t15 += v * b1;
  t16 += v * b2;
  t17 += v * b3;
  t18 += v * b4;
  t19 += v * b5;
  t20 += v * b6;
  t21 += v * b7;
  t22 += v * b8;
  t23 += v * b9;
  t24 += v * b10;
  t25 += v * b11;
  t26 += v * b12;
  t27 += v * b13;
  t28 += v * b14;
  t29 += v * b15;
  v = a[15];
  t15 += v * b0;
  t16 += v * b1;
  t17 += v * b2;
  t18 += v * b3;
  t19 += v * b4;
  t20 += v * b5;
  t21 += v * b6;
  t22 += v * b7;
  t23 += v * b8;
  t24 += v * b9;
  t25 += v * b10;
  t26 += v * b11;
  t27 += v * b12;
  t28 += v * b13;
  t29 += v * b14;
  t30 += v * b15;

  t0  += 38 * t16;
  t1  += 38 * t17;
  t2  += 38 * t18;
  t3  += 38 * t19;
  t4  += 38 * t20;
  t5  += 38 * t21;
  t6  += 38 * t22;
  t7  += 38 * t23;
  t8  += 38 * t24;
  t9  += 38 * t25;
  t10 += 38 * t26;
  t11 += 38 * t27;
  t12 += 38 * t28;
  t13 += 38 * t29;
  t14 += 38 * t30;
  // t15 left as is

  // first car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  // second car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  o[ 0] = t0;
  o[ 1] = t1;
  o[ 2] = t2;
  o[ 3] = t3;
  o[ 4] = t4;
  o[ 5] = t5;
  o[ 6] = t6;
  o[ 7] = t7;
  o[ 8] = t8;
  o[ 9] = t9;
  o[10] = t10;
  o[11] = t11;
  o[12] = t12;
  o[13] = t13;
  o[14] = t14;
  o[15] = t15;
}

function S(o, a) {
  M(o, a, a);
}

function inv25519(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 253; a >= 0; a--) {
    S(c, c);
    if(a !== 2 && a !== 4) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function pow2523(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 250; a >= 0; a--) {
      S(c, c);
      if(a !== 1) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function crypto_scalarmult(q, n, p) {
  var z = new Uint8Array(32);
  var x = new Float64Array(80), r, i;
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf();
  for (i = 0; i < 31; i++) z[i] = n[i];
  z[31]=(n[31]&127)|64;
  z[0]&=248;
  unpack25519(x,p);
  for (i = 0; i < 16; i++) {
    b[i]=x[i];
    d[i]=a[i]=c[i]=0;
  }
  a[0]=d[0]=1;
  for (i=254; i>=0; --i) {
    r=(z[i>>>3]>>>(i&7))&1;
    sel25519(a,b,r);
    sel25519(c,d,r);
    A(e,a,c);
    Z(a,a,c);
    A(c,b,d);
    Z(b,b,d);
    S(d,e);
    S(f,a);
    M(a,c,a);
    M(c,b,e);
    A(e,a,c);
    Z(a,a,c);
    S(b,a);
    Z(c,d,f);
    M(a,c,_121665);
    A(a,a,d);
    M(c,c,a);
    M(a,d,f);
    M(d,b,x);
    S(b,e);
    sel25519(a,b,r);
    sel25519(c,d,r);
  }
  for (i = 0; i < 16; i++) {
    x[i+16]=a[i];
    x[i+32]=c[i];
    x[i+48]=b[i];
    x[i+64]=d[i];
  }
  var x32 = x.subarray(32);
  var x16 = x.subarray(16);
  inv25519(x32,x32);
  M(x16,x16,x32);
  pack25519(q,x16);
  return 0;
}

function crypto_scalarmult_base(q, n) {
  return crypto_scalarmult(q, n, _9);
}

function crypto_box_keypair(y, x) {
  randombytes(x, 32);
  return crypto_scalarmult_base(y, x);
}

function crypto_box_beforenm(k, y, x) {
  var s = new Uint8Array(32);
  crypto_scalarmult(s, x, y);
  return crypto_core_hsalsa20(k, _0, s, sigma);
}

var crypto_box_afternm = crypto_secretbox;
var crypto_box_open_afternm = crypto_secretbox_open;

function crypto_box(c, m, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_afternm(c, m, d, n, k);
}

function crypto_box_open(m, c, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_open_afternm(m, c, d, n, k);
}

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function crypto_hashblocks_hl(hh, hl, m, n) {
  var wh = new Int32Array(16), wl = new Int32Array(16),
      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
      th, tl, i, j, h, l, a, b, c, d;

  var ah0 = hh[0],
      ah1 = hh[1],
      ah2 = hh[2],
      ah3 = hh[3],
      ah4 = hh[4],
      ah5 = hh[5],
      ah6 = hh[6],
      ah7 = hh[7],

      al0 = hl[0],
      al1 = hl[1],
      al2 = hl[2],
      al3 = hl[3],
      al4 = hl[4],
      al5 = hl[5],
      al6 = hl[6],
      al7 = hl[7];

  var pos = 0;
  while (n >= 128) {
    for (i = 0; i < 16; i++) {
      j = 8 * i + pos;
      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
    }
    for (i = 0; i < 80; i++) {
      bh0 = ah0;
      bh1 = ah1;
      bh2 = ah2;
      bh3 = ah3;
      bh4 = ah4;
      bh5 = ah5;
      bh6 = ah6;
      bh7 = ah7;

      bl0 = al0;
      bl1 = al1;
      bl2 = al2;
      bl3 = al3;
      bl4 = al4;
      bl5 = al5;
      bl6 = al6;
      bl7 = al7;

      // add
      h = ah7;
      l = al7;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma1
      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Ch
      h = (ah4 & ah5) ^ (~ah4 & ah6);
      l = (al4 & al5) ^ (~al4 & al6);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // K
      h = K[i*2];
      l = K[i*2+1];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // w
      h = wh[i%16];
      l = wl[i%16];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      th = c & 0xffff | d << 16;
      tl = a & 0xffff | b << 16;

      // add
      h = th;
      l = tl;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma0
      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Maj
      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh7 = (c & 0xffff) | (d << 16);
      bl7 = (a & 0xffff) | (b << 16);

      // add
      h = bh3;
      l = bl3;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = th;
      l = tl;

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh3 = (c & 0xffff) | (d << 16);
      bl3 = (a & 0xffff) | (b << 16);

      ah1 = bh0;
      ah2 = bh1;
      ah3 = bh2;
      ah4 = bh3;
      ah5 = bh4;
      ah6 = bh5;
      ah7 = bh6;
      ah0 = bh7;

      al1 = bl0;
      al2 = bl1;
      al3 = bl2;
      al4 = bl3;
      al5 = bl4;
      al6 = bl5;
      al7 = bl6;
      al0 = bl7;

      if (i%16 === 15) {
        for (j = 0; j < 16; j++) {
          // add
          h = wh[j];
          l = wl[j];

          a = l & 0xffff; b = l >>> 16;
          c = h & 0xffff; d = h >>> 16;

          h = wh[(j+9)%16];
          l = wl[(j+9)%16];

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma0
          th = wh[(j+1)%16];
          tl = wl[(j+1)%16];
          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma1
          th = wh[(j+14)%16];
          tl = wl[(j+14)%16];
          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;

          wh[j] = (c & 0xffff) | (d << 16);
          wl[j] = (a & 0xffff) | (b << 16);
        }
      }
    }

    // add
    h = ah0;
    l = al0;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[0];
    l = hl[0];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[0] = ah0 = (c & 0xffff) | (d << 16);
    hl[0] = al0 = (a & 0xffff) | (b << 16);

    h = ah1;
    l = al1;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[1];
    l = hl[1];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[1] = ah1 = (c & 0xffff) | (d << 16);
    hl[1] = al1 = (a & 0xffff) | (b << 16);

    h = ah2;
    l = al2;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[2];
    l = hl[2];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[2] = ah2 = (c & 0xffff) | (d << 16);
    hl[2] = al2 = (a & 0xffff) | (b << 16);

    h = ah3;
    l = al3;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[3];
    l = hl[3];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[3] = ah3 = (c & 0xffff) | (d << 16);
    hl[3] = al3 = (a & 0xffff) | (b << 16);

    h = ah4;
    l = al4;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[4];
    l = hl[4];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[4] = ah4 = (c & 0xffff) | (d << 16);
    hl[4] = al4 = (a & 0xffff) | (b << 16);

    h = ah5;
    l = al5;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[5];
    l = hl[5];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[5] = ah5 = (c & 0xffff) | (d << 16);
    hl[5] = al5 = (a & 0xffff) | (b << 16);

    h = ah6;
    l = al6;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[6];
    l = hl[6];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[6] = ah6 = (c & 0xffff) | (d << 16);
    hl[6] = al6 = (a & 0xffff) | (b << 16);

    h = ah7;
    l = al7;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[7];
    l = hl[7];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[7] = ah7 = (c & 0xffff) | (d << 16);
    hl[7] = al7 = (a & 0xffff) | (b << 16);

    pos += 128;
    n -= 128;
  }

  return n;
}

function crypto_hash(out, m, n) {
  var hh = new Int32Array(8),
      hl = new Int32Array(8),
      x = new Uint8Array(256),
      i, b = n;

  hh[0] = 0x6a09e667;
  hh[1] = 0xbb67ae85;
  hh[2] = 0x3c6ef372;
  hh[3] = 0xa54ff53a;
  hh[4] = 0x510e527f;
  hh[5] = 0x9b05688c;
  hh[6] = 0x1f83d9ab;
  hh[7] = 0x5be0cd19;

  hl[0] = 0xf3bcc908;
  hl[1] = 0x84caa73b;
  hl[2] = 0xfe94f82b;
  hl[3] = 0x5f1d36f1;
  hl[4] = 0xade682d1;
  hl[5] = 0x2b3e6c1f;
  hl[6] = 0xfb41bd6b;
  hl[7] = 0x137e2179;

  crypto_hashblocks_hl(hh, hl, m, n);
  n %= 128;

  for (i = 0; i < n; i++) x[i] = m[b-n+i];
  x[n] = 128;

  n = 256-128*(n<112?1:0);
  x[n-9] = 0;
  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
  crypto_hashblocks_hl(hh, hl, x, n);

  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

  return 0;
}

function add(p, q) {
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf(),
      g = gf(), h = gf(), t = gf();

  Z(a, p[1], p[0]);
  Z(t, q[1], q[0]);
  M(a, a, t);
  A(b, p[0], p[1]);
  A(t, q[0], q[1]);
  M(b, b, t);
  M(c, p[3], q[3]);
  M(c, c, D2);
  M(d, p[2], q[2]);
  A(d, d, d);
  Z(e, b, a);
  Z(f, d, c);
  A(g, d, c);
  A(h, b, a);

  M(p[0], e, f);
  M(p[1], h, g);
  M(p[2], g, f);
  M(p[3], e, h);
}

function cswap(p, q, b) {
  var i;
  for (i = 0; i < 4; i++) {
    sel25519(p[i], q[i], b);
  }
}

function pack(r, p) {
  var tx = gf(), ty = gf(), zi = gf();
  inv25519(zi, p[2]);
  M(tx, p[0], zi);
  M(ty, p[1], zi);
  pack25519(r, ty);
  r[31] ^= par25519(tx) << 7;
}

function scalarmult(p, q, s) {
  var b, i;
  set25519(p[0], gf0);
  set25519(p[1], gf1);
  set25519(p[2], gf1);
  set25519(p[3], gf0);
  for (i = 255; i >= 0; --i) {
    b = (s[(i/8)|0] >> (i&7)) & 1;
    cswap(p, q, b);
    add(q, p);
    add(p, p);
    cswap(p, q, b);
  }
}

function scalarbase(p, s) {
  var q = [gf(), gf(), gf(), gf()];
  set25519(q[0], X);
  set25519(q[1], Y);
  set25519(q[2], gf1);
  M(q[3], X, Y);
  scalarmult(p, q, s);
}

function crypto_sign_keypair(pk, sk, seeded) {
  var d = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()];
  var i;

  if (!seeded) randombytes(sk, 32);
  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);

  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
  return 0;
}

var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

function modL(r, x) {
  var carry, i, j, k;
  for (i = 63; i >= 32; --i) {
    carry = 0;
    for (j = i - 32, k = i - 12; j < k; ++j) {
      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
      carry = (x[j] + 128) >> 8;
      x[j] -= carry * 256;
    }
    x[j] += carry;
    x[i] = 0;
  }
  carry = 0;
  for (j = 0; j < 32; j++) {
    x[j] += carry - (x[31] >> 4) * L[j];
    carry = x[j] >> 8;
    x[j] &= 255;
  }
  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
  for (i = 0; i < 32; i++) {
    x[i+1] += x[i] >> 8;
    r[i] = x[i] & 255;
  }
}

function reduce(r) {
  var x = new Float64Array(64), i;
  for (i = 0; i < 64; i++) x[i] = r[i];
  for (i = 0; i < 64; i++) r[i] = 0;
  modL(r, x);
}

// Note: difference from C - smlen returned, not passed as argument.
function crypto_sign(sm, m, n, sk) {
  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
  var i, j, x = new Float64Array(64);
  var p = [gf(), gf(), gf(), gf()];

  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  var smlen = n + 64;
  for (i = 0; i < n; i++) sm[64 + i] = m[i];
  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

  crypto_hash(r, sm.subarray(32), n+32);
  reduce(r);
  scalarbase(p, r);
  pack(sm, p);

  for (i = 32; i < 64; i++) sm[i] = sk[i];
  crypto_hash(h, sm, n + 64);
  reduce(h);

  for (i = 0; i < 64; i++) x[i] = 0;
  for (i = 0; i < 32; i++) x[i] = r[i];
  for (i = 0; i < 32; i++) {
    for (j = 0; j < 32; j++) {
      x[i+j] += h[i] * d[j];
    }
  }

  modL(sm.subarray(32), x);
  return smlen;
}

function unpackneg(r, p) {
  var t = gf(), chk = gf(), num = gf(),
      den = gf(), den2 = gf(), den4 = gf(),
      den6 = gf();

  set25519(r[2], gf1);
  unpack25519(r[1], p);
  S(num, r[1]);
  M(den, num, D);
  Z(num, num, r[2]);
  A(den, r[2], den);

  S(den2, den);
  S(den4, den2);
  M(den6, den4, den2);
  M(t, den6, num);
  M(t, t, den);

  pow2523(t, t);
  M(t, t, num);
  M(t, t, den);
  M(t, t, den);
  M(r[0], t, den);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) M(r[0], r[0], I);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) return -1;

  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

  M(r[3], r[0], r[1]);
  return 0;
}

function crypto_sign_open(m, sm, n, pk) {
  var i, mlen;
  var t = new Uint8Array(32), h = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()],
      q = [gf(), gf(), gf(), gf()];

  mlen = -1;
  if (n < 64) return -1;

  if (unpackneg(q, pk)) return -1;

  for (i = 0; i < n; i++) m[i] = sm[i];
  for (i = 0; i < 32; i++) m[i+32] = pk[i];
  crypto_hash(h, m, n);
  reduce(h);
  scalarmult(p, q, h);

  scalarbase(q, sm.subarray(32));
  add(p, q);
  pack(t, p);

  n -= 64;
  if (crypto_verify_32(sm, 0, t, 0)) {
    for (i = 0; i < n; i++) m[i] = 0;
    return -1;
  }

  for (i = 0; i < n; i++) m[i] = sm[i + 64];
  mlen = n;
  return mlen;
}

var crypto_secretbox_KEYBYTES = 32,
    crypto_secretbox_NONCEBYTES = 24,
    crypto_secretbox_ZEROBYTES = 32,
    crypto_secretbox_BOXZEROBYTES = 16,
    crypto_scalarmult_BYTES = 32,
    crypto_scalarmult_SCALARBYTES = 32,
    crypto_box_PUBLICKEYBYTES = 32,
    crypto_box_SECRETKEYBYTES = 32,
    crypto_box_BEFORENMBYTES = 32,
    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
    crypto_sign_BYTES = 64,
    crypto_sign_PUBLICKEYBYTES = 32,
    crypto_sign_SECRETKEYBYTES = 64,
    crypto_sign_SEEDBYTES = 32,
    crypto_hash_BYTES = 64;

nacl.lowlevel = {
  crypto_core_hsalsa20: crypto_core_hsalsa20,
  crypto_stream_xor: crypto_stream_xor,
  crypto_stream: crypto_stream,
  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
  crypto_stream_salsa20: crypto_stream_salsa20,
  crypto_onetimeauth: crypto_onetimeauth,
  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
  crypto_verify_16: crypto_verify_16,
  crypto_verify_32: crypto_verify_32,
  crypto_secretbox: crypto_secretbox,
  crypto_secretbox_open: crypto_secretbox_open,
  crypto_scalarmult: crypto_scalarmult,
  crypto_scalarmult_base: crypto_scalarmult_base,
  crypto_box_beforenm: crypto_box_beforenm,
  crypto_box_afternm: crypto_box_afternm,
  crypto_box: crypto_box,
  crypto_box_open: crypto_box_open,
  crypto_box_keypair: crypto_box_keypair,
  crypto_hash: crypto_hash,
  crypto_sign: crypto_sign,
  crypto_sign_keypair: crypto_sign_keypair,
  crypto_sign_open: crypto_sign_open,

  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
  crypto_sign_BYTES: crypto_sign_BYTES,
  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
  crypto_hash_BYTES: crypto_hash_BYTES
};

/* High-level API */

function checkLengths(k, n) {
  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
}

function checkBoxLengths(pk, sk) {
  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
}

function checkArrayTypes() {
  for (var i = 0; i < arguments.length; i++) {
    if (!(arguments[i] instanceof Uint8Array))
      throw new TypeError('unexpected type, use Uint8Array');
  }
}

function cleanup(arr) {
  for (var i = 0; i < arr.length; i++) arr[i] = 0;
}

nacl.randomBytes = function(n) {
  var b = new Uint8Array(n);
  randombytes(b, n);
  return b;
};

nacl.secretbox = function(msg, nonce, key) {
  checkArrayTypes(msg, nonce, key);
  checkLengths(key, nonce);
  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
  var c = new Uint8Array(m.length);
  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
  crypto_secretbox(c, m, m.length, nonce, key);
  return c.subarray(crypto_secretbox_BOXZEROBYTES);
};

nacl.secretbox.open = function(box, nonce, key) {
  checkArrayTypes(box, nonce, key);
  checkLengths(key, nonce);
  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
  var m = new Uint8Array(c.length);
  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
  if (c.length < 32) return null;
  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
  return m.subarray(crypto_secretbox_ZEROBYTES);
};

nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

nacl.scalarMult = function(n, p) {
  checkArrayTypes(n, p);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult(q, n, p);
  return q;
};

nacl.scalarMult.base = function(n) {
  checkArrayTypes(n);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult_base(q, n);
  return q;
};

nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

nacl.box = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox(msg, nonce, k);
};

nacl.box.before = function(publicKey, secretKey) {
  checkArrayTypes(publicKey, secretKey);
  checkBoxLengths(publicKey, secretKey);
  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
  crypto_box_beforenm(k, publicKey, secretKey);
  return k;
};

nacl.box.after = nacl.secretbox;

nacl.box.open = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox.open(msg, nonce, k);
};

nacl.box.open.after = nacl.secretbox.open;

nacl.box.keyPair = function() {
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  crypto_box_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.box.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  crypto_scalarmult_base(pk, secretKey);
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
nacl.box.nonceLength = crypto_box_NONCEBYTES;
nacl.box.overheadLength = nacl.secretbox.overheadLength;

nacl.sign = function(msg, secretKey) {
  checkArrayTypes(msg, secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
  crypto_sign(signedMsg, msg, msg.length, secretKey);
  return signedMsg;
};

nacl.sign.open = function(signedMsg, publicKey) {
  checkArrayTypes(signedMsg, publicKey);
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var tmp = new Uint8Array(signedMsg.length);
  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
  if (mlen < 0) return null;
  var m = new Uint8Array(mlen);
  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
  return m;
};

nacl.sign.detached = function(msg, secretKey) {
  var signedMsg = nacl.sign(msg, secretKey);
  var sig = new Uint8Array(crypto_sign_BYTES);
  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  return sig;
};

nacl.sign.detached.verify = function(msg, sig, publicKey) {
  checkArrayTypes(msg, sig, publicKey);
  if (sig.length !== crypto_sign_BYTES)
    throw new Error('bad signature size');
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
  var i;
  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
};

nacl.sign.keyPair = function() {
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  crypto_sign_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.sign.keyPair.fromSeed = function(seed) {
  checkArrayTypes(seed);
  if (seed.length !== crypto_sign_SEEDBYTES)
    throw new Error('bad seed size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  for (var i = 0; i < 32; i++) sk[i] = seed[i];
  crypto_sign_keypair(pk, sk, true);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
nacl.sign.seedLength = crypto_sign_SEEDBYTES;
nacl.sign.signatureLength = crypto_sign_BYTES;

nacl.hash = function(msg) {
  checkArrayTypes(msg);
  var h = new Uint8Array(crypto_hash_BYTES);
  crypto_hash(h, msg, msg.length);
  return h;
};

nacl.hash.hashLength = crypto_hash_BYTES;

nacl.verify = function(x, y) {
  checkArrayTypes(x, y);
  // Zero length arguments are considered not equal.
  if (x.length === 0 || y.length === 0) return false;
  if (x.length !== y.length) return false;
  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
};

nacl.setPRNG = function(fn) {
  randombytes = fn;
};

(function() {
  // Initialize PRNG if environment provides CSPRNG.
  // If not, methods calling randombytes will throw.
  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
  if (crypto && crypto.getRandomValues) {
    // Browsers.
    var QUOTA = 65536;
    nacl.setPRNG(function(x, n) {
      var i, v = new Uint8Array(n);
      for (i = 0; i < n; i += QUOTA) {
        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
      }
      for (i = 0; i < n; i++) x[i] = v[i];
      cleanup(v);
    });
  } else if (true) {
    // Node.js.
    crypto = __webpack_require__(422);
    if (crypto && crypto.randomBytes) {
      nacl.setPRNG(function(x, n) {
        var i, v = crypto.randomBytes(n);
        for (i = 0; i < n; i++) x[i] = v[i];
        cleanup(v);
      });
    }
  }
})();

})(typeof module !== 'undefined' && module.exports ? module.exports : (self.nacl = self.nacl || {}));


/***/ }),
/* 422 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const multihashing = __webpack_require__(109)

module.exports = (keysProtobuf, randomBytes, crypto) => {
  crypto = crypto || __webpack_require__(424)(randomBytes)

  class Secp256k1PublicKey {
    constructor (key) {
      crypto.validatePublicKey(key)
      this._key = key
    }

    verify (data, sig, callback) {
      ensure(callback)
      crypto.hashAndVerify(this._key, sig, data, callback)
    }

    marshal () {
      return crypto.compressPublicKey(this._key)
    }

    get bytes () {
      return keysProtobuf.PublicKey.encode({
        Type: keysProtobuf.KeyType.Secp256k1,
        Data: this.marshal()
      })
    }

    equals (key) {
      return this.bytes.equals(key.bytes)
    }

    hash (callback) {
      ensure(callback)
      multihashing(this.bytes, 'sha2-256', callback)
    }
  }

  class Secp256k1PrivateKey {
    constructor (key, publicKey) {
      this._key = key
      this._publicKey = publicKey || crypto.computePublicKey(key)
      crypto.validatePrivateKey(this._key)
      crypto.validatePublicKey(this._publicKey)
    }

    sign (message, callback) {
      ensure(callback)
      crypto.hashAndSign(this._key, message, callback)
    }

    get public () {
      return new Secp256k1PublicKey(this._publicKey)
    }

    marshal () {
      return this._key
    }

    get bytes () {
      return keysProtobuf.PrivateKey.encode({
        Type: keysProtobuf.KeyType.Secp256k1,
        Data: this.marshal()
      })
    }

    equals (key) {
      return this.bytes.equals(key.bytes)
    }

    hash (callback) {
      ensure(callback)
      multihashing(this.bytes, 'sha2-256', callback)
    }
  }

  function unmarshalSecp256k1PrivateKey (bytes, callback) {
    callback(null, new Secp256k1PrivateKey(bytes), null)
  }

  function unmarshalSecp256k1PublicKey (bytes) {
    return new Secp256k1PublicKey(bytes)
  }

  function generateKeyPair (_bits, callback) {
    if (callback === undefined && typeof _bits === 'function') {
      callback = _bits
    }

    ensure(callback)

    crypto.generateKey((err, privateKeyBytes) => {
      if (err) { return callback(err) }

      let privkey
      try {
        privkey = new Secp256k1PrivateKey(privateKeyBytes)
      } catch (err) { return callback(err) }

      callback(null, privkey)
    })
  }

  function ensure (callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback is required')
    }
  }

  return {
    Secp256k1PublicKey,
    Secp256k1PrivateKey,
    unmarshalSecp256k1PrivateKey,
    unmarshalSecp256k1PublicKey,
    generateKeyPair
  }
}


/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const secp256k1 = __webpack_require__(425)
const multihashing = __webpack_require__(109)
const setImmediate = __webpack_require__(126)

const HASH_ALGORITHM = 'sha2-256'

module.exports = (randomBytes) => {
  const privateKeyLength = 32

  function generateKey (callback) {
    const done = (err, res) => setImmediate(() => callback(err, res))

    let privateKey
    do {
      privateKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privateKey))

    done(null, privateKey)
  }

  function hashAndSign (key, msg, callback) {
    const done = (err, res) => setImmediate(() => callback(err, res))

    multihashing.digest(msg, HASH_ALGORITHM, (err, digest) => {
      if (err) { return done(err) }

      try {
        const sig = secp256k1.sign(digest, key)
        const sigDER = secp256k1.signatureExport(sig.signature)
        return done(null, sigDER)
      } catch (err) { done(err) }
    })
  }

  function hashAndVerify (key, sig, msg, callback) {
    const done = (err, res) => setImmediate(() => callback(err, res))

    multihashing.digest(msg, HASH_ALGORITHM, (err, digest) => {
      if (err) { return done(err) }
      try {
        sig = secp256k1.signatureImport(sig)
        const valid = secp256k1.verify(digest, sig, key)
        return done(null, valid)
      } catch (err) { done(err) }
    })
  }

  function compressPublicKey (key) {
    if (!secp256k1.publicKeyVerify(key)) {
      throw new Error('Invalid public key')
    }
    return secp256k1.publicKeyConvert(key, true)
  }

  function decompressPublicKey (key) {
    return secp256k1.publicKeyConvert(key, false)
  }

  function validatePrivateKey (key) {
    if (!secp256k1.privateKeyVerify(key)) {
      throw new Error('Invalid private key')
    }
  }

  function validatePublicKey (key) {
    if (!secp256k1.publicKeyVerify(key)) {
      throw new Error('Invalid public key')
    }
  }

  function computePublicKey (privateKey) {
    validatePrivateKey(privateKey)
    return secp256k1.publicKeyCreate(privateKey)
  }

  return {
    generateKey: generateKey,
    privateKeyLength: privateKeyLength,
    hashAndSign: hashAndSign,
    hashAndVerify: hashAndVerify,
    compressPublicKey: compressPublicKey,
    decompressPublicKey: decompressPublicKey,
    validatePrivateKey: validatePrivateKey,
    validatePublicKey: validatePublicKey,
    computePublicKey: computePublicKey
  }
}


/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(353)(__webpack_require__(429))


/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var toString = Object.prototype.toString

// TypeError
exports.isArray = function (value, message) {
  if (!Array.isArray(value)) throw TypeError(message)
}

exports.isBoolean = function (value, message) {
  if (toString.call(value) !== '[object Boolean]') throw TypeError(message)
}

exports.isBuffer = function (value, message) {
  if (!Buffer.isBuffer(value)) throw TypeError(message)
}

exports.isFunction = function (value, message) {
  if (toString.call(value) !== '[object Function]') throw TypeError(message)
}

exports.isNumber = function (value, message) {
  if (toString.call(value) !== '[object Number]') throw TypeError(message)
}

exports.isObject = function (value, message) {
  if (toString.call(value) !== '[object Object]') throw TypeError(message)
}

// RangeError
exports.isBufferLength = function (buffer, length, message) {
  if (buffer.length !== length) throw RangeError(message)
}

exports.isBufferLength2 = function (buffer, length1, length2, message) {
  if (buffer.length !== length1 && buffer.length !== length2) throw RangeError(message)
}

exports.isLengthGTZero = function (value, message) {
  if (value.length === 0) throw RangeError(message)
}

exports.isNumberInInterval = function (number, x, y, message) {
  if (number <= x || number >= y) throw RangeError(message)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(6).Buffer
var bip66 = __webpack_require__(428)

var EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([
  // begin
  0x30, 0x81, 0xd3, 0x02, 0x01, 0x01, 0x04, 0x20,
  // private key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // middle
  0xa0, 0x81, 0x85, 0x30, 0x81, 0x82, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
  0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
  0x21, 0x02, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
  0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
  0x17, 0x98, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
  0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x24, 0x03, 0x22, 0x00,
  // public key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00
])

var EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([
  // begin
  0x30, 0x82, 0x01, 0x13, 0x02, 0x01, 0x01, 0x04, 0x20,
  // private key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // middle
  0xa0, 0x81, 0xa5, 0x30, 0x81, 0xa2, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
  0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
  0x41, 0x04, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
  0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
  0x17, 0x98, 0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0E, 0x11,
  0x08, 0xa8, 0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10,
  0xd4, 0xb8, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
  0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x44, 0x03, 0x42, 0x00,
  // public key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00
])

var ZERO_BUFFER_32 = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
])

exports.privateKeyExport = function (privateKey, publicKey, compressed) {
  var result = Buffer.from(compressed ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED)
  privateKey.copy(result, compressed ? 8 : 9)
  publicKey.copy(result, compressed ? 181 : 214)
  return result
}

exports.privateKeyImport = function (privateKey) {
  var length = privateKey.length

  // sequence header
  var index = 0
  if (length < index + 1 || privateKey[index] !== 0x30) return
  index += 1

  // sequence length constructor
  if (length < index + 1 || !(privateKey[index] & 0x80)) return

  var lenb = privateKey[index] & 0x7f
  index += 1
  if (lenb < 1 || lenb > 2) return
  if (length < index + lenb) return

  // sequence length
  var len = privateKey[index + lenb - 1] | (lenb > 1 ? privateKey[index + lenb - 2] << 8 : 0)
  index += lenb
  if (length < index + len) return

  // sequence element 0: version number (=1)
  if (length < index + 3 ||
      privateKey[index] !== 0x02 ||
      privateKey[index + 1] !== 0x01 ||
      privateKey[index + 2] !== 0x01) {
    return
  }
  index += 3

  // sequence element 1: octet string, up to 32 bytes
  if (length < index + 2 ||
      privateKey[index] !== 0x04 ||
      privateKey[index + 1] > 0x20 ||
      length < index + 2 + privateKey[index + 1]) {
    return
  }

  return privateKey.slice(index + 2, index + 2 + privateKey[index + 1])
}

exports.signatureExport = function (sigObj) {
  var r = Buffer.concat([Buffer.from([0]), sigObj.r])
  for (var lenR = 33, posR = 0; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

  var s = Buffer.concat([Buffer.from([0]), sigObj.s])
  for (var lenS = 33, posS = 0; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

  return bip66.encode(r.slice(posR), s.slice(posS))
}

exports.signatureImport = function (sig) {
  var r = Buffer.from(ZERO_BUFFER_32)
  var s = Buffer.from(ZERO_BUFFER_32)

  try {
    var sigObj = bip66.decode(sig)
    if (sigObj.r.length === 33 && sigObj.r[0] === 0x00) sigObj.r = sigObj.r.slice(1)
    if (sigObj.r.length > 32) throw new Error('R length is too long')
    if (sigObj.s.length === 33 && sigObj.s[0] === 0x00) sigObj.s = sigObj.s.slice(1)
    if (sigObj.s.length > 32) throw new Error('S length is too long')
  } catch (err) {
    return
  }

  sigObj.r.copy(r, 32 - sigObj.r.length)
  sigObj.s.copy(s, 32 - sigObj.s.length)

  return { r: r, s: s }
}

exports.signatureImportLax = function (sig) {
  var r = Buffer.from(ZERO_BUFFER_32)
  var s = Buffer.from(ZERO_BUFFER_32)

  var length = sig.length
  var index = 0

  // sequence tag byte
  if (sig[index++] !== 0x30) return

  // sequence length byte
  var lenbyte = sig[index++]
  if (lenbyte & 0x80) {
    index += lenbyte - 0x80
    if (index > length) return
  }

  // sequence tag byte for r
  if (sig[index++] !== 0x02) return

  // length for r
  var rlen = sig[index++]
  if (rlen & 0x80) {
    lenbyte = rlen - 0x80
    if (index + lenbyte > length) return
    for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
    for (rlen = 0; lenbyte > 0; index += 1, lenbyte -= 1) rlen = (rlen << 8) + sig[index]
  }
  if (rlen > length - index) return
  var rindex = index
  index += rlen

  // sequence tag byte for s
  if (sig[index++] !== 0x02) return

  // length for s
  var slen = sig[index++]
  if (slen & 0x80) {
    lenbyte = slen - 0x80
    if (index + lenbyte > length) return
    for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
    for (slen = 0; lenbyte > 0; index += 1, lenbyte -= 1) slen = (slen << 8) + sig[index]
  }
  if (slen > length - index) return
  var sindex = index
  index += slen

  // ignore leading zeros in r
  for (; rlen > 0 && sig[rindex] === 0x00; rlen -= 1, rindex += 1);
  // copy r value
  if (rlen > 32) return
  var rvalue = sig.slice(rindex, rindex + rlen)
  rvalue.copy(r, 32 - rvalue.length)

  // ignore leading zeros in s
  for (; slen > 0 && sig[sindex] === 0x00; slen -= 1, sindex += 1);
  // copy s value
  if (slen > 32) return
  var svalue = sig.slice(sindex, sindex + slen)
  svalue.copy(s, 32 - svalue.length)

  return { r: r, s: s }
}


/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

// Reference https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
// Format: 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
// NOTE: SIGHASH byte ignored AND restricted, truncate before use

var Buffer = __webpack_require__(6).Buffer

function check (buffer) {
  if (buffer.length < 8) return false
  if (buffer.length > 72) return false
  if (buffer[0] !== 0x30) return false
  if (buffer[1] !== buffer.length - 2) return false
  if (buffer[2] !== 0x02) return false

  var lenR = buffer[3]
  if (lenR === 0) return false
  if (5 + lenR >= buffer.length) return false
  if (buffer[4 + lenR] !== 0x02) return false

  var lenS = buffer[5 + lenR]
  if (lenS === 0) return false
  if ((6 + lenR + lenS) !== buffer.length) return false

  if (buffer[4] & 0x80) return false
  if (lenR > 1 && (buffer[4] === 0x00) && !(buffer[5] & 0x80)) return false

  if (buffer[lenR + 6] & 0x80) return false
  if (lenS > 1 && (buffer[lenR + 6] === 0x00) && !(buffer[lenR + 7] & 0x80)) return false
  return true
}

function decode (buffer) {
  if (buffer.length < 8) throw new Error('DER sequence length is too short')
  if (buffer.length > 72) throw new Error('DER sequence length is too long')
  if (buffer[0] !== 0x30) throw new Error('Expected DER sequence')
  if (buffer[1] !== buffer.length - 2) throw new Error('DER sequence length is invalid')
  if (buffer[2] !== 0x02) throw new Error('Expected DER integer')

  var lenR = buffer[3]
  if (lenR === 0) throw new Error('R length is zero')
  if (5 + lenR >= buffer.length) throw new Error('R length is too long')
  if (buffer[4 + lenR] !== 0x02) throw new Error('Expected DER integer (2)')

  var lenS = buffer[5 + lenR]
  if (lenS === 0) throw new Error('S length is zero')
  if ((6 + lenR + lenS) !== buffer.length) throw new Error('S length is invalid')

  if (buffer[4] & 0x80) throw new Error('R value is negative')
  if (lenR > 1 && (buffer[4] === 0x00) && !(buffer[5] & 0x80)) throw new Error('R value excessively padded')

  if (buffer[lenR + 6] & 0x80) throw new Error('S value is negative')
  if (lenS > 1 && (buffer[lenR + 6] === 0x00) && !(buffer[lenR + 7] & 0x80)) throw new Error('S value excessively padded')

  // non-BIP66 - extract R, S values
  return {
    r: buffer.slice(4, 4 + lenR),
    s: buffer.slice(6 + lenR)
  }
}

/*
 * Expects r and s to be positive DER integers.
 *
 * The DER format uses the most significant bit as a sign bit (& 0x80).
 * If the significant bit is set AND the integer is positive, a 0x00 is prepended.
 *
 * Examples:
 *
 *      0 =>     0x00
 *      1 =>     0x01
 *     -1 =>     0xff
 *    127 =>     0x7f
 *   -127 =>     0x81
 *    128 =>   0x0080
 *   -128 =>     0x80
 *    255 =>   0x00ff
 *   -255 =>   0xff01
 *  16300 =>   0x3fac
 * -16300 =>   0xc054
 *  62300 => 0x00f35c
 * -62300 => 0xff0ca4
*/
function encode (r, s) {
  var lenR = r.length
  var lenS = s.length
  if (lenR === 0) throw new Error('R length is zero')
  if (lenS === 0) throw new Error('S length is zero')
  if (lenR > 33) throw new Error('R length is too long')
  if (lenS > 33) throw new Error('S length is too long')
  if (r[0] & 0x80) throw new Error('R value is negative')
  if (s[0] & 0x80) throw new Error('S value is negative')
  if (lenR > 1 && (r[0] === 0x00) && !(r[1] & 0x80)) throw new Error('R value excessively padded')
  if (lenS > 1 && (s[0] === 0x00) && !(s[1] & 0x80)) throw new Error('S value excessively padded')

  var signature = Buffer.allocUnsafe(6 + lenR + lenS)

  // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
  signature[0] = 0x30
  signature[1] = signature.length - 2
  signature[2] = 0x02
  signature[3] = r.length
  r.copy(signature, 4)
  signature[4 + lenR] = 0x02
  signature[5 + lenR] = s.length
  s.copy(signature, 6 + lenR)

  return signature
}

module.exports = {
  check: check,
  decode: decode,
  encode: encode
}


/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(6).Buffer
var createHash = __webpack_require__(348)
var HmacDRBG = __webpack_require__(436)
var messages = __webpack_require__(256)
var BN = __webpack_require__(112)
var ECPoint = __webpack_require__(283)
var g = __webpack_require__(441)

exports.privateKeyVerify = function (privateKey) {
  var bn = BN.fromBuffer(privateKey)
  return !(bn.isOverflow() || bn.isZero())
}

exports.privateKeyExport = function (privateKey, compressed) {
  var d = BN.fromBuffer(privateKey)
  if (d.isOverflow() || d.isZero()) throw new Error(messages.EC_PRIVATE_KEY_EXPORT_DER_FAIL)

  return g.mul(d).toPublicKey(compressed)
}

exports.privateKeyTweakAdd = function (privateKey, tweak) {
  var bn = BN.fromBuffer(tweak)
  if (bn.isOverflow()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL)

  bn.iadd(BN.fromBuffer(privateKey))
  if (bn.isOverflow()) bn.isub(BN.n)
  if (bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL)

  return bn.toBuffer()
}

exports.privateKeyTweakMul = function (privateKey, tweak) {
  var bn = BN.fromBuffer(tweak)
  if (bn.isOverflow() || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_MUL_FAIL)

  var d = BN.fromBuffer(privateKey)
  return bn.umul(d).ureduce().toBuffer()
}

exports.publicKeyCreate = function (privateKey, compressed) {
  var d = BN.fromBuffer(privateKey)
  if (d.isOverflow() || d.isZero()) throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL)

  return g.mul(d).toPublicKey(compressed)
}

exports.publicKeyConvert = function (publicKey, compressed) {
  var point = ECPoint.fromPublicKey(publicKey)
  if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  return point.toPublicKey(compressed)
}

exports.publicKeyVerify = function (publicKey) {
  return ECPoint.fromPublicKey(publicKey) !== null
}

exports.publicKeyTweakAdd = function (publicKey, tweak, compressed) {
  var point = ECPoint.fromPublicKey(publicKey)
  if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  tweak = BN.fromBuffer(tweak)
  if (tweak.isOverflow()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL)

  return g.mul(tweak).add(point).toPublicKey(compressed)
}

exports.publicKeyTweakMul = function (publicKey, tweak, compressed) {
  var point = ECPoint.fromPublicKey(publicKey)
  if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  tweak = BN.fromBuffer(tweak)
  if (tweak.isOverflow() || tweak.isZero()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_MUL_FAIL)

  return point.mul(tweak).toPublicKey(compressed)
}

exports.publicKeyCombine = function (publicKeys, compressed) {
  var points = new Array(publicKeys.length)
  for (var i = 0; i < publicKeys.length; ++i) {
    points[i] = ECPoint.fromPublicKey(publicKeys[i])
    if (points[i] === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)
  }

  var point = points[0]
  for (var j = 1; j < points.length; ++j) point = point.add(points[j])
  if (point.inf) throw new Error(messages.EC_PUBLIC_KEY_COMBINE_FAIL)

  return point.toPublicKey(compressed)
}

exports.signatureNormalize = function (signature) {
  var r = BN.fromBuffer(signature.slice(0, 32))
  var s = BN.fromBuffer(signature.slice(32, 64))
  if (r.isOverflow() || s.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

  var result = Buffer.from(signature)
  if (s.isHigh()) BN.n.sub(s).toBuffer().copy(result, 32)

  return result
}

exports.signatureExport = function (signature) {
  var r = signature.slice(0, 32)
  var s = signature.slice(32, 64)
  if (BN.fromBuffer(r).isOverflow() || BN.fromBuffer(s).isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

  return { r: r, s: s }
}

exports.signatureImport = function (sigObj) {
  var r = BN.fromBuffer(sigObj.r)
  if (r.isOverflow()) r = BN.fromNumber(0)

  var s = BN.fromBuffer(sigObj.s)
  if (s.isOverflow()) s = BN.fromNumber(0)

  return Buffer.concat([r.toBuffer(), s.toBuffer()])
}

exports.sign = function (message, privateKey, noncefn, data) {
  var d = BN.fromBuffer(privateKey)
  if (d.isOverflow() || d.isZero()) throw new Error(messages.ECDSA_SIGN_FAIL)

  if (noncefn === null) {
    var drbg = new HmacDRBG('sha256', privateKey, message, data)
    noncefn = function () { return drbg.generate(32) }
  }

  var bnMessage = BN.fromBuffer(message)
  for (var count = 0; ; ++count) {
    var nonce = noncefn(message, privateKey, null, data, count)
    if (!Buffer.isBuffer(nonce) || nonce.length !== 32) throw new Error(messages.ECDSA_SIGN_FAIL)

    var k = BN.fromBuffer(nonce)
    if (k.isOverflow() || k.isZero()) continue

    var kp = g.mul(k)
    var r = kp.x.fireduce()
    if (r.isZero()) continue

    var s = k.uinvm().umul(r.umul(d).ureduce().iadd(bnMessage).fireduce()).ureduce()
    if (s.isZero()) continue

    var recovery = (kp.x.ucmp(r) !== 0 ? 2 : 0) | (kp.y.isOdd() ? 1 : 0)
    if (s.isHigh()) {
      s = BN.n.sub(s)
      recovery ^= 1
    }

    return {
      signature: Buffer.concat([r.toBuffer(), s.toBuffer()]),
      recovery: recovery
    }
  }
}

exports.verify = function (message, signature, publicKey) {
  var sigr = BN.fromBuffer(signature.slice(0, 32))
  var sigs = BN.fromBuffer(signature.slice(32, 64))
  if (sigr.isOverflow() || sigs.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

  if (sigs.isHigh() || sigr.isZero() || sigs.isZero()) return false

  var pub = ECPoint.fromPublicKey(publicKey)
  if (pub === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  var sinv = sigs.uinvm()
  var u1 = sinv.umul(BN.fromBuffer(message)).ureduce()
  var u2 = sinv.umul(sigr).ureduce()
  var point = g.mulAdd(u1, pub, u2)
  if (point.inf) return false

  // return ECPoint.fromECJPoint(point).x.fireduce().ucmp(sigr) === 0
  // Inversion-free
  var z2 = point.z.redSqr()
  if (sigr.redMul(z2).ucmp(point.x) === 0) return true
  if (sigr.ucmp(BN.psn) >= 0) return false

  return sigr.iadd(BN.psn).redMul(z2).ucmp(point.x) === 0
}

exports.recover = function (message, signature, recovery, compressed) {
  var sigr = BN.fromBuffer(signature.slice(0, 32))
  var sigs = BN.fromBuffer(signature.slice(32, 64))
  if (sigr.isOverflow() || sigs.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

  do {
    if (sigr.isZero() || sigs.isZero()) break

    var kpx = sigr
    if (recovery >> 1) {
      if (kpx.ucmp(BN.psn) >= 0) break
      kpx = sigr.add(BN.n)
    }

    var kpPublicKey = Buffer.concat([Buffer.from([0x02 + (recovery & 0x01)]), kpx.toBuffer()])
    var kp = ECPoint.fromPublicKey(kpPublicKey)
    if (kp === null) break

    var rInv = sigr.uinvm()
    var s1 = BN.n.sub(BN.fromBuffer(message)).umul(rInv).ureduce()
    var s2 = sigs.umul(rInv).ureduce()
    var point = ECPoint.fromECJPoint(g.mulAdd(s1, kp, s2))
    return point.toPublicKey(compressed)
  } while (false)

  throw new Error(messages.ECDSA_RECOVER_FAIL)
}

exports.ecdh = function (publicKey, privateKey) {
  var shared = exports.ecdhUnsafe(publicKey, privateKey, true)
  return createHash('sha256').update(shared).digest()
}

exports.ecdhUnsafe = function (publicKey, privateKey, compressed) {
  var point = ECPoint.fromPublicKey(publicKey)
  if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

  var scalar = BN.fromBuffer(privateKey)
  if (scalar.isOverflow() || scalar.isZero()) throw new Error(messages.ECDH_FAIL)

  return point.mul(scalar).toPublicKey(compressed)
}


/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var intSize = 4
var zeroBuffer = new Buffer(intSize)
zeroBuffer.fill(0)

var charSize = 8
var hashSize = 16

function toArray (buf) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize))
    buf = Buffer.concat([buf, zeroBuffer], len)
  }

  var arr = new Array(buf.length >>> 2)
  for (var i = 0, j = 0; i < buf.length; i += intSize, j++) {
    arr[j] = buf.readInt32LE(i)
  }

  return arr
}

module.exports = function hash (buf, fn) {
  var arr = fn(toArray(buf), buf.length * charSize)
  buf = new Buffer(hashSize)
  for (var i = 0; i < arr.length; i++) {
    buf.writeInt32LE(arr[i], i << 2, true)
  }
  return buf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var Transform = __webpack_require__(128).Transform
var inherits = __webpack_require__(7)

function HashBase (blockSize) {
  Transform.call(this)

  this._block = new Buffer(blockSize)
  this._blockSize = blockSize
  this._blockOffset = 0
  this._length = [0, 0, 0, 0]

  this._finalized = false
}

inherits(HashBase, Transform)

HashBase.prototype._transform = function (chunk, encoding, callback) {
  var error = null
  try {
    if (encoding !== 'buffer') chunk = new Buffer(chunk, encoding)
    this.update(chunk)
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype._flush = function (callback) {
  var error = null
  try {
    this.push(this._digest())
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype.update = function (data, encoding) {
  if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer')
  if (this._finalized) throw new Error('Digest already called')
  if (!Buffer.isBuffer(data)) data = new Buffer(data, encoding || 'binary')

  // consume data
  var block = this._block
  var offset = 0
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++]
    this._update()
    this._blockOffset = 0
  }
  while (offset < data.length) block[this._blockOffset++] = data[offset++]

  // update length
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry
    carry = (this._length[j] / 0x0100000000) | 0
    if (carry > 0) this._length[j] -= 0x0100000000 * carry
  }

  return this
}

HashBase.prototype._update = function (data) {
  throw new Error('_update is not implemented')
}

HashBase.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called')
  this._finalized = true

  var digest = this._digest()
  if (encoding !== undefined) digest = digest.toString(encoding)
  return digest
}

HashBase.prototype._digest = function () {
  throw new Error('_digest is not implemented')
}

module.exports = HashBase

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */

var inherits = __webpack_require__(7)
var Hash = __webpack_require__(67)
var Buffer = __webpack_require__(6).Buffer

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha, Hash)

Sha.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha


/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var inherits = __webpack_require__(7)
var Hash = __webpack_require__(67)
var Buffer = __webpack_require__(6).Buffer

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha1 () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha1, Hash)

Sha1.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl1 (num) {
  return (num << 1) | (num >>> 31)
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha1.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha1.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha1


/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(7)
var Sha256 = __webpack_require__(281)
var Hash = __webpack_require__(67)
var Buffer = __webpack_require__(6).Buffer

var W = new Array(64)

function Sha224 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha224, Sha256)

Sha224.prototype.init = function () {
  this._a = 0xc1059ed8
  this._b = 0x367cd507
  this._c = 0x3070dd17
  this._d = 0xf70e5939
  this._e = 0xffc00b31
  this._f = 0x68581511
  this._g = 0x64f98fa7
  this._h = 0xbefa4fa4

  return this
}

Sha224.prototype._hash = function () {
  var H = Buffer.allocUnsafe(28)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)

  return H
}

module.exports = Sha224


/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(7)
var SHA512 = __webpack_require__(282)
var Hash = __webpack_require__(67)
var Buffer = __webpack_require__(6).Buffer

var W = new Array(160)

function Sha384 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha384, SHA512)

Sha384.prototype.init = function () {
  this._ah = 0xcbbb9d5d
  this._bh = 0x629a292a
  this._ch = 0x9159015a
  this._dh = 0x152fecd8
  this._eh = 0x67332667
  this._fh = 0x8eb44a87
  this._gh = 0xdb0c2e0d
  this._hh = 0x47b5481d

  this._al = 0xc1059ed8
  this._bl = 0x367cd507
  this._cl = 0x3070dd17
  this._dl = 0xf70e5939
  this._el = 0xffc00b31
  this._fl = 0x68581511
  this._gl = 0x64f98fa7
  this._hl = 0xbefa4fa4

  return this
}

Sha384.prototype._hash = function () {
  var H = Buffer.allocUnsafe(48)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)

  return H
}

module.exports = Sha384


/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var createHmac = __webpack_require__(437)
var hashInfo = __webpack_require__(439)

var ebuf = new Buffer(0)
var b0x00 = new Buffer([ 0x00 ])
var b0x01 = new Buffer([ 0x01 ])

function HmacDRBG (algo, entropy, nonce, pers) {
  var info = hashInfo[algo]
  if (info === undefined) throw new Error('hash ' + algo + ' is not supported')

  this._algo = algo
  this._securityStrength = info.securityStrength / 8
  this._outlen = info.outlen / 8
  this._reseedInterval = 0x1000000000000 // 2**48

  this._init(entropy, nonce, pers)
}

HmacDRBG.prototype._update = function (seed) {
  var kmac = createHmac(this._algo, this._K).update(this._V).update(b0x00)
  if (seed) kmac.update(seed)

  this._K = kmac.digest()
  this._V = createHmac(this._algo, this._K).update(this._V).digest()
  if (!seed) return

  this._K = createHmac(this._algo, this._K).update(this._V).update(b0x01).update(seed).digest()
  this._V = createHmac(this._algo, this._K).update(this._V).digest()
}

HmacDRBG.prototype._init = function (entropy, nonce, pers) {
  if (entropy.length < this._securityStrength) throw new Error('Not enough entropy')

  this._K = new Buffer(this._outlen)
  this._V = new Buffer(this._outlen)
  for (var i = 0; i < this._K.length; ++i) {
    this._K[i] = 0x00
    this._V[i] = 0x01
  }

  this._update(Buffer.concat([ entropy, nonce, pers || ebuf ]))
  this._reseed = 1
}

HmacDRBG.prototype.reseed = function (entropy, add) {
  if (entropy.length < this._securityStrength) throw new Error('Not enough entropy')

  this._update(Buffer.concat([ entropy, add || ebuf ]))
  this._reseed = 1
}

HmacDRBG.prototype.generate = function (len, add) {
  if (this._reseed > this._reseedInterval) throw new Error('Reseed is required')

  if (add && add.length === 0) add = undefined
  if (add) this._update(add)

  var temp = new Buffer(0)
  while (temp.length < len) {
    this._V = createHmac(this._algo, this._K).update(this._V).digest()
    temp = Buffer.concat([ temp, this._V ])
  }

  this._update(add)
  this._reseed += 1
  return temp.slice(0, len)
}

module.exports = HmacDRBG

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var inherits = __webpack_require__(7)
var Legacy = __webpack_require__(438)
var Base = __webpack_require__(47)
var Buffer = __webpack_require__(6).Buffer
var md5 = __webpack_require__(278)
var RIPEMD160 = __webpack_require__(279)

var sha = __webpack_require__(280)

var ZEROS = Buffer.alloc(128)

function Hmac (alg, key) {
  Base.call(this, 'digest')
  if (typeof key === 'string') {
    key = Buffer.from(key)
  }

  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  this._alg = alg
  this._key = key
  if (key.length > blocksize) {
    var hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
    key = hash.update(key).digest()
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }
  this._hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
  this._hash.update(ipad)
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.update(data)
}

Hmac.prototype._final = function () {
  var h = this._hash.digest()
  var hash = this._alg === 'rmd160' ? new RIPEMD160() : sha(this._alg)
  return hash.update(this._opad).update(h).digest()
}

module.exports = function createHmac (alg, key) {
  alg = alg.toLowerCase()
  if (alg === 'rmd160' || alg === 'ripemd160') {
    return new Hmac('rmd160', key)
  }
  if (alg === 'md5') {
    return new Legacy(md5, key)
  }
  return new Hmac(alg, key)
}


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var inherits = __webpack_require__(7)
var Buffer = __webpack_require__(6).Buffer

var Base = __webpack_require__(47)

var ZEROS = Buffer.alloc(128)
var blocksize = 64

function Hmac (alg, key) {
  Base.call(this, 'digest')
  if (typeof key === 'string') {
    key = Buffer.from(key)
  }

  this._alg = alg
  this._key = key

  if (key.length > blocksize) {
    key = alg(key)
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  this._hash = [ipad]
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.push(data)
}

Hmac.prototype._final = function () {
  var h = this._alg(Buffer.concat(this._hash))
  return this._alg(Buffer.concat([this._opad, h]))
}
module.exports = Hmac


/***/ }),
/* 439 */
/***/ (function(module, exports) {

module.exports = {"sha1":{"securityStrength":128,"outlen":160,"seedlen":440},"sha224":{"securityStrength":192,"outlen":224,"seedlen":440},"sha256":{"securityStrength":256,"outlen":256,"seedlen":440},"sha384":{"securityStrength":256,"outlen":384,"seedlen":888},"sha512":{"securityStrength":256,"outlen":512,"seedlen":888}}

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.umulTo10x10 = function (num1, num2, out) {
  var a = num1.words
  var b = num2.words
  var o = out.words
  var c = 0
  var lo
  var mid
  var hi
  var a0 = a[0] | 0
  var al0 = a0 & 0x1fff
  var ah0 = a0 >>> 13
  var a1 = a[1] | 0
  var al1 = a1 & 0x1fff
  var ah1 = a1 >>> 13
  var a2 = a[2] | 0
  var al2 = a2 & 0x1fff
  var ah2 = a2 >>> 13
  var a3 = a[3] | 0
  var al3 = a3 & 0x1fff
  var ah3 = a3 >>> 13
  var a4 = a[4] | 0
  var al4 = a4 & 0x1fff
  var ah4 = a4 >>> 13
  var a5 = a[5] | 0
  var al5 = a5 & 0x1fff
  var ah5 = a5 >>> 13
  var a6 = a[6] | 0
  var al6 = a6 & 0x1fff
  var ah6 = a6 >>> 13
  var a7 = a[7] | 0
  var al7 = a7 & 0x1fff
  var ah7 = a7 >>> 13
  var a8 = a[8] | 0
  var al8 = a8 & 0x1fff
  var ah8 = a8 >>> 13
  var a9 = a[9] | 0
  var al9 = a9 & 0x1fff
  var ah9 = a9 >>> 13
  var b0 = b[0] | 0
  var bl0 = b0 & 0x1fff
  var bh0 = b0 >>> 13
  var b1 = b[1] | 0
  var bl1 = b1 & 0x1fff
  var bh1 = b1 >>> 13
  var b2 = b[2] | 0
  var bl2 = b2 & 0x1fff
  var bh2 = b2 >>> 13
  var b3 = b[3] | 0
  var bl3 = b3 & 0x1fff
  var bh3 = b3 >>> 13
  var b4 = b[4] | 0
  var bl4 = b4 & 0x1fff
  var bh4 = b4 >>> 13
  var b5 = b[5] | 0
  var bl5 = b5 & 0x1fff
  var bh5 = b5 >>> 13
  var b6 = b[6] | 0
  var bl6 = b6 & 0x1fff
  var bh6 = b6 >>> 13
  var b7 = b[7] | 0
  var bl7 = b7 & 0x1fff
  var bh7 = b7 >>> 13
  var b8 = b[8] | 0
  var bl8 = b8 & 0x1fff
  var bh8 = b8 >>> 13
  var b9 = b[9] | 0
  var bl9 = b9 & 0x1fff
  var bh9 = b9 >>> 13

  out.length = 19
  /* k = 0 */
  lo = Math.imul(al0, bl0)
  mid = Math.imul(al0, bh0)
  mid += Math.imul(ah0, bl0)
  hi = Math.imul(ah0, bh0)
  var w0 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w0 >>> 26)
  w0 &= 0x3ffffff
  /* k = 1 */
  lo = Math.imul(al1, bl0)
  mid = Math.imul(al1, bh0)
  mid += Math.imul(ah1, bl0)
  hi = Math.imul(ah1, bh0)
  lo += Math.imul(al0, bl1)
  mid += Math.imul(al0, bh1)
  mid += Math.imul(ah0, bl1)
  hi += Math.imul(ah0, bh1)
  var w1 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w1 >>> 26)
  w1 &= 0x3ffffff
  /* k = 2 */
  lo = Math.imul(al2, bl0)
  mid = Math.imul(al2, bh0)
  mid += Math.imul(ah2, bl0)
  hi = Math.imul(ah2, bh0)
  lo += Math.imul(al1, bl1)
  mid += Math.imul(al1, bh1)
  mid += Math.imul(ah1, bl1)
  hi += Math.imul(ah1, bh1)
  lo += Math.imul(al0, bl2)
  mid += Math.imul(al0, bh2)
  mid += Math.imul(ah0, bl2)
  hi += Math.imul(ah0, bh2)
  var w2 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w2 >>> 26)
  w2 &= 0x3ffffff
  /* k = 3 */
  lo = Math.imul(al3, bl0)
  mid = Math.imul(al3, bh0)
  mid += Math.imul(ah3, bl0)
  hi = Math.imul(ah3, bh0)
  lo += Math.imul(al2, bl1)
  mid += Math.imul(al2, bh1)
  mid += Math.imul(ah2, bl1)
  hi += Math.imul(ah2, bh1)
  lo += Math.imul(al1, bl2)
  mid += Math.imul(al1, bh2)
  mid += Math.imul(ah1, bl2)
  hi += Math.imul(ah1, bh2)
  lo += Math.imul(al0, bl3)
  mid += Math.imul(al0, bh3)
  mid += Math.imul(ah0, bl3)
  hi += Math.imul(ah0, bh3)
  var w3 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w3 >>> 26)
  w3 &= 0x3ffffff
  /* k = 4 */
  lo = Math.imul(al4, bl0)
  mid = Math.imul(al4, bh0)
  mid += Math.imul(ah4, bl0)
  hi = Math.imul(ah4, bh0)
  lo += Math.imul(al3, bl1)
  mid += Math.imul(al3, bh1)
  mid += Math.imul(ah3, bl1)
  hi += Math.imul(ah3, bh1)
  lo += Math.imul(al2, bl2)
  mid += Math.imul(al2, bh2)
  mid += Math.imul(ah2, bl2)
  hi += Math.imul(ah2, bh2)
  lo += Math.imul(al1, bl3)
  mid += Math.imul(al1, bh3)
  mid += Math.imul(ah1, bl3)
  hi += Math.imul(ah1, bh3)
  lo += Math.imul(al0, bl4)
  mid += Math.imul(al0, bh4)
  mid += Math.imul(ah0, bl4)
  hi += Math.imul(ah0, bh4)
  var w4 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w4 >>> 26)
  w4 &= 0x3ffffff
  /* k = 5 */
  lo = Math.imul(al5, bl0)
  mid = Math.imul(al5, bh0)
  mid += Math.imul(ah5, bl0)
  hi = Math.imul(ah5, bh0)
  lo += Math.imul(al4, bl1)
  mid += Math.imul(al4, bh1)
  mid += Math.imul(ah4, bl1)
  hi += Math.imul(ah4, bh1)
  lo += Math.imul(al3, bl2)
  mid += Math.imul(al3, bh2)
  mid += Math.imul(ah3, bl2)
  hi += Math.imul(ah3, bh2)
  lo += Math.imul(al2, bl3)
  mid += Math.imul(al2, bh3)
  mid += Math.imul(ah2, bl3)
  hi += Math.imul(ah2, bh3)
  lo += Math.imul(al1, bl4)
  mid += Math.imul(al1, bh4)
  mid += Math.imul(ah1, bl4)
  hi += Math.imul(ah1, bh4)
  lo += Math.imul(al0, bl5)
  mid += Math.imul(al0, bh5)
  mid += Math.imul(ah0, bl5)
  hi += Math.imul(ah0, bh5)
  var w5 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w5 >>> 26)
  w5 &= 0x3ffffff
  /* k = 6 */
  lo = Math.imul(al6, bl0)
  mid = Math.imul(al6, bh0)
  mid += Math.imul(ah6, bl0)
  hi = Math.imul(ah6, bh0)
  lo += Math.imul(al5, bl1)
  mid += Math.imul(al5, bh1)
  mid += Math.imul(ah5, bl1)
  hi += Math.imul(ah5, bh1)
  lo += Math.imul(al4, bl2)
  mid += Math.imul(al4, bh2)
  mid += Math.imul(ah4, bl2)
  hi += Math.imul(ah4, bh2)
  lo += Math.imul(al3, bl3)
  mid += Math.imul(al3, bh3)
  mid += Math.imul(ah3, bl3)
  hi += Math.imul(ah3, bh3)
  lo += Math.imul(al2, bl4)
  mid += Math.imul(al2, bh4)
  mid += Math.imul(ah2, bl4)
  hi += Math.imul(ah2, bh4)
  lo += Math.imul(al1, bl5)
  mid += Math.imul(al1, bh5)
  mid += Math.imul(ah1, bl5)
  hi += Math.imul(ah1, bh5)
  lo += Math.imul(al0, bl6)
  mid += Math.imul(al0, bh6)
  mid += Math.imul(ah0, bl6)
  hi += Math.imul(ah0, bh6)
  var w6 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w6 >>> 26)
  w6 &= 0x3ffffff
  /* k = 7 */
  lo = Math.imul(al7, bl0)
  mid = Math.imul(al7, bh0)
  mid += Math.imul(ah7, bl0)
  hi = Math.imul(ah7, bh0)
  lo += Math.imul(al6, bl1)
  mid += Math.imul(al6, bh1)
  mid += Math.imul(ah6, bl1)
  hi += Math.imul(ah6, bh1)
  lo += Math.imul(al5, bl2)
  mid += Math.imul(al5, bh2)
  mid += Math.imul(ah5, bl2)
  hi += Math.imul(ah5, bh2)
  lo += Math.imul(al4, bl3)
  mid += Math.imul(al4, bh3)
  mid += Math.imul(ah4, bl3)
  hi += Math.imul(ah4, bh3)
  lo += Math.imul(al3, bl4)
  mid += Math.imul(al3, bh4)
  mid += Math.imul(ah3, bl4)
  hi += Math.imul(ah3, bh4)
  lo += Math.imul(al2, bl5)
  mid += Math.imul(al2, bh5)
  mid += Math.imul(ah2, bl5)
  hi += Math.imul(ah2, bh5)
  lo += Math.imul(al1, bl6)
  mid += Math.imul(al1, bh6)
  mid += Math.imul(ah1, bl6)
  hi += Math.imul(ah1, bh6)
  lo += Math.imul(al0, bl7)
  mid += Math.imul(al0, bh7)
  mid += Math.imul(ah0, bl7)
  hi += Math.imul(ah0, bh7)
  var w7 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w7 >>> 26)
  w7 &= 0x3ffffff
  /* k = 8 */
  lo = Math.imul(al8, bl0)
  mid = Math.imul(al8, bh0)
  mid += Math.imul(ah8, bl0)
  hi = Math.imul(ah8, bh0)
  lo += Math.imul(al7, bl1)
  mid += Math.imul(al7, bh1)
  mid += Math.imul(ah7, bl1)
  hi += Math.imul(ah7, bh1)
  lo += Math.imul(al6, bl2)
  mid += Math.imul(al6, bh2)
  mid += Math.imul(ah6, bl2)
  hi += Math.imul(ah6, bh2)
  lo += Math.imul(al5, bl3)
  mid += Math.imul(al5, bh3)
  mid += Math.imul(ah5, bl3)
  hi += Math.imul(ah5, bh3)
  lo += Math.imul(al4, bl4)
  mid += Math.imul(al4, bh4)
  mid += Math.imul(ah4, bl4)
  hi += Math.imul(ah4, bh4)
  lo += Math.imul(al3, bl5)
  mid += Math.imul(al3, bh5)
  mid += Math.imul(ah3, bl5)
  hi += Math.imul(ah3, bh5)
  lo += Math.imul(al2, bl6)
  mid += Math.imul(al2, bh6)
  mid += Math.imul(ah2, bl6)
  hi += Math.imul(ah2, bh6)
  lo += Math.imul(al1, bl7)
  mid += Math.imul(al1, bh7)
  mid += Math.imul(ah1, bl7)
  hi += Math.imul(ah1, bh7)
  lo += Math.imul(al0, bl8)
  mid += Math.imul(al0, bh8)
  mid += Math.imul(ah0, bl8)
  hi += Math.imul(ah0, bh8)
  var w8 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w8 >>> 26)
  w8 &= 0x3ffffff
  /* k = 9 */
  lo = Math.imul(al9, bl0)
  mid = Math.imul(al9, bh0)
  mid += Math.imul(ah9, bl0)
  hi = Math.imul(ah9, bh0)
  lo += Math.imul(al8, bl1)
  mid += Math.imul(al8, bh1)
  mid += Math.imul(ah8, bl1)
  hi += Math.imul(ah8, bh1)
  lo += Math.imul(al7, bl2)
  mid += Math.imul(al7, bh2)
  mid += Math.imul(ah7, bl2)
  hi += Math.imul(ah7, bh2)
  lo += Math.imul(al6, bl3)
  mid += Math.imul(al6, bh3)
  mid += Math.imul(ah6, bl3)
  hi += Math.imul(ah6, bh3)
  lo += Math.imul(al5, bl4)
  mid += Math.imul(al5, bh4)
  mid += Math.imul(ah5, bl4)
  hi += Math.imul(ah5, bh4)
  lo += Math.imul(al4, bl5)
  mid += Math.imul(al4, bh5)
  mid += Math.imul(ah4, bl5)
  hi += Math.imul(ah4, bh5)
  lo += Math.imul(al3, bl6)
  mid += Math.imul(al3, bh6)
  mid += Math.imul(ah3, bl6)
  hi += Math.imul(ah3, bh6)
  lo += Math.imul(al2, bl7)
  mid += Math.imul(al2, bh7)
  mid += Math.imul(ah2, bl7)
  hi += Math.imul(ah2, bh7)
  lo += Math.imul(al1, bl8)
  mid += Math.imul(al1, bh8)
  mid += Math.imul(ah1, bl8)
  hi += Math.imul(ah1, bh8)
  lo += Math.imul(al0, bl9)
  mid += Math.imul(al0, bh9)
  mid += Math.imul(ah0, bl9)
  hi += Math.imul(ah0, bh9)
  var w9 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w9 >>> 26)
  w9 &= 0x3ffffff
  /* k = 10 */
  lo = Math.imul(al9, bl1)
  mid = Math.imul(al9, bh1)
  mid += Math.imul(ah9, bl1)
  hi = Math.imul(ah9, bh1)
  lo += Math.imul(al8, bl2)
  mid += Math.imul(al8, bh2)
  mid += Math.imul(ah8, bl2)
  hi += Math.imul(ah8, bh2)
  lo += Math.imul(al7, bl3)
  mid += Math.imul(al7, bh3)
  mid += Math.imul(ah7, bl3)
  hi += Math.imul(ah7, bh3)
  lo += Math.imul(al6, bl4)
  mid += Math.imul(al6, bh4)
  mid += Math.imul(ah6, bl4)
  hi += Math.imul(ah6, bh4)
  lo += Math.imul(al5, bl5)
  mid += Math.imul(al5, bh5)
  mid += Math.imul(ah5, bl5)
  hi += Math.imul(ah5, bh5)
  lo += Math.imul(al4, bl6)
  mid += Math.imul(al4, bh6)
  mid += Math.imul(ah4, bl6)
  hi += Math.imul(ah4, bh6)
  lo += Math.imul(al3, bl7)
  mid += Math.imul(al3, bh7)
  mid += Math.imul(ah3, bl7)
  hi += Math.imul(ah3, bh7)
  lo += Math.imul(al2, bl8)
  mid += Math.imul(al2, bh8)
  mid += Math.imul(ah2, bl8)
  hi += Math.imul(ah2, bh8)
  lo += Math.imul(al1, bl9)
  mid += Math.imul(al1, bh9)
  mid += Math.imul(ah1, bl9)
  hi += Math.imul(ah1, bh9)
  var w10 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w10 >>> 26)
  w10 &= 0x3ffffff
  /* k = 11 */
  lo = Math.imul(al9, bl2)
  mid = Math.imul(al9, bh2)
  mid += Math.imul(ah9, bl2)
  hi = Math.imul(ah9, bh2)
  lo += Math.imul(al8, bl3)
  mid += Math.imul(al8, bh3)
  mid += Math.imul(ah8, bl3)
  hi += Math.imul(ah8, bh3)
  lo += Math.imul(al7, bl4)
  mid += Math.imul(al7, bh4)
  mid += Math.imul(ah7, bl4)
  hi += Math.imul(ah7, bh4)
  lo += Math.imul(al6, bl5)
  mid += Math.imul(al6, bh5)
  mid += Math.imul(ah6, bl5)
  hi += Math.imul(ah6, bh5)
  lo += Math.imul(al5, bl6)
  mid += Math.imul(al5, bh6)
  mid += Math.imul(ah5, bl6)
  hi += Math.imul(ah5, bh6)
  lo += Math.imul(al4, bl7)
  mid += Math.imul(al4, bh7)
  mid += Math.imul(ah4, bl7)
  hi += Math.imul(ah4, bh7)
  lo += Math.imul(al3, bl8)
  mid += Math.imul(al3, bh8)
  mid += Math.imul(ah3, bl8)
  hi += Math.imul(ah3, bh8)
  lo += Math.imul(al2, bl9)
  mid += Math.imul(al2, bh9)
  mid += Math.imul(ah2, bl9)
  hi += Math.imul(ah2, bh9)
  var w11 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w11 >>> 26)
  w11 &= 0x3ffffff
  /* k = 12 */
  lo = Math.imul(al9, bl3)
  mid = Math.imul(al9, bh3)
  mid += Math.imul(ah9, bl3)
  hi = Math.imul(ah9, bh3)
  lo += Math.imul(al8, bl4)
  mid += Math.imul(al8, bh4)
  mid += Math.imul(ah8, bl4)
  hi += Math.imul(ah8, bh4)
  lo += Math.imul(al7, bl5)
  mid += Math.imul(al7, bh5)
  mid += Math.imul(ah7, bl5)
  hi += Math.imul(ah7, bh5)
  lo += Math.imul(al6, bl6)
  mid += Math.imul(al6, bh6)
  mid += Math.imul(ah6, bl6)
  hi += Math.imul(ah6, bh6)
  lo += Math.imul(al5, bl7)
  mid += Math.imul(al5, bh7)
  mid += Math.imul(ah5, bl7)
  hi += Math.imul(ah5, bh7)
  lo += Math.imul(al4, bl8)
  mid += Math.imul(al4, bh8)
  mid += Math.imul(ah4, bl8)
  hi += Math.imul(ah4, bh8)
  lo += Math.imul(al3, bl9)
  mid += Math.imul(al3, bh9)
  mid += Math.imul(ah3, bl9)
  hi += Math.imul(ah3, bh9)
  var w12 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w12 >>> 26)
  w12 &= 0x3ffffff
  /* k = 13 */
  lo = Math.imul(al9, bl4)
  mid = Math.imul(al9, bh4)
  mid += Math.imul(ah9, bl4)
  hi = Math.imul(ah9, bh4)
  lo += Math.imul(al8, bl5)
  mid += Math.imul(al8, bh5)
  mid += Math.imul(ah8, bl5)
  hi += Math.imul(ah8, bh5)
  lo += Math.imul(al7, bl6)
  mid += Math.imul(al7, bh6)
  mid += Math.imul(ah7, bl6)
  hi += Math.imul(ah7, bh6)
  lo += Math.imul(al6, bl7)
  mid += Math.imul(al6, bh7)
  mid += Math.imul(ah6, bl7)
  hi += Math.imul(ah6, bh7)
  lo += Math.imul(al5, bl8)
  mid += Math.imul(al5, bh8)
  mid += Math.imul(ah5, bl8)
  hi += Math.imul(ah5, bh8)
  lo += Math.imul(al4, bl9)
  mid += Math.imul(al4, bh9)
  mid += Math.imul(ah4, bl9)
  hi += Math.imul(ah4, bh9)
  var w13 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w13 >>> 26)
  w13 &= 0x3ffffff
  /* k = 14 */
  lo = Math.imul(al9, bl5)
  mid = Math.imul(al9, bh5)
  mid += Math.imul(ah9, bl5)
  hi = Math.imul(ah9, bh5)
  lo += Math.imul(al8, bl6)
  mid += Math.imul(al8, bh6)
  mid += Math.imul(ah8, bl6)
  hi += Math.imul(ah8, bh6)
  lo += Math.imul(al7, bl7)
  mid += Math.imul(al7, bh7)
  mid += Math.imul(ah7, bl7)
  hi += Math.imul(ah7, bh7)
  lo += Math.imul(al6, bl8)
  mid += Math.imul(al6, bh8)
  mid += Math.imul(ah6, bl8)
  hi += Math.imul(ah6, bh8)
  lo += Math.imul(al5, bl9)
  mid += Math.imul(al5, bh9)
  mid += Math.imul(ah5, bl9)
  hi += Math.imul(ah5, bh9)
  var w14 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w14 >>> 26)
  w14 &= 0x3ffffff
  /* k = 15 */
  lo = Math.imul(al9, bl6)
  mid = Math.imul(al9, bh6)
  mid += Math.imul(ah9, bl6)
  hi = Math.imul(ah9, bh6)
  lo += Math.imul(al8, bl7)
  mid += Math.imul(al8, bh7)
  mid += Math.imul(ah8, bl7)
  hi += Math.imul(ah8, bh7)
  lo += Math.imul(al7, bl8)
  mid += Math.imul(al7, bh8)
  mid += Math.imul(ah7, bl8)
  hi += Math.imul(ah7, bh8)
  lo += Math.imul(al6, bl9)
  mid += Math.imul(al6, bh9)
  mid += Math.imul(ah6, bl9)
  hi += Math.imul(ah6, bh9)
  var w15 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w15 >>> 26)
  w15 &= 0x3ffffff
  /* k = 16 */
  lo = Math.imul(al9, bl7)
  mid = Math.imul(al9, bh7)
  mid += Math.imul(ah9, bl7)
  hi = Math.imul(ah9, bh7)
  lo += Math.imul(al8, bl8)
  mid += Math.imul(al8, bh8)
  mid += Math.imul(ah8, bl8)
  hi += Math.imul(ah8, bh8)
  lo += Math.imul(al7, bl9)
  mid += Math.imul(al7, bh9)
  mid += Math.imul(ah7, bl9)
  hi += Math.imul(ah7, bh9)
  var w16 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w16 >>> 26)
  w16 &= 0x3ffffff
  /* k = 17 */
  lo = Math.imul(al9, bl8)
  mid = Math.imul(al9, bh8)
  mid += Math.imul(ah9, bl8)
  hi = Math.imul(ah9, bh8)
  lo += Math.imul(al8, bl9)
  mid += Math.imul(al8, bh9)
  mid += Math.imul(ah8, bl9)
  hi += Math.imul(ah8, bh9)
  var w17 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w17 >>> 26)
  w17 &= 0x3ffffff
  /* k = 18 */
  lo = Math.imul(al9, bl9)
  mid = Math.imul(al9, bh9)
  mid += Math.imul(ah9, bl9)
  hi = Math.imul(ah9, bh9)
  var w18 = c + lo + ((mid & 0x1fff) << 13)
  c = hi + (mid >>> 13) + (w18 >>> 26)
  w18 &= 0x3ffffff
  o[0] = w0
  o[1] = w1
  o[2] = w2
  o[3] = w3
  o[4] = w4
  o[5] = w5
  o[6] = w6
  o[7] = w7
  o[8] = w8
  o[9] = w9
  o[10] = w10
  o[11] = w11
  o[12] = w12
  o[13] = w13
  o[14] = w14
  o[15] = w15
  o[16] = w16
  o[17] = w17
  o[18] = w18
  if (c !== 0) {
    o[19] = c
    out.length++
  }
  return out
}


/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(6).Buffer
var BN = __webpack_require__(112)
var ECPoint = __webpack_require__(283)
var ECJPoint = __webpack_require__(284)

function ECPointG () {
  this.x = BN.fromBuffer(Buffer.from('79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798', 'hex'))
  this.y = BN.fromBuffer(Buffer.from('483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8', 'hex'))
  this.inf = false

  this._precompute()
}

ECPointG.prototype._precompute = function () {
  var ecpoint = new ECPoint(this.x, this.y)

  var dstep = 4
  var points = new Array(1 + Math.ceil(257 / dstep))
  var acc = points[0] = ecpoint
  for (var i = 1; i < points.length; ++i) {
    for (var j = 0; j < dstep; j++) acc = acc.dbl()
    points[i] = acc
  }

  this.precomputed = {
    naf: ecpoint._getNAFPoints(7),
    doubles: {
      step: dstep,
      points: points,
      negpoints: points.map(function (p) { return p.neg() })
    }
  }
}

ECPointG.prototype.mul = function (num) {
  // Algorithm 3.42 Fixed-base NAF windowing method for point multiplication
  var step = this.precomputed.doubles.step
  var points = this.precomputed.doubles.points
  var negpoints = this.precomputed.doubles.negpoints

  var naf = num.getNAF(1)
  var I = ((1 << (step + 1)) - (step % 2 === 0 ? 2 : 1)) / 3

  // Translate into more windowed form
  var repr = []
  for (var j = 0; j < naf.length; j += step) {
    var nafW = 0
    for (var k = j + step - 1; k >= j; k--) nafW = (nafW << 1) + naf[k]
    repr.push(nafW)
  }

  var a = new ECJPoint(null, null, null)
  var b = new ECJPoint(null, null, null)
  for (var i = I; i > 0; i--) {
    for (var jj = 0; jj < repr.length; jj++) {
      if (repr[jj] === i) {
        b = b.mixedAdd(points[jj])
      } else if (repr[jj] === -i) {
        b = b.mixedAdd(negpoints[jj])
      }
    }

    a = a.add(b)
  }

  return ECPoint.fromECJPoint(a)
}

ECPointG.prototype.mulAdd = function (k1, p2, k2) {
  var nafPointsP1 = this.precomputed.naf
  var nafPointsP2 = p2._getNAFPoints1()
  var wnd = [nafPointsP1.points, nafPointsP2.points]
  var naf = [k1.getNAF(nafPointsP1.wnd), k2.getNAF(nafPointsP2.wnd)]

  var acc = new ECJPoint(null, null, null)
  var tmp = [null, null]
  for (var i = Math.max(naf[0].length, naf[1].length); i >= 0; i--) {
    var k = 0

    for (; i >= 0; ++k, --i) {
      tmp[0] = naf[0][i] | 0
      tmp[1] = naf[1][i] | 0

      if (tmp[0] !== 0 || tmp[1] !== 0) break
    }

    if (i >= 0) k += 1
    acc = acc.dblp(k)

    if (i < 0) break

    for (var jj = 0; jj < 2; jj++) {
      var z = tmp[jj]
      var p
      if (z === 0) {
        continue
      } else if (z > 0) {
        p = wnd[jj][z >> 1]
      } else if (z < 0) {
        p = wnd[jj][-z >> 1].neg()
      }

      // hack: ECPoint detection
      if (p.z === undefined) {
        acc = acc.mixedAdd(p)
      } else {
        acc = acc.add(p)
      }
    }
  }

  return acc
}

module.exports = new ECPointG()


/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const whilst = __webpack_require__(349)
const hmac = __webpack_require__(257)

const cipherMap = {
  'AES-128': {
    ivSize: 16,
    keySize: 16
  },
  'AES-256': {
    ivSize: 16,
    keySize: 32
  },
  Blowfish: {
    ivSize: 8,
    cipherKeySize: 32
  }
}

// Generates a set of keys for each party by stretching the shared key.
// (myIV, theirIV, myCipherKey, theirCipherKey, myMACKey, theirMACKey)
module.exports = (cipherType, hash, secret, callback) => {
  const cipher = cipherMap[cipherType]

  if (!cipher) {
    return callback(new Error('unkown cipherType passed'))
  }

  if (!hash) {
    return callback(new Error('unkown hashType passed'))
  }

  const cipherKeySize = cipher.keySize
  const ivSize = cipher.ivSize
  const hmacKeySize = 20
  const seed = Buffer.from('key expansion')
  const resultLength = 2 * (ivSize + cipherKeySize + hmacKeySize)

  hmac.create(hash, secret, (err, m) => {
    if (err) {
      return callback(err)
    }

    m.digest(seed, (err, a) => {
      if (err) {
        return callback(err)
      }

      let result = []
      let j = 0

      whilst(
        () => j < resultLength,
        stretch,
        finish
      )

      function stretch (cb) {
        m.digest(Buffer.concat([a, seed]), (err, b) => {
          if (err) {
            return cb(err)
          }

          let todo = b.length

          if (j + todo > resultLength) {
            todo = resultLength - j
          }

          result.push(b)

          j += todo

          m.digest(a, (err, _a) => {
            if (err) {
              return cb(err)
            }
            a = _a
            cb()
          })
        })
      }

      function finish (err) {
        if (err) {
          return callback(err)
        }

        const half = resultLength / 2
        const resultBuffer = Buffer.concat(result)
        const r1 = resultBuffer.slice(0, half)
        const r2 = resultBuffer.slice(half, resultLength)

        const createKey = (res) => ({
          iv: res.slice(0, ivSize),
          cipherKey: res.slice(ivSize, ivSize + cipherKeySize),
          macKey: res.slice(ivSize + cipherKeySize)
        })

        callback(null, {
          k1: createKey(r1),
          k2: createKey(r2)
        })
      }
    })
  })
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ecdh = __webpack_require__(444)

// Generates an ephemeral public key and returns a function that will compute
// the shared secret key.
//
// Focuses only on ECDH now, but can be made more general in the future.
module.exports = (curve, callback) => {
  ecdh.generateEphmeralKeyPair(curve, callback)
}


/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const webcrypto = __webpack_require__(135)()
const nodeify = __webpack_require__(134)
const BN = __webpack_require__(66).bignum

const util = __webpack_require__(277)
const toBase64 = util.toBase64
const toBn = util.toBn

const bits = {
  'P-256': 256,
  'P-384': 384,
  'P-521': 521
}

exports.generateEphmeralKeyPair = function (curve, callback) {
  nodeify(webcrypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: curve
    },
    true,
    ['deriveBits']
  ).then((pair) => {
    // forcePrivate is used for testing only
    const genSharedKey = (theirPub, forcePrivate, cb) => {
      if (typeof forcePrivate === 'function') {
        cb = forcePrivate
        forcePrivate = undefined
      }

      let privateKey

      if (forcePrivate) {
        privateKey = webcrypto.subtle.importKey(
          'jwk',
          unmarshalPrivateKey(curve, forcePrivate),
          {
            name: 'ECDH',
            namedCurve: curve
          },
          false,
          ['deriveBits']
        )
      } else {
        privateKey = Promise.resolve(pair.privateKey)
      }

      const keys = Promise.all([
        webcrypto.subtle.importKey(
          'jwk',
          unmarshalPublicKey(curve, theirPub),
          {
            name: 'ECDH',
            namedCurve: curve
          },
          false,
          []
        ),
        privateKey
      ])

      nodeify(keys.then((keys) => webcrypto.subtle.deriveBits(
        {
          name: 'ECDH',
          namedCurve: curve,
          public: keys[0]
        },
        keys[1],
        bits[curve]
      )).then((bits) => Buffer.from(bits)), cb)
    }

    return webcrypto.subtle.exportKey('jwk', pair.publicKey)
      .then((publicKey) => {
        return {
          key: marshalPublicKey(publicKey),
          genSharedKey
        }
      })
  }), callback)
}

const curveLengths = {
  'P-256': 32,
  'P-384': 48,
  'P-521': 66
}

// Marshal converts a jwk encodec ECDH public key into the
// form specified in section 4.3.6 of ANSI X9.62. (This is the format
// go-ipfs uses)
function marshalPublicKey (jwk) {
  const byteLen = curveLengths[jwk.crv]

  return Buffer.concat([
    Buffer.from([4]), // uncompressed point
    toBn(jwk.x).toArrayLike(Buffer, 'be', byteLen),
    toBn(jwk.y).toArrayLike(Buffer, 'be', byteLen)
  ], 1 + byteLen * 2)
}

// Unmarshal converts a point, serialized by Marshal, into an jwk encoded key
function unmarshalPublicKey (curve, key) {
  const byteLen = curveLengths[curve]

  if (!key.slice(0, 1).equals(Buffer.from([4]))) {
    throw new Error('Invalid key format')
  }
  const x = new BN(key.slice(1, byteLen + 1))
  const y = new BN(key.slice(1 + byteLen))

  return {
    kty: 'EC',
    crv: curve,
    x: toBase64(x, byteLen),
    y: toBase64(y, byteLen),
    ext: true
  }
}

function unmarshalPrivateKey (curve, key) {
  const result = unmarshalPublicKey(curve, key.public)
  result.d = toBase64(new BN(key.private))
  return result
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const keys = __webpack_require__(344).keys
const encode = __webpack_require__(739)

const defaultOptions = {
  algo: 'Ed25519',
  bits: 512
}

async function generateKeys (options) {
  return new Promise((resolve, reject) => {
    options = Object.assign({}, defaultOptions, options)
    keys.generateKeyPair(options.algo, options.bits, (err, key) => {
      if (err) { return reject(err) }
      resolve({
        'read': encode(keys.marshalPublicKey(key.public)),
        'write': encode(keys.marshalPrivateKey(key))
      })
    })
  })
}

module.exports = generateKeys


/***/ }),
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */,
/* 730 */,
/* 731 */,
/* 732 */,
/* 733 */,
/* 734 */,
/* 735 */,
/* 736 */,
/* 737 */,
/* 738 */,
/* 739 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const encode = __webpack_require__(254).encode

module.exports = function encodeKey (key) {
  return encode(Buffer.from(key))
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ })
]);
//# sourceMappingURL=1.30c06bc4.chunk.js.map