#!/usr/bin/perl -w
use strict;
use Mojo::Util qw(b64_encode url_escape url_unescape term_escape);
use JE;
use File::Slurp;
# create global function from a Perl subroutine:##集中js函数
my  $je = JE->new;

print $je->eval(scalar read_file '2.js');
