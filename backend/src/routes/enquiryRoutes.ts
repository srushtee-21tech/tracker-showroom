import { Router } from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createEnquiry);

router.get('/', authenticateToken, requireAdmin, getEnquiries);
router.put('/:id', authenticateToken, requireAdmin, updateEnquiryStatus);
router.delete('/:id', authenticateToken, requireAdmin, deleteEnquiry);

export default router;
