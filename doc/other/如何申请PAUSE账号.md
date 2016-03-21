#### 如何申请PAUSE 账号

##### 摘要
metacpan 是perl模块的集中地，如何上传自己的模块的metacpan? 首先需要注册一个PASUE账号。

##### 优点
用于存放自己的模块，
方便别人，以及自己利用cpanm安装，这样就不需要使用use lib来包含该模块路径。

##### 注册PAUSE的网址
```
http://pause.perl.org/pause/query?ACTION=request_id
```
###### 概念
civil name:你的真实姓名。
pause id: cpan上面的账号名
user id:就是Pause ID。

##### 注册请求发送成功的标志
网页上会返回这样一段消息，同时注册邮箱中也会受到这条消息。
现在要做的就是耐心等待审核，大约需要1-7天的时间。

```
From: upload@pause.perl.org
Subject: PAUSE ID request (BIOLIFE; chen ci)

Request to register new user

fullname: chen ci
  userid: BIOLIFE
    mail: CENSORED
homepage: https://github.com/autodataming
     why:

    some modules about drug design involved protein


The following links are only valid for PA
    USE maintainers:

```

##### 注册请求发送失败
+ 用户名civil name不正确
规则好像是必须要有空格
chen ci is ok, chenci is not ok
```
Error processing form

    Name does not look like a full civil name. Please accept our apologies if you believe we're wrong. In this case please write to modules@perl.org.
```

+ PAUSE ID 不正确
PAUSE ID要求必确是[A-Z]{3,9}的大写字母，不能有数字等其他字符，另外不能和已有的ID 重复。
```
Error processing form
    The userid BIOLIFE22 does not match (?^:^[A-Z]{3,9}$).
```

+ pause id重复
```
Error processing form
    The userid AUTOLIFE is already taken.
```
+ 邮箱也不能重复，
```
如果你的邮箱没有收到相应的邮件，则邮箱重复。收到邮件后则耐心等待。
```
##### 注册PAUSE的网址
```
http://pause.perl.org/pause/query?ACTION=request_id
```
点阅读原文，可以快速直达PAUSE注册网址。
