/* eslint-env node, browser */
'use strict'

/**
 * picks the best action based on the key combination
 *
 * @param {string} key - character for key
 * @param {Array} modifiers
 * @param {string=} action passed in
 */
module.exports = function (key, modifiers, action) {
  var self = this

  // if no action was picked in we should try to pick the one
  // that we think would work best for this key
  if (!action) {
    action = self.getReverseMap()[key] ? 'keydown' : 'keypress'
  }

  // modifier keys don't work as expected with keypress,
  // switch to keydown
  if (action === 'keypress' && modifiers.length) {
    action = 'keydown'
  }

  return action
}
