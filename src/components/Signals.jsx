import { useEffect, useState } from 'react';
import './Signals.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// Tiny live glyphs for the featured project cards.
export function CardSignal({ kind }) {
  if (kind === 'voices') return <svg className="card-signal card-signal-eeg" viewBox="0 0 60 16" aria-hidden="true"><g>{[0, 1].map((k) => <path key={k} d="M0 8 Q3 2 6 8 T12 8 T18 8 Q20 3 22 8 T26 8 Q29 13 32 8 T38 8 T44 8 Q47 1 50 8 T56 8 T60 8" transform={`translate(${k * 60} 0)`} />)}</g></svg>;
  if (kind === 'microchip') return <svg className="card-signal card-signal-tokens" viewBox="0 0 60 16" aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={i * 7.5} y="4" width={[5, 3, 6, 4, 5, 2, 6, 4][i]} height="8" rx="1.5" style={{ '--i': i }} />)}</svg>;
  if (kind === 'biosense') return <svg className="card-signal card-signal-ecg" viewBox="0 0 60 16" aria-hidden="true"><path pathLength="100" d="M0 9 H14 L17 7 L19 9 H22 L24 11 L27 1 L30 15 L32 9 H38 Q42 5 46 9 H60" /></svg>;
  if (kind === 'campus') return <svg className="card-signal card-signal-rag" viewBox="0 0 60 16" aria-hidden="true"><path d="M5 8 H55" /><circle cx="5" cy="8" r="3" /><circle cx="30" cy="8" r="3" /><circle cx="55" cy="8" r="3" /><circle className="card-signal-packet" cx="5" cy="8" r="1.8" /></svg>;
  return null;
}

export function LocalTime() {
  const format = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => { const id = setInterval(() => setTime(format()), 15000); return () => clearInterval(id); }, []);
  return <p className="local-time"><span className="local-time-dot" aria-hidden="true" />Singapore <span aria-hidden="true">·</span> <time>{time}</time> SGT</p>;
}
