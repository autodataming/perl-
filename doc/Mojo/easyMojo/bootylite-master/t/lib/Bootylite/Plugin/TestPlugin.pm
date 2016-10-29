package Bootylite::Plugin::TestPlugin;

use Mojo::Base 'Bootylite::Plugin';

has foo => 23;
has bar => 17;

sub startup     { shift->bar(666) }
sub index       { $_[1]->render(text => 'foo='.$_[0]->foo.',bar='.$_[0]->bar) }
sub paged       { $_[1]->render(text => 'test paged') }
sub article     { $_[1]->render(text => 'test article') }
sub archive     { $_[1]->render(text => 'test archive') }
sub tag         { $_[1]->render(text => 'test tag') }
sub tags        { $_[1]->render(text => 'test tags') }
sub page        { $_[1]->render(text => 'test page') }
sub feed        { $_[1]->render(text => 'test feed') }
sub tag_feed    { $_[1]->render(text => 'test tag feed') }
sub draft       { $_[1]->render(text => 'test draft') }
sub refresh     { $_[1]->render(text => 'test refresh') }

!! 42;
__END__
