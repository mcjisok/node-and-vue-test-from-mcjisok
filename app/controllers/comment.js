var Comment = require('../models/comment') //获取模型

// comment
exports.save = function(req,res){
	//console.log(req)
	//res.redirect('/movie/'+_movie.id)
	console.log(req.body)
	var _comment = req.body.comment
	var productId = _comment.product
	//console.log(req.body.movie)
	var comment = new Comment(_comment)
	
	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			var reply = {
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			}

			comment.reply.push(reply)
			console.log('reply里面的数据为：' + comment)
			comment.save(function(err,comment){
				if(err){
					console.log(err)
				}

				res.redirect('/movie/' + productId)
			})
		})
	}
	else{
		comment.save(function(err,comment){
			if(err){
				console.log(err)
			}

			res.redirect('/movie/' + productId)
		})
	}
	
	
}
