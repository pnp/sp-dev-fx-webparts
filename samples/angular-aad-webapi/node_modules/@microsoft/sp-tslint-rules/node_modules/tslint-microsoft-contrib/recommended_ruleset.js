/**
 * These rule settings are a broad, general recommendation for a good default configuration.
 * This file is exported in the npm/nuget package as ./tslint.json.
 */
module.exports = {
    "rules": {

        /**
         * Security Rules. The following rules should be turned on because they find security issues
         * or are recommended in the Microsoft Secure Development Lifecycle (SDL)
         */
        "insecure-random": true,
        "no-banned-terms": true,
        "no-cookies": true,
        "no-delete-expression": true,
        "no-disable-auto-sanitization": true,
        "no-document-domain": true,
        "no-document-write": true,
        "no-eval": true,
        "no-exec-script": true,
        "no-function-constructor-with-string-args": true,
        "no-http-string": [true, "http://www.example.com/?.*", "http://www.examples.com/?.*"],
        "no-inner-html": true,
        "no-octal-literal": true,
        "no-reserved-keywords": true,
        "no-string-based-set-immediate": true,
        "no-string-based-set-interval": true,
        "no-string-based-set-timeout": true,
        "non-literal-require": true,
        "possible-timing-attack": true,
        "react-anchor-blank-noopener": true,
        "react-iframe-missing-sandbox": true,
        "react-no-dangerous-html": true,

        /**
         * Common Bugs and Correctness. The following rules should be turned on because they find
         * common bug patterns in the code or enforce type safety.
         */
        "forin": true,
        "jquery-deferred-must-complete": true,
        "label-position": true,
        "mocha-avoid-only": true,
        "mocha-no-side-effect-code": true,
        "no-any": true,
        "no-arg": true,
        "no-backbone-get-set-outside-model": true,
        "no-bitwise": true,
        "no-conditional-assignment": true,
        "no-console": [true, "debug", "info", "log", "time", "timeEnd", "trace"],
        "no-constant-condition": true,
        "no-control-regex": true,
        "no-debugger": true,
        "no-duplicate-case": true,
        "no-duplicate-variable": true,
        "no-empty": true,
        "no-for-in-array": true,
        "no-increment-decrement": true,
        "no-invalid-regexp": true,
        "no-invalid-this": true,
        "no-jquery-raw-elements": true,
        "no-regex-spaces": true,
        "no-sparse-arrays": true,
        "no-stateless-class": true,
        "no-string-literal": true,
        "no-unnecessary-bind": true,
        "no-unnecessary-override": true,
        "no-unsafe-finally": true,
        "no-unused-expression": true,
        "no-unused-new": true,
        "no-unused-variable": true,
        "no-use-before-declare": true,
        "no-with-statement": true,
        "promise-must-complete": true,
        "radix": true,
        "react-this-binding-issue": true,
        "react-unused-props-and-state": true,
        "restrict-plus-operands": true, // the plus operand should really only be used for strings and numbers
        "switch-default": true,
        "triple-equals": [true, "allow-null-check"],
        "use-isnan": true,
        "use-named-parameter": true,
        "valid-typeof": true,

        /**
         * Code Clarity. The following rules should be turned on because they make the code
         * generally more clear to the reader.
         */
        "arrow-parens": false, // for simple functions the parens on arrow functions are not needed
        "chai-prefer-contains-to-index-of": true,
        "chai-vague-errors": true,
        "class-name": true,
        "comment-format": true,
        "export-name": true,
        "function-name": true,
        "import-name": true,
        "interface-name": true,
        "jsdoc-format": true,
        "max-file-line-count": true,
        "max-func-body-length": [true, 100, {"ignore-parameters-to-function-regex": "describe"}],
        "max-line-length": [true, 140],
        "member-access": true,
        "member-ordering": true,
        "missing-jsdoc": true,
        "mocha-unneeded-done": true,
        "new-parens": true,
        "no-construct": true,
        "no-default-export": true,
        "no-empty-interfaces": true,
        "no-for-in": true,
        "no-function-expression": true,
        "no-inferrable-types": false, // turn no-inferrable-types off in order to make the code consistent in its use of type decorations
        "no-multiline-string": true, // multiline-strings often introduce unnecessary whitespace into the string literals
        "no-null-keyword": false, // turn no-null-keyword off and use undefined to mean not initialized and null to mean without a value
        "no-relative-imports": true,
        "no-require-imports": true,
        "no-shadowed-variable": true,
        "no-suspicious-comment": true,
        "no-typeof-undefined": true,
        "no-unnecessary-field-initialization": true,
        "no-unnecessary-local-variable": true,
        "no-unsupported-browser-code": true,
        "no-var-keyword": true,
        "no-var-requires": true,
        "no-var-self": true,
        "object-literal-sort-keys": false, // turn object-literal-sort-keys off and sort keys in a meaningful manner
        "one-variable-per-declaration": true,
        "only-arrow-functions": false,  // there are many valid reasons to declare a function
        "ordered-imports": true,
        "prefer-array-literal": true,
        "prefer-const": true,
        "typedef": [true, "callSignature", "indexSignature", "parameter", "propertySignature", "variableDeclarator", "memberVariableDeclarator"],
        "underscore-consistent-invocation": true,
        "variable-name": true,

        /**
         * Accessibility. The following rules should be turned on to guarantee the best user
         * experience for keyboard and screen reader users.
         */
        "react-a11y-anchors": true,
        "react-a11y-aria-unsupported-elements": true,
        "react-a11y-event-has-role": true,
        "react-a11y-image-button-has-alt": true,
        "react-a11y-img-has-alt": true,
        "react-a11y-lang": true,
        "react-a11y-meta": true,
        "react-a11y-props": true,
        "react-a11y-proptypes": true,
        "react-a11y-role": true,
        "react-a11y-role-has-required-aria-props": true,
        "react-a11y-role-supports-aria-props": true,
        "react-a11y-tabindex-no-positive": true,
        "react-a11y-titles": true,

        /**
         * Whitespace related rules. The only recommended whitespace strategy is to pick a single format and
         * be consistent.
         */
        "align": [true, "parameters", "arguments", "statements"],
        "curly": true,
        "eofline": true,
        "indent": [true, "spaces"],
        "linebreak-style": true,
        "no-consecutive-blank-lines": true,
        "no-empty-line-after-opening-brace": false,
        "no-single-line-block-comment": true,
        "no-trailing-whitespace": true,
        "no-unnecessary-semicolons": true,
        "object-literal-key-quotes": [true, "as-needed"],
        "one-line": [true, "check-open-brace", "check-catch", "check-else", "check-whitespace"],
        "quotemark": [true, "single"],
        "react-tsx-curly-spacing": true,
        "semicolon": [true, "always"],
        "trailing-comma": [true, {"singleline": "never", "multiline": "never"}], // forcing trailing commas for multi-line
                    // lists results in lists that are easier to reorder and version control diffs that are more clear.
                    // Many teams like to have multiline be 'always'. There is no clear consensus on this rule but the
                    // internal MS JavaScript coding standard does discourage it.
        "typedef-whitespace": false,
        "whitespace": [true, "check-branch", "check-decl", "check-operator", "check-separator", "check-type"],

        /**
         * Controversial/Configurable rules.
         */
        "ban": false,                // only enable this if you have some code pattern that you want to ban
        "no-angle-bracket-type-assertion": false,  // pick either type-cast format and use it consistently
        "no-internal-module": false, // only enable this if you are not using internal modules
        "no-mergeable-namespace": false,  // your project may require mergeable namespaces
        "no-namespace": false,       // only enable this if you are not using modules/namespaces
        "no-reference": true,        // in general you should use a module system and not /// reference imports
        "no-unexternalized-strings": false, // the VS Code team has a specific localization process that this rule enforces
        "prefer-type-cast": true,   // pick either type-cast format and use it consistently

        /**
         * Deprecated rules.  The following rules are deprecated for various reasons.
         */
        "missing-optional-annotation": false,  // now supported by TypeScript compiler
        "no-duplicate-parameter-names": false, // now supported by TypeScript compiler
        "no-missing-visibility-modifiers": false, // use tslint member-access rule instead
        "no-multiple-var-decl": false,         // use tslint one-variable-per-declaration rule instead
        "no-switch-case-fall-through": false,  // now supported by TypeScript compiler
        "no-unused-imports": false             // use tslint no-unused-variable rule instead
    }
};

