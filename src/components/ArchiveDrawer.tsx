import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { archiveProjects } from '../data/projects';
import { Project, ProjectBlock } from '../types';

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function mediaFromProject(project: Project): { type: 'image'; url: string }[] {
  const images: { type: 'image'; url: string }[] = [];
  // Always include the cover image first
  images.push({ type: 'image', url: project.image });
  // Then pull images from sections
  for (const section of project.sections) {
    for (const block of section.blocks) {
      if (block.type === 'image') {
        images.push({ type: 'image', url: block.url });
      } else if (block.type === 'image-grid') {
        for (const url of (block as Extract<ProjectBlock, { type: 'image-grid' }>).urls) {
          images.push({ type: 'image', url });
        }
      }
    }
  }
  return images;
}

export default function ArchiveDrawer({ isOpen, onClose }: ArchiveDrawerProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  function handleClose() {
    setSelected(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[150] bg-black/20 dark:bg-black/40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[160] w-full max-w-5xl bg-[#fdfdfd] dark:bg-[#0d1117] border border-black/10 dark:border-white/10 rounded-t-3xl max-h-[70vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-6 pb-4 shrink-0">
              <div>
                <h3 className="text-lg font-medium tracking-tight">Archive</h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Old school projects, web development, video/photo editing &amp; more</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colours cursor-pointer"
                aria-label="Close archive"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="overflow-y-auto px-8 pb-8 divide-y divide-black/5 dark:divide-white/5">
              {archiveProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="py-4 flex items-center justify-between group cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-300 dark:text-zinc-700 w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium group-hover:text-brand group-hover:translate-x-1 transition-all duration-300">
                      {project.title}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    {project.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project detail modal */}
          <AnimatePresence mode="wait">
            {selected && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelected(null)}
                  className="absolute inset-0 bg-black/30 dark:bg-black/50"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 12 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="relative w-full max-w-5xl max-h-[90vh] bg-[#fdfdfd] dark:bg-[#0d1117] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col md:flex-row"
                >
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-6 right-6 z-20 p-2 rounded-full bg-[#fdfdfd]/80 dark:bg-[#0d1117]/50 backdrop-blur-md hover:bg-brand hover:text-white transition-colours shadow-lg cursor-pointer"
                    aria-label="Close project"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Info */}
                  <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col justify-center border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 order-2 md:order-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2 block">
                      {selected.category}
                    </span>
                    <h2 className="text-3xl font-serif tracking-tight mb-4">{selected.title}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                      {selected.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  <div className="w-full md:w-3/5 h-[50vh] md:h-auto overflow-y-auto bg-black/5 dark:bg-white/5 order-1 md:order-2">
                    <div className="flex flex-col gap-4 p-4 md:p-6">
                      {mediaFromProject(selected).map((item, idx) => (
                        <div key={idx} className="w-full rounded-xl overflow-hidden bg-black/5 dark:bg-white/5">
                          <img
                            src={item.url}
                            alt={`${selected.title} ${idx + 1}`}
                            className="w-full object-cover rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
