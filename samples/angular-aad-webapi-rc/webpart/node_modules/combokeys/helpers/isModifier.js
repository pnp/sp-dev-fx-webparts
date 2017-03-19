/* eslint-env node, browser */
'use strict'

/**
 * determines if the keycode specified is a modifier key or not
 *
 * @param {string} key
 * @returns {boolean}
 */
module.exports = function (key) {
  return key === 'shift' || key === 'ctrl' || key === 'alt' || key === 'meta'
}
