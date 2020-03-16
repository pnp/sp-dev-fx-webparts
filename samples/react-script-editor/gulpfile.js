'use strict';

const gulp = require('gulp');
const path = require('path');
const build = require('@microsoft/sp-build-web');
const bundleAnalyzer = require('webpack-bundle-analyzer');

build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        const lastDirName = path.basename(__dirname);
        const dropPath = path.join(__dirname, 'temp', 'stats');
        generatedConfiguration.plugins.push(new bundleAnalyzer.BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
            generateStatsFile: true,
            statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
            logLevel: 'error'
        }));

        return generatedConfiguration;
    }
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.initialize(gulp);