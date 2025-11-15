const Notification = require("../models/Notification.model");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @desc  Get loged user notifications
 * @route GET /api/notifications
 */
exports.getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: notifications.length,
    data: notifications,
  });
});

/**
 * @desc  Mark single notification as read
 * @route PATCH /api/notifications/:id/read
 */
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: notification,
  });
});

/**
 * @desc  Mark user all notifications as read
 * @route PATCH /api/notifications/read-all
 */
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

/**
 * @desc  Delete a notification
 * @route DELETE /api/notifications/:id
 */
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
