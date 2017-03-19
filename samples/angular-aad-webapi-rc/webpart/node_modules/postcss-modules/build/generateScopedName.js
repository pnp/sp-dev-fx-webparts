'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateScopedName;

var _stringHash = require('string-hash');

var _stringHash2 = _interopRequireDefault(_stringHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateScopedName(name, filename, css) {
  var i = css.indexOf('.' + name);
  var lineNumber = css.substr(0, i).split(/[\r\n]/).length;
  var hash = (0, _stringHash2.default)(css).toString(36).substr(0, 5);

  return '_' + name + '_' + hash + '_' + lineNumber;
}