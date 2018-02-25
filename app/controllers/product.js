var Product = require('../models/product') //获取模型
var Comment =require('../models/comment')
var Catetory = require('../models/catetory')
var Childcate = require('../models/childcate')
var Label = require('../models/label')
var Brand = require('../models/brand')
var CBL = require('../code/category_save.js')

var _ = require('underscore')
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')

//商品详情
exports.detail = function(req,res){
	var id = req.params.id
	//console.log('debug' + id)
	Product.update({_id:id},{$inc:{pv:1}},function(err){
		if(err){
			console.log(err)
		}
	})
	Product.findById(id,function(err,product){
		//var title = product.product_title
		//console.log('111111111111111111111111111111111111111')
		//console.log(title)
		var cat,lab,brand
		console.log('------------------------------')
		Catetory
	    .find({})
	    .populate({
	      path: 'products',
	      //select: 'title poster',
	      options: {
	        limit: 5
	      }
	    })
	    .exec(function (err, catetories){
	    	Comment
			.find({product:id})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err,comments){	
				//console.log('----------------------------*-**********');
				//console.log(cat);
				//console.log(lab);
				//console.log(brand);	
				//console.log(comments)	
				res.render('detail',{
					title:'商品详情', 
					product:product,
					comments:comments,
					catetories:catetories
				})
			
			})

		})		
	})
}
 

//后台录入页
exports.new = function(req,res){
	var user = req.session.user
	//console.log('debug')
	//console.log(user._id)
	// Catetory
 //    .find({})
 //    .populate({
 //      path: 'childcates',
 //      //select: 'title poster',
 //      options: {
 //        limit: 6
 //      }
 //    })
 //    .exec(function (err, catetories){   
	// 	Label.fetch(function(err,labels){
	// 		Brand.fetch(function(err,brands){
	// 			if(err){
	// 				console.log(err)
	// 			}
	// 			res.render('admin',{
	// 				title:'商品发布页面',
	// 				catetories:catetories,
	// 				labels:labels,
	// 				brands:brands, 
	// 				store_id:user._id,
	// 				product:{
	// 					product_unit:'',				
	// 					product_price:'',
	// 					product_stock:'',
	// 					product_title:'',
	// 					product_content:'',
	// 					product_freight:'',	
	// 					product_poster:'',
	// 				}
	// 			})
	// 		})			
	// 	})	
 //    })
 	Catetory.fetch(function (err, catetories){   
		Label.fetch(function(err,labels){
			Brand.fetch(function(err,brands){
				if(err){
					console.log(err)
				}
				res.render('admin',{
					title:'商品发布页面',
					catetories:catetories,
					labels:labels,
					brands:brands, 
					store_id:user._id,
					product:{
						product_unit:'',				
						product_price:'',
						product_stock:'',
						product_title:'',
						product_content:'',
						product_freight:'',	
						product_poster:'',
					}
				})
			})			
		})	
    })
	
}

exports.detailimg = function(req,res){
	var productid = req.params.id
	Product.findById(productid,function(err,product){
		res.render('detailimg',{
			productid:productid,
			product,product
		});
	})
}

//后台更新页
exports.update = function(req,res){
	var id = req.params.id
	var user = req.session.user

	if(id){
		Product.findById(id,function(err,product){
			Catetory.fetch(function(err,catetories){
				Label.fetch(function(err,labels){
					Brand.fetch(function(err,brands){
						var cateid= product.catetory
						var catename = product.parentcate_name					
						Childcate.findById(cateid,function(err,childcate){
							Childcate.find({'parentcate_name':catename},function(err,data){
								console.log('---------------------------')
								console.log(data)
								res.render('admin',{
									title:'后台更新页面',
									catetories:catetories,
									labels:labels,
									brands:brands,
									store_id:user._id,
									product:product,
									data:data,
									parentcate_id:childcate.parentcate
								})
							})
					    	
						})						
					})
				})	
			})
		})
	}
}

//上传商品主图
exports.mainimages_upload = function(req,res,next){
	//console.log(req)
	var productid = req.params.productid
	var posterData = req.files.file
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename

	//console.log('获取到的商品主图' + req.files)
	//console.log(req.files)
	if (originalFilename) {
		fs.readFile(filePath, function (err, data) {
			var timestamp = Date.now(),
				type = posterData.type.split('/')[1],
				poster = timestamp + '.' + type,
				newPath = path.join(__dirname, '../../', 'public/upload/mainimages_upload/' + poster)
			fs.writeFile(newPath, data, function (err) {
				var url = '/upload/mainimages_upload/' + poster
				Product.findById(productid,function(err,product){
					if(err){
						console.log(err)
					}
					else{
						product.product_poster.push(url)
						product.save(function(err,product){
							console.log('添加商品主图成功！！！')
						})
					}
				})
				//req.product_poster = '/upload/' + poster;
				res.json({success:1,imgurl:url})
				//next()
			})
		})
	} 
	else {
		next()
	}
}

