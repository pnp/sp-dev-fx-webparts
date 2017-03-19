"use strict";
(function (FocusZoneDirection) {
    /** Only react to up/down arrows. */
    FocusZoneDirection[FocusZoneDirection["vertical"] = 0] = "vertical";
    /** Only react to left/right arrows. */
    FocusZoneDirection[FocusZoneDirection["horizontal"] = 1] = "horizontal";
    /** React to all arrows. */
    FocusZoneDirection[FocusZoneDirection["bidirectional"] = 2] = "bidirectional";
})(exports.FocusZoneDirection || (exports.FocusZoneDirection = {}));
var FocusZoneDirection = exports.FocusZoneDirection;

//# sourceMappingURL=FocusZone.Props.js.map
