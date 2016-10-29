#### Python 模块推荐[02] nested_dict

##### 摘要
Python 中嵌套字典nested_dict 是一个优秀的模块，方便构建各种复杂的字典。
nested_dict 相对于addict 方便区分key 和value。

##### 应用场景
三重字典按照value 排序。
```python
#!python2
#coding: utf-8
from nested_dict import nested_dict
from collections import OrderedDict
from pprint import pprint
xydict=nested_dict(3,float)
xydict['1.3']['2.1']['zlen']=10.0
xydict['1.5']['2.1']['zlen']=9.0
xydict['1.8']['8.1']['zlen']=19.0


#print sorted(xydict.items_flat(),key=lambda x:x[1])
sorted_d=OrderedDict( sorted(xydict.items_flat(),key=lambda x:x[1]) )
#pprint(sorted_d)
for key,value in sorted_d.items():
    print key,value

#another example
normal_dict=xydict.to_dict()
sorted_dd=OrderedDict(normal_dict)
for key,value in sorted_dd.items():
    print key,value

```
###### 代码输出

>('1.5', '2.1', 'zlen') 9.0  
('1.3', '2.1', 'zlen') 10.0  
('1.8', '8.1', 'zlen') 19.0  
1.5 {'2.1': {'zlen': 9.0}}  
1.8 {'8.1': {'zlen': 19.0}}  
1.3 {'2.1': {'zlen': 10.0}}  


###### OrderedDict  
OrderedDict 是一个**具有字典属性的列表**，其可以通过字典获得，也可以通过列表获得。
其表现形式是不一样的。
###### nest_dict 的常用方法
- 构建函数，nested_dict()  
可以接受2个参数，第一个参数是字典的嵌套层数，第二个参数是value的类型，如list,set,int,str,float等
```python
ndlist=nested_dict(2,list)
ndset=nested_dict(2,set)
ndint=nested_dict(2,int)
```
** 推荐显式指定嵌套层数和数据类型**
- items_flat() 迭代器key 和value
>for keys_as_tuple, value in nd.items_flat():
- keys_flat 迭代器key
- values_flat 迭代器 value
- to_dict()  nested_dict转换成普通字典
>normal_dict=nd.to_dict()
- nested_dict() 普通字典转nested_dict
>nestdict=nested_dict(normal_dict)
