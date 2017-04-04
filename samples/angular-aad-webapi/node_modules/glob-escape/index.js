var util = require('util');

function escapeGlobStringOrArray(escapeFn) {
  return function(glob) {
    if (typeof glob === 'string') {
      return escapeFn(glob);
    }
    if (Array.isArray(glob)) {
      return glob.map(escapeFn);
    }
    throw new Error('glob pattern needs to be a string or array');
  };
}

function escapeGlob(glob) {
  return glob
    .replace(/\\/g, '\\\\')
    .replace(/\*/g, '\\*')
    .replace(/\?/g, '\\?')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\)/g, '\\)')
    .replace(/\(/g, '\\(')
    .replace(/\!/g, '\\!');
}

module.exports = escapeGlobStringOrArray(escapeGlob);
