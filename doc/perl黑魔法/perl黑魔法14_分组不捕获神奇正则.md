#### perl黑魔法14--分组不捕获神奇的正则

##### 摘要
perl的最大特色就是hash和正则，新手掌握了hash和正则，文本处理就会非常容易。因为正则，喜欢perl。

##### 问题
从下面文本中提取日期
>my $text='English is a West Germanic language that was first spoken in early medieval England and is now a global lingua franca.[4][5] English is 23 February 12 - 1:30pm either the official language or an official language in almost 60 sovereign states. It is the most commonly spoken language in the United Kingdom, the United States, Canada, Australia, Ireland, and New Zealand, and it is widely spoken in some areas of the Caribbean, Africa, and South Asia.[6] It is the third most common native 12 - 2pm language in the world, after Mandarin and Spanish.[7] It is the most widely learned second language and is an official language of the United Nations, of the European Union, and of many other world and regional international organisations. 21 March 12 - 1:30pm Chinatown Shanghai and Beijing, 12 March 01 - 02pm Never meet up together.';

##### 脚本
```perl
my @results=$text =~m/(\d{1,2} (?:February|March) \d{1,2}(?:am|pm)? - (?:\d{1,2}:)?\d{1,2}(?:am|pm)?)/g;

print join "\n",@results;
```

#####  讲解
- g 代表全局匹配，把所有符合正则的内容提取出来
- （） 代表捕获并且存放到内置变量中，第一个括号里东西放到$1;第二个括号中的东西放到$2; 第三个括号中的东西放到$3.
-  (?: Feb|Mar) 代表分组但是不存放到内置变量中


** perl 正则让文本处理变得容易**
