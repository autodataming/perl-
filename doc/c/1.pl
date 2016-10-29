#!/usr/bin/env perl
use FileHandle;
use strict;
use warnings;
#use Term::ReadKey;
#ReadMode 4; # Turn off controls keys
my $buf = ' ';
while($buf) {
    sysread STDIN, $buf, 1;
    print "$buf\n" # or whatever else you want
            # to do with it ;)
}