gulp-typescript
===============
A gulp plugin for handling TypeScript compilation workflow. The plugin exposes TypeScript's compiler options to gulp using TypeScript API.

Updating from version 2? See the [breaking changes in version 3](http://dev.ivogabe.com/gulp-typescript-3/).

[![Build Status](https://travis-ci.org/ivogabe/gulp-typescript.svg?branch=master)](https://travis-ci.org/ivogabe/gulp-typescript)

Features
--------
- Incremental compilation (so faster builds)
- Error reporting
- Different output streams for .js, .d.ts files.
- Support for sourcemaps using gulp-sourcemaps
- Compile once, and filter different targets

How to install
--------------
##### 1. Install gulp
```shell
npm install --global gulp
```
##### 2. Install gulp in the project dependency
```shell
npm install gulp
```
##### 3. Install gulp-typescript & TypeScript
```shell
npm install gulp-typescript typescript
```

Options
-------
Allmost all options from TypeScript are supported.
- `outFile` (string) - Generate one javascript and one definition file. Only works when no module system is used.
- `outDir` (string) - Move output to a different (virtual) directory. Note that you still need `gulp.dest` to write output to disk.
- `noImplicitAny` (boolean) - Warn on expressions and declarations with an implied 'any' type.
- `suppressImplicitAnyIndexErrors` (boolean) - Suppress `--noImplicitAny` errors for indexing objects lacking index signatures.
- `noLib` (boolean) - Don't include the default lib (with definitions for - Array, Date etc)
- `lib` (string[]) - List of library files to be included in the compilation.
- `target` (string) - Specify ECMAScript target version: 'ES3' (default), 'ES5' or 'ES6'.
- `module` (string) - Specify module code generation: 'commonjs', 'amd', 'umd' or 'system'.
- `jsx` (string) - Specify jsx code generation: 'react' or 'preserve' (TS1.6+).
- `declaration` (boolean) - Generates corresponding .d.ts files. You need to pipe the `dts` streams to save these files.
- `removeComments` (boolean) - Do not emit comments to output.
- `emitDecoratorMetadata` (boolean) - Emit design-time metadate for decorated declarations in source.
- `experimentalAsyncFunctions` (boolean) - Support for ES7-proposed asynchronous functions using the `async`/`await` keywords (TS1.6+).
- `experimentalDecorators` (boolean) - Enables experimental support for ES7 decorators.
- `moduleResolution` (string) - Determine how modules get resolved. Either 'node' for Node.js/io.js style resolution, or 'classic' (default) (TS1.6+).
- `noEmitOnError` (boolean) - Do not emit outputs if any type checking errors were reported.
- `noEmitHelpers` (boolean) - Do not generate custom helper functions like __extends in compiled output.
- `preserveConstEnums` (boolean) - Do not erase const enum declarations in generated code. 
- `isolatedModules` (boolean) - Compiles files seperately and doesn't check types, which causes a big speed increase. You have to use gulp-plumber and TypeScript 1.5+.
- `allowJs` (boolean) - Allow JavaScript files to be compiled.
- `rootDir` - Specifies the root directory of input files. Only use to control the output directory structure with `outDir`.

See the [TypeScript wiki](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for a complete list.
These options are not supported:
- Sourcemap options (`sourceMap`, `inlineSourceMap`, `inlineSources`, `sourceRoot`) - Use  [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) instead.
- `watch` - Use `gulp.watch` instead. See the paragraph "Incremental compilation".
- `project` - See "Using `tsconfig.json`".
- Obvious: `help`, `version`

Basic Usage
----------
Below is a minimal `gulpfile.js` which will compile all TypeScript file in folder `src` and emit a single output file called `output.js` in  `built/local`. To invoke, simple run `gulp`.

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('built/local'));
});
```
Another example of `gulpfile.js`. Instead of creating the default task, the file specifies custom named task. To invoke, run `gulp scripts` instead of `gulp`. As a result, the task will generate both JavaScript files and TypeScript definition files (`.d.ts`).
```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');  // Requires separate installation

gulp.task('scripts', function() {
    var tsResult = gulp.src('lib/**/*.ts')
        .pipe(ts({
            declaration: true
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});
```
`tsResult` is a stream containing the generated JavaScript and definition files.
In many situations, some plugins need to be executed on the JavaScript files.
For these situations, the stream has sub-streams, namely a JavaScript stream (`tsResult.js`) and a definition file stream (`tsResult.dts`). 
You need to set the `declaration` option to generate definition files.
If you don't need the definition files, you can use a configuration as seen in the first example.

Incremental compilation
-----------------------
Instead of calling `ts(options)`, you can create a project first, and then call `tsProject()`. An example:
```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject({
    declaration: true
});

gulp.task('scripts', function() {
    var tsResult = gulp.src('lib/*.ts')
        .pipe(tsProject());

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('lib/*.ts', ['scripts']);
});
```
When you run `gulp watch`, the source will be compiled as usual. Then, when you make a change and save the file, your TypeScript files will be compiled in about half the time.

You must create the project outside of the task. You can't use the same project in multiple tasks.
Instead, create multiple projects or use a single task to compile your sources.

Using `tsconfig.json`
-------------
To use `tsconfig.json`, you have to use `ts.createProject`:
```javascript
var tsProject = ts.createProject('tsconfig.json');
```
If you want to add or overwrite certain settings in the `tsconfig.json` file, you can use:
```javascript
var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });
```
The task will look like:
```javascript
gulp.task('scripts', function() {
    var tsResult = gulp.src("lib/**/*.ts") // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('release'));
});
```

You can replace `gulp.src(...)` with `tsProject.src()` to load files based on the tsconfig file (based on `files`, `excludes` and `includes`).

TypeScript version
------------------
gulp-typescript isn't restricted to a single TypeScript version.
You can install the latest stable version using `npm install typescript --save-dev` or a nightly `npm install typescript@next --save-dev`.

You can also use a fork of TypeScript, if it is based on TypeScript 2.x. You can configure this in your gulpfile:
```javascript
[...].pipe(ts({
    typescript: require('my-fork-of-typescript')
}));
```
Or in combination with a `tsconfig` file:
```javascript
var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('my-form-of-typescript')
});
```

Source maps
----------
Example of ```gulpfile.js``` which will compile typescript to javascript as well as generate
associated sourcemap.

```javascript
var gulp = require('gulp')
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function() {
    var tsResult = gulp.src('lib/*.ts')
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts({
            // ...
        }));

    return tsResult.js
        .pipe( ... ) // You can use other plugins that also support gulp-sourcemaps
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest('release/js'));
});
```
For more information, see [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps).

Reporters
---------
You can specify a custom reporter as the second argument of the main function, or as the only argument when using a `tsProject`:
```javascript
ts(options, reporter);
tsProject(reporter);
```
Available reporters are:
- nullReporter (`ts.reporter.nullReporter()`) - Don't report errors
- defaultReporter (`ts.reporter.defaultReporter()`) - Report basic errors to the console
- longReporter (`ts.reporter.longReporter()`) - Extended version of default reporter, intelliJ link functionality + file watcher error highlighting should work using this one
- fullReporter (`ts.reporter.fullReporter(showFullFilename?: boolean)`) - Show full error messages, with source.

If you want to build a custom reporter, you take a look at `lib/reporter.ts`, that file declares an interface which a reporter should implement.

Build gulp-typescript
------------

1. Clone this repo
2. Execute `npm install`
3. Execute `git submodule update --init` to pull down the TypeScript compiler/services versions used in the test suite.
4. Ensure the gulp CLI is globally installed (`npm install -g gulp`).
5. Execute the tests: `gulp`.

The plugin uses itself to compile. There are 2 build directories, ```release``` and ```release-2```. ```release``` must always contain a working build. ```release-2``` contains the last build. When you run ```gulp compile```, the build will be saved in the ```release-2``` directory. ```gulp test``` will compile the source to ```release-2```, and then it will run some tests. If these tests give no errors, you can run ```gulp release```. The contents from ```release-2``` will be copied to ```release```.


License
-------
gulp-typescript is licensed under the [MIT license](http://opensource.org/licenses/MIT).
