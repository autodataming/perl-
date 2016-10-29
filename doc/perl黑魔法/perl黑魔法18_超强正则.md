#### perl黑魔法18-超强正则

##### 摘要
perl正则表达式是perl最强大的基因。借助正则，处理文本,一切变得简单。Perl 也因此被称为“实用报表提取语言”（Practical Extraction and Report Language）。2大利器字符正则和字符串正则。


##### 常用的正则符号
- \s  空格
- \S  任意非空格字符
- \d  数字
- \D  非数字
- \w  [a-zA-Z0-9_] 任意的字母数字下划线

##### 量词
量词有+,*,?,{n}这几种形式。  
示例：  
- \d{11}   11个连续的数字
- \d{5,10} 5-10个数字
- \d+      1到无数个数字
- \d?      0或1个数字
- \d*      0到无数个数字

##### 捕获示例  

计算每一行的实数部分之和，文本1.txt内容如下

---
```perl

while(<DATA>)
{
   my ($col1,$col2,$col3,$col4)=$_=~/([A-Za-z]*)\s+(\S+)\s+(\S+)\s+(\S+)/;

   my $re=$col2+$col3+$col4;
   print "$col1  $re\n";

}
__DATA__
C                145.37040000   40.01730000   17.96690000
O                145.72750000   41.19930000   17.29650000
C                146.58870000   41.08130000   16.23010000
C                146.15200000   41.49030000   15.02100000
```
---

**上面的正则，我称它为符号正则**  
掌握了符号正则基本就够用了。

**下面的正则，称为字符串正则**

##### perl 正则进阶，字符串正则
背景：从下面这段文本中提取CONTENT内容。也就是提取START...END或者START...TER之间的内容。

---
```perl

$/=undef;

my $text=<DATA>;

#my @results=$text=~/(?<=START)((?:(?!START).)+?)(?:(?:END)|(?:TER))/msg;

my @results=$text=~/(?:START)((?:(?!START).)+?)(?:(?:END)|(?:TER))/msg;
print @results
__DATA__
START
CONTENT1
END
START
sss
START
CONTENT2
TER
START
CONTENT3
TER
DFSDF
TER
```
---

- ?<=  用法（?<=pattern1）pattern2 首先尝试匹配pattern2,如果patter2 成功，则判断pattern2 前面是否有pattern1，如果有，则认为匹配成功。  
- ?: 分组不捕获，不存放到$1.$2,$3等变量中。  
- ?= 用法 pattern2（?=pattern1），首先尝试匹配pattern2,如果patter2 成功，则判断pattern2 后面是否有pattern1，如果有，则认为匹配成功。

**通过()和?<:!等实现对字符串的限制**

##### 参考代码
如果你用高斯量化软件，进行柔性扫描，需要提取扫描的构象，则可以参考下面的代码。充分使用了字符串正则进行处理。
1. https://github.com/autodataming/QM/tree/master/tools/FlexScanSplit


##### 参考
1. 凯哥博客
http://www.php-oa.com/2008/12/20/power-perl.html
2. helloc博客
http://blog.sina.com.cn/s/blog_6f37b64d01017odi.html
