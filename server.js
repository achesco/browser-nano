var express = require('express');
var app = express();

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.send([
        '<html>',
        '<body>',
        '<script src="/dist/browser-nano.light.js"></script>',
        '</body>',
        '</html>'
    ].join(''));
});

var server = app.listen(8181, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});