const express = require('express')
const router = express.Router()

//import controller
let PC = require('../controller/productController')

//import multer
const multer  = require('multer')

//multer code
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.get('/',(req,res)=>{
    res.send('hello category')
})

//import middleware 
const AUTH = require('../middleware/authMiddleware')

// create product
router.post('/create',AUTH.authCheck,upload.array('images',3),PC.createProduct)

// getAll products
router.get('/getAll',AUTH.authCheck,PC.getAllProduct)

// getSingle product
router.get('/getSingle/:id',AUTH.authCheck, PC.getSingleProduct)

// delete product
router.delete('/delete/:id',AUTH.authCheck, PC.deleteProduct)

//edit product
router.patch('/edit/:id',AUTH.authCheck,upload.array('images',3), PC.editProduct)

router.get('/product-count-category',AUTH.authCheck,PC.productCountByCategory)

module.exports = router;