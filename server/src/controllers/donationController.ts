import mongoose from 'mongoose';
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

export const getDonations = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;

    const filter: any = {};

    // Filter by status (optional)
    if (status) {
      const validStatuses = ['pending', 'collected', 'delivered'];

      if (!validStatuses.includes(status as string)) {
        return res.status(400).json({ message: 'Invalid status filter' });
      }

      filter.status = status;
    }

    const donations = await Donation
      .find(filter)
      .populate("donor", "name email");

    res.json(donations);

  } catch (err) {
    res.status(500).json({ message: "Error fetching donations" });
  }
};

export const assignVolunteer = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

   const id = req.params.id as string;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid donation ID" });
    }

    // Find donation first
    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Prevent re-assigning
    if (donation.volunteer) {
      return res.status(400).json({ message: "Donation already assigned" });
    }

    // Assign volunteer
    donation.volunteer = req.user.id;
    donation.status = "pending";

    await donation.save();

    res.json(donation);

  } catch {
    res.status(500).json({ message: "Error assigning volunteer" });
  }
};

export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const tasks = await Donation
      .find({ volunteer: req.user.id })
      .populate("donor", "name email");

    res.json(tasks);

  } catch {
    res.status(500).json({ message: 'Error fetching your tasks' });
  }
};