import { useId } from 'react';
import { Blob, Chip, Hand, Head, Limb, Shirt, Shoe, Sparkle } from './parts';
import './illustrations.css';

const pants = 'var(--ill-pants)';

// One EEG period is 40 units wide; repeating it lets the trace scroll seamlessly.
function eegPath(x0, y0, periods) {
  const beat = [[0, 0], [9, 0], [12, -11], [16, 13], [20, -5], [24, 0], [31, 0], [33, -3], [35, 2], [40, 0]];
  const points = [];
  for (let p = 0; p < periods; p += 1) beat.forEach(([x, y]) => points.push(`${x0 + p * 40 + x} ${y0 + y}`));
  return `M${points.join(' L')}`;
}

function EegCard({ x, y, w = 80, h = 54 }) {
  const clip = useId();
  return <g transform={`translate(${x} ${y})`}>
    <rect className="o" x={-w / 2} y={-h / 2} width={w} height={h} rx="9" />
    {[0, 8, 16].map((dx) => <circle key={dx} className="k" cx={-w / 2 + 10 + dx} cy={-h / 2 + 10} r="2.5" />)}
    <clipPath id={clip}><rect x={-w / 2 + 4} y={-h / 2 + 16} width={w - 8} height={h - 20} /></clipPath>
    <g clipPath={`url(#${clip})`}>
      <path className="deep-line ill-scroll" style={{ strokeWidth: 2.5 }} d={eegPath(-w / 2, 6, Math.ceil(w / 40) + 3)} />
    </g>
  </g>;
}

// Standing character drawn around x = 200; place it with the `x` offset.
function StandingFigure({ x = 0, children }) {
  return <g transform={`translate(${x} 0)`}>
    <Limb d="M188 212 L184 262 L186 298" width={24} color={pants} />
    <Limb d="M212 212 L218 262 L220 298" width={24} color={pants} />
    <path className="ill-shine" d="M186 226 L184 256 M214 226 L218 256" />
    <Shoe x={176} y={304} />
    <Shoe x={212} y={304} />
    <Head x={200} y={96} />
    {children}
    <Shirt cx={200} top={132} height={86} />
  </g>;
}

