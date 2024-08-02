const express = require('express')
const router = express.Router()
const User = require('../models/user')

/*
Notes

Upon POST i have gotten this error a couple times... how to fix...
FIX!!! TRAILING COMMA ON PAYLOAD!!!!! WTF

SyntaxError: Unexpected token } in JSON at position 219
    at JSON.parse (<anonymous>)
    at parse (/Users/wsaulnier/Documents/wsau2space/GigAppDB/node_modules/body-parser/lib/types/json.js:92:19)
    at /Users/wsaulnier/Documents/wsau2space/GigAppDB/node_modules/body-parser/lib/read.js:128:18
    at AsyncResource.runInAsyncScope (node:async_hooks:203:9)
    at invokeCallback (/Users/wsaulnier/Documents/wsau2space/GigAppDB/node_modules/raw-body/index.js:238:16)
    at done (/Users/wsaulnier/Documents/wsau2space/GigAppDB/node_modules/raw-body/index.js:227:7)
    at IncomingMessage.onEnd (/Users/wsaulnier/Documents/wsau2space/GigAppDB/node_modules/raw-body/index.js:287:7)
    at IncomingMessage.emit (node:events:513:28)
    at endReadableNT (node:internal/streams/readable:1359:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
*/

// Getting All
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Getting One
router.get("/:id", getUser, (req, res) => {
    // Return json of that user
    res.json(res.user)
})

// Creating One 
router.post('/', async (req, res) => {
    const user = new User({
        profilePicture: req.body.profilePicture,
        userID: req.body.userID,
        jobsAppliedTo: req.body.jobsAppliedTo,
        jobsCreated: req.body.jobsCreated,
        reviews: req.body.reviews,
        money: req.body.money,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Updating One
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.userID != null) {
        res.user.userID = req.body.userID
    }
    

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: "Deleted user" })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})
 
// "middleware"
async function getUser(req, res, next) {
    console.log("getUser")
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
} 

module.exports = router