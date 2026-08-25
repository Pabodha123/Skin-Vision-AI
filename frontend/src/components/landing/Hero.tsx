import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, EyeIcon, SparklesIcon } from 'lucide-react';
import { ButtonLink } from '../Button';
import { IMAGES } from '../../data/analysis';

const rise = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 }
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-gold-50 to-transparent" />
      
      <div className="relative mx-auto grid max-w-page items-center gap-12 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <motion.span
            {...rise}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-700 shadow-card">
            
            <SparklesIcon className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
            AI-assisted skin health
          </motion.span>

          <motion.h1
            {...rise}
            transition={{ duration: 0.35, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 text-[38px] font-bold leading-[1.04] tracking-[-0.04em] text-ink-900 sm:text-[56px] lg:text-[64px]">
            
            Understand your skin.
            <span className="block text-gold-600">With AI-powered insight.</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-lg">
            
            Upload a skin image and explore an AI-assisted prediction, visual explanation, and
            helpful next-step information.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/analyze" size="lg" className="w-full sm:w-auto">
              Analyze Your Skin
              <ArrowRightIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              to="/#how-it-works"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto">
              
              Explore How It Works
            </ButtonLink>
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-muted">
            Educational research project · Not a medical diagnosis
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px]">
          
          <div className="overflow-hidden rounded-4xl border border-line bg-gold-100 shadow-lift">
            <img
              src={IMAGES.hero}
              alt="A person reviewing a skin analysis on the SkinVision AI mobile app"
              className="aspect-[4/5] w-full object-cover" />
            
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="absolute -bottom-6 left-0 w-[224px] rounded-2xl border border-line bg-white p-4 shadow-lift sm:-left-6">
            
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-100">
                <SparklesIcon className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
              </span>
              <p className="text-[13px] font-bold text-ink-900">AI analysis complete</p>
            </div>
            <p className="mt-3 text-[12px] font-medium text-muted">Model confidence</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[26px] font-bold leading-none tracking-[-0.03em] tabular-nums text-ink-900">
                87.4
              </span>
              <span className="text-[15px] font-semibold text-muted">%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gold-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '87.4%' }}
                transition={{ duration: 1.1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="h-full rounded-full bg-gold-500" />
              
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="absolute -right-2 top-8 hidden items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-lift sm:flex lg:-right-6">
            
            <EyeIcon className="h-4 w-4 text-gold-600" aria-hidden="true" />
            <p className="text-[12.5px] font-semibold text-ink-900">
              Visual explanation available
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}