const users = require('../controller/users')
const userRouter  = require('express').Router()

userRouter.route('/signup')
.post(users.signup)


userRouter.route('/login')
.post(users.login)


module.exports = userRouter