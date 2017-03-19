"use strict";
(function (MessageBarType) {
    /** Info styled MessageBar */
    MessageBarType[MessageBarType["info"] = 0] = "info";
    /** Error styled MessageBar */
    MessageBarType[MessageBarType["error"] = 1] = "error";
    /** Blocked styled MessageBar */
    MessageBarType[MessageBarType["blocked"] = 2] = "blocked";
    /** SevereWarning styled MessageBar */
    MessageBarType[MessageBarType["severeWarning"] = 3] = "severeWarning";
    /** Success styled MessageBar */
    MessageBarType[MessageBarType["success"] = 4] = "success";
    /** Warning styled MessageBar */
    MessageBarType[MessageBarType["warning"] = 5] = "warning";
    /**
     * @deprecated
     * Deprecated at v0.48.0, to be removed at >= v1.0.0. Use 'blocked' instead.
     */
    MessageBarType[MessageBarType["remove"] = 6] = "remove";
})(exports.MessageBarType || (exports.MessageBarType = {}));
var MessageBarType = exports.MessageBarType;

//# sourceMappingURL=MessageBar.Props.js.map
