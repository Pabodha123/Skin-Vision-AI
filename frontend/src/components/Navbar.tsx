import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClockIcon, MenuIcon, UserRoundIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink } from './Button';

const navLinks = [
{ label: 'Home', href: '/' },
{ label: 'Analyze', href: '/analyze' },
{ label: 'How It Works', href: '/#how-it-works' },
{ label: 'AI Technology', href: '/#ai-technology' },
{ label: 'About', href: '/about-ai' }];


const utilityLinks = [
{ label: 'History', href: '/history', Icon: ClockIcon },
{ label: 'Profile', href: '/profile', Icon: UserRoundIcon }];


export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ease-out ${
      scrolled ? 'border-line bg-canvas/80 backdrop-blur-xl' : 'border-transparent bg-canvas'}`
      }>
      
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const active = link.href.split('#')[0] === location.pathname;
            return (
              <Link
                key={link.label}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-xl px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-150 ease-out ${
                active ? 'bg-gold-50 text-ink-900' : 'text-muted hover:bg-gold-50 hover:text-ink-800'}`
                }>
                
                {link.label}
              </Link>);

          })}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          {utilityLinks.map((link) =>
          <Link
            key={link.label}
            to={link.href}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[14px] font-semibold text-ink-700 transition-colors duration-150 ease-out hover:bg-gold-50">
            
              <link.Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          )}
          <ButtonLink to="/analyze" size="sm" className="ml-1.5">
            Analyze Skin
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ButtonLink to="/analyze" size="sm" className="h-10 px-4">
            Analyze
          </ButtonLink>
          <button
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink-800 transition-colors duration-150 ease-out hover:bg-gold-50">
            
            {open ?
            <XIcon className="h-5 w-5" aria-hidden="true" /> :

            <MenuIcon className="h-5 w-5" aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {open ?
      <div className="border-t border-line bg-canvas px-4 pb-6 pt-3 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.concat(utilityLinks.map((u) => ({ label: u.label, href: u.href }))).map(
            (link) =>
            <Link
              key={link.label}
              to={link.href}
              className="rounded-xl px-3 py-3.5 text-[16px] font-medium text-ink-800 transition-colors duration-150 ease-out hover:bg-gold-50">
              
                  {link.label}
                </Link>

          )}
          </nav>
        </div> :
      null}
    </header>);

}