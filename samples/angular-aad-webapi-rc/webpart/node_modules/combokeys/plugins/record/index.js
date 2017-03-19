/* eslint-env node, browser */
'use strict'
/**
 * This extension allows you to record a sequence using Combokeys.
 *
 * @author Dan Tao <daniel.tao@gmail.com>
 */
module.exports = function (Combokeys) {
  /**
   * the sequence currently being recorded
   *
   * @type {Array}
   */
  var recordedSequence = []

  /**
   * a callback to invoke after recording a sequence
   *
   * @type {Function|null}
   */
  var recordedSequenceCallback = null

  /**
   * a list of all of the keys currently held down
   *
   * @type {Array}
   */
  var currentRecordedKeys = []

  /**
   * temporary state where we remember if we've already captured a
   * character key in the current combo
   *
   * @type {boolean}
   */
  var recordedCharacterKey = false

  /**
   * a handle for the timer of the current recording
   *
   * @type {null|number}
   */
  var recordTimer = null

  /**
   * the original handleKey method to override when Combokeys.record() is
   * called
   *
   * @type {Function}
   */
  var origHandleKey = Combokeys.handleKey

  /**
   * orders key combos
   * @param  {Array} x
   * @param  {Array} y
   * @return {boolean}
   */
  function sortKeyCombo (x, y) {
    // modifier keys always come first, in alphabetical order
    if (x.length > 1 && y.length === 1) {
      return -1
    } else if (x.length === 1 && y.length > 1) {
      return 1
    }

    // character keys come next (list should contain no duplicates,
    // so no need for equality check)
    return x > y ? 1 : -1
  }

  /**
   * ensures each combo in a sequence is in a predictable order and formats
   * key combos to be "+"-delimited
   *
   * modifies the sequence in-place
   *
   * @param {Array} sequence
   * @returns void
   */
  function normalizeSequence (sequence) {
    var i

    for (i = 0; i < sequence.length; ++i) {
      sequence[i].sort(sortKeyCombo)
      sequence[i] = sequence[i].join('+')
    }
  }

  /**
   * finishes the current recording, passes the recorded sequence to the stored
   * callback, and sets Combokeys.handleKey back to its original function
   *
   * @returns void
   */
  function finishRecording () {
    if (recordedSequenceCallback) {
      normalizeSequence(recordedSequence)
      recordedSequenceCallback(recordedSequence)
    }

    // reset all recorded state
    recordedSequence = []
    recordedSequenceCallback = null
    currentRecordedKeys = []

    Combokeys.handleKey = origHandleKey
  }

  /**
   * called to set a 1 second timeout on the current recording
   *
   * this is so after each key press in the sequence the recording will wait for
   * 1 more second before executing the callback
   *
   * @returns void
   */
  function restartRecordTimer () {
    clearTimeout(recordTimer)
    recordTimer = setTimeout(finishRecording, 1000)
  }

  /**
   * marks whatever key combination that's been recorded so far as finished
   * and gets ready for the next combo
   *
   * @returns void
   */
  function recordCurrentCombo () {
    recordedSequence.push(currentRecordedKeys)
    currentRecordedKeys = []
    recordedCharacterKey = false
    restartRecordTimer()
  }

  /**
   * marks a character key as held down while recording a sequence
   *
   * @param {string} key
   * @returns void
   */
  function recordKey (key) {
    var i

    // one-off implementation of Array.indexOf, since IE6-9 don't support it
    for (i = 0; i < currentRecordedKeys.length; ++i) {
      if (currentRecordedKeys[i] === key) {
        return
      }
    }

    currentRecordedKeys.push(key)

    if (key.length === 1) {
      recordedCharacterKey = true
    }
  }

  /**
   * handles a character key event
   *
   * @param {string} character
   * @param {Array} modifiers
   * @param {Event} e
   * @returns void
   */
  function handleKey (character, modifiers, e) {
    var i
    // remember this character if we're currently recording a sequence
    if (e.type === 'keydown') {
      if (character.length === 1 && recordedCharacterKey) {
        recordCurrentCombo()
      }

      for (i = 0; i < modifiers.length; ++i) {
        recordKey(modifiers[i])
      }
      recordKey(character)

    // once a key is released, all keys that were held down at the time
    // count as a keypress
    } else if (e.type === 'keyup' && currentRecordedKeys.length > 0) {
      recordCurrentCombo()
    }
  }

  /**
   * records the next sequence and passes it to a callback once it's
   * completed
   *
   * @param {Function} callback
   * @returns void
   */
  Combokeys.record = function (callback) {
    Combokeys.handleKey = handleKey
    recordedSequenceCallback = callback
  }

  return Combokeys
}
