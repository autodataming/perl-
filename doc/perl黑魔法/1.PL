#!/usr/bin/perl -w

use strict;

my $a=111;
my $message=<<"EOF";
Usage: test.pl -c config, -f file -l lines
    -c config file
    -f file name
    -l number of lines
    a:$a
    a:"$a"
    a:'$a'
    \$a:$a
EOF

print $message,"\n";