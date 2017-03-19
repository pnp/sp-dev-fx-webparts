var fs = require('fs'), path = require('path');

var api = require('../');
var assert = require('chai').assert;

var minified = require('fs').readFileSync(path.join(__dirname, '../sha256.min.js'), {encoding: 'utf-8'});
var minifiedApi = (new Function (minified + 'return sha256;'))();

describe('Examples:', function () {
	var examplesHex = {
		"abc": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
		"": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
		"test": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.": "2d8c2f6d978ca21712b5f6de36c9d31fa8e96a4fa5d8ff8b0188dfb9e7c171bb"
	};
	
	Object.keys(examplesHex).forEach(function (key) {
		var input = key;
		var expectedHex = examplesHex[key];
		it(JSON.stringify(input.substring(0, 11)), function () {
			var hex = api(input);
			assert.equal(hex, expectedHex);
		});
		it('Minified: ' + JSON.stringify(input.substring(0, 11)), function () {
			var hex = minifiedApi(input);
			assert.equal(hex, expectedHex);
		});
	});
});