perl 的 __LINE__, __FILE__, __PACKAGE__ 和 __SUB__ 符号

__LINE__ 符号返回当前行数。

$. 返回文件句柄最后访问的行数。

__FILE__ 符号返回 __FILE__ 所在的文件名。

$0 返回被执行的程序的名字。

__PACKAGE__ 符号返回当前包名。

__SUB__ 符号返回当前方法的一个引用, 方法之外返回 undef。需要使用 Perl 5.16(或以上版本) 的 use feature qw('current_sub') pragma。