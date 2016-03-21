title: 面向对象的 Perl 6

date: 2015-07-14 22:34:50

tags: Perl6

categories: Perl 6



------

<blockquote class="blockquote-center">知道和做到的区别，就是看到月亮和登月的区别</blockquote>

 Perl 6 有很多预先定义好的类型，这些类型可以归为 2 类：`普通类型`和`原生类型`。原生类型用于`底层类型`（例如 uint 64）。原生类型没有和对象同样的功能，尽管你可以在它们身上调用方法， 它们还是被包装成普通的对象。所有你能存储到变量中的东西要么是一个原生的 value， 要么是一个对象。这包括字面值、类型（类型对象）、code 和容器。

## 使用对象



方法可以有参数， 但是方法名和参数列表之间不可以有空格：

``` perl
say "abc".uc;                   
#        ^^^ 不带参数的方法调用
my @words = $string.comb(/\w+/);
#                  ^^^^^^^^^^^^ 带一个参数的方法调用
```

另外一种方法调用的语法将方法名和参数列表用一个冒号分开(冒号紧跟方法名, 中间不能有空格):

``` perl
say @*INC.join: ':';
```

方法能返回一个可变容器, 这种情况下 你可以赋值给方法调用的返回值.

``` perl
$*IN.input-line-separator = "\r\n";
```

## 类型对象

Types本身就是对象 ，你可以使用类型的名字获取 type object :

``` perl
my $int-type-obj = Int;
```

你可以通过调用 WHAT 方法查看任何对象的 type object(它实际上是一个方法形式的macro):

``` perl
my $int-type-obj = 1.WHAT;
```

使用 === 操作符可以比较 类型对象的相等性：

``` perl
sub f(Int $x) {
    if $x.WHAT === Int {
        say 'you passed an Int';
    }
    else {
        say 'you passed a subtype of Int';
    }
}
```

子类型可以使用 smart-matching来检查：

``` perl
if $type ~~ Real {
    say '$type contains Real or a subtype thereof';
}
```

## 类

使用 class 关键字进行类的定义：

``` perl
class Journey {
}
```

声明一个词法作用域的类：

``` perl
my class Journey {
}
```

这在嵌套类中很有用。

## 属性

属性存在于每个类的实例中。属性中存储着对象的状态。在 Perl 6 中, 一切属性都是`私有的`.  它们一般使用 `has` 关键字和 `!` twigil 进行声明.

``` perl
class Journey {
    has $!origin;
    has $!destination;
    has @!travellers;
    has $!notes;
}
```

然而, 没有像这样的公共(甚至保护属性)属性, 不过有一种方式能`自动生成访问方法`: 使用 `. `代替 `!` twigil 。(那个 `.` 应该让你想起了**方法调用**).

``` perl
class Journey {
    has $.origin;
    has $.destination;
    has @!travellers;
    has $.notes;
}
```

这默认提供了一种**只读**的取值方法, 为了允许更改属性, 要添加 `is rw` 特性:

``` perl
class Journey {
    has $.origin;
    has $.destination;
    has @!travellers;
    has $.notes is rw;
}
```

因为类默认继承于构造器 `Mu`, 我们也要求类为我们生成一些**存取方法**.

``` perl
# 创建一个新的类的实例.
my $vacation = Journey.new(
    origin      => 'Sweden',
    destination => 'Switzerland',
    notes       => 'Pack hiking gear!'
);
# 使用存取器; 这打印出 Sweden.
say $vacation.origin;
# 使用 rw 存取器来更改属性的值.
$vacation.notes = 'Pack hiking gear and sunglasses!';
```

注意, 默认的构造器只会设置含有存取器方法的属性.

## 方法

使用 `method` 关键字定义类中的方法：

