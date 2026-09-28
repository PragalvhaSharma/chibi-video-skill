#!/usr/bin/env bash
# Scaffold a chibi-video HyperFrames project.
# Usage: new_project.sh <project-dir> [song-file] [title]
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$1"; SONG="${2:-}"; TITLE="${3:-$(basename "$DEST")}"
if [ -e "$DEST/index.html" ]; then echo "refusing: $DEST already has an index.html" >&2; exit 1; fi
mkdir -p "$DEST"
cp -R "$SKILL_DIR/assets/template/." "$DEST/"
DEST="$(cd "$DEST" && pwd)"
NAME="$(basename "$DEST" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-')"
python3 - "$DEST" "$NAME" "$TITLE" <<'PY'
import json, sys, datetime, pathlib
d, name, title = pathlib.Path(sys.argv[1]), sys.argv[2], sys.argv[3]
for f in ("package.json", "meta.json"):
    p = d / f
    p.write_text(p.read_text().replace("__NAME__", name).replace("__CREATED__", datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")))
s = json.loads((d / "story/story.json").read_text())
s["title"] = title
(d / "story/story.json").write_text(json.dumps(s, indent=2, ensure_ascii=False) + "\n")
PY
if [ -n "$SONG" ]; then
  ffmpeg -hide_banner -loglevel error -y -i "$SONG" -vn -ac 2 -ar 48000 "$DEST/assets/song.wav"
  DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$DEST/assets/song.wav")"
  python3 - "$DEST/story/story.json" "$DUR" <<'PY'
import json, sys, math
p, dur = sys.argv[1], float(sys.argv[2])
s = json.load(open(p))
s["duration"] = math.floor(dur * 100) / 100
with open(p, "w") as f:
    json.dump(s, f, indent=2, ensure_ascii=False)
    f.write("\n")
PY
fi
node "$SKILL_DIR/scripts/build.mjs" "$DEST"
echo "project ready: $DEST"
