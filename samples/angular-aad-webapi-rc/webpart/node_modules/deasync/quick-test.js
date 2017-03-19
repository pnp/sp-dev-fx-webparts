var ret, deasync = require('./index.js');
setTimeout(function () {
  ret = 'pass';
}, 100);

while(ret === undefined) deasync.sleep(10);
process.stdout.write(ret);
