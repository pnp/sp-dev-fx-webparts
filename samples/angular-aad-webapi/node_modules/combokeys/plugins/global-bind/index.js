/* eslint-env node, browser */
'use strict'
/**
 * adds a bindGlobal method to Combokeys that allows you to
 * bind specific keyboard shortcuts that will still work
 * inside a text input field
 *
 * usage:
 * Combokeys.bindGlobal("ctrl+s", _saveChanges)
 */
module.exports = function (Combokeys) {
  var globalCallbacks = {}
  var originalStopCallback = Combokeys.stopCallback

  Combokeys.stopCallback = function (e, element, combo, sequence) {
    if (globalCallbacks[combo] || globalCallbacks[sequence]) {
      return false
    }

    return originalStopCallback(e, element, combo)
  }

  Combokeys.bindGlobal = function (keys, callback, action) {
    this.bind(keys, callback, action)

    if (keys instanceof Array) {
      for (var i = 0; i < keys.length; i++) {
        globalCallbacks[keys[i]] = true
      }
      return
    }

    globalCallbacks[keys] = true
  }

  return Combokeys
}
