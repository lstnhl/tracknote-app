import express from 'express'
import AuthController from "../controllers/authController.js";
import authToken from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/logout', authToken, AuthController.logout)

export default router