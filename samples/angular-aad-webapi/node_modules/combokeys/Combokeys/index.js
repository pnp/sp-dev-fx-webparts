/* eslint-env node, browser */
'use strict'

module.exports = function (element) {
  var self = this
  var Combokeys = self.constructor

  /**
   * a list of all the callbacks setup via Combokeys.bind()
   *
   * @type {Object}
   */
  self.callbacks = {}

  /**
   * direct map of string combinations to callbacks used for trigger()
   *
   * @type {Object}
   */
  self.directMap = {}

  /**
   * keeps track of what level each sequence is at since multiple
   * sequences can start out with the same sequence
   *
   * @type {Object}
   */
  self.sequenceLevels = {}

  /**
   * variable to store the setTimeout call
   *
   * @type {null|number}
   */
  self.resetTimer

  /**
   * temporary state where we will ignore the next keyup
   *
   * @type {boolean|string}
   */
  self.ignoreNextKeyup = false

  /**
   * temporary state where we will ignore the next keypress
   *
   * @type {boolean}
   */
  self.ignoreNextKeypress = false

  /**
   * are we currently inside of a sequence?
   * type of action ("keyup" or "keydown" or "keypress") or false
   *
   * @type {boolean|string}
   */
  self.nextExpectedAction = false

  self.element = element

  self.addEvents()

  Combokeys.instances.push(self)
  return self
}

module.exports.prototype.bind = require('./prototype/bind')
module.exports.prototype.bindMultiple = require('./prototype/bindMultiple')
module.exports.prototype.unbind = require('./prototype/unbind')
module.exports.prototype.trigger = require('./prototype/trigger')
module.exports.prototype.reset = require('./prototype/reset.js')
module.exports.prototype.stopCallback = require('./prototype/stopCallback')
module.exports.prototype.handleKey = require('./prototype/handleKey')
module.exports.prototype.addEvents = require('./prototype/addEvents')
module.exports.prototype.bindSingle = require('./prototype/bindSingle')
module.exports.prototype.getKeyInfo = require('./prototype/getKeyInfo')
module.exports.prototype.pickBestAction = require('./prototype/pickBestAction')
module.exports.prototype.getReverseMap = require('./prototype/getReverseMap')
module.exports.prototype.getMatches = require('./prototype/getMatches')
module.exports.prototype.resetSequences = require('./prototype/resetSequences')
module.exports.prototype.fireCallback = require('./prototype/fireCallback')
module.exports.prototype.bindSequence = require('./prototype/bindSequence')
module.exports.prototype.resetSequenceTimer = require('./prototype/resetSequenceTimer')
module.exports.prototype.detach = require('./prototype/detach')

module.exports.instances = []
module.exports.reset = require('./reset')

/**
 * variable to store the flipped version of MAP from above
 * needed to check if we should use keypress or not when no action
 * is specified
 *
 * @type {Object|undefined}
 */
module.exports.REVERSE_MAP = null
