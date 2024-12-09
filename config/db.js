const mongoose = require('mongoose')
require('dotenv').config()

let MONGODB_URL = process.env.MONGODB_URL

exports.connectDB = async () => {
    await mongoose.connect(MONGODB_URL)
    console.log('DB connected...')
}