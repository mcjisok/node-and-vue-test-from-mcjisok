var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CatetorySchema = new Schema({
	name:String,
	products:[{type:ObjectId, ref:'Product'}],
	childcates:[{type:ObjectId,ref:'Childcate'}],
	css:[],
	banner:{
		type:String,
		default:''
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


CatetorySchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next()
})


CatetorySchema.statics = {
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

module.exports = CatetorySchema
