import { Router } from 'express';
import {
  getShowrooms,
  getShowroomById,
  createShowroom,
  updateShowroom,
  deleteShowroom,
} from '../controllers/showroomController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getShowrooms);
router.get('/:id', getShowroomById);

router.post('/', authenticateToken, requireAdmin, createShowroom);
router.put('/:id', authenticateToken, requireAdmin, updateShowroom);
router.delete('/:id', authenticateToken, requireAdmin, deleteShowroom);

export default router;
