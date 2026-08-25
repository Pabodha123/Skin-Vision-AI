import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function Logo({ className, to = '/' }: {className?: string;to?: string;}) {
  return (
    <Link
      to={to}
      className={twMerge('inline-flex items-center gap-2.5', className)}
      aria-label="SkinVision AI home">
      
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800">
        <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" aria-hidden="true">
          <path
            d="M12 3.4c4.2 1.1 6.4 3.9 6.4 6.9 0 3.6-2.9 6.4-6.4 6.4S5.6 13.9 5.6 10.3c0-3 2.2-5.8 6.4-6.9Z"
            fill="none"
            stroke="#DCC48F"
            strokeWidth="1.3"
            strokeLinecap="round" />
          
          <circle cx="12" cy="11" r="2.7" fill="#C9A667" />
          <path
            d="M18.6 16.6l.55 1.5 1.5.55-1.5.55-.55 1.5-.55-1.5-1.5-.55 1.5-.55Z"
            fill="#F5EBD8" />
          
        </svg>
      </span>
      <span className="text-[17px] font-bold tracking-[-0.03em] text-ink-900">
        SkinVision <span className="text-gold-500">AI</span>
      </span>
    </Link>);

}