#### MatlabPrimer12-环境变量

##### 摘要
一个布局干净清晰的环境是高效工作的基础。

###### 环境变量
- path 搜索路径

小写的path，Matlab 区分变量大小写。相当于perl的@INC,搜索路径。
在搜索路径中看是否能找到相应的函数定义
```
perl -V
最后会给出@INC的信息
perl -e "print  @INC"
```

- cd 当前工作目录

主要修改的的地方，一定要切换到自己的工作文件夹，不要放到默认的启动文件夹下，默认启动文件夹是

> D:\Program Files\MATLAB\MATLAB Production Server\R2014a\bin

- 切换工作目录
> cd f:/mat_work1
这样就可以开始展开你的工作了，所建立的函数文件，生成的数据文件都在该目录下面。

- pathtool工具
使用pathtool工具修改path环境变量，很方便

- 保存or删除工作

> save 20160406.mat %保存工作空间
> clear           %清除工作空间
> load 20160406.mat  %载入工作空间

**clc 是清除显示的命令，clear 是清除所有的变量**
