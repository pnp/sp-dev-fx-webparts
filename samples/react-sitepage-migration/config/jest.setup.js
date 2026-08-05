'use strict';

const nodeCrypto = require('crypto');
const { TextDecoder, TextEncoder } = require('util');

const define = (name, value) => {
  if (globalThis[name] === undefined) {
    Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  }
};

define('TextEncoder', TextEncoder);
define('TextDecoder', TextDecoder);

if (globalThis.crypto === undefined) {
  define('crypto', nodeCrypto.webcrypto);
} else if (globalThis.crypto.subtle === undefined) {
  Object.defineProperty(globalThis.crypto, 'subtle', {
    value: nodeCrypto.webcrypto.subtle,
    configurable: true
  });
}
