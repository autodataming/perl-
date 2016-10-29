#!/usr/bin/perl -w

use strict;

use DateTime::Format::Strptime;
my $inputformatter = DateTime::Format::Strptime
                    ->new( pattern   => '%d/%b/%Y:%H:%M:%S',
                           on_error  => 'croak',);                                                                    
my $string='11/Apr/2016:00:00:01';
my $dt=$inputformatter->parse_datetime($string);
my $outputformatter=DateTime::Format::Strptime
                      ->new( pattern => '%Y-%m-%d %H:%M:%S',
                             on_error  => 'croak',);
print $outputformatter->format_datetime($dt);    


