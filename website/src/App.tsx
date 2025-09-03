import { useState } from 'react';
import Home from './pages/Home';
import SideNavigation from './components/SideNavigation';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
      <main className="w-full">
        <Home setCurrentSection={setCurrentSection} />
      </main>
      <SideNavigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
    </div>
  );
}

export default App;
