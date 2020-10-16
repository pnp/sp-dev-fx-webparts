import * as tslib_1 from "tslib";
import * as React from 'react';
import { Canvas } from '@ms/sp-canvas';
import { DisplayMode, Text } from '@microsoft/sp-core-library';
import { autobind, css } from '@microsoft/office-ui-fabric-react-bundle';
/* tslint:disable-next-line:max-line-length */
import propertyPaneStyles from '@microsoft/sp-property-pane/lib/propertyPaneController/PropertyPaneController.module.scss';
import styles from './CanvasHost.module.scss';
import strings from './CanvasHost.resx';
var CanvasHost = /** @class */ (function (_super) {
    tslib_1.__extends(CanvasHost, _super);
    function CanvasHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanvasHost.prototype.componentDidMount = function () {
        var _this = this;
        var variantsModuleLoader = function () { return import('@uifabric/variants/lib/variants' /* webpackChunkName: 'uifabric-variants' */); };
        var canvasOptions = {
            variantsModuleLoader: variantsModuleLoader,
            serviceScope: this.props.store.serviceScope,
            mode: this._getDisplayMode(),
            pageLayoutType: 'workbench'
        };
        this._canvasPromise = Canvas.instantiateCanvas(this._canvasElement, canvasOptions).then(function (canvas) {
            _this._canvas = canvas;
            _this._afterCanvasInitialized();
        });
    };
    CanvasHost.prototype.componentDidUpdate = function (props) {
        var _this = this;
        var mode = this._getDisplayMode();
        if (this._canvas) {
            this._canvasPromise.then(function () { return _this._canvas.setDisplayMode(mode); }).catch(function (error) { return console.error(Text.format(strings.CanvasInitializationError, error)); });
        }
    };
    CanvasHost.prototype.render = function () {
        var _this = this;
        var _a;
        var rootClass = css(styles.canvasHost, (_a = {},
            _a[styles.hasHeader] = this.props.hasOfficeHeader,
            _a[styles.hasCommandBar] = this.props.hasCommandBar,
            _a));
        return (React.createElement("div", { className: rootClass },
            React.createElement("div", { className: styles.belowHeader },
                React.createElement("div", { className: styles.content },
                    React.createElement("div", { ref: function (canvasElement) { return _this._canvasElement = canvasElement; } })))));
    };
    CanvasHost.prototype._getDisplayMode = function () {
        return this.props.isEditing ? DisplayMode.Edit : DisplayMode.Read;
    };
    CanvasHost.prototype._clearPage = function () {
        this._canvas.render(this._getDisplayMode()).catch(function (error) { return console.error(Text.format(strings.UnknownError, error)); });
        // Removing the property pane with slide effect, when discard is clicked.
        var propertyPaneContainer = document.getElementById('propertyPaneContainer');
        if (propertyPaneContainer) {
            propertyPaneContainer.classList.remove(propertyPaneStyles.showPane);
            // This is to see the slide effect of the property pane and then empty the container.
            window.setTimeout(function () {
                while (propertyPaneContainer.firstChild) {
                    propertyPaneContainer.removeChild(propertyPaneContainer.firstChild);
                }
            }, 1000);
        }
    };
    CanvasHost.prototype._afterCanvasInitialized = function () {
        var _this = this;
        // Don't render webparts until the page is ready
        this.props.store.getPageReadyPromise().then(function () {
            var render = function () {
                _this.props.store.setClearCallback(_this._clearPage);
                _this.props.store.setSerializeCallback(_this._canvas.serializeAsJson);
                return _this._canvas.renderDeprecated(_this._getDisplayMode(), _this.props.store.getPageState());
            };
            // Fetch webparts before rendering to avoid a race condition.
            return _this._canvas.fetchWebparts(true)
                .then(render)
                .catch(function (error) {
                console.error(Text.format(strings.FetchFailedError, error));
                return render();
            });
        }).catch(function (error) { return console.error(Text.format(strings.UnknownError, error)); });
    };
    tslib_1.__decorate([
        autobind
    ], CanvasHost.prototype, "_clearPage", null);
    return CanvasHost;
}(React.Component));
export default CanvasHost;
//# sourceMappingURL=CanvasHost.js.map