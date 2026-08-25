import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookmarkIcon, RotateCcwIcon } from 'lucide-react';
import { Button, ButtonLink } from '../components/Button';
import { StepProgress } from '../components/StepProgress';
import { PredictionCard } from '../components/PredictionCard';
import { GradCAMViewer } from '../components/GradCAMViewer';
import { ConditionInfo } from '../components/ConditionInfo';
import { RecommendationCard } from '../components/RecommendationCard';
import { WarningCard } from '../components/WarningCard';
import { TrackChanges } from '../components/TrackChanges';
import { Disclaimer } from '../components/Disclaimer';
import { CardListSkeleton, ResultSkeleton, TextBlockSkeleton } from '../components/Skeleton';
import { recommendations } from '../data/analysis';
import { useAnalysis } from '../contexts/AnalysisContext';

const rise = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 }
};

export function Results() {
  const { result } = useAnalysis();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(id);
  }, []);

  if (!result) {
    return <Navigate to="/analyze" replace />;
  }

  return (
    <main className="mx-auto max-w-page px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="max-w-xl">
        <StepProgress current={2} />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
            {result.date}
          </p>
          <h1 className="mt-1.5 text-[28px] font-bold tracking-[-0.035em] text-ink-900 sm:text-[38px]">
            Your AI analysis
          </h1>
          <Disclaimer variant="chip" className="mt-3" />
        </div>
        <div className="flex gap-2.5">
          <Button variant="secondary" size="sm" onClick={() => setSaved(true)} disabled={saved}>
            <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
            {saved ? 'Saved' : 'Save analysis'}
          </Button>
          <ButtonLink to="/analyze" variant="secondary" size="sm">
            <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
            New
          </ButtonLink>
        </div>
      </div>

      <div className="mt-6">
        {loading ?
        <ResultSkeleton /> :

        <motion.div {...rise} transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}>
            <PredictionCard result={result} />
          </motion.div>
        }
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        {loading ?
        <>
            <TextBlockSkeleton lines={5} />
            <TextBlockSkeleton lines={4} />
          </> :

        <>
            <motion.div
            {...rise}
            transition={{ duration: 0.32, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}>
            
              <GradCAMViewer images={result.gradcam} />
            </motion.div>
            <motion.div
            {...rise}
            transition={{ duration: 0.32, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5">
            
              <ConditionInfo condition={result.condition} />
              <TrackChanges />
            </motion.div>
          </>
        }
      </div>

      <section aria-labelledby="next-steps" className="mt-12">
        <div className="max-w-xl">
          <h2
            id="next-steps"
            className="text-[24px] font-bold tracking-[-0.03em] text-ink-900 sm:text-3xl">
            
            What you can do next
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            General, educational guidance for anyone tracking a skin change — not personalised
            medical treatment.
          </p>
        </div>

        {loading ?
        <div className="mt-6">
            <CardListSkeleton rows={2} />
          </div> :

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((rec) =>
          <RecommendationCard
            key={rec.title}
            icon={rec.icon}
            title={rec.title}
            body={rec.body}
            learnMore={rec.learnMore} />

          )}
          </ul>
        }
      </section>

      <div className="mt-6">
        <WarningCard />
      </div>

      <Disclaimer className="mt-6" />
    </main>);

}