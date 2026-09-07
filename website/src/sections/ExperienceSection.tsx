import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Calendar, ChevronDown, ExternalLink, MapPin } from 'lucide-react';
import { useState } from 'react';

import { buttonStyles } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { experiences } from '../content/portfolio';
import { panelVariants } from '../lib/motion';

export const ExperienceSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExperience = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="experience"
      className="py-20 px-4 border-t-2 border-white bg-grid relative"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-16 relative z-10">
          <SectionHeading
            variant="boxed"
            className="inline-block text-4xl md:text-6xl mb-4 text-white bg-cyber-black px-4 border-cyber-blue shadow-neo-blue transform -rotate-1"
          >
            Experience_Log
          </SectionHeading>
        </motion.div>

        <LayoutGroup>
          <div className="space-y-8">
            {experiences.map((experience, index) => {
              const isExpanded = expandedIndex === index;
              const details = experience.details;

              return (
                <motion.div layout key={experience.company}>
                  <Card
                    elevated={false}
                    surface={false}
                    className={`bg-cyber-black border-gray-600 hover:border-white transition-all duration-300 ${
                      isExpanded
                        ? 'border-cyber-blue shadow-neo-blue'
                        : 'hover:shadow-neo'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-cyber-blue mb-1 uppercase tracking-wide">
                            {experience.position}
                          </h3>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-bold text-lg">
                              {experience.company}
                            </p>
                            {experience.website && (
                              <a
                                href={experience.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${experience.company} website`}
                                className="text-gray-500 hover:text-white transition-colors"
                              >
                                <ExternalLink aria-hidden="true" size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-xs font-mono text-gray-400">
                          <div className="flex items-center gap-2 bg-gray-900 px-2 py-1 border border-gray-700">
                            <Calendar aria-hidden="true" size={12} />
                            <span>{experience.period}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-900 px-2 py-1 border border-gray-700">
                            <MapPin aria-hidden="true" size={12} />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-gray-300 leading-relaxed mb-6 font-sans text-sm border-l-2 border-gray-700 pl-4">
                        <p>{experience.description}</p>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="flex flex-wrap gap-2">
                          {experience.tech.map((tech) => (
                            <Tag
                              key={tech}
                              accent="cyan"
                              className="px-2 py-0.5 bg-gray-900 border-gray-700 text-[10px] text-gray-400 font-normal"
                            >
                              {tech}
                            </Tag>
                          ))}
                        </div>

                        {details && (
                          <button
                            type="button"
                            onClick={() => toggleExperience(index)}
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? 'Close' : 'Show'} ${experience.company} experience details`}
                            className={buttonStyles({
                              variant: isExpanded ? 'primary' : 'outline',
                              size: 'sm',
                              className: `min-h-0 px-3 py-1 ${
                                isExpanded
                                  ? 'bg-cyber-blue text-black border-cyber-blue'
                                  : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                              }`,
                            })}
                          >
                            <span>{isExpanded ? 'CLOSE' : 'DETAILS'}</span>
                            <ChevronDown
                              aria-hidden="true"
                              size={14}
                              className={`transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && details && (
                        <motion.div
                          key="details"
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          variants={panelVariants}
                          className="overflow-hidden bg-gray-900 border-t-2 border-dashed border-gray-700"
                        >
                          <div className="p-6 grid md:grid-cols-3 gap-8">
                            {details.map((detail) => (
                              <div key={detail.section} className="space-y-3">
                                <h4 className="text-xs font-bold text-cyber-blue uppercase tracking-widest border-b border-gray-700 pb-2">
                                  {detail.section}
                                </h4>
                                <ul className="space-y-2">
                                  {detail.items.map((item) => (
                                    <li
                                      key={item}
                                      className="flex items-start gap-2 text-xs text-gray-300 font-sans leading-relaxed"
                                    >
                                      <span className="text-cyber-blue mt-1 flex-shrink-0">
                                        »
                                      </span>
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
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
};
