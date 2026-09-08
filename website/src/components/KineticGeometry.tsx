import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type HTMLAttributes } from 'react';

import { GearTrain } from './kinetic/GearTrain';
import { OrbitalResonance } from './kinetic/OrbitalResonance';
import { cn } from '../lib/cn';

type GeometryMotif =
  | 'gears'
  | 'hopf'
  | 'precession'
  | 'resonance'
  | 'trefoil'
  | 'tusi';

interface KineticGeometryProps extends HTMLAttributes<HTMLDivElement> {
  motif: GeometryMotif;
}

const spring = {
  stiffness: 38,
  damping: 10,
  mass: 1.2,
};

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Segment2D {
  component: number;
  depth: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

const createSegments = (
  points: Point3D[],
  project: (point: Point3D) => Point3D,
  component = 0,
): Segment2D[] =>
  points
    .map((point, index) => {
      const nextPoint = points[(index + 1) % points.length];
      const start = project(point);
      const end = project(nextPoint);

      return {
        component,
        depth: (start.z + end.z) / 2,
        x1: start.x,
        x2: end.x,
        y1: start.y,
        y2: end.y,
      };
    })
    .sort((a, b) => a.depth - b.depth);

const sampleLoop = (
  getPoint: (parameter: number) => Point3D,
  steps = 84,
): Point3D[] =>
  Array.from({ length: steps }, (_, index) =>
    getPoint((index / steps) * Math.PI * 2),
  );

const getTrefoilPoint = (parameter: number): Point3D => ({
  x: Math.sin(parameter) + 2 * Math.sin(2 * parameter),
  y: Math.cos(parameter) - 2 * Math.cos(2 * parameter),
  z: -Math.sin(3 * parameter),
});

const projectTrefoil = ({ x, y, z }: Point3D): Point3D => ({
  x: 80 + x * 21,
  y: 76 + y * 21,
  z,
});

const projectHopf = ({ x, y, z }: Point3D): Point3D => {
  const rotateY = -0.6;
  const rotateX = 0.75;
  const xAfterY = x * Math.cos(rotateY) + z * Math.sin(rotateY);
  const zAfterY = -x * Math.sin(rotateY) + z * Math.cos(rotateY);
  const yAfterX = y * Math.cos(rotateX) - zAfterY * Math.sin(rotateX);
  const zAfterX = y * Math.sin(rotateX) + zAfterY * Math.cos(rotateX);

  return {
    x: 48 + xAfterY * 43,
    y: 61 + yAfterX * 43,
    z: zAfterX,
  };
};

interface PrecessionState {
  tipX: number;
  tipY: number;
  wheelCenterX: number;
  wheelCenterY: number;
  wheelX1: number;
  wheelX2: number;
  wheelY1: number;
  wheelY2: number;
}

const getPrecessionState = (phase: number): PrecessionState => {
  const pivotX = 60;
  const pivotY = 91;
  const nutation = 1 + Math.sin(phase * 2.6) * 0.12;
  const tipX = pivotX + Math.cos(phase) * 36 * nutation;
  const tipY =
    29 + Math.sin(phase) * 10 + Math.sin(phase * 2.6) * 3.5;
  const wheelCenterX = pivotX + (tipX - pivotX) * 0.56;
  const wheelCenterY = pivotY + (tipY - pivotY) * 0.56;
  const axisX = tipX - pivotX;
  const axisY = tipY - pivotY;
  const axisLength = Math.hypot(axisX, axisY);
  const perpendicularX = -axisY / axisLength;
  const perpendicularY = axisX / axisLength;
  const wheelRadius = 21;

  return {
    tipX,
    tipY,
    wheelCenterX,
    wheelCenterY,
    wheelX1: wheelCenterX - perpendicularX * wheelRadius,
    wheelX2: wheelCenterX + perpendicularX * wheelRadius,
    wheelY1: wheelCenterY - perpendicularY * wheelRadius,
    wheelY2: wheelCenterY + perpendicularY * wheelRadius,
  };
};

const trefoilSegments = createSegments(
  sampleLoop(getTrefoilPoint),
  projectTrefoil,
);

const hopfSegments = [
  ...createSegments(
    sampleLoop((parameter) => ({
      x: Math.cos(parameter),
      y: Math.sin(parameter),
      z: 0,
    })),
    projectHopf,
    0,
  ),
  ...createSegments(
    sampleLoop((parameter) => ({
      x: 1 + Math.cos(parameter),
      y: 0,
      z: Math.sin(parameter),
    })),
    projectHopf,
    1,
  ),
].sort((a, b) => a.depth - b.depth);

interface TopologySegmentsProps {
  segments: Segment2D[];
}

const TopologySegments = ({ segments }: TopologySegmentsProps) => (
  <>
    {segments.map((segment, index) => (
      <g key={`${segment.component}-${index}`}>
        <line
          x1={segment.x1}
          y1={segment.y1}
          x2={segment.x2}
          y2={segment.y2}
          className="stroke-black"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <line
          x1={segment.x1}
          y1={segment.y1}
          x2={segment.x2}
          y2={segment.y2}
          className={segment.component === 0 ? 'stroke-sky' : 'stroke-navy'}
          strokeLinecap="round"
          strokeWidth="4"
        />
      </g>
    ))}
  </>
);

export const KineticGeometry = ({
  motif,
  className,
  ...props
}: KineticGeometryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const phaseTarget = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    [0, Math.PI * 0.8, Math.PI * 1.55, Math.PI * 2.4],
  );
  const phase = useSpring(phaseTarget, spring);

  const tusiX = useTransform(phase, (value) => Math.cos(value) * 32);
  const tusiY = useTransform(phase, (value) => Math.sin(value) * 32);
  const tusiRotation = useTransform(
    phase,
    (value) => (-value * 180) / Math.PI,
  );

  const baseGearRotation = useTransform(
    phase,
    (value) => (value * 180) / Math.PI,
  );
  const topologyRotation = useTransform(
    phase,
    (value) => Math.sin(value) * 7,
  );
  const trefoilDotX = useTransform(
    phase,
    (value) => projectTrefoil(getTrefoilPoint(value)).x,
  );
  const trefoilDotY = useTransform(
    phase,
    (value) => projectTrefoil(getTrefoilPoint(value)).y,
  );
  const firstHopfDotX = useTransform(
    phase,
    (value) =>
      projectHopf({
        x: Math.cos(value),
        y: Math.sin(value),
        z: 0,
      }).x,
  );
  const firstHopfDotY = useTransform(
    phase,
    (value) =>
      projectHopf({
        x: Math.cos(value),
        y: Math.sin(value),
        z: 0,
      }).y,
  );
  const secondHopfDotX = useTransform(
    phase,
    (value) =>
      projectHopf({
        x: 1 + Math.cos(-value),
        y: 0,
        z: Math.sin(-value),
      }).x,
  );
  const secondHopfDotY = useTransform(
    phase,
    (value) =>
      projectHopf({
        x: 1 + Math.cos(-value),
        y: 0,
        z: Math.sin(-value),
      }).y,
  );
  const precessionState = useTransform(phase, getPrecessionState);
  const precessionTipX = useTransform(
    precessionState,
    (state) => state.tipX,
  );
  const precessionTipY = useTransform(
    precessionState,
    (state) => state.tipY,
  );
  const precessionWheelCenterX = useTransform(
    precessionState,
    (state) => state.wheelCenterX,
  );
  const precessionWheelCenterY = useTransform(
    precessionState,
    (state) => state.wheelCenterY,
  );
  const precessionWheelX1 = useTransform(
    precessionState,
    (state) => state.wheelX1,
  );
  const precessionWheelX2 = useTransform(
    precessionState,
    (state) => state.wheelX2,
  );
  const precessionWheelY1 = useTransform(
    precessionState,
    (state) => state.wheelY1,
  );
  const precessionWheelY2 = useTransform(
    precessionState,
    (state) => state.wheelY2,
  );
  const precessionSpinDotX = useTransform(phase, (value) => {
    const state = getPrecessionState(value);
    const position = Math.cos(value * 7);

    return (
      state.wheelCenterX +
      ((state.wheelX2 - state.wheelX1) / 2) * position
    );
  });
  const precessionSpinDotY = useTransform(phase, (value) => {
    const state = getPrecessionState(value);
    const position = Math.cos(value * 7);

    return (
      state.wheelCenterY +
      ((state.wheelY2 - state.wheelY1) / 2) * position
    );
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-0 hidden select-none md:block',
        className,
      )}
      {...props}
    >
      {motif === 'tusi' && (
        <div className="relative h-40 w-36">
          <div className="absolute left-2 top-2 h-32 w-32 rounded-full border-[3px] border-navy bg-surface/50" />
          <div className="absolute left-2 top-[71px] w-32 border-t-2 border-dashed border-black" />
          <motion.div
            className="absolute left-10 top-10 h-16 w-16 rounded-full border-[3px] border-black bg-sky/70"
            style={
              reduceMotion
                ? { x: 32, y: 0, rotate: 0 }
                : {
                    x: tusiX,
                    y: tusiY,
                    rotate: tusiRotation,
                  }
            }
          >
            <div className="absolute left-1/2 top-1/2 h-[3px] w-1/2 -translate-y-1/2 bg-black" />
            <div className="absolute -right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-black bg-navy" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          </motion.div>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold uppercase tracking-widest text-navy">
            R : R/2
          </span>
        </div>
      )}

      {motif === 'gears' && (
        <GearTrain
          rotation={baseGearRotation}
          reduceMotion={Boolean(reduceMotion)}
        />
      )}

      {motif === 'resonance' && (
        <OrbitalResonance
          phase={phase}
          reduceMotion={Boolean(reduceMotion)}
        />
      )}

      {motif === 'precession' && (
        <div className="relative h-36 w-36">
          <svg viewBox="0 0 120 112" className="h-32 w-36 overflow-visible">
            <ellipse
              cx="60"
              cy="29"
              rx="40"
              ry="14"
              className="fill-none stroke-navy"
              strokeDasharray="5 5"
              strokeWidth="2"
            />
            <ellipse
              cx="60"
              cy="29"
              rx="32"
              ry="8"
              className="fill-none stroke-sky"
              strokeDasharray="3 5"
              strokeWidth="2"
            />
            <path
              d="M 60 91 L 20 29 M 60 91 L 100 29"
              className="fill-none stroke-sky"
              strokeDasharray="3 5"
              strokeWidth="2"
            />
            <motion.line
              x1="60"
              y1="91"
              x2={reduceMotion ? 96 : precessionTipX}
              y2={reduceMotion ? 29 : precessionTipY}
              className="stroke-black"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <motion.line
              x1={reduceMotion ? 62 : precessionWheelX1}
              y1={reduceMotion ? 46 : precessionWheelY1}
              x2={reduceMotion ? 98 : precessionWheelX2}
              y2={reduceMotion ? 67 : precessionWheelY2}
              className="stroke-black"
              strokeLinecap="round"
              strokeWidth="10"
            />
            <motion.line
              x1={reduceMotion ? 62 : precessionWheelX1}
              y1={reduceMotion ? 46 : precessionWheelY1}
              x2={reduceMotion ? 98 : precessionWheelX2}
              y2={reduceMotion ? 67 : precessionWheelY2}
              className="stroke-sky"
              strokeLinecap="round"
              strokeWidth="5"
            />
            <motion.circle
              cx={reduceMotion ? 80 : precessionWheelCenterX}
              cy={reduceMotion ? 56 : precessionWheelCenterY}
              r="5"
              className="fill-surface stroke-black"
              strokeWidth="2"
            />
            <motion.circle
              cx={reduceMotion ? 98 : precessionSpinDotX}
              cy={reduceMotion ? 67 : precessionSpinDotY}
              r="4"
              className="fill-navy stroke-black"
              strokeWidth="2"
            />
            <motion.rect
              x={reduceMotion ? 96 : precessionTipX}
              y={reduceMotion ? 29 : precessionTipY}
              width="10"
              height="10"
              className="fill-navy stroke-black"
              strokeWidth="2"
              style={{ translateX: -5, translateY: -5 }}
            />
            <circle
              cx="60"
              cy="91"
              r="6"
              className="fill-surface stroke-black"
              strokeWidth="3"
            />
            <text
              x="67"
              y="80"
              className="fill-navy font-mono text-[10px] font-bold"
            >
              L
            </text>
          </svg>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold tracking-widest text-navy">
            dL/dt = τ
          </span>
        </div>
      )}

      {motif === 'trefoil' && (
        <div className="relative h-44 w-40">
          <svg viewBox="0 0 160 160" className="h-40 w-40 overflow-visible">
            <motion.g
              style={
                reduceMotion
                  ? undefined
                  : {
                      rotate: topologyRotation,
                      transformOrigin: '80px 76px',
                    }
              }
            >
              <TopologySegments segments={trefoilSegments} />
              <motion.circle
                cx={reduceMotion ? 80 : trefoilDotX}
                cy={reduceMotion ? 55 : trefoilDotY}
                r="5"
                className="fill-navy stroke-black"
                strokeWidth="2"
              />
            </motion.g>
          </svg>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-widest text-navy">
            3₁ knot
          </span>
        </div>
      )}

      {motif === 'hopf' && (
        <div className="relative h-36 w-40">
          <svg viewBox="0 0 150 120" className="h-32 w-40 overflow-visible">
            <motion.g
              style={
                reduceMotion
                  ? undefined
                  : {
                      rotate: topologyRotation,
                      transformOrigin: '72px 60px',
                    }
              }
            >
              <TopologySegments segments={hopfSegments} />
              <motion.circle
                cx={reduceMotion ? 83.5 : firstHopfDotX}
                cy={reduceMotion ? 44.5 : firstHopfDotY}
                r="4.5"
                className="fill-navy stroke-black"
                strokeWidth="2"
              />
              <motion.circle
                cx={reduceMotion ? 119 : secondHopfDotX}
                cy={reduceMotion ? 28 : secondHopfDotY}
                r="4.5"
                className="fill-sky stroke-black"
                strokeWidth="2"
              />
            </motion.g>
          </svg>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-widest text-navy">
            Lk = 1
          </span>
        </div>
      )}
    </div>
  );
};
