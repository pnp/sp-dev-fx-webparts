'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(/Warning - \[sass\] The local CSS class/gi);

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


/* CUSTOM ALIAS */
const path = require('path');
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if(!generatedConfiguration.resolve.alias){
      generatedConfiguration.resolve.alias = {};
    }

    // webparts folder
    generatedConfiguration.resolve.alias['@webparts'] = path.resolve( __dirname, 'lib/webparts')

    //root src folder
    generatedConfiguration.resolve.alias['@src'] = path.resolve( __dirname, 'lib')


    //Nullish Operator
    generatedConfiguration.module.rules.push(
      {
        test: /node_modules[\/\\]@?react-leaflet[\/\\].*.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-nullish-coalescing-operator']
          }
        }
      }
    );

    return generatedConfiguration;
  }
});

/* CUSTOM ALIAS END */

build.initialize(require('gulp'));

