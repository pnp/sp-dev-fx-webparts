/* global it, afterEach, beforeEach, describe, Promise */

var assert = require('assert')
var gutil = require('gulp-util')
var sourceMaps = require('gulp-sourcemaps')
var postcss = require('./index')
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var path = require('path')

it('should pass file when it isNull()', function (cb) {
  var stream = postcss([ doubler ])
  var emptyFile = {
    isNull: function () { return true }
  }

  stream.once('data', function (data) {
    assert.equal(data, emptyFile)
    cb()
  })

  stream.write(emptyFile)

  stream.end()
})

it('should transform css with multiple processors', function (cb) {

  var stream = postcss(
    [ asyncDoubler, objectDoubler() ]
  )

  stream.on('data', function (file) {
    var result = file.contents.toString('utf8')
    var target = 'a { color: black; color: black; color: black; color: black }'
    assert.equal( result, target )
    cb()
  })

  stream.write(new gutil.File({
    contents: new Buffer('a { color: black }')
  }))

  stream.end()

})


it('should correctly wrap postcss errors', function (cb) {

  var stream = postcss([ doubler ])

  stream.on('error', function (err) {
    assert.ok(err instanceof gutil.PluginError)
    assert.equal(err.plugin, 'gulp-postcss')
    assert.equal(err.showStack, false)
    assert.equal(err.fileName, 'testpath')
    cb()
  })

  stream.write(new gutil.File({
    contents: new Buffer('a {'),
    path: 'testpath'
  }))

  stream.end()

})

it('should respond with error on stream files', function (cb) {

  var stream = postcss([ doubler ])

  stream.on('error', function (err) {
    assert.ok(err instanceof gutil.PluginError)
    assert.equal(err.plugin, 'gulp-postcss')
    assert.equal(err.showStack, true)
    assert.equal(err.fileName, 'testpath')
    cb()
  })

  var streamFile = {
    isStream: function () { return true },
    isNull: function() { return false },
    path: 'testpath'
  };

  stream.write(streamFile)

  stream.end()

})

it('should generate source maps', function (cb) {

  var init = sourceMaps.init()
  var write = sourceMaps.write()
  var css = postcss(
    [ doubler, asyncDoubler ]
  )

  init
    .pipe(css)
    .pipe(write)

  write.on('data', function (file) {
    assert.equal(file.sourceMap.mappings, 'AAAA,IAAI,aAAY,CAAZ,aAAY,CAAZ,aAAY,CAAZ,YAAY,EAAE')
    assert(/sourceMappingURL=data:application\/json;(?:charset=\w+;)?base64/.test(file.contents.toString()))
    cb()
  })

  init.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/fixture.css',
    contents: new Buffer('a { color: black }')
  }))

  init.end()

})


it('should correctly generate relative source map', function (cb) {

  var init = sourceMaps.init()
  var css = postcss(
    [ doubler, doubler ]
  )

  init.pipe(css)

  css.on('data', function (file) {
    assert.equal(file.sourceMap.file, 'fixture.css')
    assert.deepEqual(file.sourceMap.sources, ['fixture.css'])
    cb()
  })

  init.write(new gutil.File({
    base: __dirname + '/src',
    path: __dirname + '/src/fixture.css',
    contents: new Buffer('a { color: black }')
  }))

  init.end()

})


