import React from 'react';
import { ButtonLink } from './Button';

interface EmptyStateProps {
  title: string;
  body: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ title, body, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-gold-200 bg-white/70 px-6 py-14 text-center sm:py-20">
      <span
        aria-hidden="true"
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-200 bg-gold-50">
        
        <svg viewBox="0 0 32 32" className="h-8 w-8">
          <circle cx="16" cy="16" r="10.5" fill="none" stroke="#DCC48F" strokeWidth="1.4" />
          <circle cx="16" cy="16" r="4" fill="#F5EBD8" />
          <path
            d="M24.5 5.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7Z"
            fill="#C9A667" />
          
        </svg>
      </span>
      <h2 className="mt-6 text-xl font-bold tracking-[-0.025em] text-ink-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-muted">{body}</p>
      {actionLabel && actionTo ?
      <ButtonLink to={actionTo} size="lg" className="mt-7">
          {actionLabel}
        </ButtonLink> :
      null}
    </div>);

}