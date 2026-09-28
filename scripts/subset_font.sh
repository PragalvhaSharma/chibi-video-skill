#!/usr/bin/env bash
# Rebuild the title font subset with ASCII plus extra characters (e.g. Japanese title glyphs),
# small enough for HyperFrames to inline (under 2 MB).
# Usage: subset_font.sh <project-dir> "流れ星～『』"
set -euo pipefail
P="$(cd "$1" && pwd)"; EXTRA="${2:-}"
CACHE="${XDG_CACHE_HOME:-$HOME/.cache}/chibi-video"; mkdir -p "$CACHE"
SRC="$CACHE/MochiyPopOne-Regular.ttf"
[ -f "$SRC" ] || curl -fsSL -o "$SRC" "https://raw.githubusercontent.com/google/fonts/main/ofl/mochiypopone/MochiyPopOne-Regular.ttf"
uvx --from fonttools pyftsubset "$SRC" --unicodes="U+0020-007E,U+2026,U+300E,U+300F,U+FF5E" --text="$EXTRA" --output-file="$P/assets/fonts/MochiyPopOne-subset.ttf"
ls -la "$P/assets/fonts/MochiyPopOne-subset.ttf"
