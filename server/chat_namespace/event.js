/* eslint-disable no-console */
/* eslint-disable arrow-parens */
const joinRoom = (sockets, namespace) => ({ username, room }) => {};

const publicMessage = (namespace) => ({ room, message, username }) => {
  namespace.sockets.in(room).emit('newMessage', { message, username });
};

const privateMessage = (namespace) => ({
  // eslint-disable-next-line no-shadow
  privateMessage,
  to,
  from,
  room,
}) => {
  namespace.to(room).emit('privateMessage', {
    to,
    privateMessage,
    from,
    room,
  });
};

const leaveRoom = (sockets, namespace) => ({ room, username }) => {
  sockets.leaveRoom(room, () => {
    let usersRoom = users[room];
    usersRoom = usersRoom.filters((user) => (user.username !== username));
    namespace.sockets.in(room).emit('newuser', usersRoom);
  });
};

const joinPrivateRoom = (socket, namespace) => ({ username, room, to }) => {
  socket.join(to, () => {
    if (room !== null) {
      let usersRoom = users[room];
      let userToTalk = usersRoom.find(user => user.username === to);

      if (userToTalk.privateChat) { // If he is already talking
        namespace.to(to).emit('leavePrivateRoom', {
          to,
          room,
          from: username,
          privateMessage: `${to} is already talking`,
        });
        socket.leave(to, () => {
          console.log(`user ${username} forced to left the room ${to}`);
        });
        return;
      };
      // If the user is not talking we update the flag and notify the other user
      userToTalk.privateChat = true;
      namespace.sockets.in(room).emit('privateChat', { username, to });
    }
  });
};
const leavePrivateRoom = (socket, namespace) => ({ room, from, to }) => {
  let usersRoom = users[room];
  let userToTalk = usersRoom.find(user => user.username === to);
  // Update the flag and notify the other user
  userToTalk.privateChat = false;
  namespace.to(to).emit('leavePrivateRoom', { to, from, privateMessage: `${to} has closed the chat` });
  socket.leave(to, () => {
    console.log(`user ${from} left the private chat with ${to}`);
  });
};

module.exports = {
  joinRoom,
  publicMessage,
  privateMessage,
  leaveRoom,
  joinPrivateRoom,
  leavePrivateRoom,
};
