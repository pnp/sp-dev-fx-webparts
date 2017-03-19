"use strict";
var rtl_1 = require('./rtl');
var dom_1 = require('./dom');
var expect = chai.expect;
describe('rtl', function () {
    it('can set and get the rtl setting on the server', function () {
        dom_1.setSSR(true);
        rtl_1.setRTL(true);
        expect(rtl_1.getRTL()).is.true;
        rtl_1.setRTL(false);
        expect(rtl_1.getRTL()).is.false;
        dom_1.setSSR(false);
    });
    it('can throw when setting a value on the server without setRTL called', function () {
        dom_1.setSSR(true);
        rtl_1.setRTL(undefined);
        expect(rtl_1.getRTL).throws();
        dom_1.setSSR(false);
    });
});

//# sourceMappingURL=rtl.test.js.map
