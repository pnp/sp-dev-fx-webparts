var request = require('supertest');
var connect = require('../index');
require('mocha');


describe('gulp-connect', function () {
  describe('Simple', function() {
    var req;
    before(function() {
      connect.server();
      req = request('http://localhost:8080');
    })
    after(function() {
      connect.serverClose();
    })
    it('Explicit /test.txt', function (done) {
      req.get('/fixtures/simplest/test.txt')
        .expect(/Hello world/)
        .expect(200)
        .end(function (err, res) {
          done(err);
        });
    })
    it('Implicit /index.html', function (done) {
      req.get('/fixtures/simplest/')
        .expect(/index page/)
        .expect(200)
        .end(function (err, res) {
          done(err);
        });
    })
  })
  it('Root string', function (done) {
    connect.server({
      root: __dirname + "/fixtures"
    });
    request('http://localhost:8080')
      .get('/multiple/app/index.html')
      .expect(/app test/)
      .end(function (err, res) {
        connect.serverClose();
        if (err) return done(err);
        done()
      });
  })
  it('Root array', function (done) {
    connect.server({
      root: [__dirname + "/fixtures/multiple/app", __dirname + "/fixtures/multiple/dist"]
    });
    request('http://localhost:8080')
      .get('/index.html')
      .expect(/app test/)
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
      });
    request('http://localhost:8080')
      .get('/dist.html')
      .expect(/dist test/)
      .expect(200)
      .end(function (err) {
        connect.serverClose();
        if (err) return done(err);
        done()
      });
  })
  it('Port test', function (done) {
    connect.server({
      root: __dirname + "/fixtures/multiple/app",
      port: 3333
    });
    request('http://localhost:3333')
      .get('/index.html')
      .expect(/app test/)
      .end(function (err) {
        connect.serverClose();
        if (err) return done(err);
        done()
      });
  })
  it('Https test', function (done) {
    //suppress invalid self-signed ssl certificate error
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    connect.server({
      root: __dirname + "/fixtures/multiple/app",
      https: true
    });
    request('https://localhost:8080')
      .get('/index.html')
      .expect(/app test/)
      .end(function (err) {
        connect.serverClose();
        if (err) return done(err);
        done()
      });
  })
  it('Livereload test', function (done) {
    connect.server({
      livereload: true
    });
    request('http://localhost:35729')
      .get('/')
      .expect('Content-Type', /json/)
      .end(function (err) {
        if (err) return done(err);
      });
    request('http://localhost:35729')
      .get('/livereload.js')
      .expect(200)
      .end(function (err) {
        connect.serverClose();
        if (err) return done(err);
        done();
      });
  })
  it('Livereload https test', function (done) {
    connect.server({
      livereload: true,
      https: true
    });
    request('http://localhost:35729')
      .get('/')
      .expect('Content-Type', /json/)
      .end(function (err) {
        if (err) return done(err);
      });
    request('http://localhost:35729')
      .get('/livereload.js')
      .expect(200)
      .end(function (err) {
        connect.serverClose();
        if (err) return done(err);
        done();
      });
  })
  it('Livereload port', function (done) {
    connect.server({
      livereload: {
        port: 35000
      }
    });
    request('http://localhost:35000')
      .get('/')
      .expect('Content-Type', /json/)
      .end(function (err) {
        connect.serverClose();
        if (err) return done(err);
        done();
      });
  })
  it('Fallback test', function (done) {
    connect.server({
      fallback: __dirname + '/fixtures/simplest/test.txt'
    });
    request('http://localhost:8080')
      .get('/not/existing/path')
      .expect(/Hello world/)
      .expect(200)
      .end(function (err, res) {
        connect.serverClose();
        if (err) return done(err);
        done()
      });
  })
})
