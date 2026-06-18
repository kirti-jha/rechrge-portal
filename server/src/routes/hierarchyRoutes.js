import { Router } from 'express'
import { getHierarchy, postRetailor } from '../controllers/hierarchyController.js'

const router = Router()

router.get('/', getHierarchy)
router.post('/users', postRetailor)

export default router
