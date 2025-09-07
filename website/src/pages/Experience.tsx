import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface ExperienceProps {
  setCurrentSection: (section: string) => void;
}

const Experience = ({ setCurrentSection }: ExperienceProps) => {
  const experiences = [
    {
      company: 'SparkLease',
      position: 'Full-Stack Developer Intern',
      period: 'May 2025 — Aug 2025',
      location: 'North York, Canada',
      website: 'https://www.sparklease.com/',
      achievements: [
        'Rebuilt PC & mobile frontends with Razor (ASP.NET MVC) — 8 key pages + 10+ supporting pages, with responsiveness and UX improvements.',
        'Drove SEO optimization (URL structure, metadata), contributing to higher crawlability and a +20% click-through rate (CTR).',
        'Designed C# + SQL workflows for vehicle-trim selection, MSRP logic, and reliable frontend integration.',
        'Automated daily/monthly maintenance (missing-image checks, data refresh) via WebJob.'
      ]
    },
    {
      company: 'NanoInsights',
      position: 'Machine Learning Intern',
      period: 'Jun 2024 — Aug 2024',
      location: 'Beijing, China',
      website: 'https://www.naxi-tech.com/',
      achievements: [
        'Built and trained GAN-style super-resolution models in PyTorch/TensorFlow (electron microscopy).',
        'Created an automated preprocessing pipeline (segmentation/normalization/augmentation) to boost data quality.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
            Experience
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded"></div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-700"></div>
              )}
              
              <div className="flex gap-6">
                {/* Timeline Dot */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Briefcase className="text-white" size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">{exp.position}</h3>
                      <h4 className="text-lg text-blue-400 font-medium">{exp.company}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-2 md:mt-0">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                    {exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>Website</span>
                      </a>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-gray-400 mb-6">Want more detail? See resume.</p>
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

export default Experience;
