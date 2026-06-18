import { Router } from 'express'
import {
  getHierarchy,
  getUsers,
  patchUserCharges,
  postRetailor,
} from '../controllers/hierarchyController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getHierarchy)
router.get('/users', requireAuth, getUsers)
router.post('/users', requireAuth, postRetailor)
router.patch('/users/:userId/charges', requireAuth, patchUserCharges)

export default router
