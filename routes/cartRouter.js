const express = require('express')
const router = express.Router()

//import controller
let CC = require('../controller/cartController')


//import middleware
const AUTH = require('../middleware/authMiddleware')

//add to cart
router.post('/create', AUTH.authCheck, CC.createCart)

//getAll cart
router.get('/getAll', AUTH.authCheck, CC.getAllCart)

//getSingle cart
router.get('/getSingle/:id', AUTH.authCheck, CC.getSingleCart)

//delete cart
router.delete('/delete/:id', AUTH.authCheck, CC.deleteCart)

//update cart
router.patch('/edit/:id', AUTH.authCheck, CC.editCart)


module.exports = router;