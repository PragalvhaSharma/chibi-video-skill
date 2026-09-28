#!/usr/bin/env bash
# Render the video, make a ~20 MB copy for texting, and copy both to a folder.
# Usage: deliver.sh <project-dir> "<Video Name>" [dest-dir, default ~/Desktop]
set -euo pipefail
P="$(cd "$1" && pwd)"; NAME="$2"; DEST="${3:-$HOME/Desktop}"
SLUG="$(printf '%s' "$NAME" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-')"
mkdir -p "$P/renders" "$DEST"
( cd "$P" && npx -y hyperframes@0.8.81 render -o "renders/$SLUG.mp4" --quality delivery --skill general-video )
ffmpeg -hide_banner -loglevel error -y -i "$P/renders/$SLUG.mp4" -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart "$P/renders/$SLUG-share.mp4"
ffmpeg -hide_banner -loglevel error -y -i "$P/renders/$SLUG.mp4" -vf "fps=1/3.5,scale=384:-1,tile=5x5" -frames:v 1 "$P/renders/$SLUG-contact.jpg"
cp "$P/renders/$SLUG.mp4" "$DEST/$NAME.mp4"
cp "$P/renders/$SLUG-share.mp4" "$DEST/$NAME (for texting).mp4"
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height -of compact "$DEST/$NAME.mp4"
ffmpeg -hide_banner -i "$DEST/$NAME.mp4" -af volumedetect -vn -f null - 2>&1 | grep -E "mean_volume|max_volume" || true
ls -la "$DEST/$NAME.mp4" "$DEST/$NAME (for texting).mp4"
echo "contact sheet: $P/renders/$SLUG-contact.jpg"
