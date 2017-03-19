"use strict";
var properties_1 = require('./properties');
var expect = chai.expect;
describe('getNativeProps', function () {
    it('can pass through data tags', function () {
        var result = properties_1.getNativeProps({
            'data-automation-id': 1
        }, properties_1.divProperties);
        expect(result['data-automation-id']).equals(1);
    });
    it('can pass through aria tags', function () {
        var result = properties_1.getNativeProps({
            'aria-label': 1
        }, properties_1.divProperties);
        expect(result['aria-label']).equals(1);
    });
    it('can pass through basic div properties and events', function () {
        var result = properties_1.getNativeProps({
            className: 'foo',
            onClick: function () { },
            onClickCapture: function () { }
        }, properties_1.divProperties);
        expect(result.className).equals('foo');
        expect(result.onClick).is.instanceof(Function, 'onClick not function');
        expect(result['onClickCapture']).is.instanceof(Function, 'onClickCapture not function'); // tslint:disable-line:no-string-literal
    });
    it('can remove unexpected properties', function () {
        var result = properties_1.getNativeProps({
            'foobar': 1,
            className: 'hi'
        }, properties_1.divProperties);
        expect(result.className).equals('hi');
        expect(result['foobar']).equals(undefined); // tslint:disable-line:no-string-literal
    });
    it('can exclude properties', function () {
        var result = properties_1.getNativeProps({ a: 1, b: 2 }, ['a', 'b'], ['b']);
        expect(result.a).to.exist;
        expect(result.b).to.not.exist;
    });
});

//# sourceMappingURL=properties.test.js.map
