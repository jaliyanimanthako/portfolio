import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ArrowUp, Plus, Minus, X, Menu, Download } from 'lucide-react';
import { allProjects } from '../data/projects';
import Skills from './Skills';
import ProjectDialog from './ProjectDialog';
import { BrainWave, Broadcast, NeuralPulse, SignalOrbit } from './ui/SvgMotifs';

const email = 'jaliyanimantha070@gmail.com';
const social = [
  ['GitHub', 'https://github.com/jaliyanimanthako'],
  ['LinkedIn', 'https://linkedin.com/in/jaliya-nimantha-8924b7219/'],
];
const awards = [
  { year: '2025', title: 'Meta Llama Incubator Programme', result: 'Semi-finalist · AiSee', image: '/recognition-meta.webp', fit: 'contain' },
  { year: '2024', title: 'Brainstorm', result: 'Finalist · Biomedical engineering', image: '/recognition-brainstorm.webp' },
  { year: '2024', title: 'ICE Entrepreneurship Hackathon', result: 'Finalist & Best Pitch', image: '/recognition-ice.webp' },
  { year: '2023', title: 'MECHA Medical Device Hackathon', result: '3rd place', image: '/recognition-mecha.webp' },
  { year: '2019', title: 'President Scout Award', result: 'Sri Lanka Scout Association', image: '/recognition-president-scout.webp' },
  { year: '2019', title: 'School Colours Award', result: 'Bandaranayake College', image: '/recognition-school-colours.webp', position: 'center 30%' },
];
const communityMoments = [
  { title: 'Electronic Club', role: 'Vice President · Head of Operations', year: '2023 — Present', image: '/community-electronic-club.webp' },
  { title: 'ICE Workshop', role: 'AI Innovation Mentor', year: '2025', image: '/community-ice-workshop.webp' },
  { title: 'Scouting', role: 'President Scout · Troop Leader', year: '2008 — 2019', image: '/community-scouting.webp', position: 'center 30%' },
  { title: 'Beyond Boundaries', role: 'Leadership Programme Host', year: '2023', image: '/community-leadership-programme.webp', position: 'center 35%' },
  { title: 'EXMO', role: 'Department Facilitator', year: '2023', image: '/community-exmo.webp' },
  { title: 'Rotaract', role: 'Committee Member · Video Editor', year: '2022' },
];

function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="navigation">
    <Link to="/" className="wordmark" aria-label="Jaliya Nimantha home" onClick={() => { setOpen(false); if (location.pathname === '/') window.scrollTo({ top: 0 }); }}>jn<span>°</span></Link>
    <span className="nav-descriptor">Jaliya Nimantha<br />Engineering & intelligence</span>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? 'nav-links is-open' : 'nav-links'}>
      {[['Work', 'skills'], ['About', 'about'], ['Contact', 'contact']].map(([label, id]) => <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={14} /></Link>)}
      <a href="/cv.pdf" download className="resume-link">Résumé <Download size={14} /></a>
    </nav>
  </header>;
}

function Hero() {
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <img className="hero-portrait" src="/hero-portrait.webp" alt="Jaliya Nimantha" width="928" height="1120" fetchPriority="high" />
    <div className="hero-vignette" />
    <div className="hero-heading"><p className="eyebrow"><span className="status-dot" /> A CURIOUS MIND. A HUMAN PURPOSE.</p>
      <h1 id="hero-title">jaliya<span className="hero-period">.</span></h1>
      <div className="hero-name">NIMANTHA <span>ENGINEERING PORTFOLIO — 2026</span></div>
    </div>
    <div className="hero-orbit" aria-hidden="true"><SignalOrbit /></div>
    <div className="hero-caption"><p>At the intersection<br />of <em>human</em> & machine.</p><span>Research · Artificial intelligence · Embedded systems</span></div>
    <div className="hero-foot"><a href="#skills" className="scroll-link"><span className="round-icon"><ArrowDown size={18} /></span> Discover my work</a><p>Built with curiosity.<br />Driven by real-world impact.</p><span className="edition">SCROLL TO EXPLORE ↓</span></div>
  </section>;
}

