import { Schema, model, Document } from "mongoose";

// Define the shape of the notification document
interface INotification extends Document {
  userId: string; // The user the notification is for
  message: string; // The content of the notification
  type: string; // The type of notification ('info', 'warning', 'error')
  isRead: boolean; // Flag indicating whether the notification has been read
  createdAt: Date; // Date when the notification was created
}

// Define the schema for the Notification model
const NotificationSchema = new Schema<INotification>({
  userId: { type: String, required: true }, // Required user ID
  message: { type: String, required: true }, // Required message
  type: {
    type: String,
    enum: ["info", "warning", "error"], // Allowed notification types
    required: true,
  },
  isRead: { type: Boolean, default: false }, // Default value is false (unread)
  createdAt: { type: Date, default: Date.now }, // Default value is the current date
});

// Create the Notification model using the schema
const Notification = model<INotification>("Notification", NotificationSchema);

export default Notification;
