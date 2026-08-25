import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { Card } from './Card';
import type { ConditionInfoData } from '../types/analysis';

export function ConditionInfo({ condition }: {condition: ConditionInfoData;}) {
  const [open, setOpen] = useState(0);

  return (
    <Card>
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-600">
        Educational information
      </p>
      <h2 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-ink-900 sm:text-2xl">
        About this condition
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        {condition.name} — also called a {condition.shortName.toLowerCase()}.
      </p>

      <div className="mt-5 divide-y divide-line border-t border-line">
        {condition.sections.map((section, i) => {
          const expanded = open === i;
          return (
            <div key={section.heading}>
              <h3>
                <button
                  onClick={() => setOpen(expanded ? -1 : i)}
                  aria-expanded={expanded}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left">
                  
                  <span className="text-[15.5px] font-semibold text-ink-900">
                    {section.heading}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ease-out ${
                    expanded ? 'border-gold-300 bg-gold-100' : 'border-line bg-white'}`
                    }>
                    
                    <ChevronDownIcon
                      className={`h-4 w-4 text-gold-600 transition-transform duration-200 ease-out ${
                      expanded ? 'rotate-180' : ''}`
                      }
                      aria-hidden="true" />
                    
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {expanded ?
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden">
                  
                    <p className="pb-5 pr-6 text-[14.5px] leading-relaxed text-muted">
                      {section.body}
                    </p>
                  </motion.div> :
                null}
              </AnimatePresence>
            </div>);

        })}
      </div>
    </Card>);

}