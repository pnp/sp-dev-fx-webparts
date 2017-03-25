[![npm Version](https://img.shields.io/npm/v/glob-escape.svg)](https://www.npmjs.com/package/glob-escape)
[![Build Status](https://travis-ci.org/svenschoenung/glob-escape.svg?branch=master)](https://travis-ci.org/svenschoenung/glob-escape)
[![Coverage Status](https://coveralls.io/repos/github/svenschoenung/glob-escape/badge.svg?branch=master)](https://coveralls.io/github/svenschoenung/glob-escape?branch=master)
[![Dependency Status](https://david-dm.org/svenschoenung/glob-escape.svg)](https://david-dm.org/svenschoenung/glob-escape)
[![devDependency Status](https://david-dm.org/svenschoenung/glob-escape/dev-status.svg)](https://david-dm.org/svenschoenung/glob-escape#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/svenschoenung/glob-escape/badges/gpa.svg)](https://codeclimate.com/github/svenschoenung/glob-escape)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/dee709366a3245268e25a81e6a124ce6)](https://www.codacy.com/app/svenschoenung/glob-escape)

# glob-escape

Escapes glob patterns. Works for packages like [`minimatch`](https://www.npmjs.com/package/minimatch), [`multimatch`](https://www.npmjs.com/package/multimatch), [`glob`](https://www.npmjs.com/package/glob), [`glob-stream`](https://www.npmjs.com/package/glob-stream), [`globby`](https://www.npmjs.com/package/globby), [`vinyl-fs`](https://www.npmjs.com/package/vinyl-fs) and [`gulp`](https://www.npmjs.com/package/gulp`).

## Installation

    npm install glob-escape

## Usage

```js
var escapeGlob = require('glob-escape');
var glob = require('glob');
    
glob('algorithms/a*.txt', function(err, array) {
  // array might contain several files like:
  //   - algorithms/a*.txt
  //   - algorithms/alpha-beta_pruning.txt
  //   - algorithms/augmented_lagrangian_method.txt
});
    
glob(escapeGlob('algorithms/a*.txt'), function(err, array) {
  // array will only contain one file:
  //   - algorithms/a*.txt
});
```

## API

### escapeGlob(glob)

Escapes all glob patterns in the provided `glob`.

`glob` may be a string or an array of strings.

Returns the escaped glob.

## License

[MIT](LICENSE)
