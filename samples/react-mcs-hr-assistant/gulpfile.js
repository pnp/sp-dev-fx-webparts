'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function() {
    var result = getTasks.call(build.rig);

    result.set('serve', result.get('serve-deprecated'));

    return result;
};

// build.configureWebpack.mergeConfig({
//     additionalConfiguration: (generatedConfiguration) => {
//         generatedConfiguration.module.rules.push({
//             test: /\.js$/,
//             exclude: /node_modules\/(?!htmlparser2)/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: ['@babel/preset-env']
//                 }
//             }
//         });

//         return generatedConfiguration;
//     }
// });

/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
addFastServe(build);
/* end of fast-serve */

build.initialize(require('gulp'));
