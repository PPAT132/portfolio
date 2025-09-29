import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmailMe from './pages/EmailMe';
import SideNavigation from './components/SideNavigation';
import TopNavigation from './components/TopNavigation';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  
  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== currentSection) {
      setCurrentSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentSection]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden overflow-y-auto">
        <Routes>
          <Route path="/email" element={<EmailMe />} />
          <Route path="/*" element={
            <>
              <TopNavigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
              <main className="w-full px-4 sm:px-6 lg:pl-16 lg:pr-56 pt-16 lg:pt-0">
                <Home setCurrentSection={setCurrentSection} />
              </main>
              <SideNavigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
