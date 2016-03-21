title:  Perl 6 中的术语
date: 2015-07-14 22:27:13
tags: Perl6
categories: Perl 6
---
<blockquote class="blockquote-center">开始在内心生活得更严肃的人，也会在外表上开始生活得更朴素</blockquote>


## 匿名

子例程、方法或子方法，当它们不能通过名字调用时，就被称为匿名的

```perl
# named subroutine
sub double($x) { 2 * $x };
# 匿名子例程,存储在一个具名的标量里
my $double = sub ($x) { 2 * $x };
```

注意，匿名子例程仍然可以有名字

```perl
# 使用 anon 关键字使子例程匿名
my $s = anon sub triple($x) { 3 * $x }
say $s.name;        # triple
```
## 副词

通常, 副词是函数的命名参数.  也有一些其它特殊语法形式允许副词出现在某些合适的地方:

```perl
q:w"foo bar"   # ":w" is a Quotelike form modifier adverb
m:g/a|b|c/     # ":g" is also
4 +> 5 :rotate # ":rotate" is an operator adverb
@h{3}:exists   # ":exists" is also, but is known as a subscript adverb
```
副词通常使用冒号对儿标记来表示, 因为这个原因, 冒号对儿标记法也以副词对儿形式著称:

```perl
:a(4)          # Same as "a" => 4
```

## Autothreading

`Autothreading` 是这样的: 如果你传递一个 `junction` 给子例程, 该子例程期望的参数类型为`Any` 或它的子类型. 那么这个子例程调用会被执行多次, 每次使用一个不同的 junction 状态. 这些调用的结果被组合成一个跟原 `junction` 同类型的 `junction`. 

```perl
sub f($x) { 2 * $x };
if f(1|2|3) == 4 {
    say 'success';
}
```

这里 `f()` 是含有一个参数的子例程，然而因为它没有显式的类型声明，它就被隐式的声明为 `Any` 型。 Junction 参数使 `f(1|2|3)` 调用在内部作为 `f(1)|f(2)|f(3)` 执行,而结果是跟原 `junction` 同类型的 `junction` , 即  `2|4|6`.  这种把一个 `Junction` 分成对多次函数调用的处理就叫做 `autothreading`.


## Colon Pair and Colon List

冒号对儿是用于创建或 Pair 对象的便捷语法. 两种最常见的形式是:

```perl
:a(4)          # Same as "a" => 4,   same as Pair.new(:key<a>,:value(5))
:a<4>          # Same as "a" => "4", same as Pair.new(:key<a>,:value<5>)
```

这也是人们熟知的副词对儿形式. 注意, 当冒号后面括号前面的部分不是一个合法的标识符的时候, 会应用其它语义, 不是所有的副词对儿都创建 `Pair` 对象.
另外两个常见的形式是:

```perl
:a             # Same as :a(True)
:!a            # Same as :a(False)
```

一个 colon 列表是一个仅包含冒号对儿的列表, 不需要逗号, 甚至不需要空格:

```perl
:a(4):c:!d:c   # Same as a => 4, c => True, d => False, c => True
```

## Constraint

约束是给参数或 subset 类型添加的限制. 通过单词 where 引入约束. 在下面的例子中, 约束用于确保 , 当调用一个名为 abbreviate 的子例程, 其参数为一个长度小于 10 个字符的字符串时,会抛出一个错误:

```perl
sub abbreviate (Str $thing where { .chars >= 10 }) { ... }
```

上例中的 Str 也是一个约束, 但是经常作为"类型约束".

## Instance

类的实例在其它编程语言中也叫对象. 对象存储属性, 通常是 new 方法调用的返回值, 或者是对象字面量.
大部分类型的实例被定义为 True, 例如 `defined($instance)` 为 True.

```perl
my Str $str = "hello";  ## 这使用内建类型,例如 Str
if defined($str) {
    say "Oh, yeah. I'm defined.";
} else {
    say "No. Something off? ";
}
## if you wanted objects...
class A {
    # nothing here for now.
}
my $an_instance = A.new;
say $an_instance.defined.perl;# defined($an_instance) works too.
```
类拥有方法和属性的所有蓝图, 而类的实例把蓝图带到真实世界中.

## Invocant

在 Perl 6 中调用方法的对象叫做调用者. 在方法中它就是 `self` 引用的东西.

```perl
say 'str'.uc;   # 'str' 是 方法 uc 的调用者
```

## Literal

字面量是一块直接代表对象的代码, 通常指向对象自身.

```perl
my $x = 2;      # the 2 is a literal
say $x;         # $x is not a literal, but a variable
```

## lvalue

 lvalue 或者左值是能出现在赋值操作符左侧的任何东西; 典型的左值有变量,私有属性和 `is rw`属性, 变量列表和左值子例程.
左值的例子:

```perl
Declaration             lvalue          Comments
my $x;                  $x
my ($a, $b);            ($a, $b)
has $!attribute;        $!attribute     Only inside classes
has $.attrib is rw;     $.attrib
sub a is rw { $x };     a()
```
不是左值的例子:

```perl
3                        # literals
constant x = 3;          # constants
has $.attrib;            # attributes; you can only assign to $!attrib
sub f { }; f();          # "normal" subs are not writable
sub f($x) { $x = 3 };    # error - parameters are read-only by default
```

## Mainline

`mainline` 是程序中不属于任何 block 的程序文本.

```perl
use v6;     # mainline
sub f {
            # not in mainline, in sub f
}
f();        # in mainline again
```

## Slurpy

子例程或方法中的形参如果能接收任意数量的参数, 那这个形参就会被认为是 `slurpy` 的. 它由参数名字前面的星号标出.

```perl
sub sum (*@numbers) {
    return [+] @numbers;
}
```

## Type Object

类型对象是一个代表类 `/role/package/grammar/enum` 的对象. 它通常和类型名相同.

```perl
class A { };
say A;              # A is the type object
my $x = A.new();    # same here
my $x = class {
    method greet() {
        say "hi";
    }
}

# $x now holds a type object returned from the
# anonymous class definition
```



[原文](http://chenyf.gitcafe.io)