/* 1. Hero — floating among the things he builds with. */
export function FloatingResearcher({ className = '' }) {
  return <svg className={`ill ${className}`} viewBox="0 0 500 500" role="img" aria-label="Jaliya floating among AI, chip and signal icons while reading his phone">
    <Blob className="ill-breathe" d="M236 62 C330 40 420 96 436 196 C452 296 420 380 330 420 C240 460 130 440 86 360 C42 280 70 200 118 138 C150 96 190 72 236 62 Z" />

    <g className="ill-bob" style={{ '--d': '-1s' }}><g transform="translate(224 40)">
      <rect className="o ill-toggle-track" width="52" height="26" rx="13" />
      <circle className="k ill-toggle-knob" cx="14" cy="13" r="8" />
    </g></g>
    <g className="ill-bob" style={{ '--d': '-2.5s' }}><g transform="translate(398 140)">
      <path className="accent-line ill-idea" d="M-15 -38 L-20 -47 M0 -42 V-53 M15 -38 L20 -47" />
      <path className="o" d="M-4 -26 C-16 -32 -30 -24 -28 -12 C-38 -8 -38 8 -28 12 C-30 24 -16 30 -6 24 C-2 28 2 28 6 24 C16 30 30 24 28 12 C38 8 38 -8 28 -12 C30 -24 16 -32 4 -26 C2 -29 -2 -29 -4 -26 Z" />
      <path className="line" d="M0 -26 V24 M-14 -15 Q-5 -9 -14 -1 M-21 8 Q-11 6 -9 16 M14 -15 Q5 -9 14 -1 M21 8 Q11 6 9 16" />
    </g></g>
    <g className="ill-bob" style={{ '--d': '-0.5s' }}><Chip x={92} y={218} /></g>
    <g className="ill-bob" style={{ '--d': '-3s' }}><EegCard x={404} y={300} /></g>
    <g className="ill-bob" style={{ '--d': '-1.8s' }}><g transform="translate(104 378)">
      <path className="o" d="M-32 -22 H32 Q40 -22 40 -14 V12 Q40 20 32 20 H-6 L-20 32 L-18 20 H-32 Q-40 20 -40 12 V-14 Q-40 -22 -32 -22 Z" />
      <path className="deep-line" d="M-10 -8 L-18 -1 L-10 6 M10 -8 L18 -1 L10 6 M4 -11 L-4 9" />
    </g></g>
    <g className="ill-bob" style={{ '--d': '-3.6s' }}><g transform="translate(384 414)">
      <path className="line" d="M-24 -10 L4 2 M-24 14 L4 2 L28 -12" />
      <circle className="o" cx="-24" cy="-10" r="6" /><circle className="o" cx="-24" cy="14" r="6" />
      <circle className="p" cx="4" cy="2" r="7" /><circle className="o" cx="28" cy="-12" r="6" />
    </g></g>

    <Sparkle x={150} y={112} /><Sparkle x={446} y={214} d={0.8} plus />
    <Sparkle x={52} y={300} d={1.6} /><Sparkle x={330} y={468} d={0.4} plus />
    <Sparkle x={196} y={458} d={1.2} /><Sparkle x={318} y={92} d={2} plus />

    <g className="ill-float" style={{ transformOrigin: '250px 260px' }}>
      <g transform="rotate(-10 250 260)">
        <Limb d="M238 266 L214 324 L248 364" width={24} color={pants} />
        <Limb d="M264 268 L282 328 L268 384" width={24} color={pants} />
        <path className="ill-shine" d="M234 280 L220 318 M268 282 L280 324" />
        <g transform="translate(244 368) rotate(40)"><Shoe x={0} y={0} /></g>
        <g transform="translate(264 388) rotate(12)"><Shoe x={0} y={0} /></g>
        <Limb d="M288 222 Q312 250 298 282" />
        <Hand x={297} y={288} r={7.5} />
        <Limb d="M216 222 Q186 214 196 170" />
        <g transform="rotate(-12 197 132)">
          <rect className="k" x="184" y="106" width="26" height="48" rx="5" />
          <rect x="188" y="112" width="18" height="34" rx="2" fill="#fff" />
          <rect className="ill-phone-msg" style={{ '--d': '0s' }} x="190" y="116" width="11" height="4" rx="2" fill="var(--ill-accent)" />
          <rect className="ill-phone-msg" style={{ '--d': '.5s' }} x="194" y="123" width="10" height="4" rx="2" fill="#d6c2f7" />
          <rect className="ill-phone-msg" style={{ '--d': '1s' }} x="190" y="130" width="13" height="4" rx="2" fill="var(--ill-accent)" />
          <rect className="ill-phone-msg" style={{ '--d': '1.5s' }} x="196" y="137" width="8" height="4" rx="2" fill="#d6c2f7" />
        </g>
        <Hand x={197} y={164} />
        <Head x={251} y={150} s={1.1} flip />
        <Shirt cx={251} top={188} height={86} />
      </g>
    </g>
  </svg>;
}

/* 2. Research — EEG cap on, speech going out: neural speech tracking. */
const electrodes = [[-26.7, -11.1], [-20.8, -24.4], [-1.9, -36.3], [18.7, -33.4], [27.3, -23.9]];

export function MindReader({ className = '' }) {
  return <svg className={`ill ${className}`} viewBox="0 0 400 330" role="img" aria-label="Jaliya wearing an EEG cap while his speech and brain signals are recorded">
    <Blob className="ill-breathe" d="M200 30 C290 24 370 80 372 170 C374 260 300 312 200 312 C100 312 28 256 30 166 C32 76 110 36 200 30 Z" />
    <EegCard x={82} y={86} w={104} h={64} />
    <path className="deep-line ill-flow" style={{ strokeWidth: 2.5 }} d="M157 142 C140 140 146 112 134 104 M167 121 C156 110 150 92 134 84" />
    <Head x={200} y={160} s={1.6} />
    <g transform="translate(200 160) scale(1.6)">
      <path className="line" style={{ strokeWidth: 2.4 }} d="M-27 0 C-32 -40 26 -52 30 -14" />
      {electrodes.map(([x, y], i) => <circle key={i} className="o ill-electrode" style={{ '--d': `${i * 0.35}s`, strokeWidth: 2 }} cx={x} cy={y} r="4.5" />)}
    </g>
    <path className="p" d="M112 334 C112 266 146 230 186 222 L214 222 C254 230 288 266 288 334 Z" />
    <path className="o" d="M184 222 Q200 240 216 222 Z" />
    <path className="ill-shine" d="M140 270 Q136 300 140 330" />
    <path className="o" d="M282 118 H352 Q362 118 362 128 V162 Q362 172 352 172 H296 L262 190 L280 172 Q272 172 272 162 V128 Q272 118 282 118 Z" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} className="ill-bar" style={{ '--d': `${(i % 3) * -0.3 - i * 0.12}s` }} x={286 + i * 10} y={128} width="5" height="34" rx="2.5" fill={i % 2 ? 'var(--ill-ink)' : 'var(--ill-accent)'} />)}
    <Sparkle x={330} y={64} plus /><Sparkle x={362} y={226} d={1} />
    <Sparkle x={48} y={190} d={1.8} plus /><Sparkle x={86} y={262} d={0.6} />
  </svg>;
}

