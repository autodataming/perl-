#### MatlabPrimer02_常用基本函数

##### 摘要
MatbLab 一共有 xxx个函数，初学者只需要先熟悉这几个函数[magic max rand mean plot title disp size] ，就可以开展教程的学习。

##### 常用基本函数
通过**help 函数名**就可以查看官方对函数的说明
```
help magic

```

- magic
magic(n) 接受一个整数n，产生n*n的魔方矩阵。
魔方矩阵的特点：每行、列以及对角线的数之和相等。
将自然数 1 到 N^2， 排列 N 行 N 列的方阵，使每行、每列及两条主对角线上的 N 个数的和都等于N (N^2+1)/2，这样的方阵称为 N 阶幻方。

- max

- - max是一个重载函数，接受参数的数目不一样，行为也不一样。
可以接受1个或者2个参数。
```
A=[1,3,5];
B=[2,1,4];
max(A); %5
max(A,B); %2 3 5
```

- - max也是一个情景函数，在不同的环境中，行为不同。
可以返回一个或者2个结果
```mat
A=[1 2 7 4 3 1 7];
re=max(A);  % 7
[re1,re2]=max(A);  %7 3 最大值和对应的第一个索引
```
- size
 - 接受1个参数一个数组，返回行数和列数
 - 接受2个参数数组以及维数索引，返回该维数的个数
 ```
 test=[1 2 3 4;2 3 4 5;];
 rowcol=size(test);
 row=size(test,1);
 col=size(test,2);
 ```





###### 魔方构造算法

http://baike.baidu.com/link?url=98LZQUDPZw0cK_fPrdF8i-coGRrZU772J6fzEX14zgdB-nME0Ztjhef3asvmbED8cvzajpSKXHZm0lYK8NnsdK#3_1
