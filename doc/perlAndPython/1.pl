use Win32API::Net;
use File::HomeDir qw(home);
use Data::Dumper;
use Win32::SystemInfo;
use Win32;

Win32API::Net::UserGetInfo( '', Win32::LoginName(), 10, my $info = {} );

print "\n\n";

print Win32::GetOSVersion();


my $proc = Win32::SystemInfo::ProcessorInfo();
 
my %phash;
Win32::SystemInfo::ProcessorInfo(%phash);
print Dumper(\%phash);
print "\n";



my $full_name = $info->{name};
print $full_name;
print Dumper($info);
print Win32::LoginName();

print "\n\n";
print home();