### mysql

#### 数据库的作用：存储数据，逻辑语言数据类型的数据都会在数据库里存储，资源性文件一般存储的都是路径

#### 数据库存储数据的方式：database 》table》data

#### 操作数据库的sql语句：


```
数据库操作
显示所有的数据库
mysql> show databases;(注意:最后有个 s)

创建数据库
mysql> create database test;

连接数据库
mysql> use test;

查看当前使用的数据库
mysql> select database();

当前数据库包含的表信息
mysql> show tables; (注意:最后有个 s)

删除数据库
mysql> drop database test;





表操作
备注:操作之前使用“use <数据库名>”应连接某个数据库。
建表
命令:create table <表名> (<字段名 1> <类型 1> [,..<字段名 n> <类型 n>]);
例子：
mysql> create table MyClass(
> id int(4) not null primary key auto_increment,
> name char(20) not null,
> sex int(4) not null default '0',
> degree double(16,2));

获取表结构
命令: desc 表名，或者show columns from 表名
例子：
mysql> desc MyClass;
mysql> show columns from MyClass;

删除表
命令:drop table <表名>
例如:删除表名为 MyClass 的表
mysql> drop table MyClass;

插入数据
命令:insert into <表名> [( <字段名 1>[,..<字段名 n > ])] values ( 值 1 )[, ( 值 n )]
例子：
mysql> insert into MyClass(name,sex) values('tom',1);

查询表中的数据
查询所有行
mysql> select * from MyClass;

查询前几行数据
例如:查看表 MyClass 中前 2 行数据
mysql> select * from MyClass order by id limit 0,2;
或者
mysql> select * from MyClass limit 0,2;

删除表中数据
命令:delete from 表名 where 表达式
例如:删除表 MyClass 中编号为 1 的记录
mysql> delete from MyClass where id=1;

修改表中数据
命令:update 表名 set 字段=新值,... where 条件
mysql> update MyClass set name='Mary' where id=1;

在表中增加字段
命令:alter table 表名 add 字段 类型 其他;
例如:在表 MyClass 中添加了一个字段 passtest,类型为 int(4),默认值为 0
mysql> alter table MyClass add passtest int(4) default '0'

更改表名
命令:rename table 原表名 to 新表名;
例如:在表 MyClass 名字更改为 YouClass
mysql> rename table MyClass to YouClass;
```


#### 如何操作数据库：

1. 通过命令行工具


切换到mysql的安装目录下的bin目录，使用mysql -uroot
密码输入正确之后，就会出现“Welcome to the MySQL monitor.  Commands end with ; or \g. ......”字样，
命令行出现“mysql>”字符前缀。现在你就可以使用命令对mysql进行操作了。
mysql的所有命令都以";"或者\g为结束符


2.通过可视化界面

一般安装数据库的时候都会自带一个可视化页面，我们可以在这里可视化操作数据库

3.通过后端语言


---
### NodeJs 操作mysql
1.使用mime第三方模块 来设置content-Type，

mime.lookup（filepath） 可以根据我们的文件路径来返回一个对应的content-Type值

[文档](https://www.npmjs.com/package/mime)

2.依赖mysql第三方模块来操作数据库

[文档](https://www.npmjs.com/package/mysql)；

3.实现登陆、注册功能；








扩展内容：

base64 图片转base64

mime

npm scripts