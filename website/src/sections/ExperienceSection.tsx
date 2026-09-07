import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Calendar, ChevronDown, ExternalLink, MapPin } from 'lucide-react';
import { useState } from 'react';

import { buttonStyles } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { experiences } from '../content/portfolio';
import { cn } from '../lib/cn';
import { panelVariants } from '../lib/motion';

export const ExperienceSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExperience = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="experience"
      className="relative border-t-4 border-black bg-grid px-4 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div className="relative z-10 mb-16 text-center">
          <SectionHeading
            variant="framed"
            size="xl"
            className="mb-4 inline-block -rotate-1"
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
                    variant={isExpanded ? 'accent' : 'raised'}
                    accent="cyan"
                    className="transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="mb-1 text-xl font-bold uppercase tracking-wide text-accent-cyan">
                            {experience.position}
                          </h3>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-foreground">
                              {experience.company}
                            </p>
                            {experience.website && (
                              <a
                                href={experience.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${experience.company} website`}
                                className="text-faint transition-colors hover:text-foreground"
                              >
                                <ExternalLink aria-hidden="true" size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 font-mono text-xs text-muted">
                          <div className="flex items-center gap-2 border border-line bg-panel px-2 py-1">
                            <Calendar aria-hidden="true" size={12} />
                            <span>{experience.period}</span>
                          </div>
                          <div className="flex items-center gap-2 border border-line bg-panel px-2 py-1">
                            <MapPin aria-hidden="true" size={12} />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 space-y-2 border-l-2 border-line pl-4 font-sans text-sm leading-relaxed text-body">
                        <p>{experience.description}</p>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div className="flex flex-wrap gap-2">
                          {experience.tech.map((tech) => (
                            <Tag
                              key={tech}
                              variant="muted"
                              className="px-2 py-0.5 text-[10px]"
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
                              className: 'min-h-0 px-3 py-1',
                            })}
                          >
                            <span>{isExpanded ? 'CLOSE' : 'DETAILS'}</span>
                            <ChevronDown
                              aria-hidden="true"
                              size={14}
                              className={cn(
                                'transition-transform duration-300',
                                isExpanded && 'rotate-180',
                              )}
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
                          className="overflow-hidden border-t-2 border-dashed border-line bg-panel"
                        >
                          <div className="grid gap-8 p-6 md:grid-cols-3">
                            {details.map((detail) => (
                              <div key={detail.section} className="space-y-3">
                                <h4 className="border-b border-line pb-2 text-xs font-bold uppercase tracking-widest text-accent-cyan">
                                  {detail.section}
                                </h4>
                                <ul className="space-y-2">
                                  {detail.items.map((item) => (
                                    <li
                                      key={item}
                                      className="flex items-start gap-2 font-sans text-xs leading-relaxed text-body"
                                    >
                                      <span className="mt-1 flex-shrink-0 text-accent-cyan">
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
