'use strict';

var istanbul = require('istanbul');
var loaderUtils = require('loader-utils');
var assign = require('object-assign');

var defaultOptions = {
    embedSource: true,
    noAutoWrap: true
};

module.exports = function(source) {
    var userOptions = loaderUtils.parseQuery(this.query);
    var instrumenter = new istanbul.Instrumenter(
        assign({}, defaultOptions, userOptions)
    );

    if (this.cacheable) {
        this.cacheable();
    }

    return instrumenter.instrumentSync(source, this.resourcePath);
};
