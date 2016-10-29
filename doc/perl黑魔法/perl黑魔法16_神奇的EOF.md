##### perl黑魔法16_神奇的EOF

##### 摘要
bash的EOF有2个功能，一是标记一段文字，二是后续的输入和程序互动，实现自动化。perl吸收了EOF，主要用于标记一段内容。

##### 互动
``` perl
#!/usr/bin/perl
#
#
use strict;

my $sum;
my $count;
while(<STDIN>)
{
 $sum+=$_;
 $count++;
 if($count>5)
 {
   last;
 }
}

print $sum;
```
```
[aa@autolife test]$ perl 1.pl << EOF
> 1
> 2
> 3
> 4
> 5
> 6
> EOF
21[aa@autolife test]$
```
##### 标记一段文字
```
#!/usr/bin/perl -w

use strict;

my $a=111;
my $message=<<"EOF";
Usage: test.pl -c config, -f file -l lines
    -c config file
    -f file name
    -l number of lines
    a:$a
    a:"$a"
    a:'$a'
   \$a:$a
EOF

print $message,"\n";
```
```
F:\github_autodataing\perl-\doc\perl黑魔法>perl 1.PL
Usage: test.pl -c config, -f file -l lines
    -c config file
    -f file name
    -l number of lines
    a:111
    a:"111"
    a:'111'
   $a:111
```
相对单引号以及双引号，EOF 有着更大的优势，里面可以自由使用双引号，单引号，变量。

**管道和EOF是bash里面的天才发明。**
