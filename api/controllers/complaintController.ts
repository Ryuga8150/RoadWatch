import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import User from "../models/userModel";
import Complaint from "../models/complaintModel";
import mongoose from "mongoose";
import sendEmail from "../utils/email";

export const createComplaint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { to, subject, message, userId } = req.body;

    // Validate required fields
    if (!to || !subject || !message || !userId) {
      return next(new AppError("Missing required fields", 400)); // Custom error handling
    }

    // Check if the provided userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new AppError("Invalid user ID", 400));
    }

    // Validate if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404)); // Return a 404 if the user doesn't exist
    }

    // Optionally, check if the recipient email exists in the User model
    const recipientUser = await User.findOne({ email: to });
    if (!recipientUser) {
      return next(new AppError("Recipient email not found in the system", 404));
    }

    // Create a new complaint
    const complaint = await Complaint.create({
      recipient: to, // Store the recipient's email
      subject,
      message,
      userId,
    });

    try {
      await sendEmail({
        senderEmail: user.email,
        recipientEmail: to, // Send to recipient's email
        subject: `New Complaint: ${subject}`, // Subject for the complaint
        message: `You have received a new complaint: \n\nSubject: ${subject}\nMessage: ${message}`, // Email body
      });
    } catch (error) {
      return next(new AppError("Failed to send email notification", 500));
    }

    // Send a response with the created complaint
    res.status(201).json({
      status: "success",
      data: { complaint },
    });
  }
);
