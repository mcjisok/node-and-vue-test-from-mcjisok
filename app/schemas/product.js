var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ProductSchema = new Schema({
	product_id:String,			//商品数字ID
	product_unit:String,		//商品计量单位
	product_price:Number,  		//商品价格
	product_stock:Number,		//商品库存
	product_salesvolume:{
		type:Number,
		default:51
	},							//商品销量
	product_title:String,		//商品标题
	product_brand:{
		type:ObjectId,
		ref:'Brand'
	},							//商品品牌		
	cname:{
		type:String,			//分类名称
		default:''	
	},
	bname:{
		type:String,			//品牌名称
		default:''	
	},
	lname:{
		type:String,			//标签名称
		default:''	
	},
	product_content:{
		type:String,
		default:''
	},							//商品详情内容
	product_freight:Number,		//运费	
	product_poster:[{type:String,default:''}],		//商品主图
	product_detailimg:[{type:String,default:''}],
	store_id:{
		type:ObjectId,
		ref:'User'
	},
	product_label:{
		type:ObjectId,
		ref:'Label'
	},
	pv:{ 
		type:Number,
		default:0
	},
	catetory:{
		type:ObjectId,
		ref:'Catetory'
	},
	parentcate_name:String,
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


ProductSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next()
})


ProductSchema.statics = {
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

module.exports = ProductSchema
