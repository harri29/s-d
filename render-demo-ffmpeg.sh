#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TMP="$ROOT/.demo-build"
OUT="$ROOT/out"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
mkdir -p "$TMP" "$OUT"
rm -f "$TMP"/*.mp4 "$TMP"/*.txt "$TMP"/concat.txt

images=(
  "cover.png"
  "city-page.png"
  "family-page.png"
  "academy-page.png"
  "awakening-page.png"
  "older-form.png"
  "battle.png"
  "ultimate.png"
)
titles=(
  $'TƠ MỘNG HẮC NẠP\nTRAILER GIỚI THIỆU NHÂN VẬT'
  $'ĐÔNG HẢI THÀNH\nMột buổi sáng rất bình thường…'
  $'LÂM THƯƠNG KHUNG\nMột đứa trẻ mang hai cuộc đời.'
  $'NGÀY THỨC TỈNH\nVõ hồn sẽ gọi tên cậu.'
  $'PHỆ MỘNG TẰM\nMột sợi tơ không chạm đất.'
  $'HẮC NẠP\nChiếc hộp đen đã mở mắt.'
  $'MỌI ĐƯỜNG LUI\nĐỀU MẮC TRONG TƠ.'
  $'TƠ MỘNG HẮC NẠP\nSẮP RA MẮT'
)
durations=(5 5 5 5 5 5 5 6)

for i in "${!images[@]}"; do
  idx=$(printf '%02d' "$i")
  textfile="$TMP/title_${idx}.txt"
  printf '%s' "${titles[$i]}" > "$textfile"
  d="${durations[$i]}"
  frames=$((d * 24))
  ffmpeg -hide_banner -loglevel error -y -loop 1 -i "$ROOT/public/images/${images[$i]}" -t "$d" \
    -vf "scale=900:1600:force_original_aspect_ratio=increase,crop=720:1280,zoompan=z='min(zoom+0.00075,1.11)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=720x1280:fps=24,drawbox=x=0:y=0:w=iw:h=ih:color=black@0.20:t=fill,drawbox=x=0:y=940:w=iw:h=340:color=black@0.48:t=fill,drawtext=fontfile=${FONT}:textfile=${textfile}:fontcolor=white:fontsize=41:line_spacing=14:x=(w-text_w)/2:y=1030:shadowcolor=black@0.9:shadowx=2:shadowy=3,drawtext=fontfile=${FONT}:text='FAN TRAILER  •  TƠ MỘNG HẮC NẠP':fontcolor=white@0.78:fontsize=17:x=(w-text_w)/2:y=1230:shadowcolor=black@0.8:shadowx=2:shadowy=2,fade=t=in:st=0:d=0.5,fade=t=out:st=$(python3 - <<PY
print(max(0, $d-0.5))
PY
):d=0.5,format=yuv420p" \
    -an -c:v libx264 -preset fast -crf 20 -movflags +faststart "$TMP/scene_${idx}.mp4"
  printf "file '%s'\n" "$TMP/scene_${idx}.mp4" >> "$TMP/concat.txt"
done
ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i "$TMP/concat.txt" -c copy "$OUT/to-mong-hac-nap-trailer-demo-silent.mp4"
echo "Created: $OUT/to-mong-hac-nap-trailer-demo-silent.mp4"
