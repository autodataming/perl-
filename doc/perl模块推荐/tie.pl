#!/usr/bin/perl -w

use strict;
use Tie::File;

my @lines;

my $filename='1.mol2';
#����
tie (@lines,'Tie::File',$filename)  or die 'can not tie';
#ǰ������
#unshift(@lines,"the first line"); 
#splice(@lines,0,0,"the first line");

print $lines[100];
__END__
#��������
push(@lines,"the end line");
#ɾ�� pop shift delete

#�޸�
$lines[-1]="the end lines  jjjj!!!";


#����splice
my @list=("a","b","c","d");
splice(@lines,10,0,@list);

#�滻splice
 @list=("a","b","c","d");
splice(@lines,1,4,@list);
#�������
untie(@lines);
