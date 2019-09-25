---
### mongoDB

这是一个数据库，与MySQL的区别就是，它是一个非关系型数据库  NoSql数据库

#### 1.安装MongoDB

下载对应版本的mongodb来进行安装，安装的后注意需要手动设置数据库的位置。。。详细请搜索

1.在安装的时候选择安装地址，一般情况下安装在c盘（默认安装地址）即可

2.我们在c盘（最好）建立一个data文件夹，在data文件夹下面再建立一个db文件夹

3.在mongodb的bin文件夹下，cmd执行 mongod.exe --dbpath c:\data\db

4.运行mongod.exe来启动mongodb

5.依然在mongodb的bin文件夹下cmd 输入mongo回车，就可以操作mongodb，例如 show databases;

#### 2.MongoDB概念

MongoDB是一个基于分布式文件存储的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。

它的特点:高性能、易部署、易使用，存储数据非常方便。


#### 3.专业术语

SQL术语、概念 | MongoDB术语、概念 | 说明
---|---|---
database | database | 数据库
table | collection | 表\集合
row | doucument | 数据记录行\文档
column | field | 数据字段\域
index | index | 索引
table joins |  | 表连接 mongodb不支持
primary key | primary key | 主键，mongodb自动将_id作为主键

#### 4.mongodb的存储数据类似于js的json格式对象，或者json文件存储数据的方式：

```
{
    "_id":ObjectId("1726iuhas678971726731"),
    "age":25,
    "city":"beijing",
    "email":"asdgakj@qq.com"
},
{
    "_id":ObjectId("1726iuhas678971726731"),
    "age":25,
    "city":"beijing",
    "email":"asdgakj@qq.com"
}
```

#### 5.数据库

一个mongodb中可以建立多个数据库。

MongoDB的默认数据库为"db"，该数据库存储在data目录中。

MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

#### 6.简单操作

show databases 查看数据库

db 查看当前数据库

use name 切换某个数据库


#### 7.文档
文档是一个键值(key-value)对(即BSON)。

MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。
一个简单的文档例子如下：
{"genres": ["犯罪","剧情" ],"title": "肖申克的救赎"}

#### 8.集合

集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表格。

集合存在于数据库中，集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据，但通常情况下我们插入集合的数据都会有一定的关联性。

{
    'title':['aaa',"aaa","aaa",["a":{}]]
},
{
    'title':'bbb'
}

#### 9.数据类型

String : 这是最常用的数据类型来存储数据。在MongoDB中的字符串必须是有效的UTF-8。

Integer : 这种类型是用来存储一个数值。整数可以是32位或64位，这取决于您的服务器。

Boolean : 此类型用于存储一个布尔值 (true/ false) 。

Double : 这种类型是用来存储浮点值。

Min/ Max keys : 这种类型被用来对BSON元素的最低和最高值比较。

Arrays : 使用此类型的数组或列表或多个值存储到一个键。

Timestamp : 时间戳。这可以方便记录时的文件已被修改或添加。

Object : 此数据类型用于嵌入式的文件。

Null : 这种类型是用来存储一个Null值。

Symbol : 此数据类型用于字符串相同，但它通常是保留给特定符号类型的语言使用。

Date : 此数据类型用于存储当前日期或时间的UNIX时间格式。可以指定自己的日期和时间，日期和年，月，日到创建对象。

Object ID : 此数据类型用于存储文档的ID。

Binary data : 此数据类型用于存储二进制数据。

Code : 此数据类型用于存储到文档中的JavaScript代码。

Regular expression : 此数据类型用于存储正则表达式



#### 10.库的操作

* Help查看命令提示

help

db.help()

db.test.help()

db.test.find().help()

* 创建/切换数据库

use music

* 查询数据库

show dbs 空库将不会显示

db.albums.insertOne({'title':'bey bey'})来插入一条后再看

* 查看当前使用的数据库

db/db.getName()

* 显示当前DB状态

db.stats()

* 查看当前DB版本

db.version()

* 查看当前DB的链接机器地址

db.getMongo()

* 删除数据库

db.dropDatabase()

#### Collection聚集集合操作


创建一个聚集集合

db.createCollection("collName", {size（集合大小）: 20, capped（固定大小，可提高使用效率）: true, max（最大值）: 100});

db.collName.isCapped(); //判断集合是否为定容量

得到指定名称的聚集集合

db.getCollection("account");

得到当前db的所有聚集集合

db.getCollectionNames();

显示当前db所有聚集的状态

