import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

import profileImage from '../assets/images/My_Picture.jpg';
import { buttonStyles } from '../components/ui/Button';
import { actions, floatingLinks } from '../content/portfolio';
import { accentBg, accentShadow, toneFill, toneHoverText } from '../lib/accent';
import { cn } from '../lib/cn';

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
  <section id="home" className="flex min-h-screen items-center px-4 py-8">
    <div className="mx-auto w-full max-w-[1130px]">
      <div className="grid items-center gap-12 lg:grid-cols-5">
        <div className="hero-text-container max-w-[60ch] space-y-8 lg:col-span-3">
          <div>
            <div className="mb-4 inline-block border-2 border-border bg-accent-cyan p-2 font-bold uppercase tracking-widest text-background shadow-neo-sm">
              Full Stack / AI Engineer
            </div>
            <h1
              className="glitch-text mb-6 text-5xl font-bold text-foreground md:text-7xl"
              data-text="Patrick Maxiao Ma"
            >
              Patrick Maxiao Ma
            </h1>
            <h2 className="text-xl font-bold tracking-tight text-accent-cyan md:text-2xl">
              Waterloo CS Student <span className="text-foreground">·</span>{' '}
              Builder of Ideas
            </h2>
          </div>

          <div className="space-y-6">
            <p className="border-l-4 border-accent-purple pl-4 font-sans text-lg leading-relaxed text-body">
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
                  className: 'normal-case',
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

        <div className="hero-image-container relative flex items-center justify-center lg:justify-start">
          <div className="relative my-24 sm:my-32 lg:my-0">
            <div className="relative z-10 h-60 w-60 border-4 border-border bg-inset shadow-neo-purple sm:h-80 sm:w-80">
              <div className="h-full w-full overflow-hidden transition-all duration-500">
                <img
                  src={profileImage}
                  alt="Patrick Maxiao Ma"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -right-6 -top-6 z-0 h-16 w-16 animate-float border-4 border-accent-cyan" />
            <div className="absolute -bottom-6 -left-6 z-20 h-20 w-20 animate-float bg-accent-purple mix-blend-multiply opacity-80" />
            <div className="absolute -right-12 top-1/2 z-0 h-10 w-10 rotate-45 animate-float bg-accent-green" />
            <div className="absolute -top-12 left-1/2 z-0 h-0 w-0 animate-float border-b-[35px] border-l-[20px] border-r-[20px] border-b-accent-yellow border-l-transparent border-r-transparent" />

            {floatingLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.url}
                target={link.kind === 'external' ? '_blank' : undefined}
                rel={
                  link.kind === 'external' ? 'noopener noreferrer' : undefined
                }
                download={
                  link.kind === 'download' ? link.downloadName : undefined
                }
                aria-label={link.label}
                className={cn(
                  'absolute z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center border-2 border-border shadow-neo-sm transition-all duration-300 hover:scale-110',
                  floatingLinkPositions[index],
                  toneFill[link.accent],
                  toneHoverText[link.accent],
                )}
              >
                <div className="-rotate-45">
                  <link.icon
                    aria-hidden="true"
                    size={20}
                    className="text-foreground drop-shadow-sm"
                  />
                </div>
              </a>
            ))}

            {actions.map((action, index) => {
              const isPrimary = action.label === 'View My Work';
              const buttonSize = isPrimary
                ? 'h-24 w-24 sm:h-32 sm:w-32'
                : 'h-20 w-20 sm:h-24 sm:w-24';
              const iconSize = isPrimary ? 32 : 24;
              const textSize = isPrimary ? 'text-sm' : 'text-xs';

              return (
                <button
                  key={action.label}
                  type="button"
                  aria-label={`${action.label} section`}
                  className={cn(
                    'absolute z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border-4 border-border transition-all duration-300 hover:scale-110',
                    actionPositions[index],
                    buttonSize,
                    accentBg[action.accent],
                    accentShadow[action.accent],
                  )}
                  onClick={() =>
                    document
                      .getElementById(action.targetId)
                      ?.scrollIntoView({ behavior: getScrollBehavior() })
                  }
                >
                  <action.icon
                    aria-hidden="true"
                    size={iconSize}
                    className="mb-2 text-foreground drop-shadow-sm"
                  />
                  <span
                    className={cn(
                      'px-2 text-center font-bold uppercase leading-tight tracking-wider text-foreground drop-shadow-sm',
                      textSize,
                    )}
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
