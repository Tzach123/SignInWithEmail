import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import path from 'path'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import uploadImgRoutes from './routes/uploadImgRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

const __dirname = path.resolve()
console.log(path.join(__dirname, '/img'))
app.use('/img', express.static(path.join(__dirname, '/img')))

app.use('/api/registration', userRoutes)
app.use('/api/uploadimg', uploadImgRoutes)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`.yellow.bold)
)
