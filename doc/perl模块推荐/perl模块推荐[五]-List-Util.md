#### perl模块推荐[五]-List::Util


##### 摘要
**List::Util** 在metacpan上获得了117个赞，该模块得到了大家的肯定，是一个非常常用的模块，集成了大量处理列表(数组)的函数,这是perl内置模块无需安装。这些函数都是经过 C 优化的，所以执行速度很快，不要重复造轮子。


```perl
use List::Util qw(
  reduce any all none notall first

  max maxstr min minstr product sum sum0

  pairs pairkeys pairvalues pairfirst pairgrep pairmap

  shuffle
);
```
##### 常用函数说明示例
- first 取出列表中第一个满足条件的元素

``` perl
my @array=(7,6,1,15,7,9,18);
my $re=first{$_>7} @List;
print $re,"\n"; #15

```
- sum 求列表中所有元素的和，列表为空，返回undef
- sum0 求列表中所有元素的和，列表为空，返回undef

``` perl
my @array=(7,6,1,15,7,9,18);
my $re=first{$_>7} @List;
print $re,"\n"; #15

```

- product
- max
- min
- maxstr
- minstr
- any
- all
- none
- notall
- reduce




- shuffle


如果上述函数，还不能满足你的话，可以看看**List::MoreUtils**
