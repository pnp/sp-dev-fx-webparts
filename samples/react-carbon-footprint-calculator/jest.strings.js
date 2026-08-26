// The localised string files are AMD modules, which SPFx resolves at build
// time. Jest has no AMD loader, so evaluate the English file here and hand
// back what it defines. Keeps one source of truth for the strings.
let strings;
global.define = function (dependencies, factory) {
  strings = factory();
};
require('./src/webparts/carbonFootprintCalculator/loc/en-us.js');
delete global.define;

module.exports = strings;
