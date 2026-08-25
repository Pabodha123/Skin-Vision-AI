import React from 'react';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';
import { Skeleton } from './Skeleton';
import type { ImageQuality } from '../types/analysis';

const summary: Record<ImageQuality['overall'], {label: string;tone: string;body: string;}> = {
  good: {
    label: 'Suitable for analysis',
    tone: 'border-line bg-gold-50 text-gold-700',
    body: 'This image is clear, well lit and framed well enough for the model to work with.'
  },
  fair: {
    label: 'Usable, with a caveat',
    tone: 'border-gold-200 bg-gold-50 text-gold-700',
    body: 'One thing could be better. You can continue, but a cleaner photo tends to give a more reliable result.'
  },
  poor: {
    label: 'May be difficult to analyze',
    tone: 'border-coral-200 bg-coral-50 text-coral-700',
    body: 'Several things make this image hard to read. Try taking another photo with better lighting and focus.'
  }
};

export function QualityCheck({
  quality,
  loading = false



}: {quality: ImageQuality | null;loading?: boolean;}) {
  if (loading || !quality) {
    return (
      <section
        aria-label="Checking image quality"
        className="rounded-2xl border border-line bg-white p-5">
        
        <Skeleton className="h-4 w-32" />
        <div className="mt-5 space-y-3.5">
          {[0, 1, 2, 3].map((i) =>
          <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 shrink-0 rounded-full" />
              <Skeleton className="h-3.5 w-2/3" />
            </div>
          )}
        </div>
      </section>);

  }

  const meta = summary[quality.overall];

  return (
    <section aria-label="Image quality" className="rounded-2xl border border-line bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
          Image quality
        </h3>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold ${meta.tone}`}>
          
          {quality.overall === 'poor' ?
          <TriangleAlertIcon className="h-3.5 w-3.5" aria-hidden="true" /> :

          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
          }
          {meta.label}
        </span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {quality.checks.map((check) => {
          const pass = check.status === 'pass';
          return (
            <li key={check.id} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                pass ? 'border-line bg-gold-100' : 'border-coral-200 bg-coral-50'}`
                }>
                
                {pass ?
                <CheckIcon className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" /> :

                <TriangleAlertIcon className="h-3.5 w-3.5 text-coral-500" aria-hidden="true" />
                }
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold text-ink-900">
                  {check.label}
                  <span className="sr-only">{pass ? ' — passed' : ' — needs attention'}</span>
                </span>
                <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">
                  {check.detail}
                </span>
              </span>
            </li>);

        })}
      </ul>

      <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
        {meta.body}
      </p>
    </section>);

}