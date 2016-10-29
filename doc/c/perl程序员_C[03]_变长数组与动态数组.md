#### perl程序员_C[03]_变长数组与动态数组的切换


##### 摘要
关于“变长数组”这个翻译，真的不确切！如果是我，我更愿意翻译为：变量数组。

##### 来源
各个版本的VS目前都不支持变长数组，VS目前仅仅支持C90标准，支持C99的编译器才支持变长数组。linux下的gcc是支持C99的。
用VS编译需要把变长数组修改成动态数组，数组大小确定时间不一样。

##### 变长数组转动态数组
变长数组是其实不变长的的，成为变量数组更确切。声明的时候维数可以使用变量。运行时根据变量的大小确定数组的大小。变长数组是自动变量，不需要你管理内存，用完了以后会自动消失。变长数组必须在函数内部或作为函数参数声明，而且声明时不可以进行初始化。**关注变长数组的声明,以及函数原型中的参数**


- 一维变长数组 int data[n]

   +  C99

``` c
int sum1d(int n,int num[n])
{
  int result=0;
  int i;
  for( i=0;i<n;i++)
  {
     result+=num[i];
   }
   return result;
}
int main()
{
  int n=10;
  int num[n];
  int i;
  for(i=0;i<n;i++)
  {
      num[i]=i*i;
   }
  int result=sum1d(n,num);
  printf("result sum is %d",result);

}
```

 + C90

 malloc 只管分配内存，并不能对所得的内存进行初始化，所以得到的一片新内存中，其值将是随机的。c++的new运算符能完成能完成动态内存分配和初始化工作。


 ```c
 int sum1d(int n,int * num)
{
  int result=0;
  int i;
  for( i=0;i<n;i++)
  {
     result+=num[i];


   }
   return result;
}
int main()
{
  int n=10;
  int *num=(int *)malloc(sizeof(int)*n);
  memset(num,0,sizeof(int)*n);
  int i;
  for(i=0;i<n;i++)
  {
      num[i]=i*i;
   }
  int result=sum1d(n,num);
  printf("result sum is %d",result);

}

 ```





- 二维变长数组 int data[m][n]

- - C99

``` c
int sum2d(int m,int n,int num[m][n])
{
  int result=0;
  int im,in;
  for(im=0;im<m;im++)
  {
     for(in=0;in<n;in++)
     {
       result+=num[im][in];
      }
   }
   return result;
}
int main()
{
  int n=10;
  int m=5;
  int num[m][n];

  int im;
  int in;
  for(im=0;im<m;im++)
  {
     for(in=0;in<n;in++)
     {
       num[im][in]=im*in;
      }
   }
  int result=sum2d(m,n,num);
  printf("result sum is %d",result);

}
```
-- C90

``` c
int sum2d(int m,int n,int ** num)
{
  int result=0;
  int im,in;
  for(im=0;im<m;im++)
  {
     for(in=0;in<n;in++)
     {
       result+=num[im][in];
      }
   }
   return result;
}
int main()
{
  int n=10;
  int m=5;
  int **num=(int **)malloc(sizeof(int*)*m);
  memset(num,0,sizeof(int *)*m);
  int i;
  for(i=0;i<m;i++)
  {
       num[i]=(int *)malloc(sizeof(int)*n);
       memset(num[i],0,sizeof(int)*n);
  }

  int im;
  int in;
  for(im=0;im<m;im++)
  {
     for(in=0;in<n;in++)
     {
       num[im][in]=im*in;
      }
   }
  int result=sum2d(m,n,num);
  printf("result sum is %d",result);

}
```


- 二维变长数组 int data[M][n]

- - C99

```c
#define M 5

int sum2d(int n,int num[M][n])
{
  int result=0;
  int im,in;
  for(im=0;im<M;im++)
  {
     for(in=0;in<n;in++)
     {
       result+=num[im][in];
      }
   }
   return result;
}
int main()
{
  int n=10;
  int num[M][n];

  int im;
  int in;
  for(im=0;im<M;im++)
  {
     for(in=0;in<n;in++)
     {
       num[im][in]=im*in;
      }
   }
  int result=sum2d(n,num);
  printf("result sum is %d",result);

}
```
- - C90

参考 data[m][n]


- 二维变长数组 int data[m][N]

- - C99

```c
#define M 5

int sum2d(int m,int num[m][N]);
```

- - C90

参考 data[m][n]

#####  总结
动态多维数组通过循环的方式分配各个维数的大小。 为了考虑兼容，可移植性，推荐使用动态数组代替变长数组

##### 推荐
如果你电脑上只有VS，可以在线体验变长数组C99；
在线编译器 http://codepad.org/ 支持c,c++,D,perl,pyhon,php等10种语言。
