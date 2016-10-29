from Tkinter import Tk
import Pmw


def insertmenuitem(
    self, menuName, itemType, statusHelp='', traverseSpec=None, **kw
):
    menu = self.component(menuName)

    if itemType != 'separator':
        self._addHotkeyToOptions(menuName, kw, traverseSpec)

    if itemType == 'command':
        command = menu.insert_command
    elif itemType == 'separator':
        command = menu.insert_separator
    elif itemType == 'checkbutton':
        command = menu.insert_checkbutton
    elif itemType == 'radiobutton':
        command = menu.insert_radiobutton
    elif itemType == 'cascade':
        command = menu.insert_cascade
    else:
        raise ValueError('unknown menuitem type "%s"' % itemType)

    self._menuInfo[menuName][1].append(statusHelp)

    command(**kw)


def main():
    tk = Tk()

    menuBar = Pmw.MainMenuBar(tk)

    def command():
        print('Pressed')

    menuBar.addmenu('File', 'File')

    menuBar.addmenuitem(
        'File', 'command', 'Close',
        command=command,
        label='Close'
    )

    insertmenuitem(
        menuBar,
        'File', 'command', 'Open',
        command=command,
        index=0,
        label='Open'
    )

    tk.configure(menu=menuBar)

    tk.mainloop()


if __name__ == '__main__':
    main()
