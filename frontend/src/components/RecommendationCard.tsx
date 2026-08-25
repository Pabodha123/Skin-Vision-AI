import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ActivityIcon, DropletIcon, StethoscopeIcon, SunIcon } from 'lucide-react';

const icons = {
  monitor: ActivityIcon,
  sun: SunIcon,
  droplet: DropletIcon,
  stethoscope: StethoscopeIcon
} as const;

interface RecommendationCardProps {
  icon: keyof typeof icons;
  title: string;
  body: string;
  learnMore?: string;
}

export function RecommendationCard({ icon, title, body, learnMore }: RecommendationCardProps) {
  const Icon = icons[icon];
  const [open, setOpen] = useState(false);

  return (
    <li className="flex h-full flex-col rounded-3xl border border-line bg-white p-5 shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift sm:p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100">
        <Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-[17px] font-bold tracking-[-0.02em] text-ink-900">{title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{body}</p>

      {learnMore ?
      <div className="mt-auto pt-4">
          <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="text-[13.5px] font-semibold text-gold-700 transition-colors duration-150 ease-out hover:text-ink-900">
          
            {open ? 'Show less' : 'Learn more'}
          </button>
          <AnimatePresence initial={false}>
            {open ?
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">
            
                <p className="pt-3 text-[13.5px] leading-relaxed text-muted">{learnMore}</p>
              </motion.div> :
          null}
          </AnimatePresence>
        </div> :
      null}
    </li>);

}