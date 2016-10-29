#### perl模块推荐07_Mojo::IOLoop事件编程

##### 摘要
编程有多种模式，比如面向对象编程，面向指针编程，面向事件编程。面向事件编程主要应用场景是GUI编程。Mojo::IOLoop是一个非常好用的面向事件编程模块。

##### 事件编程
>在主流程中你基本只有一个主体框架,程序的动作触发都是由事件来驱动.比如我们使用的窗口程序.点最大化最小化,都是基于事件,当接收到了最大化的事件做最大化事件那部分的程序开始运行.不在从头到尾部来执行.所以我们读基于事件的程序,最好是画成思维导图来帮助我们理解.

来源 凯哥的博客(http://www.php-oa.com/2011/03/23/perl-anyevent-ev.html)

##### 监控者
- **TIMER**
- 以后再补充

##### 条件变量

##### 时间事件监控框架
``` perl
use Mojo::IOLoop;
#定义回调函数
my $cb=sub{};

# Add a timer
#每隔5s触发回调函数
Mojo::IOLoop->timer(5 => $cb);

# Start event loop if necessary
#一切都是循环,开启循环模式
Mojo::IOLoop->start unless Mojo::IOLoop->is_running;
```

##### 场景
监控磁盘的可用空间大小，如果空间达到阈值则发送邮件提醒。

##### demo

```perl
#!/bin/usr/perl -w

use strict;
use Mojo::IOLoop;
my $command2='df -BG|grep sda2';
my $cb=sub
{
	my $message2=`$command2`;
	my @info=$message2=~/(\S+)/g;
	my ($left)=$info[2]=~/(\d+)/;
	if ($left <100)
	{

	   my $command="./sendEmail -f xxn\@mm.cc.cn -t 101xxx4\@qq.com -u".' "NO space"'.' -m "'.$message2.'"';
	   `$command`;

	}
};
my $time=4*60*60;
Mojo::IOLoop->recurring($time=>$cb);
Mojo::IOLoop->start unless Mojo::IOLoop->is_running;

```
##### while版本
```perl
while(1)
{
sleep $time;
$cb->();


}
```
Mojo::IOLoop 对while循环进行了封装，除了有timer监控，还内置了其他监控，更加方便。
##### **recurring** VS **timer**
- recurring
>Mojo::IOLoop->recurring($time=>$cb);<br>
每隔一定的时间执行回调函数，循环执行。
- timer
>Mojo::IOLoop->recurring($time=>$cb);<br>
等待一定的时间执行回调函数，只执行一次。
##### linux下常用命令
- 查看文件夹暂用大小
> du -s -BG ~/Downloads

**-s**代表 只显示指定文件夹的总的大小，不显示内部文件以及文件夹的大小。<br>
**-BG ** 代表文件大小的单位使用G作为单位
