import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function About() {
  useEffect(() => {
    document.title = 'Emily Li | About';
  }, []);

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-12">
                About <span className="italic text-zinc-400 dark:text-zinc-600">me</span>
              </h1>
              <div className="space-y-6 text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Hi welcome to my page!! I completed the UX Diploma at Brainstation to improve my UX design
                  skills and I am actively looking for product design positions.
                </p>
                <p>
                  I've always had an interest in digital content and design. I had some struggles to discover
                  what I liked and grow in the product design field. But now I'm ready to take on the
                  challenges and move forward. Recently, I've been interested in learning more about Design
                  Systems.
                </p>
                <p>
                  I like to see the world like a game — there are always bugs and glitches that can be
                  improved to make the experience better.
                </p>
                <p>
                  Connect with me on{' '}
                  <a
                    href="https://www.linkedin.com/in/helloemerie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-brand transition-colours"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                    Experience
                  </h3>
                  <ul className="space-y-2 font-medium">
                    <li>Universole Fit</li>
                    <li>Brainstation</li>
                    <li>Freelance Video</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                    Education
                  </h3>
                  <ul className="space-y-2 font-medium">
                    <li>SFU (IAT)</li>
                    <li>Brainstation UX</li>
                  </ul>
                </div>
              </div>

              <div className="mt-12">
                <a
                  href="/EmilyLi - Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-black/10 dark:border-white/10 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colours"
                >
                  View PDF Resume →
                </a>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900"
            >
              <img
                src="/assets/images/aboutme.jpg"
                alt="Emily Li"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
