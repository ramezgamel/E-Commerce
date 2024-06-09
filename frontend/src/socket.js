import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_BASE_URL

export const socket = io(URL);
export const deliverOrder = (orderData) => {
  socket.emit("deliver_order", orderData)
};
export const paymentSuccess = (paymentData) => {
  socket.emit("payment_success", paymentData)
};
export const publishNotification = (notificationData) => {
  socket.emit("publish_notification", notificationData)
}
export const getNotification = (cb) => {
  socket.on("get_notification", cb );
}
export const setUser = (userInfo) => {
  socket.emit("set_user", userInfo);
}

