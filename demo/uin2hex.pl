#!/usr/bin/perl -w
use strict;
use Mojo::Util qw(b64_encode url_escape url_unescape term_escape);
use JE;
my $uin='744891290';


my  $je = JE->new;

# create global function from a Perl subroutine:##集中js函数

$je->eval(<<'___');

  var hexcase = 1
      , b64pad = ""
      , chrsz = 8
      , mode = 32;
function foo(a)
{
    return a+100
}
function uin2hex(str) 
 {
            var maxLength = 16;
            str = parseInt(str);
            for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++)
                hex = "0" + hex;
            for (var arr = [], j = 0; maxLength > j; j += 2)
                arr.push("\\x" + hex.substr(j, 2));
            var result = arr.join("");
            return eval('result="' + result + '"'),
            result
 }


___

#$uin='1017044504';
 my $login_hex=$je->{uin2hex}->($uin);
print term_escape($login_hex);
print "\n";
printf '\x%*v02x','\x',"abcd";
print "\n";
printf '\x%*v04x','|',"abcd";






 

   
 