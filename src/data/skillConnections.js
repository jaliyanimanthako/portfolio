import { allProjects } from './projects';

// TensorFlow Lite belongs to the TensorFlow family. Every other connection
// requires an exact technology tag; a listed skill alone is not project evidence.
const tagAliases = { TensorFlow: ['TensorFlow', 'TensorFlow Lite'] };

export function projectsForSkill(skill) {
  if (!skill) return allProjects;
  const tags = tagAliases[skill] || [skill];
  return allProjects.filter((project) => project.tech.some((tag) => tags.includes(tag)));
}
