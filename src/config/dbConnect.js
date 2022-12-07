const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@internationalchat.gw8pumf.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri, { useMongoClient: true })
mongoose.Promise = global.Promise
const db = mongoose.connection

export default db