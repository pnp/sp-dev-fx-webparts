/* eslint-env node, browser */
'use strict'

/**
 * actually calls the callback function
 *
 * if your callback function returns false this will use the jquery
 * convention - prevent default and stop propogation on the event
 *
 * @param {Function} callback
 * @param {Event} e
 * @returns void
 */
module.exports = function (callback, e, combo, sequence) {
  var self = this
  var preventDefault
  var stopPropagation

  // if this event should not happen stop here
  if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
    return
  }

  if (callback(e, combo) === false) {
    preventDefault = require('../../helpers/preventDefault')
    preventDefault(e)
    stopPropagation = require('../../helpers/stopPropagation')
    stopPropagation(e)
  }
}
