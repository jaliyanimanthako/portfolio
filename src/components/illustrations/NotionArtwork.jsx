import { useEffect, useRef } from 'react';
import './notion-artwork.css';

const artwork = {
  portal: {
    width: 1448, height: 1086,
    alt: 'A researcher reaching through a portal toward a lavender idea, with a laptop on his knees.',
    point: [1220, 466, 65],
  },
  signals: {
    width: 1448, height: 1086,
    alt: 'A researcher turning a tangled line into a clear signal at his desk.',
    point: [869, 426, 23],
  },
  voices: {
    width: 1536, height: 1024,
    alt: 'A researcher untangling overlapping voices for neural speech tracking.',
  },
  biosense: {
    width: 1448, height: 1086,
    alt: 'A researcher stitching noisy biosignals into a clear, usable signal.',
  },
  campus: {
    width: 1672, height: 941,
    alt: 'A student following a winding journey from study to graduation.',
  },
  'education-sketchbook': {
    width: 1672, height: 941,
    alt: 'Thoughtful geometric forms rising from a sketchbook.',
  },
  'awards-reflection': {
    width: 1024, height: 1536,
    alt: 'A person having a thoughtful conversation with their reflection.',
  },
  'building-bridges': {
    width: 1672, height: 941,
    alt: 'A group of people working together to build a bridge.',
  },
  'collaborative-bridge-ivory': {
    width: 1672, height: 941,
    alt: 'A group working together to build a lavender bridge.',
  },
  microchip: {
    width: 1448, height: 1086,
    alt: 'A person reading inside a microchip, an illustration of intelligence on a small device.',
  },
  makers: {
    width: 1672, height: 941,
    alt: 'Five versions of a maker drawing, coding, thinking, testing, and building around one table.',
  },
  clouds: {
    width: 1536, height: 1024,
    alt: 'A researcher with a notebook sitting on an airplane wing above the clouds.',
  },
  stairway: {
    width: 1536, height: 1024,
    alt: 'A researcher wearing a virtual reality headset imagines climbing a lavender stairway.',
  },
  tunnel: {
    width: 1448, height: 1086,
    alt: 'A researcher carrying a notebook walks toward the lavender opening of a winding tunnel.',
  },
};

export default function NotionArtwork({ name, priority = false, decorative = false }) {
  const ref = useRef(null);
  const { width, height, alt, point } = artwork[name];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      ref.current?.classList.toggle('artwork-visible', entry.isIntersecting);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`notion-artwork notion-${name}`}>
    <img src={`/notion/${name}.webp`} width={width} height={height} alt={decorative ? '' : alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    {point && <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="artwork-motion">
      <circle className="idea-ring" cx={point[0]} cy={point[1]} r={point[2]} />
      <circle className="idea-ring idea-ring-delayed" cx={point[0]} cy={point[1]} r={point[2]} />
    </svg>}
  </div>;
}
