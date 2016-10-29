# pymol 插件的制作流程

#### step 1 定制你的插件

> addmenuitem(menuName, itemType, statusHelp = '', traverseSpec = None, **kw)  
Add a menu item to the menu menuName.
The kind of menu item is given by itemType and may be one of command, separator, checkbutton, radiobutton or cascade (although cascade menus are better added using the addcascademenu() method).  
Any keyword arguments present will be passed to the menu when creating the menu item.  
See Tkinter.Menu for the valid options for each item type. In addition, a keyboard accelerator may be automatically given to the item, as described under hotkeys.
When the mouse is moved over the menu item, the helpString will be displayed by the balloon's statuscommand.

- menuname 插件的位置(存放在哪个menu下面),增加menuitem到那个menuname 下面
- itmetype( command  speractor checkbutton radiobutton cascade)
这里一般选用command，支持回调函数，弹出新的窗口
- 插件的说明（鼠标悬停显示的文字）  
测试发现 menu 上的文字有显示，menuitem上没有显示
- 插件上面显示的文字
- comand 触发的回调函数  
回调函数可以是普通函数，或者是类的构造函数。通过该函数创建GUI。  
类的构造函数，方便创建复杂界面。
另外一个重要的参数就是label,显示新增加的menuitem的名字。

一般常用的参数有menuName,'command',label=“name_menu”,command=;

```python
def __init__(self):
    # Simply add the menu entry and callback
    self.menuBar.addmenu('DDDC','some text to comment the menu for coder')
    self.menuBar.addmenuitem('Wizard', 'command',
                                     'text to comment the menu',

                                     label = 'PDB Loader Service',
                                     command = lambda s=self : FetchPDB(s))
```


#### pymol 的源代码在github 上面。

- https://github.com/Almad/pymol
- https://github.com/Almad/pymol/blob/master/pymol/modules/pmg_tk/skins/demo/__init__.py

部分代码片段
``` python
class PMGSkin:

    def setup(self):
        # start with a clean packer
        self.app._hull.pack_forget()

    def takedown(self):
        pass

    def __init__(self,app):
        self.app = app
        self.root = app.root
        self.pymol = app.pymol

```


``` python
def createMenuBar(self):
       self.menuBar = Pmw.MenuBar(self.root, balloon=self.balloon,
                                  hull_relief=RAISED, hull_borderwidth=1)
```


我们知道了pymol的menubar是采用的Pmw中的menubar，更详细的说明见
- http://pmw.sourceforge.net/doc/MenuBar.html

Pmw.MenuBar 包含的方法有
- addcascademenu,
- addmenu
- addmenuitem
- deletemenuitems
- disableall()
- enableall()
这里详细介绍下常用前3个方法，
- addcascademenu(parentMenuName, menuName, statusHelp = '', traverseSpec = None, **kw)  
第一个参数是父菜单的名字，第二个参数是准备添加的菜单的名字，statusHelp 和traverseSpec 都不是重要的参数。另一个常用的参数是label,其默认值是menuname.

- addmenuitem(menuName, itemType, statusHelp = '', traverseSpec = None, **kw)  





##### 插件的模板在这里
- https://github.com/Almad/pymol/blob/2d929ff774e4a258c6d51dfd584d60f284808ef4/pymol/modules/pmg_tk/startup/__init__.py


#### step2 定制你插件的界面  
这里需要你熟悉tk的各种控件，以及布局。
这里以这个控件为例。

``` python
class FetchPDB:
    def __init__(self, app):
        import tkSimpleDialog
        import tkMessageBox
        import urllib
        import gzip
        import os
        import string

        pdbCode = tkSimpleDialog.askstring('PDB Loader Service',
                                                      'Please enter a 4-digit pdb code:',
                                                      parent=app.root)

        if pdbCode: # None is returned for user cancel
            pdbCode = string.upper(pdbCode)
            try:
                filename = urllib.urlretrieve('http://www.rcsb.org/pdb/files/'
                                              + pdbCode + '.pdb.gz')[0]
            except:
                tkMessageBox.showerror('Connection Error',
                                       'Can not access to the PDB database.\n'+
                                       'Please check your Internet access.',
                                       parent=app.root)      
```
#### tkSimpleDialog 最简单的对话框，获得输入的内容
-tkSimpleDialog.askstring
- tkSimpleDialog.askinteger
- tkSimpleDialog.askfloat  

当点击ok的时候就会回调上述函数。

# 参考
1. http://www.pymolwiki.org/index.php/Plugins_Tutorial
2. http://www.pymolwiki.org/index.php/Category:Plugins
