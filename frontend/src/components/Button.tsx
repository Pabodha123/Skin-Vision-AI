import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'gold' | 'ghost' | 'onDark';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
  'bg-ink-800 text-canvas border border-ink-800 hover:bg-ink-900 hover:shadow-lift active:bg-ink-900 shadow-card',
  secondary:
  'bg-white text-ink-800 border border-line hover:border-gold-300 hover:bg-gold-50 hover:shadow-card',
  gold: 'bg-gold-500 text-white border border-gold-500 hover:bg-gold-600 hover:shadow-lift shadow-card',
  ghost: 'bg-transparent text-ink-700 border border-transparent hover:bg-gold-50',
  onDark: 'bg-canvas text-ink-900 border border-canvas hover:bg-white hover:shadow-lift'
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm rounded-xl gap-1.5',
  md: 'h-12 px-5 text-[15px] rounded-xl gap-2',
  lg: 'h-14 px-7 text-base rounded-2xl gap-2.5'
};

const base =
'inline-flex items-center justify-center font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.99] disabled:opacity-45 disabled:pointer-events-none disabled:hover:translate-y-0 whitespace-nowrap';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={twMerge(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>);

}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  to,
  children,
  ...rest
}: CommonProps & {to: string;} & Omit<React.ComponentProps<typeof Link>, 'to' | 'className'>) {
  return (
    <Link to={to} className={twMerge(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>);

}