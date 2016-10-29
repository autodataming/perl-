#### python[Tk]_组件Combobox


##### 摘要
combobox 属于ttk中的组件


##### demo in python3
```python
from tkinter import *
from tkinter.ttk import *

root=Tk()
topF=Frame(root)
topF.pack(side=TOP,expand=YES,fill=BOTH)

Label(topF,text="combobox in ttk:",width=40).pack(side=LEFT)
num_var=IntVar()
num_Com=Combobox(topF,textvariable=num_var)
num_Com['values']=('10','100','1000')
num_Com.set('select id')
Button(topF,text="printCombox",command=printcom,width=15).pack(side=LEFT)

def printcom():
    print( num_Com.get())
    print (num_var.get())
```
