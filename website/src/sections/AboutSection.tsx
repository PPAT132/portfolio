import { motion } from 'framer-motion';
import { BookOpen, Code, GraduationCap } from 'lucide-react';

import { Card } from '../components/ui/Card';
import { ExpandablePanel } from '../components/ui/ExpandablePanel';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { skillGroups } from '../content/portfolio';
import {
  containerVariants,
  itemVariants,
  sectionVariants,
} from '../lib/motion';
import type { Accent } from '../types/portfolio';

const headingColors: Record<Accent, string> = {
  cyan: 'text-cyber-blue',
  purple: 'text-cyber-purple',
  green: 'text-cyber-green',
  pink: 'text-cyber-pink',
  yellow: 'text-cyber-yellow',
};

export const AboutSection = () => (
  <section
    id="about"
    className="py-20 px-4 border-t-2 border-white bg-cyber-black"
  >
    <motion.div
      className="max-w-4xl mx-auto"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-16 relative">
        <SectionHeading className="text-4xl md:text-6xl mb-4 text-white">
          About_Me
        </SectionHeading>
        <div className="w-full h-2 bg-cyber-blue absolute left-0 bottom-0 transform -skew-x-12 opacity-50" />
      </motion.div>

      <motion.div className="space-y-12" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Card
            surface={false}
            className="bg-cyber-black p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <div className="flex items-center gap-3 mb-6 border-b-2 border-dashed border-gray-700 pb-4">
              <GraduationCap
                aria-hidden="true"
                className="text-cyber-blue"
                size={28}
              />
              <SectionHeading
                as="h3"
                className="text-2xl text-white tracking-normal"
              >
                Education
              </SectionHeading>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="border-l-4 border-cyber-blue pl-4">
                <h4 className="font-bold text-lg text-white">
                  University of Waterloo
                </h4>
                <p className="text-cyber-blue font-mono mt-1">
                  Bachelor of Computer Science (Co-op)
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  2024-2029 • Average: 92
                </p>
              </div>
              <div className="border-l-4 border-cyber-purple pl-4">
                <h4 className="font-bold text-lg text-white">
                  Beijing Chenjinglun Middle School
                </h4>
                <p className="text-cyber-purple font-mono mt-1">
                  High School Diploma
                </p>
                <p className="text-gray-400 text-sm mt-2">
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
                  className="text-cyber-green"
                  size={28}
                />
                <span className="text-2xl">Current_Focus</span>
              </span>
            }
            collapsedLabel="EXPAND"
            expandedLabel="COLLAPSE"
            headerTone="background"
            className="bg-cyber-black shadow-neo"
            buttonClassName="p-6 hover:bg-cyber-black"
            previewClassName="p-6 pt-0 bg-cyber-black"
            contentClassName="p-6 space-y-6 border-gray-700 bg-gray-900"
            preview={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-900/50 p-3 border border-gray-700">
                  <p className="text-white font-bold mb-1">
                    📐 Core Foundations
                  </p>
                  <p className="text-gray-400 text-sm">
                    Advancing math & CS fundamentals.
                  </p>
                </div>
                <div className="bg-gray-900/50 p-3 border border-gray-700">
                  <p className="text-white font-bold mb-1">🖥️ Full-Stack</p>
                  <p className="text-gray-400 text-sm">
                    Architecture & core principles.
                  </p>
                </div>
                <div className="bg-gray-900/50 p-3 border border-gray-700">
                  <p className="text-white font-bold mb-1">
                    🤖 AI Fine-Tuning
                  </p>
                  <p className="text-gray-400 text-sm">
                    Adapting models for specific tasks.
                  </p>
                </div>
                <div className="bg-gray-900/50 p-3 border border-gray-700">
                  <p className="text-white font-bold mb-1">🧩 AI Agents</p>
                  <p className="text-gray-400 text-sm">
                    Building usable AI tools.
                  </p>
                </div>
              </div>
            }
          >
            <p className="text-white font-mono border-l-2 border-cyber-yellow pl-3">
              // DEEP DIVE INTO CURRENT STATUS
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-cyber-green mb-2 uppercase tracking-wide">
                  [ Foundation ]
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  Continuing to build a solid base in mathematics and computer
                  science fundamentals. I see these as the pillars that ensure
                  long-term growth and the ability to understand advanced
                  concepts in depth.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-cyber-green mb-2 uppercase tracking-wide">
                  [ Development ]
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  Maintaining proficiency across front-end and back-end
                  development. While AI can handle many details, I believe
                  understanding architecture, algorithms, and system design
                  remains essential.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-cyber-green mb-2 uppercase tracking-wide">
                  [ AI Exploration ]
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3 font-sans">
                  Applying and experimenting with AI in concrete ways. I am
                  especially interested in:
                </p>
                <div className="ml-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-cyber-green font-bold mt-1">::</span>
                    <div>
                      <span className="text-white text-sm font-bold">
                        AI Fine-Tuning
                      </span>
                      <p className="text-gray-400 text-sm mt-1">
                        Working with models at a scale I can handle, improving
                        them for specific tasks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyber-green font-bold mt-1">::</span>
                    <div>
                      <span className="text-white text-sm font-bold">
                        AI Agents
                      </span>
                      <p className="text-gray-400 text-sm mt-1">
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
                  className="text-cyber-purple"
                  size={28}
                />
                <span className="text-2xl">My_Story.txt</span>
              </span>
            }
            collapsedLabel="READ"
            expandedLabel="COLLAPSE"
            headerTone="background"
            className="bg-cyber-black shadow-neo"
            buttonClassName="p-6 hover:bg-cyber-black"
            previewClassName="p-6 bg-gray-900/30"
            contentClassName="p-6 space-y-4 text-gray-300 leading-relaxed font-sans text-sm bg-gray-900 border-gray-700"
            preview={
              <p className="text-gray-300 leading-relaxed font-sans">
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
            surface={false}
            className="bg-cyber-black p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <div className="flex items-center gap-3 mb-8 border-b-2 border-dashed border-gray-700 pb-4">
              <Code
                aria-hidden="true"
                className="text-cyber-blue"
                size={28}
              />
              <SectionHeading
                as="h3"
                className="text-2xl text-white tracking-normal"
              >
                System_Capabilities
              </SectionHeading>
            </div>
            <div className="grid lg:grid-cols-2 gap-10">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <h4
                    className={`font-bold ${headingColors[group.accent]} mb-4 uppercase text-sm tracking-wider`}
                  >
                    {group.label}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <Tag
                        key={skill}
                        accent={group.accent}
                        className={`border-gray-600 bg-transparent text-gray-300 font-normal normal-case tracking-normal ${group.hoverClasses} transition-colors cursor-default`}
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
