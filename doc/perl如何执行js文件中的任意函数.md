### perl 如何执行js文件中的任意函数

#### 背景
从腾讯网站中获得了c_login_2.js 文件，需要执行function getEncryption(t, e, i, n) 这个函数。

#### 修改c_login_2.js文件
$.Encryption = $pt.Encryption = function() {function getEncryption(t, e, i, n) }(),

#### 代码
使用JE引擎执行js代码。使用File::Slurp,让js代码和perl代码分离，便于编辑器的高亮显示2种代码js，perl。
```perl
#!/usr/bin/perl -w
use strict;
use Mojo::Util qw(b64_encode url_escape url_unescape term_escape);
use JE;
use File::Slurp;
# create global function from a Perl subroutine:##集中js函数
my  $je = JE->new;
print $je->eval(scalar read_file 'hh.js');
print "\n";



```
