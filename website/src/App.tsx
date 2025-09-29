import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmailMe from './pages/EmailMe';
import SideNavigation from './components/SideNavigation';
import TopNavigation from './components/TopNavigation';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
        <Routes>
          <Route path="/email" element={<EmailMe />} />
          <Route path="/*" element={
            <>
              <TopNavigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
              <main className="w-full pl-8 lg:pl-16 pr-0 lg:pr-56 pt-16 lg:pt-0">
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
