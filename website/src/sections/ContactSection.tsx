import { motion } from 'framer-motion';

import { buttonStyles } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { contactLinks } from '../content/portfolio';

export const ContactSection = () => (
  <section
    id="contact"
    className="py-20 px-4 pb-32 border-t-2 border-white bg-grid"
  >
    <div className="max-w-4xl mx-auto">
      <motion.div className="text-center mb-16">
        <SectionHeading className="text-4xl md:text-6xl mb-6 text-white">
          Initialize_Connection
        </SectionHeading>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto font-mono">
          Ready to collaborate? Establish a communication link below.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6">
        {contactLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.url}
            target={link.kind === 'external' ? '_blank' : undefined}
            rel={
              link.kind === 'external' ? 'noopener noreferrer' : undefined
            }
            aria-label={link.label}
            className={buttonStyles({
              variant: index === 0 ? 'primary' : 'outline',
              size: 'lg',
              className:
                index === 0
                  ? 'px-8 py-4 bg-cyber-blue border-white text-black hover:bg-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
                  : 'px-8 py-4 bg-cyber-black border-white text-white hover:bg-white hover:text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
            })}
          >
            <link.icon aria-hidden="true" size={20} />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);
