require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')


// mongoose.connect(process.env.DATABASE_URL)
mongoose.connect("mongodb+srv://wsaulnier1004:qxhVpPyBdggsIBLi@cluster0.azdppcx.mongodb.net/JobsDB?retryWrites=true&w=majority&appName=Cluster0")

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to Database"))

app.use(express.json())
app.use(cors())

const listingsRouter = require('./routes/listings')
app.use('/api/v1/listings', listingsRouter)

const usersRouter = require('./routes/users')
app.use('/api/v1/users', usersRouter)

app.listen(8062, () => console.log("Server started on port 8062"))