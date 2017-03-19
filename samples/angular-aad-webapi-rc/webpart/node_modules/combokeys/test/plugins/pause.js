/* eslint-env mocha */
var assert = require('proclaim')
var sinon = require('sinon')
var Combokeys = require('../..')
var KeyEvent = require('.././lib/key-event')

describe('combokeys.pause', function () {
  it('pause and unpause works', function () {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/pause')(combokeys)
    combokeys.bind('a', spy)

    KeyEvent.simulate('A'.charCodeAt(0), 65)
    combokeys.pause()
    KeyEvent.simulate('A'.charCodeAt(0), 65)
    combokeys.unpause()
    KeyEvent.simulate('A'.charCodeAt(0), 65)

    assert.equal(spy.callCount, 2, 'callback should fire twice')
  })
})
