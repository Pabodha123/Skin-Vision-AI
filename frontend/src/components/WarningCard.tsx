import React from 'react';
import { MapPinIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from './Button';
import { warningSigns } from '../data/analysis';

export function WarningCard() {
  return (
    <section
      aria-labelledby="warning-heading"
      className="rounded-3xl border border-coral-200 bg-coral-50 p-5 sm:p-8">
      
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-coral-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-coral-700">
            <TriangleAlertIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Worth knowing
          </span>
          <h2
            id="warning-heading"
            className="mt-4 text-[22px] font-bold tracking-[-0.03em] text-ink-900 sm:text-2xl">
            
            Things worth paying attention to
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-coral-700">
            General signs worth mentioning to a clinician. Seeing one of these is not a diagnosis and
            not a reason to worry on its own.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {warningSigns.map((sign) =>
            <li key={sign.title} className="rounded-2xl border border-coral-100 bg-white p-4">
                <h3 className="text-[14.5px] font-semibold text-ink-900">{sign.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{sign.body}</p>
              </li>
            )}
          </ul>
        </div>

        <div className="shrink-0 rounded-2xl border border-coral-200 bg-white p-5 sm:p-6 lg:w-[280px]">
          <h3 className="text-[16px] font-bold tracking-[-0.02em] text-ink-900">
            Talk to a professional
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            An in-person examination is the only way to confirm what a skin change actually is.
          </p>
          <Button size="md" className="mt-5 w-full">
            <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            Find a Dermatologist
          </Button>
        </div>
      </div>
    </section>);

}