#!/usr/bin/env python3
"""Beat grid and energy map for a chibi-video project.

Usage: analyze_song.py <project-dir> [--write]

Runs HyperFrames beat detection on story.json's audio, fits a constant-tempo
grid (B(n) = first + n * period), and prints a one-second loudness map with
dips and lifts marked. --write stores the grid and the song duration in
story/story.json.
"""
import json, os, re, statistics, subprocess, sys

proj = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else ".")
write = "--write" in sys.argv
story_path = os.path.join(proj, "story", "story.json")
story = json.load(open(story_path))
audio = os.path.join(proj, story["audio"])

subprocess.run(["node", os.path.join(os.path.dirname(os.path.abspath(__file__)), "build.mjs"), proj], check=True, capture_output=True)
subprocess.run(["npx", "-y", "hyperframes@0.8.81", "beats", proj], check=True, capture_output=True)
times = [b["time"] for b in json.load(open(os.path.join(proj, "beats", story["audio"] + ".json")))["beats"]]

period = statistics.median([b - a for a, b in zip(times, times[1:])])
idx = [round((t - times[0]) / period) for t in times]
mi, mt = statistics.mean(idx), statistics.mean(times)
period = sum((i - mi) * (t - mt) for i, t in zip(idx, times)) / sum((i - mi) ** 2 for i in idx)
first = mt - period * mi  # fitted time of the grid beat that lines up with the first detected beat
while first < 0:
    first += period

def probe(entry, stream=False):
    args = ["ffprobe", "-v", "error"] + (["-select_streams", "a:0"] if stream else []) + ["-show_entries", entry, "-of", "csv=p=0", audio]
    return subprocess.run(args, capture_output=True, text=True).stdout.strip()

dur, sr = float(probe("format=duration")), int(probe("stream=sample_rate", True))
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", audio, "-af", f"asetnsamples=n={sr},astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level", "-f", "null", "-"], capture_output=True, text=True).stderr
rms = [-60.0 if "inf" in v else max(-60.0, float(v)) for v in re.findall(r"RMS_level=(-?inf|-?[\d.]+)", log)]

print(f"tempo {60 / period:.1f} BPM | period {period:.5f} s | first beat {first:.3f} s | {dur:.2f} s | {int((dur - first) / period)} beats")
print("B(n) = first + n * period\n\n sec   beat    dB  loudness")
med = statistics.median(rms)
for s, v in enumerate(rms):
    mark = "  <- dip" if v < med - 5 else ("  <- lift" if s and v - rms[s - 1] > 5 else "")
    print(f"{s:4d}  B{(s - first) / period:5.0f}  {v:5.1f}  " + "#" * max(0, int((v + 45) * 1.2)) + mark)

if write:
    story["beat"] = {"period": round(period, 5), "first": round(first, 3)}
    story["duration"] = int(dur * 100) / 100
    with open(story_path, "w") as f:
        json.dump(story, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"\nwrote beat grid and duration to {story_path}")
