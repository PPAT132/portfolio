import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ArrowRight, Code, Briefcase, GraduationCap, BookOpen, MapPin, Calendar, ExternalLink, Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import profileImage from '../assets/images/My_Picture.jpg';

interface HomeProps {
  setCurrentSection: (section: string) => void;
}

const Home = ({ setCurrentSection: _setCurrentSection }: HomeProps) => {
  const [_aboutExpanded, _setAboutExpanded] = useState(false);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [focusExpanded, setFocusExpanded] = useState(false);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const [expandedExperienceIndex, setExpandedExperienceIndex] = useState<number | null>(null);

  const toggleExperience = (index: number) => {
    setExpandedExperienceIndex(prev => {
      if (prev === index) return null;
      return index;
    });
  };
  
  const links = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/PPAT132', color: 'hover:text-cyber-gray', bgColor: 'bg-cyber-gray', borderColor: 'border-white' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/patrick-ma-2162752b3/', color: 'hover:text-cyber-blue', bgColor: 'bg-cyber-blue', borderColor: 'border-white' },
    { icon: FileText, label: 'Résumé', url: '#', color: 'hover:text-cyber-green', bgColor: 'bg-cyber-green', borderColor: 'border-white' },
    { icon: Mail, label: 'Email', url: '/email', color: 'hover:text-cyber-pink', bgColor: 'bg-cyber-pink', borderColor: 'border-white' },
  ];

  const actions = [
    { icon: Code, label: 'View My Work', path: '/projects', bgColor: 'bg-cyber-purple', shadow: 'shadow-neo-purple' },
    { icon: Briefcase, label: 'Get In Touch', path: '/contact', bgColor: 'bg-cyber-blue', shadow: 'shadow-neo-blue' },
  ];

  const experiences = [
    {
      company: 'SparkLease',
      position: 'Full-Stack Developer Intern',
      period: 'May–Aug 2025',
      location: 'North York, Canada',
      description: 'Worked as a full-stack engineer on a production-scale automotive marketplace, contributing to both customer-facing features and backend systems supporting 100,000+ annual users.',
      tech: ['Razor', 'ASP.NET MVC', 'C#', 'SQL', 'WebJob', 'SEO'],
      website:'https://www.sparklease.com/',
      details: [
        {
          section: 'Frontend & Application Features',
          items: [
            'Rebuilt and modernized 8 core business pages, including the homepage, buy/sell car flows, listing pages, user profile pages etc.',
            'Implemented fully responsive designs with optimized layouts across desktop, tablet, and mobile devices.',
            'Developed substantial frontend JavaScript logic for vehicle search and filtering, handling complex condition combinations and coordinating with backend APIs.',
            'Implemented client-side features such as VIN number search, animated UI interactions, and dynamic API-driven content.'
          ]
        },
        {
          section: 'Backend & Data Systems',
          items: [
            'Developed and maintained backend services using ASP.NET Core MVC (C#) on Azure, supporting a high-traffic production environment.',
            'Integrated large-scale third-party vehicle data APIs into internal systems, storing and managing vehicle information in Microsoft SQL Server.',
            'Designed and maintained automated data ingestion pipelines using Azure WebJobs with daily and monthly update schedules, reducing redundant API calls and saving more than a thousand dollars per month in external API costs.',
            'Optimized existing vehicle search and filtering queries in SQL Server and introduced lazy loading, significantly improving search responsiveness without fully rewriting legacy logic.'
          ]
        },
        {
          section: 'Routing, Reachability & Platform Quality',
          items: [
            'Redesigned application-level URL structures to improve page reachability and search-engine friendliness.',
            'Implemented sitemap generation to improve crawlability and ensure consistent indexing of key platform pages.'
          ]
        }
      ]
    },
    {
      company: 'NanoInsights',
      position: 'Machine Learning Intern',
      period: 'Jun–Aug 2024',
      location: 'Beijing',
      description: 'Built and trained GAN-style super-resolution models in PyTorch/TensorFlow for electron microscopy, created automated preprocessing pipeline.',
      tech: ['PyTorch', 'TensorFlow', 'GAN', 'Python']
    },
    {
      company: 'WAT.ai (PianoFi)',
      position: 'Project Group Core Member',
      period: 'Sep 2025 – Present',
      location: 'Waterloo, Canada',
      description: 'Core member of the PianoFi project team under WAT.ai. Developing an AI system to transcribe audio into highly playable, practical sheet music. Initially focused on AI Agent workflows, now transitioning to training proprietary models for superior performance and accuracy.',
      tech: ['AI Agents', 'Model Training', 'Music Transcription', 'Python', 'Deep Learning'],
      website: 'https://www.pianofi.ca/'
    }
  ];

  const toggleProject = (index: number) => {
    setExpandedProjectIndex(prev => {
      // If clicking the same project, collapse it
      if (prev === index) {
        return null;
      }
      // Otherwise, expand the clicked project (automatically collapses any other)
      return index;
    });
  };

  const projects = [
    {
      title: 'LACS Compiler',
      subtitle: 'Scala-like to MIPS Assembly Compiler',
      description: 'Developed a fully functional compiler that translates LACS, a Scala-like teaching language, into executable MIPS assembly. The project covers the full compilation pipeline, from frontend analysis to backend code generation and a complete runtime system. Although the language itself was predefined, the work required a deep understanding of language semantics and execution models.',
      tech: ['Scala', 'MIPS Assembly', 'Compiler Construction'],
      link: 'https://lacscompiler.netlify.app/',
      whyItMatters: 'Demonstrates deep understanding of language semantics, memory models (stack/heap), and low-level execution details like closures and garbage collection.',
      work: [
        {
          section: 'Compiler Frontend',
          items: [
            'Implemented a DFA-based maximal-munch scanner to tokenize source programs.',
            'Implemented multiple parsing strategies, including CYK and an experimental Earley parser, gaining practical experience with grammar ambiguity and parser trade-offs.',
            'Built a static type checker supporting functions, closures, and lexical scoping.',
            'Through scanner and parser construction, developed a solid understanding of practical language design principles and how language choices impact implementability.'
          ]
        },
        {
          section: 'Backend & Compilation Pipeline',
          items: [
            'Implemented backend lowering and code generation passes to translate typed programs into low-level MIPS assembly.',
            'Handled control flow, branching, and stack frame layout during code generation.',
            'Explicitly distinguished and implemented normal function calls versus closure calls based on frontend semantic information.',
            'Ensured that high-level language semantics were faithfully preserved in low-level generated code.'
          ]
        },
        {
          section: 'Runtime System',
          items: [
            'Designed and implemented an explicit stack and heap memory model.',
            'Implemented closure representations using code pointers and environment objects (static links).',
            'Built a semi-space copying garbage collector with precise root identification and pointer relocation.',
            'Implemented tail-call optimization to eliminate unnecessary stack growth while preserving semantics.'
          ]
        }
      ]
    },
    {
      title: 'ASCII Game Engine',
      subtitle: 'Reusable Game Engine Framework',
      description: 'Designed and implemented a reusable C++ ASCII game engine following a clean MVC architecture. Built an extensible object-oriented framework using abstract interfaces, inheritance, and composition, with design patterns and RAII for safe memory management.',
      tech: ['C++', 'Game Engine Construction', 'Design Patterns', 'RAII', 'MVC Architecture'],
      link: null,
      work: [
        {
          section: 'Engine Framework',
          items: [
            'Built an extensible object-oriented engine framework using abstract interfaces, inheritance, and composition.',
            'Applied design patterns and RAII for safe memory management.',
            'Designed a clean MVC architecture for separation of concerns.'
          ]
        },
        {
          section: 'Core Systems',
          items: [
            'Engineered a core entity and physics system supporting collision detection.',
            'Implemented fixed-point sub-pixel movement for smooth gameplay.',
            'Built a camera-based world view system.',
            'Created infinite maps with procedural generation capabilities.'
          ]
        },
        {
          section: 'Validation & Extensibility',
          items: [
            'Validated engine functionality and extensibility by developing multiple demo games on top of the engine.',
            'Implemented an independent game AI system on top of the engine for a Mario-like 2D platformer.',
            'Enabled an autonomous agent to play the game end-to-end by perceiving game state and executing actions without human input.',
            'Served as a practical validation of engine usability and extensibility.'
          ]
        }
      ]
    },
    {
      title: 'SEO Agent',
      subtitle: 'AI-Powered Repository Analyzer & VS Code Extension',
      description: 'An intelligent AI agent that analyzes repositories to identify SEO optimization opportunities. Built custom chunker and parser algorithms to reduce AI API costs while maintaining accuracy. Features repository traversal, issue pinpointing to exact files/lines, and automated fix suggestions.',
      tech: ['FastAPI', 'Docker', 'React/Vite', 'VS Code Extension APIs', 'Gemini API', 'Python'],
      link: 'https://github.com/PPAT132/SEOAgent',
      whyItMatters: 'Speeds up SEO hygiene for codebases that use templating (Razor/React).',
      work: [
        'Backend: FastAPI service with CORS configured for a Vite frontend; containerized with Docker for consistent local and CI runs.',
        'Dev UX: shell script to build & launch services and probe a health endpoint for quick feedback.',
        'Repo-aware processing and tool/function calling (crawl, patch, validate).'
      ]
    },
    {
      title: 'iGEM Wiki',
      subtitle: 'Biology-Robotics Integration Project Website',
      description: 'Led a 4-member subteam to design and develop a comprehensive Wiki website showcasing achievements in the iGEM competition. Built with HTML, CSS, and JavaScript, featuring interactive animations and optimized navigation. As team leader, supervised 21-member interdisciplinary team and organized laboratory experiments.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Team Leadership', 'Project Management'],
      link: 'https://2023.igem.wiki/bfsu-icunited/index.html',
      whyItMatters: 'Showcases leadership skills and ability to coordinate interdisciplinary teams while delivering technical solutions.',
      work: [
        'Led 4-member subteam to design and develop comprehensive Wiki website.',
        'Supervised 21-member interdisciplinary team and organized laboratory experiments.',
        'Built interactive animations and optimized navigation for better user experience.'
      ]
    },
    {
      title: 'Super-Resolution AI',
      subtitle: 'Microscopy Image Enhancement Models',
      description: 'Developed RCAN and U-Net CNN models for microscopy image super-resolution using PyTorch. Expanded dataset from 10,000 to 10 million samples through data augmentation techniques. Achieved 23% improvement in image resolution compared to original low-resolution images.',
      tech: ['PyTorch', 'CNN', 'U-Net', 'RCAN', 'Data Augmentation', 'Image Processing'],
      link: null,
      whyItMatters: 'Demonstrates expertise in deep learning, computer vision, and data augmentation techniques.',
      work: [
        'Developed RCAN and U-Net CNN models for microscopy image super-resolution.',
        'Expanded dataset from 10,000 to 10 million samples through data augmentation.',
        'Achieved 23% improvement in image resolution compared to original low-resolution images.'
      ]
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.8
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white bg-grid font-mono">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-4 py-8">
        <div className="w-full max-w-[1130px] mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Text Content (3/5) */}
            <div className="lg:col-span-3 max-w-[60ch] space-y-8 hero-text-container">
              {/* Title */}
              <div>
                <div className="inline-block border-2 border-white p-2 mb-4 bg-cyber-blue text-cyber-black font-bold text-sm tracking-widest uppercase shadow-neo-sm">
                  Full Stack / AI Engineer
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white glitch-text" data-text="Patrick Maxiao Ma">
                  Patrick Maxiao Ma
                </h1>
                <h2 className="text-xl md:text-2xl text-cyber-blue font-bold tracking-tight">
                  Waterloo CS Student <span className="text-white">·</span> Builder of Ideas
                </h2>
              </div>

              {/* Introduction */}
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed font-sans border-l-4 border-cyber-purple pl-4">
                  I'm a Waterloo CS student passionate about combining theory with practice. I believe mathematics provides the foundation for understanding, but I truly enjoy applying knowledge by building real projects. Right now, I'm especially interested in AI agents and fine-tuning models, while also sharpening my full-stack development skills.
                </p>
                
                {/* Resume Download Button */}
                <div className="flex justify-center lg:justify-start">
                  <motion.a
                    href="/Patrick-Ma-Resume.pdf"
                    download="Patrick-Ma-Resume.pdf"
                    className="flex items-center gap-2 px-6 py-3 bg-cyber-black border-2 border-white text-white font-bold hover:bg-white hover:text-cyber-black transition-all duration-200 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={20} />
                    Download Resume
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Right Column - Photo with Floating Elements */}
            <div className="relative flex justify-center lg:justify-start items-center hero-image-container">
              <div className="relative">
                {/* Main Photo */}
                <div className="w-80 h-80 border-4 border-white bg-cyber-gray p-0 shadow-neo-purple relative z-10">
                  <div className="w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    <img 
                      src={profileImage} 
                      alt="Patrick Maxiao Ma" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Decorative Geometric Shapes */}
                <div className="absolute -top-6 -right-6 w-16 h-16 border-4 border-cyber-blue animate-float z-0"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-cyber-purple animate-float z-20 mix-blend-multiply opacity-80"></div>
                <div className="absolute top-1/2 -right-12 w-10 h-10 bg-cyber-green rotate-45 animate-float z-0"></div>
                <div className="absolute -top-12 left-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-cyber-yellow animate-float"></div>

                {/* Quick Links as floating squares */}
                {links.map((link, index) => {
                  const angle = (index * 90) + 45; // Distribute around the circle
                  const radius = 190; // Distance from center
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`absolute w-14 h-14 ${link.bgColor} border-2 ${link.borderColor} flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-neo-sm z-30`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%) rotate(45deg)'
                      }}
                    >
                      <div className="-rotate-45">
                        <link.icon size={20} className="text-white drop-shadow-sm" />
                      </div>
                    </a>
                  );
                })}

                {/* Action buttons as floating squares */}
                {actions.map((action, index) => {
                  const angle = (index * 90) + 225; // Different angle range
                  const radius = 190;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  // Make "View My Work" larger and more prominent
                  const isPrimary = action.label === 'View My Work';
                  const buttonSize = isPrimary ? 'w-32 h-32' : 'w-24 h-24';
                  const iconSize = isPrimary ? 32 : 24;
                  const textSize = isPrimary ? 'text-sm' : 'text-xs';
                  
                  return (
                    <button
                      key={action.label}
                      className={`absolute ${buttonSize} ${action.bgColor} border-4 border-white flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 ${action.shadow} z-30`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => {
                        if (action.label === 'View My Work') {
                          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        } else if (action.label === 'Get In Touch') {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <action.icon size={iconSize} className="text-white mb-2 drop-shadow-sm" />
                      <span className={`text-white ${textSize} font-bold text-center leading-tight drop-shadow-sm uppercase tracking-wider px-2`}>
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 border-t-2 border-white bg-cyber-black">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white uppercase tracking-tighter">
              About_Me
            </h2>
            <div className="w-full h-2 bg-cyber-blue absolute left-0 bottom-0 transform -skew-x-12 opacity-50"></div>
          </motion.div>

          <motion.div className="space-y-12" variants={staggerVariants}>
            {/* Education - No expansion needed */}
            <motion.div className="bg-cyber-black border-2 border-white p-6 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6 border-b-2 border-dashed border-gray-700 pb-4">
                <GraduationCap className="text-cyber-blue" size={28} />
                <h3 className="text-2xl font-bold text-white uppercase">Education</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="border-l-4 border-cyber-blue pl-4">
                  <h4 className="font-bold text-lg text-white">University of Waterloo</h4>
                  <p className="text-cyber-blue font-mono mt-1">Bachelor of Computer Science (Co-op)</p>
                  <p className="text-gray-400 text-sm mt-2">2024-2029 • Average: 92</p>
                </div>
                <div className="border-l-4 border-cyber-purple pl-4">
                  <h4 className="font-bold text-lg text-white">Beijing Chenjinglun Middle School</h4>
                  <p className="text-cyber-purple font-mono mt-1">High School Diploma</p>
                  <p className="text-gray-400 text-sm mt-2">2021-2024 • Academic Excellence</p>
                </div>
              </div>
            </motion.div>

            {/* Current Focus - Expandable */}
            <motion.div className="bg-cyber-black border-2 border-white shadow-neo" variants={itemVariants}>
              <div className="p-6 border-b-2 border-white flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Code className="text-cyber-green" size={28} />
                    <h3 className="text-2xl font-bold text-white uppercase">Current_Focus</h3>
                  </div>
                  <button
                    onClick={() => setFocusExpanded(!focusExpanded)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold hover:bg-cyber-blue hover:text-white transition-colors uppercase text-xs tracking-wider border-2 border-transparent hover:border-black"
                  >
                    <span className="">
                      {focusExpanded ? 'COLLAPSE' : 'EXPAND'}
                    </span>
                    <motion.div
                      animate={{ rotate: focusExpanded ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                   <div className="bg-gray-900/50 p-3 border border-gray-700">
                      <p className="text-white font-bold mb-1">📐 Core Foundations</p>
                      <p className="text-gray-400 text-sm">Advancing math & CS fundamentals.</p>
                   </div>
                   <div className="bg-gray-900/50 p-3 border border-gray-700">
                      <p className="text-white font-bold mb-1">🖥️ Full-Stack</p>
                      <p className="text-gray-400 text-sm">Architecture & core principles.</p>
                   </div>
                   <div className="bg-gray-900/50 p-3 border border-gray-700">
                      <p className="text-white font-bold mb-1">🤖 AI Fine-Tuning</p>
                      <p className="text-gray-400 text-sm">Adapting models for specific tasks.</p>
                   </div>
                   <div className="bg-gray-900/50 p-3 border border-gray-700">
                      <p className="text-white font-bold mb-1">🧩 AI Agents</p>
                      <p className="text-gray-400 text-sm">Building usable AI tools.</p>
                   </div>
                </div>
              </div>
              
              <motion.div
                initial={false}
                animate={{ height: focusExpanded ? 'auto' : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden bg-gray-900"
              >
                <div className="p-6 space-y-6 border-t border-gray-700">
                  <p className="text-white font-mono border-l-2 border-cyber-yellow pl-3">
                    // DEEP DIVE INTO CURRENT STATUS
                  </p>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-cyber-green mb-2 uppercase tracking-wide">[ Foundation ]</h4>
                      <p className="text-gray-300 text-sm leading-relaxed font-sans">
                        Continuing to build a solid base in mathematics and computer science fundamentals. I see these as the pillars that ensure long-term growth and the ability to understand advanced concepts in depth.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-cyber-green mb-2 uppercase tracking-wide">[ Development ]</h4>
                      <p className="text-gray-300 text-sm leading-relaxed font-sans">
                        Maintaining proficiency across front-end and back-end development. While AI can handle many details, I believe understanding architecture, algorithms, and system design remains essential.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-cyber-green mb-2 uppercase tracking-wide">[ AI Exploration ]</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3 font-sans">
                        Applying and experimenting with AI in concrete ways. I am especially interested in:
                      </p>
                      <div className="ml-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <span className="text-cyber-green font-bold mt-1">::</span>
                          <div>
                            <span className="text-white text-sm font-bold">AI Fine-Tuning</span>
                            <p className="text-gray-400 text-sm mt-1">Working with models at a scale I can handle, improving them for specific tasks.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-cyber-green font-bold mt-1">::</span>
                          <div>
                            <span className="text-white text-sm font-bold">AI Agents</span>
                            <p className="text-gray-400 text-sm mt-1">Designing agents that compensate for the limitations of models, turning raw capability into usable tools.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* My Story - Expandable */}
            <motion.div className="bg-cyber-black border-2 border-white shadow-neo" variants={itemVariants}>
              <div className="p-6 border-b-2 border-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-cyber-purple" size={28} />
                  <h3 className="text-2xl font-bold text-white uppercase">My_Story.txt</h3>
                </div>
                <button
                  onClick={() => setStoryExpanded(!storyExpanded)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold hover:bg-cyber-purple hover:text-white transition-colors uppercase text-xs tracking-wider border-2 border-transparent hover:border-black"
                >
                  <span className="">
                    {storyExpanded ? 'COLLAPSE' : 'READ'}
                  </span>
                  <motion.div
                    animate={{ rotate: storyExpanded ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </button>
              </div>
              
              <div className="p-6 bg-gray-900/30">
                <p className="text-gray-300 leading-relaxed font-sans">
                  I am a second-year Computer Science student at the University of Waterloo. I value strong theoretical foundations in mathematics, while also thriving in high-pressure, hands-on environments shaped by my background in physics competitions. My approach is to master the fundamentals of computer science and let AI handle what it does best—its vast knowledge and rapid implementation.
                </p>
              </div>
              
              <motion.div
                initial={false}
                animate={{ height: storyExpanded ? 'auto' : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden bg-gray-900 border-t border-gray-700"
              >
                <div className="p-6 space-y-4 text-gray-300 leading-relaxed font-sans text-sm">
                  <p>
                    Earlier in my education, I was a physics competition student (CPhO). That experience trained me to learn and think under high pressure and at a high level of difficulty. It also taught me that in complex systems, theory alone is often insufficient, and experiments or practice provide more realistic answers. At the same time, I came to appreciate the reassurance offered by mathematical models. This combination shaped the way I learn today—valuing fundamental principles while also enjoying the process of hands-on experimentation and iteration.
                  </p>
                  <p>
                    In computer science, my philosophy is: master the fundamentals and leverage AI. I actively study full-stack development because it is a core skillset of the field—understanding algorithms, knowing languages, being able to write and read code are all necessary to keep growing. But I also clearly recognize that AI now holds an immense knowledge base and, in many aspects of implementation, can work faster, more broadly, and more accurately than humans. My focus is on grasping the essential foundations while relying on AI to make my development work more efficient and precise.
                  </p>
                  <p>
                    At the same time, I am passionate about exploring AI. I see that while models themselves are powerful, they also have limitations—and these limitations can often be addressed through the design of AI Agents. To me, models are like steam engines: sources of power. Agents are the machines that harness that power, transforming it into real applications. Compared to 200 years ago, this time the replacement is not physical labor but aspects of mental work. I believe AI Agents will become the norm, and I am eager to keep experimenting in this area—whether through small-scale fine-tuning or building experimental agents that bring AI's capabilities into concrete scenarios.
                  </p>
                  <p>
                    Looking forward, I aim to continue growing at the intersection of mathematics and theory, the fundamentals of full-stack development, and the exploration of AI applications. My goal is to transform more ideas into tools and products that genuinely solve problems.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Skills - Full display with categories */}
            <motion.div className="bg-cyber-black border-2 border-white p-6 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8 border-b-2 border-dashed border-gray-700 pb-4">
                <Code className="text-cyber-blue" size={28} />
                <h3 className="text-2xl font-bold text-white uppercase">System_Capabilities</h3>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Programming Languages */}
                <div>
                  <h4 className="font-bold text-cyber-blue mb-4 uppercase text-sm tracking-wider">[ Languages ]</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Python', 'Java', 'C', 'C++', 'C#', 'JavaScript', 'TypeScript', 'Racket', 'Haskell'].map(skill => (
                      <span key={skill} className="px-3 py-1 border border-gray-600 bg-transparent text-xs text-gray-300 font-mono hover:bg-cyber-blue hover:text-black hover:border-cyber-blue transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Web & Backend Development */}
                <div>
                  <h4 className="font-bold text-cyber-green mb-4 uppercase text-sm tracking-wider">[ Web_Stack ]</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Razor', 'React', 'Node.js', 'SQL', '.NET', 'FastAPI', 'Docker'].map(skill => (
                      <span key={skill} className="px-3 py-1 border border-gray-600 bg-transparent text-xs text-gray-300 font-mono hover:bg-cyber-green hover:text-black hover:border-cyber-green transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI & Machine Learning */}
                <div>
                  <h4 className="font-bold text-cyber-purple mb-4 uppercase text-sm tracking-wider">[ AI / ML ]</h4>
                  <div className="flex flex-wrap gap-3">
                    {['PyTorch', 'TensorFlow', 'CNN', 'GAN', 'Fine-tuning', 'Model Training'].map(skill => (
                      <span key={skill} className="px-3 py-1 border border-gray-600 bg-transparent text-xs text-gray-300 font-mono hover:bg-cyber-purple hover:text-black hover:border-cyber-purple transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI APIs & Tools */}
                <div>
                  <h4 className="font-bold text-cyber-yellow mb-4 uppercase text-sm tracking-wider">[ Tools / APIs ]</h4>
                  <div className="flex flex-wrap gap-3">
                    {['OpenAI API', 'Google AI API', 'VSCE', 'AI Agents', 'Automation'].map(skill => (
                      <span key={skill} className="px-3 py-1 border border-gray-600 bg-transparent text-xs text-gray-300 font-mono hover:bg-cyber-yellow hover:text-black hover:border-cyber-yellow transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 border-t-2 border-white bg-grid relative">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white uppercase tracking-tighter bg-cyber-black inline-block px-4 border-2 border-cyber-blue shadow-neo-blue transform -rotate-1">
              Experience_Log
            </h2>
          </motion.div>

          <LayoutGroup>
            <div className={`space-y-8 ${expandedExperienceIndex !== null ? 'grid grid-cols-1 gap-8 space-y-0' : ''}`}>
              {(() => {
                const displayExperiences = [...experiences];
                if (expandedExperienceIndex !== null && expandedExperienceIndex % 2 !== 0) {
                  const temp = displayExperiences[expandedExperienceIndex];
                  displayExperiences[expandedExperienceIndex] = displayExperiences[expandedExperienceIndex - 1];
                  displayExperiences[expandedExperienceIndex - 1] = temp;
                }

                return displayExperiences.map((exp) => {
                  const originalIndex = experiences.findIndex(e => e.company === exp.company);
                  const isExpanded = expandedExperienceIndex === originalIndex;
                  const hasDetails = 'details' in exp;

                  return (
                    <motion.div 
                      layout
                      key={exp.company}
                      className={`bg-cyber-black border-2 border-gray-600 hover:border-white transition-all duration-300 ${
                        isExpanded ? 'border-cyber-blue shadow-neo-blue' : 'hover:shadow-neo'
                      }`}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-cyber-blue mb-1 uppercase tracking-wide">{exp.position}</h3>
                            <div className="flex items-center gap-2">
                              <p className="text-white font-bold text-lg">{exp.company}</p>
                              {(exp as any).website && (
                                <a 
                                  href={(exp as any).website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-500 hover:text-white transition-colors"
                                >
                                  <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 text-xs font-mono text-gray-400">
                            <div className="flex items-center gap-2 bg-gray-900 px-2 py-1 border border-gray-700">
                              <Calendar size={12} />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-900 px-2 py-1 border border-gray-700">
                              <MapPin size={12} />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <div className="space-y-2 text-gray-300 leading-relaxed mb-6 font-sans text-sm border-l-2 border-gray-700 pl-4">
                          <p>{exp.description}</p>
                        </div>
                        
                        {/* Footer / Tech / Toggle */}
                        <div className="flex items-end justify-between mt-4">
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech, techIndex) => (
                              <span key={techIndex} className="px-2 py-0.5 bg-gray-900 border border-gray-700 text-[10px] text-gray-400 font-mono uppercase">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {hasDetails && (
                            <button
                              onClick={() => toggleExperience(originalIndex)}
                              className={`flex items-center gap-2 px-3 py-1 font-bold text-xs uppercase tracking-wider transition-all ${
                                isExpanded 
                                  ? 'bg-cyber-blue text-black border-2 border-cyber-blue' 
                                  : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black'
                              }`}
                            >
                              <span>{isExpanded ? 'CLOSE' : 'DETAILS'}</span>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown size={14} />
                              </motion.div>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isExpanded && hasDetails && (
                          <motion.div
                            key="details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden bg-gray-900 border-t-2 border-dashed border-gray-700"
                          >
                            <div className="p-6 grid md:grid-cols-3 gap-8">
                              {(exp as any).details.map((section: any, idx: number) => (
                                <div key={idx} className="space-y-3">
                                  <h4 className="text-xs font-bold text-cyber-blue uppercase tracking-widest border-b border-gray-700 pb-2">{section.section}</h4>
                                  <ul className="space-y-2">
                                    {section.items.map((item: string, itemIdx: number) => (
                                      <li key={itemIdx} className="flex items-start gap-2 text-xs text-gray-300 font-sans leading-relaxed">
                                        <span className="text-cyber-blue mt-1 flex-shrink-0">»</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                });
              })()}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 border-t-2 border-white bg-cyber-black">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white uppercase tracking-tighter">
              Project_Database
            </h2>
            <div className="w-full max-w-md mx-auto h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent"></div>
          </motion.div>

          <LayoutGroup>
            <div className="grid md:grid-cols-2 gap-8">
              {(() => {
                const displayProjects = [...projects];
                
                if (expandedProjectIndex !== null && expandedProjectIndex % 2 !== 0) {
                  const temp = displayProjects[expandedProjectIndex];
                  displayProjects[expandedProjectIndex] = displayProjects[expandedProjectIndex - 1];
                  displayProjects[expandedProjectIndex - 1] = temp;
                }

                return displayProjects.map((project) => {
                  const originalIndex = projects.findIndex(p => p.title === project.title);
                  const isExpanded = expandedProjectIndex === originalIndex;
                  const hasDetailedWork = project.work && typeof project.work[0] === 'object' && 'section' in project.work[0];

                  return (
                    <motion.div 
                      layout
                      key={project.title}
                      className={`bg-gray-900 border-2 border-gray-700 hover:border-cyber-purple transition-all duration-300 group ${
                        isExpanded ? 'md:col-span-2 border-cyber-purple shadow-neo-purple z-10' : 'hover:-translate-y-1 hover:shadow-neo-sm'
                      }`}
                    >
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`text-xl font-bold mb-2 uppercase tracking-wide group-hover:text-cyber-purple transition-colors ${isExpanded ? 'text-cyber-purple' : 'text-white'}`}>
                            {project.title}
                          </h3>
                          <p className="text-gray-500 text-xs font-mono mb-3 bg-black inline-block px-1">
                            {project.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white bg-gray-800 p-2 border border-gray-600 hover:border-white transition-all"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                          {hasDetailedWork && (
                            <button
                              onClick={() => toggleProject(originalIndex)}
                              className={`flex items-center justify-center w-8 h-8 border transition-all ${
                                isExpanded ? 'bg-cyber-purple border-cyber-purple text-black' : 'bg-transparent border-gray-600 text-gray-400 hover:border-white hover:text-white'
                              }`}
                            >
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown size={18} />
                              </motion.div>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-6 text-sm font-sans flex-grow border-l-2 border-gray-800 pl-4 group-hover:border-cyber-purple transition-colors">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-black border border-gray-800 text-[10px] text-gray-400 font-mono uppercase group-hover:border-gray-600 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  
                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-black border-t border-cyber-purple"
                      >
                        <div className="p-6">
                          {/* My Work */}
                          {project.work && project.work.length > 0 && (
                            <div>
                              <h4 className="text-xs font-bold text-cyber-purple mb-6 uppercase tracking-widest border-b border-gray-800 pb-2 inline-block">/// Development_Log</h4>
                              {typeof project.work[0] === 'object' && 'section' in project.work[0] ? (
                                // Detailed format
                                <div className="grid md:grid-cols-3 gap-8">
                                  {(project.work as Array<{section: string, items: string[]}>).map((section, sectionIdx) => (
                                    <div key={sectionIdx} className="space-y-4">
                                      <h5 className="text-sm font-bold text-white border-l-4 border-cyber-purple pl-3">{section.section}</h5>
                                      <ul className="space-y-3">
                                        {section.items.map((item, itemIdx) => (
                                          <li key={itemIdx} className="flex items-start gap-3 text-sm text-gray-400 font-sans">
                                            <span className="text-cyber-purple mt-1 flex-shrink-0 text-xs">■</span>
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                // Simple format
                                <ul className="space-y-2">
                                  {(project.work as string[]).map((work, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400 font-sans">
                                      <span className="text-cyber-purple mt-1">■</span>
                                      <span>{work}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                );
              });
            })()}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 pb-32 border-t-2 border-white bg-grid">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white uppercase tracking-tighter">
              Initialize_Connection
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-mono">
              Ready to collaborate? Establish a communication link below.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="/email"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-cyber-blue border-2 border-white text-black font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <Mail size={20} />
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/maxiao-ma-2162752b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-cyber-black border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="https://github.com/PPAT132"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-cyber-black border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
