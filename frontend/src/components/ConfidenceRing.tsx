import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ConfidenceRingProps {
  value: number;
  size?: number;
  label?: string;
}

export function ConfidenceRing({
  value,
  size = 152,
  label = 'Model confidence'
}: ConfidenceRingProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reduce]);

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${value.toFixed(1)} percent`}>
      
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F5EBD8"
          strokeWidth={stroke} />
        
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#B08B4F"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: reduce ? circumference - value / 100 * circumference : circumference }}
          animate={{ strokeDashoffset: circumference - value / 100 * circumference }}
          transition={{ duration: reduce ? 0 : 1.3, ease: [0.23, 1, 0.32, 1] }} />
        
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[32px] font-bold leading-none tracking-[-0.035em] tabular-nums text-ink-900">
          {display.toFixed(1)}
          <span className="text-lg font-semibold text-muted">%</span>
        </span>
        <span className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
          Confidence
        </span>
      </div>
    </div>);

}