#### perl爬虫01-花瓣网相册

##### 摘要
说好的爬虫，来了。
##### 花瓣网的特点
- 获取图片不需要js的加密参数
- 下载图片没有ip限制
- 最大难点就是下拉刷新的分析

##### 材料
- 选择20194339画板  
  http://huaban.com/boards/20194339/
- Mojo::UserAgent  
  虽然以前一直用LWP::UserAgent;这里我还是推荐使用Mojo::UserAgent。Mojo 模块是perl中的一个超现代化的模块，设计巧妙，值得使用，源码值得学习。

##### 代码
``` perl

#!/usr/bin/perl -w

use strict;

#http://huaban.com/boards/20194339/?isit1k4v&max=801822869&limit=20&wfl=1
#http://huaban.com/boards/20194339/?isitjz3j&max=815376046&limit=20&wfl=1
use Mojo::UserAgent;

use Mojo::UserAgent::CookieJar;
my $ua = Mojo::UserAgent->new();
my $browser='Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.2.2000 Chrome/30.0.1599.101 Safari/537.36';

$ua->transactor->name($browser);
my $cookie_jar = $ua->cookie_jar;

$ua = $ua->cookie_jar(Mojo::UserAgent::CookieJar->new);

my $num_pic=0;

my $starturl='http://huaban.com/boards/20194339/?isiv0rfd&max=815376046&limit=20&wfl=1';
my $body;
my $jsonbody;
my ($pin_id,$key);
my ($pngurl,$pngfile);
my $baseurl='http://hbimg.b0.upaiyun.com/';
#http://hbimg.b0.upaiyun.com/fe173884487ad214e33618cfde38048c5ae9d36d179fa-MrT0Jm_fw658
#http://hbimg.b0.upaiyun.com/18a99555087732657fc8d4e9eeecdb95c723298d3cbd4-XGX6Oz
#http://hbimg.b0.upaiyun.com/fe173884487ad214e33618cfde38048c5ae9d36d179fa-MrT0Jm_fw658
#http://hbimg.b0.upaiyun.com/a61fed0ce6bdc3136d49339ba3255e10f2869ad31e2d20-sKCnHq_fw658
while(1)
{  
    $body=$ua->get($starturl)->res->body;
    while($body=~/"pin_id":(\d+),.*?"key":"(\S+?)",/msg)
    {
           ($pin_id,$key)=($1,$2);
           print $pin_id,"\n";
          $pngurl=$baseurl.$key.'_fw658';
          #print "pngurl: $pngurl\n";         
          $pngfile=$pin_id.'.jpg';
         # print "$pngfile\n";
          $ua->get($pngurl)->res->content->asset->move_to($pngfile);
          $num_pic++;
          if($num_pic>200)
          {
             print "you have download 200 Photos\n";
            last;          
           }

    }
   $starturl=~s/max=\d+/max=$pin_id/;


   $ua = $ua->cookie_jar(Mojo::UserAgent::CookieJar->new);


    if($num_pic>200)
    {
       print "you have download 200 Photos\n";
       last;   

    }
}



```
##### 下拉刷新分析过程
复杂操作，我推荐使用chrome/F12来分析。  
下拉的时候，观察有哪些链接产生,主要观察网络Network下的html 和xhr的标签,
将xhr中图片在新的标签中打开，发现正是我们想要的图片。

- http://huaban.com/boards/20194339/?isit1k56&max=720127541&limit=20&wfl=1
- http://huaban.com/boards/20194339/?isit1k57&max=708887482&limit=20&wfl=1
- http://huaban.com/boards/20194339/?isit1k58&max=700254493&limit=20&wfl=1

从chrome 中我们还可以看到该xhr的发起者是mootools.js 发起的。如果js足够好的话，通过分析js是可以知道这3个参数是这么来的。
js的逆向分析是非常具有挑战性的工作，淘宝的js 目前还没有分析完。
这里我使用了一个trick，直接搜索这里的数值720127541，708887482，700254493。发现其是图片的pin_id。
另外该get 返回的是一个json,对于结构处理方便，这样我们可以直接从这里开始爬数据，就没必要从首页开始。


##### 过程
1. 创建浏览器$ua
2. 获取内容$body
3. 解析body获取key 和pin_id
4. 构造新的url,循环采集

##### trick
**利用g选项实现循环匹配，注意格式，赋值语句在内部**
