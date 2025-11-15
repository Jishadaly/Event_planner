const Notification = require('../models/Notification.model')

exports.sendNotification = async (userId, { title, message, event, type }, io = null) => {
  const notif = await Notification.create({
    user: userId,
    title,
    message,
    type,
    event,
  });

  // Emit socket if user is online
  if (io) {
    io.to(userId.toString()).emit("notification:new", notif);
  }

  return notif;
};
