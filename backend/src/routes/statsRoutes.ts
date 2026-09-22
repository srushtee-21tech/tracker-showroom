import { Router } from 'express';
import { getAdminStats } from '../controllers/statsController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, requireAdmin, getAdminStats);

export default router;
