/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var fs = require("fs");
var glob = require("glob");
var optimist = require("optimist");
var path = require("path");
var ts = require("typescript");
var configuration_1 = require("./configuration");
var error_1 = require("./error");
var Linter = require("./linter");
var test_1 = require("./test");
var updateNotifier_1 = require("./updateNotifier");
var processed = optimist
    .usage("Usage: $0 [options] file ...")
    .check(function (argv) {
    // at least one of file, help, version, project or unqualified argument must be present
    if (!(argv.h || argv.i || argv.test || argv.v || argv.project || argv._.length > 0)) {
        throw "Missing files";
    }
    if (argv.f) {
        throw "-f option is no longer available. Supply files directly to the tslint command instead.";
    }
})
    .options({
    "c": {
        alias: "config",
        describe: "configuration file",
    },
    "e": {
        alias: "exclude",
        describe: "exclude globs from path expansion",
        type: "string",
    },
    "fix": {
        describe: "fixes linting errors for select rules (this may overwrite linted files)",
        type: "boolean",
    },
    "force": {
        describe: "return status code 0 even if there are lint errors",
        type: "boolean",
    },
    "h": {
        alias: "help",
        describe: "display detailed help",
    },
    "i": {
        alias: "init",
        describe: "generate a tslint.json config file in the current working directory",
    },
    "o": {
        alias: "out",
        describe: "output file",
    },
    "project": {
        describe: "tsconfig.json file",
    },
    "r": {
        alias: "rules-dir",
        describe: "rules directory",
    },
    "s": {
        alias: "formatters-dir",
        describe: "formatters directory",
    },
    "t": {
        alias: "format",
        default: "prose",
        describe: "output format (prose, json, stylish, verbose, pmd, msbuild, checkstyle, vso, fileslist)",
    },
    "test": {
        describe: "test that tslint produces the correct output for the specified directory",
    },
    "type-check": {
        describe: "enable type checking when linting a project",
    },
    "v": {
        alias: "version",
        describe: "current version",
    },
});
var argv = processed.argv;
var outputStream;
if (argv.o != null) {
    outputStream = fs.createWriteStream(argv.o, {
        flags: "w+",
        mode: 420,
    });
}
else {
    outputStream = process.stdout;
}
if (argv.v != null) {
    outputStream.write(Linter.VERSION + "\n");
    process.exit(0);
}
if (argv.i != null) {
    if (fs.existsSync(configuration_1.CONFIG_FILENAME)) {
        console.error("Cannot generate " + configuration_1.CONFIG_FILENAME + ": file already exists");
        process.exit(1);
    }
    var tslintJSON = JSON.stringify(configuration_1.DEFAULT_CONFIG, undefined, "    ");
    fs.writeFileSync(configuration_1.CONFIG_FILENAME, tslintJSON);
    process.exit(0);
}
if (argv.test != null) {
    var results = test_1.runTest(argv.test, argv.r);
    var didAllTestsPass = test_1.consoleTestResultHandler(results);
    process.exit(didAllTestsPass ? 0 : 1);
}
if ("help" in argv) {
    outputStream.write(processed.help());
    var outputString = "\ntslint accepts the following commandline options:\n\n    -c, --config:\n        The location of the configuration file that tslint will use to\n        determine which rules are activated and what options to provide\n        to the rules. If no option is specified, the config file named\n        tslint.json is used, so long as it exists in the path.\n        The format of the file is { rules: { /* rules list */ } },\n        where /* rules list */ is a key: value comma-seperated list of\n        rulename: rule-options pairs. Rule-options can be either a\n        boolean true/false value denoting whether the rule is used or not,\n        or a list [boolean, ...] where the boolean provides the same role\n        as in the non-list case, and the rest of the list are options passed\n        to the rule that will determine what it checks for (such as number\n        of characters for the max-line-length rule, or what functions to ban\n        for the ban rule).\n\n    -e, --exclude:\n        A filename or glob which indicates files to exclude from linting.\n        This option can be supplied multiple times if you need multiple\n        globs to indicate which files to exclude.\n\n    --fix:\n        Fixes linting errors for select rules. This may overwrite linted files.\n\n    --force:\n        Return status code 0 even if there are any lint errors.\n        Useful while running as npm script.\n\n    -i, --init:\n        Generates a tslint.json config file in the current working directory.\n\n    -o, --out:\n        A filename to output the results to. By default, tslint outputs to\n        stdout, which is usually the console where you're running it from.\n\n    -r, --rules-dir:\n        An additional rules directory, for user-created rules.\n        tslint will always check its default rules directory, in\n        node_modules/tslint/lib/rules, before checking the user-provided\n        rules directory, so rules in the user-provided rules directory\n        with the same name as the base rules will not be loaded.\n\n    -s, --formatters-dir:\n        An additional formatters directory, for user-created formatters.\n        Formatters are files that will format the tslint output, before\n        writing it to stdout or the file passed in --out. The default\n        directory, node_modules/tslint/build/formatters, will always be\n        checked first, so user-created formatters with the same names\n        as the base formatters will not be loaded.\n\n    -t, --format:\n        The formatter to use to format the results of the linter before\n        outputting it to stdout or the file passed in --out. The core\n        formatters are prose (human readable), json (machine readable)\n        and verbose. prose is the default if this option is not used.\n        Other built-in options include pmd, msbuild, checkstyle, and vso.\n        Additional formatters can be added and used if the --formatters-dir\n        option is set.\n\n    --test:\n        Runs tslint on the specified directory and checks if tslint's output matches\n        the expected output in .lint files. Automatically loads the tslint.json file in the\n        specified directory as the configuration file for the tests. See the\n        full tslint documentation for more details on how this can be used to test custom rules.\n\n    --project:\n        The location of a tsconfig.json file that will be used to determine which\n        files will be linted.\n\n    --type-check\n        Enables the type checker when running linting rules. --project must be\n        specified in order to enable type checking.\n\n    -v, --version:\n        The current version of tslint.\n\n    -h, --help:\n        Prints this help message.\n";
    outputStream.write(outputString);
    process.exit(0);
}
// when provided, it should point to an existing location
if (argv.c && !fs.existsSync(argv.c)) {
    console.error("Invalid option for configuration: " + argv.c);
    process.exit(1);
}
var possibleConfigAbsolutePath = argv.c != null ? path.resolve(argv.c) : null;
var processFiles = function (files, program) {
    var linter = new Linter({
        fix: argv.fix,
        formatter: argv.t,
        formattersDirectory: argv.s || "",
        rulesDirectory: argv.r || "",
    }, program);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        if (!fs.existsSync(file)) {
            console.error("Unable to open file: " + file);
            process.exit(1);
        }
        var buffer = new Buffer(256);
        buffer.fill(0);
        var fd = fs.openSync(file, "r");
        try {
            fs.readSync(fd, buffer, 0, 256, null);
            if (buffer.readInt8(0) === 0x47 && buffer.readInt8(188) === 0x47) {
                // MPEG transport streams use the '.ts' file extension. They use 0x47 as the frame
                // separator, repeating every 188 bytes. It is unlikely to find that pattern in
                // TypeScript source, so tslint ignores files with the specific pattern.
                console.warn(file + ": ignoring MPEG transport stream");
                return;
            }
        }
        finally {
            fs.closeSync(fd);
        }
        var contents = fs.readFileSync(file, "utf8");
        var configLoad = configuration_1.findConfiguration(possibleConfigAbsolutePath, file);
        linter.lint(file, contents, configLoad.results);
    }
    var lintResult = linter.getResult();
    outputStream.write(lintResult.output, function () {
        if (lintResult.failureCount > 0) {
            process.exit(argv.force ? 0 : 2);
        }
    });
    if (lintResult.format === "prose") {
        // Check to see if there are any updates available
        updateNotifier_1.updateNotifierCheck();
    }
};
// if both files and tsconfig are present, use files
var files = argv._;
var program;
if (argv.project != null) {
    if (!fs.existsSync(argv.project)) {
        console.error("Invalid option for project: " + argv.project);
        process.exit(1);
    }
    program = Linter.createProgram(argv.project, path.dirname(argv.project));
    if (files.length === 0) {
        files = Linter.getFileNames(program);
    }
    if (argv["type-check"]) {
        // if type checking, run the type checker
        var diagnostics = ts.getPreEmitDiagnostics(program);
        if (diagnostics.length > 0) {
            var messages = diagnostics.map(function (diag) {
                // emit any error messages
                var message = ts.DiagnosticCategory[diag.category];
                if (diag.file) {
                    var _a = diag.file.getLineAndCharacterOfPosition(diag.start), line = _a.line, character = _a.character;
                    message += " at " + diag.file.fileName + ":" + (line + 1) + ":" + (character + 1) + ":";
                }
                message += " " + ts.flattenDiagnosticMessageText(diag.messageText, "\n");
                return message;
            });
            throw new Error(messages.join("\n"));
        }
    }
    else {
        // if not type checking, we don't need to pass in a program object
        program = undefined;
    }
}
var trimSingleQuotes = function (str) { return str.replace(/^'|'$/g, ""); };
var ignorePatterns = [];
if (argv.e) {
    var excludeArguments = Array.isArray(argv.e) ? argv.e : [argv.e];
    ignorePatterns = excludeArguments.map(trimSingleQuotes);
}
files = files
    .map(trimSingleQuotes)
    .map(function (file) { return glob.sync(file, { ignore: ignorePatterns, nodir: true }); })
    .reduce(function (a, b) { return a.concat(b); });
try {
    processFiles(files, program);
}
catch (error) {
    if (error.name === error_1.FatalError.NAME) {
        console.error(error.message);
        process.exit(1);
    }
    // rethrow unhandled error
    throw error;
}
