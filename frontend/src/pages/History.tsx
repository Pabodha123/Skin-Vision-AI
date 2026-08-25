import React, { useEffect, useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { HistoryCard } from '../components/HistoryCard';
import { Disclaimer } from '../components/Disclaimer';
import { EmptyState } from '../components/EmptyState';
import { CardListSkeleton } from '../components/Skeleton';
import { ButtonLink } from '../components/Button';
import { historyEntries } from '../data/analysis';

const filters = [
{ id: 'all', label: 'All' },
{ id: 'info', label: 'General' },
{ id: 'review', label: 'Needs review' }] as
const;

const sorts = [
{ id: 'newest', label: 'Newest first' },
{ id: 'oldest', label: 'Oldest first' },
{ id: 'confidence', label: 'Highest confidence' }] as
const;

export function History() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const [sort, setSort] = useState<(typeof sorts)[number]['id']>('newest');

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(id);
  }, []);

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = historyEntries.filter((entry) => {
      const matchesFilter = filter === 'all' || entry.riskLevel === filter;
      const matchesQuery =
      !q ||
      entry.label.toLowerCase().includes(q) ||
      entry.region.toLowerCase().includes(q) ||
      entry.date.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'confidence') return b.confidence - a.confidence;
      if (sort === 'oldest') return a.timestamp - b.timestamp;
      return b.timestamp - a.timestamp;
    });
  }, [query, filter, sort]);

  return (
    <main className="mx-auto max-w-page px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink-900 sm:text-[38px]">
            My analyses
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            {historyEntries.length} saved analyses on this account
          </p>
        </div>
        <ButtonLink to="/analyze" size="md" className="hidden sm:inline-flex">
          New analysis
        </ButtonLink>
      </div>

      <div className="mt-7 space-y-3">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-500"
            aria-hidden="true" />
          
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by condition, area or date"
            aria-label="Search analyses"
            className="h-12 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-[15px] text-ink-900 placeholder:text-ink-400 sm:max-w-sm" />
          
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter analyses"
            className="no-scrollbar flex gap-1 overflow-x-auto rounded-xl border border-line bg-white p-1">
            
            {filters.map((f) =>
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-[40px] flex-1 whitespace-nowrap rounded-lg px-4 text-[13.5px] font-semibold transition-colors duration-200 ease-out ${
              filter === f.id ? 'bg-gold-100 text-ink-900' : 'text-muted hover:text-ink-800'}`
              }>
              
                {f.label}
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-[13px] text-muted">
            <span className="shrink-0">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number]['id'])}
              className="h-11 rounded-xl border border-line bg-white px-3 text-[14px] font-semibold text-ink-900">
              
              {sorts.map((s) =>
              <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              )}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6">
        {loading ?
        <CardListSkeleton rows={3} /> :
        entries.length > 0 ?
        <ul className="space-y-3.5">
            {entries.map((entry) =>
          <HistoryCard key={entry.id} entry={entry} />
          )}
          </ul> :
        historyEntries.length === 0 ?
        <EmptyState
          title="No analyses yet"
          body="Your skin analysis history will appear here once you run your first analysis."
          actionLabel="Analyze Your First Image"
          actionTo="/analyze" /> :


        <EmptyState
          title="Nothing matches that"
          body="Try a different search term, or clear the filter to see everything you’ve saved." />

        }
      </div>

      <Disclaimer className="mt-8" />
    </main>);

}