``` perl
class Journey {
    has $.origin;
    has $.destination;
    has @!travellers;
    has $.notes is rw;

    method add_traveller($name) {
        if $name ne any(@!travellers) {
            push @!travellers, $name;
        }
        else {
            warn "$name is already going on the journey!";
        }
    }

    method describe() {
        "From $!origin to $!destination"
    }
}
```

方法可以有签名, 就像子例程一样。 方法中能访问对象的属性,  并且总是能使用 `!` twigil, 即使属性是用 `.` twigil 声明的. 这是因为, . twigil 是在那个位置上使用 ! twigil 声明了属性, 然后额外又添加了一个取值器方法.

即 `has $.attribute` 等价于:

``` perl
    has $!attribute
    method attribute() { ... }
```

``` perl
class A {    
    has $.attr is rw;
}
```

等价于:

``` perl
class A {    
    has $!attr;    
    method attr() is rw {
        $!attr;
    }
}
```

在 describe 方法中使用 $!origin 和 $.origin ,这之间有一个微小但很重要的差别.  $!origin 只是属性的简单查看. 它是廉价的, 并且你知道它是类中声明的属性. $.origin 真正的是一个方法调用, 因此能在子类中被覆写. 如果你真的显式地要覆写它才使用 $.origin 吧.

## self

在方法内部, self 是可用的, 它被绑定到调用者, 例如方法调用的对象. self 能用于在调用者上调用深层的方法, 例如:

### 私有方法

在方法的名字前面引入一个感叹号, 这个方法就变为类的私有方法, 这个方法只在内的内部使用, 不能在其它任何地方调用.

私有方法的调用要使用感叹号而非点号:

``` perl
method !do-something-private($x) {
    ...
}
method public($x) {
    if self.precondition {
        self!do-something--private(2 * $x)
    }
}
```

私有方法不能被子类继承.

### 子方法

submethod  是不会被子类继承的公开方法。从词干名来看它们在语义上与子例程类似。

Submethods 对于对象构建和解构任务很有用。



## 继承

类可以有父类:

``` perl
class Child is Parent1 is Parent2 { }
```

如果在子类中调用一个方法, 但是子类没有提供那个方法, 就会调用父类中同名的方法, 如果父类中存在那个方法的话. 父类被询问的顺序就叫做方法解析顺序(MRO). Perl 6 使用 C3 方法解析顺序. 你可以通过调用一个类型的元类型方法得知这个类型的 MRO.

``` perl
say Parcel.^mro;    # Parcel() Cool() Any() Mu()
```

如果一个类没有指定它的父类, 就假定默认为 `Any`. 所有的类都直接或间接的派生于 Mu-类型层级的根.



## 对象构造

对象通常通过方法调用创建, 或者通过类型对象或者通过同类型的其它对象创建. 类 Mu 提供了一个叫做 new 的构造器方法, 这个方法接收命名参数然后使用它们来初始化公共属性.

``` perl
class Point {
    has $.x;
    has $.y = 2 * $!x;
}
my $p = Point.new( x => 1, y => 2);
#             ^^^ 继承自类 Mu
```

`Mu.new` 在调用者身上调用 `bless` 方法, 传递所有的具名参数. bless 创建新的对象, 然后调用该对象的 `BUILDALL` 方法.  **BUILDALL** 以`相反的`方法解析顺序(继承层级树自上而下)遍历所有子类(例如, 从 Mu 到 派生类), 并且在每个类中检查名为 `BUILD` 的方法是否存在。 如果存在就调用它, 再把传递给 new 方法的所有具名参数传递给这个 `BUILD` 方法。 如果没有, 这个类的公开属性就会用`同名的`具名参数进行初始化.  这两种情况下, 如果 **BULID** 方法和 **默认构造函数** 都没有对属性进行初始化, 就会应用默认值 (上面例子中的 `2 * $!x`)。

这种构造模式对于自定义构造器有几处暗示. 首先, 自定义 BUILD 方法应该总是子方法(submethod), 否则它们会中断子类中的属性初始化. 第二, BUILD 子方法能用于在对象构造时执行自定义代码. 它们也能用于为属性初始化**创建别名**:

