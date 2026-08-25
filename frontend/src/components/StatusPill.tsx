import React from 'react';
import { CircleAlertIcon, InfoIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { RiskLevel } from '../types/analysis';

export function StatusPill({ level, className }: {level: RiskLevel;className?: string;}) {
  const review = level === 'review';
  const Icon = review ? CircleAlertIcon : InfoIcon;
  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold',
        review ?
        'border-coral-200 bg-coral-50 text-coral-700' :
        'border-line bg-gold-50 text-gold-700',
        className
      )}>
      
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {review ? 'Professional evaluation recommended' : 'General information'}
    </span>);

}