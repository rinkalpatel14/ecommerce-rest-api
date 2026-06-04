//import jwt
const jwt = require('jsonwebtoken')

//auth Middleware
exports.authCheck = async (req, res, next) => {
    try {

        // console.log("============")

        //token levu
        const token = req.headers.authorization
        // console.log(token)

        //token check
        if (!token) throw new Error('Attached Token')

        //token verify
        const tokenVerify = jwt.verify(token, 'surat')
        if (!tokenVerify) throw new Error('Invalid Token')

        //next page
        next()

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}
