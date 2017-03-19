module.exports = function(h, s, l) {
  s *= ((l < 50) ? l : (100 - l)) / 100;

  console.log('s', s);

  return {
    h: h,
    s: 2 * s / (l+s) * 100,
    v: l + s
  };
};