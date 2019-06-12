'use strict';

// check if gulp dist was called
if (process.argv.indexOf('dist') !== -1) {
    // add ship options to command call
    process.argv.push('--ship');
}

const path = require('path');
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const gulpSequence = require('gulp-sequence');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Create clean distrubution package
gulp.task('dist', gulpSequence('clean', 'bundle', 'package-solution'));
// Create clean development package
gulp.task('dev', gulpSequence('clean', 'bundle', 'package-solution'));




/**
 * Custom Framework Specific gulp tasks
 */
// Merge custom loader to web pack configuration

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vuePlugin = new VueLoaderPlugin();
const themedStyleLoader = require.resolve('@microsoft/loader-load-themed-styles');



    build.configureWebpack.mergeConfig({

        additionalConfiguration: (generatedConfiguration) => {

            const loadersConfigs = [{
                test: /\.vue$/, // vue
                use: [{
                    loader: 'vue-loader'
                }]
            }, {
                resourceQuery: /vue&type=script&lang=ts/, // typescript
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                }
            }, {
                resourceQuery: /vue&type=style.*&lang=scss/, // scss
                use: [{
                    loader: themedStyleLoader,
                    options: {
                        async: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]_[sha1:hash:hex:8]'
                    }
                },
                    'sass-loader'
                ]
            }];

            generatedConfiguration.plugins.push(vuePlugin);
        
                generatedConfiguration.module.rules.push(...loadersConfigs);

            return generatedConfiguration;

        }

    });

// register custom watch for Vue.JS files
// copy of '.vue' files will be handled by 'copy-static-assets.json'
gulp.watch('./src/**/*.vue', event => {
    // copy empty index.ts onto itself to launch build procees
    gulp.src('./src/index.ts')
        .pipe(gulp.dest('./src/'));

});


build.initialize(gulp);

/**
 * Continuous Integration
 */

