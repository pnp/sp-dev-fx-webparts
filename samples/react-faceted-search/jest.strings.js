let strings;
global.define = function (dependencies, factory) {
  strings = factory();
};
require('./src/webparts/facetedSearch/loc/en-us.js');
delete global.define;

module.exports = strings;