/* 3. Edge AI — a language model running on a chip, no cloud needed. */
export function PocketLLM({ className = '' }) {
  return <svg className={`ill ${className}`} viewBox="0 0 400 360" role="img" aria-label="Jaliya sitting on a chip chatting with an on-device language model">
    <Blob className="ill-breathe" d="M190 40 C290 30 372 96 366 190 C360 284 290 338 190 336 C96 334 30 270 34 180 C38 96 100 46 190 40 Z" />
    <g className="ill-bob" style={{ '--d': '-1s' }}><g transform="translate(84 104)">
      <path className="o" d="M-26 10 C-37 10 -37 -6 -24 -6 C-22 -20 -2 -22 2 -10 C6 -16 20 -14 20 -2 C30 -2 30 10 20 10 Z" />
      <path className="deep-line" d="M-26 -20 L24 18" />
    </g></g>
    <g className="ill-pop" style={{ '--d': '0s' }}><g transform="translate(272 54)">
      <path className="o" d="M8 0 H92 Q100 0 100 8 V28 Q100 36 92 36 H18 L4 46 L8 36 Q0 36 0 28 V8 Q0 0 8 0 Z" />
      <rect x="12" y="10" width="62" height="5" rx="2.5" fill="var(--ill-ink)" />
      <rect x="12" y="21" width="42" height="5" rx="2.5" fill="#cfcfcf" />
    </g></g>
    <g className="ill-pop" style={{ '--d': '.9s' }}><g transform="translate(290 112)">
      <path className="p" d="M8 0 H72 Q80 0 80 8 V26 Q80 34 72 34 H18 L4 44 L8 34 Q0 34 0 26 V8 Q0 0 8 0 Z" />
      {[0, 1, 2].map((i) => <circle key={i} className="k ill-dot" style={{ '--d': `${i * 0.15}s` }} cx={26 + i * 14} cy="17" r="4" />)}
    </g></g>

    <path className="line" d={[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `M${116 + i * 21} 306 V318`).join(' ') + ' M100 256 H90 M100 286 H90 M300 256 H310 M300 286 H310'} />
    <rect className="k" x="100" y="236" width="200" height="70" rx="12" stroke="var(--ill-ink)" strokeWidth="3" />
    <rect x="112" y="246" width="176" height="50" rx="7" fill="none" stroke="#ffffff30" strokeWidth="2" />
    <text x="162" y="276" textAnchor="middle" style={{ fill: "#fff", fontSize: 12 }}>ON-DEVICE LLM</text>
    <circle className="ill-led" cx="276" cy="258" r="4" fill="var(--ill-accent)" />

    <Limb d="M182 226 L236 232 L240 292" width={24} color={pants} />
    <Limb d="M202 224 L256 224 L262 288" width={24} color={pants} />
    <Shoe x={234} y={300} />
    <Shoe x={256} y={296} />
    <Head x={192} y={112} tilt={10} />
    <Shirt cx={190} top={150} height={80} />
    <g transform="rotate(18 250 173)">
      <rect className="k" x="240" y="154" width="20" height="36" rx="4" />
      <rect x="243" y="159" width="14" height="25" rx="2" fill="var(--ill-soft)" />
    </g>
    <Limb d="M152 180 Q160 220 236 200" />
    <Hand x={240} y={198} r={7.5} />
    <Limb d="M228 180 Q238 196 250 188" />
    <Hand x={253} y={186} r={7} />
    <Sparkle x={60} y={200} plus /><Sparkle x={342} y={250} d={1.2} />
    <Sparkle x={150} y={56} d={0.6} /><Sparkle x={370} y={70} d={2} plus />
  </svg>;
}

