/* eslint-env node, browser */
'use strict'

/**
 * reverses the map lookup so that we can look for specific keys
 * to see what can and can't use keypress
 *
 * @return {Object}
 */
module.exports = function () {
  var self = this
  var constructor = self.constructor
  var SPECIAL_KEYS_MAP

  if (!constructor.REVERSE_MAP) {
    constructor.REVERSE_MAP = {}
    SPECIAL_KEYS_MAP = require('../../helpers/special-keys-map')
    for (var key in SPECIAL_KEYS_MAP) {
      // pull out the numeric keypad from here cause keypress should
      // be able to detect the keys from the character
      if (key > 95 && key < 112) {
        continue
      }

      if (SPECIAL_KEYS_MAP.hasOwnProperty(key)) {
        constructor.REVERSE_MAP[SPECIAL_KEYS_MAP[key]] = key
      }
    }
  }
  return constructor.REVERSE_MAP
}
