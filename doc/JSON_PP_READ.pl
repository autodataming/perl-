#!/usr/bin/perl -w
use strict;

use Data::Dumper;
$/=undef;
my $jsontext=<DATA>;

my $depth;
my $len=length $jsontext;
my $text=$jsontext;


my @octets = unpack('C4', $jsontext);

#print join "\n",@octets;


my $ch;

my $at=0;

my $result;

 my $valid_start = defined $ch; 
 print $valid_start,"\n";
$ch='';
white();
$result=value();
print Dumper($result);
print $result->{type},"\n";
print $result->{items}->[0]->{sent};


    sub next_chr {
    #print $at,"    at\n";
       # print $len,"    len\n";
       #len is the lenght of the text
        return $ch = undef if($at >= $len);
        $ch = substr($text, $at++, 1);
      # print $ch,"    ch\n";
    }

my $indexxx;
    sub value {
        white();
     
        $indexxx++;
      
        return          if(!defined $ch);
        return object() if($ch eq '{');  #object call value
        
        
      
        return array()  if($ch eq '[');
        return string() if($ch eq '"' );  #not end
      #  return number() if($ch =~ /[0-9]/ or $ch eq '-');
      #  return word();
    }

    sub string 
    {
        my $s;

        $s = ''; 

        if($ch eq '"' or ( $ch eq "'")){
            my $boundChar = $ch;

             while( defined(next_chr()) ){

                if($ch eq $boundChar){
                    next_chr();

               
                   # print "aaaaaaaaaaaa$s bbbbbbbbbbbb\n";
                    return $s;
                }             
                else
                {          
                    $s .= $ch;
                }
            }
        }

    }


    sub white {
    	
        while( defined $ch  ){
        	#print '>>>>>>>>',$ch,"in while!!!!!!!!!!!!!!\n";
            if($ch le ' '){
                next_chr();
            }
            elsif($ch eq '/'){
            	
            #	print "can't seeeeeeeeeeeeeeeeeeeeeeeeee\n";
            	die "not die";
                next_chr();
                if(defined $ch and $ch eq '/'){
                    1 while(defined(next_chr()) and $ch ne "\n" and $ch ne "\r");
                }
                elsif(defined $ch and $ch eq '*'){
                    next_chr();
                    while(1){
                        if(defined $ch){
                            if($ch eq '*'){
                                if(defined(next_chr()) and $ch eq '/'){
                                    next_chr();
                                    last;
                                }
                            }
                            else{
                                next_chr();
                            }
                        }
                        else{
                            decode_error("Unterminated comment");
                        }
                    }
                    next;
                }
                else{
                    $at--;
                    decode_error("malformed JSON string, neither array, object, number, string or atom");
                }
            }
            else
            {
            #	print $relaxed,"  ch $ch  relaxedddddddddd\n";
#                if ($relaxed and $ch eq '#') { # correctly?
#                	print "abcdeffffffffffffffffffff\n";
#                	die "aaaaaaaaaaaaaaaaaaaaa";
#                    pos($text) = $at;
#                    $text =~ /\G([^\n]*(?:\r\n|\r|\n|$))/g;
#                    $at = pos($text);
#                    next_chr;
#                    next;
#                }

                last;
            }
        }
    }


    sub array {
    	#print "xxxxxxxxxxxxxxxxxxarray !!!!!\n";
    	#die "aaaarray\n";
        my $a  = $_[0] || []; # you can use this code to use another array ref object.

#        decode_error('json text or perl structure exceeds maximum nesting level (max_depth set too low?)')
#                                                    if (++$depth > $max_depth);

        next_chr();
        white();

        if(defined $ch and $ch eq ']'){
            --$depth;
            next_chr();
            return $a;
        }
        else {
            while(defined($ch)){
                push @$a, value();

                white();

                if (!defined $ch) {
                    last;
                }

                if($ch eq ']'){
                    --$depth;
                    next_chr();
                    return $a;
                }

                if($ch ne ','){
                    last;
                }

                next_chr();
                white();

#                if ($relaxed and $ch eq ']') {
#                    --$depth;
#                    die "not die xxxx";
#                    next_chr();
#                    return $a;
#                }

            }
        }

        decode_error(", or ] expected while parsing array");
    }


    sub object {
    	#print "check object\n";
    	
        my $o = $_[0] || {}; # you can use this code to use another hash ref object.
  
        my $k;


        next_chr();
        white();

     
        while (defined $ch) {
        	
        
        
        	
        
     
            $k =  string();
           
           # print $k;
         
            white();

            if(!defined $ch or $ch ne ':'){
                die "expected :";
            }

            next_chr();  #skip :
          
            $o->{$k} = value();            
         #   print $k,"  key    $o->{$k} \n";
            white();
           
       
            if($ch eq '}'){                 #real end
            	#print "endddddddxxxxxxxxxx\n";
            	# print Dumper($o);
                --$depth;
                next_chr();
#                if ($F_HOOK) {
#                	die "not die\n";
#                    return _json_object_hook($o);
#                }
                #print 'fffffffffffffffff',"\n";
               #  print Dumper($o);
                return $o;
            }

         

            next_chr();
            white();


        }

        


        print "at    $at\n";
   
    }


