/* eslint-env node, browser */
'use strict'

/**
 * handles a keydown event
 *
 * @param {Event} e
 * @returns void
 */
module.exports = function (e) {
  var self = this
  var characterFromEvent
  var eventModifiers

  // normalize e.which for key events
  // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
  if (typeof e.which !== 'number') {
    e.which = e.keyCode
  }
  characterFromEvent = require('../../helpers/characterFromEvent')
  var character = characterFromEvent(e)

  // no character found then stop
  if (!character) {
    return
  }

  // need to use === for the character check because the character can be 0
  if (e.type === 'keyup' && self.ignoreNextKeyup === character) {
    self.ignoreNextKeyup = false
    return
  }

  eventModifiers = require('../../helpers/eventModifiers')
  self.handleKey(character, eventModifiers(e), e)
}
