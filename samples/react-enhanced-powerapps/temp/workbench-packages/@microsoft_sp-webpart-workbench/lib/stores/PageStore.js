import * as tslib_1 from "tslib";
import { autobind } from '@microsoft/office-ui-fabric-react-bundle';
var PageStore = /** @class */ (function () {
    function PageStore(serviceScope) {
        var _this = this;
        this._PAGE_DATA_KEY = 'sp_webpart_workbench_state';
        this._pageReadyPromise = new Promise(function (resolve) {
            _this._resolvePageReady = resolve;
        });
        this._serviceScope = serviceScope;
        window.setInterval(this.savePageState, 3 * 1000);
    }
    Object.defineProperty(PageStore.prototype, "serviceScope", {
        get: function () {
            return this._serviceScope;
        },
        enumerable: true,
        configurable: true
    });
    PageStore.prototype.getSerializeCallback = function () {
        return this._serializePage;
    };
    PageStore.prototype.setSerializeCallback = function (callback) {
        this._serializePage = callback;
        /* tslint:disable:no-string-literal */
        if (window['SP']) {
            window['SP'].logSerializedPageState = callback;
            /* tslint:enable:no-string-literal */
        }
    };
    PageStore.prototype.setClearCallback = function (callback) {
        this._clearPage = callback;
    };
    PageStore.prototype.savePageState = function () {
        if (this._serializePage) {
            sessionStorage.setItem(this._PAGE_DATA_KEY, this._serializePage());
        }
    };
    PageStore.prototype.clearPageState = function () {
        sessionStorage.removeItem(this._PAGE_DATA_KEY);
        if (this._clearPage) {
            this._clearPage();
        }
    };
    PageStore.prototype.getPageState = function () {
        return sessionStorage.getItem(this._PAGE_DATA_KEY);
    };
    PageStore.prototype.getPageReadyPromise = function () {
        return this._pageReadyPromise;
    };
    PageStore.prototype.setPageReady = function () {
        this._resolvePageReady();
    };
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "getSerializeCallback", null);
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "setSerializeCallback", null);
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "setClearCallback", null);
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "savePageState", null);
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "clearPageState", null);
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "getPageState", null);
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "getPageReadyPromise", null);
    tslib_1.__decorate([
        autobind
    ], PageStore.prototype, "setPageReady", null);
    return PageStore;
}());
export { PageStore };
//# sourceMappingURL=PageStore.js.map