---
title: Using with mocha loaders
---

# Using with mocha loaders

There are a few modules that invoke Mocha as a dependency, such as:

 * [gulp-mocha](http://npmjs.org/package/gulp-mocha)
 * [grunt-mocha](http://npmjs.org/package/grunt-mocha)
 * [grunt-webdriver](http://npmjs.org/package/grunt-webdriver)
 * [karma-mocha](http://npmjs.org/package/karma-mocha)

Getting 3rd-party mocha addons like mocha-clean aren't always straight-forward, and the `--require mocha-clean` argument will not always work. Fortunately, there are work-arounds based on `npm dedupe` ([docs](https://www.npmjs.org/doc/cli/npm-dedupe.html)).

## Using mocha-clean with gulp

1. Ensure that `mocha` and `mocha-clean` are part of your main project's package.json *devDependencies*.

2. If you have a `npm-shrinkwrap.json` file, be sure to install `mocha` and `mocha-clean` via `npm install`, then re-invoke `npm shrinkwrap`. ([docs](https://www.npmjs.org/doc/cli/npm-shrinkwrap.html))

3. Run `npm dedupe`. This makes `gulp-mocha` use the same top-level `mocha` package.

4. Add `require('mocha-clean')` in the top-level scope of your *gulpfile.js*. This patches the top-level `mocha` package.

5. Use gulp-mocha as usual. mocha-clean should now work.

## Using mocha-clean with grunt

Same as above, but add `require('mocha-clean')` to your *Gruntfile.js*.

Related issue: [#3](https://github.com/rstacruz/mocha-clean/issues/3)

## Using mocha-clean with karma

Same as above, but add `require('mocha-clean')` to your *karma.conf.js*.

Related issue: [#5](https://github.com/rstacruz/mocha-clean/issues/5)
