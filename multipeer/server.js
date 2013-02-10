var io = require('socket.io').listen(1337),
    users = {},
    connectedUsers = [];

io.sockets.on('connection', function (socket) {
  users[socket.id] = socket;

  socket.on('connect', function () {
    socket.broadcast.emit('peerConnected', socket.id);
    connectedUsers.push(socket.id);
  });

  socket.on('sendOffer', function (RTCDescription, id) {
    users[id].emit('receiveOffer', RTCDescription, socket.id);
  });

  socket.on('sendAnswer', function (RTCDescription, id) {
    users[id].emit('receiveAnswer', RTCDescription, socket.id);
  });

  socket.on('sendICECanidate', function (ICECanidate, id) {
    users[id].emit('receiveICECanidate', ICECanidate, socket.id);
  });

  socket.on('disconnect', function () {
    var index = connectedUsers.indexOf(socket.id);
    connectedUsers.splice(index, 1);
  });
});
