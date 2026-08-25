import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CameraIcon, CheckIcon, ImageUpIcon, XIcon } from 'lucide-react';
import { Card, Eyebrow } from '../Card';
import { Button } from '../Button';
import { useAnalysis } from '../../contexts/AnalysisContext';
import { assessImageQuality } from '../../utils/imageQuality';
import type { ImageQuality } from '../../types/analysis';

type Stage = 'idle' | 'checking' | 'ready' | 'analyzing' | 'done' | 'failed';

const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png'];

export function LiveDemo() {
  const navigate = useNavigate();
  const { setUpload, clearUpload, analyze, result, uploadedImage } = useAnalysis();
  const [stage, setStage] = useState<Stage>('idle');
  const [quality, setQuality] = useState<ImageQuality | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file || !ACCEPTED.includes(file.type)) return;
      const url = URL.createObjectURL(file);
      setUpload(url, file.name);
      setStage('checking');
      const assessed = await assessImageQuality(url);
      setQuality(assessed);
      setStage('ready');
    },
    [setUpload]
  );

  const runAnalyze = async () => {
    setStage('analyzing');
    setErrorMessage(null);
    try {
      await analyze();
      setStage('done');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
      setStage('failed');
    }
  };

  const reset = () => {
    clearUpload();
    setQuality(null);
    setErrorMessage(null);
    setStage('idle');
  };

  const top = result?.predictions[0];

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Try it now</Eyebrow>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.14] tracking-[-0.03em] text-ink-900 sm:text-[40px]">
            See AI in action
          </h2>
          <p className="mt-3.5 text-[15.5px] leading-relaxed text-muted sm:text-lg">
            This runs the real model, live — no sample data. Upload a skin image and get an actual
            prediction right here on the page.
          </p>
        </div>

        <Card className="mx-auto mt-8 max-w-xl">
          <AnimatePresence mode="wait">
            {stage === 'idle' ?
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  void handleFile(e.dataTransfer.files?.[0]);
                }}
                className={`rounded-2xl border-2 border-dashed px-5 py-10 text-center transition-colors duration-200 ease-out ${
                dragging ? 'border-gold-400 bg-gold-50' : 'border-gold-200 bg-gold-50/50'}`
                }>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white">
                  <ImageUpIcon className="h-6 w-6 text-gold-500" aria-hidden="true" />
                </span>
                <p className="mt-4 text-[15px] font-semibold text-ink-900">Drop an image here</p>
                <p className="mt-1 text-[13px] text-muted">or</p>
                <Button size="md" className="mt-3" onClick={() => inputRef.current?.click()}>
                  <CameraIcon className="h-4 w-4" aria-hidden="true" />
                  Choose Image
                </Button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="sr-only"
                  onChange={(e) => void handleFile(e.target.files?.[0])} />
              </div>
            </motion.div> :
            null}

            {(stage === 'checking' || stage === 'ready') && uploadedImage ?
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5 sm:flex-row">
              <img
                src={uploadedImage}
                alt="Uploaded skin image preview"
                className="h-40 w-full shrink-0 rounded-2xl border border-line object-cover sm:h-auto sm:w-40" />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Image quality
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {stage === 'checking' ?
                  <li className="text-[13.5px] text-muted">Checking image…</li> :
                  quality?.checks.map((c) =>
                  <li key={c.id} className="flex items-center gap-2 text-[13.5px] text-ink-700">
                        {c.status === 'pass' ?
                    <CheckIcon className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" /> :

                    <XIcon className="h-4 w-4 shrink-0 text-coral-500" aria-hidden="true" />
                    }
                        {c.label}
                      </li>
                  )}
                </ul>
                <div className="mt-4 flex gap-2.5">
                  <Button
                    size="md"
                    disabled={stage !== 'ready'}
                    onClick={() => void runAnalyze()}>
                    Analyze Image
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button variant="secondary" size="md" onClick={reset}>
                    Replace
                  </Button>
                </div>
              </div>
            </motion.div> :
            null}

            {stage === 'analyzing' && uploadedImage ?
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-line">
                <img src={uploadedImage} alt="" className="h-full w-full object-cover opacity-90" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scanline bg-gradient-to-b from-transparent via-gold-200/40 to-transparent" />
              </div>
              <p className="text-[14.5px] font-semibold text-ink-900">Analyzing your image…</p>
              <p className="text-[13px] text-muted">Running the real model — this takes a few seconds.</p>
            </motion.div> :
            null}

            {stage === 'done' && result && top ?
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 py-2 text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                AI prediction
              </p>
              <p className="text-[26px] font-bold tracking-[-0.03em] text-ink-900">{top.label}</p>
              <p className="text-[15px] font-semibold text-gold-600">{top.confidence.toFixed(1)}% confidence</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2.5">
                <Button size="md" onClick={() => navigate('/results')}>
                  View Full Analysis
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="secondary" size="md" onClick={reset}>
                  Try Another
                </Button>
              </div>
            </motion.div> :
            null}

            {stage === 'failed' ?
            <motion.div
              key="failed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-2 text-center">
              <p className="text-[15px] font-semibold text-ink-900">Couldn’t complete that analysis</p>
              <p className="max-w-sm text-[13.5px] leading-relaxed text-muted">
                {errorMessage ?? 'Something went wrong. Please try again.'}
              </p>
              <Button variant="secondary" size="md" onClick={reset}>
                Try Another Image
              </Button>
            </motion.div> :
            null}
          </AnimatePresence>
        </Card>
      </div>
    </section>);

}
