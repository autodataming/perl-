### perl模块推荐[三]-Mojo::EventEmitter

#### 摘要
基本每个语言中都会有EventEmitter的类，可见这个模块的重要性。
通过Mojo-EventEmitter可以构建事件对象。一般情况下，事件对象是依附于其他具体的对象的。

##### 基本概念
事件名称，事件处理函数，一个事件名称可以绑定多个事件处理函数。
事件对象 my $event_object=Mojo::EventEmitter->new();但是一般情况下，事件对象不是独立存在的。一般依附于具体的对象，也就是其它类通常会继承事件类。
```perl
package Cat;
use Mojo::Base 'Mojo::EventEmitter';
```
* 通过**on**将事件名称和事件处理函数进行绑定。
* 通过**once**绑定的是一次性事件处理函数，执行完一次后，该事件处理函数会自动和事件名称解除绑定。
* 通过**emit**调用事件名称，触发所有绑定的事件处理函数。
* 通过**has_subscribers** 检查某个事件（名称）是否存在。
* 通过**subscribers** 获得该事件（名称）绑定的所有事件处理函数，返回一个数组应用。
* 通过**unsubscribe** 清除某个事件名称，或者清除某个事件上绑定的函数。

#### 实际应用-demo
在类中定义好事件名称，事件处理函数，还是在对象中定义事件名称，事件处理函数。根据具体情况自行安排。
**类中一定要继承Mojo::EventEmitter。**
```perl
package Cat;
use Mojo::Base 'Mojo::EventEmitter';

sub new {
  my $self = shift->SUPER::new(@_);
  $self->on(message => \&_message);
  $self->on(message => \&_message2);
  $self->once(message => \&_message3);
  return $self;
}

sub _message {
  my ($self, $message) = (shift, shift);
  print $message,"\n";

}
sub _message2 {
  my ($self, $message) = (shift, shift);
  print $message,"222\n";

}
sub _message3 {
  my ($self, $message) = (shift, shift);
  print $message,"333\n";

}
sub sing { shift->emit('message', shift, @_) }  
1;

my $cat=Cat->new();
$cat->sing("miao miao");
$cat->sing("ji ji");

```
