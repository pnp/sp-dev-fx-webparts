"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var MyRecentDocuments_1 = require("./components/MyRecentDocuments");
var strings = require("myRecentDocumentsStrings");
var MyRecentDocumentsWebPart = (function (_super) {
    __extends(MyRecentDocumentsWebPart, _super);
    function MyRecentDocumentsWebPart(context) {
        return _super.call(this) || this;
    }
    MyRecentDocumentsWebPart.prototype.render = function () {
        var element = React.createElement(MyRecentDocuments_1.default, {
            numberOfDocuments: this.properties.numberOfDocuments,
            title: this.properties.title,
            httpClient: this.context.spHttpClient,
            siteUrl: this.context.pageContext.web.absoluteUrl
        });
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(MyRecentDocumentsWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    MyRecentDocumentsWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('title', {
                                    label: strings.TitleFieldLabel
                                }),
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
    return MyRecentDocumentsWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyRecentDocumentsWebPart;

//# sourceMappingURL=MyRecentDocumentsWebPart.js.map
