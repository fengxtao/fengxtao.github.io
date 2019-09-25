### 创建一个路由

后端路由：根据不同的请求返回不同的数据 

server.js:

```

var http=require("http");
var url=require("url");
var router=require("./modules/router");

//创建一个服务
http.createServer((req,res)=>{
	//客户端请求的详细地址（req.url），用url模块解析之后的结果
	var urlObj=url.parse(req.url,true,true)
	//获取到pathname，并且去掉'/'
	var pathname=urlObj.pathname.substr(1);

	//如果是浏览器默认请求的favicon.ico，就让它返回404
	if(pathname=='favicon.ico'){
		router.responseError(res);
	}else{
		//如果客户端直接访问的是域名加端口，相当于访问首页
		if(pathname==''){
			router['sources']('index.html',res);
		}else{
			router['sources'](pathname,res);
		}		
	}
}).listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000')
})

```

router.js:

```
var fs=require("fs");

var router={
	//处理客户端资源类型的请求的方法
	'sources':function(pathname,res){
		var that=this;
		//得到后缀名
		var ext=pathname.split('.')[1];
		//根据后缀名去不同的处理
		if(ext=='html'){
			that.responseFile(pathname,res,'html')
		}else if(ext=='jpg'||ext=='png'){
			that.responseFile(pathname,res,'img')
		}		
	},
	responseError:function(res){
		res.writeHead(404,{"content-Type":'text/plain'})
		res.write('source is not found')
		res.end()
	},
	responseFile:function(pathname,res,type){
		var that=this;
		//读取资源
		fs.readFile('static/'+type+'/'+pathname,function(err,data){
			if(err){
				//如果无此资源，返回404
				that.responseError(res)
			}else{	
				//将资源内容响应回去
				res.writeHead(200,{"content-Type":that.getContentType(type)})
				res.write(data)
				res.end()
			}
		})
	},
	getContentType:function(type){//根据类型设置content-Type
		var contentType='';
		if(type=='html'){
			contentType='text/html;charset=utf-8'
		}else if(type=='img'){
			contentType='image/jpeg'
		}else{
			contentType='text/plain'
		}
		return contentType;
	}
}

module.exports=router;
```
