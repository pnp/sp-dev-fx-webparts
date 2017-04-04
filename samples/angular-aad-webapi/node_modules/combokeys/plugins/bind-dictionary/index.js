/* eslint-env node, browser */
'use strict'
/**
 * Overwrites default Combokeys.bind method to optionally accept
 * an object to bind multiple key events in a single call
 *
 * You can pass it in like:
 *
 * Combokeys.bind({
 *     'a': function() { console.log('a'); },
 *     'b': function() { console.log('b'); }
 * })
 *
 * And can optionally pass in 'keypress', 'keydown', or 'keyup'
 * as a second argument
 *
 */
module.exports = function (Combokeys) {
  var oldBind = Combokeys.bind
  var args

  Combokeys.bind = function () {
    args = arguments

    // normal call
    if (typeof args[0] === 'string' || args[0] instanceof Array) {
      return oldBind.call(this, args[0], args[1], args[2])
    }

    // object passed in
    for (var key in args[0]) {
      if (args[0].hasOwnProperty(key)) {
        oldBind.call(this, key, args[0][key], args[1])
      }
    }
  }

  return Combokeys
}
