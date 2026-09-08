import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { KineticGeometry } from '../components/KineticGeometry';
import { KineticGutter } from '../components/KineticGutter';
import { buttonStyles } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { projects } from '../content/portfolio';
import { cn } from '../lib/cn';
import { promoteExpanded } from '../lib/expandLayout';
import { expandRootFrom, pinScrollDuring } from '../lib/keepScroll';
import { panelVariants } from '../lib/motion';
import { isSectionedProjectWork } from '../types/portfolio';

export const ProjectsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleProject = (index: number, target: EventTarget | null) => {
    pinScrollDuring(expandRootFrom(target), () => {
      setExpandedIndex((current) => (current === index ? null : index));
    });
  };

  return (
    <section
      id="projects"
      className="expand-stable relative border-t-4 border-black bg-inset px-4 py-20"
    >
      <KineticGutter
        content="wide"
        left={
          <KineticGeometry
            motif="resonance"
            className="kinetic-fit-orbits right-0 top-[42%] opacity-80"
          />
        }
      />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <motion.div className="mb-16 text-center">
          <div className="relative inline-block">
            <SectionHeading
              variant="boxed"
              size="xl"
              className="mb-4 inline-block"
            >
              Project_Database
            </SectionHeading>
            <KineticGeometry
              motif="trefoil"
              className="left-full top-1/2 ml-7 hidden -translate-y-1/2 opacity-80 lg:block"
            />
          </div>
          <div className="mx-auto h-3 w-full max-w-md -skew-x-12 bg-navy" />
        </motion.div>

        <div
          data-expand-pin
          className="grid items-start gap-8 md:grid-cols-2"
        >
          {promoteExpanded(projects, expandedIndex).map(
            ({ item: project, originalIndex }) => {
              const isExpanded = expandedIndex === originalIndex;
              const work = project.work;
              const hasWork = work.length > 0;
              const hasWhyItMatters = Boolean(project.whyItMatters?.trim());
              const canExpand = hasWhyItMatters || hasWork;
              const sectionedWork = isSectionedProjectWork(work);

              return (
                <div
                  key={project.title}
                  className={cn(
                    'expand-stable min-w-0',
                    isExpanded && 'md:col-span-2',
                  )}
                >
                    <Card
                      variant={isExpanded ? 'accent' : 'raised'}
                      accent="purple"
                      className="group transition-colors duration-300"
                    >
                      <div className="flex flex-col p-6">
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
                            <p className="mb-3 font-mono text-xs font-bold text-navy">
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
                                className={buttonStyles({
                                  variant: 'outline',
                                  size: 'sm',
                                  className: 'min-h-0 p-2',
                                })}
                              >
                                <ExternalLink aria-hidden="true" size={18} />
                              </a>
                            )}
                            {canExpand && (
                              <button
                                type="button"
                                onClick={(event) =>
                                  toggleProject(
                                    originalIndex,
                                    event.currentTarget,
                                  )
                                }
                                aria-expanded={isExpanded}
                                aria-label={`${isExpanded ? 'Close' : 'Show'} ${project.title} details`}
                                className={buttonStyles({
                                  variant: isExpanded ? 'primary' : 'outline',
                                  size: 'sm',
                                  className: 'min-h-0 p-2',
                                })}
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

                        <p className="mb-6 flex-grow border-l-2 border-line pl-4 font-sans text-sm leading-relaxed text-body">
                          {project.description}
                        </p>

                        <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-4">
                          {project.tech.map((tech) => (
                            <Tag key={tech} variant="muted">
                              {tech}
                            </Tag>
                          ))}
                        </div>

                      </div>

                      {canExpand && (
                        <motion.div
                          initial={false}
                          animate={isExpanded ? 'expanded' : 'collapsed'}
                          variants={panelVariants}
                          className="grid overflow-hidden"
                          aria-hidden={!isExpanded}
                          inert={!isExpanded}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="border-t border-accent-purple bg-background/50 px-6 pb-6 pt-6">
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
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};
