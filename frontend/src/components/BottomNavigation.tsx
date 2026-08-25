import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClockIcon, HomeIcon, ScanLineIcon, UserRoundIcon } from 'lucide-react';

const items = [
{ label: 'Home', href: '/app', Icon: HomeIcon },
{ label: 'History', href: '/history', Icon: ClockIcon },
{ label: 'Profile', href: '/profile', Icon: UserRoundIcon }];


export function BottomNavigation() {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      aria-label="App"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      
      <ul className="mx-auto flex max-w-md items-end justify-between px-4 py-1.5">
        <NavItem {...items[0]} active={isActive(items[0].href)} />

        <li className="-mt-7 flex-1">
          <Link
            to="/analyze"
            aria-label="Analyze a skin image"
            aria-current={isActive('/analyze') ? 'page' : undefined}
            className="mx-auto flex w-[80px] flex-col items-center gap-1.5">
            
            <span
              className={`flex h-[58px] w-[58px] items-center justify-center rounded-full shadow-lift transition-transform duration-200 ease-out active:scale-95 ${
              isActive('/analyze') ? 'bg-ink-900' : 'bg-ink-800'}`
              }>
              
              <ScanLineIcon className="h-[26px] w-[26px] text-gold-200" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-bold text-ink-900">Analyze</span>
          </Link>
        </li>

        <NavItem {...items[1]} active={isActive(items[1].href)} />
        <NavItem {...items[2]} active={isActive(items[2].href)} />
      </ul>
    </nav>);

}

function NavItem({
  label,
  href,
  Icon,
  active





}: {label: string;href: string;Icon: typeof HomeIcon;active: boolean;}) {
  return (
    <li className="flex-1">
      <Link
        to={href}
        aria-current={active ? 'page' : undefined}
        className="mx-auto flex min-h-[56px] w-[80px] flex-col items-center justify-center gap-1 rounded-xl">
        
        <Icon
          className={`h-[22px] w-[22px] transition-colors duration-150 ease-out ${
          active ? 'text-ink-900' : 'text-ink-400'}`
          }
          aria-hidden="true" />
        
        <span className={`text-[11px] font-semibold ${active ? 'text-ink-900' : 'text-muted'}`}>
          {label}
        </span>
        {active ?
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-500" /> :

        <span aria-hidden="true" className="h-1 w-1" />
        }
      </Link>
    </li>);

}