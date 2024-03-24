const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Initialize an empty array to store the merged nodes
let mergedNodes = [];

function getDirectories(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

const baseDirectory = 'samples';
const directories = getDirectories(baseDirectory);

directories.forEach(directory => {
  const assetsPath = path.join(baseDirectory, directory, 'assets');
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    files.forEach(file => {
      if (file === 'sample.json') {
        const data = JSON.parse(fs.readFileSync(path.join(assetsPath, file), 'utf8'));
        // Assuming data is an array of nodes, merge it into the mergedNodes array
        Array.prototype.push.apply(mergedNodes, data);
        // Or using spread operator
        // mergedNodes.push(...data);
      }
    });
  }
});

// Write the merged nodes to a new JSON file
fs.writeFileSync('sample.json', JSON.stringify(mergedNodes, null, 2));

console.log('Merged nodes saved to samples_merged.json');
