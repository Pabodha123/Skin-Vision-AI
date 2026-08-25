export type RiskLevel = 'info' | 'review';

export interface Prediction {
  label: string;
  confidence: number;
}

export interface ConditionSection {
  heading: string;
  body: string;
}

export interface ConditionInfoData {
  name: string;
  shortName: string;
  plainLanguage: string;
  sections: ConditionSection[];
}

export interface AnalysisResult {
  id: string;
  date: string;
  imageUrl: string;
  gradcam: {
    original: string;
    heatmap: string;
    overlay: string;
  };
  predictions: Prediction[];
  riskLevel: RiskLevel;
  noLesionCaveat: string;
  condition: ConditionInfoData;
}

export interface HistoryEntry {
  id: string;
  date: string;
  imageUrl: string;
  label: string;
  confidence: number;
  riskLevel: RiskLevel;
  region: string;
  timestamp: number;
}

export type CheckStatus = 'pass' | 'warn';

export interface QualityCheckItem {
  id: 'resolution' | 'lighting' | 'sharpness' | 'visibility';
  label: string;
  status: CheckStatus;
  detail: string;
}

export interface ImageQuality {
  overall: 'good' | 'fair' | 'poor';
  checks: QualityCheckItem[];
}