#### perl模块推荐18-图形界面编程利器Tk

##### 摘要
程序员要不要写图形界面，我认为是会写简单界面，没必要追求特效。而Tk作为一个经典的GUI库，具有学习简单，代码少，使用方便，界面简单简洁等特点，非常适用于行业软件的开发。
##### 摘要
事件驱动编程是编程中的一种模式，区别于顺序执行。监控事件，如果事件发生，则触发函数。而GUI编程非常有利于帮助大家理解事件编程。  
程序员要不要写图形界面，我认为是会写简单界面，没必要追求特效。而Tk作为一个经典的GUI库，具有学习简单，代码少，使用方便，界面简单简洁等特点，非常适用于行业软件的开发。


##### Tk 的安装
一个网友，装了好几天的Tk,没有安装上。作为一个经典模块，会有这样的问题实在可惜。
所有的模块都不推荐解压+拷贝的安装模式，这不能解决含c代码的模块以及模块的依赖性问题。
我推荐ppm+cpanm 这2种方式，如果安装不上，我就认为这个模块的作者不够负责，前提是你要配置好这2个环境。
如果懒得配置环境，推荐使用草莓Strawberry Perl ,自带cpanm.

> cpanm Tk
就可以安装成功。



##### 应用
帮花瓣下载，添加一个简单的界面。
界面如下，



##### 代码

```perl
#!perl -w
use strict;

use Encode qw(decode encode);
use Tk;

my $mainwin=new MainWindow;
$mainwin->title("HUABAN DOWNLOADER");


#在mainwin上添加一个Frame1
my $board_idF=$mainwin->Frame();
$board_idF->pack(-expand=>1,-fill=>"both",-side=>"top");
#在Frame1 上添加一个label
my $board_idL=$board_idF->Label(-text=>"The board id:",-width=>50,-anchor=>'w');
$board_idL->pack(-side=>"left");
#在Frame1 上添加一个文本框Entry
my $id_VAR=20194339;
my $id_Ent=$board_idF->Entry(-textvariable=>\$id_VAR);
$id_Ent->pack(-side=>'left');


#在mainwin上增加一个Frame ,存放下载图片数目
my $num_F=$mainwin->Frame();
$num_F->pack(-expand=>1,-fill=>'both',-side=>'top');
my $num_VAR=200;

$num_F->Label(-text=>"number of photos to downloaded:",-width=>50,-anchor=>'w')->pack(-side=>'left');
my $num_Ent=$num_F->Entry(-textvariable=>\$num_VAR);
$num_Ent->pack(-side=>'left');



#在mainwin上增加Frame2
my $dir_F=$mainwin->Frame();
$dir_F->pack(-expand=>1,-fill=>"both",-side=>"top");
#在Frame2 增加一个Label
$dir_F->Label(-text=>"Output Dictory:",-width=>50,-anchor=>'w')->pack(-side=>'left');
#Frame2 增加一个Button
my $dir="";
$dir_F->Button(-text=>"browse...",-width=>15, -command=>sub {&selectdic})->pack(-side=>'left');
#Frame2 增加一个Label
my $dirL=$dir_F->Label(-text=>"No dictory Selected.");
$dirL->pack(-side=>'left');

$mainwin->Button(-text=>"Download",-command=>sub{ &download($id_VAR,$num_VAR,$dirL->cget('-text')) })->pack(-side=>'top');
#在mainwin上增加一个bottomF,CONTACT
my $buttonF=$mainwin->Frame();
$buttonF->pack(-expand=>1,-fill=>"both",-side=>"top");  
$buttonF->Label(-text=>"contact: perlcoder weixin gongzhonghao")->pack(-side=>'left');
sub selectdic
{
   $dir = $mainwin->chooseDirectory();

    if(defined $dir)
    {
       $dirL->configure(-text=>$dir)   

    }


}

sub download
{

my ($board_id,$num,$directory)=@_;

#print "$directory\n" x100;


use Mojo::UserAgent;

use Mojo::UserAgent::CookieJar;
my $ua = Mojo::UserAgent->new();
my $browser='Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.2.2000 Chrome/30.0.1599.101 Safari/537.36';

$ua->transactor->name($browser);
my $cookie_jar = $ua->cookie_jar;

$ua = $ua->cookie_jar(Mojo::UserAgent::CookieJar->new);

my $num_pic=0;

my $starturl='http://huaban.com/boards/'.$board_id;
my $body;
my $jsonbody;
my ($pin_id,$key);
my ($pngurl,$pngfile);
my $baseurl='http://hbimg.b0.upaiyun.com/';
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
          if($directory=~/No directory/)
          {



          }
          else
          {

            $pngfile=$directory.'/'.$pngfile;
           }

         # $pngfile=$directory?$pngfile:$directory.'/'.$pngfile;
          print "$pngfile\n";
          $ua->get($pngurl)->res->content->asset->move_to($pngfile);
          $num_pic++;
          if($num_pic>200)
          {
             print "you have download 200 Photos\n";
            last;          
           }

    }
    if($starturl=~/limit/)
    {
         $starturl=~s/max=\d+/max=$pin_id/;
    }
    else
    {
   $starturl.='/?isiv0rfd&max=815376046&limit=20&wfl=1';
   $starturl=~s/max=\d+/max=$pin_id/;
   }
   #print $starturl,"\n";


   $ua = $ua->cookie_jar(Mojo::UserAgent::CookieJar->new);


    if($num_pic>$num)
    {
       print "you have download 200 Photos\n";
       last;   

    }
}

}

#让所有的widget 进入事件循环中，等待触发
MainLoop;



```




##### 我的学习历程
我先学习了几年perl,然后学习了pyhon的tkinter，语言都是想通的。深入了一门语言，再去学其他语言就会轻松很多，
熟悉了一个模块的使用理念，不管该模块在哪个语言中，你都能很快掌握。



##### 补充
- 事件编程。我之前介绍过一个模块Mojo::EventEmitter，参见
http://mp.weixin.qq.com/s?__biz=MzA5NDU1OTY3Ng==&mid=402014447&idx=1&sn=066b67c435826d3210835a49f57d8208&scene=19#wechat_redirect
- 花瓣爬虫的核心代码介绍，参见
http://mp.weixin.qq.com/s?__biz=MzA5NDU1OTY3Ng==&mid=2650169240&idx=1&sn=ed09f9be8c250025e70291b12ec58327&scene=0#wechat_redirect

##### 书读百遍其义自现。书越读越新，不同的时间读相同的内容可以读出不一样的东西。念念不忘，必有回响。当你下定决心，学习新的知识，一定要全身心，长期投入，直到完全吃透为止。
