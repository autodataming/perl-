#!/usr/bin/perl -w
use strict;
use Mojo::UserAgent;
use Data::Dumper;
use Mojo::UserAgent::CookieJar;

my $ua = Mojo::UserAgent->new();
my $browser='Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.2.2000 Chrome/30.0.1599.101 Safari/537.36';

$ua->transactor->name($browser);
  my $cookie_jar = $ua->cookie_jar;
  $ua            = $ua->cookie_jar(Mojo::UserAgent::CookieJar->new);
my $url;
#https://detail.tmall.com/item.htm?id=525028801160
#Accept	text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
#Accept-Encoding	gzip, deflate
#Accept-Language	zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
#Connection	keep-alive
#Host	detail.tmall.com
#User-Agent	Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0
#

$url='https://detail.tmall.com/item.htm?id=525028801160';
my $tx = $ua->get($url=>{'Accept'=>'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	                    'Accept-Encoding'=>'gzip, deflate',
	                    'Accept-Language'=>'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
	                    'Connection'=>'keep-alive',
	                    'Host'=>'detail.tmall.com',
	                    
	                    }
	                    );
	                    
#_tb_token_	E4mbqo3ydeiy			End Of Session
#cookie2	b7a1b6a8fd3604dc1b804567c17833a2			End Of Session
#t	76f64c31e9fbb3780cd990eba367f338			End Of Session
#v	0	/	.taobao.com	End Of Session
#thw	cn	/	.taobao.com	2016/11/1 ÏÂÎç5:58:09
#cna	czoSECC5+D8CAQUTf8r9DsPx			End Of Session
#linezing_session	xAOKmipqWxqIrTP5C7ghXSnJ_1468747487904uD7I_2			End Of Session	                    
#	                    
my $file='1.html';

#http://a.m.tmall.com/ajax/rate_list.do?item_id=525028801160&p=2&ps=15
#Redirect to: 
#https://login.taobao.com/jump?target=https%3a%2f%2fdetail.tmall.com%2fitem.htm%3fid%3d525028801160%26tbpm%3d1

print $tx->res->body;
$tx->res->content->asset->move_to($file);
1;
