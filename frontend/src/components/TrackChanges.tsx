import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, GitCompareIcon } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { BottomSheet } from './BottomSheet';
import type { HistoryEntry } from '../types/analysis';

interface TimelineEntry {
  id: string;
  month: string;
  date: string;
  imageUrl: string;
  label: string;
  confidence: number;
  note: string;
}

function buildTimeline(entries: HistoryEntry[]): TimelineEntry[] {
  const ascending = [...entries].sort((a, b) => a.timestamp - b.timestamp);
  return ascending.map((entry, i) => {
    const month = new Date(entry.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    let note = 'First saved scan.';
    if (i > 0) {
      const prev = ascending[i - 1];
      note =
        prev.label === entry.label ?
        `Same predicted condition as ${prev.date}.` :
        `Predicted condition changed from ${prev.label} to ${entry.label}.`;
    }
    return {
      id: entry.id,
      month,
      date: entry.date,
      imageUrl: entry.imageUrl,
      label: entry.label,
      confidence: entry.confidence,
      note
    };
  });
}

function Snapshot({ entry, role }: {entry: TimelineEntry;role: string;}) {
  return (
    <div className="flex-1 rounded-2xl border border-line bg-white p-4">
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">{role}</p>
      <div className="mt-3 overflow-hidden rounded-xl border border-line">
        <img
          src={entry.imageUrl}
          alt={`Lesion photographed on ${entry.date}`}
          loading="lazy"
          className="aspect-square w-full object-cover" />

      </div>
      <p className="mt-3 text-[13px] font-semibold text-muted">{entry.date}</p>
      <h4 className="mt-0.5 text-[15.5px] font-bold tracking-[-0.02em] text-ink-900">
        {entry.label}
      </h4>
      <p className="mt-1 text-[13px] tabular-nums text-muted">
        Model confidence {entry.confidence.toFixed(1)}%
      </p>
    </div>);

}

export function TrackChanges() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [selected, setSelected] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/history')
      .then((res) => res.json())
      .then((data: HistoryEntry[]) => {
        if (cancelled) return;
        const built = buildTimeline(data);
        setTimeline(built);
        setSelected(Math.max(built.length - 1, 0));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (timeline.length === 0) {
    return (
      <Card>
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-600">
          Monitoring
        </p>
        <h2 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-ink-900 sm:text-2xl">
          Track changes over time
        </h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
          Run another analysis of the same spot later and it will show up here, so you can compare
          how it looks over time.
        </p>
      </Card>);

  }

  const current = timeline[selected];
  const previous = timeline[Math.max(selected - 1, 0)];
  const hasPrevious = selected > 0;
  const delta = current.confidence - previous.confidence;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-md">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-600">
            Monitoring
          </p>
          <h2 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-ink-900 sm:text-2xl">
            Track changes over time
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
            Saved photos of the same spot, in order. Change between visits is more informative than
            any single result.
          </p>
        </div>
      </div>

      <ol className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {timeline.map((entry, i) => {
          const active = i === selected;
          return (
            <li key={entry.id}>
              <button
                onClick={() => setSelected(i)}
                aria-pressed={active}
                className={`min-h-[44px] whitespace-nowrap rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 ease-out ${
                active ?
                'border-ink-800 bg-ink-800 text-canvas' :
                'border-line bg-white text-muted hover:bg-gold-50'}`
                }>

                {entry.month}
              </button>
            </li>);

        })}
      </ol>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
        className="mt-5 rounded-2xl border border-line bg-gold-50/60 p-4">

        <div className="flex items-center gap-4">
          <img
            src={current.imageUrl}
            alt={`Lesion photographed on ${current.date}`}
            className="h-[84px] w-[84px] shrink-0 rounded-xl border border-line object-cover" />

          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-muted">{current.date}</p>
            <h3 className="mt-0.5 truncate text-[16.5px] font-bold tracking-[-0.02em] text-ink-900">
              {current.label}
            </h3>
            <p className="mt-1 text-[13px] tabular-nums text-muted">
              Confidence {current.confidence.toFixed(1)}%
              {hasPrevious ?
              <span className="ml-1.5 text-ink-700">
                  ({delta >= 0 ? '+' : ''}
                  {delta.toFixed(1)} vs {previous.month})
                </span> :
              null}
            </p>
          </div>
        </div>
        <p className="mt-3.5 border-t border-line pt-3 text-[13.5px] leading-relaxed text-muted">
          {current.note}
        </p>
      </motion.div>

      <Button
        variant="secondary"
        size="md"
        className="mt-5 w-full sm:w-auto"
        disabled={!hasPrevious}
        onClick={() => setCompareOpen(true)}>

        <GitCompareIcon className="h-4 w-4" aria-hidden="true" />
        Compare Images
      </Button>
      {!hasPrevious ?
      <p className="mt-2 text-[12.5px] text-muted">
          This is the earliest saved photo, so there is nothing to compare it against yet.
        </p> :
      null}

      <BottomSheet
        open={compareOpen}
        title={`${previous.month} vs ${current.month}`}
        onClose={() => setCompareOpen(false)}>

        <div className="flex items-start gap-3">
          <Snapshot entry={previous} role="Previous" />
          <ArrowRightIcon
            className="mt-24 hidden h-5 w-5 shrink-0 text-gold-500 sm:block"
            aria-hidden="true" />

          <Snapshot entry={current} role="Current" />
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-muted">
          Compare border, colour and size between the two photos. Differences in lighting or angle
          can look like change, so judge carefully — and take anything genuinely different to a
          dermatologist.
        </p>
      </BottomSheet>
    </Card>);

}
