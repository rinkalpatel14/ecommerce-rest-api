//import model
let CATEGORY = require('../model/categoryModel')

//create Category
exports.createCategory = async (req, res) => {
    try {

        const data = req.body

        //check category exist
        const categoryExist = await CATEGORY.findOne({ category_name: data.category_name })

        if (categoryExist) {
            throw new Error('Category Already Exists')
        }

        const createData = await CATEGORY.create(data)
        res.status(201).json({
            status: 'Success',
            message: 'Data created Successfully',
            data: createData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//getAll Category
exports.getAllCategory = async (req, res) => {
    try {

        const allData = await CATEGORY.find()
        res.status(200).json({
            status: 'Success',
            message: 'Data created Successfully',
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

//get Single Category
exports.getSingleCategory = async (req, res) => {
    try {

        const singleId = req.params.id
        const singleData = await CATEGORY.findById(singleId)
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

//delete Category
exports.deleteCategory = async (req, res) => {
    try {

        const deleteId = req.params.id
        const deleteData = await CATEGORY.findByIdAndDelete(deleteId)
        res.status(200).json({
            status: 'Success',
            message: 'Data Deleted Successfully',
            data: deleteData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//edit Category
exports.editCategory = async (req, res) => {
    try {

        const editId = req.params.id
        const editData = await CATEGORY.findByIdAndUpdate(editId, req.body, { new: true })
        res.status(200).json({
            status: 'Success',
            message: 'Data Updated Successfully',
            data: editData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}