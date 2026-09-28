#!/usr/bin/env node
// Assemble <project>/index.html from lib/shell.html + lib/stage.js + story/scenes/*.js,
// timed by story/story.json. Usage: node build.mjs <project-dir>
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const dir = path.resolve(process.argv[2] || ".");
const rd = (p) => fs.readFileSync(path.join(dir, p), "utf8");
const story = JSON.parse(rd("story/story.json"));
const { period, first } = story.beat;
const Bt = (n) => +(first + n * period).toFixed(3);
const night = new Set(story.night || []);

const SH = {};
let sections = "";
story.shots.forEach(([id, beat], i) => {
  const st = beat === null ? 0 : Bt(beat);
  const next = story.shots[i + 1];
  const en = next ? Bt(next[1]) : story.duration;
  if (!(en > st)) throw new Error("shot " + id + ": end " + en + " is not after start " + st);
  SH[id] = [st, +en.toFixed(3)];
  sections += '      <section id="' + id + '" class="scene clip' + (night.has(id) ? " night" : "") + '" data-start="' + st + '" data-duration="' + (en - st).toFixed(3) + '" data-track-index="0"></section>\n';
});

const sceneDir = path.join(dir, "story/scenes");
const files = fs.readdirSync(sceneDir).filter((f) => f.endsWith(".js")).sort();
const scenes = files.map((f) => fs.readFileSync(path.join(sceneDir, f), "utf8")).join("\n");
const stage = rd("lib/stage.js")
  .replace(/var SH = __SHOTS__;/, () => "var SH = " + JSON.stringify(SH) + ";")
  .replace(/var BP = __BP__, B0 = __B0__;/, () => "var BP = " + period + ", B0 = " + first + ";");
if (/var SH = __SHOTS__|__BP__, B0 = __B0__/.test(stage)) {
  console.error("lib/stage.js placeholders were not filled; expected 'var SH = __SHOTS__;' and 'var BP = __BP__, B0 = __B0__;'");
  process.exit(1);
}
const script = stage + "\n" + scenes + '\n        window.__timelines["main"] = tl;\n';

try {
  new vm.Script("(function () {" + script + "\n})");
} catch (e) {
  console.error("Syntax error in lib/stage.js or story/scenes: " + e.message);
  process.exit(1);
}
const ids = new Set([...scenes.matchAll(/var id = "([A-Za-z0-9_-]+)"/g)].map((m) => m[1]));
for (const id of Object.keys(SH)) if (!ids.has(id)) console.warn("warn: shot " + id + " has no scene (no var id = \"" + id + "\")");
for (const id of ids) if (!SH[id]) console.warn("warn: scene " + id + " is not in story.json shots");
if (!fs.existsSync(path.join(dir, story.audio))) console.warn("warn: audio file " + story.audio + " is missing");

const html = rd("lib/shell.html")
  .replaceAll("__TITLE__", story.title || "Chibi video")
  .replaceAll("__DURATION__", String(story.duration))
  .replaceAll("__AUDIO__", story.audio)
  .replace("__SECTIONS__", () => sections.trimEnd())
  .replace("__SCRIPT__", () => script);
fs.writeFileSync(path.join(dir, "index.html"), html);
console.log("index.html: " + Object.keys(SH).length + " shots from " + files.length + " scene files, " + story.duration + " s");
