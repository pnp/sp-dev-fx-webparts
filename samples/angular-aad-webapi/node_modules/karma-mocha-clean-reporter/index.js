'use strict';

var chalk = require('chalk');
var logSymbols = require('log-symbols');

var mochaClean = require('mocha-clean');

/**
 * The MochaReporter.
 *
 * @param {!object} baseReporterDecorator The karma base reporter.
 * @param {!Function} formatError The karma function to format an error.
 * @param {!object} config The karma config.
 * @constructor
 */
var MochaReporter = function (baseReporterDecorator, formatError, config) {
    // extend the base reporter
    baseReporterDecorator(this);

    var self = this;
    var firstRun = true;

    config.mochaReporter = config.mochaReporter || {};

    var outputMode = config.mochaReporter.output || 'full';
    var ignoreSkipped = config.mochaReporter.ignoreSkipped || false;

    // disable chalk when colors is set to false
    chalk.enabled = config.colors !== false;

    function getLogSymbol (symbol) {
        return chalk.enabled ? symbol : chalk.stripColor(symbol);
    }

    /**
     * Returns a formatted time interval
     *
     * @param {!number} time The time.
     * @returns {string}
     */
    function formatTimeInterval (time) {
        var mins = Math.floor(time / 60000);
        var secs = (time - mins * 60000) / 1000;
        var str = secs + (secs === 1 ? ' sec' : ' secs');

        if (mins) {
            str = mins + (mins === 1 ? ' min ' : ' mins ') + str;
        }

        return str;
    }

    /**
     * Returns the text repeated n times.
     *
     * @param {!string} text The text.
     * @param {!number} n The number of times the string should be repeated.
     * @returns {string}
     */
    function repeatString (text, n) {
        var res = [];
        var i;

        for (i = 0; i < n; i++) {
            res.push(text);
        }

        return res.join('');
    }

    /**
     * Writes the test results to the output
     *
     * @param {!object} suite The test suite
     * @param {number=} depth The indention.
     */
    function print (suite, depth) {
        var keys = Object.keys(suite);
        var length = keys.length;
        var i, item;

        if (firstRun) {
            self.write(chalk.underline.bold('\nStart:') + '\n');
            firstRun = false;
        }

        for (i = 0; i < length; i++) {
            item = suite[keys[i]];

            // start of a new suite
            if (item.isRoot) {
                depth = 1;
            }

            // only print to output once
            if (item.name && !item.printed && (!item.skipped || !ignoreSkipped)) {
                // indent
                var line = repeatString('  ', depth) + item.name;

                // it block
                if (item.type === 'it') {
                    if (item.skipped) {
                        // print skipped tests grey
                        line = chalk.gray(line + ' (skipped)');
                    } else {
                        // set color to green or red
                        line = item.success ? chalk.green(line) : chalk.red(line);
                    }
                } else {
                    // print name of a suite block in bold
                    line = chalk.bold(line);
                }

                // use write method of baseReporter
                self.write(line + '\n');

                // set item as printed
                item.printed = true;
            }

            if (item.items) {
                // print all child items
                print(item.items, depth + 1);
            }
        }
    }

    /**
     * Writes the failed test to the output
     *
     * @param {!object} suite The test suite
     * @param {number=} depth The indention.
     */
    function printFailures (suite, depth) {
        var keys = Object.keys(suite);
        var length = keys.length;
        var i, item;

        for (i = 0; i < length; i++) {
            item = suite[keys[i]];

            // start of a new suite
            if (item.isRoot) {
                depth = 1;
            }

            // only print to output when test failed
            if (item.name && !item.success && !item.skipped) {
                // indent
                var line = repeatString('  ', depth) + item.name;

                // it block
                if (item.type === 'it') {
                    // make item name red
                    line = chalk.red(line) + '\n';

                    // add all browser in which the test failed with color yellow
                    for (var bi = 0; bi < item.failed.length; bi++) {
                        var browserName = item.failed[bi];
                        line += repeatString('  ', depth + 1) + chalk.italic.yellow(browserName) + '\n';
                    }

                    // add the error log in red
                    item.log = item.log || [];

                    item.log.forEach(function (error) {
                        var stackObject = { stack: error };
                        var cleanedError = mochaClean.cleanError(stackObject);
                        var indentedError = formatError(cleanedError.stack, repeatString('  ', depth));
                        line += chalk.red(indentedError);
                    });
                }

                // use write method of baseReporter
                self.write(line + '\n');
            }

            if (item.items) {
                // print all child items
                printFailures(item.items, depth + 1);
            }
        }
    }

    /**
     * Returns all properties of the given object
     *
     * @param {!Object} obj
     * @returns {Array}
     */
    function listAllObjectProperties (obj) {
        var objectToInspect;
        var result = [];

        for (objectToInspect = obj; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
            result = result.concat(Object.getOwnPropertyNames(objectToInspect));
        }

        return result;
    }

    /**
     * Returns if the property is an reserverd object property
     *
     * @param {!Object} obj
     * @param {!String} property
     * @returns {boolean}
     */
    function isReservedProperty (obj, property) {
        return listAllObjectProperties(Object.getPrototypeOf(obj)).indexOf(property) > -1;
    }

    /**
     * Called each time a test is completed in a given browser.
     *
     * @param {!object} browser The current browser.
     * @param {!object} result The result of the test.
     */
    function specComplete (browser, result) {
        // complete path of the test
        var path = [].concat(result.suite, result.description);
        var maxDepth = path.length - 1;

        path.reduce(function (suite, description, depth) {
            if (isReservedProperty(suite, description)) {
                self.write(chalk.yellow('Reserved name for ' + (depth === maxDepth ? 'it' : 'describe') + ' block (' + description + ')! Please use an other name, otherwise the result are not printed correctly\n'));
                return {};
            }

            var item = suite[description] || {};
            suite[description] = item;

            item.name = description;
            item.isRoot = depth === 0;
            item.type = 'describe';
            item.skipped = result.skipped;
            item.success = (item.success === undefined ? true : item.success) && result.success;

            // it block
            if (depth === maxDepth) {
                item.type = 'it';
                item.count = item.count || 0;
                item.count++;
                item.failed = item.failed || [];
                item.name = (result.success ? getLogSymbol(logSymbols.success) : getLogSymbol(logSymbols.error)) + ' ' + item.name;
                item.success = result.success;
                item.skipped = result.skipped;
                self.netTime += result.time;

                if (result.skipped) {
                    self.numberOfSkippedTests++;
                }

                if (result.success === false) {
                    // add browser to failed browsers array
                    item.failed.push(browser.name);

                    // add error log
                    item.log = result.log;
                }

                if (config.reportSlowerThan && result.time > config.reportSlowerThan) {
                    // add slow report warning
                    item.name += chalk.yellow((' (slow: ' + formatTimeInterval(result.time) + ')'));
                    self.numberOfSlowTests++;
                }

                if (item.count === self.numberOfBrowsers) {
                    // print results to output when test was ran through all browsers
                    if (outputMode !== 'minimal') {
                        print(self.allResults, depth);
                    }
                }
            } else {
                item.items = item.items || {};
            }

            return item.items;
        }, self.allResults);
    }

    self.specSuccess = specComplete;
    self.specSkipped = specComplete;
    self.specFailure = specComplete;

    self.onSpecComplete = function (browser, result) {
        specComplete(browser, result);
    };

    self.onRunStart = function (browsers) {
        self._browsers = [];
        self.allResults = {};
        self.totalTime = 0;
        self.netTime = 0;
        self.numberOfSlowTests = 0;
        self.numberOfSkippedTests = 0;
        self.numberOfBrowsers = (browsers || []).length;
    };

    self.onBrowserStart = function (browser) {
        self._browsers.push(browser);
        self.numberOfBrowsers = self._browsers.length;
    };

    self.onRunComplete = function (browsers, results) {
        browsers.forEach(function (browser) {
            self.totalTime += browser.lastResult.totalTime;
        });

        self.write(chalk.green('\nFinished in ' + formatTimeInterval(self.totalTime) + ' / ' + formatTimeInterval(self.netTime) + '\n\n'));

        if (browsers.length > 0 && !results.disconnected) {
            self.write(chalk.underline.bold('SUMMARY:') + '\n');
            self.write(chalk.green(getLogSymbol(logSymbols.success) + ' ' + results.success + ' tests completed\n'));

            if (self.numberOfSkippedTests > 0) {
                self.write(chalk.grey(getLogSymbol(logSymbols.info) + ' ' + self.numberOfSkippedTests + ' tests skipped\n'));
            }

            if (self.numberOfSlowTests > 0) {
                self.write(chalk.yellow(getLogSymbol(logSymbols.warning) + ' ' + self.numberOfSlowTests + ' tests slow\n'));
            }

            if (results.failed) {
                self.write(chalk.red(getLogSymbol(logSymbols.error) + ' ' + results.failed + ' tests failed\n'));

                if (outputMode !== 'noFailures') {
                    self.write(chalk.underline.bold('\nFAILED TESTS:') + '\n');
                    printFailures(self.allResults);
                }
            }
        }

        if (outputMode === 'autowatch') {
            outputMode = 'minimal';
        }
    };
};

// inject karma runner baseReporter and config
MochaReporter.$inject = ['baseReporterDecorator', 'formatError', 'config'];

// PUBLISH DI MODULE
module.exports = {
    'reporter:mocha-clean': ['type', MochaReporter]
};
