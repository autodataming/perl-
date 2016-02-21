### perl黑魔法[三]-hash的赋值

#### 背景
```
key1 key2 k3 k4
val1 val2 val3 val4
```
key value 是竖着对，不是横着对的时候，如何构建hash。
分别提取key value，然后for循环。这不是perl的方式。灵活的perl有灵活的方式。

#### demo
这个demo用到了黑魔法二eval。
```perl
my %d;

my @text=<DATA>;
chomp(@text);
my $keys=$text[0];
my $values=$text[1];
my $expression='@d{qw('.$keys.' )}'.'='.'qw( '.$values.')';
print $expression,"\n";
eval($expression);
print $d{key1},"\n";
__DATA__
key1 key2 k3 k4
val1 val2 val3 val4
```
