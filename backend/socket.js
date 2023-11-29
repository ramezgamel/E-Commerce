const {
  pushNotification,
  getUsersQuery,
} = require("./controller/user.controller");

module.exports = (io) => {
  return io.on("connection", (socket) => {
    console.log("User connected " + socket.id);

    socket.on("set_user", (data) => {
      socket.user = data;
      if (data.role == "admin") {
        socket.join("admins_room");
      } else {
        socket.join("users_room");
        socket.join(data._id);
      }
    });

    socket.on("send_notification", async (data) => {
      let notification = {
        date: data.date,
        refId: data.refId,
      };
      if (data.type == "payment success") {
        notification.senderId = socket?.user?.id;
        notification.content = `${socket?.user?.name} has been paid for his order successfully`;
        const receiver = await getUsersQuery({ role: "admin" });
        pushNotification(notification, receiver);
        notification.userInfo = socket.user;
        io.to("admins_room").emit("get_notification", notification);
      } else {
        notification.content = `Your order on deliver`;
        const receiver = await getUsersQuery({ _id: data.receiver });
        pushNotification(notification, receiver);
        io.to(data.receiver).emit("get_notification", notification);
      }
    });

    socket.on("publish_notification", async (data) => {
      let notification = {
        date: Date.now(),
        senderId: socket?.user?.id,
        content: data.content,
      };
      let users = [];
      if (data.to == "all") {
        users = await getUsersQuery({});
      } else if (data.to == "users") {
        users = await getUsersQuery({ role: "user" });
      } else {
        users = await getUsersQuery({ _id: { $in: data.selectedUsers } });
      }
      users.forEach(async (user) => {
        user.notifications = [...user.notifications, notification];
        io.to(user._id.toString()).emit("get_notification", user);
        await user.save();
      });
    });

    socket.on("disconnect", () =>
      console.log("User disconnected " + socket.id)
    );
  });
};
