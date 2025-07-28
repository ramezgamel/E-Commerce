const {
  pushToUser,
  pushToSomeUsers,
  pushToAllUsers,
  pushToAdmins,
  setRooms,
  emitToSomeUsers,
} = require("./socketFunctions");

module.exports = (io) => {
  return io.on("connection", (socket) => {
    socket.on("set_user", (data) => {
      socket.user = data;
      setRooms(socket);
    });
    // 66649ea05f7bfdd980404f6c
    // 66656e94b2b4b6b57c6931be
    socket.on("try", () => {
      io.to("66656e94b2b4b6b57c6931be").emit("get_notification", {
        userID: socket.user._id,
      });
    });

    socket.on("payment_success", (paymentData) => {
      let notification = {
        date: paymentData.date,
        refId: paymentData.refId,
        senderId: socket.user?._id,
        content: `${socket.user.name} has been paid for his order successfully`,
      };
      pushToAdmins(notification);
      notification.userInfo = socket.user;
      io.to("admins_room").emit("get_notification", notification);
    });

    socket.on("deliver_order", (data) => {
      let notification = {
        date: data.date,
        refId: data.refId,
        senderId: socket?.user?._id,
        content: `Your order on deliver`,
      };
      pushToUser(data.receiver, notification);
      io.to(data.receiver).emit("get_notification", notification);
    });

    socket.on("publish_notification", async (notificationData) => {
      let notification = {
        date: Date.now(),
        senderId: socket.user?._id,
        content: notificationData.content,
      };
      let users;
      if (notificationData.to == "all") {
        users = await pushToAllUsers(notification);
      } else {
        users = await pushToSomeUsers(
          notificationData.selectedUsers,
          notification
        );
      }
      emitToSomeUsers(users, notification, io);
    });
  });
};
