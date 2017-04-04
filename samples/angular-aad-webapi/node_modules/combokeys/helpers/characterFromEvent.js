/* eslint-env node, browser */
'use strict'

/**
 * takes the event and returns the key character
 *
 * @param {Event} e
 * @return {string}
 */
module.exports = function (e) {
  var SPECIAL_KEYS_MAP,
    SPECIAL_CHARACTERS_MAP
  SPECIAL_KEYS_MAP = require('./special-keys-map')
  SPECIAL_CHARACTERS_MAP = require('./special-characters-map')

  // for keypress events we should return the character as is
  if (e.type === 'keypress') {
    var character = String.fromCharCode(e.which)

    // if the shift key is not pressed then it is safe to assume
    // that we want the character to be lowercase.  this means if
    // you accidentally have caps lock on then your key bindings
    // will continue to work
    //
    // the only side effect that might not be desired is if you
    // bind something like 'A' cause you want to trigger an
    // event when capital A is pressed caps lock will no longer
    // trigger the event.  shift+a will though.
    if (!e.shiftKey) {
      character = character.toLowerCase()
    }

    return character
  }

  // for non keypress events the special maps are needed
  if (SPECIAL_KEYS_MAP[e.which]) {
    return SPECIAL_KEYS_MAP[e.which]
  }

  if (SPECIAL_CHARACTERS_MAP[e.which]) {
    return SPECIAL_CHARACTERS_MAP[e.which]
  }

  // if it is not in the special map

  // with keydown and keyup events the character seems to always
  // come in as an uppercase character whether you are pressing shift
  // or not.  we should make sure it is always lowercase for comparisons
  return String.fromCharCode(e.which).toLowerCase()
}
