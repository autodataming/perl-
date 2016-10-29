#!python2
from Tkinter import *
from ttk import *
import Pmw
import random
# N and EXTENDED is here
from tkFileDialog import *

mainwin=Tk()
mainF=Frame(mainwin)
mainF.pack(expand=1,fill=BOTH)



#status  OK, cancel
def selectfile(status):
    '''
    '''
    print status
    print "hello,world"

    objlist=random.sample(range(100),4)
    
    seledialog.component("scrolledlist").setlist(objlist)
    seledialog.scrolledlist_items=(objlist)
    pass
#
def openseledialog():
    '''
    '''
    objlist=random.sample(range(100),4)
    seledialog.component("scrolledlist").setlist(objlist)
    if len(seledialog.component('scrolledlist').get()):
        listbox=seledialog.component('scrolledlist')
        listbox.selection_set(0)
    seledialog.show()
    

seledialog=Pmw.SelectionDialog(mainF,title='Save',
                               buttons=('OK','Cancel'),defaultbutton='OK',
                               label_text='which object would you like to save?',
                               # scrolledlist_items = ('a','b','c'),
                               scrolledlist_items = (),
                               command=selectfile,
                                scrolledlist_labelpos=N,  #NSEW the position of label
                                scrolledlist_listbox_selectmode=EXTENDED,  #Mutiple,single,extended
                               )
seledialog.withdraw()


Button(mainF,text="Save Points...",command=openseledialog).pack(side=TOP)


    

mainloop()



















#def filter_names(self):
#        """
#        Filter names out of the dialog box if they don't match
#        """
#        #
#        # Because this function is a callback for the modified
#        # EntryField, it must be FAST
#        #
#        groups = self.cmd.get_names_of_type("object:group")
#        lst = filter(lambda x:x[0]!="_", self.cmd.get_names('all'))
#
#        # if the field for filtering is empty, return all names
#        if self.filter_entry.getvalue()=="":
#            return lst
#        else:
#            return filter( lambda x: self.filter_entry.getvalue() in x, lst )
#self.dialog.component("scrolledlist").setlist(self.filter_names())
