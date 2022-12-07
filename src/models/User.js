const db = require('../config/dbConnect.js')
const bcrypt = require('bcryptjs')

const UserSchema = new db.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async (next) => {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = db.model('User', UserSchema)

module.exports = User