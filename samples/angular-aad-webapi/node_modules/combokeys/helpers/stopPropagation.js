/* eslint-env node, browser */
'use strict'

/**
 * stops propogation for this event
 *
 * @param {Event} e
 * @returns void
 */
module.exports = function (e) {
  if (e.stopPropagation) {
    e.stopPropagation()
    return
  }

  e.cancelBubble = true
}
