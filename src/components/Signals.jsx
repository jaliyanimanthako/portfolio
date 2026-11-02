import { useEffect, useRef, useState } from 'react';
import './Signals.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reports whether the element is on screen (and the tab is visible), so loops can rest.
function useActive(ref, threshold = 0) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = ref.current;
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [ref, threshold]);
  return active;
}

const ROLES = ['deep learning', 'computer vision', 'explainable AI', 'human–computer interaction', 'brain–computer interfaces', 'on-device LLMs', 'assistive technology'];
export function RoleTicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(() => setIndex((n) => (n + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return <p className="role-ticker">
    <span className="role-ticker-fixed">Research Engineer</span><span className="role-ticker-slash" aria-hidden="true">/</span>
    <span className="sr-only">working on {ROLES.join(', ')}</span>
    <span className="role-ticker-window" aria-hidden="true"><span key={index} className="role-ticker-word">{ROLES[index]}</span></span>
  </p>;
}

// A live waveform: noisy on the left, clean on the right. Moving the pointer across it plucks the line like a string.
function SignalWave() {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const active = useActive(wrap);
  const pointer = useRef(null);
  const string = useRef(null);

  useEffect(() => {
    if (!active) return;
    const c = canvas.current, ctx = c.getContext('2d');
    const styles = getComputedStyle(c);
    const purple = styles.getPropertyValue('--purple').trim() || '#7952b3';
    const lavender = styles.getPropertyValue('--lavender').trim() || '#e9dcff';
    const still = reducedMotion();
    const N = 160;
    if (!string.current) string.current = { u: new Float32Array(N), v: new Float32Array(N) };
    const { u, v } = string.current;
    let frame, t = performance.now() / 1000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);

    const noise = (x) => Math.sin(x * 1.7) * .5 + Math.sin(x * 3.1 + 1.3) * .3 + Math.sin(x * 7.3 + .4) * .2;
    const draw = (now) => {
      t = now / 1000;
      const w = c.clientWidth, h = c.clientHeight, mid = h / 2;
      // pluck: the pointer's vertical motion pushes the nearest points of the string
      const p = pointer.current;
      if (p && p.dy) {
        const i0 = Math.round(p.x / w * (N - 1));
        for (let i = Math.max(1, i0 - 6); i < Math.min(N - 1, i0 + 7); i++) v[i] += p.dy * .06 * Math.exp(-((i - i0) ** 2) / 8);
        p.dy = 0;
      }
      for (let s = 0; s < 2; s++) {
        for (let i = 1; i < N - 1; i++) v[i] += .3 * (u[i - 1] - 2 * u[i] + u[i + 1]) - .025 * v[i];
        for (let i = 1; i < N - 1; i++) u[i] += v[i];
      }
      ctx.clearRect(0, 0, w, h);
      const amp = Math.min(h * .22, 26);
      [[lavender, 2, .9], [purple, 1.6, 0]].forEach(([color, width, lag]) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const k = x / w, clean = Math.min(1, Math.max(0, (k - .1) / .55));
          const fade = Math.sin(Math.PI * k) ** .6;
          const i = k * (N - 1), i0 = Math.floor(i), f = i - i0;
          const pluck = Math.max(-mid + 8, Math.min(mid - 8, u[i0] * (1 - f) + (u[Math.min(N - 1, i0 + 1)] || 0) * f));
          const y = mid + fade * (amp * Math.sin(x * .018 - t * 2.2 - lag) * (.35 + .65 * clean)
            + (1 - clean) * amp * .9 * noise(x * .09 + t * 9 + lag * 3)) + pluck;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'; ctx.stroke();
      });
      if (!still) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, [active]);

  const move = (event) => {
    if (event.pointerType === 'touch' && event.type === 'pointermove' && !event.isPrimary) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left, y = event.clientY - box.top;
    const last = pointer.current;
    pointer.current = { x, y, dy: last ? Math.max(-40, Math.min(40, y - last.y)) : 0 };
  };
  return <div ref={wrap} className="signal-wave" onPointerMove={move} onPointerLeave={() => { pointer.current = null; }}>
    <canvas ref={canvas} aria-hidden="true" />
    <div className="signal-wave-labels" aria-hidden="true"><span>noise</span><span>signal</span><span>insight</span></div>
  </div>;
}

function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(reducedMotion() ? value : 0);
  useEffect(() => {
    if (reducedMotion()) return;
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - start) / 1600);
        setShown(k < 1 ? value * (1 - Math.pow(2, -10 * k)) : value);
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .6 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref}>{prefix}{shown.toFixed(decimals)}{suffix}</span>;
}

const STATS = [
  { value: 16, label: 'Projects & explorations' },
  { value: 3.66, decimals: 2, label: 'CGPA out of 4.00' },
  { value: 4, prefix: '×', label: 'Dean’s List semesters' },
  { value: 287, prefix: '#', label: 'Island rank, GCE A/L' },
  { value: 6, label: 'Awards & recognitions' },
];
export function SignalBand() {
  return <section className="signal-band wrap" aria-label="At a glance">
    <SignalWave />
    <dl className="signal-stats">{STATS.map(({ label, ...count }) => <div key={label}><dt>{label}</dt><dd><CountUp {...count} /></dd></div>)}</dl>
  </section>;
}

