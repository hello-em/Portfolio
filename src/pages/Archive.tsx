import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { archiveProjects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function Archive() {
  useEffect(() => {
    document.title = 'Emily Li | Archive';
  }, []);

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-500 hover:text-brand transition-colours mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif tracking-tight mb-6"
        >
          Archive
        </motion.h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-16 max-w-xl">
          Older projects, school work, and experiments that shaped how I design today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {archiveProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
