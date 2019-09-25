### URL模块

这个模块可以帮助我们解析url地址，从里面提取很多有用的内容供我们使用；

url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

会返回一个解析后的对象，第一个参数为要解析的url地址，第二个参数为是否将query字符串解析成对象格式，第二个参数来控制在没有协议的情况下，是否解析域名等内容

url.format(urlObject)

将一个url解析后的对象还原成一个url地址

url.resolve(from, to)

可以将我们两段url解析成一个url地址


```
console.log(url.resolve('http://www.baidu.com','/api/index.html'))
//'http://www.baidu.com/api/index.html'
```

---
### queryString

可以将我们的queryString字符串(a=1&b=2&c=3)解析或反编译

querystring.stringify(obj[, sep[, eq[, options]]]):

可以将一个对象（键值对）解析成一个querystring,第二个参数可以设置分割符号（&）,第三个参数确定键值对之间的链接符号（=）

querystring.parse(str[, sep[, eq[, options]]])

可以将一个qs字符串解析成一个对象，后面的参数是按照某种规则去解析

querystring.escape(str),querystring.unescape(str)

可以将我们的中文解析成百分号编码

```
console.log(qs.escape('北京'))//%E5%8C%97%E4%BA%AC
console.log(qs.unescape('%E5%8C%97%E4%BA%AC'))//北京


```

---
### http小爬虫

利用http.get方法去获取到某网址的html文件内容，然后利用cheerio工具进行关键内容的提取


1.引入模块和设置全局变量

```
//引入https模块（因为需要爬取的网址协议是https）
var https=require('https');
//cheerio模块是可以将一段html字符串解析成模拟的jq对象，使用jq方法来进行操作
var cheerio=require('cheerio');
//需要爬取的网址
var url='https://www.lagou.com/';

```

2.请求数据

get方法可以模拟请求，获取到某个网址下的文件的内容，第一个参数url地址（要爬取的网址），回调函数里会返回一个res对象，可以给res对象绑定一些事件来进行操作
```

https.get(url,function(res){
	//存储我们爬取到的内容
	var html='';
	
	//data事件会在爬取到内容的时候触发多次，每一都会在回调函数里返回chunk（部分内容）
	res.on('data',function(chunk){
		html+=chunk;
	})
	//end事件会在全部爬取完毕后触发
	res.on('end',function(){
		//过滤出菜单内容
		var menuData=filterMenu(html);
		//输出菜单内容
		controlMenu(menuData)
	})
	//error事件在出现错误后触发，返回错误信息
	res.on("error",function(err){
		console.log(err)
	})
});
```
3.设计数据结构


```
//设计的解析结构
//[
//	{
//		menuTitle:'技术',
//		menuList:[
//			'java','php'
//		]
//	}
//]
```

4.解析html字符串并提取内容的函数


```
function filterMenu(html){
	//将html字符串解析成模拟jq对象
	var $=cheerio.load(html);
	//存放菜单数据的数组
	var menuData=[];
	//获取到所有的菜单dom
	var menu=$(".menu_main");
	//遍历，过滤，提取
	menu.each(function(i,value){
		var menuTitle=$(value).find('h2').text();
		var menuLists=$(value).find('a');
		var menuList=[];
		menuLists.each(function(i,value){
			menuList.push($(value).text())
		})
		menuData.push({
			menuTitle:menuTitle,
			menuList:menuList
		})
	})
	 
	 return menuData;
	
}
```
5.处理提取后内容的函数，这里只做了输出

```
//处理过滤完成后菜单数据的函数
function controlMenu(menu){
	menu.forEach(function(item,index){
		console.log(item.menuTitle+'\n');
		item.menuList.forEach(function(item,index){
			console.log(item+'\n');
			
		})
	})
}

```

关键技术点：https，https.get，data、end、error事件，cheerio模块

---
### requestGet/requestPost

