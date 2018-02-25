var mongoose = require('mongoose')
var LabelSchema = require('../schemas/label')
var Label = mongoose.model('Label',LabelSchema)

module.exports  = Label