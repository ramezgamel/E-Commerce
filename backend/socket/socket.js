const {
  pushToUser,
  pushToSomeUsers,
  pushToAllUsers,
} = require("./socketFunctions");

function emitToSomeUsers(users, notification, io) {
  users.forEach((user) => {
    io.to(user._id.toString()).emit("get_notification", notification);
  });
}
function setRooms(socket) {
  if (socket.user.role == "admin") {
    socket.join("admins_room");
  } else {
    socket.join("users_room");
    socket.join(socket.user._id);
  }
}
module.exports = (io) => {
  return io.on("connection", (socket) => {
    socket.on("set_user", (data) => {
      socket.user = data;
      setRooms(socket);
    });

    socket.on("payment_success", (data) => {
      let notification = {
        date: data.date,
        refId: data.refId,
        senderId: socket?.user?.id,
        content: `${socket?.user?.name} has been paid for his order successfully`,
      };
      // pushToAdmins(notification);
      notification.userInfo = socket.user;
      io.to("admins_room").emit("get_notification", notification);
    });

    socket.on("deliver_order", (data) => {
      console.log(data.receiver);
      let notification = {
        date: data.date,
        refId: data.refId,
        senderId: socket?.user?.id,
        content: `Your order on deliver`,
      };
      pushToUser(data.receiver, notification);
      io.to(data.receiver).emit("get_notification", notification);
    });

    socket.on("publish_notification", async (data) => {
      let notification = {
        date: Date.now(),
        senderId: socket?.user?.id,
        content: data.content,
      };
      let users;
      if (data.to == "all") {
        users = await pushToAllUsers(notification);
      } else {
        users = await pushToSomeUsers(selectedUsers, notification);
      }
      emitToSomeUsers(users, notification, io);
    });
  });
};
