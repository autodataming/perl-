use Mojolicious::Lite;
use 5.20.0;
use experimental 'signatures';

# Render template "index.html.ep" from the DATA section
get '/' => {template => 'index'};

 #WebSocket service used by the template to extract the title from a web site
websocket '/title' => sub ($c) {
  $c->on(message => sub ($c, $msg) {
    my $title = $c->ua->get($msg)->res->dom->at('title')->text;
    $c->send($title);
  });
};

#websocket '/title' => sub ($c) {
#  $c->on(message => sub ($c, $msg) {
#    my $title = 'hello mojo';
#    $c->send($title);
#  });
#};
app->start;

__DATA__

@@ index.html.ep
% my $url = url_for 'title';
<script>
  var ws = new WebSocket('<%= $url->to_abs %>');
  ws.onmessage = function (event) { document.body.innerHTML += event.data };

  ws.onopen    = function (event) { ws.send('http://mojolicious.org') };
</script>