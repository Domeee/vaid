var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var count = 0;
var hashes = 0;
var blockId = 0;
var ids= [];

io.on('connection', function(socket) {
  count++;
  console.log('a user connected');
  console.log('new user count: ' + count);
  io.emit('up', count);
  socket.on('disconnect', function() {
    count--;
    console.log('user disconnected');
    console.log('new user count: ' + count);
    io.emit('down', count);
  });
  socket.on('state', function(payload)  {
    if (!ids.includes(payload.id)) {
        ids.push(payload.id);
        hashes += payload.hashes;
    }

    blockId ++;
    io.emit('update', {blockId: blockId, hashes: hashes});
  });
});



http.listen(app.get('port'), function() {
  console.log('listening on ' + app.get('port'));
});
