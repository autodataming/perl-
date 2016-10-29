#### MatlabPrimer15_从文件读入数据到矩阵中

##### 摘要
Matlab 有2个层次的读写文件，一个是低层次的读写文件，类似于c中的操作，一个是高层次的读写文件，可以直接把文本中的数据导入到矩阵中，要求文本数据标量干净。作为perler 显然只需要关注matlab封装好的函数，perl可以更快的提供干净的数据给matlba使用。

##### 导入数据的命令
- load
```matlab
M=load('input.txt');
```
- importdata

-
