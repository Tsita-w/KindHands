import express from "express";
import { createDonation, getAllDonations } from "../controllers/donationController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createDonation);
router.get("/", protect, getAllDonations);

export default router;