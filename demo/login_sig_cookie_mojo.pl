use Data::Dumper;
use Mojo::UserAgent;
use Mojo::UserAgent::CookieJar;
my $ua=Mojo::UserAgent->new;

$ua->cookie_jar(Mojo::UserAgent::CookieJar->new);
#https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=1&uin=1017044504&appid=46000101&js_ver=10149&js_type=1&login_sig=JpSvdZUWN*SYCEAlBZ1L37OWNSJ6hqA6*UnpozVDICqbTgoGOBITFgSZHO1as9T*&u1=http%3A%2F%2Ft.qq.com&r=0.4043309743882123
my $visiturl='https://www.baidu.com/';

$visiturl='https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=1&uin=1017044504&appid=46000101&js_ver=10149&js_type=1&login_sig=JpSvdZUWN*SYCEAlBZ1L37OWNSJ6hqA6*UnpozVDICqbTgoGOBITFgSZHO1as9T*&u1=http%3A%2F%2Ft.qq.com&r=0.4043309743882123';
$visiturl='https://xui.ptlogin2.qq.com/js/10149/c_login_2.js?max_age=604800&ptui_identifier=000DEC345627A8CA8409BB638399C30132D1640F5C646815BAA193AEA6';
          #https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=46000101&style=23&lang=&low_login=1&hide_border=1&hide_title_bar=1&hide_close_icon=1&border_radius=1&self_regurl=http%3A//reg.t.qq.com/index.php&proxy_url=http://t.qq.com/proxy_t.html&s_url=http%3A%2F%2Ft.qq.com
          #https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=46000101&style=23&lang=&low_login=1&hide_border=1&hide_title_bar=1&hide_close_icon=1&border_radius=1&self_regurl=http%3A//reg.t.qq.com/index.php&proxy_url=http://t.qq.com/proxy_t.html&s_url=http%3A%2F%2Ft.qq.com&daid=6
$visiturl='https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=46000101&style=23&lang=&low_login=1&hide_border=1&hide_title_bar=1&hide_close_icon=1&border_radius=1&self_regurl=http%3A//reg.t.qq.com/index.php&proxy_url=http://t.qq.com/proxy_t.html&s_url=http%3A%2F%2Ft.qq.com&daid=6';
my $tx=$ua->get($visiturl);
my $jar = $tx->res->cookies; 

#print Dumper($jar);

#say $_->name,$_->value for @{$jar};
#say $_->value for @{$jar};
for(@{$jar})
{
	print $_->name,"||||",$_->value," end\n";
	
}