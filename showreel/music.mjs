// Procedural 120 BPM soundtrack, hand-synced to showreel.html's timeline.
//   node music.mjs  -> showreel-music.wav (48 kHz, 16-bit stereo, 60 s)
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SR = 48000, DUR = 60, N = SR * DUR;
const dL = new Float32Array(N), dR = new Float32Array(N);   // drums / fx (not ducked)
const mL = new Float32Array(N), mR = new Float32Array(N);   // music (side-chained)
const aL = new Float32Array(N), aR = new Float32Array(N);   // arp (delay bus, then music)
const rev = new Float32Array(N);                            // reverb send (mono)
const duck = new Float32Array(N).fill(1);

let seed = 1337;
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
const noise = () => rnd() * 2 - 1;
const mtof = m => 440 * 2 ** ((m - 69) / 12);
const TAU = Math.PI * 2;

function put(bus, i, v, pan = 0, send = 0) {
  if (i < 0 || i >= N) return;
  const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
  const [L, R] = bus; L[i] += v * gl; R[i] += v * gr; rev[i] += v * send;
}
const D = [dL, dR], M = [mL, mR], A = [aL, aR];

class SVF {
  constructor() { this.a = 0; this.b = 0; }
  run(x, fc, Q = .707) {
    const g = Math.tan(Math.PI * Math.min(fc, SR * .45) / SR), k = 1 / Q;
    const a1 = 1 / (1 + g * (g + k)), a2 = g * a1, a3 = g * a2;
    const v3 = x - this.b, v1 = a1 * this.a + a2 * v3, v2 = this.b + a2 * this.a + a3 * v3;
    this.a = 2 * v1 - this.a; this.b = 2 * v2 - this.b;
    return { lp: v2, bp: v1, hp: x - k * v1 - v2 };
  }
}
function blep(t, dt) { if (t < dt) { t /= dt; return t + t - t * t - 1; } if (t > 1 - dt) { t = (t - 1) / dt; return t * t + t + t + 1; } return 0; }
class Saw { constructor(ph = rnd()) { this.p = ph; } tick(f) { const dt = f / SR; this.p += dt; if (this.p >= 1) this.p -= 1; return 2 * this.p - 1 - blep(this.p, dt); } }

// ── instruments ──
const kicks = [];
function kick(t0, g = 1) {
  kicks.push(t0);
  const i0 = Math.round(t0 * SR); let ph = 0;
  for (let n = 0; n < SR * .5; n++) {
    const tt = n / SR, f = 44 + 120 * Math.exp(-tt * 28);
    ph += TAU * f / SR;
    let v = Math.tanh(Math.sin(ph) * Math.exp(-tt * 6.5) * 1.8);
    if (tt < .004) v += noise() * (1 - tt / .004) * .35;
    put(D, i0 + n, v * g * .95);
  }
}
function clap(t0, g = 1, pan = 0) {
  const i0 = Math.round(t0 * SR), f = new SVF();
  for (let n = 0; n < SR * .35; n++) {
    const tt = n / SR;
    let env = Math.exp(-tt * 16) * .7;
    for (const o of [0, .011, .022]) if (tt >= o) env += Math.exp(-(tt - o) * 120) * .5;
    put(D, i0 + n, f.run(noise(), 1500, 1.3).bp * env * g * 1.6, pan, .3);
  }
}
function hat(t0, g = 1, open = false, pan = .15) {
  const i0 = Math.round(t0 * SR), f = new SVF();
  for (let n = 0; n < SR * (open ? .3 : .06); n++) {
    const tt = n / SR;
    put(D, i0 + n, f.run(noise(), 8000, .9).hp * Math.exp(-tt * (open ? 13 : 70)) * g, pan, .05);
  }
}
function tom(t0, g = 1) {
  const i0 = Math.round(t0 * SR); let ph = 0;
  for (let n = 0; n < SR * .4; n++) { const tt = n / SR; ph += TAU * (90 + 80 * Math.exp(-tt * 20)) / SR; put(D, i0 + n, Math.sin(ph) * Math.exp(-tt * 9) * g, 0, .2); }
}
function bass(t0, dur, m, g = 1, bright = 1) {
  const i0 = Math.round(t0 * SR), f = new SVF(), s1 = new Saw(), s2 = new Saw(), fr = mtof(m);
  let sp = 0;
  for (let n = 0; n < SR * (dur + .03); n++) {
    const tt = n / SR, env = Math.min(1, tt / .003) * (tt > dur ? Math.max(0, 1 - (tt - dur) / .03) : 1);
    sp += TAU * fr / SR;
    const raw = (s1.tick(fr * 1.003) + s2.tick(fr * .997)) * .5;
    const v = f.run(raw, (180 + 1300 * Math.exp(-tt * 11)) * bright, 1.1).lp + Math.sin(sp) * .55;
    put(M, i0 + n, v * env * g);
  }
}
function pad(t0, dur, notes, g = 1, cut = 1100) {
  const i0 = Math.round(t0 * SR), rel = .7;
  notes.forEach((m, ni) => {
    [-.09, 0, .09].forEach((dc, vi) => {
      const s = new Saw(), f = new SVF(), fr = mtof(m) * 2 ** (dc / 12), pan = (vi - 1) * .55;
      for (let n = 0; n < SR * (dur + rel); n++) {
        const tt = n / SR, gt = t0 + tt;
        const env = Math.min(1, tt / .35) * (tt > dur ? Math.max(0, 1 - (tt - dur) / rel) : 1);
        const v = f.run(s.tick(fr), cut + 350 * Math.sin(gt * .7 + ni), .8).lp;
        put(M, i0 + n, v * env * g * .11, pan, .35);
      }
    });
  });
}
function pluck(t0, m, g = 1, cut = 2500, pan = 0) {
  const i0 = Math.round(t0 * SR), s = new Saw(), f = new SVF(), fr = mtof(m);
  let sq = 0;
  for (let n = 0; n < SR * .3; n++) {
    const tt = n / SR; sq += fr / SR;
    const raw = s.tick(fr) * .6 + ((sq % 1) < .5 ? .4 : -.4);
    put(A, i0 + n, f.run(raw, cut * (.25 + 1.8 * Math.exp(-tt * 22)), 1.4).lp * Math.exp(-tt * 9) * g, pan, .25);
  }
}
function stab(t0, notes, g = 1) {
  const i0 = Math.round(t0 * SR);
  notes.forEach((m, ni) => [-.12, .12].forEach(dc => {
    const s = new Saw(), f = new SVF(), fr = mtof(m + 12) * 2 ** (dc / 12);
    for (let n = 0; n < SR * .45; n++) { const tt = n / SR; put(M, i0 + n, f.run(s.tick(fr), 300 + 3600 * Math.exp(-tt * 13), 1).lp * Math.exp(-tt * 7) * g * .2, dc * 4, .45); }
  }));
}
function bell(t0, m, g = 1, pan = 0) {
  const i0 = Math.round(t0 * SR), fr = mtof(m);
  const parts = [[1, 1, 1.2], [2, .45, 2.2], [3.01, .22, 3.5], [4.2, .12, 5]];
  for (let n = 0; n < SR * 3; n++) {
    const tt = n / SR; let v = 0;
    for (const [h, a, d] of parts) v += Math.sin(TAU * fr * h * tt) * a * Math.exp(-tt * d);
    put(D, i0 + n, v * Math.min(1, tt / .002) * g * .3, pan, .55);
  }
}
function blip(t0, f, g = 1, pan = 0) {
  const i0 = Math.round(t0 * SR);
  for (let n = 0; n < SR * .09; n++) { const tt = n / SR; put(D, i0 + n, Math.sin(TAU * f * tt) * Math.exp(-tt * 45) * g, pan, .15); }
}
function tick(t0, g = 1) {
  const i0 = Math.round(t0 * SR), f = new SVF();
  for (let n = 0; n < SR * .012; n++) put(D, i0 + n, f.run(noise(), 5000, 2).bp * Math.exp(-n / SR * 400) * g, noise() * .4);
}
function impact(t0, g = 1) {
  const i0 = Math.round(t0 * SR), f = new SVF(); let ph = 0;
  kick(t0, g);
  for (let n = 0; n < SR * 2.6; n++) {
    const tt = n / SR; ph += TAU * (34 + 26 * Math.exp(-tt * 3)) / SR;
    const boom = Math.sin(ph) * Math.exp(-tt * 2.1) * .9;
    const nz = f.run(noise(), 200 + 9000 * Math.exp(-tt * 5), .8).lp * Math.exp(-tt * 4.5) * .55;
    put(D, i0 + n, (boom + nz) * g, 0, .5);
  }
}
function riser(t0, dur, g = 1) {
  const i0 = Math.round(t0 * SR), f = new SVF(); let ph = 0;
  for (let n = 0; n < SR * dur; n++) {
    const x = n / (SR * dur), fc = 300 * 30 ** x;
    ph += TAU * (180 * 6 ** x) / SR;
    const v = f.run(noise(), fc, 3.5).bp * 1.4 + Math.sin(ph) * .12;
    put(D, i0 + n, v * x * x * g, Math.sin(x * 9) * .3, .4);
  }
}
function whoosh(tc, g = 1) {
  const a = tc - .42, len = .6, i0 = Math.round(a * SR), f = new SVF();
  for (let n = 0; n < SR * len; n++) {
    const tt = n / SR, x = tt / len, peak = .42 / len;
    const env = x < peak ? (x / peak) ** 2 : Math.exp(-(x - peak) * 14);
    const fc = x < peak ? 400 * 10 ** (x / peak) : 4000 * Math.exp(-(x - peak) * 5);
    put(D, i0 + n, f.run(noise(), fc, 1.6).bp * env * g * 1.3, lerp(-.8, .8, x), .3);
  }
}
const lerp = (a, b, t) => a + (b - a) * t;

// ── harmony ──
const CH = { Am: [[57, 60, 64], 45], F: [[57, 60, 65], 41], C: [[55, 60, 64], 48], G: [[55, 59, 62], 43], E: [[56, 59, 64], 40] };
const PROG = [[0, 'Am'], [6, 'Am'], [8, 'F'], [10, 'G'], [12, 'Am'], [14, 'F'], [16, 'C'], [18, 'C'], [20, 'G'],
  [22, 'Am'], [24, 'F'], [26, 'C'], [28, 'G'], [30, 'Am'], [32, 'F'], [34, 'C'], [36, 'G'], [38, 'G'], [39, 'E'],
  [40, 'F'], [42, 'G'], [44, 'Am'], [45, 'E'], [46, 'Am'], [47, 'F'], [48, 'C'], [49, 'G'], [50, 'Am'], [51, 'E'],
  [52, 'Am'], [53, 'F'], [54, 'C'], [55.6, 'F'], [57.3, 'Am'], [60, null]];
const chordAt = t => { let c = 'Am'; for (const [s, n] of PROG) if (t >= s && n) c = n; return CH[c]; };

// ── score ──
// 00 SIGNAL (0–6): dot pop, static resolving into a tone, typing, riser
blip(.3, 880, .25); blip(.3, 440, .2);
{
  const f = new SVF(); let ph1 = 0, ph2 = 0;
  for (let n = Math.round(1.0 * SR); n < 5.55 * SR; n++) {
    const t = n / SR;
    const nz = 1 - smooth((t - 2.3) / 1.6), tone = smooth((t - 2.0) / 1.4) * (1 - smooth((t - 5.1) / .45));
    const fr = 220 * (1 + .75 * smooth((t - 4.2) / .9));
    ph1 += TAU * fr / SR; ph2 += TAU * fr * 1.5 / SR;
    const crackle = rnd() < .002 * nz ? noise() * 2 : 0;
    const st = (f.run(noise(), 2200, .7).bp * .5 + crackle) * nz * .32 * smooth((t - 1) / .3);
    put(D, n, st + (Math.sin(ph1) * .7 + Math.sin(ph2) * .25) * tone * .28, 0, .2);
  }
}
for (let i = 0; i < 35; i++) tick(3.0 + i / 26, .55);
pad(0.4, 5.6, CH.Am[0], .8, 700);
riser(3.9, 2.1, .32);
whoosh(6.0, .35);

// 01 HELLO (6–12)
impact(6.0, .85);
for (let b = 6.5; b < 12; b += .5) kick(b, .65);
for (let b = 8.25; b < 12; b += .5) hat(b, .12);
for (let i = 0; i < 8; i++) blip(7.7 + i * .5, 1320 + (i % 3) * 220, .09, (i % 2 ? .4 : -.4));
whoosh(12.0, .35);

// 02 PHILOSOPHY → 03 JOURNEY (12–22)
impact(12.0, .6);
for (let b = 12.5; b < 22; b += .5) kick(b, .9);
for (let b = 12.5; b < 22; b += 1) clap(b, .5);
for (let s = 12; s < 22; s += .125) hat(s, (s * 8) % 4 === 2 ? .14 : .06, false, (s * 8) % 2 ? .25 : -.1);
tom(13.75, .5);
riser(16.4, 1.6, .25); whoosh(18.0, .35);
impact(18.0, .45);
bell(19.6, 81, .45, .4);
[20.1, 20.4, 20.7].forEach((t, i) => blip(t, 990 + i * 165, .1));
for (let s = 21.5; s < 22; s += .0625) clap(s, .12 + (s - 21.5) * .6);
whoosh(22.0, .4);

// 04 SELECTED WORK (22–40): the drop
impact(22.0, 1);
for (let b = 22.5; b < 40; b += .5) kick(b, 1);
for (let b = 22.5; b < 40; b += 1) clap(b, .55);
for (let s = 22; s < 40; s += .125) hat(s, (s * 8) % 4 === 2 ? .16 : .07, false, (s * 8) % 2 ? .25 : -.1);
for (let s = 22.25; s < 40; s += .5) hat(s, .07, true, -.2);
[26.5, 31, 35.5].forEach(b => { whoosh(b, .4); kick(b, .6); });
whoosh(40.0, .4);

// 05 TOOLKIT (40–46): breakdown, sparkles, build
impact(40.0, .5);
for (let k = 0; k < 14; k++) blip(40.35 + k * .06, 1760 + (k % 4) * 330, .045, (k % 2 ? .6 : -.6));
riser(43.6, 2.4, .38);
for (let s = 45; s < 46; s += s < 45.5 ? .125 : .0625) clap(s, .1 + (s - 45) * .5);
whoosh(46.0, .4);

// 06 HIGHLIGHTS (46–52): a stab on every card
impact(46.0, .9);
for (let i = 0; i < 12; i++) { const b = 46 + i * .5; if (i) kick(b, 1); stab(b, chordAt(b)[0], .9); }
for (let b = 46.5; b < 52; b += 1) clap(b, .55);
for (let s = 46; s < 52; s += .125) hat(s, (s * 8) % 4 === 2 ? .16 : .08, false, (s * 8) % 2 ? .25 : -.1);

// 07 CONTACT (52–60)
impact(52.0, 1);
[[52.05, 76], [52.95, 74], [53.85, 72]].forEach(([t, m]) => bell(t, m, .5, .2));
whoosh(55.2, .22);
bell(55.7, 69, .4, -.2); bell(55.7, 76, .3, .2);
kick(57.25, .55); kick(57.42, .4);
blip(59.5, 1760, .12); blip(59.5, 880, .1);

// harmony beds
for (let k = 0; k < PROG.length - 1; k++) {
  const [s, n] = PROG[k], e = PROG[k + 1][0];
  if (!n || s < 6) continue;
  const [notes, b] = CH[n];
  const breakdown = s >= 40 && s < 46, outro = s >= 52;
  pad(s, e - s, notes, outro ? .9 : breakdown ? 1.1 : .75, breakdown ? 700 + (s - 40) * 220 : outro ? 900 : 1300);
  if (!breakdown && !outro) {
    const lvl = s < 12 ? .22 : s < 22 ? .32 : .4;
    for (let t = s + .25; t < e - 1e-6; t += .5) bass(t, .2, b, lvl, s < 22 ? .8 : 1.1);
  }
}
// arp: work section full, breakdown filtered open
for (let st = 0; st * .125 < 24; st++) {
  const t = 22 + st * .125;
  if (t >= 46) break;
  const [notes] = chordAt(t), tones = [notes[0], notes[1], notes[2], notes[0] + 12].map(m => m + 12);
  const m = tones[[0, 1, 2, 3, 1, 2, 3, 2][st % 8]];
  const bd = t >= 40;
  pluck(t, m, bd ? .1 + .05 * (t - 40) / 6 : .13, bd ? 500 + 2500 * ((t - 40) / 6) ** 2 : 2600, st % 2 ? .35 : -.35);
}
for (let st = 0; st < 48; st++) { const t = 46 + st * .125; const [notes] = chordAt(t); pluck(t, notes[st % 3] + 24, .08, 3200, st % 2 ? .4 : -.4); }

