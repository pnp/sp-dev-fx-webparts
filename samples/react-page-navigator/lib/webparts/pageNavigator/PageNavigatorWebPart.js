var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import PageNavigator from './components/PageNavigator';
import { SPService } from '../../Service/SPService';
import { ThemeProvider } from '@microsoft/sp-component-base';
import { PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import strings from 'PageNavigatorWebPartStrings';
var PageNavigatorWebPart = /** @class */ (function (_super) {
    __extends(PageNavigatorWebPart, _super);
    function PageNavigatorWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anchorLinks = [];
        return _this;
    }
    PageNavigatorWebPart.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onInit.call(this)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, SPService.GetAnchorLinks(this.context, this.properties.isExpanded)];
                    case 2:
                        _a.anchorLinks = _b.sent();
                        // Consume the new ThemeProvider service
                        this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
                        // If it exists, get the theme variant
                        this._themeVariant = this._themeProvider.tryGetTheme();
                        // Register a handler to be notified if the theme variant changes
                        this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
                        return [2 /*return*/];
                }
            });
        });
    };
    PageNavigatorWebPart.prototype.render = function () {
        var element = React.createElement(PageNavigator, {
            anchorLinks: this.anchorLinks,
            themeVariant: this._themeVariant,
            stickyMode: this.properties.stickyMode,
            stickyParentDistance: this.properties.stickyParentDistance,
            webpartId: this.context.instanceId
        });
        ReactDom.render(element, this.domElement);
    };
    PageNavigatorWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(PageNavigatorWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    PageNavigatorWebPart.prototype.validateDistanceParam = function (distStr) {
        var regex = /^\d+$/;
        var isNumeric = regex.test(distStr);
        if (!isNumeric) {
            return strings.ErrorNumeric;
        }
        return ""; // No error
    };
    PageNavigatorWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupFields: [
                                PropertyPaneToggle('stickyMode', {
                                    label: strings.StickyMode
                                }),
                                PropertyPaneTextField('stickyParentDistance', {
                                    label: strings.StickyParentDistance,
                                    onGetErrorMessage: this.validateDistanceParam.bind(this)
                                }),
                                PropertyPaneToggle('isExpanded', {
                                    label: strings.IsExpanded
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    PageNavigatorWebPart.prototype._handleThemeChangedEvent = function (args) {
        this._themeVariant = args.theme;
    };
    return PageNavigatorWebPart;
}(BaseClientSideWebPart));
export default PageNavigatorWebPart;
//# sourceMappingURL=PageNavigatorWebPart.js.map