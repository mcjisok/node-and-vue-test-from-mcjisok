//注册路由
var User = require('../models/user')
var Shoppingcart = require('../models/shopping_cart')


//signup
exports.showSignup = function(req,res){
	res.render('signup'),{
		title:'登录页面'
	}
}
 
exports.showSignin = function(req,res){
	res.render('signin'),{
		title:'注册页面'
	}
} 

exports.singup = function(req,res){
	//var _user = req.body.user;

	var _username = req.body.username
	var _password = req.body.password

	var data = {
		name:_username,
		password:_password
	}
	console.log('data的内容为：' + data.name)
	// _user = req.body.username
	// _user = req.body.password
	// console.log('请求体：' + req.body)
	// console.log('请求用户名：' + typeof(req.body.username))
	// console.log('请求密码为：' + req.body.password)
	User.findOne({name: data.name}, function (err, user) {
		if (err) {
		  console.log(err);
		}
 
		if (user) {
		  //return res.redirect('/signin');
		  return res.json({results:1})
		} 

		else{
		var user = new User(data);
		user.save(function (err, user) {
			if (err) {
			   console.log(err)
			}

		    return res.json({results:2})
		    
		  })
		}
	})	
}

 
//注册用户列表页
exports.list = function(req,res){
	
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title:'用户列表页',
			users:users
		})
	})
}

//admin中间件
exports.signinRequired = function(req,res,next){
	var user = req.session.user
	if(!user){
		return res.redirect('/signin')
	}	
	next()
}

exports.adminRequired = function(req,res,next){
	var user = req.session.user

	if(user.role <= 10){
		return res.redirect('/signin')
	}
	next()
}


//删除用户
exports.userdel = function(req,res){
	var id = req.query.id
	if(id){
		User.remove({_id:id},function(err,user){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}


//登录页
exports.singin = function(req,res){
	var username = req.body.username
	var password = req.body.password	
	console.log('11111111111111111111111111')
	console.log(username)

	User.findOne({name:username},function(err,user){
		if(err){
			console.log(err)
		}

		//检测用户是否存在
		if(!user){		
			//var faild = '<script>alert("用户不存在")</script>'
			//return res.send(faild)
			return res.json({results:1})
		}

		//密码比对
		user.comparePassword(password,function(err,isMatch){	
			if(err){
				console.log(err)
			}

			if(isMatch){
				req.session.user = user	
				var userid = user._id
				Shoppingcart.count({userID:userid},function(err,count){
					return res.json({code:200,results:2,user:user,shopping_cart_count:count})
				})
			}

			else{
				return res.json({results:3})
			}
		})
	})
}

//登录页logout
exports.logout = function(req,res){
	delete req.session.user//删除会话里保存的user
	//delete app.locals.user//删除app.locals的本地变量
	res.redirect('/')
}

// app.post('/user/singup/:userid',function(req,res){
// 	var _userid = req.params.userid  //params直接拿到变量也就是userid
// 	
// 	
// 	'/user/singup/1111?userid=1234'
// 	var _userid = req.query.userid   //query通过url后面穿的参数拿userid
// 	
// 	如果是表单提交比如POST，则采用req.body.userid拿到userid
// 	console.log(_user)
// })