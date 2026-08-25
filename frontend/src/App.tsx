import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BottomNavigation } from './components/BottomNavigation';
import { AnalysisProvider } from './contexts/AnalysisContext';
import { Landing } from './pages/Landing';
import { AppHome } from './pages/AppHome';
import { Analyze } from './pages/Analyze';
import { Results } from './pages/Results';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { AboutAI } from './pages/AboutAI';

const APP_ROUTES = ['/app', '/analyze', '/results', '/history', '/profile'];

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    // Navigating from another page swaps in the new page via an exit/enter
    // animation, so the target section may not be mounted yet on the first
    // frame - retry for a bit instead of immediately falling back to top.
    let raf = 0;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 40) {
        raf = requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();

    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

function Shell() {
  const location = useLocation();
  const isApp = APP_ROUTES.some((route) => location.pathname.startsWith(route));

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <ScrollManager />
      <Navbar />

      <div className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
            
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/app" element={<AppHome />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about-ai" element={<AboutAI />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {isApp ? <BottomNavigation /> : <Footer />}
    </div>);

}

export function App() {
  return (
    <BrowserRouter>
      <AnalysisProvider>
        <Shell />
      </AnalysisProvider>
    </BrowserRouter>);

}