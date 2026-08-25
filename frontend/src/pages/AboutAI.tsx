import React from 'react';
import { ArrowRightIcon, DatabaseIcon, LayersIcon, ScanIcon, TargetIcon } from 'lucide-react';
import { Card, Eyebrow, SectionHeading } from '../components/Card';
import { ButtonLink } from '../components/Button';
import { Disclaimer } from '../components/Disclaimer';
import { datasetClasses, modelMetrics, pipeline } from '../data/marketing';
import { IMAGES } from '../data/analysis';

const pillars = [
{
  Icon: DatabaseIcon,
  label: 'Dataset',
  title: 'HAM10000',
  body: '10,015 dermatoscopic images across seven lesion categories, collected from two clinical sites.'
},
{
  Icon: LayersIcon,
  label: 'Model',
  title: 'EfficientNet-B0',
  body: 'ImageNet weights fine-tuned on the lesion set — transfer learning keeps data needs low.'
},
{
  Icon: ScanIcon,
  label: 'Computer vision',
  title: 'Lesion classification',
  body: 'Images are normalised and centre-cropped to 224×224 before a single forward pass.'
},
{
  Icon: TargetIcon,
  label: 'Explainability',
  title: 'Grad-CAM',
  body: 'Gradients at the final convolutional block are weighted into a spatial attention map.'
}];


const confusion = [
[82, 6, 5, 3, 2, 1, 1],
[9, 74, 7, 4, 3, 2, 1],
[7, 6, 77, 5, 3, 1, 1],
[4, 5, 6, 79, 4, 1, 1],
[3, 4, 5, 6, 78, 2, 2],
[2, 2, 3, 3, 4, 84, 2],
[2, 2, 3, 3, 3, 3, 84]];


export function AboutAI() {
  const maxCount = Math.max(...datasetClasses.map((c) => c.count));

  return (
    <main className="pb-20">
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Eyebrow>Under the hood</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-[34px] font-bold leading-[1.06] tracking-[-0.04em] text-ink-900 sm:text-[52px]">
            How SkinVision AI works
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-muted sm:text-lg">
            A short, honest tour of the model behind the predictions — what it learned from, how it
            makes a decision, and how well it actually performs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <ul className="-mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) =>
          <li
            key={p.title}
            className="flex h-full flex-col rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6">
            
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100">
                <p.Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />
              </span>
              <p className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                {p.label}
              </p>
              <h2 className="mt-1 text-[18px] font-bold tracking-[-0.025em] text-ink-900">
                {p.title}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.body}</p>
            </li>
          )}
        </ul>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Pipeline"
            title="From photo to prediction"
            body="Five stages run on every image. Nothing is hand-tuned per user." />
          
          <ol className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {pipeline.map((stage, i) =>
            <li key={stage.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="text-[11.5px] font-bold tracking-[0.14em] text-gold-400">
                  {`0${i + 1}`}
                </span>
                <h3 className="mt-2 text-[15.5px] font-bold tracking-[-0.02em] text-ink-900">
                  {stage.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{stage.body}</p>
              </li>
            )}
          </ol>
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Card>
            <h2 className="text-[22px] font-bold tracking-[-0.03em] text-ink-900 sm:text-2xl">
              What the model learned from
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              HAM10000 is heavily imbalanced — melanocytic nevi dominate. That imbalance is the main
              reason confidence should never be read as certainty.
            </p>
            <ul className="mt-6 space-y-3.5">
              {datasetClasses.map((cls) =>
              <li key={cls.code}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[14.5px] font-medium text-ink-900">
                      {cls.name} <span className="font-normal text-ink-400">({cls.code})</span>
                    </span>
                    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-muted">
                      {cls.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gold-100">
                    <div
                    className="h-full rounded-full bg-gold-500"
                    style={{ width: `${cls.count / maxCount * 100}%` }} />
                  
                  </div>
                </li>
              )}
            </ul>
          </Card>

          <div className="space-y-5">
            <Card>
              <h2 className="text-[22px] font-bold tracking-[-0.03em] text-ink-900 sm:text-2xl">
                Evaluation
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Measured on a held-out test split, macro-averaged so rare classes count as much as
                common ones.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-3.5">
                {modelMetrics.map((m) =>
                <div key={m.label} className="rounded-2xl border border-line bg-canvas p-4">
                    <dd className="text-[26px] font-bold leading-none tracking-[-0.035em] tabular-nums text-ink-900">
                      {m.value}
                    </dd>
                    <dt className="mt-2 text-[12.5px] font-medium text-muted">{m.label}</dt>
                  </div>
                )}
              </dl>
            </Card>

            <Card>
              <h3 className="text-[17px] font-bold tracking-[-0.025em] text-ink-900">
                Confusion matrix
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                Rows are true classes, columns are predictions. Darker means more images landed
                there.
              </p>
              <div
                className="mt-5 grid gap-1"
                style={{ gridTemplateColumns: `repeat(${datasetClasses.length}, minmax(0, 1fr))` }}
                role="img"
                aria-label="Confusion matrix heatmap: predictions concentrate along the diagonal, with the most confusion between melanoma and melanocytic nevi.">
                
                {confusion.flatMap((row, r) =>
                row.map((value, c) =>
                <span
                  key={`${r}-${c}`}
                  className="aspect-square rounded-[4px]"
                  style={{
                    backgroundColor: `rgba(110, 83, 42, ${Math.min(value / 90, 1) * 0.9 + 0.08})`
                  }} />

                )
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] text-muted">
                <span>{datasetClasses[0].code}</span>
                <span>{datasetClasses[datasetClasses.length - 1].code}</span>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Explainability"
              title="Reading an attention map"
              body="If the bright region sits on the lesion, the model looked in a sensible place. If it lands on background skin, a hair or a ruler mark, treat the prediction with scepticism." />
            
            <ButtonLink to="/analyze" size="lg" className="mt-7">
              Try an analysis
              <ArrowRightIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-3 gap-3.5">
            {[
            { src: IMAGES.lesionOriginal, label: 'Original', alt: 'Original lesion photograph' },
            { src: IMAGES.lesionHeatmap, label: 'Attention map', alt: 'Grad-CAM attention map' },
            {
              src: IMAGES.lesionOverlay,
              label: 'Overlay',
              alt: 'Attention map overlaid on the lesion'
            }].
            map((img) =>
            <figure
              key={img.label}
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              
                <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-square w-full object-cover" />
              
                <figcaption className="border-t border-line px-3 py-3 text-[12px] font-semibold text-ink-900">
                  {img.label}
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        <Disclaimer className="mt-14" />
      </div>
    </main>);

}