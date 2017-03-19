var rgba2rgb = require('./rgba2rgb');
var rgb2hex = require('./rgb2hex');

module.exports = function(r, g, b, a) {
  var rgb = rgba2rgb(r, g, b, a);
  return rgb2hex(rgb.r, rgb.g, rgb.b);
};
