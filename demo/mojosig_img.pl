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
#����ʱ�����������ַ����������ptui_checkVC('0','!AFO');�����ķ���ֵ��
#   ������0�Ǵ�������״̬��������ͼƬ��֤��
#   
#   ���������ʱ��������ʺŶ���ڲ�ͬ��ip��¼��
#   ��ô����ֵ���������һ�ַ���ֵ�ˣ�
#   �Ǳ�����Ҫ����ͼƬ��֤����֤��
#���⣬0���п��ܱ�Ϊ��������ֵ���������������ʺŲ����ڣ��ʺ�״̬����ȷ���ʺ��������ȵȵġ����������������!AFO����λ����������Ҫ��õ�ԭʼ����ֵ����������Ѷ������������ɵ�һ�����Ƶ�ԭʼ��Կ����ȻҲ�����ڻ�ȡ��ʱ��ᷢ�����ֵ������4λ�����Ǻܶ�λ����ô��Ҫ��ϲ���ˣ������Ҳ�����Ƶ�ԭʼ��Կ��ֻ������ͬ���ǣ��������ͼƬ��֤���ԭʼ��Կ���ѡ�
