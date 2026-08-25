import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { footerLinks, FULL_DISCLAIMER } from '../data/marketing';

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
              Understand your skin with intelligent visual insight.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
              An AI-assisted skin health research project.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-4">
            {footerLinks.map((link) =>
            <Link
              key={link.label}
              to={link.to}
              className="text-[14px] text-muted transition-colors duration-150 ease-out hover:text-ink-800">
              
                {link.label}
              </Link>
            )}
          </nav>
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-white px-5 py-5">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-600">
            Disclaimer
          </h2>
          <p className="mt-2.5 text-[13px] leading-relaxed text-ink-700">{FULL_DISCLAIMER}</p>
        </div>

        <p className="mt-6 text-[13px] text-muted">© 2026 SkinVision AI · Not a medical device.</p>
      </div>
    </footer>);

}