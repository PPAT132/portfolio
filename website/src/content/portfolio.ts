import {
  Briefcase,
  Code,
  FileText,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';

import type {
  Action,
  Experience,
  FloatingSocialLink,
  Project,
  SkillGroup,
  SocialLink,
} from '../types/portfolio';

export const floatingLinks = [
  {
    kind: 'external',
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/PPAT132',
    color: 'hover:text-cyber-gray',
    bgColor: 'bg-cyber-gray',
    borderColor: 'border-white',
  },
  {
    kind: 'external',
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/patrick-ma-2162752b3/',
    color: 'hover:text-cyber-blue',
    bgColor: 'bg-cyber-blue',
    borderColor: 'border-white',
  },
  {
    kind: 'download',
    icon: FileText,
    label: 'Résumé',
    url: '/Patrick-Ma-Resume.pdf',
    downloadName: 'Patrick-Ma-Resume.pdf',
    color: 'hover:text-cyber-green',
    bgColor: 'bg-cyber-green',
    borderColor: 'border-white',
  },
  {
    kind: 'internal',
    icon: Mail,
    label: 'Email',
    url: '/email',
    color: 'hover:text-cyber-pink',
    bgColor: 'bg-cyber-pink',
    borderColor: 'border-white',
  },
] satisfies readonly FloatingSocialLink[];

export const actions = [
  {
    icon: Code,
    label: 'View My Work',
    targetId: 'projects',
    bgColor: 'bg-cyber-purple',
    shadow: 'shadow-neo-purple',
  },
  {
    icon: Briefcase,
    label: 'Get In Touch',
    targetId: 'contact',
    bgColor: 'bg-cyber-blue',
    shadow: 'shadow-neo-blue',
  },
] satisfies readonly Action[];

export const experiences: readonly Experience[] = [
  {
    company: 'SparkLease',
    position: 'Full-Stack Developer Intern',
    period: 'May–Aug 2025',
    location: 'North York, Canada',
    description:
      'Worked as a full-stack engineer on a production-scale automotive marketplace, contributing to both customer-facing features and backend systems supporting 100,000+ annual users.',
    tech: ['Razor', 'ASP.NET MVC', 'C#', 'SQL', 'WebJob', 'SEO'],
    website: 'https://www.sparklease.com/',
    details: [
      {
        section: 'Frontend & Application Features',
        items: [
          'Rebuilt and modernized 8 core business pages, including the homepage, buy/sell car flows, listing pages, user profile pages etc.',
          'Implemented fully responsive designs with optimized layouts across desktop, tablet, and mobile devices.',
          'Developed substantial frontend JavaScript logic for vehicle search and filtering, handling complex condition combinations and coordinating with backend APIs.',
          'Implemented client-side features such as VIN number search, animated UI interactions, and dynamic API-driven content.',
        ],
      },
      {
        section: 'Backend & Data Systems',
        items: [
          'Developed and maintained backend services using ASP.NET Core MVC (C#) on Azure, supporting a high-traffic production environment.',
          'Integrated large-scale third-party vehicle data APIs into internal systems, storing and managing vehicle information in Microsoft SQL Server.',
          'Designed and maintained automated data ingestion pipelines using Azure WebJobs with daily and monthly update schedules, reducing redundant API calls and saving more than a thousand dollars per month in external API costs.',
          'Optimized existing vehicle search and filtering queries in SQL Server and introduced lazy loading, significantly improving search responsiveness without fully rewriting legacy logic.',
        ],
      },
      {
        section: 'Routing, Reachability & Platform Quality',
        items: [
          'Redesigned application-level URL structures to improve page reachability and search-engine friendliness.',
          'Implemented sitemap generation to improve crawlability and ensure consistent indexing of key platform pages.',
        ],
      },
    ],
  },
  {
    company: 'NanoInsights',
    position: 'Machine Learning Intern',
    period: 'Jun–Aug 2024',
    location: 'Beijing',
    description:
      'Built and trained GAN-style super-resolution models in PyTorch/TensorFlow for electron microscopy, created automated preprocessing pipeline.',
    tech: ['PyTorch', 'TensorFlow', 'GAN', 'Python'],
  },
  {
    company: 'WAT.ai (PianoFi)',
    position: 'Project Group Core Member',
    period: 'Sep 2025 – Present',
    location: 'Waterloo, Canada',
    description:
      'Core member of the PianoFi project team under WAT.ai. Developing an AI system to transcribe audio into highly playable, practical sheet music. Initially focused on AI Agent workflows, now transitioning to training proprietary models for superior performance and accuracy.',
    tech: [
      'AI Agents',
      'Model Training',
      'Music Transcription',
      'Python',
      'Deep Learning',
    ],
    website: 'https://www.pianofi.ca/',
  },
] as const;

export const projects: readonly Project[] = [
  {
    title: 'LACS Compiler',
    subtitle: 'Scala-like to MIPS Assembly Compiler',
    description:
      'Developed a fully functional compiler that translates LACS, a Scala-like teaching language, into executable MIPS assembly. The project covers the full compilation pipeline, from frontend analysis to backend code generation and a complete runtime system. Although the language itself was predefined, the work required a deep understanding of language semantics and execution models.',
    tech: ['Scala', 'MIPS Assembly', 'Compiler Construction'],
    link: 'https://lacscompiler.netlify.app/',
    whyItMatters:
      'Demonstrates deep understanding of language semantics, memory models (stack/heap), and low-level execution details like closures and garbage collection.',
    work: [
      {
        section: 'Compiler Frontend',
        items: [
          'Implemented a DFA-based maximal-munch scanner to tokenize source programs.',
          'Implemented multiple parsing strategies, including CYK and an experimental Earley parser, gaining practical experience with grammar ambiguity and parser trade-offs.',
          'Built a static type checker supporting functions, closures, and lexical scoping.',
          'Through scanner and parser construction, developed a solid understanding of practical language design principles and how language choices impact implementability.',
        ],
      },
      {
        section: 'Backend & Compilation Pipeline',
        items: [
          'Implemented backend lowering and code generation passes to translate typed programs into low-level MIPS assembly.',
          'Handled control flow, branching, and stack frame layout during code generation.',
          'Explicitly distinguished and implemented normal function calls versus closure calls based on frontend semantic information.',
          'Ensured that high-level language semantics were faithfully preserved in low-level generated code.',
        ],
      },
      {
        section: 'Runtime System',
        items: [
          'Designed and implemented an explicit stack and heap memory model.',
          'Implemented closure representations using code pointers and environment objects (static links).',
          'Built a semi-space copying garbage collector with precise root identification and pointer relocation.',
          'Implemented tail-call optimization to eliminate unnecessary stack growth while preserving semantics.',
        ],
      },
    ],
  },
  {
    title: 'ASCII Game Engine',
    subtitle: 'Reusable Game Engine Framework',
    description:
      'Designed and implemented a reusable C++ ASCII game engine following a clean MVC architecture. Built an extensible object-oriented framework using abstract interfaces, inheritance, and composition, with design patterns and RAII for safe memory management.',
    tech: [
      'C++',
      'Game Engine Construction',
      'Design Patterns',
      'RAII',
      'MVC Architecture',
    ],
    link: null,
    work: [
      {
        section: 'Engine Framework',
        items: [
          'Built an extensible object-oriented engine framework using abstract interfaces, inheritance, and composition.',
          'Applied design patterns and RAII for safe memory management.',
          'Designed a clean MVC architecture for separation of concerns.',
        ],
      },
      {
        section: 'Core Systems',
        items: [
          'Engineered a core entity and physics system supporting collision detection.',
          'Implemented fixed-point sub-pixel movement for smooth gameplay.',
          'Built a camera-based world view system.',
          'Created infinite maps with procedural generation capabilities.',
        ],
      },
      {
        section: 'Validation & Extensibility',
        items: [
          'Validated engine functionality and extensibility by developing multiple demo games on top of the engine.',
          'Implemented an independent game AI system on top of the engine for a Mario-like 2D platformer.',
          'Enabled an autonomous agent to play the game end-to-end by perceiving game state and executing actions without human input.',
          'Served as a practical validation of engine usability and extensibility.',
        ],
      },
    ],
  },
  {
    title: 'SEO Agent',
    subtitle: 'AI-Powered Repository Analyzer & VS Code Extension',
    description:
      'An intelligent AI agent that analyzes repositories to identify SEO optimization opportunities. Built custom chunker and parser algorithms to reduce AI API costs while maintaining accuracy. Features repository traversal, issue pinpointing to exact files/lines, and automated fix suggestions.',
    tech: [
      'FastAPI',
      'Docker',
      'React/Vite',
      'VS Code Extension APIs',
      'Gemini API',
      'Python',
    ],
    link: 'https://github.com/PPAT132/SEOAgent',
    whyItMatters:
      'Speeds up SEO hygiene for codebases that use templating (Razor/React).',
    work: [
      'Backend: FastAPI service with CORS configured for a Vite frontend; containerized with Docker for consistent local and CI runs.',
      'Dev UX: shell script to build & launch services and probe a health endpoint for quick feedback.',
      'Repo-aware processing and tool/function calling (crawl, patch, validate).',
    ],
  },
  {
    title: 'iGEM Wiki',
    subtitle: 'Biology-Robotics Integration Project Website',
    description:
      'Led a 4-member subteam to design and develop a comprehensive Wiki website showcasing achievements in the iGEM competition. Built with HTML, CSS, and JavaScript, featuring interactive animations and optimized navigation. As team leader, supervised 21-member interdisciplinary team and organized laboratory experiments.',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Team Leadership',
      'Project Management',
    ],
    link: 'https://2023.igem.wiki/bfsu-icunited/index.html',
    whyItMatters:
      'Showcases leadership skills and ability to coordinate interdisciplinary teams while delivering technical solutions.',
    work: [
      'Led 4-member subteam to design and develop comprehensive Wiki website.',
      'Supervised 21-member interdisciplinary team and organized laboratory experiments.',
      'Built interactive animations and optimized navigation for better user experience.',
    ],
  },
  {
    title: 'Super-Resolution AI',
    subtitle: 'Microscopy Image Enhancement Models',
    description:
      'Developed RCAN and U-Net CNN models for microscopy image super-resolution using PyTorch. Expanded dataset from 10,000 to 10 million samples through data augmentation techniques. Achieved 23% improvement in image resolution compared to original low-resolution images.',
    tech: [
      'PyTorch',
      'CNN',
      'U-Net',
      'RCAN',
      'Data Augmentation',
      'Image Processing',
    ],
    link: null,
    whyItMatters:
      'Demonstrates expertise in deep learning, computer vision, and data augmentation techniques.',
    work: [
      'Developed RCAN and U-Net CNN models for microscopy image super-resolution.',
      'Expanded dataset from 10,000 to 10 million samples through data augmentation.',
      'Achieved 23% improvement in image resolution compared to original low-resolution images.',
    ],
  },
] as const;

