import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
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
            <p className="text-zinc-400 dark:text-zinc-500 mb-8">
              Pssst, I got more content I did before &rarr;{' '}
              <Link to="/archive" className="underline hover:text-brand transition-colours">
                Archive Projects
              </Link>
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black/10 dark:border-white/10 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colours"
            >
              About me →
            </Link>
          </motion.div>
        </section>

        {/* Featured projects */}
        <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>

        {/* Footer CTA */}
        <section className="mt-48 py-32 border-t border-black/5 dark:border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <h2 className="text-4xl font-serif tracking-tight mb-4">Let's build something together.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                Currently open to new opportunities and collaborations.
              </p>
              <Link
                to="/archive"
                className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-brand transition-colours group inline-flex items-center gap-2"
              >
                View Archive Projects{' '}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <a
              href="mailto:hello.li.emily@gmail.com"
              className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 font-medium"
            >
              Get in touch
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
