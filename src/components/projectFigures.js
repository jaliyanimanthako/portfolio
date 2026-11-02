// Canvas figures for the project cards, drawn in the site's light palette.
// Every figure draws into a VW×VH logical space at time u (seconds); paintFigure fits it to a canvas.
const K = { ink: '#202020', paper: '#fefdf9', purple: '#7952b3', lav: '#e9dcff', mid: '#b39ae0', muted: '#7a7772', tint: '#f4effc' };
const SANS = '"DM Sans", Arial, sans-serif', MONO = 'ui-monospace, "SF Mono", Menlo, monospace';
const SINHALA = '"Sinhala Sangam MN", "Sinhala MN", "Noto Sans Sinhala", "Iskoola Pota", sans-serif';
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
const label = (s, x, y, o = {}) => text(s, x, y, { size: 18, fam: MONO, color: K.muted, ls: 2, ...o });
function measure(s, size, weight = 400, fam = SANS) { font(size, weight, fam); return ctx.measureText(s).width; }
function wrap(s, maxW, size, weight = 400) {
  font(size, weight); const out = []; let line = '';
  for (const w of s.split(' ')) { const next = line ? `${line} ${w}` : w; if (ctx.measureText(next).width > maxW && line) { out.push(line); line = w; } else line = next; }
  if (line) out.push(line); return out;
}
function rrect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function box(x, y, w, h, r, fill, stroke, lw = 2) { rrect(x, y, w, h, r); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function circle(x, y, r, col) { if (r <= 0) return; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); }
function polyline(pts, col, lw) {
  if (pts.length < 2) return;
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
}
function dashed(pts, col, lw, dash = [6, 6], offset = 0) { ctx.setLineDash(dash); ctx.lineDashOffset = offset; polyline(pts, col, lw); ctx.setLineDash([]); ctx.lineDashOffset = 0; }
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
function bar(x, y, w, h, v, col = K.purple) { ctx.fillStyle = rgba(K.ink, .08); ctx.fillRect(x, y, w, h); ctx.fillStyle = col; ctx.fillRect(x, y, w * clamp(v), h); }
// Ranked probabilities; the first row is the prediction.
function probBars(rows, x, y, u, t0, { labelW = 200, w = 300, gap = 42, size = 20 } = {}) {
  rows.forEach(([l, v], i) => {
    const yy = y + i * gap, f = outExpo(P(u, t0 + i * .08, t0 + .8 + i * .08));
    text(l, x, yy, { size, color: i ? K.muted : K.ink, alpha: P(u, t0 - .2, t0 + .1) });
    bar(x + labelW, yy - 10, w, 8, v * f, i ? K.mid : K.purple);
    text((v * f).toFixed(2), x + labelW + w + 14, yy, { size: size - 2, fam: MONO, color: i ? K.muted : K.purple, alpha: P(u, t0, t0 + .2) });
  });
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
  const ap = outExpo(P(u, .05, .7)), A = ctx.globalAlpha;
  ctx.save(); ctx.translate(0, (1 - ap) * 50); ctx.globalAlpha = A * ap;
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
    ctx.globalAlpha = A * ap * rp;
    rrect(rx, ry, sw - 24, 74, 14); ctx.fillStyle = i === 0 && u > 1.6 ? rgba(K.purple, .16) : '#f1edf6'; ctx.fill();
    text(n, rx + 14, ry + 31, { size: 18, weight: 600 });
    text(s, rx + 14, ry + 56, { size: 15, fam: MONO, color: K.muted });
    if (i === 0 && u > 1.7) {
      const dp = P(u, 1.7, 2.45);
      ctx.fillStyle = rgba(K.ink, .12); ctx.fillRect(rx + 14, ry + 64, sw - 52, 4);
      ctx.fillStyle = K.purple; ctx.fillRect(rx + 14, ry + 64, (sw - 52) * dp, 4);
      text(dp < 1 ? `${Math.round(dp * 100)}%` : 'READY', rx + sw - 38, ry + 56, { size: 14, fam: MONO, color: K.purple, align: 'right' });
    }
    ctx.globalAlpha = A * ap;
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
  const node = (x, y, w, h, t0, title, fn) => {
    const p = outBack(P(u, t0, t0 + .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(p, p); ctx.translate(-(x + w / 2), -(y + h / 2));
    rrect(x, y, w, h, 16); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = rgba(K.purple, .35); ctx.lineWidth = 1.5; ctx.stroke();
    text(title, x + 16, y + 30, { size: 15, fam: MONO, color: K.purple, ls: 1.5 });
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

// GGUF converter: clone → convert → quantize; the weight grid snaps to 4-bit levels as the size drops.
function vizGGUF(u) {
  const q = inOutCubic(P(u, 2.2, 3.7));
  let px = 0;
  [['clone llama.cpp', .9], ['convert → GGUF', 1.9], ['quantize Q4_K_M', 3.7]].forEach(([s, t0]) => {
    const done = u > t0;
    px += pill(px, 0, `${done ? '✓ ' : ''}${s}`, { size: 17, h: 36, padX: 14, fill: done ? K.lav : '#f1edf6', color: done ? K.purple : K.muted }) + 12;
  });
  label(q >= 1 ? 'WEIGHTS · Q4_K_M' : q > 0 ? 'QUANTIZING…' : 'WEIGHTS · FP16', 0, 84, { color: q > 0 ? K.purple : K.muted });
  const front = q * 17;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 16; c++) {
    const v = h1(r * 31 + c * 7 + 3), done = c < front - 1, shade = done ? Math.round(v * 3) / 3 : v;
    rrect(c * 36, 100 + r * 36, 31, 31, 5); ctx.fillStyle = rgba(K.purple, .08 + .72 * shade); ctx.fill();
    if (Math.abs(c - front + .5) < 1 && q > 0 && q < 1) { ctx.strokeStyle = K.ink; ctx.lineWidth = 2; ctx.stroke(); }
  }
  const size = lerp(16.1, 4.9, q);
  label('MODEL SIZE', 640, 120);
  text(size.toFixed(1), 640, 205, { size: 78, weight: 600, ls: -3 });
  label('GB', 640, 240);
  bar(640, 268, 190, 10, size / 16.1);
  label('LLAMA-3 · 8B', 640, 320, { color: K.purple });
  box(0, 420, VW, 200, 16, '#f6f3fb');
  [['$ git clone llama.cpp', .1], ['$ python convert_hf_to_gguf.py llama-3-8b', .9], ['$ ./llama-quantize f16.gguf Q4_K_M', 2.1]].forEach(([s, t0], i) => {
    text(typed(s, u, t0, 34), 26, 468 + i * 40, { size: 19, fam: MONO, color: K.ink });
  });
  text('✓ llama-3-8b-Q4_K_M.gguf · 4.9 GB', 26, 588, { size: 19, fam: MONO, color: K.purple, alpha: P(u, 3.7, 3.9) });
}

// Industrial end effector: ToF sensors read the part, the vacuum cup picks it off the belt and places it.
function vizEndEff(u) {
  const gx = lerp(400, 730, inOutCubic(P(u, 3, 3.9)));
  const gy = u < 1.9 ? lerp(190, 400, inOutCubic(P(u, 1.2, 1.9))) : u < 3.9 ? lerp(400, 250, inOutCubic(P(u, 2.3, 3))) : u < 4.45 ? lerp(250, 420, inOutCubic(P(u, 3.9, 4.4))) : lerp(420, 300, inOutCubic(P(u, 4.5, 5)));
  const held = u >= 1.9 && u < 4.45, grip = P(u, 1.9, 2.15) * (1 - P(u, 4.4, 4.55));
  const bx = held ? gx : u < 1.9 ? lerp(150, 400, outCubic(P(u, 0, 1.2))) : 730, btop = held ? gy : u < 1.9 ? 400 : 420;
  const under = !held && Math.abs(bx - gx) < 40, floor = under ? btop : gx > 600 ? 520 : 500;
  const dA = Math.round(floor - gy + 2), dB = Math.round(floor - gy + 7);

  label('TOF  A / B', 0, 60);
  text(`${dA} / ${dB}`, 0, 104, { size: 34, weight: 600, ls: -1 }); label('mm', 0, 132);
  label('TILT', 0, 190);
  text(`${(Math.atan2(dB - dA, 90) * 180 / Math.PI).toFixed(1)}°`, 0, 234, { size: 34, weight: 600, ls: -1 });
  label('VACUUM', 0, 300, { color: grip > 0 ? K.purple : K.muted });
  text(`${Math.round(-62 * grip)} kPa`, 0, 344, { size: 34, weight: 600, ls: -1 });
  bar(0, 362, 200, 8, grip);
  label('MODBUS RTU', 0, 430);
  ['01', '03', '00', '0A', '00', '02', 'E4', '09'].forEach((b, i) => {
    const on = Math.floor(u * 7) % 8 === i;
    text(b, (i % 4) * 50, 472 + Math.floor(i / 4) * 34, { size: 20, fam: MONO, color: on ? K.purple : K.muted, weight: on ? 600 : 400 });
  });

  ctx.save(); ctx.beginPath(); ctx.rect(250, 0, VW - 250, VH); ctx.clip();
  polyline([[262, 40], [VW, 40]], rgba(K.ink, .8), 6);
  // conveyor
  const shift = 250 * outCubic(P(u, 0, 1.2));
  box(256, 500, 360, 22, 11, '#fff', K.ink, 2.5);
  for (let k = 0; k < 9; k++) { const x = 266 + ((k * 40 + shift) % 340); ctx.fillStyle = rgba(K.ink, .3); ctx.fillRect(x, 507, 14, 3); }
  circle(268, 511, 6, K.ink); circle(604, 511, 6, K.ink);
  polyline([[300, 522], [300, 600]], rgba(K.ink, .5), 3); polyline([[572, 522], [572, 600]], rgba(K.ink, .5), 3);
  // place table
  ctx.fillStyle = rgba(K.ink, .85); ctx.fillRect(660, 520, 150, 12);
  polyline([[675, 532], [675, 600]], rgba(K.ink, .5), 3); polyline([[795, 532], [795, 600]], rgba(K.ink, .5), 3);
  // ToF beams
  [[-42, dA], [42, dB]].forEach(([ox]) => dashed([[gx + ox, gy - 14], [gx + ox, floor]], rgba(K.purple, held ? .15 : .65), 2, [4, 6], -u * 40));
  // part
  box(bx - 55, btop, 110, 100, 6, '#fff', K.ink, 2.5);
  ctx.fillStyle = rgba(K.purple, .35); ctx.fillRect(bx - 55, btop + 44, 110, 10);
  // gantry carriage, arm and head
  box(gx - 50, 24, 100, 32, 6, '#fff', K.ink, 2.5);
  ctx.fillStyle = rgba(K.ink, .85); ctx.fillRect(gx - 7, 56, 14, gy - 106);
  box(gx - 56, gy - 50, 112, 34, 8, '#fff', K.ink, 2.5);
  ctx.fillStyle = K.purple; ctx.fillRect(gx - 50, gy - 18, 14, 6); ctx.fillRect(gx + 36, gy - 18, 14, 6);
  ctx.beginPath(); ctx.moveTo(gx - 12, gy - 16); ctx.lineTo(gx + 12, gy - 16); ctx.lineTo(gx + 24 + grip * 3, gy); ctx.lineTo(gx - 24 - grip * 3, gy); ctx.closePath();
  ctx.fillStyle = grip > 0 ? K.purple : rgba(K.ink, .6); ctx.fill();
  if (grip > 0) for (let k = 0; k < 3; k++) { const p = (u * 2 + k / 3) % 1; withAlpha(grip * (1 - p), () => { ctx.strokeStyle = K.purple; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(gx, gy - 30, 30 + p * 30, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }); }
  ctx.restore();
}

// Hodi: a scan line reads handwritten Sinhala, boxes each glyph, then types out the extracted text.
const HODI = [['සිං', 'siṃ', .98], ['හ', 'ha', .96], ['ල', 'la', .99], ['අ', 'a', .97], ['කු', 'ku', .94], ['රු', 'ru', .98]];
function vizHodi(u) {
  box(0, 0, VW, 310, 18, '#fff', rgba(K.ink, .15), 1.5);
  label('HANDWRITTEN INPUT', 26, 42);
  polyline([[26, 226], [VW - 26, 226]], rgba(K.purple, .2), 1.5);
  const sx = lerp(0, VW, P(u, .3, 2));
  let x = 60;
  HODI.forEach(([g, roman, conf], i) => {
    if (i === 3) x += 50;
    const rot = (h1(i * 13) - .5) * .16, dy = (h1(i * 7 + 2) - .5) * 14, w = measure(g, 104, 400, SINHALA);
    ctx.save(); ctx.translate(x, 210 + dy); ctx.rotate(rot); text(g, 0, 0, { size: 104, fam: SINHALA, color: K.ink }); ctx.restore();
    const seen = outExpo(P(sx, x + w, x + w + 60));
    withAlpha(seen, () => {
      ctx.strokeStyle = K.purple; ctx.lineWidth = 2.5; ctx.strokeRect(x - 10, 92 + dy, w + 20, 144);
      text(roman, x - 8, 274, { size: 18, fam: MONO, color: K.purple });
      text(conf.toFixed(2), x + w + 10, 274, { size: 14, fam: MONO, color: K.muted, align: 'right' });
    });
    x += w + 36;
  });
  if (u > .3 && u < 2.05) {
    ctx.fillStyle = rgba(K.purple, .08); ctx.fillRect(sx - 60, 60, 60, 190);
    ctx.fillStyle = K.purple; ctx.fillRect(sx, 56, 3, 198);
  }
  box(0, 340, VW, 280, 18, '#f6f3fb');
  label('EXTRACTED TEXT', 26, 384, { color: K.purple });
  const n = Math.floor(P(u, 2.2, 3.2) * 6.99);
  const shown = HODI.slice(0, n).map(([g], i) => (i === 3 ? ` ${g}` : g)).join('');
  const tw = text(shown, 26, 480, { size: 66, fam: SINHALA });
  if (u > 2.1 && Math.floor(u * 3) % 2 === 0) { ctx.fillStyle = K.purple; ctx.fillRect(34 + tw, 424, 3, 70); }
  label('PRINTED + HANDWRITTEN · 6 GLYPHS · OCR', 26, 572, { alpha: P(u, 3.3, 3.6) });
}

// Sign language glove: sEMG band + IMU traces feed the classifier, which speaks the sign.
const SIGNS = ['HELLO', 'THANK YOU', 'HOW ARE YOU'];
function vizSign(u) {
  const T = 2.4, g = Math.floor(u / T) % 3, lu = u % T;
  const envAt = (ts, i) => gss(((ts % T) + T) % T, 1, .38) * (.35 + .65 * h1(i + Math.floor(ts / T) * 8));
  const cx = 145, cy = 150;
  ctx.beginPath(); ctx.ellipse(cx, cy, 128, 54, 0, 0, Math.PI * 2); ctx.strokeStyle = rgba(K.ink, .85); ctx.lineWidth = 18; ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2 + .2, x = cx + 128 * Math.cos(a), y = cy + 54 * Math.sin(a), act = envAt(u, i);
    circle(x, y, 12 + 16 * act, rgba(K.purple, .18 * act));
    circle(x, y, 10, K.paper); circle(x, y, 3 + 5 * act, K.purple);
  }
  label('sEMG · 8 CH', 0, 262);
  label('IMU · 6-AXIS', 0, 292);
  const x0 = 320, w = VW - x0;
  for (let i = 0; i < 8; i++) {
    const pts = [];
    for (let x = 0; x <= w; x += 3) { const ts = u - (w - x) / 210; pts.push([x0 + x, 22 + i * 30 - envAt(ts, i) * 13 * noise1(ts * 70 + i * 31) - 1.6 * noise1(ts * 25 + i * 9)]); }
    polyline(pts, rgba(K.ink, .6), 1.4);
  }
  [K.purple, K.mid, rgba(K.ink, .45)].forEach((col, k) => {
    const pts = [];
    for (let x = 0; x <= w; x += 4) { const ts = u - (w - x) / 210; pts.push([x0 + x, 320 + 26 * Math.sin(ts * 2.6 + k * 2.1) * (.25 + envAt(ts, k))]); }
    polyline(pts, col, 2.2);
  });
  label('RECOGNIZED SIGN', 0, 438, { color: K.purple });
  const conf = outExpo(P(lu, 1.1, 1.6)) * (.91 + .06 * h1(g));
  riseLine(SIGNS[g], 0, 518, { t: lu, t0: 1.05, size: 62, weight: 600, ls: -1.5 });
  bar(0, 548, 300, 8, conf); text(conf.toFixed(2), 316, 557, { size: 18, fam: MONO, color: K.purple });
  label('→ SPEECH', 560, 438);
  const talk = P(lu, 1.3, 1.45) * (1 - P(lu, 2.15, 2.35));
  ctx.fillStyle = K.ink; ctx.fillRect(560, 480, 18, 30);
  ctx.beginPath(); ctx.moveTo(578, 480); ctx.lineTo(600, 462); ctx.lineTo(600, 528); ctx.lineTo(578, 510); ctx.closePath(); ctx.fill();
  for (let k = 0; k < 3; k++) withAlpha(talk * (.4 + .6 * Math.abs(Math.sin(u * 6 - k))), () => { ctx.strokeStyle = K.purple; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(604, 495, 16 + k * 14, -.7, .7); ctx.stroke(); });
  for (let k = 0; k < 14; k++) { const h = 6 + talk * 44 * Math.abs(noise1(u * 9 + k * 1.7)); ctx.fillStyle = k % 2 ? K.mid : K.purple; ctx.fillRect(680 + k * 11, 495 - h / 2, 6, h); }
}

// Facial expression: landmark mesh morphs between expressions while the 8-class head re-ranks.
const FACE_CLASSES = ['neutral', 'happy', 'sad', 'surprise', 'fear', 'disgust', 'anger', 'contempt'];
const EXPR = [[0, { s: 0, o: 0, b: 0, e: 1, w: 1 }], [1, { s: 1, o: .3, b: .15, e: .75, w: 1.15 }], [3, { s: .05, o: 1, b: 1, e: 1.45, w: .8 }], [2, { s: -.8, o: 0, b: -.25, e: .8, w: .95 }], [6, { s: -.45, o: .1, b: -1, e: .7, w: 1.05 }]];
function vizFace(u) {
  const T = 2.2, k = Math.floor(u / T), lu = u % T, A = EXPR[k % 5], B = EXPR[(k + 1) % 5], m = inOutCubic(P(lu, 1.5, 2.1));
  const p = (key) => lerp(A[1][key], B[1][key], m);
  const cx = 200, cy = 300, s = p('s'), o = p('o'), b = p('b'), e = p('e'), w = p('w');
  const groups = [];
  groups.push(Array.from({ length: 17 }, (_, i) => { const t = -.12 + (Math.PI + .24) * i / 16; return [cx - 150 * Math.cos(t), cy + 10 + (185 + o * 18) * Math.sin(t)]; }));
  [-1, 1].forEach((side) => {
    groups.push(Array.from({ length: 5 }, (_, j) => [cx + side * (34 + j * 22), cy - 118 - b * 18 - 12 * Math.sin(j / 4 * Math.PI) + (b < 0 && j === 0 ? -b * 10 : 0)]));
    groups.push(Array.from({ length: 7 }, (_, j) => { const t = j / 6 * Math.PI * 2; return [cx + side * 72 + 28 * Math.cos(t), cy - 64 + 11 * e * Math.sin(t)]; }));
  });
  groups.push([[cx, cy - 56], [cx, cy - 32], [cx, cy - 8], [cx, cy + 14]]);
  groups.push(Array.from({ length: 5 }, (_, j) => [cx - 26 + j * 13, cy + 26 + 4 * Math.sin(j / 4 * Math.PI)]));
  const my = cy + 92, hw = 56 * w;
  groups.push(Array.from({ length: 9 }, (_, j) => { const t = j / 4 - 1; return [cx + t * hw, my - (7 + o * 12) * (1 - t * t) - s * 20 * t * t]; }));
  groups.push(Array.from({ length: 9 }, (_, j) => { const t = j / 4 - 1; return [cx + t * hw, my + (7 + o * 38) * (1 - t * t) - s * 20 * t * t]; }));
  groups.forEach((g) => polyline(g, rgba(K.purple, .35), 1.6));
  groups.forEach((g) => g.forEach(([x, y]) => circle(x, y, 4.2, K.purple)));
  ctx.strokeStyle = K.ink; ctx.lineWidth = 2.5;
  [[cx - 175, cy - 160, 1, 1], [cx + 175, cy - 160, -1, 1], [cx - 175, cy + 225, 1, -1], [cx + 175, cy + 225, -1, -1]].forEach(([x, y, dx, dy]) => { ctx.beginPath(); ctx.moveTo(x + dx * 26, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * 26); ctx.stroke(); });
  label('LANDMARKS + TEXTURE', cx, 34, { align: 'center' });
  label('8-CLASS EXPRESSION', 450, 34, { color: K.purple });
  FACE_CLASSES.forEach((name, i) => {
    const val = (cls) => (cls === i ? .84 + .08 * h1(k) : .02 + .06 * h1(i * 5 + cls));
    const v = lerp(val(A[0]), val(B[0]), m), y = 88 + i * 62, top = v > .5;
    text(name, 450, y, { size: 21, color: top ? K.ink : K.muted, weight: top ? 600 : 400 });
    bar(450, y + 12, 300, 8, v, top ? K.purple : K.mid);
    text(v.toFixed(2), VW, y, { size: 17, fam: MONO, color: top ? K.purple : K.muted, align: 'right' });
  });
  label('SEMI-SUPERVISED · CONTRASTIVE', 450, 600, { size: 16 });
}

// TumorVision: an MRI slice is scanned, Grad-CAM lights the lesion and the classifier ranks tumor types.
function vizTumor(u) {
  box(0, 0, 420, 420, 16, '#f1edf6');
  ctx.save(); rrect(0, 0, 420, 420, 16); ctx.clip();
  const cx = 210, cy = 215, rx = 150 + 3 * Math.sin(u * 1.4), ry = 178;
  ctx.beginPath();
  for (let i = 0; i <= 90; i++) { const a = i / 90 * Math.PI * 2, r = 1 + .03 * Math.sin(5 * a) + .02 * Math.sin(9 * a + 1); ctx.lineTo(cx + rx * r * Math.cos(a), cy + ry * r * Math.sin(a)); }
  ctx.fillStyle = rgba(K.ink, .12); ctx.fill(); ctx.strokeStyle = rgba(K.ink, .4); ctx.lineWidth = 2; ctx.stroke();
  for (let k = 0; k < 9; k++) {
    const sc = .3 + .07 * k, a0 = h1(k * 3) * Math.PI * 2, pts = [];
    for (let i = 0; i <= 26; i++) { const a = a0 + i / 26 * 2.2, wob = 1 + .06 * Math.sin(i * 1.9 + k); pts.push([cx + rx * sc * wob * Math.cos(a), cy + ry * sc * wob * Math.sin(a)]); }
    polyline(pts, rgba(K.ink, .17), 2);
  }
  polyline([[cx, cy - ry + 8], [cx + 3, cy - 40], [cx - 2, cy + 40], [cx, cy + ry - 8]], rgba(K.ink, .25), 2);
  [[-1, 185], [1, 235]].forEach(([d, x]) => { ctx.beginPath(); ctx.ellipse(x, 210, 13, 40, d * .25, 0, Math.PI * 2); ctx.fillStyle = rgba(K.ink, .28); ctx.fill(); });
  ctx.beginPath(); ctx.ellipse(288, 150, 26, 22, .4, 0, Math.PI * 2); ctx.fillStyle = rgba(K.ink, .32); ctx.fill();
  const heat = outBack(P(u, 1.6, 2.2));
  if (heat > 0) {
    const g = ctx.createRadialGradient(288, 150, 0, 288, 150, 72 * heat);
    g.addColorStop(0, rgba(K.purple, .7)); g.addColorStop(.5, rgba(K.purple, .3)); g.addColorStop(1, rgba(K.purple, 0));
    ctx.fillStyle = g; ctx.fillRect(200, 60, 180, 180);
  }
  const sy = lerp(0, 420, P(u, .3, 1.6));
  if (u > .3 && u < 1.65) { ctx.fillStyle = rgba(K.purple, .1); ctx.fillRect(0, sy - 50, 420, 50); ctx.fillStyle = K.purple; ctx.fillRect(0, sy, 420, 3); }
  withAlpha(P(u, 2, 2.3), () => {
    ctx.strokeStyle = K.purple; ctx.lineWidth = 2.5; ctx.strokeRect(246, 110, 84, 82);
    pill(246, 72, 'glioma 0.93', { size: 15, h: 28, padX: 10, fill: K.purple, color: K.paper });
  });
  ctx.restore();
  label(`T1 · AXIAL · SLICE ${String(40 + Math.floor(u * 2) % 30).padStart(3, '0')}`, 0, 460);
  label('CNN FEATURES', 470, 30);
  [130, 102, 76, 52, 32].forEach((h, i) => {
    const x = 470 + i * 72, y = 110 - h / 2, lit = gss(((u * .9) % 1.4) * 5 - i, 0, .6);
    box(x + 8, y - 8, 44, h, 4, '#fff', rgba(K.purple, .35), 1.5);
    box(x, y, 44, h, 4, rgba(K.purple, .1 + .35 * lit), rgba(K.purple, .6), 1.5);
  });
  label('CLASSIFICATION', 470, 240, { color: K.purple });
  probBars([['glioma', .93], ['meningioma', .04], ['pituitary', .02], ['no tumor', .01]], 470, 286, u, 2.1, { labelW: 140, w: 150, gap: 44, size: 19 });
  text('Glioma detected', 470, 520, { size: 36, weight: 600, ls: -1, alpha: P(u, 2.7, 3) });
  label('GRAD-CAM · LOCALISED', 470, 556, { alpha: P(u, 2.8, 3.1) });
}

// GOYAMA: a sliding window scans a rice leaf, flags lesions and diagnoses the disease.
const LESIONS = [[.18, .25], [.27, -.35], [.39, .1], [.46, -.2], [.57, .3], [.65, -.25], [.74, .05]];
function vizGoyama(u) {
  const leaf = (s) => [-400 + 800 * s, -26 * Math.sin(s * Math.PI)];
  const wid = (s) => 46 * Math.pow(1 - s, .7) * Math.min(1, s * 14 + .25);
  ctx.save(); ctx.translate(417, 255); ctx.rotate(-.3 + Math.sin(u * 1.3) * .02);
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const s = i / 60, [x, y] = leaf(s); ctx.lineTo(x, y - wid(s)); }
  for (let i = 60; i >= 0; i--) { const s = i / 60, [x, y] = leaf(s); ctx.lineTo(x, y + wid(s)); }
  ctx.closePath(); ctx.fillStyle = rgba(K.mid, .3); ctx.fill(); ctx.strokeStyle = K.purple; ctx.lineWidth = 2; ctx.stroke();
  const line = (f) => Array.from({ length: 41 }, (_, i) => { const s = i / 40, [x, y] = leaf(s); return [x, y + f * wid(s)]; });
  polyline(line(0), rgba(K.purple, .6), 2); polyline(line(.5), rgba(K.purple, .22), 1.2); polyline(line(-.5), rgba(K.purple, .22), 1.2);
  const ss = P(u, 1.2, 3.2);
  LESIONS.forEach(([s, f], i) => {
    const p = outBack(P(u, .3 + i * .08, .7 + i * .08)); if (p <= 0) return;
    const [x, y0] = leaf(s), y = y0 + f * wid(s);
    ctx.beginPath(); ctx.ellipse(x, y, 22 * p, 11 * p, 0, 0, Math.PI * 2); ctx.fillStyle = rgba(K.purple, .25); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x, y, 15 * p, 6.5 * p, 0, 0, Math.PI * 2); ctx.fillStyle = rgba(K.ink, .62); ctx.fill();
    if (s < ss) { ctx.strokeStyle = K.purple; ctx.lineWidth = 2; ctx.strokeRect(x - 26, y - 17, 52, 34); }
  });
  if (u > 1.2 && u < 3.3) { const [x, y] = leaf(ss); box(x - 46, y - 46, 92, 92, 6, rgba(K.purple, .07), K.purple, 2.5); }
  ctx.restore();
  label('GOYAMA · RICE LEAF', 0, 30);
  text('~98%', VW, 48, { size: 46, weight: 600, ls: -1.5, align: 'right' });
  label('TEST ACCURACY', VW, 78, { align: 'right' });
  label('DIAGNOSIS', 0, 450, { color: K.purple, alpha: P(u, 3, 3.3) });
  probBars([['Brown spot', .97], ['Leaf blast', .02], ['Bacterial blight', .01], ['Healthy', .00]], 0, 490, u, 3.3, { labelW: 230, w: 440, gap: 38, size: 20 });
}

// Vehicle detection: a perspective road with traffic; YOLOv8 boxes every vehicle in range.
const TRAFFIC = [[-1.06, 1.5, 1.1, 'car'], [0, 4, -.6, 'car'], [1.06, 6, 1.4, 'truck'], [-1.06, 7.5, .9, 'car'], [1.06, 1, .8, 'car'], [0, 8.5, 1, 'van']];
function vizYolo(u) {
  const hz = 170, vx = 417, proj = (l, z) => [vx + l * 300 / z, hz + 470 / z];
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, VW, VH); ctx.clip();
  ctx.fillStyle = rgba(K.lav, .4); ctx.fillRect(0, 0, VW, hz);
  for (let i = 0; i < 9; i++) { const h = 20 + 50 * h1(i * 5); ctx.fillStyle = rgba(K.ink, .07 + .05 * h1(i)); ctx.fillRect(i * 96 - 10, hz - h, 70, h); }
  ctx.beginPath(); [proj(-1.6, 80), proj(1.6, 80), proj(1.6, .9), proj(-1.6, .9)].forEach(([x, y]) => ctx.lineTo(x, y)); ctx.closePath(); ctx.fillStyle = '#f1edf6'; ctx.fill();
  polyline([proj(-1.6, 80), proj(-1.6, .9)], rgba(K.ink, .5), 2.5); polyline([proj(1.6, 80), proj(1.6, .9)], rgba(K.ink, .5), 2.5);
  [-.53, .53].forEach((l) => {
    for (let k = 0; k < 12; k++) {
      const z0 = (((k * 3 - u * 9) % 36) + 36) % 36 + 1, z1 = z0 + 1.2;
      ctx.beginPath(); [proj(l - .025, z0), proj(l + .025, z0), proj(l + .025, z1), proj(l - .025, z1)].forEach(([x, y]) => ctx.lineTo(x, y)); ctx.fillStyle = rgba(K.ink, .35); ctx.fill();
    }
  });
  const cars = TRAFFIC.map(([l, z0, v, type], i) => ({ l, type, i, z: (((z0 - u * v) % 9) + 9) % 9 + 1.4 })).sort((a, b) => b.z - a.z);
  let seen = 0;
  cars.forEach(({ l, z, type, i }) => {
    const sc = 300 / z, [x, y] = proj(l, z), w = .72 * sc, h = (type === 'truck' ? .8 : type === 'van' ? .62 : .48) * sc;
    withAlpha(P(z, 1.4, 2) * (1 - P(z, 8, 10.4)), () => {
      ctx.fillStyle = K.ink; ctx.fillRect(x - w * .42, y - h * .06, w * .16, h * .12); ctx.fillRect(x + w * .26, y - h * .06, w * .16, h * .12);
      box(x - w / 2, y - h, w, h * .95, .06 * sc, '#fff', K.ink, Math.max(1, .012 * sc));
      ctx.fillStyle = rgba(K.ink, .18); ctx.fillRect(x - w * .38, y - h * .88, w * .76, h * .34);
      ctx.fillStyle = K.purple; ctx.fillRect(x - w * .45, y - h * .42, w * .14, h * .09); ctx.fillRect(x + w * .31, y - h * .42, w * .14, h * .09);
      if (z < 8.5) {
        seen++;
        ctx.strokeStyle = K.purple; ctx.lineWidth = 2.5; ctx.strokeRect(x - w / 2 - 5, y - h - 5, w + 10, h + 8);
        pill(x - w / 2 - 5, y - h - 31, `${type} ${(.84 + .14 * h1(i * 9)).toFixed(2)}`, { size: 14, h: 24, padX: 8, fill: K.purple, color: K.paper });
      }
    });
  });
  ctx.restore();
  pill(16, 16, 'YOLOv8 · KITTI', { size: 15, h: 30, padX: 12, fill: K.paper, color: K.ink });
  label(`${seen} OBJECTS · REAL-TIME`, VW - 16, 38, { align: 'right', color: K.purple });
}

