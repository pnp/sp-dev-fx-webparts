/* eslint-env browser, mocha */
var assert = require('proclaim')
var sinon = require('sinon')
var Combokeys = require('../..')
var KeyEvent = require('.././lib/key-event')

describe('combokeys.bind', function () {
  it('bind multiple keys', function () {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/bind-dictionary')(combokeys)
    combokeys.bind({
      'a': spy,
      'b': spy,
      'c': spy
    })

    KeyEvent.simulate('A'.charCodeAt(0), 65)
    KeyEvent.simulate('B'.charCodeAt(0), 66)
    KeyEvent.simulate('C'.charCodeAt(0), 67)
    KeyEvent.simulate('Z'.charCodeAt(0), 90)

    assert.equal(spy.callCount, 3, 'callback should fire three times')
    assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
    assert.equal(spy.args[0][1], 'a', 'second argument should be key combo')
  })
})

describe('combokeys.unbind', function () {
  it('unbind works', function () {
    var spy = sinon.spy()
    var combokeys = new Combokeys(document)
    require('../../plugins/bind-dictionary')(combokeys)
    combokeys.bind({
      'a': spy
    })
    KeyEvent.simulate('a'.charCodeAt(0), 65)
    assert.equal(spy.callCount, 1, 'callback for a should fire')

    combokeys.unbind('a')
    KeyEvent.simulate('a'.charCodeAt(0), 65)
    assert.equal(spy.callCount, 1, 'callback for a should not fire after unbind')
  })
})
