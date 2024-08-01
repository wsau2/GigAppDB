const express = require('express')
const router = express.Router()
const User = require('../models/user')

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
    res.send(res.user.userID)
})

// Creating One 
router.post('/', async (req, res) => {
    const user = new User({

        userID: req.body.userID
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