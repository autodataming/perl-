#### MatlabPrimer08_m文件函数

##### 摘要
函数是程序的骨架。Matlab 最普通的函数m文件函数。

##### m文件函数
函数名与文件名同名的函数，m文件存放在path路径中，你输入函数名，会查找是否有同名的文件，从而判断该函数是否存在。

- m文件函数框架

点新建然后选择函数
```matlab
function [ output_args ] = Untitled4( input_args )
%UNTITLED4 此处显示有关此函数的摘要
%   此处显示详细说明


end
```

- m文件demo解释

创建test_func.m 文件
``` matlab
function [ result1,result2 ] = test_func( x,y )
%UNTITLED4 此处显示有关此函数的摘要
%   此处显示详细说明
result1=x+y;
result2=x-y;

end
```
result1 result2 是函数返回的结果
x y是函数test_func接受的参数

-----------------------------------
可以在m文件中定义一些其他私有函数，同名函数就相当于是接口函数，接口函数可以调用私有函数。接口函数可以被其他人使用。

- demo

创建pubfunc.m 文件
```matlab
function result= pubfunc(x,y)
result=myfunc_private(x+y)；

function re=myfunc_private(x)
re=x*x；
```
**end** 一般用于函数的嵌套，在我看来这不利于代码的清晰，我不建议使用end来构造嵌套函数。如果非要构造嵌套函数，一定是你设计不合理。重新设计逻辑。

脚本建议行末尾使用分号，抑制交互输出。测试的时候可以适当取消行末尾的分号。
