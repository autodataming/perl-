#### Python模块推荐[99]-简单好用模块集合

##### 摘要
任何一个语言都离不开其模块库，语言核心就好比是一个航空母舰，而那些库就是航空母舰上的飞机大炮火箭。


##### 简单好用模块集合
- pprint
'''python
from pprint import pprint
dict={}
for i in range(50):
    dict[i]=i+100
pprint(dict)
'''
**pprint是函数不同于内置print，需用通过圆括号（）进行调用**
- csvkit
csvkit 模块安装后除了有处理csv的功能模块，在python/scripts中有各种有用的exe文件，
比如in2csv 可以将多种格式转换为csv格式。
- agate-excel 和 agate
方便在脚本中将excel 转换成csv。
