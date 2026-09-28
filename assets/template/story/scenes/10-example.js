        // s01 — title card: the crew pops in one per beat
        (function () {
          var id = "s01", w = focusLines(11, "#FFF7DA");
          CREW.forEach(function (k, i) {
            w += A(k, { id: id + "-" + k, x: (1920 * (i + 0.5)) / CREW.length, y: 1000, s: 1.3, expr: ["neutral", "sparkle"], poses: ["down", "cheer"] });
          });
          w += tp(id + "-t", 960, 190, "MY CHIBI VIDEO", 120, true);
          scene(id, FOCUS_BG, 1920, 1080, w);
          var t = T(id), d = D(id);
          tl.fromTo("#fader", { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power1.out" }, 0);
          CREW.forEach(function (k, i) {
            popIn("#" + id + "-" + k, B(1 + i), i % 2 ? 4 : -4);
            swap(id + "-" + k, "expr", "sparkle", B(3 + i));
            swap(id + "-" + k, "pose", "cheer", B(3 + i));
            beat("#" + id + "-" + k + " > svg", B(3 + i), t + d - B(3 + i), 14);
          });
          popIn("#" + id + "-t", B(6), -4);
          push(id, t, d, 1.0, 1.06);
        })();

        // s02 — everyone runs off screen
        (function () {
          var id = "s02", w = svg(0, 0, 1920, 1080, '<rect x="-10" y="880" width="1940" height="220" fill="#2a2336" stroke="' + INK + '" stroke-width="6"/>');
          CREW.forEach(function (k, i) { w += A(k, { id: id + "-" + k, x: 200 + i * 170, y: 900, s: 1.0, expr: ["grin"] }); });
          scene(id, ROOM, 1920, 1080, w);
          var t = T(id), d = D(id);
          CREW.forEach(function (k, i) {
            var st = t + 0.1 + i * 0.1;
            tl.fromTo("#" + id + "-" + k, { x: 0 }, { x: 2000, duration: 1.2, ease: "none" }, st);
            run(id + "-" + k, st, 1.2, 0.2, 40, 14);
          });
          tl.fromTo("#fader", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.in", immediateRender: false }, t + d - 0.45);
        })();
