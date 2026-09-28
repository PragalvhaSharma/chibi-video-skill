/* Chibi character kit — flat colours, thick ink outlines, giant heads,
   in a generic anime-ending chibi style. Characters are registered per
   project with Chibi.addCast({...}) (see assets/cast.js).
   Every drawing is plain SVG with the feet at (0,0). */
(function (global) {
  "use strict";

  var INK = "#1d1a17";
  var HAIR = "#241d1c";
  var HAIR_HI = "#4a3c3d";
  var W = 5;

  /* ---------- cast: filled by Chibi.addCast() from assets/cast.js ---------- */
  var CAST = {};
  var ORDER = [];
  function addCast(map) {
    Object.keys(map).forEach(function (k) {
      if (!CAST[k]) ORDER.push(k);
      CAST[k] = map[k];
    });
  }

  var OUTFIT = {
    santos: { fill: "#F7F4EC", sleeve: 0.62 },
    tokyo: { fill: "#1c1c21", sleeve: 0.66 },
    brownpolo: { fill: "#8C5646", sleeve: 0.6 },
    greyhenley: { fill: "#6F7376", sleeve: 0.6 },
    polo: { fill: "#1f2a43", sleeve: 0.6 },
    hoodie: { fill: "#26262c", sleeve: 1.0 },
    henley: { fill: "#1f1f25", sleeve: 1.0 },
    navyshirt: { fill: "#1d2640", sleeve: 0.8 },
    blacktee: { fill: "#1d1d22", sleeve: 0.55 },
    overshirt: { fill: "#232329", sleeve: 0.62 },
    vultures: { fill: "#141416", sleeve: 1.0 },
    bluepolo: { fill: "#2F48CC", sleeve: 0.55 },
    denim: { fill: "#A9C2DA", sleeve: 1.0 },
    workjacket: { fill: "#CDBF9F", sleeve: 1.0 },
    buffalo: { fill: "#F1F0EA", sleeve: 1.0, pattern: true }
  };
  var CUR_ID = "";
  function outfitFill(of) { return of.pattern ? "url(#" + CUR_ID + "-pat)" : of.fill; }
  function checkPattern(id) {
    return '<defs><pattern id="' + id + '-pat" patternUnits="userSpaceOnUse" width="30" height="30" x="-15" y="-15">' +
      '<rect width="30" height="30" fill="#8d8d8f"/><rect width="15" height="15" fill="#1a1a1d"/><rect x="15" y="15" width="15" height="15" fill="#F1F0EA"/>' +
      '<path d="M15,2 l13,0 M15,6 l13,0 M15,10 l13,0 M2,17 l0,12 M6,17 l0,12 M10,17 l0,12" stroke="#b9b9bb" stroke-width="1.2" opacity=".7"/></pattern></defs>';
  }

  var BURNT = { skin: "#3b322d", fill: "#2c2724", pants: "#2c2724", shoes: "#2c2724" };

  /* ---------- helpers ---------- */
  function f(n) { return Math.round(n * 10) / 10; }
  function pts(p) { return "M" + p.map(function (q) { return f(q[0]) + "," + f(q[1]); }).join(" L"); }

  function prng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* outline pass + fill pass = one merged silhouette with a single ink edge */
  function merged(shapes, fill, extraFill) {
    var o = shapes.join("");
    return (
      '<g fill="' + INK + '" stroke="' + INK + '" stroke-width="' + W * 2 + '" stroke-linejoin="round">' + o + "</g>" +
      '<g fill="' + fill + '" stroke="none">' + o + (extraFill || "") + "</g>"
    );
  }
  function circ(x, y, r) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '"/>'; }
  function pth(d) { return '<path d="' + d + '"/>'; }

  function headPath(w, chub) {
    var top = -262, mid = -182, bot = -86, jw = w * 0.72 * chub;
    return "M0," + top + " C" + f(w * 0.62) + "," + top + " " + w + "," + (top + 28) + " " + w + "," + mid +
      " C" + w + "," + (mid + 50) + " " + f(jw) + "," + bot + " 0," + bot +
      " C" + f(-jw) + "," + bot + " " + -w + "," + (mid + 50) + " " + -w + "," + mid +
      " C" + -w + "," + (top + 28) + " " + f(-w * 0.62) + "," + top + " 0," + top + " Z";
  }

  function ring(cx, cy, rx, ry, a0, a1, step, r) {
    var out = [];
    for (var a = a0; a <= a1 + 0.01; a += step) {
      var t = (a * Math.PI) / 180;
      out.push(circ(cx + rx * Math.cos(t), cy + ry * Math.sin(t), r));
    }
    return out;
  }

  function curlTex(list) {
    return list.map(function (c) {
      var x = c[0], y = c[1], s = c[2] || 7;
      return '<path d="M' + f(x - s) + "," + f(y) + " a" + s + " " + s + " 0 1 1 " + f(s) + "," + f(s) + '" fill="none" stroke="' + HAIR_HI + '" stroke-width="3" stroke-linecap="round"/>';
    }).join("");
  }
  function strands(list) {
    return list.map(function (d) {
      return '<path d="' + d + '" fill="none" stroke="' + HAIR_HI + '" stroke-width="3.2" stroke-linecap="round"/>';
    }).join("");
  }

  /* ---------- hair (front) ---------- */
  var DURAG = "#3f4550";
  /* pieces that hang behind the head in the front view (durag tails) */
  function hairBehind(style) {
    if (style !== "durag") return "";
    return '<g class="tails"><path d="M58,-222 C112,-204 132,-146 116,-92 L98,-96 C110,-142 98,-186 50,-206 Z" fill="' + DURAG + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M-58,-222 C-108,-206 -124,-156 -112,-108 L-96,-112 C-104,-152 -94,-190 -50,-206 Z" fill="' + DURAG + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/></g>';
  }
  function hairFront(style, w, hairCol) {
    var c = hairCol || HAIR;
    if (style === "durag") {
      var dd = "M-97,-174 C-106,-238 -66,-286 0,-288 C66,-286 106,-238 97,-174 C70,-198 40,-214 0,-216 C-40,-214 -70,-198 -97,-174 Z";
      return '<path d="' + dd + '" fill="' + DURAG + '" stroke="' + INK + '" stroke-width="' + W + '" stroke-linejoin="round"/>' +
        '<path d="M0,-286 L0,-217" stroke="#5d6470" stroke-width="3.2"/><path d="M-93,-186 C-60,-208 60,-208 93,-186" stroke="#2c3038" stroke-width="4" fill="none"/>' +
        '<path d="M-62,-262 C-44,-276 -24,-281 -8,-283" stroke="#6c7482" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>';
    }
    if (style === "curls") {
      var s = ring(0, -202, 84, 70, 180, 360, 20, 31)
        .concat([circ(-92, -178, 25), circ(92, -178, 25), circ(-90, -156, 17), circ(90, -156, 17)])
        .concat([circ(-34, -292, 28), circ(14, -300, 30), circ(56, -282, 24), circ(-66, -276, 22)])
        .concat([circ(-64, -222, 20), circ(-38, -216, 22), circ(-12, -222, 22), circ(14, -216, 22), circ(40, -222, 22), circ(66, -216, 19)]);
      return merged(s, c, '<ellipse cx="0" cy="-246" rx="80" ry="40"/>') +
        curlTex([[-34, -290, 9], [14, -298, 10], [58, -280, 8], [-64, -250, 8], [70, -246, 8], [-12, -258, 8], [30, -262, 8], [-40, -222, 7], [14, -218, 7], [-90, -180, 7], [90, -182, 7]]);
    }
    if (style === "mop") {
      var sm = ring(0, -206, 86, 62, 180, 360, 20, 28)
        .concat([circ(-94, -180, 22), circ(94, -180, 22), circ(-90, -160, 15), circ(90, -160, 15)])
        .concat([circ(-26, -282, 26), circ(22, -284, 26)])
        .concat([circ(-66, -220, 19), circ(-40, -212, 21), circ(-14, -218, 21), circ(12, -210, 21), circ(38, -218, 20), circ(64, -214, 18)]);
      return merged(sm, c, '<ellipse cx="0" cy="-244" rx="80" ry="36"/>') +
        curlTex([[-26, -280, 8], [22, -282, 8], [-64, -248, 7], [66, -246, 7], [-8, -254, 7], [34, -250, 7], [-40, -216, 6], [12, -212, 6], [-92, -182, 6], [92, -184, 6]]);
    }
    if (style === "curlyShort") {
      var s2 = ring(0, -198, 98, 62, 180, 360, 20, 26)
        .concat([circ(-106, -176, 19), circ(106, -176, 19)])
        .concat([circ(-22, -272, 24), circ(22, -274, 24)])
        .concat([circ(-72, -224, 18), circ(-44, -220, 19), circ(-15, -226, 19), circ(15, -220, 19), circ(44, -226, 19), circ(72, -220, 18)]);
      return merged(s2, c, '<ellipse cx="0" cy="-240" rx="92" ry="30"/>') +
        curlTex([[-22, -272, 8], [22, -272, 8], [-80, -236, 7], [80, -236, 7], [-44, -222, 6], [15, -222, 6], [-15, -244, 6], [48, -250, 7]]);
    }
    if (style === "fringe") {
      var df = "M-104,-150 L-112,-168 L-102,-176 C-112,-238 -74,-276 -20,-280 L-8,-290 L4,-279 C64,-278 106,-244 104,-178 L114,-170 L104,-156 L94,-172 L90,-194 L78,-186 L72,-210 L60,-190 L50,-212 L38,-188 L24,-209 L12,-186 L-2,-210 L-16,-187 L-30,-211 L-44,-189 L-58,-212 L-70,-188 L-82,-202 L-90,-180 Z";
      return merged([pth(df)], c) +
        strands(["M-70,-246 Q-58,-228 -54,-210", "M-36,-262 Q-28,-238 -26,-212", "M0,-268 Q4,-240 6,-212", "M36,-262 Q36,-236 32,-212", "M70,-246 Q64,-228 60,-210"]);
    }
    if (style === "sideFringe") {
      /* Prag's Bitmoji: side part on the left, fringe swept across to the right in pointed chunks */
      var dsf = "M-100,-150 L-106,-178 C-112,-244 -66,-288 -2,-290 C66,-290 112,-246 102,-176 L100,-150 L92,-166 L96,-184 L82,-176 L80,-200 L66,-182 L60,-210 L46,-190 L38,-218 L24,-198 L14,-226 L0,-206 L-12,-232 L-26,-212 L-40,-238 L-54,-216 L-66,-236 L-78,-206 L-88,-210 L-92,-180 Z";
      return merged([pth(dsf)], c) +
        strands(["M-66,-268 C-40,-262 -8,-246 14,-226", "M-30,-276 C0,-270 30,-250 52,-222", "M10,-282 C44,-272 70,-248 84,-212", "M-86,-240 C-70,-250 -52,-248 -40,-238"]);
    }
    if (style === "sidePart") {
      /* Yogya: short and neat, part on the left, top brushed up and over */
      var dsp = "M-94,-176 C-104,-236 -80,-280 -30,-292 C12,-306 66,-294 90,-262 C104,-240 102,-206 94,-176 C90,-194 86,-206 78,-214 C58,-224 30,-230 4,-228 C-16,-230 -36,-236 -50,-248 C-58,-234 -74,-222 -84,-210 C-90,-200 -92,-190 -94,-176 Z";
      return merged([pth(dsp)], c) +
        strands(["M-50,-248 C-30,-274 16,-286 62,-274", "M-36,-240 C-8,-262 34,-266 78,-248", "M-70,-240 C-66,-256 -58,-268 -46,-278"]);
    }
    if (style === "curtain") {
      /* Krish: longer wavy hair, parted near the middle, curtains falling to the temples */
      var dcu = "M-100,-150 C-112,-232 -78,-292 -6,-296 C70,-296 114,-238 100,-150 C94,-172 88,-190 74,-204 C60,-214 46,-220 32,-220 C44,-206 46,-192 40,-182 C30,-204 14,-226 -6,-250 C-22,-228 -38,-210 -46,-190 C-50,-202 -48,-214 -40,-222 C-60,-220 -78,-206 -88,-186 C-94,-174 -98,-162 -100,-150 Z";
      return merged([pth(dcu)], c) +
        strands(["M-6,-250 C-14,-270 -34,-282 -62,-276", "M-6,-250 C4,-272 30,-284 60,-276", "M-60,-252 C-78,-240 -90,-214 -94,-180", "M52,-254 C74,-240 90,-214 94,-182", "M-20,-236 C-30,-222 -38,-210 -42,-196"]);
    }
    if (style === "messy") {
      /* Nimai: tousled chunks falling over the forehead, a little volume on top */
      var dme = "M-102,-150 C-114,-240 -76,-296 0,-298 C78,-298 114,-240 102,-150 L94,-172 L100,-196 L80,-186 L84,-214 L62,-198 L58,-230 L40,-206 L28,-234 L12,-204 L-4,-232 L-20,-202 L-34,-230 L-50,-206 L-62,-228 L-72,-200 L-92,-210 L-90,-182 Z";
      var tufts = "M-52,-286 C-50,-304 -30,-310 -18,-296 C-10,-312 14,-314 20,-298 C30,-308 46,-300 42,-284 Z";
      return merged([pth(dme), pth(tufts)], c) +
        strands(["M-60,-262 C-50,-246 -44,-232 -40,-214", "M-14,-278 C-12,-260 -8,-244 -6,-222", "M28,-274 C32,-256 38,-240 44,-216", "M66,-254 C72,-238 76,-222 76,-204"]);
    }
    if (style === "quiffTall") {
      /* Akshay: tall, messy quiff pushed up and back, one strand falling forward */
      var dqt = "M-90,-184 C-100,-232 -92,-270 -70,-296 L-80,-326 L-50,-312 L-46,-344 L-20,-320 L-6,-352 L14,-322 L38,-346 L44,-314 L72,-328 L68,-298 C90,-280 100,-242 90,-184 C84,-204 78,-218 66,-226 C50,-236 36,-240 26,-252 C18,-238 0,-232 -14,-234 C-22,-222 -28,-210 -32,-196 C-36,-212 -42,-222 -56,-226 C-70,-220 -82,-206 -90,-184 Z";
      return merged([pth(dqt)], c) +
        strands(["M-56,-244 C-54,-274 -40,-300 -20,-318", "M-10,-246 C0,-280 16,-304 36,-330", "M30,-256 C46,-276 58,-296 64,-316", "M-78,-218 C-78,-250 -70,-280 -56,-302"]);
    }
    if (style === "tight") {
      var st = ring(0, -206, 84, 60, 180, 360, 15, 20)
        .concat(ring(0, -214, 58, 42, 195, 345, 25, 18))
        .concat([circ(-90, -184, 15), circ(90, -184, 15)])
        .concat([circ(-60, -230, 14), circ(-36, -228, 15), circ(-10, -232, 15), circ(16, -228, 15), circ(42, -232, 15), circ(64, -228, 14)]);
      return merged(st, c, '<ellipse cx="0" cy="-246" rx="76" ry="34"/>') +
        curlTex([[-50, -262, 6], [-20, -276, 6], [12, -278, 6], [44, -266, 6], [-66, -236, 5], [-8, -248, 6], [30, -246, 6], [70, -240, 5], [-36, -228, 5], [16, -228, 5]]);
    }
    if (style === "textured") {
      var sL = "M-94,-166 C-100,-210 -92,-240 -70,-254 L-56,-230 C-74,-222 -85,-200 -87,-166 Z";
      var sR = "M94,-166 C100,-210 92,-240 70,-254 L56,-230 C74,-222 85,-200 87,-166 Z";
      var tx = ring(0, -250, 76, 26, 180, 360, 15, 19)
        .concat([circ(-40, -272, 18), circ(-10, -278, 19), circ(22, -277, 19), circ(50, -268, 17)])
        .concat([circ(-60, -236, 15), circ(-37, -230, 16), circ(-12, -233, 16), circ(13, -228, 16), circ(38, -233, 15), circ(60, -240, 13)]);
      return merged([pth(sL), pth(sR), pth("M-80,-246 C-60,-268 60,-268 80,-246 L80,-236 L-80,-236 Z")].concat(tx), c, '<ellipse cx="0" cy="-252" rx="72" ry="20"/>') +
        curlTex([[-40, -270, 6], [-10, -276, 6], [22, -275, 6], [50, -266, 6], [-60, -250, 5], [-24, -254, 5], [6, -252, 5], [36, -252, 5], [66, -248, 5], [-40, -232, 5], [14, -230, 5]]);
    }
    if (style === "fade") {
      var side = "M-90,-150 C-96,-200 -84,-236 -60,-250 L-50,-222 C-68,-214 -80,-196 -84,-150 Z M90,-150 C96,-200 84,-236 60,-250 L50,-222 C68,-214 80,-196 84,-150 Z";
      var top = ring(0, -250, 62, 34, 180, 360, 20, 22).concat([circ(-26, -290, 20), circ(12, -296, 21), circ(44, -284, 18)]).concat([circ(-44, -232, 16), circ(-20, -228, 17), circ(6, -232, 17), circ(32, -228, 16), circ(52, -234, 14)]);
      return '<path d="' + side + '" fill="' + c + '" opacity=".55"/>' + merged(top, c, '<ellipse cx="0" cy="-262" rx="58" ry="26"/>') +
        curlTex([[-26, -288, 7], [12, -294, 7], [44, -282, 6], [-50, -258, 6], [-8, -262, 6], [30, -258, 6], [58, -252, 5]]);
    }
    if (style === "quiff") {
      var dq = "M-88,-186 C-96,-230 -86,-272 -58,-294 C-36,-312 -4,-318 24,-314 C54,-310 80,-294 90,-266 C97,-244 94,-212 88,-186 C84,-204 78,-218 68,-226 C54,-234 42,-240 32,-254 C24,-240 8,-232 -8,-236 C-26,-238 -42,-232 -56,-226 C-70,-220 -82,-206 -88,-186 Z";
      return merged([pth(dq)], c) + strands(["M-60,-240 C-50,-270 -26,-292 4,-302", "M-20,-244 C-8,-272 16,-292 44,-298", "M30,-256 C44,-276 62,-284 80,-278", "M-78,-212 C-74,-240 -62,-262 -44,-276"]);
    }
    if (style === "crop") {
      var d = "M-97,-186 C-102,-238 -64,-275 0,-277 C64,-275 102,-238 97,-186 L91,-196 L85,-212 L73,-220 L62,-216 L51,-229 L37,-224 L24,-233 L10,-226 L-4,-234 L-18,-226 L-32,-233 L-46,-224 L-58,-229 L-71,-219 L-83,-212 L-91,-196 Z";
      return merged([pth(d)], c) + strands(["M-60,-252 Q-40,-262 -20,-258", "M20,-262 Q44,-262 62,-250"]);
    }
    if (style === "neat") {
      var d2 = "M-92,-184 C-101,-222 -95,-262 -70,-283 C-53,-301 -20,-307 4,-301 C31,-311 67,-299 85,-276 C101,-256 101,-222 92,-184 C88,-199 84,-209 76,-217 C60,-231 40,-225 24,-235 C8,-225 -14,-231 -30,-225 C-50,-231 -66,-221 -78,-211 C-86,-203 -90,-195 -92,-184 Z";
      return merged([pth(d2)].concat(ring(0, -250, 74, 50, 200, 340, 20, 20)), c) + curlTex([[-60, -278, 7], [-30, -292, 7], [4, -298, 7], [36, -292, 7], [64, -276, 7], [-40, -250, 6], [20, -256, 6]]) + strands(["M-70,-240 C-54,-250 -40,-246 -26,-252", "M30,-252 C44,-258 60,-252 72,-240"]);
    }
    if (style === "swept") {
      var d3 = "M-88,-184 C-98,-228 -88,-266 -62,-286 C-50,-296 -38,-294 -30,-302 C-18,-312 -2,-304 8,-310 C22,-318 40,-306 52,-304 C72,-300 88,-284 93,-260 C98,-238 96,-210 88,-184 C84,-204 78,-220 64,-230 C40,-244 18,-236 0,-242 C-20,-236 -44,-244 -62,-232 C-76,-222 -84,-204 -88,-184 Z";
      return merged([pth(d3)], c) +
        strands(["M-56,-240 C-48,-264 -30,-282 -10,-294", "M-14,-244 C-4,-268 16,-284 36,-294", "M28,-238 C42,-258 58,-272 78,-276", "M-76,-214 C-72,-236 -62,-252 -48,-264"]) +
        curlTex([[-30, -290, 6], [10, -298, 6], [52, -290, 6]]);
    }
    if (style === "wavy") {
      var d4 = "M-86,-184 C-96,-224 -92,-262 -64,-286 C-52,-298 -38,-298 -28,-306 C-14,-316 4,-310 16,-314 C34,-318 56,-306 70,-292 C86,-276 96,-250 92,-222 C90,-206 88,-194 86,-184 C82,-200 76,-214 64,-224 C48,-236 28,-234 12,-238 C-2,-236 -14,-232 -22,-224 C-30,-214 -24,-200 -34,-194 C-40,-206 -46,-214 -58,-218 C-72,-214 -82,-200 -86,-184 Z";
      return merged([pth(d4)], c) +
        strands(["M-66,-262 C-46,-280 -22,-280 -4,-292", "M6,-286 C28,-296 54,-288 72,-266", "M-4,-250 C12,-258 30,-254 44,-262", "M-28,-222 C-24,-212 -30,-204 -34,-198"]);
    }
    return "";
  }

  /* ---------- hair (back view) ---------- */
  function hairBack(style, w, hairCol) {
    var c = hairCol || HAIR;
    var base = "M" + (-w - 5) + ",-150 C" + (-w - 9) + ",-232 -62,-280 0,-282 C62,-280 " + (w + 9) + ",-232 " + (w + 5) + ",-150 C" + w + ",-118 60,-106 0,-104 C-60,-106 " + -w + ",-118 " + (-w - 5) + ",-150 Z";
    if (style === "durag") {
      var db = "M" + (-w - 3) + ",-158 C" + (-w - 8) + ",-236 -62,-286 0,-288 C62,-286 " + (w + 8) + ",-236 " + (w + 3) + ",-158 C" + (w - 20) + ",-150 60,-146 0,-146 C-60,-146 " + (-w + 20) + ",-150 " + (-w - 3) + ",-158 Z";
      return '<path d="' + db + '" fill="' + DURAG + '" stroke="' + INK + '" stroke-width="' + W + '" stroke-linejoin="round"/><path d="M0,-286 L0,-150" stroke="#5d6470" stroke-width="3.2"/>' +
        '<g class="tails"><path d="M-8,-152 C-18,-122 -30,-96 -38,-62 L-20,-60 C-14,-94 -4,-120 6,-148 Z" fill="' + DURAG + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/><path d="M8,-152 C20,-124 32,-98 42,-66 L24,-62 C16,-96 6,-120 -4,-148 Z" fill="' + DURAG + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/></g>' +
        '<circle cx="0" cy="-152" r="13" fill="' + DURAG + '" stroke="' + INK + '" stroke-width="4"/>';
    }
    if (style === "textured") {
      return merged([pth(base)].concat(ring(0, -252, 66, 40, 180, 360, 20, 22)), c) + curlTex([[-40, -270, 6], [0, -282, 6], [40, -270, 6], [-20, -230, 6], [24, -226, 6], [-50, -196, 5], [50, -196, 5]]);
    }
    if (style === "fade") {
      var ft = ring(0, -236, 60, 44, 0, 340, 20, 22).concat([circ(-20, -284, 20), circ(20, -288, 20)]);
      return '<path d="M' + (-w - 3) + ',-150 C' + (-w - 6) + ',-220 -60,-262 0,-264 C60,-262 ' + (w + 6) + ',-220 ' + (w + 3) + ',-150 C' + w + ',-122 60,-110 0,-108 C-60,-110 ' + -w + ',-122 ' + (-w - 3) + ',-150 Z" fill="' + c + '" opacity=".55"/>' + merged(ft, c, '<ellipse cx="0" cy="-240" rx="56" ry="40"/>') + curlTex([[-24, -262, 6], [16, -270, 6], [-6, -236, 6], [30, -228, 5]]);
    }
    if (style === "tight") {
      var tt = ring(0, -190, 84, 74, 0, 345, 15, 20);
      return merged(tt, c, '<ellipse cx="0" cy="-190" rx="80" ry="70"/>') + curlTex([[-40, -240, 6], [0, -256, 6], [40, -236, 6], [-20, -200, 6], [24, -196, 6], [-50, -170, 5], [50, -168, 5], [0, -150, 5]]);
    }
    if (style === "fringe" || style === "sideFringe" || style === "messy") {
      var bf = "M" + (-w - 6) + ",-160 C" + (-w - 10) + ",-236 -66,-288 0,-290 C66,-288 " + (w + 10) + ",-236 " + (w + 6) + ",-160 L" + (w - 4) + ",-136 L60,-118 L44,-128 L28,-108 L12,-124 L-4,-104 L-20,-124 L-36,-108 L-50,-126 L-64,-116 L" + (-w + 4) + ",-136 Z";
      return merged([pth(bf)], c) + strands(["M-50,-250 L-40,-150", "M0,-270 L0,-140", "M46,-250 L40,-150"]);
    }
    if (style === "quiffTall") {
      var bq = "M" + (-w - 4) + ",-150 C" + (-w - 8) + ",-240 -62,-300 -30,-318 L-20,-344 L0,-322 L20,-348 L34,-318 C72,-300 " + (w + 8) + ",-240 " + (w + 4) + ",-150 C" + w + ",-122 60,-110 0,-108 C-60,-110 " + -w + ",-122 " + (-w - 4) + ",-150 Z";
      return merged([pth(bq)], c) + strands(["M-40,-290 L-30,-160", "M10,-300 L6,-150", "M50,-270 L40,-160"]);
    }
    if (style === "curls" || style === "curlyShort" || style === "mop") {
      var big = style === "curls" || style === "mop";
      var s = ring(0, big ? -194 : -186, big ? 84 : 96, big ? 80 : 66, 0, 340, 20, big ? 31 : 26);
      if (big) s = s.concat([circ(-34, -290, 28), circ(14, -298, 30), circ(56, -280, 24)]);
      else s = s.concat([circ(-22, -266, 24), circ(22, -268, 24)]);
      return merged(s, c, '<ellipse cx="0" cy="-190" rx="' + (big ? 78 : 92) + '" ry="' + (big ? 74 : 60) + '"/>') +
        curlTex(big ? [[-40, -250, 9], [10, -262, 10], [44, -230, 9], [-20, -200, 9], [30, -180, 8], [-56, -170, 8], [0, -140, 8]] : [[-40, -236, 8], [20, -240, 8], [-10, -200, 8], [40, -190, 7], [-54, -170, 7]]);
    }
    var extra = [];
    extra = [];
    return merged([pth(base)].concat(extra), c) + strands(["M-50,-250 C-30,-262 -10,-258 10,-266", "M-40,-200 C-20,-210 10,-206 30,-214", "M20,-240 C36,-246 52,-238 62,-226"]);
  }

  function frizz() {
    var r = prng(9);
    var d = "";
    for (var i = 0; i <= 18; i++) {
      var a = Math.PI + (i / 18) * Math.PI;
      var rr = i % 2 ? 106 + r() * 14 : 86;
      d += (i ? " L" : "M") + f(rr * Math.cos(a)) + "," + f(-200 + rr * 0.92 * Math.sin(a));
    }
    d += " L92,-198 L-92,-198 Z";
    return merged([pth(d)], "#1b1716");
  }

  /* ---------- faces ---------- */
  var EY = -160;
  function eye(kind, x, side) {
    switch (kind) {
      case "normal":
        return '<ellipse cx="' + x + '" cy="' + EY + '" rx="8.5" ry="12.5" fill="' + INK + '"/><circle cx="' + (x + 3) + '" cy="' + (EY - 5) + '" r="3.2" fill="#fff"/>';
      case "up":
        return '<ellipse cx="' + x + '" cy="' + (EY - 3) + '" rx="8.5" ry="12.5" fill="' + INK + '"/><circle cx="' + (x + 3) + '" cy="' + (EY - 9) + '" r="3.2" fill="#fff"/>';
      case "big":
        return '<ellipse cx="' + x + '" cy="' + (EY - 3) + '" rx="12" ry="16" fill="' + INK + '"/><circle cx="' + (x + 4) + '" cy="' + (EY - 10) + '" r="4.6" fill="#fff"/><circle cx="' + (x - 4) + '" cy="' + (EY + 4) + '" r="2.4" fill="#fff"/><path d="M' + (x + 1) + "," + (EY - 1) + " l1.6,3.4 3.4,1.6 -3.4,1.6 -1.6,3.4 -1.6,-3.4 -3.4,-1.6 3.4,-1.6z" + '" fill="#FFE59A"/>';
      case "smug":
        return '<path d="M' + (x - 11) + "," + (EY - 2) + " Q" + x + "," + (EY + 12) + " " + (x + 11) + "," + (EY - 2) + ' Z" fill="' + INK + '"/><path d="M' + (x - 14) + "," + (EY - 3) + " L" + (x + 13) + "," + (EY - 4) + '" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>';
      case "down":
        return '<path d="M' + (x - 11) + "," + (EY + 1) + " Q" + x + "," + (EY + 14) + " " + (x + 11) + "," + (EY + 1) + ' Z" fill="' + INK + '"/><path d="M' + (x - 13) + "," + EY + " Q" + x + "," + (EY - 5) + " " + (x + 13) + "," + EY + '" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
      case "happy":
        return '<path d="M' + (x - 12) + "," + (EY + 5) + " Q" + x + "," + (EY - 15) + " " + (x + 12) + "," + (EY + 5) + '" stroke="' + INK + '" stroke-width="5.5" fill="none" stroke-linecap="round"/>';
      case "closed":
        return '<path d="M' + (x - 12) + "," + EY + " Q" + x + "," + (EY + 8) + " " + (x + 12) + "," + EY + '" stroke="' + INK + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
      case "squeeze":
        var dx = side < 0 ? 1 : -1;
        return '<path d="M' + (x - 12 * dx) + "," + (EY - 11) + " L" + (x + 10 * dx) + "," + EY + " L" + (x - 12 * dx) + "," + (EY + 11) + '" stroke="' + INK + '" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      case "shock":
        return '<circle cx="' + x + '" cy="' + EY + '" r="15" fill="#fff" stroke="' + INK + '" stroke-width="4"/><circle cx="' + x + '" cy="' + EY + '" r="3.6" fill="' + INK + '"/>';
      case "heart":
        return '<path transform="translate(' + x + "," + (EY - 2) + ') scale(1.25)" d="M0,9 C-14,0 -14,-12 -6,-12 C-2,-12 0,-8 0,-6 C0,-8 2,-12 6,-12 C14,-12 14,0 0,9 Z" fill="#E4394D" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
      case "tired":
        return '<path d="M' + (x - 12) + "," + (EY - 1) + " L" + (x + 12) + "," + (EY - 1) + '" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><path d="M' + (x - 9) + "," + (EY + 8) + " Q" + x + "," + (EY + 12) + " " + (x + 9) + "," + (EY + 8) + '" stroke="' + INK + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
      case "dots":
        return '<ellipse cx="' + x + '" cy="' + EY + '" rx="7.5" ry="9.5" fill="#fff"/>';
      case "spiral":
        return '<path d="M' + x + "," + EY + " m-2,0 a2,2 0 1 1 4,0 a5,5 0 1 1 -9,0 a8,8 0 1 1 15,0 a11,11 0 1 1 -21,0" + '" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>';
    }
    return "";
  }
  function brow(kind, x, side, bw) {
    var m = side;
    var d = "", sw = 5;
    switch (kind) {
      case "flat": d = "M" + (x - 13) + ",-189 Q" + x + ",-192 " + (x + 13) + ",-189"; break;
      case "angry": d = "M" + (x - 16 * m) + ",-199 L" + (x + 13 * m) + ",-182"; sw = 7; break;
      case "smug": d = m < 0 ? "M" + (x - 15) + ",-186 L" + (x + 14) + ",-184" : "M" + (x - 14) + ",-192 Q" + x + ",-199 " + (x + 15) + ",-191"; break;
      case "worried": d = "M" + (x - 14 * m) + ",-185 L" + (x + 13 * m) + ",-195"; sw = 5.5; break;
      case "soft": d = "M" + (x - 13) + ",-188 Q" + x + ",-195 " + (x + 13) + ",-188"; break;
      case "determined": d = "M" + (x - 15 * m) + ",-194 L" + (x + 13 * m) + ",-184"; sw = 6.5; break;
      default: return "";
    }
    if (bw) sw = Math.max(sw, bw);
    return '<path d="' + d + '" stroke="' + INK + '" stroke-width="' + sw + '" fill="none" stroke-linecap="round"/>';
  }
  function mouth(kind) {
    var s = 'stroke="' + INK + '" stroke-linecap="round" stroke-linejoin="round"';
    switch (kind) {
      case "smile": return '<path d="M-13,-121 Q0,-110 13,-121" ' + s + ' stroke-width="5" fill="none"/>';
      case "smirk": return '<path d="M-8,-117 Q6,-113 16,-125" ' + s + ' stroke-width="5" fill="none"/>';
      case "soft": return '<path d="M-10,-120 Q0,-114 10,-120" ' + s + ' stroke-width="4.2" fill="none"/>';
      case "flat": return '<path d="M-10,-118 L10,-118" ' + s + ' stroke-width="4.5"/>';
      case "frown": return '<path d="M-12,-112 Q0,-122 12,-112" ' + s + ' stroke-width="5" fill="none"/>';
      case "grit": return '<rect x="-22" y="-131" width="44" height="22" rx="6" fill="#fff" ' + s + ' stroke-width="4"/><path d="M-22,-120 H22 M-11,-131 V-109 M0,-131 V-109 M11,-131 V-109" ' + s + ' stroke-width="2.4"/>';
      case "grin": return '<path d="M-24,-128 Q0,-92 24,-128 Z" fill="#7b2d2a" ' + s + ' stroke-width="4.5"/><path d="M-20,-126 L20,-126 L17,-120 Q0,-117 -17,-120 Z" fill="#fff"/><path d="M-10,-106 Q0,-113 10,-106 Q0,-100 -10,-106Z" fill="#e2645f"/>';
      case "wail": return '<ellipse cx="0" cy="-113" rx="20" ry="17" fill="#7b2d2a" ' + s + ' stroke-width="4.5"/><ellipse cx="0" cy="-104" rx="11" ry="6" fill="#e2645f"/>';
      case "o": return '<ellipse cx="0" cy="-116" rx="7" ry="9" fill="#7b2d2a" ' + s + ' stroke-width="3.5"/>';
      case "pant": return '<ellipse cx="0" cy="-116" rx="12" ry="9" fill="#7b2d2a" ' + s + ' stroke-width="4"/>';
      case "chew": return '<path d="M-8,-118 Q0,-113 8,-118" ' + s + ' stroke-width="4" fill="none"/><circle cx="-30" cy="-124" r="10" fill="none" ' + s + ' stroke-width="3"/>';
      case "burnt": return '<ellipse cx="0" cy="-116" rx="6" ry="7" fill="#fff"/>';
    }
    return "";
  }
  function extra(kind, w) {
    switch (kind) {
      case "blush": return '<ellipse cx="-52" cy="-134" rx="13" ry="7" fill="#EE8A8A" opacity=".6"/><ellipse cx="52" cy="-134" rx="13" ry="7" fill="#EE8A8A" opacity=".6"/>';
      case "sweat": return '<path d="M' + (w - 8) + ",-214 C" + (w + 4) + ",-196 " + (w + 6) + ",-184 " + (w - 4) + ",-180 C" + (w - 14) + ",-182 " + (w - 16) + ",-196 " + (w - 8) + ',-214 Z" fill="#A6DBF5" stroke="' + INK + '" stroke-width="3"/>';
      case "vein": return '<g class="vein" transform="translate(' + (w - 30) + ',-206)" stroke="#D12B2B" stroke-width="5" fill="none" stroke-linecap="round"><path d="M-12,-4 Q-4,-4 -4,-12"/><path d="M4,-12 Q4,-4 12,-4"/><path d="M12,4 Q4,4 4,12"/><path d="M-4,12 Q-4,4 -12,4"/></g>';
      case "tears": return '<g class="tears"><path d="M-40,-150 C-46,-128 -38,-110 -48,-86" stroke="' + INK + '" stroke-width="17" fill="none" stroke-linecap="round"/><path d="M40,-150 C46,-128 38,-110 48,-86" stroke="' + INK + '" stroke-width="17" fill="none" stroke-linecap="round"/><path d="M-40,-150 C-46,-128 -38,-110 -48,-86" stroke="#9AD3F1" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M40,-150 C46,-128 38,-110 48,-86" stroke="#9AD3F1" stroke-width="10" fill="none" stroke-linecap="round"/></g>';
      case "lines": return '<g stroke="#6d86c9" stroke-width="3.5" stroke-linecap="round" opacity=".85"><path d="M-40,-206 v18"/><path d="M-28,-208 v22"/><path d="M-16,-206 v18"/></g>';
    }
    return "";
  }

  var EXPR = {
    neutral: ["normal", "flat", "smile"],
    smug: ["smug", "smug", "smirk"],
    angry: ["normal", "angry", "grit", ["vein"]],
    grin: ["happy", "flat", "grin"],
    happy: ["happy", "soft", "smile", ["blush"]],
    hearts: ["heart", "soft", "grin", ["blush"]],
    cry: ["squeeze", "worried", "wail", ["tears", "sweat"]],
    shock: ["shock", "worried", "o", ["sweat", "lines"]],
    determined: ["normal", "determined", "grit"],
    tired: ["tired", "worried", "pant", ["sweat"]],
    soft: ["down", "soft", "soft"],
    eyesmile: ["happy", "soft", "soft"],
    sparkle: ["big", "soft", "o"],
    lookup: ["up", "soft", "o"],
    sleep: ["closed", "soft", "o"],
    chew: ["happy", "soft", "chew", ["blush"]],
    focus: ["normal", "determined", "flat"],
    cool: ["normal", "flat", "smirk"],
    dizzy: ["spiral", "worried", "wail", ["sweat"]],
    burnt: ["dots", null, "burnt"]
  };

  function face(exprName, c) {
    var e = EXPR[exprName] || EXPR.neutral;
    var s = eye(e[0], -32, -1) + eye(e[0], 32, 1) + brow(e[1], -32, -1, c.brow) + brow(e[1], 32, 1, c.brow) + mouth(e[2]);
    (e[3] || []).forEach(function (x) { s += extra(x, c.w); });
    return s;
  }

  function facialHair(c, burnt) {
    var col = burnt ? "#111" : HAIR, s = "";
    if (c.goatee === "full") {
      s += '<path d="M-22,-126 Q-10,-139 0,-132 Q10,-139 22,-126 Q10,-131 0,-128 Q-10,-131 -22,-126 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>';
      s += '<path d="M-15,-104 Q0,-97 15,-104 Q15,-88 0,-74 Q-15,-88 -15,-104 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
    } else if (c.goatee) {
      s += '<path d="M-19,-127 Q-8,-137 0,-131 Q8,-137 19,-127 Q8,-131 0,-128 Q-8,-131 -19,-127 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>';
      s += '<path d="M-9,-104 Q0,-100 9,-104 Q8,-92 0,-86 Q-8,-92 -9,-104 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>';
    }
    if (c.fullBeard && !burnt) {
      s += '<path d="M-24,-126 Q-11,-140 0,-133 Q11,-140 24,-126 Q11,-131 0,-128 Q-11,-131 -24,-126 Z" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/>';
    }
    if (c.stubble && !burnt) {
      s += '<path d="M' + f(-c.w * 0.78) + ',-150 C' + f(-c.w * 0.7) + ',-100 ' + f(-c.w * 0.3) + ',-88 0,-88 C' + f(c.w * 0.3) + ',-88 ' + f(c.w * 0.7) + ',-100 ' + f(c.w * 0.78) + ',-150 C' + f(c.w * 0.5) + ',-116 ' + f(-c.w * 0.5) + ',-116 ' + f(-c.w * 0.78) + ',-150 Z" fill="' + HAIR + '" opacity=".16"/>';
      s += '<path d="M-17,-127 Q0,-135 17,-127" fill="none" stroke="' + HAIR + '" stroke-width="3.6" stroke-linecap="round" opacity=".5"/>';
      s += '<path d="M-7,-100 Q0,-96 7,-100" fill="none" stroke="' + HAIR + '" stroke-width="5" stroke-linecap="round" opacity=".45"/>';
    }
    if (c.beard && !burnt) {
      s += '<path d="M' + f(-c.w * 0.86) + ',-156 C' + f(-c.w * 0.78) + ',-96 ' + f(-c.w * 0.34) + ',-80 0,-80 C' + f(c.w * 0.34) + ',-80 ' + f(c.w * 0.78) + ',-96 ' + f(c.w * 0.86) + ',-156 C' + f(c.w * 0.56) + ',-118 ' + f(-c.w * 0.56) + ',-118 ' + f(-c.w * 0.86) + ',-156 Z" fill="' + HAIR + '" opacity=".5"/>';
      s += '<path d="M-20,-126 Q-9,-137 0,-131 Q9,-137 20,-126 Q9,-130 0,-127 Q-9,-130 -20,-126 Z" fill="' + HAIR + '" opacity=".8"/>';
    }
    if (c.mustache) {
      s += '<path d="M-21,-126 Q-9,-138 0,-131 Q9,-138 21,-126 Q9,-130 0,-127 Q-9,-130 -21,-126 Z" fill="' + col + '" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>';
      s += '<path d="M-7,-103 Q0,-99 7,-103 Q5,-94 0,-90 Q-5,-94 -7,-103 Z" fill="' + col + '" opacity=".75"/>';
    }
    return s;
  }
  /* full beard sits under the face so the mouth stays readable on top of it */
  function beardUnder(c, burnt) {
    if (!c.fullBeard || burnt) return "";
    var w = c.w, jw = w * 0.72 * c.chub;
    var d = "M" + f(-w) + ",-178 C" + f(-w) + ",-128 " + f(-jw) + ",-84 0,-82 C" + f(jw) + ",-84 " + f(w) + ",-128 " + f(w) + ",-178 L" + f(w - 12) + ",-176 C" + f(w - 16) + ",-146 44,-132 28,-128 C22,-102 -22,-102 -28,-128 C-44,-132 " + f(-(w - 16)) + ",-146 " + f(-(w - 12)) + ",-176 Z";
    return '<path d="' + d + '" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M-40,-112 q4,6 8,2 M34,-114 q4,6 8,2 M-6,-92 q6,4 12,0" stroke="#4b3a33" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  }
  function studs(c) {
    if (!c.studs) return "";
    return '<circle cx="' + -(c.w + 2) + '" cy="-156" r="3.6" fill="#EEF2F7" stroke="' + INK + '" stroke-width="1.6"/><circle cx="' + (c.w + 2) + '" cy="-156" r="3.6" fill="#EEF2F7" stroke="' + INK + '" stroke-width="1.6"/>';
  }
  function specs(c) {
    if (c && c.glasses === "rect") {
      return '<g class="specs"><rect x="-60" y="-177" width="54" height="34" rx="5" fill="rgba(214,232,246,.2)" stroke="#141417" stroke-width="7"/>' +
        '<rect x="6" y="-177" width="54" height="34" rx="5" fill="rgba(214,232,246,.2)" stroke="#141417" stroke-width="7"/>' +
        '<path d="M-6,-166 Q0,-171 6,-166" stroke="#141417" stroke-width="5" fill="none"/>' +
        '<path d="M-60,-170 L-88,-174 M60,-170 L88,-174" stroke="#141417" stroke-width="5"/>' +
        '<path d="M-48,-148 L-36,-170 M18,-148 L30,-170" stroke="#fff" stroke-width="2.6" opacity=".6" stroke-linecap="round"/></g>';
    }
    if (c && c.glasses === "round") {
      var gold = "#C9A04A";
      return '<g class="specs"><circle cx="-32" cy="-160" r="24" fill="rgba(214,232,246,.18)" stroke="' + gold + '" stroke-width="3"/>' +
        '<circle cx="32" cy="-160" r="24" fill="rgba(214,232,246,.18)" stroke="' + gold + '" stroke-width="3"/>' +
        '<path d="M-8,-164 Q0,-170 8,-164" stroke="' + gold + '" stroke-width="3" fill="none"/>' +
        '<path d="M-56,-164 L-86,-172 M56,-164 L86,-172" stroke="' + gold + '" stroke-width="3"/>' +
        '<path d="M-44,-146 L-34,-168 M20,-146 L30,-168" stroke="#fff" stroke-width="2.4" opacity=".55" stroke-linecap="round"/></g>';
    }
    if (c && c.glasses === "browline") {
      var lens = function (x) {
        return '<rect x="' + x + '" y="-179" width="52" height="37" rx="8" fill="rgba(214,232,246,.22)" stroke="#8C949D" stroke-width="2.6"/>' +
          '<path d="M' + x + ",-165 L" + x + ",-172 Q" + x + ",-180 " + (x + 8) + ",-180 L" + (x + 44) + ",-180 Q" + (x + 52) + ",-180 " + (x + 52) + ",-172 L" + (x + 52) + ',-165" fill="none" stroke="#17171b" stroke-width="7.5" stroke-linejoin="round" stroke-linecap="round"/>';
      };
      return '<g class="specs">' + lens(-58) + lens(6) + '<path d="M-6,-171 Q0,-176 6,-171" stroke="#8C949D" stroke-width="3" fill="none"/><path d="M-58,-173 L-88,-176 M58,-173 L88,-176" stroke="#17171b" stroke-width="4.5"/><path d="M-46,-150 L-36,-168 M18,-150 L28,-168" stroke="#fff" stroke-width="2.6" opacity=".6" stroke-linecap="round"/></g>';
    }
    var rim = "#59606a";
    return '<g class="specs"><rect x="-58" y="-179" width="52" height="38" rx="9" fill="rgba(214,232,246,.28)" stroke="' + rim + '" stroke-width="5"/>' +
      '<rect x="6" y="-179" width="52" height="38" rx="9" fill="rgba(214,232,246,.28)" stroke="' + rim + '" stroke-width="5"/>' +
      '<path d="M-6,-166 Q0,-171 6,-166" stroke="' + rim + '" stroke-width="4.5" fill="none"/>' +
      '<path d="M-58,-170 L-84,-174 M58,-170 L84,-174" stroke="' + rim + '" stroke-width="4"/>' +
      '<path d="M-48,-148 L-34,-172 M16,-148 L30,-172" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/></g>';
  }

  /* ---------- body ---------- */
  var TORSO = "M-35,-88 C-45,-86 -51,-75 -49,-60 L-43,-28 C-30,-21 30,-21 43,-28 L49,-60 C51,-75 45,-86 35,-88 Z";

  function torsoFront(c, burnt) {
    var of = OUTFIT[c.outfit];
    var fill = burnt ? BURNT.fill : outfitFill(of);
    var s = '<path d="' + TORSO + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + W + '" stroke-linejoin="round"/>';
    if (burnt) return s;
    if (c.outfit === "santos") {
      s += '<path d="M-13,-87 L0,-73 L13,-87" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '<rect x="-15" y="-67" width="30" height="4" rx="2" fill="#F39A1E"/>';
      s += '<rect x="-25" y="-60" width="50" height="17" rx="5" fill="#F39A1E" stroke="#B85F0C" stroke-width="2"/>';
      s += '<path d="M-18,-51.5 h36" stroke="#FFD08A" stroke-width="3" stroke-linecap="round"/>';
      s += '<path d="M17,-82 h12 v7 q0,6 -6,8 q-6,-2 -6,-8z" fill="#fff" stroke="' + INK + '" stroke-width="1.8"/><path d="M20,-81 v11 M23,-81 v12 M26,-81 v11" stroke="' + INK + '" stroke-width="1.4"/>';
    } else if (c.outfit === "barca") {
      s += '<path d="M-14,-87 L0,-72 L14,-87" fill="none" stroke="#CFA64B" stroke-width="3.4" stroke-linejoin="round"/>';
      s += '<rect x="-23" y="-58" width="46" height="8" rx="3" fill="#CFA64B"/>';
      s += '<path d="M-28,-77 q6,4 14,-2" stroke="#CFA64B" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
      s += '<path d="M17,-82 h11 v7 q0,6 -5.5,8 q-5.5,-2 -5.5,-8z" fill="#CFA64B" stroke="#6b5520" stroke-width="1.4"/>';
    } else if (c.outfit === "tokyo") {
      s += '<g stroke="#2e2e36" stroke-width="2.2">' + [-34, -24, -14, -4, 6, 16, 26, 36].map(function (x) { return '<path d="M' + x + ',-84 L' + x + ',-26"/>'; }).join("") + "</g>";
      s += '<path d="M-15,-87 Q0,-77 15,-87" fill="none" stroke="#3d3d46" stroke-width="3.2"/>';
      s += '<text data-layout-allow-occlusion x="-11" y="-50" text-anchor="middle" font-family="Mochiy Pop One, sans-serif" font-size="16.5" fill="#F7F4EC" transform="skewX(-14)">Tokyo</text>';
      s += '<path d="M-26,-44 Q2,-38 30,-47" stroke="#F7F4EC" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    } else if (c.outfit === "polo" || c.outfit === "brownpolo") {
      var dk = c.outfit === "polo" ? "#18223a" : "#74463a";
      s += '<path d="M-2,-86 L-2,-66" stroke="' + dk + '" stroke-width="3"/><circle cx="-2" cy="-78" r="2" fill="#d8d8de"/><circle cx="-2" cy="-70" r="2" fill="#d8d8de"/>';
      s += '<path d="M-18,-89 L-2,-80 L-8,-72 L-24,-84 Z" fill="' + dk + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/><path d="M18,-89 L2,-80 L8,-72 L24,-84 Z" fill="' + dk + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
      if (c.outfit === "polo") s += '<path d="M16,-74 q4,-5 8,-1 l2,-3 l1,4 q-2,5 -7,4 z" fill="#F2F2F5"/>';
    } else if (c.outfit === "navyshirt" || c.outfit === "overshirt") {
      var dk2 = c.outfit === "navyshirt" ? "#161d33" : "#2d2d35";
      s += '<path d="M0,-84 L0,-26" stroke="' + dk2 + '" stroke-width="3"/>';
      s += '<circle cx="0" cy="-74" r="2" fill="#d8d8de"/><circle cx="0" cy="-62" r="2" fill="#d8d8de"/><circle cx="0" cy="-50" r="2" fill="#d8d8de"/><circle cx="0" cy="-38" r="2" fill="#d8d8de"/>';
      s += '<path d="M-18,-89 L-2,-78 L-10,-70 L-25,-83 Z" fill="' + dk2 + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/><path d="M18,-89 L2,-78 L10,-70 L25,-83 Z" fill="' + dk2 + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
    } else if (c.outfit === "buffalo") {
      s += '<path d="M-12,-87 L0,-76 L12,-87 Z" fill="#1d1d22"/>';
      s += '<path d="M0,-78 L0,-62" stroke="#C9A54C" stroke-width="3"/><rect x="-2.6" y="-64" width="5.2" height="8" rx="1.5" fill="#6b4a33" stroke="' + INK + '" stroke-width="1.4"/>';
      s += '<path d="M-24,-90 L-13,-95 L0,-78 L-10,-72 Z" fill="' + outfitFill(OUTFIT.buffalo) + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '<path d="M24,-90 L13,-95 L0,-78 L10,-72 Z" fill="' + outfitFill(OUTFIT.buffalo) + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '<path d="M17,-46 q3,-4 6,-1 l2,-3 l1,4 q-2,4 -6,3 z" fill="#E0B43A" stroke="#8a6a14" stroke-width=".8"/>';
    } else if (c.outfit === "vultures") {
      /* it's a hoodie: hood bunched round the neck, short drawstrings, ribbed hem */
      s += '<path d="M-36,-88 C-38,-106 38,-106 36,-88 C24,-78 -24,-78 -36,-88 Z" fill="#202024" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>';
      s += '<path d="M-12,-82 L-13,-75 M12,-82 L13,-75" stroke="#e8e8e4" stroke-width="2.6" stroke-linecap="round"/>';
      s += '<path d="M-41,-31 Q0,-25 41,-31" stroke="#26262b" stroke-width="3" fill="none"/>';
      s += '<path d="M-15,-87 Q0,-78 15,-87" fill="none" stroke="#2e2e35" stroke-width="3.2"/>';
      s += '<text data-layout-allow-occlusion x="0" y="-67" text-anchor="middle" font-family="Vultures Gothic, serif" font-size="12" textLength="56" lengthAdjust="spacingAndGlyphs" fill="#F4F4F0">VULTURES</text>';
      s += '<rect x="-23" y="-63" width="46" height="27" fill="#c9c9c9"/><rect x="-23" y="-63" width="46" height="13" fill="#ececea"/><rect x="-23" y="-47" width="46" height="4" fill="#a4a4a4"/><rect x="-23" y="-43" width="46" height="7" fill="#858585"/>';
      s += '<path d="M-9,-45 L-5,-58" stroke="#3c3c3c" stroke-width="1.8"/><ellipse cx="-5" cy="-58" rx="5" ry="2.6" fill="#4a4a4a" transform="rotate(-18 -5 -58)"/><circle cx="8" cy="-49" r="1.3" fill="#555"/><circle cx="12" cy="-50" r="1.5" fill="#555"/><circle cx="15" cy="-49" r="1.2" fill="#555"/>';
      s += '<rect x="-23" y="-63" width="46" height="27" fill="none" stroke="#d9d9d6" stroke-width="1.6" opacity=".7"/>';
    } else if (c.outfit === "bluepolo") {
      s += '<path d="M-2,-86 L-2,-68" stroke="#1f2f95" stroke-width="3"/><circle cx="-2" cy="-79" r="2" fill="#e8e8ee"/><circle cx="-2" cy="-71" r="2" fill="#e8e8ee"/>';
      s += '<path d="M-18,-89 L-2,-80 L-8,-72 L-24,-84 Z" fill="#2a3fb4" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/><path d="M18,-89 L2,-80 L8,-72 L24,-84 Z" fill="#2a3fb4" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
      s += '<path d="M16,-72 q4,-5 8,-1 l2,-3 l1,4 q-2,5 -7,4 z" fill="#D8334A"/>';
    } else if (c.outfit === "denim") {
      s += '<path d="M-13,-88 L13,-88 L11,-25 L-11,-25 Z" fill="#F5F4EF" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>';
      s += '<path d="M-13,-86 L-13,-25 M13,-86 L13,-25" stroke="#7f9bb8" stroke-width="3"/>';
      s += '<path d="M-22,-92 L-8,-86 L-14,-70 L-28,-82 Z" fill="#91AECB" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/><path d="M22,-92 L8,-86 L14,-70 L28,-82 Z" fill="#91AECB" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
      s += '<rect x="-36" y="-68" width="16" height="12" rx="2" fill="none" stroke="#7f9bb8" stroke-width="2.2"/><rect x="20" y="-68" width="16" height="12" rx="2" fill="none" stroke="#7f9bb8" stroke-width="2.2"/>';
      s += '<circle cx="-28" cy="-62" r="1.8" fill="#d8d8de"/><circle cx="28" cy="-62" r="1.8" fill="#d8d8de"/><path d="M-40,-33 Q-24,-30 -13,-31 M13,-31 Q24,-30 40,-33" stroke="#7f9bb8" stroke-width="2.4" fill="none"/>';
    } else if (c.outfit === "workjacket") {
      s += '<path d="M-13,-88 L13,-88 L11,-25 L-11,-25 Z" fill="#F5F4EF" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>';
      s += '<path d="M-10,-87 Q0,-64 10,-87" fill="none" stroke="#D9DDE3" stroke-width="2.6"/>';
      s += '<path d="M-13,-86 L-13,-25 M13,-86 L13,-25" stroke="#a89a78" stroke-width="3"/>';
      s += '<path d="M-26,-94 L-8,-86 L-15,-66 L-33,-80 Z" fill="#4a3326" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/><path d="M26,-94 L8,-86 L15,-66 L33,-80 Z" fill="#4a3326" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
      s += '<path d="M-24,-88 l-5,10 M-19,-86 l-5,12 M24,-88 l5,10 M19,-86 l5,12" stroke="#6b4a36" stroke-width="1.6"/>';
      s += '<rect x="-38" y="-62" width="18" height="14" rx="2" fill="none" stroke="#a89a78" stroke-width="2.2"/><rect x="20" y="-62" width="18" height="14" rx="2" fill="none" stroke="#a89a78" stroke-width="2.2"/>';
    } else if (c.outfit === "blacktee") {
      s += '<path d="M-14,-87 Q0,-77 14,-87" fill="none" stroke="#3a3a42" stroke-width="3"/>';
    } else if (c.outfit === "greyhenley") {
      s += '<path d="M-14,-87 Q0,-79 14,-87" fill="none" stroke="#4a4e51" stroke-width="3"/>';
      s += '<path d="M0,-84 L0,-60" stroke="#4a4e51" stroke-width="3"/>';
      s += '<circle cx="0" cy="-79" r="2.1" fill="#2b2d30"/><circle cx="0" cy="-71" r="2.1" fill="#2b2d30"/><circle cx="0" cy="-63" r="2.1" fill="#2b2d30"/>';
    } else if (c.outfit === "hoodie") {
      s += '<path d="M-31,-89 C-31,-102 31,-102 31,-89 C20,-80 -20,-80 -31,-89 Z" fill="#303038" stroke="' + INK + '" stroke-width="3.5"/>';
      s += '<path d="M-8,-83 L-10,-60 M8,-83 L10,-60" stroke="#dcdcdc" stroke-width="3" stroke-linecap="round"/>';
      s += '<path d="M-26,-42 Q0,-48 26,-42" stroke="#121216" stroke-width="2.5" fill="none"/>';
    } else if (c.outfit === "henley") {
      s += '<path d="M-14,-87 Q0,-79 14,-87" fill="none" stroke="#3a3a42" stroke-width="3"/>';
      s += '<path d="M0,-84 L0,-60" stroke="#3a3a42" stroke-width="3"/>';
      s += '<circle cx="0" cy="-79" r="2.1" fill="#8a8a92"/><circle cx="0" cy="-71" r="2.1" fill="#8a8a92"/><circle cx="0" cy="-63" r="2.1" fill="#8a8a92"/>';
    }
    return s;
  }
  function torsoBack(c, burnt) {
    var of = OUTFIT[c.outfit];
    var fill = burnt ? BURNT.fill : outfitFill(of);
    var s = '<path d="' + TORSO + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + W + '" stroke-linejoin="round"/>';
    if (c.outfit === "hoodie") s += '<path d="M-30,-90 C-34,-58 34,-58 30,-90 Z" fill="#303038" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>';
    if (c.outfit === "vultures" && !burnt) s += '<path d="M-32,-90 C-36,-56 36,-56 32,-90 Z" fill="#202024" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/><text data-layout-allow-occlusion x="0" y="-36" text-anchor="middle" font-family="Vultures Gothic, serif" font-size="10" textLength="50" lengthAdjust="spacingAndGlyphs" fill="#F4F4F0">VULTURES</text>';
    if (c.outfit === "denim" && !burnt) s += '<path d="M-40,-60 Q0,-54 40,-60" stroke="#7f9bb8" stroke-width="2.4" fill="none"/>';
    if (c.outfit === "workjacket" && !burnt) s += '<path d="M-28,-92 Q0,-80 28,-92 L26,-83 Q0,-71 -26,-83 Z" fill="#4a3326" stroke="' + INK + '" stroke-width="2.4"/>';
    if (c.outfit === "tokyo") s += '<g stroke="#2e2e36" stroke-width="2.2">' + [-34, -24, -14, -4, 6, 16, 26, 36].map(function (x) { return '<path d="M' + x + ',-84 L' + x + ',-26"/>'; }).join("") + '</g><text data-layout-allow-occlusion x="-11" y="-52" text-anchor="middle" font-family="Mochiy Pop One, sans-serif" font-size="22" fill="#F7F4EC" transform="skewX(-8)">30</text>';
    if (c.outfit === "polo" || c.outfit === "brownpolo") s += '<path d="M-20,-88 Q0,-80 20,-88 L18,-82 Q0,-76 -18,-82 Z" fill="' + (c.outfit === "polo" ? "#18223a" : "#74463a") + '" stroke="' + INK + '" stroke-width="2.4"/>';
    return s;
  }

  /* limbs: stroke-drawn, sleeve over skin, hand at the end */
  function limb(p, c, burnt, opt) {
    opt = opt || {};
    var skin = burnt ? BURNT.skin : c.skin;
    var of = OUTFIT[c.outfit];
    var sleeveCol = burnt ? BURNT.fill : outfitFill(of);
    var frac = of.sleeve;
    var d = pts(p);
    var s = '<path d="' + d + '" stroke="' + INK + '" stroke-width="21" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    s += '<path d="' + d + '" stroke="' + skin + '" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    var total = 0, segs = [];
    for (var i = 1; i < p.length; i++) { var L = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); segs.push(L); total += L; }
    var want = total * frac, acc = 0, sp = [p[0]];
    for (var j = 1; j < p.length; j++) {
      if (acc + segs[j - 1] >= want - 0.001) { var t = (want - acc) / segs[j - 1]; sp.push([p[j - 1][0] + (p[j][0] - p[j - 1][0]) * t, p[j - 1][1] + (p[j][1] - p[j - 1][1]) * t]); break; }
      acc += segs[j - 1]; sp.push(p[j]);
    }
    var sd = pts(sp);
    s += '<path d="' + sd + '" stroke="' + INK + '" stroke-width="27" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    s += '<path d="' + sd + '" stroke="' + sleeveCol + '" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    var h = p[p.length - 1];
    if (opt.watch && !burnt) {
      var q = p[p.length - 2], ang = Math.atan2(h[1] - q[1], h[0] - q[0]);
      var wx = h[0] - Math.cos(ang) * 11, wy = h[1] - Math.sin(ang) * 11;
      s += '<circle cx="' + f(wx) + '" cy="' + f(wy) + '" r="7.5" fill="#1b1b1f" stroke="' + INK + '" stroke-width="2"/>';
    }
    if (opt.bracelet && !burnt) {
      var q2 = p[p.length - 2], ang2 = Math.atan2(h[1] - q2[1], h[0] - q2[0]);
      s += '<circle cx="' + f(h[0] - Math.cos(ang2) * 10) + '" cy="' + f(h[1] - Math.sin(ang2) * 10) + '" r="7" fill="none" stroke="' + (typeof opt.bracelet === "string" ? opt.bracelet : "#D4D8DE") + '" stroke-width="3.2"/>';
    }
    if (opt.thumb) {
      s += '<path d="M' + f(h[0] - 2) + "," + f(h[1] - 6) + " L" + f(h[0] - 2) + "," + f(h[1] - 24) + '" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/><path d="M' + f(h[0] - 2) + "," + f(h[1] - 6) + " L" + f(h[0] - 2) + "," + f(h[1] - 24) + '" stroke="' + skin + '" stroke-width="6" stroke-linecap="round"/>';
    }
    if (opt.finger) {
      s += '<path d="M' + f(h[0]) + "," + f(h[1]) + " L" + f(h[0] + opt.finger[0]) + "," + f(h[1] + opt.finger[1]) + '" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M' + f(h[0]) + "," + f(h[1]) + " L" + f(h[0] + opt.finger[0]) + "," + f(h[1] + opt.finger[1]) + '" stroke="' + skin + '" stroke-width="5.5" stroke-linecap="round"/>';
    }
    s += '<circle cx="' + f(h[0]) + '" cy="' + f(h[1]) + '" r="10" fill="' + skin + '" stroke="' + INK + '" stroke-width="4"/>';
    return s;
  }
  function leg(p, c, burnt) {
    var pc = burnt ? BURNT.pants : c.pants, sc = burnt ? BURNT.shoes : c.shoes;
    var d = pts(p), e = p[p.length - 1];
    if (c.shorts && !burnt) {
      var s0 = p[0], mx = s0[0] + (e[0] - s0[0]) * 0.5, my = s0[1] + (e[1] - s0[1]) * 0.5;
      var kx = s0[0] + (e[0] - s0[0]) * 0.78, ky = s0[1] + (e[1] - s0[1]) * 0.78;
      var out = '<path d="' + d + '" stroke="' + INK + '" stroke-width="21" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="' + d + '" stroke="' + c.skin + '" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      if (c.socks) out += '<path d="M' + f(kx) + "," + f(ky) + " L" + f(e[0]) + "," + f(e[1]) + '" stroke="#F6F6F2" stroke-width="13" stroke-linecap="butt"/>';
      out += '<path d="M' + f(s0[0]) + "," + f(s0[1]) + " L" + f(mx) + "," + f(my) + '" stroke="' + INK + '" stroke-width="31" fill="none" stroke-linecap="round"/>' +
        '<path d="M' + f(s0[0]) + "," + f(s0[1]) + " L" + f(mx) + "," + f(my) + '" stroke="' + pc + '" stroke-width="22" fill="none" stroke-linecap="round"/>';
      if (c.socks) out += '<path d="M' + f(kx - 7) + "," + f(ky + 3) + " h14" + '" stroke="#1b1b20" stroke-width="2.4"/>';
      return out + '<ellipse cx="' + f(e[0] + (e[0] < 0 ? -3 : 3)) + '" cy="' + f(e[1] + 3) + '" rx="15" ry="9.5" fill="' + sc + '" stroke="' + INK + '" stroke-width="4"/>';
    }
    return '<path d="' + d + '" stroke="' + INK + '" stroke-width="27" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" stroke="' + pc + '" stroke-width="17" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<ellipse cx="' + f(e[0] + (e[0] < 0 ? -3 : 3)) + '" cy="' + f(e[1] + 3) + '" rx="15" ry="9.5" fill="' + sc + '" stroke="' + INK + '" stroke-width="4"/>';
  }

  var ARMS = {
    down: { L: [[-42, -77], [-52, -57], [-57, -38]], R: [[42, -77], [52, -57], [57, -38]] },
    up: { L: [[-42, -77], [-56, -105], [-60, -136]], R: [[42, -77], [56, -105], [60, -136]] },
    hold: { L: [[-42, -77], [-50, -55], [-16, -52]], R: [[42, -77], [50, -55], [16, -52]] },
    hip: { L: [[-42, -77], [-64, -60], [-44, -44]], R: [[42, -77], [64, -60], [44, -44]] },
    cross: { L: [[-42, -77], [-44, -54], [22, -60]], R: [[42, -77], [46, -56], [-20, -64]] },
    fight: { L: [[-42, -77], [-62, -58], [-38, -64]], R: [[42, -77], [68, -70], [64, -98]] },
    drink: { L: [[-42, -77], [-50, -55], [-16, -52]], R: [[42, -77], [56, -86], [22, -118]] },
    chips: { L: [[-42, -77], [-50, -55], [-16, -50]], R: [[42, -77], [56, -70], [24, -112]] },
    climb: { L: [[-42, -77], [-82, -110], [-102, -152]], R: [[42, -77], [82, -104], [102, -144]] },
    cheer: { L: [[-42, -77], [-92, -136], [-112, -206]], R: [[42, -77], [92, -136], [112, -206]] },
    throwR: { L: [[-42, -77], [-52, -57], [-57, -38]], R: [[42, -77], [70, -84], [96, -92]] },
    throwL: { L: [[-42, -77], [-70, -84], [-96, -92]], R: [[42, -77], [52, -57], [57, -38]] },
    punch: { L: [[-42, -77], [-52, -57], [-40, -52]], R: [[42, -77], [74, -74], [104, -74]] },
    rope: { L: [[-42, -77], [-70, -72], [-92, -66]], R: [[42, -77], [8, -66], [-70, -66]] },
    rail: { L: [[-42, -77], [-50, -52], [-46, -34]], R: [[42, -77], [50, -52], [46, -34]] }
  };
  var ARM_OPT = {
    thumb: { R: [[42, -77], [64, -60], [62, -92]] },
    point: { R: [[42, -77], [60, -104], [74, -134]] },
    wave: { R: [[42, -77], [64, -100], [60, -134]] },
    pointUp: { R: [[42, -77], [92, -146], [116, -226]] }
  };
  var LEGS = {
    stand: { L: [[-15, -32], [-17, -8]], R: [[15, -32], [17, -8]] },
    sit: { L: [[-15, -32], [-38, -10]], R: [[15, -32], [38, -10]] },
    climb: { L: [[-15, -32], [-30, -18]], R: [[15, -32], [22, -4]] },
    kneel: { L: [[-15, -32], [-22, -12]], R: [[15, -32], [26, -20]] }
  };

  function armPose(name) {
    if (ARMS[name]) return ARMS[name];
    if (ARM_OPT[name]) return { L: ARMS.down.L, R: ARM_OPT[name].R, opt: name };
    return ARMS.down;
  }

  /* ---------- assemble one figure ---------- */
  function figure(key, o) {
    var c = CAST[key];
    var id = o.id;
    var burnt = !!o.burnt;
    var view = o.view || "front";
    var skin = burnt ? BURNT.skin : c.skin;
    var w = c.w;
    var s = "";
    CUR_ID = id;
    if (OUTFIT[c.outfit].pattern && !burnt) s += checkPattern(id);

    if (o.legs !== "none") {
      var lg = LEGS[o.legs || "stand"];
      s += '<g id="' + id + '-legL">' + leg(lg.L, c, burnt) + "</g>";
      s += '<g id="' + id + '-legR">' + leg(lg.R, c, burnt) + "</g>";
    }
    if (o.behindBody) s += o.behindBody;
    var bk = c.bulk || 1;
    s += '<g id="' + id + '-torso"' + (bk !== 1 ? ' transform="scale(' + bk + ',1)"' : "") + ">" + (view === "back" ? torsoBack(c, burnt) : torsoFront(c, burnt)) + "</g>";

    if (o.midBody) s += o.midBody;
    var poses = o.poses || ["down"];
    var body = s; s = "";
    poses.forEach(function (pn, i) {
      var p0 = armPose(pn), bw = c.bulk || 1;
      var sx = function (arr) { return arr.map(function (q) { return [q[0] * bw, q[1]]; }); };
      var p = { L: sx(p0.L), R: sx(p0.R), opt: p0.opt };
      var opt = { watch: !!c.watch };
      var optR = { watch: false, bracelet: c.bracelet || false, thumb: p.opt === "thumb", finger: p.opt === "point" ? [8, -18] : p.opt === "pointUp" ? [10, -24] : null };
      var suffix = i === 0 ? "" : "-" + pn;
      s += '<g class="pose pose-' + pn + '" style="opacity:' + (i === 0 ? 1 : 0) + '">' +
        '<g id="' + id + "-armL" + suffix + '">' + limb(p.L, c, burnt, opt) + "</g>" +
        '<g id="' + id + "-armR" + suffix + '">' + limb(p.R, c, burnt, optR) + "</g>" + ((o.poseProps && o.poseProps[pn]) || "") + "</g>";
    });
    if (o.inFront) s += o.inFront;
    var arms = s; s = body + (o.armsOver ? "" : arms);

    var h = "";
    var ear = function (x) { return '<ellipse cx="' + x + '" cy="-168" rx="12" ry="16" fill="' + skin + '" stroke="' + INK + '" stroke-width="4"/>'; };
    if (view === "back") {
      h += '<path d="' + headPath(w, c.chub) + '" fill="' + skin + '" stroke="' + INK + '" stroke-width="' + W + '"/>';
      h += burnt ? frizz() : hairBack(c.hair, w, c.hairCol);
      h += ear(-(w + 3)) + ear(w + 3);
    } else {
      h += hairBehind(c.hair);
      h += ear(-(w + 1)) + ear(w + 1);
      h += '<path d="' + headPath(w, c.chub) + '" fill="' + skin + '" stroke="' + INK + '" stroke-width="' + W + '"/>';
      h += beardUnder(c, burnt);
      var exprs = burnt ? ["burnt"] : (o.expr || [c.expr || "neutral"]);
      exprs.forEach(function (en, i) {
        h += '<g class="expr expr-' + en + '" style="opacity:' + (i === 0 ? 1 : 0) + '">' + face(en, c) + "</g>";
      });
      h += facialHair(c, burnt) + (burnt ? "" : studs(c));
      if (c.glasses) h += specs(c);
      h += burnt ? frizz() : hairFront(c.hair, w, c.hairCol);
      if (o.overHead) h += o.overHead;
    }
    s += '<g id="' + id + '-head">' + h + "</g>";
    if (o.armsOver) s += arms;
    return s;
  }

  var VB_W = 260, VB_H = 340, VB_X = -130, VB_Y = -310;

  function actor(key, o) {
    var sc = o.s || 1, x = o.x || 0, y = o.y || 0;
    var cls = "actor" + (o.cls ? " " + o.cls : "");
    var inner = figure(key, o);
    if (o.flip) inner = '<g transform="scale(-1,1)">' + inner + "</g>";
    return '<div class="' + cls + '" id="' + o.id + '" style="left:' + f(x + VB_X * sc) + "px;top:" + f(y + VB_Y * sc) + "px;width:" + f(VB_W * sc) + "px;height:" + f(VB_H * sc) + 'px">' +
      '<svg viewBox="' + VB_X + " " + VB_Y + " " + VB_W + " " + VB_H + '" width="100%" height="100%" overflow="visible">' + inner + "</svg></div>";
  }

  function headSVG(key, o) {
    o = o || {};
    var c = CAST[key], w = c.w;
    var h = hairBehind(c.hair) + '<ellipse cx="' + -(w + 1) + '" cy="-168" rx="12" ry="16" fill="' + c.skin + '" stroke="' + INK + '" stroke-width="4"/><ellipse cx="' + (w + 1) + '" cy="-168" rx="12" ry="16" fill="' + c.skin + '" stroke="' + INK + '" stroke-width="4"/>';
    h += '<path d="' + headPath(w, c.chub) + '" fill="' + c.skin + '" stroke="' + INK + '" stroke-width="' + W + '"/>';
    h += beardUnder(c, false) + face(o.expr || c.expr || "neutral", c) + facialHair(c, false) + studs(c) + (c.glasses ? specs(c) : "") + hairFront(c.hair, w, c.hairCol);
    return '<svg viewBox="-135 -320 270 250" width="100%" height="100%" overflow="visible">' + h + "</svg>";
  }

  /* joint pivots in figure space, for GSAP svgOrigin */
  var JOINT = { shoulderL: "-42 -77", shoulderR: "42 -77", hipL: "-15 -32", hipR: "15 -32", neck: "0 -90", waist: "0 -30" };

  global.Chibi = { CAST: CAST, ORDER: ORDER, addCast: addCast, actor: actor, headSVG: headSVG, prng: prng, JOINT: JOINT, INK: INK, VB: { x: VB_X, y: VB_Y, w: VB_W, h: VB_H } };
})(window);
