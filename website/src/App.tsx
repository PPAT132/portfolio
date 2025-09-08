import { useState } from 'react';
import Home from './pages/Home';
import SideNavigation from './components/SideNavigation';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
      <main className="w-full pl-8 lg:pl-16 pr-0 lg:pr-56">
        <Home setCurrentSection={setCurrentSection} />
      </main>
      <SideNavigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
    </div>
  );
}

export default App;
