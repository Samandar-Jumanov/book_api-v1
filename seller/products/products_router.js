const products = require('./products_controller')
const productsRouter = require('express').Router()


productsRouter.route('/getAllProducts')
.get(products.getAllProducts)

productsRouter.route('/admin/create')
.post(products.createNewOrder)

productsRouter.route('/admin/update/:pid')
.patch(products.updateProduct)

productsRouter.route('/admin/delete/:pid')
.delete(products.deleteProduct)

productsRouter.route('/users/reactions/like/:pid')
.patch(products.reactionsLike)


productsRouter.route('/users/reactions/dislike/:pid')
.patch(products.reactionsDislike)
module.exports = productsRouter