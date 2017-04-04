/* eslint-env mocha */
var Combokeys = require('..')
var assert = require('proclaim')
var makeElement = require('./helpers/make-element')
var sinon = require('sinon')
var KeyEvent = require('./lib/key-event')

describe('combokeys.detach', function () {
  it('detaches', function () {
    var element = makeElement()
    var spy = sinon.spy()
    var combokeys = new Combokeys(element)
    combokeys.bind('a', spy)
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    assert.strictEqual(spy.callCount, 1, 'calls back normally')
    combokeys.detach()
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    assert.strictEqual(spy.callCount, 1, 'does not call back because detached')
  })
})
