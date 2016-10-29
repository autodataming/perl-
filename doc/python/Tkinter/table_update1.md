
### python[Tk]_实时读入数据到表格
#### 摘要  
如何实时从文本中读入数据到Tk的表格Table中？
#### 代码实例
- 创建Table
- 导入数据
- 实时更新内容


```python
#!python2
#coding: utf-8
from Tkinter import *
from ttk import *

from tkintertable.Tables import TableCanvas
from tkintertable.TableModels import TableModel

'''
创建Table
'''
root=Tk()
main_f=Frame(root)
main_f.pack()
table = TableCanvas(main_f)
table.createTableFrame()
'''
导入数据到表格中
'''

model = table.model
#model.importDict(data) #can import from a dictionary to populate model
table.load("1.table")
table.model.data[0]['Model']='test'
table.model.data[6]['Model']='test6'
table.redrawTable()

'''
实时更新表格内容，每隔5s检查文件table_input.txt
'''
def updatetable(filename):
    f=open(filename,'r')
    for lineno,line in enumerate(f):
        if lineno == 0:
           continue
        else:
            rowid=lineno-1
            elements=line.strip().split()
            print elements
            table.model.data[rowid]['Model']=elements[0]
            table.model.data[rowid]['Qty']=elements[1]
            table.model.data[rowid]['Time']=elements[2]
    table.redrawTable()
    main_f.after(5000,updatetable,"table_input.txt")
main_f.after(5000,updatetable,"table_input.txt")



mainloop()
```

#### 实时更新解析
**这里使用了一个小技巧，嵌套使用after**  
widget.after(time,func,*args)  
widget在等待time后执行一次函数func,args是传给func的参数，只执行一次func.
在func中的最后再次调用widget.after函数，就形成了无穷循环。每隔time，执行一次func.
