import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { projects } from '../content/portfolio';
import { panelVariants } from '../lib/motion';
import { isSectionedProjectWork } from '../types/portfolio';

export const ProjectsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="projects"
      className="py-20 px-4 border-t-2 border-white bg-cyber-black"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div className="text-center mb-16">
          <SectionHeading className="text-4xl md:text-6xl mb-4 text-white">
            Project_Database
          </SectionHeading>
          <div className="w-full max-w-md mx-auto h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />
        </motion.div>

        <LayoutGroup>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const isExpanded = expandedIndex === index;
              const work = project.work;
              const hasWork = work.length > 0;
              const hasWhyItMatters = Boolean(project.whyItMatters?.trim());
              const canExpand = hasWhyItMatters || hasWork;
              const sectionedWork = isSectionedProjectWork(work);

              return (
                <motion.div
                  layout
                  key={project.title}
                  className={
                    isExpanded ? 'md:col-span-2 z-10' : undefined
                  }
                >
                  <Card
                    elevated={false}
                    surface={false}
                    className={`h-full bg-gray-900 border-gray-700 hover:border-cyber-purple transition-all duration-300 group ${
                      isExpanded
                        ? 'border-cyber-purple shadow-neo-purple'
                        : 'hover:-translate-y-1 hover:shadow-neo-sm'
                    }`}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3
                            className={`text-xl font-bold mb-2 uppercase tracking-wide group-hover:text-cyber-purple transition-colors ${
                              isExpanded
                                ? 'text-cyber-purple'
                                : 'text-white'
                            }`}
                          >
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
                              aria-label={`Open ${project.title}`}
                              className="text-gray-400 hover:text-white bg-gray-800 p-2 border border-gray-600 hover:border-white transition-all"
                            >
                              <ExternalLink aria-hidden="true" size={18} />
                            </a>
                          )}
                          {canExpand && (
                            <button
                              type="button"
                              onClick={() => toggleProject(index)}
                              aria-expanded={isExpanded}
                              aria-label={`${isExpanded ? 'Close' : 'Show'} ${project.title} details`}
                              className={`flex items-center justify-center w-8 h-8 border transition-all ${
                                isExpanded
                                  ? 'bg-cyber-purple border-cyber-purple text-black'
                                  : 'bg-transparent border-gray-600 text-gray-400 hover:border-white hover:text-white'
                              }`}
                            >
                              <ChevronDown
                                aria-hidden="true"
                                size={18}
                                className={`transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-6 text-sm font-sans flex-grow border-l-2 border-gray-800 pl-4 group-hover:border-cyber-purple transition-colors">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800">
                        {project.tech.map((tech) => (
                          <Tag
                            key={tech}
                            accent="purple"
                            className="px-2 py-1 bg-black border-gray-800 text-[10px] text-gray-400 font-normal group-hover:border-gray-600 transition-colors"
                          >
                            {tech}
                          </Tag>
                        ))}
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded && canExpand && (
                          <motion.div
                            key="details"
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={panelVariants}
                            className="overflow-hidden mt-6 pt-6 border-t border-cyber-purple bg-black/50 -mx-6 px-6 -mb-6 pb-6"
                          >
                            {hasWhyItMatters && (
                              <div className="mb-8">
                                <h4 className="text-xs font-bold text-cyber-purple mb-3 uppercase tracking-widest border-b border-gray-800 pb-2 inline-block">
                                  /// Why_it_matters
                                </h4>
                                <p className="text-sm text-gray-300 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                                  {project.whyItMatters}
                                </p>
                              </div>
                            )}

                            {hasWork && (
                              <div>
                                <h4 className="text-xs font-bold text-cyber-purple mb-6 uppercase tracking-widest border-b border-gray-800 pb-2 inline-block">
                                  /// Development_Log
                                </h4>
                                {sectionedWork ? (
                                  <div className="grid md:grid-cols-3 gap-8">
                                    {work.map((workSection) => (
                                      <div
                                        key={workSection.section}
                                        className="space-y-4"
                                      >
                                        <h5 className="text-sm font-bold text-white border-l-4 border-cyber-purple pl-3">
                                          {workSection.section}
                                        </h5>
                                        <ul className="space-y-3">
                                          {workSection.items.map((item) => (
                                            <li
                                              key={item}
                                              className="flex items-start gap-3 text-sm text-gray-400 font-sans"
                                            >
                                              <span className="text-cyber-purple mt-1 flex-shrink-0 text-xs">
                                                ■
                                              </span>
                                              <span>{item}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <ul className="space-y-2">
                                    {work.map((workItem) => (
                                      <li
                                        key={workItem}
                                        className="flex items-start gap-2 text-sm text-gray-400 font-sans"
                                      >
                                        <span className="text-cyber-purple mt-1">
                                          ■
                                        </span>
                                        <span>{workItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
