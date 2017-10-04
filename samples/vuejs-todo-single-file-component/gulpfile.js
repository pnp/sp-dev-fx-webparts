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
                rules: [
                    {
                        test: /\.vue$/,
                        use: [
                            {
                                loader: 'vue-loader',
                                options: {
                                    esModule: true
                                }
                            }]
                    }]
            },
        };

        return merge(config, vueConfig);
    }
});

let copyOtherFiles = build.subTask('copy-other-files', function(gulp, buildOptions, done){
    return gulp.src(['src/**/*.vue', 'src/**/*.scss'])
               .pipe(gulp.dest(buildOptions.libFolder))
});
build.task('copy-other-files', copyOtherFiles);
build.rig.addPostTypescriptTask(copyOtherFiles);

build.initialize(gulp);
