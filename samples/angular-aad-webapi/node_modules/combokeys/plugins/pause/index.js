/* eslint-env node, browser */
'use strict'
/**
 * adds a pause and unpause method to Combokeys
 * this allows you to enable or disable keyboard shortcuts
 * without having to reset Combokeys and rebind everything
 */
module.exports = function (Combokeys) {
  var originalStopCallback = Combokeys.stopCallback
  var enabled = true

  Combokeys.stopCallback = function (e, element, combo) {
    if (!enabled) {
      return true
    }

    return originalStopCallback(e, element, combo)
  }

  Combokeys.pause = function () {
    enabled = false
  }

  Combokeys.unpause = function () {
    enabled = true
  }

  return Combokeys
}
