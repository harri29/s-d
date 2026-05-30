#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TMP="$ROOT/.lite-build"
OUT="$ROOT/out"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
mkdir -p "$TMP" "$OUT"
rm -f "$TMP"/*.mp4 "$TMP"/*.txt "$TMP"/concat.txt
images=(cover.png city-page.png family-page.png academy-page.png awakening-page.png older-form.png battle.png ultimate.png)
titles=(
$'TƠ MỘNG HẮC NẠP\nTRAILER NHÂN VẬT'
$'ĐÔNG HẢI THÀNH\nMột buổi sáng bình thường…'
$'LÂM THƯƠNG KHUNG\nMang ký ức của hai cuộc đời.'
$'NGÀY THỨC TỈNH\nVõ hồn gọi tên cậu.'
$'PHỆ MỘNG TẰM\nMột sợi tơ không chạm đất.'
$'HẮC NẠP\nChiếc hộp đã mở mắt.'
$'MỌI ĐƯỜNG LUI\nĐỀU MẮC TRONG TƠ.'
$'TƠ MỘNG HẮC NẠP\nSẮP RA MẮT'
)
for i in "${!images[@]}"; do
  idx=$(printf '%02d' "$i")
  textfile="$TMP/title_${idx}.txt"
  printf '%s' "${titles[$i]}" > "$textfile"
  ffmpeg -hide_banner -loglevel error -y -loop 1 -i "$ROOT/public/images/${images[$i]}" -t 3 \
    -vf "scale=550:980:force_original_aspect_ratio=increase,crop=480:854,zoompan=z='min(zoom+0.0010,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=45:s=480x854:fps=15,drawbox=x=0:y=610:w=iw:h=244:color=black@0.50:t=fill,drawtext=fontfile=${FONT}:textfile=${textfile}:fontcolor=white:fontsize=25:line_spacing=9:x=(w-text_w)/2:y=670:shadowcolor=black@0.95:shadowx=2:shadowy=2,drawtext=fontfile=${FONT}:text='FAN TRAILER • TƠ MỘNG HẮC NẠP':fontcolor=white@0.70:fontsize=11:x=(w-text_w)/2:y=818,fade=t=in:st=0:d=0.25,fade=t=out:st=2.75:d=0.25,format=yuv420p" \
    -an -c:v libx264 -preset ultrafast -crf 25 -movflags +faststart "$TMP/scene_${idx}.mp4"
  printf "file '%s'\n" "$TMP/scene_${idx}.mp4" >> "$TMP/concat.txt"
done
ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i "$TMP/concat.txt" -c copy "$OUT/to-mong-hac-nap-trailer-demo-silent.mp4"
echo "Created $OUT/to-mong-hac-nap-trailer-demo-silent.mp4"
