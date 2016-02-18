### MojoWebqq揭秘[三]密码的加密过程

#### 定位加密js
首先通过chrom的F12，发现登录过程是由c_login_2.js 发现的，同时直到了请求的URL是
```
GET https://ssl.ptlogin2.qq.com/login?u=1017044504&verifycode=!HVN&pt_vcode_v1=0&pt_verifysession_v1=e0404e7fdb1c2ed81662fcd8f2e426118961ecdca370ce135a2f4e6b4eeb59b7e784f58595d6f8c05b3e76b0bb7926c79854cb1668bb3ada&p=YtpezihpUFO3*0IVOJePIAy20oXhwHN9*rYRSLwVnQeAJCrj6J7zpMfXth0XJlc26lD*xRjCyf8FzSpMfvaRCOS46POjxc7S9LvvDYJYYvz5JmL8OTtIwQ8fsfMgk24K8Bm5Vrcg*njHNZuXHqlfaZ-VpSt4LFnAKb7-tIxyZglpcc6wiQ5lKFPujVjfYLAo3fYgDkujdtR*sMXD4Ea4Hg__&pt_randsalt=0&u1=http%3A%2F%2Ft.qq.com&ptredirect=1&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=2-1-1455417726576&js_ver=10149&js_type=1&login_sig=-3pWHcPbFmjht7L4IPtC-B1XnKg5wZ55haAQ3Ic5jECdY9fIhIIEV*yLMnDKjzXb&pt_uistyle=23&low_login_enable=1&low_login_hour=720&aid=46000101&daid=6&
```

#### 基于请求的url定位js中的关键代码
可以在c_login_2.js中多设几个断点，然后F10调试的时候就能找到关键代码。
或者根据URL中的关键词进行定位比如'ssl.ptlogin2'  pt_verifysession_v1 pt_randsalt等等进行定位。

####  JS 中加密明文密码的关键代码

```JavaScript
// 参数是login
  pt.plogin.salt = $.str.uin2hex(t.replace("@qq.com", ""));
// 参数是密码 login的hex，验证码，空，
  i.p = $.Encryption.getEncryption(n, pt.plogin.salt, i.verifycode, pt.plogin.armSafeEdit.isSafe);


```

```JavaScript
// uin2hex
uin2hex: function(str) {
    var maxLength = 16;
    str = parseInt(str);
    for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++)
        hex = "0" + hex;
    for (var arr = [], j = 0; maxLength > j; j += 2)
        arr.push("\\x" + hex.substr(j, 2));
    var result = arr.join("");
    return eval('result="' + result + '"'),
    result
},

```
```JavaScript
//getEncryption
function getEncryption(t, e, i, n) {
    i = i || "",
    t = t || "";
    for (var o = n ? t : md5(t), r = hexchar2bin(o), p = md5(r + e), a = $pt.RSA.rsa_encrypt(r), s = (a.length / 2).toString(16), l = TEA.strToBytes(i.toUpperCase(), !0), c = Number(l.length / 2).toString(16); c.length < 4; )
        c = "0" + c;
    for (; s.length < 4; )
        s = "0" + s;
    TEA.initkey(p);
    var u = TEA.enAsBase64(s + a + TEA.strToBytes(e) + c + l);
    return TEA.initkey(""),
    setTimeout(function() {
        __monitor(488358, 1)
    }, 0),
    u.replace(/[\/\+=]/g, function(t) {
        return {
            "/": "-",
            "+": "*",
            "=": "_"
        }[t]
    })
}

```

#### perl重现明文密码加密过程

```perl



```
