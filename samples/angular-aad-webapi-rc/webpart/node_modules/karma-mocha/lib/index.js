var path = require('path')

var createPattern = function (path) {
  return {pattern: path, included: true, served: true, watched: false}
}

var initMocha = function (files, mochaConfig) {
  var mochaPath = path.dirname(require.resolve('mocha'))
  files.unshift(createPattern(path.join(__dirname, 'adapter.js')))
  files.unshift(createPattern(path.join(mochaPath, 'mocha.js')))

  if (mochaConfig && mochaConfig.reporter) {
    files.unshift(createPattern(path.join(mochaPath, 'mocha.css')))
  }
}

initMocha.$inject = ['config.files', 'config.client.mocha']

module.exports = {
  'framework:mocha': ['factory', initMocha]
}
