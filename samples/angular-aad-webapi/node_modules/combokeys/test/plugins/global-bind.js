/* eslint-env browser, mocha */
var assert = require('proclaim')
var sinon = require('sinon')
var Combokeys = require('../..')
var KeyEvent = require('.././lib/key-event')

describe('combokeys.bindGlobal', function () {
  it('z key fires when pressing z', function () {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/global-bind')(combokeys)
    combokeys.bindGlobal('z', spy)

    KeyEvent.simulate('Z'.charCodeAt(0), 90)

    assert.equal(spy.callCount, 1, 'callback should fire once')
    assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
    assert.equal(spy.args[0][1], 'z', 'second argument should be key combo')
  })

  it('z key fires when pressing z in input', function () {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/global-bind')(combokeys)
    combokeys.bindGlobal('z', spy)

    var el = document.createElement('input')
    document.body.appendChild(el)

    KeyEvent.simulate('Z'.charCodeAt(0), 90, undefined, el)

    assert.equal(spy.callCount, 1, 'callback should fire once')
    assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
    assert.equal(spy.args[0][1], 'z', 'second argument should be key combo')
  })

  it('z key fires when pressing z in textarea', function () {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/global-bind')(combokeys)
    combokeys.bindGlobal('z', spy)

    var el = document.createElement('textarea')
    document.body.appendChild(el)

    KeyEvent.simulate('Z'.charCodeAt(0), 90, undefined, el)

    assert.equal(spy.callCount, 1, 'callback should fire once')
    assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
    assert.equal(spy.args[0][1], 'z', 'second argument should be key combo')
  })

  it('z key fires when pressing z in select', function () {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/global-bind')(combokeys)
    combokeys.bindGlobal('z', spy)

    var el = document.createElement('select')
    document.body.appendChild(el)

    KeyEvent.simulate('Z'.charCodeAt(0), 90, undefined, el)

    assert.equal(spy.callCount, 1, 'callback should fire once')
    assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
    assert.equal(spy.args[0][1], 'z', 'second argument should be key combo')
  })

  it('z key fires when pressing z in contenteditable', function () {
    var spy = sinon.spy()

    var combokeys = new Combokeys(document)
    require('../../plugins/global-bind')(combokeys)
    combokeys.bindGlobal('z', spy)

    var el = document.createElement('div')
    el.contentEditable = 'true'
    document.body.appendChild(el)

    KeyEvent.simulate('Z'.charCodeAt(0), 90, undefined, el)

    assert.equal(spy.callCount, 1, 'callback should fire once')
    assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
    assert.equal(spy.args[0][1], 'z', 'second argument should be key combo')
  })
})

describe('combokeys.unbind', function () {
  it('unbind works', function () {
    var spy = sinon.spy()
    var combokeys = new Combokeys(document)
    require('../../plugins/global-bind')(combokeys)
    combokeys.bindGlobal('a', spy)
    KeyEvent.simulate('a'.charCodeAt(0), 65)
    assert.equal(spy.callCount, 1, 'callback for a should fire')

    combokeys.unbind('a')
    KeyEvent.simulate('a'.charCodeAt(0), 65)
    assert.equal(spy.callCount, 1, 'callback for a should not fire after unbind')
  })
})