db.printCollectionStats();

### 添加、修改与删除集合数据

查看

db.users.find()

添加

db.users.save({name: ‘zhangsan', age: 25, sex: true});

db.users.insertOne({name: ‘zhangsan', age: 25, sex: true});

db.users.insertMany([{name: ‘zhangsan', age: 25, sex: true},{name: ‘zhangsan', age: 25, sex: true}]);

修改



db.users.update({age: 25}(约定条件，全部修改只写{}), {$set: {name: 'changeName',sex:1}}, false, true);

第三个参数为，如果没有这个数据，会不会创建，第四个参数为，如果有很多，是要全改true，还是只改第一条

相当于：update users set name = ‘changeName' where age = 25;

db.users.update({name: 'Lisi'}, {$inc: {age: 50}}, false, true);

相当于：update users set age = age + 50 where name = ‘Lisi';

db.users.update({name: 'Lisi'}, {$inc: {age: 50}, $set: {name: 'hoho'}}, false, true);

相当于：update users set age = age + 50, name = ‘hoho' where name = ‘Lisi';


删除

db.users.remove({age: 32});符合条件全删
db.users.remove({age: 132}，{justone:true});只删一条
db.users.remove({});删除所有document


查询修改删除


```
db.users.findAndModify({
    query: {age: {$gte: 25}}, 
    sort: {age: -1}, 
    update: {$set: {name: 'a2'}, $inc: {age: 2}},
    remove: true
});

db.runCommand({ findandmodify : "users", 
    query: {age: {$gte: 25}}, 
    sort: {age: -1}, 
    update: {$set: {name: 'a2'}, $inc: {age: 2}},
    remove: true
});
```
query 过滤条件 $gte大于

sort如果多个文档符合查询过滤条件，将以该参数指定的排列方式选择出排在首位的对象，该对象将被操作，-1位为降序

remove 若为true，被选中对象将在返回前被删除

update 一个 修改器对象

remove 创建新对象若查询结果为空



#### 聚集集合查询

查询所有记录


db.userInfo.find();

相当于：select* from userInfo;

查询去重后数据

db.userInfo.distinct("name");

相当于：select distict name from userInfo;

查询age = 22的记录

db.userInfo.find({"age": 22});

相当于： select * from userInfo where age = 22;

查询age > 22的记录

db.userInfo.find({age: {$gt: 22}});

相当于：select * from userInfo where age >22;

查询age < 22的记录

db.userInfo.find({age: {$lt: 22}});

相当于：select * from userInfo where age <22;


查询age >= 25的记录

db.userInfo.find({age: {$gte: 25}});

相当于：select * from userInfo where age >= 25;

查询age <= 25的记录

db.userInfo.find({age: {$lte: 25}});

查询age >= 23 并且 age <= 26

db.userInfo.find({age: {$gte: 23, $lte: 26}});

查询name中包含 mongo的数据

db.userInfo.find({name: /^mongo/});

//相当于%%
select * from userInfo where name like ‘%mongo%’;

查询name中以mongo开头的

db.userInfo.find({name: /^mongo/});

相当于select * from userInfo where name like ‘mongo%’;


查询指定列name、age数据

db.userInfo.find({}, {name: 1, age: 1});

相当于：select name, age from userInfo;

查询指定列name、age数据, age > 25

db.userInfo.find({age: {$gt: 25}}, {name: 1, age: 1});

相当于：select name, age from userInfo where age >25;

按照年龄排序

升序：db.userInfo.find().sort({age: 1});

降序：db.userInfo.find().sort({age: -1});

查询name = zhangsan, age = 22的数据

db.userInfo.find({name: 'zhangsan', age: 22});

相当于：select * from userInfo where name = ‘zhangsan' and age = 
’22';

查询前5条数据

db.userInfo.find().limit(5);

相当于：select top 5 * from userInfo;



查询10条以后的数据

db.userInfo.find().skip(10);

相当于：select * from userInfo where id not in (
   select top 10 * from userInfo
);

查询在5-10之间的数据

db.userInfo.find().limit(10).skip(5);

or与 查询

db.userInfo.find({$or: [{age: 22}, {age: 25}]});

相当于：select * from userInfo where age = 22 or age = 25;

查询第一条数据

db.userInfo.findOne();

相当于：selecttop 1 * from userInfo;

db.userInfo.find().limit(1);

查询某个结果集的记录条数

db.userInfo.find({age: {$gte: 25}}).count();

相当于：select count(*) from userInfo where age >= 20;



