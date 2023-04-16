const sellerRouter = require('express').Router()

const seller = require('./seller_controller')
sellerRouter.route('/seller/signup')
.post(seller.signup)

sellerRouter.route('/seller/login')
.post(seller.login)

module.exports = sellerRouter
