const express = require('express')
const router = express.Router()

//import controller
let UC = require('../controller/userController')

//import multer
const multer = require('multer')

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

//import middleware
const AUTH = require('../middleware/authMiddleware')

//getAll user
router.get('/all-users',AUTH.authCheck,UC.getAllUsers)

//getSingle user
router.get('/single-user/:id',AUTH.authCheck,UC.getSingleUser)

//delete user
router.delete('/delete-user/:id',AUTH.authCheck,UC.deleteUser)

//update user
router.patch('/update-user/:id',AUTH.authCheck,upload.single('profile_image'),UC.updateUser)


module.exports = router;