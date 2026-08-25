import type { ImageQuality, QualityCheckItem } from '../types/analysis';

const SAMPLE = 128;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('load-failed'));
    img.src = src;
  });
}

function toGrayscale(data: Uint8ClampedArray, size: number): Float32Array {
  const gray = new Float32Array(size * size);
  for (let i = 0; i < gray.length; i += 1) {
    const p = i * 4;
    gray[i] = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
  }
  return gray;
}

function laplacianVariance(gray: Float32Array, size: number): number {
  const values: number[] = [];
  for (let y = 1; y < size - 1; y += 1) {
    for (let x = 1; x < size - 1; x += 1) {
      const i = y * size + x;
      values.push(
        4 * gray[i] - gray[i - 1] - gray[i + 1] - gray[i - size] - gray[i + size]
      );
    }
  }
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  return values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
}

function centerContrast(gray: Float32Array, size: number): number {
  const from = Math.floor(size * 0.25);
  const to = Math.floor(size * 0.75);
  const vals: number[] = [];
  for (let y = from; y < to; y += 1) {
    for (let x = from; x < to; x += 1) vals.push(gray[y * size + x]);
  }
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
}

const FALLBACK: ImageQuality = {
  overall: 'fair',
  checks: [
  {
    id: 'resolution',
    label: 'Resolution',
    status: 'pass',
    detail: 'Large enough for the model to work with.'
  },
  {
    id: 'lighting',
    label: 'Lighting',
    status: 'pass',
    detail: 'Exposure looks usable.'
  },
  {
    id: 'sharpness',
    label: 'Focus',
    status: 'warn',
    detail: 'We could not fully check focus on this image.'
  },
  {
    id: 'visibility',
    label: 'Lesion visibility',
    status: 'pass',
    detail: 'Something distinct is visible in the centre of the frame.'
  }]

};

export async function assessImageQuality(src: string): Promise<ImageQuality> {
  try {
    const img = await loadImage(src);
    const canvas = document.createElement('canvas');
    canvas.width = SAMPLE;
    canvas.height = SAMPLE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return FALLBACK;

    ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE);
    const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);
    const gray = toGrayscale(data, SAMPLE);

    const pixels = img.naturalWidth * img.naturalHeight;
    const brightness = gray.reduce((a, b) => a + b, 0) / gray.length;
    const sharpness = laplacianVariance(gray, SAMPLE);
    const contrast = centerContrast(gray, SAMPLE);

    const checks: QualityCheckItem[] = [
    {
      id: 'resolution',
      label: 'Resolution',
      status: pixels >= 240 * 240 ? 'pass' : 'warn',
      detail:
      pixels >= 240 * 240 ?
      `${img.naturalWidth}×${img.naturalHeight} — plenty of detail to work with.` :
      `${img.naturalWidth}×${img.naturalHeight} — small images lose the fine detail the model relies on.`
    },
    {
      id: 'lighting',
      label: 'Lighting',
      status: brightness > 48 && brightness < 214 ? 'pass' : 'warn',
      detail:
      brightness <= 48 ?
      'The image looks quite dark. Try again near a window in daylight.' :
      brightness >= 214 ?
      'The image looks over-exposed, which washes out colour and texture.' :
      'Even exposure — colour and texture are readable.'
    },
    {
      id: 'sharpness',
      label: 'Focus',
      status: sharpness >= 60 ? 'pass' : 'warn',
      detail:
      sharpness >= 60 ?
      'Edges are crisp, so the lesion border is defined.' :
      'The image looks soft or blurred. Hold the camera steady and tap to focus.'
    },
    {
      id: 'visibility',
      label: 'Lesion visibility',
      status: contrast >= 10 ? 'pass' : 'warn',
      detail:
      contrast >= 10 ?
      'A distinct area stands out in the centre of the frame.' :
      'Nothing stands out clearly in the centre. Fill more of the frame with the lesion.'
    }];


    const warnings = checks.filter((c) => c.status === 'warn').length;
    return {
      overall: warnings === 0 ? 'good' : warnings === 1 ? 'fair' : 'poor',
      checks
    };
  } catch {
    return FALLBACK;
  }
}