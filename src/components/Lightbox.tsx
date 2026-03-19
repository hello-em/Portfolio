import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string | null;
  caption?: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageUrl, caption, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Focus close button when opened
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 p-4 md:p-12 cursor-zoom-out"
          onClick={onClose}
        >
          <motion.button
            ref={closeButtonRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colours z-[210]"
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClose(); }}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-7xl w-full flex-1 flex flex-col items-center justify-center gap-6 pointer-events-none"
          >
            <div className="relative flex-1 flex items-center justify-center w-full min-h-0 pointer-events-auto">
              <img
                src={imageUrl}
                alt={caption || 'Expanded view'}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
            </div>
            {caption && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-300 text-center text-lg md:text-xl max-w-3xl leading-relaxed font-light italic pointer-events-auto cursor-default"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {caption}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
