"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var withResponsiveMode_1 = require('./withResponsiveMode');
var dom_1 = require('../dom');
var expect = chai.expect;
var Example = (function (_super) {
    __extends(Example, _super);
    function Example() {
        _super.apply(this, arguments);
    }
    Example.prototype.render = function () {
        return React.createElement("div", null);
    };
    Example = __decorate([
        withResponsiveMode_1.withResponsiveMode
    ], Example);
    return Example;
}(React.Component));
describe('withResponsiveMode', function () {
    it('can be used in a server scenario', function () {
        dom_1.setSSR(true);
        withResponsiveMode_1.setResponsiveMode(withResponsiveMode_1.ResponsiveMode.large);
        expect(function () { return ReactTestUtils.renderIntoDocument(React.createElement(Example, null)); }).to.exist;
        dom_1.setSSR(false);
    });
    it('throws in server scenario when responsive mode is not specified', function () {
        dom_1.setSSR(true);
        withResponsiveMode_1.setResponsiveMode(undefined);
        expect(function () { return ReactTestUtils.renderIntoDocument(React.createElement(Example, null)); }).throws();
        dom_1.setSSR(false);
    });
});

//# sourceMappingURL=withResponsiveMode.test.js.map
