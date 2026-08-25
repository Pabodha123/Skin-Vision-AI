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
        className="pointer-events-none absolute inset-0 bg-cover opacity-45"
        style={{ backgroundImage: "url('/hero-bg-shadow.jpg')", backgroundPosition: '78% 30%' }} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-canvas/85 to-canvas/25" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-gold-50/70 to-transparent" />

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
          className="relative mx-auto w-full max-w-[420px] py-6 sm:max-w-[480px] lg:py-10">

          {/* Center panel — the dashboard */}
          <div className="relative z-20 overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-line bg-ink-900 px-4 py-3">
              <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-canvas">
                <SparklesIcon className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                SkinVision AI
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-gold-200">
                Live
              </span>
            </div>
            <div className="p-4">
              <div className="rounded-xl bg-gold-500 px-3.5 py-3 text-center text-[13.5px] font-semibold text-white shadow-card">
                Analyze Skin
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Recent analysis
              </p>
              <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-3 py-2.5">
                <img
                  src={IMAGES.lesionOriginal}
                  alt=""
                  aria-hidden="true"
                  className="h-9 w-9 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-bold text-ink-900">Melanocytic Nevus</p>
                  <p className="text-[11px] text-muted">2 minutes ago</p>
                </div>
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                AI confidence
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gold-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87.4%' }}
                  transition={{ duration: 1.1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="h-full rounded-full bg-gold-500" />
              </div>
              <p className="mt-1.5 text-right text-[12px] font-bold tabular-nums text-ink-900">87.4%</p>
            </div>
          </div>

          {/* Left panel — the uploaded image */}
          <motion.div
            initial={{ opacity: 0, y: 10, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.45, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="absolute -left-3 bottom-0 z-10 hidden w-[150px] overflow-hidden rounded-2xl border border-line bg-white shadow-lift sm:block lg:-left-10">
            <img
              src={IMAGES.lesionAlt}
              alt=""
              aria-hidden="true"
              className="aspect-square w-full object-cover" />
            <p className="border-t border-line px-3 py-2 text-[11px] font-semibold text-ink-900">
              Your skin, understood
            </p>
          </motion.div>

          {/* Right panel — the prediction */}
          <motion.div
            initial={{ opacity: 0, y: -8, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.45, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute -right-3 top-2 z-10 hidden w-[164px] overflow-hidden rounded-2xl border border-line bg-white shadow-lift sm:block lg:-right-12">
            <div className="grid grid-cols-2">
              <img
                src={IMAGES.lesionOriginal}
                alt=""
                aria-hidden="true"
                className="aspect-square w-full object-cover" />
              <img
                src={IMAGES.lesionHeatmap}
                alt=""
                aria-hidden="true"
                className="aspect-square w-full object-cover" />
            </div>
            <div className="flex items-center gap-1.5 border-t border-line px-3 py-2">
              <EyeIcon className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
              <p className="text-[11px] font-semibold text-ink-900">AI prediction · 87.4%</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}