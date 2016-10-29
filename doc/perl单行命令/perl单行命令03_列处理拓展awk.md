#### perl单行命令-awk

##### 摘要
提取文档中某一列的数据，这是awk的强项，perl吸收并简化了awk，让awk变得更加简洁高效。**}{** 循环终止符。

##### 文本格式
1.txt
> C 1 2 3 SER<BR>N 2 3 4 PRO<BR>O 1 1 1 CYS<BR>F  1  2  3  ALA<BR>Cl 2 3 6 ILE<Br>Br 4  4 7 GLN

##### 提取第5列数据
```perl
perl -lane 'print $F[4]' 1.txt
```
##### 开关分析
- -l 让print变成say的效果，自动在后面添加换行符
- -a  打开awk的开关，同awk一样默认分隔符号是空格符号，可以通过-F开关自定义分隔符号，默认数组@F用来存放拆分后的元素
- -n  循环读取文本中的行
- -e  运行单行命令

###### 分别对2，3，4列求和

```perl
perl -ane '$sum[0]+=$F[1];$sum[1]+=$F[2];$F[2]+=$F[3];}{print "$sum[0] $sum[1] $sum[1] "'
```

- **}{** 循环终止符号


##### 借debug模式体验交互模式
- perl -de 0
- perl -de 1
- perl -de 'print "run in linux "'
- perl -de "print qw(run in window)"

```perl
D:\Program Files\CCDC1.8\lib>perl -de "print qw(hh)"
Loading DB routines from perl5db.pl version 1.44
Editor support available.
Enter h or 'h h' for help, or 'perldoc perldebug' for more help.
main::(-e:1):   print qw(hh)
  DB<1> @a=(1..100)
  DB<2> map{$sum+=$_}@a
  DB<3> print $sum
5050

```
