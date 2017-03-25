var should = require('should');

var output = '';
output += '  PID COMMAND\n';
output += ' 3574 /usr/lib/utmpd\n';
output += ' 7213 /usr/lib/saf/ttymon\n';
output += ' 3039 zsched\n';
output += ' 3138 /sbin/init\n';
output += ' 3211 /lib/inet/ipmgmtd\n';
output += ' 3165 /lib/svc/bin/svc.startd\n';

var pidof = require('../lib/pidof');

describe('pidof parser', function () {
    it('should return null for no match', function () {
        var pid = pidof.parse(output, 'foo');
        should.not.exist(pid);
    });
    it('should recognize output', function () {
        var pid = pidof.parse(output, 'zsched');
        should.exist(pid);
        pid.should.equal(3039);
    });
});

describe('pidoff callback', function () {
    it('should find "node" running during tests', function (done) {
        pidof('node', function (err, pid) {
            should.not.exist(err);
            should.exist(pid);
            done();
        });
    });
    it('should not find very unlikely process name running during tests', function (done) {
        pidof('0FB001AB-CE37-4E43-A7DB-1FD8BD5D812C', function (err, pid) {
            should.not.exist(err);
            should.not.exist(pid);
            done();
        });
    });
});
