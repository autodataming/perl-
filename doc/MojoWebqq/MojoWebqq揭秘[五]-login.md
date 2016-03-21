### Mojo::Webqq揭秘[二]-- 验证码的来龙去脉

** F12模拟，只关注网络下的HTML,JS,png, **
#### step1 快速定位到验证码的图片请求
```
GET https://ssl.captcha.qq.com/getimgbysig?clientype=2&uin=1017044504&aid=46000101&cap_cd=BDwyd5JJlEXmCzDRV3kZbfOhZbUFJaHwWanp6LDiLuER5M_upIFi-Q**&pt_style=23&0.252485032541911&rand=0.7492570916749455&sig=gzSBNPfc2_zuuSNHwoV56WlyyvsRfrsjTFQ0zm0FKD33h4-Zammu1M678UNY7jGQSYj2kA33Kso1B68GhvSoficqa6sfFYtxz--owH36Vb4s*
```
其中cap_cd 和 sig参数的值是没有规律的字符串。

#### step2 寻找cap_cd的值，快速定位BDwyd5JJ

发现在GET check请求后的正文中有这个字符串
```
GET https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=1&uin=1017044504&appid=46000101&js_ver=10149&js_type=1&login_sig=hKMy1lcZWdtOwbNs7W-ktppb*fFiG7CKkdX0uG8kzPRwl4zo8iHRjVebhN*DCoQ*&u1=http%3A%2F%2Ft.qq.com&r=0.570960084516285
```

#### step3 寻找sig的值，快速定位
发现在GET cap_union_show 请求后的正文中有这个字符串g_vsig
```
GET https://ssl.captcha.qq.com/cap_union_show?clientype=2&uin=1017044504&aid=46000101&cap_cd=BDwyd5JJlEXmCzDRV3kZbfOhZbUFJaHwWanp6LDiLuER5M_upIFi-Q**&pt_style=23&0.252485032541911
```


#### step4 获取cpa_cd 和 sig
cpa_cd 在<Mojo::Webqq揭秘[一]--登录协议>这个文章中有介绍，
获得sig代码如下
```perl
#SIG urlcheck
my $urlsig='https://ssl.captcha.qq.com/cap_union_show?clientype=2&uin=1017044504&aid=46000101&cap_cd='.$cap_cd.'&pt_style=23&0.252485032541911';
$tx=$ua->get($urlsig);
#print $tx->res->body,"\n";
my ($g_vsig)=$tx->res->body=~/var g_vsig = \"(\S+)\"/;

print $g_vsig," g_vsig\n";

```

#### step5  获取验证码

``` perl
#img

my $urlimg='https://ssl.captcha.qq.com/getimgbysig?clientype=2&uin=1017044504&aid=46000101&cap_cd='.$cap_cd.'&pt_style=23&0.252485032541911&rand=0.7492570916749455&sig='.$g_vsig;

$tx=$ua->get($urlimg);
$tx->res->content->asset->move_to('1.png');


```
