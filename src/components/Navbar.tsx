import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import type { SpawnPayload } from './LetterPhysics';

const INPUT_FONT_SIZE   = 28; // must match FONT_SIZE in LetterPhysics
const INPUT_FONT_FAMILY = '"KandiLetterBeads", serif';

interface NavbarProps {
  onSubmitMessage?: (letters: SpawnPayload[]) => void;
}

export default function Navbar({ onSubmitMessage }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [msgValue, setMsgValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || !msgValue.trim()) return;
    e.preventDefault();

    const textarea = inputRef.current;
    if (!textarea || !onSubmitMessage) { setMsgValue(''); return; }

    const rect    = textarea.getBoundingClientRect();
    const text    = msgValue.trim();

    // ── Mirror the textarea's layout on an offscreen canvas ──────────────────
    // We need to know the exact pixel position of each character as it appears
    // in the wrapped, centred textarea.
    const mc   = document.createElement('canvas');
    const mCtx = mc.getContext('2d')!;
    mCtx.font  = `${INPUT_FONT_SIZE}px ${INPUT_FONT_FAMILY}`;

    const availableW = rect.width; // usable inner width of the textarea
    const lineHeight = INPUT_FONT_SIZE * 1.3; // approx line height (matching leading-snug)

    // ── Split text into wrapped lines ─────────────────────────────────────────
    // Walk character by character, accumulate into lines when width overflows
    const lines: string[] = [];
    let currentLine = '';

    for (const char of text) {
      const testLine = currentLine + char;
      if (mCtx.measureText(testLine).width > availableW && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    // ── Build per-character screen coordinates ────────────────────────────────
    const payloads: SpawnPayload[] = [];

    // The textarea is vertically positioned: we use the top of the textarea
    // plus an offset per line. We center vertically within the rendered text block.
    const totalTextH  = lines.length * lineHeight;
    const textBlockTop = rect.top + (rect.height - totalTextH) / 2;

    let charIndex = 0;
    lines.forEach((line, lineIdx) => {
      const lineW   = mCtx.measureText(line).width;
      // text-align: center — line starts at this X
      const lineStartX = rect.left + (availableW - lineW) / 2;
      const lineY      = textBlockTop + lineIdx * lineHeight + lineHeight / 2;

      let cursorX = lineStartX;
      for (const char of line) {
        const charW = mCtx.measureText(char).width;
        if (char.trim() !== '') {
          payloads.push({
            char,
            screenX: cursorX + charW / 2,
            screenY: lineY,
          });
        }
        cursorX += charW;
        charIndex++;
      }
    });

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
          <div className="relative mt-2 w-full px-3 box-border">
            <textarea
              ref={inputRef}
              rows={2}
              maxLength={64}
              placeholder="LEAVE A MSG^"
              value={msgValue}
              onChange={(e) => setMsgValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="w-full bg-transparent border-none outline-none resize-none text-center text-[1.3rem] leading-snug tracking-normal font-kandi caret-brand
                         text-zinc-800 dark:text-zinc-200
                         placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                         focus:placeholder:opacity-0
                         transition-colors cursor-text overflow-hidden"
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
                   bg-[#fdfdfd]/90 dark:bg-[#0d1117]/90 backdrop-blur-md
                   border-b border-black/5 dark:border-white/5 transition-colors duration-300"
      >
        <div className="px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight hover:text-brand transition-colors"
            aria-label="Emily Li — home"
          >
            <img src="/assets/logo.svg" alt="Emily Li logo" className="w-5 h-5" />
            <span>Emily<span className="text-brand">.</span></span>
          </Link>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => toggleTheme(e)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay (outside the nav so it truly covers everything) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blurred backdrop — covers full screen, blocks all interaction below */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 z-[105] bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu panel — slides down from top, sits above the backdrop */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-16 left-0 right-0 z-[110]
                         bg-[#fdfdfd] dark:bg-[#0d1117]
                         border-b border-black/10 dark:border-white/10
                         px-6 py-10 flex flex-col items-center gap-7"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 + 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-sm font-semibold uppercase tracking-widest transition-colors ${
                      location.pathname === link.path
                        ? 'text-brand'
                        : 'text-zinc-800 dark:text-zinc-100 hover:text-brand'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.05 }}
              >
                <a
                  href="mailto:hello.li.emily@gmail.com"
                  className="block text-sm font-semibold uppercase tracking-widest text-zinc-800 dark:text-zinc-100 hover:text-brand transition-colors"
                >
                  Email Me
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
