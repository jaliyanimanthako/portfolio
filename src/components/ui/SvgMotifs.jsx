import { useEffect, useId, useRef, useState } from 'react';
import './SvgMotifs.css';

// Adds `is-live` once the SVG scrolls into view, so draw-in animations play on arrival.
function useInView() {
  const ref = useRef(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLive(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, live ? ' is-live' : ''];
}

// Hero — two tilted orbits with bodies travelling along them (human & machine).
export function SignalOrbit({ className = '' }) {
  return <svg className={`motif motif-orbit ${className}`} viewBox="0 0 400 400" aria-hidden="true">
    <g transform="rotate(-25 200 200)">
      <ellipse className="orbit-track" cx="200" cy="200" rx="190" ry="120" pathLength="100" />
      <ellipse className="orbit-track orbit-track-dashed" cx="200" cy="200" rx="150" ry="175" pathLength="100" transform="rotate(60 200 200)" />
      <ellipse className="orbit-trail" cx="200" cy="200" rx="190" ry="120" pathLength="100" />
      <ellipse className="orbit-body" cx="200" cy="200" rx="190" ry="120" pathLength="100" />
      <ellipse className="orbit-body orbit-body-small" cx="200" cy="200" rx="150" ry="175" pathLength="100" transform="rotate(60 200 200)" />
    </g>
  </svg>;
}

// About — a scrolling EEG trace, a nod to neural speech tracking research.
const eegPath = 'M0 30 L18 30 L24 26 L30 34 L36 30 L52 30 L58 12 L64 48 L70 22 L76 36 L82 30 L100 30 L106 27 L112 33 L118 30 L134 30 L140 4 L146 54 L152 18 L158 40 L164 30 L182 30 L188 25 L194 35 L200 30';

export function BrainWave({ className = '' }) {
  const [ref, live] = useInView();
  const id = useId();
  return <svg ref={ref} className={`motif motif-wave${live} ${className}`} viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-fade`} x1="0" x2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset=".2" stopColor="#fff" />
        <stop offset=".8" stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <mask id={`${id}-mask`}><rect width="200" height="60" fill={`url(#${id}-fade)`} /></mask>
    </defs>
    <g mask={`url(#${id}-mask)`}>
      <line className="wave-baseline" x1="0" y1="30" x2="200" y2="30" />
      <g className="wave-scroll">
        <path className="wave-line" d={eegPath} pathLength="100" />
        <path className="wave-line" d={eegPath} pathLength="100" transform="translate(200 0)" />
      </g>
    </g>
  </svg>;
}

// Journey — signals passing through a tiny network, layer by layer.
const layers = [[20, [30, 70]], [75, [15, 50, 85]], [130, [30, 70]], [180, [50]]];

export function NeuralPulse({ className = '' }) {
  const [ref, live] = useInView();
  const nodes = layers.flatMap(([x, ys], layer) => ys.map((y) => ({ x, y, layer })));
  const edges = layers.slice(0, -1).flatMap(([x1, ys1], layer) => {
    const [x2, ys2] = layers[layer + 1];
    return ys1.flatMap((y1) => ys2.map((y2) => ({ x1, y1, x2, y2, layer })));
  });
  return <svg ref={ref} className={`motif motif-neural${live} ${className}`} viewBox="0 0 200 100" aria-hidden="true">
    {edges.map(({ x1, y1, x2, y2, layer }, i) => <g key={i} style={{ '--layer': layer, '--i': i }}>
      <line className="neural-edge" x1={x1} y1={y1} x2={x2} y2={y2} />
      <line className="neural-pulse" x1={x1} y1={y1} x2={x2} y2={y2} pathLength="100" />
    </g>)}
    {nodes.map(({ x, y, layer }, i) => <circle key={i} className="neural-node" cx={x} cy={y} r={layer === 3 ? 6 : 4.5} style={{ '--layer': layer }} />)}
  </svg>;
}

// Contact — a transmitter sending out rings, for Electronic & Telecommunication.
export function Broadcast({ className = '' }) {
  return <svg className={`motif motif-broadcast ${className}`} viewBox="0 0 120 120" aria-hidden="true">
    {[0, 1, 2].map((i) => <circle key={i} className="broadcast-ring" cx="60" cy="60" r="56" style={{ '--i': i }} />)}
  </svg>;
}
