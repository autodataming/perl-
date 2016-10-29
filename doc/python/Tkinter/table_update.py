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
导入数据
'''

model = table.model
#model.importDict(data) #can import from a dictionary to populate model
table.load("1.table")
table.model.data[0]['Model']='test'
table.model.data[6]['Model']='test6'
table.redrawTable()
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