__DATA__
{
  "type": "email",
  "items": [
    {
      "sent": "2016-02-01T19:03:02.00Z",
      "subject": "Upcoming events: Orientation 2016",
      "timeZone": "Australia/Melbourne",
      "content": "We're pleased to be working with RMIT LINK's Orientation team and RUSU to welcome all new students to campus through a series of exciting Orientation events. This email serves as a notification to make sure you know when the major events are occurring, to ensure they don't interrupt your work and so that you are able to encourage all new students to attend. Brunswick All Students Welcome, 23 February 12 - 1:30pm Brunswick Courtyard. Bundoora All Students Welcome, 24 February 12 - 2pm Bundoora West concourse. City All Students Welcome, 25 February 11am - 2:30pm Alumni Courtyard, University Way. RUSU Welcome Bash, 25 February 4pm - 9pm Alumni Courtyard. City Clubs Day, 3 March 11am - 2pm Alumni Courtyard, University Way."
    },
    {
      "sent": "2016-03-03T19:03:02.00Z",
      "subject": "Project 1 First time meeting",
      "timeZone": "Australia/Melbourne",
      "content": "Early next week is good for us.  How about Monday 11am?"
    },
    {
      "sent": "2016-03-03T19:03:02.00Z",
      "subject": "Project 1 First time meeting",
      "timeZone": "Australia/Melbourne",
      "content": "Early next week is good for us.  How about Tuesday 11:30 AM?"
    },
    {
      "sent": "2016-03-03T19:03:02.00Z",
      "subject": "Project 1 First time meeting",
      "timeZone": "Australia/Melbourne",
      "content": "Early next week is good for us.  How about Wed. 11:30 AM?"
    },
    {
      "sent": "2016-01-20T12:31:00.00Z",
      "subject": "Final Call for Paper",
      "content": "Paper submission deadline: January 31, 2016. Notification of acceptance: March 15th, 2016. Final paper submission and early registration deadline: Apr. 15, 2016"
    },
    {
      "sent": "2016-01-20T12:31:00.00Z",
      "subject": "Final Call for Paper 2",
      "content": "Paper submission deadline: 31 January, 2016. Notification of acceptance: 15th March, 2016. Final paper submission and early registration deadline: 15th Apr., 2016"
    },
    {
      "sent": "2016-02-29T09:24:30.00Z",
      "subject": "Re: Have a dinner tomorrow",
      "timeZone": "Asia/Tokyo",
      "content": "Yes, tomorrow 6:00 pm is fine for me."
    },
    {
      "sent": "2016-02-29T19:24:03.00Z",
      "subject": "Re: Have a dinner tomorrow",
      "timeZone": "Australia/Melbourne",
      "content": "Yes, tomorrow 6:00pm is fine for me."
    },
    {
      "sent": "2016-02-29T09:00:00.00Z",
      "subject": "A party invitation",
      "timeZone": "Australia/Melbourne",
      "content": "The party will be hold on Tomorrow 9:00pm - 2:00am"
    }
  ]
}
