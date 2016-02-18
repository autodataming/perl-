#!/usr/bin/perl -w
use strict;
use Mojo::Util qw(b64_encode url_escape url_unescape term_escape);
use JE;
use File::Slurp;

my $uin='744891290';
my $pa2='login';
my  $je = JE->new;

# create global function from a Perl subroutine:##集中js函数
$je->eval(scalar read_file '1.js');


my $login_hex=$je->{uin2hex}->($uin);
print $login_hex;
printf '\x%*v02x','\x',$login_hex;

$login_hex=$je->{foo}->(100);
print $login_hex;
printf '\x%*v02x','\x',$login_hex;


__END__
my $t='carine348';
my $e=$login_hex;
my $i='!QMD';
my $n;

my $re=$je->{getEncryption}->($t,$e,$i,$n);

print "$re\n";


 

   
 