'use strict';

/* global describe:false, it:false */

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var esc = require('./index.js');
var minimatch = require('minimatch');

var shouldMatch = function(file, pattern) {
  var matches = minimatch(file, pattern)
  if (!matches) {
    var msg = '"' + pattern + '" doesn\'t match "' + file + '"';
    assert.fail(matches, true, msg);
  }
};

var shouldNotMatch = function(file, pattern) {
  var matches = minimatch(file, pattern)
  if (matches) {
    var msg = '"' + pattern + '" matches "' + file + '"'
    fail(matches, false, msg);
  }
};

describe('escapeGlob', function() {
  it('should fail if pattern is not a string or array', function() {
    expect(esc).to.throw(Error);
    expect(esc.bind(null)).to.throw(Error);
    expect(esc.bind(0)).to.throw(Error);
    expect(esc.bind({})).to.throw(Error);
    expect(esc.bind(/regex/)).to.throw(Error);
  });
  it('should escape *', function() {
    shouldMatch('f*', esc('f*'));

    shouldMatch('f', 'f*');
    shouldNotMatch('f', esc('f*'));
    shouldMatch('f*.txt', 'f*');
    shouldNotMatch('f*.txt', esc('f*'));
    shouldMatch('file.txt', 'f*');
    shouldNotMatch('file.txt', esc('f*'));

    shouldMatch('f*ile*', esc('f*ile*'));

    shouldMatch('f*ile', 'f*ile*');
    shouldNotMatch('f*ile', esc('f*ile*'));
    shouldMatch('f*ile*.txt', 'f*ile*');
    shouldNotMatch('f*ile*.txt', esc('f*ile*'));
    shouldMatch('f*ile.txt', 'f*ile*');
    shouldNotMatch('f*ile.txt', esc('f*ile*'));
  });
  it('should escape **', function() {
    shouldMatch('**/f', esc('**/f'));

    shouldMatch('f', '**/f');
    shouldNotMatch('f', esc('**/f'));
    shouldMatch('dir/f', '**/f');
    shouldNotMatch('dir/f', esc('**/f'));

    shouldMatch('dir/**/f', 'dir/**/f');

    shouldMatch('dir/f', 'dir/**/f');
    shouldNotMatch('dir/f', esc('dir/**/f'));
    shouldMatch('dir/dir/f', 'dir/**/f');
    shouldNotMatch('dir/dir/f', esc('dir/**/f'));

    shouldMatch('**/dir/**/f', '**/dir/**/f');

    shouldMatch('dir/f', '**/dir/**/f');
    shouldNotMatch('dir/f', esc('**/dir/**/f'));
    shouldMatch('dir/dir/f', '**/dir/**/f');
    shouldNotMatch('dir/dir/f', esc('**/dir/**/f'));
    shouldMatch('dir/dir/f', '**/dir/**/f');
    shouldNotMatch('dir/dir/dir/f', esc('**/dir/**/f'));
  });
  it('should escape ?', function() {
    shouldMatch('f?', esc('f?'));

    shouldMatch('fa', 'f?');
    shouldNotMatch('fa', esc('f?'));

    shouldMatch('f?l?', esc('f?l?'));

    shouldMatch('file', 'f?l?');
    shouldNotMatch('file', esc('f?l?'));
  });
  it('should escape { }', function() {
    shouldMatch('f{a,b}{a,b}', esc('f{a,b}{a,b}'));

    shouldMatch('faa', 'f{a,b}{a,b}');
    shouldNotMatch('faa', esc('f{a,b}{a,b}'));
    shouldMatch('fab', 'f{a,b}{a,b}');
    shouldNotMatch('fab', esc('f{a,b}{a,b}'));
    shouldMatch('fba', 'f{a,b}{a,b}');
    shouldNotMatch('fba', esc('f{a,b}{a,b}'));
    shouldMatch('fbb', 'f{a,b}{a,b}');
    shouldNotMatch('fbb', esc('f{a,b}{a,b}'));

    shouldMatch('f{1..3}', esc('f{1..3}'));

    shouldMatch('f1', 'f{1..3}');
    shouldNotMatch('f1', esc('f{1..3}'));
    shouldMatch('f2', 'f{1..3}');
    shouldNotMatch('f2', esc('f{1..3}'));
    shouldMatch('f3', 'f{1..3}');
    shouldNotMatch('f3', esc('f{1..3}'));
  });
  it('should escape [ ]', function() {
    shouldMatch('f[ab][ab]', esc('f[ab][ab]'));

    shouldMatch('faa', 'f[ab][ab]');
    shouldNotMatch('faa', esc('f[ab][ab]'));
    shouldMatch('fab', 'f[ab][ab]');
    shouldNotMatch('fab', esc('f[ab][ab]'));
    shouldMatch('fba', 'f[ab][ab]');
    shouldNotMatch('fba', esc('f[ab][ab]'));
    shouldMatch('fbb', 'f[ab][ab]');
    shouldNotMatch('fbb', esc('f[ab][ab]'));
  });
  it('should escape !( | )', function() {
    shouldMatch('f!(a|b)!(a|b)', esc('f!(a|b)!(a|b)'));

    shouldMatch('fcc', 'f!(a|b)!(a|b)');
    shouldNotMatch('fcc', esc('f!(a|b)!(a|b)'));
  });
  it('should escape ?( | )', function() {
    shouldMatch('f?(a|b)?(a|b)', esc('f?(a|b)?(a|b)'));

    shouldMatch('fa', 'f?(a|b)?(a|b)');
    shouldNotMatch('fa', esc('f?(a|b)?(a|b)'));
    shouldMatch('fb', 'f?(a|b)?(a|b)');
    shouldNotMatch('fb', esc('f?(a|b)?(a|b)'));
    shouldMatch('faa', 'f?(a|b)?(a|b)');
    shouldNotMatch('faa', esc('f?(a|b)?(a|b)'));
    shouldMatch('fab', 'f?(a|b)?(a|b)');
    shouldNotMatch('fab', esc('f?(a|b)?(a|b)'));
    shouldMatch('fba', 'f?(a|b)?(a|b)');
    shouldNotMatch('fba', esc('f?(a|b)?(a|b)'));
    shouldMatch('fbb', 'f?(a|b)?(a|b)');
    shouldNotMatch('fbb', esc('f?(a|b)?(a|b)'));
  });
  it('should escape +( | )', function() {
    shouldMatch('f+(a|b)', esc('f+(a|b)'));

    shouldMatch('fa', 'f+(a|b)');
    shouldNotMatch('fa', esc('f+(a|b)'));
    shouldMatch('fb', 'f+(a|b)');
    shouldNotMatch('fb', esc('f+(a|b)'));
    shouldMatch('faa', 'f+(a|b)');
    shouldNotMatch('faa', esc('f+(a|b)'));
    shouldMatch('fab', 'f+(a|b)');
    shouldNotMatch('fab', esc('f+(a|b)'));
    shouldMatch('fba', 'f+(a|b)');
    shouldNotMatch('fba', esc('f+(a|b)'));
    shouldMatch('fbb', 'f+(a|b)');
    shouldNotMatch('fbb', esc('f+(a|b)'));
  });
  it('should escape *( | )', function() {
    shouldMatch('f*(a|b)', esc('f*(a|b)'));

    shouldMatch('f', 'f*(a|b)');
    shouldNotMatch('f', esc('f*(a|b)'));
    shouldMatch('fa', 'f*(a|b)');
    shouldNotMatch('fa', esc('f*(a|b)'));
    shouldMatch('fb', 'f*(a|b)');
    shouldNotMatch('fb', esc('f*(a|b)'));
    shouldMatch('faa', 'f*(a|b)');
    shouldNotMatch('faa', esc('f*(a|b)'));
    shouldMatch('fab', 'f*(a|b)');
    shouldNotMatch('fab', esc('f*(a|b)'));
    shouldMatch('fba', 'f*(a|b)');
    shouldNotMatch('fba', esc('f*(a|b)'));
    shouldMatch('fbb', 'f*(a|b)');
    shouldNotMatch('fbb', esc('f*(a|b)'));
  });
  it('should escape @( | )', function() {
    shouldMatch('f@(ab|ba)', esc('f@(ab|ba)'));

    shouldMatch('fab', 'f@(ab|ba)');
    shouldNotMatch('fab', esc('f@(ab|ba)'));
    shouldMatch('fba', 'f@(ab|ba)');
    shouldNotMatch('fbb', esc('f@(ab|ba)'));
  });
  it('should escape !', function() {
    shouldMatch('!f', esc('!f'));

    shouldMatch('x', '!f');
    shouldNotMatch('x', esc('!f'));
  });
  it('should escape \\', function() {
    shouldMatch('f\\x', esc('f\\x'));

    shouldMatch('fx', 'f\\x');
    shouldNotMatch('fx', esc('f\\x'));
  });
  it('should escape arrays', function() {
    var pattern = [
      'f*',
      'f*ile*',
      'f?l?',
      '**/f',
      'dir/**/f',
      '**/dir/**/f',
      'f{a,b}{a,b}',
      'f{1..3}',
      'f[ab][ab]',
      'f!(a|b)!(a|b)',
      'f?(a|b)?(a|b)',
      'f+(a|b)',
      'f*(a|b)',
      'f@(ab|ba)'
    ];
    expect(esc(pattern)).to.eql(pattern.map(esc));
  });
});
