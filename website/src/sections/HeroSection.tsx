import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

import profileImage from '../assets/images/My_Picture.jpg';
import { buttonStyles } from '../components/ui/Button';
import { actions, floatingLinks } from '../content/portfolio';

const floatingLinkPositions = [
  'left-[calc(50%+95px)] top-[calc(50%+95px)] sm:left-[calc(50%+134px)] sm:top-[calc(50%+134px)]',
  'left-[calc(50%-95px)] top-[calc(50%+95px)] sm:left-[calc(50%-134px)] sm:top-[calc(50%+134px)]',
  'left-[calc(50%-95px)] top-[calc(50%-95px)] sm:left-[calc(50%-134px)] sm:top-[calc(50%-134px)]',
  'left-[calc(50%+95px)] top-[calc(50%-95px)] sm:left-[calc(50%+134px)] sm:top-[calc(50%-134px)]',
] as const;

const actionPositions = [
  'left-[calc(50%-95px)] top-[calc(50%-95px)] sm:left-[calc(50%-134px)] sm:top-[calc(50%-134px)]',
  'left-[calc(50%+95px)] top-[calc(50%-95px)] sm:left-[calc(50%+134px)] sm:top-[calc(50%-134px)]',
] as const;

const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

export const HeroSection = () => (
  <section id="home" className="min-h-screen flex items-center px-4 py-8">
    <div className="w-full max-w-[1130px] mx-auto">
      <div className="grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3 max-w-[60ch] space-y-8 hero-text-container">
          <div>
            <div className="inline-block border-2 border-white p-2 mb-4 bg-cyber-blue text-cyber-black font-bold text-sm tracking-widest uppercase shadow-neo-sm">
              Full Stack / AI Engineer
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 text-white glitch-text"
              data-text="Patrick Maxiao Ma"
            >
              Patrick Maxiao Ma
            </h1>
            <h2 className="text-xl md:text-2xl text-cyber-blue font-bold tracking-tight">
              Waterloo CS Student <span className="text-white">·</span> Builder
              of Ideas
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed font-sans border-l-4 border-cyber-purple pl-4">
              I'm a Waterloo CS student passionate about combining theory with
              practice. I believe mathematics provides the foundation for
              understanding, but I truly enjoy applying knowledge by building
              real projects. Right now, I'm especially interested in AI agents
              and fine-tuning models, while also sharpening my full-stack
              development skills.
            </p>

            <div className="flex justify-center lg:justify-start">
              <motion.a
                href="/Patrick-Ma-Resume.pdf"
                download="Patrick-Ma-Resume.pdf"
                aria-label="Download Patrick Ma résumé"
                className={buttonStyles({
                  variant: 'outline',
                  className:
                    'flex items-center gap-2 px-6 py-3 bg-cyber-black border-white text-white normal-case hover:bg-white hover:text-cyber-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
                })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-start items-center hero-image-container">
          <div className="relative my-24 sm:my-32 lg:my-0">
            <div className="w-60 h-60 sm:w-80 sm:h-80 border-4 border-white bg-cyber-gray p-0 shadow-neo-purple relative z-10">
              <div className="w-full h-full overflow-hidden transition-all duration-500">
                <img
                  src={profileImage}
                  alt="Patrick Maxiao Ma"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-16 h-16 border-4 border-cyber-blue animate-float z-0" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-cyber-purple animate-float z-20 mix-blend-multiply opacity-80" />
            <div className="absolute top-1/2 -right-12 w-10 h-10 bg-cyber-green rotate-45 animate-float z-0" />
            <div className="absolute -top-12 left-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-cyber-yellow animate-float" />

            {floatingLinks.map((link, index) => {
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.kind === 'external' ? '_blank' : undefined}
                  rel={
                    link.kind === 'external'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  download={
                    link.kind === 'download' ? link.downloadName : undefined
                  }
                  aria-label={link.label}
                  className={`absolute ${floatingLinkPositions[index]} w-14 h-14 ${link.bgColor} ${link.color} border-2 ${link.borderColor} flex -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center transition-all duration-300 hover:scale-110 shadow-neo-sm z-30`}
                >
                  <div className="-rotate-45">
                    <link.icon
                      aria-hidden="true"
                      size={20}
                      className="text-white drop-shadow-sm"
                    />
                  </div>
                </a>
              );
            })}

            {actions.map((action, index) => {
              const isPrimary = action.label === 'View My Work';
              const buttonSize = isPrimary
                ? 'w-24 h-24 sm:w-32 sm:h-32'
                : 'w-20 h-20 sm:w-24 sm:h-24';
              const iconSize = isPrimary ? 32 : 24;
              const textSize = isPrimary ? 'text-sm' : 'text-xs';

              return (
                <button
                  key={action.label}
                  type="button"
                  aria-label={`${action.label} section`}
                  className={`absolute ${actionPositions[index]} ${buttonSize} ${action.bgColor} border-4 border-white flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center transition-all duration-300 hover:scale-110 ${action.shadow} z-30`}
                  onClick={() =>
                    document
                      .getElementById(action.targetId)
                      ?.scrollIntoView({ behavior: getScrollBehavior() })
                  }
                >
                  <action.icon
                    aria-hidden="true"
                    size={iconSize}
                    className="text-white mb-2 drop-shadow-sm"
                  />
                  <span
                    className={`text-white ${textSize} font-bold text-center leading-tight drop-shadow-sm uppercase tracking-wider px-2`}
                  >
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);
