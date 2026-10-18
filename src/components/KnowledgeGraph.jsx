import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Minus, Plus, RotateCcw } from 'lucide-react';
import { allProjects } from '../data/projects';
import { projectsForSkill } from '../data/skillConnections';
import { disciplines, projectsForDiscipline } from '../data/disciplines';
import { graphLayout } from '../data/graphLayout';
import { DEFAULT_CAMERA, MIN_ZOOM, MAX_ZOOM, clamp, projectPoint, autoRotateOffset } from '../data/graphCamera';
import { TECH_LOGOS } from './ui/TechLogos';
import './KnowledgeGraph.css';

const skills = TECH_LOGOS.map(({ label, Logo }) => ({
  id: 'skill:' + label, label, Logo, type: 'skill', count: projectsForSkill(label).length,
}));
const projects = allProjects.map((project) => ({
  id: 'project:' + project.title, label: project.title, type: 'project', project,
}));
const disciplineNodes = disciplines.map((discipline, index) => ({
  id: 'discipline:' + discipline.title, label: discipline.title, type: 'discipline', discipline, number: index + 1,
}));
const nodes = [...disciplineNodes, ...skills, ...projects];
// Disciplines draw their own line to every skill and every project they cover,
// rather than reaching projects via the skill hop.
const edges = [
  ...skills.flatMap((skill) => projectsForSkill(skill.label).map((project) => ({
    source: skill.id, target: 'project:' + project.title,
  }))),
  ...disciplineNodes.flatMap((node) => [
    ...node.discipline.skills.map((label) => ({ source: node.id, target: 'skill:' + label })),
    ...projectsForDiscipline(node.discipline).map((project) => ({ source: node.id, target: 'project:' + project.title })),
  ]),
];
// Undirected adjacency, so "what lights up" is one lookup whatever was picked.
const adjacency = new Map(nodes.map((node) => [node.id, new Set()]));
edges.forEach(({ source, target }) => {
  adjacency.get(source).add(target);
  adjacency.get(target).add(source);
});
const positions = graphLayout(nodes, edges, 1120, 780);
const gestureMetrics = (pointers) => {
  const [a, b] = [...pointers.values()];
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)) };
};

