require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to Database"))

app.use(express.json())

const listingsRouter = require('./routes/listings')
app.use('/listings', listingsRouter)

app.listen(3000, () => console.log("Server started"))