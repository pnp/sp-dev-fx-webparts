"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseStore_1 = require('./BaseStore');
var expect = chai.expect;
var TestStore = (function (_super) {
    __extends(TestStore, _super);
    function TestStore() {
        _super.apply(this, arguments);
    }
    TestStore.prototype.doThings = function () {
        this.emitChange();
    };
    return TestStore;
}(BaseStore_1.BaseStore));
describe('BaseStore', function () {
    it('can emit changes', function () {
        var test = new TestStore();
        var hasChanged = false;
        test.subscribe(function () { return hasChanged = true; });
        test.doThings();
        expect(hasChanged).to.be.true;
    });
    it('can unsubscribe', function () {
        var test = new TestStore();
        var hasChanged = false;
        var disposable = test.subscribe(function () { return hasChanged = true; });
        disposable.dispose();
        test.doThings();
        expect(hasChanged).to.be.false;
    });
});

//# sourceMappingURL=BaseStore.test.js.map
