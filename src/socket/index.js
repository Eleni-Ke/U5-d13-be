let onlineUsers = [];

export const newConnectionHandler = (socket) => {
  console.log("A new client connected! it's id is:", socket.id);
  socket.emit("welcome", { message: `HELLO ${socket.id}` });

  socket.on("setUsername", (payload) => {
    console.log(payload);

    onlineUsers.push({ username: payload.username, id: socket.id });

    socket.emit("loggedIn", onlineUsers);

    socket.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });
  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("newMessage", message);
  });
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    socket.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });
};
