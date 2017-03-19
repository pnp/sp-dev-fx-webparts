module.exports = function(r, g, b, a) {
  return 'rgba('+
    [r, g, b, a/100].join(',')+')';
};