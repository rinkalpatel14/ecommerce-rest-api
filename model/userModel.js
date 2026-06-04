//import mongoose 
const mongoose = require('mongoose')

//create user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true    //extra spaces automatically remove
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, //email ne lowercase ma save karse
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    mobile: String,
    profile_image: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    otp: {
        type: Number,
        otpExpire: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//module export
module.exports = mongoose.model('user', userSchema)