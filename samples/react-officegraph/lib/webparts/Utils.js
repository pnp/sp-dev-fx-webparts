"use strict";
var Utils = (function () {
    function Utils() {
    }
    Utils.getUserPhotoUrl = function (userEmail, siteUrl, size) {
        if (size === void 0) { size = 'S'; }
        return siteUrl + "/_layouts/15/userphoto.aspx?size=" + size + "&accountname=" + userEmail;
    };
    Utils.trim = function (s) {
        if (s && s.length > 0) {
            return s.replace(/^\s+|\s+$/gm, '');
        }
        else {
            return s;
        }
    };
    return Utils;
}());
exports.Utils = Utils;

//# sourceMappingURL=Utils.js.map
