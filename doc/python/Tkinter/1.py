from Tkinter import *

index = 0
def changeColor():
    global index
    if index%2==0:
        label.configure(bg = "purple")
    else:
        label.configure(bg = "blue")
    index+=1
    label.after(1000, changeColor)

root = Tk()
mainContainer = Frame(root)
label = Label(mainContainer, text="")
label.configure(text="msg will change every sec")
label.pack(side=LEFT, ipadx=5, ipady=5)
mainContainer.pack()
label.after(1000, changeColor)
root.title("Timed event")
root.mainloop()