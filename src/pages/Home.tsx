import { motion } from 'motion/react';
import { featuredProjects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-serif leading-[0.95] tracking-tight mb-8">
              I am a creative <br />
              <span className="italic text-zinc-400 dark:text-zinc-600">
                in UX &amp; UI design, video editing, and more
              </span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-6">
              Based in Vancouver, BC. A graduate from Simon Fraser University and Brainstation UX Design.
            </p>
          </motion.div>
        </section>

        {/* Featured projects */}
        <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>

      </div>
    </main>
  );
}
