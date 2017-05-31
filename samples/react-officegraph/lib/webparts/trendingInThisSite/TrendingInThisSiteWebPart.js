"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDom = require("react-dom");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = require("trendingInThisSiteStrings");
var TrendingInThisSite_1 = require("./components/TrendingInThisSite");
var TrendingInThisSiteWebPart = (function (_super) {
    __extends(TrendingInThisSiteWebPart, _super);
    function TrendingInThisSiteWebPart(context) {
        return _super.call(this) || this;
    }
    TrendingInThisSiteWebPart.prototype.render = function () {
        var element = React.createElement(TrendingInThisSite_1.default, {
            numberOfDocuments: this.properties.numberOfDocuments,
            siteUrl: this.context.pageContext.web.absoluteUrl
        });
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(TrendingInThisSiteWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    TrendingInThisSiteWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.ViewGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneSlider('numberOfDocuments', {
                                    label: strings.NumberOfDocumentsFieldLabel,
                                    min: 1,
                                    max: 10,
                                    step: 1
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TrendingInThisSiteWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrendingInThisSiteWebPart;

//# sourceMappingURL=TrendingInThisSiteWebPart.js.map
