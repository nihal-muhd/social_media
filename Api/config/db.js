const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connected: ${conn.connection.host}`.america.italic.underline.bgWhite);
    } catch (error) {
        throw (error)
    }
}

module.exports = connectDB