#!/usr/bin/perl -w

use strict;
use Data::Dumper;
use Mojo::UserAgent;
use Mojo::UserAgent::CookieJar;
use JE;
use Mojo::Util qw(b64_encode url_escape url_unescape term_escape);
use File::Slurp;

my ($qq,$pwd);
my ($ua,$visiturl,$tx,$jar,$checkurl,$loginurl,$starturl);
my ($uin,$appid,$js_type,$js_ver,$pt_tea,$pt_vcode,$r,$p);
my ($ptvfsession,$ptdrvs,);
my ($login_sig);
my ($je);
my ($t,$e,$i,$n);



$qq='744891290';
$pwd='carine3481290';

$ua=Mojo::UserAgent->new;
$ua->cookie_jar(Mojo::UserAgent::CookieJar->new);
$appid=46000101;

$starturl='http://p.l.qq.com/p?oid=1903455&cid=0&loc=weibo_SJ_WBDL_D_Width&aver=0&soid=BRN/yjw4VsRuHgnZCQBK1SddARzZ&pri=&k=%E5%BE%AE%E5%8D%9A%2C%E8%85%BE%E8%AE%AF%E5%BE%AE%E5%8D%9A%2CQQ%E5%BE%AE%E5%8D%9A%2C%E5%9B%B4%E8%84%96%2CQQ%E5%9B%B4%E8%84%96%2C%E8%85%BE%E8%AE%AF%E5%9B%B4%E8%84%96%2C%E4%BC%81%E9%B9%85%E5%BE%AE%E5%8D%9A%2C%E4%BC%81%E9%B9%85%E5%9B%B4%E8%84%96%2C%E5%90%8D%E4%BA%BA%E5%BE%AE%E5%8D%9A%2C%E5%90%8D%E4%BA%BA%E5%9B%B4%E8%84%96%2C%E5%BE%AE%E5%9E%8B%E5%8D%9A%E5%AE%A2&t=%E8%85%BE%E8%AE%AF%E5%BE%AE%E5%8D%9A_%E4%BD%A0%E7%9A%84%E5%BF%83%E5%A3%B0%EF%BC%8C%E4%B8%96%E7%95%8C%E7%9A%84%E5%9B%9E%E5%A3%B0&r=&s=&0.5084088818905332';
$tx=$ua->get($starturl);
$jar = $tx->res->cookies;
for(@{$jar})
{
	print $_->name,"||||",$_->value," end\n";

}
$tx=$ua->get($starturl);
$jar = $tx->res->cookies;
for(@{$jar})
{
	print $_->name,"||||",$_->value," end\n";
    if($_->name=~/ptvfsession/){$ptvfsession=$_->value}
    if($_->name=~/ptdrvs/){$ptdrvs=$_->value;}
}


$visiturl='https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid='.$appid.'&style=23&lang=&low_login=1&hide_border=1&hide_title_bar=1&hide_close_icon=1&border_radius=1&self_regurl=http%3A//reg.t.qq.com/index.php&proxy_url=http://t.qq.com/proxy_t.html&s_url=http%3A%2F%2Ft.qq.com&daid=6';

$tx=$ua->get($visiturl);
$jar = $tx->res->cookies;
for(@{$jar})
{
	print $_->name,"||||",$_->value," end\n";
  if($_->name eq 'pt_login_sig'){print $_->value;
  	print "\n visit home ok\n";
  	$login_sig=$_->value};
}



$js_type=1;
$js_ver=10149;
$pt_tea=1;
$pt_vcode=1;
$uin=$qq;
$checkurl='https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea='.$pt_tea.'&pt_vcode='.$pt_vcode.'&uin='.$uin.'&appid='.$appid.'&js_ver='.$js_ver.'&js_type='.$js_type.'&login_sig='.$login_sig.'&u1=http%3A%2F%2Ft.qq.com&r=0.8251749213128918';

$tx=$ua->get($checkurl);
#print $tx->res->body,"\n";
print "check ok\n";
$jar = $tx->res->cookies;
for(@{$jar})
{
	print $_->name,"||||",," end\n";
    if($_->name=~/ptvfsession/){$ptvfsession=$_->value}
}

my @parameters=sub {my ($parater_text)=$tx->res->body=~/ptui_checkVC\((.+)\)/;my @pa=$parater_text=~/'(\S*?)'/g}->();
print $tx->res->body,"\n";
print join "\n",@parameters;
print "\n";

if($parameters[0]==1)
{
print "please input verify code\n";
	
}
elsif($parameters[0]==0)
{
	print "lucky, don't need to input verify code\n";
	 #$je = JE->new;
	 #$je->eval(scalar read_file 'encryption.js');
	 $t=$pwd;
     $e=$parameters[2];      #"\x00\x00\x00\x00\xb7\x23\xc2\x72";
#my $k = "\$k =\"$e\";";
#eval($k);
#     $e=$k;

    printf $e;
    print "\n";
#action  3-3-1455771609143
#        3-15-1455712874784
     $i=$parameters[1];          #'!QMD';
   
     my $command="node encryption.js $t   $e $i";
     print $command,"   command\n";
   #  system($command);

     
 $p=sub {my $command="node encryption.js $t $e $i $n"; print $command,"\n";my $re=`$command`;chomp($re);return $re}->();
 	 print "p\n $p";
	 print "\n";
	 

 $loginurl='https://ssl.ptlogin2.qq.com/login?u='.$uin.'&verifycode='.$parameters[1].'&pt_vcode_v1=0&pt_verifysession_v1='.$ptvfsession.'&p='.$p.'&pt_randsalt=0&u1=http%3A%2F%2Ft.qq.com&ptredirect=1&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=3-15-1455712874784&js_ver=10149&js_type=1&login_sig='.$login_sig.'&pt_uistyle=23&low_login_enable=1&low_login_hour=720&aid=46000101&daid=6&';
	 
	 print "\n$loginurl\n";
	 
	 $tx=$ua->get($loginurl);

	 print $tx->res->body,"\n";
	 
}	 

__END__
	 $loginurl='https://ssl.ptlogin2.qq.com/login?u='.$uin.'&verifycode='.$parameters[1].'&pt_vcode_v1=0&pt_verifysession_v1='.$ptvfsession.'&p='.$p.'&pt_randsalt=0&u1=http%3A%2F%2Ft.qq.com&ptredirect=1&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=3-15-1455712874784&js_ver=10149&js_type=1&login_sig='.$login_sig.'&pt_uistyle=23&low_login_enable=1&low_login_hour=720&aid=46000101&daid=6&';
	 print "$loginurl\n";
	 
	 $tx=$ua->get($loginurl);
	 print "p\n $p";
	 print "\n";
	 print $tx->res->body,"\n";
#var result =Encry_obj.getEncryption( "2954c637de599a43c8584205923f68b1","\x00\x00\x00\x00\xb7\x23\xc2\x72","netx",1) ;
#//return(result);
#console.log(result);
}