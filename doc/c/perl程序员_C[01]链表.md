#### perl程序员学C[1]链表

##### 摘要
C 和perl 是完全不一样的性格，c需要的耐心，perl是急躁。在现实中，我们都是双面人。


##### 前言
perl 里面拥有各种高级数据结构，数组，hash。C中的原生数组是一块连续的内存，如果申请很大的且连续的内存可能会失败。为此C可以通过构建链表来避开大内存的申请，链表是一种动态数据结构。

##### 链表的一些概念
链表由节点**node**组成,每个节点是由**数据域**和**指针域**组成，
- 表头Head 表示链表的开始first，用来指向第一个节点
- 表末尾LAST，表示链表的结束last，指向最后一个节点，最后一个节点的特点：指针域为NULL.

``` cpp
/**< Simple chained structures to store allocated pointers */
typedef struct
{
	ptr_node *first ;   // 指向首节点
	ptr_node *last ; //  指向未节点

	size_t n_ptr ; //节点个数

} ptr_lst ;

```
- node 节点

```cpp
typedef struct ptr_node
{
	struct ptr_node *next ; // 指向下一个节点
	void *ptr ; // 节点中的内容，这里是任意指针

} ptr_node ;
```
