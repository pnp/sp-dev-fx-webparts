'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
var merge = require('webpack-merge');

build.sass.setConfig({
    sassMatch: []
});

build.configureWebpack.setConfig({
    additionalConfiguration: function (config) {
        var vueConfig = {
            module: {
                loaders: [
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader'
                    }
                ]
            },
            vue: {
                esModule: true
            }
        };

        return merge(config, vueConfig);
    }
});

build.copyStaticAssets.setConfig({
    includeExtensions: ['vue', 'scss']
});

build.initialize(gulp);
