"use strict";
var LandingTemplate = (function () {
    function LandingTemplate() {
    }
    return LandingTemplate;
}());
LandingTemplate.templateHtml = "\n        <div data-ng-controller=\"controller_home\">\n            <div ng-show=\"isLoading\">\n            <uif-spinner>Loading...</uif-spinner>\n            </div>\n            <div ng-show=\"needsconfig\">\n                <p>Please configure this webpart.</p>\n            </div>\n\n            <uif-list ng-show=\"isLoading === false && (PopularItems).length > 0\">\n            <uif-list-item ng-repeat=\"PopularItem in PopularItems | orderBy : '-ViewsLifeTime' | limitTo: numberOfItems\" uif-item=\"PopularItem\" uif-type=\"itemWithImage\">\n                <uif-list-item-image>\n                    {{PopularItem.ViewsLifeTime}}\n                </uif-list-item-image>\n                <uif-list-item-primary-text>{{PopularItem.Title}}</uif-list-item-primary-text>\n                <uif-list-item-secondary-text>{{PopularItem.Author}}</uif-list-item-secondary-text>\n                <uif-list-item-tertiary-text>{{PopularItem.LastModifiedTime | date : 'shortDate'}}</uif-list-item-tertiary-text>\n                <uif-list-item-optional-text>{{PopularItem.FileExtension}}</uif-list-item-optional-text>\n            </uif-list-item>\n            </uif-list>\n\n            <div ng-show=\"isLoading === false && (PopularItems).length <= 0 && !error\">\n                <p>No records found.</p>\n            </div>\n            <div ng-if=\"error\">\n                <p>{{error}}</p>\n            </div>\n        </div>\n    ";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingTemplate;

//# sourceMappingURL=LandingTemplate.js.map