``` perl
class EncodedBuffer {
    has $.enc;
    has $.data;

    submethod BUILD(:encoding(:$enc), :$data) {
        $!enc  := $enc;
        $!data := $data;
    }
}
my $b1 = EncodedBuffer.new( encoding => 'UTF-8', data => [64, 65] );
my $b2 = EncodedBuffer.new( enc      => 'UTF-8', data => [64, 65] );
#  现在 enc 和 encoding 都被允许
```

因为传递实参给子例程把实参绑定给了形参, 如果把属性用作形参,单独绑定那一步就不需要了. 所以上面的例子可以写为:

``` perl
submethod BUILD(:encoding(:$!enc), :$!data) {
    # nothing to do here anymore, the signature binding
    # does all the work for us.
}
```

第三个暗示是如果你想要一个接收位置参数的构造函数, 你必须自己写 new 方法:

``` perl
class Point {
    has $.x;
    has $.y;
    method new($x, $y) {
        self.bless(*, :$x, :$y);
    }
}
```

然而, 这不是最佳实践, 因为这让来自子类的对象的初始化正确更难了.

## Roles



Roles 在某种程度上和类相似, 它们都是属性和方法的集合. 不同之处在于,  roles 是用来描述对象行为的某**一部分**的, 和 roles 怎样应用于类中. 或怎样解析。 类用于管理对象实例, 而 roles 用于**管理行为**和**代码复用**。

``` perl
role Serializable {
    method serialize() {
        self.perl; # 很粗超的序列化
    }
    method deserialization-code($buf) {
        EVAL $buf; #  反转 .perl 操作
    }
}

class Point does Serializable {
    has $.x;
    has $.y;
}
my $p = Point.new(:x(1), :y(2));
my $serialized = $p.serialize;      # 由 role 提供的方法
my $clone-of-p = Point.deserialization-code($serialized);
say $clone-of-p.x;      # 1
```

编译器一解析到 role 声明的闭合花括号, roles 就不可变了。

## Role Application

Role 应用和类继承有重大不同。 当 role 应用到类中时, 那个 role 的方法被复制到类中。如果多个 roles 被应用到同一个类中, 冲突( 例如同名的非 multi 方法(s) )会导致编译时错误, 这可以通过在类中提供一个同名的方法来解决冲突。

这比多重继承更安全, 在冲突从来不会被编译器检测到的地方, 但是代替的是借助于在 MRO 中出现更早的父类, 这可能是也可能不是程序员想要的。



当一个 role 被应用到第二个 role上, 实际的程序被延迟直到第二个 role 被应用到类, 这时两个 roles 才都被应用到那个类中。 因此：



``` perl
role R1 {
    # methods here
}
role R2 does R1 {
    # methods here
}
class C does R2 { }
```

等价于：

``` perl
role R1 {
    # methods here
}
role R2 {
    # methods here
}
class C does R2 does R1 { }
```

## Stubs

当 role 中包含了一个 stubbed 方法, 在这个 role 被应用到类中时, 必须提供一个同名的非 stubbed 版本的方法。这允许你创建如抽象接口那样的 roles。这有点像 Swift 中的 Protocol 协议。

``` perl
role AbstractSerializable {
    method serialize() { ... }  # 字面的三个点 ... 把方法标记为 stub
}

#  下面是一个编译时错误, 例如
#        Method 'serialize' must be implemented by APoint because
#        it is required by a role
class APoint does AbstractSerializable {
    has $.x;
    has $.y;
}

# 这个有效:
class SPoint does AbstractSerializable {
    has $.x;
    has $.y;
    method serialize() { "p($.x, $.y)" }
}
```

那个 stubbed 方法的实现也可能由另外一个 role 提供。

TODO: 参数化的 roles



## 元对象编程和自省

