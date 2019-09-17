
### == 和 === 有什么区别
如果两者类型不同，首先需要进行类型转换。具体流程如下:

1. 首先判断两者类型是否相同，如果相等，判断值是否相等.

2. 如果类型不同，进行类型转换
判断比较的是否是 null 或者是 undefined, 如果是, 返回 true 

3. 判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number

4. 判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断

5. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断
---

### ES6中的class和ES5的类有什么区别
1. ES6 class 内部所有定义的方法都是不可枚举的;
2. ES6 class 必须使用 new 调用;
3. ES6 class 不存在变量提升;
4. ES6 class 默认即是严格模式;
5. ES6 class 子类必须在构造函数中调用super()，这样才有this对象;ES5中类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。
6. 子类的原型属性是对父类的原型属性的一层。
---

### 类数组转化成数组的几种方法
1. Array.from() 

    利用数组的静态方法
2. Array.prototype.slice() 

    利用原型方法
3. [...arrayobj]
    
    利用ES6的语法
---

### 






## 一.什么是es6

> es6 是js语言的下一代标准，15年6月发布，也就是ECMAScript（2015）

> ECMAScript就是JavaScript的国际标准，js是es的实现

---


###### es的历史：

1996年11月，网景公司把js语言提交给国际标准组织ECMA，希望能成为国际标准推广，1997年，ECMA发布ECMAScript 1.0


兼容的不是很好，但是写起来方便也多了很多新的好玩的东西

 编译的话咱们就暂时先用咱们react使引入的哪个browser.js  +   type=‘text/bable’

不用的话也可能能用，但是有的地方就体现不出来了，还是编译的好

为什么要有es6呢？自己想一下去吧..

编译es6的方式：

1.浏览器编译

2.gulp

---





## 二.let 和  const命令


###### 1.let：声明变量，声明的是局部变量

用途及区别：ES6新增了let命令，用来声明变量，类似于var  ，但是声明的变量只在let所在的代码块的内部有效


let不存在变量提升，这个要注意哟


- 暂时性的死区：

只要块级作用域里存在let命令，它所声明的变量就绑定这个区域，不在受外部的影响


- 不允许重复声明

内部的数据有了let声明过之后不允许重复声明


---


###### 2.块级作用域

为什么需要块级作用域：

es5只有全局作用域和函数作用域，这样会造成一些不合理的地方

1>.内部数据覆盖外部数据的情况

2>.用来计数的循环变量泄露成全局变量

虽然没有专业的定义词语来创建块级作用域，但是只要内部用了let，就说明一个块级作用域存在了，也就是说let命令为es6增加了块级作用域

在以往我们为了让变量执行完成后就销毁不要浪费内存，会把大段的代码放到立即执行函数里，而现在，我们只需要一个块级作用域就好了



---


###### 3.const  ：

声明只读常量  一旦声明就不能进行更改，使用起来和var，let定义的的变量一样，也是属于块级的定义方式，和let相似，也是不可重复声明的

但是对象呀，数组呀都是可以改这个对象或者数组的东西的，因为真正保存的是地址，数组多个元素少个元素又不会改变地址

```
const person=Object.freeze({});
var cat=Object.freeze({});
```
赋值的时候可以用Object.freeze来冻结一个对象，使其内部的属性和方法不能更改

---


###### 4.全局对象属性

全局对象是最顶层的对象，在浏览器环境指的是window对象，在node。js指的是global对象，在js语言里，所有变量都是全局对象的属性，

es6规定，var 和function声明的全局变量不属于全局对象的属性，let、const、class声明的全局变量不属于全局对象的属性





---

## 二.对象的解构赋值

>destructuring
   es6允许按照一定模式，从数组和对象里提取值，对变量进行赋值，这被成为解构赋值
  

###### 1.数组的解构赋值
```
var [a,b,c]=[1,2,3];
```
指定默认值
  注意：es6内部使用严格相等运算符（===）判断一个位置上是否有值，所以如果一个数组成员不严格等于undefined，默认值是不会生效的

注意数组对应的如果不是数组的话就会报错

###### 2.对象的解构赋值

解构不仅可以用于数组，还可以用于对象
  对象的属性没有次序，变量必须与属性同名，才能取到正确的值

默认值生效的条件是，对象的属性值严格等于undefined


###### 3.函数参数的解构赋值

在以前的时候，当用户传入数组或者对象的时候，需要在函数内部对这个数组或者对象进行解构并且赋值、设置默认值
es6可以直接在函数的形参部分进行解构赋值和设置默认值

---



## 三：模板字符串

###### 1.es6提供了又一种变量连接字符串的方法：
```
             var food='蛋糕';
             var drink='可乐';             
             var str=`今天的早餐是${food}和${drink}`;
```

###### 2.es6觉得可以用一个函数来搞一搞这个字符串：

 利用kitchen函数来操作拼接字符串的过程，注意的是这个函数的返回值就是最终的字符串
