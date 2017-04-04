/* eslint-env node, browser */
'use strict'

/**
 * handles a character key event
 *
 * @param {string} character
 * @param {Array} modifiers
 * @param {Event} e
 * @returns void
 */
module.exports = function (character, modifiers, e) {
  var self = this
  var callbacks
  var j
  var doNotReset = {}
  var maxLevel = 0
  var processedSequenceCallback = false
  var isModifier
  var ignoreThisKeypress

  callbacks = self.getMatches(character, modifiers, e)
  // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
  for (j = 0; j < callbacks.length; ++j) {
    if (callbacks[j].seq) {
      maxLevel = Math.max(maxLevel, callbacks[j].level)
    }
  }

  // loop through matching callbacks for this key event
  for (j = 0; j < callbacks.length; ++j) {
    // fire for all sequence callbacks
    // this is because if for example you have multiple sequences
    // bound such as "g i" and "g t" they both need to fire the
    // callback for matching g cause otherwise you can only ever
    // match the first one
    if (callbacks[j].seq) {
      // only fire callbacks for the maxLevel to prevent
      // subsequences from also firing
      //
      // for example 'a option b' should not cause 'option b' to fire
      // even though 'option b' is part of the other sequence
      //
      // any sequences that do not match here will be discarded
      // below by the resetSequences call
      if (callbacks[j].level !== maxLevel) {
        continue
      }

      processedSequenceCallback = true

      // keep a list of which sequences were matches for later
      doNotReset[callbacks[j].seq] = 1
      self.fireCallback(callbacks[j].callback, e, callbacks[j].combo, callbacks[j].seq)
      continue
    }

    // if there were no sequence matches but we are still here
    // that means this is a regular match so we should fire that
    if (!processedSequenceCallback) {
      self.fireCallback(callbacks[j].callback, e, callbacks[j].combo)
    }
  }

  // if the key you pressed matches the type of sequence without
  // being a modifier (ie "keyup" or "keypress") then we should
  // reset all sequences that were not matched by this event
  //
  // this is so, for example, if you have the sequence "h a t" and you
  // type "h e a r t" it does not match.  in this case the "e" will
  // cause the sequence to reset
  //
  // modifier keys are ignored because you can have a sequence
  // that contains modifiers such as "enter ctrl+space" and in most
  // cases the modifier key will be pressed before the next key
  //
  // also if you have a sequence such as "ctrl+b a" then pressing the
  // "b" key will trigger a "keypress" and a "keydown"
  //
  // the "keydown" is expected when there is a modifier, but the
  // "keypress" ends up matching the nextExpectedAction since it occurs
  // after and that causes the sequence to reset
  //
  // we ignore keypresses in a sequence that directly follow a keydown
  // for the same character
  ignoreThisKeypress = e.type === 'keypress' && self.ignoreNextKeypress
  isModifier = require('../../helpers/isModifier')
  if (e.type === self.nextExpectedAction && !isModifier(character) && !ignoreThisKeypress) {
    self.resetSequences(doNotReset)
  }

  self.ignoreNextKeypress = processedSequenceCallback && e.type === 'keydown'
}
