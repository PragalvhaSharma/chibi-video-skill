/* Stage library: concatenated first, inside the composition IIFE, by scripts/build.mjs.
   The shot map and beat grid placeholders below are filled from story/story.json. */
        "use strict";
        var INK = Chibi.INK, J = Chibi.JOINT, P = Chibi.prng;
        var A = function (k, o) { return Chibi.actor(k, o); };
        var BP = __BP__, B0 = __B0__;
        function B(n) { return +(B0 + n * BP).toFixed(3); }
        var SH = __SHOTS__;
        function T(id) { return SH[id][0]; }
        function D(id) { return SH[id][1] - SH[id][0]; }
        var CREW = Chibi.ORDER.slice(); /* cast order from assets/cast.js */

        function el(id) { return document.getElementById(id); }
        function box(x, y, w, h, style, inner, id, cls) {
          return '<div class="abs' + (cls ? " " + cls : "") + '"' + (id ? ' id="' + id + '"' : "") + ' style="left:' + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;" + (style || "") + '">' + (inner || "") + "</div>";
        }
        function svg(x, y, w, h, inner, id, extra) {
          return '<svg class="abs"' + (id ? ' id="' + id + '"' : "") + ' style="left:' + x + "px;top:" + y + 'px;overflow:visible" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '"' + (extra || "") + ">" + inner + "</svg>";
        }
        function wrap(id, inner, style) { return '<div class="abs" id="' + id + '" style="left:0;top:0;' + (style || "") + '">' + inner + "</div>"; }
        function circles(list) { return list.map(function (c) { return '<circle cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="' + c[2].toFixed(1) + '"/>'; }).join(""); }
        function merged(list, fill, sw) { var o = circles(list); return '<g fill="' + INK + '" stroke="' + INK + '" stroke-width="' + (sw || 10) + '">' + o + '</g><g fill="' + fill + '">' + o + "</g>"; }
        function scene(id, bg, ww, wh, worldHTML, overHTML) {
          el(id).innerHTML = '<div class="fill" id="' + id + '-in"><div class="fill" id="' + id + '-cam"><div class="fill" style="' + bg + '"></div>' +
            '<div class="world" data-layout-allow-overflow id="' + id + '-world" style="width:' + ww + "px;height:" + wh + 'px">' + worldHTML + "</div>" + (overHTML || "") + "</div></div>";
        }

        var ROOM = "background:radial-gradient(ellipse at 42% 32%, #4a3e61 0%, #2e2742 55%, #1a1629 100%)";
        var NIGHT = "background:radial-gradient(ellipse at 50% 18%, #214269 0%, #13294a 50%, #0a1829 100%)";
        var BEIGE = "background:radial-gradient(ellipse at 50% 42%, #EFDFA6 0%, #E4CD86 58%, #D5BB6D 100%)";
        var PINK = "background:radial-gradient(ellipse at 50% 42%, #F5E8EB 0%, #EBD9DF 60%, #DCC4CC 100%)";
        var SKY = "background:linear-gradient(180deg, #C6E0EC 0%, #D9EAEC 55%, #EFF0DE 100%)";
        var NEON = "background:radial-gradient(ellipse at 50% 38%, #5a2461 0%, #331040 58%, #1b0a24 100%)";
        var FOCUS_BG = "background:radial-gradient(ellipse at 50% 45%, #FFE9A0 0%, #F4C94E 45%, #E09A2A 100%)";

        function starField(seed, w, h, n) {
          var r = P(seed), s = "";
          for (var i = 0; i < n; i++) {
            var x = r() * w, y = r() * h, big = r() < 0.12, tw = r() < 0.5, col = r() < 0.3 ? "#FFE9A8" : "#EAF2FF";
            if (big) s += '<path class="' + (tw ? "tw" : "") + '" d="M' + x.toFixed(0) + "," + (y - 8).toFixed(0) + " L" + (x + 2).toFixed(0) + "," + (y - 2).toFixed(0) + " L" + (x + 8).toFixed(0) + "," + y.toFixed(0) + " L" + (x + 2).toFixed(0) + "," + (y + 2).toFixed(0) + " L" + x.toFixed(0) + "," + (y + 8).toFixed(0) + " L" + (x - 2).toFixed(0) + "," + (y + 2).toFixed(0) + " L" + (x - 8).toFixed(0) + "," + y.toFixed(0) + " L" + (x - 2).toFixed(0) + "," + (y - 2).toFixed(0) + 'Z" fill="' + col + '"/>';
            else s += '<circle class="' + (tw ? "tw" : "") + '" cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (0.9 + r() * 1.9).toFixed(1) + '" fill="' + col + '"/>';
          }
          return svg(0, 0, w, h, s);
        }
        function moon(x, y, d) { return box(x, y, d, d, "border-radius:50%;background:radial-gradient(circle at 40% 38%, #FFF8DC 0%, #FBE9B4 70%, #EFD48C 100%);border:5px solid " + INK + ";box-shadow:0 0 70px 26px rgba(255,236,180,.28)"); }
        function spark(id, x, y, size, col) {
          var h = size / 2;
          return svg(x - h, y - h, size, size, '<path d="M' + h + ",0 L" + h * 1.22 + "," + h * 0.78 + " L" + size + "," + h + " L" + h * 1.22 + "," + h * 1.22 + " L" + h + "," + size + " L" + h * 0.78 + "," + h * 1.22 + " L0," + h + " L" + h * 0.78 + "," + h * 0.78 + ' Z" fill="' + (col || "#FFF6C8") + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>', id);
        }
        function poof(id, x, y, R) {
          var L = [[0, 0, 0.55], [0.46, -0.2, 0.42], [-0.46, -0.16, 0.4], [0.22, 0.36, 0.38], [-0.3, 0.33, 0.36], [0, -0.46, 0.36]].map(function (c) { return [R + c[0] * R, R + c[1] * R, c[2] * R]; });
          return svg(x - R, y - R, 2 * R, 2 * R, merged(L, "#FBF8F0", 8), id, ' opacity="0"');
        }
        function drop(id, x, y, s) { return svg(x, y, 26 * s, 36 * s, '<path transform="scale(' + s + ')" d="M13,2 C20,14 24,22 20,29 C16,35 8,35 5,29 C2,22 6,14 13,2 Z" fill="#A6DBF5" stroke="' + INK + '" stroke-width="3"/>', id); }
        function focusLines(seed, col) {
          var r = P(seed), s = "";
          for (var i = 0; i < 64; i++) {
            var a = (i / 64) * Math.PI * 2 + r() * 0.05, r1 = 380 + r() * 180, w = 10 + r() * 22;
            var x1 = 960 + Math.cos(a) * r1, y1 = 540 + Math.sin(a) * r1, x2 = 960 + Math.cos(a) * 1400, y2 = 540 + Math.sin(a) * 1400;
            var nx = -Math.sin(a) * w, ny = Math.cos(a) * w;
            s += '<path d="M' + x1.toFixed(0) + "," + y1.toFixed(0) + " L" + (x2 + nx).toFixed(0) + "," + (y2 + ny).toFixed(0) + " L" + (x2 - nx).toFixed(0) + "," + (y2 - ny).toFixed(0) + ' Z" fill="' + (col || "#FFF7DA") + '" opacity=".75"/>';
          }
          return svg(0, 0, 1920, 1080, s);
        }
        function speedLines(id, seed, col, n) {
          var r = P(seed), s = "";
          for (var i = 0; i < (n || 26); i++) { var y = r() * 1080, x = r() * 3600, w = 200 + r() * 600; s += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + (3 + r() * 6).toFixed(1) + '" rx="3" fill="' + (col || "#fff") + '" opacity=".7"/>'; }
          return svg(0, 0, 3600, 1080, s, id);
        }
        /* text pops: dark text + light outline on light scenes, yellow + ink outline on dark ones */
        function tp(id, x, y, text, size, dark) {
          var col = dark ? "#FFE45C" : "#1d1a17", ol = dark ? "#1d1a17" : "#FFF7DA", o = Math.max(3, Math.round(size / 16));
          var sh = [[o, 0], [-o, 0], [0, o], [0, -o], [o, o], [-o, o], [o, -o], [-o, -o]].map(function (q) { return q[0] + "px " + q[1] + "px 0 " + ol; }).join(",") + ", " + (o + 3) + "px " + (o + 4) + "px 0 rgba(0,0,0,.3)";
          return box(x - 700, y - size * 0.7, 1400, size * 1.4, "display:flex;align-items:center;justify-content:center", '<div class="pop" style="font-size:' + size + "px;color:" + col + ";text-shadow:" + sh + ';white-space:nowrap">' + text + "</div>", id);
        }
        function bubble(id, x, y, w, text, size) {
          return box(x, y, w, size * 2.1, "background:#FFFDF4;border:5px solid " + INK + ";border-radius:" + size + "px;display:flex;align-items:center;justify-content:center;box-shadow:6px 7px 0 rgba(0,0,0,.25)", '<div class="pop" style="font-size:' + size + 'px;color:#1d1a17;white-space:nowrap">' + text + "</div>", id);
        }

        /* ---- props in figure space (feet at 0,0) ---- */
        var SUNGLASSES = '<g><path d="M-64,-178 L-8,-178 L-12,-156 Q-36,-146 -58,-156 Z M8,-178 L64,-178 L58,-156 Q36,-146 12,-156 Z" fill="#111114" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/><path d="M-8,-174 Q0,-178 8,-174" stroke="#111114" stroke-width="5" fill="none"/><path d="M-64,-176 L-90,-180 M64,-176 L90,-180" stroke="#111114" stroke-width="5"/><path d="M-52,-172 l12,0 M20,-172 l12,0" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/></g>';
        var CONTROLLER = '<g transform="translate(0,-54)"><rect x="-26" y="-11" width="52" height="22" rx="10" fill="#2b2b33" stroke="' + INK + '" stroke-width="3.5"/><circle cx="-12" cy="0" r="3.5" fill="#9aa"/><circle cx="12" cy="-2" r="3" fill="#E5484D"/><circle cx="18" cy="3" r="3" fill="#4FA3F7"/></g>';
        var PHONE = '<g transform="translate(0,-62)"><rect x="-14" y="-24" width="28" height="44" rx="5" fill="#1b1b20" stroke="' + INK + '" stroke-width="3"/><rect x="-10" y="-19" width="20" height="34" rx="2" fill="#C8ECFF"/></g>';
        var BAG = '<g transform="translate(0,-58)"><path d="M-22,-26 L22,-26 L26,24 L-26,24 Z" fill="#F29A1F" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/><path d="M-22,-26 l6,-5 l6,5 l6,-5 l6,5 l6,-5 l6,5 l6,-5" fill="none" stroke="' + INK + '" stroke-width="3"/><circle cx="0" cy="0" r="9" fill="#FFD95A" stroke="' + INK + '" stroke-width="2.5"/></g>';
        function CAN(x, y) { return '<g transform="translate(' + x + "," + y + ')"><rect x="-8" y="-15" width="16" height="30" rx="3" fill="#dfe3e8" stroke="' + INK + '" stroke-width="2.6"/><rect x="-8" y="-6" width="16" height="11" fill="#E5484D"/></g>'; }
        function WRAP(x, y, rot, s) { return '<g transform="translate(' + x + "," + y + ") rotate(" + (rot || 0) + ") scale(" + (s || 1) + ')"><rect x="-13" y="-28" width="26" height="56" rx="11" fill="#d3d8de" stroke="' + INK + '" stroke-width="3"/><path d="M-13,-8 h26 M-13,8 h26" stroke="#a9b0b8" stroke-width="2.4"/><ellipse cx="0" cy="-25" rx="11" ry="5" fill="#E7C27A" stroke="' + INK + '" stroke-width="2"/></g>'; }
        var CRUMBS = '<g fill="#FFD95A" stroke="' + INK + '" stroke-width="1.5"><circle cx="-30" cy="-110" r="4"/><circle cx="26" cy="-104" r="3.5"/><circle cx="-12" cy="-96" r="3"/><circle cx="36" cy="-120" r="3"/></g>';

        /* ---- Tesla (side view, 900 x 330, facing right) ---- */
        var CAR_BODY = "M40,262 C40,226 58,206 102,196 L236,172 C300,116 384,94 474,92 C566,90 646,106 706,146 L792,174 C846,184 874,206 874,240 L874,266 C874,280 862,288 846,288 L66,288 C50,288 40,278 40,262 Z";
        var CAR_WIN = "M262,172 C316,124 388,108 474,107 C548,106 616,118 668,150 L694,172 Z";
        function wheel(id, cx) {
          var sp = "";
          for (var i = 0; i < 5; i++) { var a = (i / 5) * Math.PI * 2; sp += '<path d="M' + cx + ",282 L" + (cx + Math.cos(a) * 32).toFixed(1) + "," + (282 + Math.sin(a) * 32).toFixed(1) + '" stroke="#6d747e" stroke-width="7" stroke-linecap="round"/>'; }
          return '<circle cx="' + cx + '" cy="282" r="60" fill="#1b1b1f" stroke="' + INK + '" stroke-width="6"/><circle cx="' + cx + '" cy="282" r="38" fill="#b3bac3" stroke="' + INK + '" stroke-width="3"/><g id="' + id + '">' + sp + '</g><circle cx="' + cx + '" cy="282" r="9" fill="#50565f" stroke="' + INK + '" stroke-width="2.5"/>';
        }
        function tesla(id, x, y, inner, opt) {
          opt = opt || {};
          var col = opt.color || "#F3F4F6";
          var back = '<svg class="abs" style="left:0;top:0;overflow:visible" width="900" height="330" viewBox="0 0 900 330"><ellipse cx="457" cy="302" rx="432" ry="16" fill="rgba(0,0,0,.28)"/><path d="' + CAR_WIN + '" fill="#161b24"/></svg>';
          var body = '<svg class="abs" style="left:0;top:0;overflow:visible" width="900" height="330" viewBox="0 0 900 330">' +
            '<path d="' + CAR_BODY + " " + CAR_WIN + '" fill-rule="evenodd" fill="' + col + '" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
            '<path d="' + CAR_WIN + '" fill="rgba(40,52,70,.22)" stroke="' + INK + '" stroke-width="5"/>' +
            '<rect x="467" y="103" width="14" height="71" fill="' + col + '" stroke="' + INK + '" stroke-width="3"/>' +
            '<path d="M58,262 L862,262 L862,278 Q862,288 846,288 L66,288 Q54,288 54,276 Z" fill="#2a2d33"/>' +
            '<path d="M474,176 V262 M664,176 V252" stroke="#b9bdc4" stroke-width="3"/>' +
            '<rect x="392" y="188" width="36" height="7" rx="3.5" fill="#cfd3d9" stroke="' + INK + '" stroke-width="1.6"/><rect x="582" y="188" width="36" height="7" rx="3.5" fill="#cfd3d9" stroke="' + INK + '" stroke-width="1.6"/>' +
            '<path d="M836,202 q26,2 34,20 l-32,-5 z" fill="#EAF6FF" stroke="' + INK + '" stroke-width="3"/><rect x="42" y="212" width="26" height="12" rx="4" fill="#E0303A" stroke="' + INK + '" stroke-width="2.5"/>' +
            wheel(id + "-w1", 212) + wheel(id + "-w2", 716) + "</svg>";
          return '<div class="abs" id="' + id + '" style="left:' + x + "px;top:" + y + 'px;width:900px;height:330px">' + back + (inner || "") + body + (opt.over || "") + "</div>";
        }
        function carHeads(pre, keys, expr, s) {
          var h = "", n = keys.length;
          keys.forEach(function (k, i) { h += A(k, { id: pre + k, x: 300 + i * (400 / Math.max(1, n - 1)), y: 300, s: s || 0.6, legs: "none", expr: [expr || "grin"] }); });
          return h;
        }

        /* ---- Toronto skyline with the CN Tower ---- */
        function skyline(seed, W, baseY, col, tower) {
          var r = P(seed), s = "", x = -20;
          while (x < W) {
            var bw = 60 + r() * 110, hh = 70 + r() * 240;
            s += '<rect x="' + x.toFixed(0) + '" y="' + (baseY - hh).toFixed(0) + '" width="' + bw.toFixed(0) + '" height="' + (hh + 500).toFixed(0) + '" fill="' + col + '"/>';
            for (var wy = baseY - hh + 16; wy < baseY - 10; wy += 26) for (var wx = x + 10; wx < x + bw - 12; wx += 20) if (r() < 0.22) s += '<rect class="' + (r() < 0.3 ? "tw" : "") + '" x="' + wx.toFixed(0) + '" y="' + wy.toFixed(0) + '" width="7" height="9" fill="#F4D77E"/>';
            x += bw + 4;
          }
          if (tower) {
            var cx = tower;
            s += '<path d="M' + (cx - 14) + "," + baseY + " L" + (cx - 5) + "," + (baseY - 560) + " L" + (cx + 5) + "," + (baseY - 560) + " L" + (cx + 14) + "," + baseY + ' Z" fill="' + col + '"/>';
            s += '<ellipse cx="' + cx + '" cy="' + (baseY - 360) + '" rx="38" ry="20" fill="' + col + '"/><ellipse cx="' + cx + '" cy="' + (baseY - 366) + '" rx="30" ry="5" fill="#F4D77E" opacity=".8"/><ellipse cx="' + cx + '" cy="' + (baseY - 462) + '" rx="14" ry="8" fill="' + col + '"/>';
            s += '<path d="M' + cx + "," + (baseY - 560) + " V" + (baseY - 700) + '" stroke="' + col + '" stroke-width="5"/><circle class="tw" cx="' + cx + '" cy="' + (baseY - 702) + '" r="5" fill="#FF4B4B"/>';
          }
          return s;
        }

        /* ---- windshield view: dashboard, wheel, frame ---- */
        function windshield(pre, back, front, extra) {
          var w = box(0, 0, 1920, 1080, "background:radial-gradient(ellipse at 50% 40%, #33394a 0%, #1d212c 70%)");
          w += back;
          w += svg(0, 0, 1920, 1080, '<path d="M470,600 Q470,560 510,556 L890,556 Q930,560 930,600 L930,1100 L470,1100 Z M1000,600 Q1000,560 1040,556 L1420,556 Q1460,560 1460,600 L1460,1100 L1000,1100 Z" fill="#2d2f36" stroke="' + INK + '" stroke-width="6"/>');
          w += front;
          w += svg(0, 0, 1920, 1080, '<ellipse cx="1210" cy="930" rx="170" ry="150" fill="none" stroke="' + INK + '" stroke-width="40"/><ellipse cx="1210" cy="930" rx="170" ry="150" fill="none" stroke="#24262c" stroke-width="28"/><path d="M1060,930 L1360,930" stroke="#24262c" stroke-width="22"/>' +
            '<rect x="-10" y="975" width="1940" height="120" fill="#2b2e35" stroke="' + INK + '" stroke-width="6"/><rect x="850" y="880" width="220" height="140" rx="12" fill="#CFE9FF" stroke="' + INK + '" stroke-width="6"/><path d="M870,960 l40,-30 40,20 40,-40 40,24" stroke="#7aa6c9" stroke-width="5" fill="none"/>', pre + "-dash");
          w += extra || "";
          w += svg(0, 0, 1920, 1080, '<path fill-rule="evenodd" d="M-20,-20 H1940 V1100 H-20 Z M330,120 L1590,120 Q1640,120 1660,170 L1840,990 L80,990 L260,170 Q280,120 330,120 Z" fill="#F3F4F6" stroke="' + INK + '" stroke-width="8"/><rect x="890" y="124" width="140" height="44" rx="10" fill="#2b2e35" stroke="' + INK + '" stroke-width="5"/><path d="M80,990 L1840,990" stroke="' + INK + '" stroke-width="8"/>');
          return w;
        }

        /* ---------------- timeline helpers ---------------- */
        var tl = gsap.timeline({ paused: true });
        function reps(dur, cycle) { return Math.max(0, Math.floor(dur / cycle) - 1); }
        function twinkle(sel, t0, dur, seed) {
          var r = P(seed);
          document.querySelectorAll(sel).forEach(function (n) {
            var p = 0.6 + r() * 1.2, off = r() * p;
            tl.fromTo(n, { opacity: 1 }, { opacity: 0.2, duration: p, ease: "sine.inOut", repeat: reps(dur - off, p), yoyo: true }, t0 + off);
          });
        }
        function swap(id, kind, name, t) { tl.set("#" + id + " ." + kind, { opacity: 0 }, t); tl.set("#" + id + " ." + kind + "-" + name, { opacity: 1 }, t); }
        function breathe(sel, t, dur, amp, period) { tl.fromTo(sel, { y: 0 }, { y: -amp, duration: period / 2, ease: "sine.inOut", repeat: reps(dur, period / 2), yoyo: true }, t); }
        function beat(sel, t, dur, amp) { tl.fromTo(sel, { y: 0 }, { y: -amp, duration: BP / 2, ease: "power1.out", repeat: reps(dur, BP / 2), yoyo: true }, t); }
        function run(id, t, dur, period, amp, bobAmp) {
          var hp = period / 2, n = reps(dur, hp);
          function sw(sel, org, a, b) { tl.fromTo(sel, { rotation: a, svgOrigin: org }, { rotation: b, svgOrigin: org, duration: hp, ease: "sine.inOut", repeat: n, yoyo: true }, t); }
          sw("#" + id + "-legL", J.hipL, -amp, amp); sw("#" + id + "-legR", J.hipR, amp, -amp);
          sw("#" + id + "-armL", J.shoulderL, amp * 1.3, -amp * 1.3); sw("#" + id + "-armR", J.shoulderR, -amp * 1.3, amp * 1.3);
          tl.fromTo("#" + id + " > svg", { y: 0 }, { y: -bobAmp, duration: hp / 2, ease: "sine.out", repeat: reps(dur, hp / 2), yoyo: true }, t);
        }
        function shake(sel, t, dur, amp, seed) {
          var r = P(seed || 3), step = 0.04;
          for (var u = 0; u < dur - 0.001; u += step) tl.to(sel, { x: (r() * 2 - 1) * amp, y: (r() * 2 - 1) * amp * 0.6, duration: step, ease: "none" }, t + u);
          tl.to(sel, { x: 0, y: 0, duration: step, ease: "none" }, t + dur);
        }
        function puff(sel, t, d) { tl.fromTo(sel, { opacity: 1, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.3, duration: d || 0.45, ease: "power2.out", immediateRender: false }, t); }
        function pop(sel, t, d) { tl.fromTo(sel, { scale: 0, rotation: -45, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, duration: d || 0.25, ease: "back.out(2.5)" }, t); }
        function popIn(sel, t, rot) { tl.fromTo(sel, { scale: 0, rotation: (rot || 0) - 18, transformOrigin: "50% 50%" }, { scale: 1, rotation: rot || 0, duration: 0.22, ease: "back.out(3)" }, t); }
        function push(id, t, dur, a, b, origin) { tl.fromTo("#" + id + "-world", { scale: a }, { scale: b, duration: dur, ease: "none", transformOrigin: origin || "50% 50%" }, t); }
        function headBob(sel, t, dur, amp) { tl.fromTo(sel, { rotation: -amp, svgOrigin: J.neck }, { rotation: amp, svgOrigin: J.neck, duration: BP, ease: "sine.inOut", repeat: reps(dur, BP), yoyo: true }, t); }

        function couch(x, y, w) {
          return svg(x, y, w + 120, 380, '<rect x="60" y="0" width="' + w + '" height="220" rx="40" fill="#4F6FA8" stroke="' + INK + '" stroke-width="7"/>' +
            '<rect x="30" y="160" width="' + (w + 60) + '" height="140" rx="30" fill="#5E80BD" stroke="' + INK + '" stroke-width="7"/>' +
            '<rect x="0" y="100" width="96" height="210" rx="38" fill="#45639A" stroke="' + INK + '" stroke-width="7"/><rect x="' + (w + 24) + '" y="100" width="96" height="210" rx="38" fill="#45639A" stroke="' + INK + '" stroke-width="7"/>' +
            '<rect x="60" y="300" width="22" height="40" fill="' + INK + '"/><rect x="' + (w + 38) + '" y="300" width="22" height="40" fill="' + INK + '"/>');
        }
        var TVGLOW = '<div class="fill" style="background:radial-gradient(ellipse at 50% 115%, rgba(120,180,255,.28) 0%, rgba(0,0,0,0) 62%)"></div>';


        /* ================= shared scene helpers ================= */
        function G(id, x, y, s, inner) {
          return '<div class="abs" data-layout-allow-overflow' + (id ? ' id="' + id + '"' : "") + ' style="left:' + x + "px;top:" + y + 'px;width:1px;height:1px"><div class="abs" data-layout-allow-overflow style="left:0;top:0;width:1px;height:1px;transform:scale(' + s + ');transform-origin:0 0">' + inner + "</div></div>";
        }
        function winHeads(pre, keys, expr, s) {
          var h = "", n = keys.length;
          keys.forEach(function (k, i) {
            var x = n === 1 ? 600 : 630 - i * (340 / (n - 1));
            h += A(k, { id: pre + k, x: x, y: 216, s: s || 0.4, legs: "none", expr: typeof expr === "function" ? expr(k) : expr || ["grin"], overHead: k === "prag" ? SUNGLASSES : "" });
          });
          return h;
        }
        function spin(car, t, dur, turns) {
          tl.fromTo("#" + car + "-w1", { rotation: 0, svgOrigin: "212 282" }, { rotation: 360 * turns, svgOrigin: "212 282", duration: dur, ease: "none" }, t);
          tl.fromTo("#" + car + "-w2", { rotation: 0, svgOrigin: "716 282" }, { rotation: 360 * turns, svgOrigin: "716 282", duration: dur, ease: "none" }, t);
        }
        function road(id, y) {
          var d = "";
          for (var x = 0; x < 3900; x += 220) d += '<rect x="' + x + '" y="130" width="120" height="14" rx="7" fill="#F4D77E"/>';
          return svg(0, y, 3700, 420, '<rect x="-20" y="0" width="3740" height="420" fill="#2c3140"/><rect x="-20" y="0" width="3740" height="12" fill="#8d96a8"/><g id="' + id + '-dash">' + d + "</g>", id + "-road");
        }
        function BILL(id, x, y) { return svg(x, y, 92, 46, '<rect x="3" y="3" width="86" height="40" rx="5" fill="#8FD18B" stroke="' + INK + '" stroke-width="3"/><ellipse cx="46" cy="23" rx="12" ry="14" fill="#5DAA5A"/><path d="M46,12 v22 M40,17 q6,-5 12,0 q-12,6 0,11 q-6,5 -12,0" stroke="#1d4d1b" stroke-width="2.6" fill="none"/>', id); }
        function COIN(id, x, y) { return svg(x, y, 40, 40, '<circle cx="20" cy="20" r="17" fill="#FFD84A" stroke="' + INK + '" stroke-width="3"/><circle cx="20" cy="20" r="9" fill="none" stroke="#E0A91E" stroke-width="3"/>', id); }
        function CHIP(x, y, col) { return '<g transform="translate(' + x + "," + y + ')"><ellipse cx="0" cy="0" rx="34" ry="11" fill="' + col + '" stroke="' + INK + '" stroke-width="3"/><path d="M-20,-3 h8 M12,-3 h8" stroke="#fff" stroke-width="3"/></g>'; }
        var CARPOOL = CREW.slice(); /* car order, driver first; override per story */
        var DRIVE = '<rect x="-10" y="120" width="440" height="780" fill="#2d3e5c" stroke="' + INK + '" stroke-width="8"/><path d="M-20,130 L215,20 L450,130 Z" fill="#1f2b42" stroke="' + INK + '" stroke-width="8" stroke-linejoin="round"/><rect x="150" y="560" width="140" height="340" fill="#F4D77E" stroke="' + INK + '" stroke-width="7"/><rect x="60" y="260" width="120" height="120" fill="#F4D77E" stroke="' + INK + '" stroke-width="7"/><rect x="-10" y="880" width="1940" height="220" fill="#384152" stroke="' + INK + '" stroke-width="6"/><path d="M1780,880 V240 M1780,240 h-110" stroke="' + INK + '" stroke-width="16"/><path d="M1600,250 L1720,250 L1700,290 L1620,290 Z" fill="#FFE9A8" stroke="' + INK + '" stroke-width="5"/><path d="M1620,290 L1500,880 L1840,880 L1700,290 Z" fill="rgba(255,236,170,.14)"/>';
        var GLARE = svg(0, 0, 1920, 1080, '<path d="M420,130 L560,130 L300,990 L160,990 Z M620,130 L660,130 L400,990 L360,990 Z" fill="#ffffff" opacity=".07"/>');
        var BACKROW_X = [400, 620, 850, 1070, 1300, 1520]; /* back-seat head x positions in windshield() shots */


        function tpc(id, x, y, text, size, col, ol) {
          var o = Math.max(3, Math.round(size / 16));
          var sh = [[o, 0], [-o, 0], [0, o], [0, -o], [o, o], [-o, o], [o, -o], [-o, -o]].map(function (q) { return q[0] + "px " + q[1] + "px 0 " + (ol || "#1d1a17"); }).join(",") + ", " + (o + 3) + "px " + (o + 4) + "px 0 rgba(0,0,0,.3)";
          return box(x - 700, y - size * 0.7, 1400, size * 1.4, "display:flex;align-items:center;justify-content:center", '<div class="pop" style="font-size:' + size + "px;color:" + col + ";text-shadow:" + sh + ';white-space:nowrap">' + text + "</div>", id);
        }
        function lookoutBG(seed, city) {
          var w = starField(seed, 1920, 720, 170) + moon(1480, 70, 120);
          if (city !== false) w += svg(0, 0, 1920, 1080, skyline(seed + 1, 1920, 930, "#0e1b30", 1690));
          w += svg(0, 0, 1920, 1080, '<path d="M-20,1100 L-20,860 Q400,800 900,850 Q1400,900 1940,840 L1940,1100 Z" fill="#131f2e" stroke="' + INK + '" stroke-width="6"/>');
          return w;
        }
        /* seats on the parked car (tesla at 500,530): roof first, then hood, then trunk */
        function autoSeats(keys) {
          var slots = [[935, 630], [1020, 632], [850, 634], [1108, 644], [1250, 692], [1330, 714], [700, 712], [600, 727], [780, 700]], out = {};
          keys.forEach(function (k, i) { if (slots[i]) out[k] = slots[i]; });
          return out;
        }
        var SEATS = autoSeats(CREW);
        function carCrew(id, view, expr, poses, s) {
          var h = "";
          Object.keys(SEATS).forEach(function (k) {
            var p = SEATS[k], o = { id: id + "-" + k, x: p[0], y: p[1], s: s || 0.62, legs: "sit", view: view };
            if (expr) o.expr = typeof expr === "function" ? expr(k) : expr;
            if (poses) o.poses = typeof poses === "function" ? poses(k) : poses;
            h += A(k, o);
          });
          return h;
        }
        var FOIL = function (x, y, rot, s) { return '<g transform="translate(' + x + "," + y + ") rotate(" + (rot || 0) + ") scale(" + (s || 1) + ')"><rect x="-15" y="-32" width="30" height="64" rx="13" fill="#cfd5dc" stroke="' + INK + '" stroke-width="3"/><path d="M-15,-6 l30,4 M-15,12 l30,-3" stroke="#9aa3ad" stroke-width="2.2"/><ellipse cx="0" cy="-29" rx="12" ry="5" fill="#E7C27A" stroke="' + INK + '" stroke-width="2"/></g>'; };
