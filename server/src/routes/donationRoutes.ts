import express from "express";
import { createDonation, getDonations } from "../controllers/donationController";
import { protect } from "../middleware/authMiddleware";
import { assignVolunteer } from "../controllers/donationController";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { getMyTasks } from "../controllers/donationController";

const router = express.Router();

router.post("/", protect, createDonation);
router.get("/", protect, getDonations);
router.patch('/:id/assign', protect, authorizeRoles(['volunteer']), assignVolunteer);
router.get('/my-tasks', protect, authorizeRoles(['volunteer']), getMyTasks);

export default router;