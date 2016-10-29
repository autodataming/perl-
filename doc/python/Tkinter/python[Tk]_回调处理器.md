#### 回调处理器




##### 回调处理器的类型
- 函数名
  comand=func1
- lamda函数
  command=(lamda: print a)
- Bound方法
  command=self.method
- 调用类对象构造函数ClassA()
  command=ClassA()
  ** 构造函数是立即调用，其他类用都是延迟调用。**
