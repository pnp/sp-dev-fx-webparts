"use strict";
var object_1 = require('../../utilities/object');
var cssColor = require('color-functions/lib/css-color');
var rgb2hex = require('color-functions/lib/rgb2hex');
var hsv2hex = require('color-functions/lib/hsv2hex');
var rgb2hsv = require('color-functions/lib/rgb2hsv');
var hsv2rgb = require('color-functions/lib/hsv2rgb');
exports.MAX_COLOR_SATURATION = 100;
exports.MAX_COLOR_HUE = 359;
exports.MAX_COLOR_VALUE = 100;
function getColorFromString(color) {
    var _a = cssColor(color), a = _a.a, b = _a.b, g = _a.g, r = _a.r;
    var _b = rgb2hsv(r, g, b), h = _b.h, s = _b.s, v = _b.v;
    return {
        a: a,
        b: b,
        g: g,
        h: h,
        hex: rgb2hex(r, g, b),
        r: r,
        s: s,
        str: color,
        v: v
    };
}
exports.getColorFromString = getColorFromString;
function getFullColorString(color) {
    return "#" + hsv2hex(color.h, exports.MAX_COLOR_SATURATION, exports.MAX_COLOR_VALUE);
}
exports.getFullColorString = getFullColorString;
function updateSV(color, s, v) {
    var _a = hsv2rgb(color.h, s, v), r = _a.r, g = _a.g, b = _a.b;
    var hex = rgb2hex(r, g, b);
    return {
        a: color.a,
        b: b,
        g: g,
        h: color.h,
        hex: hex,
        r: r,
        s: s,
        str: (color.a === 100) ? "#" + hex : "rgba(" + r + ", " + g + ", " + b + ", " + color.a / 100 + ")",
        v: v
    };
}
exports.updateSV = updateSV;
function updateH(color, h) {
    var _a = hsv2rgb(h, color.s, color.v), r = _a.r, g = _a.g, b = _a.b;
    var hex = rgb2hex(r, g, b);
    return {
        a: color.a,
        b: b,
        g: g,
        h: h,
        hex: hex,
        r: r,
        s: color.s,
        str: (color.a === 100) ? "#" + hex : "rgba(" + r + ", " + g + ", " + b + ", " + color.a / 100 + ")",
        v: color.v
    };
}
exports.updateH = updateH;
function updateA(color, a) {
    return object_1.assign({}, color, {
        a: a,
        str: (a === 100) ? "#" + color.hex : "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + a / 100 + ")"
    });
}
exports.updateA = updateA;

//# sourceMappingURL=colors.js.map