// U-Net: a sample flows down the encoder, up the decoder via skip connections, and the mask wipes in.
function scene(x, y, w, h, mask) {
  const c = mask ? { sky: '#efe8fb', bld: K.mid, bld2: '#cbb9ee', road: '#dcd0f2', car: K.purple, tree: rgba(K.ink, .6) }
    : { sky: rgba(K.ink, .05), bld: rgba(K.ink, .3), bld2: rgba(K.ink, .22), road: rgba(K.ink, .16), car: rgba(K.ink, .65), tree: rgba(K.ink, .42) };
  ctx.fillStyle = c.sky; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = c.bld; ctx.fillRect(x + .03 * w, y + .2 * h, .2 * w, .5 * h); ctx.fillRect(x + .66 * w, y + .1 * h, .3 * w, .6 * h);
  ctx.fillStyle = c.bld2; ctx.fillRect(x + .26 * w, y + .32 * h, .15 * w, .38 * h);
  circle(x + .5 * w, y + .48 * h, .14 * h, c.tree); ctx.fillStyle = c.tree; ctx.fillRect(x + .49 * w, y + .5 * h, .02 * w, .2 * h);
  ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + .6 * w, y + .7 * h); ctx.lineTo(x + .4 * w, y + .7 * h); ctx.closePath(); ctx.fillStyle = c.road; ctx.fill();
  ctx.fillStyle = c.car; ctx.beginPath(); ctx.roundRect(x + .52 * w, y + .74 * h, .2 * w, .15 * h, 6); ctx.fill();
}
function vizUNet(u) {
  const H = [220, 160, 110, 70], cyL = (L) => 150 + L * 60;
  const enc = H.map((h, L) => ({ x: L * 60, y: cyL(L) - h / 2, h }));
  const dec = H.map((h, L) => ({ x: 480 - L * 60, y: cyL(L) - h / 2, h }));
  const path = [...enc, { x: 240, y: 358, h: 44 }, ...[...dec].reverse()];
  const mid = (b) => [b.x + 12, b.y + b.h / 2];
  const flow = inOutCubic(P(u, .3, 2.8)) * (path.length - 1);
  H.forEach((_, L) => {
    const y = enc[L].y + 14;
    dashed([[enc[L].x + 30, y], [dec[L].x - 6, y]], rgba(K.purple, .45), 2);
    ctx.beginPath(); ctx.moveTo(dec[L].x - 4, y); ctx.lineTo(dec[L].x - 12, y - 5); ctx.lineTo(dec[L].x - 12, y + 5); ctx.fillStyle = rgba(K.purple, .6); ctx.fill();
  });
  for (let i = 0; i < path.length - 1; i++) polyline([mid(path[i]), mid(path[i + 1])], rgba(K.ink, .25), 1.5);
  path.forEach((b, i) => {
    const lit = clamp(flow - i + 1);
    for (const j of [0, 1]) box(b.x + j * 14, b.y, 10, b.h, 3, rgba(i > 4 ? K.mid : K.purple, .15 + .5 * lit), rgba(K.purple, .6), 1.2);
  });
  if (u > .3 && u < 2.9) {
    const i0 = Math.min(Math.floor(flow), path.length - 2), [ax, ay] = mid(path[i0]), [bx, by] = mid(path[i0 + 1]), f = flow - i0;
    circle(lerp(ax, bx, f), lerp(ay, by, f), 13, rgba(K.purple, .2)); circle(lerp(ax, bx, f), lerp(ay, by, f), 7, K.purple);
  }
  label('ENCODER', 0, 24); label('DECODER', 506, 24, { align: 'right' }); label('SKIP', 253, 126, { align: 'center', color: K.purple, size: 15 });
  const px = 560, pw = 274, ph = 160;
  label('INPUT', px, 24);
  ctx.save(); rrect(px, 40, pw, ph, 10); ctx.clip(); scene(px, 40, pw, ph, false); ctx.restore();
  label('MASK', px, 236, { color: K.purple });
  const wipe = P(u, 2.8, 3.6);
  ctx.save(); rrect(px, 252, pw, ph, 10); ctx.clip(); scene(px, 252, pw, ph, false);
  ctx.beginPath(); ctx.rect(px, 252, pw * wipe, ph); ctx.clip(); scene(px, 252, pw, ph, true); ctx.restore();
  if (wipe > 0 && wipe < 1) { ctx.fillStyle = K.purple; ctx.fillRect(px + pw * wipe - 1.5, 248, 3, ph + 8); }
  let lx = 0;
  [['road', '#dcd0f2'], ['building', K.mid], ['vehicle', K.purple], ['sky', '#efe8fb'], ['vegetation', rgba(K.ink, .6)]].forEach(([n, col], i) => {
    const x = lx;
    withAlpha(P(u, 3.2 + i * .08, 3.5 + i * .08), () => { box(x, 480, 20, 20, 4, col, rgba(K.ink, .2), 1); text(n, x + 30, 497, { size: 20 }); });
    lx += 60 + measure(n, 20);
  });
  label('SEMANTIC SEGMENTATION · CARLA', 0, 580);
}

