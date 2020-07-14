'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

let needIESupport = true;
if(!!process.argv && process.argv.length >0) {
  needIESupport = process.argv.findIndex(item => '--noie11' === item.toLowerCase()) !=-1 ;
}


if(needIESupport){
  process.stdout.write(`Using babel-loader to support IE11 \n`);
  build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
      generatedConfiguration.module.rules.push({
        test: /\.js$/,
       exclude: /node_modules\/(?!(rss-paser))/,
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
} else {
  process.stdout.write(`No IE11 Support webpack will be 5 times faster \n`);
}


build.initialize(gulp);
