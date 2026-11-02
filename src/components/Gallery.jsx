import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { galleryImages } from '../data/galleryImages';
import './Gallery.css';

const photos = [
  { file: 'DSC07419.webp', alt: 'Speaking at the Electronic Club Excellence Awards', width: 2048, height: 3072 },
  { file: 'lab.webp', alt: 'A group photo with colleagues at the lab', width: 1400, height: 985 },
  { file: 'recognition-meta.webp', alt: 'Meta Llama Incubator Programme', width: 1932, height: 1090 },
  { file: 'community-ice-workshop.webp', alt: 'ICE Workshop community moment', width: 2048, height: 1365 },
  { file: 'DSC07926.webp', alt: 'Celebrating at the Electronic Club Excellence Awards', width: 3072, height: 2048 },
  { file: '1.webp', alt: 'Looking up at the Supertrees in Singapore', width: 3024, height: 4032 },
  { file: 'recognition-mecha.webp', alt: 'MECHA Medical Device Hackathon', width: 4032, height: 2268 },
  { file: 'biosense.webp', alt: 'BioSense project', width: 2048, height: 1536 },
  { file: 'nus.webp', alt: 'Jaliya beside the NUS sign', width: 1400, height: 1050 },
  { file: 'aisee.webp', alt: 'AiSee project', width: 1178, height: 1200 },
  { file: 'community-leadership-programme.webp', alt: 'Beyond Boundaries leadership programme', width: 1536, height: 2048 },
  { file: 'recognition-ice.webp', alt: 'ICE Entrepreneurship Hackathon', width: 4032, height: 3024 },
  { file: 'DSC07880-2.webp', alt: 'Electronic Club Excellence Awards group photograph', width: 3072, height: 2048 },
  { file: '4.webp', alt: 'The curved facade of the NUS COM3 building', width: 3024, height: 4032 },
  { file: 'together.webp', alt: 'A group selfie on an outdoor walk', width: 1400, height: 1050 },
  { file: 'recognition-president-scout.webp', alt: 'President Scout Award', width: 1440, height: 960 },
  { file: 'recognition-school-colours.webp', alt: 'School Colours Award', width: 597, height: 597 },
];

const photoRows = [photos.slice(0, 3), photos.slice(3, 7), photos.slice(7, 10), photos.slice(10, 14), photos.slice(14)];

// Serves a right-sized copy (see scripts/optimize-gallery.mjs) over a tiny blurred placeholder, then fades it in.
const markLoaded = (img) => { if (img?.complete) img.dataset.loaded = 'true'; };
function GalleryPhoto({ photo, share, eager }) {
  const sized = galleryImages[photo.file];
  const name = photo.file.replace(/\.webp$/, '');
  return <figure className="gallery-photo" style={{ flex: `${photo.width / photo.height} 1 0%`, aspectRatio: `${photo.width} / ${photo.height}`, backgroundImage: sized && `url(${sized.placeholder})` }}>
    <img
      ref={markLoaded}
      src={sized ? `/gallery/sized/${name}-${sized.widths[1] ?? sized.widths[0]}.webp` : `/gallery/${photo.file}`}
      srcSet={sized?.widths.map((w) => `/gallery/sized/${name}-${w}.webp ${w}w`).join(', ')}
      sizes={`(max-width: 600px) 50vw, ${Math.ceil(share * 100)}vw`}
      alt={photo.alt} width={photo.width} height={photo.height}
      loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async"
      onLoad={(e) => { e.currentTarget.dataset.loaded = 'true'; }}
    />
  </figure>;
}

export default function Gallery() {
  useEffect(() => {
    document.title = 'Gallery — Jaliya Nimantha';
    window.scrollTo(0, 0);
  }, []);
  return <main className="gallery-page">
    <header className="gallery-page-nav wrap"><Link to="/" className="gallery-page-brand">Jaliya Nimantha</Link><Link to="/" className="gallery-back"><ArrowLeft size={16} /> Back to portfolio</Link></header>
    <section className="gallery-page-content wrap" aria-labelledby="gallery-title">
      <div className="gallery-page-heading"><div><p className="eyebrow">MOMENTS ALONG THE WAY</p><h1 id="gallery-title">Gallery</h1></div><p>Research, projects, communities,<br />and a little life in between.</p></div>
      <div className="gallery-collage">
        {photoRows.map((row) => <div className="gallery-photo-row" key={row[0].file}>
          {row.map((photo) => {
            const total = row.reduce((sum, p) => sum + p.width / p.height, 0);
            return <GalleryPhoto key={photo.file} photo={photo} share={(photo.width / photo.height) / total} eager={row === photoRows[0]} />;
          })}
        </div>)}
      </div>
      <div className="gallery-page-footer"><Link to="/" className="gallery-back"><ArrowLeft size={16} /> Back to portfolio</Link></div>
    </section>
  </main>;
}
