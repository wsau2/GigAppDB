const express = require('express')
const router = express.Router()
const Application = require('../models/application')
const application = require('../models/application')

// Getting All
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find()
        res.json(applications)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Getting One
router.get("/:id", getApplication, (req, res) => {
    // Return json of that application
    res.json(res.application)
})

// Creating One 
router.post('/', async (req, res) => {
    const application = new Application({
        applicationID: req.body.applicationID,
        listingID: req.body.listingID,
        userID: req.body.userID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        resume: req.body.resume,
        hispanicOrLatino: req.body.hispanicOrLatino,
    })
    try {
        const newApplication = await application.save()
        res.status(201).json(newApplication)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Updating One
router.patch("/:id", getApplication, async (req, res) => {
    if (req.body.applicationID != null) {
        res.application.applicationID = req.body.applicationID
    }
    

    try {
        const updatedApplication = await res.application.save()
        res.json(updatedApplication)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete("/:id", getApplication, async (req, res) => {
    try {
        await res.application.deleteOne()
        res.json({ message: "Deleted application" })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// "middleware"
async function getApplication(req, res, next) {
    let application
    try {
        application = await Application.findById(req.params.id)
        if (application == null) {
            return res.status(404).json({ message: 'Cannot find application' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.application = application
    next()
} 

module.exports = router