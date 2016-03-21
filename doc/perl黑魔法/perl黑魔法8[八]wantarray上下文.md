#### perl黑魔法[八]wantarray创造上下文

##### 摘要
perl的特性之一就是上下文，同一个东西遇到标量是一种结果，遇到数组又是另一种结果。借助wantarray和三目运算符可以轻松轻松实现这种机制。
**return wantarray？array：scalar**；

##### Demo
```perl
sub score
{
  my $math=shift;
  my $english=shift;
  my $chemistry=shift;
  my $total=$math+$english+$chemistry;
  my @result=sort($english,$math,$chemistry);
  return wantarray?@result:$total;
}

my $total=score(99,66,88);
print $total,"\n";
#253
my @sortscore=score(99,66,88);
print join "-",@sortscore;
#66-88-99
```
