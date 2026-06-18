import { Router } from 'express'
import {
  getSupportTickets,
  patchSupportTicket,
  postSupportTicket,
} from '../controllers/supportController.js'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'

const router = Router()

router.use(requireAuth)
router.get('/', getSupportTickets)
router.post('/', postSupportTicket)
router.patch('/:ticketId', requireRole('admin'), patchSupportTicket)

export default router
