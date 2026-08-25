import React from 'react';
import { InfoIcon, ShieldCheckIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface DisclaimerProps {
  variant?: 'inline' | 'block' | 'chip';
  text?: string;
  className?: string;
}

const DEFAULT_TEXT =
'This is an AI-generated prediction and not a medical diagnosis. AI predictions may be inaccurate — consult a qualified healthcare professional for medical advice.';

export function Disclaimer({ variant = 'block', text = DEFAULT_TEXT, className }: DisclaimerProps) {
  if (variant === 'chip') {
    return (
      <span
        className={twMerge(
          'inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-semibold text-muted',
          className
        )}>
        
        <ShieldCheckIcon className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
        AI-assisted · not a diagnosis
      </span>);

  }

  if (variant === 'inline') {
    return (
      <p
        className={twMerge(
          'flex items-start gap-2 text-[13px] leading-relaxed text-muted',
          className
        )}>
        
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
        <span>{text}</span>
      </p>);

  }

  return (
    <aside
      className={twMerge(
        'flex items-start gap-3 rounded-2xl border border-line bg-gold-50 px-4 py-4 sm:px-5',
        className
      )}
      aria-label="Medical disclaimer">
      
      <InfoIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-600" aria-hidden="true" />
      <p className="text-[13px] leading-relaxed text-ink-700">
        <span className="font-semibold text-ink-900">Medical disclaimer. </span>
        {text}
      </p>
    </aside>);

}