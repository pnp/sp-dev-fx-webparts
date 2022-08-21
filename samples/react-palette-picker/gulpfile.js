'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'slider-track' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'toolbar-item' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'code-toolbar' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'inline-color' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'inline-color-wrapper' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'line-numbers-rows' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'line-numbers' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'attr-value' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'class-name' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'function-name' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'attr-name' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'block-comment' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'slider-thumb' is not camelCase and will not be type-safe.`);



var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
