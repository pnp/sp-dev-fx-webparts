/* eslint-env node, browser */
'use strict'

/**
 * finds all callbacks that match based on the keycode, modifiers,
 * and action
 *
 * @param {string} character
 * @param {Array} modifiers
 * @param {Event|Object} e
 * @param {string=} sequenceName - name of the sequence we are looking for
 * @param {string=} combination
 * @param {number=} level
 * @returns {Array}
 */
module.exports = function (character, modifiers, e, sequenceName, combination, level) {
  var self = this
  var j
  var callback
  var matches = []
  var action = e.type
  var isModifier
  var modifiersMatch

  if (
      action === 'keypress' &&
      // Firefox fires keypress for arrows
      !(e.code && e.code.slice(0, 5) === 'Arrow')
  ) {
    // 'any-character' callbacks are only on `keypress`
    var anyCharCallbacks = self.callbacks['any-character'] || []
    anyCharCallbacks.forEach(function (callback) {
      matches.push(callback)
    })
  }

  if (!self.callbacks[character]) { return matches }

  isModifier = require('../../helpers/isModifier')
  // if a modifier key is coming up on its own we should allow it
  if (action === 'keyup' && isModifier(character)) {
    modifiers = [character]
  }

  // loop through all callbacks for the key that was pressed
  // and see if any of them match
  for (j = 0; j < self.callbacks[character].length; ++j) {
    callback = self.callbacks[character][j]

    // if a sequence name is not specified, but this is a sequence at
    // the wrong level then move onto the next match
    if (!sequenceName && callback.seq && self.sequenceLevels[callback.seq] !== callback.level) {
      continue
    }

    // if the action we are looking for doesn't match the action we got
    // then we should keep going
    if (action !== callback.action) {
      continue
    }

    // if this is a keypress event and the meta key and control key
    // are not pressed that means that we need to only look at the
    // character, otherwise check the modifiers as well
    //
    // chrome will not fire a keypress if meta or control is down
    // safari will fire a keypress if meta or meta+shift is down
    // firefox will fire a keypress if meta or control is down
    modifiersMatch = require('./modifiersMatch')
    if ((action === 'keypress' && !e.metaKey && !e.ctrlKey) || modifiersMatch(modifiers, callback.modifiers)) {
      // when you bind a combination or sequence a second time it
      // should overwrite the first one.  if a sequenceName or
      // combination is specified in this call it does just that
      //
      // @todo make deleting its own method?
      var deleteCombo = !sequenceName && callback.combo === combination
      var deleteSequence = sequenceName && callback.seq === sequenceName && callback.level === level
      if (deleteCombo || deleteSequence) {
        self.callbacks[character].splice(j, 1)
      }

      matches.push(callback)
    }
  }

  return matches
}
