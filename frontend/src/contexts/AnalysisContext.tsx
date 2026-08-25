import React, { createContext, useContext, useMemo, useState } from 'react';
import { mockResult } from '../data/analysis';
import type { AnalysisResult, ImageQuality } from '../types/analysis';

interface AnalysisContextValue {
  uploadedImage: string | null;
  fileName: string | null;
  quality: ImageQuality | null;
  setUpload: (url: string, name: string) => void;
  setQuality: (quality: ImageQuality | null) => void;
  clearUpload: () => void;
  result: AnalysisResult;
}

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

export function AnalysisProvider({ children }: {children: React.ReactNode;}) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [quality, setQuality] = useState<ImageQuality | null>(null);

  const value = useMemo<AnalysisContextValue>(() => {
    const result: AnalysisResult = uploadedImage ?
    {
      ...mockResult,
      imageUrl: uploadedImage,
      gradcam: { ...mockResult.gradcam, original: uploadedImage }
    } :
    mockResult;

    return {
      uploadedImage,
      fileName,
      quality,
      result,
      setQuality,
      setUpload: (url: string, name: string) => {
        setUploadedImage(url);
        setFileName(name);
        setQuality(null);
      },
      clearUpload: () => {
        setUploadedImage(null);
        setFileName(null);
        setQuality(null);
      }
    };
  }, [uploadedImage, fileName, quality]);

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
  return ctx;
}