##### perl黑魔法10[十]our

##### 摘要
perl 申明包全局变量有3种方法：1.our 2.全限定名称3.避开strict和warnings的检查。 包全局变量可以在包外访问。

##### perl 变量发展历史
1. Perl 4 那个时代，根本就不需要 my 什么的，随便写个名字，就是变量了。
问题：
##### 副作用
不小心写错变量的名字，会被误认为是一个新的变量，并没有语法错误。
2. 在perl5 引入**strict** 和**warnings** 2个pragma。
##### 解决方法
所有的变量在使用前必须声明。my 声明的变量是词法变量，局部变量。
##### 新的副作用
原先直接使用的变量是包全局变量，现在用my声明变成了局部变量，包全局变量无法使用了。

3. 包全局变量的使用
##### 解决方法
```
 1，用 no strict "vars" 临时关掉 strict pragma，声明完了再用 use strict "vars" 打开。避开strict 和warnings的检查

 2，用变量的全限定名称，如 $main::var 或者 $foo::bar 这样子。通过strict 和warnings的检查
```

4. 进一步的简洁包全局变量的语法，引入our关键词。
##### our
```
our 声明的变量是包全局变量，可以通过strict 和warnings的检查。

```

---


Perl 和别的语言不同，可以直接使用变量，无需声明，而且默认变量的范围就是包全局变量（不使用my,our）。

##### 副作用
不小心写错变量的名字，会被误认为是一个新的变量，并没有语法错误。

##### 解决副作用
引入**strict** 和**warnings** 2个pragma。所有的变量在使用前必须声明。my 声明的变量是词法变量，局部变量。没有办法使用


**local 不是声明，用于已有变量的局部化定义。**







不加our use strict会报错
