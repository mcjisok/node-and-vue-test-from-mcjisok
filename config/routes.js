var Index = require('../app/controllers/index') 
var User = require('../app/controllers/user') 
var Product = require('../app/controllers/product') 
var Catetory = require('../app/controllers/catetory')
var Comment = require('../app/controllers/comment')  
var Label = require('../app/controllers/label')
var Brand = require('../app/controllers/brand')
var Vue = require('../app/controllers/vue')

module.exports = function(app){
	//持久会话逻辑预处理
	app.use(function(req,res,next){
		var _user = req.session.user   //获取req.session会话里的user变量
		app.locals.user = _user    //如果有登录，就把_user变量赋值给app的本地变量		
		next()
	})

	//首页index
	app.get('/',Index.index)

	//测试页
	app.get('/ceshi',Index.ceshi)

  

	//商品详情页
	app.get('/movie/:id',Product.detail)
	//后台录入页
	app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Product.new)
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Product.update)

	//获取二级类目
	app.post('/getchildcate',User.signinRequired, User.adminRequired, Catetory.getchildcate)
	//商品详情图上传
	app.get('/admin/product/detailimg/:id',User.signinRequired, User.adminRequired,Product.detailimg)


	// admin post movie
	app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Product.save)
	//列表页
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Product.list)
	//列表页筛选
	app.post('/list_search', User.signinRequired, User.adminRequired, Product.list_search)
	//个人商品列表页
	app.get('/admin/movie/personal_list',User.signinRequired, User.adminRequired,Product.person_list)
	//列表页删除后跳转的路由
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Product.del)

 	//上传商品主图
 	//app.post('/uploadimage',Product.uploadImage)
 	//上传商品详情图
 	app.post('/detailimg_upload/:productid',Product.detailimg_upload)
 	//删除商品详情图
 	app.post('/del_detailimg/:id',Product.del_detailimg)
 	//删除商品主图
 	app.post('/del_mainimg/:id',Product.del_mainimg)

 	//上传商品主图
	 app.post('/mainimages_upload/:productid',Product.mainimages_upload)
	 
	//  上传分类banner图
	app.post('/uploadCateBanner', Product.uploadImage)


	//商品标签
	//标签录入页
	app.get('/admin/label/new', User.signinRequired, User.adminRequired, Label.new)

	//提交标签录入信息
	app.post('/admin/label', User.signinRequired, User.adminRequired, Label.save)

	//后台标签列表页
	app.get('/admin/label/list', User.signinRequired, User.adminRequired, Label.list)
 


	//商品品牌
	//品牌录入页
	app.get('/admin/brand/new', User.signinRequired, User.adminRequired, Brand.new)

	//提交品牌录入信息
	app.post('/admin/brand', User.signinRequired, User.adminRequired, Brand.save)

	//后台品牌列表页
	app.get('/admin/brand/list', User.signinRequired, User.adminRequired, Brand.list)



	//商品分类
	//分类录入页
	app.get('/admin/catetory/new', User.signinRequired, User.adminRequired, Catetory.new)
	//提交分类录入信息
	app.post('/admin/catetory', User.signinRequired, User.adminRequired, Catetory.save)
	//分类修改
	app.get('/catetory/update/:id',User.signinRequired, User.adminRequired, Catetory.update)
	//删除二级类目数据
	app.post('/childcate/delete',Catetory.childcateDel)
	//后台分类列表页
	app.get('/admin/catetory/list', User.signinRequired, User.adminRequired, Catetory.list)
	//results
	app.get('/results',Index.search)



 
	//User
	//注册路由
	app.post('/user/singup',User.singup)

	//注册用户列表页
	app.get('/admin/userlist',User.signinRequired, User.adminRequired,User.list)

	//删除用户路由
	app.delete('/admin/userlist', User.signinRequired, User.adminRequired,User.userdel)

	//登录页
	app.post('/user/singin', User.singin)

	//注销
	app.get('/user/logout',User.logout)

	app.get('/signin',User.showSignin)

	app.get('/signup',User.showSignup)

	

	// 移动端
	// 首页
	// app.get('/m', Index.m_index)
	// 分类页
	app.get('/m/category', Product.m_category)
	// 切换右侧商品内容ajax
	app.post('/m/childprd', Product.m_childprd)

	

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

	//vue api
	app.get('/vue_api/category',Vue.category)
	app.post('/vue_api/childcate',Vue.childcate)
	//子类目商品列表
	app.get('/vue_api/goodlist_child/:id',Vue.goodlist_child)

	//获取商品详情
	app.get('/vue_api/gooddetail/:id',Vue.gooddetail)

	// 加入购物车
	app.post('/vue_api/addtocart',Vue.addtocart)

	// 获取购物车列表
	app.post('/vue_api/shoppingcart_list',Vue.shoppingcart_list)

	// 购物车内商品数量加减
	app.post('/vue_api/add_minus',Vue.add_minus)

	// 删除购物车内某个商品
	app.post('/vue_api/cartdel',Vue.cart_del)



	// 获取验证码
	app.post('/vue_api/verification',Vue.verification)

	// 移动端用户注册
	app.post('/vue_api/mobile_reg',User.singup)

	// 保存收件地址
	app.post('/vue_api/saveaddress',Vue.saveAddress)

	// 获取收件地址
	app.post('/vue_api/getAddress',Vue.getAddress)

	// 生成订单之前 获取选中的购物车商品列表
	app.post('/vue_api/getToOrderGoodList',Vue.getToOrderGoodList)

	// 个人中心 收货地址页  获取收件地址列表
	app.post('/vue_api/address_list',Vue.address_list)

	//comment评论
	app.post('/user/comment', User.signinRequired, Comment.save )

	// 登录
	app.post('/vue_api/login',User.singin)



	// 移动端前端
	app.get('/m',Index.mobile)
	//404页面
	app.use(function(req,res,next){
		res.status(404)
		res.send('404-Not Found')
	})

}