/* 4. Hardware — soldering a sensor board while the ECG beats. */
export function Prototyper({ className = '' }) {
  return <svg className={`ill ${className}`} viewBox="0 0 400 340" role="img" aria-label="Jaliya soldering a circuit board next to a heartbeat monitor">
    <Blob className="ill-breathe" d="M196 28 C292 20 370 84 368 178 C366 268 296 326 196 324 C100 322 32 262 34 172 C36 84 104 34 196 28 Z" />
    <g className="ill-bob" style={{ '--d': '-2s' }}><g transform="translate(320 98)">
      <rect className="o" x="-52" y="-38" width="104" height="76" rx="10" />
      <path className="p ill-heart" style={{ strokeWidth: 2 }} d="M-38 -26 C-38 -32 -30 -32 -29 -27 C-28 -32 -20 -32 -20 -26 C-20 -21 -29 -16 -29 -16 C-29 -16 -38 -21 -38 -26 Z" />
      <path className="deep-line ill-draw" pathLength="100" d="M-42 14 H-24 L-19 6 L-14 14 H-8 L-2 -16 L4 28 L10 6 L15 14 H42" />
    </g></g>

    <Head x={186} y={104} tilt={14} />
    <Shirt cx={182} top={142} height={100} />
    <rect className="p" x="46" y="230" width="308" height="98" rx="12" />
    <g fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M70 256 H124 L144 276 H160 M70 304 H104 L124 284 H160 M206 302 H260 L280 282 H330 M220 256 H300 L316 246" />
    </g>
    <path className="deep-line ill-flow" style={{ strokeWidth: 3 }} d="M70 256 H124 L144 276 H160 M206 302 H260 L280 282 H330" />
    {[[70, 256], [70, 304], [330, 282], [316, 246]].map(([cx, cy]) => <circle key={`${cx}${cy}`} className="o" cx={cx} cy={cy} r="5" />)}
    <path className="line" d="M168 284 V278 M178 284 V278 M188 284 V278 M198 284 V278 M168 316 V322 M178 316 V322 M188 316 V322 M198 316 V322" />
    <rect className="k" x="160" y="284" width="46" height="32" rx="4" />
    <circle className="ill-led" cx="300" cy="306" r="6" fill="var(--ill-ink)" stroke="var(--ill-ink)" strokeWidth="2" />
    <Limb d="M146 172 Q128 212 154 240" />
    <Hand x={157} y={242} />

    <g className="ill-solder-arm" style={{ transformOrigin: '220px 172px' }}>
      <Limb d="M222 172 Q258 194 256 220" />
      <Limb d="M270 202 L254 232" width={9} color="var(--ill-accent)" />
      <path className="line" d="M254 232 L244 252" />
      <Hand x={258} y={222} />
      <g transform="translate(243 254)">
        <path className="accent-line ill-spark" style={{ '--d': '0s' }} d="M-8 -6 L-14 -10 M-9 2 L-16 3 M6 -8 L10 -14" />
        <path className="line ill-spark" style={{ '--d': '.25s', strokeWidth: 2 }} d="M-6 -12 L-8 -18 M8 -2 L14 -4" />
      </g>
    </g>
    <Sparkle x={70} y={110} plus /><Sparkle x={112} y={50} d={1} />
    <Sparkle x={372} y={200} d={1.8} />
  </svg>;
}

/* 5. Leadership — teaching a room how a network learns. */
const layersL = [[252, [92, 146]], [306, [76, 119, 162]], [360, [119]]];

