'use strict';

const path = require('path');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// Fix for @fluentui/react "exports" field incompatibility with webpack 4
// This maps package subpath imports to their actual file locations
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if (!generatedConfiguration.resolve) {
      generatedConfiguration.resolve = {};
    }
    if (!generatedConfiguration.resolve.alias) {
      generatedConfiguration.resolve.alias = {};
    }

    // Find the @fluentui/react package location
    const fluentuiReactPath = path.dirname(require.resolve('@fluentui/react/package.json'));

    // Map common subpath exports to their lib-commonjs locations
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Button'] = path.join(fluentuiReactPath, 'lib-commonjs/Button');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/components/Button'] = path.join(fluentuiReactPath, 'lib-commonjs/components/Button');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Dropdown'] = path.join(fluentuiReactPath, 'lib-commonjs/Dropdown');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/TextField'] = path.join(fluentuiReactPath, 'lib-commonjs/TextField');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Panel'] = path.join(fluentuiReactPath, 'lib-commonjs/Panel');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Dialog'] = path.join(fluentuiReactPath, 'lib-commonjs/Dialog');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Icon'] = path.join(fluentuiReactPath, 'lib-commonjs/Icon');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Label'] = path.join(fluentuiReactPath, 'lib-commonjs/Label');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Checkbox'] = path.join(fluentuiReactPath, 'lib-commonjs/Checkbox');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/ColorPicker'] = path.join(fluentuiReactPath, 'lib-commonjs/ColorPicker');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Spinner'] = path.join(fluentuiReactPath, 'lib-commonjs/Spinner');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Layer'] = path.join(fluentuiReactPath, 'lib-commonjs/Layer');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Utilities'] = path.join(fluentuiReactPath, 'lib-commonjs/Utilities');
    generatedConfiguration.resolve.alias['@fluentui/react/lib/Styling'] = path.join(fluentuiReactPath, 'lib-commonjs/Styling');

    return generatedConfiguration;
  }
});

/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
addFastServe(build);
/* end of fast-serve */

build.initialize(require('gulp'));

