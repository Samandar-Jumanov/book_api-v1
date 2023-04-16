const bookRouter = require('express').Router()
const book = require('../controller/order')

bookRouter.route('/createNewBook')
.post(book.CreateBook)



module.exports = bookRouter
