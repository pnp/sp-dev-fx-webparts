var through     = require('through2');

var plugin = function (opts) {
    opts = opts || {};
    return through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        // prevent empty files
        if (file.contents.length > 0) {
            if (!opts.trim || file.contents.toString().trim().length > 0) {
                this.push(file);
                return callback();
            }
        }

        callback();
    });
};

module.exports = plugin;
