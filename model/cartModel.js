//import mongoose 
const mongoose = require('mongoose')

// create product schema
const cartSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

//module exports
module.exports = mongoose.model('cart', cartSchema)