import {
  type MotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

type GearSize = 'small' | 'medium' | 'large';

interface GearDefinition {
  radius: number;
  teeth: number;
}

interface PositionedGear extends GearDefinition {
  centerX: number;
  centerY: number;
  direction: 1 | -1;
  progress: number;
}

interface GearProps extends PositionedGear {
  baseRotation: MotionValue<number>;
  reduceMotion: boolean;
}

interface GearTrainProps {
  rotation: MotionValue<number>;
  reduceMotion: boolean;
}

const gearDefinitions: Record<GearSize, GearDefinition> = {
  small: { radius: 15, teeth: 5 },
  medium: { radius: 27, teeth: 9 },
  large: { radius: 45, teeth: 15 },
};

const gearSequence: readonly GearSize[] = [
  'small',
  'medium',
  'large',
  'medium',
  'small',
];

const goldenSpiral = {
  centerX: 125,
  centerY: 70,
  initialRadius: 43,
};
const viewBox = {
  width: 150,
  height: 230,
};

const goldenRatio = (1 + Math.sqrt(5)) / 2;

const pointOnGoldenSpiral = (progress: number) => {
  const angle = -Math.PI / 2 - Math.PI * progress;
  const radius =
    goldenSpiral.initialRadius * goldenRatio ** (2 * progress);

  return {
    x: 150 - (goldenSpiral.centerX + Math.cos(angle) * radius),
    y: goldenSpiral.centerY + Math.sin(angle) * radius,
  };
};

const findTangentProgress = (
  previousProgress: number,
  tangentDistance: number,
) => {
  const previousPoint = pointOnGoldenSpiral(previousProgress);
  let lower = previousProgress;
  let upper = 1.4;

  for (let iteration = 0; iteration < 40; iteration += 1) {
    const candidate = (lower + upper) / 2;
    const point = pointOnGoldenSpiral(candidate);
    const distance = Math.hypot(
      point.x - previousPoint.x,
      point.y - previousPoint.y,
    );

    if (distance < tangentDistance) {
      lower = candidate;
    } else {
      upper = candidate;
    }
  }

  return (lower + upper) / 2;
};

const createSpiralLayout = (): PositionedGear[] => {
  const layout: PositionedGear[] = [];
  let progress = 0;

  gearSequence.forEach((size, index) => {
    const definition = gearDefinitions[size];
    const previousGear = layout[index - 1];

    if (previousGear) {
      const tangentDistance =
        previousGear.radius + definition.radius;

      if (index === gearSequence.length - 1) {
        layout.push({
          ...definition,
          centerX: previousGear.centerX,
          centerY: previousGear.centerY + tangentDistance,
          direction: index % 2 === 0 ? 1 : -1,
          progress,
        });
        return;
      }

      progress = findTangentProgress(previousGear.progress, tangentDistance);
    }

    const point = pointOnGoldenSpiral(progress);

    layout.push({
      ...definition,
      centerX: point.x,
      centerY: point.y,
      direction: index % 2 === 0 ? 1 : -1,
      progress,
    });
  });

  return layout;
};

const gears = createSpiralLayout();
const spiralEndProgress = gears[gears.length - 2].progress;
const spiralGuide = Array.from({ length: 41 }, (_, index) => {
  const point = pointOnGoldenSpiral((index / 40) * spiralEndProgress);

  return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
}).join(' ');
const finalGear = gears[gears.length - 1];
const guidePath = `${spiralGuide} L ${finalGear.centerX} ${finalGear.centerY}`;

const Gear = ({
  baseRotation,
  centerX,
  centerY,
  direction,
  radius,
  teeth,
  reduceMotion,
}: GearProps) => {
  const groupRef = useRef<SVGGElement>(null);
  const rotation = useTransform(
    baseRotation,
    (value) => value * direction * (45 / radius),
  );

  useMotionValueEvent(rotation, 'change', (value) => {
    if (!reduceMotion) {
      groupRef.current?.setAttribute(
        'transform',
        `rotate(${value} ${centerX} ${centerY})`,
      );
    }
  });

  return (
    <g ref={groupRef} transform={`rotate(0 ${centerX} ${centerY})`}>
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        className="fill-surface stroke-navy"
        strokeWidth="3"
      />
      {Array.from({ length: teeth }, (_, index) => {
        const toothAngle = (index / teeth) * Math.PI * 2;
        const innerRadius = radius - 4;
        const outerRadius = radius + 5;

        return (
          <line
            key={index}
            x1={centerX + Math.cos(toothAngle) * innerRadius}
            y1={centerY + Math.sin(toothAngle) * innerRadius}
            x2={centerX + Math.cos(toothAngle) * outerRadius}
            y2={centerY + Math.sin(toothAngle) * outerRadius}
            className="stroke-black"
            strokeLinecap="square"
            strokeWidth="3"
          />
        );
      })}
      <circle
        cx={centerX}
        cy={centerY}
        r={Math.max(4, radius * 0.18)}
        className="fill-sky stroke-black"
        strokeWidth="2"
      />
      <line
        x1={centerX}
        y1={centerY}
        x2={centerX + radius * 0.65}
        y2={centerY}
        className="stroke-black"
        strokeWidth="2"
      />
    </g>
  );
};

export const GearTrain = ({ rotation, reduceMotion }: GearTrainProps) => (
  <div className="relative w-full">
    <svg
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      className="h-auto w-full overflow-visible"
      preserveAspectRatio="xMaxYMin meet"
    >
      <path
        d={guidePath}
        className="fill-none stroke-sky"
        strokeDasharray="3 6"
        strokeWidth="2"
      />
      {gears.map((gear, index) => (
        <Gear
          key={index}
          {...gear}
          baseRotation={rotation}
          reduceMotion={reduceMotion}
        />
      ))}
    </svg>
  </div>
);
