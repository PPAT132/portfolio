import { AboutSection } from '../sections/AboutSection';
import { ContactSection } from '../sections/ContactSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { HeroSection } from '../sections/HeroSection';
import { ProjectsSection } from '../sections/ProjectsSection';

const Home = () => (
  <div className="min-h-screen bg-background bg-grid font-mono text-foreground">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
  </div>
);

export default Home;
