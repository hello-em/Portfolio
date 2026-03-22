import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function FloatingScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 text-zinc-400 hover:text-brand transition-colours group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
