/* eslint-env node, browser */
'use strict'

/**
 * takes a key event and figures out what the modifiers are
 *
 * @param {Event} e
 * @returns {Array}
 */
module.exports = function (e) {
  var modifiers = []

  if (e.shiftKey) {
    modifiers.push('shift')
  }

  if (e.altKey) {
    modifiers.push('alt')
  }

  if (e.ctrlKey) {
    modifiers.push('ctrl')
  }

  if (e.metaKey) {
    modifiers.push('meta')
  }

  return modifiers
}
