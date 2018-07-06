var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
io.on('connection', function (socket) {
    socket.on('isFinal', function (data) {
        console.log(data);
    });
});
