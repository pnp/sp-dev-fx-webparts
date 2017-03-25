module.exports = function (grunt) {
	'use strict';

	var path = require('path');
	var util = require('util');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		mochaTest: {
			//node-side
			any: {
				src: ['test/setup.js', 'test/**/*.js'],
				options: {
					reporter: 'mocha-unfunk-reporter',
					bail: false
				}
			}
		},
		uglify: {
			main: {
				options: {
					report: 'min',
					ASCIIOnly: true
				},
				files: {
					'sha256.min.js': ['sha256.js']
				}
			}
		}
	});
	
	grunt.registerTask('timing', function () {
		[10, 1000, 100000, 10000000].forEach(function (length) {
			var crypto = require('crypto');
			var randomBytes = crypto.randomBytes(length);
			var string = '';
			for (var i = 0; i < randomBytes.length; i++) {
				string += String.fromCharCode(randomBytes[i]);
			}
		
			var api = require('./');
			var durationMs = 1000;
			var start = Date.now(), iterations = 0;
			while (Date.now() < start + durationMs) {
				var hash = api(string);
				iterations++;
			}
			var end = Date.now();
		
			var averageMs = Math.round((end - start)/iterations*1000)/1000;
			console.log(string.length + '-character string: ' + averageMs + 'ms');
		});
	});
	
	grunt.registerTask('hack-uglify', function () {
		var fs = require('fs');
		var code = fs.readFileSync('sha256.min.js', {encoding: 'utf-8'});
		code = code.replace(/\u0080/g, '\\x80');
		fs.writeFileSync('sha256.min.js', code);
	});
	grunt.registerTask('build', function () {
		var fs = require('fs'), path = require('path');
		fs.readdirSync('templates').forEach(function (filename) {
			if (filename.charAt(0) === '.') return;
			var template = fs.readFileSync(path.join('templates', filename), {encoding: 'utf-8'});
			var output = template.replace(/\{\{([^\:\{\}]+\:)?([^\{\}]+)\}\}/g, function (match, modifier, filename) {
				var content = fs.readFileSync(filename, {encoding: 'utf-8'});
				modifier = modifier && modifier.replace(':', '').toLowerCase();
				if (modifier === 'html') {
					content = content.replace(/</g, '&lt;').replace('"').replace(/"/, '&quot').replace(/'/g, '&#39');
				} else if (modifier === 'json') {
					content = JSON.stringify(content);
				} else if (modifier === 'base64') {
					content = (new Buffer(content, 'utf-8')).toString('base64');
				}
				return content;
			});
			fs.writeFileSync(filename, output);
			console.log('Generated ' + filename);
		});
	});
	
	grunt.registerTask('measure', function () {
		var fs = require('fs');
		var code = fs.readFileSync('sha256.min.js');
		console.log('Minified length: ' + code.length + ' bytes');
		// update byte count in package.json
		var packageInfo = fs.readFileSync('package.json', {encoding: 'utf-8'});
		packageInfo = packageInfo.replace(/("description":.*?)([0-9]+)( bytes)/, function (match, start, byteCount, end) {
			return start + code.length + end;
		});
		fs.writeFileSync('package.json', packageInfo);
		// update byte count in README
		var readme = fs.readFileSync('README.md', {encoding: 'utf-8'});
		readme = readme.replace(/(only )([0-9]+)( bytes)/, function (match, start, byteCount, end) {
			return start + code.length + end;
		});
		fs.writeFileSync('README.md', readme);
	});
	
	grunt.registerTask('test', ['uglify', 'hack-uglify', 'build', 'mochaTest']);
	grunt.registerTask('default', ['test', 'measure', 'timing']);
};