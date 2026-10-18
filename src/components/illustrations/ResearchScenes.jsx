import { useEffect, useId, useRef } from 'react';
import './research-scenes.css';

// Original vector drawings. Nested groups separate placement from animation.
function Scene({ children, label, className = '', viewBox = '0 0 520 440' }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      ref.current?.classList.toggle('scene-visible', entry.isIntersecting);
    }, { rootMargin: '40px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <svg ref={ref} className={`research-scene ${className}`} viewBox={viewBox} role="img" aria-label={label}>{children}</svg>;
}

function Head({ x = 0, y = 0, tilt = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
    <path className="paper" d="M-12 24 L-13 45 Q0 56 16 43 L13 20" />
    <path className="paper" d="M-28 -10 Q-31 -38 1 -39 Q31 -35 28 -6 L34 7 L25 12 Q23 35 7 36 Q-15 36 -22 13" />
    <path className="ink" d="M-27 12 Q-44 -4 -33 -23 Q-40 -37 -21 -43 Q-20 -60 -5 -53 Q5 -64 15 -49 Q35 -52 36 -32 Q35 -18 22 -15 L5 -21 Q-3 -8 -16 -10 L-19 8 Z" />
    <path className="paper" d="M-18 2 Q-33 -7 -32 8 Q-31 20 -20 17" />
    <path className="line fine" d="M-26 5 L-22 10 M10 24 Q17 27 21 21 M3 -7 Q8 -11 13 -7" />
    <g className="blink"><ellipse className="ink" cx="12" cy="2" rx="2" ry="3.1" /></g>
    <path className="line fine" d="M-14 -34 Q-3 -42 9 -36 M-26 -25 Q-20 -33 -13 -32" />
  </g>;
}

function Star({ x, y, size = 7 }) {
  return <path className="line fine" d={`M${x-size} ${y} H${x+size} M${x} ${y-size} V${y+size}`} />;
}

function Signal({ x = 0, y = 0 }) {
  const id = useId();
  return <g transform={`translate(${x} ${y})`}>
    <rect className="paper" width="106" height="69" rx="5" />
    <path className="line fine" d="M0 16 H106" />
    <circle className="ink" cx="9" cy="8" r="2" /><circle className="sage" cx="17" cy="8" r="2" />
    <clipPath id={id}><rect x="7" y="20" width="92" height="40" /></clipPath>
    <g clipPath={`url(#${id})`}><path className="line trace" d="M-92 43 L-79 41 L-72 48 L-64 28 L-55 55 L-47 38 L-37 44 L-25 41 L-18 47 L-10 35 L0 43 L13 41 L20 48 L28 28 L37 55 L45 38 L55 44 L67 41 L74 47 L82 35 L92 43 L105 41 L112 48 L120 28 L129 55 L137 38 L147 44 L159 41 L166 47 L174 35 L184 43" /></g>
  </g>;
}

export function ResearchDesk({ className = '' }) {
  return <Scene className={className} label="A curious researcher at his desk, connecting a notebook, a neural signal, and a small experiment.">
    <path className="wash" d="M90 246 C56 148 122 72 237 75 C343 28 444 118 448 235 C495 315 418 376 294 367 C168 396 84 340 90 246Z" />
    <path className="line fine dashed" d="M89 159 C49 92 128 37 197 76 M350 98 C435 70 490 159 449 215" />
    <g className="drift"><Signal x={339} y={83} /></g>
    <g transform="translate(105 100) rotate(-12)"><g className="drift-slow">
      <path className="paper" d="M0 0 H69 V78 H0 Z" /><path className="sage" d="M0 0 H9 V78 H0 Z" />
      <path className="line fine" d="M21 17 H53 M21 24 H45 M21 61 H48 M25 47 L33 36 L44 48 L55 32" />
      <circle className="olive" cx="25" cy="47" r="3" /><circle className="olive" cx="44" cy="48" r="3" />
    </g></g>
    <path className="line" d="M135 286 L122 387 M230 287 L245 387 M117 329 H235" />
    <path className="sage" d="M123 197 Q115 189 112 202 L118 280 Q119 290 130 291 H235 V280 H132Z" />
    <path className="ink" d="M174 262 Q232 251 267 280 L269 351 L244 357 L229 301 L175 303 Q156 284 174 262Z" />
    <path className="ink" d="M192 287 Q216 280 236 295 L215 371 L191 367 L200 307 L175 303" />
    <path className="line light-line" d="M184 287 Q207 286 220 297 L207 350 M238 286 L251 333" />
    <path className="paper" d="M193 358 L214 363 L209 380 L188 376 Z M244 346 L268 346 L269 363 L249 367Z" />
    <path className="ink" d="M188 373 Q204 382 210 376 L223 386 Q226 394 213 394 L173 390 Q172 380 188 373Z M248 362 Q263 367 269 358 L291 369 Q300 379 287 382 L246 382Z" />
    <path className="line light-line" d="M177 387 L217 391 M250 377 L290 377 M207 382 L201 385 M276 369 L269 372" />
    <Head x={194} y={154} tilt={9} />
    <path className="sage" d="M178 192 Q163 193 151 207 L141 253 L161 259 L164 280 Q199 293 230 278 L222 222 L233 233 L246 212 Q228 192 210 192 Q195 209 178 192Z" />
    <path className="line fine" d="M174 200 Q189 215 211 201 M164 218 L158 244 M218 251 L221 270 M171 271 Q185 277 197 276" />
    <path className="paper" d="M145 252 Q142 278 166 278 L237 267 L234 254 L168 260 L165 256Z" />
    <path className="paper" d="M230 228 L254 248 L282 237 L287 246 Q259 273 245 262 L220 245Z" />
    <g className="write-hand"><path className="paper" d="M231 254 L246 245 Q251 240 254 244 L250 250 Q273 245 273 251 Q274 257 259 261 L238 267Z" /><path className="line" d="M254 251 L270 223" /></g>
    <path className="paper" d="M265 265 L303 249 L343 262 L307 279Z" /><path className="line fine" d="M281 264 L303 255 L327 263 M289 269 L307 261" />
    <path className="paper" d="M281 237 L295 231 Q307 233 304 239 L287 246Z" />
    <path className="paper" d="M298 245 L277 188 Q275 182 281 182 H355 Q360 182 361 187 L379 245Z" />
    <path className="sage" d="M304 239 L288 190 H353 L369 239Z" />
    <path className="paper" d="M294 245 H383 L370 251 H286Z" /><path className="line fine" d="M313 210 L307 215 L317 220 M339 208 L348 214 L343 220 M330 205 L325 223" />
    <path className="paper" d="M136 280 H422 V288 H136Z" /><path className="line" d="M153 289 L145 395 M402 289 L410 395" />
    <path className="paper" d="M381 254 H404 L402 278 H384Z M404 258 Q420 255 413 267 L403 269" />
    <path className="line fine steam" d="M389 245 Q382 236 390 229 M398 246 Q391 237 399 230" />
    <path className="line fine" d="M91 396 H444" />
    <Star x={289} y={68} /><Star x={453} y={273} size={5} /><Star x={70} y={289} size={5} />
    <path className="line fine" d="M266 124 Q277 115 289 122 M281 117 L289 122 L283 130" />
  </Scene>;
}

export function SignalResearcher() {
  return <Scene viewBox="0 0 400 300" label="A researcher wearing an EEG cap as brain signals move across a monitor.">
    <ellipse className="wash" cx="190" cy="166" rx="144" ry="109" />
    <Signal x={258} y={80} />
    <path className="line fine dashed" d="M258 115 Q232 90 210 108 M283 150 V211 H242" />
    <g transform="translate(0 8)"><Head x={161} y={120} tilt={-7} />
      <path className="line" d="M126 112 C115 55 187 38 197 95" />
      {[[126,91],[141,70],[166,65],[187,76],[195,94]].map(([cx,cy],i)=><circle key={cx} className="paper electrode" style={{ '--delay': `${i * .7}s` }} cx={cx} cy={cy} r="5" />)}
      <path className="sage" d="M143 164 Q119 165 109 188 L91 264 H240 L218 189 Q205 166 179 163 Q161 181 143 164Z" />
      <path className="line fine" d="M130 197 L119 250 M203 199 L215 250 M143 171 Q159 189 181 171" />
      <path className="paper" d="M100 237 Q112 232 122 240 L150 253 L195 251 L199 264 L143 268Z" />
    </g>
    <path className="line" d="M55 274 H355" /><Star x={74} y={105} /><Star x={319} y={220} size={5} />
    <path className="line fine" d="M213 119 Q230 121 231 138 M220 111 Q241 114 242 136" />
  </Scene>;
}

export function DeviceResearcher() {
  return <Scene viewBox="0 0 400 300" label="An engineer sitting on a small processor, testing a language model on his phone.">
    <path className="wash" d="M66 171 C48 78 150 42 225 65 C317 50 369 141 326 212 C306 283 123 288 66 171Z" />
    <path className="line" d="M96 231 H82 M96 250 H82 M296 231 H310 M296 250 H310 M121 267 V282 M145 267 V282 M169 267 V282 M193 267 V282 M217 267 V282 M241 267 V282 M265 267 V282" />
    <rect className="sage" x="96" y="211" width="200" height="57" rx="6" />
    <path className="line fine" d="M108 221 H281 V257 H108Z" /><circle className="olive electrode" cx="122" cy="234" r="4" />
    <path className="ink" d="M155 195 L239 199 Q246 201 245 215 L235 263 H215 L216 225 L160 226 Q137 217 155 195Z" />
    <path className="ink" d="M174 200 L208 221 L192 266 H172 L181 232 L150 217Z" />
    <path className="line light-line" d="M164 213 L190 227 L180 253" />
    <path className="paper" d="M171 258 H192 V271 L209 278 Q214 285 203 286 H168Z M215 255 H235 V266 L253 273 Q261 282 248 282 H213Z" />
    <Head x={162} y={99} tilt={8} />
    <path className="sage" d="M147 141 Q125 143 120 174 L133 183 L139 209 Q169 219 195 204 L196 170 L208 164 Q191 138 180 140 Q164 156 147 141Z" />
    <path className="paper" d="M122 173 Q115 210 145 211 L221 190 L214 177 L148 190 L141 178Z M199 168 L216 175 L231 159 L240 168 Q226 195 212 188 L190 181Z" />
    <g transform="rotate(14 238 154)"><rect className="ink" x="228" y="133" width="24" height="40" rx="4" /><rect className="paper" x="232" y="139" width="16" height="26" rx="1" /></g>
    <path className="paper" d="M214 177 L224 170 Q235 163 238 169 L228 183 L221 190Z" />
    <g className="message"><path className="paper" d="M260 87 H333 Q340 87 340 95 V126 Q340 134 333 134 H277 L263 147 V134 H260 Q253 134 253 126 V95 Q253 87 260 87Z" /><path className="line fine" d="M265 103 H326 M265 113 H309 M265 122 H318" /></g>
    <Star x={81} y={115} /><Star x={313} y={182} size={5} />
  </Scene>;
}

export function HelloResearcher() {
  return <Scene viewBox="0 0 300 270" label="A researcher waving hello with a notebook under his arm.">
    <ellipse className="wash" cx="149" cy="152" rx="103" ry="97" />
    <Head x={142} y={94} tilt={-8} />
    <g className="wave"><path className="paper" d="M181 155 Q218 165 228 111 L215 106 Q207 139 184 136Z" /><path className="paper" d="M215 108 L210 94 Q209 89 213 90 L218 98 L216 77 Q217 71 221 78 L225 94 L228 73 Q231 69 232 76 L231 97 L238 82 Q243 80 241 88 L237 109 Q229 121 215 108Z" /></g>
    <path className="sage" d="M124 136 Q102 138 95 164 L108 174 L101 247 H191 L180 174 L194 160 Q183 137 159 134 Q142 151 124 136Z" />
    <path className="line fine" d="M123 143 Q139 158 161 143 M116 177 L111 227 M177 204 L182 236" />
    <g transform="rotate(-12 106 200)"><path className="paper" d="M77 169 H128 V230 H77Z" /><path className="line fine" d="M85 169 V230 M93 182 H118 M93 190 H113" /></g>
    <path className="paper" d="M96 163 Q77 192 94 215 L123 211 L120 200 L102 200 L110 174Z" />
    <path className="line fine" d="M71 249 H216 M243 62 L249 55 M249 76 H259" /><Star x={65} y={100} size={5} />
  </Scene>;
}
