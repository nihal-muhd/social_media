const express = require('express')
const dotenv = require('dotenv').config({ path: '../.env' })
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const colors = require('colors')

const port = process.env.PORT || 5000
const app = express()
connectDB()

/* routes */
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}))
app.use(errorHandler)

app.use('/', userRouter)
app.use('/admin', adminRouter)

app.listen(port, () => console.log(`server started to port ${port}`.brightBlue))
