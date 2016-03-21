#### perl黑魔法[九]双冒号::




PdlMojoMoo  10:44:28
不是路径吗
sub 后面的：： 是做什么用的
use里面的::相当于是路径吧
PdlMojoMoo  10:45:40
use Mojo::Webqq::Client::Remote::_prepare_for_login; 说明存放在Mojo/Webqq/Client/Remote下面
灰灰  10:46:29
我这是sub 不是use呀
不要混淆
PdlMojoMoo  10:46:58
sub 下的:: 是用于什么目的的？
方法吗
定义Client的方法？
Sub  xx::ss::fun1{}
PdlMojoMoo  10:48:09
定义ss对象的fun1 方法用的？
灰灰  10:49:08
sub xxx{} 相当于定义了一个 当前package下的函数 默认是main::xxx
sub aa::bb::xxx {}相当于定义了 aa::bb 下的xxx函数
如果你要用 $client->xxx去调用这个方法， 而$client又是属于 Mojo::Webqq这个包的，你当然要把方法xxx也定义成 sub Mojo::Webqq::xxx呀

灰灰  10:52:29
你也可以写
package Mojo::Webqq;
sub _prepare_for_login {
}
只是这样要多写一行，我比较懒……
