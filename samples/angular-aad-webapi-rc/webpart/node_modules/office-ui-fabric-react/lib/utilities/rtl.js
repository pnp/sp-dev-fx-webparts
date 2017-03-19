"use strict";
var KeyCodes_1 = require('./KeyCodes');
var dom_1 = require('./dom');
var _isRTL = false;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
function getRTL() {
    if (_isRTL === undefined) {
        var doc = dom_1.getDocument();
        if (doc) {
            _isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        }
        else {
            throw new Error('getRTL was called in a server environment without setRTL being called first. ' +
                'Call setRTL to set the correct direction first.');
        }
    }
    return _isRTL;
}
exports.getRTL = getRTL;
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
function setRTL(isRTL) {
    var doc = dom_1.getDocument();
    if (doc) {
        doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
    _isRTL = isRTL;
}
exports.setRTL = setRTL;
/**
 * Returns the given key, but flips right/left arrows if necessary.
 */
function getRTLSafeKeyCode(key) {
    if (getRTL()) {
        if (key === KeyCodes_1.KeyCodes.left) {
            key = KeyCodes_1.KeyCodes.right;
        }
        else if (key === KeyCodes_1.KeyCodes.right) {
            key = KeyCodes_1.KeyCodes.left;
        }
    }
    return key;
}
exports.getRTLSafeKeyCode = getRTLSafeKeyCode;

//# sourceMappingURL=rtl.js.map
