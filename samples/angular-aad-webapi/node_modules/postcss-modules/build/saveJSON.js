'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveJSON;

var _fs = require('fs');

function saveJSON(cssFile, json) {
  (0, _fs.writeFileSync)(cssFile + '.json', JSON.stringify(json));
}