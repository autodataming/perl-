#### PerlAndPython[02] 获取windows机器信息

##### 摘要
机器信息是最基本的信息，知道信息后，可以这对机器类型，开发特定的软件。

##### perl demo
- 依赖模块Win32,File::HomeDir，通过cpanm可以直接安装。
> cpanm Win32 <br>
> cpanm File::HomeDir


``` perl
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

__END__
output
$VAR1 = {
          'MACHINETYPE' => 'PC',
          'OSNAME' => 'Win7',
          'USERNAME' => 'chenzq',
          'USERDIRECTORY' => 'C:\\Users\\chenzq',
          'OSVERSION' => 6,
          'PROCESSTYPE' => 'x86'
        };
```

##### python demo
- 依赖模块win32api, 下载编译好的win32api.exe 进行安装。

``` python
# This procedure returns just lots of information about the platform that the script is
# running on :
#
#    MACHINETYPE   = top level identifier of the machine type (i.e. PC, UNIX, VMS or MAC)
#    OPSYSTEM      = the actual operating system being run (e.g. NT, Linux, irix)
#    PROCESSORTYPE = the type of processor, (i.e. 586, Alpha, etc)
#    
#    USERNAME      = name of the user currently logged in (if possible)
#    USERDIRECTORY = the users home directory (e.g. /home/myname)
# https://sourceforge.net/projects/pywin32/?source=typ_redirect
def get_machine_and_user():
#
# first determine machine type
#
  ret_dict = {}
  import os,string
  if os.name == 'nt':
    ret_dict['MACHINETYPE'] = 'PC'
    import win32api
    try:
      ret_dict['USERNAME'] = string.replace(win32api.GetUserName(),' ','_')
    except:
      ret_dict['USERNAME'] = ''
    proctype = win32api.GetSystemInfo()[6]
    if `proctype`[-2:] == '86':
      ret_dict['PROCESSORTYPE'] = 'intel'
    else:
      ret_dict['PROCESSORTYPE'] = 'alpha'    
    gvex = win32api.GetVersionEx()
    if gvex[3] == 1:
      ret_dict['OPSYSTEM'] = '9X'
      ret_dict['USERDIRECTORY'] = ''
    else:
      ret_dict['OPSYSTEM'] = 'NT'
      ret_dict['USERDIRECTORY'] = os.environ['USERPROFILE']
    ret_dict['OPVERSION'] = `gvex[0]`+'.'+`gvex[1]`
#
  else:
    ret_dict['MACHINETYPE'] = 'not supported'

  tmp = ""
  for x in ret_dict['USERNAME']:
    if x in string.letters+string.digits+"_":
      tmp = tmp + x
  ret_dict['USERNAME'] = tmp

  return ret_dict

if __name__ == "__main__":

   print get_machine_and_user()
'''
{'USERNAME': 'xxx', 'MACHINETYPE': 'PC', 'USERDIRECTORY': 'C:\\Users\\xxx', 'PROC
ESSORTYPE': 'intel', 'OPSYSTEM': 'NT', 'OPVERSION': '6.1'}
'''

```
