import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'li';
  padded?: boolean;
}

export function Card({ as = 'div', padded = true, className, children, ...rest }: CardProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={twMerge(
        'rounded-3xl border border-line bg-white shadow-card',
        padded && 'p-5 sm:p-8',
        className
      )}
      {...rest}>
      
      {children}
    </Tag>);

}

export function Eyebrow({ children, className }: {children: React.ReactNode;className?: string;}) {
  return (
    <p
      className={twMerge(
        'text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-600',
        className
      )}>
      
      {children}
    </p>);

}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  className






}: {eyebrow?: string;title: string;body?: string;align?: 'left' | 'center';className?: string;}) {
  return (
    <div className={twMerge('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="text-[28px] font-bold leading-[1.14] tracking-[-0.03em] text-ink-900 sm:text-[40px]">
        {title}
      </h2>
      {body ?
      <p className="mt-3.5 text-[15.5px] leading-relaxed text-muted sm:text-lg">{body}</p> :
      null}
    </div>);

}