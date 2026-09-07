import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { projects } from '../content/portfolio';
import { cn } from '../lib/cn';
import { promoteExpandedPair } from '../lib/expandLayout';
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
      className="border-t-2 border-border bg-background px-4 py-20"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div className="mb-16 text-center">
          <SectionHeading size="xl" className="mb-4">
            Project_Database
          </SectionHeading>
          <div className="mx-auto h-1 w-full max-w-md bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
        </motion.div>

        <LayoutGroup>
          <div className="grid gap-8 md:grid-cols-2">
            {promoteExpandedPair(projects, expandedIndex).map((project) => {
              const originalIndex = projects.indexOf(project);
              const isExpanded = expandedIndex === originalIndex;
              const work = project.work;
              const hasWork = work.length > 0;
              const hasWhyItMatters = Boolean(project.whyItMatters?.trim());
              const canExpand = hasWhyItMatters || hasWork;
              const sectionedWork = isSectionedProjectWork(work);

              return (
                <motion.div
                  layout
                  key={project.title}
                  className={isExpanded ? 'z-10 md:col-span-2' : undefined}
                >
                  <Card
                    variant={isExpanded ? 'accent' : 'inset'}
                    accent="purple"
                    className={cn(
                      'group h-full transition-all duration-300',
                      !isExpanded &&
                        'hover:-translate-y-1 hover:border-accent-purple hover:shadow-neo-sm',
                    )}
                  >
                    <div className="flex h-full flex-col p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3
                            className={cn(
                              'mb-2 text-xl font-bold uppercase tracking-wide transition-colors group-hover:text-accent-purple',
                              isExpanded
                                ? 'text-accent-purple'
                                : 'text-foreground',
                            )}
                          >
                            {project.title}
                          </h3>
                          <p className="mb-3 inline-block bg-background px-1 font-mono text-xs text-faint">
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
                              className="border border-line-soft bg-panel-strong p-2 text-muted transition-all hover:border-border hover:text-foreground"
                            >
                              <ExternalLink aria-hidden="true" size={18} />
                            </a>
                          )}
                          {canExpand && (
                            <button
                              type="button"
                              onClick={() => toggleProject(originalIndex)}
                              aria-expanded={isExpanded}
                              aria-label={`${isExpanded ? 'Close' : 'Show'} ${project.title} details`}
                              className={cn(
                                'flex h-8 w-8 items-center justify-center border transition-all',
                                isExpanded
                                  ? 'border-accent-purple bg-accent-purple text-background'
                                  : 'border-line-soft bg-transparent text-muted hover:border-border hover:text-foreground',
                              )}
                            >
                              <ChevronDown
                                aria-hidden="true"
                                size={18}
                                className={cn(
                                  'transition-transform duration-300',
                                  isExpanded && 'rotate-180',
                                )}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="mb-6 flex-grow border-l-2 border-panel-strong pl-4 font-sans text-sm leading-relaxed text-body transition-colors group-hover:border-accent-purple">
                        {project.description}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2 border-t border-panel-strong pt-4">
                        {project.tech.map((tech) => (
                          <Tag
                            key={tech}
                            variant="muted"
                            className="bg-background px-2 py-1 text-[10px]"
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
                            className="-mx-6 -mb-6 mt-6 overflow-hidden border-t border-accent-purple bg-background/50 px-6 pb-6 pt-6"
                          >
                            {hasWhyItMatters && (
                              <div className="mb-8">
                                <h4 className="mb-3 inline-block border-b border-panel-strong pb-2 text-xs font-bold uppercase tracking-widest text-accent-purple">
                                  /// Why_it_matters
                                </h4>
                                <p className="border-l-2 border-panel-strong pl-4 font-sans text-sm leading-relaxed text-body">
                                  {project.whyItMatters}
                                </p>
                              </div>
                            )}

                            {hasWork && (
                              <div>
                                <h4 className="mb-6 inline-block border-b border-panel-strong pb-2 text-xs font-bold uppercase tracking-widest text-accent-purple">
                                  /// Development_Log
                                </h4>
                                {sectionedWork ? (
                                  <div className="grid gap-8 md:grid-cols-3">
                                    {work.map((workSection) => (
                                      <div
                                        key={workSection.section}
                                        className="space-y-4"
                                      >
                                        <h5 className="border-l-4 border-accent-purple pl-3 text-sm font-bold text-foreground">
                                          {workSection.section}
                                        </h5>
                                        <ul className="space-y-3">
                                          {workSection.items.map((item) => (
                                            <li
                                              key={item}
                                              className="flex items-start gap-3 font-sans text-sm text-muted"
                                            >
                                              <span className="mt-1 flex-shrink-0 text-xs text-accent-purple">
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
                                        className="flex items-start gap-2 font-sans text-sm text-muted"
                                      >
                                        <span className="mt-1 text-accent-purple">
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
