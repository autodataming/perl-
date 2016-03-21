title: 输入 Unicode 字符
date: 2015-08-03 10:51:38
tags: Perl6
categories: Perl 6
---

<blockquote class="blockquote-center">我有病啊? 总是想翻译, 这是病啊!</blockquote>


# 输入 Unicode 字符

Perl 6 允许把 unicode 字符用作变量名. 很多操作符使用 unicode 符号(特别是在 set/bag 操作符中)还有一些引号结构. 因此, 知道如何把这些符号输入编辑器, Perl 6 shell 和 命令行中是极好的, 特别是现实键盘中不存在那个符号的时候.



在各种操作系统和环境下关于输入 unicode 字符的通用信息可以在 Wikipedia [unicode input page](https://en.wikipedia.org/wiki/Unicode_input) 中找到.



## 编辑器和 shell

### Vim

在 Vim 中, unicode 字符是通过先按 `Ctrl-V`(也表示为 `^V`), 然后按下 `u` 和 要输入的 unicode 字符的十六进制值来输入的(在插入模式).  例如, 希腊字母  `λ` (lambda) 是通过组合键来输入的:

``` perl
^Vu03BB
```

更多关于在 Vim 中输入特殊字符的信息可以在 Vim Wikia 页 [ entering special characters](http://vim.wikia.com/wiki/Entering_special_characters) 中找到.

### Emacs

在 Emacs 中, unicode 字符的输入是首先输入和弦 `Ctrl-x 8 Enter` , 然后再输入 unicode 代码点的十六进制数字, 然后回车. 因此, 要输入希腊字母 `λ (lambda)` 使用下面的组合键(命令之间添加了空格以使清晰):

``` perl
Ctrl-x 8 Enter 3bb Enter
```

更多关于在 Emacs 中输入 unicode 字符的信息可以在 [ Unicode Encoding Emacs wiki page](http://www.emacswiki.org/emacs/UnicodeEncoding)  中找到.



### Unix shell

在 bash shell 中, 要输入 unicode 字符先键入 `Ctrl-Shift-u`, 然后键入 unicode 代码点的值后回车. 例如, 要键入属于操作符(`∈`)这个 unicode 字符, 使用下面的组合键(添加的空白是为了清晰):

``` perl
Ctrl-Shift-u 2208 Enter
```

如果在 Unix shell 中开启了 REPL, 这也是一种在 perl 6 的 REPL 中输入 unicode 字符的方式之一.



## Perl 6中有用的 Unicode 字符

### 引号

这些字符在法语和德语中是当作引号使用的. 在 Perl 6中, 它们仍然用作引号(在 POD 中是单引号, 在普通代码中是双引号), 还可以标示超运算符. 下面是这些符号和它们的 unicode 十六进制值:

``` perl
符号 unicode代码点 ascii equivalent
«	U+00AB	      <<
»	U+00BB	      >>
```

因此, 下面这些结构是可用的:

``` perl
C« fixed-width POD text »
say (1, 2) »+« (3, 4);     # 4 6 ; element-wise add
@array »+=» 42;            # add 42 to each element of @array
say «moo»;                 # moo
my $baa = 123; say «$baa»; # 123
```

### Set/bag 操作符

下面列出的 [set/bag 操作符](http://doc.perl6.org/language/setbagmix#Set%2FBag_Operators) 都有与集合理论相关的符号, unicode 代码点, 和它们的 ascii 等价物. 要构成这样的一个字符, 只需键入字符组合键(例如 Vim中的 `Ctrl-V u`, Bash 中的 `Ctrl-Shift-u`), 然后输入 unicode 代码点的十六进制数.

``` perl
操作符	unicode代码点	ascii equivalent
∈	  U+2208	    (elem)
∉	  U+2209	    !(elem)
∋	  U+220B	    (cont)
∌	  U+220C	    !(cont)
⊆	  U+2286	    (<=)
⊈	  U+2288	    !(<=)
⊂	  U+2282	    (<)
⊄	  U+2284	    !(<)
⊇	  U+2287	    (>=)
⊉	  U+2289	    !(>=)
⊃	  U+2283	    (>)
⊅	  U+2285	    !(>)
≼	  U+227C	    (<+)
≽	  U+227D	    (>+)
∪	  U+222A	    (|)
∩	  U+2229	    (&)
∖	  U+2216	    (-)
⊖	  U+2296	    (^)
⊍	  U+228D	    (.)
⊎	  U+228E	    (+)
```

### 数学符号

Wikipedia 包含了一个 [unicode 中数学操作符和符号](https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode) 的完整列表, 还有它们数学意义的链接.

### 希腊字符

希腊字符可以用作变量名了. 查看 [Greek in Unicode Wikipedia article](https://en.wikipedia.org/wiki/Greek_alphabet#Greek_in_Unicode) 列表获取希腊和埃及字符还有它们的 unicode 代码点.

例如, 把数值3赋值给 `π`, 在 Vim 中输入(添加的空格是为了清晰):

``` perl
my $Ctrl-V u 03C0 = 3;  # same as: my $π = 3;
say $Ctrl-V u 03C0;     # 3    same as: say $π;
```

### 上标和下标

使用 `U+207x`, `U+208x` 和 (less often)  `U+209x` 范围能直接创建一个有限的[上标和下标](http://en.wikipedia.org/wiki/Superscripts_and_Subscripts)的集合. 然而, 要生成一个值的平方或立方, 你需要使用 `U+00B2` 和 `U+00B3` , 因为这些被定义在 [ Latin1 supplement Unicode block](http://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)) 中.



因此, 要书写泰勒级数展开, 你可以在 Vim 中输入:

``` perl
exp(x) = 1 + x + xCtrl-V u 00B2/2! + xCtrl-V u 00B3/3! + ... + xCtrl-V u 207F/n!
# which would appear as
exp(x) = 1 + x + x²/2! + x³/3! + ... + xⁿ/n!
```

或者指定列表中从1到k 的元素:

``` perl
 ACtrl-V u 2081, ACtrl-V u 2082, ..., ACtrl-V u 2096
 # which would appear as
 A₁, A₂, ..., Aₖ
```



## 

[原文](http://chenyf.gitcafe.io)
