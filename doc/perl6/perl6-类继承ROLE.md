### perl6 -谈谈继承机制


### demo1
```perl6
class Human {
  has $.name;
  has $.age;
}

class Employee is Human {
  has $.company;
  has $.salary;
}

```
##### 通过is关键词来实现继承<br>子类继承父类的方法和属性

####  重写
####  父类的方法不适用于子类，子类可以重写父类方法
```perl6
class Human {
  has $.name;
  has $.age;
  method introduce-yourself {
    say 'Hi i am a human being, my name is ' ~ self.name;
  }
}

class Employee is Human {
  has $.company;
  has $.salary;
  method introduce-yourself {
    say 'Hi i am a employee, my name is ' ~ self.name ~ ' and I work at: ' ~ self.company;
  }

}

my $john = Human.new(name =>'John',age => 23,);
my $jane = Employee.new(name =>'Jane',age => 25,company => 'Acme',salary => 4000);

$john.introduce-yourself;
$jane.introduce-yourself;
```

#### 如果不想父类的方法被子类继承过去<br>使用submethod关键词代替method


### 多重继承
```
  多重继承格式：class child is parentA is parentB{}
```
```perl6
class bar-chart {
  has Int @.bar-values;
  method plot {
    say @.bar-values;
  }
}

class line-chart {
  has Int @.line-values;
  method plot {
    say @.line-values;
  }
}

class combo-chart is bar-chart is line-chart {
}

my $actual-sales = bar-chart.new(bar-values => [10,9,11,8,7,10]);
my $forecast-sales = line-chart.new(line-values => [9,8,10,7,6,9]);

my $actual-vs-forecast = combo-chart.new(bar-values => [10,9,11,8,7,10],
                                         line-values => [9,8,10,7,6,9]);
say "Actual sales:";
$actual-sales.plot;
say "Forecast sales:";
$forecast-sales.plot;
say "Actual vs Forecast:";
$actual-vs-forecast.plot;

```

#### bar 和 line 中都有plot的方法,combo继承plot的时候会发生冲突。<br>因为combo先继承的是bar，所以只继承bar中的plot，不会提示你冲突报错。<br>实际场景中，子类大部分情况下会重写plot方法。

#### ROLE
##### role 和类非常像，里面存放属性和方法，同样可以被实例化。
##### role 和 class 的区别，在多重继承遇到冲突的时候可以提现出来<br>继承多个role，若发生冲突，会报错die掉<br>继承多个class，若发生冲突，不会报错，保留第一次继承的属性和方法
```
xxx must be resolved by class combo-chart because it exists in multiple roles
```
#### 多重继承的时候，使用role 更加安全。提示你是否冲突。

### 对象的自我检查的方法
- $object.WHAT 返回其对应的class
- $object.^attributes  返回这个对象的所有属性
- $object.^methods  返回这个对象的所有方法
- $object.^parents   返回这个对象所有的父类
