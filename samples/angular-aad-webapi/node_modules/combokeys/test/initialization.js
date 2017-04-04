/* eslint-env mocha */
var Combokeys = require('..')
var assert = require('proclaim')
var makeElement = require('./helpers/make-element')

describe('initialization', function () {
  it('initializes on the document', function () {
    var combokeys = new Combokeys(document.documentElement)
    assert.instanceOf(combokeys, Combokeys)
    assert.strictEqual(combokeys.element, document.documentElement)
    combokeys.detach()
  })
  it('can initialize multipe instances', function () {
    var first = makeElement()
    var second = makeElement()

    var firstCombokeys = new Combokeys(first)
    var secondCombokeys = new Combokeys(second)

    assert.instanceOf(secondCombokeys, Combokeys)
    assert.notEqual(firstCombokeys, secondCombokeys)
    assert.strictEqual(firstCombokeys.element, first)
    assert.strictEqual(secondCombokeys.element, second)
  })
})
