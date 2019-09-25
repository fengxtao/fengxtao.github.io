### express 项目实战

#### 注册：

1.创建注册的ejs模板，并且配置register页面的路由

模板：
```
<form action="/users/register" method="post" class="col-xs-12 col-sm-6 col-sm-offset-3">
   <div class="form-group">
   	<label for="">用户名：</label>
   	<input type="text" name="username" class="form-control" />
   </div>
   <div class="form-group">
   	<label for="">密码：</label>
   	<input type="password" name="password" class="form-control" />
   </div>
   <div class="form-group">
   	<label for="">昵称：</label>
   	<input type="text" name="nickname" class="form-control" />
   </div>
   <div class="form-group">
   	<button type="submit" class="btn btn-success">提交</button>
   	<button type="reset" class="btn btn-default">重置</button>
   </div>
</form>
```
路由配置，在index主路由下（router/index.js）配置

```
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express + MongoDB' });
});

```

#### 注册处理

1.配置注册功能的路由

可以看到上面的register.ejs模板里表单提交的地址是在users/register，
所以在user主路由（router/users.js）下进行配置并获取到页面post过来的数据


```
router.post('/register', function(req, res, next) {
  //1.获取到用户传递过来的参数
  	var user={
  		username:req.body['username'],
  		password:req.body['password'],
  		nickname:req.body['nickname']
  	}
  //2.操作数据库 

  
});
```
2.创建一个插入数据的函数

```
//插入数据的函数，插入成功后的结果给交给callback来接受
var insertData=function(user,db,callback){
	//获取到用户的集合
	var conn=db.collection('user');
	//需要插入的数据
	var data={username:user.username,password:user.password,nickname:user.nickname};
	//插入
	conn.insert(data,function(err,results){
			if(err){console.log(err)}else{
				callback(results);
			}
	})
}
```

3.建立数据库的连接

下载mongodb模块 ->  npm install mongodb

设置连接数据库的全局变量


```
//创建连接数据库的对象
var MongoClient=require("mongodb").MongoClient;
//数据库的地址
var DB_CONN_STR="mongodb://127.0.0.1:27017/project";
```
在注册路由里进行数据库连接后的注册处理

注册成功后利用res.redirect方法重定向到登陆路由


```
//连接数据库，回调函数的db就是我们的database对象
MongoClient.connect(DB_CONN_STR,function(err,db){
  if(err){
  	console.log(err);
  }else{
  	console.log('connect is success');
  	insertData(user,db,function(results){
			//如果插入的条数为1条则成功
			if(results.insertedCount==1){
//					res.send('注册成功')
				res.redirect('/login')
			}else{
//					res.send('注册失败')
				res.redirect('/register')
			}
			//断开数据库连接
			db.close();
  	});
  	
  }
})
```


#### 登陆

1.创建登陆模板，配置登陆页面路由（同注册）

2.配置登陆功能路由，同注册

3.创建一个查询数据的函数：


```
//查询数据的函数
var findData=function(user,db,callback){
	//获取到集合
	var conn=db.collection('user');
//	需要查找的数据
	var data={username:user.username,password:user.password};
	//开始查找并将结果装换成数据，返回到callback
	conn.find(data).toArray(function(err,results){
		if(err){
			console.log(err);
		}else{
			callback(results)
		}
	})
}
```
4.在接受到登陆请求的路由操作里进行数据库连接和登陆处理

登陆成功后重定向到首页
```
//2.连接数据库
MongoClient.connect(DB_CONN_STR,function(err,db){
  if(err){
  	console.log(err);
  }else{
  	console.log('connect is success');
  	findData(user,db,function(results){
  		if(results.length>0){
//				res.send('登陆成功')
				res.redirect('/');
				
  		}else{
//				res.send('登陆失败')
				res.redirect('/login')
  		}
  		db.close();
  	})
  	
  }
})
```

#### 登陆状态

当登陆成功后，首页应该显示的是注销按钮，注销之后和登陆之前显示登陆注册按钮

1.下载express-session模块来进行数据的存储

npm install express-session

2.在app.js进行配置


```
var session=require("express-session");

app.use(session({
	secret:'remmond 128 bytes random string',
	cookie:{maxAge:20*1000*60},
	resave:true,
	saveUnitialized:true
}))
```

3.准备存储一个username的数据，可以在index.ejs里根据此数据进行条件判断

在index主路由里设定数据


```
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Express + MongoDB',
  	username:req.session.username
  });
});

```

在index.ejs里进行条件判断

```
<% if(username){ %>
   <div class="form-group">   		
   	<a href="/logout" class="btn btn-success">注销</a>
   </div>
<% } else { %>
   <div class="form-group">
   	<a href="/login" class="btn btn-success">登陆</a>
   	<a href="/register" class="btn btn-success">注册</a>
   </div>
<% } %>
```

在登陆成功后设置此数据为用户名（user.js）


```
req.session.username=results[0].username;
```

#### 注销

当点击注销按钮后，发生请求到/logout，将session.username设置为undefined


```
//注销
router.get('/logout', function(req, res, next) {
  req.session.username=undefined;
  res.redirect('/')
});
```
