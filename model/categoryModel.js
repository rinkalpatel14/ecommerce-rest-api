//import mongoose 
const mongoose = require('mongoose')

// create category schema
const categorySchema = mongoose.Schema({

    category_name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//module exports
module.exports = mongoose.model('category', categorySchema)