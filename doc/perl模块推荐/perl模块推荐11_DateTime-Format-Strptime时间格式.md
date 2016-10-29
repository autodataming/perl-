#### perl模块推荐11_DateTime::Format::Strptime时间的格式化

##### 摘要
之前推荐过DateTime,它的特点是时间的计算。DateTime::Format::Strptime的特点可以设置时间的输入格式和输出格式。


##### 问题
xx问下11/Apr/2016:00:00:01怎么转化成2016-04-11 00:00:01?

##### demo

```perl
#!/usr/bin/perl -w

use strict;

use DateTime::Format::Strptime;
my $inputformatter = DateTime::Format::Strptime
                    ->new( pattern   => '%d/%b/%Y:%H:%M:%S',
                           on_error  => 'croak',);                                                                    
my $string='11/Apr/2016:00:00:01';
my $dt=$inputformatter->parse_datetime($string);
my $outputformatter=DateTime::Format::Strptime
                      ->new( pattern => '%Y-%m-%d %H:%M:%S',
                             on_error  => 'croak',);
print $outputformatter->format_datetime($dt);    



```

##### 格式讲解

基本元素
- %a 星期的名字简称
- %A 星期的名字全称
- %b 月份的名字简称
- %B 月份的名字全称
- %d 日期 01-31
- %g  the ISO week number0-99
- %G 四位数的o the ISO week number星期数
- %H  24小时制的小时 00-23
- %l  12小时制的小时 1-12
- %m  月份的数字表示 1-12
- %M  分钟的数字表示 00-59
- %p  AM PM
- %S  秒0-60
- %w  数字化的星期表示，0-6，0代表星期天
- %y  2位数的年份
- %Y  4位数的年份

综合元素
- %D  相当于%m/%d/%y
- %F  相当于%Y-%m-%d
- %r  相当于 %I:%M:%S %p
- %R  相当于%H:%M
- %T  相当于 %H:%M:%S
