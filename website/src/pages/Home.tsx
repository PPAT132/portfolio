import { AboutSection } from '../sections/AboutSection';
import { ContactSection } from '../sections/ContactSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { HeroSection } from '../sections/HeroSection';
import { ProjectsSection } from '../sections/ProjectsSection';

const Home = () => (
  <div className="min-h-screen bg-cyber-black text-white bg-grid font-mono">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
  </div>
);

export default Home;
