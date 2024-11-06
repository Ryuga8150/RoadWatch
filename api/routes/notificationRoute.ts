import express from "express";
import * as notificationController from "../controllers/notificationController";

const router = express.Router();

// 1. Route to create a new notification
router.route("/notifications").post(notificationController.createNotification);

// 2. Route to fetch notifications for a user
router
  .route("/notifications/:userId")
  .get(notificationController.getNotifications);

// 3. Route to mark a notification as read
router.route("/notifications/:id").patch(notificationController.markAsRead);

// 4. Route to delete a notification (optional)
router
  .route("/notifications/:id")
  .delete(notificationController.deleteNotification);

export default router;
