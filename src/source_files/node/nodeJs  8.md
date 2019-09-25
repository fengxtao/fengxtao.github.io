### 评论功能-添加评论

#### 设置comment路由

同登陆等路由的设置，但是我们comment路由是设置的一级路由

app.js：
```
var comment=require('./routes/comment');
app.use('/comment',comment);
```

#### 创建comment.ejs的模板

模板里的表单提交到/comemnt/submit下，post方法：


```
<form action="/comment/submit" method="post" class="col-xs-12 col-sm-6 col-sm-offset-3">
   <div class="form-group">
   	<label for="title">标题：</label>
   	<input type="text" name="title" id="title" class="form-control" />
   </div>
   <div class="form-group">
   	<label for="content">内容：</label>
   	<textarea type="text" name="content" id="content" class="form-control" rows="10"></textarea>
   </div>
   <div class="form-group">
   	<button type="submit" class="btn btn-success">提交</button>
   	<button type="reset" class="btn btn-default">重置</button>
   </div>
</form>
```

#### 设置提交数据的路由/comment/submit

comment.js:

路由设置：

插入评论成功后跳转到评论列表
```
router.post('/submit',function(req,res){
	var username=req.session.username||'';
	//登陆判断
	if(username){
		//要入库的信息
		var info={
			username:username,
			title:req.body['title'],
			content:req.body['content']
		}
		//连接数据库
		MongoClient.connect(DB_CONN_STR,function(err,db){
		  	if(err){
		  		console.log(err);
		  	}else{
		  		insertData(info,db,function(results){
		  			//插入数据后，跳转到评论列表
		  			res.redirect('/comment/list');
		  			db.close()
		  		})
		  		
		  	}
		  })
	}else{
		res.send('<script>alert("登陆信息已过期，请重新登陆");location.href="/login"</script>')
	}
	
})
```
插入数据的函数：

使用了async第三方模块来管理异步函数的依赖情况

```
var insertData=function(info,db,callback){
	//获取存放评论的集合
	var conn=db.collection('comment');
	//获取存放评论id的集合
	var ids=db.collection('ids');
	
	//使用async模块来管理异步函数之间的相互依赖
//	{name:'comment',id:0}
	async.waterfall([
		function(nextFun){//获得ids里的id并++
			ids.findAndModify(
				{name:'comment'},
				[["_id","desc"]],
				{$inc:{id:1}},
				function(err,results){
					var new_id=results.value.id;
					nextFun(null,new_id)
				}
			)
		},
		function(id,finishFun){//给comment里插入数据			
			var data=[{title:info.title,content:info.content,username:info.username,uid:id}];
			conn.insert(data,function(err,results){
				if(err){console.log(err)}else{
					finishFun(null,results)
				}
			})			
		}
	],function(err,results){
		callback(results)
	})
}
```
---

### 评论列表

#### 评论列表的显示

1.配置路由及模板，同其他

路由：


```
//评论列表
router.get('/list',function(req,res){
	var username=req.session.username||'';
	//登陆判断
	if(username){
		//要入库的信息
		
		var pageInfo={
			pageNum:req.query['pageNum']||1,//第几页
			pageSize:req.query['pageSize']||10,//一页有多少
			count:0,//当前查询多少
			totalPage:0//总页数
		}
		
		
		MongoClient.connect(DB_CONN_STR,function(err,db){
		  	if(err){
		  		console.log(err);
		  	}else{
		  		findData(pageInfo,db,function(results){
		  			res.render('list',{
						title: 'Express + MongoDB',
						comments:results[1]
					})
		  		})
		  		
		  	}
		})
				
	}else{
		res.send('<script>alert("登陆信息已过期，请重新登陆");location.href="/login"</script>')
	}
})
```
获取数据的函数：


```
function findData(pageInfo,db,callback){
	var conn=db.collection('comment');
	async.series([
		function(nextFun){//获取到所有的数据，将pageInfo进行设置
			conn.find({}).toArray(function(err,results){			
				if(err){console.log(err)}else{
					pageInfo.totalPage=Math.ceil(results.length/pageInfo.pageSize);
					pageInfo.count=results.length;
					pageInfo.pageNum=pageInfo.pageNum<=0?1:pageInfo.pageNum;
					pageInfo.pageNum=pageInfo.pageNum>pageInfo.totalPage?pageInfo.totalPage:pageInfo.pageNum;
					nextFun(null,'');
				}
			})
		},
		function(finishFun){//从全部数据里找出对应的数据
			conn.find({}).sort({_id:-1}).skip((pageInfo.pageNum-1)*pageInfo.pageSize).limit(pageInfo.pageSize).toArray(function(err,results){
				finishFun(null,results)
			})
		}
	],function(err,results){
		callback(results)
	})
	
}
```

ejs模板内容：

```
<% comments.forEach(function(comment,index){ %>
   		
	<tr>
		<td><%= (index+1) %></td>
		<td><%= comment.title %></td>
		<td><%= comment.content %></td>
		<td><%= comment.username %></td>
	</tr>
	
<% }) %>
```
