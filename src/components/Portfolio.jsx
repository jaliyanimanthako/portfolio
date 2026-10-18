import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ArrowUp, ArrowRight, X, Menu, Search } from 'lucide-react';
import { allProjects } from '../data/projects';
import { awards, communityMoments } from '../data/profile';
import ProjectDialog from './ProjectDialog';
import NotionArtwork from './illustrations/NotionArtwork';
import { TECH_LOGOS } from './ui/TechLogos';
import './WorkExperience.css';
import './Education.css';

const email = 'jaliyanimantha070@gmail.com';
const social = [['GitHub', 'https://github.com/jaliyanimanthako'], ['LinkedIn', 'https://linkedin.com/in/jaliya-nimantha-8924b7219/']];
const featured = ['Neural Speech Tracking', 'AiSee LLaMa Android SDK', 'BioSense-AI', 'Campus Yamu']
  .map((title) => allProjects.find((project) => project.title === title));
const featuredArtwork = {
  'Neural Speech Tracking': { name: 'voices', note: '01 / understanding neural signals' },
  'AiSee LLaMa Android SDK': { name: 'microchip', note: '02 / intelligence, on device' },
  'BioSense-AI': { name: 'biosense', note: '03 / turning noise into insight' },
  'Campus Yamu': { name: 'campus', note: '04 / finding a path forward' },
};
const filters = ['All work', 'AI & learning', 'Human & signal', 'Physical systems'];
function matchesFilter(project, filter) {
  const title = project.title;
  if (filter === 'All work') return true;
  if (filter === 'Human & signal') return /Neural Speech|BioSense|Sign Language|TumorVision|Facial/.test(title);
  if (filter === 'Physical systems') return /End Effector|Robot|NutriTech|BioSense|Sign Language/.test(title);
  return /GGUF|LLaMa|Hodi|Campus|Facial|Tumor|GOYAMA|Vehicle|U-Net|NextWord/.test(title);
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="navigation wrap">
    <Link to="/" className="wordmark" aria-label="Jaliya Nimantha home" onClick={() => { setOpen(false); if (pathname === '/') window.scrollTo({ top: 0 }); }}>Jaliya Nimantha</Link>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    <nav id="main-navigation" aria-label="Main navigation" className={`nav-links${open ? ' is-open' : ''}`}>
      {[['Experience', 'experience'], ['Work', 'work'], ['Contact', 'contact']].map(([label, id]) => <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)}>{label}</Link>)}
      <a href="/cv.pdf" target="_blank" rel="noreferrer" className="resume-link">Résumé <ArrowUpRight size={14} /></a>
    </nav>
  </header>;
}

function Hero() {
  return <section className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-copy"><h1 id="hero-title">Hi, I’m<br /><span className="hero-person-name">Jaliya Nimantha.</span></h1>
      <div className="hero-description">
        <p>I’m an Electronic and Telecommunication Engineering graduate from the <strong>University of Moratuwa, Sri Lanka</strong>, and currently a Research Engineer at the <strong>Augmented Human Lab, National University of Singapore</strong>. My work lies at the intersection of <strong>deep learning, computer vision, and artificial intelligence</strong>, where algorithms meet real-world impact.</p>
        <p>From signal processing and embedded systems to circuit design and <strong>Brain–Computer Interfaces</strong>, I enjoy exploring the full spectrum of technology. I’m particularly fascinated by <strong>Human–Computer Interaction</strong> and <strong>Explainable AI</strong>, because I believe technology should be understood, not just used.</p>
        <p>At the Augmented Human Lab, I work on assistive technologies for people with visual impairments, experiment with AI agents, and push the boundaries of controllable and on-device language models. My goal is to build <strong>interpretable, human-centered AI solutions</strong> that combine cutting-edge algorithms with transparency, usability, and meaningful engineering impact.</p>
      </div>
      <div className="hero-actions"><a href="#work" className="button-primary">Explore my work <ArrowDown size={16} /></a></div>
    </div>
    <figure className="hero-art"><NotionArtwork name="portal" priority /></figure>
  </section>;
}

function SectionLabel({ number, children, aside }) {
  return <div className="section-label"><span><span className="section-number">{number}</span>{children}</span>{aside && <span className="section-aside">{aside}</span>}</div>;
}

function FeaturedProjectVisual({ project }) {
  const visual = featuredArtwork[project.title];
  if (!visual) return null;
  return <div className="project-visual"><NotionArtwork name={visual.name} decorative /><span className="visual-foot">{visual.note}</span><span className="project-open"><ArrowUpRight size={19} /></span></div>;
}