它接受两个参数，第一个是一个数组，前几位元素都是没有拼接变量时的每一个小的部分，并且这个数组有个属性叫raw，里面也会存放所有的元素
 第二个参数可以用...的方式来接受所有的要拼接的变量
             
             ```
             let food='蛋糕';
             let drink='可乐';

             let str=kitchen`今天的早餐是${food}和${drink}`;
             function kitchen (strings,...values) {
                console.log(strings.raw)
                console.log(values)

                return ...
            }
            console.log(str)
            
            ```



###### 3.es6为字符串提供的几个小方法
```
 let str='今天是hige好日子，心想的事儿都能成'
 //1.判断是否是以...开头
 console.log(str.startsWith('今天'))//true
 //2.判断是否是以...结尾
 console.log(str.endsWith('能成'))//true
 //3.判断是否包含...
 console.log(str.includes('心'))//true
 ``` 




四：函数相关

1.设置函数参数的默认值

           function fn (x=1,y=2) {
                return [x,y]
            }
            console.log(fn())


2.es6里面的... 叫法有两个

         1.展开操作符   spread    可以在一个数组或者一个对象里快速添加另一个数组的元素或者另一个对象的属性方法，同名属性会覆盖

           var fruit=['apple','banana'];
            var food=['meat',...fruit];

            console.log(fruit);
            console.log(...fruit)
            console.log(food)

            var obj={
                name:'xiu',
                age:13
            }
            console.log(obj)
            console.log({x:1,...obj})

       2.剩余操作符  rest  多在函数里设置不确定数量的参数时使用

              function lunch (meat,drink,...food) {
                console.log(meat)
                console.log(drink)
                console.log(food)
                console.log(...food)
            }

            lunch('beaf','cola','bread','baozi')


     
      3.name属性   es6为函数增加了一个name属性，需要注意的是，匿名函数的name是引用的变量的名字，又赋值又有名字的函数name是函数自己的函数名

           function  myFn (argument) {

            }
            console.log(myFn.name)//myFn

            var yourFn=function(){

            }
            console.log(yourFn.name)//yourFn


            var hisFn=function herFn(){

            }

            console.log(hisFn.name)//herFn

4.es6新增了箭头函数这样的定义函数的方式，箭头前面的是函数的参数，多个参数可以用()包裹，没有参数也要写（），箭头后面的是函数的返回值，如果写成{}包裹的话,就是函数体，需要返回值的时候要return

            var fn=a=>a+1;           
            // function fn (a) {
            //     return a+1;
            // }
            console.log(fn(5))//6

            var fn2=(a,b)=>{
                return a+b;
            }
            // function fn2(a,b){
            //     return a+b;
            // }
            console.log(fn2(1,2))//3





## 五：变量添加属性和方法

es6 觉得如果一个对象想拥有和一个变量的名字一样的键名，并且值为这个变量的值的属性的话，可以直接在键值对里直接写一个变量名就好， 如果想设置一个方法，可以直接写方法名（）{}
           

```
let name='allen',
    age=13;

let person={
    name,
    age
}
console.log(person)

var laugh=()=>{alert('hahaha')}
let xiu={
    laugh,
    sayHello(name='美女'){alert(`${name},你好`)},
    ...person
}
xiu.laugh();
xiu.sayHello();
xiu.sayHello('baobao');
```




## 六：es6中对象的属性名可以用变量的值去表示

```
let person={};

person.name='xiuxiu';

person.firstName='zhao';

person['second name']='wang';

let myname='third name'

person[myname]='gao';

console.log(person)
```


## 七：几个Object的方法

###### 1. Object.is方法，可以做神奇的相等比较，类似为安格拉小姐


```
console.log(+0==-0)//true

console.log(+0===-0)//true

console.log(NaN==NaN)//false

console.log(NaN===NaN)//false

console.log(Object.is(+0,-0))//false

console.log(Object.is(NaN,NaN))//true
```


###### 2.Object.assign。可以用来把某一个对象里面的属性复制另一个属性里，同名会覆盖，按照顺序


```
var person={};
Object.assign(person,
    {name:'zhaoxiu'},
    {name:'wangxiu'},
    {age:18}
)
console.log(person)//{name:wangxiu,age:18}
```




###### 3.Object.prototype相关

```
var a= Object.create(b)//把b作为原型来创建一个对象a
Object.getPrototypeOf(a)//获取a的原型
Object.setPrototypeOf(a,c);把a的原型设置为c


var wang={
    getName(){
        return '王'
    }
}
var li={
    getName(){
        return '李'
    }
}

var xiu=Object.create(wang);
console.log(xiu.getName())//王

console.log(Object.getPrototypeOf(xiu)==wang)//true
Object.setPrototypeOf(xiu,li);
console.log(xiu.getName())//李
console.log(Object.getPrototypeOf(xiu)==li)//true
```



通过{}.prototype可以来设置原型，但是输出出来的却是__proto__,es6觉得，那就直接设置__proto__吧


```
var wang={
    getName(){
        return '王'
    }
}
var li={
    getName(){
        return '李'
    }
}

var xiu={
    __proto__:wang
}
console.log(xiu.getName())//王

console.log(Object.getPrototypeOf(xiu)==wang)//true
xiu.__proto__=li
console.log(xiu.getName())//李
console.log(Object.getPrototypeOf(xiu)==li)//true
```