export function Mentor({ className = '' }) {
  const edges = layersL.slice(0, -1).flatMap(([x1, ys1], l) => ys1.flatMap((y1) => layersL[l + 1][1].map((y2) => ({ x1, y1, x2: layersL[l + 1][0], y2, l }))));
  return <svg className={`ill ${className}`} viewBox="0 0 420 340" role="img" aria-label="Jaliya pointing at a neural network on a whiteboard while students watch">
    <Blob className="ill-breathe" d="M210 26 C310 18 394 78 392 172 C390 262 316 330 210 328 C106 326 26 262 28 170 C30 80 112 34 210 26 Z" />
    <path className="line" d="M242 190 L230 300 M370 190 L382 300" />
    <rect className="o" x="214" y="46" width="184" height="146" rx="8" />
    {edges.map(({ x1, y1, x2, y2, l }, i) => <path key={i} className="line ill-edge-draw" pathLength="100" style={{ '--d': `${0.3 + l * 0.6 + i * 0.05}s`, strokeWidth: 2 }} d={`M${x1} ${y1} L${x2} ${y2}`} />)}
    {layersL.flatMap(([x, ys], l) => ys.map((y) => <circle key={`${x}${y}`} className={`${l === 2 ? 'p' : 'o'} ill-node-pop`} style={{ '--d': `${l * 0.6}s` }} cx={x} cy={y} r="8" />))}

    <StandingFigure x={-90}>
      <Limb d="M160 162 Q146 192 156 222" />
      <Hand x={157} y={226} />
      <g className="ill-point" style={{ transformOrigin: '240px 162px' }}>
        <Limb d="M240 162 Q270 150 292 128" />
        <Limb d="M298 121 L314 108" width={5} color="var(--ill-accent)" />
        <Hand x={295} y={125} r={7.5} />
      </g>
    </StandingFigure>

    {[[250, 0], [316, -0.7], [382, -1.4]].map(([x, d]) => <g key={x} transform={`translate(${x} 314)`}>
      <g className="ill-nod" style={{ '--d': `${d}s` }}>
        <path className="o" style={{ fill: x === 316 ? 'var(--ill-accent)' : 'var(--ill-paper)' }} d="M-28 30 C-28 8 28 8 28 30 Z" />
        <circle className="o" cx="0" cy="-6" r="16" />
        <path className="k" d="M-16 -6 C-17 -28 17 -28 16 -6 C8 -12 -8 -12 -16 -6 Z" />
      </g>
    </g>)}
    <Sparkle x={58} y={70} plus /><Sparkle x={196} y={30} d={1.1} />
    <Sparkle x={34} y={250} d={1.9} />
  </svg>;
}

/* 6. Contact — waving hello as a paper plane heads for the inbox. */
const planePath = 'M232 262 C300 292 372 238 352 178 C336 128 282 128 292 168 C302 206 364 168 352 74';

export function SayHello({ className = '' }) {
  return <svg className={`ill ${className}`} viewBox="0 0 400 360" role="img" aria-label="Jaliya waving hello while a paper plane flies to an envelope">
    <Blob className="ill-breathe" d="M196 34 C296 24 374 92 368 186 C362 280 290 336 192 334 C96 332 28 268 32 178 C36 92 100 44 196 34 Z" />
    <path className="deep-line ill-trail" style={{ strokeWidth: 2, opacity: 0.6 }} d={planePath} />
    <g className="ill-bob" style={{ '--d': '-1s' }}><g transform="translate(352 56)">
      <rect className="o" x="-24" y="-16" width="48" height="32" rx="4" />
      <path className="line" d="M-22 -13 L0 4 L22 -13" />
    </g></g>
    <g className="ill-plane" style={{ offsetPath: `path('${planePath}')` }}>
      <path className="o" d="M14 0 L-12 -10 L-6 0 L-12 10 Z" />
      <path className="line" style={{ strokeWidth: 2 }} d="M14 0 L-6 0" />
    </g>

    <g className="ill-bob" style={{ '--d': '-2s' }}><g transform="translate(86 62)">
      <path className="o" d="M-30 -20 H30 Q38 -20 38 -12 V8 Q38 16 30 16 H10 L20 30 L-2 16 H-30 Q-38 16 -38 8 V-12 Q-38 -20 -30 -20 Z" />
      <text x="0" y="3" textAnchor="middle" style={{ fontSize: 16, fill: 'var(--ill-deep)' }}>hi!</text>
    </g></g>

    <StandingFigure x={-30}>
      <Limb d="M160 162 Q146 192 156 222" />
      <Hand x={157} y={226} />
      <g className="ill-wave-arm" style={{ transformOrigin: '240px 162px' }}>
        <Limb d="M240 162 Q276 150 272 106" />
        <Hand x={272} y={100} r={9} />
      </g>
    </StandingFigure>
    <Sparkle x={70} y={190} plus /><Sparkle x={300} y={318} d={1.2} />
    <Sparkle x={210} y={40} d={0.6} />
  </svg>;
}
