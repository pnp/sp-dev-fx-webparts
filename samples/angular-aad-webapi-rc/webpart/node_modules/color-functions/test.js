var cf = require('./index');
var test = require('tape');

var eps = 1;

test('hex2rgb', function(t) {
  t.plan(4);
  t.deepEqual(cf.hex2rgb('3498db'), {r: 52, g: 152, b: 219});
  t.deepEqual(cf.hex2rgb('#3498db'), {r: 52, g: 152, b: 219});
  t.deepEqual(cf.hex2rgb('#aabbcc'), {r: 170, g: 187, b: 204});
  t.deepEqual(cf.hex2rgb('#abc'), {r: 170, g: 187, b: 204});
});

test('hsv2hex', function(t) {
  t.plan(1);
  t.strictEqual(cf.hsv2hex(204, 76, 86), '3599db');
});

test('hsv2rgb', function(t) {
  t.plan(3);
  t.deepEqual(cf.hsv2rgb(36, 76, 86), {r: 219, g: 153, b: 53});
  t.deepEqual(cf.hsv2rgb(156, 76, 86), {r: 53, g: 219, b: 153});
  t.deepEqual(cf.hsv2rgb(204, 76, 86), {r: 53, g: 153, b: 219});
});

test('rgb2hex', function(t) {
  t.plan(1);
  t.strictEqual(cf.rgb2hex(52, 152, 219), '3498db');
});

test('rgb2hsv', function(t) {
  t.plan(3);
  t.deepEqual(cf.rgb2hsv(219, 152, 52), {h: 36, s: 76, v: 86});
  t.deepEqual(cf.rgb2hsv(52, 219, 152), {h: 156, s: 76, v: 86});
  t.deepEqual(cf.rgb2hsv(52, 152, 219), {h: 204, s: 76, v: 86});
});

test('rgba', function(t) {
  t.plan(1);
  t.strictEqual(cf.rgba(52, 152, 219, 70), 'rgba(52,152,219,0.7)');
});

test('hsv2hsl', function(t) {
  var hsl = cf.hsv2hsl(204.1, 76.3, 85.9);

  t.plan(3);
  t.true(Math.abs(hsl.h - 204.1) < eps);
  t.true(Math.abs(hsl.s - 69.9) < eps);
  t.true(Math.abs(hsl.l - 53.1) < eps);
});

test('hsl2hsv', function(t) {
  var hsv = cf.hsl2hsv(204.1, 69.9, 53.1);

  t.plan(3);
  t.true(Math.abs(hsv.h - 204.1) < eps);
  t.true(Math.abs(hsv.s - 76.3) < eps);
  t.true(Math.abs(hsv.v - 85.9) < eps);
});

test('hsl2rgb', function(t) {
  t.plan(1);
  t.deepEqual(cf.hsl2rgb(204, 70, 53), {r: 51, g: 152, b: 219});
});

test('css-color', function(t) {
  t.deepEqual(cf.cssColor('blue'), {r: 0, g: 0, b: 255, a: 100});
  t.deepEqual(cf.cssColor('rebeccapurple'), {r: 102, g: 51, b: 153, a: 100});
  t.deepEqual(cf.cssColor('blue'), cf.cssColor('rgb(0,0,255)'));

  t.deepEqual(cf.cssColor('Blue'), {r: 0, g: 0, b: 255, a: 100});
  t.deepEqual(cf.cssColor('BLUE'), {r: 0, g: 0, b: 255, a: 100});
  t.deepEqual(cf.cssColor('Rebeccapurple'), {r: 102, g: 51, b: 153, a: 100});
  t.deepEqual(cf.cssColor('REBECCAPURPLE'), {r: 102, g: 51, b: 153, a: 100});

  t.deepEqual(cf.cssColor('#fc0'), {r: 255, g: 204, b: 0, a: 100});
  t.deepEqual(cf.cssColor('#ffcc00'), {r: 255, g: 204, b: 0, a: 100});
  t.deepEqual(cf.cssColor('rgb(255, 204, 0)'), {r: 255, g: 204, b: 0, a: 100});
  t.deepEqual(cf.cssColor('rgba(255, 204, 0, 1)'), {r: 255, g: 204, b: 0, a: 100});

  t.deepEqual(cf.cssColor('rgba(0,0,0,0.5)'), {r: 0, g: 0, b: 0, a: 50});
  t.deepEqual(cf.cssColor('rgba(0,0,0,.5)'), {r: 0, g: 0, b: 0, a: 50});
  t.deepEqual(cf.cssColor('rgba(0,0,0,.75)'), {r: 0, g: 0, b: 0, a: 75});
  t.deepEqual(cf.cssColor('rgba(0,0,0,.755)'), {r: 0, g: 0, b: 0, a: 75.5});

  t.deepEqual(cf.cssColor('hsl(0, 100%, 50%)'), {r: 255, g: 0, b: 0, a: 100});
  t.deepEqual(cf.cssColor('hsla(240,100%,50%,0.05)'), {r: 0, g: 0, b: 255, a: 5});
  t.deepEqual(cf.cssColor('hsla(240, 100%, 50%, 0.05)'), {r: 0, g: 0, b: 255, a: 5});
  t.end();
});

test('rgba2rgb', function(t) {
  t.deepEqual(cf.rgba2rgb(50, 100, 200, 70), {r: 111, g: 146, b: 216});
  t.end();
});

test('rgba2hex', function(t) {
  t.strictEqual(cf.rgba2hex(50, 100, 200, 70), '6f92d8');
  t.end();
});