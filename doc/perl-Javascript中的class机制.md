### perl- javascript中class的机制
---

#### 摘要
讲解javascript如何实现class.

#### FAQ
1. perl公众号为什么要谈javascript？
   浏览器客户端是通过javascript对前端数据进行处理，服务器端是没有权利知道明文密码的。要分析Webqq不懂javascript不行。再对加密过程进行比喻下，y是秘钥1以及秘钥2以及其他参数p的表达式。我们自己有一把钥匙，服务器也有一把钥匙，这2把钥匙能开同一个门，但是2把钥匙长得不一样。

2. 为什么只讲class？
  class便于代码的管理，有了class让开发库成为了可能，只需要对外提供API就好了。 **掌握语言的核心就是理解这门语言的class。**

#### Javascript的class

正如perl5一样，javascript 本身不支持面向对象，没有访问控制符public，private, 没有定义类的关键字class。Javascript 还是很灵活的，用一些变通的方法，来制作类。


##### 构建类
函数法的类，在函数中使用**this**，看到this就是class
```javascript
function L() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null
}

```
##### 生成对象
函数法生成对象,使用**new**关键字
```javascript
var obj=new L();

```
JS还支持以字面值形式**:**创建一个自定义对象：
```javascript
{ property1:value1, property2:value2, propertyN:valueN }
//场景
var obj1={property1: value1, property2:value2}
return {property1: value1, property2:value2}
```

##### 添加类的属性和方法
使用**prototype**关键字，添加类的属性和方法
```javascript
function W(t) {
    return t.modPowInt(this.e, this.n)
}
    L.prototype.doPublic = W;

```


#### Object.creat() 方法
ECMAScript第5版提出了Object.creat() 方法。


#### 匿名函数自调用,立即执行函数IIFE
``` perl
sub{print "hello world"}->()
```
```javascript
(function (){console.log("hello world")})();
(function (a,b){	var c=a+b;	console.log(c);}  (3,4));
(function (a,b){	var c=a+b;	console.log(c);}) (3,4);
```
感觉javascript也是个比perl还变态的语言,什么怪异的写法都有。

#### IIFE 的优势
1. 总是将代码包裹成一个 IIFE(Immediately-Invoked Function Expression)，用以创建独立隔绝的定义域。这一举措可防止全局命名空间被污染。
2. 偷懒，不想额外定义函数
```perl
my $r=sub{use integer;  ~time}->();
```

#### 极简主义 法

在这个基础上，配合nodejs就能从任意js文件中提取所需函数。
