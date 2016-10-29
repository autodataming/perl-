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
  elif os.name == 'mac':
    ret_dict['MACHINETYPE'] = 'MAC' 
    ret_dict['USERNAME'] = '' # can we get this
    ret_dict['OPSYSTEM'] = '' # or this
    ret_dict['PROCESSORTYPE'] = 'powerpc' # can be decide this
    ret_dict['USERDIRECTORY'] = '' # or this
#
  elif os.name == 'posix':
    import sys
    if sys.platform == 'vms':
      ret_dict['MACHINETYPE'] = 'VMS' # ** need to determine if Alpha or VAX
      ret_dict['USERNAME'] = os.environ['USER']
      ret_dict['USERDIRECTORY'] = os.environ['HOME']
      ret_dict['PROCESSORTYPE'] = 'Alpha' # can be determine this
      ret_dict['OPSYSTEM'] = 'VMS'  # can we be more specific?
#
    else:
      try:
        ret_dict['USERNAME'] = os.environ['USER']
      except:
        ret_dict['USERNAME'] = os.environ['LOGNAME']  
      ret_dict['USERDIRECTORY'] = os.environ['HOME']
      tmp = os.uname()
      ret_dict['MACHINETYPE'] = 'UNIX'
      ret_dict['OPSYSTEM'] = tmp[0]
      ret_dict['OPVERSION'] = tmp[2]
      ret_dict['PROCESSORTYPE'] = tmp[4]

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
