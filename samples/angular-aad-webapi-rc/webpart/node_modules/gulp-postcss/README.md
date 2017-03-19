# gulp-postcss [![Build Status](https://api.travis-ci.org/postcss/gulp-postcss.png)](https://travis-ci.org/postcss/gulp-postcss)

[PostCSS](https://github.com/postcss/postcss) gulp plugin to pipe CSS through
several processors, but parse CSS only once.

## Install

    $ npm install --save-dev gulp-postcss

Install required [postcss plugins](https://www.npmjs.com/browse/keyword/postcss-plugin) separately. E.g. for autoprefixer, you need to install [autoprefixer](https://github.com/postcss/autoprefixer) package.

## Basic usage

```js
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano(),
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
```

## Passing additional options to PostCSS

The second optional argument to gulp-postcss is passed to PostCSS.

This, for instance, may be used to enable custom syntax:

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var scss = require('postcss-scss');

gulp.task('default', function () {
    var processors = [nested];
    return gulp.src('in.css')
        .pipe(postcss(processors, {syntax: scss}))
        .pipe(gulp.dest('out'));
});
```

## Using a custom processor

```js
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var opacity = function (css, opts) {
    css.eachDecl(function(decl) {
        if (decl.prop === 'opacity') {
            decl.parent.insertAfter(decl, {
                prop: '-ms-filter',
                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
            });
        }
    });
};

gulp.task('css', function () {
    var processors = [
        cssnext({browsers: ['last 1 version']}),
        opacity,
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
```

## Source map support

Source map is disabled by default, to extract map use together
with [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps).

```js
return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));
```

## Changelog

* 6.1.1
  * Fixed the error output

* 6.1.0
  * Support for `null` files
  * Updated dependencies

* 6.0.1
  * Added an example and a test to pass options to PostCSS (e.g. `syntax` option)
  * Updated vinyl-sourcemaps-apply to 0.2.0

* 6.0.0
  * Updated PostCSS to version 5.0.0

* 5.1.10
  * Use autoprefixer in README

* 5.1.9
  * Prevent unhandled exception of the following pipes from being suppressed by Promise

* 5.1.8
  * Prevent stream’s unhandled exception from being suppressed by Promise

* 5.1.7
  * Updated direct dependencies

* 5.1.6
  * Updated `CssSyntaxError` check

* 5.1.4
  * Simplified error handling
  * Simplified postcss execution with object processors

* 5.1.3 Updated travis banner

* 5.1.2 Transferred repo into postcss org on github

* 5.1.1
  * Allow override of `to` option

* 5.1.0 PostCSS Runner Guidelines
  * Set `from` and `to` processing options
  * Don't output js stack trace for `CssSyntaxError`
  * Display `result.warnings()` content

* 5.0.1
  * Fix to support object processors

* 5.0.0
  * Use async API

* 4.0.3
  * Fixed bug with relative source map

* 4.0.2
  * Made PostCSS a simple dependency, because peer dependency is deprecated

* 4.0.1
  * Made PostCSS 4.x a peer dependency

* 4.0.0
  * Updated PostCSS to 4.0

* 3.0.0
  * Updated PostCSS to 3.0 and fixed tests

* 2.0.1
  * Added Changelog
  * Added example for a custom processor in README

* 2.0.0
  * Disable source map by default
  * Test source map
  * Added Travis support
  * Use autoprefixer-core in README

* 1.0.2
  * Improved README

* 1.0.1
  * Don't add source map comment if used with gulp-sourcemap

* 1.0.0
  * Initial release
