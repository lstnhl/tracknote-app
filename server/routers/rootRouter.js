import express from 'express'
import userRouter from './userRouter.js'
import albumRouter from "./albumRouter.js";
import authRouter from "./authRouter.js";

const router = express.Router()

router.get('/test', (req, res) => {
    res.send('SERVER IS WORKING')
})

router.use('/user', userRouter)
router.use('/album', albumRouter)
router.use('/auth', authRouter)

export default router