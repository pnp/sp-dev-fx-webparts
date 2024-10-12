require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      'parserOptions': {
        'project': './tsconfig.json',
        'ecmaVersion': 2018,
        'sourceType': 'module'
      },
      rules: {
        // Prevent usage of the JavaScript null value, while allowing code to access existing APIs that may require null. https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/no-new-null': 1,
        // Require Jest module mocking APIs to be called before any other statements in their code block. https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/hoist-jest-mock': 1,
        // Require regular expressions to be constructed from string constants rather than dynamically building strings at runtime. https://www.npmjs.com/package/@rushstack/eslint-plugin-security
        '@rushstack/security/no-unsafe-regexp': 1,
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/adjacent-overload-signatures': 1,
        // RATIONALE:         Code is more readable when the type of every variable is immediately obvious.
        //                    Even if the compiler may be able to infer a type, this inference will be unavailable
        //                    to a person who is reviewing a GitHub diff.  This rule makes writing code harder,
        //                    but writing code is a much less important activity than reading it.
        //
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/explicit-function-return-type': [
          1,
          {
            'allowExpressions': true,
            'allowTypedFunctionExpressions': true,
            'allowHigherOrderFunctions': false
          }
        ],
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        // Rationale to disable: although this is a recommended rule, it is up to dev to select coding style.
        // Set to 1 (warning) or 2 (error) to enable.
        '@typescript-eslint/explicit-member-accessibility': 0,
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/no-array-constructor': 1,
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        //
        // RATIONALE:         The "any" keyword disables static type checking, the main benefit of using TypeScript.
        //                    This rule should be suppressed only in very special cases such as JSON.stringify()
        //                    where the type really can be anything.  Even if the type is flexible, another type
        //                    may be more appropriate such as "unknown", "{}", or "Record<k,V>".
        '@typescript-eslint/no-explicit-any': 1,
        // RATIONALE:         The #1 rule of promises is that every promise chain must be terminated by a catch()
        //                    handler.  Thus wherever a Promise arises, the code must either append a catch handler,
        //                    or else return the object to a caller (who assumes this responsibility).  Unterminated
        //                    promise chains are a serious issue.  Besides causing errors to be silently ignored,
        //                    they can also cause a NodeJS process to terminate unexpectedly.
        '@typescript-eslint/no-floating-promises': 2,
        // RATIONALE:         Catches a common coding mistake.
        '@typescript-eslint/no-for-in-array': 2,
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/no-misused-new': 2,
        // RATIONALE:         The "namespace" keyword is not recommended for organizing code because JavaScript lacks
        //                    a "using" statement to traverse namespaces.  Nested namespaces prevent certain bundler
        //                    optimizations.  If you are declaring loose functions/variables, it's better to make them
        //                    static members of a class, since classes support property getters and their private
        //                    members are accessible by unit tests.  Also, the exercise of choosing a meaningful
        //                    class name tends to produce more discoverable APIs: for example, search+replacing
        //                    the function "reverse()" is likely to return many false matches, whereas if we always
        //                    write "Text.reverse()" is more unique.  For large scale organization, it's recommended
        //                    to decompose your code into separate NPM packages, which ensures that component
        //                    dependencies are tracked more conscientiously.
        //
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/no-namespace': [
          1,
          {
            'allowDeclarations': false,
            'allowDefinitionFiles': false
          }
        ],
        // RATIONALE:         Parameter properties provide a shorthand such as "constructor(public title: string)"
        //                    that avoids the effort of declaring "title" as a field.  This TypeScript feature makes
        //                    code easier to write, but arguably sacrifices readability:  In the notes for
        //                    "@typescript-eslint/member-ordering" we pointed out that fields are central to
        //                    a class's design, so we wouldn't want to bury them in a constructor signature
        //                    just to save some typing.
        //
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        // Set to 1 (warning) or 2 (error) to enable the rule
        '@typescript-eslint/parameter-properties': 0,
        // RATIONALE:         When left in shipping code, unused variables often indicate a mistake.  Dead code
        //                    may impact performance.
        //
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/no-unused-vars': [
          1,
          {
            'vars': 'all',
            // Unused function arguments often indicate a mistake in JavaScript code.  However in TypeScript code,
            // the compiler catches most of those mistakes, and unused arguments are fairly common for type signatures
            // that are overriding a base class method or implementing an interface.
            'args': 'none'
          }
        ],
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/no-use-before-define': [
          2,
          {
            'functions': false,
            'classes': true,
            'variables': true,
            'enums': true,
            'typedefs': true
          }
        ],
        // Disallows require statements except in import statements.
        // In other words, the use of forms such as var foo = require("foo") are banned. Instead use ES6 style imports or import foo = require("foo") imports.
        '@typescript-eslint/no-var-requires': 'error',
        // RATIONALE:         The "module" keyword is deprecated except when describing legacy libraries.
        //
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        '@typescript-eslint/prefer-namespace-keyword': 1,
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        // Rationale to disable: it's up to developer to decide if he wants to add type annotations
        // Set to 1 (warning) or 2 (error) to enable the rule
        '@typescript-eslint/no-inferrable-types': 0,
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        // Rationale to disable: declaration of empty interfaces may be helpful for generic types scenarios
        '@typescript-eslint/no-empty-interface': 0,
        // RATIONALE:         This rule warns if setters are defined without getters, which is probably a mistake.
        'accessor-pairs': 1,
        // RATIONALE:         In TypeScript, if you write x["y"] instead of x.y, it disables type checking.
        'dot-notation': [
          1,
          {
            'allowPattern': '^_'
          }
        ],
        // RATIONALE:         Catches code that is likely to be incorrect
        'eqeqeq': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'for-direction': 1,
        // RATIONALE:         Catches a common coding mistake.
        'guard-for-in': 2,
        // RATIONALE:         If you have more than 2,000 lines in a single source file, it's probably time
        //                    to split up your code.
        'max-lines': ['warn', { max: 2000 }],
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-async-promise-executor': 2,
        // RATIONALE:         Deprecated language feature.
        'no-caller': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-compare-neg-zero': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-cond-assign': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-constant-condition': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-control-regex': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-debugger': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-delete-var': 2,
        // RATIONALE:         Catches code that is likely to be incorrect
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-duplicate-case': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-empty': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-empty-character-class': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-empty-pattern': 1,
        // RATIONALE:         Eval is a security concern and a performance concern.
        'no-eval': 1,
        // RATIONALE:         Catches code that is likely to be incorrect
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-ex-assign': 2,
        // RATIONALE:         System types are global and should not be tampered with in a scalable code base.
        //                    If two different libraries (or two versions of the same library) both try to modify
        //                    a type, only one of them can win.  Polyfills are acceptable because they implement
        //                    a standardized interoperable contract, but polyfills are generally coded in plain
        //                    JavaScript.
        'no-extend-native': 1,
        // Disallow unnecessary labels
        'no-extra-label': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-fallthrough': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-func-assign': 1,
        // RATIONALE:         Catches a common coding mistake.
        'no-implied-eval': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-invalid-regexp': 2,
        // RATIONALE:         Catches a common coding mistake.
        'no-label-var': 2,
        // RATIONALE:         Eliminates redundant code.
        'no-lone-blocks': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-misleading-character-class': 2,
        // RATIONALE:         Catches a common coding mistake.
        'no-multi-str': 2,
        // RATIONALE:         It's generally a bad practice to call "new Thing()" without assigning the result to
        //                    a variable.  Either it's part of an awkward expression like "(new Thing()).doSomething()",
        //                    or else implies that the constructor is doing nontrivial computations, which is often
        //                    a poor class design.
        'no-new': 1,
        // RATIONALE:         Obsolete language feature that is deprecated.
        'no-new-func': 2,
        // RATIONALE:         Obsolete language feature that is deprecated.
        'no-new-object': 2,
        // RATIONALE:         Obsolete notation.
        'no-new-wrappers': 1,
        // RATIONALE:         Catches code that is likely to be incorrect
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-octal': 2,
        // RATIONALE:         Catches code that is likely to be incorrect
        'no-octal-escape': 2,
        // RATIONALE:         Catches code that is likely to be incorrect
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-regex-spaces': 2,
        // RATIONALE:         Catches a common coding mistake.
        'no-return-assign': 2,
        // RATIONALE:         Security risk.
        'no-script-url': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-self-assign': 2,
        // RATIONALE:         Catches a common coding mistake.
        'no-self-compare': 2,
        // RATIONALE:         This avoids statements such as "while (a = next(), a && a.length);" that use
        //                    commas to create compound expressions.  In general code is more readable if each
        //                    step is split onto a separate line.  This also makes it easier to set breakpoints
        //                    in the debugger.
        'no-sequences': 1,
        // RATIONALE:         Catches code that is likely to be incorrect
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-shadow-restricted-names': 2,
        // RATIONALE:         Obsolete language feature that is deprecated.
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-sparse-arrays': 2,
        // RATIONALE:         Although in theory JavaScript allows any possible data type to be thrown as an exception,
        //                    such flexibility adds pointless complexity, by requiring every catch block to test
        //                    the type of the object that it receives.  Whereas if catch blocks can always assume
        //                    that their object implements the "Error" contract, then the code is simpler, and
        //                    we generally get useful additional information like a call stack.
        'no-throw-literal': 2,
        // RATIONALE:         Catches a common coding mistake.
        'no-unmodified-loop-condition': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-unsafe-finally': 2,
        // RATIONALE:         Catches a common coding mistake.
        'no-unused-expressions': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-unused-labels': 1,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-useless-catch': 1,
        // RATIONALE:         Avoids a potential performance problem.
        'no-useless-concat': 1,
        // RATIONALE:         The "var" keyword is deprecated because of its confusing "hoisting" behavior.
        //                    Always use "let" or "const" instead.
        //
        // STANDARDIZED BY:   @typescript-eslint\eslint-plugin\dist\configs\recommended.json
        'no-var': 2,
        // RATIONALE:         Generally not needed in modern code.
        'no-void': 1,
        // RATIONALE:         Obsolete language feature that is deprecated.
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'no-with': 2,
        // RATIONALE:         Makes logic easier to understand, since constants always have a known value
        // @typescript-eslint\eslint-plugin\dist\configs\eslint-recommended.js
        'prefer-const': 1,
        // RATIONALE:         Catches a common coding mistake where "resolve" and "reject" are confused.
        'promise/param-names': 2,
        // RATIONALE:         Catches code that is likely to be incorrect
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'require-atomic-updates': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'require-yield': 1,
        // "Use strict" is redundant when using the TypeScript compiler.
        'strict': [
          2,
          'never'
        ],
        // RATIONALE:         Catches code that is likely to be incorrect
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        'use-isnan': 2,
        // STANDARDIZED BY:   eslint\conf\eslint-recommended.js
        // Set to 1 (warning) or 2 (error) to enable.
        // Rationale to disable: !!{}
        'no-extra-boolean-cast': 0,
        // ====================================================================
        // @microsoft/eslint-plugin-spfx
        // ====================================================================
        '@microsoft/spfx/import-requires-chunk-name': 1,
        '@microsoft/spfx/no-require-ensure': 2,
        '@microsoft/spfx/pair-react-dom-render-unmount': 1
      }
    },
    {
      // For unit tests, we can be a little bit less strict.  The settings below revise the
      // defaults specified in the extended configurations, as well as above.
      files: [
        // Test files
        '*.test.ts',
        '*.test.tsx',
        '*.spec.ts',
        '*.spec.tsx',

        // Facebook convention
        '**/__mocks__/*.ts',
        '**/__mocks__/*.tsx',
        '**/__tests__/*.ts',
        '**/__tests__/*.tsx',

        // Microsoft convention
        '**/test/*.ts',
        '**/test/*.tsx'
      ],
      rules: {}
    }
  ]
};