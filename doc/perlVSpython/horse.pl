#!/usr/bin/perl -w
use strict;
my $col_n=8;
my $row_m=8;
my ($col_now,$row_now)=(0,0);

my @step;
#DFS:一条路走到底的穷举法
#refer: http://baike.baidu.com/link?url=pekpuJktbCi0DtCN38lGo0qtlJFVavYeQLxKC0T8eCP2CteSL_i8gV37Z3IKlZMcAEfWKq1OSiL4AV6WdWbb5a
#refer:http://baike.baidu.com/view/288277.htm
#step1 产生一个矩阵表示棋谱

my @chess;
for my$key1(0..$col_n)
{
	map{$chess[$key1][$_]=0}(0..$row_m);#0代表没有走过，1代表走过
   	
}

#print $chess[0][0]

#step2 设置走法
my $steps=[[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]];

#step3 

my $flag=0;
my $step_num=0;
my $minnum=10000000;
my $path_str;
my @oldpaths=();
my @newpaths;
my @paths=();
go($col_now,$row_now,@oldpaths);
print $flag,"\n";
print $minnum,"\n";


sub go
{
   my $col_now=shift;
   my $row_now=shift;
   push @paths,$col_now,$row_now;

  # print join ",",@paths;
  # print "\n";
   $chess[$col_now][$row_now]=1; #访问过了的标志
   
   $step_num++;
   if($step_num >$minnum)
   { 
   	return 
   }
   if($col_now==$col_n and $row_now==$row_m) #判断这条路是否走到底了
   {
       $flag=1;
       print "success\n,you have access the destination\n";
       print "paths:";
       print join ",",@paths;
       print "\n";
     
       $minnum=$minnum<$step_num?$minnum:$step_num;
       return 1;         
   }	
   for my $step(@$steps)
   {
      	my $col_new=$col_now+$step->[0];
      	my $row_new=$row_now+$step->[1];
      	#print "$col_new  $row_new\n";
      	if($col_new>0 and $col_new<= $col_n and $row_new>0 and $row_new<=$row_m)
      	{
	      	if($chess[$col_new][$row_new]==0)
	      	{
	      		 # print " goto $col_new  $row_new\n";
	      		
	      	     go($col_new,$row_new,@newpaths);
	      	     #pop shift
                 pop @paths;
                 pop @paths;
                # print join ",",@paths;
               #  print "\n";
	      	     
	      	     $step_num--;
	      	     $chess[$col_new][$row_new]=0;
	      	}
        }
      	
   }
	
	
}
__END__


sub go
{
   my $col_now=shift;
   my $row_now=shift;
   if($col_now==$col_n and $row_now==$rom_m)
   {
       $flag=1;
       print "success\n,you have access the destination\n";
       push @step,$step_num;
       	
   }	
	
	
	
}


