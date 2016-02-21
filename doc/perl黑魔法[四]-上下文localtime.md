### perl黑魔法[四]-上下文localtime

#### 上下文
perl的语言学特性之一，上下文。
这样的案例随处可见，常见的有标量上下文，数组上下文。同一个东西赋值给数组和赋值给标量是不一样的。

#### 以localtime time举例
```perl
print localtime(),"\n";
#28102111160510 output

print join "-",localtime(),"\n";
#2-8-10-21-1-116-0-51-0-

print time(),"\n";
# 1456020482

print join "-",time(),"\n";
# 1456020482-

my $t=localtime();
my @t=localtime();
print '$t ',$t,"\n";
#$t Sun Feb 21 10:08:02 2016

print '@t ', join "-",@t,"\n";
#@t 2-8-10-21-1-116-0-51-0-

print ''.localtime();
#Sun Feb 21 10:08:02 2016
```
output
```
28102111160510
2-8-10-21-1-116-0-51-0-
1456020482
1456020482-
$t Sun Feb 21 10:08:02 2016
@t 2-8-10-21-1-116-0-51-0-
Sun Feb 21 10:08:02 2016
```
比较后我们可以清晰的发现time()原生就是一个标量，而localtime原生是一个数组。当localtime 出现在标量环境中，如赋值给标量，点号的环境是连接2个标量，就会转成人类阅读的格式。

#### localtime 数组中各个元素的含义
```perl
    my ($sec ,$min, $hour, $mday, $mon, $year, $wday, $yday, $isdst) = localtime(time);
```

```
$sec   - seconds (0-59)
$min   - minutes (0-59)
$hour  - hours  (0-23)
$mday  - 'month day' or day of the month (1-31)
$mon   - month (0-11) - 0 is January, 11 is December.
$year  - YEAR-1900
$wday  - 'weak day' or day of the week (0-6), 0 is Sunday, 1 is Monday
$yday  - 'year day' or day of the year (0-364 or 0-365 in leap years)
$isdst - 'is Daylight saving time' true if Daylight Saving Time is on in your computer. Otherwise false.
```
