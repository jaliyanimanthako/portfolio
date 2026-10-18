import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

// Use the project's JSX transform so downloads stay in sync with the live art.
const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({ root, server: { middlewareMode: true, hmr: false, ws: false, watch: null }, appType: 'custom' });
try {
  const scenes = await server.ssrLoadModule('/src/components/illustrations/ResearchScenes.jsx');
  const css = await readFile(new URL('../src/components/illustrations/research-scenes.css', import.meta.url), 'utf8');
  const output = new URL('../public/illustrations/', import.meta.url);
  await mkdir(output, { recursive: true });
  const names = {
    'research-desk': 'ResearchDesk',
    'signal-researcher': 'SignalResearcher',
    'device-researcher': 'DeviceResearcher',
    'hello-researcher': 'HelloResearcher',
  };
  for (const [name, component] of Object.entries(names)) {
    let svg = renderToStaticMarkup(createElement(scenes[component]));
    svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
      .replace('class="research-scene ', 'class="research-scene scene-visible ')
      .replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
    await writeFile(new URL(`${name}.svg`, output), svg + '\n');
    console.log(`Exported ${name}.svg`);
  }
} finally {
  await server.close();
}
