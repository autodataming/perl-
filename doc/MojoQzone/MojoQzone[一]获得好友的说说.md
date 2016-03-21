#### MojoQzone[一]获得好友的说说

##### 介绍
Mojo::Qzone 是基于Mojo构建的一个项目，主要用来模拟qq空间里的各种操作，以及抓取qq空间中的信息。类似于Mojo::Webqq。看到灰灰成功开发出了Webqq，所以在这个基础上，我试了下QQ空间。

##### 应用 获得好友的说说
提取好友的说说，构建好友的成长轨迹，喜怒哀乐。
```perl
#!/usr/bin/perl -w
use strict;
use lib "F:\\Qzone\\lib";
use Encode qw(encode);
use utf8;
use Mojo::Qzone;
#2149957710          	517395fcnppgcvfj
my $qq='2149957710 ';
my $uin='744891290';
my $pwd='517395fcnppgcvfj';
my $client=Mojo::Qzone->new(
qq=>$qq,
pwd=>$pwd,
login_type=>'login',
);
$client->login();
#定义登陆成功触发事件
$client->on(login=>sub{shift->info("Login Success\n,You can do interesting thing by it")});

my @text=$client->getshuoshuo($uin,40);
my @result;

map{push @result,encode("gbk",$_)} @text;
my $file=$uin.'_result.txt';
open FH,">$file";
print FH @result;

```
##### 更多精彩应用
发挥想象，MojoQzone可以带给你更多精彩。
比如自动关注特定朋友说说，自动点赞。

##### 项目地址
在github上面，点击下面的原文链接可以直达。
