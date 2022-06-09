'use strict';

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
            generateStatsFile: false,
            logLevel: 'error'
        }));

        return generatedConfiguration;
    }
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
    var result = getTasks.call(build.rig);

    result.set('serve', result.get('serve-deprecated'));

    return result;
};

// disable tslint
build.tslintCmd.enabled = false;

// add eslint
const eslint = require('gulp-eslint');
const eslintSubTask = build.subTask('eslint-subTask', function (gulp, buildOptions, done) {
    return gulp.src(['src/**/*.{ts,tsx}'])
        .pipe(eslint('./config/eslint.json'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
build.rig.addPreBuildTask(build.task('eslint', eslintSubTask));

build.initialize(require('gulp'));