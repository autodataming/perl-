#### perl-Tk坑[01] 失去焦点以及作用域问题


##### 摘要
踩的坑越多，走的路越远。我年轻过、落魄过、幸福过，我对生活一往情深。

##### 摘要
事件编程和顺序编程是2个截然不同思维方式。大部分人更习惯顺序编程，而现实世界中事件编程又无处不在，比如红灯停，绿灯行就是典型的事件过程；5点下班，就是时间触发的事件；受到攻击，触发躲闪反应。所有的这些都有一个共同特点，一直在等待某件事的发生，若该事发生则会做过相应的响应。事件和顺序又是彼此不可分割的，事件的相应中往往包含顺序的执行一系列的动作。更详细可以参考介绍Mojo::EventEmitter的文章。


##### 代码
这是一段顺序编程和事件编程的混合代码。  
```perl
#!perl -w
use strict;
use Tk;
use Tk qw(exit);
use Tk::PNG;


&Test1();

sub Test1
{

my $mw1 = new MainWindow;
$mw1 -> geometry ("700x500");


my $photo1 = $mw1->Photo('-format' => 'png', -file => '1.png');
my $label1 =$mw1 ->Label(-image=>$photo1)->pack(-side =>"top");

$mw1->bind('<Return>'=>sub {&report($mw1)});
sub report
{
   $_[0]->destroy();

    return 0;

}

MainLoop;

}


&Test2();
sub Test2
{
my $mw2 = new MainWindow(-takefocus=>0);

$mw2->after(500,sub {$mw2->focus(-force)});

#$mw2->focusLast;
my $who = $mw2->focusCurrent;
#print $who,"\n";
$mw2->focusForce;
$mw2 -> geometry ("700x500");
my $photo2 = $mw2->Photo('-format' => 'png', -file => '2.png');
my $label2 =$mw2->Label(-image=>$photo2)->pack(-side =>"top");
$mw2->bind('<Return>'=>sub {&report2($mw2)});
$label2->focus;
sub report2
{

  $_[0]->destroy();



}
MainLoop;
}
```
##### 代码功能
这段代码主要实现了调用函数打开一张图片，等待回车事件，触发关闭图片，实现了事件编程和顺序编程的混合。
##### 坑1 作用域问题
对于非事件编程
```perl
&test();
sub test
{
 $a=6;
 $b=8;
 printadd();
 sub printadd
 {
    print $a+$b;   
 }


}
```
这是没有问题的。  
在事件编程中，

```perl

&Test1();

sub Test1
{

my $mw1 = new MainWindow;
$mw1 -> geometry ("700x500");


my $photo1 = $mw1->Photo('-format' => 'png', -file => '1.png');
my $label1 =$mw1 ->Label(-image=>$photo1)->pack(-side =>"top");

$mw1->bind('<Return>'=>sub {&report($mw1)});
sub report
{
   $_[0]->destroy();

    return 0;

}
```
如果不主动传递$mw1 给report函数，则会报错
> Variable '$mw1' will not stay shared at xxx.pl
perl 中的匿名函数，就相当于python中lambda的作用，起到延迟调用的目的。

##### 坑2 聚焦问题
执行完test1后，第一个窗口关闭，开始执行test2，第二个窗口打开，鼠标聚焦到cmd窗口中，
直接focus无法让鼠标定位到窗口，需要after挂起，然后定位focus到第二个窗口。  
** $mw2->after(500,sub {$mw2->focus(-force)});  **
