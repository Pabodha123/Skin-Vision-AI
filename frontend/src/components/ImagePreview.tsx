import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from 'lucide-react';
import { Button } from './Button';
import { QualityCheck } from './QualityCheck';
import type { ImageQuality } from '../types/analysis';

interface ImagePreviewProps {
  src: string;
  fileName?: string;
  quality: ImageQuality | null;
  checking: boolean;
  onAnalyze: () => void;
  onReplace: () => void;
}

export function ImagePreview({
  src,
  fileName,
  quality,
  checking,
  onAnalyze,
  onReplace
}: ImagePreviewProps) {
  const poor = quality?.overall === 'poor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
      
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden rounded-3xl border border-line bg-gold-50">
          
          <img
            src={src}
            alt={fileName ? `Uploaded skin image: ${fileName}` : 'Uploaded skin image'}
            className="aspect-square w-full object-cover sm:aspect-[4/3]" />
          
        </motion.div>
        <p className="mt-3 truncate text-[13px] text-muted">{fileName ?? 'Your image'}</p>
      </div>

      <div className="flex flex-col gap-5">
        <QualityCheck quality={quality} loading={checking} />

        {poor ?
        <div
          role="alert"
          className="rounded-2xl border border-coral-200 bg-coral-50 px-4 py-4 text-[13.5px] leading-relaxed text-coral-700">
          
            <span className="font-semibold text-ink-900">
              Hmm, this image may be difficult to analyze.{' '}
            </span>
            Try a clearer image with better lighting — or continue and read the result with extra
            caution.
          </div> :
        null}

        <div className="flex flex-col gap-2.5">
          {poor ?
          <>
              <Button size="lg" onClick={onReplace}>
                Upload Another Image
              </Button>
              <Button size="lg" variant="secondary" onClick={onAnalyze}>
                Analyze anyway
              </Button>
            </> :

          <>
              <Button size="lg" onClick={onAnalyze} disabled={checking}>
                {checking ? 'Checking image…' : 'Analyze Image'}
              </Button>
              <Button size="lg" variant="secondary" onClick={onReplace}>
                Choose Another Image
              </Button>
            </>
          }
        </div>

        <p className="flex items-start gap-2 text-[13px] leading-relaxed text-muted">
          <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
          Your image is used only for this analysis.
        </p>
      </div>
    </motion.div>);

}