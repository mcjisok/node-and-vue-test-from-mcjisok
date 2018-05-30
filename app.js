// import { request } from 'http';

var express = require('express')
var path = require('path')
var mongoose = require('mongoose')  //获取Mongodb


var cookieParser = require('cookie-parser') //express 4.X版本里 cookie-parser和seesion需单独安装
var session = require('express-session')
var logger = require('morgan');
var mongoStore = require('connect-mongo')(session)//引用connect-mongo做持久会话  这一句要写在session后面（必须）

var cors = require('cors')

var port = process.env.PORT || 4000
var app = express()

var bodyParser = require('body-parser')
var multipart = require('multipart')
var dbUrl = 'mongodb://localhost/test' //本地数据库地址
app.locals.moment = require('moment')
// mongoose.connect('mongodb://localhost/test',{useMongoClient:true})
mongoose.Promise = global.Promise;  
mongoose.connect(dbUrl,{useMongoClient:true})


app.set('views','./app/views/pages')
app.set('view engine','jade')

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(require('connect-multiparty')())
app.use(session({
	secret:'imooc',
	store: new mongoStore({
		url:dbUrl, 
		collection:'session'
	})
}))
app.use(cors());

if('development' === app.get('env')){
	app.set('showStackError',true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}

require('./config/routes')(app)		//引入路由

app.listen(port)
app.locals.moment = require('moment')
console.log('imooc started on port' + port)