export const skillGroups = [
  {
    label: '[ Languages ]',
    accent: 'cyan',
    skills: [
      'Python',
      'Java',
      'C',
      'C++',
      'C#',
      'JavaScript',
      'TypeScript',
      'Racket',
      'Haskell',
    ],
  },
  {
    label: '[ Web_Stack ]',
    accent: 'green',
    skills: ['Razor', 'React', 'Node.js', 'SQL', '.NET', 'FastAPI', 'Docker'],
  },
  {
    label: '[ AI / ML ]',
    accent: 'purple',
    skills: [
      'PyTorch',
      'TensorFlow',
      'CNN',
      'GAN',
      'Fine-tuning',
      'Model Training',
    ],
  },
  {
    label: '[ Tools / APIs ]',
    accent: 'yellow',
    skills: [
      'OpenAI API',
      'Google AI API',
      'VSCE',
      'AI Agents',
      'Automation',
    ],
  },
] satisfies readonly SkillGroup[];

export const contactLinks = [
  {
    kind: 'internal',
    icon: Mail,
    label: 'Send Email',
    url: '/email',
  },
  {
    kind: 'external',
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/patrick-ma-2162752b3/',
  },
  {
    kind: 'external',
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/PPAT132',
  },
] satisfies readonly SocialLink[];
