import React from 'react';
import { Link } from 'react-router-dom';
import {
  BellIcon,
  ChevronRightIcon,
  ClockIcon,
  FileTextIcon,
  InfoIcon,
  ShieldIcon,
  SlidersHorizontalIcon,
  UserRoundIcon } from
'lucide-react';
import { Card } from '../components/Card';
import { Disclaimer } from '../components/Disclaimer';
import { historyEntries } from '../data/analysis';
import { FULL_DISCLAIMER } from '../data/marketing';

const personal = [
{ label: 'Full name', value: 'Alina Rose' },
{ label: 'Email', value: 'alina.rose@example.com' },
{ label: 'Date of birth', value: '14 Mar 1994' },
{ label: 'Skin type', value: 'Fitzpatrick II' }];


const rows = [
{
  Icon: ClockIcon,
  title: 'Analysis history',
  body: `${historyEntries.length} saved analyses`,
  to: '/history'
},
{
  Icon: ShieldIcon,
  title: 'Privacy',
  body: 'Image retention, data export and deletion',
  to: '/profile'
},
{
  Icon: BellIcon,
  title: 'Notifications',
  body: 'Re-check reminders and product updates',
  to: '/profile'
},
{
  Icon: InfoIcon,
  title: 'About SkinVision AI',
  body: 'Model, dataset and evaluation',
  to: '/about-ai'
},
{
  Icon: FileTextIcon,
  title: 'Medical disclaimer',
  body: 'What this tool is and is not',
  to: '/profile'
},
{
  Icon: SlidersHorizontalIcon,
  title: 'Settings',
  body: 'Language, units and accessibility',
  to: '/profile'
}];


export function Profile() {
  return (
    <main className="mx-auto max-w-page px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
      <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink-900 sm:text-[38px]">
        Profile
      </h1>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <Card>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold-100 text-lg font-bold text-ink-800">
              AR
            </span>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-ink-900">Alina Rose</h2>
              <p className="mt-0.5 text-[14px] text-muted">Member since Feb 2026</p>
            </div>
          </div>

          <h3 className="mt-7 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
            <UserRoundIcon className="h-4 w-4" aria-hidden="true" />
            Personal information
          </h3>
          <dl className="mt-4 divide-y divide-line border-t border-line">
            {personal.map((item) =>
            <div key={item.label} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-[14px] text-muted">{item.label}</dt>
                <dd className="text-[14.5px] font-semibold text-ink-900">{item.value}</dd>
              </div>
            )}
          </dl>
        </Card>

        <div className="space-y-5">
          <Card padded={false} className="overflow-hidden">
            <ul className="divide-y divide-line">
              {rows.map((row) =>
              <li key={row.title}>
                  <Link
                  to={row.to}
                  className="flex min-h-[68px] items-center gap-4 px-5 py-4 transition-colors duration-150 ease-out hover:bg-gold-50 sm:px-7">
                  
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-50">
                      <row.Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] font-semibold text-ink-900">
                        {row.title}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] text-muted">{row.body}</span>
                    </span>
                    <ChevronRightIcon
                    className="h-[18px] w-[18px] shrink-0 text-gold-400"
                    aria-hidden="true" />
                  
                  </Link>
                </li>
              )}
            </ul>
          </Card>

          <Disclaimer text={FULL_DISCLAIMER} />
        </div>
      </div>
    </main>);

}