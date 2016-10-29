#!/usr/bin/perl -w

use strict;

use DateTime::Format::Strptime;
# %b %B %h 
#my $strp = DateTime::Format::Strptime->new(
#    pattern   => '%G-%b-%d %T',
#    );
#    
#my $dt=DateTime->new( year =>2008,
#                      month=>4,
#                      day=>18,
#                      hour=>11,
#                      minute=>11,
#                      second=>47,
#                      );
#my $formatter = DateTime::Format::Strptime->new( pattern   => '%G-%b-%d %T',);                     
#$dt->set_formatter( $formatter );
#print $formatter->format_datetime($dt);


my $inputformatter = DateTime::Format::Strptime->new( pattern   => '%Y-%b-%d %T',  on_error  => 'croak',); 
my $dt2=$inputformatter->parse_datetime('2008-Apr-18 11:11:47');
#$inputformatter->format_datetime($dt2);

 my $outputformatter = DateTime::Format::Strptime->new( pattern   => '%Y/%m/%d %T',  on_error  => 'croak',); 
 print "\n";         
print $outputformatter->format_datetime($dt2);          