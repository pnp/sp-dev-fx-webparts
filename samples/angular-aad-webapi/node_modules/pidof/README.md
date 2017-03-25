pidof
=====

[![build status](https://secure.travis-ci.org/calmh/node-pidof.png)](http://travis-ci.org/calmh/node-pidof)

Get the PID of a running process, or `null` if it couldn't be found. Tested on
Mac OS X, Solaris and Linux. Guaranteed not to work on Windows.

Example
-------

    var pidof = require('pidof');
    
    pidof('cron', function (err, pid) {
        if (err) {
            console.log('Weird error getting PIDs');
            console.log(err);
        } else {
            if (pid) {
                console.log('Found cron at pid ' + pid);
            } else {
                console.log('Seems like there\'s no cron on this system');
            }
        }
    });

License
-------

MIT

