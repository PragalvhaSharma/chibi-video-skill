# QA, render and delivery

Run everything from the project directory with `npx -y hyperframes@0.8.81 <cmd>`. Commands that run longer than about 30 s should be polled rather than blocked on.

1. **Build:** `node <skill>/scripts/build.mjs .`. It catches syntax errors and shots with no scene.
2. **Lint:** `lint`. Three warnings are expected and fine: composition_file_too_large, timeline_track_too_dense, and nested_structure_needs_subcomposition for fadewrap. Fix any errors.
3. **Snapshots:** `snapshot --at 3.8,6.0,... --no-end --describe false -o /tmp/<new-dir>`. Take the midpoint of each shot plus the moments just after key events, then view `contact-sheet-N.jpg`. Check that faces aren't hidden by tables or counters, text isn't cut off at the frame edges, and props sit in hands.
4. **Check:** `check` must reach 0 errors.
   - `content_overlap` between two text blocks is an error: move one, or drop decorative text.
   - `text_occluded` info notes are fine for grain and overlay layers.
5. **Render:** `<skill>/scripts/deliver.sh . "<Video Name>"` renders at delivery quality (about 2.5 min for 90 s), makes a texting copy of about 20 MB, and copies both to the Desktop. It also prints ffprobe and loudness readings and writes `renders/<slug>-contact.jpg`; look at it before replying.

## Known pitfalls

- Fonts over 2 MB aren't inlined. Use `scripts/subset_font.sh . "<extra characters>"` for new Japanese or special characters.
- Swapping to an expression or pose the actor didn't list blanks it.
- iMessage compresses attachments over about 100 MB. Send the texting copy when the user wants a quick send.
- Keep `renders/`, songs and downloaded reference footage out of git.
