import { Router } from 'express'
import {
  dashboardSummary,
  login,
  me,
  updatePassword,
  updateTheme,
} from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/login', login)
router.get('/me', requireAuth, me)
router.get('/summary', requireAuth, dashboardSummary)
router.patch('/theme', requireAuth, updateTheme)
router.post('/change-password', requireAuth, updatePassword)

export default router
