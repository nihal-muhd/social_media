const mongoose = require('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL)
  console.log(`Database connected: ${conn.connection.host}`.america.italic.underline.bgWhite)
}

module.exports = connectDB
