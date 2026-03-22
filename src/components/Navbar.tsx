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
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-[100] bg-[#fdfdfd]/80 dark:bg-[#0d1117]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colours duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight hover:text-brand/70 transition-colours z-[110] flex items-center gap-2"
          aria-label="Emily Li — home"
        >
          <img src="/assets/logo.svg" alt="Emily Li logo" className="w-6 h-6" />
          <span>Emily<span className="text-brand">.</span></span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colours ${location.pathname === link.path ? 'text-brand' : 'hover:text-brand/70'}`}
              >
                {link.name}
              </Link>
            ))}
            <a href="mailto:hello.li.emily@gmail.com" className="hover:text-brand/70 transition-colours">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => toggleTheme(e)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colours cursor-pointer"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colours z-[110] cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[105] bg-[#fdfdfd]/95 dark:bg-[#0d1117]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10 text-3xl font-medium uppercase tracking-[0.25em]">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  <Link to={link.path} className="hover:text-brand transition-colours">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.1 }}
              >
                <a href="mailto:hello.li.emily@gmail.com" className="hover:text-brand transition-colours">
                  Contact
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
