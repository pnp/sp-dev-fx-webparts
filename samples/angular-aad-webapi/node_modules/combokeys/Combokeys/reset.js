/* eslint-env node, browser */
'use strict'

module.exports = function () {
  var self = this

  self.instances.forEach(function (combokeys) {
    combokeys.reset()
  })
}
