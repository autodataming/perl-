http://www.cnblogs.com/fly1988happy/archive/2012/04/26/2470542.html

new就是对malloc的封装，它有的好处 new都有
malloc 只管分配内存，并不能对所得的内存进行初始化，所以得到的一片新内存中，其值将是随机的。
new 返回指定类型的指针，并且可以自动计算所需要大小。
int* parr; 　　
parr = new int [100]; 
malloc 则必须要由我们计算字节数，并且在返回后强行转换为实际类型的指针。