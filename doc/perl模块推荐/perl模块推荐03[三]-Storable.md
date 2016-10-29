#### perl模块推荐[三]-Storable

##### 摘要
Storable 一劳永逸，对perl中的数据结构即存**store**即用**retrieve**。**nstore** 可以跨平台，兼容性更好。
storable 模块可以用神奇来形容，能存储和解析各种perl的数据结构。一次解析，永久使用的目的。

##### 应用场景
hash表的存储。我有一份数据，是key-value的形式存储在文本中。这份数据我要经常使用。

##### step1转存成storable格式
**store**
```perl
use Storable qw (store);
my %hash;
while(<DATA>)
{
  my($key,$value)=$_=~/(\S+)/g;
  $hash{$key}=$value;
}
store \%hash,"1.str"; #生成一个新文件1.str
__DATA__
A 11
B  112
C  444
```
##### setp2 获取hash数据结构
**retrieve**
```perl
use Storable qw(retrieve);
my $hash_ref=retrieve('1.str');
print $hash_ref->{C};
# 4444

```
同理，数组，对象都是可以存储的。存储和获得的都是引用。
###### nstore 和 store的异同
两者都可以用来保存perl中的数据结构。
* store 是按照常规的byte order 字节序保存的。
* nstore 是按照net order 网络字节序保存的。

**网络字节顺序是TCP/IP中规定好的一种数据表示格式，它与具体的CPU类型、操作系统等无关，从而可以保证数据在不同主机之间传输时能够被正确解释。网络字节顺序采用big endian排序方式。**
