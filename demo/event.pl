package Cat;
use Mojo::Base 'Mojo::EventEmitter';
 
# Emit events
sub poke {
  my $self = shift;
  $self->emit(roar => 3);
}
 
package main;
 
# Subscribe to events
my $tiger = Cat->new;
$tiger->on(roar => sub {
  my ($tiger, $times) = @_;
  say 'RAWR!' for 1 .. $times;
});
$tiger->poke;