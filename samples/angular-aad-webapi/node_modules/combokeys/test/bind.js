/* eslint-env mocha, browser */
var Combokeys = require('..')
var assert = require('proclaim')
var makeElement = require('./helpers/make-element')
var sinon = require('sinon')
var KeyEvent = require('./lib/key-event')

describe('combokeys.bind', function () {
  it('should work', function () {
    var combokeys = new Combokeys(document.documentElement)
    var spy = sinon.spy()
    combokeys.bind('z', spy)
    KeyEvent.simulate('Z'.charCodeAt(0), 90, null, document.documentElement)
    assert.strictEqual(spy.callCount, 1)
    combokeys.detach()
  })
  describe('basic', function () {
    it('z key fires when pressing z', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('z', spy)

      KeyEvent.simulate('Z'.charCodeAt(0), 90, null, element)

      // really slow for some reason
      // assert(spy).to.have.been.calledOnce
      assert.strictEqual(spy.callCount, 1, 'callback should fire once')
      assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
      assert.strictEqual(spy.args[0][1], 'z', 'second argument should be key combo')
    })

    it('z key fires from keydown', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('z', spy, 'keydown')

      KeyEvent.simulate('Z'.charCodeAt(0), 90, null, element)

      // really slow for some reason
      // assert(spy).to.have.been.calledOnce
      assert.strictEqual(spy.callCount, 1, 'callback should fire once')
      assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
      assert.strictEqual(spy.args[0][1], 'z', 'second argument should be key combo')
    })

    it('z key does not fire when pressing b', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('z', spy)

      KeyEvent.simulate('B'.charCodeAt(0), 66, null, element)

      assert.strictEqual(spy.callCount, 0)
    })

    it('z key does not fire when holding a modifier key', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var modifiers = ['ctrl', 'alt', 'meta', 'shift']
      var charCode
      var modifier

      var combokeys = new Combokeys(element)
      combokeys.bind('z', spy)

      for (var i = 0; i < 4; i++) {
        modifier = modifiers[i]
        charCode = 'Z'.charCodeAt(0)

        // character code is different when alt is pressed
        if (modifier === 'alt') {
          charCode = 'Ω'.charCodeAt(0)
        }

        spy.reset()

        KeyEvent.simulate(charCode, 90, [modifier], element)

        assert.strictEqual(spy.callCount, 0)
      }
    })

    it('keyup events should fire', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('z', spy, 'keyup')

      KeyEvent.simulate('Z'.charCodeAt(0), 90, null, element)

      assert.strictEqual(spy.callCount, 1, 'keyup event for `z` should fire')

      // for key held down we should only get one key up
      KeyEvent.simulate('Z'.charCodeAt(0), 90, [], element, 10)
      assert.strictEqual(spy.callCount, 2, 'keyup event for `z` should fire once for held down key')
    })

    it('keyup event for 0 should fire', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('0', spy, 'keyup')

      KeyEvent.simulate(0, 48, null, element)

      assert.strictEqual(spy.callCount, 1, 'keyup event for `0` should fire')
    })

    it('rebinding a key overwrites the callback for that key', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('x', spy1)
      combokeys.bind('x', spy2)

      KeyEvent.simulate('X'.charCodeAt(0), 88, null, element)

      assert.strictEqual(spy1.callCount, 0, 'original callback should not fire')
      assert.strictEqual(spy2.callCount, 1, 'new callback should fire')
    })

    it('binding of `any-character` works', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('any-character', spy)

      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('B'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('C'.charCodeAt(0), 67, null, element)
      assert.strictEqual(spy.callCount, 3, 'gets called on any character')
    })

    it('binding an array of keys', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind(['a', 'b', 'c'], spy)

      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      assert.strictEqual(spy.callCount, 1, 'new callback was called')
      assert.strictEqual(spy.args[0][1], 'a', 'callback should match `a`')

      KeyEvent.simulate('B'.charCodeAt(0), 66, null, element)
      assert.strictEqual(spy.callCount, 2, 'new callback was called twice')
      assert.strictEqual(spy.args[1][1], 'b', 'callback should match `b`')

      KeyEvent.simulate('C'.charCodeAt(0), 67, null, element)
      assert.strictEqual(spy.callCount, 3, 'new callback was called three times')
      assert.strictEqual(spy.args[2][1], 'c', 'callback should match `c`')
    })

    it('return false should prevent default and stop propagation', function () {
      var element = makeElement()
      var spy = sinon.spy(function () {
        return false
      })

      var combokeys = new Combokeys(element)
      combokeys.bind('command+s', spy)

      if (Event.prototype.preventDefault) {
        var preventDefaultSpy = sinon.spy(Event.prototype, 'preventDefault')
      }
      if (Event.prototype.stopPropagation) {
        var stopPropagationSpy = sinon.spy(Event.prototype, 'stopPropagation')
      }
      KeyEvent.simulate('S'.charCodeAt(0), 83, ['meta'], element)

      assert.strictEqual(spy.callCount, 1, 'callback should fire')
      assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
      var event = spy.args[0][0]
      if (event.preventDefault) {
        assert.isTrue(preventDefaultSpy.calledOnce, 'default action was cancelled')
      } else {
        assert.isFalse(event.returnValue, 'default is prevented')
      }
      if (event.stopPropagation) {
        assert.isTrue(stopPropagationSpy.calledOnce, 'propagation was cancelled')
      } else {
        assert.isTrue(event.cancelBubble, 'propagation is cancelled')
      }

      // try without return false
      spy = sinon.spy()
      combokeys.bind('command+s', spy)
      KeyEvent.simulate('S'.charCodeAt(0), 83, ['meta'], element)

      assert.strictEqual(spy.callCount, 1, 'callback should fire')
      assert.instanceOf(spy.args[0][0], Event, 'first argument should be Event')
      event = spy.args[0][0]
      if (event.preventDefault) {
        assert.isTrue(preventDefaultSpy.calledOnce, 'default action was not cancelled')
      } else {
        assert.isTrue(event.returnValue !== false, 'default is not prevented')
      }
      if (event.stopPropagation) {
        assert.isTrue(stopPropagationSpy.calledOnce, 'propagation was not cancelled')
      } else {
        assert.isFalse(event.cancelBubble, 'propagation is not cancelled')
      }
      if (preventDefaultSpy) preventDefaultSpy.restore()
      if (stopPropagationSpy) stopPropagationSpy.restore()
    })

    it('capslock key is ignored', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('a', spy)

      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      assert.strictEqual(spy.callCount, 1, 'callback should fire for lowercase a')

      spy.reset()
      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      assert.strictEqual(spy.callCount, 1, 'callback should fire for capslock A')

      spy.reset()
      KeyEvent.simulate('A'.charCodeAt(0), 65, ['shift'], element)
      assert.strictEqual(spy.callCount, 0, 'callback should not fire fort shift+a')
    })
  })

  describe('special characters', function () {
    it('binding special characters', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('*', spy)

      KeyEvent.simulate('*'.charCodeAt(0), 56, ['shift'], element)

      assert.strictEqual(spy.callCount, 1, 'callback should fire')
      assert.strictEqual(spy.args[0][1], '*', 'callback should match *')
    })

    it('binding special characters keyup', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('*', spy, 'keyup')

      KeyEvent.simulate('*'.charCodeAt(0), 56, ['shift'], element)

      assert.strictEqual(spy.callCount, 1, 'callback should fire')
      assert.strictEqual(spy.args[0][1], '*', 'callback should match *')
    })

    it('binding keys with no associated charCode', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('left', spy)

      KeyEvent.simulate(0, 37, null, element)

      assert.strictEqual(spy.callCount, 1, 'callback should fire')
      assert.strictEqual(spy.args[0][1], 'left', 'callback should match `left`')
    })

    it('able to bind plus and minus', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('ctrl+minus', spy1)
      combokeys.bind('ctrl+plus', spy2)

      KeyEvent.simulate('-'.charCodeAt(0), 189, ['ctrl'], element)
      assert.strictEqual(spy1.callCount, 1, '`ctrl+minus` should fire')

      KeyEvent.simulate('+'.charCodeAt(0), 187, ['ctrl'], element)
      assert.strictEqual(spy2.callCount, 1, '`ctrl+plus` should fire')
    })
  })

  describe('combos with modifiers', function () {
    it('binding key combinations', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('command+o', spy)

      KeyEvent.simulate('O'.charCodeAt(0), 79, ['meta'], element)

      assert.strictEqual(spy.callCount, 1, 'command+o callback should fire')
      assert.strictEqual(spy.args[0][1], 'command+o', 'keyboard string returned is correct')
    })

    it('binding key combos with multiple modifiers', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('command+shift+o', spy)
      KeyEvent.simulate('O'.charCodeAt(0), 79, ['meta'], element)
      assert.strictEqual(spy.callCount, 0, 'command+o callback should not fire')

      KeyEvent.simulate('O'.charCodeAt(0), 79, ['meta', 'shift'], element)
      assert.strictEqual(spy.callCount, 1, 'command+o callback should fire')
    })
  })

  describe('sequences', function () {
    it('binding sequences', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('g i', spy)

      KeyEvent.simulate('G'.charCodeAt(0), 71, null, element)
      assert.strictEqual(spy.callCount, 0, 'callback should not fire')

      KeyEvent.simulate('I'.charCodeAt(0), 73, null, element)
      assert.strictEqual(spy.callCount, 1, 'callback should fire')
    })

    it('binding sequences with mixed types', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('g o enter', spy)

      KeyEvent.simulate('G'.charCodeAt(0), 71, null, element)
      assert.strictEqual(spy.callCount, 0, 'callback should not fire')

      KeyEvent.simulate('O'.charCodeAt(0), 79, null, element)
      assert.strictEqual(spy.callCount, 0, 'callback should not fire')

      KeyEvent.simulate(0, 13, null, element)
      assert.strictEqual(spy.callCount, 1, 'callback should fire')
    })

    it('binding sequences starting with modifier keys', function () {
      var element = makeElement()
      var spy = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('option enter', spy)
      KeyEvent.simulate(0, 18, ['alt'], element)
      KeyEvent.simulate(0, 13, null, element)
      assert.strictEqual(spy.callCount, 1, 'callback should fire')

      spy = sinon.spy()
      combokeys.bind('command enter', spy)
      KeyEvent.simulate(0, 91, ['meta'], element)
      KeyEvent.simulate(0, 13, null, element)
      assert.strictEqual(spy.callCount, 1, 'callback should fire')

      spy = sinon.spy()
      combokeys.bind('escape enter', spy)
      KeyEvent.simulate(0, 27, null, element)
      KeyEvent.simulate(0, 13, null, element)
      assert.strictEqual(spy.callCount, 1, 'callback should fire')
    })

    it('key within sequence should not fire', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('a', spy1)
      combokeys.bind('c a t', spy2)

      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      assert.strictEqual(spy1.callCount, 1, 'callback 1 should fire')
      spy1.reset()

      KeyEvent.simulate('C'.charCodeAt(0), 67, null, element)
      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('T'.charCodeAt(0), 84, null, element)
      assert.strictEqual(spy1.callCount, 0, 'callback for `a` key should not fire')
      assert.strictEqual(spy2.callCount, 1, 'callback for `c a t` sequence should fire')
    })

    it('keyup at end of sequence should not fire', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('t', spy1, 'keyup')
      combokeys.bind('b a t', spy2)

      KeyEvent.simulate('B'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('T'.charCodeAt(0), 84, null, element)

      assert.strictEqual(spy1.callCount, 0, 'callback for `t` keyup should not fire')
      assert.strictEqual(spy2.callCount, 1, 'callback for `b a t` sequence should fire')
    })

    it('keyup sequences should work', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var combokeys = new Combokeys(element)
      combokeys.bind('b a t', spy, 'keyup')

      KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)

      // hold the last key down for a while
      KeyEvent.simulate('t'.charCodeAt(0), 84, [], element, 10)

      assert.strictEqual(spy.callCount, 1, 'callback for `b a t` sequence should fire on keyup')
    })

    it('extra spaces in sequences should be ignored', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var combokeys = new Combokeys(element)
      combokeys.bind('b   a  t', spy)

      KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('t'.charCodeAt(0), 84, null, element)

      assert.strictEqual(spy.callCount, 1, 'callback for `b a t` sequence should fire')
    })

    it('modifiers and sequences play nicely', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('ctrl a', spy1)
      combokeys.bind('ctrl+b', spy2)

      KeyEvent.simulate(0, 17, ['ctrl'], element)
      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      assert.strictEqual(spy1.callCount, 1, '`ctrl a` should fire')

      KeyEvent.simulate('B'.charCodeAt(0), 66, ['ctrl'], element)
      assert.strictEqual(spy2.callCount, 1, '`ctrl+b` should fire')
    })

    it('sequences that start the same work', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('g g l', spy2)
      combokeys.bind('g g o', spy1)

      KeyEvent.simulate('g'.charCodeAt(0), 71, null, element)
      KeyEvent.simulate('g'.charCodeAt(0), 71, null, element)
      KeyEvent.simulate('o'.charCodeAt(0), 79, null, element)
      assert.strictEqual(spy1.callCount, 1, '`g g o` should fire')
      assert.strictEqual(spy2.callCount, 0, '`g g l` should not fire')

      spy1.reset()
      spy2.reset()
      KeyEvent.simulate('g'.charCodeAt(0), 71, null, element)
      KeyEvent.simulate('g'.charCodeAt(0), 71, null, element)
      KeyEvent.simulate('l'.charCodeAt(0), 76, null, element)
      assert.strictEqual(spy1.callCount, 0, '`g g o` should not fire')
      assert.strictEqual(spy2.callCount, 1, '`g g l` should fire')
    })

    it('sequences should not fire subsequences', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()

      var combokeys = new Combokeys(element)
      combokeys.bind('a b c', spy1)
      combokeys.bind('b c', spy2)

      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('B'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('C'.charCodeAt(0), 67, null, element)

      assert.strictEqual(spy1.callCount, 1, '`a b c` should fire')
      assert.strictEqual(spy2.callCount, 0, '`b c` should not fire')

      spy1.reset()
      spy2.reset()
      combokeys.bind('option b', spy1)
      combokeys.bind('a option b', spy2)

      KeyEvent.simulate('A'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate(0, 18, ['alt'], element)
      KeyEvent.simulate('B'.charCodeAt(0), 66, null, element)

      assert.strictEqual(spy1.callCount, 0, '`option b` should not fire')
      assert.strictEqual(spy2.callCount, 1, '`a option b` should fire')
    })

    it('rebinding same sequence should override previous', function () {
      var element = makeElement()
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()
      var combokeys = new Combokeys(element)
      combokeys.bind('a b c', spy1)
      combokeys.bind('a b c', spy2)

      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('c'.charCodeAt(0), 67, null, element)

      assert.strictEqual(spy1.callCount, 0, 'first callback should not fire')
      assert.strictEqual(spy2.callCount, 1, 'second callback should fire')
    })

    it('broken sequences', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var combokeys = new Combokeys(element)
      combokeys.bind('h a t', spy)

      KeyEvent.simulate('h'.charCodeAt(0), 72, null, element)
      KeyEvent.simulate('e'.charCodeAt(0), 69, null, element)
      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('r'.charCodeAt(0), 82, null, element)
      KeyEvent.simulate('t'.charCodeAt(0), 84, null, element)

      assert.strictEqual(spy.callCount, 0, 'sequence for `h a t` should not fire for `h e a r t`')
    })

    it('sequences containing combos should work', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var combokeys = new Combokeys(element)
      combokeys.bind('a ctrl+b', spy)

      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate('B'.charCodeAt(0), 66, ['ctrl'], element)

      assert.strictEqual(spy.callCount, 1, '`a ctrl+b` should fire')

      combokeys.unbind('a ctrl+b')

      spy = sinon.spy()
      combokeys.bind('ctrl+b a', spy)

      KeyEvent.simulate('b'.charCodeAt(0), 66, ['ctrl'], element)
      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)

      assert.strictEqual(spy.callCount, 1, '`ctrl+b a` should fire')
    })

    it('sequences starting with spacebar should work', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var combokeys = new Combokeys(element)
      combokeys.bind('a space b c', spy)

      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate(32, 32, null, element)
      KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('c'.charCodeAt(0), 67, null, element)

      assert.strictEqual(spy.callCount, 1, '`a space b c` should fire')
    })

    it('konami code', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var combokeys = new Combokeys(element)
      combokeys.bind('up up down down left right left right b a enter', spy)

      KeyEvent.simulate(0, 38, null, element)
      KeyEvent.simulate(0, 38, null, element)
      KeyEvent.simulate(0, 40, null, element)
      KeyEvent.simulate(0, 40, null, element)
      KeyEvent.simulate(0, 37, null, element)
      KeyEvent.simulate(0, 39, null, element)
      KeyEvent.simulate(0, 37, null, element)
      KeyEvent.simulate(0, 39, null, element)
      KeyEvent.simulate('b'.charCodeAt(0), 66, null, element)
      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      KeyEvent.simulate(0, 13, null, element)

      assert.strictEqual(spy.callCount, 1, 'konami code should fire')
    })

    it('sequence timer resets', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var clock = sinon.useFakeTimers()

      var combokeys = new Combokeys(element)
      combokeys.bind('h a t', spy)

      KeyEvent.simulate('h'.charCodeAt(0), 72, null, element)
      clock.tick(600)
      KeyEvent.simulate('a'.charCodeAt(0), 65, null, element)
      clock.tick(900)
      KeyEvent.simulate('t'.charCodeAt(0), 84, null, element)

      assert.strictEqual(spy.callCount, 1, 'sequence should fire after waiting')
      clock.restore()
    })

    it('sequences timeout', function () {
      var element = makeElement()
      var spy = sinon.spy()
      var clock = sinon.useFakeTimers()

      var combokeys = new Combokeys(element)
      combokeys.bind('g t', spy)
      KeyEvent.simulate('g'.charCodeAt(0), 71, null, element)
      clock.tick(1000)
      KeyEvent.simulate('t'.charCodeAt(0), 84, null, element)

      assert.strictEqual(spy.callCount, 0, 'sequence callback should not fire')
      clock.restore()
    })
  })

  describe('default actions', function () {
    var keys = {
      keypress: [
        ['a', 65],
        ['A', 65, ['shift']],
        ['7', 55],
        ['?', 191],
        ['*', 56],
        ['+', 187],
        ['$', 52],
        ['[', 219],
        ['.', 190]
      ],
      keydown: [
        ["shift+'", 222, ['shift']],
        ['shift+a', 65, ['shift']],
        ['shift+5', 53, ['shift']],
        ['command+shift+p', 80, ['meta', 'shift']],
        ['space', 32],
        ['left', 37]
      ]
    }

    function getCallback (key, keyCode, type, modifiers) {
      return function () {
        var element = makeElement()
        var spy = sinon.spy()

        var combokeys = new Combokeys(element)
        combokeys.bind(key, spy)

        KeyEvent.simulate(key.charCodeAt(0), keyCode, modifiers, element)
        assert.strictEqual(spy.callCount, 1)
        assert.strictEqual(spy.args[0][0].type, type)
      }
    }

    for (var type in keys) {
      for (var i = 0; i < keys[type].length; i++) {
        var key = keys[type][i][0]
        var keyCode = keys[type][i][1]
        var modifiers = keys[type][i][2] || []
        it('"' + key + '" uses "' + type + '"', getCallback(key, keyCode, type, modifiers))
      }
    }
  })
})