在对象的方法里可以使用它原型的方法和属性，这个时候在方法里用super来代表自己的原型


```
var wang={
    getName(){
        return '王'
    }
}
var xiu={
    __proto__:wang,
    getFname(){
        console.log(super.getName())
    }
}
console.log(xiu)
xiu.getFname()
```






## 八：class类

es6里引入了类的概念，可以通过class关键字来创建一个类，里面的contructor方法可以用来接受实例化时传入的参数，还可以在class里写一些自定义的方法,不需要加，哦


```
class person  {
constructor(name){
    this.name=name
}

say(){
    console.log(this.name)
}
}

var xiu=new person('xiu')
console.log(xiu)
//.....
person
name:"xiu"
__proto__:Object
constructor:person(name)
say:say()
__proto__:Object
//............

xiu.say()///xiu
```




es6觉得获取属性和设置属性的这些操作可以专门用set和get关键字来定义


```
class person  {
    constructor(name){
        this.name=name;
        this.hobby=[];
    }

    get gethobby(){
        return this.hobby;
    }

    set sethobby(hobby){
        return this.hobby.push(hobby);
    }
}

var xiu=new person('xiu')
console.log(xiu.hobby)  //[]
console.log(xiu.gethobby)  //[]
console.log(xiu.sethobby='sing') //sing
console.log(xiu.hobby) // ['sing']
console.log(xiu.gethobby)// ['sing']
```




static 可以设置一个这个类自己的静态方法，只有类可以调用，实例不可以调用



```
class person  {
    constructor(name){
        this.name=name;

    }

    say(word){
        console.log(word)
    }

    static superSay(word){
        console.log(word)
    }
}

var xiu=new person('xiu');
xiu.say('hello')
//person.say('hello')//error
//xiu.superSay('hello')//error
person.superSay('hello')
```




es6的class里，可以用extentds来进行继承class Student extends Person{ }，但是如果父类通过constructor接受了参数，并且之类需要接受更多的参数，那么需要在子类的constructor里用super来给父类contructor传递参数，剩下的再自己使用



```
class Person {
    constructor(name,age){
        this.name=name;
        this.age=age;
    }

    say(){
        console.log(`${this.name},${this.age}`)
    }
}


new Person('xiu',18).say()//xiu,18

class Student extends Person{
    constructor(name,age,sex){
        super(name,age)
        this.sex=sex
    }
}
console.log(new Student('liu',13,'male'))
```



## 九：集合类型


- 1.es6新增了Set这个集合类型，类似与数组，但是还是有不少区别，比如，Set里不能有重复元素，重复元素不报错但是也不会添加进去

     通过new Set（）来创建。初始参数是字符串  其他的要报错，会把字符串拆开了作为元素


```
var _set=new Set('123')
      console.log(_set)//Set {"1", "2", "3"}
```


Set里不能有重复元素，重复元素不报错但是也不会添加进去

```
var _set2=new Set('1223')
     console.log(_set2)//Set {"1", "2", "3"}
```



通过add方法来添加新元素  并且新添加是什么类型就是什么类型


```
var _set3=new Set('123')
_set3.add(4)
console.log(_set3)//Set {"1", "2", "3",4}
```



     通过size来获取元素个数

            var _set4=new Set('123')
            console.log(_set4.size)//3

     通过delete来删除元素

            var _set5=new Set('123')
            _set5.delete('3')
            console.log(_set5)//Set {"1", "2"}

     通过has来判断有没有这个元素

            var _set6=new Set('123')
            console.log(_set6.has('3'))//true


    可以通过forEach来遍历

            var _set7=new Set('123')
            _set7.forEach((x,i)=>{
                console.log(`${x},${i}`)
            })
            // 1,1
            // 2,2
            // 3,3


     通过clear来清除元素

            var _set8=new Set('123')
            _set8.clear();
            console.log(_set8)//Set {}




2.map，es6新增了map这样的类型，和{}的区别就是可以用任何数据类型作为键值

               let map=new Map(); //获取一个map

            let [obj,fn,str]=[{},function () {},'hello'];

            map.set(obj,'obj') //设置map的键值对
            map.set(fn,'fn')
            map.set(str,'str')
            console.log(map)

            console.log(map.size)//获取map的键值对个数


            console.log(map.get(obj)) //获取map的键对应的值

            console.log(map.delete(fn)); //删除某一个键值对
            console.log(map.has(fn)) //检测是否包含某个键名
            console.log(map.has(obj))

            map.forEach((value,key)=>{ //可以用forEach来遍历map
                console.log(value)
                console.log(key)
            })

            map.clear(); //清空map的键值对
            console.log(map)









10.模块系统

在es6里引入了模块的概念
     

```
export function square(x) {
    return x * x;
}
```

```
import square from 'lib';
square(2)//4
```

```
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```

```
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3));
```



```
 import * as lib from 'lib';
 square = lib.square;
```






     











