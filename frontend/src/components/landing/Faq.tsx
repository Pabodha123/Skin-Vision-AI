import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { SectionHeading } from '../Card';
import { faqs } from '../../data/marketing';

export function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-b border-line bg-canvas">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions worth asking"
          body="What this tool does, what it does not do, and how to read its output." />
        

        <dl className="divide-y divide-line border-y border-line">
          {faqs.map((faq, i) => {
            const expanded = open === i;
            return (
              <div key={faq.q}>
                <dt>
                  <button
                    onClick={() => setOpen(expanded ? -1 : i)}
                    aria-expanded={expanded}
                    className="flex min-h-[60px] w-full items-center justify-between gap-6 py-5 text-left">
                    
                    <span className="text-[16.5px] font-semibold tracking-[-0.015em] text-ink-900">
                      {faq.q}
                    </span>
                    <PlusIcon
                      className={`h-[18px] w-[18px] shrink-0 text-gold-500 transition-transform duration-200 ease-out ${
                      expanded ? 'rotate-45' : ''}`
                      }
                      aria-hidden="true" />
                    
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {expanded ?
                  <motion.dd
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden">
                    
                      <p className="max-w-2xl pb-6 pr-6 text-[14.5px] leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    </motion.dd> :
                  null}
                </AnimatePresence>
              </div>);

          })}
        </dl>
      </div>
    </section>);

}