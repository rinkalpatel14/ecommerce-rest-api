//import model
let CART = require('../model/cartModel')

//add to cart
exports.createCart = async (req, res) => {
    try {

        const craeteData = await CART.create(req.body)

        res.status(201).json({
            status: 'Success',
            message: 'Product Added to Cart',
            data: craeteData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}


//getAll cart
exports.getAllCart = async (req, res) => {
    try {
        const getAll = await CART.find().populate('user_id', "-password").populate('product_id')
        res.status(200).json({
            status: 'Success',
            message: 'Data fetch Successfully',
            total: getAll.length,
            data: getAll
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//getsingle Cart
exports.getSingleCart = async (req, res) => {
    try {
        const singleId = req.params.id
        const singleData = await CART.findById(singleId).populate('user_id', "-password").populate('product_id')
        res.status(200).json({
            status: 'Success',
            message: 'Signle Cart Fetch Successfully',
            data: singleData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//delete Cart
exports.deleteCart = async (req, res) => {
    try {

        const deleteId = req.params.id
        const deleteCart = await CART.findByIdAndDelete(deleteId)
        res.status(200).json({
            status: 'Success',
            message: 'Data Deleted Successfully',
            data: deleteCart
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//update cart
exports.editCart = async (req, res) => {
    try {
        const editId = req.params.id
        const editData = await CART.findByIdAndUpdate(editId, req.body, { new: true })
        res.status(200).json({
            status: 'Success',
            message: 'Data Update Successfully',
            data: editData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}



