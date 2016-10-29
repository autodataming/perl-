use List::Util qw(uniq uniqnum);

my @aa=(1,2,3,3,3,2,'a','bdd','c','a');
my @bb=(2,3,4,2,3,1);

print join ",",uniq @aa;
print "\n";
print join ",",uniqnum @bb;

