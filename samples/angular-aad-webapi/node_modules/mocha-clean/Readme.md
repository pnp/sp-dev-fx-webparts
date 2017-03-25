# mocha-clean

Cleans up [mocha] test stack traces.

![Loading screenshot...](https://raw.githubusercontent.com/rstacruz/mocha-clean/gh-pages/comparison.png)

[![Status](http://img.shields.io/travis/rstacruz/mocha-clean/master.svg?style=flat)](https://travis-ci.org/rstacruz/mocha-clean "See test builds")


## Purpose

Mocha stack traces are riddled with frames that you don't want to see, like code from modules and Mocha internals.

```
  1) Test:
     ReferenceError: someKey is not defined
      at Context.<anonymous> (/Users/rsc/Projects/mocha-clean/test/test.js:24:5)
      at callFn (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runnable.js:249:21)
      at Test.Runnable.run (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runnable.js:242:7)
      at Runner.runTest (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runner.js:373:10)
      ...
```

This is better:

```
  1) Test:
     ReferenceError: someKey is not defined
      at myFunction (test/test:7:1)
      at test/test.js:24:5
```

It strips away mocha internals, node_modules, absolute paths (based on cwd), and 
other unneccessary cruft.

<br>

## Usage (Node.js)

[![npm version](http://img.shields.io/npm/v/mocha-clean.svg?style=flat)](https://npmjs.org/package/mocha-clean "View this project on npm")
Available via npm.

```sh
$ npm i --save-dev mocha-clean
```

Add this to your `test/mocha.opts`:

```js
--require mocha-clean
```

<br>

## Usage (browser)

Experimental browser support is available. Get the latest version here:

> [](#version) `<script src="//cdn.rawgit.com/rstacruz/mocha-clean/v0.3.0/index.js"></script>`

In the browser, use `mocha.traceIgnores` to define files to be excluded. Your
setup will likely look like this (with [chai.js] in this example):

```html
<script src="mocha.js"></script>
<script src="chai.js"></script>
<script src="mocha-clean.js"></script>
<script>mocha.setup('bdd')</script>
<script>mocha.traceIgnores = ['mocha.js', 'chai.js']</script>
<script src="tests.js"></script>
<script>mocha.run()</script>
```

[chai.js]: http://chaijs.com

<br>

## Brief mode

To display [brief format] error messages similar to C++, Ruby and so on,
add this to `test/mocha.opts`:

```js
--require mocha-clean/brief
```

This displays the filenames first (`file:n:n: function`), which is reformatted from
the JavaScript-style `at function (file:n:n)`.

```
1) error:
   ReferenceError: xyz is not defined
    test/fail.js:12:4: myfunction
    test/fail.js:9:9: Context.<anonymous>
```

<br>

## Showing node_modules

By default, mocha-clean removes anything under `node_modules`.
To disable this behavior, add this to `test/mocha.opts`:

```js
--require mocha-clean/show_node_modules
```

<br>

## Using with Gulp, Grunt, Karma, et al

See: **[Using with mocha loaders ▸](docs/Using_with_mocha_loaders.md)**

<br>

## Showing absolute paths

By default, mocha-clean removes the current working directory from the beginning
of paths. To disable this behavior, add this to `test/mocha.opts`:

```js
--require mocha-clean/absolute_paths
```

<br>

## Related discussions

There was talk in 2012 to bring this feature to mocha itself (see [mocha#545]),
which never came to a resolve.

mocha-clean has been tested with mocha 1.21.x and will likely work for the 
entire mocha 1.x series.

[mocha#545]: https://github.com/visionmedia/mocha/issues/545

<br>

## Thanks

[mocha]: http://visionmedia.github.io/mocha
[brief format]: http://gcc.gnu.org/onlinedocs/gnat_ugn_unw/Output-and-Error-Message-Control.html

**mocha-clean** © 2014+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/mocha-clean/contributors

