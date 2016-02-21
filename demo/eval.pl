my $string_a="\x00\x00\x00\x00\x2c\x66\x23\x9a";

 $string_A='\x00\x00\x00\x00\x2c\x66\x23\x9a';

print $string_a," a\n";

print $string_A," A\n";


#把a变成A
print "a to A: ";
printf '\x%*v02x','\x',$string_a;
print "\n";
print "A to a: ";
#把A变成a
my $k ;
#构建表达式 $k="\x00\x00\x00\x00\x2c\x66\x23\x9a"
#$k="$string_A"

print eval('$k="'.$string_A.'"');
print "$k\n";