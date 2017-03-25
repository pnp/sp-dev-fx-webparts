[![npm version](https://badge.fury.io/js/tslint-microsoft-contrib.svg)](https://badge.fury.io/js/tslint-microsoft-contrib)
[![Downloads](http://img.shields.io/npm/dm/tslint-microsoft-contrib.svg)](https://npmjs.org/package/tslint-microsoft-contrib)
[![Build Status](https://travis-ci.org/Microsoft/tslint-microsoft-contrib.svg?branch=master)](https://travis-ci.org/Microsoft/tslint-microsoft-contrib)
[![Join the chat at https://gitter.im/Microsoft/tslint-microsoft-contrib](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Microsoft/tslint-microsoft-contrib?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

tslint-microsoft-contrib
======

A set of [TSLint](https://github.com/palantir/tslint) rules used on some Microsoft projects.

Version 4.0.0 (Stable)
-------------
The project has been in use for over a year on multiple projects. Please report any bugs or false positives you might find!

See our [Release Notes](https://github.com/Microsoft/tslint-microsoft-contrib/wiki/Release-Notes) to find the latest new rules.

Version 4.0.1 (In-Development)
-------------
The [Latest Development Version](https://github.com/Microsoft/tslint-microsoft-contrib/tree/releases) is available online.

Installation
------------

    npm install tslint-microsoft-contrib

Alternately, you can download the files directly from GitHub:

* [4.0.0](https://github.com/Microsoft/tslint-microsoft-contrib/tree/npm-4.0.0)
* [2.0.14](https://github.com/Microsoft/tslint-microsoft-contrib/tree/npm-2.0.14)

#### TSLint and corresponding tslint-microsoft-contrib version

| TSLint version | tslint-microsoft-contrib version |
| --- | --- |
| **>= 4.x** | 4.x |
| **>= 3.2.x** | 2.x |
| **3.1.x** | unsupported |
| **3.0.x** | unsupported |
| **2.x**   | 1.x |

Configuration
-------------

##### Configure your Grunt build task

Add the new rulesDirectory to your tslint task:

    grunt.initConfig({
      tslint: {
        options: {
          rulesDirectory: 'node_modules/tslint-microsoft-contrib',
          configuration: grunt.file.readJSON("tslint.json")
        },
        files: {
          src: ['src/file1.ts', 'src/file2.ts']
        }
      }
    })

The tslint.json file does not change format when using this package. Just add our rule definitions to your existing tslint.json file.

##### Which Rules Should I Turn On?
There certainly are a lot of options! Here are some links to get you started.
* Easiest Option - Our recommended ruleset is here: [recommended_ruleset.js](recommended_ruleset.js)
* A nice blog post on the MSDN secure development blog can be found here: [Automating Secure Development Lifecycle Checks in TypeScript with TSLint](https://blogs.msdn.microsoft.com/secdevblog/2016/05/11/automating-secure-development-lifecycle-checks-in-typescript-with-tslint/)
* A wiki briefly describing the SDL and related rules is here: [TSLint and the Microsoft Security Development Lifecycle](https://github.com/Microsoft/tslint-microsoft-contrib/wiki/TSLint-and-the-Microsoft-Security-Development-Lifecycle)
* And our configuration file with all options is available here: [tslint.json](tslint.json)

Supported Rules
-----

Rule Name   | Description | Since
:---------- | :------------ | -------------
`chai-prefer-contains-to-index-of` | Avoid Chai assertions that invoke indexOf and compare for a -1 result. It is better to use the chai .contain() assertion API instead because the failure message will be more clearer if the test fails. | 2.0.10
`chai-vague-errors`             | Avoid Chai assertions that result in vague errors. For example, asserting `expect(something).to.be.true` will result in the failure message "Expected true received false". This is a vague error message that does not reveal the underlying problem. It is especially vague in TypeScript because stack trace line numbers often do not match the source code. A better pattern to follow is the xUnit Patterns [Assertion Message](http://xunitpatterns.com/Assertion%20Message.html) pattern. The previous code sample could be better written as `expect(something).to.equal(true, 'expected something to have occurred');`| 1.0
`export-name`                   | The name of the exported module must match the filename of the source file. This is case-sensitive but ignores file extension. Since version 1.0, this rule takes a list of regular expressions as a parameter. Any export name matching that regular expression will be ignored. For example, to allow an exported name like myChartOptions, then configure the rule like this: "export-name": \[true, "myChartOptionsg"\]| 0.0.3
`function-name`                 | Applies a naming convention to function names and method names. You can configure the naming convention by passing parameters. Please note, the private-method-regex does take precedence over the static-method-regex, so a private static method must match the private-method-regex. The default values are: <br>    [ true, { <br>        "method-regex": "^[a-z][\\w\\d]+$",<br>        "private-method-regex": "^[a-z][\\w\\d]+$",<br>        "protected-method-regex": "^[a-z][\\w\\d]+$",<br>        "static-method-regex": "^[A-Z_\\d]+$",<br>       "function-regex": "^[a-z][\\w\\d]+$"<br>    }] | 2.0.7, 2.0.14
`import-name`                   | The name of the imported module must match the name of the thing being imported. For example, it is valid to name imported modules the same as the module name: `import Service = require('x/y/z/Service')` and `import Service from 'x/y/z/Service'`. But it is invalid to change the name being imported, such as: `import MyCoolService = require('x/y/z/Service')` and `import MyCoolService from 'x/y/z/Service'`. Since version 2.0.9 it is possible to configure this rule with a list of exceptions. For example, to allow `underscore` to be imported as `_`, add this configuration: `'import-name': [ true, { 'underscore': '_' }]`| 2.0.5
`insecure-random`               | Do not use insecure sources for random bytes. Use a secure random number generator instead. Bans all uses of Math.random and crypto.pseudoRandomBytes. Better alternatives are crypto.randomBytes and window.crypto.getRandomValues.<br/>References:<br/>* [CWE 330](https://cwe.mitre.org/data/definitions/330.html)<br/>* [MDN Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)<br/>* [Node.js crypto.randomBytes()](http://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback)<br/>* [window.crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues)<br/> | 2.0.11
`jquery-deferred-must-complete` | When a JQuery Deferred instance is created, then either reject() or resolve() must be called on it within all code branches in the scope. For more examples see the [feature request](https://github.com/Microsoft/tslint-microsoft-contrib/issues/26). | 1.0
`max-func-body-length`          | Avoid long functions. The line count of a function body must not exceed the value configured within this rule's options. <br>You can setup a general max function body length applied for every function/method/arrow function e.g. \[true, 30\] or set different maximum length for every type e.g. \[true, \{ "func-body-length": 10 , "func-expression-body-length": 10 , "arrow-body-length": 5, "method-body-length": 15, "ctor-body-length": 5 \}\]. To specify a function name whose parameters you can ignore for this rule, pass a regular expression as a string(this can be useful for Mocha users to ignore the describe() function). Since version 2.0.9, you can also ignore single- and multi-line comments from the total function length, eg. \[true, \{ "ignore-comments": true \}\] | 2.0.3
`missing-jsdoc`                 | All files must have a top level [JSDoc](http://usejsdoc.org/) comment. A JSDoc comment starts with /** (not one more or one less asterisk) and a JSDoc at the 'top-level' appears without leading spaces. Trailing spaces are acceptable but not recommended. | 1.0
`missing-optional-annotation`   | Deprecated - This rule is now enforced by the TypeScript compiler. A parameter that follows one or more parameters marked as optional is not itself marked optional | 0.0.1
`mocha-avoid-only`              | Do not invoke Mocha's describe.only, it.only or context.only functions. These functions are useful ways to run a single unit test or a single test case during your build, but please be careful to not push these methods calls to your version control repositiory because it will turn off any of the other tests.| 1.0
`mocha-no-side-effect-code`     | All test logic in a Mocha test case should be within Mocha lifecycle method and not defined statically to execute when the module loads. Put all assignments and initialization statements in a before(), beforeEach(), beforeAll(), after(), afterEach(), afterAll(), or it() function. Code executed outside of these lifecycle methods can throw exceptions before the test runner is initialized and can result in errors or even test runner crashes. This rule can be configured with a regex to ignore certain initializations. For example, to ignore any calls to `RestDataFactory` configure the rule with: `[true, { ignore: '^RestDataFactory\\..*' }]`| 2.0.10
`mocha-unneeded-done`           | A function declares a MochaDone parameter but only resolves it synchronously in the main function. The MochaDone parameter can be safely removed from the parameter list.| 2.0.10
`no-backbone-get-set-outside-model` | Avoid using model.get('x') and model.set('x', value) Backbone accessors outside of the owning model. This breaks type safety and you should define getters and setters for your attributes instead.| 1.0
`no-banned-terms`               | Do not use banned terms: [caller](https://msdn.microsoft.com/library/7t96kt3h(v=vs.94).aspx), [callee](https://msdn.microsoft.com/library/334e1zza(v=vs.94).aspx), [eval](https://msdn.microsoft.com/library/12k71sw7(v=vs.94).aspx), [arguments](https://msdn.microsoft.com/library/he95z461(v=vs.94).aspx). These terms refer to functions or properties that should not be used, so it is best practice to simply avoid them. | 0.0.1
`no-constant-condition`         | Do not use constant expressions in conditions. Similar to the [ESLint no-constant-condition](http://eslint.org/docs/rules/no-constant-condition) rule. Since version 2.0.14, this rule accepts a parameter called `checkLoops` which defaults to true. If set to false then loops are not checked for conditionals. For example, disable loop checking with `[ true, { 'checkLoops': false } ]` | 1.0, 2.0.14
`no-control-regex`              | Do not use control characters in regular expressions . Similar to the [ESLint no-control-regex](http://eslint.org/docs/rules/no-control-regex) rule | 1.0
`no-cookies`                    | Do not use cookies | 0.0.1
`no-delete-expression`          | Do not delete expressions. Only properties should be deleted | 0.0.2
`no-disable-auto-sanitization`  | Do not disable auto-sanitization of HTML because this opens up your page to an XSS attack. Specifically, do not use the [execUnsafeLocalFunction](https://msdn.microsoft.com/en-us/library/windows/apps/hh767331.aspx) or [setInnerHTMLUnsafe](https://msdn.microsoft.com/en-us/library/windows/apps/br211696.aspx) functions. | 0.0.1
`no-document-domain`            | Do not write to document.domain. Scripts setting document.domain to any value should be validated to ensure that the value is on a list of allowed sites. Also, if your site deals with PII in any way then document.domain must not be set to a top-level domain (for example, live.com) but only to an appropriate subdomain (for example, billing.live.com). If you are absolutely sure that you want to set document.domain then add a tslint suppression comment for the line. For more information see the [Phase 4 Verification page of the Microsoft SDL](https://msdn.microsoft.com/en-us/library/cc307418.aspx)| 2.0.3
`no-document-write`             | Do not use document.write | 0.0.1
`no-duplicate-case`             | Do not use duplicate case labels in switch statements. Similar to the [ESLint no-duplicate-case](http://eslint.org/docs/rules/no-duplicate-case.html) rule | 1.0
`no-duplicate-parameter-names`  | Deprecated - This rule is now enforced by the TypeScript compiler. Do not write functions or methods with duplicate parameter names | 0.0.1
`no-empty-interfaces`           | Do not use empty interfaces. They are compile-time only artifacts and they serve no useful purpose | 1.0
`no-empty-line-after-opening-brace` | Avoid an empty line after an opening brace. | 2.0.6
`no-exec-script`                | Do not use the execScript functions | 0.0.1
`no-for-in`                     | Avoid use of for-in statements. They can be replaced by Object.keys | 1.0
`no-function-constructor-with-string-args` | Do not use the version of the Function constructor that accepts a string argument to define the body of the function | 0.0.1
`no-function-expression`        | Do not use function expressions; use arrow functions (lambdas) instead. In general, lambdas are simpler to use and avoid the confusion about what the 'this' references points to. Function expressions that contain a 'this' reference are allowed and will not create a failure. | 1.0
`no-http-string`                | Do not use strings that start with 'http:'. URL strings should start with 'https:'. Http strings can be a security problem and indicator that your software may suffer from cookie-stealing attacks. Since version 1.0, this rule takes a list of regular expressions as a parameter. Any string matching that regular expression will be ignored. For example, to allow http connections to example.com and examples.com, configure your rule like this: "no-http-string": \[true, "http://www.example.com/?.*", "http://www.examples.com/?.*"\]| 0.0.3
`no-increment-decrement`        | Avoid use of increment and decrement operators particularly as part of complicated expressions | 0.0.1
`no-inner-html`                 | Do not write values to innerHTML, outerHTML, or set HTML using the JQuery html() function. Writing values to innerHTML can expose your website to XSS injection attacks. All strings must be escaped before being rendered to the page.| 2.0.4
`no-invalid-regexp`             | Do not use invalid regular expression strings in the RegExp constructor. Similar to the [ESLint no-invalid-regexp](http://eslint.org/docs/rules/no-invalid-regexp.html) rule| 1.0
`no-jquery-raw-elements`        | Do not create HTML elements using JQuery and string concatenation. It is error prone and can hide subtle defects. Instead use the JQuery element API. | 2.0.8
`no-missing-visibility-modifiers` | Deprecated - This rule is in the TSLint product as `member-access`. Class members (both fields and methods) should have visibility modifiers specified. THe Principle of Least Visibility guides us to prefer private methods and fields when possible. If a developer forgets to add a modifier then TypeScript assumes the element should be public, which is the wrong default choice. | 1.0
`no-multiline-string`           | Do not declare multiline strings | 0.0.1
`no-multiple-var-decl`          | Deprecated - This rule is now part of the base TSLint product as the rule named 'one-variable-per-declaration'. Do not use comma separated variable declarations | 1.0
`no-octal-literal`              | Do not use octal literals or escaped octal sequences | 0.0.1
`no-regex-spaces`               | Do not use multiple spaces in a regular expression literal. Similar to the [ESLint no-regex-spaces](http://eslint.org/docs/rules/no-regex-spaces.html) rule | 1.0
`no-relative-imports`           | Do not use relative paths when importing external modules or ES6 import declarations. The advantages of removing all relative paths from imports is that 1) the import name will be consistent across all files and subdirectories so searching for usages is much easier. 2) Moving source files to different folders will not require you to edit your import statements. 3) It will be possible to copy and paste import lines between files regardless of the file location. And 4) version control diffs will be simplified by having overall fewer edits to the import lines.| 2.0.5
`no-reserved-keywords`          | Do not use reserved keywords as names of local variables, fields, functions, or other identifiers. Since version 2.0.9 this rule accepts a parameter called allow-quoted-properties. If true, interface properties in quotes will be ignored. This can be a useful way to avoid verbose suppress-warning comments for generated d.ts files.| 0.0.1, 2.0.9
`no-single-line-block-comment`  | Avoid single line block comments and use single line comments instead. Block comments do not nest properly and have no advantages over normal single-line comments| 2.0.10
`no-sparse-arrays`              | Do not use sparse arrays. Sparse arrays contain empty slots, most frequently due to multiple commas being used in an array literal. Based on the [ESLint no-sparse-arrays](http://eslint.org/docs/rules/no-sparse-arrays) rule | 1.0
`no-stateless-class`            | A stateless class represents a failure in the object oriented design of the system. A class without state is better modeled as a module or given some state. A stateless class is defined as a class with only static members and no parent class.| 2.0.4
`no-string-based-set-immediate` | Do not use the version of setImmediate that accepts code as a string argument. However, it is acceptable to use the version of setImmediate where a direct reference to a function is provided as the callback argument | 0.0.1
`no-string-based-set-interval`  | Do not use the version of setInterval that accepts code as a string argument. However, it is acceptable to use the version of setInterval where a direct reference to a function is provided as the callback argument | 0.0.1
`no-string-based-set-timeout`   | Do not use the version of setTimeout that accepts code as a string argument. However, it is acceptable to use the version of setTimeout where a direct reference to a function is provided as the callback argument | 0.0.1
`no-suspicious-comment`         | Do not use suspicious comments, such as BUG, HACK, FIXME, LATER, LATER2, TODO. We recommend that you run this rule before each release as a quality checkpoint. Reference: [CWE-546 Suspicious Comment](https://cwe.mitre.org/data/definitions/546.html) | 2.0.11
`no-typeof-undefined`           | Do not use the idiom `typeof x === 'undefined'`. You can safely use the simpler `x === undefined` or perhaps `x == null` if you want to check for either null or undefined. | 2.0.8
`no-unexternalized-strings`     | Ensures that double quoted strings are passed to a localize call to provide proper strings for different locales. The rule can be configured using an object literal as document in the [feature request](https://github.com/Microsoft/tslint-microsoft-contrib/issues/95#issuecomment-173149989)| 2.0.1
`no-unnecessary-bind`           | Do not bind 'this' as the context for a function literal or lambda expression. If you bind 'this' as the context to a function literal, then you should just use a lambda without the bind. If you bind 'this' as the context to a lambda, then you can remove the bind call because 'this' is already the context for lambdas. Works for Underscore methods as well.  | 1.0
`no-unnecessary-field-initialization` | Do not unnecessarily initialize the fields of a class to values they already have. For example, there is no need to explicitly set a field to `undefined` in the field's initialization or in the class' constructor. Also, if a field is initialized to a constant value (null, a string, a boolean, or some number) then there is no need to reassign the field to this value within the class constructor. | 2.0.9
`no-unnecessary-local-variable` | Do not declare a variable only to return it from the function on the next line. It is always less code to simply return the expression that initializes the variable. | 2.0.4
`no-unnecessary-override`       | Do not write a method that only calls super() on the parent method with the same arguments. You can safely remove methods like this and Javascript will correctly dispatch the method to the parent object. | 2.0.4
`no-unnecessary-semicolons`     | Remove unnecessary semicolons | 0.0.1
`no-unsupported-browser-code`   | Avoid writing browser-specific code for unsupported browser versions. Browser versions are specified in the rule configuration options, eg: `[true, [ "IE 11", "Firefox > 40", "Chrome >= 45" ] ]`. Browser-specific blocks of code can then be designated with a single-line comment, like so: `// Browser specific: IE 10`, or with a jsdoc like this: `@browserspecific chrome 40`. | 2.0.10
`no-unused-imports`             | Deprecated - This rule is now covered by TSLint's no-unused-variables rule. However, it can still be useful to enable this rule and pair it with the fix-no-unused-imports formatter. | 0.0.1
`no-var-self`                   | Do not use `var self = this`; instead, manage scope with arrow functions/lambdas. Self variables are a common practice in JavaScript but can be avoided in TypeScript. By default the rule bans any assignments of the `this` reference. If you want to enforce a naming convention or allow some usages then configure the rule with a regex. By default the rule is configured with `(?!)` which matches nothing. You can pass `^self$` to allow variables named self or pass `^(?!self$)` to allow anything other than self, for example| 2.0.8
`no-with-statement`             | Do not use with statements. Assign the item to a new variable instead | 0.0.1
`non-literal-require`           | Detect `require()` function calls for something that is not a string literal. For security reasons, it is best to only require() string literals. Otherwise, it is perhaps possible for an attacker to somehow change the value and download arbitrary Javascript into your page. | 2.0.14
`possible-timing-attack`        | Avoid timing attacks by not making direct string comparisons to sensitive data. Do not compare against variables named password, secret, api, apiKey, token, auth, pass, or hash. For more info see [Using Node.js Event Loop for Timing Attacks](https://snyk.io/blog/node-js-timing-attack-ccc-ctf/) | 2.0.11
`prefer-array-literal`          | Use array literal syntax when declaring or instantiating array types. For example, prefer the Javascript form of string[] to the TypeScript form Array<string>. Prefer '[]' to 'new Array()'. Prefer '[4, 5]' to 'new Array(4, 5)'. Prefer '[undefined, undefined]' to 'new Array(4)'. Since 2.0.10, this rule can be configured to allow Array type parameters. To ignore type parameters, configure the rule with the values: `[ true, { 'allow-type-parameters': true } ]`| 1.0, 2.0.10
`prefer-const`                  | Use `const` to declare variables if they are only assigned a value once. | 2.0.6
`prefer-type-cast`              | Prefer the tradition type casts instead of the new 'as-cast' syntax. For example, prefer `<string>myVariable` instead of `myVariable as string`. Rule ignores any file ending in .tsx. If you prefer the opposite and want to see the `as type` casts, then enable the tslint rule named 'no-angle-bracket-type-assertion'| 2.0.4
`promise-must-complete`         | When a Promise instance is created, then either the reject() or resolve() parameter must be called on it within all code branches in the scope. For more examples see the [feature request](https://github.com/Microsoft/tslint-microsoft-contrib/issues/34). | 1.0
`react-a11y-anchors`            | For accessibility of your website, anchor element link text should be at least 4 characters long. Links with the same HREF should have the same link text. Links that point to different HREFs should have different link text. Links with images and text content, the alt attribute should be unique to the text content or empty. An an anchor element's href prop value must not be just #. <br/>References:<br/>[WCAG Rule 38: Link text should be as least four 4 characters long](http://oaa-accessibility.org/wcag20/rule/38/)<br/>[WCAG Rule 39: Links with the same HREF should have the same link text](http://oaa-accessibility.org/wcag20/rule/39/)<br/>[WCAG Rule 41: Links that point to different HREFs should have different link text](http://oaa-accessibility.org/wcag20/rule/41/)<br/>[WCAG Rule 43: Links with images and text content, the alt attribute should be unique to the text content or empty](http://oaa-accessibility.org/wcag20/rule/43/)<br/> | 2.0.11
`react-a11y-aria-unsupported-elements` | For accessibility of your website, enforce that elements that do not support ARIA roles, states, and properties do not have those attributes. | 2.0.11
`react-a11y-event-has-role`     | For accessibility of your website, Elements with event handlers must have explicit role or implicit role.<br/>References:<br/>[WCAG Rule 94](http://oaa-accessibility.org/wcag20/rule/94/)<br/>[Using the button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role) | 2.0.11
`react-a11y-image-button-has-alt` | For accessibility of your website, enforce that inputs element with `type="image"` must have non-empty alt attribute. | 2.0.11
`react-a11y-img-has-alt`        | Enforce that an `img` element contains the `alt` attribute or `role='presentation'` for a decorative image. All images must have `alt` text to convey their purpose and meaning to **screen reader users**. Besides, the `alt` attribute specifies an alternate text for an image, if the image cannot be displayed. This rule accepts as a parameter a string array for tag names other than img to also check. For example, if you use a custom tag named 'Image' then configure the rule with: `[true, ['Image']]`<br/>References:<br/>[Web Content Accessibility Guidelines 1.0](https://www.w3.org/TR/WCAG10/wai-pageauth.html#tech-text-equivalent)<br/>[ARIA Presentation Role](https://www.w3.org/TR/wai-aria/roles#presentation)<br/>[WCAG Rule 31: If an image has an alt or title attribute, it should not have a presentation role](http://oaa-accessibility.org/wcag20/rule/31/) | 2.0.11
`react-a11y-lang`               | For accessibility of your website, HTML elements must have a lang attribute and the attribute must be a valid language code.<br/>References:<br/>* [H58: Using language attributes to identify changes in the human language](https://www.w3.org/TR/WCAG20-TECHS/H58.html)<br/>* [lang attribute must have a valid value](https://dequeuniversity.com/rules/axe/1.1/valid-lang)<br/>[List of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) | 2.0.11
`react-a11y-meta`               | For accessibility of your website, HTML meta elements must not have http-equiv="refresh". | 2.0.11
`react-a11y-props`              | For accessibility of your website, enforce all `aria-*` attributes are valid. Elements cannot use an invalid `aria-*` attribute. This rule will fail if it finds an `aria-*` attribute that is not listed in [WAI-ARIA states and properties](https://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def). | 2.0.11
`react-a11y-proptypes`          | For accessibility of your website, enforce the type of aria state and property values are correct. | 2.0.11
`react-a11y-role-has-required-aria-props` | For accessibility of your website, elements with aria roles must have all required attributes according to the role. <br/>References:<br/>[ARIA Definition of Roles](https://www.w3.org/TR/wai-aria/roles#role_definitions)<br/>[WCAG Rule 90: Required properties and states should be defined](http://oaa-accessibility.org/wcag20/rule/90/)<br/>[WCAG Rule 91: Required properties and states must not be empty](http://oaa-accessibility.org/wcag20/rule/91/)<br/>| 2.0.11
`react-a11y-role-supports-aria-props`     | For accessibility of your website, enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`. Many aria attributes (states and properties) can only be used on elements with particular roles. Some elements have implicit roles, such as `<a href='hrefValue' />`, which will be resolved to `role='link'`. A reference for the implicit roles can be found at [Default Implicit ARIA Semantics](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics). <br/>References: <br/>* [ARIA attributes can only be used with certain roles](http://oaa-accessibility.org/wcag20/rule/87/)<br/>* [Check aria properties and states for valid roles and properties](http://oaa-accessibility.org/wcag20/rule/84/)<br/>* [Check that 'ARIA-' attributes are valid properties and states](http://oaa-accessibility.org/wcag20/rule/93/)| 2.0.11
`react-a11y-role`               | For accessibility of your website, elements with aria roles must use a **valid**, **non-abstract** aria role. A reference to role defintions can be found at [WAI-ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions). References:<br/>* [WCAG Rule 92: Role value must be valid](http://oaa-accessibility.org/wcag20/rule/92/)| 2.0.11
`react-a11y-tabindex-no-positive` | For accessibility of your website, enforce tabindex value is **not greater than zero**. Avoid positive tabindex attribute values to synchronize the flow of the page with keyboard tab order.<br/>References:<br/>[WCAG 2.4.3 - Focus Order](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-order)<br/>[Audit Rules - tabindex-usage](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#tabindex-usage)<br/>[Avoid positive integer values for tabIndex](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03) | 2.0.11
`react-a11y-titles`             | For accessibility of your website, HTML title elements must not be empty, must be more than one word, and must not be more than 60 characters long.<br/>References:<br/>* [WCAG 2.0 - Requirement 2.4.2 Page Titled (Level A)](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title)<br/>* [OAA-Accessibility Rule 13: Title element should not be empty](http://oaa-accessibility.org/wcag20/rule/13/)<br/>* [OAA-Accessibility Rule 24: Title content should be concise](http://oaa-accessibility.org/wcag20/rule/24/)<br/>* [OAA-Accessibility Rule 25: Title text must contain more than one word](http://oaa-accessibility.org/wcag20/rule/25/)<br/> | 2.0.11
`react-anchor-blank-noopener`   | For security reasons, anchor tags with target="_blank" should also include rel="noopener noreferrer". In order to restrict the behavior window.opener access, the original page needs to add a rel="noopener" attribute to any link that has target="_blank". However, Firefox does not support that tag, so you should actually use rel="noopener noreferrer" for full coverage. For more info see: [The target="_blank" vulnerability by example](https://dev.to/ben/the-targetblank-vulnerability-by-example)| 2.0.11
`react-iframe-missing-sandbox`  | React iframes must specify a sandbox attribute. If specified as an empty string, this attribute enables extra restrictions on the content that can appear in the inline frame. The value of the attribute can either be an empty string (all the restrictions are applied), or a space-separated list of tokens that lift particular restrictions. You many not use both allow-scripts and allow-same-origin at the same time, as that allows the embedded document to programmatically remove the sandbox attribute in some scenarios. | 2.0.10
`react-no-dangerous-html`       | Do not use React's dangerouslySetInnerHTML API. This rule finds usages of the dangerouslySetInnerHTML API (but not any JSX references). For more info see the [react-no-dangerous-html Rule wiki page](https://github.com/Microsoft/tslint-microsoft-contrib/wiki/react-no-dangerous-html-Rule). | 0.0.2
`react-this-binding-issue`      | Several errors can occur when using React and React.Component subclasses. When using React components you must be careful to correctly bind the 'this' reference on any methods that you pass off to child components as callbacks. For example, it is common to define a private method called 'onClick' and then specify `onClick={this.onClick}` as a JSX attribute. If you do this then the 'this' reference will be undefined when your private method is invoked. The React documentation suggests that you bind the 'this' reference on all of your methods within the constructor: `this.onClick = this.onClick.bind(this);`. This rule will create a violation if 1) a method reference is passed to a JSX attribute without being bound in the constructor. And 2) a method is bound multiple times in the constructor. Another issue that can occur is binding the 'this' reference to a function within the render() method. For example, many people will create an anonymous lambda within the JSX attribute to avoid the 'this' binding issue: `onClick={() => { this.onClick(); }}`. The problem with this is that a new instance of an anonymous function is created every time render() is invoked. When React compares virutal DOM properties within shouldComponentUpdate() then the onClick property will look like a new property and force a re-render. You should avoid this pattern because creating function instances within render methods breaks any logic within shouldComponentUpdate() methods. This rule creates violations if 1) an anonymous function is passed as a JSX attribute. And 2) if a function instantiated in local scope is passed as a JSX attribute. This rule can be configured via the "allow-anonymous-listeners" parameter. If you want to suppress violations for the anonymous listener scenarios then configure that rule like this: `"react-this-binding-issue": [ true, { 'allow-anonymous-listeners': true } ]` | 2.0.8, 2.0.9
`react-tsx-curly-spacing`       | Consistently use spaces around the brace characters of JSX attributes.You can either allow or bad spaces between the braces and the values they enclose. <br/><br/>One of the two following options are required:<br/>* "always" enforces a space inside of curly braces (default)<br/>* "never" disallows spaces inside of curly braces<br/><br/>By default, braces spanning multiple lines are not allowed with either setting. If you want to allow them you can specify an additional allowMultiline property with the value false. <br/><br/>Examples: <br/>* "react-tsx-curly-spacing": [true, "always"]<br/>* "react-tsx-curly-spacing": [true, "never"]<br/>* "react-tsx-curly-spacing": [true, "never", {"allowMultiline": false}]<br/><br/>References<br/>* [eslint-plugin-react jsx-curly-spacing rule](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)  | 2.0.14
`react-unused-props-and-state`  | Remove unneeded properties defined in React Props and State interfaces. Any interface named Props or State is defined as a React interface. All fields in these interfaces must be referenced. This rule can be configured with regexes to match custom Props and State interface names. <br/><br/>Example for including all interfaces ending with Props or State: <br/>*[ true, { 'props-interface-regex': 'Props$', 'state-interface-regex': 'State$' } ]* | 2.0.10
`underscore-consistent-invocation` | Enforce a consistent usage of the _ functions. By default, invoking underscore functions should begin with wrapping a variable in an underscore instance: `_(list).map(...)`. An alternative is to prefer using the static methods on the _ variable: `_.map(list, ...)`. The rule accepts single parameter called 'style' which can be the value 'static' or 'instance': `[true, { "style": "static" }]`| 2.0.10
`use-isnan`                     | Deprecated - This rule is now part of the base TSLint product. Ensures that you use the isNaN() function to check for NaN references instead of a comparison to the NaN constant. Similar to the [use-isnan ESLint rule](http://eslint.org/docs/rules/use-isnan).| 1.0
`use-named-parameter`           | Do not reference the arguments object by numerical index; instead, use a named parameter. This rule is similar to JSLint's [Use a named parameter](https://jslinterrors.com/use-a-named-parameter) rule. | 0.0.3
`valid-typeof`                  | Ensures that the results of typeof are compared against a valid string. This rule aims to prevent errors from likely typos by ensuring that when the result of a typeof operation is compared against a string, that the string is a valid value. Similar to the [valid-typeof ESLint rule](http://eslint.org/docs/rules/valid-typeof).| 1.0

Supported Formatters
-----

These formatters assume that you use the UTF-8 file encoding. They may not work if you have a different encoding, especially if your encoding uses a 2-byte line ending (such as \r\n on Windows).

Formatter Name          | Description | Since
:----------             | :------------ | -------------
`fix-no-require-imports`| This formatter automatically converts imports from the require syntax to the ES6 syntax. For example `import Utils = require('Utils');` becomes `import {Utils} from 'Utils';`. However, be warned that the fix assumes that your imported module exports the correct thing. If anything goes wrong with your exports then you'll get a compiler failure saying there is no default export. | 2.0.8
`fix-no-unused-imports` | This formatter automatically fixes any unused imports found by the no-unused-imports rule. | 2.0.8
`fix-no-var-keyword`    | This formatter automatically converts var variable declarations into let variable declarations found by the no-var-keyword rule. | 2.0.8
`fix-prefer-const`      | This formatter automatically converts let variable declarations into const declarations found by the prefer-const rule. | 2.0.8

Development
-----------

To develop tslint-microsoft-contrib simply clone the repository, install dependencies and run grunt:

    git clone git@github.com:Microsoft/tslint-microsoft-contrib.git --config core.autocrlf=input --config core.eol=lf
    cd tslint-microsoft-contrib
    npm install
    grunt all
    grunt create-rule --rule-name=no-something-or-other

Debug code
-----------
If command fails because of file access permissions, prefix it with sudo.

    npm install -g node-inspector

Then run:

    node-debug grunt mochaTest

The `node-debug` command will load Node Inspector in your default browser (works in Chrome and Opera only).

Set a breakpoint somewhere in your code and resume execution. Your breakpoint should be hit.

Creating a new Release
----------------------

Refer to the [Releases Wiki Page](https://github.com/Microsoft/tslint-microsoft-contrib/wiki/Releases)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
