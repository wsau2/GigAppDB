const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Listing', listingSchema)