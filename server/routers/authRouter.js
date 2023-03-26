import express from 'express'
import AuthController from "../controllers/authController.js";
import authToken from "../middleware/authMiddleware.js";

import authValidationSchema from "../validations/authValidation.js";

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/register', authValidationSchema, AuthController.register)
router.post('/logout', authToken, AuthController.logout)

export default router