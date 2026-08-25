import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { Card } from './Card';

type View = 'original' | 'heatmap' | 'overlay';

const tabs: {id: View;label: string;}[] = [
{ id: 'original', label: 'Original' },
{ id: 'heatmap', label: 'Heatmap' },
{ id: 'overlay', label: 'Overlay' }];


const alts: Record<View, string> = {
  original: 'The uploaded skin lesion image',
  heatmap: 'Attention map showing model focus as colour intensity',
  overlay: 'Attention map overlaid on the original lesion image'
};

export function GradCAMViewer({ images }: {images: Record<View, string>;}) {
  const [view, setView] = useState<View>('overlay');
  const [explained, setExplained] = useState(false);

  return (
    <Card>
      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.03em] text-ink-900 sm:text-2xl">
        Why did the AI make this prediction?
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        Compare the original image with the model’s attention map.
      </p>

      <div
        role="tablist"
        aria-label="Attention map view"
        className="mt-5 flex rounded-xl border border-line bg-gold-50 p-1">
        
        {tabs.map((t) =>
        <button
          key={t.id}
          role="tab"
          aria-selected={view === t.id}
          onClick={() => setView(t.id)}
          className={`flex-1 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 ease-out ${
          view === t.id ? 'bg-white text-ink-900 shadow-card' : 'text-muted hover:text-ink-800'}`
          }>
          
            {t.label}
          </button>
        )}
      </div>

      <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:hidden">
        {tabs.map((t) =>
        <figure
          key={t.id}
          className="w-[58%] max-w-[220px] shrink-0 snap-center overflow-hidden rounded-2xl border border-line">

            <img
            src={images[t.id]}
            alt={alts[t.id]}
            loading="lazy"
            className="aspect-square w-full object-cover" />

            <figcaption className="border-t border-line bg-white px-3 py-2.5 text-[12px] font-semibold text-ink-900">
              {t.id === 'original' ? 'Original Image' : `AI Attention Map · ${t.label}`}
            </figcaption>
          </figure>
        )}
      </div>
      <p className="mt-3 text-[12.5px] text-muted lg:hidden">Swipe to compare the three views.</p>

      <div className="mt-6 hidden gap-5 lg:grid lg:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border border-line">
          <img
            src={images.original}
            alt={alts.original}
            className="aspect-square w-full object-cover" />
          
          <figcaption className="border-t border-line bg-white px-4 py-3 text-[13px] font-semibold text-ink-900">
            Original Image
          </figcaption>
        </figure>

        <figure className="overflow-hidden rounded-2xl border border-line">
          <div className="relative aspect-square w-full overflow-hidden bg-ink-900">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={view}
                src={images[view]}
                alt={alts[view]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 h-full w-full object-cover" />
              
            </AnimatePresence>
          </div>
          <figcaption className="flex items-center justify-between gap-3 border-t border-line bg-white px-4 py-3">
            <span className="text-[13px] font-semibold text-ink-900">AI Attention Map</span>
            <span className="text-[12px] font-medium capitalize text-muted">{view}</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-2 flex-1 rounded-full bg-gradient-to-r from-[#26221C] via-[#B08B4F] to-[#EBDBBB]" />
        
        <span className="text-[12px] font-medium text-muted">Low → high contribution</span>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-muted">
        The highlighted regions represent areas that contributed more strongly to the model’s
        prediction. This is an AI explanation — it does not confirm or rule out any medical
        condition.
      </p>

      <div className="mt-5 border-t border-line pt-4">
        <button
          onClick={() => setExplained((v) => !v)}
          aria-expanded={explained}
          className="flex w-full items-center justify-between gap-4 text-left">
          
          <span className="text-[14.5px] font-semibold text-ink-900">What is Grad-CAM?</span>
          <ChevronDownIcon
            className={`h-[18px] w-[18px] shrink-0 text-gold-500 transition-transform duration-200 ease-out ${
            explained ? 'rotate-180' : ''}`
            }
            aria-hidden="true" />
          
        </button>
        <AnimatePresence initial={false}>
          {explained ?
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">
            
              <p className="pt-3 text-[14px] leading-relaxed text-muted">
                Grad-CAM stands for Gradient-weighted Class Activation Mapping. It looks at how much
                each region of the image influenced the model’s chosen class, then paints that
                influence back over the picture. It is a useful sanity check: if the bright area
                sits on the lesion, the model looked in a sensible place. If it sits on background
                skin, a hair or a ruler mark, the prediction deserves scepticism.
              </p>
            </motion.div> :
          null}
        </AnimatePresence>
      </div>
    </Card>);

}