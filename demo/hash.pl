my %d;

my @text=<DATA>;
chomp(@text);
my $keys=$text[0];
my $values=$text[1];
my $expression='@d{qw('.$keys.' )}'.'='.'qw( '.$values.')';
print $expression,"\n";
eval($expression);
print $d{key1},"\n";
__DATA__
key1 key2 k3 k4
val1 val2 val3 val4