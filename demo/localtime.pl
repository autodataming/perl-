print localtime(),"\n";
print join "-",localtime(),"\n";
print time(),"\n";
print join "-",time(),"\n";
my $t=localtime();
my @t=localtime();
print '$t ',$t,"\n";
print '@t ', join "-",@t,"\n";
print ''.localtime();
