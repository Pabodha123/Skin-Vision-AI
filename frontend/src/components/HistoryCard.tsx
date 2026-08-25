import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { StatusPill } from './StatusPill';
import type { HistoryEntry } from '../types/analysis';

export function HistoryCard({ entry }: {entry: HistoryEntry;}) {
  return (
    <li className="rounded-3xl border border-line bg-white p-4 shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift sm:p-5">
      <div className="flex items-center gap-4">
        <img
          src={entry.imageUrl}
          alt={`Skin image analyzed on ${entry.date}`}
          loading="lazy"
          className="h-[76px] w-[76px] shrink-0 rounded-2xl border border-line object-cover sm:h-24 sm:w-24" />
        

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p className="text-[12.5px] font-semibold text-muted">{entry.date}</p>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-300" />
            <p className="text-[12.5px] text-muted">{entry.region}</p>
          </div>
          <h3 className="mt-1 truncate text-[16.5px] font-bold tracking-[-0.02em] text-ink-900">
            {entry.label}
          </h3>
          <div className="mt-2.5 flex items-center gap-3">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gold-100 sm:w-32">
              <div
                className="h-full rounded-full bg-ink-800"
                style={{ width: `${entry.confidence}%` }} />
              
            </div>
            <span className="text-[13px] font-semibold tabular-nums text-ink-800">
              {entry.confidence.toFixed(1)}%
            </span>
          </div>
        </div>

        <Link
          to="/results"
          aria-label={`View analysis from ${entry.date}`}
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-800 transition-colors duration-150 ease-out hover:bg-gold-50 sm:flex">
          
          <ArrowRightIcon className="h-[18px] w-[18px]" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3.5">
        <StatusPill level={entry.riskLevel} />
        <Link
          to="/results"
          className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-ink-800 transition-colors duration-150 ease-out hover:text-gold-700">
          
          View Analysis
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </li>);

}