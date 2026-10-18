// Shared drawing parts for the Notion-style character scenes.
// Everything is drawn in viewBox units with a 3px ink line.

// A limb is a thick ink stroke with a narrower coloured stroke on top.
export function Limb({ d, width = 12, color = 'var(--ill-paper)' }) {
  return <g className="ill-limb">
    <path d={d} stroke="var(--ill-ink)" strokeWidth={width + 6} />
    <path d={d} stroke={color} strokeWidth={width} />
  </g>;
}

export function Hand({ x, y, r = 8 }) {
  return <circle className="o" cx={x} cy={y} r={r} />;
}

// Head drawn around (0,0), facing right; `flip` turns it to face left.
export function Head({ x, y, s = 1, flip = false, tilt = 0, className = '' }) {
  return <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${flip ? -s : s} ${s})`}>
    <g className={className}>
      <path className="o" d="M-7 20 L-7 36 L7 36 L7 20 Z" />
      <path className="o" d="M-22 -6 C-23 -30 22 -33 24 -8 C26 8 21 27 4 30 C-10 32 -21 22 -22 6 Z" />
      <path className="o" d="M-20 -4 C-30 -7 -31 11 -19 9" />
      <path className="k" d="M-21 3 C-18 22 -6 31 4 30 C18 29 23 16 24 5 C20 14 14 16 8 15 C0 16 -8 11 -14 4 C-16 9 -19 8 -21 3 Z" />
      <path className="ill-mouth" d="M6 21 Q11 24 16 20" />
      <path className="k" d="M-25 1 C-31 -22 -16 -40 4 -39 C18 -42 34 -32 30 -16 C26 -20 18 -22 10 -19 C4 -24 -6 -22 -12 -14 C-15 -10 -17 -4 -18 2 Z" />
      <path className="k" d="M0 -38 C4 -48 18 -50 23 -40 C16 -42 8 -41 0 -38 Z" />
      <g className="ill-eyes">
        <ellipse className="k" cx="5" cy="-4" rx="2.2" ry="3" />
        <ellipse className="k" cx="16" cy="-4" rx="2.2" ry="3" />
      </g>
      <path className="line" d="M1 -12 Q5 -14.5 9 -12.5 M13 -12.5 Q17 -14.5 21 -11.5" />
      <path className="o" d="M22.5 -1 C28 5 27.5 9.5 21.5 10" />
    </g>
  </g>;
}

// T-shirt torso. (cx, top) is the centre of the collar.
export function Shirt({ cx, top, height = 86, color = 'var(--ill-accent)' }) {
  const t = top, b = top + height;
  return <g>
    <path className="o" style={{ fill: color }} d={`M${cx - 30} ${t + 2} C${cx - 16} ${t - 4} ${cx + 16} ${t - 4} ${cx + 30} ${t + 2} L${cx + 46} ${t + 28} L${cx + 32} ${t + 36} L${cx + 28} ${t + 28} L${cx + 30} ${b} C${cx + 12} ${b + 6} ${cx - 12} ${b + 6} ${cx - 30} ${b} L${cx - 28} ${t + 28} L${cx - 32} ${t + 36} L${cx - 46} ${t + 28} Z`} />
    <path className="o" d={`M${cx - 12} ${t} Q${cx} ${t + 14} ${cx + 12} ${t} Z`} />
    <path className="ill-shine" d={`M${cx - 20} ${t + 14} Q${cx - 23} ${t + 44} ${cx - 18} ${b - 10}`} />
  </g>;
}

export function Shoe({ x, y, flip = false }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
    <path className="o" d="M-4 -6 C8 -12 26 -8 30 4 L-4 6 Z" />
    <path className="line" d="M-4 1 L29 1" />
  </g>;
}

export function Sparkle({ x, y, size = 6, d = 0, plus = false }) {
  const s = size;
  return <g transform={`translate(${x} ${y})`}>
    <path className="line ill-twinkle" style={{ '--d': `${d}s` }} d={plus ? `M0 ${-s} V${s} M${-s} 0 H${s}` : `M${-s} ${-s} L${s} ${s} M${s} ${-s} L${-s} ${s}`} />
  </g>;
}

export function Blob({ d, className = '' }) {
  return <path className={`ill-blob ${className}`} d={d} />;
}

// Small floating chip with pins.
export function Chip({ x, y, s = 1 }) {
  const pins = [-12, -4, 4, 12];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="line" d={pins.map((p) => `M${p} -20 V-27 M${p} 20 V27 M-20 ${p} H-27 M20 ${p} H27`).join(' ')} />
    <rect className="o" x="-20" y="-20" width="40" height="40" rx="6" />
    <rect className="p ill-chip-core" x="-10" y="-10" width="20" height="20" rx="3" />
  </g>;
}
