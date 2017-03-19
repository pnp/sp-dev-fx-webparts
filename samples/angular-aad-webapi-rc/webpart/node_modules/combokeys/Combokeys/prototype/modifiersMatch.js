/* eslint-env node, browser */
'use strict'

/**
 * checks if two arrays are equal
 *
 * @param {Array} modifiers1
 * @param {Array} modifiers2
 * @returns {boolean}
 */
module.exports = function (modifiers1, modifiers2) {
  return modifiers1.sort().join(',') === modifiers2.sort().join(',')
}
