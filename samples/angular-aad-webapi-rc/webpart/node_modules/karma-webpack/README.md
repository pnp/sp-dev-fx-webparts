# karma-webpack

## Installation

``` sh
npm install --save-dev karma-webpack
```

## Usage

``` javascript
// Karma configuration

module.exports = function(config) {
	config.set({
		// ... normal karma configuration

		files: [
			// all files ending in "_test"
			'test/*_test.js',
			'test/**/*_test.js'
			// each file acts as entry point for the webpack configuration
		],

		preprocessors: {
			// add webpack as preprocessor
			'test/*_test.js': ['webpack'],
			'test/**/*_test.js': ['webpack']
		},

		webpack: {
			// karma watches the test entry points
			// (you don't need to specify the entry option)
			// webpack watches dependencies

			// webpack configuration
		},

		webpackMiddleware: {
			// webpack-dev-middleware configuration
			// i. e.
			noInfo: true
		},

		plugins: [
			require("karma-webpack")
		]

	});
};
```

## Alternative usage

This configuration is more performant, but you cannot run single test anymore (only the complete suite).

The above configuration generate a webpack bundle for each test. For many testcases this can result in many big files. The alterative configuration creates a single bundle with all testcases.

``` javascript
		files: [
			// only specify one entry point
			// and require all tests in there
			'test/test_index.js'
		],

		preprocessors: {
			// add webpack as preprocessor
			'test/test_index.js': ['webpack']
		},
```

``` javascript
// test/test_index.js

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context(".", true, /_test$/);
testsContext.keys().forEach(testsContext);
```

Every test file is required using the [require.context](http://webpack.github.io/docs/context.html#require-context) and compiled with webpack into one test bundle.

## Source Maps

You can use the `karma-sourcemap-loader` to get the source maps generated for your test bundle.

```
npm install --save-dev karma-sourcemap-loader
```

And then add it to your preprocessors

``` javascript
preprocessors: {
	'test/test_index.js': ['webpack', 'sourcemap']
}
```

And tell webpack to generate sourcemaps

``` javascript
webpack: {
  // ...
	devtool: 'inline-source-map'
}
```

## Options

This is the full list of options you can specify in your Karma config.

### webpack

Webpack configuration.

### webpackMiddleware

Configuration for webpack-dev-middleware.

## License

Copyright 2014-2015 Tobias Koppers

[MIT](http://www.opensource.org/licenses/mit-license.php)
