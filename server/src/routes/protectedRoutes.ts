
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// This route is now protected
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

export default router;