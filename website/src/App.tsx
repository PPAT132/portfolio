import { useCallback, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmailMe from './pages/EmailMe';
import SideNavigation from './components/SideNavigation';
import TopNavigation from './components/TopNavigation';
import { sections, type SectionId } from './config/sections';
import { useScrollSpy } from './hooks/useScrollSpy';

function App() {
  const {
    currentSection,
    navigateToSection: scrollToSection,
  } = useScrollSpy();

  const navigateToSection = useCallback(
    (sectionId: SectionId) => {
      scrollToSection(sectionId);
    },
    [scrollToSection],
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const initialSection = sections.find((section) => section.id === hash);

    if (!initialSection) {
      return;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      navigateToSection(initialSection.id);
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [navigateToSection]);

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <div className="min-h-screen bg-cyber-black text-white overflow-x-hidden overflow-y-auto bg-grid font-mono">
          <Routes>
            <Route path="/email" element={<EmailMe />} />
            <Route
              path="/*"
              element={
                <>
                  <TopNavigation
                    currentSection={currentSection}
                    onNavigate={navigateToSection}
                  />
                  <main className="w-full px-4 sm:px-6 lg:pl-16 lg:pr-56 pt-16 lg:pt-0">
                    <Home />
                  </main>
                  <SideNavigation
                    currentSection={currentSection}
                    onNavigate={navigateToSection}
                  />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
