import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import NotFoundPhysics, { type NotFoundPhysicsHandle } from '../components/NotFoundPhysics';

// Must match FONT_SIZE in NotFoundPhysics.tsx ***
const INPUT_FONT_SIZE   = 72; // MUST MATCH ^
const INPUT_FONT_FAMILY = '"KandiLetterBeads", serif';
const LINE_HEIGHT       = INPUT_FONT_SIZE * 1.15; // approx line-height

export default function NotFound() {
  const physicsRef = useRef<NotFoundPhysicsHandle>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || !value.trim()) return;
    e.preventDefault();

    const ta = textareaRef.current;
    if (!ta || !physicsRef.current) { setValue(''); return; }

    const rect      = ta.getBoundingClientRect();
    const text      = value.trim();
    const availableW = rect.width;

    // Measure canvas — mirrors the textarea font exactly
    const mc   = document.createElement('canvas');
    const mCtx = mc.getContext('2d')!;
    mCtx.font  = `${INPUT_FONT_SIZE}px ${INPUT_FONT_FAMILY}`;

    // Simulate line wrapping: split text into wrapped lines
    const lines: string[] = [];
    let currentLine = '';
    for (const char of text) {
      const test = currentLine + char;
      if (mCtx.measureText(test).width > availableW && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = test;
      }
    }
    if (currentLine) lines.push(currentLine);

    const totalTextH  = lines.length * LINE_HEIGHT;
    const textBlockTop = rect.top + (rect.height - totalTextH) / 2;

    const payloads: { char: string; screenX: number; screenY: number }[] = [];

    lines.forEach((line, lineIdx) => {
      const lineW    = mCtx.measureText(line).width;
      // text-align: center
      const lineStartX = rect.left + (availableW - lineW) / 2;
      const lineY      = textBlockTop + lineIdx * LINE_HEIGHT + LINE_HEIGHT / 2;

      let cursorX = lineStartX;
      for (const char of line) {
        const cW = mCtx.measureText(char).width;
        if (char.trim()) {
          payloads.push({ char, screenX: cursorX + cW / 2, screenY: lineY });
        }
        cursorX += cW;
      }
    });

    physicsRef.current.spawn(payloads);
    setValue('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd] dark:bg-[#0d1117] text-black dark:text-white overflow-hidden">

      {/* Self-contained physics canvas */}
      <NotFoundPhysics ref={physicsRef} />

      {/* ── Top section: textarea fills upper ~55% of screen ── */}
      <div className="flex-1 flex items-center justify-center px-10 md:px-20 pt-16 pb-4">
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <textarea
            ref={textareaRef}
            rows={3}
            maxLength={48}
            placeholder="404."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent border-none outline-none resize-none overflow-hidden
                       text-center caret-brand font-kandi
                       text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] leading-[1.15]
                       placeholder:text-zinc-800 dark:placeholder:text-zinc-100
                       text-zinc-800 dark:text-zinc-100
                       transition-colors cursor-text"
            aria-label="Type a message and press Enter to drop the letters"
          />
          {/* Enter hint — shows only when focused and has typed content */}
          {focused && value.trim() && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-7
                         text-zinc-400 dark:text-zinc-600 text-base pointer-events-none select-none"
              aria-hidden="true"
            >
              &#x23CE;
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* ── Bottom section: heading block, left-aligned, lower portion of screen ── */}
      <motion.div
        className="px-10 md:px-20 pb-20 pt-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-1">
          Are you lost?
        </h1>
        <p className="text-4xl md:text-5xl font-serif italic text-zinc-300 dark:text-zinc-600 mb-8 leading-tight">
          we couldn't find you...
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest
                     text-zinc-400 dark:text-zinc-500 hover:text-brand dark:hover:text-brand transition-colors"
        >
          This way to main road
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </motion.div>

    </div>
  );
}
