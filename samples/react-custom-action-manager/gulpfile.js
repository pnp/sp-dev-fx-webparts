'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(/Warning - [a-z]+-loader/);
build.addSuppression(/Warning - Obsolete loader/);
build.addSuppression(/Warning - [a-z]+-webpack-plugin/);

// Configure TypeScript
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if (build.getConfig().production) {
      generatedConfiguration.optimization.minimize = true;
    }
    return generatedConfiguration;
  }
});

// Configure bundle analyzer - commented out due to Fluent UI v8 export changes
// build.rig.addPreCopyInstructions([
//   {
//     sourceFilePath: require.resolve('@fluentui/react/lib-amd/fluentui-react.js'),
//     targetFilePath: './temp/fluentui-react.js'
//   }
// ]);

build.initialize(require('gulp'));