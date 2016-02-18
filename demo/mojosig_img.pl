use Data::Dumper;
use Mojo::UserAgent;
use Mojo::UserAgent::CookieJar;
my $ua=Mojo::UserAgent->new;
my ($qq,$pwd);
$ua->cookie_jar(Mojo::UserAgent::CookieJar->new);

my $visiturl='https://www.baidu.com/';

$visiturl='https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=46000101&style=23&lang=&low_login=1&hide_border=1&hide_title_bar=1&hide_close_icon=1&border_radius=1&self_regurl=http%3A//reg.t.qq.com/index.php&proxy_url=http://t.qq.com/proxy_t.html&s_url=http%3A%2F%2Ft.qq.com&daid=6';
my $tx=$ua->get($visiturl);
my $jar = $tx->res->cookies;
my $login_sig;
#print Dumper($jar);
for(@{$jar})
{
#	print $_->name,"||||",$_->value," end\n";
  if($_->name eq 'pt_login_sig'){print $_->value;$login_sig=$_->value};
}


#pt_login_sig
#check
##https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=1&uin=1017044504&appid=46000101&js_ver=10149&js_type=1&login_sig=avYHVrsNoPVmdKoBcHzVE4tqZbPF0jkusnVVodaPTr0E9J2pW9TH5WRH5wxPRvvG&u1=http%3A%2F%2Ft.qq.com&r=0.8251749213128918

##
##appid=46000101
##js_type=1
##js_ver=10149
##login_sig=gZ*JvQcZSlZYB*S9A0mB28EftD30aDYirWzrc9phAa8JBHZMxJm3p1l73DWEIBqp
##pt_tea=1
##pt_vcode=1
##r=0.619898763857414
##regmaster=
##u1=http://t.qq.com
##uin=1017044504
my $appid=46000101;
my $js_type=1;
my $js_ver=10149;
my $pt_tea=1;
my $pt_vcode=1;
my $r;
my $ul='http://t.qq.com';
$qq='1017044504';
my $uin=$qq;

my $urlcheck='https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=1&uin=1017044504&appid=46000101&js_ver=10149&js_type=1&login_sig='.$login_sig.'&u1=http%3A%2F%2Ft.qq.com&r=0.8251749213128918';
$tx=$ua->get($urlcheck);
print "\n";
print $tx->res->body,"\n";
#ptui_checkVC('1','04ITApD9mlvfMp08-OiFp6cYFiPZ6AEN3GAfSIDaN9kumYQYtEkFnQ**'
my ($verifycode,$cap_cd)=$tx->res->body=~/ptui_checkVC\(\'(\d+)\'\,\'(\S+?)\'/;
print $verifycode,"  verifycode\n";
print $cap_cd,"  cap_cd\n";



#SIG urlcheck
my $urlsig='https://ssl.captcha.qq.com/cap_union_show?clientype=2&uin=1017044504&aid=46000101&cap_cd='.$cap_cd.'&pt_style=23&0.252485032541911';
$tx=$ua->get($urlsig);
#print $tx->res->body,"\n";
my ($g_vsig)=$tx->res->body=~/var g_vsig = \"(\S+)\"/;

print $g_vsig," g_vsig\n";


#img

my $urlimg='https://ssl.captcha.qq.com/getimgbysig?clientype=2&uin=1017044504&aid=46000101&cap_cd='.$cap_cd.'&pt_style=23&0.252485032541911&rand=0.7492570916749455&sig='.$g_vsig;

$tx=$ua->get($urlimg);
$tx->res->content->asset->move_to('1.png');
my $command;


#
#if($verifycode==1)
#{
#	#get verifycode image
#	
#	
#	
#}
#正常时，请求这个地址，会获得类似ptui_checkVC('0','!AFO');这样的返回值，
#   这其中0是代表正常状态，不采用图片验证。
#   
#   但是如果短时间内这个帐号多次在不同的ip登录，
#   那么返回值就是另外的一种返回值了，
#   那表明需要进行图片验证码验证。
#此外，0还有可能变为其他的数值，用来标明诸如帐号不存在，帐号状态不正确，帐号已锁定等等的。。。。。而后面的!AFO是四位则是我们需要获得的原始令牌值，它是由腾讯服务器随机生成的一个令牌的原始密钥。当然也许您在获取的时候会发现这个值并不是4位，而是很多位。那么就要恭喜您了，您获得也是令牌的原始密钥，只不过不同的是，您获得是图片验证码的原始密钥而已。
