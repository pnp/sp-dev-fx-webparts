'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);


build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push({
      test: /\.js$/,
     exclude: /node_modules\/(?!(rss-paser|@babel))/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env",
              {
                targets: {
                  "ie": "11"
                }
              }
            ]
          ]
        }
      }
    });

    return generatedConfiguration;
  }
});

/* 
Show current Webpack configuration
*/
/*
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfig) => {
    console.log('<webpack.config type="object">');
    console.log(generatedConfig);
    console.log('</webpack.config>');

    console.log('<webpack.config type="string">');
    console.log(JSON.stringify(generatedConfig));
    console.log('</webpack.config>');

    return generatedConfig;
  }
});
*/



build.initialize(gulp);
