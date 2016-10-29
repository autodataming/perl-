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
- first 取出列表中第一个满足条件的元素.  

``` perl
my @array=(7,6,1,15,7,9,18);
my $re=first{$_>7} @List;
print $re,"\n"; #15

```
- sum 求列表中所有元素的和，列表为空，返回undef
- sum0 求列表中所有元素的和，列表为空，返回0

``` perl
my @array=(7,6,1,15,7,9,18);
my $sum=sum(@list);
print $sum,"\n"; #15
```

- product 求列表中元素的乘积，列表为空返回1.
``` perl
my @array=(1,4,9);
my $re=product(@array)
print $re,"\n"; #36
```
- max 取列表中数值最大者，列表为空返回undef
- min 取列表中数值最小者，列表为空返回undef
- maxstr 取字符串列表中的较大者
- minstr 取字符串列表中的较小者
``` perl
$foo = minstr 'A'..'Z'          # 'A'
$foo = minstr "hello","world"   # "hello"
$foo = maxstr 'A'..'Z'          # 'Z'
$foo = maxstr "hello","world"   # "world"
```
- any 列表中有一个元素满足条件返回true。
```perl
my @strings=("hello","abcd","whoami","a")
if( any { length > 5 } @strings ) {  #True
    # at least one string has more than 10 characters
    print "I have found at least a string length than 5 "
} #
```
- all 列表中所有元素满足条件，返回True
```perl
my @strings=("hello","abcd","whoami","a")
if( any { length > 5 } @strings ) {  #False
    # at least one string has more than 10 characters
    print "I have found at least a string length than 5 "
} #
```

- reduce 利用内置变量$a $b,进行循环处理

```perl
 $foo = reduce { defined($a)            ? $a :
                $code->(local $_ = $b) ? $b :
                                         undef } undef, @list # first

$foo = reduce { $a > $b ? $a : $b } 1..10       # max
$foo = reduce { $a gt $b ? $a : $b } 'A'..'Z'   # maxstr
$foo = reduce { $a < $b ? $a : $b } 1..10       # min
$foo = reduce { $a lt $b ? $a : $b } 'aa'..'zz' # minstr
$foo = reduce { $a + $b } 1 .. 10               # sum
$foo = reduce { $a . $b } @bar                  # concat

$foo = reduce { $a || $code->(local $_ = $b) } 0, @bar   # any
$foo = reduce { $a && $code->(local $_ = $b) } 1, @bar   # all
$foo = reduce { $a && !$code->(local $_ = $b) } 1, @bar  # none
$foo = reduce { $a || !$code->(local $_ = $b) } 0, @bar  # notall
# Note that these implementations do not fully short-circuit
```
- shuffle 把列表中的顺序打乱
```perl
@cards = shuffle 0..51      # 0..51 in a random order
```
- uniq  对字符串列表去重
- uniqnum  对数字串列表去重

```perl
use List::Util qw(uniq uniqnum);
my @aa=(1,2,3,3,3,2,'a','bdd','c','a');
my @bb=(2,3,4,2,3,1);
print join ",",uniq @aa; #1,2,3,a,bdd,c
print "\n";
print join ",",uniqnum @bb; #2,3,4,1

```


如果上述函数，还不能满足你的话，可以看看**List::MoreUtils**
