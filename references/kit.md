# Character kit (`assets/chibi.js`)

All drawing happens in figure space with the feet at (0,0) and y going up as negative numbers. At `s: 1` a figure is about 300 px tall. Register the cast in `assets/cast.js`; the key order becomes `CREW`:

```js
Chibi.addCast({ prag: { name: "Prag", skin: "#C4895C", hair: "sideFringe", hairCol: "#2f221b", w: 92, chub: 1.08, outfit: "vultures", pants: "#8FB2D6", shoes: "#f3f0ea", brow: 7, expr: "smile", ref: "reference/cast/prag.jpg", note: "Vultures hoodie, side-swept fringe" } });
```

## Character fields

| Field | Values |
|---|---|
| `name` | Label for cards, credits and the cast sheet (use the nickname they go by) |
| `skin`, `hairCol`, `pants`, `shoes` | Hex colours. `hairCol` defaults to near-black |
| `w`, `chub`, `bulk` | Head half-width (82–102), jaw roundness (0.9–1.24), torso and arm width multiplier (1–1.14 for bigger builds) |
| `hair` | curls, mop, curlyShort, tight, textured, fade, fringe, sideFringe, sidePart, curtain, messy, quiff, quiffTall, crop, neat, swept, wavy, durag |
| `outfit` | blacktee, hoodie, henley, greyhenley, polo, brownpolo, bluepolo, navyshirt, overshirt, denim, workjacket, buffalo (check pattern), santos, tokyo (jerseys), vultures (hoodie with a print) |
| `glasses` | "rect" (thick black), "round" (thin gold), "browline", or `true` (grey wire) |
| Facial hair | `goatee: true \| "full"`, `mustache`, `stubble`, `beard` (soft shadow), `fullBeard` (solid, with the mouth kept clear) |
| Extras | `studs`, `watch`, `bracelet: "#hex"`, `shorts`, `socks`, `brow` (brow stroke 6–7.5), `expr` (default expression) |
| Sheet only | `ref` (photo path), `note` (one-line look summary) |

## Matching a real person

Hair shape identifies people fastest, then facial hair, glasses and one signature item (durag, chain, jacket). Pick skin from the mid-tone of the cheek in a well-lit photo. Bitmoji screenshots are the best source for hair and facial hair, and group photos for build and usual clothes. Give each person a distinct outfit colour so group shots read even when everyone wears black in real life; vary those with prints, collars or a lighter shade. When the user corrects a look ("he doesn't wear glasses"), fix the kit entry and re-check every shot where that person appears.

## Actor API

`Chibi.actor(key, opts)` returns a positioned div. `opts`:

- `id`, `x`, `y` (feet position in world px), `s` (scale).
- `expr: [...]` and `poses: [...]` list every expression and pose the shot will swap to. The first of each is shown. Swapping to a name that isn't listed blanks the face or the arms.
- `legs`: stand, sit, climb, kneel, none.
- `view: "back"`, `burnt: true` (soot gag), `flip: true` (mirror).
- Prop slots, as SVG strings in figure space: `midBody` (held in front of the torso), `inFront`, `behindBody`, `overHead` (e.g. `SUNGLASSES`), and `poseProps: { cheer: WRAP(...) }`, which only shows with that pose. `armsOver` draws the arms over the head.

**Expressions:** neutral, smug, angry, grin, happy, hearts, cry, shock, determined, tired, soft, eyesmile, sparkle, lookup, sleep, chew, focus, cool, dizzy, burnt.

**Poses:** down, up, hold, hip, cross, fight, drink, chips, climb, cheer, throwR, throwL, punch, rope, rail, thumb, point, wave, pointUp.

**Animatable parts:**

- The ids `#<id>-head`, `#<id>-torso`, `#<id>-armL`, `#<id>-armR`, `#<id>-legL`, `#<id>-legR`.
- The classes `.specs`, `.tails` (durag), `.tears`, `.vein` and `.fan` (a prop class set in the scene).
- Rotate joints with `svgOrigin: J.neck` (or `J.shoulderL`/`R`, `J.hipL`/`R`, `J.waist`). The actor div pivots at the feet.

`Chibi.headSVG(key, { expr })` draws a head only, for cards, polaroids, reaction heads and selfies.

## Adding a hair style or outfit

**Hair:** add an `if (style === "name")` branch to `hairFront`, drawn with `merged([pth(d)], c)` plus `strands([...])`.

- The head spans x ±w. The top is at y −262 and the brows are at about −190.
- Keep the hairline above y −200 unless it's bangs.
- Add a `hairBack` branch when the style will be seen from behind; otherwise a generic back is drawn.
- Anything that hangs behind the head in the front view goes in `hairBehind` (see the durag).

**Outfit:** add `name: { fill, sleeve }` to `OUTFIT`, where `sleeve` is 0.55 for a tee and 1.0 for long sleeves. Then add details inside the torso box (y −88 to −24, x ±49) in `torsoFront`, and in `torsoBack` if needed. Text on clothing needs `data-layout-allow-occlusion`.
