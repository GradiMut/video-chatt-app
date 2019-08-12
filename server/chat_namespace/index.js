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
};

exports.createNameSpace = (io) => {
  namespace = io.of(config.CHAT_NAMESPACE).on('connection', onConnection);
};
