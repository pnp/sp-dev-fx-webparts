"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var connect_1 = require('./connect');
var BaseStore_1 = require('./BaseStore');
var StoreHost_1 = require('./StoreHost');
var StoreSet_1 = require('./StoreSet');
var storeKey_1 = require('./storeKey');
var expect = chai.expect;
// Dumb component.
var TestComponent = function (props) { return (React.createElement("div", __assign({}, props))); };
var AddStore = (function (_super) {
    __extends(AddStore, _super);
    function AddStore() {
        _super.apply(this, arguments);
    }
    return AddStore;
}(BaseStore_1.BaseStore));
var HelloStore = (function (_super) {
    __extends(HelloStore, _super);
    function HelloStore() {
        _super.apply(this, arguments);
        this.message = '';
    }
    HelloStore.prototype.say = function (message) {
        this.message = message;
        this.emitChange();
    };
    return HelloStore;
}(BaseStore_1.BaseStore));
describe('connect', function () {
    it('can observe store changes', function (done) {
        var hello1 = storeKey_1.storeKey('hello1');
        var hello2 = storeKey_1.storeKey('hello2');
        var localStores = new StoreSet_1.StoreSet()
            .add(hello1, new HelloStore())
            .add(hello2, new HelloStore());
        var Connected = connect_1.connect(TestComponent, [hello1, hello2], function (props, hello1Store, hello2Store) { return ({
            children: hello1Store.message + hello2Store.message
        }); });
        var root = ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
            React.createElement(StoreHost_1.StoreHost, {stores: localStores}, 
                React.createElement(Connected, null)
            )
        ));
        var rootElement = ReactDOM.findDOMNode(root);
        expect(rootElement.textContent).equals('');
        localStores.getStore(hello1).say('hello');
        setTimeout(function () {
            try {
                expect(rootElement.textContent).equals('hello');
                localStores.getStore(hello2).say(' world');
                setTimeout(function () {
                    try {
                        expect(rootElement.textContent).equals('hello world');
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                }, 10);
            }
            catch (e) {
                done(e);
            }
        }, 10);
    });
    it('can throw when requiring a store in an environment without any stores hosted', function () {
        var hello = storeKey_1.storeKey('hello');
        var Connected = connect_1.connect(TestComponent, [hello], function () { });
        var threwException = false;
        try {
            ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
                React.createElement(Connected, null)
            ));
        }
        catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.true;
    });
    it('can throw in an environment that does not contain the required store', function () {
        var hello = storeKey_1.storeKey('hello');
        var Connected = connect_1.connect(TestComponent, [hello], function () { });
        var threwException = false;
        try {
            ReactTestUtils.renderIntoDocument(React.createElement(StoreHost_1.StoreHost, {stores: new StoreSet_1.StoreSet()}, 
                React.createElement("div", null, 
                    React.createElement(Connected, null)
                )
            ));
        }
        catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.true;
    });
    it('renders a connected component 1 time when multiple stores fire changes', function (done) {
        var resolves = 0;
        var renders = 0;
        var Dumb = function () {
            renders++;
            return React.createElement("div", null, "hi");
        };
        var hello1 = storeKey_1.storeKey('hello1');
        var hello2 = storeKey_1.storeKey('hello2');
        var localStores = new StoreSet_1.StoreSet()
            .add(hello1, new HelloStore())
            .add(hello2, new HelloStore());
        var Connected = connect_1.connect(Dumb, [hello1, hello2], function () {
            resolves++;
            return {};
        });
        ReactTestUtils.renderIntoDocument(React.createElement("div", null, 
            React.createElement(StoreHost_1.StoreHost, {stores: localStores}, 
                React.createElement(Connected, null)
            )
        ));
        expect(resolves).to.equal(1, 'resolve was not 1');
        expect(renders).to.equal(1, 'render was not 1');
        // Cause 2 store changes. This should setImmediate and cause 1 resolve.
        localStores.getStore(hello1).say('hello');
        localStores.getStore(hello2).say(' world');
        setTimeout(function () {
            try {
                expect(resolves).to.equal(2, 'resolve was not 2');
                expect(renders).to.equal(1, 'render was not 1');
                done();
            }
            catch (e) {
                done(e);
            }
        }, 10);
    });
});

//# sourceMappingURL=connect.test.js.map
