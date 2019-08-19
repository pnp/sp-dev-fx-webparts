"use strict";
/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
var MockHttpClient = (function () {
    function MockHttpClient() {
    }
    /**
     * @function
     * Mock get SharePoint list request
     */
    MockHttpClient.getLists = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(MockHttpClient._lists);
        });
    };
    /**
     * @function
     * Mock get SharePoint list items request
     */
    MockHttpClient.getListsItems = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(MockHttpClient._items);
        });
    };
    return MockHttpClient;
}());
/**
 * @var
 * Mock SharePoint list sample
 */
MockHttpClient._lists = [{ Title: 'Mock List', Id: '1', BaseTemplate: '109' }];
/**
 * @var
 * Mock SharePoint list item sample
 */
MockHttpClient._items = [
    { "ID": "1", "Title": "Pic 1", "Description": "", "File": { "Name": "1.jpg", "ServerRelativeUrl": "/Images/1.jpg" } }
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MockHttpClient;

//# sourceMappingURL=MockHttpClient.js.map
