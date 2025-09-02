import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ArrowRight, Code, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import profileImage from '../assets/images/My_Picture.jpg';

interface HomeProps {
  setCurrentSection: (section: string) => void;
}

const Home = ({ setCurrentSection }: HomeProps) => {
  const links = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/PPAT132', color: 'hover:text-gray-300', bgColor: 'bg-gray-800' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/maxiao-ma-2162752b3/', color: 'hover:text-blue-400', bgColor: 'bg-blue-600' },
    { icon: FileText, label: 'Résumé', url: '#', color: 'hover:text-green-400', bgColor: 'bg-green-600' },
    { icon: Mail, label: 'Email', url: 'mailto:maxiaoma833@gmail.com', color: 'hover:text-red-400', bgColor: 'bg-red-600' },
  ];

  const actions = [
    { icon: Code, label: 'View My Work', path: '/projects', bgColor: 'bg-purple-600' },
    { icon: Briefcase, label: 'Get In Touch', path: '/contact', bgColor: 'bg-indigo-600' },
  ];

  const skills = [
    'AI Fine-tuning', 'Model Optimization', 'AI Agents', 'Full-Stack Development',
    'React', 'TypeScript', 'Python', 'C#', 'FastAPI', 'Docker'
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        // Calculate the width of one skill item (approximate)
        const skillWidth = 150; // px per skill item
        const totalWidth = skills.length * skillWidth;
        
        // Move by 1px each time
        const newPosition = prev + 1;
        
        // When we've scrolled the full width, reset to 0 seamlessly
        if (newPosition >= totalWidth) {
          return 0;
        }
        
        return newPosition;
      });
    }, 30); // 30ms for smooth movement

    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="min-h-screen flex items-center px-4 py-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Text Content (3/5) */}
            <div className="lg:col-span-3 max-w-[60ch] space-y-8">
              {/* Title */}
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Patrick Maxiao Ma
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-100 font-light">
                  Waterloo CS Student · AI Explorer · Full-Stack Developer
                </h2>
              </div>

              {/* Introduction */}
              <div className="space-y-6">
                <p className="text-lg text-gray-100 leading-relaxed">
                  I'm a Computer Science student at the University of Waterloo, focused on model fine-tuning and AI agents for practical applications.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed">
                  I see AI as the new "knowledge engine" and try to turn ideas into usable tools and products.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Meanwhile, I continue to refine my full-stack skills with React / Razor / C# / Python, embracing AI-assisted programming to improve efficiency and accuracy.
                </p>
              </div>
            </div>

            {/* Right Column - Photo with Floating Elements */}
            <div className="relative flex justify-center lg:justify-start items-center">
              <div className="relative">
                {/* Main Photo */}
                <div className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="Patrick Maxiao Ma" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Decorative circles around photo */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full opacity-60 animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-purple-500 rounded-full opacity-60 animate-float"></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-green-500 rounded-full opacity-60 animate-float"></div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 bg-pink-500 rounded-full opacity-60 animate-float"></div>
                <div className="absolute -top-8 left-1/2 w-10 h-10 bg-yellow-500 rounded-full opacity-60 animate-float"></div>
                <div className="absolute -bottom-8 left-1/2 w-8 h-8 bg-indigo-500 rounded-full opacity-60 animate-float"></div>

                {/* Quick Links as floating circles */}
                {links.map((link, index) => {
                  const angle = (index * 90) + 45; // Distribute around the circle
                  const radius = 160; // Distance from center
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`absolute w-14 h-14 ${link.bgColor} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <link.icon size={20} className="text-white" />
                    </a>
                  );
                })}

                {/* Action buttons as floating circles */}
                {actions.map((action, index) => {
                  const angle = (index * 90) + 225; // Different angle range
                  const radius = 160;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  // Make "View My Work" larger
                  const isPrimary = action.label === 'View My Work';
                  const buttonSize = isPrimary ? 'w-24 h-24' : 'w-20 h-20';
                  const iconSize = isPrimary ? 24 : 20;
                  const textSize = isPrimary ? 'text-sm' : 'text-xs';
                  
                  return (
                    <Link
                      key={action.label}
                      to={action.path}
                      className={`absolute ${buttonSize} ${action.bgColor} rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <action.icon size={iconSize} className="text-white mb-1" />
                      <span className={`text-white ${textSize} font-medium text-center leading-tight`}>
                        {action.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Skills Scroll Section */}
          <div className="mt-20">
            <h3 className="text-center text-xl font-semibold text-gray-300 mb-8">
              Skills & Technologies
            </h3>
            <div className="relative overflow-hidden">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
              
              <div 
                className="flex"
                style={{
                  transform: `translateX(-${scrollPosition}px)`,
                  transition: 'transform 0.03s linear'
                }}
              >
                {/* First set of skills */}
                {skills.map((skill, index) => (
                  <span
                    key={`first-${index}`}
                    className="flex-shrink-0 mx-3 px-4 py-2 bg-gray-800 rounded-full text-gray-300 text-sm font-medium border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
                {/* Second set of skills for seamless loop */}
                {skills.map((skill, index) => (
                  <span
                    key={`second-${index}`}
                    className="flex-shrink-0 mx-3 px-4 py-2 bg-gray-800 rounded-full text-gray-300 text-sm font-medium border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
