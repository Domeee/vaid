var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var count = 0;

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
});

http.listen(app.get('port'), function() {
  console.log('listening on ' + app.get('port'));
});