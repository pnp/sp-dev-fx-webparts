"use strict";
var implicitRoles = require("./implicitRoles");
var TypeGuard_1 = require("./TypeGuard");
function getImplicitRole(node) {
    var tagName;
    if (TypeGuard_1.isJsxElement(node)) {
        tagName = node.openingElement.tagName.getText();
    }
    else if (TypeGuard_1.isJsxSelfClosingElement(node)) {
        tagName = node.tagName.getText();
    }
    else if (TypeGuard_1.isJsxOpeningElement(node)) {
        tagName = node.tagName.getText();
    }
    else {
        tagName = undefined;
    }
    return tagName && implicitRoles[tagName] && implicitRoles[tagName](node);
}
exports.getImplicitRole = getImplicitRole;
//# sourceMappingURL=getImplicitRole.js.map