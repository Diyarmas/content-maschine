#!/bin/bash
# Pflicht-Review VOR jedem Einplanen: Kontaktbogen aus der FERTIGEN mp4 (nicht aus Stills der Rohfassung).
# Aufruf: ./review_frames.sh video.mp4 [out.png]  -> 12 Frames gleichmäßig verteilt, danach ANSEHEN.
V="$1"; O="${2:-review_$(basename "$V" .mp4).png}"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
T=$(mktemp -d)
for i in $(seq 0 11); do
  t=$(python3 -c "print(round(0.3+($D-0.8)*$i/11,2))")
  ffmpeg -y -loglevel error -ss "$t" -i "$V" -frames:v 1 -vf scale=270:-1 "$T/f_$i.png"
done
ffmpeg -y -loglevel error -i "$T/f_%d.png" -start_number 0 -filter_complex "tile=6x2" "$O" 2>/dev/null || \
ffmpeg -y -loglevel error $(for i in $(seq 0 11); do echo -n "-i $T/f_$i.png "; done) -filter_complex "[0][1][2][3][4][5]hstack=6[a];[6][7][8][9][10][11]hstack=6[b];[a][b]vstack" "$O"
echo "$O"
