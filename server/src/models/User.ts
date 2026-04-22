import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "donor" | "volunteer" | "admin" | "beneficiary";
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["donor", "volunteer", "admin", "beneficiary"],
      default: "donor",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);