"use strict";
var SearchUtils = (function () {
    function SearchUtils() {
    }
    SearchUtils.getValueFromResults = function (key, results) {
        var value = undefined;
        if (results && results.length > 0 && key) {
            for (var i = 0; i < results.length; i++) {
                var resultItem = results[i];
                if (resultItem.Key === key) {
                    value = resultItem.Value;
                    break;
                }
            }
        }
        return value;
    };
    SearchUtils.getPreviewImageUrl = function (result, siteUrl) {
        var uniqueID = SearchUtils.getValueFromResults('uniqueID', result);
        var siteId = SearchUtils.getValueFromResults('siteID', result);
        var webId = SearchUtils.getValueFromResults('webID', result);
        var docId = SearchUtils.getValueFromResults('DocId', result);
        if (uniqueID && siteId && webId && docId) {
            return siteUrl + "/_layouts/15/getpreview.ashx?guidFile=" + uniqueID + "&guidSite=" + siteId + "&guidWeb=" + webId + "&docid=" + docId + "\n      &metadatatoken=300x424x2&ClientType=CodenameOsloWeb&size=small";
        }
        else {
            return '';
        }
    };
    SearchUtils.getActionName = function (actionId) {
        switch (actionId) {
            case 1001:
                return 'Viewed';
            case 1003:
                return 'Modified';
            default:
                return '';
        }
    };
    return SearchUtils;
}());
exports.SearchUtils = SearchUtils;

//# sourceMappingURL=SearchUtils.js.map
