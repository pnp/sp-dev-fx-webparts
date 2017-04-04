# gulp-changed [![Build Status](https://travis-ci.org/sindresorhus/gulp-changed.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-changed)

> Only pass through changed files

No more wasting precious time on processing unchanged files.

By default it's only able to detect whether files in the stream changed. If you require something more advanced like knowing if imports/dependencies changed, create a custom comparator, or use [another plugin](https://github.com/gulpjs/gulp#incremental-builds).

---

<p align="center"><b>⚛ Learn React in just a couple of afternoons with this awesome <a href="https://ReactForBeginners.com/friend/AWESOME">React course</a> by Wes Bos</b></p>

---


## Install

```
$ npm install --save-dev gulp-changed
```


## Usage

```js
const gulp = require('gulp');
const changed = require('gulp-changed');
const ngAnnotate = require('gulp-ng-annotate'); // just as an example

const SRC = 'src/*.js';
const DEST = 'dist';

gulp.task('default', () => {
	return gulp.src(SRC)
		.pipe(changed(DEST))
		// ngAnnotate will only get the files that
		// changed since the last time it was run
		.pipe(ngAnnotate())
		.pipe(gulp.dest(DEST));
});
```

## API

### changed(destination, options)

#### destination

Type: `string`, `function`

The destination directory. Same as you put into `gulp.dest()`.

This is needed to be able to compare the current files with the destination files.

Can also be a function returning a destination directory path.

#### options

##### cwd

Type: `string`  
Default: `process.cwd()`

The working directory the folder is relative to.

##### extension

Type: `string`

Extension of the destination files.

Useful if it differs from the original, like in the example below:

```js
gulp.task('jade', () => {
	return gulp.src('src/**/*.jade')
		.pipe(changed('app', {extension: '.html'}))
		.pipe(jade())
		.pipe(gulp.dest('app'))
});
```

##### hasChanged

Type: `function`  
Default: `changed.compareLastModifiedTime`

Function that determines whether the source file is different from the destination file.

###### Built-in comparators

- `changed.compareLastModifiedTime`
- `changed.compareSha1Digest`

###### Example

```js
gulp.task('jade', () => {
	return gulp.src('src/**/*.jade')
		.pipe(changed('app', {hasChanged: changed.compareSha1Digest}))
		.pipe(jade())
		.pipe(gulp.dest('app'));
});
```

You can also supply a custom comparator function which will receive the following arguments:

- `stream` *([transform object stream](https://github.com/rvagg/through2#transformfunction))* - should be used to queue `sourceFile` if it passes some comparison
- `callback` *(function)* - should be called when done
- `sourceFile` *([vinyl file object](https://github.com/wearefractal/vinyl#file))*
- `destPath` *(string)* - destination for `sourceFile` as an absolute path


## In-place change monitoring

If you're looking to process source files in-place without any build output (formatting, linting, etc), have a look at [gulp-changed-in-place](https://github.com/alexgorbatchev/gulp-changed-in-place).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
