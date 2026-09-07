import { motion } from 'framer-motion';
import { BookOpen, Code, GraduationCap } from 'lucide-react';

import { Card } from '../components/ui/Card';
import { ExpandablePanel } from '../components/ui/ExpandablePanel';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { skillGroups } from '../content/portfolio';
import { accentText } from '../lib/accent';
import { cn } from '../lib/cn';
import {
  containerVariants,
  itemVariants,
  sectionVariants,
} from '../lib/motion';

export const AboutSection = () => (
  <section
    id="about"
    className="border-t-2 border-border bg-background px-4 py-20"
  >
    <motion.div
      className="mx-auto max-w-4xl"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="relative mb-16 text-center">
        <SectionHeading size="xl" className="mb-4">
          About_Me
        </SectionHeading>
        <div className="absolute bottom-0 left-0 h-2 w-full -skew-x-12 bg-accent-cyan opacity-50" />
      </motion.div>

      <motion.div className="space-y-12" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Card
            variant="flat"
            className="p-6 shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            <div className="mb-6 flex items-center gap-3 border-b-2 border-dashed border-line pb-4">
              <GraduationCap
                aria-hidden="true"
                className="text-accent-cyan"
                size={28}
              />
              <SectionHeading as="h3" className="tracking-normal">
                Education
              </SectionHeading>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="border-l-4 border-accent-cyan pl-4">
                <h4 className="text-lg font-bold text-foreground">
                  University of Waterloo
                </h4>
                <p className="mt-1 font-mono text-accent-cyan">
                  Bachelor of Computer Science (Co-op)
                </p>
                <p className="mt-2 text-sm text-muted">
                  2024-2029 • Average: 92
                </p>
              </div>
              <div className="border-l-4 border-accent-purple pl-4">
                <h4 className="text-lg font-bold text-foreground">
                  Beijing Chenjinglun Middle School
                </h4>
                <p className="mt-1 font-mono text-accent-purple">
                  High School Diploma
                </p>
                <p className="mt-2 text-sm text-muted">
                  2021-2024 • Academic Excellence
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ExpandablePanel
            title={
              <span className="flex items-center gap-3">
                <Code
                  aria-hidden="true"
                  className="text-accent-green"
                  size={28}
                />
                <span className="text-2xl">Current_Focus</span>
              </span>
            }
            collapsedLabel="EXPAND"
            expandedLabel="COLLAPSE"
            variant="raised"
            headerTone="background"
            contentTone="inset"
            buttonClassName="p-6 hover:bg-background"
            previewClassName="bg-background p-6 pt-0"
            contentClassName="space-y-6 p-6"
            preview={
              <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="border border-line bg-panel/50 p-3">
                  <p className="mb-1 font-bold text-foreground">
                    📐 Core Foundations
                  </p>
                  <p className="text-sm text-muted">
                    Advancing math & CS fundamentals.
                  </p>
                </div>
                <div className="border border-line bg-panel/50 p-3">
                  <p className="mb-1 font-bold text-foreground">🖥️ Full-Stack</p>
                  <p className="text-sm text-muted">
                    Architecture & core principles.
                  </p>
                </div>
                <div className="border border-line bg-panel/50 p-3">
                  <p className="mb-1 font-bold text-foreground">
                    🤖 AI Fine-Tuning
                  </p>
                  <p className="text-sm text-muted">
                    Adapting models for specific tasks.
                  </p>
                </div>
                <div className="border border-line bg-panel/50 p-3">
                  <p className="mb-1 font-bold text-foreground">🧩 AI Agents</p>
                  <p className="text-sm text-muted">
                    Building usable AI tools.
                  </p>
                </div>
              </div>
            }
          >
            <p className="border-l-2 border-accent-yellow pl-3 font-mono text-foreground">
              // DEEP DIVE INTO CURRENT STATUS
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 font-bold uppercase tracking-wide text-accent-green">
                  [ Foundation ]
                </h4>
                <p className="font-sans text-sm leading-relaxed text-body">
                  Continuing to build a solid base in mathematics and computer
                  science fundamentals. I see these as the pillars that ensure
                  long-term growth and the ability to understand advanced
                  concepts in depth.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-bold uppercase tracking-wide text-accent-green">
                  [ Development ]
                </h4>
                <p className="font-sans text-sm leading-relaxed text-body">
                  Maintaining proficiency across front-end and back-end
                  development. While AI can handle many details, I believe
                  understanding architecture, algorithms, and system design
                  remains essential.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-bold uppercase tracking-wide text-accent-green">
                  [ AI Exploration ]
                </h4>
                <p className="mb-3 font-sans text-sm leading-relaxed text-body">
                  Applying and experimenting with AI in concrete ways. I am
                  especially interested in:
                </p>
                <div className="ml-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 font-bold text-accent-green">::</span>
                    <div>
                      <span className="text-sm font-bold text-foreground">
                        AI Fine-Tuning
                      </span>
                      <p className="mt-1 text-sm text-muted">
                        Working with models at a scale I can handle, improving
                        them for specific tasks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 font-bold text-accent-green">::</span>
                    <div>
                      <span className="text-sm font-bold text-foreground">
                        AI Agents
                      </span>
                      <p className="mt-1 text-sm text-muted">
                        Designing agents that compensate for the limitations of
                        models, turning raw capability into usable tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ExpandablePanel>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ExpandablePanel
            title={
              <span className="flex items-center gap-3">
                <BookOpen
                  aria-hidden="true"
                  className="text-accent-purple"
                  size={28}
                />
                <span className="text-2xl">My_Story.txt</span>
              </span>
            }
            collapsedLabel="READ"
            expandedLabel="COLLAPSE"
            variant="raised"
            headerTone="background"
            contentTone="inset"
            buttonClassName="p-6 hover:bg-background"
            previewClassName="bg-panel/30 p-6"
            contentClassName="space-y-4 p-6 font-sans text-sm leading-relaxed text-body"
            preview={
              <p className="font-sans leading-relaxed text-body">
                I am a second-year Computer Science student at the University of
                Waterloo. I value strong theoretical foundations in
                mathematics, while also thriving in high-pressure, hands-on
                environments shaped by my background in physics competitions.
                My approach is to master the fundamentals of computer science
                and let AI handle what it does best—its vast knowledge and rapid
                implementation.
              </p>
            }
          >
            <p>
              Earlier in my education, I was a physics competition student
              (CPhO). That experience trained me to learn and think under high
              pressure and at a high level of difficulty. It also taught me that
              in complex systems, theory alone is often insufficient, and
              experiments or practice provide more realistic answers. At the
              same time, I came to appreciate the reassurance offered by
              mathematical models. This combination shaped the way I learn
              today—valuing fundamental principles while also enjoying the
              process of hands-on experimentation and iteration.
            </p>
            <p>
              In computer science, my philosophy is: master the fundamentals and
              leverage AI. I actively study full-stack development because it is
              a core skillset of the field—understanding algorithms, knowing
              languages, being able to write and read code are all necessary to
              keep growing. But I also clearly recognize that AI now holds an
              immense knowledge base and, in many aspects of implementation, can
              work faster, more broadly, and more accurately than humans. My
              focus is on grasping the essential foundations while relying on AI
              to make my development work more efficient and precise.
            </p>
            <p>
              At the same time, I am passionate about exploring AI. I see that
              while models themselves are powerful, they also have
              limitations—and these limitations can often be addressed through
              the design of AI Agents. To me, models are like steam engines:
              sources of power. Agents are the machines that harness that power,
              transforming it into real applications. Compared to 200 years ago,
              this time the replacement is not physical labor but aspects of
              mental work. I believe AI Agents will become the norm, and I am
              eager to keep experimenting in this area—whether through
              small-scale fine-tuning or building experimental agents that bring
              AI's capabilities into concrete scenarios.
            </p>
            <p>
              Looking forward, I aim to continue growing at the intersection of
              mathematics and theory, the fundamentals of full-stack
              development, and the exploration of AI applications. My goal is to
              transform more ideas into tools and products that genuinely solve
              problems.
            </p>
          </ExpandablePanel>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            variant="flat"
            className="p-6 shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            <div className="mb-8 flex items-center gap-3 border-b-2 border-dashed border-line pb-4">
              <Code
                aria-hidden="true"
                className="text-accent-cyan"
                size={28}
              />
              <SectionHeading as="h3" className="tracking-normal">
                System_Capabilities
              </SectionHeading>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <h4
                    className={cn(
                      'mb-4 text-sm font-bold uppercase tracking-wider',
                      accentText[group.accent],
                    )}
                  >
                    {group.label}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <Tag
                        key={skill}
                        accent={group.accent}
                        variant="fillable"
                      >
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);
