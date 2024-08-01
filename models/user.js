const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    jobsAppliedTo: [{
        type: String,
        required: false
    }],
    jobsCreated: [{
        type: Number,
        required: false
    }],
    money: {
        type: Number,
        required: false
    },
    reviews: [{
        userID: String,
        rating: Number,
        comments: String,
        date: String,
    }],
    profilePicture: {
        type: String,
        required: false, 
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
    }
})

module.exports = mongoose.model('User', userSchema)