import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { ButtonLink } from '../Button';
import { Eyebrow } from '../Card';
import { aiCapabilities } from '../../data/marketing';
import { IMAGES } from '../../data/analysis';

export function AiTechnology() {
  return (
    <section id="ai-technology" className="scroll-mt-24 border-b border-line bg-white">
      <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <Eyebrow>Explainability</Eyebrow>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.12] tracking-[-0.03em] text-ink-900 sm:text-[40px]">
            AI that explains its prediction
          </h2>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-muted sm:text-lg">
            Grad-CAM highlights the image regions that contributed more strongly to the model’s
            prediction — so you can see whether it looked in the right place.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {aiCapabilities.map((cap) =>
            <div key={cap.title}>
                <dt className="text-[15px] font-bold tracking-[-0.015em] text-ink-900">
                  {cap.title}
                </dt>
                <dd className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{cap.body}</dd>
              </div>
            )}
          </dl>

          <ButtonLink to="/about-ai" variant="secondary" size="md" className="mt-8">
            Learn about our AI
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <figure className="overflow-hidden rounded-3xl border border-line bg-canvas shadow-card">
            <img
              src={IMAGES.lesionOriginal}
              alt="Dermoscopic close-up of a pigmented skin lesion"
              loading="lazy"
              className="aspect-square w-full object-cover" />
            
            <figcaption className="border-t border-line px-4 py-3.5 text-[13px] font-semibold text-ink-900">
              Original Image
            </figcaption>
          </figure>
          <figure className="mt-8 overflow-hidden rounded-3xl border border-line bg-canvas shadow-card">
            <img
              src={IMAGES.lesionHeatmap}
              alt="Attention map with the strongest activation over the lesion centre"
              loading="lazy"
              className="aspect-square w-full object-cover" />
            
            <figcaption className="border-t border-line px-4 py-3.5 text-[13px] font-semibold text-ink-900">
              AI Attention Map
            </figcaption>
          </figure>
        </div>
      </div>
    </section>);

}