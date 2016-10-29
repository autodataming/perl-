#### perl模块推荐14_DBI

##### 摘要
键值对的数据结构，HASH首当其中，能够非常方便的根据键找到其对应的值。然后hash是存放在内存中的，当键值对超过100000条，不可避免就会出现out of memory。这时数据库就可以充当硬盘版的hash，拜托内存的限制。


##### hash 版的键值对的查询  
---  
```perl

#!/usr/bin/perl -w

use strict;
#contact perlcoder weixin
my %hash;
while(<DATA>)
{
    if($_=~/\S+/)
    {

    }
    else
    {
       next;
    }
	chomp;
	my ($key)=$_=~/>(\S+)/;
	my $value=<DATA>;
	chomp($value);
	$hash{$key}=$value;
}

print $hash{'Gh_A04G0739'},"\n";


__DATA__
>Gh_A12G2559              
ATGGCTACTTTCTTTGGCTATTTTAC
>Gh_A12G2554              
ATGGCGGGAACTATCCAATCCCTAAT
>Gh_A04G0755              
ATGGCCTCCGATCAGACCCTTTTTCA
>Gh_A04G0739              
ATGGAGAAAGCAAAACCTGAAGCACC
>Gh_A04G0738              
ATGGCGCAGGTTTTAGACGACGCTGA
>Gh_A07G1346              
ATGGTTCATTGTCTGCCAAAGGTTTC
>Gh_A07G1331              
ATGGCAGACAAGGATTCTTCAAGGCC
>Gh_A07G1334              
ATGACGACGCCAACTCGAGATGCAAT
>Gh_A07G1335              
ATGGCCGCAACTAGATTCCTCTCTCA
>Gh_A08G1510              
ATGGCTACTGCACCGATAAAGTCTCA
>Gh_A08G1433              
ATGGGTAAAACACCTACTGGCAAGGA
```
---




##### perl 数据库
DBI 中有多种数据库引擎，包括。这里以SQLite为例进行介绍，

>SQLite模块定义的“数据库”是存在于单个文件中的，把单个文件仿真为一个数据库。  
SQLite模块定义的“数据库”是存在于单个文件中的，把单个文件仿真为一个数据库。  
SQLite定义的数据库里面没有数据类型这个概念。不管你在创建一个表的时候指定的是什么数据类型，以后你可以在其中放入任何类型的数值（包括字符型，数字型，日期型，二进制对象/blob）。。实际上，创建表的时候你甚至可以不指定数据类型。 CREATE TABLE people ( id, name, age);  这和perl非常像。


- step1 创建数据库和表格

---
``` perl
#!/usr/bin/perl -w


use strict;
use DBI;

my @drivers=DBI->available_drivers;

#print join("-",@drivers);

#[create] and connect a database

my $db='FASTA.db';
my $dbh=DBI->connect("DBI:SQLite:$db")  or die "can't connect FASTA\n";
print "Opened database successfully\n";
#create table




my $command = qq(CREATE TABLE fasta2016
      (ID CHAR(50) PRIMARY KEY     NOT NULL,
             CONTENT        TEXT    NOT NULL
          ););



my $rv = $dbh->do($command);

if($rv < 0)
{
   print $DBI::errstr;
} else
{
   print "Table created successfully\n";
}
$dbh->disconnect();

```

---

- step2 填充数据库  

---

``` perl
#!/usr/bin/perl -w


use strict;
use DBI;

my @drivers=DBI->available_drivers;

#print join("-",@drivers);

#[create] and connect a database

my $db='FASTA.db';
my $dbh=DBI->connect("DBI:SQLite:$db")  or die "can't connect FASTA\n";

#INSERT Table
my $sth=$dbh->prepare("INSERT INTO fasta2016(ID,CONTENT)
                       VALUES(?,?)");

#open FH,"test.fasta";
#open FH,"NBI_Gossypium_hirsutum_v1.1.fasta";
my $id=0;
while(<DATA>)
{
	$id++;
	print $id,"\n";
	if($_=~/\S+/)
    {

    }
    else
    {
       next;
    }
	chomp;
	my ($key)=$_=~/>(\S+)/;
	my $value=<DATA>;
	print "$key\n";
	$sth->execute($key,$value);



}



$dbh->disconnect();

__DATA__
>Gh_A07G1331              
ATGGCAGACAAGGATTCTTCAAGGCC
>Gh_A07G1334              
ATGACGACGCCAACTCGAGATGCAAT
>Gh_A07G1335              
ATGGCCGCAACTAGATTCCTCTCTCA
>Gh_A08G1510              
ATGGCTACTGCACCGATAAAGTCTCA
>Gh_A08G1433              
ATGGGTAAAACACCTACTGGCAAGGA
```
- step3 查询

---
``` perl

#!/usr/bin/perl -w

use Data::Dumper;
use strict;
use DBI;

my @drivers=DBI->available_drivers;

#print join("-",@drivers);

#[create] and connect a database

my $db='FASTA.db';
my $dbh=DBI->connect("DBI:SQLite:$db")  or die "can't connect FASTA\n";


my $sth;
#$sth=$dbh->prepare("select * FROM fasta2016 ")  or die "can not prepare the statement\n";
my $id='Gh_A12G2554';
#$sth->execute($id);
#$sth->execute();
my @results;

#while(@results=$sth->fetchrow_array()){    print $results[0],"\n";}

$sth=$dbh->prepare("select  ID,CONTENT FROM fasta2016 where id = ?;") or die "cannot prepare";

$sth->execute($id);


@results=$sth->fetchrow_array();

print "aaa\n";
print join "\n",@results,"AAA\n";




$dbh->disconnect();




```
---


##### 参考博客
1. gunnerlzx http://blog.chinaunix.net/uid-20459533-id-1944446.html
