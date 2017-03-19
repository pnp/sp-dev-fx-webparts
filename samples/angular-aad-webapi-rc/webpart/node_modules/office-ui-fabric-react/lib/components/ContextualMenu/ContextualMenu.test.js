"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var ContextualMenu_1 = require('./ContextualMenu');
describe('ContextualMenu', function () {
    it('does not have a scrollbar due to an overflowing icon', function () {
        var items = [
            { name: 'TestText 1', key: 'TestKey1', canCheck: true, isChecked: true },
            { name: 'TestText 2', key: 'TestKey2', canCheck: true, isChecked: true },
            { name: 'TestText 3', key: 'TestKey3', canCheck: true, isChecked: true },
            { name: 'TestText 4', key: 'TestKey4', canCheck: true, isChecked: true },
        ];
        ReactTestUtils.renderIntoDocument(React.createElement(ContextualMenu_1.ContextualMenu, {items: items}));
        var menuList = document.querySelector('.ms-ContextualMenu-list');
        expect(menuList.scrollHeight).to.be.lte(menuList.offsetHeight, 'ContextualMenu is showing a scrollbar due to checkmark');
    });
});

//# sourceMappingURL=ContextualMenu.test.js.map
