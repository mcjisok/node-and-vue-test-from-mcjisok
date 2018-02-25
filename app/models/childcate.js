var mongoose = require('mongoose')
var ChildcateSchema = require('../schemas/childcate')
var Childcate = mongoose.model('Childcate',ChildcateSchema)

module.exports  = Childcate