const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jimp = require('jimp');
const path = require('node:path')
const { Requester } = require('cote')


const requester = new Requester({ name: 'nodepop-api' })

// User schema definition
const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String
})

// Static method to hash a password
userSchema.statics.hashPassword = function(plainPassword) {
    return bcrypt.hash(plainPassword, 7)
}

// Instance method to check an user password
userSchema.methods.comparePassword = function(plainPassword) {
    return bcrypt.compare(plainPassword, this.password)
}

// Create User model
const User = mongoose.model('User', userSchema)

// User model export
module.exports = User