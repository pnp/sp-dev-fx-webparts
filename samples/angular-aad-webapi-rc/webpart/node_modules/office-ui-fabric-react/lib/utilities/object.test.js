"use strict";
var object_1 = require('./object');
var assert = chai.assert, expect = chai.expect;
describe('assign', function () {
    it('can copy an object', function () {
        var source = {
            a: 1,
            b: 'string',
            c: {
                d: 2
            }
        };
        var resultTarget = {};
        var result = object_1.assign(resultTarget, source);
        assert(result !== source, 'result was same as source');
        assert(result === resultTarget, 'target was not returned');
        expect(result).to.eql(source, 'result did not equal source');
    });
});
describe('filteredAssign', function () {
    it('can copy an object but avoid copying some parameters', function () {
        var source = {
            a: 1,
            b: 'string'
        };
        var result = object_1.filteredAssign(function (propName) { return propName !== 'b'; }, {}, source);
        expect(result.a).to.equal(1);
        expect(result.b).to.equal(undefined, 'b was not excluded');
    });
});

//# sourceMappingURL=object.test.js.map
