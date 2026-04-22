import mongoose, { Document } from "mongoose";

export interface IRequest extends Document {
  title: string;
  description: string;
  category: string;
  location: string;
  beneficiary: mongoose.Types.ObjectId;
}

const requestSchema = new mongoose.Schema<IRequest>(
  {
    title: String,
    description: String,
    category: String,

    location: String,

    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRequest>("Request", requestSchema);