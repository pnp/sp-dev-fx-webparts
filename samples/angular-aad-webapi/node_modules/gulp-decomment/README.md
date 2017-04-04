gulp-decomment
==============

Uses [decomment] to remove comments from JSON, JavaScript, CSS, HTML, etc.

[![Build Status](https://travis-ci.org/vitaly-t/gulp-decomment.svg?branch=master)](https://travis-ci.org/vitaly-t/gulp-decomment)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/gulp-decomment/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/gulp-decomment?branch=master)

## Installing

```
$ npm install gulp-decomment
```

## Testing

```
$ npm test
```

Testing with coverage:
```
$ npm run coverage
```

## Usage

```js
var gulp = require('gulp');
var decomment = require('gulp-decomment');

gulp.task('default', function () {
  return gulp.src('input.js')
    .pipe(decomment({trim: true}))
    .pipe(gulp.dest('dest'));
});
```

## API

Available methods, according to [decomment API](https://github.com/vitaly-t/decomment#api):

##### - [decomment([options])](https://github.com/vitaly-t/decomment#decommentcode-options--string)
##### - [decomment.text([options])](https://github.com/vitaly-t/decomment#decommenttexttext-options--string)
##### - [decomment.html([options])](https://github.com/vitaly-t/decomment#decommenthtmlhtml-options--string)

## License

Copyright © 2016 [Vitaly Tomilov](https://github.com/vitaly-t);
Released under the MIT license.

[decomment]:https://github.com/vitaly-t/decomment
