import { motion } from 'framer-motion';

import { buttonStyles } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { contactLinks } from '../content/portfolio';

export const ContactSection = () => (
  <section
    id="contact"
    className="border-t-4 border-black bg-grid px-4 py-20 pb-32"
  >
    <div className="mx-auto max-w-4xl">
      <motion.div className="mb-16 text-center">
        <SectionHeading variant="boxed" size="xl" className="mb-6 inline-block">
          Initialize_Connection
        </SectionHeading>
        <p className="mx-auto max-w-2xl font-mono text-lg text-body">
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
              className: 'px-8 py-4',
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
