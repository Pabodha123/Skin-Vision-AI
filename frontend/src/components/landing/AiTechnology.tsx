import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { ButtonLink } from '../Button';
import { Eyebrow } from '../Card';
import { aiCapabilities } from '../../data/marketing';
import { IMAGES } from '../../data/analysis';

type View = 'original' | 'heatmap' | 'overlay';

const tabs: { id: View; label: string }[] = [
  { id: 'original', label: 'Original' },
  { id: 'heatmap', label: 'Heatmap' },
  { id: 'overlay', label: 'Overlay' },
];

const images: Record<View, string> = {
  original: IMAGES.lesionOriginal,
  heatmap: IMAGES.lesionHeatmap,
  overlay: IMAGES.lesionOverlay,
};

export function AiTechnology() {
  const [view, setView] = useState<View>('overlay');

  return (
    <section id="ai-technology" className="scroll-mt-24 border-b border-line bg-white">
      <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <Eyebrow>Explainability</Eyebrow>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.12] tracking-[-0.03em] text-ink-900 sm:text-[40px]">
            Don’t just see the prediction.
            <span className="block text-gold-600">Understand why.</span>
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
            Explore our AI
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <div>
          <div
            role="tablist"
            aria-label="Attention map view"
            className="flex rounded-xl border border-line bg-gold-50 p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={view === t.id}
                onClick={() => setView(t.id)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 ease-out ${
                  view === t.id ? 'bg-white text-ink-900 shadow-card' : 'text-muted hover:text-ink-800'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          <figure className="mt-4 overflow-hidden rounded-3xl border border-line bg-canvas shadow-card">
            <img
              key={view}
              src={images[view]}
              alt={
                view === 'original' ?
                'Dermoscopic close-up of a pigmented skin lesion' :
                view === 'heatmap' ?
                'Attention heatmap with the strongest activation over the lesion centre' :
                'Attention heatmap overlaid on the original lesion image'
              }
              loading="lazy"
              className="aspect-square w-full object-cover" />
            <figcaption className="border-t border-line px-4 py-3.5 text-[13px] font-semibold text-ink-900">
              {view === 'original' ? 'Original Image' : `AI Attention Map · ${tabs.find((t) => t.id === view)?.label}`}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>);

}