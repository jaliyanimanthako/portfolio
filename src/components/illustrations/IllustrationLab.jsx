import { useEffect, useState } from 'react';
import { ArrowLeft, Download, Pause, Play } from 'lucide-react';
import { ResearchDesk, SignalResearcher, DeviceResearcher, HelloResearcher } from './ResearchScenes';

const scenes = [
  { title: 'A curious mind', file: 'research-desk', note: 'Reading, writing, connecting ideas. A moving signal trace, a little pencil movement, and a warm cup of coffee.', Component: ResearchDesk },
  { title: 'Listening to the brain', file: 'signal-researcher', note: 'Neural speech tracking: a researcher, an EEG cap, and a live signal.', Component: SignalResearcher },
  { title: 'Intelligence, on device', file: 'device-researcher', note: 'An engineer testing a language model on a phone, seated on a tiny processor.', Component: DeviceResearcher },
  { title: 'An open conversation', file: 'hello-researcher', note: 'A notebook under one arm, a gentle wave with the other. Good things start with a hello.', Component: HelloResearcher },
];
export default function IllustrationLab() {
  const [paused, setPaused] = useState(false);
  useEffect(() => { document.title = 'Illustration notebook — Jaliya Nimantha'; }, []);
  return <main className="illustration-lab" data-motion={paused ? 'paused' : 'playing'}>
    <style>{`
      .illustration-lab{max-width:1080px;margin:auto;padding:45px 25px 75px;font-family:'DM Sans',Arial,sans-serif;color:#202020;background:#fefdf9}
      .lab-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:45px}.lab-nav a,.lab-nav button,.lab-download{display:inline-flex;gap:10px;align-items:center;font-size:12px;color:inherit;text-decoration:none}.lab-nav button{background:none;border:1px solid #20202033;padding:10px;cursor:pointer;border-radius:4px}
      .illustration-lab h1{font:400 clamp(36px,5vw,60px)/1.1 Georgia,serif;letter-spacing:-.04em;margin:0 0 20px}.lab-intro{font-size:14px;line-height:1.8;max-width:620px}.lab-palette{display:flex;gap:18px;margin:24px 0 40px;font-size:10px;flex-wrap:wrap}.lab-palette span{display:flex;gap:7px;align-items:center}.lab-palette i{width:13px;height:13px;border:1px solid #20202033;border-radius:50%}.lab-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px 30px}.lab-grid figure{margin:0;border-top:1px solid #20202033;padding-top:20px}.lab-grid .research-scene{height:330px}.lab-grid h2{font:400 27px Georgia,serif;margin:20px 0 12px}.lab-grid p{font-size:13px;line-height:1.7;margin:0 0 17px}.lab-download{font-size:11px;border-bottom:1px solid #7952b3;padding-bottom:5px}.lab-foot{font-size:11px;line-height:1.7;margin-top:40px}
      @media(max-width:600px){.lab-grid{grid-template-columns:1fr}.lab-grid .research-scene{height:auto;max-height:350px}}
    `}</style>
    <nav className="lab-nav"><a href="/"><ArrowLeft size={15} /> Back to portfolio</a><button aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}{paused ? 'Play animations' : 'Pause animations'}</button></nav>
    <h1>The illustration notebook.</h1><p className="lab-intro">Four original human figures for a research engineer’s world. Simple ink lines, a little purple, and just enough motion to bring an idea to life.</p>
    <div className="lab-palette">{[['Paper','#fefdf9'],['Ink','#202020'],['Lavender','#e9dcff'],['Purple','#7952b3']].map(([name,color]) => <span key={name}><i style={{background:color}} />{name} · {color}</span>)}</div>
    <div className="lab-grid">{scenes.map(({title,file,note,Component}) => <figure key={file}><Component /><figcaption><h2>{title}</h2><p>{note}</p><a className="lab-download" href={`/illustrations/${file}.svg`} download>Download animated SVG <Download size={13} /></a></figcaption></figure>)}</div>
    <p className="lab-foot">All scenes respect reduced-motion preferences. SVG downloads are self-contained and use the same four-color palette.</p>
  </main>;
}
