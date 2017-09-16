var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var count = 0;
var hashes = 0;
var blockId = 0;
var clients = {};

io.on('connection', function (socket) {
    var clientId = socket.id;
    count++;
    console.log('a user connected');
    console.log('new user count: ' + count);
    io.emit('up', count);
    socket.on('disconnect', function () {
        count--;
        clients[clientId] = 0;
        console.log('user disconnected '+ clientId);
        console.log('new user count: ' + count);
        io.emit('down', count);
    });
    socket.on('updateServerState', function (payload) {

        clients[clientId] = payload.hashes;
        recalcHashTotal();
        blockId++;
        io.emit('notifyClients', {blockId: blockId, hashes: hashes});
    });
});

function recalcHashTotal() {
    hashes = 0;
    for (const key of Object.keys(clients)) {
        hashes += clients[key];
    }
}

http.listen(app.get('port'), function () {
    console.log('listening on ' + app.get('port'));
});
