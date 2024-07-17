const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')

// Getting All
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find()
        res.json(listings)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})
 
// Getting One
router.get("/:id", getListing, (req, res) => {
    res.send(res.listing.title)
})

// Creating One 
router.post('/', async (req, res) => {
    const listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        pay: req.body.pay,
        duration: req.body.duration,
        creator: req.body.creator,
    })
    try {
        const newListing = await listing.save()
        res.status(201).json(newListing)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Updating One
router.patch("/:id", getListing, async (req, res) => {
    if (req.body.title != null) {
        res.listing.title = req.body.title
    }
    // if (req.body.owner != null) {
    //     res.listing.owner = req.body.owner
    // }
    if (req.body.description != null) {
        res.listing.description = req.body.description
    }
    if (req.body.pay != null) {
        res.listing.pay = req.body.pay
    }
    if (req.body.duration != null) {
        res.listing.duration = req.body.duration
    }

    try {
        const updatedListing = await res.listing.save()
        res.json(updatedListing)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete("/:id", getListing, async (req, res) => {
    try {
        await res.listing.deleteOne ()
        res.json({ message: "Deleted listing" })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})
 
// "middleware"
async function getListing(req, res, next) {
    let listing
    try {
        listing = await Listing.findById(req.params.id)
        if (listing == null) {
            return res.status(404).json({ message: 'Cannot find listing' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.listing = listing
    next()
} 

module.exports = router