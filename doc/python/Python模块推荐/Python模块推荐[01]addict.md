#### Python 模块推荐[01] addict

##### 摘要
Python 中复杂的数据结构预先设计，这和perl很不同。addict让嵌套的字典变得像perl一样简单。

##### 代码实例
``` python
from addict import Dict
from pprint import pprint
object_info=Dict()
#object_info.coat.coord=[]

for i in range(10):   object_info[i].coord=i

pprint(object_info)



```
语法就是变量key放在中括号里面，字符串key，用.点链接。

**value的数据结构仍旧需要预先申（she）明(ji)**。

###### 代码输出
```
F:\test>python2 test.py
{0: {'coord': 0},
 1: {'coord': 1},
 2: {'coord': 2},
 3: {'coord': 3},
 4: {'coord': 4},
 5: {'coord': 5},
 6: {'coord': 6},
 7: {'coord': 7},
 8: {'coord': 8},
 9: {'coord': 9}}

```