describe('PostCSS Guidelines', function () {

  var sandbox = sinon.sandbox.create()
  var CssSyntaxError = function (message, sourceCode) {
    this.name = 'CssSyntaxError'
    this.message = message
    this.sourceCode = sourceCode
    this.showSourceCode = function () {
      return this.sourceCode
    }
  }
  var postcssStub = {
    use: function () {}
  , process: function () {}
  }
  var postcssLoadConfigStub
  var postcss = proxyquire('./index', {
    postcss: function (plugins) {
      postcssStub.use(plugins)
      return postcssStub
    }
  , 'postcss-load-config': function (ctx, configPath) {
      return postcssLoadConfigStub(ctx, configPath)
    }
  , 'vinyl-sourcemaps-apply': function () {
      return {}
    }
  })

  beforeEach(function () {
    postcssLoadConfigStub = sandbox.stub()
    sandbox.stub(postcssStub, 'use')
    sandbox.stub(postcssStub, 'process')
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should set `from` and `to` processing options to `file.path`', function (cb) {

    var stream = postcss([ doubler ])
    var cssPath = __dirname + '/src/fixture.css'
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))

    stream.on('data', function () {
      assert.equal(postcssStub.process.getCall(0).args[1].to, cssPath)
      assert.equal(postcssStub.process.getCall(0).args[1].from, cssPath)
      cb()
    })

    stream.write(new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    }))

    stream.end()

  })

  it('should allow override of `to` processing option', function (cb) {

    var stream = postcss([ doubler ], {to: 'overriden'})
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))

    stream.on('data', function () {
      assert.equal(postcssStub.process.getCall(0).args[1].to, 'overriden')
      cb()
    })

    stream.write(new gutil.File({
      contents: new Buffer('a {}')
    }))

    stream.end()

  })

  it('should take plugins and options from callback', function (cb) {

    var cssPath = __dirname + '/fixture.css'
    var file = new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    })
    var plugins = [ doubler ]
    var callback = sandbox.stub().returns({
      plugins: plugins
    , options: { to: 'overriden' }
    })
    var stream = postcss(callback)

    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))

    stream.on('data', function () {
      assert.equal(callback.getCall(0).args[0], file)
      assert.equal(postcssStub.use.getCall(0).args[0], plugins)
      assert.equal(postcssStub.process.getCall(0).args[1].to, 'overriden')
      cb()
    })

    stream.end(file)

  })

  it('should take plugins and options from postcss-load-config', function (cb) {

    var cssPath = __dirname + '/fixture.css'
    var file = new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    })
    var stream = postcss({ to: 'initial' })
    var plugins = [ doubler ]

    postcssLoadConfigStub.returns(Promise.resolve({
      plugins: plugins
    , options: { to: 'overriden' }
    }))

    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))

    stream.on('data', function () {
      assert.deepEqual(postcssLoadConfigStub.getCall(0).args[0], {
        file: file
      , options: { to: 'initial' }
      })
      assert.equal(postcssStub.use.getCall(0).args[0], plugins)
      assert.equal(postcssStub.process.getCall(0).args[1].to, 'overriden')
      cb()
    })

    stream.end(file)

  })

  it('should point the config location to file directory', function (cb) {
    var cssPath = __dirname + '/fixture.css'
    var stream = postcss()
    postcssLoadConfigStub.returns(Promise.resolve({ plugins: [] }))
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))
    stream.on('data', function () {
      assert.deepEqual(postcssLoadConfigStub.getCall(0).args[1], __dirname)
      cb()
    })
    stream.end(new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    }))
  })

  it('should set the config location from option', function (cb) {
    var cssPath = __dirname + '/fixture.css'
    var stream = postcss({ config: '/absolute/path' })
    postcssLoadConfigStub.returns(Promise.resolve({ plugins: [] }))
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))
    stream.on('data', function () {
      assert.deepEqual(postcssLoadConfigStub.getCall(0).args[1], '/absolute/path')
      cb()
    })
    stream.end(new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    }))
  })

  it('should set the config location from option relative to the base dir', function (cb) {
    var cssPath = __dirname + '/src/fixture.css'
    var stream = postcss({ config: './relative/path' })
    postcssLoadConfigStub.returns(Promise.resolve({ plugins: [] }))
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))
    stream.on('data', function () {
      assert.deepEqual(postcssLoadConfigStub.getCall(0).args[1], __dirname + '/relative/path')
      cb()
    })
    stream.end(new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    , base: __dirname
    }))
  })

  it('should not override `from` and `map` if using gulp-sourcemaps', function (cb) {
    var stream = postcss([ doubler ], { from: 'overriden', map: 'overriden' })
    var cssPath = __dirname + '/fixture.css'
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    , map: {
        toJSON: function () {
          return {
            sources: [],
            file: ''
          }
        }
      }
    }))

    sandbox.stub(gutil, 'log')

    stream.on('data', function () {
      assert.deepEqual(postcssStub.process.getCall(0).args[1].from, cssPath)
      assert.deepEqual(postcssStub.process.getCall(0).args[1].map, { annotation: false })
      var firstMessage = gutil.log.getCall(0).args[1]
      var secondMessage = gutil.log.getCall(1).args[1]
      assert(firstMessage, '/fixture.css\nCannot override from option, because it is required by gulp-sourcemaps')
      assert(secondMessage, '/fixture.css\nCannot override map option, because it is required by gulp-sourcemaps')
      cb()
    })

    var file = new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    })
    file.sourceMap = {}
    stream.end(file)
  })

  it('should not output js stack trace for `CssSyntaxError`', function (cb) {

    var stream = postcss([ doubler ])
    var cssSyntaxError = new CssSyntaxError('message', 'sourceCode')
    postcssStub.process.returns(Promise.reject(cssSyntaxError))

    stream.on('error', function (error) {
      assert.equal(error.showStack, false)
      assert.equal(error.message, 'message' + '\n\nsourceCode\n')
      cb()
    })

    stream.write(new gutil.File({
      contents: new Buffer('a {}')
    }))

    stream.end()

  })


  it('should display `result.warnings()` content', function (cb) {

    var stream = postcss([ doubler ])
    var cssPath = __dirname + '/src/fixture.css'
    function Warning (msg) {
      this.toString = function () {
        return msg
      }
    }

    sandbox.stub(gutil, 'log')
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return [new Warning('msg1'), new Warning('msg2')]
      }
    }))

    stream.on('data', function () {
      assert(gutil.log.calledWith('gulp-postcss:', 'src' +  path.sep + 'fixture.css\nmsg1\nmsg2'))
      cb()
    })

    stream.write(new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    }))

    stream.end()

  })

  it('should pass options down to PostCSS', function (cb) {

    var customSyntax = function () {}
    var options = {
      syntax: customSyntax
    }

    var stream = postcss([ doubler ], options)
    var cssPath = __dirname + '/src/fixture.css'
    postcssStub.process.returns(Promise.resolve({
      css: ''
    , warnings: function () {
        return []
      }
    }))

    stream.on('data', function () {
      var resultOptions = postcssStub.process.getCall(0).args[1]
      // remove automatically set options
      delete resultOptions.from
      delete resultOptions.to
      delete resultOptions.map
      assert.deepEqual(resultOptions, options)
      cb()
    })

    stream.write(new gutil.File({
      contents: new Buffer('a {}')
    , path: cssPath
    }))

    stream.end()

  })

})


function doubler (css) {
  css.walkDecls(function (decl) {
    decl.parent.prepend(decl.clone())
  })
}

function asyncDoubler (css) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      doubler(css)
      resolve()
    })
  })
}

function objectDoubler () {
  var processor = require('postcss')()
  processor.use(doubler)
  return processor
}
