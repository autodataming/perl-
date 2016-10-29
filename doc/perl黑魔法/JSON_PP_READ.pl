#!/usr/bin/perl -w
use strict;

use Data::Dumper;
$/=undef;
my $jsontext=<DATA>;

my $len=length $jsontext;
my $text=$jsontext;

my $result;
my $ch;
my $valid_start = defined $ch; 
$ch='';
white();
$result=value();
print Dumper($result);
print $result->{type},"\n";
print $result->{items}->[0]->{sent};

#---------------------

my $at=0;
my $depth;
sub next_chr 
{

        return $ch = undef if($at >= $len);
        $ch = substr($text, $at++, 1);

}


sub value 
{
    white();
    return          if(!defined $ch);
    return object() if($ch eq '{');  #object call value
    return array()  if($ch eq '[');
    return string() if($ch eq '"' );  #not end

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

                return $s;
            }             
            else
            {          
                $s .= $ch;
            }
        }
    }

}


sub white 
{
	
    while( defined $ch  ){

        if($ch le ' '){
            next_chr();
        }
        else
        {
            last;
        }
    }
}


sub array 
{

    my $a  =  []; 

    next_chr();
    white();

    if(defined $ch and $ch eq ']')
    {
     
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
              
                next_chr();
                return $a;
            }

            if($ch ne ','){
                last;
            }

            next_chr();
            white();
        }
    }

    decode_error(", or ] expected while parsing array");
}


sub object {

    my $o =  {}; # you can use this code to use another hash ref object.
    my $k;
    next_chr();
    white();
    while (defined $ch) 
    {
        $k =  string();
        white();
        if(!defined $ch or $ch ne ':')
        {
            die "expected :";
        }
        next_chr();      
        $o->{$k} = value();            
        white();
        if($ch eq '}')
        {          

            --$depth;
            next_chr();
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
      "content": "We tonts. Way."
    },
    {
      "sent": "2016-03-03T19:03:02.00Z",
      "subject": "Project 1 First time meeting",
      "timeZone": "Australia/Melbourne",
      "content": "Early nextay 11am?"
    },
    {
      "sent": "2016-03-03T19:03:02.00Z",
      "subject": "Project 1 First time meeting",
      "timeZone": "Australia/Melbourne",
      "content": "Early ne 11:30 AM?"
    },
    {
      "sent": "2016-03-03T19:03:02.00Z",
      "subject": "Project 1 First time meeting",
      "timeZone": "Australia/Melbourne",
      "content": "Early next w 11:30 AM?"
    },
    {
      "sent": "2016-01-20T12:31:00.00Z",
      "subject": "Final Call for Paper",
      "content": "Paper submission Apr. 15, 2016"
    },
    {
      "sent": "2016-01-20T12:31:00.00Z",
      "subject": "Final Call for Paper 2",
      "content": "Paper  15th Apr., 2016"
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
