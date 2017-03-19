"use strict";

exports = module.exports = sudo;

var spawn = require('child_process').spawn;
var read = require('read');
var inpathSync = require('inpath').sync;
var pidof = require('pidof');

var path = process.env['PATH'].split(':');
var sudoBin = inpathSync('sudo', path);

var cachedPassword;
var lastAnswer;

function sudo(command, options) {
    var prompt = '#node-sudo-passwd#';
    var prompts = 0;

    var args = [ '-S', '-p', prompt ];
    args.push.apply(args, command);

    // The binary is the first non-dashed parameter to sudo
    var bin = command.filter(function (i) { return i.indexOf('-') !== 0; })[0];

    var options = options || {};
    var spawnOptions = options.spawnOptions || {};
    spawnOptions.stdio = 'pipe';

    var child = spawn(sudoBin, args, spawnOptions);

    // Wait for the sudo:d binary to start up
    function waitForStartup(err, pid) {
        if (err) {
            throw new Error('Couldn\'t start ' + bin);
        }

        if (pid || child.exitCode !== null) {
            child.emit('started');
        } else {
            setTimeout(function () {
                pidof(bin, waitForStartup);
            }, 100);
        }
    }
    pidof(bin, waitForStartup);

    // FIXME: Remove this handler when the child has successfully started
    child.stderr.on('data', function (data) {
        var lines = data.toString().trim().split('\n');
        lines.forEach(function (line) {
            if (line === prompt) {
                if (++prompts > 1) {
                    // The previous entry must have been incorrect, since sudo asks again.
                    cachedPassword = null;
                }

                if (options.cachePassword && cachedPassword) {
                    child.stdin.write(cachedPassword + '\n');
                } else {
                    read({ prompt: options.prompt || 'sudo requires your password: ', silent: true }, function (error, answer) {
                        child.stdin.write(answer + '\n');
                        if (options.cachePassword) {
                            cachedPassword = answer;
                        }
                    });
                }
            }
        });
    });

    return child;
}
