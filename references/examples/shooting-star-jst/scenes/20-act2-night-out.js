        // b01 — everybody piles into the Tesla
        (function () {
          var id = "b01";
          var w = starField(81, 1920, 600, 110) + moon(1560, 90, 110) + svg(0, 0, 1920, 1080, DRIVE);
          w += tesla(id + "-car", 560, 575, winHeads(id + "-h-", CARPOOL, ["grin"]));
          CARPOOL.forEach(function (k, i) { w += A(k, { id: id + "-r-" + k, x: -160 - 440 * i, y: 900, s: 0.95, expr: ["grin"] }); });
          for (var p = 0; p < 7; p++) w += poof(id + "-p" + p, 900, 800, 48);
          w += tp(id + "-boing", 1010, 470, "BOING!!", 96, true);
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 82);
          push(id, t, d, 1.0, 1.06, "60% 70%");
          var last = 0;
          CARPOOL.forEach(function (k, i) {
            var st = t + 0.05, dx = 1060 + 440 * i, du = dx / 2650, arr = st + du, sel = "#" + id + "-r-" + k;
            last = arr;
            tl.fromTo(sel, { x: 0 }, { x: dx, duration: du, ease: "none" }, st);
            run(id + "-r-" + k, st, du, 0.16, 40, 12);
            tl.to(sel, { y: -80, scale: 0.2, opacity: 0, duration: 0.1, ease: "power2.in" }, arr);
            puff("#" + id + "-p" + i, arr, 0.35);
            popIn("#" + id + "-h-" + k, arr + 0.02, 0);
            tl.fromTo("#" + id + "-car", { scaleY: k === "bedi" ? 0.8 : 0.94, transformOrigin: "50% 92%" }, { scaleY: 1, duration: 0.3, ease: "elastic.out(1,0.35)", immediateRender: false }, arr);
          });
          popIn("#" + id + "-boing", last + 0.02, -8);
          shake("#" + id + "-cam", last, 0.25, 9, 31);
        })();

        // b02 — Prag takes the wheel, shades on
        (function () {
          var id = "b02";
          var back = "";
          ["athul", "krish", "bedi", "bigt", "nimai", "akshay"].forEach(function (k, i) { back += A(k, { id: id + "-" + k, x: BACKROW_X[i], y: 700, s: 0.95, legs: "none", expr: ["neutral", "sparkle"], poses: ["down", "cheer"] }); });
          var front = A("yogya", { id: id + "-yo", x: 700, y: 900, s: 1.6, legs: "none", expr: ["grin", "sparkle"], poses: ["down", "thumb"] }) +
            A("prag", { id: id + "-pr", x: 1230, y: 900, s: 1.6, legs: "none", expr: ["smile", "cool"], overHead: '<g class="shades">' + SUNGLASSES + "</g>" });
          var w = windshield(id, back, front, GLARE + spark(id + "-sp", 1330, 610, 80));
          scene(id, "background:#1d212c", 1920, 1080, w, tp(id + "-lbl", 960, 1012, "DRIVER: PRAG", 68, false));
          var t = T(id), d = D(id);
          push(id, t, d, 1.0, 1.07, "62% 55%");
          tl.fromTo("#" + id + "-pr .shades", { y: -320, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: "power2.in" }, B(78.6));
          swap(id + "-pr", "expr", "cool", B(78.6) + 0.2);
          pop("#" + id + "-sp", B(79.2));
          tl.fromTo("#" + id + "-pr-head", { rotation: 0, svgOrigin: J.neck }, { rotation: -6, svgOrigin: J.neck, duration: 0.12, yoyo: true, repeat: 1 }, B(79.2));
          ["athul", "krish", "bedi", "bigt", "nimai", "akshay"].forEach(function (k, i) { swap(id + "-" + k, "expr", "sparkle", B(80)); swap(id + "-" + k, "pose", "cheer", B(80)); beat("#" + id + "-" + k + " > svg", B(80) + (i % 2) * BP / 2, B(82) - B(80), 16); });
          swap(id + "-yo", "expr", "sparkle", B(80)); swap(id + "-yo", "pose", "thumb", B(80));
          popIn("#" + id + "-lbl", B(80), -3);
        })();

        // b03 — floor it
        (function () {
          var id = "b03";
          var w = starField(91, 1920, 560, 90) + svg(0, 0, 1920, 1080, skyline(92, 1920, 760, "#16223a", 0));
          w += road(id, 760);
          for (var p = 0; p < 5; p++) w += poof(id + "-p" + p, 560 - p * 80, 760 + (p % 2) * 26, 56 + p * 8);
          w += G(id + "-cg", 330, 380, 1.25, tesla(id + "-car", 0, 0, winHeads(id + "-h-", CARPOOL, ["grin", "shock"])));
          w += '<div class="abs" id="' + id + '-slw" style="left:0;top:0;opacity:0">' + speedLines(id + "-sl", 93, "#ffffff", 30) + "</div>";
          w += tp(id + "-zoom", 1250, 250, "ZOOOOM!!", 160, true);
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 94);
          shake("#" + id + "-cg", t, B(83) - t, 3, 5);
          spin(id + "-car", B(83), d, 12);
          for (var q = 0; q < 5; q++) puff("#" + id + "-p" + q, B(83) + q * 0.06, 0.5);
          CARPOOL.forEach(function (k) { if (k !== "prag") swap(id + "-h-" + k, "expr", "shock", B(84)); });
          tl.to("#" + id + "-cg", { x: 2400, duration: 0.5, ease: "power3.in" }, B(84));
          tl.to("#" + id + "-slw", { opacity: 1, duration: 0.1 }, B(84.3));
          tl.fromTo("#" + id + "-sl", { x: 0 }, { x: -1800, duration: 0.4, ease: "none", repeat: 2 }, B(84.3));
          tl.fromTo("#" + id + "-dash", { x: 0 }, { x: -440, duration: 0.2, ease: "none", repeat: 3 }, B(84.3));
          popIn("#" + id + "-zoom", B(84.5), -8);
          shake("#" + id + "-cam", B(84.3), 0.5, 12, 33);
        })();

        // b04 — pinned to the seats
        (function () {
          var id = "b04";
          var back = '<div class="abs" style="left:0;top:0;opacity:.8">' + speedLines(id + "-sl", 95, "#cfe3ff", 34) + "</div>";
          var bk = ["athul", "krish", "bedi", "bigt", "nimai", "akshay"];
          bk.forEach(function (k, i) { back += A(k, { id: id + "-" + k, x: BACKROW_X[i], y: 700, s: 0.95, legs: "none", expr: ["shock", "dizzy"] }); });
          var front = A("yogya", { id: id + "-yo", x: 700, y: 900, s: 1.6, legs: "none", expr: ["shock"] }) +
            A("prag", { id: id + "-pr", x: 1230, y: 900, s: 1.6, legs: "none", expr: ["grin"], overHead: SUNGLASSES });
          var chips = "";
          for (var c = 0; c < 10; c++) chips += svg(940, 560, 30, 30, '<path d="M3,26 L15,3 L27,26 Z" fill="#FFD95A" stroke="' + INK + '" stroke-width="3"/>', id + "-c" + c);
          var w = windshield(id, back, front, GLARE + chips);
          scene(id, "background:#1d212c", 1920, 1080, w, tp(id + "-lbl", 960, 1012, "0-100 IN 3 SEC", 68, false));
          var t = T(id), d = D(id), r = P(96);
          tl.fromTo("#" + id + "-sl", { x: 0 }, { x: -1800, duration: 0.35, ease: "none", repeat: reps(d, 0.35) }, t);
          shake("#" + id + "-cam", t, d, 9, 97);
          bk.concat(["yo", "pr"]).forEach(function (k, i) { shake("#" + id + "-" + k + "-head", t, d, 5, 40 + i); });
          tl.fromTo("#" + id + "-yo .specs", { x: 0, y: 0, rotation: 0 }, { x: -520, y: -420, rotation: -720, duration: 0.5, ease: "power1.out", transformOrigin: "50% 50%" }, B(87));
          for (var j = 0; j < 10; j++) tl.fromTo("#" + id + "-c" + j, { x: 0, y: 0, rotation: 0, opacity: 0 }, { x: (r() * 2 - 1) * 900, y: -200 - r() * 400, rotation: 540, opacity: 1, duration: 0.55, ease: "power2.out" }, B(87.5));
          bk.forEach(function (k) { swap(id + "-" + k, "expr", "dizzy", B(88)); });
          popIn("#" + id + "-lbl", B(86.5), 3);
          push(id, t, d, 1.08, 1.0, "50% 50%");
        })();

        // b05 — the driver card
        (function () {
          var id = "b05";
          var w = focusLines(101, "#DCEBFF");
          w += box(-240, 690, 2400, 210, "background:#1d1a17;transform:rotate(-6deg)", "", id + "-band");
          w += A("prag", { id: id + "-pr", x: 1320, y: 1150, s: 3.2, expr: ["cool", "grin"], poses: ["down", "thumb"], overHead: SUNGLASSES });
          w += tp(id + "-role", 600, 545, "THE DRIVER", 74, false);
          w += tp(id + "-name", 600, 790, "PRAG", 200, true);
          w += spark(id + "-s0", 1440, 520, 90) + spark(id + "-s1", 1100, 260, 60);
          scene(id, "background:radial-gradient(ellipse at 60% 40%, #9FD3FF 0%, #4F8FE0 55%, #2B5FB0 100%)", 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#" + id + "-band", { x: -2400 }, { x: 0, duration: 0.22, ease: "power3.out" }, t);
          tl.fromTo("#" + id + "-pr", { x: 700 }, { x: 0, duration: 0.28, ease: "back.out(1.6)" }, t);
          popIn("#" + id + "-name", t + 0.12, -4);
          popIn("#" + id + "-role", B(91), 3);
          swap(id + "-pr", "pose", "thumb", B(92)); swap(id + "-pr", "expr", "grin", B(92));
          pop("#" + id + "-s0", B(92)); pop("#" + id + "-s1", B(92.5));
          tl.fromTo("#" + id + "-pr-head", { rotation: -3, svgOrigin: J.neck }, { rotation: 3, svgOrigin: J.neck, duration: 0.08, ease: "none", repeat: reps(d, 0.08), yoyo: true }, t);
          push(id, t, d, 1.0, 1.08, "60% 50%");
        })();

        // b06 — the highway (the beat drops)
        (function () {
          var id = "b06";
          var w = starField(111, 1920, 640, 150) + moon(240, 70, 120);
          w += svg(0, 0, 3840, 1080, skyline(112, 3840, 800, "#1a2944", 1250), id + "-far");
          w += svg(0, 0, 3840, 1080, skyline(113, 3840, 870, "#0f1a2e", 0), id + "-near");
          w += road(id, 830);
          w += '<div class="abs" id="' + id + '-sign" style="left:2000px;top:250px;width:540px;height:620px">' + svg(0, 0, 540, 620, '<rect x="258" y="230" width="22" height="390" fill="#6d747e" stroke="' + INK + '" stroke-width="5"/><rect x="10" y="10" width="520" height="240" rx="18" fill="#1F7A4A" stroke="#F3F4F6" stroke-width="8"/>') +
            '<div class="abs pop" style="left:10px;top:28px;width:520px;text-align:center;font-size:92px;color:#F3F4F6">401 E</div><div class="abs pop" style="left:10px;top:146px;width:520px;text-align:center;font-size:60px;color:#F3F4F6">TORONTO</div></div>';
          w += G(id + "-cg", 470, 440, 1.1, tesla(id + "-car", 0, 0, winHeads(id + "-h-", CARPOOL, ["grin", "happy"])));
          w += speedLines(id + "-sl", 114, "#ffffff", 22);
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.set("#fader", { backgroundColor: "#ffffff" }, t - 0.02);
          tl.fromTo("#fader", { opacity: 0.85 }, { opacity: 0, duration: 0.3, ease: "power1.out", immediateRender: false }, t);
          tl.fromTo("#" + id + "-far", { x: 0 }, { x: -600, duration: d, ease: "none" }, t);
          tl.fromTo("#" + id + "-near", { x: 0 }, { x: -1500, duration: d, ease: "none" }, t);
          tl.fromTo("#" + id + "-dash", { x: 0 }, { x: -220, duration: 0.09, ease: "none", repeat: reps(d, 0.09) }, t);
          tl.fromTo("#" + id + "-sl", { x: 0 }, { x: -1800, duration: 0.5, ease: "none", repeat: reps(d, 0.5) }, t);
          spin(id + "-car", t, d, 24);
          tl.fromTo("#" + id + "-sign", { x: 0 }, { x: -3000, duration: 1.2, ease: "none" }, B(97.5));
          beat("#" + id + "-cg", t, d, 10);
          CARPOOL.forEach(function (k, i) {
            headBob("#" + id + "-h-" + k + "-head", t + (i % 2) * BP, d, 12);
            if (k !== "prag") swap(id + "-h-" + k, "expr", i % 2 ? "happy" : "grin", B(98));
          });
          push(id, t, d, 1.1, 1.0, "50% 62%");
        })();

        // b07 — the casino lights up
        (function () {
          var id = "b07";
          var bulbs = "";
          for (var i = 0; i < 30; i++) {
            var u = i / 30, bx, by;
            if (u < 0.35) { bx = 30 + (u / 0.35) * 1060; by = 22; } else if (u < 0.5) { bx = 1100; by = 22 + ((u - 0.35) / 0.15) * 320; } else if (u < 0.85) { bx = 1100 - ((u - 0.5) / 0.35) * 1060; by = 342; } else { bx = 30; by = 342 - ((u - 0.85) / 0.15) * 320; }
            bulbs += '<circle class="' + (i % 2 ? "bA" : "bB") + '" cx="' + bx.toFixed(0) + '" cy="' + by.toFixed(0) + '" r="11" fill="#FFE9A8" stroke="' + INK + '" stroke-width="3"/>';
          }
          var letters = "";
          "CASINO".split("").forEach(function (L, j) { letters += '<div class="pop" id="' + id + "-L" + j + '" style="font-size:190px;color:#FF6FD8;text-shadow:0 0 26px #FF3FC8, 6px 7px 0 #1d1a17;opacity:.18">' + L + "</div>"; });
          var sign = '<div class="abs" style="left:395px;top:60px;width:1130px;height:364px;background:#2a0f33;border:10px solid ' + INK + ';border-radius:34px;box-shadow:0 0 80px 14px rgba(255,80,200,.35)">' + svg(-10, -10, 1130, 364, bulbs) + '<div class="abs" style="left:0;top:0;width:1110px;height:344px;display:flex;align-items:center;justify-content:center;gap:10px">' + letters + "</div></div>";
          var w = svg(0, 0, 1920, 1080, '<rect x="-10" y="820" width="1940" height="280" fill="#2b1330" stroke="' + INK + '" stroke-width="6"/><path d="M760,820 L1160,820 L1360,1100 L560,1100 Z" fill="#B3243A" stroke="' + INK + '" stroke-width="6"/><rect x="230" y="420" width="60" height="400" fill="#E8C27A" stroke="' + INK + '" stroke-width="6"/><rect x="1630" y="420" width="60" height="400" fill="#E8C27A" stroke="' + INK + '" stroke-width="6"/>') + sign;
          w += G(id + "-cg", 520, 470, 1.0, tesla(id + "-car", 0, 0, winHeads(id + "-h-", CARPOOL, ["sparkle"])));
          scene(id, NEON, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#" + id + "-cg", { x: -1500 }, { x: 0, duration: 0.5, ease: "power3.out" }, t);
          spin(id + "-car", t, 0.5, 3);
          tl.fromTo("#" + id + "-car", { rotation: 0, transformOrigin: "80% 90%" }, { rotation: 2, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, t + 0.5);
          for (var j = 0; j < 6; j++) tl.to("#" + id + "-L" + j, { opacity: 1, duration: 0.05 }, t + 0.35 + j * 0.1);
          tl.fromTo("#" + id + " .bA", { opacity: 1 }, { opacity: 0.25, duration: BP / 2, ease: "steps(1)", repeat: reps(d, BP / 2), yoyo: true }, t);
          tl.fromTo("#" + id + " .bB", { opacity: 0.25 }, { opacity: 1, duration: BP / 2, ease: "steps(1)", repeat: reps(d, BP / 2), yoyo: true }, t);
          [B(104), B(105)].forEach(function (bt) { tl.fromTo("#" + id + " [id^=" + id + "-L]", { scale: 1.12 }, { scale: 1, duration: 0.2, ease: "power2.out", immediateRender: false }, bt); });
          push(id, t, d, 1.0, 1.06, "50% 40%");
        })();

        // b08 — the crew walks in
        (function () {
          var id = "b08";
          var bg = "";
          for (var m = 0; m < 9; m++) bg += '<rect x="' + (40 + m * 215) + '" y="250" width="150" height="330" rx="18" fill="#3b1846" stroke="' + INK + '" stroke-width="6"/><rect class="' + (m % 2 ? "bA" : "bB") + '" x="' + (60 + m * 215) + '" y="290" width="110" height="80" rx="8" fill="#7FE3FF"/>';
          var w = svg(0, 0, 1920, 1080, '<rect x="-10" y="560" width="1940" height="540" fill="#7a1d2d"/>' + bg + '<rect x="-10" y="560" width="1940" height="20" fill="#E8C27A"/>');
          w += box(0, 580, 1920, 500, "background:repeating-linear-gradient(45deg, rgba(232,194,122,.16) 0 20px, rgba(0,0,0,0) 20px 70px)");
          var row = [["akshay", 180], ["nimai", 403], ["krish", 626], ["prag", 849], ["bigt", 1072], ["yogya", 1295], ["athul", 1518], ["bedi", 1741]];
          row.forEach(function (p) { w += A(p[0], { id: id + "-" + p[0], x: p[1], y: 1010, s: p[0] === "prag" ? 1.08 : 0.98, expr: [p[0] === "prag" ? "cool" : "smug"], poses: [p[0] === "krish" ? "hip" : "down"], overHead: p[0] === "prag" ? SUNGLASSES : "" }); });
          w += tp(id + "-t", 960, 215, "JST", 140, true);
          scene(id, NEON, 1920, 1080, w);
          var t = T(id), d = D(id);
          row.forEach(function (p, i) { run(id + "-" + p[0], t + (i % 2) * BP / 2, d, BP * 2, 16, 8); });
          tl.fromTo("#" + id + " .bA", { opacity: 1 }, { opacity: 0.4, duration: BP, ease: "steps(1)", repeat: reps(d, BP), yoyo: true }, t);
          popIn("#" + id + "-t", B(107), 0);
          push(id, t, d, 1.0, 1.14, "50% 80%");
        })();

        // b09 — Big T hits the jackpot and loses his mind
        (function () {
          var id = "b09";
          var SYM = ["7", "$", "BAR", "X"], RH = 200, N = 13, reels = "";
          for (var r0 = 0; r0 < 3; r0++) {
            var col = "";
            for (var q = 0; q <= N; q++) { var sym = q === N ? "7" : SYM[(q + r0 * 2 + 1) % 4]; col += '<div class="pop" style="height:' + RH + "px;display:flex;align-items:center;justify-content:center;font-size:" + (sym === "BAR" ? 62 : 124) + "px;color:" + (sym === "7" ? "#E0303A" : "#1d1a17") + '">' + sym + "</div>"; }
            reels += '<div class="abs" data-layout-allow-overflow data-layout-allow-occlusion style="left:' + (455 + r0 * 190) + 'px;top:300px;width:170px;height:212px;background:#FFFDF4;border:6px solid ' + INK + ';border-radius:14px;overflow:hidden"><div class="abs" id="' + id + "-reel" + r0 + '" style="left:0;top:0;width:158px">' + col + "</div></div>";
          }
          var mach = svg(380, 70, 760, 980, '<rect x="20" y="120" width="720" height="860" rx="40" fill="#C8202E" stroke="' + INK + '" stroke-width="10"/><rect x="60" y="0" width="640" height="170" rx="36" fill="#F4C94E" stroke="' + INK + '" stroke-width="10"/><rect x="50" y="210" width="660" height="280" rx="20" fill="#7a0f1a" stroke="' + INK + '" stroke-width="8"/><rect x="120" y="760" width="520" height="120" rx="20" fill="#3b0a10" stroke="' + INK + '" stroke-width="8"/>');
          var lever = svg(1110, 250, 120, 420, '<path d="M20,300 L20,60" stroke="' + INK + '" stroke-width="22" stroke-linecap="round"/><path d="M20,300 L20,60" stroke="#c9ced6" stroke-width="12" stroke-linecap="round"/><circle cx="20" cy="50" r="34" fill="#E0303A" stroke="' + INK + '" stroke-width="6"/><rect x="0" y="290" width="46" height="60" rx="10" fill="#555" stroke="' + INK + '" stroke-width="6"/>', id + "-lever");
          var w = mach + reels + lever;
          w += A("bigt", { id: id + "-bt", x: 1480, y: 1090, s: 1.75, expr: ["focus", "sparkle", "hearts"], poses: ["throwL", "cheer", "throwR", "up"] });
          var r = P(120), fx = "";
          for (var c = 0; c < 16; c++) fx += COIN(id + "-co" + c, 740, 880);
          for (var b = 0; b < 18; b++) fx += BILL(id + "-bi" + b, r() * 1800, -120);
          for (var b3 = 0; b3 < 14; b3++) fx += BILL(id + "-th" + b3, 1440, 740);
          w += fx + tp(id + "-jp", 960, 170, "JACKPOT!!", 150, true) + tpc(id + "-cr", 1430, 420, "BIG T GOES CRAZY", 56, "#FF6FD8", "#1d1a17");
          scene(id, NEON, 1920, 1080, w);
          var t = T(id), d = D(id), end = t + d, stop = [B(111.2), B(111.8), B(112.4)];
          tl.fromTo("#" + id + "-lever", { rotation: 0, transformOrigin: "20px 320px" }, { rotation: 0, scaleY: 0.5, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.in" }, t + 0.05);
          for (var z = 0; z < 3; z++) tl.fromTo("#" + id + "-reel" + z, { y: 0 }, { y: -N * RH, duration: stop[z] - t, ease: "power2.out" }, t);
          swap(id + "-bt", "expr", "sparkle", stop[2]); swap(id + "-bt", "expr", "hearts", B(113.2));
          var cyc = ["cheer", "throwR", "up", "throwL"];
          for (var h = 0; stop[2] + (h * BP) / 2 < end; h++) swap(id + "-bt", "pose", cyc[h % 4], stop[2] + (h * BP) / 2);
          tl.fromTo("#" + id + "-bt > svg", { y: 0 }, { y: -70, duration: BP / 2, ease: "power2.out", repeat: reps(end - stop[2], BP / 2), yoyo: true }, stop[2]);
          tl.fromTo("#" + id + "-bt", { rotation: -7 }, { rotation: 7, duration: BP / 2, ease: "sine.inOut", repeat: reps(end - stop[2], BP / 2), yoyo: true }, stop[2]);
          tl.fromTo("#" + id + "-bt .tails", { rotation: -14, svgOrigin: "0 -214" }, { rotation: 14, svgOrigin: "0 -214", duration: 0.08, ease: "none", repeat: reps(end - stop[2], 0.08), yoyo: true }, stop[2]);
          popIn("#" + id + "-jp", stop[2], -6);
          popIn("#" + id + "-cr", B(113.5), 4);
          for (var k2 = 0; k2 < 16; k2++) tl.fromTo("#" + id + "-co" + k2, { x: 0, y: 0, opacity: 0 }, { x: (r() * 2 - 1) * 700, y: -300 - r() * 500, opacity: 1, rotation: 360, duration: 0.6, ease: "power2.out", immediateRender: false }, stop[2] + k2 * 0.015);
          for (var b2 = 0; b2 < 18; b2++) tl.fromTo("#" + id + "-bi" + b2, { y: 0, rotation: 0 }, { y: 1300 + r() * 200, rotation: (r() * 2 - 1) * 540, duration: 1.3 + r() * 0.5, ease: "none", immediateRender: false }, stop[2] + r() * 0.3);
          for (var b4 = 0; b4 < 14; b4++) tl.fromTo("#" + id + "-th" + b4, { x: 0, y: 0, rotation: 0, opacity: 0 }, { x: -900 + r() * 1200, y: -300 - r() * 450, rotation: (r() * 2 - 1) * 720, opacity: 1, duration: 0.7, ease: "power2.out" }, stop[2] + 0.1 + b4 * 0.11);
          shake("#" + id + "-cam", stop[2], 0.3, 10, 121);
          push(id, t, d, 1.0, 1.08, "50% 45%");
        })();

        // b10 — Prag goes all in on red
        (function () {
          var id = "b10";
          var crew = [["krish", 150], ["nimai", 330], ["akshay", 510], ["bigt", 690], ["yogya", 1330], ["bedi", 1540], ["athul", 1750]];
          var w = "";
          crew.forEach(function (p) { w += A(p[0], { id: id + "-" + p[0], x: p[1], y: 790, s: 1.0, expr: ["neutral", "shock"], poses: ["down", "up"] }); });
          w += A("prag", { id: id + "-pr", x: 960, y: 905, s: 1.9, expr: ["determined", "grin"], poses: ["hold", "punch"] });
          var stack = "";
          for (var c = 0; c < 9; c++) stack += CHIP(0, -c * 14, c % 3 === 0 ? "#E0303A" : c % 3 === 1 ? "#2F48CC" : "#F3F4F6");
          w += svg(0, 0, 1920, 1080, '<path d="M-40,760 Q960,690 1960,760 L1960,1120 L-40,1120 Z" fill="#1E7A48" stroke="' + INK + '" stroke-width="10"/><path d="M-40,760 Q960,690 1960,760" stroke="#6b3f22" stroke-width="34" fill="none"/>' +
            '<rect x="330" y="860" width="440" height="160" rx="16" fill="#C8202E" stroke="#F3F4F6" stroke-width="6"/><rect x="1150" y="860" width="440" height="160" rx="16" fill="#1d1a17" stroke="#F3F4F6" stroke-width="6"/>');
          w += '<div class="abs pop" style="left:330px;top:900px;width:440px;text-align:center;font-size:64px;color:#FFF7DA">RED</div><div class="abs pop" style="left:1150px;top:900px;width:440px;text-align:center;font-size:64px;color:#FFF7DA">BLACK</div>';
          w += svg(960, 900, 10, 10, stack, id + "-chips");
          w += tp(id + "-t", 960, 130, "ALL IN ON RED", 120, true);
          scene(id, NEON, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#" + id + "-chips", { x: 0, y: 0 }, { x: -420, y: 20, duration: 0.22, ease: "power2.out" }, B(115.4));
          swap(id + "-pr", "pose", "punch", B(115.4)); swap(id + "-pr", "expr", "grin", B(116.4));
          popIn("#" + id + "-t", B(115.4), -4);
          crew.forEach(function (p, i) { swap(id + "-" + p[0], "expr", "shock", B(115.9)); swap(id + "-" + p[0], "pose", "up", B(115.9)); beat("#" + id + "-" + p[0] + " > svg", B(115.9) + (i % 2) * BP / 2, B(118) - B(115.9), 14); });
          shake("#" + id + "-cam", B(115.4), 0.25, 8, 122);
          push(id, t, d, 1.0, 1.08, "50% 60%");
        })();

        // b11 — the wheel
        (function () {
          var id = "b11", n = 37, R1 = 430, R2 = 300, wh = "";
          wh += '<circle cx="0" cy="0" r="480" fill="#6b3f22" stroke="' + INK + '" stroke-width="12"/><circle cx="0" cy="0" r="450" fill="#8a5a3c" stroke="' + INK + '" stroke-width="6"/>';
          for (var k = 0; k < n; k++) {
            var a0 = (k / n) * 2 * Math.PI - Math.PI / 2 - Math.PI / n, a1 = a0 + (2 * Math.PI) / n;
            var cl = k === 0 ? "#1E8A4C" : k % 2 ? "#C8202E" : "#1d1a17";
            wh += '<path d="M' + (Math.cos(a0) * R2).toFixed(1) + "," + (Math.sin(a0) * R2).toFixed(1) + " L" + (Math.cos(a0) * R1).toFixed(1) + "," + (Math.sin(a0) * R1).toFixed(1) + " A" + R1 + "," + R1 + " 0 0 1 " + (Math.cos(a1) * R1).toFixed(1) + "," + (Math.sin(a1) * R1).toFixed(1) + " L" + (Math.cos(a1) * R2).toFixed(1) + "," + (Math.sin(a1) * R2).toFixed(1) + " A" + R2 + "," + R2 + " 0 0 0 " + (Math.cos(a0) * R2).toFixed(1) + "," + (Math.sin(a0) * R2).toFixed(1) + ' Z" fill="' + cl + '" stroke="#E8C27A" stroke-width="3"/>';
          }
          wh += '<circle cx="0" cy="0" r="' + R2 + '" fill="#8a5a3c" stroke="' + INK + '" stroke-width="8"/><circle cx="0" cy="0" r="130" fill="#E8C27A" stroke="' + INK + '" stroke-width="6"/>';
          for (var s4 = 0; s4 < 4; s4++) wh += '<path d="M0,0 L' + (Math.cos((s4 * Math.PI) / 2) * 250).toFixed(0) + "," + (Math.sin((s4 * Math.PI) / 2) * 250).toFixed(0) + '" stroke="#E8C27A" stroke-width="20" stroke-linecap="round"/>';
          wh += '<circle cx="0" cy="0" r="44" fill="#F4D77E" stroke="' + INK + '" stroke-width="5"/>';
          var w = '<svg class="abs" style="left:0;top:0;overflow:visible" width="1920" height="1080" viewBox="-960 -560 1920 1080"><g id="' + id + '-wh">' + wh + '</g><g id="' + id + '-bl"><circle id="' + id + '-ball" cx="0" cy="-465" r="20" fill="#FFFFFF" stroke="' + INK + '" stroke-width="4"/></g></svg>';
          w += box(1440, 640, 440, 400, "", Chibi.headSVG("prag", { expr: "shock" }), id + "-ins");
          w += tp(id + "-t", 960, 560, "BLACK 17", 170, true);
          scene(id, "background:radial-gradient(ellipse at 50% 50%, #1E7A48 0%, #145a34 60%, #0c3a22 100%)", 1920, 1080, w);
          var t = T(id), d = D(id), land = B(121), W = 760, kk = 18, Bf = W + (kk * 360) / n - 1800;
          tl.fromTo("#" + id + "-wh", { rotation: 0, svgOrigin: "0 0" }, { rotation: W, svgOrigin: "0 0", duration: land - t, ease: "power3.out" }, t);
          tl.fromTo("#" + id + "-bl", { rotation: 0, svgOrigin: "0 0" }, { rotation: Bf, svgOrigin: "0 0", duration: land - t, ease: "power3.out" }, t);
          tl.fromTo("#" + id + "-ball", { attr: { cy: -465 } }, { attr: { cy: -365 }, duration: 0.35, ease: "bounce.out" }, land - 0.35);
          popIn("#" + id + "-t", B(121.2), -5);
          tl.fromTo("#" + id + "-ins", { x: 600 }, { x: 0, duration: 0.2, ease: "back.out(2)" }, B(121.5));
          shake("#" + id + "-cam", B(121.2), 0.35, 14, 123);
          push(id, t, d, 1.15, 1.0, "50% 50%");
        })();

        // b12 — burnt
        (function () {
          var id = "b12";
          var crew = [["nimai", 170, "point"], ["krish", 380, "hip"], ["athul", 590, "down"], ["yogya", 1250, "down"], ["bigt", 1440, "cheer"], ["akshay", 1630, "cross"], ["bedi", 1810, "hold"]];
          var w = svg(0, 0, 1920, 1080, '<rect x="-10" y="860" width="1940" height="240" fill="#2b1330" stroke="' + INK + '" stroke-width="6"/>');
          crew.forEach(function (p) { w += A(p[0], { id: id + "-" + p[0], x: p[1], y: 960, s: 1.05, expr: ["grin"], poses: [p[2]] }); });
          w += A("prag", { id: id + "-pr", x: 960, y: 1120, s: 2.0, burnt: true });
          for (var q = 0; q < 6; q++) w += poof(id + "-p" + q, 760 + q * 80, 380 + (q % 2) * 60, 60);
          var hx = [[300, 300], [1600, 280], [520, 150], [1380, 140], [180, 560], [1760, 560]];
          hx.forEach(function (h, i) { w += tp(id + "-ha" + i, h[0], h[1], "HA", 96 + (i % 3) * 16, true); });
          w += tp(id + "-z", 960, 150, "$0", 150, true);
          scene(id, NEON, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.set("#fader", { backgroundColor: "#ffffff" }, t - 0.02);
          tl.fromTo("#fader", { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "power1.out", immediateRender: false }, t);
          shake("#" + id + "-pr", t, 0.4, 10, 124);
          for (var q2 = 0; q2 < 6; q2++) puff("#" + id + "-p" + q2, t + 0.05 + q2 * 0.12, 0.7);
          hx.forEach(function (h, i) { popIn("#" + id + "-ha" + i, t + 0.3 + i * (BP / 2), (i % 2 ? 8 : -8)); });
          crew.forEach(function (p, i) { beat("#" + id + "-" + p[0] + " > svg", t + (i % 2) * 0.08, d, 18); });
          popIn("#" + id + "-z", B(125), 0);
          push(id, t, d, 1.0, 1.07, "50% 60%");
        })();
        // b13 — broke
        (function () {
          var id = "b13", fan = "";
          for (var f = 0; f < 5; f++) fan += '<g transform="translate(20,-60) rotate(' + (-50 + f * 25) + ')"><rect x="-10" y="-64" width="20" height="60" rx="3" fill="#8FD18B" stroke="' + INK + '" stroke-width="2.4"/></g>';
          var w = svg(0, 0, 1920, 1080, '<rect x="-10" y="860" width="1940" height="240" fill="#2b1330" stroke="' + INK + '" stroke-width="6"/>');
          w += A("prag", { id: id + "-pr", x: 700, y: 1010, s: 2.1, legs: "kneel", expr: ["cry"] });
          w += A("bigt", { id: id + "-kr", x: 1400, y: 1010, s: 1.8, expr: ["smug"], poses: ["hold"], inFront: '<g class="fan">' + fan + "</g>" });
          w += tp(id + "-t", 700, 170, "BROKE", 160, true);
          scene(id, NEON, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#" + id + "-kr .fan", { rotation: -10, svgOrigin: "20 -60" }, { rotation: 10, svgOrigin: "20 -60", duration: 0.12, ease: "sine.inOut", repeat: reps(d, 0.12), yoyo: true }, t);
          shake("#" + id + "-pr", t, d, 4, 130);
          popIn("#" + id + "-t", t + 0.08, -5);
          push(id, t, d, 1.0, 1.06, "40% 60%");
        })();

        // b14 — stomachs growl
        (function () {
          var id = "b14";
          var row = [["akshay", 180], ["nimai", 400], ["krish", 620], ["bedi", 850], ["prag", 1080], ["bigt", 1300], ["yogya", 1520], ["athul", 1740]];
          var w = svg(0, 0, 1920, 1080, '<rect x="-10" y="860" width="1940" height="240" fill="#2b1330" stroke="' + INK + '" stroke-width="6"/>');
          row.forEach(function (p, i) {
            w += A(p[0], { id: id + "-" + p[0], x: p[1], y: 1000, s: p[0] === "bedi" ? 1.35 : 1.1, expr: ["tired", "sparkle"] });
            w += tp(id + "-g" + i, p[1] + (i % 2 ? 34 : -34), 1048, "GRRR", 40, true);
          });
          w += tp(id + "-t", 960, 200, "OSMOW&#39;S!!", 150, true);
          scene(id, NEON, 1920, 1080, w);
          var t = T(id), d = D(id);
          row.forEach(function (p, i) {
            popIn("#" + id + "-g" + i, t + 0.05 + i * 0.1, (i % 2 ? 6 : -6));
            shake("#" + id + "-" + p[0], t + 0.05 + i * 0.1, 0.25, 5, 140 + i);
            swap(id + "-" + p[0], "expr", "sparkle", B(132));
          });
          popIn("#" + id + "-t", B(132), -4);
          shake("#" + id + "-cam", B(132), 0.25, 10, 141);
          row.forEach(function (p, i) { beat("#" + id + "-" + p[0] + " > svg", B(132) + (i % 2) * BP / 2, B(134) - B(132), 20); });
          push(id, t, d, 1.0, 1.06, "50% 70%");
        })();

        // b15 — Osmow's
        (function () {
          var id = "b15";
          var tiles = "";
          for (var ty = 0; ty < 8; ty++) for (var tx = 0; tx < 20; tx++) tiles += '<rect x="' + tx * 100 + '" y="' + (ty * 100 + 180) + '" width="96" height="96" fill="#FFF6EA"/>';
          var bg = '<rect x="0" y="0" width="1920" height="1080" fill="#e9dccb"/>' + tiles +
            '<rect x="-10" y="0" width="1940" height="190" fill="#C8202E" stroke="' + INK + '" stroke-width="8"/>' +
            '<rect x="1240" y="230" width="600" height="330" rx="16" fill="#1d1a17" stroke="' + INK + '" stroke-width="6"/>';
          var w = svg(0, 0, 1920, 1080, bg);
          w += '<div class="abs pop" style="left:0;top:28px;width:1920px;text-align:center;font-size:118px;color:#FFF7DA;text-shadow:6px 7px 0 #1d1a17">OSMOW&#39;S</div>';
          w += '<div class="abs pop" style="left:1260px;top:250px;width:560px;font-size:44px;line-height:1.55;color:#FFF7DA">WRAPS<br>RICE BOWLS<br>ON THE ROCKS<br>GARLIC SAUCE</div>';
          var row = [["akshay", 170], ["athul", 380], ["nimai", 590], ["bedi", 810], ["prag", 1030], ["krish", 1240], ["bigt", 1450], ["yogya", 1660]];
          row.forEach(function (p) {
            var big = p[0] === "bedi";
            w += A(p[0], { id: id + "-" + p[0], x: p[1], y: 850, s: big ? 1.35 : 1.2, expr: ["sparkle", "chew", "shock"], poses: big ? ["down", "cheer"] : ["down", "chips"],
              poseProps: big ? { cheer: WRAP(-112, -230, -20, 1.3) + WRAP(112, -230, 20, 1.3) + WRAP(0, -300, 0, 1.3) } : { chips: WRAP(30, -140, -12, 1.2) } });
          });
          var spit = '<rect x="46" y="0" width="12" height="420" fill="#8d96a8" stroke="' + INK + '" stroke-width="4"/><g id="' + id + '-meat"><path d="M8,40 L96,40 L78,340 L26,340 Z" fill="#9A5A2E" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
          for (var m = 0; m < 9; m++) spit += '<path d="M' + (12 + m * 2) + "," + (70 + m * 32) + " L" + (92 - m * 2) + "," + (62 + m * 32) + '" stroke="#6b3a1c" stroke-width="5"/>';
          spit += "</g>";
          w += svg(0, 0, 1920, 1080, '<rect x="-10" y="810" width="1940" height="290" fill="#C8202E" stroke="' + INK + '" stroke-width="8"/><rect x="-10" y="800" width="1940" height="26" fill="#F3F4F6" stroke="' + INK + '" stroke-width="6"/>');
          w += svg(1800, 370, 110, 440, spit);
          w += svg(240, 675, 60, 130, '<rect x="8" y="30" width="44" height="96" rx="12" fill="#FBF8F0" stroke="' + INK + '" stroke-width="4"/><path d="M22,30 L26,6 L34,6 L38,30 Z" fill="#E0303A" stroke="' + INK + '" stroke-width="3"/>', id + "-bot");
          w += svg(110, 600, 120, 90, '<path d="M60,8 C92,4 116,30 102,54 C120,70 96,92 72,80 C58,96 24,90 26,66 C2,58 8,26 32,26 C34,10 48,6 60,8 Z" fill="#FBF8F0" stroke="' + INK + '" stroke-width="4"/>', id + "-splat");
          w += tp(id + "-x3", 810, 300, "x3", 110, false);
          scene(id, "background:#e9dccb", 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#" + id + "-meat", { scaleX: 1, svgOrigin: "52 190" }, { scaleX: 0.86, svgOrigin: "52 190", duration: 0.25, ease: "sine.inOut", repeat: reps(d, 0.25), yoyo: true }, t);
          row.forEach(function (p, i) {
            var k = p[0];
            if (k === "bedi") { swap(id + "-bedi", "pose", "cheer", B(136)); }
            else swap(id + "-" + k, "pose", "chips", B(135) + (i % 3) * 0.08);
            swap(id + "-" + k, "expr", "chew", B(138));
            beat("#" + id + "-" + k + " > svg", t + (i % 2) * BP / 2, d, 12);
          });
          popIn("#" + id + "-x3", B(136), 8);
          tl.fromTo("#" + id + "-bot", { rotation: 0, transformOrigin: "50% 100%" }, { rotation: -35, duration: 0.1, yoyo: true, repeat: 1 }, B(137) - 0.1);
          popIn("#" + id + "-splat", B(137), 0);
          swap(id + "-akshay", "expr", "shock", B(137));
          shake("#" + id + "-akshay", B(137), 0.3, 8, 150);
          push(id, t, d, 1.0, 1.08, "50% 55%");
        })();

        // b16 — Narula eats until he passes out
        (function () {
          var id = "b16";
          var w = svg(0, 0, 1920, 1080, '<rect x="0" y="0" width="1920" height="1080" fill="#e9dccb"/><rect x="-10" y="-10" width="1940" height="130" fill="#C8202E" stroke="' + INK + '" stroke-width="8"/>');
          w += '<div class="abs pop" style="left:0;top:18px;width:1920px;text-align:center;font-size:76px;color:#FFF7DA;text-shadow:5px 6px 0 #1d1a17">OSMOW&#39;S</div>';
          w += A("krish", { id: id + "-kr", x: 960, y: 1070, s: 2.0, expr: ["chew", "tired", "dizzy"], poses: ["chips", "hold"], poseProps: { chips: WRAP(30, -140, -12, 1.3) } });
          w += svg(0, 0, 1920, 1080, '<rect x="160" y="925" width="1600" height="50" rx="14" fill="#8a5a3c" stroke="' + INK + '" stroke-width="8"/><rect x="220" y="968" width="1480" height="140" fill="#6b3f22" stroke="' + INK + '" stroke-width="8"/>');
          var PX = [300, 370, 440, 510, 335, 405, 475, 1340, 1410, 1480, 1550, 1375, 1445, 1515], PY = [872, 872, 872, 872, 826, 826, 826, 872, 872, 872, 872, 826, 826, 826];
          for (var i = 0; i < PX.length; i++) w += svg(PX[i], PY[i], 70, 60, '<path d="M8,52 L4,26 L20,8 L44,4 L64,20 L66,46 L50,58 Z" fill="#cfd5dc" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/><path d="M18,22 l20,14 M36,12 l6,28" stroke="#9aa3ad" stroke-width="2.4"/>', id + "-w" + i);
          var NS = ["x3", "x6", "x9", "x14"];
          NS.forEach(function (n, j) { w += tp(id + "-n" + j, 1560, 330, n, 150, false); });
          w += tp(id + "-ko", 960, 250, "K.O.", 210, true);
          w += '<div class="abs" id="' + id + '-orb0" style="left:800px;top:590px;width:1px;height:1px;opacity:0;transform:scaleY(.45)"><div class="abs" id="' + id + '-orb" style="left:0;top:0;width:1px;height:1px">' +
            spark(id + "-st0", 140, 0, 64, "#FFE45C") + spark(id + "-st1", -70, 121, 64, "#FFE45C") + spark(id + "-st2", -70, -121, 64, "#FFE45C") + "</div></div>";
          scene(id, "background:#e9dccb", 1920, 1080, w);
          var t = T(id), d = D(id), ko = B(145.4);
          for (var e = 0; t + (e * BP) / 2 < B(144.6); e++) swap(id + "-kr", "pose", e % 2 ? "hold" : "chips", t + (e * BP) / 2);
          for (var k = 0; k < PX.length; k++) popIn("#" + id + "-w" + k, t + 0.05 + k * 0.07, k % 2 ? 12 : -12);
          NS.forEach(function (n, j) { popIn("#" + id + "-n" + j, t + 0.1 + j * 0.25, -5); if (j < NS.length - 1) tl.set("#" + id + "-n" + j, { opacity: 0 }, t + 0.1 + (j + 1) * 0.25); });
          beat("#" + id + "-kr > svg", t, B(144.6) - t, 10);
          swap(id + "-kr", "expr", "tired", B(144.6)); swap(id + "-kr", "pose", "hold", B(144.6));
          swap(id + "-kr", "expr", "dizzy", ko);
          tl.to("#" + id + "-kr", { rotation: -24, y: 60, duration: 0.25, ease: "power2.in" }, ko);
          tl.fromTo("#" + id + "-kr-head", { rotation: 0, svgOrigin: J.neck }, { rotation: -16, svgOrigin: J.neck, duration: 0.25, ease: "power2.in" }, ko);
          tl.set("#" + id + "-n3", { opacity: 0 }, ko + 0.2);
          popIn("#" + id + "-ko", ko + 0.2, -6);
          shake("#" + id + "-cam", ko + 0.25, 0.3, 12, 161);
          tl.to("#" + id + "-orb0", { opacity: 1, duration: 0.05 }, ko + 0.3);
          tl.fromTo("#" + id + "-orb", { rotation: 0 }, { rotation: 540, duration: t + d - ko, ease: "none" }, ko + 0.3);
          push(id, t, d, 1.0, 1.06, "50% 60%");
        })();

        // b17 — Bedi: still hungry
        (function () {
          var id = "b17";
          var bk = ["athul", "krish", "bedi", "nimai", "akshay"], back = "";
          bk.forEach(function (k, i) { back += A(k, { id: id + "-" + k, x: BACKROW_X[i], y: 700, s: 0.95, legs: "none", expr: k === "bedi" ? ["sparkle"] : k === "krish" ? ["dizzy"] : ["sleep", "shock", "grin"] }); });
          var front = A("yogya", { id: id + "-yo", x: 700, y: 900, s: 1.6, legs: "none", expr: ["sleep", "shock", "grin"] }) +
            A("prag", { id: id + "-pr", x: 1230, y: 900, s: 1.6, legs: "none", expr: ["tired", "shock", "grin"] });
          var w = windshield(id, back, front, GLARE);
          scene(id, "background:#1d212c", 1920, 1080, w, bubble(id + "-bub", 740, 180, 440, "chipotle?", 60) + tp(id + "-lbl", 960, 1012, "CHIPOTLE RUN", 68, false));
          var t = T(id), d = D(id);
          popIn("#" + id + "-bub", B(147.3), 4);
          ["athul", "bigt", "nimai", "akshay", "yo", "pr"].forEach(function (k) {
            swap(id + "-" + k, "expr", "shock", B(148.2));
            swap(id + "-" + k, "expr", "grin", B(149.1));
            tl.fromTo("#" + id + "-" + k + "-head", { rotation: 0, svgOrigin: J.neck }, { rotation: k === "akshay" || k === "nimai" ? -14 : 14, svgOrigin: J.neck, duration: 0.1 }, B(148.2));
          });
          beat("#" + id + "-bedi > svg", t, d, 10);
          shake("#" + id + "-cam", B(148.2), 0.2, 8, 170);
          popIn("#" + id + "-lbl", B(149.1), -3);
          push(id, t, d, 1.0, 1.07, "50% 50%");
        })();

        // b18 — Chipotle: Prag's card gets declined
        (function () {
          var id = "b18";
          var slats = "";
          for (var s = 0; s < 24; s++) slats += '<rect x="' + s * 82 + '" y="0" width="74" height="800" fill="' + (s % 2 ? "#6b3a24" : "#5c3120") + '"/>';
          var pans = "", pc = ["#FBF8F0", "#6b3f22", "#62B04A", "#D8402F", "#F4D050", "#8B5A2B", "#FBF8F0", "#62B04A"];
          pc.forEach(function (c, i) { pans += '<rect x="' + (60 + i * 225) + '" y="850" width="190" height="70" rx="10" fill="' + c + '" stroke="' + INK + '" stroke-width="5"/>'; });
          var w = svg(0, 0, 1920, 1080, slats + '<rect x="610" y="40" width="700" height="170" rx="18" fill="#A81612" stroke="' + INK + '" stroke-width="8"/>');
          w += '<div class="abs pop" style="left:610px;top:78px;width:700px;text-align:center;font-size:92px;color:#FBEFD8">CHIPOTLE</div>';
          var row = [["akshay", 170], ["athul", 380], ["nimai", 590], ["bedi", 810], ["krish", 1030], ["bigt", 1250], ["prag", 1470], ["yogya", 1690]];
          row.forEach(function (p) {
            var o = { id: id + "-" + p[0], x: p[1], y: 850, s: p[0] === "bedi" ? 1.35 : 1.2, expr: ["neutral", "grin", "sparkle"], poses: ["down", "cheer"], poseProps: { cheer: FOIL(-112, -226, -20, 1.3) + FOIL(112, -226, 20, 1.3) } };
            if (p[0] === "prag") { o.expr = ["neutral", "shock", "cry", "sparkle"]; o.poses = ["down", "point", "cheer"]; }
            if (p[0] === "krish") { o.expr = ["dizzy"]; o.poses = ["down"]; o.poseProps = {}; }
            if (p[0] === "bigt") { o.expr = ["neutral", "grin", "smug", "sparkle"]; o.poses = ["down", "throwR", "cheer"]; o.poseProps.throwR = '<g transform="translate(104,-100) rotate(-10)"><rect x="-30" y="-15" width="60" height="30" rx="4" fill="#8FD18B" stroke="' + INK + '" stroke-width="3"/></g>'; }
            w += A(p[0], o);
          });
          w += svg(0, 0, 1920, 1080, '<rect x="-10" y="805" width="1940" height="295" fill="#9aa3ad" stroke="' + INK + '" stroke-width="8"/><rect x="-10" y="805" width="1940" height="18" fill="#dfe3e8"/>' + pans);
          w += svg(1395, 660, 150, 170, '<rect x="10" y="10" width="130" height="150" rx="18" fill="#2b2e35" stroke="' + INK + '" stroke-width="6"/><rect x="26" y="26" width="98" height="64" rx="8" fill="#9FE2A8"/>');
          w += tpc(id + "-no", 1300, 370, "DECLINED", 150, "#E0303A", "#FFF7DA");
          w += bubble(id + "-bub", 1050, 240, 400, "i got you", 54);
          w += tp(id + "-yes", 960, 330, "BURRITOS!!", 140, true);
          scene(id, "background:#5c3120", 1920, 1080, w);
          var t = T(id), d = D(id);
          swap(id + "-prag", "pose", "point", B(151)); swap(id + "-prag", "expr", "sparkle", B(151));
          popIn("#" + id + "-no", B(152), -4);
          swap(id + "-prag", "expr", "shock", B(152)); shake("#" + id + "-prag", B(152), 0.4, 10, 180);
          ["akshay", "athul", "nimai", "bedi", "yogya", "bigt"].forEach(function (k, i) { swap(id + "-" + k, "expr", "grin", B(152.5)); beat("#" + id + "-" + k + " > svg", B(152.5) + (i % 2) * 0.08, B(154) - B(152.5), 14); });
          swap(id + "-prag", "expr", "cry", B(153));
          tl.to("#" + id + "-no", { opacity: 0, duration: 0.1 }, B(154));
          swap(id + "-bigt", "pose", "throwR", B(154)); swap(id + "-bigt", "expr", "smug", B(154));
          popIn("#" + id + "-bub", B(154.3), 3);
          tl.to("#" + id + "-bub", { opacity: 0, duration: 0.1 }, B(156));
          row.forEach(function (p) { if (p[0] === "krish") return; swap(id + "-" + p[0], "pose", "cheer", B(156)); swap(id + "-" + p[0], "expr", "sparkle", B(156)); beat("#" + id + "-" + p[0] + " > svg", B(156), B(158) - B(156), 20); });
          popIn("#" + id + "-yes", B(156), -5);
          push(id, t, d, 1.0, 1.06, "60% 55%");
        })();

        // b19 — Bedi takes the whole burrito in one bite
        (function () {
          var id = "b19";
          var bur = function (len, bitten) {
            var s = '<rect x="0" y="0" width="' + len + '" height="230" rx="110" fill="#cfd5dc" stroke="' + INK + '" stroke-width="10"/>';
            for (var c = 1; c < 6; c++) s += '<path d="M' + (c * len / 6) + ",14 l-18,200" + '" stroke="#9aa3ad" stroke-width="5"/>';
            s += '<ellipse cx="' + (len - 30) + '" cy="115" rx="60" ry="104" fill="#E7C27A" stroke="' + INK + '" stroke-width="8"/><circle cx="' + (len - 40) + '" cy="80" r="14" fill="#62B04A"/><circle cx="' + (len - 20) + '" cy="130" r="12" fill="#FBF8F0"/><circle cx="' + (len - 44) + '" cy="150" r="12" fill="#6b3f22"/>';
            if (bitten) s += '<path d="M' + (len - 10) + ',6 q-26,26 0,50 q-26,26 0,54 q-26,26 0,54 q-26,26 0,58" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>';
            return s;
          };
          var w = focusLines(191, "#FFF7DA");
          w += A("bedi", { id: id + "-bd", x: 960, y: 1180, s: 2.3, expr: ["sparkle", "shock", "chew"] });
          w += svg(60, 796, 900, 240, bur(820, false), id + "-b1");
          w += '<div class="abs" id="' + id + '-b2wrap" style="left:0;top:0;opacity:0">' + svg(550, 796, 900, 240, bur(330, true), id + "-b2") + "</div>";
          var corners = [["krish", 30, 30], ["nimai", 1560, 30], ["yogya", 30, 740], ["akshay", 1560, 740]];
          corners.forEach(function (c, i) { w += box(c[1], c[2], 330, 300, "", Chibi.headSVG(c[0], { expr: "shock" }), id + "-c" + i); });
          w += tp(id + "-t", 960, 170, "ONE BITE", 150, true);
          scene(id, FOCUS_BG, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#" + id + "-b1", { x: -400 }, { x: 0, duration: 0.25, ease: "back.out(1.5)" }, t);
          swap(id + "-bd", "expr", "shock", B(159));
          tl.fromTo("#" + id + "-bd > svg", { scale: 1, transformOrigin: "50% 60%" }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1 }, B(159.5));
          tl.set("#" + id + "-b1", { opacity: 0 }, B(160));
          tl.set("#" + id + "-b2wrap", { opacity: 1 }, B(160));
          swap(id + "-bd", "expr", "chew", B(160));
          shake("#" + id + "-cam", B(160), 0.3, 14, 190);
          corners.forEach(function (c, i) { popIn("#" + id + "-c" + i, B(160.3) + i * 0.08, i % 2 ? 8 : -8); });
          popIn("#" + id + "-t", B(160.5), -5);
          beat("#" + id + "-bd > svg", B(160.5), B(162) - B(160.5), 14);
        })();

        // b20 — the drive home, everybody knocked out
        (function () {
          var id = "b20";
          var w = starField(201, 1920, 640, 170) + moon(1500, 80, 130);
          w += svg(0, 0, 3840, 1080, skyline(202, 3840, 820, "#132139", 0), id + "-far");
          w += road(id, 830);
          w += G(id + "-cg", 400, 380, 1.3, tesla(id + "-car", 0, 0, winHeads(id + "-h-", CARPOOL, function (k) { return k === "prag" ? ["soft"] : ["sleep"]; })));
          for (var z = 0; z < 4; z++) w += '<div class="abs pop" id="' + id + "-z" + z + '" style="left:' + (820 + z * 130) + "px;top:" + (360 - (z % 2) * 40) + 'px;font-size:' + (46 + z * 6) + 'px;color:#F4E9BC">Zzz</div>';
          w += tp(id + "-clk", 1650, 140, "3:00 AM", 70, true);
          scene(id, "background:radial-gradient(ellipse at 50% 18%, #1a3558 0%, #0e1f38 50%, #07111f 100%)", 1920, 1080, w);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 203);
          tl.fromTo("#" + id + "-far", { x: 0 }, { x: -500, duration: d, ease: "none" }, t);
          tl.fromTo("#" + id + "-dash", { x: 0 }, { x: -220, duration: 0.16, ease: "none", repeat: reps(d, 0.16) }, t);
          spin(id + "-car", t, d, 10);
          breathe("#" + id + "-cg", t, d, 5, BP * 2);
          CARPOOL.forEach(function (k, i) { if (k !== "prag") tl.fromTo("#" + id + "-h-" + k + "-head", { rotation: -6, svgOrigin: J.neck }, { rotation: 10, svgOrigin: J.neck, duration: BP * 2, ease: "sine.inOut", repeat: reps(d, BP * 2), yoyo: true }, t + i * 0.1); });
          for (var q = 0; q < 4; q++) tl.fromTo("#" + id + "-z" + q, { y: 20, opacity: 0 }, { y: -90, opacity: 1, duration: 0.8, ease: "sine.out", repeat: reps(d - q * 0.25, 0.8) }, t + q * 0.25);
          popIn("#" + id + "-clk", B(163), -4);
          push(id, t, d, 1.0, 1.05, "40% 60%");
        })();

        // b21 — the night in photos, one per beat
        (function () {
          var id = "b21", w = "";
          var pics = [
            ["bigt", "hearts", "#5a2461", "JACKPOT"], ["prag", "determined", "#1E7A48", "ALL IN"], ["prag", "cry", "#331040", "BROKE"], ["krish", "dizzy", "#C8202E", "K.O."],
            ["akshay", "shock", "#FFF6EA", "GARLIC"], ["prag", "shock", "#5c3120", "DECLINED"], ["bedi", "chew", "#F4C94E", "ONE BITE"], ["yogya", "sleep", "#13294a", "3 AM"]
          ];
          var pos = [[80, 50, -6], [530, 30, 4], [980, 60, -3], [1430, 40, 6], [110, 545, 5], [560, 565, -5], [1010, 540, 3], [1450, 560, -4]];
          pics.forEach(function (p, i) {
            var q = pos[i];
            w += box(q[0], q[1], 360, 430, "background:#FBF8F0;border:6px solid " + INK + ";border-radius:10px;box-shadow:10px 12px 0 rgba(0,0,0,.35)",
              box(20, 20, 308, 300, "background:" + p[2] + ";border:4px solid " + INK + ";overflow:hidden", box(4, 10, 300, 280, "", Chibi.headSVG(p[0], { expr: p[1] }))) +
              '<div class="abs pop" style="left:0;right:0;top:336px;text-align:center;font-size:44px;color:#1d1a17">' + p[3] + "</div>", id + "-q" + i);
          });
          w += tp(id + "-t", 960, 1040, "WHAT A NIGHT", 56, true);
          scene(id, "background:radial-gradient(ellipse at 50% 45%, #6b4a33 0%, #4a3222 70%, #33221a 100%)", 1920, 1080, w);
          var t = T(id), d = D(id);
          pos.forEach(function (q, i) {
            tl.fromTo("#" + id + "-q" + i, { scale: 1.7, rotation: q[2] - 12, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, rotation: q[2], opacity: 1, duration: 0.13, ease: "power2.in" }, B(170 + i));
            shake("#" + id + "-cam", B(170 + i) + 0.13, 0.1, 6, 210 + i);
          });
          popIn("#" + id + "-t", B(177.5), -4);
          push(id, t, d, 1.0, 1.04);
        })();

        // b22 — the lookout
        (function () {
          var id = "b22";
          var w = lookoutBG(221);
          w += G(id + "-cg", 500, 530, 1.0, tesla(id + "-car", 0, 0, winHeads(id + "-h-", CARPOOL, function (k) { return k === "prag" ? ["soft", "sparkle"] : ["sleep", "sparkle"]; })));
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 222);
          tl.fromTo("#" + id + "-cg", { x: -1500 }, { x: 0, duration: 0.8, ease: "power2.out" }, t);
          spin(id + "-car", t, 0.8, 4);
          CARPOOL.forEach(function (k, i) { swap(id + "-h-" + k, "expr", "sparkle", B(180.5) + i * 0.05); });
          tl.fromTo("#" + id + "-car", { y: 0 }, { y: -14, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, B(180.5));
          push(id, t, d, 1.0, 1.06, "50% 70%");
        })();

        // b23 — up on the car
        (function () {
          var id = "b23";
          var w = lookoutBG(221) + tesla(id + "-car", 500, 530, "") + carCrew(id, "back");
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 232);
          Object.keys(SEATS).forEach(function (k, i) {
            tl.fromTo("#" + id + "-" + k, { y: 280, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: "back.out(2)" }, t + 0.05 + i * 0.16);
            tl.fromTo("#" + id + "-" + k, { rotation: -3 }, { rotation: 3, duration: BP * 2, ease: "sine.inOut", repeat: reps(d - 1.3, BP * 2), yoyo: true }, t + 1.3 + (i % 2) * 0.1);
          });
          tl.fromTo("#" + id + "-car", { scaleY: 0.96, transformOrigin: "50% 92%" }, { scaleY: 1, duration: 0.3, ease: "elastic.out(1,0.35)", immediateRender: false }, t + 0.05 + 6 * 0.16);
          push(id, t, d, 1.0, 1.08, "50% 60%");
          tl.set("#fader", { backgroundColor: "#ffffff" }, B(188) - 0.02);
          tl.fromTo("#fader", { opacity: 0 }, { opacity: 1, duration: B(190) - B(188), ease: "power1.in", immediateRender: false }, B(188));
        })();
