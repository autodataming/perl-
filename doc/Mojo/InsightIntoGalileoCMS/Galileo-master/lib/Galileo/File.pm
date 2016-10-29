package Galileo::File;
use Mojo::Base 'Mojolicious::Controller';

use File::Next;
use File::Spec;

sub list {
  my $self = shift;
  my $dir = $self->upload_path;

  my $iter = -d $dir ? File::Next::files( $dir ) : undef;

  $self->on( json => sub {
    my ($ws, $data) = @_;
    my $list = _get_list( $iter, $dir, $data->{limit} );
    $ws->send({ json => $list });
  });
}

sub _get_list {
  my ($iter, $dir, $limit) = @_;

  unless ( defined $iter ) {
    return +{files => [], finished => \1};
  }

  $limit ||= 20;

  my @files;
  my $finished = \0;

  while ( 1 ) {
    last unless $limit--;

    my $file = $iter->();
    unless (defined $file) {
      $finished = \1;
      last;
    }

    push @files, File::Spec->abs2rel($file, $dir);
  }

  return +{ files => [sort @files], finished => $finished };
}

1;

