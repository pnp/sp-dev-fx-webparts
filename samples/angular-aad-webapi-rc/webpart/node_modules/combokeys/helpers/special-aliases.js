/* eslint-env node, browser */
'use strict'
/**
 * this is a list of special strings you can use to map
 * to modifier keys when you specify your keyboard shortcuts
 *
 * @type {Object}
 */
module.exports = {
  'option': 'alt',
  'command': 'meta',
  'return': 'enter',
  'escape': 'esc',
  'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
}
