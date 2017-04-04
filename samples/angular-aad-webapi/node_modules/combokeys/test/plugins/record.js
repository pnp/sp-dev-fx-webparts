/* eslint-env browser, mocha */
var assert = require('proclaim')
var sinon = require('sinon')
var Combokeys = require('../..')
var KeyEvent = require('.././lib/key-event')

describe('combokeys.record', function () {
  it('recording keys works', function (done) {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/record')(combokeys)
    combokeys.record(spy)

    KeyEvent.simulate('A'.charCodeAt(0), 65)
    KeyEvent.simulate('B'.charCodeAt(0), 66)
    KeyEvent.simulate('C'.charCodeAt(0), 67)
    KeyEvent.simulate('O'.charCodeAt(0), 79, ['meta', 'shift'])

    setTimeout(function () {
      assert.equal(spy.callCount, 1, 'callback should fire once')
      assert.deepEqual(
        spy.args[0][0],
        ['a', 'b', 'c', 'meta+shift+o'],
        'all key presses should be recorded'
      )
      done()
    }, 1000)
  })
})
