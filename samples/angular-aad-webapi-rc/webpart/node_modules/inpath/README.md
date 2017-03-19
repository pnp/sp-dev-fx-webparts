inpath
======

[![build status](https://secure.travis-ci.org/calmh/node-inpath.png)](http://travis-ci.org/calmh/node-inpath)

Find an executable in the `$PATH`.

Example
-------

    var inpathSync = require('inpath').sync;
    
    var env = inpathSync('env');
    console.log(env); // => /usr/bin/env
    
    var none = inpathSync('4A87553D-6BAC-42EE-A699-BAF7830E453A');
    console.log(none); // => null

License
-------

MIT

