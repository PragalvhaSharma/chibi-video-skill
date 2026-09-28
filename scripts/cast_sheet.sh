#!/usr/bin/env bash
# Render the cast approval sheet (reference photo above each chibi) to <project>/cast-sheet.png.
# Usage: cast_sheet.sh <project-dir>
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
P="$(cd "$1" && pwd)"; S="$P/.cast-sheet"
mkdir -p "$S/assets"
cp "$SKILL_DIR/assets/template/lib/cast-sheet.html" "$S/index.html"
cp "$P/hyperframes.json" "$P/meta.json" "$P/package.json" "$S/"
cp "$P/assets/chibi.js" "$P/assets/cast.js" "$P/assets/paper.png" "$S/assets/"
rsync -a "$P/assets/fonts/" "$S/assets/fonts/"
if [ -d "$P/reference" ]; then rsync -a --delete "$P/reference/" "$S/reference/"; fi
npx -y hyperframes@0.8.81 snapshot "$S" --at 0.5 --no-end --describe false -o "$S/out" > /dev/null
cp "$S/out/frame-00-at-0.5s.png" "$P/cast-sheet.png"
echo "$P/cast-sheet.png"
