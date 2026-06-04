//import mongoose 
const mongoose = require('mongoose')

// create product schema
const productSchema = mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    },

    images: [String],

    category_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

//module exports
module.exports = mongoose.model('product', productSchema)