---
name: chibi-video
description: Turn a friend group (photos, Bitmoji or Snapchat screenshots) and a song into a fast, beat-synced chibi cartoon story video in an anime-ending style, built from code-drawn SVG characters and rendered with HyperFrames. Use for "make a cartoon/anime/chibi video of my friends", night-out, trip, birthday or game-day recaps starring real people as cartoons. Not for editing live footage.
---

# Chibi Video

A 60–90 s cartoon where the user's real friends are flat, thick-outlined, big-head chibis living through a story, cut on the beat of a song. Characters are drawn in code by a bundled kit, so no image generation is needed. Scripts live in `scripts/` of this skill; a new video is a HyperFrames project scaffolded from `assets/template/`.

## Ground rules

- Every character is original: a real person the user names, drawn from their photos, or a new design. If asked to copy an existing franchise's characters, make original characters in the same general chibi style and say so.
- The user supplies the music. Put song titles or credits on screen if wanted, never lyrics. Keep downloaded songs and footage out of public repos.
- Show looks before building scenes. Render the cast sheet, get corrections (names, glasses, outfits), and re-render. Use the names the user calls people.
- Keep it fast: cut every 3–8 beats (about 1–2.5 s) and move something on every beat. A slow video was the main complaint that shaped this skill.
- Send, upload or post the result only when the user asks, and only to the destination they name.

## Workflow

1. **Intake.** Get the song file, the cast (names plus photos or Bitmoji screenshots), the occasion and places, and inside jokes or roles (who drives, who wins, who loses). Ask only for what's missing, at most three questions.
2. **Scaffold.** `scripts/new_project.sh <dir> <song> "<title>"` copies the template, converts the song to `assets/song.wav`, and builds a starter `index.html`.
3. **Cast.** Write `assets/cast.js` using [references/kit.md](references/kit.md). Put photos in `reference/cast/` and set each person's `ref`. Run `scripts/cast_sheet.sh <dir>`, show `cast-sheet.png`, and iterate on feedback. Add hair styles or outfits to `assets/chibi.js` when nothing in the kit fits.
4. **Song map.** `scripts/analyze_song.py <dir> --write` fits the beat grid (`B(n) = first + n·period`) and prints a loudness map. Use its dips and lifts to place acts.
5. **Storyline.** Follow [references/story.md](references/story.md). Write `story/STORYLINE.md` as acts and a beat table, and share it before building unless the user said to just make it.
6. **Build.** Put the shot list in `story/story.json` and the scenes in `story/scenes/*.js`. Read [references/scenes.md](references/scenes.md) for the stage library and the pattern index, and reuse the worked example in `references/examples/shooting-star-jst/`. Assemble with `node scripts/build.mjs <dir>`.
7. **QA.** Follow [references/qa.md](references/qa.md): lint, snapshot the shot midpoints and event beats, look at the contact sheets, and fix problems. Then run `check` until it reports 0 errors.
8. **Deliver.** `scripts/deliver.sh <dir> "<Video Name>"` renders the video, makes a copy of about 20 MB for texting, and puts both on the Desktop. Show the video inline in the reply.
