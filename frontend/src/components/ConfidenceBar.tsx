import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ConfidenceBarProps {
  label: string;
  value: number;
  emphasis?: boolean;
  delay?: number;
}

export function ConfidenceBar({ label, value, emphasis = false, delay = 0 }: ConfidenceBarProps) {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span
          className={`text-[15px] ${emphasis ? 'font-bold text-ink-900' : 'font-medium text-ink-700'}`}>
          
          {label}
        </span>
        <span
          className={`shrink-0 tabular-nums ${
          emphasis ? 'text-[15px] font-bold text-ink-900' : 'text-sm font-semibold text-muted'}`
          }>
          
          {value.toFixed(1)}%
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-gold-100"
        role="meter"
        aria-valuenow={Number(value.toFixed(1))}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} model confidence`}>
        
        <motion.div
          initial={{ width: reduce ? `${Math.max(value, 1.5)}%` : 0 }}
          animate={{ width: `${Math.max(value, 1.5)}%` }}
          transition={{ duration: reduce ? 0 : 1.1, delay, ease: [0.23, 1, 0.32, 1] }}
          className={`h-full rounded-full ${emphasis ? 'bg-ink-800' : 'bg-gold-300'}`} />
        
      </div>
    </div>);

}