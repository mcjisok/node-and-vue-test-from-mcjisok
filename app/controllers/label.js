var Label = require('../models/label') //获取模型

//后台录入页
exports.new = function(req,res){
	res.render('label_admin',{
		title:'商品标签录入',
		label:{}	
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

// admin post movie
exports.save = function (req, res) {
	var _label = req.body.label
	var label = new Label(_label)
		
	label.save(function(err,label){
		if(err){
			console.log(err)
		}
	})
	res.redirect('/admin/label/list')
}


//分类列表页
exports.list = function(req,res){
	Label.fetch(function(err,labels){
		if(err){
			console.log(err)
		}
		res.render('label_list',{
			title:'标签列表页',
			labels:labels 
		})
	})
}