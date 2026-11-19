#!/bin/bash
# usage: tpl/mk.sh rNN wl|split de|en "KEYS"   (rNN/cfg.js, voice.txt, scenes.js vorhanden)
set -e
D=$1; T=$2; L=$3; KEYS="$4"
cd /home/claude/$D
cat cfg.js ../tpl/${T}_body.js > sec.js
bash ../mkvid.sh $D "$KEYS" $L | tail -1
