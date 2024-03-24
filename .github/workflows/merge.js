const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let result = {};

function getDirectories(path) {
  return fs.readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

let directories = getDirectories('samples');
directories.forEach(directory => {
  let assetsPath = path.join('samples', directory, 'assets');
  if (fs.existsSync(assetsPath)) {
    let files = fs.readdirSync(assetsPath);
    files.forEach(file => {
      if (file === 'sample.json') {
        let data = JSON.parse(fs.readFileSync(path.join(assetsPath, file)));
        result = _.merge(result, data);
      }
    });
  }
});

fs.writeFileSync('samples.json', JSON.stringify(result));