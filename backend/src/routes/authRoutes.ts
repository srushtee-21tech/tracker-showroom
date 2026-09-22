import { Router } from 'express';
import { login, verifyMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/me', authenticateToken, verifyMe);

export default router;
