var Catetory = require('../models/catetory') //获取模型
var Childcate = require('../models/childcate') 

//后台录入页
exports.new = function(req,res){
	res.render('catetory_admin',{
		title:'商品分类录入',
	})
}

//分类修改
exports.update = function(req,res){
	var id = req.params.id
	Catetory.findById(id,function(err,catetory){
		Childcate.find({'parentcate':id},function(err,childcates){
			//console.log('11111111111111111111111111111')
			//console.log(childcates)
			res.render('catetory_admin',{
				title:'商品分类修改',
				catetory:catetory,
				childcates:childcates
			})
		})		
	})	
}

//删除二级类目数据
exports.childcateDel = function(req,res){
	var id = req.body._id;
	console.log('ceshiceshiceshiceshiceshiceshiceshiceshiceshi');
	console.log(id);
	Childcate.findById(id,function(err,childcate){
		if(err){
			console.log(err)
		}
		var parent_id = childcate.parentcate;
		Catetory.update({'_id':parent_id},{'$pull':{'childcates':id}},function(err){
			if(err){
				console.log(err)
			}
			console.log('删除childcat数据成功')
		})
		Childcate.remove({_id:id},function(err){
			if(err){
				console.log(err)
			}
			console.log('删除二级类目成功')
		})
		res.json({result:1})
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
	var req_bd = req.body;
	console.log(req_bd)
	var childcates = req_bd.childcate;
	var childcatesName = childcates.name
	var _catetory = req_bd.catetory,
		catetory = new Catetory(_catetory),
		cateID = req_bd.cateID;
	//console.log(_catetory.banner)
	if(cateID){
		Catetory.findById(cateID,function (err, cat) {
			
			if(err){
				console.log(err)
			}
			else{
				cat.banner = _catetory.banner;
				cat.save(function (err,cat) {
					if(err){
						cosnole.log(err)
					}					
				})
			}
		})		
	}
	if(childcatesName != 'ceshi')
	{
		if(cateID){	
			
			if(childcates){				
				//console.log(childcatesName[1])			
				for(var i =0; i<childcatesName.length;i++){
					var childcate = new Childcate;
					childcate.name = childcatesName[i];
					childcate.parentcate = cateID;
					childcate.parentcate_name = catetory.name;
					if(childcate.name != 'ceshi'){
						
						childcate.save(function(err,childcate){
							if(err){
								console.log(err)
							}
							Catetory.update({_id:cateID},{$push:{childcates:childcate._id}},function(err){
								if(err){
									console.log(err)
								}						
							})
						})	
					}						
				}					
			}
				
		}
		else{
			catetory.save(function(err,catetory){
				if(err){
					console.log(err)
				}
				//console.log('11111111111111111111111')
				if(childcates){				
					//console.log(childcatesName[1])			
					for(var i =0; i<childcatesName.length;i++){
						var childcate = new Childcate;
						childcate.name = childcatesName[i];
						childcate.parentcate = catetory._id;
						childcate.parentcate_name = catetory.name;
						if(childcate.name != 'ceshi'){
							childcate.save(function(err,childcate){
								if(err){
									console.log(err)
								}
								Catetory.update({_id:catetory._id},{$push:{childcates:childcate._id}},function(err){
									if(err){
										console.log(err)
									}						
								})
							})	
						}						
					}			
				}
				
			})
		}
	}
	res.redirect('/admin/catetory/list')
	
	
}


//分类列表页
exports.list = function(req,res){
	Catetory
    .find({})
    .populate({
      path: 'childcates',
      select: 'name',
      options: {
        limit: 6
      }
    })
    .exec(function (err, catetories){    

		//console.log(catetories[3])
		res.render('list_catetory',{
			title:'分类列表页',
			catetories:catetories
		})
    })
}

//获取二级类目下拉框内容
exports.getchildcate = function(req,res){
	var parent_id = req.body.id
	console.log(parent_id)
	Catetory
    .find({_id:parent_id})
    .populate({
      path: 'childcates',
      //select: 'title poster',
      options: {
        limit: 6
      }
    })
    .exec(function (err, catetories){
    	console.log(catetories)
    	res.render('childcate_Component',{
    		catetories:catetories[0].childcates
    	})
    })
}