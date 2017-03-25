/* eslint-env node, browser */
'use strict'

/**
 * Converts from a string key combination to an array
 *
 * @param  {string} combination like "command+shift+l"
 * @return {Array}
 */
module.exports = function (combination) {
  if (combination === '+') {
    return ['+']
  }

  return combination.split('+')
}
