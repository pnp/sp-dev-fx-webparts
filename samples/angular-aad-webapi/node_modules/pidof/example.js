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
