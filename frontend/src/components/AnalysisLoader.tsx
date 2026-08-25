import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { analysisMessages, analysisStages } from '../data/analysis';

interface AnalysisLoaderProps {
  src: string;
  stageIndex: number;
}

export function AnalysisLoader({ src, stageIndex }: AnalysisLoaderProps) {
  const reduce = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setMessageIndex((i) => (i + 1) % analysisMessages.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div className="relative mx-auto w-full max-w-[420px]">
        {!reduce ?
        <span
          aria-hidden="true"
          className="animate-halo absolute -inset-3 rounded-[34px] border border-gold-300" /> :

        null}
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-900">
          <img
            src={src}
            alt="Image being analyzed"
            className="aspect-square w-full object-cover opacity-95 sm:aspect-[4/3]" />
          
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/4 animate-scanline bg-gradient-to-b from-transparent via-gold-200/30 to-transparent" />
          
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-5 rounded-2xl border border-gold-200/40" />
          
        </div>
      </div>

      <div>
        <h2 className="text-[26px] font-bold tracking-[-0.03em] text-ink-900">
          Analyzing your image…
        </h2>

        <div className="mt-2 h-6" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="text-[15px] text-muted">
              
              {analysisMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <ol className="mt-7 space-y-3.5">
          {analysisStages.map((label, i) => {
            const state = i < stageIndex ? 'done' : i === stageIndex ? 'active' : 'pending';
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ease-out ${
                  state === 'done' ?
                  'border-ink-800 bg-ink-800' :
                  state === 'active' ?
                  'border-gold-400 bg-gold-100' :
                  'border-line bg-white'}`
                  }>
                  
                  {state === 'done' ?
                  <CheckIcon className="h-3.5 w-3.5 text-canvas" aria-hidden="true" /> :
                  state === 'active' ?
                  <span className="h-2 w-2 rounded-full bg-gold-500" /> :
                  null}
                </span>
                <span
                  className={`text-[15px] ${
                  state === 'pending' ? 'text-muted' : 'font-semibold text-ink-900'}`
                  }>
                  
                  {label}
                </span>
              </li>);

          })}
        </ol>

        <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-gold-100">
          <motion.div
            animate={{ width: `${(stageIndex + 0.5) / analysisStages.length * 100}%` }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="h-full rounded-full bg-gold-500" />
          
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          This usually takes a few seconds. Please keep this screen open.
        </p>
      </div>
    </div>);

}