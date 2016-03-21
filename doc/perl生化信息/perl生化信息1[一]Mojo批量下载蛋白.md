#### perl生化信息1[一]-Mojo超快速批量下载蛋白

##### 摘要
蛋白质晶体数据库(PDB) 是研发人员的一个宝藏，如何挖掘信息，助力药物结构的设计，一直激励着一批又批人员不停的探索。最基本的问题如何快速从PDB网站上获取蛋白结构？perl can do it.下载158个蛋白，用时8s.

###### demo1 普通下载模式
``` perl
#!/usr/bin/perl -w
use Mojo::UserAgent;
use strict;
open FH, "mode1_F.txt";
my $line=<FH>;
my @ids=split(/, /,$line);
my $num=@ids;
my $ua=Mojo::UserAgent->new(name=>'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0');
print "$num pdbs should be downloaded\n";
my $time1=time();
foreach my $id(@ids)
{
	my $pdburl='http://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=pdb&compression=NO&structureId='.$id;
    my $file=$id.'.pdb';
    my $res=$ua->get($pdburl)->res;
     $res->body;
    open FH,">$file";
    print FH $file;
    close(FH);
}
my $time2=time();
my $elapse=$time2-$time1;
print "donwload, time:$elapse\n";
```
经过测试，在普通模式下，下载158个蛋白大约需要28s。速度依旧比pymol的fetch快。

##### demo2 多进程下载
```
Parallel::Runner - An object to manage running things in parallel processes.
```
每一次下载都是一个独立平行的作业。
```perl
#!/usr/bin/perl -w

use Mojo::UserAgent;
use strict;
use Parallel::Runner;
my $runner=Parallel::Runner->new(10);#开启10个平行进程
open FH, "mode1_F.txt";
my $line=<FH>;
my @ids=split(/, /,$line);
my $num=@ids;
my $ua=Mojo::UserAgent->new(name=>'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0');

print "$num pdbs should be downloaded\n";
my $time1=time();
foreach my $id(@ids)
{
	$runner->run( sub{
	my $pdburl='http://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=pdb&compression=NO&structureId='.$id;
    my $file=$id.'.pdb';

    my $res=$ua->get($pdburl)->res;
     $res->body;
    open FH,">$file";
    print FH $file;
    close(FH);
      }
    );

}
$runner->finish;
my $time2=time();
my $elapse=$time2-$time1;
print "donwload, time:$elapse\n";
```
测试的时候，我开启了10个进程，下载158个蛋白，用时8s.
** 进程数需要调试，不是越多越好 **