export default function KnowledgeGraph() {
  const [selected, setSelected] = useState('');
  const [card, setCard] = useState(null);
  const [category, setCategory] = useState('discipline');
  const [camera, setCamera] = useState(DEFAULT_CAMERA);
  const [dimensions, setDimensions] = useState({ width: 1120, height: 780 });
  const viewport = useRef(null);
  const panelBody = useRef(null);
  const detailHeading = useRef(null);
  const returnFocus = useRef(null);
  const cameraRef = useRef(DEFAULT_CAMERA);
  const pointers = useRef(new Map());
  const dragged = useRef(false);
  const totalMovement = useRef(0);
  const neighbours = selected ? adjacency.get(selected) : null;
  const related = selected
    ? projects.filter((node) => neighbours.has(node.id)).map((node) => node.project)
    : [];
  const projected = Object.fromEntries(nodes.map((node) => [node.id, projectPoint(positions[node.id], camera, dimensions)]));

  const updateCamera = useCallback((update) => {
    const next = typeof update === 'function' ? update(cameraRef.current) : update;
    cameraRef.current = next;
    setCamera(next);
  }, []);

  const zoom = useCallback((factor) => {
    updateCamera((current) => ({ ...current, zoom: clamp(current.zoom * factor, MIN_ZOOM, MAX_ZOOM) }));
  }, [updateCamera]);

  useEffect(() => {
    const container = viewport.current;
    const observer = new ResizeObserver(([entry]) => {
      setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(container);
    const wheel = (event) => {
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? container.clientHeight : 1;
      zoom(Math.exp(-clamp(event.deltaY * unit, -180, 180) * 0.002));
    };
    container.addEventListener('wheel', wheel, { passive: false });
    return () => {
      observer.disconnect();
      container.removeEventListener('wheel', wheel);
    };
  }, [zoom]);

  // Idle drift. Nudges yaw by the frame's share of the sway so it never fights
  // a gesture in progress, and only runs while the graph is actually on screen
  // and the viewer has not asked for reduced motion.
  useEffect(() => {
    const container = viewport.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    let phase = 0;
    let onscreen = false;

    const tick = (now) => {
      // Cap the step so returning to a backgrounded tab resumes instead of jumping.
      const elapsed = previous ? Math.min(now - previous, 120) : 0;
      previous = now;
      if (elapsed && pointers.current.size === 0) {
        const next = phase + elapsed / 1000;
        const delta = autoRotateOffset(next) - autoRotateOffset(phase);
        phase = next;
        updateCamera((current) => ({ ...current, yaw: current.yaw + delta }));
      }
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      const drifting = onscreen && !motion.matches;
      if (drifting && !frame) {
        previous = 0;
        frame = requestAnimationFrame(tick);
      } else if (!drifting && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onscreen = entry.isIntersecting;
      sync();
    });
    observer.observe(container);
    motion.addEventListener('change', sync);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener('change', sync);
    };
  }, [updateCamera]);

  function startGesture(event) {
    if (event.pointerType === 'mouse' && event.button !== 0 && event.button !== 2) return;
    if (pointers.current.size === 0) {
      dragged.current = false;
      totalMovement.current = 0;
    }
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size > 1) dragged.current = true;
    const target = event.target.closest('.graph-node') || event.currentTarget;
    target.setPointerCapture(event.pointerId);
    if (target === event.currentTarget) target.focus({ preventScroll: true });
  }

  function moveGesture(event) {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;
    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    totalMovement.current += Math.hypot(dx, dy);
    if (totalMovement.current > 4) dragged.current = true;
    const before = pointers.current.size > 1 ? gestureMetrics(pointers.current) : null;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (!dragged.current) return;
    if (before) {
      const after = gestureMetrics(pointers.current);
      updateCamera((current) => ({
        ...current,
        zoom: clamp(current.zoom * after.distance / before.distance, MIN_ZOOM, MAX_ZOOM),
        panX: clamp(current.panX + after.x - before.x, -dimensions.width, dimensions.width),
        panY: clamp(current.panY + after.y - before.y, -dimensions.height, dimensions.height),
      }));
    } else if (event.shiftKey || event.buttons === 2) {
      updateCamera((current) => ({
        ...current,
        panX: clamp(current.panX + dx, -dimensions.width, dimensions.width),
        panY: clamp(current.panY + dy, -dimensions.height, dimensions.height),
      }));
    } else {
      updateCamera((current) => ({
        ...current, yaw: current.yaw + dx * 0.006, pitch: current.pitch - dy * 0.006,
      }));
    }
  }

  function endGesture(event) {
    pointers.current.delete(event.pointerId);
  }

  function openCard(kind, data) {
    returnFocus.current = document.activeElement;
    setSelected(kind + ':' + (kind === 'skill' ? data.label : data.title));
    setCard({ kind, data });
  }

  const closeCard = useCallback(() => {
    setSelected('');
    setCard(null);
    requestAnimationFrame(() => {
      const target = returnFocus.current?.isConnected
        ? returnFocus.current
        : panelBody.current?.parentElement.querySelector('[aria-pressed="true"]');
      target?.focus({ preventScroll: true });
    });
  }, []);

  function chooseCategory(next) {
    setCategory(next);
    setCard(null);
    setSelected('');
    panelBody.current?.scrollTo(0, 0);
  }

  // A click on bare space in the viewport drops the current selection. Node
  // clicks bubble through here too, and a release that ended a drag still
  // counts as a click, so both have to be filtered out.
  function clearSelection(event) {
    if (event.target.closest('.graph-node') || dragged.current) return;
    if (card) closeCard();
  }

  function activateNode(event, node) {
    if (event.detail !== 0 && dragged.current) return;
    if (selected === node.id) { closeCard(); return; }
    openCard(node.type, node.project || node.discipline || node);
  }

  useEffect(() => {
    if (!card) return;
    panelBody.current?.scrollTo(0, 0);
    detailHeading.current?.focus({ preventScroll: true });
    if (window.matchMedia('(max-width: 800px)').matches && returnFocus.current?.closest('.graph-viewport')) {
      panelBody.current?.parentElement.scrollIntoView({ block: 'nearest' });
    }
    const close = (event) => { if (event.key === 'Escape') closeCard(); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [card, closeCard]);

  function keyboardCamera(event) {
    if (event.target !== event.currentTarget) return;
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (direction) {
      event.preventDefault();
      updateCamera((current) => event.shiftKey ? {
        ...current,
        panX: clamp(current.panX + direction[0] * 28, -dimensions.width, dimensions.width),
        panY: clamp(current.panY + direction[1] * 28, -dimensions.height, dimensions.height),
      } : { ...current, yaw: current.yaw + direction[0] * .12, pitch: current.pitch - direction[1] * .12 });
    } else if (['+', '=', '-'].includes(event.key)) {
      event.preventDefault();
      zoom(event.key === '-' ? 1 / 1.2 : 1.2);
    } else if (event.key === 'Home' || event.key === '0') {
      event.preventDefault();
      updateCamera(DEFAULT_CAMERA);
    } else if (event.key === 'Escape') {
      event.currentTarget.blur();
    }
  }

  return (
    <div className="knowledge-graph">
      <div className="graph-layout">
        <div className="graph-stage">
          <div className="graph-stage-heading"><span className="eyebrow">HOW IT ALL CONNECTS</span><span className="graph-live-dot" aria-hidden="true" /></div>
          <p id="graph-instructions" className="graph-hint">Drag to rotate, scroll or pinch to zoom, shift-drag or use two fingers to pan. Arrow keys rotate, + and − zoom, Home resets the view.</p>
          <div ref={viewport} className="graph-viewport" tabIndex={0} role="region"
            aria-label="Interactive 3D skill and project network" aria-describedby="graph-instructions"
            onPointerDown={startGesture} onPointerMove={moveGesture} onPointerUp={endGesture}
            onPointerCancel={endGesture} onLostPointerCapture={endGesture}
            onContextMenu={(event) => event.preventDefault()} onKeyDown={keyboardCamera}
            onClick={clearSelection}
          >
            <svg className="graph-connections" viewBox={'0 0 ' + dimensions.width + ' ' + dimensions.height} aria-hidden="true">
              {edges.map((edge) => (
                <line key={edge.source + '-' + edge.target}
                  x1={projected[edge.source].x} y1={projected[edge.source].y}
                  x2={projected[edge.target].x} y2={projected[edge.target].y}
                  className={'graph-edge' + (!selected || edge.source === selected || edge.target === selected ? ' is-connected' : '') + (edge.source === selected || edge.target === selected ? ' is-selected' : '')}
                  style={{ '--edge-depth': (projected[edge.source].opacity + projected[edge.target].opacity) / 2 }}
                />
              ))}
            </svg>

            {nodes.map((node) => {
              const isSkill = node.type === 'skill';
              const Logo = node.Logo;
              const point = projected[node.id];
              const connected = !selected || node.id === selected || neighbours.has(node.id);
              const markerFit = clamp(dimensions.width / 600, .72, 1);
              const size = clamp(30 * markerFit * point.perspective * Math.sqrt(camera.zoom), 18, 66);
              // Compact markers scale with depth; the directory carries full titles.
              const scale = clamp(markerFit * point.perspective * Math.sqrt(camera.zoom), .6, 1.35);
              const visible = point.x > 20 && point.x < dimensions.width - 20 && point.y > 20 && point.y < dimensions.height - 25;
              return (
                <button key={node.id}
                  className={'graph-node graph-' + node.type + (connected ? ' is-connected' : ' is-muted') + (selected === node.id ? ' is-selected' : '')}
                  style={{
                    left: point.x + 'px', top: point.y + 'px', '--node-size': size + 'px',
                    '--node-scale': scale, '--node-depth': point.opacity,
                    zIndex: 1000 + Math.round(point.depth),
                    visibility: visible ? 'visible' : 'hidden',
                  }}
                  onClick={(event) => activateNode(event, node)}
                  aria-pressed={selected === node.id}
                  aria-label={isSkill ? node.label + ', ' + node.count + ' connected projects' : 'View ' + node.label}
                >
                  {node.type === 'discipline' ? (
                    <><span className="graph-discipline-pill">0{node.number}</span><span className="graph-node-label">{node.label}</span></>
                  ) : isSkill ? (
                    <>
                      <span className="graph-node-orb" aria-hidden="true">
                        <Logo className="graph-skill-logo" focusable="false" />
                      </span>
                      <span className="graph-node-label">{node.label}</span>
                    </>
                  ) : (
                    <span className={'graph-project-card' + (node.project.image ? ' has-image' : '')}>
                      {node.project.image && (
                        <img className="graph-project-thumb" src={node.project.image} alt="" loading="lazy" width="264" height="92" />
                      )}
                      {!node.project.image && <span className="graph-project-number" aria-hidden="true">{String(allProjects.indexOf(node.project) + 1).padStart(2, '0')}</span>}
                      <span className="graph-project-text">
                        <span className="graph-project-title">{node.label}</span>
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="graph-legend" aria-hidden="true"><span>Expertise</span><span>Skills</span><span>Projects</span></div>
          <div className="graph-toolbar">
            <p>Drag to rotate · Select to explore</p>
            <div className="graph-camera-controls">
              <button onClick={() => zoom(1 / 1.2)} aria-label="Zoom out" disabled={camera.zoom <= MIN_ZOOM}><Minus size={15} /></button>
              <button onClick={() => zoom(1.2)} aria-label="Zoom in" disabled={camera.zoom >= MAX_ZOOM}><Plus size={15} /></button>
              <button onClick={() => updateCamera(DEFAULT_CAMERA)} aria-label="Reset graph view"><RotateCcw size={14} /></button>
            </div>
          </div>
        </div>

        <aside className="graph-panel" aria-label="Explore expertise, skills, and projects">
          <div className="graph-categories" role="group" aria-label="Browse by category">
            {[["discipline", "Expertise", disciplines.length], ["skill", "Skills", skills.length], ["project", "Projects", projects.length]].map(([value, label, count]) => (
              <button key={value} aria-pressed={category === value} onClick={() => chooseCategory(value)}>
                {label}<span>{String(count).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div className="graph-panel-body" ref={panelBody}>
          {card ? (
            <article className="graph-card">
              <button className="graph-card-back" onClick={closeCard}>
                <ArrowLeft size={15} /> Back to {category === 'discipline' ? 'expertise' : category === 'skill' ? 'skills' : 'projects'}
              </button>
              <h3 ref={detailHeading} tabIndex={-1}>{card.data.title || card.data.label}</h3>
              {card.kind === 'project' ? (
                <>
                  {card.data.image && <img className="graph-card-image" src={card.data.image} alt="" width="660" height="340" />}
                  <p className="eyebrow">{card.data.category} / {card.data.year}</p>
                  <p className="graph-card-summary">{card.data.longDescription || card.data.description}</p>
                  <ul className="graph-card-tech">
                    {card.data.tech.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  {card.data.github && (
                    <a className="text-link" href={card.data.github} target="_blank" rel="noopener noreferrer">
                      View on GitHub <ArrowUpRight size={18} />
                    </a>
                  )}
                </>
              ) : card.kind === 'discipline' ? (
                <>
                  <p className="eyebrow">What I bring</p>
                  <p className="graph-card-summary">{card.data.description}</p>
                  <p className="graph-card-stack">{card.data.stack}</p>
                </>
              ) : <p className="graph-card-summary">Part of my technical toolkit. Explore the projects where I put {card.data.label} to work.</p>}
              {card.kind !== 'project' && <div className="graph-related">
                <p className="eyebrow">CONNECTED PROJECTS / {String(related.length).padStart(2, '0')}</p>
                {related.length ? <ul className="graph-project-list">{related.map((project) => (
                  <li key={project.title}><button onClick={() => openCard('project', project)}><span>{project.title}</span><ArrowUpRight size={15} aria-hidden="true" /></button></li>
                ))}</ul> : <p className="graph-empty">No projects in this portfolio currently list this skill.</p>}
              </div>}
            </article>
          ) : (
            <div className="graph-directory">
              <div className="graph-directory-heading">
                <h3>{category === 'discipline' ? 'What I bring.' : category === 'skill' ? 'The tools I work with.' : 'Ideas, made tangible.'}</h3>
                <p>{category === 'discipline' ? 'Four areas of focus. Connected by curiosity.' : category === 'skill' ? 'Choose a skill to see it in practice.' : 'Explore the research, software, and systems I’ve built.'}</p>
              </div>
              {category === 'discipline' ? <ul className="graph-expertise-list">{disciplines.map((discipline, index) => (
                <li key={discipline.title}><button onClick={() => openCard('discipline', discipline)}>
                  <span className="graph-row-index">0{index + 1}</span><span><strong>{discipline.title}</strong><span className="graph-row-summary">{discipline.description}</span></span><ArrowUpRight size={17} aria-hidden="true" />
                </button></li>
              ))}</ul> : category === 'skill' ? <ul className="graph-skill-directory">{skills.map((skill) => (
                <li key={skill.id}><button onClick={() => openCard('skill', skill)}><skill.Logo aria-hidden="true" /><span><strong>{skill.label}</strong><small>{skill.count} {skill.count === 1 ? 'project' : 'projects'}</small></span><ArrowUpRight size={14} aria-hidden="true" /></button></li>
              ))}</ul> : <ul className="graph-work-directory">{allProjects.map((project, index) => (
                <li key={project.title}><button onClick={() => openCard('project', project)}>
                  {project.image ? <img src={project.image} alt="" loading="lazy" width="64" height="56" /> : <span className="graph-work-placeholder">{String(index + 1).padStart(2, '0')}</span>}
                  <span><small>{project.category}</small><strong>{project.title}</strong><span className="graph-row-summary">{project.description}</span></span><ArrowUpRight size={17} aria-hidden="true" />
                </button></li>
              ))}</ul>}
            </div>
          )}
          </div>
        </aside>
      </div>
    </div>
  );
}
