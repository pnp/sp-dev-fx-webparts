var inpathSync = require('inpath').sync;

var env = inpathSync('env');
console.log(env); // => /usr/bin/env

var none = inpathSync('4A87553D-6BAC-42EE-A699-BAF7830E453A');
console.log(none); // => null