function About() {
  const skills = [
    'Deep Learning', 'Computer Vision', 'Machine Learning',
    'Signal Processing', 'Embedded Systems', 'Python / C++',
    'TensorFlow / PyTorch', 'HCI / BCI', 'Circuit Design',
  ];
  return <section id="about" className="section light-section about-section">
    <div className="section-kicker"><span>01 / THE PERSON BEHIND THE WORK</span><span>SCIENCE WITH A HUMAN SIDE</span></div>
    <div className="about-grid"><div>
      <h2>Serious<br />curiosity.<br /><span className="muted">Human</span><br /><span className="muted">possibilities.</span></h2>
      <div className="about-arsenal">
        <h3 className="eyebrow">TECHNICAL ARSENAL</h3>
        <ul className="tags" aria-label="Technical skills">
          {skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      </div>
    </div>
      <div className="about-copy"><span className="asterisk" aria-hidden="true">✳</span><p className="lead">I’m Jaliya. An engineer exploring how technology can help us do more, understand more, and connect better.</p>
        <p>I’m a graduate of the <strong>University of Moratuwa, Sri Lanka</strong>, where I read Electronic and Telecommunication Engineering, and I’m now a <strong>Research Engineer at the Augmented Human Lab, National University of Singapore</strong>. My passion lies at the intersection of <strong>deep learning, computer vision, and artificial intelligence</strong>, where algorithms meet real-world impact.</p>
        <p>From signal processing to embedded systems, from circuit design to <strong>Brain–Computer Interfaces</strong>, I love exploring the full spectrum of technology. I’m particularly fascinated by <strong>Human–Computer Interaction</strong> and <strong>Explainable AI</strong>, because I believe technology should be understood, not just used.</p>
        <p>At the Augmented Human Lab I work on assistive technologies for the visually impaired, experimenting with AI agents and pushing the boundaries of on-device language models. My ultimate goal is building <strong>interpretable, human-centered AI solutions</strong> that bridge cutting-edge algorithms with transparency, usability, and meaningful engineering impact.</p>
        <a href="/cv.pdf" download className="text-link">A little more about me <Download size={18} /></a>
      </div>
    </div>
    <BrainWave />
    <div className="discipline-strip"><span>Human-centered thinking</span><span>Research-led making</span><span>Real-world impact</span></div>
  </section>;
}

function Projects({ archive = false }) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const projects = archive ? allProjects.filter((p) => `${p.title} ${p.category} ${p.tech.join(' ')}`.toLowerCase().includes(query.toLowerCase())) : allProjects.slice(0, 6);
  return <section id="projects" className={`section work-section ${archive ? 'archive-section' : ''}`}>
    <div className="section-kicker"><span>{archive ? 'THE PROJECT ARCHIVE' : '03 / SELECTED WORK'}</span><span>IDEAS, MADE TANGIBLE.</span></div>
    <div className="work-heading">{archive ? <h1>All the<br /><em>explorations.</em></h1> : <h2>A little theory.<br /><em>A lot of doing.</em></h2>}<p>From neural signals to intelligent devices.<br />A selection of things I’ve researched,<br />designed, and built.</p></div>
    {archive && <div className="archive-controls"><Link to="/" className="text-link">← Back to home</Link><label>Find a project<input type="search" placeholder="Search title, technology, or field…" value={query} onChange={(e) => setQuery(e.target.value)} /></label><p aria-live="polite">{projects.length} projects</p></div>}
    <div className="projects-grid">{projects.map((project) => {
      const index = allProjects.indexOf(project);
      return <button className="project-card" key={project.title} onClick={() => setSelected(project)} aria-label={`View ${project.title}`}>
        <div className={`project-image project-image-${index % 3}`}>
          {project.image ? <img src={project.image} alt="" loading="lazy" width="800" height="600" /> : <span className="project-monogram" aria-hidden="true">{project.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}<span>RESEARCH / DEVELOPMENT</span></span>}
          <span className="project-number">/{String(index + 1).padStart(2, '0')}</span><span className="project-open round-icon"><ArrowUpRight size={24} /></span>
        </div>
        <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p className="project-summary">{project.description}</p>
      </button>;
    })}</div>
    {projects.length === 0 && <p className="no-results">No projects match “{query}”. Try another title or technology.</p>}
    {!archive && <div className="archive-link"><span>There’s always another idea.</span><Link to="/projects" className="pill-link">Explore all {allProjects.length} projects <ArrowUpRight size={19} /></Link></div>}
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </section>;
}

function OrganizationLogos({ logos }) {
  return <div className="timeline-logos" aria-label="Organizations">
    {logos.map(({ src, alt, wide = false, dark = false }) => (
      <span className={`timeline-logo${wide ? ' is-wide' : ''}${dark ? ' is-dark' : ''}`} key={src}>
        <img src={src} alt={alt} />
      </span>
    ))}
  </div>;
}


