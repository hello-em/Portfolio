import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={`/project/${project.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 transition-transform duration-700 group-hover:scale-[1.02] transform-gpu">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colours duration-300" />
          <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-medium tracking-tight">{project.title}</h3>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {project.category}
            </span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed max-w-xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
