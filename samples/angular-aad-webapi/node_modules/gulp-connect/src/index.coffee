path = require("path")
es = require("event-stream")
util = require("gulp-util")
http = require("http")
https = require("https")
fs = require("fs")
connect = require("connect")
liveReload = require("connect-livereload")
tiny_lr = require("tiny-lr")
apps = []

http2 = undefined
try
  http2 = require('http2')

class ConnectApp
  constructor: (options) ->
    @name = options.name || "Server"
    @port = options.port || "8080"
    @root = options.root || path.dirname(module.parent.id)
    @host = options.host || "localhost"
    @debug = options.debug || false
    @silent = options.silent || false
    @https = options.https || false
    @livereload = options.livereload || false
    @middleware = options.middleware || undefined
    @serverInit = options.serverInit || undefined
    @fallback = options.fallback || undefined
    @index =  options.index
    @oldMethod("open") if options.open
    @sockets = []
    @app = undefined
    @lr = undefined
    @run()

  run: ->
    @app = connect()

    @handlers().forEach (middleware) =>
      if typeof (middleware) is "object"
        @app.use middleware[0], middleware[1]
      else
        @app.use middleware

    @app.use connect.directory(if typeof @root == "object" then @root[0] else @root)

    if @https

      # use some defaults when not set. do not touch when a key is already specified
      # see https://github.com/AveVlad/gulp-connect/issues/172
      if typeof (@https) is 'boolean' || !@https.key

        # change it into an object if it is not already one
        if !(typeof (@https) is "object")
          @https = {}

        @https.key        = fs.readFileSync __dirname + '/certs/server.key'
        @https.cert       = fs.readFileSync __dirname + '/certs/server.crt'
        @https.ca         = fs.readFileSync __dirname + '/certs/server.crt'
        @https.passphrase = 'gulp'

      @server = (http2 || https).createServer(@https, @app)
    else
      @server = http.createServer @app
    if @serverInit
      @serverInit @server
    @server.listen @port, (err) =>
      if err
        @log "Error on starting server: #{err}"
      else
        @log "#{@name} started http#{if @https then 's' else ''}://#{@host}:#{@port}"

        stoped = false
        sockets = []

        @server.on "close", =>
          if (!stoped)
            stoped = true
            @log "#{@name} stopped"

        # Log connections and request in debug
        @server.on "connection", (socket) =>
          @logDebug "Received incoming connection from #{socket.address().address}"
          @sockets.push socket
          socket.on "close", =>
           @sockets.splice @sockets.indexOf(socket), 1

        @server.on "request", (request, response) =>
          @logDebug "Received request #{request.method} #{request.url}"

        @server.on "error", (err) =>
          @log err.toString()

        stopServer = =>
          if (!stoped)
            @sockets.forEach (socket) =>
              socket.destroy()

            @server.close()
            process.nextTick( ->
              process.exit(0)
            )

        process.on("SIGINT", stopServer)
        process.on("exit", stopServer)

        if @livereload
          tiny_lr.Server::error = ->
          if @https
            @lr = tiny_lr
              key: @https.key || fs.readFileSync __dirname + '/certs/server.key'
              cert: @https.cert || fs.readFileSync __dirname + '/certs/server.crt'
          else
            @lr = tiny_lr()

          @lr.listen @livereload.port
          @log "LiveReload started on port #{@livereload.port}"

  handlers: ->
    steps = if @middleware then @middleware.call(this, connect, @) else []
    if @livereload
      @livereload = {}  if typeof @livereload is "boolean"
      @livereload.port = 35729  unless @livereload.port
      steps.unshift liveReload(@livereload)
    if @index is true then @index = "index.html"
    if typeof @root == "object"
      @root.forEach (path) ->
        steps.push connect.static(path, {index: @index})
    else
      steps.push connect.static(@root, {index: @index})
    if @fallback
      steps.push (req, res) =>
        fallbackPath = @fallback

        if typeof @fallback is "function"
          fallbackPath = @fallback(req, res)

        require('fs').createReadStream(fallbackPath).pipe(res)

    return steps

  log: (text) ->
    if !@silent
      util.log util.colors.green(text)

  logWarning: (text) ->
    if !@silent
      util.log util.colors.yellow(text)

  logDebug: (text) ->
    if @debug
      util.log util.colors.blue(text)

  oldMethod: (type) ->
    text = 'does not work in gulp-connect v 2.*. Please read "readme" https://github.com/AveVlad/gulp-connect'
    switch type
      when "open" then @logWarning("Option open #{text}")

module.exports =
  server: (options = {}) ->
    app = new ConnectApp(options)
    apps.push(app)
    app
  reload: ->
    es.map (file, callback) ->
      apps.forEach (app) =>
        if app.livereload and typeof app.lr == "object"
          app.lr.changed body:
            files: file.path
      callback null, file
  serverClose: ->
    apps.forEach((app) -> do app.server.close)
    apps = []
