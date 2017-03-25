/* eslint-env node, browser */
'use strict'

/**
 * binds multiple combinations to the same callback
 *
 * @param {Array} combinations
 * @param {Function} callback
 * @param {string|undefined} action
 * @returns void
 */
module.exports = function (combinations, callback, action) {
  var self = this

  for (var j = 0; j < combinations.length; ++j) {
    self.bindSingle(combinations[j], callback, action)
  }
}
