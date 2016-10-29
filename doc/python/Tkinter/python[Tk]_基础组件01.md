#### python[TK]01_组件



##### 摘要
在python的tkinter中有21个核心组件。



##### 组件
**所有的控件首字母大写，使用驼峰命名格式**
- Button 按钮  
按钮有文本属性，图片属性等，其最大特性就是回调函数，在command属性中设置。
- Label 标签   
标签最大特性就是text属性添加文字
- Entry 输入框
常用的方法有get,属性show='*'
- Menu 菜单
常用方法add_command添加一级菜单。add_cascade 添加下拉菜单。右击菜单（弹出菜单）;
-  frame 框架
- Toplevel 窗口
不需要pack,属于根窗口。
- Canvas 画布
- Checkbutton
- LabelFrame
- Listbox
- Menubutton
- Message
- OptionMenu
- PaneWindow
- Radiobutton
- Scale
- Scrollbar
- Spinbox
- Text
- Bitmap
- Image


##### bind和command的比较
command 简单。
bind 可以给回调的函数传递参数。
##### 统一组件的格式
- 定制组件的class
- 使用魔法*  
>root.option_add('*Label.background', 'pink')

##### 共同点

- 所有组件的构造函数的第一个参数是父组件对象，将要创建组件的组件置于其中。None代表隐式根窗口。另外当该参数省略的时候，默认也是隐式根窗口。
- 所有组件的配置选项，都采用的是key-value形式。如颜色color=red,回调函数command=func1 等；
- 组件的公用方法，如configure
##### 组件的使用
1. 每个组件都是一个类，因此通过构建函数进行实例化。
2.
