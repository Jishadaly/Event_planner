const Notification = require("../models/Notification.model");
const asyncHandler = require("../utils/asyncHandler");


exports.getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: notifications.length,
    data:notifications,
  });
});


exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    notification,
  });
});


exports.markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id },
    { isRead: true }
  );

  res.status(200).json({
    status: "success",
    message: "All notifications marked as read",
  });
});


exports.deleteNotification = asyncHandler(async (req, res) => {
  await Notification.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  });

  res.status(204).json({
    status: "success",
    message: "Notification deleted",
  });
});


exports.deleteAllNotification = asyncHandler(async (req, res) => {
  
  await Notification.deleteMany({
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    message: "All Notification deleted",
  });
});
