import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { allProjects } from '../data/projects';
import KnowledgeGraph from './KnowledgeGraph';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
      <div className="section-kicker">
        <span>02 / EXPERTISE & WORK</span>
        <span>THE TOOLS BEHIND THE IDEAS</span>
      </div>
      <div className="skills-heading">
        <h2 id="skills-title">Curiosity meets<br /><em>capability.</em></h2>
        <p>Explore the expertise, tools, and projects<br />that connect my ideas to working systems.</p>
      </div>
      <KnowledgeGraph />
      <div className="archive-link">
        <span>There’s always another idea.</span>
        <Link to="/projects" className="pill-link">Explore all {allProjects.length} projects <ArrowUpRight size={19} /></Link>
      </div>
    </section>
  );
}
