#### nodejs 连接mongodb


```
var mongodb = require('mongodb')

// 创建数据库服务的链接
var server = new mongodb.Server(
  'localhost',
  27017,
  { auto_reconnect: true}
)

// 创建数据的连接
var db = new mongodb.Db(
  'movies',
  server,
  { safe: true }
)

// 测试数据库连接
db.open(function(err, db){
  if (err) {
    console.log('log-' + err)
  } else {
    console.log('log-connect mongodb success!')
    db.collection('movie', {safe: true}, function(err, conn){
      if (err) {
        console.log(err)
      } else {
        conn.find({}, {title:1, year:1, _id:0}).limit(3).skip(3).toArray(function(err, res){
          if(!err) {
            res.forEach(function(value){
              console.log(value.title)
            })
          }
        })
      }
    })
  }
})
```












### 什么是express

基于 Node.js 平台，快速、开放、极简的 web 开发框架。

---
### 安装express

全局安装express：

express -g    

express-generator -g   (做兼容)

---
### 创建一个express模板：

express -e express

进入项目目录后下载依赖工具和包

cd express->npm install

body-parser 解析前端提交的数据

cookie-parser 解析cookie

debug 显示调试信息，可以代替console.log

ejs express模板，渲染页面

morgan 日志，在控制台显示request数据

server-favicon 解决favicon.ico的问题

运行项目

npm run start

---
### 解析模板文件

详细请看视频

---

### EJS

#### 什么是ejs：

ejs是一个简单高效的模板语言，通过数据和模板，可以生成html标记文本，可以说ejs是一个js库，ejs可以运行在客户端和服务器端，客户端安装直接用引入文件即可，服务端要用npm包安装

#### ejs的特点：

* 快速编译和渲染
* 简单的模板标签
* 自定义标记分隔符
* 支持文本包含
* 支持浏览器端和服务器端
* 模板静态缓存
* 支持express视图系统

#### ejs的成员函数

render(str,data,[,option]),直接渲染并生成html

str：要解析的字符串模板

data：数据

options：配置选项

#### ejs的常用标签

1. <%  %> 流程控制标签 可以在里面写写原生js
2. <%=  %> 输出标签（原文输出html标签）
3. <%-  %> 输出标签 （html会被浏览器解析）
4. <%#  %> 注释标签
5. %  对标记进行转义
6. <% include('a.ejs') %> 可以在一个ejs中引入另一个ejs