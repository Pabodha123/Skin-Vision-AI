import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Hero } from '../components/landing/Hero';
import { TrustStrip } from '../components/landing/TrustStrip';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LiveDemo } from '../components/landing/LiveDemo';
import { AiTechnology } from '../components/landing/AiTechnology';
import { ConditionKnowledge } from '../components/landing/ConditionKnowledge';
import { Faq } from '../components/landing/Faq';
import { ButtonLink } from '../components/Button';

export function Landing() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <LiveDemo />
      <AiTechnology />
      <ConditionKnowledge />
      <Faq />

      <section className="relative overflow-hidden bg-ink-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover opacity-[0.14] mix-blend-luminosity"
          style={{ backgroundImage: "url('/cta-bg-texture.jpg')", backgroundPosition: '75% 40%' }} />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/60" />

        <div className="relative mx-auto flex max-w-page flex-col items-start gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-[28px] font-bold leading-[1.14] tracking-[-0.03em] text-canvas sm:text-[38px]">
              Understand your skin with intelligent visual insight.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-gold-200 sm:text-base">
              One photo takes you through the full analysis — quality check, prediction, confidence,
              attention map and general information.
            </p>
          </div>
          <ButtonLink to="/analyze" size="lg" variant="onDark" className="w-full sm:w-auto">
            Analyze Your Skin
            <ArrowRightIcon className="h-[18px] w-[18px]" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </main>);

}