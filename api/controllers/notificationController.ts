import { Request, Response, NextFunction } from "express";
import Notification from "../models/notificationModel"; // Import the Notification model
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

// 1. Controller function to create a new notification
export const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, message, type } = req.body;

    if (!userId || !message || !type) {
      return next(new AppError("Missing required fields", 400));
    }

    const notification = await Notification.create({
      ...req.body,
      isRead: false,
    });

    res.status(201).json({
      status: "success",
      data: { notification },
    });
  }
);

// 2. Controller function to fetch all notifications for a user
export const getNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    if (!notifications || notifications.length === 0) {
      return next(new AppError("No notifications found for this user", 404));
    }

    res.status(200).json({
      status: "success",
      data: { notifications },
    });
  }
);

// 3. Controller function to mark a notification as read
export const markAsRead = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { notification },
    });
  }
);

// 4. Controller function to delete a notification (optional)
export const deleteNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Notification deleted successfully",
    });
  }
);
