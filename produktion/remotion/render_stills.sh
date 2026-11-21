#!/bin/bash
# usage: render_stills.sh t1 t2 ...
export REMOTION_CHROME=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
mkdir -p stills3
for t in "$@"; do f=$(python3 -c "print(int(float('$t')*30))"); npx remotion still src/index.ts ${COMP:-Hut} stills3/s_$t.png --frame=$f --browser-executable=$REMOTION_CHROME 2>&1 | tail -1; done
