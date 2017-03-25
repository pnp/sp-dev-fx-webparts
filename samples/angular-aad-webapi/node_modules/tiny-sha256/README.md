# A small SHA-256 implementation for JavaScript

The goals of this project are:
* small size  - the minified version is only 849 bytes
* readability - the unminified code should be relatively easy to understand/review

Input must be an ASCII string - if character codes outside the range 0-255 are received, `undefined` is returned.

## In the browser

The code (`sha256.js` or `sha256.min.js`) defines the `sha256(string)` function, which returns the hexadecimal-encoded SHA-256 hash of the input string.

AMD is also supported - use `index.js` instead.

## In Node/CommonJS

If you're on Node, you should probably use the version from the built-in [`crypto` module](http://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm).

However, it is made available as a CommonJS module, including the source code for the minified version:

```javascript
var sha256 = require('tiny-sha256');

var jsCode = sha256.code + 'alert(sha256("hello!"));';
```

## License

This library is released as "public domain".  You can copy, modify, re-release and re-license, or incorporate into any other project without restriction of any kind.