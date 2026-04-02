import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

// VIEWER, ANALYST, and ADMIN can access dashboard summaries
router.get('/summary', authenticate, authorize(['VIEWER', 'ANALYST', 'ADMIN']), DashboardController.getSummary);

export default router;
