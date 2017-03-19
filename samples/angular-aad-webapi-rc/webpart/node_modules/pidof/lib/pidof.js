var exec = require('child_process').exec;

exports = module.exports = pidof;

function pidof(cmd, callback) {
    exec('ps -eo pid,comm', function (err, stdout, stderr) {
        if (err) {
            callback(err);
        } else {
            var pid = pidof.parse(stdout, cmd);
            callback(null, pid);
        }
    });
};

pidof.parse = function (data, cmd) {
    var cmdRe = new RegExp('/' + cmd + '$');
    var lines = data.trim().split('\n');
    for (var i = 0, l = lines.length; i < l; i++) {
        var fields = lines[i].trim().split(/\s+/, 2);

        if (fields.length !== 2) {
            continue;
        }

        if (fields[1] === cmd || fields[1].match(cmdRe)) {
            return parseInt(fields[0], 10);
        }
    }

    return null;
};
