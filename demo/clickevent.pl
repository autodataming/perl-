package Remotor;
use base qw(Mojo::Base);
use base qw(Mojo::EventEmitter);
sub has { Mojo::Base::attr(__PACKAGE__, @_) }


has channel => undef;
has status => undef;
sub poke
{
my 	$sele=shift;
my ($eventname,$parameter)=(_)
$self->emit($eventname=>$parameter);	
}

sub on(clickon=>$clickontv);
sub on(clickoff=>$clickofftv);
sub on(getchannel=>$getchannel);
sub on(getchannel=>$getchannel);



