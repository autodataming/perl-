# perl6 类和对象

### 类和对象是现代语言的核心以及项目的核心。极其重要。

### perl5 原生的对象bless用起来不方便，可以借助moose模块实现，<br>现在perl6来了，让对象更简单。

### demo1 创建人的模型
```perl6
class Human
{
has $name;
has $age;
has $sex;
has $nationlity;
}

my $joy=Human.new(name=>'joy',age=>23,set=>'M',nationlity='China');
say $joy;
```

> class 关键词定义一个类<br>
> has  定义类的属性 <br>
> new  对象构建器

## 类的特性之一 封装
>### 在类中，默认所有的属性都是私有的<br>
### 所以在上面的代码中，<br>你无法通过$joy.name 访问name属性

## 封装的形象比喻
### 属性就好比是各种玩具，封装就是把这些玩具装在各自带锁的箱子里<br>这样你就拿不到里面的任何一个玩具<br>既然有锁，如果想拿到玩具，那只要造一把钥匙就行。<br>方法就是那把钥匙。

** 构建器也不能为私有属性初始化,不管赋予什么值，结果都是any,  **
** 私有属性的赋值只有2个途径，一是在申明的时候，而是通过钥匙方法进行修改 **
> ### 想获得玩具，也可以把锁去掉 $.name; <br>  这样就变成了公有属性。

```perl6
class Human
{
  has $.name is rw;
  has $age;

  method setage($x)
  {
    $!age=$x;
  }
  method getage
  {
     return self!age;
  }
}


my $joy=Human.new(name=>'joy');
$joy.setage(10);
say $joy.getage;
```

对于perl6 来说，封装太容易实现了。
使用twigils(第二符号！.)
默认class中的所有属性都是封装好了的，
建议在类中使用!显式声明属性是私有的。
> “By default, all attributes are private but it is a good habit to always use the ! twigil.”

has $.name 来说,  $ 是第一符号， . 是第二符号

> ### 默认这些玩具是可读不可写的，也就是不能自行改装。

```perl6
class Human {
  has $.name;
  has $.age;
  has $.sex;
  has $.nationality;
  has $.eligible;
  method assess-eligibility {
      if self.age < 21 {
        $!eligible = 'No'
      } else {
        $!eligible = 'Yes'
      }
  }

}

my $john = Human.new(name => 'John', age => 23, sex => 'M', nationality => 'American');
$john.assess-eligibility;
say $john.eligible;
```
> 类中访问属性有两种方式，$! 以及self. 对于公有属性效果是一样的，
对于私有属性必须要用$!
>$age   $!age  一样的<br>
>self.age   $.age 一样的 注意$就是$!,
