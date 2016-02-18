#!/usr/bin/perl -w
use strict;
use Mojo::Util qw(b64_encode url_escape url_unescape term_escape);
use JE;
use File::Slurp;

my $uin='744891290';
my  $je = JE->new;
my $login_hex;
my $re;

# create global function from a Perl subroutine:##集中js函数
$je->eval(scalar read_file '1.js');




#$login_hex=$je->{foo}->(100);
#print $login_hex,"\n";
#printf '\x%*v02x','\x',$login_hex;
#print "\n";
#$login_hex=$je->{uin2hex}->($uin);
#print $login_hex,"\n";
##printf '\x%*v02x','\x',$login_hex;
#
my $t='carine348';
my $e=$login_hex;
my $i='!QMD';
my $n=0;


  my $p = $je->eval(qq#
        var p = '$t';
        var salt = '$e';
        var verifycode = '$i';
        var r = \$.Encryption.getEncryption(p,salt,verifycode,$n);
        return(r);
    #);

print $p,"\n";


print $je->eval(scalar read_file '2.js');

 

   
 