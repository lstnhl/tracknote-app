import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import rootRouter from './routers/rootRouter.js'

const app = express()
const PORT = 5000
dotenv.config({
    path: '.env.sample'
})

app.use(cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', rootRouter)

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_HOST)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

run()