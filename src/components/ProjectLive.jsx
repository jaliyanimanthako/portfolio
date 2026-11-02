import { useEffect, useRef, useState } from 'react';
import { paintFigure, stillTime } from './projectFigures';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Featured cards: the figure cross-fades over the card illustration on hover/focus; on touch screens it alternates while in view.
export default function ProjectLive({ kind }) {
  const canvas = useRef(null);
  const [live, setLive] = useState(false);

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
    const start = performance.now(), still = reducedMotion();
    let frame;
    const render = (now) => {
      paintFigure(c, kind, still ? stillTime(kind) : (now - start) / 1000, 'card');
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

// Archive cards and the project dialog: the figure plays whenever it is on screen and restarts each time it scrolls back in.
export function ProjectFigure({ kind }) {
  const canvas = useRef(null);
  useEffect(() => {
    const c = canvas.current, still = reducedMotion();
    let frame, start, visible = false;
    const render = (now) => {
      paintFigure(c, kind, still ? stillTime(kind) : (now - start) / 1000);
      if (!still && visible) frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      visible = entry.isIntersecting;
      if (visible) { start = performance.now(); frame = requestAnimationFrame(render); }
    }, { rootMargin: '60px 0px' });
    const resized = new ResizeObserver(() => { if (still && visible) render(); });
    observer.observe(c); resized.observe(c);
    return () => { observer.disconnect(); resized.disconnect(); cancelAnimationFrame(frame); };
  }, [kind]);
  return <canvas ref={canvas} className="project-figure" aria-hidden="true" />;
}
