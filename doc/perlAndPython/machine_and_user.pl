#!/usr/bin/perl -w

use strict;
use Data::Dumper;
use File::HomeDir qw(home);
#http://alma.ch/perl/perloses.htm
sub get_machine_and_user
{
	my %hash;
	
	if($^O eq "MSWin32")
	{
		eval { require Win32; } or last;
		$hash{'MACHINETYPE'}='PC';
		$hash{'USERNAME'}=Win32::LoginName();
		$hash{'OSNAME'}=Win32::GetOSName();
		$hash{'OSVERSION'}=[Win32::GetOSVersion()]->[1];
		$hash{'USERDIRECTORY'}=home();
		$hash{'PROCESSTYPE'}=Win32::GetArchName();
		
	}
	elsif($^O eq"MacOS")
	{
		$hash{'MACHINETYPE'}='MAC';
		
	}
	elsif($^O eq "linux")
	{
		
		$hash{'MACHINETYPE'}='linux';
		
	}
	
	return \%hash;
}

unless (caller)
{
    my $info=get_machine_and_user();
    print Dumper($info);
}
