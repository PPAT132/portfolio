import { motion } from 'framer-motion';
import { Code, Database, Brain, Settings } from 'lucide-react';

interface SkillsProps {
  setCurrentSection: (section: string) => void;
}

const Skills = ({ setCurrentSection }: SkillsProps) => {
  const skillCategories = [
    {
      title: 'Languages & Frontend',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'React', level: 88 },
        { name: 'Razor', level: 80 },
        { name: 'HTML/CSS', level: 92 }
      ]
    },
    {
      title: 'Backend & Infrastructure',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'C#', level: 85 },
        { name: 'Python', level: 88 },
        { name: 'Java', level: 80 },
        { name: 'C++', level: 75 },
        { name: 'SQL', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'FastAPI', level: 82 },
        { name: 'Docker', level: 78 },
        { name: 'Linux', level: 85 }
      ]
    },
    {
      title: 'AI/ML',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PyTorch', level: 85 },
        { name: 'TensorFlow', level: 80 },
        { name: 'CNN', level: 82 },
        { name: 'GAN', level: 78 },
        { name: 'Fine-tuning', level: 75 }
      ]
    },
    {
      title: 'Practices & Tools',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Component-driven UIs', level: 88 },
        { name: 'API-first design', level: 85 },
        { name: 'Repo-aware automation', level: 82 },
        { name: 'SEO hygiene', level: 85 },
        { name: 'Git', level: 90 },
        { name: 'CI/CD', level: 75 }
      ]
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
        duration: 0.6,
        ease: "easeOut"
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
            Skills
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <category.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-100">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-100 mb-8 text-center">Highlights & Talking Points</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Full-stack rebuilds</h3>
              <p className="text-gray-300 text-sm">
                Comfortable owning a page from layout & accessibility to controller & data model.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-green-400 mb-3">SEO + DevEx</h3>
              <p className="text-gray-300 text-sm">
                I like building scripts/tooling that make the right thing the easy thing (e.g., one-command env up, health checks).
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Game mechanics in JS</h3>
              <p className="text-gray-300 text-sm">
                Timers, spawn logic, collision, input, and state management (p5.js).
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to work together?</p>
          <motion.button
            onClick={() => setCurrentSection('contact')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;
