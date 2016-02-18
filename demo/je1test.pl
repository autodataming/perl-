#!/usr/bin/perl -w

#https://metacpan.org/pod/JE
#activeperl 5.18  5.20 可以ppm 安装JE
use strict;
use JE;
my  $je = JE->new;

# create global function from a Perl subroutine:##集中js函数

$je->eval(<<'___');   
 
function foo(a) {
    return a+100
}
function test()
{
	  return 1,2;
}
function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2)
            arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""),
        eval("var temp = '" + arr + "'"),
        temp
    }
___


my  $result = $je->{foo}->(11);

print $result,"\n";
my $o='F5AC4AD5266B556EA119F69552DA5B8D';
$result=$je->{hexchar2bin}->($o);
print $result,"\n";

print $je->{test}->();