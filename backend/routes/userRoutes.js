import express from 'express'
const router = express.Router()
import {
  createProcessUser,
  updateProcessUser,
  getUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/createprocessuser', createProcessUser)
router.put('/updateprocessuser', protect, updateProcessUser)
router.get('/getuser', protect, getUser)

export default router
