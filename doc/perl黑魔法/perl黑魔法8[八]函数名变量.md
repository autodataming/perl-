sub testttt
{
print "test1";
}
my $a='testttt';

&$a();

__END__
sub http_get{
    my $self = shift;
    return $self->_http_request("get",@_);
}

sub _http_request
{
    my $self = shift;
    my $method = shift; #get post


   
     my $tx;
     for(my $i=0;$i<=$opt{retry_times};$i++)
     {
         $tx = $self->ua->$method(@_); #$method  get post
     }
     
}