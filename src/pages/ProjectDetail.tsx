import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, ZoomIn } from 'lucide-react';
import { projects, featuredProjects } from '../data/projects';
import Lightbox from '../components/Lightbox';
import { ProjectBlock } from '../types';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState<{ url: string; caption?: string } | null>(null);

  useEffect(() => {
    if (project) document.title = `Emily Li | ${project.title}`;
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = featuredProjects.findIndex((p) => p.id === id);
  const navIndex = currentIndex !== -1 ? currentIndex : 0;
  const nextProject = featuredProjects[(navIndex + 1) % featuredProjects.length];
  const prevProject = featuredProjects[(navIndex - 1 + featuredProjects.length) % featuredProjects.length];

  function renderBlock(block: ProjectBlock, blockIndex: number) {
    if (block.type === 'text') {
      return (
        <p key={blockIndex} className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {block.content}
        </p>
      );
    }
    if (block.type === 'image') {
      return (
        <motion.div
          key={blockIndex}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div
            className="group relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-zoom-in transition-transform duration-700 hover:scale-[1.02] transform-gpu"
            onClick={() => setLightbox({ url: block.url, caption: block.caption })}
          >
            <img src={block.url} alt={block.caption || 'Project image'} className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-300" />
            <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              <ZoomIn className="w-5 h-5" />
            </div>
          </div>
          {block.caption && (
            <p className="text-sm text-zinc-400 italic text-center">{block.caption}</p>
          )}
        </motion.div>
      );
    }
    if (block.type === 'image-grid') {
      return (
        <div key={blockIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {block.urls.map((url, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-zoom-in transition-transform duration-700 hover:scale-[1.02] transform-gpu"
              onClick={() => setLightbox({ url })}
            >
              <img src={url} alt={`Grid image ${i + 1}`} className="w-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-300" />
              <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (block.type === 'figma-embed') {
      return (
        <div key={blockIndex} className="aspect-[16/9] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5">
          <iframe src={block.url} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen title="Figma prototype" />
        </div>
      );
    }
    if (block.type === 'video') {
      return (
        <div key={blockIndex} className="space-y-4">
          <div className="rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-video">
            {block.url.includes('youtube.com/embed') ? (
              <iframe
                src={block.url}
                title={block.caption || 'Video'}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <video src={block.url} poster={block.poster} controls className="w-full aspect-video object-cover" />
            )}
          </div>
          {block.caption && <p className="text-sm text-zinc-400 italic text-center">{block.caption}</p>}
        </div>
      );
    }
    if (block.type === 'instagram-embed') {
      // Convert post URL to embed URL: /p/CODE/ → /p/CODE/embed/
      const embedUrl = block.url.replace(/\/$/, '') + '/embed/';
      return (
        <div key={blockIndex} className="space-y-4 flex flex-col items-center">
          <div className="rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 w-full max-w-sm">
            <iframe
              src={embedUrl}
              title={block.caption || 'Instagram reel'}
              width="100%"
              style={{ aspectRatio: '9/16', border: 'none', display: 'block' }}
              scrolling="no"
              allowTransparency
              allowFullScreen
            />
          </div>
          {block.caption && <p className="text-sm text-zinc-400 italic text-center">{block.caption}</p>}
        </div>
      );
    }
    return null;
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6">
      <Lightbox
        isOpen={!!lightbox}
        imageUrl={lightbox?.url ?? null}
        caption={lightbox?.caption}
        onClose={() => setLightbox(null)}
      />

      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-500 hover:text-brand transition-colours mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>

        <header className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-4">{project.category}</p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">{project.title}</h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 py-12 border-y border-black/5 dark:border-white/5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Role</span>
            <p className="font-medium flex items-center gap-2"><User className="w-4 h-4" /> {project.role}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Timeline</span>
            <p className="font-medium flex items-center gap-2"><Calendar className="w-4 h-4" /> {project.timeline}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Tags</span>
            <div className="flex flex-col gap-1">
              {project.tags.map((tag) => (
                <span key={tag} className="text-sm font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mb-20 aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-32">
          {project.sections.map((section, index) => (
            <section key={index} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 md:sticky md:top-32">
                <h2 className="text-3xl font-serif tracking-tight mb-4">{section.title}</h2>
                <div className="h-1 w-12 bg-brand opacity-40" />
              </div>
              <div className="md:col-span-8 space-y-12">
                {section.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
              </div>
            </section>
          ))}

          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-32 border-t border-black/5 dark:border-white/5">
            <div className="md:col-span-4 md:sticky md:top-32">
              <h2 className="text-3xl font-serif tracking-tight mb-4">Reflection</h2>
              <div className="h-1 w-12 bg-brand opacity-40" />
            </div>
            <div className="md:col-span-8">
              <p className="text-xl italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                "{project.reflection}"
              </p>
            </div>
          </section>
        </div>

        {project.figmaUrl && (
          <section className="mt-48 pt-32 border-t border-black/5 dark:border-white/5">
            <h2 className="text-3xl font-serif tracking-tight mb-4">Interactive Prototype</h2>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-8">
              Experience the final design through the interactive Figma prototype below.
            </p>
            <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5">
              <iframe src={project.figmaUrl} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen title="Figma prototype" />
            </div>
          </section>
        )}

        <div className="mt-32 pt-20 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
          <Link to={`/project/${prevProject.id}`} className="group text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1">
              Previous
            </span>
            <span className="text-xl font-medium group-hover:text-brand transition-colours">
              <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>{' '}
              {prevProject.title}
            </span>
          </Link>
          <Link to={`/project/${nextProject.id}`} className="group text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1">
              Next
            </span>
            <span className="text-xl font-medium group-hover:text-brand transition-colours">
              {nextProject.title}{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
