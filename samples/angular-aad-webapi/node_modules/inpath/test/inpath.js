var should = require('should');

var inpath = require('../lib/inpath');

describe('synchronous inpath', function () {
    it('env should always be in /usr/bin/env (I think)', function () {
        var env = inpath.sync('env');
        should.exist(env);
        env.should.equal('/usr/bin/env');
    });
    it('env should not be found in two unlikely random locations', function () {
        var env = inpath.sync('env', [ '/tmp/somewhere', '/tmp/somewhere/else' ]);
        should.not.exist(env);
    });
    it('an unlikely binary should not be found', function () {
        var env = inpath.sync('4A87553D-6BAC-42EE-A699-BAF7830E453A');
        should.not.exist(env);
    });
});
