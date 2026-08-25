import React from 'react';
import { SparklesIcon } from 'lucide-react';
import { Card } from './Card';
import { ConfidenceRing } from './ConfidenceRing';
import { ConfidenceBar } from './ConfidenceBar';
import { StatusPill } from './StatusPill';
import type { AnalysisResult } from '../types/analysis';

export function PredictionCard({ result }: {result: AnalysisResult;}) {
  const [top, ...rest] = result.predictions;

  return (
    <Card padded={false}>
      <div className="flex flex-col items-center gap-7 p-5 text-center sm:p-8 lg:flex-row lg:items-center lg:gap-12 lg:text-left">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-800 px-3 py-1.5 text-[12px] font-semibold text-gold-200">
              <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
              AI Prediction
            </span>
            <StatusPill level={result.riskLevel} />
          </div>

          <p className="mt-6 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
            Estimated class
          </p>
          <h2 className="mt-2 text-[32px] font-bold leading-[1.08] tracking-[-0.035em] text-ink-900 sm:text-[44px]">
            {top.label}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted lg:mx-0">
            {result.condition.plainLanguage}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <ConfidenceRing value={top.confidence} />
          <p className="max-w-[170px] text-center text-[13px] leading-relaxed text-muted">
            Model confidence in the estimated class.
          </p>
        </div>
      </div>

      <div className="border-t border-line px-5 py-6 sm:px-8">
        <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
          Top predictions
        </h3>
        <div className="mt-4 space-y-4">
          <ConfidenceBar label={top.label} value={top.confidence} emphasis delay={0.15} />
          {rest.map((p, i) =>
          <ConfidenceBar
            key={p.label}
            label={p.label}
            value={p.confidence}
            delay={0.3 + i * 0.12} />

          )}
        </div>
      </div>

      <div className="rounded-b-3xl border-t border-line bg-gold-50 px-5 py-5 sm:px-8">
        <p className="text-[13px] leading-relaxed text-ink-700">
          <span className="font-semibold text-ink-900">
            This is an AI-generated prediction and not a medical diagnosis.
          </span>{' '}
          Consider consulting a qualified dermatologist about anything that concerns you.
        </p>
      </div>
    </Card>);

}