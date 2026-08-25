import React, { useCallback, useRef, useState } from 'react';
import { CameraIcon, ImageUpIcon } from 'lucide-react';
import { Button } from './Button';

const MAX_MB = 10;
const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png'];

interface UploadZoneProps {
  onSelect: (url: string, name: string) => void;
}

export function UploadZone({ onSelect }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!ACCEPTED.includes(file.type)) {
        setError('That file type isn’t supported. Please use a JPG, JPEG or PNG image.');
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`That image is larger than ${MAX_MB} MB. Please choose a smaller file.`);
        return;
      }
      setError(null);
      onSelect(URL.createObjectURL(file), file.name);
    },
    [onSelect]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`rounded-3xl border-2 border-dashed px-5 py-10 text-center transition-[background-color,border-color,box-shadow] duration-200 ease-out sm:px-10 sm:py-14 ${
        dragging ?
        'border-gold-400 bg-gold-50 shadow-lift' :
        'border-gold-200 bg-gold-50/50'}`
        }>
        
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line bg-white transition-transform duration-200 ease-out ${
          dragging ? 'scale-105' : ''}`
          }>
          
          <ImageUpIcon className="h-7 w-7 text-gold-500" aria-hidden="true" />
        </span>

        <h2 className="mt-6 text-[22px] font-bold tracking-[-0.025em] text-ink-900">
          Upload a skin image
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
          Take a photo or choose one from your library. We’ll check the image quality before the
          model runs.
        </p>

        <Button
          size="lg"
          className="mt-7 w-full sm:w-auto"
          onClick={() => inputRef.current?.click()}>
          
          <CameraIcon className="h-5 w-5" aria-hidden="true" />
          Choose Image
        </Button>
        <p className="mt-3 text-[13px] text-muted">JPG, JPEG, PNG · max {MAX_MB} MB</p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])} />
        
      </div>

      <div aria-live="polite">
        {error ?
        <p
          role="alert"
          className="mt-3 rounded-2xl border border-coral-200 bg-coral-50 px-4 py-3.5 text-[13.5px] font-medium leading-relaxed text-coral-700">
          
            {error}
          </p> :
        null}
      </div>

      <ul className="mt-6 grid gap-2 text-[13.5px] text-muted sm:grid-cols-3">
        <li>Use even, natural light</li>
        <li>Fill the frame with the lesion</li>
        <li>Hold steady and tap to focus</li>
      </ul>
    </div>);

}