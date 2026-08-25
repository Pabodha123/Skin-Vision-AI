import React from 'react';
import { BookOpenIcon, EyeIcon, LockIcon, ScanIcon } from 'lucide-react';
import { trustPoints } from '../../data/marketing';

const icons = {
  scan: ScanIcon,
  eye: EyeIcon,
  lock: LockIcon,
  book: BookOpenIcon
} as const;

export function TrustStrip() {
  return (
    <section aria-label="What SkinVision AI is built on" className="border-b border-line bg-white">
      <ul className="mx-auto grid max-w-page gap-x-8 gap-y-7 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-12">
        {trustPoints.map((point) => {
          const Icon = icons[point.icon as keyof typeof icons];
          return (
            <li key={point.title} className="flex gap-3.5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
              <div>
                <h3 className="text-[15px] font-bold tracking-[-0.015em] text-ink-900">
                  {point.title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{point.body}</p>
              </div>
            </li>);

        })}
      </ul>
    </section>);

}