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
    { icon: Github, label: 'GitHub', url: 'https://github.com/PPAT132', color: 'hover:text-gray-300', bgColor: 'bg-gray-800' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/patrick-ma-2162752b3/', color: 'hover:text-blue-400', bgColor: 'bg-blue-600' },
    { icon: FileText, label: 'Résumé', url: '#', color: 'hover:text-green-400', bgColor: 'bg-green-600' },
    { icon: Mail, label: 'Email', url: '/email', color: 'hover:text-red-400', bgColor: 'bg-red-600' },
  ];

  const actions = [
    { icon: Code, label: 'View My Work', path: '/projects', bgColor: 'bg-purple-600' },
    { icon: Briefcase, label: 'Get In Touch', path: '/contact', bgColor: 'bg-indigo-600' },
  ];

  // const _skills = [
  //   'AI Fine-tuning', 'Model Optimization', 'AI Agents', 'Full-Stack Development',
  //   'React', 'TypeScript', 'Python', 'C#', 'FastAPI', 'Docker'
  // ];

  const experiences = [
    {
      company: 'SparkLease',
      position: 'Full-Stack Developer Intern',
      period: 'May–Aug 2025',
      location: 'North York, Canada',
      description: 'Worked as a full-stack engineer on a production-scale automotive marketplace, contributing to both customer-facing features and backend systems supporting 100,000+ annual users.',
      tech: ['Razor', 'ASP.NET MVC', 'C#', 'SQL', 'WebJob', 'SEO'],
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
      tech: ['C++', 'Game Development', 'Design Patterns', 'RAII', 'MVC Architecture'],
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-4 py-8">
        <div className="w-full max-w-[1130px] mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Text Content (3/5) */}
            <div className="lg:col-span-3 max-w-[60ch] space-y-8 hero-text-container">
              {/* Title */}
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Patrick Maxiao Ma
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-100 font-light">
                  Waterloo CS Student · Builder of Ideas into Projects
                </h2>
              </div>

              {/* Introduction */}
              <div className="space-y-6">
                <p className="text-lg text-gray-100 leading-relaxed">
                  I'm a Waterloo CS student passionate about combining theory with practice. I believe mathematics provides the foundation for understanding, but I truly enjoy applying knowledge by building real projects. Right now, I'm especially interested in AI agents and fine-tuning models, while also sharpening my full-stack development skills.
                </p>
                
                {/* Resume Download Button */}
                <div className="flex justify-center">
                  <motion.a
                    href="/Patrick-Ma-Resume.pdf"
                    download="Patrick-Ma-Resume.pdf"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                      className={`absolute w-14 h-14 ${link.bgColor} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border border-white/10`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <link.icon size={20} className="text-white drop-shadow-sm" />
                    </a>
                  );
                })}

                {/* Action buttons as floating circles */}
                {actions.map((action, index) => {
                  const angle = (index * 90) + 225; // Different angle range
                  const radius = 160;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  // Make "View My Work" larger and more prominent
                  const isPrimary = action.label === 'View My Work';
                  const buttonSize = isPrimary ? 'w-28 h-28' : 'w-20 h-20';
                  const iconSize = isPrimary ? 28 : 20;
                  const textSize = isPrimary ? 'text-sm' : 'text-xs';
                  const bgGradient = isPrimary 
                    ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600' 
                    : 'bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-600';
                  const borderStyle = isPrimary 
                    ? 'border-2 border-purple-400/30 shadow-xl shadow-purple-500/20' 
                    : 'border-2 border-indigo-400/30 shadow-lg shadow-indigo-500/20';
                  
                  return (
                    <button
                      key={action.label}
                      className={`absolute ${buttonSize} ${bgGradient} rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${borderStyle}`}
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
                      <action.icon size={iconSize} className="text-white mb-1 drop-shadow-sm" />
                      <span className={`text-white ${textSize} font-semibold text-center leading-tight drop-shadow-sm`}>
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
      <section id="about" className="py-20 px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
          </motion.div>

          <motion.div className="space-y-6" variants={staggerVariants}>
            {/* Education - No expansion needed */}
            <motion.div className="bg-gray-800 rounded-lg p-6 border border-gray-700" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-gray-100">Education</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-400">University of Waterloo</h4>
                  <p className="text-gray-300">Bachelor of Computer Science (Co-op Program)</p>
                  <p className="text-gray-400 text-sm">2024-2029 • Average: 92</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400">Beijing Chenjinglun Middle School</h4>
                  <p className="text-gray-300">High School Diploma</p>
                  <p className="text-gray-400 text-sm">2021-2024 • Academic Excellence</p>
                </div>
              </div>
            </motion.div>

            {/* Current Focus - Expandable */}
            <motion.div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden" variants={itemVariants}>
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Code className="text-green-400" size={24} />
                    <h3 className="text-xl font-semibold text-gray-100">Current Focus</h3>
                  </div>
                  <button
                    onClick={() => setFocusExpanded(!focusExpanded)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <span className="text-gray-300 text-sm">
                      {focusExpanded ? 'Show Less' : 'Learn More'}
                    </span>
                    <motion.div
                      animate={{ rotate: focusExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={14} className="text-gray-400" />
                    </motion.div>
                  </button>
                </div>
                <p className="text-gray-300 mt-3 leading-relaxed">
                  📐 Core Foundations: Advancing my knowledge of mathematics and computer science fundamentals.
                </p>
                <p className="text-gray-300 mt-3 leading-relaxed">
                  🖥️ Full-Stack Development: Practicing both front-end and back-end skills, keeping focus on architecture and core principles.
                </p>
                <p className="text-gray-300 mt-3 leading-relaxed">
                  🤖 AI Fine-Tuning: Training and adapting models for specific tasks within practical limits.
                </p>
                <p className="text-gray-300 mt-3 leading-relaxed">
                  🧩 AI Agents: Building agents that extend model power into usable, real-world tools.
                </p>
              </div>
              
              <motion.div
                initial={false}
                animate={{ height: focusExpanded ? 'auto' : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Right now, my main focus areas are practical and forward-looking:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Strengthening Core Foundations</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Continuing to build a solid base in mathematics and computer science fundamentals. I see these as the pillars that ensure long-term growth and the ability to understand advanced concepts in depth.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Full-Stack Development</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Maintaining proficiency across front-end and back-end development. While AI can handle many details, I believe understanding architecture, algorithms, and system design remains essential.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">AI Exploration</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        Applying and experimenting with AI in concrete ways. I am especially interested in:
                      </p>
                      <div className="ml-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <div>
                            <span className="text-gray-300 text-sm font-medium">AI Fine-Tuning:</span>
                            <span className="text-gray-300 text-sm"> Working with models at a scale I can handle, improving them for specific tasks.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <div>
                            <span className="text-gray-300 text-sm font-medium">AI Agents:</span>
                            <span className="text-gray-300 text-sm"> Designing agents that compensate for the limitations of models, turning raw capability into usable tools and real-world applications.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* My Story - Expandable */}
            <motion.div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden" variants={itemVariants}>
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-purple-400" size={24} />
                    <h3 className="text-xl font-semibold text-gray-100">My Story</h3>
                  </div>
                  <button
                    onClick={() => setStoryExpanded(!storyExpanded)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <span className="text-gray-300 text-sm">
                      {storyExpanded ? 'Show Less' : 'Read More'}
                    </span>
                    <motion.div
                      animate={{ rotate: storyExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={14} className="text-gray-400" />
                    </motion.div>
                  </button>
                </div>
                <p className="text-gray-300 mt-3 leading-relaxed">
                  I am a second-year Computer Science student at the University of Waterloo. I value strong theoretical foundations in mathematics, while also thriving in high-pressure, hands-on environments shaped by my background in physics competitions. My approach is to master the fundamentals of computer science and let AI handle what it does best—its vast knowledge and rapid implementation.
                </p>
                <p className="text-gray-300 mt-3 leading-relaxed">
                  I am especially passionate about AI applications. I see models as steam engines, powerful yet limited, and AI Agents as the machines that harness that power. This perspective drives me to experiment with fine-tuning and building agents that extend AI's real-world impact. Looking ahead, I aim to grow at the intersection of mathematics, full-stack development, and AI exploration, transforming ideas into tools that solve real problems.
                </p>
              </div>
              
              <motion.div
                initial={false}
                animate={{ height: storyExpanded ? 'auto' : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 space-y-4 text-gray-300 leading-relaxed">
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
            <motion.div className="bg-gray-800 rounded-lg border border-gray-700 p-6" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-gray-100">Skills & Technologies</h3>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Programming Languages */}
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Python</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Java</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">C</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">C++</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">C#</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">JavaScript</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">TypeScript</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Racket</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Haskell</span>
                  </div>
                </div>

                {/* Web & Backend Development */}
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Web & Backend Development</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Razor</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">React</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Node.js</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">SQL</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">.NET</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">FastAPI</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Docker</span>
                  </div>
                </div>

                {/* AI & Machine Learning */}
                <div>
                  <h4 className="font-semibold text-purple-400 mb-3">AI & Machine Learning</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">PyTorch</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">TensorFlow</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">CNN</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">GAN</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Fine-tuning</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Model Training</span>
                  </div>
                </div>

                {/* AI APIs & Tools */}
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-3">AI APIs & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">OpenAI API</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Google AI API</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">VSCE</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">AI Agents</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">Automation</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
          </motion.div>

          <LayoutGroup>
            <div className={`space-y-6 ${expandedExperienceIndex !== null ? 'grid grid-cols-1 gap-6 space-y-0' : ''}`}>
              {(() => {
                const displayExperiences = [...experiences];
                if (expandedExperienceIndex !== null && expandedExperienceIndex % 2 !== 0) {
                  const temp = displayExperiences[expandedExperienceIndex];
                  displayExperiences[expandedExperienceIndex] = displayExperiences[expandedExperienceIndex - 1];
                  displayExperiences[expandedExperienceIndex - 1] = temp;
                }

                return displayExperiences.map((exp, displayIndex) => {
                  const originalIndex = experiences.findIndex(e => e.company === exp.company);
                  const isExpanded = expandedExperienceIndex === originalIndex;
                  const hasDetails = 'details' in exp;

                  return (
                    <motion.div 
                      layout
                      key={exp.company}
                      className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 ${
                        isExpanded ? 'ring-2 ring-blue-500/50' : ''
                      }`}
                    >
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-blue-400 mb-1">{exp.position}</h3>
                          <p className="text-gray-300 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-2 md:mt-0">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{exp.location}</span>
                          </div>
                          {hasDetails && (
                            <button
                              onClick={() => toggleExperience(originalIndex)}
                              className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300 text-sm ml-2"
                            >
                              <span>{isExpanded ? 'Less' : 'More'}</span>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown size={16} />
                              </motion.div>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="space-y-2 text-gray-300 leading-relaxed mb-4">
                        <p>{exp.description}</p>
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
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-gray-700 grid md:grid-cols-3 gap-6">
                              {(exp as any).details.map((section: any, idx: number) => (
                                <div key={idx} className="space-y-2">
                                  <h4 className="text-sm font-semibold text-blue-400 mb-2">{section.section}:</h4>
                                  <ul className="space-y-2">
                                    {section.items.map((item: string, itemIdx: number) => (
                                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-300">
                                        <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
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
                      
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                });
              })()}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
          </motion.div>

          <LayoutGroup>
            <div className="grid md:grid-cols-2 gap-8">
              {(() => {
                // Create a copy of projects to potentially reorder
                const displayProjects = [...projects];
                
                // If an odd-indexed project (right side) is expanded, swap it with the previous one
                // so it starts on the left (and fills the row nicely)
                if (expandedProjectIndex !== null && expandedProjectIndex % 2 !== 0) {
                  const temp = displayProjects[expandedProjectIndex];
                  displayProjects[expandedProjectIndex] = displayProjects[expandedProjectIndex - 1];
                  displayProjects[expandedProjectIndex - 1] = temp;
                }

                return displayProjects.map((project, displayIndex) => {
                  // We need to find the original index to track state correctly
                  const originalIndex = projects.findIndex(p => p.title === project.title);
                  const isExpanded = expandedProjectIndex === originalIndex;
                  const hasDetailedWork = project.work && typeof project.work[0] === 'object' && 'section' in project.work[0];

                  return (
                    <motion.div 
                      layout
                      key={project.title} // Use title as key since index changes
                      className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors ${
                        isExpanded && hasDetailedWork ? 'md:col-span-2' : ''
                      }`}
                    >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-400 mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{project.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                        {hasDetailedWork && (
                          <button
                            onClick={() => toggleProject(originalIndex)}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300 text-sm"
                          >
                            <span>{isExpanded ? 'Less' : 'More'}</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown size={16} />
                            </motion.div>
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
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
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-4 border-t border-gray-700">
                          {/* My Work */}
                          {project.work && project.work.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-100 mb-4">My work:</h4>
                              {typeof project.work[0] === 'object' && 'section' in project.work[0] ? (
                                // Detailed format with sections (3-column layout)
                                <div className="grid md:grid-cols-3 gap-6">
                                  {(project.work as Array<{section: string, items: string[]}>).map((section, sectionIdx) => (
                                    <div key={sectionIdx} className="space-y-2">
                                      <h5 className="text-sm font-semibold text-blue-400 mb-2">{section.section}:</h5>
                                      <ul className="space-y-2">
                                        {section.items.map((item, itemIdx) => (
                                          <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                // Simple format (for other projects)
                                <ul className="space-y-1">
                                  {(project.work as string[]).map((work, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                      <span className="text-blue-400 mt-1">•</span>
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
      <section id="contact" className="py-20 px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded mb-8"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. 
              Whether you have a project in mind or just want to chat about technology, feel free to reach out!
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="/email"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} />
              Send Me an Email
            </a>
            <a
              href="https://www.linkedin.com/in/maxiao-ma-2162752b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-lg text-gray-300 font-semibold hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="https://github.com/PPAT132"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-lg text-gray-300 font-semibold hover:bg-gray-700 transition-all duration-300 hover:scale-105"
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