通过request来get数据（请求的是豆瓣电影的api）：

1.引入模块和设置全局变量


```
//引入https模块
const https = require('https');
//配置请求的选项
//http的服务器的默认端口是80，https的服务器默认端口是443
var options = {
  hostname: 'api.douban.com',
  port: 443,
  path: '/v2/movie/in_theaters',
  method: 'GET'
};
```
2.设置请求的过程

```
//发送请求并赋值变量
var req = https.request(options, (res) => {
  console.log('状态码：', res.statusCode);
  console.log('请求头：', res.headers);

  var requestData='';
  res.on('data', (chunk) => {
  	requestData+=chunk;
  });
  
  res.on('end',function(){
  	console.log(JSON.parse(requestData).subjects[0].title)
  })
  
});
//绑定错误处理事件
req.on('error', (e) => {
  console.error(e);
});
//请求完成后end结束
req.end();
```


通过request的post方法来刷评论（扣丁学堂）：

1.引入模块和设置全局变量

```
//引入http模块和qs模块
const http = require('http');
const qs=require('querystring');
//要发送的数据，需要解析成querystring（a=1&b=2）
var postData=qs.stringify({
	'question[title]':'1701表示很满意',
	'question[content]':'<p>1701表示很满意</p>',
	'question[courseId]':'221',
	'question[lessonId]':'1698',
	'_csrf_token':'4df960e69a84f1a05b551cd66cff159f7bd70349'
})
```
2.配置请求的选项
```
var options = {
  hostname: 'www.codingke.com',
  port: 80,
  path: '/ajax/create/course/question',
  method: 'POST',
	headers:{//这个例子需要传入headers，因为在cookie里保存了我们的登陆信息，没有登陆信息的话是不能评论的
		'Accept':'*/*',
			'Accept-Encoding':'gzip, deflate',
			'Accept-Language':'zh-CN,zh;q=0.8',
			'Connection':'keep-alive',
			'Content-Length':postData.length,
			'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
			'Cookie':'PHPSESSID=a7hmtvdr7odale2npuoe8kquo1; UM_distinctid=15bcc291625965-0b7625ecfa7e2b-4e47052e-100200-15bcc29162651c; CNZZDATA1256018185=1628677493-1493778687-null%7C1493778687; Hm_lvt_9f92046de4640f3c08cf26535ffdd93c=1493778896; Hm_lpvt_9f92046de4640f3c08cf26535ffdd93c=1493778931',
			'Host':'www.codingke.com',
			'Origin':'http://www.codingke.com',
			'Referer':'http://www.codingke.com/v/326-chapter-221-course',
			'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
			'X-CSRF-Token':'4df960e69a84f1a05b551cd66cff159f7bd70349',
			'X-Requested-With':'XMLHttpRequest'
	}
};
```
3.设置发送步骤

```
//发送请求并赋值变量
var req = http.request(options, (res) => {

  res.on('data', (chunk) => {
  	console.log(chunk.toString())
  });
  
  res.on('end',function(){
  	console.log('发送成功')
  })
  
});
//绑定错误处理事件
req.on('error', (e) => {
  console.error(e);
});
//发送数据
req.write(postData)
//请求完成后end结束
req.end();
```


---
### event_emitter

nodejs是事件驱动的，比如前面res就有data、end事件，我们也可以创建一个对象，给它定义一些事件，在某种情况下去触发这个事件

依靠的是events模块，请求到的啊eventEmitter类


```

//引入EventEmitter模块，这是一个类class
const EventEmitter=require('events')

//创建一个Player类来继承EventEmitter类
class Player extends EventEmitter {};

//实例化一个播放器对象
var player=new Player();
//给播放器对象添加一个事件
player.on("play",(name)=>{
	console.log('正在播放:'+name)
})
//在某种情况下触发这个事件
player.emit('play','大头儿子小头爸爸');
```


---
### fileStystem



---
### stream















