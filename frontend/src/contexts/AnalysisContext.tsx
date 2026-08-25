import React, { createContext, useContext, useState } from 'react';
import type { AnalysisResult, ImageQuality } from '../types/analysis';

interface AnalysisContextValue {
  uploadedImage: string | null;
  fileName: string | null;
  quality: ImageQuality | null;
  setUpload: (url: string, name: string) => void;
  setQuality: (quality: ImageQuality | null) => void;
  clearUpload: () => void;
  result: AnalysisResult | null;
  analyze: () => Promise<void>;
}

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [quality, setQuality] = useState<ImageQuality | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const setUpload = (url: string, name: string) => {
    setUploadedImage(url);
    setFileName(name);
    setQuality(null);
  };

  const clearUpload = () => {
    setUploadedImage(null);
    setFileName(null);
    setQuality(null);
  };

  const analyze = async () => {
    if (!uploadedImage) throw new Error('No image selected');

    const blob = await fetch(uploadedImage).then((r) => r.blob());
    const formData = new FormData();
    formData.append('file', blob, fileName ?? 'upload.jpg');

    const res = await fetch('/api/analyze', { method: 'POST', body: formData });
    if (!res.ok) {
      const body: { detail?: string } | null = await res.json().catch(() => null);
      throw new Error(body?.detail ?? 'Analysis failed');
    }

    const data: AnalysisResult = await res.json();
    setResult(data);
  };

  return (
    <AnalysisContext.Provider
      value={{ uploadedImage, fileName, quality, setUpload, setQuality, clearUpload, result, analyze }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
  return ctx;
}
