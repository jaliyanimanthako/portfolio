import { projectsForSkill } from './skillConnections';

// The four disciplines that used to be the "What I bring" section. Their stack
// lines are prose, not tags, so the links to skill nodes are curated by hand
// rather than parsed out of the text.
export const disciplines = [
  {
    title: 'AI & edge intelligence',
    description: 'Intelligence, closer to where it matters. I work with on-device models and language models to bring efficient, private AI to resource-constrained hardware.',
    stack: 'PyTorch · TinyML · MediaPipe · llama.cpp · TensorFlow Lite',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'MediaPipe', 'Hugging Face'],
    projects: ['Industrial End Effector'],
  },
  {
    title: 'Human–computer interaction',
    description: 'Technology should amplify human capability. I explore accessible interfaces, wearable devices, and physiological sensing to connect people with the systems around them.',
    stack: 'Assistive technology · Wearables · HCI / BCI · Prototyping',
    skills: ['OpenCV', 'MediaPipe', 'Python'],
  },
  {
    title: 'Embedded systems & robotics',
    description: 'Bringing software into the physical world through sensor integration, firmware, and control systems for connected devices and industrial automation.',
    stack: 'Python / C++ · ESP32 · Signal processing · Circuit design',
    skills: ['C++', 'Arduino', 'Python'],
  },
  {
    title: 'Agentic AI & mobile development',
    description: 'From autonomous reasoning to on-device execution: building useful AI experiences and the mobile applications that put them in people’s hands.',
    stack: 'LangGraph · Android · Kotlin · Multimodal AI',
    skills: ['LangChain', 'Android', 'Kotlin', 'PyPI'],
  },
];

// A discipline reaches a project through any of its skills.
export function projectsForDiscipline(discipline) {
  const found = new Map();
  discipline.skills.forEach((skill) => projectsForSkill(skill).forEach((project) => found.set(project.title, project)));
  const projects = projectsForSkill();
  discipline.projects?.forEach((title) => {
    const project = projects.find((candidate) => candidate.title === title);
    if (project) found.set(project.title, project);
  });
  return [...found.values()];
}
