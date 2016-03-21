#!/usr/bin/env python
#coding:utf8
data = {}
with open('datafile') as f:
    line = f.readline()
    line = f.readline()
    while line:
        line_list = line.split()
        try:
            data['{0}{1}'.format(line_list[0],line_list[1])] += float(line_list[3])
        except KeyError:
            data['{0}{1}'.format(line_list[0],line_list[1])] = float(line_list[3])
        line = f.readline()
max_data = max(data.values())
for k,v in data.items():
    if v == max_data:
        print u'{0}国{1}市收入最高{2}'.format(k[0],k[1],v)
