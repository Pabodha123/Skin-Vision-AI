import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface BottomSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ?
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          aria-label="Close"
          onClick={onClose}
          className="absolute inset-0 bg-ink-900/35" />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-white pb-[max(env(safe-area-inset-bottom),20px)] shadow-sheet sm:max-w-lg sm:rounded-3xl">
          
            <div className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur-xl">
              <span
              aria-hidden="true"
              className="mx-auto mt-2.5 block h-1 w-10 rounded-full bg-line sm:hidden" />
            
              <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                <h2 className="text-[17px] font-bold tracking-[-0.02em] text-ink-900">{title}</h2>
                <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink-700 transition-colors duration-150 ease-out hover:bg-gold-50">
                
                  <XIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="px-5 py-5">{children}</div>
          </motion.div>
        </div> :
      null}
    </AnimatePresence>);

}