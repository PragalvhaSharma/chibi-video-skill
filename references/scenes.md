# Scenes

Each file in `story/scenes/` is plain JS that `build.mjs` concatenates after `lib/stage.js` inside one function, so every helper below is in scope. Files load in name order (`00-crew.js`, `10-act1.js`, …). Every shot id in `story.json` needs a scene with the same `var id`.

## Scene skeleton

```js
        // x01 — one line on what happens
        (function () {
          var id = "x01";
          var w = "";                                    // world markup, 1920x1080 coordinates
          w += A("prag", { id: id + "-pr", x: 960, y: 1000, s: 1.6, expr: ["grin", "shock"], poses: ["down", "cheer"] });
          w += tp(id + "-t", 960, 180, "LET'S GO", 140, true);
          scene(id, ROOM, 1920, 1080, w);                // (id, background css, world w, h, world, overlay)
          var t = T(id), d = D(id);                      // shot start and duration in seconds
          push(id, t, d, 1.0, 1.06);                     // slow camera push
          swap(id + "-pr", "expr", "shock", B(12.5));    // B(n) = absolute beat n
          popIn("#" + id + "-t", B(13), -4);
        })();
```

## Stage library (`lib/stage.js`)

- **Timing:** `B(n)`, `T(id)`, `D(id)`, `BP` (beat period), `reps(dur, cycle)`, `tl` (the GSAP timeline), `CREW` (cast order), `CARPOOL` (car order, driver first), `J` (joints), `P(seed)` (seeded random).
- **Markup:** `A(key, opts)`, `box(x,y,w,h,style,inner,id)`, `svg(x,y,w,h,inner,id,extraAttrs)`, `G(id,x,y,s,inner)` (scaled group; animate its id), `scene(...)`, `el(id)`.
- **Backgrounds:** `ROOM`, `NIGHT`, `BEIGE`, `PINK`, `SKY`, `NEON`, `FOCUS_BG`, `TVGLOW` (overlay), `lookoutBG(seed, city)`, `DRIVE` (house and driveway SVG), `couch(x,y,w)`.
- **Effects:**
  - `starField(seed,w,h,n)`: stars have class `.tw`; animate them with `twinkle`.
  - `moon`, `spark(id,x,y,size,col)`, `poof(id,x,y,R)` (use with `puff`), `drop`.
  - `focusLines(seed,col)`, `speedLines(id,seed,col,n)`.
- **Text:**
  - `tp(id,x,y,text,size,dark)`: yellow with an ink outline when `dark` is true, ink with a cream outline otherwise.
  - `tpc(id,x,y,text,size,colour,outline)`, `bubble(id,x,y,w,text,size)`.
  - A `<div class="credit">` for the anime-ending credit block.
- **Props:**
  - Figure-space strings: `SUNGLASSES`, `PHONE`, `CONTROLLER`, `BAG`, `CAN(x,y)`, `WRAP(x,y,rot,s)`, `FOIL(...)`, `CRUMBS`.
  - World elements: `BILL(id,x,y)`, `COIN(id,x,y)`, `CHIP(x,y,col)`.
- **Vehicles and places:**
  - `tesla(id,x,y,inner,{color,over})`: a 900×330 side view; the wheel groups are `#id-w1` and `#id-w2`.
  - `winHeads(prefix,keys,expr,s)`: heads in the car windows.
  - `spin(car,t,dur,turns)`, `road(id,y)` (scroll `#id-dash`), `skyline(seed,W,baseY,col,towerX)`.
  - `windshield(prefix,backRow,frontRow,extra)`, with `BACKROW_X` and `GLARE`.
  - `carCrew(id,view,expr,poses,s)`, which places people on a car parked at (500,530) using `SEATS` (`autoSeats(keys)` by default).
- **Animation:**
  - `swap(actorId,"expr"|"pose",name,t)`.
  - `beat(sel,t,dur,amp)`, `breathe`, `headBob`, `run(actorId,t,dur,period,amp,bob)`.
  - `shake(sel,t,dur,amp,seed)`, `pop`, `popIn(sel,t,rot)`, `puff`, `push(id,t,dur,from,to,origin)`, `twinkle(sel,t,dur,seed)`.
  - `#fader` is the full-frame colour layer for flashes and fades (set its `backgroundColor` first).

Set per-story car order and seats in a `00-crew.js` (see the example).

## Pattern index (the worked example)

Search `references/examples/shooting-star-jst/scenes/` for the id:

**At home (a01–a12)**

| Id | Pattern |
|---|---|
| a01 | Phone buzzing with texts |
| a02 | Wide living room |
| a03 | Game goal and rage |
| a04 | Food flying |
| a05 | Prank with glasses flying |
| a06 | Music playing with the song credit |
| a07 | One portrait card per beat |
| a08 | Clock spin |
| a09 | Key reveal on focus lines |
| a10 | Heads snap every half beat |
| a11 | Everyone sprints out |
| a12 | Car in the driveway, headlights beep |

**The night out (b01–b23)**

| Id | Pattern |
|---|---|
| b01 | Pile into the car: runners, heads pop into the windows, car squash |
| b02 | Windshield: the driver puts on shades |
| b03 | Launch ("ZOOM") |
| b04 | G-force faces |
| b05 | Character intro card |
| b06 | Highway parallax with a sign, landing on the song's first big hit |
| b07 | Neon sign lights up letter by letter |
| b08 | Squad walk |
| b09 | Slot-machine jackpot, then the character goes crazy (pose cycle, money rain) |
| b10 | All-in bet at the table |
| b11 | Roulette spin and landing |
| b12 | Burnt, with the crowd laughing |
| b13 | One cries while another flexes |
| b14 | Stomachs growl, then the destination title |
| b15 | Restaurant counter with a sauce splat |
| b16 | Eating counter climbs until K.O., stars orbiting |
| b17 | Idea bubble in the car, heads turn |
| b18 | Card DECLINED, a friend pays |
| b19 | One-bite gag with reaction heads in the corners |
| b20 | Drive home asleep |
| b21 | The night as polaroids, one per beat |
| b22 | Arrive at the lookout |
| b23 | Climb onto the car, fade to white |

**The ending (c01–c11)**

| Id | Pattern |
|---|---|
| c01 | Selfie freezes into a polaroid |
| c02 | One face per beat, with names |
| c03 | On the car from behind, with credits |
| c04 | On the car from the front, with credits |
| c05 | Top-down, lying in a ring looking up |
| c06 | Hand stack, then the group name |
| c07 | Wind blows the money away |
| c08 | Swaying together from behind |
| c09 | Close-up looking up |
| c10 | Shooting star and a cheer |
| c11 | Title and fade to black |

## Timing gotchas

- `fromTo` shows its from-state right away. Use that to keep things hidden until they pop. Pass `immediateRender: false` for anything that must stay visible before its tween (`puff` already does).
- Two tweens on the same property of one element fight each other. Don't shake and slide one element's `x` at the same time; wrap it in `G()` and animate the wrapper instead.
- Keep every event beat inside its shot. When a shot is retimed, move the `B()` numbers in that scene too.
- For big casts, use about `s: 0.4` for heads in car windows and space rows at roughly `1560 / (n - 1)` px.
