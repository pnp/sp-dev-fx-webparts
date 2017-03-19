# karma-mocha-clean-reporter

> Karma reporter plugin with mocha-clean style logging. Forked from litixsoft/karma-mocha-reporter.
>
> [![NPM version](https://badge.fury.io/js/karma-mocha-clean-reporter.svg)](http://badge.fury.io/js/karma-mocha-clean-reporter)
> [![Build Status](https://secure.travis-ci.org/davidosomething/karma-mocha-clean-reporter.svg?branch=master)](https://travis-ci.org/davidosomething/karma-mocha-clean-reporter)
> [![david-dm](https://david-dm.org/davidosomething/karma-mocha-clean-reporter.svg?theme=shields.io)](https://david-dm.org/davidosomething/karma-mocha-clean-reporter/)
> [![david-dm](https://david-dm.org/davidosomething/karma-mocha-clean-reporter/dev-status.svg?theme=shields.io)](https://david-dm.org/davidosomething/karma-mocha-clean-reporter#info=devDependencies&view=table)

## Installation

The easiest way is to keep `karma-mocha-clean-reporter` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "^0.12",
    "karma-mocha-clean-reporter": "^0.0.1"
  }
}
```

You can install it by:

    $ npm install karma-mocha-clean-reporter --save-dev

## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha'],

    plugins: [
      'karma-jasmine',
      'karma-mocha-clean-reporter'
    ]
  });
};
```

## Options

### output

**Type:** String

**Possible Values:**

Value | Description
------ | -----------
`full` (default) | all output is printed to the console
`autowatch` | first run will have the full output and the next runs just output the summary and errors in mocha style
`minimal` | only the summary and errors are printed to the console in mocha style
`noFailures` | the failure details are not logged

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // reporters configuration
    reporters: ['mocha-clean'],

    // reporter options
    mochaReporter: {
      output: 'autowatch'
    }
  });
};
```

### ignoreSkipped

**Type:** Boolean

**Possible Values:**
  * `false` (default)
  * `true`

When setting the ignoreSkipped flag to true, the reporter will ignore the skipped tests in the output and you will see
only the tests that where really executed. The summary will still contain the number of skipped tests.


## Contributing

In lieu of a formal styleguide take care to maintain the existing coding style. Lint and test your code using [grunt](http://gruntjs.com/).

You can preview your changes by running:

    $ grunt demo --force

## Release History

* 0.0.1 initial

## Author

[David O'Trakoun](http://davidosomething.com)

## License

Based on work Copyright (C) Litixsoft GmbH <info@litixsoft.de>

Licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included i
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