// NextWordPredictor: context tokens feed an LSTM chain; softmax picks the next word and appends it.
const NEXT = [['predict', [['predict', .41], ['recognize', .22], ['generate', .17], ['see', .08]]], ['the', [['the', .58], ['what', .17], ['how', .09], ['your', .05]]], ['next', [['next', .52], ['future', .19], ['right', .1], ['last', .06]]], ['word', [['word', .64], ['step', .14], ['line', .08], ['move', .05]]]];
function vizNextWord(u) {
  const T = 1.8, k = Math.min(Math.floor(u / T), NEXT.length - 1), lu = u - k * T;
  const context = ['neural', 'networks', 'can', 'learn', 'to', ...NEXT.slice(0, k).map(([w]) => w)];
  const fresh = lu > 1.45 ? NEXT[k][0] : null, words = fresh ? [...context, fresh] : context;
  let x = 0, y = 52;
  words.forEach((w, i) => {
    const ww = measure(w, 40, 500);
    if (x + ww > VW) { x = 0; y += 54; }
    const isNew = w === fresh && i === words.length - 1;
    text(w, x, y, { size: 40, weight: 500, ls: -1, color: isNew ? K.purple : K.ink, alpha: isNew ? P(lu, 1.45, 1.6) : 1 });
    if (isNew) { ctx.fillStyle = K.purple; ctx.fillRect(x, y + 10, ww * outExpo(P(lu, 1.45, 1.8)), 3); }
    x += ww + 14;
  });
  if (Math.floor(u * 3) % 2 === 0) { ctx.fillStyle = K.purple; ctx.fillRect(x - 6, y - 32, 3, 40); }
  const tokens = context.slice(-5), pulse = P(lu, 0, .8) * 5;
  tokens.forEach((tok, i) => {
    const cx = 18 + i * 165, glow = gss(pulse, i + .5, .45);
    box(cx, 196, 120, 76, 14, rgba(K.purple, .06 + .3 * glow), rgba(K.purple, .55), 2);
    text('LSTM', cx + 60, 242, { size: 17, fam: MONO, color: K.purple, align: 'center', ls: 1 });
    polyline([[cx + 60, 300], [cx + 60, 276]], rgba(K.ink, .3), 2);
    text(tok, cx + 60, 330, { size: 20, color: K.muted, align: 'center' });
    if (i < 4) { polyline([[cx + 124, 234], [cx + 160, 234]], rgba(K.purple, .5), 2); ctx.beginPath(); ctx.moveTo(cx + 162, 234); ctx.lineTo(cx + 154, 229); ctx.lineTo(cx + 154, 239); ctx.fillStyle = rgba(K.purple, .6); ctx.fill(); }
  });
  if (lu < .85) circle(18 + Math.min(pulse, 4.7) * 165 + 20, 234, 7, K.purple);
  label('SOFTMAX · TOP-4', 0, 404, { color: K.purple });
  label(`STEP ${k + 1}/${NEXT.length}`, VW, 404, { align: 'right' });
  probBars(NEXT[k][1], 0, 452, lu, .8, { labelW: 200, w: 470, gap: 44, size: 22 });
}

