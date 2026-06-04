//import model
let PRODUCT = require('../model/productModel')

// create product
exports.createProduct = async (req, res) => {
    try {

        const data = req.body

        //using multer 
        // data.images = req.files.filename //using single image
        data.images = req.files.map(
            (file) => file.filename)

        const productData = await PRODUCT.create(data)

        res.status(201).json({
            status: 'Success',
            message: 'Product Created Successfully',
            data: productData
        })

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })

    }
}


// getAll products
exports.getAllProduct = async (req, res) => {
    try {

        const allData = await PRODUCT.find().populate('category_Id') //using populate

        res.status(200).json({
            status: 'Success',
            message: 'Data Fetch Successfully',
            total: allData.length,
            data: allData
        })

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })

    }
}

// getSingle product
exports.getSingleProduct = async (req, res) => {
    try {

        const singleId = req.params.id
        const singleData = await PRODUCT.findById(singleId).populate('category_Id') //using populate

        res.status(200).json({
            status: 'Success',
            message: 'Single Data Fetch Successfully',
            data: singleData
        })

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })

    }
}


//delete product
exports.deleteProduct = async (req, res) => {
    try {

        const deleteId = req.params.id
        const deleteData = await PRODUCT.findByIdAndDelete(deleteId)

        res.status(200).json({
            status: 'Success',
            message: 'Product Deleted Successfully',
            data: deleteData
        })

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })

    }
}

//update product
exports.editProduct = async (req, res) => {
    try {

        const data = req.body
        const editId = req.params.id

        data.images = req.files.map(
            (file) => file.filename)

        const editData = await PRODUCT.findByIdAndUpdate(editId, data, { new: true })

        res.status(200).json({
            status: 'Success',
            message: 'Product Updated Successfully',
            data: editData
        })

    } catch (error) {

        res.status(400).json({
            status: 'Fail',
            message: error.message
        })

    }
}

//category wise product count
exports.productCountByCategory = async (req, res) => {
    try {

        const alldata = await PRODUCT.aggregate([
            {
                $group: {
                    _id: "$category_Id",
                    totalProducts: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id", //group pachi je category id mali
                    foreignField: "_id", //category collection ni id
                    as: "category"
                }
            }
        ])

        res.status(200).json({
            status: "Success",
            message: "Category Wise Product Count Fetched Successfully",
            data: alldata,
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }
}