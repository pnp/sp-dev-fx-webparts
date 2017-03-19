/* eslint-env node, browser */
'use strict'

/**
 * binds a key sequence to an event
 *
 * @param {string} combo - combo specified in bind call
 * @param {Array} keys
 * @param {Function} callback
 * @param {string=} action
 * @returns void
 */
module.exports = function (combo, keys, callback, action) {
  var self = this

  // start off by adding a sequence level record for this combination
  // and setting the level to 0
  self.sequenceLevels[combo] = 0

  /**
   * callback to increase the sequence level for this sequence and reset
   * all other sequences that were active
   *
   * @param {string} nextAction
   * @returns {Function}
   */
  function increaseSequence (nextAction) {
    return function () {
      self.nextExpectedAction = nextAction
      ++self.sequenceLevels[combo]
      self.resetSequenceTimer()
    }
  }

  /**
   * wraps the specified callback inside of another function in order
   * to reset all sequence counters as soon as this sequence is done
   *
   * @param {Event} e
   * @returns void
   */
  function callbackAndReset (e) {
    var characterFromEvent
    self.fireCallback(callback, e, combo)

    // we should ignore the next key up if the action is key down
    // or keypress.  this is so if you finish a sequence and
    // release the key the final key will not trigger a keyup
    if (action !== 'keyup') {
      characterFromEvent = require('../../helpers/characterFromEvent')
      self.ignoreNextKeyup = characterFromEvent(e)
    }

    // weird race condition if a sequence ends with the key
    // another sequence begins with
    setTimeout(
      function () {
        self.resetSequences()
      },
      10
    )
  }

  // loop through keys one at a time and bind the appropriate callback
  // function.  for any key leading up to the final one it should
  // increase the sequence. after the final, it should reset all sequences
  //
  // if an action is specified in the original bind call then that will
  // be used throughout.  otherwise we will pass the action that the
  // next key in the sequence should match.  this allows a sequence
  // to mix and match keypress and keydown events depending on which
  // ones are better suited to the key provided
  for (var j = 0; j < keys.length; ++j) {
    var isFinal = j + 1 === keys.length
    var wrappedCallback = isFinal ? callbackAndReset : increaseSequence(action || self.getKeyInfo(keys[j + 1]).action)
    self.bindSingle(keys[j], wrappedCallback, action, combo, j)
  }
}
