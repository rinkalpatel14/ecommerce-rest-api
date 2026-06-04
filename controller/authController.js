//import model
let USER = require('../model/userModel')

//import bcrypt
const bcrypt = require('bcrypt');

//import middleware
const jwt = require('jsonwebtoken')

//import nodemailre
const nodemailer = require("nodemailer")

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: "rinkalpatel14.pif@gmail.com", //process.env.SMTP_USER,
        pass: "fyzmnodkkgesyjfy"//process.env.SMTP_PASS,
    },
});

const sendMail = async (email, subject, message) => {
    const info = await transporter.sendMail({
        from: 'rinkalpatel14.pif@gmail.com', // sender address
        to: email, // list of recipients
        subject: subject, // subject line
        text: message, // plain text body
        html: `<h2>${message}</h2>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);

}


//register api
exports.register = async (req, res) => {
    try {

        const data = req.body

        //multer image
        data.profile_image = req.file.filename

        //check duplicate email
        const userExist = await USER.findOne({ email: data.email })

        if (userExist) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Email already exists'
            })
        }

        //password must be 6 charactor check
        if (!data.password || data.password.length < 6) {
            throw new Error('Password must be at least 6 characters')
        }

        // hash password
        data.password = await bcrypt.hash(data.password, 10)
        const userData = await USER.create(data)

        //send Mail
        await sendMail(data.email,
            "Register Successfully",
            "Your account registered successfully"
        )

        //token genrate
        // const token = jwt.sign({id : userData._id},'surat') //screatkey -> surat

        res.status(201).json({
            status: 'Success',
            message: 'User Registered Successfully',
            // token : token,
            data: userData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//login api
exports.login = async (req, res) => {
    try {

        const emailVerify = await USER.findOne({ email: req.body.email })
        if (!emailVerify) throw new Error('Invalid Email')

        const passwordVerify = await bcrypt.compare(req.body.password, emailVerify.password)
        if (!passwordVerify) throw new Error('Invalid Password')

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000)

        emailVerify.otp = otp

        await emailVerify.save()

        await sendMail(
            emailVerify.email,
            "Login OTP",
            `Your OTP is ${otp}`)

        res.status(200).json({
            status: "Success",
            message: "OTP Sent Successfully"
        })

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//verify otp
exports.verifyLoginOtp = async (req, res) => {
    try {

        const { email, otp } = req.body

        const user = await USER.findOne({ email })
        if (!user) throw new Error('Invalid Email')

        if (user.otp != otp) throw new Error('Invalid OTP')

        //token genrate
        const token = jwt.sign({ id: user._id }, 'surat') //screatkey -> surat

        user.otp = null

        await user.save()

        res.status(200).json({
            status: 'Success',
            message: 'Login Successfully',
            token: token
        })

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}
