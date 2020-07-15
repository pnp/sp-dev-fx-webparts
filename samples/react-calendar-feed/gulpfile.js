'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const path = require('path');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

let needIESupport = true;
if (!!process.argv && process.argv.length > 0) {
  needIESupport = process.argv.findIndex(item => '--noie11' === item.toLowerCase()) === -1;
}

if (needIESupport) {
  const ie11BabeLoader = {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              "ie": "11"
            }
          }
        ]
      ]
    }
  };

  //process.stdout.write(`Adding babel-loader to support IE11 \n`);
  build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
      generatedConfiguration.module.rules.push({
        test: /\.js$/,
        /*
        This selector increase the webpack(gulp serve) time 5 times then without
          exclude: [/node_modules\/(?!(rss-parser))/],
          */
        include: [
          path.resolve(__dirname, "node_modules/rss-parser"),
        ],
        use: [ie11BabeLoader]
      });

      return generatedConfiguration;
    }
  });
} else {
  process.stdout.write(`No IE11 Support is set \n`);
}


build.initialize(gulp);
