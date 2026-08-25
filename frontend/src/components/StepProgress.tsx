import React from 'react';
import { CheckIcon } from 'lucide-react';

const steps = ['Upload', 'Analyze', 'Results'];

export function StepProgress({ current }: {current: 0 | 1 | 2;}) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Analysis progress">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-colors duration-200 ease-out ${
                done ?
                'border-ink-800 bg-ink-800 text-canvas' :
                active ?
                'border-gold-400 bg-gold-100 text-ink-900' :
                'border-line bg-white text-ink-400'}`
                }>
                
                {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : `0${i + 1}`}
              </span>
              <span
                className={`truncate text-[13px] font-semibold sm:text-sm ${
                active || done ? 'text-ink-900' : 'text-muted'}`
                }>
                
                {label}
              </span>
              {active ? <span className="sr-only">(current step)</span> : null}
            </div>
            {i < steps.length - 1 ?
            <span
              aria-hidden="true"
              className={`h-px flex-1 ${done ? 'bg-gold-300' : 'bg-line'}`} /> :

            null}
          </li>);

      })}
    </ol>);

}