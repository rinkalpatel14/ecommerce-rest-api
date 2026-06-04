const express = require('express')
const router = express.Router()

//import controller
let CC = require('../controller/categoryController')

//import middleware
const AUTH = require('../middleware/authMiddleware')

//create category
router.post('/create',AUTH.authCheck,CC.createCategory)

//get all category
router.get('/getAll',AUTH.authCheck,CC.getAllCategory)

//get single category
router.get('/getSingle/:id',AUTH.authCheck,CC.getSingleCategory)

//delete category
router.delete('/delete/:id',AUTH.authCheck,CC.deleteCategory)

//update category
router.patch('/edit/:id',AUTH.authCheck,CC.editCategory)

module.exports = router;