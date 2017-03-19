"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactTestUtils = require('react-addons-test-utils');
var BaseComponent_1 = require('./BaseComponent');
var assert = chai.assert, expect = chai.expect;
var _originalOnError = BaseComponent_1.BaseComponent.onError;
var TestComponent = (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent() {
        _super.apply(this, arguments);
    }
    TestComponent.prototype.componentWillMount = function () {
        this._createNullRef();
    };
    TestComponent.prototype.componentDidMount = function () {
        this._createNullRef();
    };
    TestComponent.prototype.shouldComponentUpdate = function () {
        this._createNullRef();
    };
    TestComponent.prototype.componentWillUpdate = function () {
        this._createNullRef();
    };
    TestComponent.prototype.componentWillReceiveProps = function () {
        this._createNullRef();
    };
    TestComponent.prototype.render = function () {
        this._createNullRef();
        return null;
    };
    TestComponent.prototype.componentDidUpdate = function () {
        this._createNullRef();
    };
    TestComponent.prototype.componentWillUnmount = function () {
        this._createNullRef();
    };
    TestComponent.prototype._createNullRef = function () {
        var foo = null;
        // Calling a null
        foo();
    };
    return TestComponent;
}(BaseComponent_1.BaseComponent));
describe('BaseComponent', function () {
    afterEach(function () {
        BaseComponent_1.BaseComponent.onError = _originalOnError;
    });
    _buildTestFor('componentWillMount');
    _buildTestFor('componentDidMount');
    _buildTestFor('shouldComponentUpdate');
    _buildTestFor('componentWillUpdate');
    _buildTestFor('componentWillReceiveProps');
    _buildTestFor('render');
    _buildTestFor('componentDidUpdate');
    _buildTestFor('componentWillUnmount');
    it('can resolve refs', function () {
        var Foo = (function (_super) {
            __extends(Foo, _super);
            function Foo() {
                _super.apply(this, arguments);
            }
            Foo.prototype.render = function () {
                return React.createElement("div", {ref: this._resolveRef('root')});
            };
            return Foo;
        }(BaseComponent_1.BaseComponent));
        var component = ReactTestUtils.renderIntoDocument(React.createElement(Foo, null));
        expect(component.root).to.exist;
    });
});
function _buildTestFor(methodName) {
    it("calls the error logger on " + methodName + " exception", function () {
        var lastErrorMessage = null;
        BaseComponent_1.BaseComponent.onError = function (errorMessage, ex) { return lastErrorMessage = errorMessage; };
        var c = new TestComponent();
        c[methodName]();
        assert(lastErrorMessage !== null, 'Error callback not called');
    });
}

//# sourceMappingURL=BaseComponent.test.js.map
