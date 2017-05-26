"use strict";
var IsoToDateString = (function () {
    function IsoToDateString() {
    }
    IsoToDateString.filter = function () {
        return function (value) {
            return String.format("{0:yyyy}-{0:MM}-{0:dd}", new Date(value));
        };
    };
    return IsoToDateString;
}());
exports.IsoToDateString = IsoToDateString;

//# sourceMappingURL=isoToDateString.js.map
