use Data::Dumper;
use Mojo::UserAgent;
use Mojo::UserAgent::CookieJar;
my $ua=Mojo::UserAgent->new;

$ua->cookie_jar(Mojo::UserAgent::CookieJar->new);

my $visiturl='https://www.baidu.com/';

$visiturl='https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=46000101&style=23&lang=&low_login=1&hide_border=1&hide_title_bar=1&hide_close_icon=1&border_radius=1&self_regurl=http%3A//reg.t.qq.com/index.php&proxy_url=http://t.qq.com/proxy_t.html&s_url=http%3A%2F%2Ft.qq.com&daid=6';
my $tx=$ua->get($visiturl);
my $jar = $tx->res->cookies;
#print Dumper($jar);
for(@{$jar})
{
#	print $_->name,"||||",$_->value," end\n";
  if($_->name eq 'pt_login_sig'){print $_->value};
}


#pt_login_sig