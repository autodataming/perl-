sub{print "hello world\n"}->();

my $r=sub{use integer;  time}->();
print $r,"\n";
$r=sub{use integer;  ~time}->();
print $r,"\n";

$r=sub{1000}->();
print $r,"\n";
 $r=sub{~01000}->();
print $r,"\n";