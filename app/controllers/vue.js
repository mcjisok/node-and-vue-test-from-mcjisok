var Product = require('../models/product') //获取模型
var Comment =require('../models/comment')
var Catetory = require('../models/catetory')
var Childcate = require('../models/childcate')
var Label = require('../models/label')
var Brand = require('../models/brand')
var User = require('../models/user')
var Shoppingcart = require('../models/shopping_cart')
var CBL = require('../code/category_save.js')

var Address = require('../models/address')

exports.category = function(req,res){
	Catetory.find(function(err,categories){
		var firstcate = categories[0]._id;
		//console.log(firstcate);
		Childcate
		.find({parentcate:firstcate})
		.populate({
			path:'products',
			select:'_id product_poster',
			options:{ limit: 6}
		})
		.exec(function(err,childcates){
			categories[0].childcates = childcates
			//console.log(categories)
			res.json(categories)
		})		
	})
}

exports.childcate = function(req,res){
	//console.log(req.body.id)
	var params = req.body.id
	Childcate
		.find({parentcate:params})
		.populate({
			path:'products',
			select: '_id product_poster',
			options: { limit: 6 }
		})
		.exec(function(err,childcates){
			res.json(childcates)
		})
}
// 通过分类获取商品列表
exports.goodlist_child = function(req,res){
	var cateid = req.params.id
	Product
	.find({catetory:cateid})
	.populate({
		path:'products',
		select:'_id product_poster product_title product_price',
		options:{ limit: 6}
	})
	.exec(function(err,goodlist){
		if(err){
			console.log(err)
		}
		else{
			res.json(goodlist)
		}
	})
	console.log(req.params.id)
}

// 获取商品详情
exports.gooddetail = function(req,res){
	var goodid = req.params.id;
	Product.findById(goodid,function(err,gooddetail){
		var store_id = gooddetail.store_id;
		User.findById(store_id,function(err,user){
			if(err){
				console.log(err)
			}
			else{
				res.json({gooddetail,user})
			}
		})
		
	})
}

// 添加商品到购物车内
exports.addtocart = function(req,res){
	var requestbody = req.body
	console.log('11111')
	var goodID = requestbody.goodID
	var userID = requestbody.userID
	var good_count = requestbody.good_count
	Shoppingcart.findOne({goodID:goodID,userID:userID},function(err,shopcart){
		if(shopcart){
			console.log('该商品已加入购物车')
			shopcart.good_count += parseInt(good_count)
			shopcart.save(function(err,shopping_cart){
				if(err){
					console.log(err)
				}
				else{
				res.json({success:1})
				}
			})
		}
		else{
			console.log(req.body)
			// res.json(1)
			
			var shoppingcart = new Shoppingcart(requestbody);
			// shoppingcart.storeID = 321
			shoppingcart.save(function(err,shopping_cart){
				if(err){
					console.log(err)
				}
				else{
					res.json({success:1})
				}
			})
			// console.log(shoppingcart)
		}
	})	
}

// 返回当前用户购物车内商品列表信息
exports.shoppingcart_list = function(req,res){
	var userID = req.body.userid
	// console.log(userID)
	Shoppingcart
	.find({userID:userID})
	.populate({
		path:'goodID',
		select: '_id product_poster product_title product_price product_unit product_freight',
	})
	.exec(function(err,goodlist){
		if(err){
			console.log(err)
		}
		else{
			// console.log(goodlist[0])
			res.json(goodlist)
		}
	})
}


// 修改购物车商品数量 增加/减少/直接输入购买数量
exports.add_minus = function(req,res){
	console.log(req.body)
	var cartID = req.body.cartID;
	var state = req.body.isaddORminus;
	var nowcount = req.body.nowcount
	if(state < 0){
		Shoppingcart.update({'_id':cartID},{'$inc':{'good_count':-1}},function(err,results){
			// console.log(results)
			res.json(state)
		})
	}
	else if(state > 0){
		Shoppingcart.update({'_id':cartID},{'$inc':{'good_count':1}},function(err,results){
			// console.log(results)
			res.json(state)
		})
	}
	else if(state == 0 && nowcount){
		Shoppingcart.update({'_id':cartID},{'good_count':nowcount},function(err,results){
			res.json(state)
		})
	}
}

// 删除购物车内某个商品
exports.cart_del = function(req,res){
	var cartID = req.body.cartID
	Shoppingcart.remove({_id:cartID},function(results){
		// console.log('删除商品成功')
		res.json(results)
	})
}

exports.verification = function(req,res){
	var _username = req.body.username
	User.findOne({name:_username},function(err,user){
		if(user){
			res.json({results:1})
		}
		else{
			var Num = '';
			for (var i = 0; i < 6; i++) {
				Num += Math.floor(Math.random()*10)
			}
			res.json({results:2,vNum:Num})
		}
	})	
	
}
exports.mobile_reg = function(req,res){
	console.log(req.body)
}


// 保存收件地址
exports.saveAddress = function(req,res){
	// console.log(req.body)
	var address = new Address(req.body)
	console.log(address)
	address.save(function(err,results){
		if(err){
			console.log(err)
		}
		else{
			// console.log('success')
			res.json({code:200})
		}
	})
}

// 查询收件地址
exports.getAddress = function(req,res){
	var userid = req.body.userid
	// console.log(userid)
	Address.findOne({userid:userid,isdefaultAddress:true},function(err,address){
		res.json(address)
	})
}

// 生成订单之前 获取选中的购物车列表
exports.getToOrderGoodList = function(req,res){
	// console.log(req.body)
	var list = req.body.cartidlist
	Shoppingcart
	.find({_id:{$in:list}})
	.populate({
		path:'goodID',
		select: '_id product_poster product_title product_price product_unit product_freight',
	})
	.exec(function(err,goodlist){
		// console.log(goodlist)
		res.json(goodlist)
	})
	// console.log(list)
}


// 个人中心获取收货地址列表
exports.address_list = function(req,res){
	console.log(req.body)
	var userID = req.body

	Address.find(userID,function(err,address_list){
		if(err){
			console.log(err)
		}
		else{
			if(address_list.length > 0){
				res.json(address_list)
				
			}
			else{
				res.json({code:404})
			}
		}
	})
}