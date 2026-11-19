#!/bin/bash
# usage: sheet.sh pdf first last out cols
pdf=$1;a=$2;b=$3;out=$4;cols=${5:-6}
rm -rf /tmp/pg;mkdir -p /tmp/pg
pdftoppm -r 40 -f $a -l $b -png $pdf /tmp/pg/p
cd /tmp/pg && montage p-*.png -tile ${cols}x -geometry +4+4 -background '#888' $out
