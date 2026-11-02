// Renders showreel.html frame-by-frame into an MP4 (or stills for review).
//   node render.mjs                     -> jaliya-showreel.mp4 (muxes showreel-music.wav if present)
//   node render.mjs --stills 3,9.2,24   -> stills/t-3.png …
//   node render.mjs --from 22 --to 40   -> partial render (preview.mp4)
// Needs playwright-core (PW_PATH may point at a node_modules/playwright-core dir) and ffmpeg.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import os from 'node:os';

const { chromium } = await import(process.env.PW_PATH ? pathToFileURL(join(process.env.PW_PATH, 'index.mjs')).href : 'playwright-core');
const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const FPS = 60, DUR = 60;

const candidates = [
  process.env.CHROME,
  join(os.homedir(), 'Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const browser = await chromium.launch({ executablePath: candidates.find(existsSync), args: ['--force-color-profile=srgb'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', e => console.error('page error:', e.message));
await page.goto(pathToFileURL(join(here, 'showreel.html')).href + '?render=1');
await page.evaluate(() => window.ready);

if (opt('--stills')) {
  const dir = join(here, 'stills'); mkdirSync(dir, { recursive: true });
  for (const s of opt('--stills').split(',')) {
    const url = await page.evaluate(t => window.framePNG(t), +s);
    writeFileSync(join(dir, `t-${s}.png`), Buffer.from(url.split(',')[1], 'base64'));
  }
  console.log('stills written to', dir);
  await browser.close(); process.exit(0);
}

const from = +(opt('--from') ?? 0), to = +(opt('--to') ?? DUR);
const partial = from > 0 || to < DUR;
const out = join(here, partial ? 'preview.mp4' : 'jaliya-showreel.mp4');
const wav = join(here, 'showreel-music.wav');
const ff = ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-'];
if (existsSync(wav)) ff.push('-ss', String(from), '-i', wav);
ff.push('-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-pix_fmt', 'yuv420p', '-r', String(FPS));
if (existsSync(wav)) ff.push('-c:a', 'aac', '-b:a', '256k', '-shortest');
ff.push('-movflags', '+faststart', out);
const proc = spawn('ffmpeg', ff, { stdio: ['pipe', 'ignore', 'inherit'] });

const f0 = Math.round(from * FPS), f1 = Math.round(to * FPS);
const t0 = Date.now();
for (let i = f0; i < f1; i++) {
  const url = await page.evaluate(n => window.frameJPEG(n, .95), i);
  const ok = proc.stdin.write(Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));
  if (!ok) await new Promise(r => proc.stdin.once('drain', r));
  if (i % 300 === 0) console.log(`frame ${i}/${f1}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
proc.stdin.end();
await new Promise(r => proc.on('close', r));
await browser.close();
console.log('wrote', out, `in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
