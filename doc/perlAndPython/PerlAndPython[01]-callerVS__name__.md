#### PerlAndPython[01]-caller(perl)和__name__(python)

##### 摘要
每个人都有自己喜欢的语言，每个语言都有自己的性格和特点。人总是认为自己喜欢的语言是最好的，从而无意识的排斥其它语言的学习，这不利于自身的发展。当我们开始学习一门新的语言的时候，了解他的历史，成为他的粉丝，然后带着耐心去学习。

##### caller(perl) VS __name__(python)
###### 应用场景
在python中我们经常看到
``` python
if __name__ == "__main__":
    print "hello,wolrd, test";
    test();
   print get_machine_and_user()

```
第一次看到这种写法，可能觉得很诡异。它的场景当你写一个项目的时候，函数存在于各个文件中，当我们单独运行这个文件的时候，就可以执行if语句里的内容从而达到测试功能是否正常的目的。我觉得这是一个好功能。
perl中我没这样用过，询问牛虻发现perl中caller 和其类似。
``` perl
unless (caller) {
  print "This is the script being executed\n";
}
```


** See caller. It returns undef in the main script. Note that that doesn't work inside a subroutine, only in top-level code. **

 ##### 下集预告
- perl 获取机器系统信息和用户信息
- python获取机器系统信息和用户信息
