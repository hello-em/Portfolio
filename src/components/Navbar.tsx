import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Work', path: '/' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* ── Vertical sidebar (desktop) ── */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex sticky top-0 self-start h-screen w-[18rem] z-[100] flex-col items-center pt-16 pb-12
                   bg-[#fdfdfd]/90 dark:bg-[#0d1117]/90 backdrop-blur-md
                   border-r border-black/5 dark:border-white/5 transition-colors duration-300 shrink-0"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col items-center gap-2 mb-14 group"
          aria-label="Emily Li — home"
        >
          <img src="/assets/logo.svg" alt="Emily Li logo" className="w-8 h-8" />
          <span className="text-base font-semibold tracking-tight group-hover:text-brand transition-colors">
            Emily<span className="text-brand">.</span>
          </span>
        </Link>

        {/* Nav links + theme toggle grouped together */}
        <div className="flex flex-col items-center gap-6 text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                location.pathname === link.path
                  ? 'text-brand'
                  : 'hover:text-brand/70 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="mailto:hello.li.emily@gmail.com"
            className="hover:text-brand/70 text-zinc-500 dark:text-zinc-400 transition-colors"
          >
            Contact
          </a>

          {/* Theme toggle sits right below the nav links */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="mt-2 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* MSG^HERE — Kandi font text input */}
          <div className="relative mt-2 w-full px-4">
            <input
              type="text"
              maxLength={32}
              placeholder="MSG^HERE"
              className="w-full bg-transparent border-none outline-none text-center text-[1.55rem] tracking-normal font-kandi caret-brand
                         text-zinc-800 dark:text-zinc-200
                         placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                         focus:placeholder:opacity-0
                         transition-colors cursor-text"
              aria-label="Leave a message"
            />
          </div>
        </div>
      </nav>

      {/* ── Top bar (mobile) ── */}
      <nav
        aria-label="Main navigation mobile"
        className="md:hidden fixed top-0 left-0 right-0 z-[100]
                   bg-[#fdfdfd]/80 dark:bg-[#0d1117]/80 backdrop-blur-md
                   border-b border-black/5 dark:border-white/5 transition-colors duration-300"
      >
        <div className="px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight hover:text-brand transition-colors z-[110]"
            aria-label="Emily Li — home"
          >
            <img src="/assets/logo.svg" alt="Emily Li logo" className="w-5 h-5" />
            <span>Emily<span className="text-brand">.</span></span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => toggleTheme(e)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-[110] cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile fullscreen overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[105] bg-[#fdfdfd]/95 dark:bg-[#0d1117]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center gap-10 text-3xl font-medium uppercase tracking-[0.25em]">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    <Link to={link.path} className="hover:text-brand transition-colors">
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 + 0.1 }}
                >
                  <a href="mailto:hello.li.emily@gmail.com" className="hover:text-brand transition-colors">
                    Contact
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
