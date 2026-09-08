import { motion, type MotionValue, useTransform } from 'framer-motion';

interface OrbitalResonanceProps {
  phase: MotionValue<number>;
  reduceMotion: boolean;
}

interface SatelliteDefinition {
  bodyClassName: string;
  centerX: number;
  centerY: number;
  frequency: number;
  phaseOffset: number;
}

interface SatelliteProps extends SatelliteDefinition {
  phase: MotionValue<number>;
  reduceMotion: boolean;
}

const viewBox = { width: 168, height: 156 };
const figureCenter = { x: 84, y: 78 };
const orbitRadius = 48;
const bodyRadius = 4;
const ringDistance = 28;
const frequencies = [1, 2, 3, 2, 1] as const;
const fills = [
  'fill-sky',
  'fill-navy',
  'fill-surface',
  'fill-navy',
  'fill-sky',
] as const;

const satellites: SatelliteDefinition[] = Array.from(
  { length: 5 },
  (_, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;

    return {
      bodyClassName: fills[index],
      centerX: figureCenter.x + Math.cos(angle) * ringDistance,
      centerY: figureCenter.y + Math.sin(angle) * ringDistance,
      frequency: frequencies[index],
      phaseOffset: angle,
    };
  },
);

const Satellite = ({
  bodyClassName,
  centerX,
  centerY,
  frequency,
  phase,
  phaseOffset,
  reduceMotion,
}: SatelliteProps) => {
  const x = useTransform(
    phase,
    (value) => centerX + Math.cos(value * frequency + phaseOffset) * orbitRadius,
  );
  const y = useTransform(
    phase,
    (value) => centerY + Math.sin(value * frequency + phaseOffset) * orbitRadius,
  );

  return (
    <g>
      <circle
        cx={centerX}
        cy={centerY}
        r={orbitRadius}
        className="fill-none stroke-navy"
        strokeWidth="1.5"
      />
      <motion.circle
        cx={
          reduceMotion
            ? centerX + Math.cos(phaseOffset) * orbitRadius
            : x
        }
        cy={
          reduceMotion
            ? centerY + Math.sin(phaseOffset) * orbitRadius
            : y
        }
        r={bodyRadius}
        className={`${bodyClassName} stroke-black`}
        strokeWidth="2"
      />
    </g>
  );
};

export const OrbitalResonance = ({
  phase,
  reduceMotion,
}: OrbitalResonanceProps) => (
  <div className="relative h-40 w-44">
    <svg
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      className="h-[156px] w-44 overflow-visible"
    >
      {satellites.map((satellite, index) => (
        <Satellite
          key={index}
          {...satellite}
          phase={phase}
          reduceMotion={reduceMotion}
        />
      ))}
    </svg>
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-widest text-navy">
      1:2:3:2:1
    </span>
  </div>
);
