import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { ProjectFigure } from './ProjectLive';

export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-content"><button className="dialog-close round-icon" onClick={onClose} aria-label="Close project"><X /></button><p className="eyebrow">{project.category} / {project.year}</p>
      <h2 id="project-dialog-title">{project.title}</h2>{project.figure && <div className="dialog-figure"><ProjectFigure kind={project.figure} /></div>}<p>{project.longDescription || project.description}</p>
      {project.venue && <p className="dialog-venue">{project.venue}</p>}
      {project.authors && <p className="dialog-authors">{project.authors}</p>}
      <div className="tags">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
      {(project.paper || project.github) && <div className="dialog-links">
        {project.paper && <a className="text-link" href={project.paper} target="_blank" rel="noopener noreferrer">Read the paper on arXiv <ArrowUpRight size={20} /></a>}
        {project.github && <a className="text-link" href={project.github} target="_blank" rel="noopener noreferrer">{project.paper ? 'Audio samples & code' : 'View on GitHub'} <ArrowUpRight size={20} /></a>}
      </div>}
    </div>
  </dialog>;
}
