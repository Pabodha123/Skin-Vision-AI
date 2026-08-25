import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { StepProgress } from '../components/StepProgress';
import { UploadZone } from '../components/UploadZone';
import { ImagePreview } from '../components/ImagePreview';
import { AnalysisLoader } from '../components/AnalysisLoader';
import { ErrorState } from '../components/ErrorState';
import { Disclaimer } from '../components/Disclaimer';
import { analysisStages } from '../data/analysis';
import { assessImageQuality } from '../utils/imageQuality';
import { useAnalysis } from '../contexts/AnalysisContext';

type Phase = 'upload' | 'preview' | 'analyzing' | 'failed';

const FIRST_MODEL_STAGE = 2;

export function Analyze() {
  const navigate = useNavigate();
  const { uploadedImage, fileName, quality, setUpload, setQuality, clearUpload, analyze } = useAnalysis();
  const [phase, setPhase] = useState<Phase>(uploadedImage ? 'preview' : 'upload');
  const [checking, setChecking] = useState(false);
  const [stageIndex, setStageIndex] = useState(FIRST_MODEL_STAGE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runQualityCheck = useCallback(
    async (url: string) => {
      setChecking(true);
      const assessed = await assessImageQuality(url);
      setQuality(assessed);
      setChecking(false);
    },
    [setQuality]
  );

  useEffect(() => {
    if (phase !== 'analyzing') return;
    const timers: number[] = [];
    const remaining = analysisStages.length - FIRST_MODEL_STAGE;
    for (let i = 1; i <= remaining; i += 1) {
      timers.push(window.setTimeout(() => setStageIndex(FIRST_MODEL_STAGE + i), 1100 * i));
    }

    let cancelled = false;
    void analyze()
      .then(() => {
        if (!cancelled) navigate('/results');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setErrorMessage(
          err instanceof Error ?
          err.message :
          'Something went wrong on our side. Your image was not saved. Please try again.'
        );
        setPhase('failed');
      });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [phase, analyze, navigate]);

  const reset = () => {
    clearUpload();
    setPhase('upload');
  };

  const step = phase === 'analyzing' ? 1 : 0;

  return (
    <main className="mx-auto max-w-page px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink-900 sm:text-[38px]">
          Skin analysis
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">
          One clear photo is all the model needs. We check the image first, then show the prediction
          and what drove it.
        </p>
      </div>

      <div className="mt-7 max-w-xl">
        <StepProgress current={step as 0 | 1 | 2} />
      </div>

      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
        className="mt-7">
        
        {phase === 'failed' ?
        <ErrorState
          title="We couldn’t complete the analysis."
          body={errorMessage ?? 'Something went wrong on our side. Your image was not saved. Please try again.'}
          actionLabel="Try Again"
          onAction={() => {
            setStageIndex(FIRST_MODEL_STAGE);
            setPhase('analyzing');
          }}
          secondaryLabel="Upload Another Image"
          onSecondary={reset} /> :


        <Card>
            {phase === 'upload' ?
          <UploadZone
            onSelect={(url, name) => {
              setUpload(url, name);
              setPhase('preview');
              void runQualityCheck(url);
            }} /> :

          null}

            {phase === 'preview' && uploadedImage ?
          <ImagePreview
            src={uploadedImage}
            fileName={fileName ?? undefined}
            quality={quality}
            checking={checking}
            onAnalyze={() => {
              setStageIndex(FIRST_MODEL_STAGE);
              setPhase('analyzing');
            }}
            onReplace={reset} /> :

          null}

            {phase === 'analyzing' && uploadedImage ?
          <AnalysisLoader src={uploadedImage} stageIndex={stageIndex} /> :
          null}
          </Card>
        }
      </motion.div>

      <Disclaimer className="mt-6 max-w-3xl" />
    </main>);

}