//上传详情图片
exports.detailimg_upload = function(req,res,next){
	//console.log(req)
	var productid = req.params.productid
	var posterData = req.files.file
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename

	//console.log('获取到的商品详情图' + req.files)
	//console.log(req.files)
	if (originalFilename) {
		fs.readFile(filePath, function (err, data) {
			var timestamp = Date.now(),
				type = posterData.type.split('/')[1],
				poster = timestamp + '.' + type,
				newPath = path.join(__dirname, '../../', 'public/upload/' + poster)
			fs.writeFile(newPath, data, function (err) {
				var url = '/upload/' + poster
				Product.findById(productid,function(err,product){
					if(err){
						console.log(err)
					}
					else{
						product.product_detailimg.push(url)
						product.save(function(err,product){
							console.log('添加商品详情图成功！！！')
						})
					}
				})
				req.product_poster = '/upload/' + poster;
				res.json({success:1,imgurl:url})
				//next()
			})
		})
	} 
	else {
		next()
	}
}


//删除商品详情图
exports.del_detailimg = function(req,res){
	//console.log(req)
	var id = req.params.id
	var detailimgurl = req.body.imgurl
	Product.update({'_id':id},{'$pull':{'product_detailimg':detailimgurl}},function(){
		
		console.log('删除商品详情图成功！')
		res.json({results:1})
	})
	//console.log(typeof(detailimgurl))
}

//删除商品主图
exports.del_mainimg = function(req,res){
	//console.log(req)
	var id = req.params.id
	var detailimgurl = req.body.imgurl
	Product.update({'_id':id},{'$pull':{'product_poster':detailimgurl}},function(){
		Product.findById(id,function(err,product){
			var mainlength = product.product_poster.length
			console.log(mainlength)
			console.log('删除商品主图成功！')
			if(mainlength < 2){
				res.json({results:1,mainlength:1})
			}
			else{
				res.json({results:1})
			}
			
		})
		
	})
	//console.log(typeof(detailimgurl))
}

//异步上传图片
exports.uploadImage = function(req,res,next){
	console.log(req.files)
	var posterData = req.files.file
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename

	console.log('获取到的文件' + req.files)
	console.log(req.files)
	if (originalFilename) {
		fs.readFile(filePath, function (err, data) {
			var timestamp = Date.now(),
				type = posterData.type.split('/')[1],
				poster = timestamp + '.' + type,
				newPath = path.join(__dirname, '../../', 'public/upload/' + poster)
			fs.writeFile(newPath, data, function (err) {
				var url = '/upload/' + poster
				req.product_poster = '/upload/' + poster;
				res.json({success:1,imgurl:url})
				//next()
			})
		})
	} 
	else {
		next()
	}
}



// admin post product
exports.save = function(req,res){
	//console.log(req)
	//res.redirect('/product/'+_product.id)
	var productObj = req.body.product
	//console.log('debug' + productObj)
	console.log(req.body.product)
	var id = productObj._id
	//var obj_prdID = mongoose.Types.ObjectId(id)
	var old_catId = productObj.old_catetory
	var old_brandId = productObj.old_brand
	var old_labelId = productObj.old_label

	var new_catId = productObj.childcate
	var new_brandId = productObj.product_brand
	var new_labelId = productObj.product_label

	var _product
	console.log('22222222222222222222222222222')
	console.log(new_catId)
	//console.log(req)
	if(req.product_poster){
		productObj.product_poster = req.product_poster 
	}

	if(id !=='undefined'){
		Product.findById(id,function(err,product){
			if(err){
				console.log(err)
			}

			//判断catetory、brand、label是否更改
			CBL.cat_brand_label(id,old_catId,new_catId,old_brandId,new_brandId,old_labelId,new_labelId,id,productObj,_product)	
			
			_product = _.extend(product,productObj)
		
			_product.save(function(err,product){
				if(err){
					console.log(err)
			    }	

			    //res.redirect('/movie/'+_product.id)
				res.redirect('/admin/product/detailimg/'+_product.id)

			})
			
			

		})
	}else{		
		console.log('ccccccccccccccccccccccccccccc')
		console.log(req.body)
		Childcate.findById(new_catId,function(err,childcate){	
			//console.log(childcate.parentcate_name)			
			Label.findById(new_labelId,function(err,lab){
				Brand.findById(new_brandId,function(err,brand){
					_product = new Product({
						store_id:productObj.store_id,
						product_unit:productObj.product_unit,
						product_title:productObj.product_title,
						product_price:productObj.product_price,
						product_stock:productObj.product_stock,
						product_poster:productObj.product_poster,
						product_brand:productObj.product_brand,
						product_label:productObj.product_label,
						product_content:productObj.product_content,
						product_freight:productObj.product_freight,			
						catetory:new_catId,
						parentcate_name:childcate.parentcate_name,
						cname:childcate.name,
						bname:brand.name,
						lname:lab.name
					})
					var catetoryId = _product.catetory,
						labelId = _product.product_label,
						brandId = _product.product_brand
					  
					_product.save(function(err,product){
						if(err){
							console.log(err)
					    }
					    //console.log('测试所获取到的商品ID为：'+product._id)
					    Childcate.findById(new_catId,function(err,catetory){
					    	catetory.products.push(product._id)

					    	catetory.save(function(err,catetory){

					    		//res.redirect('/movie/'+_product.id)
					    		res.redirect('/admin/product/detailimg/'+_product.id)
					    	})
					    	
					    })

					    Label.findById(labelId,function(err,label){
					    	if(err){
					    		console.log(err)
					    	}else{
					    		label.products.push(product._id)
					    		label.save(function(err,label){})
					    	}
					    })

					    Brand.findById(brandId,function(err,brand){
					    	if(err){
					    		console.log(err)
					    	}else{
					    		brand.products.push(product._id)
					    		brand.save(function(err,brand){})
					    	}
					    })
					    
					})

				})
			})
		})		
	} 
}

