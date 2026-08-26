'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
addFastServe(build);
/* end of fast-serve */

// Configure webpack for Microsoft Graph Toolkit
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push({
      test: /\.m?js$/,
      use: {
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/plugin-transform-optional-chaining",
            "@babel/plugin-transform-nullish-coalescing-operator",
            "@babel/plugin-transform-logical-assignment-operators"
          ]
        }
      }
    });
    return generatedConfiguration;
  }
});

build.initialize(require('gulp'));

