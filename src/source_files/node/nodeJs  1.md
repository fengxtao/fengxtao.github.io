### 什么是nodeJs

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

node是使用C++编写的基于V8引擎的JS运行环境，同时提供了很多基于ECMAScript的扩展对象。

Node.js 的包管理器 npm，成为世界上最大的开放源代码的生态系统。

Node.js 可以解析JS代码（没有浏览器安全级别的限制）提供很多系统级别的API，如：

* 文件的读写
* 进程的管理
* 网络通信
* ...

nodejs是基于ECMAScript语言开发的服务端语言，可以编写独立的服务端应用，也可以向客户端提供Web内容，无需借助与任何Web服务器（apache）可以去连接文件系统，还能操作数据库。

---

### 为什么要学习nodeJs

对于咱们来说，一种语言通吃前后端，并且可以增加咱们的竞争力

==nodejs适合高并发、I/O密集型，可伸缩的网路应用，数据写入读取的应用比较好==

==nodejs不适合CPU密集型的应用，各种计算的就不太适合==

---

### nodeJs 学习网站

1.[nodejs官网](https://nodejs.org/)

我们可以在这里下载node，查看api，版本更新日志等动态

2.[npm官网](https://www.npmjs.com/)

我们可以在这这里查找很多很多的node模块去学习

3.[github官网](https://github.com/)

4.[stackoverflow](http://stackoverflow.com/)

---

### nodeJs安装

nodeJs版本：

LTS指的是long time support 也就是长期支持版本，推荐大家安装

Current是现在最新的版本。

一般来说，偶数位为稳定版本，奇数位为非稳定版本

---

### 搭建第一个node服务器

我们在项目目录下建立一个server.js文件：

```
const http=require("http");

const hostname="127.0.0.1";
const port=1234;

const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader("content-Type",'text/plain');
	res.end("Hello,world\n")
});

server.listen(port,hostname,()=>{
	console.log(`Server running at http://${hostname}:${port}/`);
})

```

在控制台里输入node server+回车，这时，我们的服务就启动了

这只是一个简单的例子，里面的代码我们后面都会详细再介绍

---

### 命令行 的体验

这次我们尝试在命令行来运行我们的js代码


chrome浏览器的V8引擎console控制台里可以运行js代码

在命令行中输入node后回车，大家会发现这个时候我们的控制台就像chrome浏览器里一样可以运行js代码了，其实这里就是node离的V8引擎解析js代码的情况。

但是现在有这样一个情况，浏览器段有BOM和DOM对象，在node里是没有的，也就是没有window等相关的对象。

同样在node端有process等全局对象，浏览器段却没有

---

### hello world

现在我们来创建一个hello.js文件

在这里我们换一种写法来搭建服务器，也来返回helloworld，并且呢，我们来处理一个小小的问题，就是ico的问题


```
var http=require('http');

http.createServer(function(req,res){
	res.writeHead(200,{'content-Type':'text/html;charset=utf-8'});
	
//	console.log('hello world');
//	res.write('hello world');
//	res.end();
	
	console.log(req.url)
	
	if(req.url!=='/favicon.ico'){
		console.log('hello world');
		res.write('hello world');
		res.end();
	}
}).listen(3000);
console.log('server is running');


```

---

### 模块和包管理工具

现在我们想做这样一个事情，就是封装一个专门在页面中输入hello——world的函数，写在我们的服务模块上的话会影响我们的编程思路，因为会比较乱，那么我们怎么办呢？

其实这样的问题一直存在于我们的编程中，我们通常也就是分成单个的js文件来引入，但是这样的话又要考虑命名冲突、依赖关系等等的问题

nodeJs让我们使用一套CommonJs规范来解决这些问题：

按照规范来定义模块，暴露接口，引用模块

在node里的很多工具、包也都是在使用这个规范，也就是说学习这个规范是很有必要的。

我们可以使用npm这个工具来安装很多很多的包、工具，通过npm install方法来安装，安装好的内容会放到node_modules文件夹里

下面我们来尝试一下，

这里是我们的模块：

```
//定义模块
 var util={};
 
 util.sayHello=function(){
 	return 'hello nodeJs'
 }
 
 util.add=function(x,y){
 	return x+y;
 }
//暴露接口
module.exports=util;
```
这里是我们使用模块的地方：



```
var http=require('http');
var util=require('./4.util');//引入模块

http.createServer(function(req,res){
	res.writeHead(200,{'content-Type':'text/html;charset=utf-8'});	
	if(req.url!=='/favicon.ico'){
		res.write(util.sayHello()+'<br/>');//使用模块
		res.write(util.add(1,2)+'<br/>');
		res.end();
	}
}).listen(3000);
```

有一个需要注意的地方，就是reswrite的时候需放入的是字符串

require引入模块的时候，node内置的模块我们直接写模块名，自定义模块的话我们要写路径，需要引入包的时候（用npm下载的，或者在node_modules文件夹里的），我们也直接写模块名就好。

使用module.exports暴露接口的时候我们可以暴露任何数据类型的任何东西，需要注意的是，不暴露的数据是模块内部数据，不会在引入模块的文件里使用。

module.exports其实是直接暴露出一个module的实例，并将实例赋值：


```
module.exports=util;
```
我们还可以这么做：
```
exports.sayHello=util.sayHello;
exports.add=util.add;
```
这样的话我们并没有重写module的实例，只是为他添加了几个方法；

在引入模块的时候，可能我们的模块有很多方法，我们也可以单个引入其中的几个：
```

var sayHello=require('./4.util').sayHello;
var add=require('./4.util').add;

```

这就是Commonjs的使用细节，希望大家都要记住哟。

---

### NPM使用入门

npm 就是node package manager node的包管理工具

我们通过npm install 模块 来安装模块，缩写：npm i 模块,注意，低版本的node可能需要npm init先来创建一个package.json文件，这也是我推荐的

卸载的话就是unintsall，全局安装（大多是工具，例如gulp等） -g（全写上是--global）

在在本地（当前目录上）安装（大多是包）不需要加-g

使用npm list 可以查看现在安装了的一些东西,npm list | grep 模块 可以查看其中某个模块的信息

使用npm info 模块  可以查看模块的信息及历史版本

使用npm install 模块@版本号 可以来安装对应的版本的模块包，原包就会被覆盖


#### package.json相关：

我们可以通过npm init来创建package.json文件，这个文件可以来管理我们的项目依赖的包的信息

devDependencies是开发依赖，也就是只在开发的时候使用的包 --save-dev （-D），depedencies是我们打包的时候依然使用的包--save （-S）

这个文件还有一个好处，就是使我们的项目有辨识性，我们在某些情况下，需要将项目提交给某个地方或者共享给某人，这个时候我们不需要提交node——modules文件夹，只需要在那个地方执行npm install 就可以安装package.json里所有的包，使我们的项目可以继续运行

#### 源相关：

我们可以全局安装nrm这个工具来管理我们的源（就是下载地址），

nrm ls可以查看我们可以使用的源

nrm test可以来测试我们可以使用的源的速度

nrm use 源   可以来切换我们使用的源.


#### 清楚缓存

有的时候我们因为下载报错或者某种原因，需要重新下载的时候，结果依然报错，我们排除掉网络等原因后，可以尝试通过执行npm cache clear 来清除掉npm的缓存。

