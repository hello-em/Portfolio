import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import type { SpawnPayload } from './LetterPhysics';

const INPUT_FONT_SIZE   = 26; // must match FONT_SIZE in LetterPhysics
const INPUT_FONT_FAMILY = '"KandiLetterBeads", serif';

interface NavbarProps {
  onSubmitMessage?: (letters: SpawnPayload[]) => void;
}

export default function Navbar({ onSubmitMessage }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [msgValue, setMsgValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Work', path: '/' },
    { name: 'Who Am I?', path: '/about' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !msgValue.trim()) return;

    const input = inputRef.current;
    if (!input || !onSubmitMessage) { setMsgValue(''); return; }

    const rect = input.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    // Measure each character's centre X using a canvas matching the input font
    const mc = document.createElement('canvas');
    const mCtx = mc.getContext('2d')!;
    mCtx.font = `${INPUT_FONT_SIZE}px ${INPUT_FONT_FAMILY}`;

    const text    = msgValue.trim();
    const totalW  = mCtx.measureText(text).width;
    // Input is centred — start offset is the left edge of the text block
    const startX  = rect.left + rect.width / 2 - totalW / 2;

    const payloads: SpawnPayload[] = [];
    let cursorX = startX;

    for (const char of text) {
      const charW = mCtx.measureText(char).width;
      payloads.push({
        char,
        screenX: cursorX + charW / 2, // centre of this character
        screenY: centerY,
      });
      cursorX += charW;
    }

    onSubmitMessage(payloads);
    setMsgValue('');
  };

  return (
    <>
      {/* ── Vertical sidebar (desktop) ── */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex fixed top-0 left-0 h-screen w-[18rem] z-[100] flex-col items-center pt-16 pb-12
                   bg-[#fdfdfd]/90 dark:bg-[#0d1117]/90 backdrop-blur-md
                   border-r border-black/5 dark:border-white/5 transition-colors duration-300"
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
            Email me
          </a>

          {/* Theme toggle sits right below the nav links */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="mt-2 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* LEAVE^A^MSG — Kandi font text input, Enter launches physics letters */}
          <div className="relative mt-2 w-full px-4">
            <input
              ref={inputRef}
              type="text"
              maxLength={32}
              placeholder="LEAVE A MSG^"
              value={msgValue}
              onChange={(e) => setMsgValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="w-full bg-transparent border-none outline-none text-center text-[1.55rem] tracking-normal font-kandi caret-brand
                         text-zinc-800 dark:text-zinc-200
                         placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                         focus:placeholder:opacity-0
                         transition-colors cursor-text"
              aria-label="Leave a message — press Enter to launch"
            />
            {/* Enter hint — only visible when input is focused */}
            {inputFocused && (
              <span
                className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-zinc-400 dark:text-zinc-600 text-base select-none pointer-events-none"
                aria-hidden="true"
              >
                &#x23CE;
              </span>
            )}
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
