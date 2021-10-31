import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { SELFIE_PATH, PASSPORT_PATH } from '../constants/imgConstants.js'
import { getImg } from '../controllers/uploadImgController.js'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, PASSPORT_PATH)
  },
  filename(req, file, cb) {
    cb(null, `${req.user.id}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

const storage1 = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, SELFIE_PATH)
  },
  filename(req, file, cb) {
    cb(null, `${req.user.id}${path.extname(file.originalname)}`)
  },
})

const upload1 = multer({
  storage: storage1,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

router.post('/passport', protect, upload.single('image'), getImg)

router.post('/selfie', protect, upload1.single('image'), getImg)

export default router
