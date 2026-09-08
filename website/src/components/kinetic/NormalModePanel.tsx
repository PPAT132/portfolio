import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export const NormalModePanel = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const phaseTarget = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.PI * 2.6],
  );
  const phase = useSpring(phaseTarget, {
    stiffness: 38,
    damping: 12,
    mass: 1.1,
  });

  const heave = useTransform(phase, (value) => Math.sin(value) * 7);
  const rock = useTransform(phase, (value) => Math.sin(value * 1.55) * 5);
  const leftSpringScale = useTransform(phase, (value) => {
    const vertical = Math.sin(value) * 7;
    const tilt = Math.sin(value * 1.55) * 5;
    return 1 + (vertical + tilt) / 78;
  });
  const rightSpringScale = useTransform(phase, (value) => {
    const vertical = Math.sin(value) * 7;
    const tilt = Math.sin(value * 1.55) * 5;
    return 1 + (vertical - tilt) / 78;
  });
  const beamRotation = useTransform(rock, (value) => -value * 0.9);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('h-[220px] w-[148px]', className)}
      {...props}
    >
      <svg
        viewBox="0 0 148 220"
        className="block h-full w-full"
        role="presentation"
      >
        <path
          d="M18 26 H130"
          className="stroke-black"
          strokeLinecap="square"
          strokeWidth="7"
        />
        <path
          d="M21 17 L29 26 M35 17 L43 26 M49 17 L57 26 M63 17 L71 26 M77 17 L85 26 M91 17 L99 26 M105 17 L113 26 M119 17 L127 26"
          className="stroke-navy"
          strokeWidth="2.5"
        />
        <path
          d="M42 31 V151 M106 31 V151"
          className="fill-none stroke-navy/35"
          strokeDasharray="3 6"
          strokeWidth="2"
        />

        <motion.g
          style={
            reduceMotion
              ? undefined
              : {
                  scaleY: leftSpringScale,
                  transformOrigin: '42px 30px',
                }
          }
        >
          <path
            d="M42 30 V43 L33 51 L51 61 L33 71 L51 81 L33 91 L51 101 L33 111 L51 121 L42 130 V137"
            className="fill-none stroke-black"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            d="M42 30 V43 L33 51 L51 61 L33 71 L51 81 L33 91 L51 101 L33 111 L51 121 L42 130 V137"
            className="fill-none stroke-sky"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </motion.g>

        <motion.g
          style={
            reduceMotion
              ? undefined
              : {
                  scaleY: rightSpringScale,
                  transformOrigin: '106px 30px',
                }
          }
        >
          <path
            d="M106 30 V43 L97 51 L115 61 L97 71 L115 81 L97 91 L115 101 L97 111 L115 121 L106 130 V137"
            className="fill-none stroke-black"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            d="M106 30 V43 L97 51 L115 61 L97 71 L115 81 L97 91 L115 101 L97 111 L115 121 L106 130 V137"
            className="fill-none stroke-sky"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </motion.g>

        <motion.g
          style={
            reduceMotion
              ? undefined
              : {
                  y: heave,
                  rotate: beamRotation,
                  transformOrigin: '74px 140px',
                }
          }
        >
          <rect
            x="19"
            y="136"
            width="110"
            height="17"
            className="fill-surface stroke-black"
            strokeWidth="3"
          />
          <rect x="23" y="140" width="102" height="9" className="fill-sky" />
          <circle
            cx="42"
            cy="144.5"
            r="4"
            className="fill-navy stroke-black"
            strokeWidth="2"
          />
          <circle
            cx="106"
            cy="144.5"
            r="4"
            className="fill-navy stroke-black"
            strokeWidth="2"
          />
        </motion.g>

        <path
          d="M28 173 C43 161 57 185 74 173 C91 161 105 185 120 173"
          className="fill-none stroke-black"
          strokeWidth="4"
        />
        <path
          d="M28 173 C43 161 57 185 74 173 C91 161 105 185 120 173"
          className="fill-none stroke-navy"
          strokeDasharray="2 5"
          strokeWidth="1.5"
        />
        <circle
          cx="74"
          cy="173"
          r="5"
          className="fill-sky stroke-black"
          strokeWidth="2"
        />
        <path
          d="M39 197 H109"
          className="stroke-black"
          strokeDasharray="2 5"
          strokeWidth="2"
        />
        <rect x="61" y="192" width="26" height="10" className="fill-navy" />
      </svg>
    </div>
  );
};
