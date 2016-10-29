http://blogs.perl.org/users/mauke/2016/06/cool-perl-6-features-available-in-perl-5.html


use Quote::Code;
my $a=4;
my $b=5;

print qc"a+b=$a+$b={$a+$b}={4+5}\n";

http://blogs.perl.org/users/mauke/2016/06/cool-perl-6-features-available-in-perl-5.html

Interpolating blocks in strings

Perl 5 lets you interpolate variables in double-quoted strings, which can be very convenient:

However, this is limited to variables (scalars and arrays/array slices). There's no way to directly interpolate, say, method or function calls. That's why Perl 6 lets you interpolate arbitrary code in strings by using { blocks }: