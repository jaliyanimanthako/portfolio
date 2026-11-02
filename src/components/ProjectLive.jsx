import { useEffect, useRef, useState } from 'react';

// Live figures from the showreel, redrawn in the site's light palette.
// They cross-fade over the card illustration on hover/focus; on touch screens they alternate while in view.
const K = { ink: '#202020', paper: '#fefdf9', purple: '#7952b3', lav: '#e9dcff', mid: '#b39ae0', muted: '#7a7772', tint: '#f4effc' };
const SANS = '"DM Sans", Arial, sans-serif', MONO = 'ui-monospace, "SF Mono", Menlo, monospace';
const VW = 834, VH = 620;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const P = (t, a, b) => clamp((t - a) / (b - a));
const outExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const outCubic = (x) => 1 - Math.pow(1 - x, 3);
const inOutCubic = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const inOutExpo = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x < .5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2);
const outBack = (x) => (x <= 0 ? 0 : 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2));
function h1(i) {
  let x = Math.imul(i | 0, 0x27d4eb2d) ^ 0x165667b1;
  x ^= x >>> 15; x = Math.imul(x, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16;
  return (x >>> 0) / 4294967295;
}
const noise1 = (x) => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(h1(i), h1(i + 1), u) * 2 - 1; };
const fbm = (x) => noise1(x) * .6 + noise1(x * 2.13 + 13.7) * .3 + noise1(x * 4.37 + 71.1) * .1;
const gss = (x, m, s) => Math.exp(-((x - m) ** 2) / (2 * s * s));
const cbez = (a, b, c, d, s) => { const m = 1 - s; return [m * m * m * a[0] + 3 * m * m * s * b[0] + 3 * m * s * s * c[0] + s * s * s * d[0], m * m * m * a[1] + 3 * m * m * s * b[1] + 3 * m * s * s * c[1] + s * s * s * d[1]]; };
const typed = (s, t, t0, cps = 30) => s.slice(0, clamp(Math.floor((t - t0) * cps), 0, s.length));

let ctx;
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
function font(size, weight = 400, fam = SANS) { ctx.font = `${weight} ${size}px ${fam}`; }
function text(s, x, y, { size = 18, weight = 400, fam = SANS, color = K.ink, align = 'left', ls = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return 0;
  font(size, weight, fam); ctx.letterSpacing = `${ls}px`; ctx.textAlign = align; ctx.fillStyle = color;
  const g = ctx.globalAlpha; ctx.globalAlpha = g * alpha; ctx.fillText(s, x, y); ctx.globalAlpha = g;
  const w = ctx.measureText(s).width; ctx.letterSpacing = '0px'; return w;
}
function measure(s, size, weight = 400, fam = SANS) { font(size, weight, fam); return ctx.measureText(s).width; }
function wrap(s, maxW, size, weight = 400) {
  font(size, weight); const out = []; let line = '';
  for (const w of s.split(' ')) { const next = line ? `${line} ${w}` : w; if (ctx.measureText(next).width > maxW && line) { out.push(line); line = w; } else line = next; }
  if (line) out.push(line); return out;
}
function rrect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function circle(x, y, r, col) { if (r <= 0) return; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); }
function polyline(pts, col, lw) {
  if (pts.length < 2) return;
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
}
function withAlpha(a, fn) { if (a <= 0) return; const g = ctx.globalAlpha; ctx.globalAlpha = g * a; fn(); ctx.globalAlpha = g; }
function riseLine(s, x, y, { t, t0, size, ...o }) {
  const p = outExpo(P(t, t0, t0 + .7)); if (p <= 0) return;
  const w = measure(s, size, o.weight, o.fam);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 10, y - size * 1.05, w + 20, size * 1.4); ctx.clip();
  text(s, x, y + (1 - p) * size * 1.2, { size, ...o }); ctx.restore();
}
function pill(x, y, s, { size = 14, h = 28, padX = 12, fill, color }) {
  const w = measure(s, size, 500, MONO) + padX * 2;
  rrect(x, y, w, h, h / 2); ctx.fillStyle = fill; ctx.fill();
  ctx.textBaseline = 'middle'; text(s, x + padX, y + h / 2 + 1, { size, weight: 500, fam: MONO, color }); ctx.textBaseline = 'alphabetic';
  return w;
}

function vizEEG(u) {
  const rev = inOutCubic(P(u, .2, 1.1)), cols = 96, cw = VW / cols;
  const env = (xw) => clamp((fbm(xw * .035) + .55) / 1.3) ** 1.6;
  const scroll = u * 30;
  text('SPEECH ENVELOPE', 0, 20, { size: 18, fam: MONO, color: K.muted, ls: 2 });
  const cy0 = 108, envPts = [];
  for (let c = 0; c < cols * rev; c++) {
    const xw = c + scroll, e = env(xw), hgt = e * 62 * (.45 + .55 * h1(Math.floor(xw) * 7));
    ctx.fillStyle = rgba(K.mid, .75); ctx.fillRect(c * cw + 1, cy0 - hgt, cw - 3, hgt * 2);
    envPts.push([c * cw + cw / 2, cy0 - e * 66 - 6]);
  }
  polyline(envPts, K.purple, 2.5);
  const couple = inOutCubic(P(u, 1.1, 2.9));
  const chs = ['Fz', 'Cz', 'Pz', 'Oz', 'T7', 'T8'], top = 220, sp = 54;
  text('EEG · 6 CH', 0, top - 12, { size: 18, fam: MONO, color: K.muted, ls: 2 });
  chs.forEach((ch, i) => {
    const y = top + 26 + i * sp;
    text(ch, 0, y + 6, { size: 18, fam: MONO, color: K.muted });
    const pts = [];
    for (let x = 0; x < (VW - 60) * rev; x += 3) {
      const xw = x / cw + scroll;
      pts.push([60 + x, y - (11 * fbm(xw * .55 + i * 50 + u * 2) + couple * 17 * (env(xw - 4) - .3) * (i % 3 === 2 ? .6 : 1))]);
    }
    polyline(pts, rgba(K.ink, .62), 1.6);
  });
  const wx = 60 + ((u * 150) % (VW - 190));
  withAlpha(P(u, 1.1, 1.5), () => { ctx.fillStyle = rgba(K.purple, .07); ctx.fillRect(wx, 40, 130, 520); ctx.fillStyle = rgba(K.purple, .45); ctx.fillRect(wx, 40, 2, 520); });
  const my = 608;
  text('NEURAL TRACKING', 0, my, { size: 18, fam: MONO, color: K.purple, ls: 2, alpha: P(u, .9, 1.2) });
  ctx.fillStyle = rgba(K.ink, .1); ctx.fillRect(240, my - 9, 360, 6);
  ctx.fillStyle = K.purple; ctx.fillRect(240, my - 9, 360 * couple, 6);
  text('speech → cortex', VW, my, { size: 18, fam: MONO, color: K.muted, align: 'right', alpha: P(u, .9, 1.2) });
}

function vizSDK(u) {
  const fx = VW - 320, fy = 6, fw = 300, fh = 606;
  const ap = outExpo(P(u, .05, .7));
  ctx.save(); ctx.translate(0, (1 - ap) * 50); ctx.globalAlpha = ap;
  rrect(fx, fy, fw, fh, 44); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = rgba(K.ink, .85); ctx.lineWidth = 3; ctx.stroke();
  rrect(fx + fw / 2 - 40, fy + 14, 80, 18, 9); ctx.fillStyle = K.ink; ctx.fill();
  const sx = fx + 16, sy = fy + 46, sw = fw - 32, sh = fh - 66;
  ctx.save(); rrect(sx, sy, sw, sh, 26); ctx.fillStyle = '#faf8fd'; ctx.fill(); ctx.clip();
  ctx.translate(0, -inOutExpo(P(u, 2.6, 2.9)) * sh);
  text('AiSee', sx + 14, sy + 34, { size: 26, weight: 600 });
  text('MODEL HUB', sx + sw - 14, sy + 32, { size: 13, fam: MONO, color: K.muted, align: 'right', ls: 1 });
  rrect(sx + 12, sy + 52, sw - 24, 46, 23); ctx.fillStyle = '#ece5f8'; ctx.fill();
  const q = typed('llama gguf', u, .45, 20);
  const qw = text(q, sx + 30, sy + 82, { size: 19, fam: MONO });
  if (Math.floor(u * 3) % 2 === 0) { ctx.fillStyle = K.purple; ctx.fillRect(sx + 32 + qw, sy + 64, 2, 22); }
  [['Llama-3.2-1B-Instruct', 'Q4_K_M · 0.8 GB'], ['Llama-3.2-3B-Instruct', 'Q4_K_M · 2.0 GB'], ['TinyLlama-1.1B-Chat', 'Q5_K_M · 0.8 GB'], ['Llama-3.1-8B-Instruct', 'Q4_0 · 4.7 GB']].forEach(([n, s], i) => {
    const rp = outExpo(P(u, 1.0 + i * .08, 1.4 + i * .08)); if (rp <= 0) return;
    const ry = sy + 114 + i * 84, rx = sx + 12 + (1 - rp) * 120;
    ctx.globalAlpha = ap * rp;
    rrect(rx, ry, sw - 24, 74, 14); ctx.fillStyle = i === 0 && u > 1.6 ? rgba(K.purple, .16) : '#f1edf6'; ctx.fill();
    text(n, rx + 14, ry + 31, { size: 18, weight: 600 });
    text(s, rx + 14, ry + 56, { size: 15, fam: MONO, color: K.muted });
    if (i === 0 && u > 1.7) {
      const dp = P(u, 1.7, 2.45);
      ctx.fillStyle = rgba(K.ink, .12); ctx.fillRect(rx + 14, ry + 64, sw - 52, 4);
      ctx.fillStyle = K.purple; ctx.fillRect(rx + 14, ry + 64, (sw - 52) * dp, 4);
      text(dp < 1 ? `${Math.round(dp * 100)}%` : 'READY', rx + sw - 38, ry + 56, { size: 14, fam: MONO, color: K.purple, align: 'right' });
    }
    ctx.globalAlpha = ap;
  });
  const by = sy + sh;
  text('AiSee', sx + 14, by + 34, { size: 26, weight: 600 });
  pill(sx + sw - 112, by + 14, '● LOCAL', { size: 13, h: 28, padX: 10, fill: K.lav, color: K.purple });
  const uq = "What's in front of me?", uw = measure(uq, 17, 500) + 28;
  rrect(sx + sw - 12 - uw, by + 66, uw, 44, 20); ctx.fillStyle = K.purple; ctx.fill();
  text(uq, sx + sw - 12 - uw + 14, by + 94, { size: 17, weight: 500, color: K.paper });
  const ans = 'A desk with an open laptop. Your blue mug is just to the right, and a notebook sits in front of you.';
  if (u > 2.9) {
    const shown = typed(ans, u, 3.0, 46), lines = wrap(ans, sw - 60, 17), bh = lines.length * 25 + 26;
    rrect(sx + 12, by + 126, sw - 34, bh, 18); ctx.fillStyle = '#ece5f8'; ctx.fill();
    let left = shown.length;
    lines.forEach((ln, i) => { text(ln.slice(0, Math.max(0, left)), sx + 28, by + 154 + i * 25, { size: 17 }); left -= ln.length + 1; });
    text('on-device · offline', sx + 14, by + 150 + bh, { size: 13, fam: MONO, color: K.muted, alpha: P(u, 3.3, 3.6) });
  }
  ctx.restore(); ctx.restore();
  [['HUGGING FACE HUB', .9, sy + 75], ['.GGUF MODELS', 1.3, sy + 150], ['ON-DEVICE INFERENCE', 2.95, sy + 200], ['ZERO BYTES TO CLOUD', 3.3, sy + 330]].forEach(([s, t0, ty], i) => {
    const p = outExpo(P(u, t0, t0 + .45)), fade = i < 2 ? 1 - P(u, 2.55, 2.75) : 1;
    const ly = 80 + i * 130;
    withAlpha(fade * p, () => {
      const w = text(s, 0, ly, { size: 19, fam: MONO, color: K.purple, ls: 1 });
      const x1 = w + 14, x2 = lerp(x1, fx + 10, p);
      ctx.strokeStyle = rgba(K.purple, .5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x1, ly - 6); ctx.lineTo(x2, ty); ctx.stroke();
      circle(x2, ty, 4.5, K.purple);
    });
  });
}

const ecg = (ts) => { const p = (((ts % .833) + .833) % .833) / .833; return .12 * gss(p, .18, .025) - .13 * gss(p, .27, .009) + gss(p, .30, .011) - .28 * gss(p, .335, .011) + .3 * gss(p, .56, .045); };
const ppg = (ts) => { const p = ((((ts - .2) % .833) + .833) % .833) / .833; return .85 * gss(p, .25, .08) + .35 * gss(p, .52, .07); };
function vizECG(u) {
  const gh = 300;
  ctx.fillStyle = rgba(K.lav, .35); ctx.fillRect(0, 0, VW, gh);
  for (let x = 0; x <= VW; x += 20) { ctx.fillStyle = rgba(K.purple, x % 100 ? .05 : .12); ctx.fillRect(x, 0, 1, gh); }
  for (let y = 0; y <= gh; y += 20) { ctx.fillStyle = rgba(K.purple, y % 100 ? .05 : .12); ctx.fillRect(0, y, VW, 1); }
  text('ECG · LEAD II', 14, 30, { size: 18, fam: MONO, color: K.purple, ls: 2 });
  const sweep = (fn, x0, y0, w, amp, speed, col, lw, delay) => {
    const hx = ((u - delay) * speed) % w; let seg = [];
    const flush = () => { polyline(seg, col, lw); seg = []; };
    for (let x = 0; x < w; x += 2) {
      if (x > hx && x < hx + 36) { flush(); continue; }
      const ts = u - (x <= hx ? (hx - x) / speed : (hx + w - x) / speed);
      if (ts < delay) { flush(); continue; }
      seg.push([x0 + x, y0 - fn(ts) * amp]);
    }
    flush();
    if (u > delay) circle(x0 + hx, y0 - fn(u) * amp, 5.5, K.ink);
  };
  sweep(ecg, 0, 205, VW, 135, 520, K.purple, 3, .1);
  const py = 330;
  text('PPG', 0, py + 20, { size: 18, fam: MONO, color: K.muted, ls: 2 });
  sweep(ppg, 64, py + 115, 440, 72, 420, K.mid, 3, .3);
  const bx = 590, by = py + 105, beat = (u % .833) / .833, pulse = 1 + .18 * gss(beat, .31, .04);
  withAlpha(P(u, .4, .7), () => {
    ctx.save(); ctx.translate(bx + 22, by - 50); ctx.scale(pulse * 1.5, pulse * 1.5);
    ctx.beginPath(); ctx.moveTo(0, 6); ctx.bezierCurveTo(-14, -6, -8, -16, 0, -8); ctx.bezierCurveTo(8, -16, 14, -6, 0, 6); ctx.fillStyle = K.purple; ctx.fill();
    ctx.restore();
    text(String(Math.round(lerp(0, 72, outCubic(P(u, .5, 1.3))))), bx + 54, by, { size: 110, weight: 600, ls: -3 });
    text('BPM', bx + 56, by + 34, { size: 16, fam: MONO, color: K.muted, ls: 3 });
    text('SpO₂ 98%', bx + 140, by + 34, { size: 16, fam: MONO, color: K.purple, ls: 1 });
  });
  const cy = 505;
  text('ML CLASSIFIER · REAL-TIME', 0, cy, { size: 18, fam: MONO, color: K.purple, ls: 2, alpha: P(u, 1.5, 1.8) });
  [['Normal sinus rhythm', .94], ['Arrhythmia', .04], ['Noise / artifact', .02]].forEach(([l, v], i) => {
    const y = cy + 38 + i * 36, f = outExpo(P(u, 1.7 + i * .1, 2.5 + i * .1));
    text(l, 0, y, { size: 20, color: i ? K.muted : K.ink, alpha: P(u, 1.6, 1.9) });
    ctx.fillStyle = rgba(K.ink, .08); ctx.fillRect(270, y - 11, 440, 9);
    ctx.fillStyle = i ? K.mid : K.purple; ctx.fillRect(270, y - 11, 440 * v * f, 9);
    text((v * f).toFixed(2), 730, y, { size: 18, fam: MONO, color: i ? K.muted : K.purple, alpha: P(u, 1.7, 1.9) });
  });
}

function vizRAG(u) {
  const node = (x, y, w, h, t0, label, fn) => {
    const p = outBack(P(u, t0, t0 + .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(p, p); ctx.translate(-(x + w / 2), -(y + h / 2));
    rrect(x, y, w, h, 16); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = rgba(K.purple, .35); ctx.lineWidth = 1.5; ctx.stroke();
    text(label, x + 16, y + 30, { size: 15, fam: MONO, color: K.purple, ls: 1.5 });
    fn?.(x, y, w, h); ctx.restore();
  };
  const Q = [0, 10, 350, 150], EM = [430, 40, 180, 90], DB = [660, 0, 174, 236], LM = [530, 336, 304, 132], AN = [0, 290, 490, 330];
  const edge = (a, b, c, d, t0, k) => {
    const p = inOutCubic(P(u, t0, t0 + .5)); if (p <= 0) return;
    const pts = []; for (let s = 0; s <= p + 1e-6; s += .02) pts.push(cbez(a, b, c, d, Math.min(s, p)));
    polyline(pts, rgba(K.purple, .4), 2.2);
    if (p >= 1) for (let j = 0; j < 3; j++) { const pt = cbez(a, b, c, d, (u * .9 + j / 3 + k * .17) % 1); circle(pt[0], pt[1], 5, K.purple); }
  };
  edge([Q[0] + Q[2], Q[1] + 75], [Q[0] + Q[2] + 40, Q[1] + 75], [EM[0] - 40, EM[1] + 45], [EM[0], EM[1] + 45], .5, 0);
  edge([EM[0] + EM[2], EM[1] + 45], [EM[0] + EM[2] + 30, EM[1] + 45], [DB[0] - 30, DB[1] + 118], [DB[0], DB[1] + 118], 1.0, 1);
  edge([DB[0] + DB[2] / 2, DB[1] + DB[3]], [DB[0] + DB[2] / 2, DB[1] + DB[3] + 50], [LM[0] + LM[2] - 87, LM[1] - 50], [LM[0] + LM[2] - 87, LM[1]], 1.7, 2);
  edge([LM[0], LM[1] + 66], [LM[0] - 30, LM[1] + 66], [AN[0] + AN[2] + 30, AN[1] + 110], [AN[0] + AN[2], AN[1] + 110], 2.35, 3);
  node(...Q, .15, 'STUDENT PROFILE', (x, y) => {
    text(typed('Z-score 1.8421', u, .3, 30), x + 16, y + 84, { size: 36, weight: 600, ls: -.5 });
    text('Physical Science · Colombo', x + 16, y + 122, { size: 20, color: K.muted, alpha: P(u, .65, .85) });
  });
  node(...EM, .8, 'EMBED', (x, y) => { for (let i = 0; i < 14; i++) { const v = .5 + .5 * Math.sin(i * 1.7 + u * 5); ctx.fillStyle = rgba(K.purple, .25 + .6 * v); ctx.fillRect(x + 16 + i * 10.5, y + 76 - v * 28, 6, v * 28 + 2); } });
  node(...DB, 1.2, 'VECTORS', (x, y) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) {
      const near = [8, 14, 15, 21].includes(r * 6 + c) && u > 1.65;
      circle(x + 26 + c * 25, y + 60 + r * 24, near ? 6.5 : 3.5, near ? K.purple : rgba(K.ink, .22));
    }
  });
  node(...LM, 1.9, 'LANGCHAIN → OPENAI', (x, y) => {
    text('Retrieval-augmented', x + 16, y + 70, { size: 22, weight: 500 });
    text('generation', x + 16, y + 100, { size: 22, weight: 500 });
    for (let i = 0; i < 3; i++) circle(x + 240 + i * 16, y + 94, 4.5 * (.5 + .5 * Math.sin(u * 8 - i)), K.purple);
  });
  node(...AN, 2.5, 'RECOMMENDED PROGRAMS', (x, y) => {
    [['Engineering', 'University of Moratuwa', .96], ['Physical Science', 'University of Colombo', .88], ['Engineering', 'University of Peradeniya', .82]].forEach(([a, b, v], i) => {
      const t0 = 2.8 + i * .15, yy = y + 84 + i * 86;
      riseLine(a, x + 16, yy, { t: u, t0, size: 24, weight: 600, color: K.ink });
      riseLine(b, x + 16, yy + 28, { t: u, t0: t0 + .05, size: 19, color: K.muted });
      ctx.fillStyle = rgba(K.ink, .08); ctx.fillRect(x + 320, yy - 9, 150, 7);
      ctx.fillStyle = i ? K.mid : K.purple; ctx.fillRect(x + 320, yy - 9, 150 * v * outExpo(P(u, t0, t0 + .6)), 7);
    });
  });
}

const VIZ = { voices: vizEEG, microchip: vizSDK, biosense: vizECG, campus: vizRAG };
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ProjectLive({ kind }) {
  const canvas = useRef(null);
  const [live, setLive] = useState(false);

  // Hover/focus on the whole card shows the figure; touch screens alternate while the card is on screen.
  useEffect(() => {
    const visual = canvas.current.parentElement, card = visual.closest('.project-card');
    const show = () => setLive(true), hide = () => setLive(false);
    const enter = (e) => { if (e.pointerType !== 'touch') show(); }, leave = (e) => { if (e.pointerType !== 'touch') hide(); };
    card.addEventListener('pointerenter', enter); card.addEventListener('pointerleave', leave);
    card.addEventListener('focus', show); card.addEventListener('blur', hide);
    let timer;
    const touch = window.matchMedia('(hover: none)').matches && !reducedMotion();
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (!entry.isIntersecting) { hide(); return; }
      const cycle = (on) => { setLive(on); timer = setTimeout(() => cycle(!on), on ? 7000 : 3500); };
      timer = setTimeout(() => cycle(true), 1200);
    }, { threshold: .6 });
    if (touch) observer.observe(visual);
    return () => { observer.disconnect(); clearTimeout(timer); card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave);
      card.removeEventListener('focus', show); card.removeEventListener('blur', hide);
    };
  }, []);

  useEffect(() => {
    const c = canvas.current;
    c.parentElement.dataset.live = String(live);
    if (!live) return;
    const draw = VIZ[kind];
    const start = performance.now(), still = reducedMotion();
    let frame;
    const render = (now) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = c.clientWidth, h = c.clientHeight;
      if (c.width !== Math.round(w * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
      ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const s = Math.min(w * .88 / VW, h * .66 / VH);
      ctx.translate((w - VW * s) / 2, h * .14); ctx.scale(s, s);
      draw(still ? 6 : (now - start) / 1000);
      if (!still) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [live, kind]);

  return <>
    <canvas ref={canvas} className="project-live" aria-hidden="true" />
    <span className="project-live-chip" aria-hidden="true">Live figure</span>
  </>;
}
