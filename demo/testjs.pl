#!/usr/bin/perl -w
use strict;
use JE;
use File::Slurp;

my $t="2954c637de599a43c8584205923f68b1";
my $e='\x00\x00\x00\x00\xb7\x23\xc2\x72';

my $i='netx';
my $n=0;
#//var result=encry_czq( "2954c637de599a43c8584205923f68b1","\x00\x00\x00\x00\xb7\x23\xc2\x72","netx",0) ;

my $command="node encryption.js $t $e $i $n";
print "$command\n";
my $result= `$command`;
chomp($result);
 print $result,"";
 print "\n"x10;

 print $result,"\n";

   
 