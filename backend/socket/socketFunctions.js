const User = require("../model/User");
const asyncHandler = require("express-async-handler");
module.exports.pushNotification = asyncHandler(
  async (notification, receiver) => {
    if (!receiver) {
      const users = await User.find({ role: "admin" }).select("-password");
      users.forEach(async (user) => {
        user.notifications = [...user.notifications, notification];
        await user.save();
      });
    } else {
      const user = await User.findById(receiver);
      user.notifications = [...user.notifications, notification];
      await user.save();
    }
  }
);
module.exports.pushToAdmins = asyncHandler(async (notification) => {
  const users = await User.find({ role: "admin" });
  users.forEach(async (user) => {
    addNotification(user, notification);
  });
});
module.exports.pushToUser = asyncHandler(async (userId, notification) => {
  const user = await User.findById(userId);
  addNotification(user, notification);
});
module.exports.pushToSomeUsers = asyncHandler(async (usersId, notification) => {
  const users = await User.find({ _id: { $in: usersId } });
  users.forEach(async (user) => {
    addNotification(user, notification);
  });
});
module.exports.pushToAllUsers = asyncHandler(async (notification) => {
  const users = await User.find({ role: "user" });
  users.forEach(async (user) => {
    user.notifications = [...user.notifications, notification];
    await user.save();
  });
  return users;
});

module.exports.publishNotification = asyncHandler(
  async (notification, receiver) => {
    let users = [];
    if (receiver == "all") {
      users = await User.find({}).select("-password");
    } else if (receiver == "users") {
      users = await User.find({ role: "user" }).select("-password");
    } else {
      usersPromise = receiver.map((id) => User.findById(id));
      users = await Promise.all(usersPromise);
    }
    users.forEach(async (user) => {
      user.notifications = [...user.notifications, notification];
      await user.save();
    });
    return users;
  }
);

async function addNotification(user, notification) {
  user.notifications = [...user.notifications, notification];
  await user.save();
}
