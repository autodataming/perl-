
$/=undef;

my $text=<DATA>;

my @results=$text=~/(?:START)((?:(?!START).)+?)(?:(?:END)|(?:TER))/msg;
print @results
__DATA__
START
CONTENT1
END
START
sss
START
CONTENT2
TER
START
CONTENT3
TER
DFSDF
TER