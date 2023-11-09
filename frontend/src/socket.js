import { io } from 'socket.io-client';
const URL = import.meta.env.NODE_ENV === 'production' ? undefined : import.meta.env.VITE_BASE_URL

export const socket = io(URL);
export const sendNotification = (data) => {
  socket.emit("send_notification", data)
}
export const publishNotification = (data) => {
  socket.emit("publish_notification",data)
}
export const getNotification = (cb) => {
  socket.on("get_notification", cb);
}
export const setUser = (userInfo) => {
  socket.emit("set_user", userInfo);
}