Perl 6 有一个元对象系统, 这意味着对象,类,roles,grammars,enums 它们自身的行为都被其它对象控制; 那些对象叫做元对象(想想元操作符, 它操作的对象是普通操作符). 元对象, 像普通对象一样,  是类的实例, 这时我们称它们为元类.

对每个对象或类, 你能通过调用 `.HOW`方法获取元对象. 注意, 尽管这看起来像是一个方法调用, 然而它实际上是编译器中的特殊案列, 所以它更像一个 macro.

所以, 你能用元对象干些什么呢? 你可以通过比较元类的相等性来检查两个对象是否具有同样的元类:

``` perl
say 1.HOW ===   2.HOW;      # True
say 1.HOW === Int.HOW;      # True
say 1.HOW === Num.HOW;      # False
```

Perl 6 使用单词 `HOW`, Higher Order Workings, 来引用元对象系统. 因此, 在 Rakudo 中不必对此吃惊, 控制类行为的元类的类名叫做 `Perl6::Metamodel::ClassHow`. 每个类都有一个 `Perl6::Metamodel::ClassHOW`的实例.

但是,理所当然的, 元模型为你做了很多. 例如它允许你内省对象和类.  元对象方法调用的约定是, 在元对象上调用方法, 并且传递感兴趣的对象作为对象的第一参数. 所以, 要获取对象的类名, 你可以这样写:

``` perl
my $object = 1;
my $metaobject = 1.HOW;
say $metaobject.name($object);      # Int
# or shorter:
say 1.HOW.name(1);                  # Int
```

为了避免使用同一个对象两次, 有一个便捷写法:

``` perl
say 1.^name;                        # Int
# same as
say 1.HOW.name(1);                  # Int
```

## 内省

内省就是在运行时获取对象或类的信息的过程. 在 Perl 6 中,  所有的内省都会搜查原对象. 标准的基于类对象的 ClassHow 提供了这些工具:

### can

给定一个方法名, 它返回一个Parcel, 这个 Parcel 里面是可用的方法名

``` perl
class A      { method x($a) {} };
class B is A { method x()   {} };
say B.^can('x').elems;              # 2
for B.^can('x') {
    say .arity;                     # 1, 2
}
```

在这个例子中, 类 B 中有两个名为 x 的方法可能可用(尽管一个正常的方法调用仅仅会直接调用安置在 B 中那个方法). B 中的那个方法有一个参数(例如, 它期望一个参数, 一个调用者(self)), 而 A 中的 x 方法期望 2 个参数( self 和 $a).

### methods

返回类中可用公共方法的列表( 这包括父类和 roles 中的方法). 默认它会停在类 Cool, Any 或 Mu 那儿; 若真要获取所有的方法, 使用副词 `:all`.

``` perl
class A {
    method x() { };
}
say A.^methods();                   # x
say A.^methods(:all);               # x infinite defined ...
```

### mro

按方法解析顺序返回类自身的列表和它们的父类.  当方法被调用时, 类和它的父类按那个顺序被访问.(仅仅是概念上; 实际上方法列表在类构建是就创建了).

``` perl
say 1.^mro;                         # (Int) (Cool) (Any) (Mu)
```

### name

返回类的名字:

``` perl
say 'a string'.^name;               # Str
```

### parents

返回一个父类的列表. 默认它会停在 Cool, Any 或者 Mu 那儿, 但你可以提供一个副词 `:all`来压制它. 使用副词 `:tree` 会返回一个嵌套列表.

``` perl
class D             { };
class C1 is D       { };
class C2 is D       { };
class B is C1 is C2 { };
class A is B        { };
say A.^parents(:all).perl;          # (B, C1, C2, D, Any, Mu)
say A.^parents(:all, :tree).perl;
    # ([B, [C1, [D, [Any, [Mu]]]], [C2, [D, [Any, [Mu]]]]],)
```



[原文](http://chenyf.gitcafe.io)

