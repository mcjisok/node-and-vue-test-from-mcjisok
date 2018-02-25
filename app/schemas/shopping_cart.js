var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ShoppingcartSchema = new Schema({
	userID:[{type:ObjectId, ref:'User'}],
	goodID:[{type:ObjectId, ref:'Product'}],
	storeID:[{type:ObjectId, ref:'User'}],
	good_price:{
		type:Number,
		default:'0'
	},
	good_freight:{
		type:Number,
		default:0
	},
	good_count:{
		type:Number,
		default:0
	},
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


ShoppingcartSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next()
})


ShoppingcartSchema.statics = {
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

module.exports = ShoppingcartSchema
