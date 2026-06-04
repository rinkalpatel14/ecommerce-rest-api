//import model
let USER = require('../model/userModel')

//import bcrypt
const bcrypt = require('bcrypt')

//getAll users
exports.getAllUsers = async (req, res) => {
    try {

        const allData = await USER.find().select("-password") //password field remove
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

//getSingle user
exports.getSingleUser = async (req, res) => {
    try {

        const singleId = req.params.id
        const singleData = await USER.findById(singleId).select("-password")
        res.status(200).json({
            status: 'Success',
            message: 'Single User Fetch Successfully',
            data: singleData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}


//delete user
exports.deleteUser = async (req, res) => {
    try {

        const deleteId = req.params.id
        const deleteData = await USER.findByIdAndDelete(deleteId).select("-password")
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

//update user
exports.updateUser = async (req, res) => {
    try {

        const data = req.body
        const editId = req.params.id
        //hash password
        data.password = await bcrypt.hash(data.password, 10)
        //multer image
        data.profile_image = req.file.filename

        const editData = await USER.findByIdAndUpdate(editId, data, { new: true })

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