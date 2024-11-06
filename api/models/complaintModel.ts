import mongoose, { Document, Schema } from "mongoose";

// Define the Complaint interface
export interface IComplaint extends Document {
  recipient: string; // Recipient email or name
  subject: string; // Complaint subject
  message: string; // Complaint message
  status: string; // Complaint status (e.g., "pending", "resolved")
  userId: mongoose.Types.ObjectId; // Associated User
  createdAt: Date; // Timestamp for when the complaint was created
  updatedAt: Date; // Timestamp for when the complaint was last updated
}

// Create the complaint schema
const complaintSchema = new Schema<IComplaint>(
  {
    recipient: {
      type: String,
      required: [true, "Recipient is required"], // Ensures recipient's email is provided
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"], // Validates email format
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      minlength: 5,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: 10,
    },
    status: {
      type: String,
      default: "pending", // Default status is "pending"
      enum: ["pending", "resolved", "in-progress"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

// Create the Complaint model
const Complaint = mongoose.model<IComplaint>("Complaint", complaintSchema);

export default Complaint;
