#!python2
from Tkinter import *
import Tkinter
import Pmw
class Demo(Frame):
    def __init__(self, parent=None):
        # Create the dialog.
        self.dialog = Pmw.SelectionDialog(parent,
            title = 'My SelectionDialog',
            buttons = ('OK', 'Cancel'),
            defaultbutton = 'OK',
            scrolledlist_labelpos = 'n',
            label_text = 'What do you think of Pmw?',
            scrolledlist_items = ('Cool man', 'Cool', 'Good', 'Bad', 'Gross'),
            command = self.execute)
        self.dialog.withdraw()

        # Create button to launch the dialog.
        w = Tkinter.Button(parent, text = 'Show selection dialog',
                command = self.dialog.activate)
        w.pack(padx = 8, pady = 8)

    def execute(self, result):
        sels = self.dialog.getcurselection()
        if len(sels) == 0:
            print 'You clicked on', result, '(no selection)'
        else:
            print 'You clicked on', result, sels[0]
        self.dialog.deactivate(result)


if __name__ == '__main__':
    Demo()
    mainloop()