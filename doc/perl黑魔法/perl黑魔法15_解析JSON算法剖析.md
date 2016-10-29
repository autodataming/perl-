##### perl黑魔法15—解析JSON算法剖析

##### 摘要
json 是一个神奇的数据结构，被广泛应用于数据传输。相比于XML和html,它更加易读，轻巧。而json 和perl中hash更是紧密相关。json就是hash的数据内容，hash是json在perl中的数据变量。推荐JSON，Mojo::JSON 等模块来解析Json。

##### JSON语法简介
JSON 是键值对，用{} [] "" :四个符号来表示数据结构。
- {} 大括号表示hash引用，对象
- [] 中括号表示数组引用
- "" 表示key 或者value
- ：冒号 冒号表示后者是前者的值(这个值可以是字符串、数字、也可以是另一个数组或对象的引用

>**JSON官网最新规范规定“键”或者“值”都需要用双引号来表示。**

>** 冒号和键的双引号紧密相连**

##### perl解析json
- 神奇的eval解析json到hash

``` perl
#!/usr/bin/perl -w
use strict;

use Data::Dumper;
$/=undef;
my $jsontext=<DATA>;

#(?<=c)a 匹配前面为c的a,值匹配a 不匹配c，一般用于替换操作
$jsontext=~s/(?<="):/=>/g;  #"  
print $jsontext,"\n";
my $result=eval $jsontext;

print Dumper($result);
print $result->{type},"\n";
print $result->{items}->[0]->{sent};
__DATA__
{
  "type": "email",
  "items": [
    {
      "sent": "2016-0203:02.00Z",
      "subject": "Upcntation 2016",
      "timeZone": "Australia/Melbourne",
      "content": "We tonts. Way."
    },
    {
      "sent": "2016-029:00:00.00Z",
      "subject": "A pavitation",
      "timeZone": "Australia/Melbourne",
      "content": "The ll 9:00pm - 2:00am"
    }
  ]
}
```
**参见前面黑魔法2神奇的eval这篇文章**

http://mp.weixin.qq.com/s?__biz=MzA5NDU1OTY3Ng==&mid=401917482&idx=1&sn=5a078f773dda57fab1bd3bdbba851c90&scene=19#wechat_redirect


##### 借助模块解析JSON

- JSON 使用JSON就可以了 这个模块会根据你系统安装的模块，自动选择使用XS或者PP（有XS的情况下，会优先选择XS
- JSON::XS 使用了c的扩展，速度快
- JSON::PP 是纯perl实现，速度慢

 **write by huihui**;

 ---

> JSON是日本人写的，后来Marc Lehmann写了JSON::XS。因为Marc Lehmann是Perl界牛人还老去日本的Perl组织讲课，膏药国的人应该都挺崇拜他的。JSON::XS也确实比JSON效率高，后来JSON的作者就在模块中做了判断，系统中安装了JSON::XS就默认用XS了。如果你一定要用纯Perl的JSON就要指明JSON::PP了。
如果你提安全性，我个人以为，安全性还得看作者是谁。用Marc Lehmann的一定没错  write by py



##### JSON::PP 模块解密

``` perl
#!/usr/bin/perl -w
use strict;

use Data::Dumper;
$/=undef;
my $jsontext=<DATA>;

my $len=length $jsontext;
my $text=$jsontext;

my $result;
my $ch;
my $valid_start = defined $ch;
$ch='';
white();
$result=value();
print Dumper($result);
print $result->{type},"\n";
print $result->{items}->[0]->{sent};

#---------------------

my $at=0;
my $depth;
sub next_chr
{

        return $ch = undef if($at >= $len);
        $ch = substr($text, $at++, 1);

}


sub value
{
    white();
    return          if(!defined $ch);
    return object() if($ch eq '{');  #object call value
    return array()  if($ch eq '[');
    return string() if($ch eq '"' );  #not end

}

sub string
{
    my $s;

    $s = '';

    if($ch eq '"' or ( $ch eq "'")){
        my $boundChar = $ch;

         while( defined(next_chr()) ){

            if($ch eq $boundChar){
                next_chr();

                return $s;
            }             
            else
            {          
                $s .= $ch;
            }
        }
    }

}


sub white
{

    while( defined $ch  ){

        if($ch le ' '){
            next_chr();
        }
        else
        {
            last;
        }
    }
}


sub array
{

    my $a  =  [];

    next_chr();
    white();

    if(defined $ch and $ch eq ']')
    {

        next_chr();
        return $a;
    }
    else {
        while(defined($ch)){
            push @$a, value();

            white();

            if (!defined $ch) {
                last;
            }

            if($ch eq ']'){

                next_chr();
                return $a;
            }

            if($ch ne ','){
                last;
            }

            next_chr();
            white();
        }
    }

    decode_error(", or ] expected while parsing array");
}


sub object {

    my $o =  {}; # you can use this code to use another hash ref object.
    my $k;
    next_chr();
    white();
    while (defined $ch)
    {
        $k =  string();
        white();
        if(!defined $ch or $ch ne ':')
        {
            die "expected :";
        }
        next_chr();      
        $o->{$k} = value();            
        white();
        if($ch eq '}')
        {          

            --$depth;
            next_chr();
            return $o;
        }    
        next_chr();
        white();
    }




    print "at    $at\n";

}


__DATA__
{
  "type": "email",
  "items": [
    {
      "sent": "2016-02:02.00Z",
      "subject": "Upcoments: Orientation 2016",
      "timeZone": "Australia/Melbourne",
      "content": "We tonts. Way."
    },
    {
      "sent": "2016-03-3:02.00Z",
      "subject": "Projecttime meeting",
      "timeZone": "Australia/Melbourne",
      "content": "Early nextay 11am?"
    },

  ]
}
```

整个实现的流程，value判断值的类型，进行3中处理object，array，string，在3种处理过程中又使用了while函数，进行循环处理，处理过程再调用value。

```
 array 和 object 处理返回的是引用
```

** 进阶后最好的学习途径就是阅读模块中优秀的源代码。**
