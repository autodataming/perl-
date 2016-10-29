读取这个变量的时候 触发FETCH方法 ;修改变量得时候触发STORE;
http://www.perlcn.com/perlbc/perljj/1044.html

用在代码追踪调试方便还行 拿来做面向对象就太蛋疼了

http://shouce.jb51.net/perl/TiedVariables.html#14_1_2

你也可以自己写个tie将一个hash和文件关联，这样封装以后，
你就不需要考虑文件的打开关闭等问题，你对hash的任意操作均通过tie转化为底层的文件读写操作.
如果不了解它的好处，就先不要用它。