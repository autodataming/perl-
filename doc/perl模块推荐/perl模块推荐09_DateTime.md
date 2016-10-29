#### perl模块推荐09_DateTime

##### 摘要
对于日期的处理，每一个成熟的语言都有自己的库。在perl中DateTime当之无愧，一共获得152个赞。


##### 应用场景1- 2016年一共有多少个星期天
$dt->day_of_week()
返回值是1到7，其中1代表周一，2代表周二，... ...，7代表周日。
```
#!/usr/bin/env perl
use strict;
use warnings;
use DateTime;

my $start = DateTime->new(
    day   => 1,
    month => 1,
    year  => 2016,
);

my $stop = DateTime->new(
    day   => 1,
    month => 1,
    year  => 2017,
);
my $re=0;
while($start<$stop)
{
   if($start->day_of_week()==7)
   {
     $re++;
   }
   $start->add(days=>1);
}
print $re,"\n";
```
##### 应用场景3-生成8位数的日期字典
- DateTime

```perl
#!/usr/bin/env perl
use strict;
use warnings;
use DateTime;

my $start = DateTime->new(
    day   => 1,
    month => 1,
    year  => 1940,
);

my $stop = DateTime->new(
    day   => 10,
    month => 1,
    year  => 2020,
);


while ( $start->add(days => 1) < $stop ) {
    printf  $start->ymd(''),"\n";
}
```
**$dt->ymd('-')** 输出格式是year month day，中间的连接符是-,如2016-1-1。

- Date::Range

```perl
#!/usr/bin/env perl
use strict;
use warnings;
use Date::Simple;
use Date::Range;

my $d1 = Date::Simple->new('2009-03-02');
my $d2 = Date::Simple->new('2009-03-07');

my $range = Date::Range->new( $d1, $d2 );

for my $date ($range->dates) {
  print $date->format("%m/%d/%Y"), "\n" # Fixed format
}
```
