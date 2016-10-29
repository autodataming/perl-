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