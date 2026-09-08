import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

import profileImage from '../assets/images/My_Picture.jpg';
import { buttonStyles } from '../components/ui/Button';
import { actions, floatingLinks } from '../content/portfolio';
import { accentBg, accentShadow, toneFill, toneHoverText, toneOn } from '../lib/accent';
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
            <div className="mb-4 inline-block ink bg-sky p-2 font-display text-sm font-bold uppercase tracking-widest text-on-light shadow-neo-sm -rotate-1">
              Full Stack / AI Engineer
            </div>
            <h1 className="hero-name mb-6 font-display text-5xl font-bold text-foreground md:text-7xl">
              Patrick Maxiao Ma
            </h1>
            <h2 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
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
            <div className="ink-plate relative z-10">
              <div className="relative h-60 w-60 overflow-hidden ink bg-surface sm:h-80 sm:w-80">
                <img
                  src={profileImage}
                  alt="Patrick Maxiao Ma"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -right-6 -top-6 z-0 h-16 w-16 -rotate-6 animate-float ink bg-sky" />
            <div className="absolute -bottom-6 -left-6 z-20 h-20 w-20 rotate-3 animate-float ink bg-navy" />
            <div className="absolute -right-12 top-1/2 z-0 h-10 w-10 rotate-45 animate-float ink bg-sky" />

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
                  'absolute z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center ink shadow-neo-sm transition-all duration-300 hover:scale-110',
                  floatingLinkPositions[index],
                  toneFill[link.accent],
                  toneHoverText[link.accent],
                )}
              >
                <div className="-rotate-45">
                  <link.icon
                    aria-hidden="true"
                    size={20}
                    className={toneOn[link.accent]}
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
                    'absolute z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center ink transition-all duration-300 hover:scale-110',
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
                    className={cn('mb-2', toneOn[action.accent])}
                  />
                  <span
                    className={cn(
                      'px-2 text-center font-display font-bold uppercase leading-tight tracking-wider',
                      textSize,
                      toneOn[action.accent],
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
