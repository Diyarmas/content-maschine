#!/bin/bash
# finish.sh Comp dirname  -> mixes DE+EN, makes review sheets
cd /home/claude/v1
C=$1; D=$2
EV=$(python3 -c "import json;print(json.dumps(json.load(open('events.json'))['$C']))")
for l in DE EN; do ll=$(echo $l | tr A-Z a-z); python3 mix.py out/$C$l.mp4 /home/claude/fr/$D/$ll out/F_$C$l.mp4 "$EV" >/dev/null && (cd /home/claude/content-maschine && ./produktion/review_frames.sh /home/claude/v1/out/F_$C$l.mp4 /home/claude/v1/out/rv_$C$l.png >/dev/null 2>&1); echo "$C$l $(ffprobe -v error -show_entries format=duration -of csv=p=0 out/F_$C$l.mp4)"; done
