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
var strings = require("workingWithStrings");
var WorkingWith_1 = require("./components/WorkingWith");
var WorkingWithWebPart = (function (_super) {
    __extends(WorkingWithWebPart, _super);
    function WorkingWithWebPart(context) {
        return _super.call(this) || this;
    }
    WorkingWithWebPart.prototype.render = function () {
        var element = React.createElement(WorkingWith_1.default, {
            numberOfPeople: this.properties.numberOfPeople,
            title: this.properties.title,
            httpClient: this.context.spHttpClient,
            siteUrl: this.context.pageContext.web.absoluteUrl
        });
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(WorkingWithWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    WorkingWithWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneSlider('numberOfPeople', {
                                    label: strings.NumberOfPeopleFieldLabel,
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
    return WorkingWithWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkingWithWebPart;

//# sourceMappingURL=WorkingWithWebPart.js.map
