const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    post:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2023/11/05/15/25/winter-8367632_1280.jpg"   // any post url or img url
    },
    postedBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model("Post", postSchema)