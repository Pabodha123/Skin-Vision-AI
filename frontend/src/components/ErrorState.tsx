import React from 'react';
import { CircleAlertIcon } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function ErrorState({
  title,
  body,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-3xl border border-coral-200 bg-coral-50 px-5 py-8 text-center sm:px-8 sm:py-10">
      
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-coral-200 bg-white">
        <CircleAlertIcon className="h-5 w-5 text-coral-500" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-xl font-bold tracking-[-0.025em] text-ink-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-coral-700">{body}</p>
      <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
        <Button size="lg" onClick={onAction} className="w-full sm:w-auto">
          {actionLabel}
        </Button>
        {secondaryLabel && onSecondary ?
        <Button size="lg" variant="secondary" onClick={onSecondary} className="w-full sm:w-auto">
            {secondaryLabel}
          </Button> :
        null}
      </div>
    </div>);

}