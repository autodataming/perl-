#### perl单行命令01-批量修改文件后缀名

##### 摘要
经常需要批量修改文件名后缀，一个好的方法能让你事半功倍。

##### 批量修改文件名
- linux
推荐使用内置命令rename
```shell
#把jpg修改为png
rename jpg png *.jpg
#把c文件修改为c++文件
rename .c .cpp  *c
```
- windows
无论是UnxUtils 还是mingw 都没有移植rename命令，powershell中rename命令，感觉有点复杂。perler推荐试试window下的命令行，windows下的命令行，有几个坑，注意下。
 - 坑1， perl命令放在"" 而不是使用''里面;cmd中
 - 坑2， perl命令放在''，在powershell中
 - 坑3， perl命令中双引号不好用，用qq() 取代""

##### demo1 cmd中使用单行，把txt后缀转换为pdb后缀
```perl
F:\lse>perl -e "while(<*pdb>){($newfile=$_)=~s/pdb$/txt/;print $newfile,qq(\n);rename($_
,$newfile)}"
```
##### demo2 powershell中使用单行，把pdb后缀转换为txt后缀
```perl
PS F:\lse> perl -e 'while(<*txt>){($newfile=$_)=~s/txt$/pdb/;print $newfile,qq(\n);rename($_,$newfile);}'
```
