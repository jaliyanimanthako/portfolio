import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import Metrics from './components/Metrics';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Grain from './components/Grain';
import Preloader from './components/Preloader';
import Marquee from './components/Marquee';
import AllProjectsPage from './pages/AllProjects';
import { AnimatePresence } from 'framer-motion';

// Home Page Component
const HomePage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Projects />
      <Marquee />
      <Services />
      <Metrics />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app bg-black min-h-screen text-white selection:bg-cyan-500 selection:text-black">
        <Grain />
        <CustomCursor />

        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<AllProjectsPage />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
