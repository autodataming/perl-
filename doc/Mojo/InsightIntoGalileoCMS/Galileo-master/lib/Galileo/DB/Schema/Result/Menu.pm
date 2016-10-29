package Galileo::DB::Schema::Result::Menu;

use DBIx::Class::Candy
  -autotable => v1;

primary_column menu_id => {
  data_type => 'INT',
  is_auto_increment => 1,
};

unique_column name => { 
  data_type => 'VARCHAR',
  size => 255,
};

column list => { 
  data_type => 'TEXT',
};

1;

