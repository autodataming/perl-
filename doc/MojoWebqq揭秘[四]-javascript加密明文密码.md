## MojoWebqq揭秘[四]--javascript加密明文密码

### perl运行javascript之JE模块

#### 背景
现代的网络体系，对于密码的保存只能密文保存，不能明文保存。管理员只能得到密文密码。加密是这样一个过程，明文密码加密很快，密文密码解密时间很长。比如y=sqrt(x)+x^2,从x求y很快，从y求x很慢。加密过程一般是在浏览器客户端通过JavaScript来完成。

##### perl如何运行javascript函数
##### 安装模块JE
```
>ppm install JE
or
>cpanm JE
```
##### demo
```perl
#!/usr/bin/perl -w

#https://metacpan.org/pod/JE
#activeperl 5.18  5.20 可以ppm 安装JE
use strict;
use JE;
my  $je = JE->new;

# create global function from a Perl subroutine:##集中js函数

$je->eval(<<'___');   

function foo(a) {
    return a+100
}
function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2)
            arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""),
        eval("var temp = '" + arr + "'"),
        temp
    }
___


my  $result = $je->{foo}->(11);

print $result,"\n";
my $o='F5AC4AD5266B556EA119F69552DA5B8D';
$result=$je->{hexchar2bin}->($o);
print $result,"\n";

```

##### 简单说明
eval中存放javascript函数，JE是javascript引擎，hash机制定位函数，()解函数引用。
一下子看不太懂hexhar2bin函数，无需改写直接执行javascript函数。

** 具体加密过程后续讲解 **
