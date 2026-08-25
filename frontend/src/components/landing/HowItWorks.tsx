import React from 'react';
import { CompassIcon, CpuIcon, EyeIcon, UploadIcon } from 'lucide-react';
import { SectionHeading } from '../Card';
import { howItWorks } from '../../data/marketing';

const icons = {
  upload: UploadIcon,
  gauge: CompassIcon,
  cpu: CpuIcon,
  eye: EyeIcon
} as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-line bg-canvas">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="The flow"
          title="How SkinVision AI works"
          body="Four steps from a single photo to information you can actually act on." />
        

        <ol className="relative mt-12 grid gap-7 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-[27px] top-4 hidden h-[calc(100%-32px)] w-px bg-line sm:block lg:left-0 lg:top-[27px] lg:h-px lg:w-full" />
          
          {howItWorks.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li key={item.step} className="relative flex gap-5 lg:flex-col lg:gap-0">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-white shadow-card">
                  <Icon className="h-[22px] w-[22px] text-gold-600" aria-hidden="true" />
                </span>
                <div className="lg:mt-6">
                  <p className="text-[12px] font-bold tracking-[0.14em] text-gold-400">
                    {item.step}
                  </p>
                  <h3 className="mt-1.5 text-[19px] font-bold tracking-[-0.025em] text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-xs text-[14.5px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </li>);

          })}
        </ol>
      </div>
    </section>);

}