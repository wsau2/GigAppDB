require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// mongoose.connect(process.env.DATABASE_URL)
mongoose.connect("mongodb+srv://wsaulnier1004:qxhVpPyBdggsIBLi@cluster0.azdppcx.mongodb.net/JobsDB?retryWrites=true&w=majority&appName=Cluster0")

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to Database"))

app.use(express.json())

const listingsRouter = require('./routes/listings')
app.use('/listings', listingsRouter)

app.listen(3000, () => console.log("Server started"))