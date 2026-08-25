import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { ButtonLink } from '../Button';

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
          <motion.h1
            {...rise}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
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
          className="relative mx-auto w-full max-w-[420px] sm:max-w-[480px]">
          <img
            src="/hero-mockup.png"
            alt="The SkinVision AI mobile app showing a skin analysis, confidence score, and AI attention map"
            className="w-full rounded-4xl" />
        </motion.div>
      </div>
    </section>);

}