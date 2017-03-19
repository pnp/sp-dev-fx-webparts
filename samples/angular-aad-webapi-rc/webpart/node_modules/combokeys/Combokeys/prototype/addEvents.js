/* eslint-env node, browser */
'use strict'
module.exports = function () {
  var self = this
  var on = require('./dom-event')
  var element = self.element

  self.eventHandler = require('./handleKeyEvent').bind(self)

  on(element, 'keypress', self.eventHandler)
  on(element, 'keydown', self.eventHandler)
  on(element, 'keyup', self.eventHandler)
}
