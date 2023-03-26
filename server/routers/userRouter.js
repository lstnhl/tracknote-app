import express from 'express'
import UserController from "../controllers/userController.js";
import authToken from "../middleware/authMiddleware.js";
import multer from 'multer';

const upload = multer({dest: './public/avatars'})

const router = express.Router()

router.get('/', UserController.getAll)
router.get('/profile', authToken, UserController.profile)
router.put('/profile', authToken, upload.single('file'), UserController.update)
router.get('/:username', UserController.get)

export default router