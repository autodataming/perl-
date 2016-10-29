#### Perl[Tk] 实时读入数据到表格  
##### 摘要
如何实时从文本中读入数据到Tk的表格Table中？Tk::Table模块就是表格的类，利用它可以快速创建表格。

##### 代码示例
- 创建表格
- 设置表头
- 填充数据
- 实时刷新  

```perl
#!/usr/bin/perl
use strict;
use warnings;
use Tk;
use Tk::Table;
my $cols = 3;
my $rows = 20;


my $inputfile="table_input.txt";
# ------------------------------------------------------------------------

#
# create the main window and frame
#
my $mw = new MainWindow();
my $tableFrame = $mw->Frame(-borderwidth => 2,
                            -relief => 'raised')->pack;
#
# allocate a table to the frame
#创建表格
my $table = $tableFrame->Table(-columns => $cols,
                               -rows => $rows,
                               -relief => 'solid');
#
# column headings
#设置表头
open FH,"$inputfile" or die "cannot find input file";
my @text=<FH>;
close(FH);
my @headers=$text[0]=~/(\S+)/g;

foreach my $c ( 1 .. $cols) {
        my $hdr = shift @headers;
        my $tmp = $table->Label(-text => $hdr,
                                -width => 20,
                                -relief => 'solid'
                               );
        $table->put( 0, $c, $tmp );
}
#
# populate the cells and bind an action to each one
#填充表格
foreach my $r ( 1 .. @text-1 )
{
        my @elements=$text[$r]=~/(\S+)/g;
        foreach my $c ( 1 .. $cols )
        {

                my $data = shift @elements;
                my $tmp = $table->Label(-text => $data,-relief => 'groove');
                $table->put( $r, $c, $tmp );
        }
}
$table->pack( -expand => 'yes', -fill => 'both');

#update the table every 5 seconds
#刷新表格
my $sec_tab=5*1000;
sub updateTable
{
    my $file=shift @_;
    open FH,$file or die "no file find\n";
    my @text=<FH>;
    foreach my $r ( 1 .. @text-1 )
    {
        my @elements=$text[$r]=~/(\S+)/g;
        foreach my $c ( 1 .. $cols )
        {

                my $data = shift @elements;
                my $tmp = $table->Label(-text => $data,-relief => 'groove');
                $table->put( $r, $c, $tmp );
        }
    }
   #$table->update(); 
}
my $table_id = $table->repeat($sec_tab,sub{&updateTable($inputfile)});

my $sec_file=5*60*1000;
sub exec_cmd
{
    #system("1.exe")
    print "hello,world\n";
}
my $file_id = $mw->repeat($sec_file,sub{&exec_cmd()});

MainLoop();

```
##### 代码解析
刷新数据，使用了2个函数，一个是
