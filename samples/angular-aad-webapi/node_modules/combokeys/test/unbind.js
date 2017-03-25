/* eslint-env mocha */
var Combokeys = require('..')
var assert = require('proclaim')
var makeElement = require('./helpers/make-element')
var sinon = require('sinon')
var KeyEvent = require('./lib/key-event')

describe('combokeys.unbind', function () {
  it('unbind works', function () {
    var element = makeElement()
    var spy = sinon.spy()
    var combokeys = new Combokeys(element)
    combokeys.bind('a', spy)
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    assert.strictEqual(spy.callCount, 1, 'callback for a should fire')

    combokeys.unbind('a')
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    assert.strictEqual(spy.callCount, 1, 'callback for a should not fire after unbind')
  })

  it('unbinds \'any-character\'', function () {
    var element = makeElement()
    var spy = sinon.spy()
    var combokeys = new Combokeys(element)
    combokeys.bind('any-character', spy)
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    assert.strictEqual(spy.callCount, 1, 'just checking the callback')
    combokeys.unbind('any-character')
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
    assert.strictEqual(spy.callCount, 1, 'unbound')
  })

  it('unbind accepts an array', function () {
    var element = makeElement()
    var spy = sinon.spy()
    var combokeys = new Combokeys(element)
    combokeys.bind(['a', 'b', 'c'], spy)
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
    KeyEvent.simulate('c'.charCodeAt(0), 67, null, element)
    assert.strictEqual(spy.callCount, 3, 'callback should have fired 3 times')

    combokeys.unbind(['a', 'b', 'c'])
    KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
    KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
    KeyEvent.simulate('c'.charCodeAt(0), 67, null, element)
    assert.strictEqual(spy.callCount, 3, 'callback should not fire after unbind')
  })
})
