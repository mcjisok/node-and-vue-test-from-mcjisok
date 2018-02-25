var mongoose = require('mongoose')
var ShoppingcartSchema = require('../schemas/shopping_cart')
var Shoppingcart = mongoose.model('Shoppingcart',ShoppingcartSchema)

module.exports  = Shoppingcart 