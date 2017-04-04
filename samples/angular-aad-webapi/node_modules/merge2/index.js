'use strict'
/*
 * merge2
 * https://github.com/teambition/merge2
 *
 * Copyright (c) 2014-2016 Teambition
 * Licensed under the MIT license.
 */
var Stream = require('stream')
var PassThrough = Stream.PassThrough
var slice = Array.prototype.slice

module.exports = function merge2 () {
  var streamsQueue = []
  var merging = false
  var args = slice.call(arguments)
  var options = args[args.length - 1]

  if (options && !Array.isArray(options) && options.pipe == null) args.pop()
  else options = {}

  var doEnd = options.end !== false
  if (options.objectMode == null) options.objectMode = true
  if (options.highWaterMark == null) options.highWaterMark = 64 * 1024
  var mergedStream = PassThrough(options)

  function addStream () {
    for (var i = 0, len = arguments.length; i < len; i++) {
      streamsQueue.push(pauseStreams(arguments[i], options))
    }
    mergeStream()
    return this
  }

  function mergeStream () {
    if (merging) return
    merging = true

    var streams = streamsQueue.shift()
    if (!streams) return endStream()
    if (!Array.isArray(streams)) streams = [streams]

    var pipesCount = streams.length + 1

    function next () {
      if (--pipesCount > 0) return
      merging = false
      mergeStream()
    }

    function pipe (stream) {
      function onend () {
        stream.removeListener('merge2UnpipeEnd', onend)
        stream.removeListener('finish', onend)
        stream.removeListener('end', onend)
        next()
      }
      // skip ended stream
      if (stream._readableState.endEmitted) return next()

      stream.on('merge2UnpipeEnd', onend)
      stream.on('finish', onend)
      stream.on('end', onend)
      stream.pipe(mergedStream, {end: false})
      // compatible for old stream
      stream.resume()
    }

    for (var i = 0; i < streams.length; i++) pipe(streams[i])

    next()
  }

  function endStream () {
    merging = false
    // emit 'queueDrain' when all streams merged.
    mergedStream.emit('queueDrain')
    return doEnd && mergedStream.end()
  }

  mergedStream.setMaxListeners(0)
  mergedStream.add = addStream
  mergedStream.on('unpipe', function (stream) {
    stream.emit('merge2UnpipeEnd')
  })

  if (args.length) addStream.apply(null, args)
  return mergedStream
}

// check and pause streams for pipe.
function pauseStreams (streams, options) {
  if (!Array.isArray(streams)) {
    // Backwards-compat with old-style streams
    if (!streams._readableState && streams.pipe) streams = streams.pipe(PassThrough(options))
    if (!streams._readableState || !streams.pause || !streams.pipe) {
      throw new Error('Only readable stream can be merged.')
    }
    streams.pause()
  } else {
    for (var i = 0, len = streams.length; i < len; i++) streams[i] = pauseStreams(streams[i], options)
  }
  return streams
}
