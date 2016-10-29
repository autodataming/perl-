方法:

这里是一个简单的语法来创建这个widget:

tkMessageBox.FunctionName(title, message [, options])

参数:

   FunctionName: 这是相应的消息框函数的名称.

   title: 这是在一个消息框，标题栏显示的文本.

   message: 这是要显示的文字作为消息.

   options: 选项有替代的选择，你可以用它来定制一个标准的消息框。一些可以使用的选项是默认和家长。默认选项是用来指定默认的按钮，如中止，重试，或忽略在消息框中。父选项是用来指定要显示的消息框上的顶层窗口.

你可以使用以下功能之一对话方块:

   showinfo()

   showwarning()

   showerror ()

   askquestion()

   askokcancel()

   askyesno ()

   askretrycancel ()

####
第一个参数是对话框的title
第二个参数是对话框的内容
第3个参数是可选参数，用于外观设置。
