var hsv2rgb = require('./hsv2rgb');
var rgb2hex = require('./rgb2hex');

module.exports = function(h, s, v) {
  var rgb = hsv2rgb(h, s, v);
  return rgb2hex(rgb.r, rgb.g, rgb.b);
};
