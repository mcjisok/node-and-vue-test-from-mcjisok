var Brand = require('../models/brand') //获取模型

//后台品牌录入页
exports.new = function(req,res){
	res.render('brand_admin',{
		title:'商品品牌录入',
		brand:{}	
	})
}

// exports.update = function(req,res){
// 	var id = req.params.id

// 	if(id){
// 		Movie.findById(id,function(err,movie){
// 			res.render('admin',{
// 				title:'后台更新页面',
// 				movie:movie
// 			})
// 		})
// 	}
// }

// 保存品牌
exports.save = function (req, res) {
	var _brand = req.body.brand
	var brand = new Brand(_brand)
		
	brand.save(function(err,brand){
		if(err){
			console.log(err)
		}
	})
	res.redirect('/admin/brand/list')
}


//品牌列表页
exports.list = function(req,res){
	Brand.fetch(function(err,brands){
		if(err){
			console.log(err)
		}
		res.render('brand_list',{
			title:'品牌列表页',
			brands:brands 
		})
	})
}