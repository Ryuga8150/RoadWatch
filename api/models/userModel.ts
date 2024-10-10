import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string; // Optional property
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

// Create the user schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "A user must have a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "A password is required"],
    },
    avatar: {
      type: String,
      default:
        "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password
userSchema.pre<IUser>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  console.log("Password hashed");
  next();
});

// Method to check if the passwords match
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
