import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Gallery from './components/Gallery';
import IllustrationLab from './components/illustrations/IllustrationLab';

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/projects" element={<Portfolio archive />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/illustrations" element={<IllustrationLab />} />
    <Route path="/illustrations.html" element={<IllustrationLab />} />
    <Route path="*" element={<Portfolio />} />
  </Routes></BrowserRouter>;
}
