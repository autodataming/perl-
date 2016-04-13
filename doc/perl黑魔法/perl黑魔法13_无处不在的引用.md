#### perl黑魔法13-无处不在的引用

#### 摘要
perl中标量是用美元$表示的，用$表示的不一定是标量。美元$还可以代表（指针）引用。有了引用就能轻松实现和管理各种复杂数据结构。

##### 引用的类型
- 数组引用
  - 匿名数组引用
```perl
my $arr_ref=[1,2,3]
```
  - 数组引用
```perl
my @arr=(1,2,3);
my $arr_ref=\@arr;
```
  - 解数组引用
```perl
  print $arr_ref->[0]; #获得数组中第一个元素
   print @$arr_ref;    #获得整个数组
```
- hash引用
 - 匿名hash的引用
```perl
my $hash={key1=>val1,key2=>val2}
```
  - hash的引用
``` perl
my %hash=(key1=>val1,key2=>val2);
```
  - 解hash引用
```perl
print $hash->{key1};  #获得key1 对应的值
print keys %{$hash};   #获得hash的所有的key
```

- 函数引用
 - 匿名函数的引用
```perl
my $fun_ref=sub {print "hello, ",shift;};
```
 - 函数引用
```perl
sub hello {print "hello, "+shift;}
my $fun_ref=\&hello;
```
 - 函数解引用
```perl
$fun_ref->("larry") # 输出hello,larry
```
- 标量引用
```perl
my $string="hello,world\n";
my $string_ref=\$string; #标量的引用 指针 地址
print $string,"\n";
&change($string_ref); # 按址传递
print $string,"\n";
sub change
{
  my $str_ref=shift;
  ${$str_ref}="hello, China";
}
```
- 文件句柄引用
```perl
open FH，">succeful.txt";
open FF，">error.txt";
sub write
{
  my $filehandle_ref=shift;
  my  $message=shift;
  print $filehandle_ref,$message;
}
write(\*FH,"HAPPY");
write(\*FF,'BAD');
```
- 对象引用
perl 中的对象也是通过引用实现的，
``` perl
$obj->method(); #调用对象里的方法
$obj->properties; #获得对象里属性
```
##### 总结
```perl
解数组引用 $ref->[1]
解hash引用$ref->{key}
解函数引用 $ref->(parameter)

```


**引用**，**指针** ，**地址** 这3个概念在是一样的。

软件推荐： ATOM编辑器，非常好用，支持perl6语法高亮，代码运行。
