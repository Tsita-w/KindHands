import { Response } from 'express';
import Donation from '../models/Donation';
import { AuthRequest } from '../types/AuthRequest';

// CREATE donation
export const createDonation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const donation = new Donation({
      ...req.body,
      donor: req.user.id
    });

    await donation.save();

    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Error creating donation' });
  }
};

// GET all donations
export const getAllDonations = async (req: AuthRequest, res: Response) => {
  try {
    const donations = await Donation.find().populate("donor", "name email");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching donations" });
  }
};