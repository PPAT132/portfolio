import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home setCurrentSection={setCurrentSection} />} />
            <Route path="/about" element={<About setCurrentSection={setCurrentSection} />} />
            <Route path="/experience" element={<Experience setCurrentSection={setCurrentSection} />} />
            <Route path="/projects" element={<Projects setCurrentSection={setCurrentSection} />} />
            <Route path="/skills" element={<Skills setCurrentSection={setCurrentSection} />} />
            <Route path="/contact" element={<Contact setCurrentSection={setCurrentSection} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
