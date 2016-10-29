#### perl模块推荐12—Set::Scalar


##### 摘要
Set::Scalar 是一个优秀的集合操作模块。交集，补集（差集），并交集等操作


##### 安装
> cpanm Set::Scalar

##### Demo
- 交集
- 并集
- 补集
- 非并集

``` perl

#!/usr/bin/perl -w


use strict;

#cpanm Set::Scalar;
use Set::Scalar;

my @num1=(1,2,2,3,3,3,4,5);
my @num2=(3,4,,5,6,,7,7,8);

# convert array to set
my $set1=Set::Scalar->new(@num1);
print join "-",$set1->elements,"\n";
#output is 1-2-4-5-3-
#  1 2 3 4 5
my $set2=Set::Scalar->new(@num2);
#      3 4 5  6 7 8


#交集
my $inter_set= $set1 * $set2;
print join "-",$inter_set->elements,"\n";
#output is 5 3 4


#交并集
my $union_set=$set1+$set2;
print join "-",$union_set->elements,"\n";
#output is 1 2 3 4 5 6 7 8

#差集 补集
my $set1_diff=$set1-$set2;
print join "-",$set1_diff->elements,"\n";
#output is 1 2

#双补集  非交集
my $set_uniq=$set1 % $set2;
print join "-",$set_uniq->elements,"\n";
#output is 1 2 6 7 8



```


##### 方法操作
上面的符号重载和下面的方法是等效的
```
$u = $s->union($t);        # +
$i = $s->intersection($t); # *
$d = $s->difference($t);   # -
$e = $s->symmetric_difference($t); #%
```

** 集合中的元素具有互异性，无序性**