function Projects({ archive = false }) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All work');
  const projects = (archive ? allProjects : featured).filter((p) => matchesFilter(p, filter) && `${p.title} ${p.category} ${p.description} ${p.tech.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return <section id="work" className={`section work-section wrap${archive ? ' archive-section' : ''}`}>
    {archive && <SectionLabel number="INDEX" aside={`${allProjects.length} projects & explorations`}>THE WORK INDEX</SectionLabel>}
    <div className="section-heading"><div>{archive ? <h1>Experiments, explorations,<br />and things that <em>work.</em></h1> : <h2>Featured <span className="accent-text">projects</span></h2>}</div>{archive && <p>Neural signals, accessible interfaces, and AI<br className="desktop-break" /> that fits in your pocket. A few ways I turn<br className="desktop-break" /> curiosity into useful engineering.</p>}</div>
    {archive && <div className="archive-controls"><Link to="/" className="text-link">← Back to home</Link><label className="search-field"><Search size={17} /><span className="sr-only">Search projects</span><input type="search" placeholder="Find a project, tool, or idea…" value={query} onChange={(e) => setQuery(e.target.value)} /></label></div>}
    {archive && <div className="filter-bar"><div role="group" aria-label="Filter projects">{filters.map((name) => <button key={name} onClick={() => setFilter(name)} aria-pressed={filter === name} className={filter === name ? 'active' : ''}>{name}</button>)}</div><span aria-live="polite">{projects.length} projects</span></div>}
    <div className="projects-grid">{projects.map((project) => <button className={`project-card${!archive ? ' featured-project-card' : ''}${!archive && !featuredArtwork[project.title] ? ' compact-project' : ''}`} key={project.title} onClick={() => setSelected(project)} aria-label={`View ${project.title}`}>
      {!archive ? <FeaturedProjectVisual project={project} /> : <div className="project-image"><img src={project.image} alt="" loading="lazy" width="800" height="600" /><span className="project-open"><ArrowUpRight size={19} /></span></div>}
      <div className="project-content"><div className="project-meta"><span>{project.category}</span><span>{String(allProjects.indexOf(project) + 1).padStart(2, '0')}</span></div>
      <h3>{project.title}{!archive && !featuredArtwork[project.title] && <ArrowUpRight size={21} />}</h3><p className="project-summary">{project.description}</p><div className="project-tools">{project.tech.slice(0, 3).join(' / ')}</div></div>
    </button>)}</div>
    {projects.length === 0 && <div className="no-results"><p>No projects match this search.</p><button className="text-link" onClick={() => { setQuery(''); setFilter('All work'); }}>Clear filters <ArrowRight size={16} /></button></div>}
    {!archive && <div className="archive-link"><Link to="/projects" className="text-link">All {allProjects.length} projects <ArrowRight size={17} /></Link></div>}
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </section>;
}

function TechStack() {
  return <section className="tech-stack-section wrap" aria-label="Tech stack">
    <ul className="tech-stack-grid">{TECH_LOGOS.map((item) => <li key={item.label}><span className="tech-logo-box"><item.Logo aria-hidden="true" /></span><span className="tech-logo-name">{item.label}</span></li>)}</ul>
    <p className="tech-stack-caption">The tools behind my <span className="accent-text">research.</span></p>
  </section>;
}

const experience = [
  { role: 'Research Engineer', place: 'Augmented Human Lab · National University of Singapore', date: 'CURRENT', artwork: 'clouds', text: 'Assistive technology, AI agents, and on-device language models. Building interpretable, human-centered AI systems.' },
  { role: 'Research Engineer Intern', place: 'Augmented Human Lab · Singapore', date: 'DEC 2024 — JUN 2025', artwork: 'stairway', text: 'Assistive technology and edge AI. Working across AiSee, on-device inference, and intelligent interfaces.' },
  { role: 'Research Attachment', place: 'Augmented Human Lab · Remote', date: 'AUG — DEC 2024', artwork: 'tunnel', text: 'Vision-language models for educational accessibility, multimodal learning pipelines, and autonomous agent frameworks.' },
];
const education = [
  { role: 'University of Moratuwa', place: 'B.Sc. Engineering (Hons.) · Electronic & Telecommunication · Minor in Mathematics', date: '2022 — 2026', text: 'Second Class Upper Division · CGPA 3.66 / 4.00 · Dean’s List, Semesters 1, 6, 7 & 8', logo: '/University_of_Moratuwa_logo.webp' },
  { role: 'Bandaranayake College', place: 'GCE Advanced Level · Physical Science', date: '2017 — 2019', text: '3 A’s · Z-score 2.3605 · Island rank 287', logo: '/bandaranayake-college.webp' },
];
function WorkExperience() {
  return <section id="experience" className="section experience-section journey-section wrap">
    <div className="section-heading experience-heading"><h2>Work <span className="accent-text">Experience</span></h2><div className="experience-brand-logos" aria-label="Augmented Human Lab, National University of Singapore"><img className="ahl-logo" src="/ah.webp" alt="Augmented Human Lab" /><span aria-hidden="true" /><img className="nus-logo" src="/nus-logo.webp" alt="National University of Singapore" /></div></div>
    <ol className="experience-stories">
      {experience.map((row) => <li className={`experience-entry${row.date === 'CURRENT' ? ' is-current' : ''}`} key={row.role}>
        <div className="experience-copy">
          <span className="experience-date">{row.date}</span>
          <h3>{row.role}</h3>
          <p className="experience-place">{row.place}</p>
          <p className="experience-description">{row.text}</p>
        </div>
        <span className="experience-marker" aria-hidden="true" />
        <figure className="experience-art"><NotionArtwork name={row.artwork} /></figure>
      </li>)}
    </ol>
  </section>;
}

function Journey() {
  return <section id="journey" className="section journey-section wrap"><div className="section-heading"><h2><span className="accent-text">Education</span></h2></div>
    <div className="education-panel">
      <ol className="education-history">{education.map((row) => <li className="education-milestone" key={row.role}>
        <span className="education-dot" aria-hidden="true" />
        <span className="education-crest"><img src={row.logo} alt="" loading="lazy" width="64" height="64" /></span>
        <div className="education-details"><span className="education-period">{row.date}</span><h3>{row.role}</h3><p className="education-qualification">{row.place}</p><p className="education-achievement">{row.text}</p></div>
      </li>)}</ol>
      <figure className="education-illustration"><NotionArtwork name="education-sketchbook" /></figure>
    </div>
    <section className="awards-section" aria-labelledby="awards-title"><div className="section-heading awards-heading"><h2 id="awards-title">Awards &amp; <span className="accent-text">Achievements</span></h2></div><div className="awards-layout"><figure className="awards-art"><NotionArtwork name="awards-reflection" /></figure><div className="awards-list">{awards.map((award) => <article className="award-card" key={award.title}><strong>{award.title}</strong><p>{award.result}</p></article>)}</div></div></section>
    <section className="beyond-section" aria-labelledby="beyond-title"><div className="section-heading beyond-heading"><h2 id="beyond-title">Volunteering &amp; <span className="accent-text">Community</span></h2></div><div className="beyond-layout"><div className="beyond-copy"><div className="community-grid">{communityMoments.map((moment) => <article key={moment.title}><h4>{moment.title}</h4><p>{moment.role}</p><time>{moment.year}</time></article>)}</div></div><figure className="beyond-art"><NotionArtwork name="collaborative-bridge-ivory" /></figure></div><div className="gallery-cta"><Link to="/gallery" className="button-primary">View gallery <ArrowRight size={16} /></Link></div></section>
  </section>;
}

function Contact() {
  return <section id="contact" className="contact-section wrap"><div className="contact-layout"><div><h2>Get In <span className="accent-text">Touch</span></h2><p>A research question, a collaboration, or a different<br className="desktop-break" /> way of looking at things. I’d love to hear it.</p><a className="contact-email" href={`mailto:${email}`}>{email}<ArrowUpRight size={21} /></a><div className="social-links">{social.map(([name, href]) => <a href={href} key={name} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={14} /></a>)}</div></div><figure><NotionArtwork name="makers" /><figcaption>Good questions. Shared ideas. Better things.</figcaption></figure></div></section>;
}

export default function Portfolio({ archive = false }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = archive ? 'Projects — Jaliya Nimantha' : 'Jaliya Nimantha — Research Engineer';
    const frame = requestAnimationFrame(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView(); else window.scrollTo(0, 0); });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, archive]);
  return <div><a className="skip-link" href="#main">Skip to content</a><Navigation /><main id="main">{archive ? <Projects archive /> : <><Hero /><WorkExperience /><Projects /><TechStack /><Journey /><Contact /></>}</main><footer className="footer wrap"><Link to="/" className="footer-name">jn.</Link><span>© {new Date().getFullYear()} Jaliya Nimantha</span><span className="footer-thought">Made with curiosity. Always evolving.</span><a href="#main">Back to top <ArrowUp size={14} /></a></footer></div>;
}
