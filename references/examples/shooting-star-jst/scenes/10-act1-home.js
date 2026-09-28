        /* ================= ACT 1 — chilling ================= */
        // a01 — the phone keeps buzzing
        (function () {
          var id = "a01";
          var msgs = ["yo", "wya", "we outside??", "bro answer", "PRAG!!"];
          var scr = '<div class="abs" style="left:136px;top:18px;width:120px;height:26px;border-radius:13px;background:#0b0f18"></div>';
          msgs.forEach(function (m, i) {
            scr += box(22, 80 + i * 120, 70 + m.length * 21, 86, "background:#FFFDF4;border:4px solid " + INK + ";border-radius:30px;display:flex;align-items:center;padding:0 24px", '<div style="font-family:Montserrat, sans-serif;font-weight:900;font-size:34px;color:#1d1a17;white-space:nowrap">' + m + "</div>", id + "-b" + i);
          });
          var w = box(0, 0, 1920, 1080, "background:repeating-linear-gradient(90deg, #6e4c33 0 190px, #624329 190px 198px)");
          w += svg(170, 600, 360, 240, '<ellipse cx="180" cy="150" rx="170" ry="70" fill="#E8E4DA" stroke="' + INK + '" stroke-width="7"/><ellipse cx="180" cy="126" rx="150" ry="50" fill="#FFD95A" stroke="' + INK + '" stroke-width="5"/><path d="M90,120 l30,-24 l20,26 z M170,110 l30,-26 l24,24 z M240,124 l24,-20 l18,24 z" fill="#F2B83A" stroke="' + INK + '" stroke-width="3"/>');
          w += box(750, 60, 420, 920, "background:#15151a;border:10px solid " + INK + ";border-radius:58px;box-shadow:16px 18px 0 rgba(0,0,0,.35)", box(12, 12, 376, 876, "background:linear-gradient(180deg,#1e2c4a,#0f1626);border-radius:44px;overflow:hidden", scr), id + "-phone");
          w += svg(-80, 640, 520, 260, '<path d="M-40,210 L330,110" stroke="' + INK + '" stroke-width="74" stroke-linecap="round"/><path d="M-40,210 L330,110" stroke="#232329" stroke-width="60" stroke-linecap="round"/><circle cx="350" cy="104" r="44" fill="#D8A77F" stroke="' + INK + '" stroke-width="6"/><path d="M372,76 l30,-10 M380,98 l34,-4" stroke="' + INK + '" stroke-width="18" stroke-linecap="round"/><path d="M372,76 l30,-10 M380,98 l34,-4" stroke="#D8A77F" stroke-width="9" stroke-linecap="round"/>', id + "-arm");
          scene(id, "background:#5a3e2b", 1920, 1080, w);
          var t = T(id);
          tl.fromTo("#fader", { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power1.out" }, 0);
          push(id, t, D(id), 1.0, 1.1, "50% 45%");
          msgs.forEach(function (m, i) {
            var bt = B(0.5 + i * 0.9);
            tl.fromTo("#" + id + "-b" + i, { scale: 0, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.18, ease: "back.out(3)" }, bt);
            shake("#" + id + "-phone", bt, 0.2, 7, 20 + i);
          });
          tl.fromTo("#" + id + "-arm", { x: -520 }, { x: 0, duration: 0.3, ease: "power2.out" }, B(4.2));
          tl.to("#" + id + "-arm", { x: -540, y: 30, duration: 0.3, ease: "power2.in" }, B(5.2));
        })();

        // a02 — the living room
        (function () {
          var id = "a02";
          var w = box(80, 110, 360, 440, "border:12px solid #151224;border-radius:8px;background:linear-gradient(180deg,#203a60,#132440);overflow:hidden", starField(31, 336, 300, 30) + svg(0, 0, 336, 416, skyline(32, 336, 416, "#0d1a2e", 250)));
          w += svg(1690, 170, 200, 520, '<ellipse cx="100" cy="330" rx="200" ry="200" fill="rgba(255,210,140,.18)"/><path d="M40,120 L160,120 L130,20 L70,20 Z" fill="#E8C27A" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/><path d="M100,120 V470" stroke="' + INK + '" stroke-width="9"/><ellipse cx="100" cy="480" rx="50" ry="14" fill="' + INK + '"/>');
          w += svg(0, 0, 1920, 1080, '<rect x="-10" y="860" width="1940" height="240" fill="#2a2336" stroke="' + INK + '" stroke-width="6"/><ellipse cx="960" cy="960" rx="620" ry="80" fill="#5a3e62" stroke="' + INK + '" stroke-width="5"/>');
          w += couch(340, 470, 1000);
          w += svg(1440, 560, 300, 330, '<rect x="30" y="0" width="240" height="210" rx="36" fill="#8A4F5C" stroke="' + INK + '" stroke-width="7"/><rect x="10" y="150" width="280" height="130" rx="28" fill="#9C5E6B" stroke="' + INK + '" stroke-width="7"/><rect x="0" y="90" width="64" height="200" rx="28" fill="#7A4450" stroke="' + INK + '" stroke-width="7"/><rect x="236" y="90" width="64" height="200" rx="28" fill="#7A4450" stroke="' + INK + '" stroke-width="7"/>');
          w += A("athul", { id: id + "-at", x: 560, y: 690, s: 1.0, legs: "sit", poses: ["hold"], midBody: PHONE });
          w += A("yogya", { id: id + "-yo", x: 790, y: 690, s: 1.0, legs: "sit", expr: ["sleep"] });
          w += A("bedi", { id: id + "-bd", x: 1060, y: 690, s: 1.0, legs: "sit", expr: ["happy", "chew"], poses: ["hold", "chips"], midBody: BAG });
          w += A("prag", { id: id + "-pr", x: 1590, y: 752, s: 1.0, legs: "sit", poses: ["hold"], midBody: PHONE });
          w += A("krish", { id: id + "-kr", x: 250, y: 880, s: 1.0, inFront: CAN(58, -44) });
          w += A("bigt", { id: id + "-bt", x: 1800, y: 900, s: 1.0, poses: ["hold"], midBody: PHONE });
          w += A("nimai", { id: id + "-ni", x: 700, y: 1010, s: 1.15, legs: "sit", poses: ["hold"], midBody: CONTROLLER });
          w += A("akshay", { id: id + "-ak", x: 1160, y: 1010, s: 1.15, legs: "sit", poses: ["hold"], midBody: CONTROLLER });
          w += '<div class="abs pop" id="' + id + '-z" style="left:860px;top:330px;font-size:48px;color:#F4E9BC">Zzz</div>';
          scene(id, ROOM, 1920, 1080, w, TVGLOW);
          var t = T(id), d = D(id);
          push(id, t, d, 1.0, 1.06, "50% 60%");
          beat("#" + id + "-ni > svg", t, d, 10); beat("#" + id + "-ak > svg", t + BP / 2, d - BP / 2, 10);
          for (var i = 0; i < 6; i++) { swap(id + "-bd", "pose", i % 2 ? "hold" : "chips", B(6 + i)); swap(id + "-bd", "expr", i % 2 ? "happy" : "chew", B(6 + i)); }
          headBob("#" + id + "-pr-head", t, d, 6);
          tl.fromTo("#" + id + "-yo-head", { rotation: 8, svgOrigin: J.neck }, { rotation: 14, svgOrigin: J.neck, duration: 0.6, ease: "sine.inOut", repeat: 3, yoyo: true }, t);
          tl.fromTo("#" + id + "-z", { y: 10, opacity: 0.2 }, { y: -30, opacity: 1, duration: 0.6, ease: "sine.out", repeat: 3, yoyo: true }, t);
          tl.fromTo("#" + id + "-kr-head", { rotation: 0, svgOrigin: J.neck }, { rotation: -10, svgOrigin: J.neck, duration: 0.3, ease: "sine.out", repeat: 1, yoyo: true, repeatDelay: 0.3 }, B(9));
        })();

        // a03 — FIFA: Nimai scores, Akshay loses it
        (function () {
          var id = "a03";
          var w = svg(0, 0, 1920, 1080, '<rect x="-20" y="520" width="1960" height="600" rx="60" fill="#4F6FA8" stroke="' + INK + '" stroke-width="8"/>');
          w += A("nimai", { id: id + "-ni", x: 620, y: 1200, s: 2.1, expr: ["focus", "grin"], poses: ["hold", "thumb"], midBody: CONTROLLER });
          w += A("akshay", { id: id + "-ak", x: 1310, y: 1200, s: 2.1, expr: ["focus", "angry"], poses: ["hold", "up"], midBody: CONTROLLER });
          w += tp(id + "-goal", 960, 190, "GOAL!!", 150, true);
          scene(id, ROOM, 1920, 1080, w, TVGLOW + '<div class="fill" id="' + id + '-flick" style="background:rgba(140,200,255,.12)"></div>');
          var t = T(id), d = D(id);
          push(id, t, d, 1.02, 1.08, "50% 70%");
          beat("#" + id + "-ni > svg", t, B(14) - t, 12); beat("#" + id + "-ak > svg", t + BP / 2, B(14) - t - BP / 2, 12);
          tl.fromTo("#" + id + "-flick", { opacity: 1 }, { opacity: 0.2, duration: BP, ease: "steps(2)", repeat: reps(d, BP), yoyo: true }, t);
          swap(id + "-ni", "expr", "grin", B(14)); swap(id + "-ni", "pose", "thumb", B(14));
          popIn("#" + id + "-goal", B(14), -6);
          swap(id + "-ak", "expr", "angry", B(14.5)); swap(id + "-ak", "pose", "up", B(15.5));
          shake("#" + id + "-ak", B(14.5), 1.0, 12, 7);
          tl.fromTo("#" + id + "-ak .vein", { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.5, duration: 0.1, ease: "none", repeat: 9, yoyo: true }, B(14.6));
          beat("#" + id + "-ni > svg", B(14), B(18) - B(14), 24);
        })();

        // a04 — Bedi inhales the chips, Athul steals one
        (function () {
          var id = "a04";
          var w = svg(0, 0, 1920, 1080, '<rect x="-20" y="560" width="1960" height="600" rx="60" fill="#4F6FA8" stroke="' + INK + '" stroke-width="8"/>');
          w += A("bedi", { id: id + "-bd", x: 800, y: 1210, s: 2.3, expr: ["chew", "happy"], poses: ["chips", "hold"], midBody: BAG });
          w += A("athul", { id: id + "-at", x: 1500, y: 1210, s: 1.9, expr: ["cool", "chew"], poses: ["down", "chips"] });
          var cr = "";
          for (var i = 0; i < 12; i++) cr += svg(830, 700, 24, 24, '<path d="M2,20 L12,2 L22,20 Z" fill="#FFD95A" stroke="' + INK + '" stroke-width="3"/>', id + "-c" + i);
          w += cr;
          scene(id, ROOM, 1920, 1080, w, TVGLOW);
          var t = T(id), d = D(id), r = P(44);
          push(id, t, d, 1.0, 1.07, "45% 55%");
          for (var k = 0; k < 6; k++) { swap(id + "-bd", "pose", k % 2 ? "hold" : "chips", B(18 + k)); swap(id + "-bd", "expr", k % 2 ? "happy" : "chew", B(18 + k)); }
          for (var j = 0; j < 12; j++) {
            var st = B(18 + (j % 5)) + 0.05;
            tl.fromTo("#" + id + "-c" + j, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: 200 + r() * 520, y: -140 + r() * 340, rotation: 360 * (r() > 0.5 ? 1 : -1), opacity: 0.9, duration: 0.6, ease: "power2.out" }, st);
          }
          swap(id + "-at", "pose", "chips", B(22)); swap(id + "-at", "expr", "chew", B(22.3));
          tl.fromTo("#" + id + "-at-head", { rotation: 0, svgOrigin: J.neck }, { rotation: -8, svgOrigin: J.neck, duration: 0.25 }, B(20.5));
        })();

        // a05 — Krish flicks a chip at sleeping Yogya
        (function () {
          var id = "a05";
          var w = svg(0, 0, 1920, 1080, '<rect x="-20" y="560" width="1960" height="600" rx="60" fill="#4F6FA8" stroke="' + INK + '" stroke-width="8"/>');
          w += A("yogya", { id: id + "-yo", x: 680, y: 1180, s: 2.0, expr: ["sleep", "shock"] });
          w += A("krish", { id: id + "-kr", x: 1420, y: 1180, s: 2.0, expr: ["smug"], poses: ["down", "throwL"] });
          w += svg(1216, 970, 30, 30, '<path d="M3,26 L15,3 L27,26 Z" fill="#FFD95A" stroke="' + INK + '" stroke-width="3"/>', id + "-chip");
          w += '<div class="abs pop" id="' + id + '-z" style="left:880px;top:360px;font-size:60px;color:#F4E9BC">Zzz</div>';
          w += tp(id + "-ex", 700, 300, "!!", 160, true);
          scene(id, ROOM, 1920, 1080, w, TVGLOW);
          var t = T(id);
          push(id, t, D(id), 1.0, 1.05, "45% 60%");
          tl.fromTo("#" + id + "-yo-head", { rotation: 10, svgOrigin: J.neck }, { rotation: 16, svgOrigin: J.neck, duration: 0.5, ease: "sine.inOut", repeat: 3, yoyo: true }, t);
          tl.fromTo("#" + id + "-z", { y: 10, opacity: 0.3 }, { y: -30, opacity: 1, duration: 0.5, ease: "sine.out", repeat: 3, yoyo: true }, t);
          tl.fromTo("#" + id + "-kr", { x: 480 }, { x: 0, duration: 0.55, ease: "power1.out" }, t);
          beat("#" + id + "-kr > svg", t, 0.55, 14);
          swap(id + "-kr", "pose", "throwL", B(25.5));
          tl.fromTo("#" + id + "-chip", { x: 0, y: 0, rotation: 0, opacity: 0 }, { x: -470, y: -170, rotation: -540, opacity: 1, duration: 0.3, ease: "power1.in", immediateRender: false }, B(25.5));
          tl.set("#" + id + "-chip", { opacity: 0 }, B(25.5) + 0.31);
          tl.set("#" + id + "-z", { opacity: 0 }, B(26.5));
          swap(id + "-yo", "expr", "shock", B(26.5));
          tl.fromTo("#" + id + "-yo > svg", { y: 0 }, { y: -90, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, B(26.5));
          tl.fromTo("#" + id + "-yo .specs", { y: 0, rotation: 0 }, { y: -60, rotation: 25, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, B(26.5));
          popIn("#" + id + "-ex", B(26.5), 8);
          shake("#" + id + "-cam", B(26.5), 0.3, 10, 9);
        })();

        // a06 — Prag on aux
        (function () {
          var id = "a06";
          var sp = '<rect x="0" y="0" width="300" height="440" rx="26" fill="#2b2b33" stroke="' + INK + '" stroke-width="8"/><circle cx="150" cy="120" r="70" fill="#1a1a1f" stroke="#555" stroke-width="10"/><circle cx="150" cy="120" r="24" fill="#555"/><circle cx="150" cy="310" r="100" fill="#1a1a1f" stroke="#555" stroke-width="12"/><circle cx="150" cy="310" r="34" fill="#555"/>';
          var w = svg(1330, 520, 300, 440, sp, id + "-spk") + svg(210, 560, 300, 440, sp, id + "-spk2");
          w += A("prag", { id: id + "-pr", x: 930, y: 1195, s: 2.2, expr: ["smile", "grin"], poses: ["hold"], midBody: PHONE });
          ["♪", "♫", "♪", "♫"].forEach(function (n, i) { w += '<div class="abs pop" id="' + id + "-n" + i + '" style="left:' + [1420, 1560, 300, 430][i] + "px;top:" + [430, 470, 450, 480][i] + 'px;font-size:70px;color:#FFE45C">' + n + "</div>"; });
          var cr = '<div class="credit" id="' + id + '-cr" style="left:110px;top:90px"><div>エンディングテーマ</div><div class="big">『流れ星 ～Shooting Star～』</div><div>HOME MADE 家族</div></div>';
          scene(id, ROOM, 1920, 1080, w, cr);
          var t = T(id), d = D(id);
          push(id, t, d, 1.0, 1.05, "50% 60%");
          headBob("#" + id + "-pr-head", t, d, 8);
          beat("#" + id + "-pr > svg", t, d, 8);
          tl.fromTo(["#" + id + "-spk", "#" + id + "-spk2"], { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.07, duration: BP / 2, ease: "power1.out", repeat: reps(d, BP / 2), yoyo: true }, t);
          for (var i = 0; i < 4; i++) tl.fromTo("#" + id + "-n" + i, { y: 30, opacity: 0 }, { y: -110, opacity: 1, duration: 0.9, ease: "sine.out", repeat: 1 }, t + i * 0.3);
          swap(id + "-pr", "expr", "grin", B(33));
          tl.fromTo("#" + id + "-cr", { opacity: 0 }, { opacity: 1, duration: 0.4 }, t + 0.1);
        })();

        // a07 — everybody is bored
        (function () {
          var id = "a07", w = "";
          var cols = ["#F2B8C6", "#B8D8F2", "#C9E8B8", "#F2DEA8", "#D8C8F2", "#F2C8A8", "#A8E8E0", "#E8D8B8"];
          var pos = [[110, 70], [555, 70], [1000, 70], [1445, 70], [110, 540], [555, 540], [1000, 540], [1445, 540]];
          CREW.forEach(function (k, i) {
            var p = pos[i];
            w += box(p[0], p[1], 370, 420, "background:" + cols[i] + ";border:7px solid " + INK + ";border-radius:26px;box-shadow:10px 12px 0 rgba(0,0,0,.35)",
              box(45, 20, 280, 260, "", Chibi.headSVG(k, { expr: "tired" })) +
              '<div class="abs" style="left:0;right:0;top:300px;text-align:center;font-family:Montserrat, sans-serif;font-weight:900;font-size:40px;color:#1d1a17">' + Chibi.CAST[k].name.toUpperCase() + "</div>", id + "-t" + i);
          });
          w += tp(id + "-dots", 960, 1030, "…", 110, true);
          scene(id, ROOM, 1920, 1080, w);
          var t = T(id);
          CREW.forEach(function (k, i) { popIn("#" + id + "-t" + i, B(36 + i), (i % 2 ? 4 : -4)); });
          popIn("#" + id + "-dots", B(43.5), 0);
          push(id, t, D(id), 1.0, 1.04);
        })();

        // a08 — the clock hits midnight, Prag: "bored…"
        (function () {
          var id = "a08";
          var clock = '<circle cx="230" cy="230" r="220" fill="#FFF7E4" stroke="' + INK + '" stroke-width="12"/>';
          for (var i = 0; i < 12; i++) { var a = (i / 12) * Math.PI * 2; clock += '<path d="M' + (230 + Math.sin(a) * 180).toFixed(0) + "," + (230 - Math.cos(a) * 180).toFixed(0) + " L" + (230 + Math.sin(a) * 205).toFixed(0) + "," + (230 - Math.cos(a) * 205).toFixed(0) + '" stroke="' + INK + '" stroke-width="' + (i % 3 ? 5 : 10) + '"/>'; }
          clock += '<path id="' + id + '-hr" d="M230,230 L230,120" stroke="' + INK + '" stroke-width="16" stroke-linecap="round"/><path id="' + id + '-mn" d="M230,230 L230,60" stroke="#D12B2B" stroke-width="10" stroke-linecap="round"/><circle cx="230" cy="230" r="16" fill="' + INK + '"/>';
          var w = svg(170, 170, 460, 460, clock, id + "-clock");
          w += A("prag", { id: id + "-pr", x: 1300, y: 1200, s: 2.3, expr: ["tired"] });
          w += bubble(id + "-bub", 760, 170, 420, "bored…", 64);
          w += tp(id + "-12", 400, 740, "12:00 AM", 70, true);
          scene(id, ROOM, 1920, 1080, w);
          var t = T(id);
          tl.fromTo("#" + id + "-mn", { rotation: 0, svgOrigin: "230 230" }, { rotation: 1440, svgOrigin: "230 230", duration: 1.1, ease: "power2.inOut" }, t);
          tl.fromTo("#" + id + "-hr", { rotation: -60, svgOrigin: "230 230" }, { rotation: 0, svgOrigin: "230 230", duration: 1.1, ease: "power2.inOut" }, t);
          popIn("#" + id + "-12", t + 1.1, -4);
          popIn("#" + id + "-bub", B(48), 3);
          tl.fromTo("#" + id + "-pr-head", { rotation: 0, svgOrigin: J.neck }, { rotation: 10, svgOrigin: J.neck, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 3 }, t + 0.2);
          push(id, t, D(id), 1.0, 1.06, "60% 50%");
        })();

        // a09 — Prag holds up the Tesla key
        (function () {
          var id = "a09";
          var card = '<rect x="0" y="0" width="520" height="320" rx="30" fill="#141417" stroke="' + INK + '" stroke-width="10"/><path d="M200,110 Q260,86 320,110 L312,122 Q286,112 272,112 L272,236 L248,236 L248,112 Q234,112 208,122 Z" fill="#E7E7EA"/><path d="M180,92 Q260,60 340,92 L334,100 Q260,74 186,100 Z" fill="#E7E7EA"/>';
          var w = focusLines(55) + svg(700, 110, 520, 320, card, id + "-card");
          w += spark(id + "-s0", 650, 120, 90) + spark(id + "-s1", 1270, 400, 70) + spark(id + "-s2", 1250, 90, 50);
          w += A("prag", { id: id + "-pr", x: 960, y: 1230, s: 2.1, expr: ["grin"], poses: ["up"] });
          w += tp(id + "-lets", 960, 540, "LET'S GO", 120, false);
          scene(id, FOCUS_BG, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.set("#fader", { backgroundColor: "#ffffff" }, t - 0.02);
          tl.fromTo("#fader", { opacity: 0.9 }, { opacity: 0, duration: 0.35, ease: "power1.out", immediateRender: false }, t);
          tl.fromTo("#" + id + "-card", { y: 260, scale: 0.4, rotation: -20, transformOrigin: "50% 50%" }, { y: 0, scale: 1, rotation: -4, duration: 0.35, ease: "back.out(2)" }, t);
          tl.to("#" + id + "-card", { rotation: 4, duration: BP, ease: "sine.inOut", repeat: reps(d - 0.4, BP), yoyo: true }, t + 0.4);
          pop("#" + id + "-s0", B(51)); pop("#" + id + "-s1", B(52)); pop("#" + id + "-s2", B(53));
          beat("#" + id + "-pr > svg", t, d, 16);
          popIn("#" + id + "-lets", B(54), -5);
          push(id, t, d, 1.0, 1.08);
        })();

        // a10 — every head snaps toward him
        (function () {
          var id = "a10", w = focusLines(66, "#FFFBEA");
          var keys = ["krish", "nimai", "bedi", "athul", "akshay", "yogya", "bigt"];
          keys.forEach(function (k, i) {
            var x = i < 4 ? 20 + i * 470 : 255 + (i - 4) * 470, y = i < 4 ? 50 : 560;
            w += box(x, y, 460, 425, "", box(0, 0, 460, 425, "", Chibi.headSVG(k, { expr: "neutral" }), id + "-a" + i) + box(0, 0, 460, 425, "opacity:0", Chibi.headSVG(k, { expr: "sparkle" }), id + "-b" + i), id + "-h" + i);
          });
          scene(id, FOCUS_BG, 1920, 1080, w);
          var t = T(id);
          keys.forEach(function (k, i) {
            var bt = B(57 + i * 0.5);
            tl.fromTo("#" + id + "-h" + i, { rotation: -35, x: -60, transformOrigin: "50% 80%" }, { rotation: 0, x: 0, duration: 0.14, ease: "back.out(3)" }, bt);
            tl.set("#" + id + "-a" + i, { opacity: 0 }, bt + 0.06); tl.set("#" + id + "-b" + i, { opacity: 1 }, bt + 0.06);
          });
          shake("#" + id + "-cam", B(60.5), 0.4, 8, 12);
          push(id, t, D(id), 1.0, 1.08);
        })();

        // a11 — everybody sprints out the door
        (function () {
          var id = "a11";
          var w = svg(0, 0, 1920, 1080, '<rect x="-10" y="880" width="1940" height="220" fill="#2a2336" stroke="' + INK + '" stroke-width="6"/><rect x="1520" y="250" width="300" height="640" fill="#0f1a2e" stroke="' + INK + '" stroke-width="10"/>' + '<rect x="1480" y="230" width="380" height="30" fill="#6b4a33" stroke="' + INK + '" stroke-width="6"/>');
          w += svg(1520, 250, 300, 640, '<rect x="0" y="0" width="120" height="640" fill="#8a5a3c" stroke="' + INK + '" stroke-width="8"/><circle cx="96" cy="330" r="10" fill="#E8C27A" stroke="' + INK + '" stroke-width="3"/>', id + "-door");
          w += couch(-260, 470, 700);
          ["bedi", "akshay", "yogya", "athul", "bigt", "nimai", "krish", "prag"].forEach(function (k, i) { w += A(k, { id: id + "-" + k, x: -160, y: 900, s: 1.1, expr: ["grin"] }); });
          for (var p = 0; p < 7; p++) w += poof(id + "-d" + p, 200 + p * 190, 880, 40);
          scene(id, ROOM, 1920, 1080, w);
          var t = T(id);
          ["bedi", "akshay", "yogya", "athul", "bigt", "nimai", "krish", "prag"].reverse().forEach(function (k, i) {
            var st = t + i * 0.12, du = 1.0 + (k === "bedi" ? 0.25 : 0);
            tl.fromTo("#" + id + "-" + k, { x: 0, rotation: 8 }, { x: 2200, rotation: 8, duration: du, ease: "none" }, st);
            run(id + "-" + k, st, du, 0.2, 40, 14);
          });
          for (var q = 0; q < 7; q++) puff("#" + id + "-d" + q, t + 0.1 + q * 0.14, 0.4);
          tl.fromTo("#" + id + "-door", { scaleX: 1, transformOrigin: "0% 50%" }, { scaleX: 0.25, duration: 0.18, ease: "power2.out" }, t + 0.3);
          tl.to("#" + id + "-door", { scaleX: 1, duration: 0.12, ease: "power3.in" }, B(67.3));
          shake("#" + id + "-cam", B(67.5), 0.25, 10, 14);
        })();

        // a12 — the Tesla in the driveway, beep beep
        (function () {
          var id = "a12";
          var w = starField(71, 1920, 600, 120) + moon(1560, 90, 110);
          w += svg(0, 0, 1920, 1080, '<rect x="-10" y="120" width="440" height="780" fill="#2d3e5c" stroke="' + INK + '" stroke-width="8"/><path d="M-20,130 L215,20 L450,130 Z" fill="#1f2b42" stroke="' + INK + '" stroke-width="8" stroke-linejoin="round"/><rect x="150" y="560" width="140" height="340" fill="#F4D77E" stroke="' + INK + '" stroke-width="7"/><rect x="60" y="260" width="120" height="120" fill="#F4D77E" stroke="' + INK + '" stroke-width="7"/><rect x="-10" y="880" width="1940" height="220" fill="#384152" stroke="' + INK + '" stroke-width="6"/><path d="M1780,880 V240 M1780,240 h-110" stroke="' + INK + '" stroke-width="16"/><path d="M1600,250 L1720,250 L1700,290 L1620,290 Z" fill="#FFE9A8" stroke="' + INK + '" stroke-width="5"/><path d="M1620,290 L1500,880 L1840,880 L1700,290 Z" fill="rgba(255,236,170,.14)"/>');
          w += tesla(id + "-car", 560, 575, "", { over: box(820, 180, 110, 70, "border-radius:50%;background:radial-gradient(circle, rgba(255,255,230,.95) 0%, rgba(255,255,200,0) 70%);opacity:0", "", id + "-hl") });
          w += tp(id + "-beep", 1320, 520, "*beep beep*", 70, true);
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id);
          twinkle("#" + id + " .tw", t, D(id), 72);
          [B(69), B(70)].forEach(function (bt) { tl.fromTo("#" + id + "-hl", { opacity: 0 }, { opacity: 1, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, bt); });
          popIn("#" + id + "-beep", B(69), -6);
          push(id, t, D(id), 1.0, 1.08, "55% 70%");
        })();
