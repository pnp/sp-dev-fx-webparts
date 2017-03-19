# [gulp](https://github.com/gulpjs/gulp)-texttojs
> Converts text files into JavaScript.

## Install

Install with [npm](https://npmjs.org/package/gulp-texttojs)

```
$ npm install --save-dev gulp-texttojs
```

## Description

Converts a text file (css, html, etc) into a javascript file, which by default is exported as an amd module, but
can be tweaked to do anything you want with the file as a javascript string.

## Usage

```js
var gulp = require('gulp'),
    texttojs = require('gulp-texttojs');

gulp.task('default', function() {
    return gulp.src('src/*.css')
        .pipe(texttojs()
        .pipe(gulp.dest('dist'));
});
```

Input (file.txt):
```text
Hello, "world!"
```

Output (file.txt.js):
```javascript
define([], function() { return "Hello, \"world!\""; });
```

## API

### texttojs(options)

#### options.template
Type: `String` or `Function`
Default: `define([], function() { return <%= content %>; });`

You can use <%= content %> to place the text file string content. The content will include quotes around the escaped content. By default the file is converted into an AMD export. The function will be passed the current stream file object and is expected to return the template string.

#### options.ext
Type: 'String'
Default: `.js`

#### options.isExtensionAppended
Type: 'Boolean'
Default: `true`

If set to true, the extension is appended to the filename. Otherwise the current extension is replaced with the given ext value if provided.

## License

MIT © [David Zearing](http://github.com/dzearing)