//商品列表页
exports.list = function(req,res){
	Product.fetch(function(err,products){
		//console.log('----------------------------')
		//console.log(products)
		Catetory.fetch(function(err,catetories){
			Label.fetch(function(err,labels){
				Brand.fetch(function(err,brands){
					//console.log(catetories)
					if(err){
						console.log(err)
					}
					res.render('list',{
						title:'商品列表页',
						products:products,
						catetories:catetories,
						labels:labels,
						brands:brands
					})
				})
			})
		})

		
	})

	// Catetory
 //    .find({})
 //    .populate({
 //      path: 'products',
 //      //select: 'title poster',
 //      options: {
 //        limit: 5
 //      }
 //    })
 //    .exec(function (err, catetories) {
 //    	// console.log('debug')
 //    	// console.log(catetories)
 //    	User.find({role:"0"},function(err,users){
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		res.render('list', {
	// 			title: '首页',
	// 			catetories: catetories,
	// 			users:users
	// 		})
	// 	}).limit(5)
 //    })
}

//商品列表页筛选
exports.list_search = function(req,res){
	var request = req.body
	//console.log(request)
	Product.fetch(function(err,products){		
		Product.find(request,function(err,products){				
			if(err){
				console.log(err)
			}
			else if(products.length === 0){
				res.json({results:0})
			}
			else{
				res.render('list_search',{								
					products:products,								
				})	
			}
				
		})		
	})
}

//个人商品列表页
exports.person_list = function(req,res){
	var user = req.session.user;
	var id = user._id
	Product.find({'store_id':id},function(err,docs){
		if(err){
			console.log(err);
		}

		res.render('personal_list',{
			title:'个人商品列表页',
			products:docs
		})
	})
}

//列表页删除后跳转的路由
exports.del = function(req,res){
	var id = req.query.id
	if(id){
		Product.findById(id,function(err,prd){
			//console.log('debugggggggggggggggggggg')
			//console.log(prd)
			var cateID = prd.catetory,
				brandID = prd.product_brand,
				labelID = prd.product_label
			Catetory.update({'_id':cateID},{'$pull':{'products':id}},function(err){
				if(err){
					console.log(err)
				}
				else{
					console.log('删除分类成功')
				}		
			})

			Brand.update({'_id':brandID},{'$pull':{'products':id}},function(err){
				if(err){
					console.log(err)
				}
				else{
					console.log('删除品牌成功')
				}		
			})


			Label.update({'_id':labelID},{'$pull':{'products':id}},function(err){
				if(err){
					console.log(err)
				}
				else{
					console.log('删除标签成功')
				}		
			})

			Product.remove({_id:id},function(err,product){
				if(err){
					console.log(err)
				}
				else{
					res.json({success:1})
				}
			})
		})		
	}
}


exports.m_category = function (req,res) {
	Catetory
		.find({})		
		.populate({
			path:'childcates',
		})
		.exec(function (err, catetories) {
			Childcate
			.find()
			.populate({
				path:'products',
				select: '_id product_poster',
				options: { limit: 6 }
			})
			.exec(function (err,childcates) {
				// 循环父类目
				for (var i = 0; i < catetories.length;i++){
					// 循环子类目
					for (var j = 0; j < childcates.length; j++) {
						// 判断子类目的父类目名是否与上一级类目的类目名相同，如果相同，子类目push进父类目的css数组
						if (catetories[i].name == childcates[j].parentcate_name) {
							//console.log('1111111111111111')
							//catetories[0].childcates.pop()							
							catetories[i].css.push(childcates[j])
							//arrs.push(i)
							//console.log(arrs)
						}
					}
					// 执行数组查重
					unique(catetories[i].css);
				}
				// 数组去重				
				function unique(arr) {
					var result = [];
					arr.forEach(function (v) {
						if (result.indexOf(v) < 0) {
							result.push(v);
						}
					});
					return result;
				}
				
				res.render('m_category', {
					title: '分类页',
					catetories: catetories,
					childcates: childcates
				})
			})			
		})	
}

exports.m_childprd = function (req,res) {
	var id = req.body.parentID;
	console.log(id)
	Childcate
	.find({ 'parentcate': id})
	.populate({
		path:'products'
	})
	.exec(function (err, childcates) {
		res.render('m_category_right_Component', {			
			childcates: childcates
		})		
	})
	
}