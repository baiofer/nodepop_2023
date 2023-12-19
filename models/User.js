const mongoose = require('mongoose')

// User schema definition
const userSchema = mongoose.Schema({
    email: { type: String },
    password: String
})

// Create User model
const User = mongoose.model('User', userSchema)

// User model export
module.exports = User