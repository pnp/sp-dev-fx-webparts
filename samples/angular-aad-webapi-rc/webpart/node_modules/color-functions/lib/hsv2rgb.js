// http://www.rapidtables.com/convert/color/hsv-to-rgb.htm
module.exports = function(h, s, v) {
  var s = s/100, v = v/100;
  var rgb = [];

  var c = v * s;
  var hh = h/60;
  var x = c * (1 - Math.abs(hh%2-1));
  var m = v - c;

  switch(parseInt(hh, 10)) {
    case 0:
      rgb = [c, x, 0];
    break;

    case 1:
      rgb = [x, c, 0];
    break;

    case 2:
      rgb = [0, c, x];
    break;

    case 3:
      rgb = [0, x, c];
    break;

    case 4:
      rgb = [x, 0, c];
    break;

    case 5:
      rgb = [c, 0, x];
    break;
  }

  return {
    r: Math.round(255*(rgb[0]+m)),
    g: Math.round(255*(rgb[1]+m)),
    b: Math.round(255*(rgb[2]+m))
  };
};
