import { type MotionValue, useMotionValueEvent } from 'framer-motion';
import { useRef } from 'react';

interface EccentricCamProps {
  rotation: MotionValue<number>;
  reduceMotion: boolean;
}

interface Point {
  x: number;
  y: number;
}

const viewBox = { width: 120, height: 128 };
const axle = { x: 60, y: 62 };
const stringRadius = 38;
const stringOffset = 11;
const cableRadius = 15;
const cableOffset = -5;
const hubRadius = 6;
const nock = { x: axle.x, y: axle.y - 78 };
const stringStub = 20;

const rotateOffset = (offset: number, angleDegrees: number): Point => {
  const angle = (angleDegrees * Math.PI) / 180;

  return {
    x: axle.x + Math.cos(angle) * offset,
    y: axle.y + Math.sin(angle) * offset,
  };
};

const tangentPoints = (center: Point, radius: number, from: Point): [Point, Point] => {
  const vx = center.x - from.x;
  const vy = center.y - from.y;
  const lengthSquared = vx * vx + vy * vy;
  const radiusSquared = radius * radius;
  const along = radiusSquared / lengthSquared;
  const across =
    (radius * Math.sqrt(Math.max(0, lengthSquared - radiusSquared))) /
    lengthSquared;

  return [
    {
      x: center.x - along * vx - across * vy,
      y: center.y - along * vy + across * vx,
    },
    {
      x: center.x - along * vx + across * vy,
      y: center.y - along * vy - across * vx,
    },
  ];
};

const stubEnd = (tangent: Point, from: Point) => {
  const dx = from.x - tangent.x;
  const dy = from.y - tangent.y;
  const length = Math.hypot(dx, dy) || 1;

  return {
    x: tangent.x + (dx / length) * stringStub,
    y: tangent.y + (dy / length) * stringStub,
  };
};

const getCamState = (angleDegrees: number) => {
  const stringCenter = rotateOffset(stringOffset, angleDegrees);
  const cableCenter = rotateOffset(cableOffset, angleDegrees);
  const [firstTangent, secondTangent] = tangentPoints(
    stringCenter,
    stringRadius,
    nock,
  );

  return {
    cableCenter,
    firstStub: stubEnd(firstTangent, nock),
    firstTangent,
    secondStub: stubEnd(secondTangent, nock),
    secondTangent,
    stringCenter,
  };
};

const initial = getCamState(0);

export const EccentricCam = ({
  rotation,
  reduceMotion,
}: EccentricCamProps) => {
  const camRef = useRef<SVGGElement>(null);
  const firstStringRef = useRef<SVGLineElement>(null);
  const secondStringRef = useRef<SVGLineElement>(null);

  useMotionValueEvent(rotation, 'change', (value) => {
    if (reduceMotion) {
      return;
    }

    const state = getCamState(value);

    camRef.current?.setAttribute(
      'transform',
      `rotate(${value} ${axle.x} ${axle.y})`,
    );
    firstStringRef.current?.setAttribute('x1', String(state.firstTangent.x));
    firstStringRef.current?.setAttribute('y1', String(state.firstTangent.y));
    firstStringRef.current?.setAttribute('x2', String(state.firstStub.x));
    firstStringRef.current?.setAttribute('y2', String(state.firstStub.y));
    secondStringRef.current?.setAttribute('x1', String(state.secondTangent.x));
    secondStringRef.current?.setAttribute('y1', String(state.secondTangent.y));
    secondStringRef.current?.setAttribute('x2', String(state.secondStub.x));
    secondStringRef.current?.setAttribute('y2', String(state.secondStub.y));
  });

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        className="h-auto w-full overflow-visible"
        preserveAspectRatio="xMaxYMin meet"
      >
        <g ref={camRef} transform={`rotate(0 ${axle.x} ${axle.y})`}>
          <circle
            cx={axle.x + stringOffset}
            cy={axle.y}
            r={stringRadius}
            className="fill-surface stroke-navy"
            strokeWidth="3"
          />
          <circle
            cx={axle.x + stringOffset}
            cy={axle.y}
            r={stringRadius - 5}
            className="fill-none stroke-sky"
            strokeDasharray="4 5"
            strokeWidth="1.5"
          />
          <circle
            cx={axle.x + cableOffset}
            cy={axle.y}
            r={cableRadius}
            className="fill-sky stroke-black"
            strokeWidth="2.5"
          />
          <line
            x1={axle.x + stringOffset}
            y1={axle.y}
            x2={axle.x + cableOffset}
            y2={axle.y}
            className="stroke-black"
            strokeWidth="2.5"
          />
          <circle
            cx={axle.x + stringOffset}
            cy={axle.y}
            r="3"
            className="fill-navy stroke-black"
            strokeWidth="1.5"
          />
          <circle
            cx={axle.x + cableOffset}
            cy={axle.y}
            r="3"
            className="fill-surface stroke-black"
            strokeWidth="1.5"
          />
        </g>
        <line
          ref={firstStringRef}
          x1={initial.firstTangent.x}
          y1={initial.firstTangent.y}
          x2={initial.firstStub.x}
          y2={initial.firstStub.y}
          className="stroke-black"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <line
          ref={secondStringRef}
          x1={initial.secondTangent.x}
          y1={initial.secondTangent.y}
          x2={initial.secondStub.x}
          y2={initial.secondStub.y}
          className="stroke-black"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <circle
          cx={axle.x}
          cy={axle.y}
          r={hubRadius}
          className="fill-navy stroke-black"
          strokeWidth="2.5"
        />
      </svg>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-widest text-navy">
        cam e
      </span>
    </div>
  );
};
