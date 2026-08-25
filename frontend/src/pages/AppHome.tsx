import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  BookOpenIcon,
  CameraIcon,
  ImageIcon,
  LineChartIcon,
  ScanLineIcon,
  SparklesIcon } from
'lucide-react';
import { Button, ButtonLink } from '../components/Button';
import { Card } from '../components/Card';
import { HistoryCard } from '../components/HistoryCard';
import { BottomSheet } from '../components/BottomSheet';
import { Disclaimer } from '../components/Disclaimer';
import { historyEntries } from '../data/analysis';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const quickActions = [
{
  title: 'Track changes',
  body: 'Compare a saved spot over time',
  to: '/results',
  Icon: LineChartIcon
},
{
  title: 'Learn about skin health',
  body: 'How the model works, in plain language',
  to: '/about-ai',
  Icon: BookOpenIcon
}];


export function AppHome() {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <main className="mx-auto max-w-page px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[15px] text-muted">{greeting()}, Alina</p>
          <h1 className="mt-1 text-[26px] font-bold leading-[1.14] tracking-[-0.035em] text-ink-900 sm:text-[34px]">
            Understand your skin with AI-assisted insights.
          </h1>
        </div>
        <Link
          to="/profile"
          aria-label="Open profile"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-[14px] font-bold text-ink-800 shadow-card">
          
          AR
        </Link>
      </div>

      <Card className="mt-6 border-ink-800 bg-ink-900">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-800 px-3 py-1.5 text-[12px] font-semibold text-gold-200">
              <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
              AI skin analysis
            </span>
            <h2 className="mt-4 text-[26px] font-bold leading-[1.14] tracking-[-0.035em] text-canvas sm:text-[30px]">
              Analyze skin
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-gold-200">
              Upload one clear photo. You’ll get a quality check, an estimated class, model
              confidence and a visual explanation.
            </p>
          </div>

          <div className="lg:w-[240px]">
            <Button
              size="lg"
              variant="onDark"
              className="w-full lg:hidden"
              onClick={() => setSheetOpen(true)}>
              
              <ScanLineIcon className="h-5 w-5" aria-hidden="true" />
              Analyze Skin
            </Button>
            <ButtonLink
              to="/analyze"
              size="lg"
              variant="onDark"
              className="hidden w-full lg:inline-flex">
              
              <ScanLineIcon className="h-5 w-5" aria-hidden="true" />
              Analyze Skin
            </ButtonLink>
            <p className="mt-3 text-center text-[12.5px] text-gold-300">JPG or PNG · up to 10 MB</p>
          </div>
        </div>
      </Card>

      <section aria-labelledby="quick-actions" className="mt-8">
        <h2 id="quick-actions" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
          Quick actions
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {quickActions.map((action) =>
          <li key={action.title}>
              <Link
              to={action.to}
              className="flex items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift">
              
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100">
                  <action.Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-bold tracking-[-0.02em] text-ink-900">
                    {action.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-muted">{action.body}</span>
                </span>
                <ArrowRightIcon className="h-[18px] w-[18px] shrink-0 text-gold-500" aria-hidden="true" />
              </Link>
            </li>
          )}
        </ul>
      </section>

      <section aria-labelledby="recent" className="mt-9">
        <div className="flex items-end justify-between gap-4">
          <h2 id="recent" className="text-[20px] font-bold tracking-[-0.03em] text-ink-900">
            Recent analyses
          </h2>
          <Link
            to="/history"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink-800 transition-colors duration-150 ease-out hover:text-gold-700">
            
            See all
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-4 space-y-3.5">
          
          {historyEntries.slice(0, 2).map((entry) =>
          <HistoryCard key={entry.id} entry={entry} />
          )}
        </motion.ul>
      </section>

      <Disclaimer className="mt-8" />

      <BottomSheet open={sheetOpen} title="Add a skin image" onClose={() => setSheetOpen(false)}>
        <ul className="space-y-3">
          {[
          { Icon: CameraIcon, title: 'Take a photo', body: 'Use your camera in good, even light.' },
          {
            Icon: ImageIcon,
            title: 'Choose from library',
            body: 'Pick an existing JPG or PNG, up to 10 MB.'
          }].
          map((opt) =>
          <li key={opt.title}>
              <button
              onClick={() => {
                setSheetOpen(false);
                navigate('/analyze');
              }}
              className="flex w-full items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left transition-colors duration-150 ease-out hover:bg-gold-50">
              
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100">
                  <opt.Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-semibold text-ink-900">{opt.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">
                    {opt.body}
                  </span>
                </span>
              </button>
            </li>
          )}
        </ul>
        <Disclaimer
          variant="inline"
          className="mt-5"
          text="Your image is used only for this analysis." />
        
      </BottomSheet>
    </main>);

}