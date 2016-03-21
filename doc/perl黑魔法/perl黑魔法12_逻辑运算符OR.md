sub test
{
my $message=shift||"nihao";

print $message,"\n";	
	
	
}

&test();
&test("hello,world")

sub test
{
my $pa=shift;
my $message=$pa?$pa:"nihao";

print $message,"\n";	
	
	
}

&test();
&test("hello,world")


sub test
{
my $pa=shift;
if($pa)
{
$message=$pa;

}
else
{
$message="nihao"
}

print $message,"\n";	
	
	
}

&test();
&test("hello,world")