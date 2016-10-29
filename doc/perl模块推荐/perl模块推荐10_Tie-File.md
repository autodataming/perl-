#### perl 模块推荐10_Tie-File

##### 摘要
Tie-File 模块把文件绑定到perl数组中，通过操纵perl数组来直接修改文件。好处就是不需要创建文件句柄。



##### 框架
关联 -> 操作->解除关联

##### 关联
```perl
use strict;
use Tie::File;

my @lines;

my $filename='1.mol2';
#关联
tie (@lines,'Tie::File',$filename)  or die 'can not tie';
```
##### 增加行

```perl
#前面增加
unshift(@lines,"the first line");
splice(@lines,0,0,"the first line");

```

##### 删除行 pop shift delete
``` perl
shift @lines;
```


##### 修改行
``` perl
$lines[-1]="the end lines  jjjj!!!";

```
##### 插入行
``` perl
#插入splice
my @list=("a","b","c","d");
splice(@lines,10,0,@list);
```

##### 替换
```perl
#替换splice
 @list=("a","b","c","d");
splice(@lines,1,4,@list);

```
##### 解除关联
untie(@lines);


##### 总结
关联就相当于
``` perl
open FH,"1.mol2";
my @lines=<FH>;
close(FH);
#deal @lines
#... ...
#
open FH,">1.mol2";
print FH @lines;

```
通过把数组和文件进行关联，修改数组就能直接修改文件。避开了多次创建文件句柄。
缺点，不能处理大文件，否则 out of memory。
