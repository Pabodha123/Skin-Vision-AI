import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Skeleton({ className }: {className?: string;}) {
  return <span className={twMerge('skeleton block rounded-xl', className)} aria-hidden="true" />;
}

export function ResultSkeleton() {
  return (
    <div
      className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8"
      role="status"
      aria-label="Loading analysis result">
      
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-7 w-40 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full max-w-sm" />
          <Skeleton className="h-4 w-2/3 max-w-xs" />
        </div>
        <Skeleton className="h-[148px] w-[148px] shrink-0 rounded-full" />
      </div>
      <div className="mt-8 space-y-5 border-t border-line pt-6">
        {[0, 1, 2].map((i) =>
        <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        )}
      </div>
    </div>);

}

export function CardListSkeleton({ rows = 3 }: {rows?: number;}) {
  return (
    <div className="space-y-3.5" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) =>
      <div key={i} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-4">
          <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />
          <div className="min-w-0 flex-1 space-y-2.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-2 w-1/2 rounded-full" />
          </div>
        </div>
      )}
    </div>);

}

export function TextBlockSkeleton({ lines = 4 }: {lines?: number;}) {
  return (
    <div
      className="space-y-3 rounded-3xl border border-line bg-white p-5 sm:p-8"
      role="status"
      aria-label="Loading information">
      
      <Skeleton className="h-6 w-1/2" />
      {Array.from({ length: lines }).map((_, i) =>
      <Skeleton key={i} className={`h-3.5 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      )}
    </div>);

}