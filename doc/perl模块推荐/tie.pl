#!/usr/bin/perl -w

use strict;
use Tie::File;

my @lines;

my $filename='1.mol2';
#关联
tie (@lines,'Tie::File',$filename)  or die 'can not tie';
#前面增加
#unshift(@lines,"the first line"); 
#splice(@lines,0,0,"the first line");

print $lines[100];
__END__
#后面增加
push(@lines,"the end line");
#删除 pop shift delete

#修改
$lines[-1]="the end lines  jjjj!!!";


#插入splice
my @list=("a","b","c","d");
splice(@lines,10,0,@list);

#替换splice
 @list=("a","b","c","d");
splice(@lines,1,4,@list);
#解除关联
untie(@lines);
