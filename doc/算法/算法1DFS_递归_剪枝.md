 ##### 算法1DFS递归剪枝

 ###### 摘要
 算法是程序的核心，无关语言。适当的了解算法，可以帮你完成一些看似不可能完成的任务。递归能够把复杂问题简单化，有点类似于高中数学中的归纳推理法。DFS，深度优先搜索算法，是图论算法中的一种。DFS 就是一种暴力穷举法，把所有的情况都进行探索下，不遗漏也不重复。由于计算空间和时间的限制，有时候我们不需要穷举所有的情况，找到一种满足的条件，就可以终止，或者找到最优的情况就可以终止。

 ###### 题目
第24题一马当先，来源于pythontip网站
```
下过象棋的人都知道，马只能走'日'字形（包括旋转90°的日），现在想象一下，给你一个n行m列网格棋盘，棋盘的左下角有一匹马，请你计算至少需要几步可以将它移动到棋盘的右上角，若无法走到，则输出-1.
如n=1，m=2,则至少需要1步；若n=1，m=3,则输出-1。

```
##### perl 代码
```perl
#!/usr/bin/perl -w
use strict;
# 设置棋盘大小 8*8
my $col_n=8;
my $row_m=8;
my ($col_now,$row_now)=(0,0);

my @step;
#DFS:一条路走到底的穷举法
#refer:http://baike.baidu.com/view/288277.htm
#step1 产生一个矩阵表示棋谱
my @chess;
for my$key1(0..$col_n)
{
	map{$chess[$key1][$_]=0}(0..$row_m);
  #0代表没有走过，1代表走过 	
}

#step2 设置马的走法
my $steps=[
[2,1],[1,2],[-1,2],[-2,1],
[-2,-1],[-1,-2],[1,-2],[2,-1]
];

#step3 设置全局变量，一条路走到底的变量
#@chess也是全局变量

my $flag=0;
my $step_num=0;
my $minnum=10000000;
my @paths=();
go($col_now,$row_now,@oldpaths);
print $flag,"\n";
print $minnum,"\n";

sub go
{
   my $col_now=shift;
   my $row_now=shift;
   #把走过的地方添加到路径中
   push @paths,$col_now,$row_now;

   $chess[$col_now][$row_now]=1; #访问过了的标志

   $step_num++;
   #实现剪枝，如果step_num 比已有的minnum 要大就不要探索了。
   if($step_num >$minnum)
   {
   	return
   }
   if($col_now==$col_n and $row_now==$row_m) #判断这条路是否走成功
   {
       $flag=1;
       print "success\n,you have access the destination\n";
       print "paths:";
       print join ",",@paths;
       print "\n";

       $minnum=$minnum<$step_num?$minnum:$step_num;
       return 1;         
   }
   #下一步可能的走法
   for my $step(@$steps)
   {
      	my $col_new=$col_now+$step->[0];
      	my $row_new=$row_now+$step->[1];
      	#print "$col_new  $row_new\n";
      	if($col_new>0 and $col_new<= $col_n and $row_new>0 and $row_new<=$row_m)
      	{
	      	if($chess[$col_new][$row_new]==0)
	      	{
	      		 # print " goto $col_new  $row_new\n";
             #递归 走下一步
	      	     go($col_new,$row_new,@newpaths);
              #关键 回复全局变量
	      	     #pop shift
                 pop @paths;
                 pop @paths;
                # print join ",",@paths;
               #  print "\n";

	      	     $step_num--;
	      	     $chess[$col_new][$row_new]=0;
	      	}
        }

   }


}
__END__

```

##### 代码剖析
- step1 产生一个数组矩阵表示棋谱
- step2 设置马的走法
- step3  设置一条路走到底的全局变量
递归循环中的处理
- step4 判断是否成功
- step5  剪枝
- step6 不停的走向下一步，一直走到底。
- step7 走到底，恢复全局变量状态

核心是第7步，稍微想想整个模型，就可以了。



 ###### 废话 留到最后
 最近一直没有给大家推送一些perl知识。最主要原因，没有找到值得推送的内容。另外在这段时间里，看了一些python模块，一些c++,一些c。在化学信息领域，目前python的模块比perl的模块多的多，比如RDKIT,openbabel,pybel,pymol,而perl里面只有2个，一个是功能有限的HackaMol。一个是没有人维护的PerlMol。
```
perlgeek='Search metacpan'?用这个模块:移植一个模块
```
c++ 中的class 我觉得是最经典的，好多用法也接近于动态语言，值得学习，推荐<C++ primer Plus>。 C的代码中，数据结构都是通过指针进行管理的，首先我知道用多大内存，然后分配内存，然后在存放数据。c中虽然只有struct，没有class，通过对指针的熟练使用，进行布局组织代码。不管python还是perl好多模块的底层仍然是c代码，所以c,不得不学。


 ###### 末尾
 如果你觉得perl没什么好学的，推荐你看<<高阶perl>>这本书。第一章就是递归与回调。
