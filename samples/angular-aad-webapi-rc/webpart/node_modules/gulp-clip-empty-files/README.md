# [gulp](https://github.com/wearefractal/gulp)-clip-empty-files [![Build Status](https://travis-ci.org/nahody/gulp-clip-empty-files.svg?branch=master)](https://travis-ci.org/nahody/gulp-clip-empty-files)


> Remove empty files from stream. This prevent errors on some other plugins like gulp-sass and can be usefull removing placeholders.


## Install

```sh
$ npm install --save-dev gulp-clip-empty-files
```


## Usage

```js
var gulp = require('gulp');
var clip = require('gulp-clip-empty-files');

gulp.task('default', function () {
    return gulp.src('src/*.scss')
        .pipe(clip())
        .pipe(gulp.dest('dist'));
});
```

## Options

No options available.