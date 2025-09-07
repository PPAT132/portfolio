import { motion } from 'framer-motion';
import { GraduationCap, Code, BookOpen } from 'lucide-react';

interface AboutProps {
  setCurrentSection: (section: string) => void;
}

const About = ({ setCurrentSection }: AboutProps) => {
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Personal Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-gray-100">Education</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-400">University of Waterloo</h4>
                  <p className="text-gray-300">Bachelor of Computer Science (Co-op Program)</p>
                  <p className="text-gray-400 text-sm">2024-2029 • Average: 91.2</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-green-400" size={24} />
                <h3 className="text-xl font-semibold text-gray-100">Current Focus</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I work across the stack — React & Razor on the front end, C#/Python on the back end — 
                and I'm comfortable moving between product polish and system details.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Personal Story */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold text-gray-100">My Story</h3>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a second-year Computer Science student in Waterloo's Co-op program. I enjoy building 
                  small tools that have outsized leverage (automation, code-aware SEO, repo analyzers), 
                  and I learn new stacks quickly.
                </p>
                <p>
                  When I'm not coding, I'm usually iterating on side projects, reading about systems/infra, 
                  or exploring simple ML fine-tunes for real-world tasks.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">What I'm Looking For</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Full-stack development opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>AI/ML integration projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Product-focused engineering roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Co-op positions starting Fall 2025</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Skills Preview */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-100 mb-8">Quick Skills Overview</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'TypeScript', 'C#', 'Python', 'FastAPI', 'Docker', 'PyTorch', 'SQL'].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 hover:border-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
          <motion.button
            onClick={() => setCurrentSection('skills')}
            className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Skills
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
