const express = require('express')
const router = express.Router()

//import controller
let AC = require('../controller/authController')

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

router.get('/', (req, res) => {
    res.send('hello auth')
})

//register router
router.post('/register', upload.single('profile_image'), AC.register)

//login router
router.post('/login', AC.login)

//verify otp router
router.post('/verify-login-otp',AC.verifyLoginOtp)

module.exports = router;