#!/usr/bin/perl -w
use strict;
use Encode qw(encode decode);
open FH,"plVSpy[1]input.txt";
my @text=<FH>;
shift @text;
my %hash;
for(@text)
{
	chomp;
	my($state,$city,$region,$GDB)=$_=~/(\S+)/g;
	$hash{$state.'国'.$city.'市'}+=$GDB;
}
my @values=sort {$a<=>$b} values%hash;
my $max=$values[-1];
#print $max,"\n";
for my $key(keys %hash)
{
	if($hash{$key}==$max)
	{
		my $string=$key.'收入最高为: '.$hash{$key};
		$string=decode('utf8',$string);
		my $str= encode('gbk',$string);
		print $str,"\n";
	};
}
