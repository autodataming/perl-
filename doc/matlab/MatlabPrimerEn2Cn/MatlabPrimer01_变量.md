##### MatlabPrimer01_变量

##### 摘要
这套教程是针对Perler，Pythoner。适合和有其他编程基础的同学。MATLAB 是最厉害的软件之一。脚本语言的快，同时效率也很高；交互性好；语句简单，函数丰富。矩阵运算，绘图。

###### 变量
- 数值变量[标量]
无需申明，可以直接使用和python类似。
```MATLAB
a=1;
b=2;
c=a+b;
d=cos(a);
````
- 字符串标量
**单引号** 不能用双引号申明字符串标量
```
mytext='hello,world';
```
[]在matlab 字符串语境中是连接符号相当于perl中的点；python的+；
matlab中没有字符串数组。
```matlab
f=71;
c=(f-32)/1.8;
tempText = ['Temperature is ',num2str(c),'C'];
```
- 数组
中括号+元素；元素之间通过空格或者逗号分隔
```MATLAB
a=[1,2,3,4];
b=[1 2 3 4]
```
- 矩阵(多维数组)
中括号+元素；通过分号分隔维度；
```MATLAB
a=[1 2 3 ; 4 5 6 ;7 8 9]
b=[1,2,3;4,5,6;7,8,9]
```

##### 索引
圆括号在matlab中用于函数和索引。
- 数组索引
```matlab
array=[1,2,3,4,5];
array(1);
array(2); #单索引
```
- 矩阵索引
- - 单索引
- - 双索引
```matlab
A=[1,2,3;4,5,6;7,8,9];
A(1);
A(2);
A(4);
A(1,1);
A(2,1);
```


**单索引经过了按列扁平化处理，不是按行处理**

**MATLAB中矩阵和数组的索引从1开始不是从0开始**
