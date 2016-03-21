#### MojoWeixin揭秘[二]天气预报插件的实现

##### 摘要
天气预报关系到人们生活的方方面面，为此为MojoWeixin增加了插件，天气预报。更待精彩应用，期待你的加入Mojo-Weixin。

##### 使用
** 加入微信体验群，体验更多精彩插件。**

回复 城市+天气，就可以查询天气。如：上海天气

##### 实现
``` perl
package Mojo::Weixin::Plugin::Weather;
sub call
{
	my $client=shift;
    my $callback=sub
    {
    	my ($client,$msg)=@_;
        return if $msg->class eq "send" and $msg->from eq "code";
    	if($msg->content=~/^(\S+)天气$/)
    	{
    		my $city=$1;
    		my $weatherurl='http://apix.sinaapp.com/weather/?&city='. url_escape($city);
    		$client->http_get($weatherurl,
          sub
    	  {  
		   	my $content=shift;
        my $result = join "\n",map {$_->{Title}} @{$json};
       $result = encode("utf8",$result);
       $msg->reply($result);              

		   	}				                                                 
    			              );		
    	};
	#http://apix.sinaapp.com/weather/?&city=%E6%97%A0%E9%94%A1

    };

$client->on(receive_message=>$callback,send_message=>$callback);  

}
1;

```
整个插件的框架很清晰，只需要修改callback函数就可以了。
###### 天气预报接口
新浪天气


http://apix.sinaapp.com/weather/
###### 注意事项
- 中文出现在url中的时候需要**url_escape**转码
- 发送消息，需要用**utf8**编码
