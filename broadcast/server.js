var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
  socket.on('sendOffer', function (RTCDescription) {
    socket.broadcast.emit('receiveOffer', RTCDescription);
  });

  socket.on('sendAnswer', function (RTCDescription) {
    socket.broadcast.emit('receiveAnswer', RTCDescription);
  });

  socket.on('sendCallerICECanidate', function (ICECanidate) {
    socket.broadcast.emit('receiveAnswerICECanidate', ICECanidate);
  });

  socket.on('sendAnswerICECanidate', function (ICECanidate) {
    socket.broadcast.emit('receiveCallerICECanidate', ICECanidate);
  });
});
