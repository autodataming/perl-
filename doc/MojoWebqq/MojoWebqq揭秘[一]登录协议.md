### Mojo::Webqq揭秘[一]--登录协议

##### 腾讯各个产品（qq 微博 空间 微信）赋予了不同的appid,使用了相同的登录协议，本文不打算直接分析Smartqq,而是通过分析腾讯微博，来揭示其登录协议。

你们可以自己分析smartqq，参考Mojo::Webqq。

#### step1 输入账号
打开腾讯微博的登录页面（http://t.qq.com/）后，按F12，在cookie的Tab中清除cookie
然后F5刷新，然后输入账号，鼠标离开账号文本框后会触发一个新的get请求。

*** GET1 ***
```
GET https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=1&uin=1017044504&appid=46000101&js_ver=10149&js_type=1&login_sig=avYHVrsNoPVmdKoBcHzVE4tqZbPF0jkusnVVodaPTr0E9J2pW9TH5WRH5wxPRvvG&u1=http%3A%2F%2Ft.qq.com&r=0.8251749213128918
```

#### ** login_sig 是一个比较特殊的字符串，发现在请求cookie中存在这样的字符串。**


#### step2 寻找login_sig
##### 只需要关注网络中的HTML和js请求，从头寻找，发现在下面这个请求中，会获得大量的cookie，包含login_sig
*** GET2 ***
```
GET https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=46000101&style=23&lang=&low_login=1&hide_border=1&hide_title_bar=1&hide_close_icon=1&border_radius=1&self_regurl=http%3A//reg.t.qq.com/index.php&proxy_url=http://t.qq.com/proxy_t.html&s_url=http%3A%2F%2Ft.qq.com
```

step3  获取login_sig
```perl
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
```
未完待续。
IE,Firefox,CHROME中分析工具F12的使用细节会后续另写一篇文章。
