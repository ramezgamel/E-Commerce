import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_BASE_URL

export const socket = io(URL);
export const deliverOrder = (data) => {
  socket.emit("deliver_order", data)
};
export const paymentSuccess = (data) => {
  socket.emit("payment_success", data)
};
export const publishNotification = (data) => {
  socket.emit("publish_notification",data)
}
export const getNotification = (cb) => {
  socket.on("get_notification", cb );
}
export const setUser = (userInfo) => {
  socket.emit("set_user", userInfo);
}

