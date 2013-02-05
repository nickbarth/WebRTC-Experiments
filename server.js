var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
  socket.on('update', function (data) {
    io.sockets.volatile.emit('update', data);
  });
});
