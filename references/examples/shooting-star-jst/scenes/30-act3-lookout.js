
        /* ================= ACT 3 — the ending ================= */
        // c01 — group selfie, freezes into a photo
        (function () {
          var id = "c01";
          var w = lookoutBG(301);
          var hs = [["krish", 330, 150, "smug"], ["bedi", 680, 120, "grin"], ["nimai", 1030, 140, "grin"], ["akshay", 1380, 170, "cool"], ["athul", 480, 460, "happy"], ["prag", 830, 430, "grin"], ["yogya", 1180, 460, "eyesmile"], ["bigt", 1530, 440, "smug"]];
          hs.forEach(function (h, i) { w += box(h[1] - 20, h[2], 380, 350, "", Chibi.headSVG(h[0], { expr: h[3] }), id + "-h" + i); });
          var ui = box(0, 0, 1920, 1080, "",
            '<div class="abs" style="left:0;top:0;width:1920px;height:90px;background:rgba(0,0,0,.45)"></div><div class="abs" style="left:0;top:960px;width:1920px;height:120px;background:rgba(0,0,0,.45)"></div>' +
            '<div class="abs" style="left:910px;top:970px;width:100px;height:100px;border-radius:50%;border:8px solid #fff;background:rgba(255,255,255,.35)"></div><div class="abs pop" style="left:60px;top:20px;font-size:40px;color:#fff">1x</div>', id + "-ui");
          var pol = '<div class="abs" id="' + id + '-pol" data-layout-allow-overflow style="left:0;top:0;width:1920px;height:1080px;border:48px solid #FBF8F0;border-bottom-width:200px;opacity:0"><div class="abs pop" style="left:0;right:0;top:852px;text-align:center;font-size:110px;color:#1d1a17">JST</div></div>';
          scene(id, NIGHT, 1920, 1080, w, ui + pol);
          el(id).insertAdjacentHTML("afterbegin", '<div class="fill" style="background:#4a3222"></div>');
          var t = T(id), d = D(id), snap = B(194);
          tl.fromTo("#fader", { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power1.out", immediateRender: false }, t);
          hs.forEach(function (h, i) {
            tl.fromTo("#" + id + "-h" + i, { x: (h[1] - 960) * 0.5 }, { x: 0, duration: 0.5, ease: "back.out(1.6)" }, t + 0.25 + i * 0.05);
            tl.fromTo("#" + id + "-h" + i, { y: 0 }, { y: -12, duration: BP, ease: "sine.inOut", repeat: reps(snap - t, BP), yoyo: true }, t + (i % 2) * BP / 2);
          });
          tl.set("#fader", { backgroundColor: "#ffffff" }, snap - 0.02);
          tl.fromTo("#fader", { opacity: 1 }, { opacity: 0, duration: 0.35, ease: "power1.out", immediateRender: false }, snap);
          tl.set("#" + id + "-ui", { opacity: 0 }, snap);
          tl.set("#" + id + "-pol", { opacity: 1 }, snap);
          tl.fromTo("#" + id + "-cam", { scale: 1, rotation: 0 }, { scale: 0.8, rotation: -4, duration: 0.5, ease: "back.out(1.4)" }, snap + 0.3);
        })();

        // c02 — one face per beat
        (function () {
          var id = "c02", w = "";
          var fs = [["krish", "smug", "#B8D8F2"], ["nimai", "grin", "#C9E8B8"], ["bedi", "happy", "#F2DEA8"], ["athul", "grin", "#D8C8F2"], ["akshay", "cool", "#A8E8E0"], ["yogya", "grin", "#F2B8C6"], ["bigt", "smug", "#E8D8B8"], ["prag", "grin", "#F2C8A8"]];
          fs.forEach(function (f, i) {
            w += box(0, 0, 1920, 1080, "background:radial-gradient(ellipse at 50% 45%, #FFFDF4 0%, " + f[2] + " 70%);opacity:0",
              focusLines(400 + i, "#FFFFFF") + box(460, 60, 1000, 925, "", Chibi.headSVG(f[0], { expr: f[1] }), id + "-f" + i) + tp(id + "-n" + i, 400, 940, Chibi.CAST[f[0]].name.toUpperCase(), 130, false), id + "-p" + i);
          });
          var row = "";
          CREW.forEach(function (k, i) { row += box(20 + i * 270, 300, 330, 305, "", Chibi.headSVG(k, { expr: "happy" })); });
          
          scene(id, NIGHT, 1920, 1080, w);
          fs.forEach(function (f, i) {
            tl.set("#" + id + "-p" + i, { opacity: 1 }, B(198 + i));
            tl.set("#" + id + "-p" + i, { opacity: 0 }, B(199 + i));
            tl.fromTo("#" + id + "-f" + i, { scale: 1.25, rotation: i % 2 ? 6 : -6, transformOrigin: "50% 60%" }, { scale: 1, rotation: 0, duration: 0.2, ease: "back.out(2)" }, B(198 + i));
          });
          
          
        })();

        // c03 — up on the car, from behind, credits
        (function () {
          var id = "c03";
          var w = lookoutBG(311) + tesla(id + "-car", 500, 530, "") + carCrew(id, "back");
          var cr = '<div class="credit" id="' + id + '-cr" style="left:90px;top:80px"><div>出演</div><div class="big">PRAG</div><div class="big">NARULA</div><div class="big">NIMAI</div><div class="big">BIG T</div></div>';
          scene(id, NIGHT, 1920, 1080, w, cr);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 312);
          Object.keys(SEATS).forEach(function (k, i) { tl.fromTo("#" + id + "-" + k, { rotation: -3 }, { rotation: 3, duration: BP * 2, ease: "sine.inOut", repeat: reps(d, BP * 2), yoyo: true }, t + (i % 2) * 0.1); });
          tl.fromTo("#" + id + "-cr", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, t + 0.2);
          tl.fromTo("#" + id + "-prag-head", { rotation: 0, svgOrigin: J.neck }, { rotation: -9, svgOrigin: J.neck, duration: 0.5 }, B(209));
          tl.fromTo("#" + id + "-yogya-head", { rotation: 0, svgOrigin: J.neck }, { rotation: 9, svgOrigin: J.neck, duration: 0.5 }, B(209.5));
          push(id, t, d, 1.05, 1.0, "50% 60%");
        })();

        // c04 — facing us, still laughing about the casino
        (function () {
          var id = "c04";
          var w = lookoutBG(321, false) + tesla(id + "-car", 500, 530, "") + carCrew(id, "front", function (k) { return k === "prag" ? ["cry", "grin"] : ["grin", "eyesmile"]; }, function (k) { return k === "krish" ? ["hold"] : k === "nimai" ? ["point"] : ["down"]; });
          var cr = '<div class="credit" id="' + id + '-cr" style="left:90px;top:80px"><div>出演</div><div class="big">BEDI</div><div class="big">AC</div><div class="big">AKSHAY</div><div class="big">YOGYA</div></div>';
          scene(id, NIGHT, 1920, 1080, w, cr);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 322);
          Object.keys(SEATS).forEach(function (k, i) {
            beat("#" + id + "-" + k + " > svg", t + (i % 2) * BP / 2, d, 10);
            if (k !== "prag") for (var b = 0; b < 8; b += 2) swap(id + "-" + k, "expr", (b / 2 + i) % 2 ? "eyesmile" : "grin", B(214 + b));
          });
          swap(id + "-prag", "expr", "grin", B(217));
          tl.fromTo("#" + id + "-cr", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, t + 0.2);
          push(id, t, d, 1.0, 1.08, "55% 60%");
        })();

        // c05 — lying back, looking up (top-down)
        (function () {
          var id = "c05", ring = "";
          CREW.forEach(function (k, i) {
            var a = (i / CREW.length) * 360 - 90, rad = (a * Math.PI) / 180, cx = 960 + Math.cos(rad) * 290, cy = 540 + Math.sin(rad) * 290;
            ring += '<div class="abs" style="left:' + (cx - 160).toFixed(0) + "px;top:" + (cy - 150).toFixed(0) + "px;width:320px;height:300px;transform:rotate(" + (a - 90).toFixed(0) + 'deg)"><div class="abs" id="' + id + "-h" + i + '" style="left:0;top:0;width:320px;height:300px">' + Chibi.headSVG(k, { expr: i % 2 ? "sparkle" : "lookup" }) + "</div></div>";
          });
          var w = box(260, 60, 1400, 960, "background:#E9EBEE;border:10px solid " + INK + ";border-radius:300px") + box(320, 120, 1280, 840, "background:rgba(40,52,70,.22);border-radius:260px");
          w += '<div class="abs" id="' + id + '-ring" style="left:0;top:0;width:1920px;height:1080px">' + ring + "</div>";
          var sx = [150, 1770, 110, 1810, 60, 1860, 960, 960], sy = [160, 200, 880, 860, 520, 540, 30, 1050];
          for (var s = 0; s < 8; s++) w += spark(id + "-s" + s, sx[s], sy[s], 50 + (s % 3) * 14);
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#" + id + "-ring", { rotation: 0, transformOrigin: "960px 540px" }, { rotation: 24, duration: d, ease: "none" }, t);
          CREW.forEach(function (k, i) { tl.fromTo("#" + id + "-h" + i, { y: 0 }, { y: -10, duration: BP, ease: "sine.inOut", repeat: reps(d, BP), yoyo: true }, t + (i % 2) * BP / 2); });
          for (var q = 0; q < 8; q++) tl.fromTo("#" + id + "-s" + q, { scale: 0.4, opacity: 0.3, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: BP, ease: "sine.inOut", repeat: reps(d, BP), yoyo: true }, t + (q % 4) * BP / 2);
          push(id, t, d, 1.1, 1.0);
        })();

        // c06 — hands in: JST
        (function () {
          var id = "c06", arms = "";
          var SLV = { prag: "#141416", krish: "#1f1f25", nimai: "#1d1d22", bedi: "#232329", athul: "#2F48CC", akshay: "#A9C2DA", yogya: "#e9e8e2", bigt: "#CDBF9F" };
          CREW.forEach(function (k, i) {
            var a = -90 + i * (360 / CREW.length) + 20, skin = Chibi.CAST[k].skin, hx = 40 + i * 10, ss = k === "athul" ? 860 : 540;
            var inner = '<svg class="abs" style="left:0;top:-110px;overflow:visible" width="1300" height="220" viewBox="0 -110 1300 220">' +
              '<path d="M' + hx + ',0 L1400,0" stroke="' + INK + '" stroke-width="118" stroke-linecap="round"/><path d="M' + hx + ',0 L1400,0" stroke="' + skin + '" stroke-width="100" stroke-linecap="round"/>' +
              '<path d="M' + ss + ',0 L1400,0" stroke="' + INK + '" stroke-width="150"/><path d="M' + (ss + 9) + ',0 L1400,0" stroke="' + SLV[k] + '" stroke-width="132"/>' +
              '<circle cx="' + hx + '" cy="0" r="78" fill="' + skin + '" stroke="' + INK + '" stroke-width="9"/></svg>';
            arms += '<div class="abs" data-layout-allow-overflow style="left:960px;top:560px;width:1px;height:1px;transform:rotate(' + a.toFixed(1) + 'deg)"><div class="abs" data-layout-allow-overflow id="' + id + "-a" + i + '" style="left:0;top:0;width:1px;height:1px">' + inner + "</div></div>";
          });
          var w = focusLines(331, "#FFF7DA") + arms + tp(id + "-t", 960, 540, "JST!!", 260, true);
          scene(id, FOCUS_BG, 1920, 1080, w);
          var t = T(id), d = D(id);
          CREW.forEach(function (k, i) { tl.fromTo("#" + id + "-a" + i, { x: 1400 }, { x: 0, duration: 0.18, ease: "power3.out" }, B(230 + i * 0.8)); shake("#" + id + "-in", B(230 + i * 0.8) + 0.18, 0.08, 5, 330 + i); });
          popIn("#" + id + "-t", B(237), -6);
          shake("#" + id + "-in", B(237), 0.3, 12, 339);
          push(id, t, d, 1.0, 1.1);
        })();

        // c07 — easy come, easy go
        (function () {
          var id = "c07", fan = "";
          for (var f = 0; f < 5; f++) fan += '<g transform="translate(20,-60) rotate(' + (-50 + f * 25) + ')"><rect x="-10" y="-64" width="20" height="60" rx="3" fill="#8FD18B" stroke="' + INK + '" stroke-width="2.4"/></g>';
          var w = lookoutBG(341);
          w += A("bigt", { id: id + "-kr", x: 620, y: 1120, s: 2.1, expr: ["smug", "shock", "cry"], poses: ["hold", "up"], inFront: '<g class="fan">' + fan + "</g>" });
          w += A("prag", { id: id + "-pr", x: 1380, y: 1120, s: 2.1, expr: ["neutral", "grin"], poses: ["down", "point"] });
          var r = P(342);
          for (var b = 0; b < 16; b++) w += BILL(id + "-bi" + b, 630 + r() * 80, 860 + r() * 60);
          w += '<div class="abs" id="' + id + '-wind" style="left:0;top:0;opacity:0">' + speedLines(id + "-sl", 343, "#dfeaff", 26) + "</div>";
          w += tp(id + "-t", 960, 150, "EASY COME, EASY GO", 96, true);
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id), gust = B(240);
          twinkle("#" + id + " .tw", t, d, 344);
          tl.fromTo("#" + id + "-kr .fan", { rotation: -10, svgOrigin: "20 -60" }, { rotation: 10, svgOrigin: "20 -60", duration: 0.15, ease: "sine.inOut", repeat: reps(gust - t, 0.15), yoyo: true }, t);
          tl.to("#" + id + "-wind", { opacity: 1, duration: 0.1 }, gust);
          tl.fromTo("#" + id + "-sl", { x: 0 }, { x: -1800, duration: 0.4, ease: "none", repeat: reps(t + d - gust, 0.4) }, gust);
          tl.set("#" + id + "-kr .fan", { opacity: 0 }, gust);
          for (var q = 0; q < 16; q++) tl.fromTo("#" + id + "-bi" + q, { x: 0, y: 0, rotation: 0, opacity: 0 }, { x: 900 + r() * 700, y: -500 - r() * 400, rotation: (r() * 2 - 1) * 720, opacity: 1, duration: 1.0 + r() * 0.6, ease: "power1.out" }, gust + q * 0.03);
          swap(id + "-kr", "expr", "shock", gust); swap(id + "-kr", "pose", "up", gust); swap(id + "-kr", "expr", "cry", B(241.5));
          shake("#" + id + "-kr", gust, 0.4, 8, 345);
          swap(id + "-pr", "expr", "grin", B(241)); swap(id + "-pr", "pose", "point", B(241));
          beat("#" + id + "-pr > svg", B(241), t + d - B(241), 16);
          popIn("#" + id + "-t", B(242), -4);
          push(id, t, d, 1.0, 1.06);
        })();

        // c08 — together, from behind
        (function () {
          var id = "c08";
          var w = lookoutBG(351) + tesla(id + "-car", 500, 530, "") + carCrew(id, "back");
          var cr = '<div class="credit" id="' + id + '-cr" style="left:90px;top:80px"><div>制作</div><div class="big">JST</div></div>';
          scene(id, NIGHT, 1920, 1080, w, cr);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 352);
          Object.keys(SEATS).forEach(function (k) { tl.fromTo("#" + id + "-" + k, { rotation: -4 }, { rotation: 4, duration: BP * 2, ease: "sine.inOut", repeat: reps(d, BP * 2), yoyo: true }, t); });
          tl.fromTo("#" + id + "-cr", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, t + 0.2);
          push(id, t, d, 1.0, 1.1, "50% 60%");
        })();

        // c09 — Prag looks up
        (function () {
          var id = "c09";
          var w = starField(361, 1920, 1080, 260) + moon(1500, 110, 150);
          w += A("prag", { id: id + "-pr", x: 960, y: 1180, s: 3.0, expr: ["lookup", "eyesmile"] });
          var sx = [300, 1650, 420, 1500, 200, 1750], sy = [200, 300, 520, 620, 820, 860];
          for (var s = 0; s < 6; s++) w += spark(id + "-s" + s, sx[s], sy[s], 40 + (s % 3) * 16, "#FFF6C8");
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 362);
          for (var q = 0; q < 6; q++) tl.fromTo("#" + id + "-s" + q, { scale: 0.4, opacity: 0.3, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: BP, ease: "sine.inOut", repeat: reps(d, BP), yoyo: true }, t + (q % 3) * BP / 2);
          tl.fromTo("#" + id + "-pr-head", { rotation: -2, svgOrigin: J.neck }, { rotation: 2, svgOrigin: J.neck, duration: BP * 2, ease: "sine.inOut", repeat: reps(d, BP * 2), yoyo: true }, t);
          swap(id + "-pr", "expr", "eyesmile", B(258));
          push(id, t, d, 1.0, 1.1, "50% 40%");
        })();

        // c10 — the shooting star
        (function () {
          var id = "c10";
          var w = lookoutBG(371, false) + tesla(id + "-car", 500, 530, "") + carCrew(id, "front", ["lookup", "sparkle"], function (k) { return k === "prag" ? ["down", "pointUp"] : ["down", "cheer"]; });
          w += svg(0, 0, 440, 80, '<defs><linearGradient id="' + id + '-g" x1="0" x2="1"><stop offset="0" stop-color="#FFF6C8" stop-opacity="1"/><stop offset="1" stop-color="#FFF6C8" stop-opacity="0"/></linearGradient></defs><path d="M20,40 L440,28 L440,52 Z" fill="url(#' + id + '-g)"/><circle cx="20" cy="40" r="17" fill="#FFFBEA"/>', id + "-ss", ' opacity="0"');
          scene(id, NIGHT, 1920, 1080, w);
          var t = T(id), d = D(id), st = B(263);
          twinkle("#" + id + " .tw", t, d, 372);
          tl.set("#" + id + "-ss", { opacity: 1 }, st);
          tl.fromTo("#" + id + "-ss", { x: 1750, y: 60, rotation: -13, transformOrigin: "20px 40px" }, { x: 150, y: 430, rotation: -13, duration: 0.9, ease: "power1.in" }, st);
          tl.to("#" + id + "-ss", { opacity: 0, duration: 0.15 }, st + 0.8);
          Object.keys(SEATS).forEach(function (k, i) {
            swap(id + "-" + k, "expr", "sparkle", st + 0.3 + i * 0.04);
            swap(id + "-" + k, "pose", k === "prag" ? "pointUp" : "cheer", st + 0.35 + i * 0.05);
            beat("#" + id + "-" + k + " > svg", st + 0.4, t + d - st - 0.4, 22);
          });
          push(id, t, d, 1.0, 1.05, "50% 80%");
        })();

        // c11 — 流れ星
        (function () {
          var id = "c11";
          var w = starField(381, 1920, 1080, 300) + moon(1560, 90, 120);
          w += svg(0, 0, 1920, 1080, '<path d="M-20,1100 L-20,900 Q500,850 960,880 Q1400,910 1940,860 L1940,1100 Z" fill="#0b1422"/>');
          w += '<div class="abs" style="left:0;top:0;width:1920px;height:1080px;filter:brightness(0.14)">' + G("", 390, 377, 0.6, tesla(id + "-car", 500, 530, "") + carCrew(id, "back")) + "</div>";
          w += '<div class="abs pop" id="' + id + '-title" style="left:0;top:230px;width:1920px;line-height:1;text-align:center;font-size:230px;color:#FFF3C4;text-shadow:0 0 40px rgba(255,230,150,.6), 8px 10px 0 #1d1a17">流れ星</div>';
          w += '<div class="abs pop" id="' + id + '-sub" style="left:0;top:560px;width:1920px;line-height:1;text-align:center;font-size:62px;letter-spacing:.2em;color:#F4E9BC">SHOOTING STAR</div>';
          w += spark(id + "-sp0", 560, 290, 70) + spark(id + "-sp1", 1380, 270, 56) + spark(id + "-sp2", 1320, 560, 44);
          scene(id, "background:radial-gradient(ellipse at 50% 30%, #1a3558 0%, #0c1b33 60%, #050b16 100%)", 1920, 1080, w);
          var t = T(id), d = D(id);
          twinkle("#" + id + " .tw", t, d, 382);
          tl.fromTo("#" + id + "-title", { opacity: 0, scale: 0.92, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, B(269));
          tl.fromTo("#" + id + "-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, B(270));
          pop("#" + id + "-sp0", B(269.5)); pop("#" + id + "-sp1", B(270)); pop("#" + id + "-sp2", B(270.5));
          push(id, t, d, 1.0, 1.05, "50% 40%");
          tl.set("#fader", { backgroundColor: "#000000" }, 88.0);
          tl.fromTo("#fader", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power1.in", immediateRender: false }, 88.35);
        })();
