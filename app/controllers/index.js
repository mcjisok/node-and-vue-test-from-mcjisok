var Product = require('../models/product')
var User = require('../models/user')
var Catetory = require('../models/catetory')
var Brand = require('../models/brand')

//index page
// exports.index = function(req,res){
// 	// console.log('user in session: ')
// 	// console.log(req.session.user)
// 	//console.log(Movie)
// 	Catetory
// 		.find({})
// 		.populate({path:'movies',options:{limit:5}})		
// 		.exec(function(err,catetories){
// 			console.log('电影列表' + catetories)
// 			User.fetch(function(err,users){
// 				if(err){
// 					console.log(err)
// 				}
// 				res.render('index',{
// 					title:'影院热度播报',
// 					catetories:catetories,
// 					users:users
// 				})
// 			})
// 		})
// }
exports.index = function (req, res){
  Catetory
    .find({})
    .populate({
      path: 'products',
      //select: 'title poster',
      options: {
        limit: 6
      }
    })
    .exec(function (err, catetories){    
		res.render('index_new', {
			title: '首页',
			catetories: catetories
		})
	})
		// 	res.json(catetories)
		// })
	// Catetory
	// 	.find({})
	// 	.populate({
	// 		path: 'products',
	// 		//select: 'title poster',
	// 		options: {
	// 			limit: 5
	// 		}
	// 	})
	// 	.exec(function (err, catetories) {
	// 		//console.log('585858585858585858585858585858585858')
	// 		//console.log(catetories)
	// 		User.find({ role: "0" }, function (err, users) {
	// 			if (err) {
	// 				console.log(err)
	// 			}
	// 			res.json({
	// 				title: '首页',
	// 				catetories: catetories,
	// 				users: users
	// 			})
	// 		}).limit(5)
	// 	})
}

// 移动端首页
exports.m_index = function (req,res) {
	res.render('m_index')
}

exports.ceshi = function (req, res){
  Catetory
    .find({})
    .populate({
      path: 'products',
      //select: 'title poster',
      options: {
        limit: 5
      }
    })
    .exec(function (err, catetories) {
    	//console.log('585858585858585858585858585858585858')
    	//console.log(catetories)
    	User.find({role:"0"},function(err,users){
			if (err) {
				console.log(err)
			}
			res.render('index', {
				title: '首页',
				catetories: catetories,
				users:users
			})
		}).limit(5)
    })
}


//search
exports.search = function (req, res) {
	var catId = req.query.cat
	var page = parseInt(req.query.p,10) || 0
	var count = 6
	var index = page * count

	var q = req.query.q
	//console.log('123123123' + page)

	if(catId){
		Catetory
	    .find({_id:catId})
	    .populate({
		    path: 'products',
		    select: 'product_title product_poster'      
	    })
	    .exec(function (err, catetories) {
	    	//console.log('debug' + catetories)
			if (err) {
				console.log(err)
			}
			var catetory = catetories[0] || {}
			var products = catetory.products || []
			console.log('debug')
			console.log(products)
			var results = products.slice(index,index + count)

			res.render('results', {
				title: '结果列表页面',
				keyword:catetory.name,
				currentPage:(page + 1),
				query:'cat=' + catId,
				totalPage:Math.ceil(products.length / count),
				products: results
			})
	    });
	}
	else {
	    Product
	        .find({
	       		product_title: new RegExp((q + '.*'), 'i')
	        })
	        .exec(function (err, products) {
	        	
		        if (err) {
		        	console.log(err)
		        }
	        var results = products.slice(index, index + count)
	        res.render('results', {
				title: '搜索结果列表页',
				keyword: q,
				currentPage: page + 1,
				query: 'q=' + q,
				totalPage: Math.ceil(products.length / count),
				products: results
	        })
	    })
    }  	
}

exports.mobile = function(req,res){
	res.render('m',{
		title:'移动端首页'
	})
}