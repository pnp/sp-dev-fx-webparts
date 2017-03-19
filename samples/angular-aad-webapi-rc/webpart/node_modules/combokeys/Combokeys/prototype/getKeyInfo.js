/* eslint-env node, browser */
'use strict'

/**
 * Gets info for a specific key combination
 *
 * @param  {string} combination key combination ("command+s" or "a" or "*")
 * @param  {string=} action
 * @returns {Object}
 */
module.exports = function (combination, action) {
  var self = this
  var keysFromString
  var keys
  var key
  var j
  var modifiers = []
  var SPECIAL_ALIASES
  var SHIFT_MAP
  var isModifier

  keysFromString = require('../../helpers/keysFromString')
  // take the keys from this pattern and figure out what the actual
  // pattern is all about
  keys = keysFromString(combination)

  SPECIAL_ALIASES = require('../../helpers/special-aliases')
  SHIFT_MAP = require('../../helpers/shift-map')
  isModifier = require('../../helpers/isModifier')
  for (j = 0; j < keys.length; ++j) {
    key = keys[j]

    // normalize key names
    if (SPECIAL_ALIASES[key]) {
      key = SPECIAL_ALIASES[key]
    }

    // if this is not a keypress event then we should
    // be smart about using shift keys
    // this will only work for US keyboards however
    if (action && action !== 'keypress' && SHIFT_MAP[key]) {
      key = SHIFT_MAP[key]
      modifiers.push('shift')
    }

    // if this key is a modifier then add it to the list of modifiers
    if (isModifier(key)) {
      modifiers.push(key)
    }
  }

  // depending on what the key combination is
  // we will try to pick the best event for it
  action = self.pickBestAction(key, modifiers, action)

  return {
    key: key,
    modifiers: modifiers,
    action: action
  }
}
