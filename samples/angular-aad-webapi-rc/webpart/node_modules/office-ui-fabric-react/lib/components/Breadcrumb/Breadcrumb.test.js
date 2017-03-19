"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var Breadcrumb_1 = require('./Breadcrumb');
describe('Breadcrumb', function () {
    it('can call the callback when an item is clicked', function () {
        var callbackValue;
        var clickCallback = function (ev, item) {
            callbackValue = item.key;
        };
        var items = [
            { text: 'TestText', key: 'TestKey', onClick: clickCallback }
        ];
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Breadcrumb_1.Breadcrumb, {items: items}));
        var renderedDOM = ReactDOM.findDOMNode(component);
        var itemLink = renderedDOM.querySelector('.ms-Breadcrumb-itemLink');
        ReactTestUtils.Simulate.click(itemLink);
        expect(callbackValue).to.equal('TestKey');
    });
});

//# sourceMappingURL=Breadcrumb.test.js.map
