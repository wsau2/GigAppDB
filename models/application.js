const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    applicationID: {
        type: String,
        required: true,
    },
    listingID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    hispanicOrLatino: {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model('Application', applicationSchema)