// Line follower: the robot tracks the tape with a damped PID wobble; the error trace scrolls below.
const trackAt = (f) => [417 + 330 * Math.cos(f) + 28 * Math.cos(2 * f), 230 + 150 * Math.sin(f) - 34 * Math.sin(2 * f)];
const lineErr = (t) => 11 * Math.sin(t * 3.7) * (.35 + .65 * Math.abs(Math.sin(t * .9)));
function vizLineBot(u) {
  const pts = [];
  for (let f = 0; f <= Math.PI * 2 + .05; f += .04) pts.push(trackAt(f));
  polyline(pts, rgba(K.ink, .85), 18);
  for (let k = 12; k >= 1; k--) {
    const t = u - k * .1, f = t * .55, [px, py] = trackAt(f), [qx, qy] = trackAt(f + .01), a = Math.atan2(qy - py, qx - px), e = lineErr(t);
    circle(px - Math.sin(a) * e, py + Math.cos(a) * e, 3, rgba(K.purple, .5 * (1 - k / 13)));
  }
  const f = u * .55, [px, py] = trackAt(f), [qx, qy] = trackAt(f + .01), a = Math.atan2(qy - py, qx - px);
  const e = lineErr(u), de = (lineErr(u + .01) - e) / .01, speed = Math.hypot(qx - px, qy - py) * 55;
  ctx.save(); ctx.translate(px - Math.sin(a) * e, py + Math.cos(a) * e); ctx.rotate(a + Math.atan2(de, speed));
  ctx.fillStyle = K.ink; ctx.fillRect(-24, -33, 28, 10); ctx.fillRect(-24, 23, 28, 10);
  box(-36, -24, 72, 48, 10, '#fff', K.ink, 2.5);
  box(28, -22, 12, 44, 4, '#fff', K.ink, 2);
  [-16, -8, 0, 8, 16].forEach((oy) => circle(34, oy, 3.6, Math.abs(e + oy) < 9 ? K.purple : rgba(K.ink, .25)));
  circle(-8, 0, 7, K.purple);
  ctx.restore();
  const y0 = 548, w = 560, err = [];
  for (let x = 0; x <= w; x += 4) err.push([x, y0 - lineErr(u - (w - x) / 140) * 2.8]);
  label('ERROR e(t)', 0, 474);
  dashed([[0, y0], [w, y0]], rgba(K.ink, .3), 1.5);
  polyline(err, K.purple, 2.5); circle(w, y0 - e * 2.8, 6, K.purple);
  label('PID · ARDUINO', 630, 474, { color: K.purple });
  [['P', e / 11], ['I', Math.sin(u * .4) * .25], ['D', clamp(de / 45, -1, 1)]].forEach(([n, v], i) => {
    const y = 516 + i * 38;
    text(n, 630, y, { size: 20, fam: MONO, weight: 600 });
    ctx.fillStyle = rgba(K.ink, .08); ctx.fillRect(662, y - 11, 170, 9);
    ctx.fillStyle = i ? K.mid : K.purple; ctx.fillRect(747, y - 11, 85 * v, 9);
    ctx.fillStyle = K.ink; ctx.fillRect(746, y - 15, 2, 17);
  });
}

