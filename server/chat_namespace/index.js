const events = require('events');
const config = require('./../config');

// socket namaspace
let namespace;
const users = {
  general: [],
  game: [],
  programming: [],
  science: [],
};

const onConnection = (socket) => {
  // listening for joining a room
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room, () => {
      // push user for the suitable room
      users[room].push({ username, privateChat: false });
      // Notify all the users in the same room.
      namespace.in(room).emit('newUser', users[room]);
    });
  });

  socket.on('joinRoom', events.joinRoom(socket, namespace)); // Join a room
  socket.on('publicMessage', events.publicMessage(namespace)); // New public messages
  socket.on('leaveRoom', events.leaveRoom(socket, namespace)); // Leave room
  socket.on('leaveChat', events.leaveChat(socket, namespace)); // Leave the chat
  socket.on('joinPrivateRoom', events.joinPrivateRoom(socket, namespace)); // Join private chat
  socket.on('leavePrivateRoom', events.leavePrivateRoom(socket, namespace)); // Leave private chat
  socket.on('privateMessage', events.privateMessage(namespace)); // Private message
  socket.on('changeStatus', events.changeStatus(socket, namespace)); // // Set status
};

exports.createNameSpace = (io) => {
  namespace = io.of(config.CHAT_NAMESPACE).on('connection', onConnection);
};
