import mongoose, { Document } from "mongoose";

export interface IDonation extends Document {
  title: string;
  description: string;
  category: "clothes" | "food" | "money" ;
  condition: "new" | "used" | "damaged";
  images: string[];
  donor: mongoose.Types.ObjectId;
  pickup: boolean;
  location: string;
}

const donationSchema = new mongoose.Schema<IDonation>(
  {
    title: String,
    description: String,

    category: {
      type: String,
      enum: ["clothes", "food", "money"],
    },

    condition: {
      type: String,
      enum: ["new", "used", "damaged"],
    },

    images: [String],

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    pickup: {
      type: Boolean,
      default: true,
    },

    location: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDonation>("Donation", donationSchema);