function Journey() {
  return <section id="experience" className="section light-section journey-section"><div className="section-kicker"><span>05 / THE JOURNEY SO FAR</span><span>LEARNING. BUILDING. REPEATING.</span></div>
    <div className="journey-heading"><h2>Ideas grow<br />with <em>experience.</em></h2><NeuralPulse /><a href="/cv.pdf" download className="text-link">Download résumé <Download size={19} /></a></div>
    <div className="journey-row"><span className="eyebrow">EXPERIENCE</span><div className="timeline">
      <article><div className="timeline-heading"><h3>Research Engineer Intern</h3><div className="timeline-organization"><span>Augmented Human Lab · Singapore</span><OrganizationLogos logos={[{ src: '/ah.png', alt: 'Augmented Human Lab', wide: true, dark: true }, { src: '/NUS.png', alt: 'National University of Singapore', wide: true }]} /></div></div><time>DEC 2024 — JUN 2025</time><p>Assistive technology and edge AI at the National University of Singapore. Working across AiSee, on-device inference, and intelligent interfaces.</p></article>
      <article><div className="timeline-heading"><h3>Research Attachment</h3><div className="timeline-organization"><span>Augmented Human Lab · Remote</span><OrganizationLogos logos={[{ src: '/ah.png', alt: 'Augmented Human Lab', wide: true, dark: true }]} /></div></div><time>AUG — DEC 2024</time><p>Vision-language models for educational accessibility, multimodal learning pipelines, and autonomous agent frameworks.</p></article>
    </div></div>
    <div className="journey-row"><span className="eyebrow">EDUCATION</span><div className="timeline">
      <article><div className="timeline-heading"><h3>University of Moratuwa</h3><div className="timeline-organization"><span>B.Sc. Engineering (Hons.) · Electronic &amp; Telecommunication</span><OrganizationLogos logos={[{ src: '/University_of_Moratuwa_logo.png', alt: 'University of Moratuwa' }, { src: '/entc-logo.webp', alt: 'Department of Electronic and Telecommunication Engineering', wide: true }]} /></div></div><time>2022 — 2026</time><p>CGPA 3.55 / 4.00 · Dean’s List, Semesters 1 & 6</p></article>
      <article><div className="timeline-heading"><h3>Bandaranayake College</h3><div className="timeline-organization"><span>GCE Advanced Level · Physical Science</span><OrganizationLogos logos={[{ src: '/bandaranayake-college.webp', alt: 'Bandaranayake College' }]} /></div></div><time>2017 — 2019</time><p>3 A’s · Z-score 2.3605 · Island rank 287</p></article>
    </div></div>
    <div className="journey-row recognition-row"><span className="eyebrow">RECOGNITION</span><div>
      <div className="recognition-heading"><h3>Moments worth<br /><em>remembering.</em></h3><p>Competitions, research programmes, and leadership milestones shaped by the people and ideas around them.</p></div>
      <div className="recognition-grid">{awards.map((award, index) => <article className="recognition-card" key={award.title}>
        <div className={`recognition-image${award.fit === 'contain' ? ' is-contain' : ''}`}>
          <img src={award.image} alt="" loading="lazy" style={{ objectPosition: award.position || 'center' }} />
          <time>{award.year}</time>
        </div>
        <div className="recognition-caption"><span>0{index + 1}</span><div><h3>{award.title}</h3><p>{award.result}</p></div></div>
      </article>)}</div>
    </div></div>
    <div className="journey-row beyond-row"><span className="eyebrow">BEYOND THE LAB</span><div className="community"><h3>Good work is<br />a team sport.</h3><p>From the Electronic Club at the University of Moratuwa to mentoring at the ICE AI Innovation Workshop, I enjoy bringing people together around ideas. Scouting, student leadership, and community initiatives have shaped how I lead, learn, and collaborate.</p>
      <div className="community-gallery">{communityMoments.map((moment, index) => <article className={`community-card${moment.image ? '' : ' is-text-card'}`} key={moment.title}>
        <div className="community-image">
          {moment.image ? <img src={moment.image} alt={`${moment.title} activity`} loading="lazy" style={{ objectPosition: moment.position || 'center' }} /> : <span className="community-monogram" aria-hidden="true">R°</span>}
          <time>{moment.year}</time>
        </div>
        <div className="community-caption"><span>0{index + 1}</span><div><h4>{moment.title}</h4><p>{moment.role}</p></div></div>
      </article>)}</div>
    </div></div>
  </section>;
}

function Contact() {
  return <section id="contact" className="section contact-section"><div className="section-kicker"><span>06 / WHAT’S NEXT?</span><span>LET’S FIND OUT TOGETHER.</span></div><p className="contact-intro">Have an interesting problem, a research idea,<br />or just a different way of looking at things?</p><a className="contact-title" href={`mailto:${email}`}>Let’s make<br /><span>it matter.</span><Broadcast /><ArrowUpRight aria-hidden="true" /></a><div className="contact-bottom"><a href={`mailto:${email}`} className="text-link">{email}<ArrowUpRight size={18} /></a><div>{social.map(([name, href]) => <a href={href} key={name} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={15} /></a>)}</div></div></section>;
}

export default function Portfolio({ archive = false }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = archive ? 'Projects — Jaliya Nimantha' : 'Jaliya Nimantha — Engineering & Intelligence';
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, archive]);
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation /><main id="main">{archive ? <Projects archive /> : <><Hero /><About /><Skills /><Journey /><section className="testimonial-section section"><span className="eyebrow">A WORD FROM MY MENTOR</span><figure><blockquote>“His professionalism, skills, and positive attitude made him an invaluable asset to our organization.”</blockquote><figcaption>A/Prof Suranga Nanayakkara<span>Principal Investigator, Augmented Human Lab</span></figcaption></figure></section><Contact /></>}</main><footer className="footer"><Link to="/" className="wordmark">jn<span>°</span></Link><span>© {new Date().getFullYear()} Jaliya Nimantha</span><span>Curiosity is a work in progress.</span><a href="#main" aria-label="Back to top">Back to top <ArrowUp size={16} /></a></footer></>;
}
