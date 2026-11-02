import { useEffect, useId, useRef } from 'react';
import './JourneyMap.css';

export default function JourneyMap() {
  const ref = useRef(null);
  const glowGradient = useRef(null);
  const glowId = useId();

  const moveGlow = (event) => {
    if (event.pointerType === 'touch') return;
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    // Convert the pointer to map coordinates, using the regional viewBox.
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    glowGradient.current.setAttribute('cx', point.x);
    glowGradient.current.setAttribute('cy', point.y);
    ref.current.dataset.hovered = 'true';
  };
  const hideGlow = () => { ref.current.dataset.hovered = 'false'; };

  useEffect(() => {
    const element = ref.current;
    let visible = false;
    const update = () => {
      element.dataset.active = String(visible && !document.hidden);
      if (!visible || document.hidden) element.dataset.hovered = 'false';
    };
    const clearHover = () => { element.dataset.hovered = 'false'; };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.1 });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('scroll', clearHover, { passive: true, capture: true });
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('scroll', clearHover, true);
    };
  }, []);

  return <figure ref={ref} className="journey-map" aria-label="My journey from Sri Lanka to Singapore" data-active="false">
    <div className="journey-map-visual">
      <svg className="journey-map-svg" viewBox="150 80 700 440" role="img" aria-label="A dotted map connecting Moratuwa, Sri Lanka, to Singapore, where Jaliya works at the Augmented Human Lab, NUS." onPointerMove={moveGlow} onPointerLeave={hideGlow} onPointerCancel={hideGlow}>
        <defs>
          <radialGradient id={`${glowId}-edge-fade`}>
            <stop offset=".3" stopColor="white" />
            <stop offset=".72" stopColor="white" stopOpacity=".75" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`${glowId}-edges`} maskUnits="userSpaceOnUse" x="150" y="80" width="700" height="440" style={{ maskType: 'alpha' }}>
            <rect x="150" y="80" width="700" height="440" fill={`url(#${glowId}-edge-fade)`} />
          </mask>
          <radialGradient ref={glowGradient} id={`${glowId}-gradient`} gradientUnits="userSpaceOnUse" cx="450" cy="260" r="115">
            <stop offset="0" stopColor="white" />
            <stop offset=".3" stopColor="white" stopOpacity=".85" />
            <stop offset=".7" stopColor="white" stopOpacity=".3" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`${glowId}-mask`} maskUnits="userSpaceOnUse" x="-150" y="-150" width="1380" height="840" style={{ maskType: 'alpha' }}>
            <rect x="-150" y="-150" width="1380" height="840" fill={`url(#${glowId}-gradient)`} />
          </mask>
        </defs>
        <g mask={`url(#${glowId}-edges)`}>
          <image className="journey-map-land" href="/journey-map.svg" width="900" height="520" />
          <g className="journey-map-cursor-glow" mask={`url(#${glowId}-mask)`} aria-hidden="true">
            <rect x="-150" y="-150" width="1380" height="840" fill="var(--purple)" opacity=".09" />
            <image href="/journey-map.svg" width="900" height="520" />
          </g>
        </g>
        <path className="journey-map-route" d="M320 350 C390 220 540 235 628 420" />
        <g className="journey-map-traveller"><circle r="10" className="journey-map-trail" /><circle r="3.5" /></g>
        <circle className="journey-map-halo" cx="320" cy="350" r="16" />
        <circle className="journey-map-pin journey-map-pin-origin" cx="320" cy="350" r="6" />
        <circle className="journey-map-pulse" cx="628" cy="420" r="15" />
        <circle className="journey-map-halo" cx="628" cy="420" r="16" />
        <circle className="journey-map-pin" cx="628" cy="420" r="6" />
        <text className="journey-map-label" x="285" y="390" textAnchor="middle">Sri Lanka</text>
        <text className="journey-map-sublabel" x="285" y="412" textAnchor="middle">UNIVERSITY OF MORATUWA</text>
        <text className="journey-map-label" x="650" y="462" textAnchor="middle">Singapore</text>
        <text className="journey-map-sublabel" x="650" y="484" textAnchor="middle">AUGMENTED HUMAN LAB · NUS</text>
      </svg>
    </div>
  </figure>;
}
