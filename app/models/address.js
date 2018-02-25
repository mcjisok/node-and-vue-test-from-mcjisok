var mongoose = require('mongoose')
var AddressSchema = require('../schemas/address')
var Address = mongoose.model('address',AddressSchema)

module.exports  = Address