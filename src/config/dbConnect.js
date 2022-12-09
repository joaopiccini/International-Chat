const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@internationalchat.gw8pumf.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri)
const db = mongoose.connection

module.exports = db