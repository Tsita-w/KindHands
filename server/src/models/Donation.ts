import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  donor: mongoose.Types.ObjectId;
  volunteer?: mongoose.Types.ObjectId | null;
  itemType: 'money' | 'clothes' | 'food' | 'other';
  description: string;
  quantity?: number;
  status: 'pending' | 'collected' | 'delivered';
  location: string;
  pickup: boolean;
}

const DonationSchema: Schema = new Schema(
  {
    donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    volunteer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    itemType: {
      type: String,
      enum: ['money', 'clothes', 'food', 'other'],
      required: true
    },

    description: { type: String, required: true },

    quantity: { type: Number },

    status: {
      type: String,
      enum: ['pending', 'collected', 'delivered'],
      default: 'pending'
    },

    location: { type: String, required: true },

    pickup: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IDonation>('Donation', DonationSchema);