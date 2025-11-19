const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");

const router = express.Router();
router.use(protect);

router.get("/", notificationController.getMyNotifications);
router.patch("/:id/read", notificationController.markAsRead);
router.patch("/readAll", notificationController.markAllAsRead);
router.delete("/:id", notificationController.deleteNotification);
router.delete("/", notificationController.deleteAllNotification);

module.exports = router;