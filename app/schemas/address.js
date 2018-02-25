var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var AddressSchema = new Schema({
	userid:String,
	person_name:String,
	person_mobnum:Number,
	person_address_detail:String,
	provincename:String,
	cityname:String,
	isdefaultAddress:Boolean,	
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})


AddressSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next()
})


AddressSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = AddressSchema