// NutriTech Pot: soil dries to the threshold, the pump waters it and the app chart follows.
const moisture = (u) => (u < 3 ? lerp(62, 34, u / 3) : u < 4.6 ? lerp(34, 72, outCubic(P(u, 3, 4.6))) : lerp(72, 62, P(u, 4.6, 8)));
function vizPot(u) {
  const m = moisture(u), pump = u > 3 && u < 4.6, dry = clamp((50 - m) / 16);
  box(330, 330, 90, 150, 10, '#fff', K.ink, 2.5);
  const lvl = 112 - 34 * P(u, 3, 4.6);
  ctx.fillStyle = rgba(K.mid, .55); ctx.fillRect(334, 476 - lvl, 82, lvl);
  label('TANK', 375, 512, { align: 'center' });
  polyline([[375, 330], [375, 222], [205, 222], [205, 250]], rgba(K.ink, .8), 9);
  if (pump) dashed([[375, 330], [375, 222], [205, 222], [205, 250]], K.paper, 3, [10, 12], -u * 70);
  box(355, 268, 40, 30, 6, pump ? K.purple : '#fff', K.ink, 2);
  text('P', 375, 290, { size: 18, fam: MONO, weight: 600, align: 'center', color: pump ? K.paper : K.ink });
  if (pump) for (let k = 0; k < 4; k++) { const p = (u * 2.4 + k / 4) % 1; circle(205, 258 + p * 58, 5, rgba(K.purple, 1 - p * .4)); }
  const sway = Math.sin(u * 1.6) * .05, tip = [205 + 18 * Math.sin(u * 1.6) - dry * 22, 140 + dry * 18];
  ctx.beginPath(); ctx.moveTo(205, 318); ctx.quadraticCurveTo(200, 230, tip[0], tip[1]); ctx.strokeStyle = K.purple; ctx.lineWidth = 4; ctx.stroke();
  [[.35, -1], [.55, 1], [.75, -1], [.95, 1]].forEach(([t, side]) => {
    const x = lerp(205, tip[0], t), y = lerp(318, tip[1], t);
    ctx.save(); ctx.translate(x, y); ctx.rotate(side * (-.55 + dry * .9) + sway + (side < 0 ? Math.PI : 0));
    ctx.beginPath(); ctx.ellipse(32, 0, 32, 11, 0, 0, Math.PI * 2); ctx.fillStyle = rgba(K.mid, .65); ctx.fill(); ctx.strokeStyle = K.purple; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  });
  ctx.beginPath(); ctx.ellipse(205, 326, 98, 11, 0, 0, Math.PI * 2); ctx.fillStyle = rgba(K.ink, .25 + .5 * m / 100); ctx.fill();
  polyline([[246, 300], [246, 330]], K.ink, 2.5); polyline([[256, 300], [256, 330]], K.ink, 2.5);
  ctx.fillStyle = K.purple; ctx.fillRect(240, 290, 22, 10);
  box(100, 330, 210, 22, 6, '#fff', K.ink, 2.5);
  ctx.beginPath(); ctx.moveTo(112, 352); ctx.lineTo(298, 352); ctx.lineTo(275, 480); ctx.lineTo(135, 480); ctx.closePath();
  ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = K.ink; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.fillStyle = rgba(K.purple, .35); ctx.fillRect(117, 390, 176, 10);
  label('SOIL MOISTURE', 480, 30);
  text(`${Math.round(m)}%`, 480, 112, { size: 76, weight: 600, ls: -3 });
  pill(VW - (pump ? 130 : 84), 64, pump ? 'PUMP ON' : 'IDLE', { size: 15, h: 30, padX: 12, fill: pump ? K.purple : '#f1edf6', color: pump ? K.paper : K.muted });
  const cx0 = 480, cw = VW - cx0, top = 150, ch = 180, ys = (v) => top + ch - v / 100 * ch;
  ctx.fillStyle = rgba(K.ink, .04); ctx.fillRect(cx0, top, cw, ch);
  dashed([[cx0, ys(35)], [VW, ys(35)]], rgba(K.purple, .7), 2);
  label('THRESHOLD 35%', VW - 6, ys(35) + 24, { align: 'right', size: 14, color: K.purple });
  const hist = [];
  for (let t = 0; t <= u; t += .05) hist.push([cx0 + t / 8 * cw, ys(moisture(t))]);
  polyline(hist, K.ink, 2.5); circle(cx0 + u / 8 * cw, ys(m), 6, K.purple);
  label('REMOTE MONITORING', 480, 420);
  for (let k = 0; k < 3; k++) withAlpha(.3 + .7 * clamp(Math.sin(u * 4 - k * .8)), () => { ctx.strokeStyle = K.purple; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(500, 512, 10 + k * 14, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke(); });
  circle(500, 512, 4.5, K.purple);
  text(pump ? 'Watering now' : 'Synced to app', 548, 508, { size: 26, weight: 500 });
  label('AUTO · SOIL-SENSED', 548, 540, { size: 15 });
}

const FIGURES = {
  voices: { draw: vizEEG }, biosense: { draw: vizECG },
  microchip: { draw: vizSDK, loop: 7.5 }, campus: { draw: vizRAG, loop: 7.5 },
  gguf: { draw: vizGGUF, loop: 6.5, still: 5 }, endeff: { draw: vizEndEff, loop: 5.2, still: 2.6 },
  hodi: { draw: vizHodi, loop: 6.5, still: 5 }, sign: { draw: vizSign, still: 1.6 },
  face: { draw: vizFace, still: 3 }, tumor: { draw: vizTumor, loop: 6, still: 4.5 },
  goyama: { draw: vizGoyama, loop: 6.5, still: 5 }, yolo: { draw: vizYolo, still: 1 },
  unet: { draw: vizUNet, loop: 6, still: 4.5 }, nextword: { draw: vizNextWord, loop: 7.6, still: 7 },
  linebot: { draw: vizLineBot, still: 2 }, pot: { draw: vizPot, loop: 8, still: 3.8 },
};
export const hasFigure = (kind) => kind in FIGURES;
export const stillTime = (kind) => FIGURES[kind]?.still ?? 6;

// 'card' leaves room for the chip and caption on featured cards; 'fill' centres the figure.
export function paintFigure(c, kind, t, mode = 'fill') {
  const fig = FIGURES[kind], w = c.clientWidth, h = c.clientHeight;
  if (!fig || !w || !h) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
  ctx = c.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
  const s = mode === 'card' ? Math.min(w * .88 / VW, h * .66 / VH) : Math.min(w * .86 / VW, h * .8 / VH);
  ctx.translate((w - VW * s) / 2, mode === 'card' ? h * .14 : (h - VH * s) / 2); ctx.scale(s, s);
  let u = t;
  ctx.globalAlpha = 1;
  if (fig.loop) { u = t % fig.loop; ctx.globalAlpha = Math.min(t < fig.loop ? 1 : P(u, 0, .3), 1 - P(u, fig.loop - .35, fig.loop)); }
  fig.draw(u);
  ctx.globalAlpha = 1;
}
