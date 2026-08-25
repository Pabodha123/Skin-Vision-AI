import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Card, SectionHeading } from '../Card';
import { Disclaimer } from '../Disclaimer';
import { conditionKnowledge } from '../../data/marketing';

export function ConditionKnowledge() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="conditions" className="scroll-mt-24 border-b border-line bg-canvas">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Condition knowledge"
          title="Understanding common skin lesions through AI"
          body="Skin can develop many different types of spots, growths and lesions. Some are benign, while others may require professional evaluation. SkinVision AI uses computer vision to analyze dermatoscopic images and estimate which of seven predefined lesion categories is most likely represented in an uploaded image." />

        <Disclaimer
          variant="inline"
          text="SkinVision AI provides an AI-generated prediction for educational and research purposes. It does not diagnose skin disease or replace a dermatologist."
          className="mt-6 max-w-2xl" />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditionKnowledge.map((cond) => {
            const expanded = open === cond.code;
            return (
              <Card as="li" key={cond.code} padded={false} className="overflow-hidden">
                <button
                  onClick={() => setOpen(expanded ? null : cond.code)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between gap-3 p-5 text-left sm:p-6">
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="text-lg leading-none">
                      {cond.emoji}
                    </span>
                    <span>
                      <span className="block text-[15.5px] font-bold tracking-[-0.02em] text-ink-900">
                        {cond.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-muted">{cond.subtitle}</span>
                    </span>
                  </span>
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 text-gold-500 transition-transform duration-200 ease-out ${
                    expanded ? 'rotate-180' : ''}`}
                    aria-hidden="true" />
                </button>

                {expanded &&
                <div className="border-t border-line px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <p className="text-[13.5px] leading-relaxed text-muted">{cond.description}</p>

                    {cond.whatToKnow &&
                  <ul className="mt-3 space-y-1.5">
                        {cond.whatToKnow.map((item) =>
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-700">

                            <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: cond.color }} />

                            {item}
                          </li>
                    )}
                      </ul>
                  }

                    {cond.note &&
                  <p className="mt-3 rounded-xl border border-line bg-gold-50 px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-700">
                        {cond.note}
                      </p>
                  }

                    <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                      AI category: {cond.code}
                    </p>
                  </div>
                }
              </Card>);

          })}
        </ul>
      </div>
    </section>);

}
