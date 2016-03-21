#### MojoWeixin揭秘[一]插件的实现原理

##### 摘要
MojoWeixin 是使用Perl语言编写的微信客户端框架，基于Mojolicious。里面把Web微信中的接口，通过F12进行了抓包分析。为了增强趣味性，留了一个插件接口，这样我们就可以通过编写插件，来增强WebWeixin的趣味性。


##### 插件实现机制
###### step1 对外接口load
``` perl
priority        #可选，设置插件优先级，默认是0，
#较高的优先级能够使得插件优先执行
auto_call       #可选，设置是否加载完成后自动执行，默认为1
call_on_load    #可选，加载完插件马上执行，默认为0
data            #可选，设置加载插件时可以携带的数据，将会在call的时候传递给插件本身

$client->load(["plugin1","plugin2"],data=>[1,2,3,]);
$client->load("plugin",priority=>0,auto_call=>1);
```
我们知道Weixin这个类中有load的方法,
###### step2 load是在哪里实现的
```perl
package Mojo::Weixin;
our $VERSION = '1.0.5';
use Mojo::Weixin::Base 'Mojo::EventEmitter';
use Mojo::IOLoop;
use Mojo::Weixin::Log;
use File::Spec ();
use POSIX ();
use Carp ();
use base qw(Mojo::Weixin::Util Mojo::Weixin::Model Mojo::Weixin::Client Mojo::Weixin::Plugin Mojo::Weixin::Request);
````
我们知道可能在**Mojo::Weixin::Plugin.pm**中实现，Plugin作为Weixin的父类。
######  step3 load如何实现
在Mojo::Weixin::Plugin.pm中果然找到了load的实现细节
``` perl
package Mojo::Weixin::Plugin;
sub load {
    my $self = shift;
    my @module_name;
    my %opt;
    if(ref $_[0] eq "ARRAY"){
        @module_name = @{shift @_};
    }
    else{
        push @module_name,shift;
    }
    %opt= @_;

    for my $module_name (@module_name){
        my $module_function = undef;
        if(substr($module_name,0,1) eq '+'){
            substr($module_name,0,1) = "";
            $module = $module_name;
        }
        else{
            $module = __PACKAGE__ . "::" . $module_name;
        }
        eval "require $module";
        $self->die("加载插件[ $module ]失败: $@\n") if $@;
        $module_function = *{"${module}::call"}{CODE};
        $self->die("加载插件[ $module ]失败: 未获取到call函数引用\n") if ref $module_function ne 'CODE';
        $self->debug("加载插件[ $module ]");
        $self->plugins->{$module}{code} = $module_function;
        $self->plugins->{$module}{name} = $module;
        $self->plugins->{$module}{data} = $opt{data};
        $self->plugins->{$module}{priority} = $opt{priority} || eval "\$${module}::PRIORITY" ||  0;
        $self->plugins->{$module}{call_on_load} = $opt{call_on_load} || eval "\$${module}::CALL_ON_LOAD" ||  0;
        if($self->plugins->{$module}{call_on_load}){
            $self->emit("plugin_load",$module);
            $self->call($module);
        }
        else{
            $self->plugins->{$module}{auto_call} = $opt{auto_call} || eval "\$${module}::AUTO_CALL" || 1 ;
            $self->emit("plugin_load",$module);
        }
    }
    return $self;
}

```
继续深扒细节
###### step4 load 接受的参数
```perl
#load接受的第一个参数是模块数组引用或者是一个模块的名称
if(ref $_[0] eq "ARRAY"){
    @module_name = @{shift @_};
}
else{
    push @module_name,shift;
}
```
###### step5 相对命名空间 绝对命名空间的区分+
```perl
if(substr($module_name,0,1) eq '+'){
    substr($module_name,0,1) = "";
    $module = $module_name;
}
else{
    $module = __PACKAGE__ . "::" . $module_name;
}
```
有+号的是绝对命名空间，没有+号的是相对命名空间。
step5 插件的设计结构

###### step6 读取符号表**symbol table**
``` perl
 $module_function = *{"${module}::call"}{CODE};
```
参考 Symbol::Table 对*进行了封装。
另外用UNIVERSAL->can 之类也能获取到包里的函数，从而得到该函数的引用。
###### step7 触发插件加载事件函数
+ 触发call情景1
```perl
if($self->plugins->{$module}{call_on_load})
{
     $self->emit("plugin_load",$module); #预留接口
     $self->call($module);
}
```
+ 触发call情景2 ready

ready事件触发时 表示客户端一切准备就绪：已经成功登录、已经加载完个人/好友/群信息等
#你的代码建议尽量写在 ready 事件中
``` perl
sub ready {
    my $self = shift;
    #加载插件
    my $plugins = $self->plugins;
    for(
        sort {$plugins->{$b}{priority} <=> $plugins->{$a}{priority} }
        grep {defined $plugins->{$_}{auto_call} and $plugins->{$_}{auto_call} == 1} keys %{$plugins}
    ){
        $self->call($_);
    }
```
+ 触发call情景3 接受消息后触发
在插件中，订阅了receive_message,
``` perl
 $client->on(receive_message=>$callback,send_message=>$callback);
```
在handle.pm中我们可以发现
```perl
if($msg->class eq "recv"){
          $self->emit(receive_message=>$msg);
      }
```



###### 简单总结基于接受消息自动回复插件的实现框架

``` perl
package  xxx;
sub  call
{
  my $client = shift;
  #处理接受的参数
  my $data = shift;
  ... ...


  my $callback = sub
  {
     my($client,$msg) = @_;
     my $command = $msg->content; #把消息作为命令
    if($msg->type eq "group_message")
    {
        $client->send_media($msg->group,$pin->{url},sub{$_[1]->from("bot")});
    }
    elsif($msg->type eq "friend_message" and $msg->class eq "recv")
    {
       $client->send_media($msg->sender,$pin->{url},sub{$_[1]->from("bot")})
    }

  };

  $client->on(receive_message=>$callback,send_message=>$callback);
}

1;

```
**详细案例下次讲解。**


**perl层次区分：**
+ level0： 什么都不会，
+ level1： 会写简单的代码，不习惯用sub写函数。
+ level2： 习惯sub组织代码，不熟悉嵌套hash。
+ level3： 熟悉各种数据结构，开始接触metacpan
+ level4： 喜欢面向对象的编程
+ level5： 能快速使用metacpan上的模块
+ level6： 不满足于模块的公有方法，深扒内部细节，阅读源码
+ level7： 熟悉各种编程语言
... ...
你到哪一级了？

关注Mojo Weixin,点阅读原文进入github
+ github  https://github.com/sjdy521/Mojo-Weixin
+ metacpan https://metacpan.org/pod/distribution/Mojo-Weixin/doc/Weixin.pod#receive_message

更好玩的插件，有你更精彩。

·
