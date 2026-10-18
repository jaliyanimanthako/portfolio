import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portfolio from './components/Portfolio';

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/projects" element={<Portfolio archive />} />
    <Route path="*" element={<Portfolio />} />
  </Routes></BrowserRouter>;
}