function smooth(x) { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); }

// ── side-chain from kicks ──
for (const tk of kicks) {
  const i0 = Math.round(tk * SR);
  for (let n = 0; n < SR * .32 && i0 + n < N; n++) { const x = n / (SR * .32); const v = 1 - .55 * (1 - x) ** 2; if (v < duck[i0 + n]) duck[i0 + n] = v; }
}
// ── ping-pong delay on arp (dotted eighth) ──
{
  const d = Math.round(.375 * SR), bl = new Float32Array(N), br = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const fl = i >= d ? br[i - d] : 0, fr = i >= d ? bl[i - d] : 0;
    bl[i] = aL[i] + fr * .38; br[i] = aR[i] + fl * .38;
    mL[i] += aL[i] + (i >= d ? br[i - d] : 0) * .35; mR[i] += aR[i] + (i >= d ? bl[i - d] : 0) * .35;
  }
}
// ── reverb (Freeverb-style) ──
function reverb(input, offset) {
  const combs = [1557, 1617, 1491, 1422, 1277, 1356, 1188, 1116].map(x => Math.round((x + offset) * SR / 44100));
  const out = new Float32Array(N);
  for (const L of combs) {
    const buf = new Float32Array(L); let idx = 0, store = 0;
    for (let i = 0; i < N; i++) { const o = buf[idx]; store = o * .8 + store * .2; buf[idx] = input[i] + store * .86; idx = (idx + 1) % L; out[i] += o; }
  }
  for (const L of [556, 441, 341, 225].map(x => Math.round((x + offset) * SR / 44100))) {
    const buf = new Float32Array(L); let idx = 0;
    for (let i = 0; i < N; i++) { const b = buf[idx], o = -out[i] + b; buf[idx] = out[i] + b * .5; idx = (idx + 1) % L; out[i] = o; }
  }
  return out;
}
const rvL = reverb(rev, 0), rvR = reverb(rev, 23);

// ── master ──
const outL = new Float32Array(N), outR = new Float32Array(N);
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR, fade = t > 58.6 ? Math.max(0, 1 - (t - 58.6) / 1.4) : 1;
  outL[i] = dL[i] + (mL[i] * duck[i] + rvL[i] * .028) * fade;
  outR[i] = dR[i] + (mR[i] * duck[i] + rvR[i] * .028) * fade;
  peak = Math.max(peak, Math.abs(outL[i]), Math.abs(outR[i]));
}
const drive = 1.25, norm = Math.tanh(drive);
let peak2 = 0;
for (let i = 0; i < N; i++) {
  outL[i] = Math.tanh(outL[i] / peak * drive * 1.15) / norm; outR[i] = Math.tanh(outR[i] / peak * drive * 1.15) / norm;
  peak2 = Math.max(peak2, Math.abs(outL[i]), Math.abs(outR[i]));
}
const wav = Buffer.alloc(44 + N * 4);
wav.write('RIFF', 0); wav.writeUInt32LE(36 + N * 4, 4); wav.write('WAVE', 8); wav.write('fmt ', 12);
wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22); wav.writeUInt32LE(SR, 24);
wav.writeUInt32LE(SR * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, outL[i] / peak2 * .89)) * 32767), 44 + i * 4);
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, outR[i] / peak2 * .89)) * 32767), 46 + i * 4);
}
const out = join(dirname(fileURLToPath(import.meta.url)), 'showreel-music.wav');
writeFileSync(out, wav);
console.log('wrote', out);
