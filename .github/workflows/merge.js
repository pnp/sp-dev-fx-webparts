const glob = require('glob');
const fs = require('fs');
const _ = require('lodash');

let result = {};

glob("samples/**/assets/sample.json", function (er, files) {
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(file));
    result = _.merge(result, data);
  });

  fs.writeFileSync('samples.json', JSON.stringify(result));
});