#!/bin/bash
cd /home/claude/v1
for c in "$@"; do npx remotion render src/index.ts $c out/$c.mp4 --concurrency=2 --codec=h264 --crf=18 --browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome > /tmp/r_$c.log 2>&1; echo "$c $(tail -1 /tmp/r_$c.log)" >> /tmp/renderall.log; done
echo DONE >> /tmp/renderall.log
