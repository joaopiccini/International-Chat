const mongoose = require('mongoose')
const db = require('../config/dbConnect.js')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    agree: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// UserSchema.pre('save', async (next) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash
//     next()
// })

const User = db.model('User', UserSchema)

module.exports = User