// Words light up one by one as the section scrolls through the viewport.
const BELIEF = ['Technology', 'should', 'be', 'understood,', 'not', 'just', 'used.'];
export function Manifesto() {
  const ref = useRef(null);
  const venn = useRef(null);
  useEffect(() => {
    const section = ref.current;
    if (reducedMotion()) { section.style.setProperty('--p', 1); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = section.getBoundingClientRect(), vh = window.innerHeight;
      section.style.setProperty('--p', Math.min(1, Math.max(0, (vh * .85 - box.top) / (vh * .7))).toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { venn.current.dataset.drawn = 'true'; observer.disconnect(); } }, { threshold: .45 });
    observer.observe(venn.current);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);
  return <section ref={ref} className="manifesto" aria-labelledby="manifesto-title" style={{ '--n': BELIEF.length }}>
    <div className="manifesto-inner wrap">
      <div className="manifesto-copy">
        <p className="manifesto-kicker">What I believe</p>
        <h2 id="manifesto-title">{BELIEF.map((word, i) => <span key={word} className={`manifesto-word${word === 'understood,' ? ' is-key' : ''}`} style={{ '--i': i }}>{word} </span>)}</h2>
        <p className="manifesto-note">So I build AI people can see into: interpretable models, honest interfaces, and assistive tools that earn trust.</p>
      </div>
      <figure ref={venn} className="manifesto-venn" data-drawn="false">
        <svg viewBox="0 0 420 400" role="img" aria-label="Deep learning, computer vision and artificial intelligence overlap at real-world impact.">
          <defs>
            <clipPath id="venn-a"><circle cx="210" cy="150" r="110" /></clipPath>
            <clipPath id="venn-b"><circle cx="275" cy="262" r="110" /></clipPath>
          </defs>
          <g className="venn-circles">
            <circle className="venn-ring venn-ring-1" cx="210" cy="150" r="110" pathLength="100" />
            <circle className="venn-ring venn-ring-2" cx="275" cy="262" r="110" pathLength="100" />
            <circle className="venn-ring venn-ring-3" cx="145" cy="262" r="110" pathLength="100" />
          </g>
          <g clipPath="url(#venn-a)"><g clipPath="url(#venn-b)"><circle className="venn-core" cx="145" cy="262" r="110" /></g></g>
          <text className="venn-core-label" x="210" y="230" textAnchor="middle">impact</text>
          <text className="venn-label" x="210" y="24" textAnchor="middle">DEEP LEARNING</text>
          <text className="venn-label" x="400" y="392" textAnchor="end">COMPUTER VISION</text>
          <text className="venn-label" x="20" y="392" textAnchor="start">ARTIFICIAL INTELLIGENCE</text>
        </svg>
        <figcaption>Where algorithms meet <span>real-world impact.</span></figcaption>
      </figure>
    </div>
  </section>;
}

// Tiny live glyphs for the featured project cards.
export function CardSignal({ kind }) {
  if (kind === 'voices') return <svg className="card-signal card-signal-eeg" viewBox="0 0 60 16" aria-hidden="true"><g>{[0, 1].map((k) => <path key={k} d="M0 8 Q3 2 6 8 T12 8 T18 8 Q20 3 22 8 T26 8 Q29 13 32 8 T38 8 T44 8 Q47 1 50 8 T56 8 T60 8" transform={`translate(${k * 60} 0)`} />)}</g></svg>;
  if (kind === 'microchip') return <svg className="card-signal card-signal-tokens" viewBox="0 0 60 16" aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={i * 7.5} y="4" width={[5, 3, 6, 4, 5, 2, 6, 4][i]} height="8" rx="1.5" style={{ '--i': i }} />)}</svg>;
  if (kind === 'biosense') return <svg className="card-signal card-signal-ecg" viewBox="0 0 60 16" aria-hidden="true"><path pathLength="100" d="M0 9 H14 L17 7 L19 9 H22 L24 11 L27 1 L30 15 L32 9 H38 Q42 5 46 9 H60" /></svg>;
  if (kind === 'campus') return <svg className="card-signal card-signal-rag" viewBox="0 0 60 16" aria-hidden="true"><path d="M5 8 H55" /><circle cx="5" cy="8" r="3" /><circle cx="30" cy="8" r="3" /><circle cx="55" cy="8" r="3" /><circle className="card-signal-packet" cx="5" cy="8" r="1.8" /></svg>;
  return null;
}

// A flat line with a single heartbeat; a purple pulse keeps travelling along it.
export function PulseDivider() {
  const ref = useRef(null);
  const active = useActive(ref);
  const d = 'M0 40 H520 L540 34 L556 40 H572 L582 48 L600 6 L618 70 L630 40 H664 Q690 22 716 40 H1200';
  return <div ref={ref} className="pulse-divider wrap" data-active={active} aria-hidden="true">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none"><path className="pulse-base" d={d} /><path className="pulse-trace" d={d} pathLength="100" /></svg>
  </div>;
}

export function LocalTime() {
  const format = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => { const id = setInterval(() => setTime(format()), 15000); return () => clearInterval(id); }, []);
  return <p className="local-time"><span className="local-time-dot" aria-hidden="true" />Singapore <span aria-hidden="true">·</span> <time>{time}</time> SGT</p>;
}
