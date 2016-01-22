
```perl6
class Human {
  has $.name;
  my $.counter = 0;
  method new($name) {
    Human.counter++;
    self.bless(:$name);
  }
}
my $a = Human.new('a');
my $b = Human.new('b');

say Human.counter;
say $a.name;
say $a.counter;
say $b.name;
say $b.counter;
```
