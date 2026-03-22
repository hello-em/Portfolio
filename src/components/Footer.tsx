import { useState } from 'react';
import ArchiveDrawer from './ArchiveDrawer';

export default function Footer() {
  const [archiveOpen, setArchiveOpen] = useState(false);

  return (
    <>
      <ArchiveDrawer isOpen={archiveOpen} onClose={() => setArchiveOpen(false)} />

      <footer className="border-t border-black/5 dark:border-white/5">
        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-4">Let's build something together.</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Currently open to new opportunities and collaborations.</p>
            <button
              onClick={() => setArchiveOpen(true)}
              className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-brand transition-colours group inline-flex items-center gap-2 cursor-pointer"
            >
              View Archive Projects <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
          <a
            href="mailto:hello.li.emily@gmail.com"
            className="liquid-btn group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 active:scale-95 transition-transform overflow-hidden"
          >
            <span className="relative z-10">Get in touch</span>
            {/* Liquid fill container — starts below the button */}
            <span className="liquid-fill absolute left-0 right-0 bottom-0 top-[130%] pointer-events-none">
              {/* Wave SVG — doubled width so it can scroll horizontally */}
              <svg
                className="wave-svg absolute bottom-full left-0 w-[200%]"
                style={{ height: '20px', marginBottom: '-1px' }}
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 10 C25 0, 50 20, 75 10 C100 0, 125 20, 150 10 C175 0, 200 20, 200 10 L200 20 L0 20 Z"
                  fill="#139C7D"
                />
              </svg>
              <span className="block w-full h-full bg-brand" />
            </span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-400 font-medium">
            <div className="flex flex-col gap-1 items-center md:items-start">
              <p className="text-xs">© {new Date().getFullYear()} Emily Li. All rights reserved.</p>
              <p className="text-xs opacity-50">Created through Vibe Coding and Designed with old Bootstrap template in mind</p>
            </div>
            <div className="flex gap-8 uppercase tracking-widest text-xs">
              <a href="https://helloemerie.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colours">Old Portfolio</a>
              <a href="https://www.linkedin.com/in/helloemerie" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colours">LinkedIn</a>
              <a href="https://www.instagram.com/hello.emerie/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colours">Instagram</a>
              <a href="https://github.com/hello-em" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colours">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
