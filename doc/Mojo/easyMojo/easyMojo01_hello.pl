use Mojolicious::Lite;

get '/'=>{text=>"I love Mojo"};

app->start;