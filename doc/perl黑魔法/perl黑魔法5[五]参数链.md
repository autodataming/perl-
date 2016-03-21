### perl黑魔法[五]--参数链

#### 摘要
作为一个perler，看到的小箭头和一个小括号在一起**->()**，就知道前面是一个函数引用。可以把这种模型想象成onion，第一个箭头解析的对应的是最外面的一层皮。第一层解析结束（剥完了），就可以用第二个箭头解析第二层的函数了（剥第二层皮了）。

#### 参数链
```perl
$func_ref->()->()->(); #有限参数链
$func_ref->()->() ...  ->()->(); #无限参数
```
作为一个perler，看到的小箭头和一个小括号在一起**->()**，就知道前面是一个函数引用。可以把这种模型想象成onion，第一个箭头解析的对应的是最外面的一层皮。第一层解析结束（剥完了），就可以用第二个箭头解析第二层的函数了（剥第二层皮了）。


对于一个函数引用，如果连接的引用各数是无限个，则是返回自身的引用。否则返回的是另一个函数引用。
***
#### demo1 有限参数链，2个参数链
```perl
sub food
{
	print "I have eat ".shift."-> ";
	return \&drink;
}

sub drink
{
    print "I have drink ".shift."-> ";
	return 1;		
}

my $food_rf=\&food;
$food_rf->('rice')->('beer');
$food_rf->('shit');
```
如果只用了一个链，则只解析第一个函数，最外层函数，不解返回的函数的引用。返回的函数没有被执行。
***
#### demo2 无限参数链
```perl
sub eat
{
	print "I have eat ".shift."-> ";
	return \&eat;
}

my $eat_rf=\&eat;

$eat_rf->("orange")->("apple")->("rice");
print "\n";
$eat_rf->("cookie")->("egg");
print "\n";
$eat_rf->("chocolate");
print "\n";

```
无限参数链，好比绕着圆圈跑。
