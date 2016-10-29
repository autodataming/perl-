#### perl模块推荐19_XML-Simple
##### 摘要  
XML 作为一种可扩展标记语言，在数据传输和交换中得到广泛应用。通过**XML::Simple**,可以轻松解析XML，提取想要的信息。

##### 代码示例
```perl
#!/usr/local/bin/perl
use Encode;
use strict;
use warnings;
use utf8;

use XML::Simple;
use Data::Dumper;

#1.xml 数据来自于DATA
#my $xmlfile = "1.xml" ;
#
#my $config = XMLin($xmlfile);

$/=undef;
my $xmlfile=<DATA>;

my $config = XMLin($xmlfile);


my $UP_Node = $config ->{UP};

#使用Dumper 观察数据结构
#print Dumper($UP_Node);

foreach my $hash_ref(@$UP_Node)
{


	my $AreaCode= $hash_ref->{"AREACODE"};
	my $Userid= $hash_ref->{"USERID"};
	my $Date= $hash_ref->{"DATE"};
	my $Ip= $hash_ref->{"IP"};
	my $Stbid= $hash_ref->{"STBID"};
	my $Caid= $hash_ref->{"CAID"};

	my $ev=$hash_ref->{'EV'};
	#my $ev_e2=$hash_ref->{'EV'}->{'E2'};
	#print ref($ev);
	if(ref($ev) eq 'ARRAY')
	{
	    foreach my $ev_indivial(@$ev)
	    {
	         my $ev_e2=$ev_indivial->{'E2'};
	         print $ev_e2,"\n";
	    }
	}
	elsif(ref($ev) eq 'HASH')
	{
	    my $ev_e2=$hash_ref->{'EV'}->{'E2'};
	    print $ev_e2;

	}

	print "\n";

}


__DATA__
<?xml version="1.0" encoding="utf-8"?>
<CoshipUP>
  <UP STBID="0521607" CAID="8120010499497722" IP="10.200.38.208" USERID="7817334" AREACODE="1006" DATE="20160801">
    <EV E="000246" E1="0001" E2="0000" E3="0000" D1="0000" D2="0000" D3="0000" T="H"/>
  </UP>
  <UP STBID="0390388" CAID="8120010542807752" IP="10.225.14.164" USERID="8035240" AREACODE="" DATE="20160801">
    <EV E="000231" E1="0000" E2="0000" E3="0000" E4="0000" E5="0000" D1="0003" D2="0000" D3="0000" T="L"/>
    <EV E="000235" E1="0022" E2="0005" E3="22223" E4="0000" E5="0000" D1="0101" D2="0223" D3="山东教育" T="L"/>
    <EV E="000236" E1="0003" E2="770" E3="17" E4="1" E5="0" D1="425" D2="164" D3="6" T="A"/>
  </UP>
</CoshipUP>



```

#### 代码解析
合理使用Dumper,观察数据结构。
```
$VAR1 = [
          {
            'IP' => '10.200.38.208',
            'EV' => {
                    'E2' => '0000',
                    'T' => 'H',
                    'D3' => '0000',
                    'E1' => '0001',
                    'E3' => '0000',
                    'D1' => '0000',
                    'E' => '000246',
                    'D2' => '0000'
                  },
            'CAID' => '8120010499497722',
            'STBID' => '0521607',
            'AREACODE' => '1006',
            'DATE' => '20160801',
            'USERID' => '7817334'
          },
          {
            'USERID' => '8035240',
            'AREACODE' => '',
            'DATE' => '20160801',
            'EV' => [
                    {
                      'E5' => '0000',
                      'T' => 'L',
                      'D3' => '0000',
                      'E2' => '0000',
                      'D2' => '0000',
                      'E' => '000231',
                      'E4' => '0000',
                      'D1' => '0003',
                      'E3' => '0000',
                      'E1' => '0000'
                    },
                    {
                      'E4' => '0000',
                      'E3' => '22223',
                      'D1' => '0101',
                      'E1' => '0022',
                      'D2' => '0223',
                      'E' => '000235',
                      'D3' => "\x{5c71}\x{4e1
                      'T' => 'L',
                      'E5' => '0000',
                      'E2' => '0005'
                    },
                    {
                      'E2' => '770',
                      'E5' => '0',
                      'T' => 'A',
                      'D3' => '6',
                      'D2' => '164',
                      'E' => '000236',
                      'D1' => '425',
                      'E3' => '17',
                      'E1' => '0003',
                      'E4' => '1'
                    }
                  ],
            'IP' => '10.225.14.164',
            'STBID' => '0390388',
            'CAID' => '8120010542807752'
          }
        ];

```
通过观察我们可以发现，EV 对应的元素只有一个，则对应的是一个hash引用。当EV对应的元素有多个的时候，则对应的是一个hash引用的数组。所以需要通过**ref**函数判断类型，然后进行对应解析。

如何解析各种引用，可以参考这篇文章。  
##### 标记语言（Markup Language）
- HTML，超文本标记语言，旨在显示信息；  
- XML，可扩展标记语言，旨在传输信息；  
- XHTML，可扩展超文本标记语言，基于XML，作用与HTML类似，但语法更严格。  

JSON 是比XML 更轻量级的数据交换格式，数据通过键值对表示，这也决定了JSON 不允许键重复，而XML 和HTML 是允许同级下的元素重复。

JSON 的解析可以参考这篇文章。
