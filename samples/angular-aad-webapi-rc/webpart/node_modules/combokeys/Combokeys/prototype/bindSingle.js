/* eslint-env node, browser */
'use strict'

/**
 * binds a single keyboard combination
 *
 * @param {string} combination
 * @param {Function} callback
 * @param {string=} action
 * @param {string=} sequenceName - name of sequence if part of sequence
 * @param {number=} level - what part of the sequence the command is
 * @returns void
 */
module.exports = function (combination, callback, action, sequenceName, level) {
  var self = this

  // store a direct mapped reference for use with Combokeys.trigger
  self.directMap[combination + ':' + action] = callback

  // make sure multiple spaces in a row become a single space
  combination = combination.replace(/\s+/g, ' ')

  var sequence = combination.split(' ')
  var info

  // if this pattern is a sequence of keys then run through this method
  // to reprocess each pattern one key at a time
  if (sequence.length > 1) {
    self.bindSequence(combination, sequence, callback, action)
    return
  }

  info = self.getKeyInfo(combination, action)

  // make sure to initialize array if this is the first time
  // a callback is added for this key
  self.callbacks[info.key] = self.callbacks[info.key] || []

  // remove an existing match if there is one
  self.getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level)

  // add this call back to the array
  // if it is a sequence put it at the beginning
  // if not put it at the end
  //
  // this is important because the way these are processed expects
  // the sequence ones to come first
  self.callbacks[info.key][sequenceName ? 'unshift' : 'push']({
    callback: callback,
    modifiers: info.modifiers,
    action: info.action,
    seq: sequenceName,
    level: level,
    combo: combination
  })
}
