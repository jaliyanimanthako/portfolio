// Preview gallery for the illustration scenes (served at /illustrations.html).
import { FloatingResearcher, Mentor, MindReader, PocketLLM, Prototyper, SayHello } from './scenes';

const scenes = [
  { title: 'Floating researcher', use: 'Hero', note: 'Human & machine: a phone chat, a chip, a brain, EEG and code float around him.', Component: FloatingResearcher },
  { title: 'Neural speech tracking', use: 'Research · Final-year project', note: 'EEG cap electrodes fire in sequence while speech bars play: EEG and speech fusion.', Component: MindReader },
  { title: 'LLM in your pocket', use: 'Edge AI · AiSee · llama.cpp', note: 'Chat bubbles from a model running on the chip itself; the cloud is crossed out.', Component: PocketLLM },
  { title: 'Prototyping hardware', use: 'Embedded · BioSense · TransX', note: 'Soldering a board, current flowing in the traces, an ECG heartbeat drawing.', Component: Prototyper },
  { title: 'Teaching & leading', use: 'Electronic Club · ICE mentor · Scouting', note: 'A neural network draws itself on the whiteboard while the room nods along.', Component: Mentor },
  { title: 'Say hello', use: 'Contact', note: 'A waving hand and a paper plane looping into the inbox.', Component: SayHello },
];

const css = `
  body { margin: 0; background: #f6f4ef; color: #191919; font-family: Inter, Helvetica, Arial, sans-serif; }
  main { max-width: 1180px; margin: 0 auto; padding: 56px 20px 80px; }
  h1 { font-size: clamp(34px, 5vw, 56px); letter-spacing: -.05em; font-weight: 600; margin: 0 0 10px; }
  .lede { color: #6b6670; font-size: 15px; margin: 0 0 40px; max-width: 560px; line-height: 1.6; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 22px; }
  figure { margin: 0; background: #fff; border: 1px solid #19191915; border-radius: 18px; padding: 18px 18px 20px; }
  figure.wide { grid-column: 1 / -1; display: grid; grid-template-columns: minmax(0, 1.2fr) 1fr; gap: 24px; align-items: center; }
  figcaption span { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #7a4fc0; font-weight: 600; }
  figcaption h2 { font-size: 22px; letter-spacing: -.03em; margin: 8px 0 6px; font-weight: 600; }
  figcaption p { margin: 0; font-size: 14px; line-height: 1.6; color: #6b6670; }
  @media (max-width: 700px) { figure.wide { grid-template-columns: 1fr; } }
`;

export default function IllustrationLab() {
  return <main>
    <style>{css}</style>
    <h1>Illustration lab</h1>
    <p className="lede">Notion-style animated scenes drawn from the CV. Each one is a standalone React component in <code>src/components/illustrations</code>, ready for the redesign.</p>
    <div className="grid">{scenes.map((scene, i) => <figure key={scene.title} className={i === 0 ? 'wide' : ''}>
      <scene.Component />
      <figcaption><span>{scene.use}</span><h2>{scene.title}</h2><p>{scene.note}</p></figcaption>
    </figure>)}</div>
  </main>;
}
