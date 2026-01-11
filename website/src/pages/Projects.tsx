import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Globe, Gamepad2, Cpu } from 'lucide-react';

interface ProjectsProps {
  setCurrentSection: (section: string) => void;
}

const Projects = ({ setCurrentSection }: ProjectsProps) => {
  const projects = [
    {
      title: 'LACS Compiler',
      subtitle: 'Scala-like to MIPS Assembly Compiler',
      period: 'Sep 2025 – Dec 2025',
      description: 'Developed a fully functional compiler that translates LACS, a Scala-like teaching language, into executable MIPS assembly. The project covers the full compilation pipeline, from frontend analysis to backend code generation and a complete runtime system.',
      work: [
        'Compiler Frontend: Implemented DFA-based scanner, CYK parser, and static type checker supporting closures and lexical scoping.',
        'Backend: Implemented lowering to MIPS assembly, handling control flow, stack frames, and distinguishing normal vs. closure calls.',
        'Runtime System: Built an explicit stack/heap model, closure representation (environment objects), and a semi-space copying garbage collector.',
        'Optimization: Implemented tail-call optimization to eliminate unnecessary stack growth.'
      ],
      stack: ['Scala', 'MIPS Assembly', 'Compiler Construction', 'Garbage Collection'],
      links: {
        code: '#', // Placeholder
        demo: 'https://lacscompiler.netlify.app/',
        setup: '#'
      },
      icon: Cpu,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'SEO Agent',
      subtitle: 'AI-Powered Website Optimizer (VS Code Extension)',
      period: '2025–Present',
      description: 'A repository-aware tool that runs audits, pinpoints issues to exact files/lines, previews HTML/CSS/metadata patches, and applies verified fixes with review gates and rollback.',
      work: [
        'Backend: FastAPI service with CORS configured for a Vite frontend; containerized with Docker for consistent local and CI runs.',
        'Dev UX: shell script to build & launch services and probe a health endpoint for quick feedback.',
        'Repo-aware processing and tool/function calling (crawl, patch, validate).'
      ],
      stack: ['FastAPI', 'Docker', 'React/Vite', 'VS Code Extension APIs'],
      links: {
        code: '#', // Placeholder
        demo: '#', // Placeholder
        setup: '#' // Placeholder
      },
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Tank Battles',
      subtitle: 'Browser Game (p5.js)',
      period: '2024',
      description: 'A top-down tank game with enemy spawns, bullets, obstacles, sounds, scoring, and a start screen.',
      work: [
        'Game mechanics: Timers, spawn logic, collision, input, and state management.',
        'Interactive UI: Start button, audio controls, scoring system.',
        'Responsive design: Works across different screen sizes.'
      ],
      stack: ['JavaScript (p5.js)', 'HTML/CSS'],
      links: {
        code: '#', // Placeholder
        demo: '#', // Placeholder
        setup: '#'
      },
      icon: Gamepad2,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Portfolio',
      subtitle: 'Personal Website',
      period: '2025',
      description: 'A living space for experience, projects, and contact. Repo scaffold exists and is under active development.',
      work: [
        'Modern React with TypeScript and Vite for fast development.',
        'Responsive design with Tailwind CSS for mobile and desktop.',
        'Smooth animations with Framer Motion.',
        'Clean, accessible UI with dark theme.'
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      links: {
        code: 'https://github.com/PPAT132/portfolio',
        demo: '#', // Placeholder
        setup: '#'
      },
      icon: Globe,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                    <project.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.subtitle}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">{project.period}</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

              {/* My Work */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-100 mb-2">My work:</h4>
                <ul className="space-y-1">
                  {project.work.map((work, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-100 mb-2">Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.links.code !== '#' && (
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                )}
                {project.links.demo !== '#' && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Demo</span>
                  </a>
                )}
                {project.links.setup !== '#' && (
                  <a
                    href={project.links.setup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Code size={16} />
                    <span>Setup</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-gray-400 mb-6">Interested in working together?</p>
          <motion.button
            onClick={() => setCurrentSection('contact')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
